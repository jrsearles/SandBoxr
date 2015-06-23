var PropertyDescriptor = require("./property-descriptor");
var ValueReference = require("./value-reference");

function ObjectType () {
	this.isPrimitive = false;
	this.type = "object";
	this.className = "Object";

	this.properties = Object.create(null);

	this.frozen = false;
	this.extensible = true;
	this.sealed = false;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	setProto: function (proto, descriptor) {
		if ("prototype" in this.properties && !this.properties.prototype.canSetValue()) {
			return;
		}

		this.proto = proto;
		this.properties.prototype = new PropertyDescriptor(descriptor || { enumerable: false }, proto);
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

			// current = current.proto;
			current = current.parent && current.parent.proto;  // current.proto;
		}

		// check parent
		// if (this.parent && this.parent.proto) {
		// 	return this.parent.getProperty(name);
		// }

		return undefined;
	},

	getOwnProperty: function (name) {
		return this.properties[String(name)];
	},

	hasProperty: function (name) {
		name = String(name);
		return this.hasOwnProperty(name) || !!this.getProperty(name);
	},

	hasOwnProperty: function (name) {
		return String(name) in this.properties;
	},

	putValue: function (name, value, options) {
		if (this.isPrimitive || this.frozen) {
			return;
		}

		name = String(name);
		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		var descriptor = this.getProperty(name);
		if (descriptor && options) {
			descriptor.update(options);
		}

		if (descriptor) {
			if (!descriptor.canSetValue()) {
				return;
			}

			if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
				this.properties[name] = new PropertyDescriptor(descriptor, value);
			} else {
				descriptor.setValue(this, value);
			}
		} else {
			this.defineOwnProperty(name, value, options);
		}
	},

	defineOwnProperty: function (name, value, descriptor) {
		if (this.isPrimitive || !this.extensible) {
			return;
		}

		if (value && value.reference) {
			this.properties[name] = value;
		} else {
			this.properties[name] = new PropertyDescriptor(descriptor, value);
		}
	},

	getValue: function (name) {
		var descriptor = this.getProperty(name);
		return descriptor && descriptor.getValue(this);
	},

	deleteProperty: function (name) {
		if (this.isPrimitive || this.sealed) {
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
		this.preventExtensions();
		this.seal();
		this.frozen = true;
	},

	preventExtensions: function () {
		this.extensible = false;
	},

	seal: function () {
		this.preventExtensions();
		this.sealed = true;
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

	equals: function (obj) {
		if (this.isPrimitive && obj.isPrimitive) {
			return this.value === obj.value;
		}

		return this === obj;
	}
};

module.exports = ObjectType;
