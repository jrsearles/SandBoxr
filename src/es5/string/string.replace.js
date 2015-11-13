import {assertIsNotNullOrUndefined, isNullOrUndefined} from "../../utils/contracts";
import {SymbolType} from "../../types/symbol-type";
import {UNDEFINED} from "../../types/primitive-type";
import {toString} from "../../utils/native";
import {exhaust as x} from "../../utils/async";

export default function ($target, env, factory) {
	function getMethod (obj, key) {
		let propInfo = obj.getProperty(key);
		if (!propInfo) {
			return null;
		}

		let method = propInfo.getValue();
		if (method.type !== "function") {
			throw TypeError(`${key} is not a method`);
		}

		return method;
	}

	$target.define("replace", factory.createBuiltInFunction(function* (regexOrSubstr, substrOrFn) {
		assertIsNotNullOrUndefined(this.node, "String.prototype.replace");

		let replaceKey = SymbolType.getByKey("replace");
		if (replaceKey && !isNullOrUndefined(regexOrSubstr)) {
			let replaceMethod = getMethod(regexOrSubstr, replaceKey);
			if (replaceMethod) {
				return yield replaceMethod.call(regexOrSubstr, [this.node, substrOrFn]);
			}
		}

		let stringValue = yield toString(this.node);

		let matcher;
		if (regexOrSubstr && regexOrSubstr.className === "RegExp") {
			matcher = regexOrSubstr.source;
		} else {
			matcher = yield toString(regexOrSubstr);
		}

		let replacer;
		if (substrOrFn && substrOrFn.type === "function") {
			replacer = function (...args) {
				let thisArg = substrOrFn.isStrict() || substrOrFn.isStrict() ? UNDEFINED : env.global;
				let mappedArgs = args.map(arg => factory.createPrimitive(arg));
				let replacedValue = x(substrOrFn.call(thisArg, mappedArgs));
				return replacedValue ? x(toString(replacedValue)) : undefined;
			};
		} else {
			replacer = yield toString(substrOrFn);
		}

		return factory.createPrimitive(stringValue.replace(matcher, replacer));
	}, 2, "String.prototype.replace"));
}
