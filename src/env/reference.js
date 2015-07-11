function Reference (name, base, strict, global) {
	this.name = name;
	this.base = base;
	this.strict = strict;
	this.global = global;

	this.isReference = true;
}

Reference.prototype = {
	constructor: Reference,

	putValue: function (value, throwOnError) {
		if (this.base === undefined && throwOnError) {
			throw new ReferenceError(this.name + " is not defined");
		}

		if (this.base) {
			this.base.setMutableBinding(this.name, value, throwOnError);
		} else {
			this.global.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, false);
		}
	},

	getValue: function () {
		if (!this.base) {
			throw new ReferenceError(this.name + " is not defined");
		}

		return this.base.getBindingValue(this.name);
	},

	deleteBinding: function (name) {
		if (this.base) {
			return this.base.deleteBinding(name);
		}

		return true;
	},

	isUnresolved: function () {
		return !this.base;
	}
};

module.exports = Reference;
