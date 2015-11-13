import {defineThis} from "./function-helpers";
import {isStrictNode} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("bind", factory.createBuiltInFunction(function* (thisArg, ...args) {
		let fn = this.node;
		let callee = fn.native ? fn : fn.node;
		let params = callee.params || [];
		thisArg = defineThis(env, this.node, thisArg);

		let nativeFunc = function* (...additionalArgs) {
			let mergedArgs = args.concat(additionalArgs);
			return yield* fn[this.isNew ? "construct" : "call"](thisArg, mergedArgs);
		};

		nativeFunc.nativeLength = Math.max(params.length - args.length, 0);
		nativeFunc.strict = env.isStrict() || !fn.native && isStrictNode(fn.node.body.body);

		let boundFunc = factory.createFunction(nativeFunc, null);
		boundFunc.canConstruct = this.node.canConstruct;
		boundFunc.bindScope(this.env.current);
		boundFunc.bindThis(thisArg);

		if (!nativeFunc.strict) {
			boundFunc.remove("caller");
			boundFunc.remove("arguments");

			// these will be added in strict mode, but should always be here for bound functions
			let thrower = factory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
			boundFunc.defineOwnProperty("caller", thrower);
			boundFunc.defineOwnProperty("arguments", thrower);
		}

		return boundFunc;
	}, 1, "Function.prototype.bind"));
}
