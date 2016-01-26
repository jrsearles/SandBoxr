import {ObjectType} from "./object-type";
import {PrimitiveType, UNDEFINED, NULL} from "./primitive-type";
import {FunctionType} from "./function-type";
import {NativeFunctionType} from "./native-function-type";
import {RegexType} from "./regex-type";
import {ArrayType} from "./array-type";
import {StringType} from "./string-type";
import {DateType} from "./date-type";
import {ErrorType} from "./error-type";
import {ArgumentType} from "./argument-type";
import {IteratorType} from "./iterator-type";
import {SymbolType} from "./symbol-type";
import {CollectionType} from "./collection-type";
import {ProxyType} from "./proxy-type";
import {assertIsObject} from "../utils/contracts";
import {getNativeType as getType} from "../utils/helpers";
import {isNullOrUndefined, isConstructor} from "../utils/checks";

let orphans = Object.create(null);
const functionNameMatcher = /((?:get |set )?\[Symbol\.\w+\]|[^.]+)$/;

function setOrphans (scope) {
	for (let typeName in orphans) {
		let parent = scope.getValue(typeName);
		if (parent) {
			orphans[typeName].forEach(function (child) {
				child.setPrototype(parent.getValue("prototype"));
			});

			delete orphans[typeName];
		}
	}

	orphans = Object.create(null);
}

function setProto (typeName, instance, factory) {
	let env = factory.env;
	if (!env.global || !env.global.owns(typeName)) {
		if (!factory.initialized) {
			// during initialization it is possible for objects to be created
			// before the types have been registered - add a registry of items
			// and these can be filled in when the type is registered
			orphans[typeName] = orphans[typeName] || [];
			orphans[typeName].push(instance);
		}

		return;
	}

	let proto = env.global.getValue(typeName).getValue("prototype");
	instance.setPrototype(proto);
}

const defaultDescriptor = {configurable: true, enumerable: true, writable: true};
function createDataPropertyDescriptor (value, {configurable = true, enumerable = true, writable = true} = defaultDescriptor) {
	return {value, configurable, enumerable, writable};
}

export class ObjectFactory {
	constructor (env) {
		this.env = env;
		this.options = env.options;
		this.ecmaVersion = env.options.ecmaVersion || 5;
		this.initialized = false;
    this.instanceCache = new Map();
	}

	init () {
		setOrphans(this.env);
		this.initialized = true;
	}

	/**
	 * Creates a primitive object based on the provided native value.
	 * @param {any} value - The primitive value.
	 * @returns {ObjectType} The primitive instance.
	 */
	createPrimitive (value) {
		return this.create(getType(value), value);
	}

	/**
	 * Creates an object based on the type specified. For a primitive type the second
	 * parameter is used as the objects underlying value.
	 * @param {String} typeName - The name of the object to create.
	 * @param {any} [value] - The primitive value.
	 * @returns {ObjectType} The new instance.
	 */
	create (typeName, value) {
		// the value is already wrapped in an object
		// this can happen if an exception is rethrown
		if (value && value instanceof ObjectType) {
			return value;
		}

		let instance;

		switch (typeName) {
			case "Null":
				return NULL;

			case "Undefined":
				return UNDEFINED;

			case "Symbol":
				instance = new SymbolType(value);
				break;

			case "String":
        if (this.instanceCache.has(value)) {
          return this.instanceCache.get(value);
        }
          
        this.instanceCache.set(value, instance = new StringType(value))
				break;

			case "Number":
			case "Boolean":
        if (this.instanceCache.has(value)) {
          return this.instanceCache.get(value);
        }
        
        this.instanceCache.set(value, instance = new PrimitiveType(value));
				break;

			case "Date":
				instance = new DateType(value);
				break;

			case "RegExp":
				instance = new RegexType(value);
				break;

			case "Array":
				instance = new ArrayType();
				break;

			case "Set":
			case "Map":
				instance = new CollectionType(typeName);
				break;

			case "Error":
			case "TypeError":
			case "ReferenceError":
			case "SyntaxError":
			case "RangeError":
			case "URIError":
			case "EvalError":
				instance = new ErrorType(value);

				if (value) {
					typeName = value.name || typeName;
					if (value.message) {
						let message = this.createPrimitive(value.message);
						instance.defineProperty("message", createDataPropertyDescriptor(message, {enumerable: false}));
					}
				}

				break;

			default:
				throw Error("Not a primitive: " + value);
		}

		instance.init(this.env);
		setProto(typeName, instance, this);
		return instance;
	}

	/**
	 * Creates an array object.
	 * @param {ObjectType[]} [elements] - If provided, the elements will be added to the new array.
	 * @returns {ArrayType} The array instance.
	 */
	createArray (elements) {
		let instance = this.create("Array");

		if (elements) {
			for (let i = 0, ln = elements.length; i < ln; i++) {
				instance.setIndex(i, elements[i]);
			}
		}

		return instance;
	}

	/**
	 * Creates an object.
	 * @param {ObjectType} [proto] - The prototype to use with the new object. If no value is provided
	 * the Object prototype will be used. If `null` is passed in, no prototype will be assigned to the
	 * new object.
	 * @returns {ObjectType} The object instance.
	 */
	createObject (proto) {
		let instance = new ObjectType();

		if (proto !== null) {
			if (proto) {
				instance.setPrototype(proto.getValue("prototype"));
			} else {
				setProto("Object", instance, this);
			}
		}

		instance.init(this.env);
		return instance;
	}

