import {isConstructor} from "../utils/checks";

export default function ($target, env, factory) {
	$target.define("of", factory.createBuiltInFunction(function* (...items) {
		if (this.object === $target || !isConstructor(this.object)) {
			return factory.createArray(items);
		}

		let length = items.length;
		let lengthValue = factory.createPrimitive(length);
		let arr = yield this.object.construct(this.object, [lengthValue]);
		let i = 0;

		while (i < length) {
			arr.defineProperty(i, {value: items[i], configurable: true, enumerable: true, writable: true}, true);
			i++;
		}

		arr.setValue("length", lengthValue);
		return arr;
	}, 0, "Array.of"));
}
