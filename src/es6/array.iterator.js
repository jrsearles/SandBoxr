import {UNDEFINED} from "../types/primitive-type";
import {exhaust as x} from "../utils/async";
import {toLength, toObject} from "../utils/native";

export default function ($target, env, factory) {
	let iteratorProto = factory.createObject();
	iteratorProto.setPrototype(env.global.getValue("%IteratorPrototype%"));
	iteratorProto.className = "Array Iterator";

	iteratorProto.define("next", factory.createBuiltInFunction(function () {
		let result = this.object.advance();
		if (result.value) {
			return result.value;
		}

		return factory.createIteratorResult({done: result.done});
	}, 0, "ArrayIterator.prototype.next"));

	function createIteratorValue (arr, index, kind) {
		let key;
		if (kind !== "value") {
			key = factory.createPrimitive(index);
			if (kind === "key") {
				return key;
			}
		}

		let propInfo = arr.getProperty(index);
		let value = UNDEFINED;

		if (propInfo) {
			value = propInfo.getValue();
		}

		if (kind === "value") {
			return value;
		}

		return factory.createArray([key, value]);
	}

	function* getIterator (arr, kind) {
		let done = false;
		let index = 0;

		while (!done) {
			let length = x(toLength(arr));
			let value = UNDEFINED;

			if (index >= length) {
				done = true;
			} else {
				value = createIteratorValue(arr, index, kind);
			}

			yield factory.createIteratorResult({value, done});
			index++;
		}
	}

	$target.define("keys", factory.createBuiltInFunction(function () {
		let arr = toObject(this.object, true);
		let it = getIterator(arr, "key");
		return factory.createIterator(it, iteratorProto);
	}, 0, "Array.prototype.keys"));

	$target.define("entries", factory.createBuiltInFunction(function () {
		let arr = toObject(this.object, true);
		let it = getIterator(arr);
		return factory.createIterator(it, iteratorProto);
	}, 0, "Array.prototype.entries"));

	let stringTagKey = env.getSymbol("toStringTag");
	iteratorProto.define(stringTagKey, factory.createPrimitive("Array Iterator"), {writable: false});

	let iteratorFunc = factory.createBuiltInFunction(function () {
		let arr = toObject(this.object, true);
		let it = getIterator(arr, "value");
		return factory.createIterator(it, iteratorProto);
	}, 0, "Array.prototype.values");

	$target.define("values", iteratorFunc);

	let iteratorKey = env.getSymbol("iterator");
	$target.define(iteratorKey, iteratorFunc);
}