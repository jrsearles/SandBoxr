import {ObjectType} from "./object-type";
import {PropertyDescriptor} from "./property-descriptor";
import {UNDEFINED} from "./primitive-type";
import {isNullOrUndefined, isObject} from "../utils/contracts";

function getParameterLength (params) {
	for (let i = 0, ln = params.length; i < ln; i++) {
		// parameter length should only include the first "Formal" parameters
		if (!params[i].isIdentifier()) {
			return i;
		}
	}

	return params.length;
}

export class FunctionType extends ObjectType {
	constructor (node) {
		super();
		this.type = "function";
		this.className = "Function";
		this.native = false;
		this.node = node;

		this.arrow = node && node.isArrowFunctionExpression();
		this.canConstruct = !this.arrow;

		this.boundScope = null;
		this.boundThis = null;
	}

	init (env, proto, descriptor, strict) {
		super.init(...arguments);

		if (strict !== undefined) {
			this.strict = strict;
		}

		// set length property from the number of parameters
		this.defineOwnProperty("length", {value: env.objectFactory.createPrimitive(getParameterLength(this.node.params))});

		if (!this.arrow) {
			// functions have a prototype
			proto = proto || env.objectFactory.createObject();
			this.defineOwnProperty("prototype", {value: proto, writable: true});

			// set the contructor property as an instance of itself
			proto.properties.constructor = new PropertyDescriptor(this, {configurable: true, enumerable: false, writable: true, value: this});
		}

		this.addPoison();
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

	*call (thisArg, args, callee, isNew) {
		let self = this;
		let env = this[Symbol.for("env")];
		
		callee = callee || this;
		let scope = env.createExecutionScope(this, thisArg);

		yield scope.loadArgs(this.node.params, args || [], this);
		scope.init(this.node);
		
		if (this.node.id) {
			env.createVariable(this.node.id.name).setValue(this);
		}

		return yield scope.use(function* () {
			let executionResult = yield env.createExecutionContext(thisArg, callee, isNew).execute(self.node.body, callee);
			let shouldReturn = self.arrow || (executionResult && executionResult.exit);

			if (shouldReturn && executionResult.result) {
				return executionResult.result;
			}

			return UNDEFINED;
		});
	}

	*construct (thisArg, args, callee) {
		if (!thisArg || thisArg === this) {
			thisArg = this[Symbol.for("env")].objectFactory.createObject(this);
		}

		let result = yield this.call(thisArg, args || [], callee, true);
		if (result && !result.isPrimitive) {
			return result;
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
