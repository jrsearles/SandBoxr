var Reference = require("./reference");
var PrimitiveType = require("../types/primitive-type");

function PropertyReference (name, object, strict, env) {
	Reference.apply(this, arguments);
	this.isPropertyReference = true;
	this.env = env;
}

PropertyReference.prototype = Object.create(Reference.prototype);
PropertyReference.prototype.constructor = PropertyReference;

PropertyReference.prototype.getValue = function () {
	var prop = this.base.getProperty(this.name);
	return prop && prop.getValue() || new PrimitiveType(undefined);
};

PropertyReference.prototype.putValue = function (value) {
	if (this.base.hasProperty(this.name)) {
		this.base.putValue(this.name, value, this.strict, this.env);
	} else {
		this.base.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, this.strict, this.env);
	}
};

PropertyReference.prototype.deleteBinding = function (name) {
	return this.base.deleteProperty(name, true);
};

PropertyReference.prototype.isUnresolved = function () { return false; };

module.exports = PropertyReference;
