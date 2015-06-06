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

	setProto: function (proto) {
		this.proto = proto;
		this.properties.prototype = new PropertyDescriptor({ enumerable: false }, proto);
	},

	getPropertyDescriptor: function (name) {
		name = String(name);
		var current = this;

		while (current) {
			if (name in current.properties) {
				return current.properties[name];
			}

			current = current.proto;
		}

		// check parent
		if (this.parent) {
			return this.parent.getPropertyDescriptor(name);
		}

		return undefined;
	},

	hasProperty: function (name) {
		return !!this.getPropertyDescriptor(name);
	},

	hasOwnProperty: function (name) {
		return name in this.properties;
	},

	setProperty: function (name, value, options) {
		if (this.isPrimitive || this.frozen) {
			return;
		}

		name = String(name);
		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		var descriptor = this.getPropertyDescriptor(name);
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
			this.defineProperty(name, value, options);
		}
	},

	defineProperty: function (name, value, descriptor) {
		if (this.isPrimitive || !this.extensible) {
			return;
		}

		if (value && value.reference) {
			this.properties[name] = value;
		} else {
			this.properties[name] = new PropertyDescriptor(descriptor, value);
		}
	},

	getProperty: function (name) {
		var descriptor = this.getPropertyDescriptor(name);
		return descriptor && descriptor.getValue(this);
	},

	deleteProperty: function (name) {
		name = String(name);
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
		var descriptor = this.getPropertyDescriptor(name);
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
