import {isConstructor} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("of", factory.createBuiltInFunction(function* (...items) {
		if (this.node === $target || !isConstructor(this.node)) {
			return factory.createArray(items);
		}

		let length = items.length;
		let lengthValue = factory.createPrimitive(length);
		let arr = yield this.node.construct(this.node, [lengthValue]);
		let i = 0;

		while (i < length) {
			arr.defineOwnProperty(i, {value: items[i], configurable: true, enumerable: true, writable: true}, true);
			i++;
		}

		arr.setValue("length", lengthValue);
		return arr;
	}, 0, "Array.of"));
}
