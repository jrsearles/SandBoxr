import {assertIsValidArrayLength} from "../../utils/contracts";

import $isArray from "./array.is-array";
import $concat from "./array.concat";
import $every from "./array.every";
import $filter from "./array.filter";
import $forEach from "./array.for-each";
import $indexOf from "./array.index-of";
import $join from "./array.join";
import $lastIndexOf from "./array.last-index-of";
import $map from "./array.map";
import $pop from "./array.pop";
import $push from "./array.push";
import $reduce from "./array.reduce";
import $reduceRight from "./array.reduce-right";
import $reverse from "./array.reverse";
import $shift from "./array.shift";
import $slice from "./array.slice";
import $some from "./array.some";
import $sort from "./array.sort";
import $splice from "./array.splice";
import $toLocaleString from "./array.to-locale-string";
import $toString from "./array.to-string";
import $unshift from "./array.unshift";

export default function (env) {
	const {global: globalObject, objectFactory} = env;

	let proto = objectFactory.createObject();
	proto.className = "Array";
	proto.define("length", objectFactory.createPrimitive(0), {configurable: false, enumerable: false, writable: true});

	let arrayClass = objectFactory.createFunction(function (length) {
		if (arguments.length === 1 && length.type === "number") {
			assertIsValidArrayLength(arguments[0].toNative());

			let newArray = objectFactory.createArray();
			newArray.setValue("length", length);
			return newArray;
		}

		return objectFactory.createArray(arguments);
	}, proto, {configurable: false, enumerable: false, writable: false});

	$isArray(arrayClass, env, objectFactory);
	$push(proto, env, objectFactory);
	$pop(proto, env, objectFactory);
	$shift(proto, env, objectFactory);
	$unshift(proto, env, objectFactory);
	$slice(proto, env, objectFactory);
	$splice(proto, env, objectFactory);
	$concat(proto, env, objectFactory);
	$join(proto, env, objectFactory);
	$indexOf(proto, env, objectFactory);
	$lastIndexOf(proto, env, objectFactory);
	$forEach(proto, env, objectFactory);
	$map(proto, env, objectFactory);
	$filter(proto, env, objectFactory);
	$every(proto, env, objectFactory);
	$some(proto, env, objectFactory);
	$reduce(proto, env, objectFactory);
	$reduceRight(proto, env, objectFactory);
	$reverse(proto, env, objectFactory);
	$sort(proto, env, objectFactory);
	$toLocaleString(proto, env, objectFactory);
	$toString(proto, env, objectFactory);

	globalObject.define("Array", arrayClass);
}
