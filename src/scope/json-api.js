var convert = require("../utils/convert");

var methods = ["parse", "stringify"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var jsonClass = objectFactory.createObject();
	jsonClass.className = "JSON";

	methods.forEach(function (name) {
		jsonClass.define(name, convert.toNativeFunction(objectFactory, JSON[name], "JSON." + name));
	});

	globalObject.define("JSON", jsonClass);
};
