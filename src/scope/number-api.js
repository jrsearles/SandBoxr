var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var typeUtils = require("../types/type-utils");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toFixed", "toPrecision", "toString"];
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
		value = Number(typeUtils.toPrimitive(this, value, "number"));

		// called with `new`
		if (this.scope.thisNode !== globalScope) {
			return utils.createWrappedPrimitive(this.node, value);
		}

		return objectFactory.createPrimitive(value);
	}, globalScope);

	var proto = numberClass.properties.prototype;

	constants.forEach(function (name) {
		numberClass.setProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), { configurable: true, enumerable: false, writable: true });
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), { configurable: true, enumerable: false, writable: true });
		}
	});

	globalScope.setProperty("Number", numberClass);
};
