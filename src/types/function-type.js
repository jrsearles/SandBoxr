import {ObjectType} from "./object-type";
import {PropertyDescriptor} from "./property-descriptor";
import {UNDEFINED} from "./primitive-type";
import {isNullOrUndefined, isObject} from "../utils/checks";

function getParameterLength (params) {
	for (let i = 0, ln = params.length; i < ln; i++) {
		// parameter length should only include the first "Formal" parameters
		if (params[i].isRestElement() || params[i].isAssignmentPattern()) {
			return i;
		}
	}

	return params.length;
}

function* execute (func, thisArg, args, callee, newTarget) {
	let env = func[Symbol.for("env")];
	let scope = env.createExecutionScope(func, thisArg, newTarget);

	callee = callee || func;
	yield scope.loadArgs(func.node.params, args || [], func);
	scope.init(func.node);
	
	if (newTarget) {
		scope.setMeta("newTarget", newTarget);
	}
	
	if (func.homeObject) {
		scope.setMeta("super", func.homeObject);
	}
	
	if (func.node.id) {
		env.createVariable(func.node.id.name).setValue(func);
	}

	return yield* scope.use(function* () {
		let context = env.createExecutionContext(thisArg, callee, newTarget);
		return yield context.execute(func.node.body, callee);
	});	
}

export class FunctionType extends ObjectType {
	constructor (node) {
		super();
		this.type = "function";
		this.className = "Function";
		this.native = false;
		this.node = node;

		this.arrow = node && node.isArrowFunctionExpression();
		this.isConstructor = false;
		this.canConstruct = !this.arrow;
		
		this.kind = "base";
		this.boundScope = null;
		this.boundThis = null;
		this.homeObject = null;
	}

	init (env, proto, descriptor, strict) {
		super.init(...arguments);
		
		let {isConstructor = false, homeObject, kind = "base"} = descriptor || {};
		this.isConstructor = isConstructor;
		this.homeObject = homeObject;
		this.kind = kind;
		
		if (strict !== undefined) {
			this.strict = strict;
		}

		// set length property from the number of parameters
		this.setLength(getParameterLength(this.node.params));

		if (proto !== null) {
			// functions have a prototype
			proto = proto || env.objectFactory.createObject();
			this.defineProperty("prototype", {value: proto, writable: true});

			// set the contructor property as an instance of itself
			proto.properties.constructor = new PropertyDescriptor(this, {configurable: true, enumerable: false, writable: true, value: this}, "constructor");
		}

		this.addPoison();
	}
	
	setLength (length) {
		let env = this[Symbol.for("env")];
		let value = env.objectFactory.createPrimitive(length);
		let configurable = env.options.ecmaVersion > 5;

		this.defineProperty("length", {value, configurable});		
	}

	addPoison () {
		let env = this[Symbol.for("env")];
		if (env.options.ecmaVersion > 5) {
			return;
		}

		if (this.isStrict()) {
			let thrower = function () {
				throw TypeError();
			};

			let throwerFunc = env.objectFactory.createBuiltInFunction(thrower);

			let throwerProp = {
				get: throwerFunc,
				getter: thrower,
				set: throwerFunc,
				setter: thrower,
				enumerable: false,
				configurable: false
			};

			this.define("caller", null, throwerProp);
			this.define("arguments", null, throwerProp);
		}
	}

	*call (thisArg, args, callee) {
		if (this.isConstructor) {
			throw TypeError(`Constructor function ${this.name} must be called with 'new'`);
		}
		
		let executionResult = yield execute(this, thisArg, args, callee);
		let shouldReturn = (this.arrow && !this.node.body.isBlockStatement()) || (executionResult && executionResult.exit);

		if (shouldReturn && executionResult.result) {
			return executionResult.result;
		}

		return UNDEFINED;
	}

	*construct (thisArg, args, callee) {
		if (this.node.isArrowFunctionExpression()) {
			throw TypeError(`Function ${this.name} is not a constructor.a`);
		}
		
		let target = (callee || this).getValue();
		
		if (!thisArg || thisArg === this) {
			thisArg = this[Symbol.for("env")].objectFactory.createObject(target);
		}

		let executionResult = yield execute(this, thisArg, args, callee, target);
		if (executionResult.exit && executionResult.result) {
			if (executionResult.result.isPrimitive) {
				if (this.kind === "classConstructor" && executionResult.result.value !== undefined) {
					throw TypeError();
				}
			} else {
				return executionResult.result;
			}
		}

		return thisArg;
	}

	bindThis (thisArg) {
		this.boundThis = this.boundThis || thisArg;
	}

	bindScope (scope) {
		this.boundScope = scope;
	}

	isStrict () {
		if ("strict" in this) {
			return this.strict;
		}

		if (this.native) {
			return false;
		}

		return this.node.body.isStrict();
	}

	hasInstance (obj) {
		if (obj === this) {
			// object obviously isn't an instance in this case
			return false;
		}

		let visited = [];
		let current = obj;

		let proto = this.getValue("prototype");
		if (isNullOrUndefined(proto) || !isObject(proto)) {
			throw TypeError("Function has non-object prototype in instanceof check");
		}

		while (current) {
			if (visited.indexOf(current) >= 0) {
				return false;
			}

			if (current === proto) {
				return true;
			}

			// keep a stack to avoid circular reference
			visited.push(current);
			current = current.getPrototype();
		}

		return false;
	}

	toNative () {
		return undefined;
	}
}
