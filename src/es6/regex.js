import {SymbolType} from "../types/symbol-type";
import {exhaust as x} from "../utils/async";
import {UNDEFINED} from "../types/primitive-type";
import {toString} from "../utils/native";
import {isFunction} from "../utils/contracts";

export default function (globalObject, env, factory) {
	let regexClass = globalObject.getValue("RegExp");
	let proto = regexClass.getValue("prototype");

	let replaceKey = SymbolType.getByKey("replace");
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

		return factory.createPrimitive(stringValue.replace(this.node.source, replacer));
	}, 2, "RegExp.prototype[Symbol.replace]"));

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