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
var consoleAPI = require("./console-api");
var utils = require("../utils");

var globalFunctions = ["isNaN", "parseInt", "parseFloat", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent"];

module.exports = function (options) {
	var globalScope = new Scope();
	globalScope.start();

	var undefinedClass = new PrimitiveType(undefined);
	globalScope.defineProperty("undefined", undefinedClass, { enumerable: false });

	var nullClass = new PrimitiveType(null);
	globalScope.defineProperty("null", nullClass, { configurable: false, writable: false });

	globalScope.defineProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false, enumerable: false });
	globalScope.defineProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false, enumerable: false });

	// todo: node vs browser - do we care?
	globalScope.defineProperty("window", globalScope, { configurable: false, writable: false });

	functionAPI(globalScope);
	objectAPI(globalScope);
	arrayAPI(globalScope);
	booleanAPI(globalScope);
	numberAPI(globalScope);
	stringAPI(globalScope);
	dateAPI(globalScope);
	regexAPI(globalScope);
	mathAPI(globalScope);
	errorAPI(globalScope);
	consoleAPI(globalScope);

	globalFunctions.forEach(function (name) {
		globalScope.defineProperty(name, objectFactory.createFunction(utils.wrapNative(global[name])), { enumerable: false });
	});

	if (options.parser) {
		globalScope.defineProperty("eval", objectFactory.createFunction(function (code) {
			var indirect = this.callee.name !== "eval";
			var undef = this.scope.global.getProperty("undefined");
			var ast = options.parser(code.toString());

			var executionResult = this.create(ast, null, indirect ? globalScope : this.scope.parent).execute();
			return executionResult ? executionResult.result : undef;
		}), { enumerable: false });
	}

	globalScope.end();
	return globalScope;
};
