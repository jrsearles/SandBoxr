import {assertIsNotGeneric} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.valueOf");
		return factory.createPrimitive(this.node.value);
	}, 0, "Boolean.prototype.valueOf"));
}
