import {toString, toInt32} from "../../utils/native";
import {NULL} from "../../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("exec", factory.createBuiltInFunction(function* (str) {
		let stringValue = yield toString(str);

		// update underlying regex in case the index was manually updated
		this.node.source.lastIndex = yield toInt32(this.node.getValue("lastIndex"));

		// get match from underlying regex
		let match = this.node.source.exec(stringValue);

		// update the last index from the underlying regex
		this.node.setValue("lastIndex", factory.createPrimitive(this.node.source.lastIndex));

		if (match) {
			let arr = factory.createArray();
			for (let i = 0, ln = match.length; i < ln; i++) {
				arr.setValue(i, factory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.setValue("index", factory.createPrimitive(match.index));
			arr.setValue("input", factory.createPrimitive(match.input));
			return arr;
		}

		return NULL;
	}, 1, "RegExp.prototype.exec"));
}
