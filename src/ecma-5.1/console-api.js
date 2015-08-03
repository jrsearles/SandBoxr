import * as convert from "../utils/convert";

var methods = ["log", "info", "error"];

export default function consoleApi (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(name => {
		consoleClass.define(name, objectFactory.createBuiltInFunction(function (message) {
			var stringValue = convert.toString(env, message);
			console[name](stringValue);
		}, 1, "console." + name));
	});

	globalObject.define("console", consoleClass);
}
