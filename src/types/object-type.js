import {areSame} from "../utils/operators";
import {PropertyDescriptor} from "./property-descriptor";
const integerMatcher = /^\n+$/;

function isSymbol (key) {
	return key && typeof key === "object" && key.isSymbol;
}

function getPropertySource (key) {
	return isSymbol(key) ? "symbols" : "properties";
}

function* propertyIterator (env, obj) {
	let visited = Object.create(null);
	let objectFactory = env.objectFactory;

	let current = obj;
	while (current) {
		let keys = current.getOwnPropertyKeys("String");

		for (let key of keys) {
			let desc = current.getProperty(key);
			if (desc) {
				if (desc.enumerable && !(key in visited)) {
					let value = objectFactory.createPrimitive(key);
					yield objectFactory.createIteratorResult({value});
				}

				visited[key] = true;
			}
		}

		current = current.getPrototype();
	}

	return objectFactory.createIteratorResult({done: true});
}

function propertyKeyComparer (a, b) {
	if (integerMatcher.test(a)) {
		if (integerMatcher.test(b)) {
			return a - b;
		}

		return 1;
	}

	if (integerMatcher.test(b)) {
		return -1;
	}

	return 0;
}

export class ObjectType {
	constructor () {
		this.isPrimitive = false;
		this.type = "object";
		this.className = "Object";
		this.extensible = true;
		this.properties = Object.create(null);
		this.symbols = Object.create(null);

		this.version = 0;
		this.primitiveHint = "number";
	}

	init (env, proto, descriptor, strict) {
		this[Symbol.for("env")] = env;
	}

	getPrototype () {
		return this.proto;
	}

	setPrototype (proto) {
		if (this.proto === proto) {
			return true;
		}

		if (!this.isExtensible()) {
			return false;
		}

		// check whether prototype chain already includes object
		let current = proto;
		while (current) {
			if (current === this) {
				return false;
			}

			current = current.getPrototype();
		}

		this.proto = proto;
		this.version++;

		return true;
	}

	getProperty (key, receiver) {
		receiver = receiver || this;

		let localKey = String(key);
		let source = getPropertySource(key);

		if (localKey in this[source]) {
			return this[source][localKey].bind(receiver);
		}

		let current = this.getPrototype();
		if (current) {
			return current.getProperty(key, receiver);
		}

		return undefined;
	}

	getOwnProperty (key) {
		return this[getPropertySource(key)][String(key)];
	}

	getOwnPropertyKeys (keyType) {
		let keys = [];

		if (keyType !== "Symbol") {
			// note: this uses native sort which may not be stable
			keys = Object.keys(this.properties).sort(propertyKeyComparer);
		}

		if (keyType !== "String") {
			for (let key in this.symbols) {
				keys.push(this.symbols[key].key);
			}
		}

		return keys;
	}

	isExtensible () {
		return this.extensible;
	}

	getIterator () {
		let env = this[Symbol.for("env")];
		return env.objectFactory.createIterator(propertyIterator(env, this));
	}

	has (key) {
		if (String(key) in this[getPropertySource(key)]) {
			return true;
		}

		let current = this.getPrototype();
		if (current) {
			return current.has(key);
		}

		return false;
	}

	owns (key) {
		return String(key) in this[getPropertySource(key)];
	}

	setValue (key, value, receiver) {
		receiver = receiver || this;

		let descriptor = this.getProperty(key);
		if (descriptor) {
			if (this !== receiver && receiver.owns(key)) {
				let receiverDescriptor = receiver.getProperty(key);
				if (!receiverDescriptor.dataProperty) {
					return false;
				}

				descriptor = receiverDescriptor;
			}

			if (descriptor.hasValue() && receiver.owns(key) && areSame(descriptor.getValue(), value)) {
				return true;
			}

			if (descriptor.initialized && !descriptor.canSetValue()) {
				return false;
			}

			if (!descriptor.dataProperty) {
				descriptor.bind(receiver);
				descriptor.setValue(value);
				return true;
			}

			if (!descriptor.canUpdate({value})) {
				return false;
			}

			if (!receiver.owns(key)) {
				return receiver.defineOwnProperty(key, {
					value: value,
					configurable: true,
					enumerable: true,
					writable: true
				}, false);
			}

			descriptor.setValue(value);
			return true;
		}

		return receiver.defineOwnProperty(key, {
			value: value,
			configurable: true,
			enumerable: true,
			writable: true
		}, false);
	}

