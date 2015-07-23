var ObjectType = require("./object-type");

function DateType (value) {
	ObjectType.call(this);
	this.value = value;
	this.type = "object";
	this.className = "Date";

	// 11.6.1 Note 1
	// All native ECMAScript objects except Date objects handle the absence of a hint as if the hint
	// Number were given; Date objects handle the absence of a hint as if the hint String were given.
	this.primitiveHint = "string";
}

DateType.prototype = Object.create(ObjectType.prototype);
DateType.prototype.constructor = DateType;

module.exports = DateType;
