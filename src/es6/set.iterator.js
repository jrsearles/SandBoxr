import {assertIsSet} from "../utils/contracts";
import {SymbolType} from "../types/symbol-type";

export default function ($target, env, factory) {
	function* getIterator (obj, kind) {
		let index = 0;
		let done = false;

		while (!done) {
			let value;

			while (index < obj.data.length) {
				value = obj.data[index++];
				if (value) {
					break;
				}
			}

			done = !value;
			if (value && kind !== "key" && kind !== "value") {
				value = factory.createArray([value, value]);
			}

			yield factory.createIteratorResult({value, done});
		}
	}

	let proto = factory.createObject();
	proto.define(SymbolType.getByKey("toStringTag"), factory.createPrimitive("Set Iterator"), {writable: false});

	$target.define("entries", factory.createBuiltInFunction(function () {
		assertIsSet(this.node, "Set.prototype.entries");
		let it = getIterator(this.node, "key+value");
		return factory.createIterator(it, proto);
	}, 0, "Set.prototype.entries"));

	let valuesFunc = factory.createBuiltInFunction(function () {
		assertIsSet(this.node, "Set.prototype.values");
		let it = getIterator(this.node, "value");
		return factory.createIterator(it, proto);
	}, 0, "Set.prototype.values");


	$target.define("values", valuesFunc);
	$target.define("keys", valuesFunc);

	let iteratorKey = SymbolType.getByKey("iterator");
	$target.define(iteratorKey, valuesFunc);
}
