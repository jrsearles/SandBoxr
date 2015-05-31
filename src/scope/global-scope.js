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
	var scope = new Scope();
	scope.start();

	var undefinedClass = new PrimitiveType(undefined);
	scope.setProperty("undefined", undefinedClass);

	var nullClass = new PrimitiveType(null);
	scope.setProperty("null", nullClass, { configurable: false, writable: false });

	// set globals
	scope.setProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false });
	scope.setProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false });

	// todo: node vs browser - do we care?
	scope.setProperty("window", scope, { configurable: false, writable: false });

	// create function
	functionAPI(scope);
	objectAPI(scope);
	arrayAPI(scope);
	booleanAPI(scope);
	numberAPI(scope);
	stringAPI(scope);
	dateAPI(scope);
	regexAPI(scope);
	mathAPI(scope);
	errorAPI(scope);
	consoleAPI(scope);

	globalFunctions.forEach(function (name) {
		scope.setProperty(name, objectFactory.createFunction(utils.wrapNative(global[name])));
	});

	// scope.setProperty("isNaN", objectFactory.createFunction(utils.wrapNative(isNaN)));
	// scope.setProperty("parseInt", objectFactory.createFunction(utils.wrapNative(parseInt)));
	// scope.setProperty("parseFloat", objectFactory.createFunction(utils.wrapNative(parseFloat)));
	// scope.setProperty("isFinite", objectFactory.createFunction(utils.wrapNative(isFinite)));

	if (options.parser) {
		scope.setProperty("eval", objectFactory.createFunction(function (code) {
			var undef = this.scope.global.getProperty("undefined");
			var ast = options.parser(code.toString());
			var executionResult = this.create(ast, null, this.scope.parent).execute();
			return executionResult ? executionResult.result : undef;
		}));
	}

	scope.end();
	return scope;
};
