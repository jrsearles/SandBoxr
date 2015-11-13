import {assertIsNotGeneric} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		assertIsNotGeneric(this.node, "Number", "Number.prototype.valueOf");
		return factory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"));
}
