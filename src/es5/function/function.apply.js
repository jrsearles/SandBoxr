import {toArray} from "../../utils/native";
import {defineThis} from "./function-helpers";

export default function ($target, env, factory) {
	$target.define("apply", factory.createBuiltInFunction(function* (thisArg, argsArray) {
		if (argsArray) {
			if (argsArray.className !== "Arguments" && argsArray.className !== "Array" && argsArray.className !== "Function") {
				throw TypeError("Arguments list was wrong type");
			}
		}

		let args = yield toArray(argsArray);
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);

		return yield* this.node.call(thisArg, args);
	}, 2, "Function.prototype.apply"));
}
