var ObjectType = require("./object-type");

function DateType (value) {
	ObjectType.call(this);
	this.value = value;
	this.type = "object";
	this.className = "Date";
}

DateType.prototype = Object.create(ObjectType.prototype);
DateType.prototype.constructor = DateType;

DateType.prototype.toBoolean = function () { return Boolean(this.value); };
DateType.prototype.toNumber = function () { return Number(this.value); };
DateType.prototype.toString = function () { return String(this.value); };
DateType.prototype.valueOf = function () { return this.value; };

module.exports = DateType;
