import {defineThis} from "./function-helpers";
import {toNumber, toString} from "../../utils/native";
import {isUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("bind", factory.createBuiltInFunction(function* (thisArg, ...args) {
		let fn = this.object;
		let length = yield toNumber(fn.getValue("length"));
		
		thisArg = defineThis(env, fn, thisArg);

		let nativeFunc = function* (...additionalArgs) {
			let mergedArgs = args.concat(additionalArgs);
			return yield* fn[this.isNew ? "construct" : "call"](thisArg, mergedArgs);
		};

		nativeFunc.nativeLength = Math.max(length - args.length, 0);
		nativeFunc.strict = env.isStrict() || (fn.node && fn.node.body.isStrict());

		let nameValue = fn.getValue("name");
		let name = isUndefined(nameValue) ? "" : yield toString(nameValue);

		let boundFunc = factory.createFunction(nativeFunc, null, {name: "bound " + name});
		boundFunc.canConstruct = fn.canConstruct;
		boundFunc.bindScope(this.env.current);
		boundFunc.bindThis(thisArg);

		if (!nativeFunc.strict) {
			boundFunc.remove("caller");
			boundFunc.remove("arguments");

			// these will be added in strict mode, but should always be here for bound functions
			let thrower = factory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
			boundFunc.defineProperty("caller", thrower);
			boundFunc.defineProperty("arguments", thrower);
		}

		return boundFunc;
	}, 1, "Function.prototype.bind"));
}
