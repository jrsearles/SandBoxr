import * as convert from "../utils/convert";
import * as contracts from "../utils/contracts";
import * as func from "../utils/func";
import {exhaust as x, map as asyncMap} from "../utils/async";

const protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase"];
const slice = Array.prototype.slice;

export default function stringApi (env) {
	const globalObject = env.global;
	const undef = globalObject.getValue("undefined");
	const objectFactory = env.objectFactory;

	let stringClass = objectFactory.createFunction(function* (value) {
		let stringValue = value ? (yield convert.toString(env, value.getValue())) : "";

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(env, stringValue);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = stringClass.getValue("prototype");

	// prototype can be coerced into an empty string
	proto.value = "";
	proto.className = "String";
	proto.defineOwnProperty("length", { value: objectFactory.createPrimitive(0) });

	proto.define("search", objectFactory.createBuiltInFunction(function* (regex) {
		let stringValue = yield convert.toString(env, this.node);
		let underlyingRegex;

		if (regex) {
			if (regex.className === "RegExp") {
				underlyingRegex = regex.source;
			} else {
				underlyingRegex = new RegExp(yield convert.toString(env, regex));
			}
		}

		return objectFactory.createPrimitive(stringValue.search(underlyingRegex));
	}, 1, "String.prototype.search"));

	proto.define("substring", objectFactory.createBuiltInFunction(function* (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		let value = yield convert.toPrimitive(env, this.node, "string");
		let length = value.length;

		start = yield convert.toInteger(env, start);
		end = contracts.isNullOrUndefined(end) ? length : (yield convert.toInteger(env, end));

		return objectFactory.createPrimitive(value.substring(start, end));
	}, 2, "String.prototype.substring"));

	protoMethods.forEach(name => {
		let fn = String.prototype[name];
		if (fn) {
			proto.define(name, objectFactory.createBuiltInFunction(function* () {
				let stringValue = yield convert.toString(env, this.node);
				let args = yield asyncMap(arguments, function* (arg) { return yield convert.toPrimitive(env, arg); });

				return objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args));
			}, String.prototype[name].length, "String.prototype." + name));
		}
	});

	stringClass.define("fromCharCode", objectFactory.createBuiltInFunction(function* (...charCodes) {
		let args = yield asyncMap(charCodes, function* (arg) { return yield convert.toPrimitive(env, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}, 1, "String.fromCharCode"));

	proto.define("slice", objectFactory.createBuiltInFunction(function* (start, end) {
		let stringValue = yield convert.toString(env, this.node);
		let startValue = yield convert.toInteger(env, start);
		let endValue;

		if (!contracts.isNullOrUndefined(end)) {
			endValue = yield convert.toInteger(env, end);
		}

		return objectFactory.createPrimitive(stringValue.slice(startValue, endValue));
	}, 2, "String.prototype.slice"));

	proto.define("split", objectFactory.createBuiltInFunction(function* (separator, limit) {
		let stringValue = yield convert.toString(env, this.node);
		separator = separator && separator.getValue();
		limit = limit && limit.getValue();
		let limitValue = contracts.isUndefined(limit) ? undefined : (yield convert.toUInt32(env, limit));

		let arr = objectFactory.create("Array");
		if (contracts.isUndefined(separator)) {
			arr.putValue(0, objectFactory.createPrimitive(stringValue), false, env);
		} else {
			let separatorValue;
			if (separator.className === "RegExp") {
				separatorValue = separator.source;
			} else {
				separatorValue = yield convert.toString(env, separator);
			}

			let result = stringValue.split(separatorValue, limitValue);
			result.forEach(function (value, index) {
				arr.putValue(index, objectFactory.createPrimitive(value), false, env);
			});
		}

		return arr;
	}, 2, "String.prototype.split"));

	proto.define("replace", objectFactory.createBuiltInFunction(function* (regexOrSubstr, substrOrFn) {
		let stringValue = yield convert.toString(env, this.node);

		let matcher;
		if (regexOrSubstr && regexOrSubstr.className === "RegExp") {
			matcher = regexOrSubstr.source;
		} else {
			matcher = yield convert.toString(env, regexOrSubstr);
		}

		let replacer;
		if (substrOrFn && substrOrFn.type === "function") {
			let callee = substrOrFn.native ? substrOrFn : substrOrFn.node;
			let params = callee.params || [];

			replacer = function () {
				let thisArg = substrOrFn.isStrict() || substrOrFn.isStrict() ? undef : globalObject;
				let args = slice.call(arguments).map(arg => objectFactory.createPrimitive(arg));
				let replacedValue = x(func.executeFunction(env, substrOrFn, params, args, thisArg, callee));
				return replacedValue ? x(convert.toString(env, replacedValue)) : undefined;
			};
		} else {
			replacer = yield convert.toString(env, substrOrFn);
		}

		return objectFactory.createPrimitive(stringValue.replace(matcher, replacer));
	}, 2, "String.prototype.replace"));

	proto.define("match", objectFactory.createBuiltInFunction(function* (regex) {
		let stringValue = yield convert.toString(env, this.node);
		let actualRegex;

		if (regex && regex.className === "RegExp") {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(yield convert.toPrimitive(env, regex));
		}

		let match = stringValue.match(actualRegex);
		if (match) {
			let matches = objectFactory.create("Array");

			match.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value), false, env);
			});

			matches.putValue("index", objectFactory.createPrimitive(match.index), false, env);
			matches.putValue("input", objectFactory.createPrimitive(match.input), false, env);
			return matches;
		}

		return globalObject.getValue("null");
	}, 1, "String.prototype.match"));

	proto.define("trim", objectFactory.createBuiltInFunction(function* () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		let stringValue = yield convert.toPrimitive(env, this.node, "string");
		return objectFactory.createPrimitive(stringValue.trim());
	}, 0, "String.prototype.trim"));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "String", "String.prototype.toString");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "String", "String.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.valueOf"));

	globalObject.define("String", stringClass);
}
