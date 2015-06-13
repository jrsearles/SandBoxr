var objectFactory = require("../types/object-factory");

var propertyConfig = { enumerable: false };

module.exports = function (globalScope) {
	var booleanClass = objectFactory.createFunction(function (obj) {
		var value = obj && obj.isPrimitive ? obj.toBoolean() : !!obj;
		var booleanValue = objectFactory.create("Boolean", value);

		// called as new
		if (this.isNew) {
			booleanValue.type = "object";
			booleanValue.isPrimitive = false;

			// this is a quirk in the spec
			booleanValue.toBoolean = function () { return true; };
		}

		return booleanValue;
	}, globalScope);

	booleanClass.proto.className = "Boolean";
	booleanClass.proto.defineProperty("toString", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.toString is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value ? this.node.value.toString() : "false");
	}), propertyConfig);

	booleanClass.proto.defineProperty("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.valueOf is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value || false);
	}), propertyConfig);

	globalScope.defineProperty("Boolean", booleanClass, propertyConfig);
};
