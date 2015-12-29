import {NULL} from "../../types/primitive-type";
import {toString, toPrimitive} from "../../utils/native";
import {getMethod} from "../../utils/func";
import {isNullOrUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("match", factory.createBuiltInFunction(function* (regex) {
		if (!isNullOrUndefined(regex)) {
			let matchKey = env.getSymbol("match");
			if (matchKey) {
				let matcher = getMethod(regex, matchKey);
				if (matcher) {
					return yield matcher.call(regex, [this.object]);
				}
			} 
		}
		
		let stringValue = yield toString(this.object);
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