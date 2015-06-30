var PropertyDescriptor = require("./property-descriptor");
var ValueReference = require("./value-reference");

function ObjectType () {
	this.isPrimitive = false;
	this.type = "object";
	this.className = "Object";

	this.properties = Object.create(null);

	this.extensible = true;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	setProto: function (proto, descriptor) {
		if ("prototype" in this.properties && !this.properties.prototype.canSetValue()) {
			return;
		}

		this.proto = proto;
		this.properties.prototype = new PropertyDescriptor(descriptor || { configurable: true, enumerable: false, writable: true }, proto);
	},

	getProperty: function (name) {
		name = String(name);

		if (name === "prototype") {
			return this.getOwnProperty(name);
		}

		var current = this;

		while (current) {
			if (name in current.properties) {
				return current.properties[name];
			}

			current = current.parent && current.parent.proto;
		}

		return undefined;
	},

	getOwnProperty: function (name) {
		return this.properties[String(name)];
	},

	getOwnPropertyNames: function () {
		var props = [];
		for (var prop in this.properties) {
			// ignore prototype
			if (prop === "prototype" && this.properties[prop].getValue(this) === this.proto) {
				continue;
			}

			props.push(prop);
		}

		return props;
	},

	hasProperty: function (name) {
		return !!this.getProperty(String(name));
	},

	hasOwnProperty: function (name) {
		return String(name) in this.properties;
	},

	putValue: function (name, value, throwOnError) {
		if (this.isPrimitive) {
			return;
		}

		name = String(name);
		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		var descriptor = this.getProperty(name);
		if (descriptor) {
			if (!descriptor.canSetValue()) {
				if (throwOnError) {
					throw new TypeError("Cannot assign to read only property '" + name + "' of " + this.toString());
				}
				
				return;
			}

			if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
				this.properties[name] = new PropertyDescriptor(descriptor, value);
			} else {
				descriptor.setValue(this, value);
			}
		} else {
			this.defineOwnProperty(name, value, { configurable: true, enumerable: true, writable: true }, throwOnError);
		}
	},

	defineOwnProperty: function (name, value, descriptor, throwOnError) {
		if (this.isPrimitive) {
			if (throwOnError) {
				throw new TypeError("Cannot define property: " + name + ", object is not extensible");
			}

			return false;
		}

		// todo: obsolete the value arg
		if (value && descriptor && !descriptor.value) {
			descriptor.value = value;
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

		if (value && value.reference) {
			this.properties[name] = value;
		} else {
			this.properties[name] = new PropertyDescriptor(descriptor, value);
		}

		return true;
	},

	getValue: function (name) {
		var descriptor = this.getProperty(name);
		return descriptor && descriptor.getValue(this);
	},

	deleteProperty: function (name) {
		if (this.isPrimitive) {
			return false;
		}

		if (this.properties[name] && !this.properties[name].configurable) {
			return false;
		}

		return delete this.properties[name];
	},

	createReference: function (name) {
		name = String(name);
		var descriptor = this.getProperty(name);
		if (descriptor) {
			return new ValueReference(name, this, descriptor);
		}

		return undefined;
	},

	freeze: function () {
		for (var prop in this.properties) {
			if (this.properties[prop].dataProperty) {
				this.defineOwnProperty(prop, null, { writable: false, configurable: false }, true);
			} else {
				this.defineOwnProperty(prop, null, { configurable: false }, true);
			}
		}

		this.preventExtensions();
	},

	preventExtensions: function () {
		this.extensible = false;
	},

	seal: function () {
		for (var prop in this.properties) {
			this.defineOwnProperty(prop, null, { configurable: false }, true);
		}

		this.preventExtensions();
	},

	toBoolean: function () {
		return true;
	},

	toNumber: function () {
		return 0;
	},

	toString: function () {
		return "[" + this.type + "]";
	},

	valueOf: function () {
		return this;
	},

	"with": function (executionContext) {
		this.executionContext = executionContext;
		return this;
	},

	endWith: function () {
		this.executionContext = null;
	},

	equals: function (obj) {
		if (this.isPrimitive && obj.isPrimitive) {
			return this.value === obj.value;
		}

		return this === obj;
	}
};

module.exports = ObjectType;
