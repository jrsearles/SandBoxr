var convert = require("../utils/convert");

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var booleanClass = objectFactory.createFunction(function (obj) {
		var booleanValue = convert.toBoolean(obj);

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(env, booleanValue);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = booleanClass.getProperty("prototype").getValue();
	proto.className = "Boolean";
	proto.value = false;

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.toString is not generic.");
		}

		return objectFactory.createPrimitive(String(this.node.value));
	}, 0, "Boolean.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.valueOf is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "Boolean.prototype.valueOf"));

	globalObject.define("Boolean", booleanClass);
};
