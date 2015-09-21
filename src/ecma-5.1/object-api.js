import {ObjectType} from "../types/object-type";
import {toString,toBoolean,toObject} from "../utils/native";
import * as contracts from "../utils/contracts";
import {execute as exec, call} from "../utils/func";

function isObject (obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

function* defineProperty (env, obj, name, descriptor) {
	if (!isObject(descriptor)) {
		let stringValue = yield toString(env, descriptor);
		throw new TypeError(`Property description must be an object: ${stringValue}`);
	}

	let undef = env.global.getValue("undefined");
	let options = {};

	if (descriptor) {
		let hasValue = descriptor.hasProperty("value");
		let hasGetter = descriptor.hasProperty("get");
		let hasSetter = descriptor.hasProperty("set");

		if ((hasValue || descriptor.hasProperty("writable")) && (hasGetter || hasSetter)) {
			throw new TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");
		}

		["writable", "enumerable", "configurable"].forEach(function (prop) {
			if (descriptor.hasProperty(prop)) {
				let attrValue = descriptor.getValue(prop);
				options[prop] = toBoolean(attrValue);
			}
		});

		let currentScope = env.current.scope;

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (hasGetter) {
			let getter = descriptor.getValue("get") || undef;
			if (getter.isPrimitive && getter.value === undefined) {
				options.get = options.getter = undefined;
			} else {
				if (getter.className !== "Function") {
					let stringValue = yield toString(env, getter);
					throw new TypeError(`Getter must be a function: ${stringValue}`);
				}

				options.get = getter;
				options.getter = function* () {
					let scope = env.setScope(currentScope);
					let thisArg = getter.isStrict() ? this : toObject(env, this);

					return yield scope.use(function* () {
						let getResult = yield call(env, getter, getter.node.params, [], thisArg, getter.node);
						return getResult && getResult.exit ? getResult.result.getValue() : undef;
					});
				};
			}
		}

		if (hasSetter) {
			let setter = descriptor.getValue("set") || undef;
			if (setter.isPrimitive && setter.value === undefined) {
				options.set = options.setter = undefined;
			} else {
				if (setter.className !== "Function") {
					let stringValue = yield toString(env, setter);
					throw new TypeError(`Setter must be a function: ${stringValue}`);
				}

				options.set = setter;
				options.setter = function* (value) {
					let scope = env.setScope(currentScope);
					let thisArg = setter.isStrict() ? this : toObject(env, this);

					return yield scope.use(function* () {
						yield exec(env, setter, setter.node.params, [value], thisArg, setter.node);
						return undef;
					});
				};
			}
		}

		if (hasValue) {
			options.value = descriptor.getValue("value") || undef;
		}
	}

	obj.defineOwnProperty(name, options, true, env);
}

export default function objectApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;
	const undef = globalObject.getValue("undefined");

	let proto = new ObjectType();
	let objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				if (value.value == null) {
					return objectFactory.createObject();
				}

				let objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				return objectWrapper;
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	}, proto, { configurable: false, enumerable: false, writable: false });

	proto.define("hasOwnProperty", objectFactory.createBuiltInFunction(function* (name) {
		name = yield toString(env, name);
		return objectFactory.createPrimitive(name in this.node.properties);
	}, 1, "Object.prototype.hasOwnProperty"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		return toObject(env, this.node);
	}, 0, "Object.prototype.valueOf"));

	let toStringFunc = objectFactory.createBuiltInFunction(function () {
		let className = this.node ? this.node.className : "Undefined";
		return objectFactory.createPrimitive(`[object ${className}]`);
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	proto.define("toString", toStringFunc);
	proto.define("toLocaleString", toStringFunc);

	proto.define("isPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		let current = obj;
		while (current) {
			if (this.node === current) {
				return objectFactory.createPrimitive(true);
			}

			current = current.getPrototype();
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Object.isPrototypeOf"));

	proto.define("propertyIsEnumerable", objectFactory.createBuiltInFunction(function* (name) {
		name = yield toString(env, name);
		let descriptor = this.node.getOwnProperty(name);
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"));

	objectClass.define("create", objectFactory.createBuiltInFunction(function* (parent, descriptors) {
		if (parent && parent.isPrimitive && parent.value !== null) {
			let stringValue = yield toString(env, parent);
			return this.throw(new TypeError(`Object prototype may only be an Object or null: ${stringValue}`));
		}

		if (descriptors && descriptors.isPrimitive && descriptors.value === null) {
			return this.throw(new TypeError("Cannot null or undefined to object"));
		}

		let obj = objectFactory.createObject();

		if (parent) {
			obj.setPrototype(parent);
		}

		if (descriptors) {
			for (let prop in descriptors.properties) {
				if (descriptors.properties[prop].enumerable) {
					yield defineProperty(env, obj, prop, descriptors.getValue(prop));
				}
			}
		}

		return obj;
	}, 2, "Object.create"));

	objectClass.define("defineProperty", objectFactory.createBuiltInFunction(function* (obj, prop, descriptor) {
		contracts.assertIsObject(obj, "Object.defineProperty");

		yield defineProperty(env, obj, yield toString(env, prop), descriptor);
		return obj;
	}, 3, "Object.defineProperty"));

	objectClass.define("defineProperties", objectFactory.createBuiltInFunction(function* (obj, descriptors) {
		contracts.assertIsObject(obj, "Object.defineProperties");
		contracts.assertArgIsNotNullOrUndefined(descriptors);

		for (let prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				yield defineProperty(env, obj, prop, descriptors.getValue(prop));
			}
		}

		return obj;
	}, 2, "Object.defineProperties"));

	objectClass.define("getOwnPropertyDescriptor", objectFactory.createBuiltInFunction(function* (obj, prop) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyDescriptor");

		prop = yield toString(env, prop);

		if (obj.hasOwnProperty(prop)) {
			let descriptor = obj.getProperty(prop);

			let result = objectFactory.createObject();
			result.putValue("configurable", objectFactory.createPrimitive(descriptor.configurable), false,env );
			result.putValue("enumerable", objectFactory.createPrimitive(descriptor.enumerable), false, env);

			if (descriptor.dataProperty) {
				result.putValue("value", descriptor.value, false, env);
				result.putValue("writable", objectFactory.createPrimitive(descriptor.writable), false, env);
			} else {
				result.putValue("get", descriptor.get || undef, false, env);
				result.putValue("set", descriptor.set || undef, false, env);
			}

			return result;
		}

		return undef;
	}, 2, "Object.getOwnPropertyDescriptor"));

	objectClass.define("keys", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj);

		let arr = objectFactory.create("Array");
		let index = 0;

		for (let name in obj.properties) {
			if (obj.properties[name].enumerable) {
				let value = objectFactory.createPrimitive(name);
				arr.defineOwnProperty(index++, { configurable: true, enumerable: true, writable: true, value }, false, env);
			}
		}

		return arr;
	}, 1, "Object.keys"));

	objectClass.define("getOwnPropertyNames", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyNames");

		let arr = objectFactory.create("Array");
		obj.getOwnPropertyNames().forEach(function (name, index) {
			arr.putValue(index, objectFactory.createPrimitive(name), true, env);
		});

		return arr;
	}, 1, "Object.getOwnPropertyNames"));

	objectClass.define("getPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getPrototypeOf");

		let objProto = obj.getPrototype();
		return objProto || env.global.getValue("null");
	}, 1, "Object.getPrototypeOf"));

	objectClass.define("freeze", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.freeze");
		obj.freeze();
		return obj;
	}, 1, "Object.freeze"));

	objectClass.define("isFrozen", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isFrozen");

		if (obj.isPrimitive) {
			return objectFactory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (let prop in obj.properties) {
				if (obj.properties[prop].writable || obj.properties[prop].configurable) {
					return objectFactory.createPrimitive(false);
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isFrozen"));

	objectClass.define("preventExtensions", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.preventExtensions");

		obj.preventExtensions();
		return obj;
	}, 1, "Object.preventExtensions"));

	objectClass.define("isExtensible", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isExtensible");

		return objectFactory.createPrimitive(obj.extensible);
	}, 1, "Object.isExtensible"));

	objectClass.define("seal", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.seal");

		obj.seal();
		return obj;
	}, 1, "Object.seal"));

	objectClass.define("isSealed", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isSealed");

		if (!obj.extensible) {
			for (let prop in obj.properties) {
				if (obj.properties[prop].configurable) {
					return objectFactory.createPrimitive(false);
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"));

	// function is an object - make sure that it is in the prototype chain
	globalObject.getValue("Function").getPrototype().setPrototype(proto);
	globalObject.define("Object", objectClass);
}