	createProxy (target, handler) {
		assertIsObject(target, "Proxy");
		assertIsObject(handler, "Proxy");

		if (target.isProxy && target.revoked) {
			throw TypeError();
		}

		if (handler.isProxy && handler.revoked) {
			throw TypeError();
		}

		let instance = new ProxyType(target, handler);
		instance.init(this.env);
		return instance;
	}

	createArguments (args, callee, strict) {
		let instance = new ArgumentType();
		let objectClass = this.env.global.getValue("Object");

		instance.init(this.env, objectClass, objectClass.getPrototype());
		instance.setPrototype(objectClass.getValue("prototype"));

		if (strict) {
			let thrower = this.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
			instance.defineProperty("callee", thrower);
			instance.defineProperty("caller", thrower);
		} else {
			instance.defineProperty("callee", {
				configurable: true,
				enumerable: false,
				value: callee,
				writable: true
			});
		}

		let stringTagKey = SymbolType.getByKey("toStringTag");
		if (stringTagKey) {
			instance.define(stringTagKey, this.createPrimitive("Arguments"));
		}

		return instance;
	}

	createIterator (iterable, proto) {
		let instance = new IteratorType(iterable);
		instance.init(this.env, proto);
		return instance;
	}

	createIteratorResult ({value, done = false}) {
		let instance = this.createObject();
		instance.defineProperty("done", {value: this.createPrimitive(done)});
		instance.defineProperty("value", {value: value || UNDEFINED});
		return instance;
	}
	
	*createArrayFromSpecies (obj, length) {
		let ctor = this.env.global.getValue("Array");
		if (obj && obj.className === "Array") {
			let speciesKey = SymbolType.getByKey("species");
			if (speciesKey) {
				let objCtor = obj.getValue("constructor");
				if (objCtor !== ctor) {
					let speciesCtor = objCtor.getValue(speciesKey);
					if (isConstructor(speciesCtor)) {
						ctor = speciesCtor;
					}
				}
			}
		}
		
		let lengthValue = this.createPrimitive(length);
		return yield ctor.construct(null, [lengthValue]);
	}

	*createFromSpeciesOrDefault (obj, defaultCtor, args) {
		args = args || [];
		
		let speciesKey = SymbolType.getByKey("species");
		if (speciesKey) {
			let ctor = obj.getValue("constructor");
			if (!isNullOrUndefined(ctor)) {
				let species = ctor.getValue(speciesKey);
				if (species) {
					return yield species.construct(null, args);
				}
			}
		}
		
		return yield defaultCtor.construct(null, args);
	}

	/**
	 * Creates a function instance.
	 * @param {AST|Function} fnOrNode - The AST or function to be used when the function is called.
	 * @param {ObjectType} [proto] - The prototype to use for the function. If no object is provided
	 * an empty object is used.
	 * @param {Object} [options] - Property values to be used for the prototype.
	 * @returns {FunctionType} The function instance.
	 */
	createFunction (fnOrNode, proto, {configurable = false, enumerable = false, writable = true, strict = false, isConstructor = false, name, homeObject, kind} = {}) {
		let instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode);
		} else {
			instance = new FunctionType(fnOrNode);
		}

		instance.init(this.env, proto, {configurable, enumerable, writable, isConstructor, strict, homeObject, kind}, strict);
		instance.name = name || "";
		
		if (name) {
			instance.defineProperty("name", {value: this.createPrimitive(name), configurable: true}, true);
		}
		
		setProto("Function", instance, this);
		return instance;
	}

	createClass (fnOrNode, proto, {name, homeObject} = {}) {
		return this.createFunction(fnOrNode, proto, {configurable: false, enumerable: false, writable: false, strict: true, isConstructor: true, kind: "classConstructor", name, homeObject});
	}

	createGetter (func, key) {
		return this.createBuiltInFunction(func, 0, `get ${key}`);
	}

	createSetter (func, key) {
		return this.createBuiltInFunction(func, 1, `set ${key}`);
	}

	/**
	 * Creates a function with no prototype that cannot be instantiated.
	 * @param {Function} func - The underlying function.
	 * @param {Number} length - The length property of the function.
	 * @param {String} funcName - The name of the function.
	 * @returns {NativeFunctionType} The function instance.
	 */
	createBuiltInFunction (func, length, funcName) {
		// todo: change this to route to standard createFunction method with appropriate presets
		let instance = new NativeFunctionType(function () {
			if (this.isNew) {
				throw TypeError(`${funcName} is not a constructor`);
			}

			return func.apply(this, arguments);
		});

		setProto("Function", instance, this);
		instance[Symbol.for("env")] = this.env;
		instance.builtIn = true;
		instance.canConstruct = false;
		instance.setLength(length);
		// instance.defineProperty("length", {value: this.createPrimitive(length), configurable: this.ecmaVersion > 5});

		let match = functionNameMatcher.exec(funcName);
		let name = match && match[1] || funcName;

		instance.defineProperty("name", {value: this.createPrimitive(name), configurable: true}, true);

		return instance;
	}

	createThrower (message, thrower) {
		this.throwers = this.throwers || Object.create(null);
		if (message in this.throwers) {
			return this.throwers[message];
		}

		thrower = thrower || function () {
			throw TypeError(message);
		};

		// we want to keep the same instance of the throwers because there
		// are silly tests that check for this
		let throwerInstance = this.createBuiltInFunction(thrower);
		return this.throwers[message] = {
			get: throwerInstance,
			getter: thrower,
			set: throwerInstance,
			setter: thrower,
			enumerable: false,
			configurable: false
		};
	}
}
