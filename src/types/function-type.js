import ObjectType from "./object-type";
import PropertyDescriptor from "./property-descriptor";
import * as contracts from "../utils/contracts";

export default class FunctionType extends ObjectType {
	constructor (node) {
		super();
		this.type = "function";
		this.className = "Function";
		this.native = false;
		this.node = node;

		this.parentScope = null;
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
		
		// set the contructor property as an instance of  itself
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

	getProperty (name) {
		var prop = super.getProperty.apply(this, arguments);
		if (!prop && name !== "prototype") {
			// since a function instance is itself a function look at our own prototype
			var proto = this.getProperty("prototype");
			return proto && proto.getValue().getProperty(name);
		}

		return prop;
	}

	bindThis (thisArg) {
		this.boundThis = thisArg;
	}

	bindScope (scope) {
		this.parentScope = scope;
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
		var priorScope = env.current;
		var fn = this;
		
		if (this.parentScope) {
			env.current = this.parentScope;
		}
	
		var args = Array.prototype.slice.call(arguments, 1);
		if (this.boundThis) {
			args[0] = this.boundThis;
		}
	
		var scope = env.createScope.apply(env, args);
		return {
			init () {
				if (!fn.native) {
					scope.init(fn.node.body);
				}
			},
			
			exitScope () {
				scope.exitScope();
				env.current = priorScope;
			}
		};
	}

	hasInstance (obj) {
		if (obj === this) {
			// object obviously isn't an instance in this case
			return false;
		}

		var visited = [];
		var current = obj;

		var proto = this.getProperty("prototype").getValue();
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

	unwrap () {
		return undefined;
	}
}
