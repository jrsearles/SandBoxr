import {toString} from "../utils/native";

const methods = ["log", "info", "error"];

export default function consoleApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;
	let consoleClass = objectFactory.createObject();

	methods.forEach(name => {
		consoleClass.define(name, objectFactory.createBuiltInFunction(function (message) {
			let stringValue = toString(env, message);
			console[name](stringValue);
		}, 1, "console." + name));
	});

	globalObject.define("console", consoleClass);
}
