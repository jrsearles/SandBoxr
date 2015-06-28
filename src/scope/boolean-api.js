var convert = require("../utils/convert");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var booleanClass = objectFactory.createFunction(function (obj) {
		var booleanValue = obj && obj.isPrimitive ? obj.toBoolean() : !!obj;

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(booleanValue, objectFactory);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	booleanClass.proto.className = "Boolean";
	booleanClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.toString is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value ? this.node.value.toString() : "false");
	}), propertyConfig);

	booleanClass.proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.valueOf is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value || false);
	}), propertyConfig);

	globalScope.defineOwnProperty("Boolean", booleanClass, propertyConfig);
};
