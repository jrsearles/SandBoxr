import {assertIsFunction, assertIsObject} from "../utils/contracts";
import {toArray} from "../utils/native";

export default function ($target, env, factory) {
	$target.define("apply", factory.createBuiltInFunction(function* (target, thisArg, argsArray) {
		assertIsFunction(target, "target");

		if (argsArray) {
			assertIsObject(argsArray, "Reflect.apply");
		}

		let args = yield toArray(argsArray);
		let callee = target.native ? target : target.node;
		return yield target.call(thisArg, args, callee);
	}, 3, "Reflect.apply"));
}