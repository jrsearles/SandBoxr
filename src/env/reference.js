function Reference (name, base, strict, env) {
	this.name = name;
	this.base = base;
	this.strict = strict;
	this.env = env;

	this.isReference = true;
}

Reference.prototype = {
	constructor: Reference,

	putValue: function (value) {
		if (this.base === undefined && this.strict) {
			throw new ReferenceError(this.name + " is not defined");
		}

		if (this.base) {
			this.base.setMutableBinding(this.name, value, this.strict);
		} else {
			this.env.global.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, false);
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
