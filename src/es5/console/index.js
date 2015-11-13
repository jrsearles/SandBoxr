import {toString} from "../../utils/native";
import {map} from "../../utils/async";

const methods = ["log", "info", "error", "warn"];

export default function consoleApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;
	let consoleClass = objectFactory.createObject();

	methods.forEach(name => {
		consoleClass.define(name, objectFactory.createBuiltInFunction(function* (...args) {
			let stringValues = yield map(args, function* (arg) { return yield toString(arg); });
			console[name](...stringValues);
		}, 1, `console.${name}`));
	});

	globalObject.define("console", consoleClass);
}
