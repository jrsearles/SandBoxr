import {toString, toPrimitive, primitiveToObject} from "../../utils/native";
import {map} from "../../utils/async";

import $fromCharCode from "./string.from-char-code";
import $concat from "./string.concat";
import $match from "./string.match";
import $replace from "./string.replace";
import $search from "./string.search";
import $slice from "./string.slice";
import $split from "./string.split";
import $substring from "./string.substring";
import $toString from "./string.to-string";
import $trim from "./string.trim";
import $valueOf from "./string.value-of";

export default function (env) {
	const {global: globalObject, objectFactory} = env;

	function* getString (value, isNew) {
		if (!value) {
			return "";
		}

		if (!isNew && value.isSymbol) {
			return `Symbol(${value.description})`;
		}

		return yield toString(value.getValue());
	}

	let proto = objectFactory.createObject();

	// prototype can be coerced into an empty string
	proto.value = "";
	proto.className = "String";
	proto.defineOwnProperty("length", {value: objectFactory.createPrimitive(0)});

	let stringClass = objectFactory.createFunction(function* (value) {
		let stringValue = yield getString(value, this.isNew);

		// called as new
		if (this.isNew) {
			return primitiveToObject(env, stringValue);
		}

		return objectFactory.createPrimitive(stringValue);
	}, proto, {configurable: false, enumerable: false, writable: false, name: "String"});

	$fromCharCode(stringClass, env, objectFactory);

	$concat(proto, env, objectFactory);
	$match(proto, env, objectFactory);
	$replace(proto, env, objectFactory);
	$search(proto, env, objectFactory);
	$slice(proto, env, objectFactory);
	$split(proto, env, objectFactory);
	$substring(proto, env, objectFactory);
	$toString(proto, env, objectFactory);
	$trim(proto, env, objectFactory);
	$valueOf(proto, env, objectFactory);

	["charAt", "charCodeAt", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase"].forEach(name => {
		proto.define(name, objectFactory.createBuiltInFunction(function* () {
			let stringValue = yield toString(this.object);
			let args = yield* map(arguments, function* (arg) { return yield toPrimitive(arg); });

			return objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args));
		}, String.prototype[name].length, "String.prototype." + name));
	});

	globalObject.define("String", stringClass);
}
