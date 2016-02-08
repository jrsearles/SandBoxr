import { toString } from "../../utils/native";
import { isNullOrUndefined } from "../../utils/checks";
import { getMethod } from "../../utils/helpers";

export default function ($target, env, factory) {
  $target.define("search", factory.createBuiltInFunction(function* (regexp) {
    let searchKey = env.getSymbol("search");
    if (searchKey) {
      if (!isNullOrUndefined(regexp))  {
        let searcher = getMethod(regexp, searchKey);
        if (searcher) {
          return yield searcher.call(regexp, [this.object]);
        }
      }
      
      let rgx = yield env.getValue("RegExp").construct(null, [regexp]);
      return yield rgx.getValue(searchKey).call(rgx, [this.object]);
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

    return factory.create("Number", stringValue.search(underlyingRegex));
  }, 1, "String.prototype.search"));
}
