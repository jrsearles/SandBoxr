import {UNDEFINED} from "../../types/primitive-type";
import {isUndefined, isNullOrUndefined} from "../../utils/contracts";
import {toString, toNumber, toArray} from "../../utils/native";
import {map} from "../../utils/async";
import {tryExecute as tryExec} from "../../utils/func";

const primitives = {
	"String": true,
	"Number": true,
	"Boolean": true,
	"Date": true
};

export default function ($target, env, factory) {
	const serializePrimitive = JSON.stringify;

	function* serialize (stack, obj, replacer, gap, depth) {
		if (!obj) {
			return serializePrimitive();
		}

		if (obj.isPrimitive || obj.className in primitives) {
			return serializePrimitive(obj.value);
		}

		if (obj.className === "Function") {
			return undefined;
		}

		let jsonString = yield tryExec(obj, "toJSON");
		if (jsonString) {
			return serializePrimitive(jsonString.value);
		}

		if (stack.indexOf(obj) >= 0) {
			throw TypeError("Converting circular structure to JSON");
		}

		depth++;
		stack.push(obj);

		let jsonResult;
		if (obj.className === "Array") {
			jsonResult = yield serializeArray(stack, obj, replacer);
		} else {
			jsonResult = yield serializeObject(stack, obj, replacer, gap, depth);
		}

		depth--;
		stack.pop();
		return jsonResult;
	}

	function formatValues (values, gap, depth) {
		if (values.length === 0) {
			return "";
		}

		if (!gap) {
			return values.join(",");
		}

		let indent = "\n" + gap.repeat(depth);
		let joinedValues = values.join(indent + ",");

		// remove indent on closing
		return indent + joinedValues + "\n" + gap.repeat(depth - 1);
	}

	function* serializeObject (stack, obj, replacer, gap, depth) {
		let colon = gap ? ": " : ":";
		let values = [];
		let value;

		for (let prop in obj.properties) {
			if (obj.properties[prop].enumerable) {
				value = yield replacer(obj, prop, obj.getValue(prop));
				if (!isNullOrUndefined(value)) {
					values.push(serializePrimitive(prop) + colon + (yield serialize(stack, value, replacer, gap, depth)));
				}
			}
		}

		return "{" + formatValues(values, gap, depth, gap, depth) + "}";
	}

	function* serializeArray (stack, arr, replacer, gap, depth) {
		let length = arr.getValue("length").toNative();
		let values = [];

		for (let i = 0; i < length; i++) {
			let value = undefined;
			if (arr.has(i)) {
				value = yield replacer(arr, String(i), arr.getValue(i));
			}

			if (isNullOrUndefined(value)) {
				// undefined positions are replaced with null
				values.push("null");
			} else {
				values.push(yield serialize(stack, value, replacer));
			}
		}

		return "[" + formatValues(values, gap, depth) + "]";
	}

	function* createReplacer (replacer) {
		if (replacer) {
			if (replacer.className === "Function") {
				return function* (holder, key, value) {
					let args = [factory.createPrimitive(key), value];
					return yield replacer.call(holder, args);
				};
			}

			if (replacer.className === "Array") {
				let arr = yield toArray(replacer);
				let keys = yield* map(arr, function* (arg) {
					if (arg.className === "String") {
						return yield toString(arg);
					}

					if (arg.className === "Number") {
						return String(yield toNumber(arg));
					}

					return undefined;
				});

				return (holder, key, value) => {
					// allow empty key - this will be from the root
					if (!key || keys.indexOf(key) >= 0) {
						return value;
					}

					return undefined;
				};
			}
		}

		return (holder, key, value) => value;
	}

	function* getSpacer (spacer) {
		if (spacer) {
			if (spacer.className === "Number") {
				let count = Math.floor(yield toNumber(spacer));
				count = Math.max(Math.min(10, count), 0);

				if (count > 0) {
					return " ".repeat(count);
				}

				return "";
			}

			if (spacer.className === "String") {
				let gap = yield toString(spacer);
				return gap.substr(0, 10);
			}
		}

		return "";
	}

	$target.define("stringify", factory.createBuiltInFunction(function* (obj, replacer, spacer) {
		replacer = yield createReplacer(replacer);
		spacer = yield getSpacer(spacer);

		// run at the top value
		obj = yield replacer(obj, "", obj);
		if (isUndefined(obj)) {
			return UNDEFINED;
		}

		let stack = [];
		return factory.createPrimitive(yield serialize(stack, obj, replacer, spacer, 0));
	}, 3, "JSON.stringify"));
}