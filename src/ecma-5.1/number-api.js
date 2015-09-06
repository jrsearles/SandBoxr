import * as convert from "../utils/convert";
import * as contracts from "../utils/contracts";

const constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
const protoMethods = ["toExponential", "toPrecision", "toLocaleString"];

export default function numberApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	let numberClass = objectFactory.createFunction(function (obj) {
		let numberValue = Number(convert.toPrimitive(env, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(env, numberValue);
		}

		return objectFactory.create("Number", numberValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = numberClass.getValue("prototype");
	proto.className = "Number";
	proto.value = 0;

	proto.define("toString", objectFactory.createBuiltInFunction(function (radix) {
		contracts.assertIsNotGeneric(this.node, "Number", "Number.prototype.toString");

		let radixValue = 10;
		if (radix) {
			radixValue = convert.toPrimitive(env, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, 1, "Number.prototype.toString"));

	proto.define("toFixed", objectFactory.createBuiltInFunction(function (fractionDigits) {
		contracts.assertIsNotGeneric(this.node, "Number", "Number.prototype.toFixed");

		let digits = 0;
		if (fractionDigits) {
			digits = convert.toNumber(env, fractionDigits);
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.value, digits));
	}, 1, "Number.prototype.toFixed"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Number", "Number.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"));

	constants.forEach(name => {
		numberClass.define(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(name => {
		let fn = Number.prototype[name];
		if (fn) {
			let methodName = `Number.prototype.${name}`;
			proto.define(name, objectFactory.createBuiltInFunction(function () {
				contracts.assertIsNotGeneric(this.node, "Number", methodName);
				return objectFactory.createPrimitive(fn.call(this.node.value));
			}, fn.length, methodName));
		}
	});

	globalObject.define("Number", numberClass);
}
