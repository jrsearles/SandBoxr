import {UNDEFINED} from "../types/primitive-type";
import * as contracts from "../utils/contracts";
import {execute as exec, tryExecute as tryExec} from "../utils/func";
import {toString,toNumber,toArray} from "../utils/native";
import {map} from "../utils/async";

const primitives = {
	"String": true,
	"Number": true,
	"Boolean": true,
	"Date": true
};

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

function serializePrimitive (value) {
	return JSON.stringify(value);
}

function* serializeObject (env, stack, obj, replacer, gap, depth) {
	let colon = gap ? ": " : ":";
	let values = [];
	let value;

	for (let prop in obj.properties) {
		if (obj.properties[prop].enumerable) {
			value = yield replacer(obj, prop, obj.getValue(prop));
			if (!contracts.isNullOrUndefined(value)) {
				values.push(serializePrimitive(prop) + colon + (yield serialize(env, stack, value, replacer, gap, depth)));
			}
		}
	}

	return "{" + formatValues(values, gap, depth, gap, depth) + "}";
}

function* serializeArray (env, stack, arr, replacer, gap, depth) {
	let length = arr.getValue("length").toNative();
	let values = [];

	for (let i = 0; i < length; i++) {
		let value = undefined;
		if (arr.hasProperty(i)) {
			value = yield replacer(arr, String(i), arr.getValue(i));
		}

		if (contracts.isNullOrUndefined(value)) {
			// undefined positions are replaced with null
			values.push("null");
		} else {
			values.push(yield serialize(env, stack, value, replacer));
		}
	}

	return "[" + formatValues(values, gap, depth) + "]";
}

function* serialize (env, stack, obj, replacer, gap, depth) {
	if (!obj) {
		return serializePrimitive();
	}

	if (obj.isPrimitive || obj.className in primitives) {
		return serializePrimitive(obj.value);
	}

	if (obj.className === "Function") {
		return undefined;
	}

	let jsonString = yield tryExec(env, obj, "toJSON");
	if (jsonString) {
		return serializePrimitive(jsonString.value);
	}

	if (stack.indexOf(obj) >= 0) {
		throw new TypeError("Converting circular structure to JSON");
	}

	depth++;
	stack.push(obj);

	let jsonResult;
	if (obj.className === "Array") {
		jsonResult = yield serializeArray(env, stack, obj, replacer);
	} else {
		jsonResult = yield serializeObject(env, stack, obj, replacer, gap, depth);
	}

	depth--;
	stack.pop();
	return jsonResult;
}

function* createReplacer (env, replacer) {
	if (replacer) {
		if (replacer.className === "Function") {
			return function* (holder, key, value) {
				let args = [env.objectFactory.createPrimitive(key), value];
				let params = replacer.native ? [] : replacer.node.params;
				let callee = replacer.native ? replacer : replacer.node;

				return yield exec(env, replacer, params, args, holder, callee);
			};
		}

		if (replacer.className === "Array") {
			let keys = yield* map(toArray(replacer), function* (arg) {
				if (arg.className === "String") {
					return yield toString(env, arg);
				}

				if (arg.className === "Number") {
					return String(yield toNumber(env, arg));
				}

				return undefined;
			});

			return function (holder, key, value) {
				// allow empty key - this will be from the root
				if (!key || keys.indexOf(key) >= 0) {
					return value;
				}

				return undefined;
			};
		}
	}

	return function (holder, key, value) { return value; };
}

function* getSpacer (env, spacer) {
	if (spacer) {
		if (spacer.className === "Number") {
			let count = Math.floor(yield toNumber(env, spacer));
			count = Math.max(Math.min(10, count), 0);

			if (count > 0) {
				return " ".repeat(count);
			}

			return "";
		}

		if (spacer.className === "String") {
			let gap = yield toString(env, spacer);
			return gap.substr(0, 10);
		}
	}

	return "";
}

function* deserialize (env, value, reviver) {
	let objectFactory = env.objectFactory;
	let valueType = contracts.getType(value);
	switch (valueType) {
		// these are the only types supported by JSON.parse - sad face...
		case "Undefined":
		case "Null":
		case "String":
		case "Number":
		case "Boolean":
			return objectFactory.create(valueType, value);

		case "Array":
			let arr = objectFactory.create("Array");

			for (let i = 0, ln = value.length; i < ln; i++) {
				let element = value[i];
				let elementValue = yield reviver(arr, String(i), yield deserialize(env, element, reviver));

				if (!contracts.isUndefined(elementValue)) {
					arr.defineOwnProperty(i, { value: yield deserialize(env, element), configurable: true, enumerable: true, writable: true }, true, env);
				}
			}

			return arr;

		default:
			let obj = objectFactory.createObject();
			let propValue;

			for (let prop in value) {
				if (value.hasOwnProperty(prop)) {
					propValue = yield reviver(obj, prop, yield deserialize(env, value[prop], reviver));
					if (!contracts.isUndefined(propValue)) {
						obj.defineOwnProperty(prop, { value: propValue, configurable: true, enumerable: true, writable: true }, true, env);
					}
				}
			}

			return obj;
	}
}

function createReviver (env, reviver) {
	if (reviver && reviver.className === "Function") {
		return function* (holder, key, value) {
			let args = [env.objectFactory.createPrimitive(key), value];
			let params = reviver.native ? [] : reviver.node.params;
			let callee = reviver.native ? reviver : reviver.node;

			return yield* exec(env, reviver, params, args, holder, callee);
		};
	}

	return function (holder, key, value) { return value; };
}

export default function jsonApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	let jsonClass = objectFactory.createObject();
	jsonClass.className = "JSON";

	jsonClass.define("stringify", objectFactory.createBuiltInFunction(function* (obj, replacer, spacer) {
		replacer = yield createReplacer(env, replacer);
		spacer = yield getSpacer(env, spacer);

		// run at the top value
		obj = yield replacer(obj, "", obj);
		if (contracts.isUndefined(obj)) {
			return UNDEFINED;
		}

		let stack = [];
		return objectFactory.createPrimitive(yield serialize(env, stack, obj, replacer, spacer, 0));
	}, 3, "JSON.stringify"));

	jsonClass.define("parse", objectFactory.createBuiltInFunction(function* (str, reviver) {
		reviver = createReviver(env, reviver);

		let stringValue = yield toString(env, str);
		let parsedObject = JSON.parse(stringValue);
		let deserializedObject = yield deserialize(env, parsedObject, reviver);

		return yield reviver(deserializedObject, "", deserializedObject) || UNDEFINED;
	}, 2, "JSON.parse"));

	globalObject.define("JSON", jsonClass);
}
