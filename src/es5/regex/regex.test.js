import {toString, toInt32} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("test", factory.createBuiltInFunction(function* (str) {
		let stringValue = yield toString(str);

		this.node.source.lastIndex = yield toInt32(this.node.getValue("lastIndex"));
		let testValue = this.node.source.test(stringValue);
		this.node.setValue("lastIndex", factory.createPrimitive(this.node.source.lastIndex));

		return factory.createPrimitive(testValue);
	}, 1, "RegExp.prototype.test"));
}
