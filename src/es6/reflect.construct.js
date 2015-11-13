import {assertIsFunction, assertIsObject} from "../utils/contracts";
import {toArray} from "../utils/native";

export default function ($target, env, factory) {
	$target.define("construct", factory.createBuiltInFunction(function* (target, argsArray, newTarget) {
		assertIsFunction(target, "target");

		if (argsArray) {
			assertIsObject(argsArray, "Reflect.construct");
		}

		let args = yield toArray(argsArray);
		let callee = target.node || target;
		let proto = newTarget || target;

		let obj = factory.createObject(proto);
		return yield target.construct(obj, args, callee);
	}, 2, "Reflect.construct"));
}
