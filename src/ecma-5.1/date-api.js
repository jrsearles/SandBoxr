import {toPrimitive,toNumber,toNativeFunction} from "../utils/native";
import {map} from "../utils/async";

const staticMethods = ["now"];
const protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];
const setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];

export default function dateApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	let dateClass = objectFactory.createFunction(function* (p1, p2, p3, p4, p5, p6, p7) {
		let dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			if (p1.isPrimitive) {
				args = [p1.value];
			} else {
				let primitiveValue = yield toPrimitive(env, p1);
				if (typeof primitiveValue !== "string") {
					primitiveValue = yield toNumber(env, p1);
				}

				args = [primitiveValue];
			}
		} else {
			args = yield* map(arguments, function* (arg) { return yield toPrimitive(env, arg, "number"); });
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
	}, null, { configurable: false, enumerable: false, writable: false });

	dateClass.define("parse", objectFactory.createBuiltInFunction(function* (value) {
		let stringValue = yield toPrimitive(env, value, "string");
		let dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, 1, "Date.prototype.parse"));

	dateClass.define("UTC", objectFactory.createBuiltInFunction(function* () {
		let args = yield* map(arguments, function* (arg) { return yield toPrimitive(env, arg, "number"); });
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, 7, "Date.prototype.UTC"));

	let proto = dateClass.getValue("prototype");
	proto.className = "Date";
	proto.value = new Date(Date.prototype);

	staticMethods.forEach(name => {
		dateClass.define(name, toNativeFunction(env, Date[name], "Date." + name));
	});

	protoMethods.forEach(name => {
		proto.define(name, toNativeFunction(env, Date.prototype[name], "Date.prototype." + name));
	});

	setters.forEach(name => {
		function* setter () {
			let args = yield* map(arguments, function* (arg) { return yield toPrimitive(env, arg); });
			Date.prototype[name].apply(this.node.value, args);
		}

		proto.define(name, objectFactory.createBuiltInFunction(setter, Date.prototype[name].length, "Date.prototype." + name));
	});

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		return objectFactory.createPrimitive(this.node.value.valueOf());
	}, 0, "Date.prototype.valueOf"));

	globalObject.define("Date", dateClass);
}
