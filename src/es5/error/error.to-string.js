import {toString} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function* () {
		let name = this.object.getValue("name");
		let msg;

		if (this.object.has("message")) {
			msg = yield toString(this.object.getValue("message"));
		}

		name = name && (yield toString(name));
		if (name && msg) {
			return factory.create("String", name + ": " + msg);
		}

		return factory.create("String", name || msg);
	}, 0, "Error.prototype.toString"));
}
