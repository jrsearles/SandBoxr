import * as contracts from "../utils/contracts";
import * as func from "../utils/func";
import * as convert from "../utils/convert";

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

function serializeObject (env, stack, obj, replacer, gap, depth) {
	let colon = gap ? ": " : ":";
	let values = [];
	let value;

	for (let prop in obj.properties) {
		if (obj.properties[prop].enumerable) {
			value = replacer(obj, prop, obj.getValue(prop));
			if (!contracts.isNullOrUndefined(value)) {
				values.push(serializePrimitive(prop) + colon + serialize(env, stack, value, replacer, gap, depth));
			}
		}
	}

	return "{" + formatValues(values, gap, depth, gap, depth) + "}";
}

function serializeArray (env, stack, arr, replacer, gap, depth) {
	let length = arr.getValue("length").unwrap();
	let values = [];

	for (let i = 0; i < length; i++) {
		let value = undefined;
		if (arr.hasProperty(i)) {
			value = replacer(arr, String(i), arr.getValue(i));
		}

		if (contracts.isNullOrUndefined(value)) {
			// undefined positions are replaced with null
			values.push("null");
		} else {
			values.push(serialize(env, stack, value, replacer));
		}
	}

	return "[" + formatValues(values, gap, depth) + "]";
}

function serialize (env, stack, obj, replacer, gap, depth) {
	if (!obj) {
		return serializePrimitive();
	}

	if (obj.isPrimitive || obj.className in primitives) {
		return serializePrimitive(obj.value);
	}

	if (obj.className === "Function") {
		return undefined;
	}

	let jsonString = func.tryCallMethod(env, obj, "toJSON");
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
		jsonResult = serializeArray(env, stack, obj, replacer);
	} else {
		jsonResult = serializeObject(env, stack, obj, replacer, gap, depth);
	}

	depth--;
	stack.pop();
	return jsonResult;
}

function createReplacer (env, replacer) {
	if (replacer) {
		if (replacer.className === "Function") {
			return function (holder, key, value) {
				let args = [env.objectFactory.createPrimitive(key), value];
				let params = replacer.native ? [] : replacer.node.params;
				let callee = replacer.native ? replacer : replacer.node;

				return func.executeFunction(env, replacer, params, args, holder, callee);
			};
		}

		if (replacer.className === "Array") {
			let keys = convert.toArray(replacer).map(function (arg) {
				if (arg.className === "String") {
					return convert.toString(env, arg);
				}

				if (arg.className === "Number") {
					return String(convert.toNumber(env, arg));
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

function getSpacer (env, spacer) {
	if (spacer) {
		if (spacer.className === "Number") {
			let count = Math.floor(convert.toNumber(env, spacer));
			count = Math.max(Math.min(10, count), 0);

			if (count > 0) {
				return " ".repeat(count);
			}

			return "";
		}

		if (spacer.className === "String") {
			let gap = convert.toString(env, spacer);
			return gap.substr(0, 10);
		}
	}

	return "";
}

function deserialize (env, value, reviver) {
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
			value.forEach(function (element, index) {
				let elementValue = reviver(arr, String(index), deserialize(env, element, reviver));
				if (!contracts.isUndefined(elementValue)) {
					arr.defineOwnProperty(index, { value: deserialize(env, element), configurable: true, enumerable: true, writable: true }, true, env);
				}
			});

			return arr;

		default:
			let obj = objectFactory.createObject();
			let propValue;

			for (let prop in value) {
				if (value.hasOwnProperty(prop)) {
					propValue = reviver(obj, prop, deserialize(env, value[prop], reviver));
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
		return function (holder, key, value) {
			let args = [env.objectFactory.createPrimitive(key), value];
			let params = reviver.native ? [] : reviver.node.params;
			let callee = reviver.native ? reviver : reviver.node;

			return func.executeFunction(env, reviver, params, args, holder, callee);
		};
	}

	return function (holder, key, value) { return value; };
}

export default function jsonApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;
	const undef = env.global.getValue("undefined");

	let jsonClass = objectFactory.createObject();
	jsonClass.className = "JSON";

	jsonClass.define("stringify", objectFactory.createBuiltInFunction(function (obj, replacer, spacer) {
		replacer = createReplacer(env, replacer);
		spacer = getSpacer(env, spacer);

		// run at the top value
		obj = replacer(obj, "", obj);
		if (contracts.isUndefined(obj)) {
			return undef;
		}

		let stack = [];
		return objectFactory.createPrimitive(serialize(env, stack, obj, replacer, spacer, 0));
	}, 3, "JSON.stringify"));

	jsonClass.define("parse", objectFactory.createBuiltInFunction(function (str, reviver) {
		reviver = createReviver(env, reviver);

		let stringValue = convert.toString(env, str);
		let parsedObject = JSON.parse(stringValue);
		let deserializedObject = deserialize(env, parsedObject, reviver);

		return reviver(deserializedObject, "", deserializedObject) || undef;
	}, 2, "JSON.parse"));

	globalObject.define("JSON", jsonClass);
}
