import {assertIsFunction, assertIsObject} from "../utils/contracts";
import {isNullOrUndefined} from "../utils/checks";

import iterate from "../iterators";

import $add from "./set.add";
import $clear from "./set.clear";
import $delete from "./set.delete";
import $forEach from "./set.for-each";
import $has from "./set.has";
import $size from "./set.size";
import $iterator from "./set.iterator";

export default function ($global, env, factory) {
	let proto = factory.createObject();

	let setClass = factory.createFunction(function* (iterable) {
		if (!this.isNew) {
			throw TypeError("Constructor Set requires 'new'");
		}

		let instance = factory.create("Set");

		if (!isNullOrUndefined(iterable)) {
			assertIsObject(iterable, "Set");

			let adder = proto.getValue("add");
			assertIsFunction(adder, "add");

			let it = iterate.getIterator(iterable);
			yield it.each(function* (item) {
				yield adder.call(instance, [item]);
			});
		}

		return instance;
	}, proto, {name: "Set"});

	$add(proto, env, factory);
	$clear(proto, env, factory);
	$delete(proto, env, factory);
	$forEach(proto, env, factory);
	$has(proto, env, factory);
	$size(proto, env, factory);
	$iterator(proto, env, factory);

	$global.define("Set", setClass);
}
