var Scope = require("./scope");
var ObjectType = require("../types/object-type");
var PrimitiveType = require("../types/primitive-type");
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var numberAPI = require("./number-api");
var stringAPI = require("./string-api");
var functionAPI = require("./function-api");
var objectAPI = require("./object-api");
var booleanAPI = require("./boolean-api");
var dateAPI = require("./date-api");
var arrayAPI = require("./array-api");
var mathAPI = require("./math-api");
var regexAPI = require("./regex-api");

module.exports = function () {
	var globalObject = new ObjectType();
	var scope = new Scope(null, globalObject);

	var undefinedClass = new PrimitiveType(undefined);
	scope.setProperty("undefined", undefinedClass);
	typeRegistry.set("UNDEFINED", undefinedClass);

	var nullClass = new PrimitiveType(null);
	scope.setProperty("null", nullClass, { configurable: false, writable: false });
	typeRegistry.set("NULL", nullClass);

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

	return scope;
};
