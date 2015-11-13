import {ObjectType} from "./object-type";
import {PropertyDescriptor} from "./property-descriptor";
import {UNDEFINED} from "./primitive-type";
import {isStrictNode, isNullOrUndefined, isObject} from "../utils/contracts";

function getParameterLength (params) {
	for (let i = 0, ln = params.length; i < ln; i++) {
		// parameter length should only include the first "Formal" parameters
		if (params[i].type !== "Identifier") {
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

		this.arrow = node && node.type === "ArrowFunctionExpression";
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
	}

	*call (thisArg, args = [], callee) {
		let self = this;
		let env = this[Symbol.for("env")];
		let scope = env.createExecutionScope(this, thisArg);

		yield scope.loadArgs(this.node.params, args, this);
		scope.init(this.node && this.node.body);

		return yield scope.use(function* () {
			let executionResult = yield env.createExecutionContext(self.node.body, callee).execute();
			let shouldReturn = self.arrow || (executionResult && executionResult.exit);

			if (shouldReturn && executionResult.result) {
				return executionResult.result;
			}

			return UNDEFINED;
		});
	}

	*construct (thisArg, args = [], callee) {
		if (!thisArg || thisArg === this) {
			thisArg = this[Symbol.for("env")].objectFactory.createObject(this);
		}

		let result = yield this.call(thisArg, args, callee);
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

		return (this.strict = isStrictNode(this.node.body.body));
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
