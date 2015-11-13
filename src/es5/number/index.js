import {toPrimitive, primitiveToObject} from "../../utils/native";
import {assertIsNotGeneric} from "../../utils/contracts";

import $toFixed from "./number.to-fixed";
import $toString from "./number.to-string";
import $valueOf from "./number.value-of";

export default function numberApi (env) {
	const {global: globalObject, objectFactory} = env;

	let proto = objectFactory.createObject();
	proto.className = "Number";
	proto.value = 0;

	let numberClass = objectFactory.createFunction(function* (obj) {
		let numberValue = Number(yield toPrimitive(obj, "number"));

		if (this.isNew) {
			return primitiveToObject(env, numberValue);
		}

		return objectFactory.create("Number", numberValue);
	}, proto, {configurable: false, enumerable: false, writable: false});

	["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"].forEach(name => {
		numberClass.define(name, objectFactory.createPrimitive(Number[name]), {configurable: false, enumerable: false, writable: false});
	});

	$toFixed(proto, env, objectFactory);
	$toString(proto, env, objectFactory);
	$valueOf(proto, env, objectFactory);

	["toExponential", "toPrecision", "toLocaleString"].forEach(name => {
		let fn = Number.prototype[name];
		if (fn) {
			let methodName = `Number.prototype.${name}`;
			proto.define(name, objectFactory.createBuiltInFunction(function () {
				assertIsNotGeneric(this.node, "Number", methodName);
				return objectFactory.createPrimitive(fn.call(this.node.value));
			}, fn.length, methodName));
		}
	});

	globalObject.define("Number", numberClass);
}
