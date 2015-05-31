var ObjectType = require("./object-type");

function PrimitiveType (value, parent) {
	ObjectType.call(this, parent);
	this.isPrimitive = true;
	this.value = value;
	this.type = typeof value;
	this.objectType = Object.prototype.toString.call(value);
}

PrimitiveType.prototype = Object.create(ObjectType.prototype);
PrimitiveType.prototype.constructor = PrimitiveType;

PrimitiveType.prototype.getProperty = function (name) {
	if (this.value == null) {
		throw new TypeError("Cannot read property '" + name + "' of " + this.type);
	}

	return ObjectType.prototype.getProperty.apply(this, arguments);
};

// overwrite object methods
PrimitiveType.prototype.toBoolean = function () { return Boolean(this.value); };
PrimitiveType.prototype.toNumber = function () { return Number(this.value); };
PrimitiveType.prototype.toString = function () { return String(this.value); };
PrimitiveType.prototype.valueOf = function () { return this.value; };

module.exports = PrimitiveType;
