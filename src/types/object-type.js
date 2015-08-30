import PropertyDescriptor from "./property-descriptor";

export default class ObjectType {
	constructor () {
		this.isPrimitive = false;
		this.type = "object";
		this.className = "Object";
		this.properties = Object.create(null);
		this.extensible = true;

		this.primitiveHint = "number";
	}

	init (objectFactory, proto, descriptor) { }

	getPrototype () {
		return this.proto;
	}

	setPrototype (proto) {
		this.proto = proto;
	}

	getProperty (name) {
		name = String(name);

		let current = this;
		while (current) {
			if (name in current.properties) {
				return current.properties[name].bind(this);
			}

			current = current.getPrototype();
		}

		return undefined;
	}

	getOwnProperty (name) {
		return this.properties[String(name)];
	}

	getOwnPropertyNames () {
		return Object.keys(this.properties);
	}

	hasProperty (name) {
		return !!this.getProperty(name);
	}

	hasOwnProperty (name) {
		return String(name) in this.properties;
	}

	putValue (name, value, throwOnError, env) {
		if (this.isPrimitive) {
			return;
		}

		name = String(name);

		let descriptor = this.getProperty(name);
		if (descriptor) {
			if (!descriptor.canSetValue()) {
				if (throwOnError) {
					throw new TypeError(`Cannot assign to read only property '${name}' of %s`);
				}

				return;
			}

			if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
				this.properties[name] = new PropertyDescriptor(this, {
					value: value,
					configurable: descriptor.configurable,
					enumerable: descriptor.enumerable,
					writable: descriptor.writable
				});
			} else {
				descriptor.setValue(value);
			}
		} else {
			this.defineOwnProperty(name, { value: value, configurable: true, enumerable: true, writable: true }, throwOnError);
		}
	}

	defineOwnProperty (name, descriptor, throwOnError) {
		if (this.isPrimitive) {
			if (throwOnError) {
				throw new TypeError(`Cannot define property: ${name}, object is not extensible`);
			}

			return false;
		}

		let current = this.getOwnProperty(name);
		if (current) {
			if (current.canUpdate(descriptor)) {
				current.update(descriptor);
				return true;
			}

			if (throwOnError) {
				throw new TypeError(`Cannot redefine property: ${name}`);
			}

			return false;
		} else if (!this.extensible) {
			if (throwOnError) {
				throw new TypeError(`Cannot define property: ${name}, object is not extensible`);
			}

			return false;
		}

		this.properties[name] = new PropertyDescriptor(this, descriptor);
		return true;
	}

	deleteProperty (name, throwOnError) {
		if (this.isPrimitive) {
			return false;
		}

		if (name in this.properties) {
			if (!this.properties[name].configurable) {
				if (throwOnError) {
					throw new TypeError(`Cannot delete property: ${name}`);
				}
				
				return false;
			}
		}

		return delete this.properties[name];
	}

	define (name, value, descriptor) {
		// this method is intended for external usage only - it provides a way to define
		// methods and properties and overwrite any existing properties even if they are
		// not configurable
		descriptor = descriptor || { configurable: true, enumerable: false, writable: true };
		descriptor.value = value;

		this.properties[name] = new PropertyDescriptor(this, descriptor);
	}

	remove (name) {
		// this method is intended for external usage only - it provides a way to remove
		// properties even if they are not normally able to be deleted
		delete this.properties[name];
	}

	getValue (name) {
		if (name) {
			return this.getProperty(name).getValue();
		}

		return this;
	}

	freeze () {
		for (let prop in this.properties) {
			if (this.properties[prop].dataProperty) {
				this.defineOwnProperty(prop, { writable: false, configurable: false }, true);
			} else {
				this.defineOwnProperty(prop, { configurable: false }, true);
			}
		}

		this.preventExtensions();
	}

	preventExtensions () {
		this.extensible = false;
	}

	seal () {
		for (let prop in this.properties) {
			this.defineOwnProperty(prop, { configurable: false }, true);
		}

		this.preventExtensions();
	}

	equals (obj) {
		if (this.isPrimitive && obj.isPrimitive) {
			return this.value === obj.value;
		}

		return this === obj;
	}

	unwrap () {
		let unwrapped = {};
		let current = this;

		while (current) {
			for (let name in current.properties) {
				if (current.properties[name].enumerable && !(name in unwrapped)) {
					unwrapped[name] = current.getValue(name).unwrap();
				}
			}

			current = current.getPrototype();
		}

		return unwrapped;
	}
}
