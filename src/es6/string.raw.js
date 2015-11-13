import {toObject, toLength, toString} from "../utils/native";

export default function (target, env, factory) {
	target.define("raw", factory.createBuiltInFunction(function* (template, ...substitutions) {
		let numberOfSubstitutions = substitutions.length;
		let cooked = toObject(env, template, true);
		let raw = toObject(env, cooked.getValue("raw"), true);
		let literalSegments = yield toLength(raw);

		if (literalSegments <= 0) {
			return factory.createPrimitive("");
		}

		let stringElements = [];
		let nextIndex = 0;

		while (nextIndex < literalSegments) {
			let nextSegment = yield toString(raw.getValue(nextIndex));
			stringElements.push(nextSegment);

			if (nextIndex + 1 === literalSegments) {
				break;
			}

			let next = "";
			if (nextIndex < numberOfSubstitutions) {
				next = yield toString(substitutions[nextIndex]);
			}

			stringElements.push(next);
			nextIndex++;
		}

		return factory.createPrimitive(stringElements.join(""));
	}, 1, "String.raw"));
}