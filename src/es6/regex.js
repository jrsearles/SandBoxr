import {exhaust as x} from "../utils/async";
import {UNDEFINED, NULL} from "../types/primitive-type";
import {toString, toUInt32} from "../utils/native";
import {isFunction, isUndefined} from "../utils/checks";

export default function (globalObject, env, factory) {
	let regexClass = globalObject.getValue("RegExp");
	let proto = regexClass.getValue("prototype");

	let replaceKey = env.getSymbol("replace");
	proto.define(replaceKey, factory.createBuiltInFunction(function* (value, replaceValue) {
		let stringValue = yield toString(value);
		let replacer;

		if (isFunction(replaceValue)) {
			replacer = function (...args) {
				let thisArg = replaceValue.strict || env.isStrict() ? UNDEFINED : env.global;
				let mappedArgs = args.map(arg => factory.createPrimitive(arg));
				let result = x(replaceValue.call(thisArg, mappedArgs));
				return result ? x(toString(result)) : undefined;
			};
		} else {
			replacer = yield toString(replaceValue);
		}

		return factory.createPrimitive(stringValue.replace(this.object.source, replacer));
	}, 2, "RegExp.prototype[Symbol.replace]"));
	
	let matchKey = env.getSymbol("match");
	proto.define(matchKey, factory.createBuiltInFunction(function* (value) {
		let stringValue = yield toString(value);
		
		let match = stringValue.match(this.object.source);
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
	}, 1, "RegExp.prototype[Symbol.match]"));
	
	let splitKey = env.getSymbol("split");
	proto.define(splitKey, factory.createBuiltInFunction(function* (value, limit) {
		let stringValue = yield toString(value);
		limit = limit && limit.getValue();
		let limitValue = isUndefined(limit) ? undefined : (yield toUInt32(limit));

		let arr = factory.createArray();
		let result = stringValue.split(this.object.source, limitValue);
		result.forEach(function (val, index) {
			arr.setValue(index, factory.createPrimitive(val));
		});

		return arr;	
	}, 2, "RegExp.prototype[Symbol.split]"));
	
	let searchKey = env.getSymbol("search");
	proto.define(searchKey, factory.createBuiltInFunction(function* (value) {
		let stringValue = yield toString(value);
		return factory.createPrimitive(stringValue.search(this.object.source));	
	}, 1, "RegExp.prototype[Symbol.search]"));

	["source", "global", "ignoreCase", "multiline"].forEach(key => {
		let source = RegExp.prototype;
		let getter = function () { return factory.createPrimitive(source[key]); };
		let getterFunc = factory.createGetter(getter, key);

		proto.define(key, null, {
			getter: getter,
			get: getterFunc
		});
	});
}