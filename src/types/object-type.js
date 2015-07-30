var PropertyDescriptor = require("./property-descriptor");

function ObjectType () {
	this.isPrimitive = false;
	this.type = "object";
	this.className = "Object";
	this.properties = Object.create(null);
	this.extensible = true;

	this.primitiveHint = "number";
}

ObjectType.prototype = ObjectType.fn = {
	constructor: ObjectType,

	init: function () { },

	getPrototype: function () {
		return this.proto;
	},

	setPrototype: function (proto) {
		this.proto = proto;
	},

	getProperty: function (name) {
		name = String(name);

		var current = this;
		while (current) {
			if (name in current.properties) {
				return current.properties[name].bind(this);
			}

			current = current.getPrototype();
		}

		return undefined;
	},

	getOwnProperty: function (name) {
		return this.properties[String(name)];
	},

	getOwnPropertyNames: function () {
		return Object.keys(this.properties);
	},

	hasProperty: function (name) {
		return !!this.getProperty(name);
	},

	hasOwnProperty: function (name) {
		return String(name) in this.properties;
	},

	putValue: function (name, value, throwOnError) {
		if (this.isPrimitive) {
			return;
		}

		name = String(name);

		var descriptor = this.getProperty(name);
		if (descriptor) {
			if (!descriptor.canSetValue()) {
				if (throwOnError) {
					throw new TypeError("Cannot assign to read only property '" + name + "' of %s");
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
	},

	defineOwnProperty: function (name, descriptor, throwOnError) {
		if (this.isPrimitive) {
			if (throwOnError) {
				throw new TypeError("Cannot define property: " + name + ", object is not extensible");
			}

			return false;
		}

		var current = this.getOwnProperty(name);
		if (current) {
			if (current.canUpdate(descriptor)) {
				current.update(descriptor);
				return true;
			}

			if (throwOnError) {
				throw new TypeError("Cannot redefine property: " + name);
			}

			return false;
		} else if (!this.extensible) {
			if (throwOnError) {
				throw new TypeError("Cannot define property: " + name + ", object is not extensible");
			}

			return false;
		}

		this.properties[name] = new PropertyDescriptor(this, descriptor);
		return true;
	},

	define: function (name, value, descriptor) {
		// this method is intended for external usage only - it provides a way to define
		// methods and properties and overwrite any existing properties even if they are
		// not configurable
		descriptor = descriptor || { configurable: true, enumerable: false, writable: true };
		descriptor.value = value;

		this.properties[name] = new PropertyDescriptor(this, descriptor);
	},

	remove: function (name) {
		// this method is intended for external usage only - it provides a way to remove
		// properties even if they are not normally able to be deleted
		delete this.properties[name];
	},

	getValue: function (name) {
		if (name) {
			return this.getProperty(name).getValue();
		}

		return this;
	},

	deleteProperty: function (name) {
		if (this.isPrimitive) {
			return false;
		}

		if (name in this.properties) {
			if (!this.properties[name].configurable) {
				return false;
			}
		}

		return delete this.properties[name];
	},

	freeze: function () {
		for (var prop in this.properties) {
			if (this.properties[prop].dataProperty) {
				this.defineOwnProperty(prop, { writable: false, configurable: false }, true);
			} else {
				this.defineOwnProperty(prop, { configurable: false }, true);
			}
		}

		this.preventExtensions();
	},

	preventExtensions: function () {
		this.extensible = false;
	},

	seal: function () {
		for (var prop in this.properties) {
			this.defineOwnProperty(prop, { configurable: false }, true);
		}

		this.preventExtensions();
	},

	equals: function (obj) {
		if (this.isPrimitive && obj.isPrimitive) {
			return this.value === obj.value;
		}

		return this === obj;
	},

	unwrap: function () {
		var unwrapped = {};
		var current = this;
		while (current) {
			for (var name in current.properties) {
				if (current.properties[name].enumerable && !(name in unwrapped)) {
					unwrapped[name] = current.getValue(name).unwrap();
				}
			}

			current = current.getPrototype();
		}

		return unwrapped;
	}
};

module.exports = ObjectType;
