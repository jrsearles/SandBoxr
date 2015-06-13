var Scope = require("./scope");
var PrimitiveType = require("../types/primitive-type");
var objectFactory = require("../types/object-factory");
var numberAPI = require("./number-api");
var stringAPI = require("./string-api");
var functionAPI = require("./function-api");
var objectAPI = require("./object-api");
var booleanAPI = require("./boolean-api");
var dateAPI = require("./date-api");
var arrayAPI = require("./array-api");
var mathAPI = require("./math-api");
var regexAPI = require("./regex-api");
var errorAPI = require("./error-api");
var jsonAPI = require("./json-api");
var consoleAPI = require("./console-api");
var utils = require("../utils");

var globalFunctions = ["isNaN", "parseFloat", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"];

module.exports = function (options) {
	var globalScope = new Scope();
	globalScope.start();

	var undefinedClass = new PrimitiveType(undefined);
	globalScope.defineProperty("undefined", undefinedClass, { configurable: false, enumerable: false, writable: false });

	var nullClass = new PrimitiveType(null);
	globalScope.defineProperty("null", nullClass, { configurable: false, writable: false });

	globalScope.defineProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false, enumerable: false });
	globalScope.defineProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false, enumerable: false });

	// todo: node vs browser - do we care?
	globalScope.defineProperty("window", globalScope, { configurable: false, writable: false });

	functionAPI(globalScope, options);
	objectAPI(globalScope, options);
	arrayAPI(globalScope, options);
	booleanAPI(globalScope, options);
	numberAPI(globalScope, options);
	stringAPI(globalScope, options);
	dateAPI(globalScope, options);
	regexAPI(globalScope, options);
	mathAPI(globalScope, options);
	errorAPI(globalScope, options);
	jsonAPI(globalScope, options);
	consoleAPI(globalScope, options);

	globalFunctions.forEach(function (name) {
		globalScope.defineProperty(name, objectFactory.createFunction(utils.wrapNative(global[name]), globalScope, null), { enumerable: false });
	});

	globalScope.defineProperty("parseInt", objectFactory.createFunction(function (value, radix) {
		value = utils.toPrimitive(this, value, "string");
		radix = utils.toPrimitive(this, radix, "number");

		return objectFactory.createPrimitive(parseInt(value, radix));
	}, globalScope, null), { enumerable: false });

	if (options.parser) {
		var evalFunc = objectFactory.createFunction(function (code) {
			if (this.isNew) {
				throw new TypeError("function eval() is not a constructor");
			}

			if (!code) {
				return undefinedClass;
			}

			if (code.type !== "string") {
				return code;
			}

			var indirect = this.callee.name !== "eval";
			var ast = options.parser(code.toString());

			var executionResult = this.create(ast, null, indirect ? globalScope : this.scope.parent).execute();
			if (executionResult && executionResult.result) {
				return executionResult.result;
			}

			return undefinedClass;
		}, globalScope, null);

		// evalFunc.parent = globalScope.getProperty("Object");
		// evalFunc.setProto(null);
		globalScope.defineProperty("eval", evalFunc, { enumerable: false });
	}

	globalScope.setProto(globalScope.getProperty("Object").proto);
	globalScope.end();
	return globalScope;
};
