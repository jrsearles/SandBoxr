var PrimitiveType = require("./primitive-type");
// var typeRegistry = require("./type-registry");

function StringType (value, parent) {
	PrimitiveType.call(this, value);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.init = function (objectFactory) {
	var self = this;

	Object.defineProperty(this.properties, "length", {
		configurable: true,
		enumerable: true,
		get: function () {
			return objectFactory.createPrimitive(self.value.length);
		}
	});
};

StringType.prototype.hasProperty = function (name) {
	if (typeof name === "number") {
		return true;
	}

	return PrimitiveType.prototype.hasProperty.call(this, name);
};

StringType.prototype.getProperty = function (name) {
	if (typeof name === "number") {
		if (name >= this.value.length) {
			return new PrimitiveType(undefined);
		} else {
			var character = new StringType(this.value[name]);
			character.setProto(this.proto);
			return character;
		}
	}

	return PrimitiveType.prototype.getProperty.call(this, name);
};

module.exports = StringType;
