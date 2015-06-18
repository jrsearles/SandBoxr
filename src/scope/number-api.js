var objectFactory = require("../types/object-factory");
var utils = require("../utils");

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

module.exports = function (globalScope) {
	var numberClass = objectFactory.createFunction(function (value) {
		value = Number(utils.toPrimitive(this, value, "number"));
		var numberValue = objectFactory.create("Number", value);

		if (this.isNew) {
			numberValue.type = "object";
			numberValue.isPrimitive = false;
			// return utils.createWrappedPrimitive(this.node, value);
		}

		return numberValue;
		// return objectFactory.createPrimitive(value);
	}, globalScope);

	var proto = numberClass.proto;
	proto.className = "Number";
	proto.defineOwnProperty("toString", objectFactory.createFunction(function (radix) {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.toString is not generic");
		}

		var radixValue = 10;
		if (radix) {
			radixValue = utils.toPrimitive(this, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, globalScope), { enumerable: false });

	proto.defineOwnProperty("toFixed", objectFactory.createFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = utils.toPrimitive(this, fractionDigits, "number");
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.toNumber(), digits));
	}, globalScope), { enumerable: false });

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, globalScope), { enumerable: false });

	constants.forEach(function (name) {
		numberClass.defineOwnProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), { configurable: true, enumerable: false, writable: true });
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), { configurable: true, enumerable: false, writable: true });
		}
	});

	globalScope.defineOwnProperty("Number", numberClass, { enumerable: false });
};
