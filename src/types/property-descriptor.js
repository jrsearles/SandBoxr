var contracts = require("../utils/contracts");

var defaultDescriptor = {
	configurable: true,
	enumerable: true,
	writable: true
};

function PropertyDescriptor (config, value) {
	config = config || defaultDescriptor;
	this.configurable = config.configurable || false;
	this.enumerable = config.enumerable || false;

	if ("get" in config || "set" in config) {
		this.dataProperty = false;
		this.get = config.get;
		this.getter = config.getter;
		this.set = config.set;
		this.setter = config.setter;
	} else {
		this.writable = config.writable || false;
		this.dataProperty = true;
		this.value = value || config.value;
	}
}

PropertyDescriptor.prototype.update = function (descriptor) {
	for (var prop in descriptor) {
		if (descriptor.hasOwnProperty(prop)) {
			this[prop] = descriptor[prop];
		}
	}

	if ("get" in descriptor || "set" in descriptor) {
		this.writable = undefined;
		this.dataProperty = false;
		this.value = undefined;
	} else if ("value" in descriptor) {
		this.writable = this.writable === undefined ? false : this.writable;
		this.dataProperty = true;
		this.get = this.getter = this.set = this.setter = undefined;
	}
};

PropertyDescriptor.prototype.canUpdate = function (descriptor) {
	if (this.configurable) {
		return true;
	}

	if ("configurable" in descriptor && this.configurable !== descriptor.configurable) {
		return false;
	}

	if ("enumerable" in descriptor && this.enumerable !== descriptor.enumerable) {
		return false;
	}

	if (("get" in descriptor || "set" in descriptor) && this.dataProperty) {
		return false;
	}

	if ("value" in descriptor && !this.dataProperty) {
		return false;
	}

	if (this.dataProperty) {
		if (!this.writable) {
			if (descriptor.writable) {
				return false;
			}

			return !("value" in descriptor) || contracts.areSame(this.value, descriptor.value);
		}

		return true;
	}

	if ("get" in descriptor && this.get !== descriptor.get) {
		return false;
	}

	if ("set" in descriptor && this.set !== descriptor.set) {
		return false;
	}

	return true;
};

PropertyDescriptor.prototype.getValue = function (obj) {
	if (this.getter || this.setter) {
		return this.getter ? this.getter.call(obj) : undefined;
	}

	return this.value;
};

PropertyDescriptor.prototype.setValue = function (obj, value) {
	if (!this.canSetValue()) {
		return;
	}

	if (this.getter || this.setter) {
		if (this.setter) {
			this.setter.call(obj, value);
		}

		return;
	}

	this.value = value;
};

PropertyDescriptor.prototype.canSetValue = function () {
	return this.writable || !!this.setter;
};

module.exports = PropertyDescriptor;
