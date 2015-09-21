import {ObjectType} from "./object-type";
import {PropertyDescriptor} from "./property-descriptor";
import * as contracts from "../utils/contracts";

export class FunctionType extends ObjectType {
	constructor (node) {
		super();
		this.type = "function";
		this.className = "Function";
		this.native = false;
		this.node = node;

		this.boundScope = null;
		this.boundThis = null;
	}

	init (objectFactory, proto, descriptor, strict) {
		if (strict !== undefined) {
			this.strict = strict;
		}

		// set length property from the number of parameters
		this.defineOwnProperty("length", {
			value: objectFactory.createPrimitive(this.node.params.length),
			configurable: false,
			enumerable: false,
			writable: false
		});

		this.initStrict(objectFactory);

		// functions have a prototype
		proto = proto || objectFactory.createObject();
		this.defineOwnProperty("prototype", { value: proto, configurable: false, enumerable: false, writable: true });

		// set the contructor property as an instance of itself
		proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });
	}

	initStrict (objectFactory) {
		if (this.isStrict()) {
			let throwerProps = objectFactory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
			this.defineOwnProperty("caller", throwerProps);
			this.defineOwnProperty("arguments", throwerProps);
		} else {
			this.defineOwnProperty("caller", { value: objectFactory.createPrimitive(undefined) });
		}
	}

	bindThis (thisArg) {
		this.boundThis = thisArg;
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

		return (this.strict = contracts.isStrictNode(this.node.body.body));
	}

	createScope (env, thisArg) {
		// if a parent scope is defined we need to limit the scope to that scope
		let priorScope = env.current.scope;

		if (this.boundScope) {
			env.setScope(this.boundScope.scope);
		}

		let scope = env.createScope(this.boundThis || thisArg, priorScope);
		scope.priorScope = priorScope;
		return scope;
	}

	hasInstance (obj) {
		if (obj === this) {
			// object obviously isn't an instance in this case
			return false;
		}

		let visited = [];
		let current = obj;

		let proto = this.getValue("prototype");
		if (contracts.isNullOrUndefined(proto) || !contracts.isObject(proto)) {
			throw new TypeError("Function has non-object prototype in instanceof check");
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
