var defaultOptions = {
	configurable: true,
	enumerable: true,
	writable: true
};

var configs = ["configurable", "enumerable", "writable"];

function ObjectType (parent) {
	this.isPrimitive = false;
	this.type = "object";
	this.parent = parent;

	this.writable = Object.create(null);
	this.enumerable = Object.create(null);
	this.configurable = Object.create(null);
	this.properties = Object.create(null);

	this.frozen = false;
	this.extensible = true;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	setProto: function (proto) {
		this.proto = this.properties.prototype = proto;
	},

	getPropertyDescriptor: function (name) {
		name = String(name);
		var current = this;

		while (current) {
			if (name in current.properties) {
				return {
					configurable: !!current.configurable[name],
					enumerable: !!current.enumerable[name],
					writable: !!current.writable[name],
					value: current.properties[name]
				};
			}

			current = current.parent && current.parent.proto;
		}

		return undefined;
	},

	hasProperty: function (name) {
		return String(name) in this.properties;
	},

	setProperty: function (name, value, options) {
		if (this.isPrimitive || this.frozen) {
			return;
		}

		name = String(name);

		var descriptor = this.getPropertyDescriptor(name);
		if (descriptor && !descriptor.writable) {
			return;
		}

		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		if (!descriptor) {
			if (!this.extensible) {
				return;
			}

			options = options || defaultOptions;
			var self = this;

			configs.forEach(function (prop) {
				if (!(prop in options) || options[prop]) {
					self[prop][name] = true;
				}
			});
		}

		this.properties[name] = value;
	},

	getProperty: function (name) {
		var descriptor = this.getPropertyDescriptor(name);
		return descriptor && descriptor.value;
	},

	deleteProperty: function (name) {
		name = String(name);
		if (this.isPrimitive || this.frozen || !(name in this.configurable)) {
			return false;
		}

		return delete this.properties[name];
	},

	freeze: function () {
		this.preventExtensions();
		this.frozen = true;
	},

	preventExtensions: function () {
		this.extensible = false;
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
