import {UNDEFINED} from "../types/primitive-type";

export default function (target, env, factory) {
	target.define("is", factory.createBuiltInFunction(function (a, b) {
		let result = env.ops.areSame(a || UNDEFINED, b || UNDEFINED);
		return factory.createPrimitive(result);
	}, 2, "Object.is"));
}
