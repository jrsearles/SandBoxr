import {assertIsMap} from "../utils/contracts";

export default function ($target, env, factory) {
	function createIteratorValue (entry, kind) {
		if (kind === "key") {
			return entry.key;
		}

		if (kind === "value") {
			return entry.value;
		}

		return factory.createArray([entry.key, entry.value]);
	}

	function* getIterator (obj, kind) {
		let done = false;
		let index = 0;

		while (!done) {
			let value;

			while (index < obj.data.length) {
				let current = obj.data[index++];
				if (current) {
					value = createIteratorValue(current, kind);
					break;
				}
			}

			done = !value;
			yield factory.createIteratorResult({value, done});
		}
	}

	let proto = factory.createObject();
	proto.setPrototype(env.global.getValue("%IteratorPrototype%"));
	proto.define(env.getSymbol("toStringTag"), factory.createPrimitive("Map Iterator"), {writable: false});

	proto.define("next", factory.createBuiltInFunction(function () {
		let result = this.object.advance();
		if (result.value) {
			return result.value;
		}

		return factory.createIteratorResult({done: result.done});
	}, 0, "MapIterator.prototype.next"));

	$target.define("keys", factory.createBuiltInFunction(function () {
		assertIsMap(this.object, "Map.prototype.keys");
		let it = getIterator(this.object, "key");
		return factory.createIterator(it, proto);
	}, 0, "Map.prototype.keys"));

	$target.define("values", factory.createBuiltInFunction(function () {
		assertIsMap(this.object, "Map.prototype.values");
		let it = getIterator(this.object, "value");
		return factory.createIterator(it, proto);
	}, 0, "Map.prototype.values"));

	let iteratorFunc = factory.createBuiltInFunction(function () {
		assertIsMap(this.object, "Map.prototype.entries");
		let it = getIterator(this.object);
		return factory.createIterator(it, proto);
	}, 0, "Map.prototype.entries");


	$target.define("entries", iteratorFunc);

	let iteratorKey = env.getSymbol("iterator");
	$target.define(iteratorKey, iteratorFunc);
}
