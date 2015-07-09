var convert = require("../utils/convert");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toPrecision", "toLocaleString"];
var staticMethods = ["isNaN", "isFinite", "parseFloat", "parseInt"];

var polyfills = {
	"isNaN": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
		return typeof value === "number" && value !== value;
	},
	"isFinite": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
		return typeof value === "number" && isFinite(value);
	},
	"parseFloat": parseFloat,
	"parseInt": parseInt
};

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var numberClass = objectFactory.createFunction(function (obj) {
		var numberValue = Number(convert.toPrimitive(this, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(numberValue, objectFactory);
		}

		return objectFactory.create("Number", numberValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = numberClass.proto;
	proto.className = "Number";

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function (radix) {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.toString is not generic");
		}

		var radixValue = 10;
		if (radix) {
			radixValue = convert.toPrimitive(this, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, 1, "Number.prototype.toString"), propertyConfig);

	proto.defineOwnProperty("toFixed", objectFactory.createBuiltInFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = convert.toPrimitive(this, fractionDigits, "number");
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.toNumber(), digits));
	}, 1, "Number.prototype.toFixed"), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"), propertyConfig);

	constants.forEach(function (name) {
		numberClass.defineOwnProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "Number.prototype." + name), propertyConfig);
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "Number." + name), propertyConfig);
		}
	});

	globalObject.defineOwnProperty("Number", numberClass, propertyConfig);
};
