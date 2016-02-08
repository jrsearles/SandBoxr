import {assertIsObject, assertIsFunction} from "../utils/contracts";
import {isNullOrUndefined} from "../utils/checks";
import {UNDEFINED} from "../types/primitive-type";
import iterate from "../iterators/";

import $clear from "./map.clear";
import $delete from "./map.delete";
import $forEach from "./map.for-each";
import $get from "./map.get";
import $has from "./map.has";
import $set from "./map.set";
import $size from "./map.size";
import $iterator from "./map.iterator";

export default function ($global, env, factory) {
  let proto = factory.createObject();

  let mapClass = factory.createFunction(function* (iterable) {
    if (!this.isNew) {
      throw TypeError("Constructor Map requires 'new'");
    }

    let instance = factory.create("Map");

    if (!isNullOrUndefined(iterable)) {
      assertIsObject(iterable, "Map");

      let setter = instance.getValue("set");
      assertIsFunction(setter, "set");

      let it = iterate.getIterator(iterable);
      yield it.each(function* (item) {
        assertIsObject(item, "Map");

        let key = item.getValue("0") || UNDEFINED;
        let value = item.getValue("1") || UNDEFINED;
        yield setter.call(instance, [key, value]);
      });
    }

    return instance;
  }, proto, {name: "Map", writable: false});

  $clear(proto, env, factory);
  $delete(proto, env, factory);
  $forEach(proto, env, factory);
  $get(proto, env, factory);
  $has(proto, env, factory);
  $set(proto, env, factory);
  $iterator(proto, env, factory);
  $size(proto, env, factory);

  $global.define("Map", mapClass);
}
