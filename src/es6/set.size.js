import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
	let getter = function () {
		assertIsSet(this, "Set.prototype.size");
		return factory.createPrimitive(this.data.filter(v => v).length);
	};

	let getterFunc = factory.createGetter(function () {
		return getter.call(this.node);
	}, "size");

	$target.define("size", null, {
		getter: getter,
		get: getterFunc
	});
}
