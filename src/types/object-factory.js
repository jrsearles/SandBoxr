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

export class ObjectFactory {
	constructor (env) {
		this.env = env;
	}

	init () {
		setOrphans(this.env);
	}

	createPrimitive (value) {
		return this.create(contracts.getType(value), value);
	}

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
				instance = new ErrorType(value);

				if (value) {
					typeName = value.name || typeName;
					instance.defineOwnProperty("message", {
						value: this.createPrimitive(value.message),
						configurable: true,
						enumerable: false,
						writable: true
					});
				}

				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.env);
		return instance;
	}

	createArray (elements) {
		let instance = this.create("Array");

		if (elements) {
			for (let i = 0, ln = elements.length; i < ln; i++) {
				instance.putValue(i, elements[i], true, this.env);
			}

			instance.putValue("length", this.create("Number", elements.length), true, this.env);
		}

		return instance;
	}

	createObject (parent) {
		let instance = new ObjectType();

		if (parent !== null) {
			if (parent) {
				instance.setPrototype(parent.getValue("prototype"));
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

	createFunction (fnOrNode, proto, descriptor, strict) {
		let instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode);
		} else {
			instance = new FunctionType(fnOrNode);
		}

		instance.init(this, proto, descriptor, strict);

		setProto("Function", instance, this.env);
		// let functionClass = this.env.getReference("Function");
		// if (functionClass && !functionClass.isUnresolved()) {
		// 	instance.setPrototype(functionClass.getValue().getValue("prototype"));
		// }

		return instance;
	}

	createBuiltInFunction (fn, length, methodName) {
		let instance = new NativeFunctionType(function () {
			if (this.isNew) {
				throw new TypeError(methodName + " is not a constructor");
			}

			return fn.apply(this, arguments);
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
