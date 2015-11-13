import {defineThis} from "./function-helpers";

export default function ($target, env, factory) {
	$target.define("call", factory.createBuiltInFunction(function* (thisArg, ...args) {
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);

		return yield* this.node.call(thisArg, args);
	}, 1, "Function.prototype.call"));
}