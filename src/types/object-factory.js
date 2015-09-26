import {ObjectType} from "./object-type";
import {PrimitiveType,UNDEFINED,NULL} from "./primitive-type";
import {FunctionType} from "./function-type";
import {NativeFunctionType} from "./native-function-type";
import {RegexType} from "./regex-type";
import {ArrayType} from "./array-type";
import {StringType} from "./string-type";
import {DateType} from "./date-type";
import {ErrorType} from "./error-type";
import {ArgumentType} from "./argument-type";
import * as contracts from "../utils/contracts";

let orphans = Object.create(null);

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

function setProto (typeName, instance, env) {
	let parent = env.getReference(typeName);
	if (parent.isUnresolved()) {
		// during initialization it is possible for objects to be created
		// before the types have been registered - add a registry of items
		// and these can be filled in when the type is registered
		orphans[typeName] = orphans[typeName] || [];
		orphans[typeName].push(instance);

		return;
	}

	let proto = parent.getValue().getValue("prototype");
	instance.setPrototype(proto);
}

function createDataPropertyDescriptor (value, { configurable = true, enumerable = true, writable = true }) {
	return { value, configurable, enumerable, writable };
}

export class ObjectFactory {
	constructor (env) {
		this.env = env;
	}

	init () {
		setOrphans(this.env);
	}

	/**
	 * Creates a primitive object based on the provided native value.
	 * @param {any} value - The primitive value.
	 * @returns {ObjectType} The primitive instance.
	 */
	createPrimitive (value) {
		return this.create(contracts.getType(value), value);
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

			case "String":
				instance = new StringType(value);
				break;

			case "Number":
			case "Boolean":
				instance = new PrimitiveType(value);
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
						instance.defineOwnProperty("message", createDataPropertyDescriptor(message, { enumerable: false }));
					}
				}

				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.env);
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
				instance.defineOwnProperty(i, createDataPropertyDescriptor(elements[i]), true, this.env);
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
				setProto("Object", instance, this.env);
			}
		}

		instance.init(this);
		return instance;
	}

	createArguments (args, callee, strict) {
		let instance = new ArgumentType();
		let objectClass = this.env.global.getValue("Object");

		instance.init(this, objectClass, objectClass.getPrototype());
		instance.setPrototype(objectClass.getValue("prototype"));

		if (strict) {
			let thrower = this.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
			instance.defineOwnProperty("callee", thrower);
			instance.defineOwnProperty("caller", thrower);
		} else {
			instance.defineOwnProperty("callee", {
				configurable: true,
				enumerable: false,
				value: callee,
				writable: true
			});
		}

		return instance;
	}

	/**
	 * Creates a function instance.
	 * @param {AST|Function} fnOrNode - The AST or function to be used when the function is called.
	 * @param {ObjectType} [proto] - The prototype to use for the function. If no object is provided
	 * an empty object is used.
	 * @param {Object} [descriptor] - Property values to be used for the prototype.
	 * @param {Boolean} [strict] - Indicates whether the function is in stict mode.
	 * @returns {FunctionType} The function instance.
	 */
	createFunction (fnOrNode, proto, descriptor, strict) {
		let instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode);
		} else {
			instance = new FunctionType(fnOrNode);
		}

		instance.init(this, proto, descriptor, strict);
		setProto("Function", instance, this.env);
		return instance;
	}

	/**
	 * Creates a function with no prototype that cannot be instantiated.
	 * @param {Function} func - The underlying function.
	 * @param {Number} length - The length property of the function.
	 * @param {String} funcName - The name of the function.
	 * @returns {NativeFunctionType} The function instance.
	 */
	createBuiltInFunction (func, length, funcName) {
		let instance = new NativeFunctionType(function () {
			if (this.isNew) {
				throw new TypeError(`${funcName} is not a constructor`);
			}

			return func.apply(this, arguments);
		});

		setProto("Function", instance, this.env);
		instance.builtIn = true;
		instance.defineOwnProperty("length", { value: this.createPrimitive(length), configurable: false, enumerable: false, writable: false });
		return instance;
	}

	createThrower (message, thrower) {
		this.throwers = this.throwers || Object.create(null);
		if (message in this.throwers) {
			return this.throwers[message];
		}

		thrower = thrower || function () {
			throw new TypeError(message);
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
