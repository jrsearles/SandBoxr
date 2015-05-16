var configs = ["configurable", "enumerable", "writable"];

function configureAccessor (obj, name, descriptor) {
	Object.defineProperty(obj.properties, name, {
		enumerable: true,
		configurable: true,
		get: descriptor.getter,
		set: descriptor.setter
	});

	// keep original around for `getOwnPropertyDescriptor`
	obj.accessors[name] = {
		get: descriptor.get,
		getter: descriptor.getter,
		set: descriptor.set,
		setter: descriptor.setter
	};
}

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
					configurable: current.configurable[name],
					enumerable: current.enumerable[name],
					writable: current.writable[name],
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
		if (descriptor && options) {
			this.updateProperty(name, options, descriptor);
			return;
		}

		if (!descriptor) {
			this.setupProperty(name, value, options);
			return;
		}

		if (descriptor.writable) {
			this.properties[name] = value;
		}
	},

	setupProperty: function (name, value, descriptor) {
		if (this.isPrimitive || this.frozen || !this.extensible) {
			return;
		}

		descriptor = descriptor || {};

		var self = this;
		configs.forEach(function (prop) {
			descriptor[prop] = prop in descriptor ? descriptor[prop] : true;
			self[prop][name] = descriptor[prop];
		});

		if (descriptor.getter || descriptor.setter) {
			configureAccessor(this, name, descriptor);
		} else {
			this.properties[name] = descriptor.value || value;
		}
	},

	updateProperty: function (name, descriptor, priorDescriptor) {
		priorDescriptor = priorDescriptor || this.getPropertyDescriptor(name);

		if (descriptor.setter || descriptor.getter) {
			configureAccessor(this, name, descriptor);
		} else if (descriptor.value) {
			delete this.accessors[name];
			this.writable[name] = descriptor.writable;
			Object.defineProperty(this.properties, name, {
				configurable: true,
				enumerable: true,
				value: descriptor.value
			});
		}
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

		if (name in this.properties && !this.configurable[name]) {
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
