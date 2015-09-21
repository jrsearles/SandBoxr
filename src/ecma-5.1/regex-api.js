import {toString,toInt32,toNativeFunction} from "../utils/native";
import * as contracts from "../utils/contracts";

export default function regexApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	let regexClass = objectFactory.createFunction(function* (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			if (contracts.isUndefined(flags)) {
				return pattern;
			}

			return this.raise(new TypeError("Cannot supply flags when constructing one RegExp from another"));
		}

		let patternString = contracts.isUndefined(pattern) ? "" : (yield toString(env, pattern));
		flags = contracts.isUndefined(flags) ? "" : (yield toString(env, flags));

		return objectFactory.create("RegExp", new RegExp(patternString, flags));
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = regexClass.getValue("prototype");
	proto.className = "RegExp";

	proto.define("test", objectFactory.createBuiltInFunction(function* (str) {
		let stringValue = yield toString(env, str);

		this.node.source.lastIndex = yield toInt32(env, this.node.getValue("lastIndex"));
		let testValue = this.node.source.test(stringValue);
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex), true, env);

		return objectFactory.createPrimitive(testValue);
	}, 1, "RegExp.prototype.test"));

	proto.define("exec", objectFactory.createBuiltInFunction(function* (str) {
		let stringValue = yield toString(env, str);

		// update underlying regex in case the index was manually updated
		this.node.source.lastIndex = yield toInt32(env, this.node.getValue("lastIndex"));

		// get match from underlying regex
		let match = this.node.source.exec(stringValue);

		// update the last index from the underlying regex
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex), true, env);

		if (match) {
			let arr = objectFactory.create("Array");
			for (let i = 0, ln = match.length; i < ln; i++) {
				arr.putValue(i, objectFactory.createPrimitive(match[i]), true, env);
			}

			// extra properties are added to the array
			arr.putValue("index", objectFactory.createPrimitive(match.index), false, env);
			arr.putValue("input", objectFactory.createPrimitive(match.input), false, env);
			return arr;
		}

		return this.env.global.getValue("null");
	}, 1, "RegExp.prototype.exec"));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		return objectFactory.createPrimitive(String(this.node.source));
	}, 0, "RegExp.prototype.toString"));

	proto.define("compile", toNativeFunction(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
	proto.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(0), writable: true });

	["global", "ignoreCase", "multiline", "source"].forEach(name => {
		proto.defineOwnProperty(name, { value: objectFactory.createPrimitive(RegExp.prototype[name]) });
	});

	globalObject.define("RegExp", regexClass);
}
