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

	hasProperty: function (name) {
		return name in this.properties;
	},

	setProperty: function (name, value, options) {
		if (this.isPrimitive || this.frozen) {
			return;
		}

		if (!(name in this.properties)) {
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
		if (name in this.properties) {
			return this.properties[name];
		}

		if (this.parent && this.parent.proto) {
			return this.parent.proto.getProperty(name);
		}

		return undefined;
	},

	deleteProperty: function (name) {
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
