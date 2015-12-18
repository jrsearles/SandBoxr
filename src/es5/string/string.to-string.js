import {assertIsNotGeneric} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		assertIsNotGeneric(this.object, "String", "String.prototype.toString");
		return factory.createPrimitive(this.object.toNative());
	}, 0, "String.prototype.toString"));
}
