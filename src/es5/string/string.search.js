import {toString} from "../../utils/native";
import {isNullOrUndefined} from "../../utils/contracts";
import {getMethod} from "../../utils/func";

export default function ($target, env, factory) {
	$target.define("search", factory.createBuiltInFunction(function* (regexp) {
		if (!isNullOrUndefined(regexp))  {
			let searchKey = env.getSymbol("search");
			if (searchKey) {
				let searcher = getMethod(regexp, searchKey);
				if (searcher) {
					return yield searcher.call(regexp, [this.object]);
				}
			}
		}
		
		let stringValue = yield toString(this.object);
		let underlyingRegex;

		if (regexp) {
			if (regexp.className === "RegExp") {
				underlyingRegex = regexp.source;
			} else {
				underlyingRegex = new RegExp(yield toString(regexp));
			}
		}

		return factory.createPrimitive(stringValue.search(underlyingRegex));
	}, 1, "String.prototype.search"));
}
