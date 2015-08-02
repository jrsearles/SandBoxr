var convert = require("../utils/convert");
var contracts = require("../utils/contracts");

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
		contracts.assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.toString");
		return objectFactory.createPrimitive(String(this.node.value));
	}, 0, "Boolean.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "Boolean.prototype.valueOf"));

	globalObject.define("Boolean", booleanClass);
};
