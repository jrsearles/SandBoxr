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

	// var self;

	// this.setProperty("length", null, {
	// 	configurable: false,
	// 	enumerable: false,
	// 	writable: false,
	// 	getter: function () {
	// 		return objectFactory.createPrimitive(self.value.length);
	// 	}
	// });
};

StringType.prototype.getProperty = function (name) {
	if (typeof name === "number") {
		var character = new StringType(this.value[name]);
		character.setProto(this.proto);
		// typeRegistry.setParent(character, "String");
		return character;
	}

	return PrimitiveType.prototype.getProperty.call(this, name);
};

module.exports = StringType;
