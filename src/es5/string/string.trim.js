import {assertIsNotNullOrUndefined} from "../../utils/contracts";
import {toString} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("trim", factory.createBuiltInFunction(function* () {
		assertIsNotNullOrUndefined(this.object, "String.prototype.trim");

		let stringValue = yield toString(this.object);
		return factory.createPrimitive(stringValue.trim());
	}, 0, "String.prototype.trim"));
}
