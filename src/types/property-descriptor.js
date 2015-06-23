var configs = ["configurable", "enumerable", "writable"];

var defaultDescriptor = {
	configurable: true,
	enumerable: true,
	writable: true
};

function PropertyDescriptor (config, value) {
	var self = this;

	config = config || defaultDescriptor;
	configs.forEach(function (prop) {
		self[prop] = prop in config ? config[prop] : true;
	});

	if (config.getter || config.setter) {
		this.dataProperty = false;
		this.get = config.get;
		this.getter = config.getter;
		this.set = config.set;
		this.setter = config.setter;
	} else {
		this.dataProperty = true;
		this.value = value || config.value;
	}
}

PropertyDescriptor.prototype.update = function (descriptor) {
	if (descriptor.setter || descriptor.getter) {
		this.get = descriptor.get;
		this.getter = descriptor.getter;
		this.set = descriptor.set;
		this.setter = descriptor.setter;

		this.dataProperty = false;
		this.value = undefined;
	} else if (descriptor.value) {
		if (!this.configurable && (this.getter || this.setter)) {
			throw new TypeError("Cannot redefine property");
		}

		this.get = this.getter = this.set = this.setter = undefined;

		this.writable = descriptor.writable;
		this.dataProperty = true;
		this.value = descriptor.value;
	}

	this.configurable = this.configurable && descriptor.configurable !== false;
};

PropertyDescriptor.prototype.getValue = function (obj) {
	if (this.getter || this.setter) {
		if (this.getter) {
			return this.getter.call(obj);
		}
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
	} else {
		this.value = value;
	}
};

PropertyDescriptor.prototype.canSetValue = function () {
	return this.writable;
};

module.exports = PropertyDescriptor;
