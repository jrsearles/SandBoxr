var PrimitiveType = require("./primitive-type");
var typeRegistry = require("./type-registry");

function StringType (value, parent) {
	PrimitiveType.call(this, value);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.getProperty = function (name) {
	if (name === "length") {
		var length = new PrimitiveType(this.value.length);
		typeRegistry.setParent(length, "NUMBER");
		return length;
	}

	if (typeof name === "number") {
		var character = new StringType(this.value[name]);
		typeRegistry.setParent(character, "STRING");
		return character;
	}

	return PrimitiveType.prototype.getProperty.call(this, name);
};

module.exports = StringType;
