import { assertIsNotNullOrUndefined, isRegExp } from "../utils/contracts";
import { isUndefined } from "../utils/checks";
import { toString, toInteger } from "../utils/native";

export default function (target, env, factory) {
  function stringIncludes (source, search, start, end) {
    if (!search) {
      return true;
    }

    if (start < 0 || end > source.length) {
      return false;
    }

    return source.substring(start, end) === search;
  }

  target.define("endsWith", factory.createBuiltInFunction(function* (searchString, endPosition) {
    assertIsNotNullOrUndefined(this.object, "String.prototype.endsWith");
    let stringValue = yield toString(this.object);

    if (isRegExp(searchString)) {
      throw TypeError("First argument to String.prototype.endsWith must not be a regular expression");
    }

    let searchValue = yield toString(searchString);
    let end = stringValue.length;
    if (!isUndefined(endPosition)) {
      end = yield toInteger(endPosition);
    }

    end = Math.min(Math.max(end, 0), stringValue.length);
    return factory.createPrimitive(stringIncludes(stringValue, searchValue, end - searchValue.length, end));
  }, 1, "String.prototype.endsWith"));

  target.define("startsWith", factory.createBuiltInFunction(function* (searchString, startPosition) {
    assertIsNotNullOrUndefined(this.object, "String.prototype.startsWith");
    let stringValue = yield toString(this.object);

    if (isRegExp(searchString)) {
      throw TypeError("First argument to String.prototype.startsWith must not be a regular expression");
    }

    let searchValue = yield toString(searchString);
    let start = yield toInteger(startPosition);
    start = Math.max(start, 0);
    return factory.createPrimitive(stringIncludes(stringValue, searchValue, start, start + searchValue.length));
  }, 1, "String.prototype.startsWith"));

  target.define("includes", factory.createBuiltInFunction(function* (searchString, position) {
    assertIsNotNullOrUndefined(this.object, "String.prototype.includes");
    let stringValue = yield toString(this.object);

    if (isRegExp(searchString)) {
      throw TypeError("First argument to String.prototype.includes must not be a regular expression");
    }

    let searchValue = yield toString(searchString);
    let length = stringValue.length;

    let start = yield toInteger(position);
    start = Math.min(Math.max(start, 0), length);

    let end = start + searchValue.length;
    let result = false;

    do {
      if (stringIncludes(stringValue, searchValue, start++, end++)) {
        result = true;
        break;
      }
    } while (end <= length);

    return factory.createPrimitive(result);
  }, 1, "String.prototype.includes"));
}