	// putValue (key, value, throwOnError) {
	// 	if (this.isPrimitive) {
	// 		return;
	// 	}

	// 	let descriptor = this.getProperty(key);
	// 	if (descriptor) {
	// 		if (!descriptor.canSetValue()) {
	// 			if (throwOnError) {
	// 				throw TypeError(`Cannot assign to read only property '${key}'`);
	// 			}

	// 			return;
	// 		}

	// 		if (descriptor.dataProperty && !this.owns(key)) {
	// 			this[getPropertySource(key)][String(key)] = new PropertyDescriptor(this, {
	// 				value: value,
	// 				configurable: descriptor.configurable,
	// 				enumerable: descriptor.enumerable,
	// 				writable: descriptor.writable
	// 			}, key);

	// 			this.version++;
	// 		} else {
	// 			descriptor.setValue(value);
	// 		}
	// 	} else {
	// 		this.defineOwnProperty(key, {value: value, configurable: true, enumerable: true, writable: true}, throwOnError);
	// 	}
	// }

	defineOwnProperty (key, descriptor, throwOnError) {
		if (this.isPrimitive) {
			if (throwOnError) {
				throw TypeError(`Cannot define property: ${key}, object is not extensible`);
			}

			return false;
		}

		let current = this.getOwnProperty(key);
		if (current) {
			if (current.canUpdate(descriptor)) {
				current.update(descriptor);
				return true;
			}

			if (throwOnError) {
				throw TypeError(`Cannot redefine property: ${key}`);
			}

			return false;
		} else if (!this.extensible) {
			if (throwOnError) {
				throw TypeError(`Cannot define property: ${key}, object is not extensible`);
			}

			return false;
		}

		this[getPropertySource(key)][String(key)] = new PropertyDescriptor(this, descriptor, key);
		this.version++;
		return true;
	}

	deleteProperty (key, throwOnError) {
		if (this.isPrimitive) {
			return false;
		}

		let source = getPropertySource(key);
		key = String(key);

		if (key in this[source]) {
			if (!this[source][key].configurable) {
				if (throwOnError) {
					throw TypeError(`Cannot delete property: ${key}`);
				}

				return false;
			}
		}

		this.version++;
		return delete this[source][key];
	}

	define (key, value, {configurable = true, enumerable = false, writable = true, getter, get, setter, set} = {}) {
		// this method is intended for external usage only - it provides a way to define
		// methods and properties and overwrite any existing properties even if they are
		// not configurable

		let descriptor;
		if (getter || setter) {
			descriptor = {getter, get, setter, set, configurable, enumerable};
		}	else {
			descriptor = {value, configurable, enumerable, writable};
		}

		this[getPropertySource(key)][String(key)] = new PropertyDescriptor(this, descriptor, key);
		this.version++;
	}

	remove (key) {
		// this method is intended for external usage only - it provides a way to remove
		// properties even if they are not normally able to be deleted
		delete this[getPropertySource(key)][String(key)];
		this.version++;
	}

	getValue (key) {
		if (arguments.length > 0) {
			let property = this.getProperty(key);
			return property && property.getValue();
		}

		return this;
	}

	each (func) {
		["properties", "symbols"].forEach(source => {
			for (let key in this[source]) {
				func(this[source][key]);
			}
		});
	}

	freeze () {
		this.each(desc => {
			if (desc.dataProperty) {
				this.defineOwnProperty(desc.key, {writable: false, configurable: false});
			} else {
				this.defineOwnProperty(desc.key, {configurable: false});
			}
		});

		this.preventExtensions();
	}

	preventExtensions () {
		this.extensible = false;
		return true;
	}

	seal () {
		this.each(desc => {
			this.defineOwnProperty(desc.key, {configurable: false}, true);
		});

		this.preventExtensions();
	}

	toNative () {
		let unwrapped = {};
		let current = this;

		while (current) {
			for (let name in current.properties) {
				if (current.properties[name].enumerable && !(name in unwrapped)) {
					unwrapped[name] = current.getValue(name).toNative();
				}
			}

			current = current.getPrototype();
		}

		return unwrapped;
	}
}
