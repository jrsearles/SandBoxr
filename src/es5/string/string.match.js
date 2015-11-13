import {NULL} from "../../types/primitive-type";
import {toString, toPrimitive} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("match", factory.createBuiltInFunction(function* (regex) {
		let stringValue = yield toString(this.node);
		let actualRegex;

		if (regex && regex.className === "RegExp") {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(yield toPrimitive(regex));
		}

		let match = stringValue.match(actualRegex);
		if (match) {
			let matches = factory.createArray();

			match.forEach(function (value, index) {
				matches.setValue(index, factory.createPrimitive(value));
			});

			matches.setValue("index", factory.createPrimitive(match.index));
			matches.setValue("input", factory.createPrimitive(match.input));
			return matches;
		}

		return NULL;
	}, 1, "String.prototype.match"));
}