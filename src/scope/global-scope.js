var Environment = require("../env/environment");
// var Scope = require("./scope");
var PrimitiveType = require("../types/primitive-type");
var ObjectFactory = require("../types/object-factory");
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
var convert = require("../utils/convert");
var Reference = require("../env/reference");

var globalFunctions = ["isNaN", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"];
var frozen = { configurable: false, enumerable: false, writable: false };

module.exports = function GlobalScope (runner) {
	var config = runner.config;
	var env = new Environment(runner);
	var objectFactory = env.objectFactory = new ObjectFactory(env);
	var globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	var undefinedClass = new PrimitiveType(undefined);
	globalObject.define("undefined", undefinedClass, frozen);

	var nullClass = new PrimitiveType(null);
	globalObject.define("null", nullClass, frozen);

	globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), frozen);
	globalObject.define("NaN", objectFactory.createPrimitive(NaN), frozen);

	// todo: node vs browser - do we care?
	globalObject.define("window", globalObject, frozen);

	functionAPI(env, config);
	objectAPI(env, config);
	arrayAPI(env, config);
	booleanAPI(env, config);
	numberAPI(env, config);
	stringAPI(env, config);
	dateAPI(env, config);
	regexAPI(env, config);
	mathAPI(env, config);
	errorAPI(env, config);
	jsonAPI(env, config);
	consoleAPI(env, config);

	globalFunctions.forEach(function (name) {
		globalObject.define(name, convert.toNativeFunction(objectFactory, global[name], name));
	});

	globalObject.define("parseInt", objectFactory.createBuiltInFunction(function (value, radix) {
		var stringValue = convert.toPrimitive(this, value, "string");
		radix = convert.toPrimitive(this, radix, "number");

		return objectFactory.createPrimitive(parseInt(stringValue, radix));
	}, 2, "parseInt"));

	globalObject.define("parseFloat", objectFactory.createBuiltInFunction(function (value) {
		var stringValue = convert.toPrimitive(this, value, "string");
		return objectFactory.createPrimitive(parseFloat(stringValue));
	}, 2, "parseFloat"));

	if (config.parser) {
		var evalFunc = objectFactory.createBuiltInFunction(function (code) {
			if (!code) {
				return undefinedClass;
			}

			if (code.type !== "string") {
				return code;
			}

			var indirect = !(this.callee instanceof Reference) || this.callee.base !== globalObject;
			var ast;

			try {
				ast = config.parser(code.value);
			} catch (err) {
				if (err instanceof SyntaxError && /assigning to rvalue/i.test(err.message)) {
					// hack because acorn throws syntax error
					throw new ReferenceError("Invalid left-hand side in assignment");
				}

				throw err;
			}

			// use the same scope unless this is an "indirect" call
			// in which case we use the global scope
			var scope = this.env.setScope(indirect ? this.env.globalScope : this.env.current.parent);
			var executionResult;

			try {
				executionResult = this.create(ast).execute();
			} catch (err) {
				scope.exitScope();
				throw err;
			}

			scope.exitScope();
			return executionResult && executionResult.result ? executionResult.result.getValue() : undefinedClass;
		}, 1, "eval");

		// evalFunc.parent = globalObject.getValue("Object");
		// evalFunc.setProto(null);
		globalObject.define("eval", evalFunc);
	}

	// globalObject.setProto(globalObject.getValue("Object").proto);
	objectFactory.init();
	return env;
};
