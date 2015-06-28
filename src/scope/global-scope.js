var Scope = require("./scope");
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

var globalFunctions = ["isNaN", "parseFloat", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"];
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (options) {
	var globalScope = new Scope();
	var objectFactory = new ObjectFactory(globalScope);

	var undefinedClass = new PrimitiveType(undefined);
	globalScope.defineOwnProperty("undefined", undefinedClass, { configurable: false, enumerable: false, writable: false });

	var nullClass = new PrimitiveType(null);
	globalScope.defineOwnProperty("null", nullClass, { configurable: false, writable: false });

	globalScope.defineOwnProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false, enumerable: false });
	globalScope.defineOwnProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false, enumerable: false });

	// todo: node vs browser - do we care?
	globalScope.defineOwnProperty("window", globalScope, { configurable: false, enumerable: true, writable: false });

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
		globalScope.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(global[name]), globalScope, null), propertyConfig);
	});

	globalScope.defineOwnProperty("parseInt", objectFactory.createFunction(function (value, radix) {
		value = convert.toPrimitive(this, value, "string");
		radix = convert.toPrimitive(this, radix, "number");

		return objectFactory.createPrimitive(parseInt(value, radix));
	}, globalScope, null), propertyConfig);

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

			try {
				var ast = options.parser(code.toString());
			} catch (err) {
				if (err instanceof SyntaxError && /assigning to rvalue/i.test(err.message)) {
					// hack because acorn throws syntax error
					throw new ReferenceError("Invalid left-hand side in assignment");
				}

				throw err;
			}

			var executionResult = this.create(ast, null, indirect ? globalScope : this.scope.parent).execute();
			if (executionResult && executionResult.result) {
				return executionResult.result;
			}

			return undefinedClass;
		}, null, null);

		// evalFunc.parent = globalScope.getValue("Object");
		// evalFunc.setProto(null);
		globalScope.defineOwnProperty("eval", evalFunc, propertyConfig);
	}

	globalScope.setProto(globalScope.getValue("Object").proto);
	objectFactory.endScope();
	return globalScope;
};
