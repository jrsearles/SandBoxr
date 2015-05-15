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
	this.accessors = Object.create(null);

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
					configurable: name in current.configurable,
					enumerable: name in current.enumerable,
					writable: name in current.writable,
					value: current.properties[name],
					get: current.accessors[name] && current.accessors[name].get,
					set: current.accessors[name] && current.accessors[name].set
				};
			}

			current = current.parent && current.parent.proto;
		}

		return undefined;
	},

	hasProperty: function (name) {
		return !!this.getPropertyDescriptor(name);
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
		if (descriptor && !descriptor.writable) {
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

			if (options.getter || options.setter) {
				Object.defineProperty(this.properties, name, {
					enumerable: true,
					configurable: true,
					get: options.getter,
					set: options.setter
				});

				// keep original around for `getOwnPropertyDescriptor`
				this.accessors[name] = {
					get: options.get,
					set: options.set
				};

				return;
			}
		}

		this.properties[name] = value;
	},

	getProperty: function (name) {
		var descriptor = this.getPropertyDescriptor(name);
		return descriptor && descriptor.value;
	},

	deleteProperty: function (name) {
		name = String(name);
		if (this.isPrimitive || this.frozen) {
			return false;
		}

		if (name in this.properties && !(name in this.configurable)) {
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
