var convert = require("../utils/convert");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toPrecision", "toLocaleString"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var numberClass = objectFactory.createFunction(function (obj) {
		var numberValue = Number(convert.toPrimitive(env, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(env, numberValue);
		}

		return objectFactory.create("Number", numberValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = numberClass.getProperty("prototype").getValue();
	proto.className = "Number";
	proto.value = 0;

	proto.define("toString", objectFactory.createBuiltInFunction(function (radix) {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.toString is not generic");
		}

		var radixValue = 10;
		if (radix) {
			radixValue = convert.toPrimitive(env, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, 1, "Number.prototype.toString"));

	proto.define("toFixed", objectFactory.createBuiltInFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = convert.toNumber(env, fractionDigits);
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.value, digits));
	}, 1, "Number.prototype.toFixed"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"));

	constants.forEach(function (name) {
		numberClass.define(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name];
		if (fn) {
			proto.define(name, convert.toNativeFunction(env, fn, "Number.prototype." + name));
		}
	});

	globalObject.define("Number", numberClass);
};
