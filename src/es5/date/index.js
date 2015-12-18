import {toPrimitive, toNumber, toNativeFunction} from "../../utils/native";
import {map} from "../../utils/async";

import $parse from "./date.parse";
import $utc from "./date.utc";
import $valueOf from "./date.value-of";

const staticMethods = ["now"];

const protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];

const setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];

export default function dateApi (env) {
	const {global: globalObject, objectFactory} = env;

	let proto = objectFactory.createObject();
	proto.className = "Date";
	proto.value = new Date(0);

	let dateClass = objectFactory.createFunction(function* (p1, p2, p3, p4, p5, p6, p7) {
		let dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			if (p1.isPrimitive) {
				args = [p1.value];
			} else {
				let primitiveValue = yield toPrimitive(p1);
				if (typeof primitiveValue !== "string") {
					primitiveValue = yield toNumber(p1);
				}

				args = [primitiveValue];
			}
		} else {
			args = yield* map(arguments, function* (arg) { return yield toPrimitive(arg, "number"); });
		}

		if (this.isNew) {
			switch (args.length) {
				case 0:
					dateValue = new Date();
					break;

				case 1:
					dateValue = new Date(args[0]);
					break;

				default:
					let i = args.length;
					while (i < 7) {
						// default day to 1, all others to 0
						args[i++] = i === 3 ? 1 : 0;
					}

					dateValue = new Date(...args);
					break;
			}

			return objectFactory.create("Date", dateValue);
		}

		dateValue = Date(...args);
		return objectFactory.createPrimitive(dateValue);
	}, proto, {configurable: false, enumerable: false, writable: false});

	$parse(dateClass, env, objectFactory);
	$utc(dateClass, env, objectFactory);
	$valueOf(proto, env, objectFactory);

	staticMethods.forEach(name => {
		dateClass.define(name, toNativeFunction(env, Date[name], "Date." + name));
	});

	protoMethods.forEach(name => {
		proto.define(name, toNativeFunction(env, Date.prototype[name], "Date.prototype." + name));
	});

	setters.forEach(name => {
		function* setter () {
			let args = yield* map(arguments, function* (arg) { return yield toPrimitive(arg); });
			Date.prototype[name].apply(this.object.value, args);
		}

		proto.define(name, objectFactory.createBuiltInFunction(setter, Date.prototype[name].length, "Date.prototype." + name));
	});

	globalObject.define("Date", dateClass);
}
