import PrimitiveType from "../types/primitive-type";
import ObjectFactory from "../types/object-factory";
import Reference from "../env/reference";
import numberAPI from "./number-api";
import stringAPI from "./string-api";
import functionAPI from "./function-api";
import objectAPI from "./object-api";
import booleanAPI from "./boolean-api";
import dateAPI from "./date-api";
import arrayAPI from "./array-api";
import mathAPI from "./math-api";
import regexAPI from "./regex-api";
import errorAPI from "./error-api";
import jsonAPI from "./json-api";
import consoleAPI from "./console-api";
import * as convert from "../utils/convert";
import * as contracts from "../utils/contracts";

const frozen = { configurable: false, enumerable: false, writable: false };

export default function ecma51 (env) {
	const options = env.options;
	const objectFactory = env.objectFactory = new ObjectFactory(env);
	const globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	let undefinedClass = new PrimitiveType();
	globalObject.define("undefined", undefinedClass, frozen);

	let nullClass = new PrimitiveType(null);
	globalObject.define("null", nullClass, frozen);

	globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), frozen);
	globalObject.define("NaN", objectFactory.createPrimitive(NaN), frozen);

	// todo: node vs browser - do we care?
	globalObject.define("window", globalObject, frozen);

	functionAPI(env, options);
	objectAPI(env, options);
	arrayAPI(env, options);
	booleanAPI(env, options);
	numberAPI(env, options);
	stringAPI(env, options);
	dateAPI(env, options);
	regexAPI(env, options);
	mathAPI(env, options);
	errorAPI(env, options);
	jsonAPI(env, options);
	consoleAPI(env, options);

	["parseFloat", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"].forEach(name => {
		globalObject.define(name, objectFactory.createBuiltInFunction(function (value) {
			let stringValue = convert.toString(env, value);
			return objectFactory.createPrimitive(global[name](stringValue));
		}, 1, name));
	});

	["isNaN", "isFinite"].forEach(function (name) {
		globalObject.define(name, convert.toNativeFunction(env, global[name], name));
	});

	globalObject.define("parseInt", objectFactory.createBuiltInFunction(function (value, radix) {
		let stringValue = convert.toString(env, value);
		radix = convert.toPrimitive(env, radix, "number");

		return objectFactory.createPrimitive(parseInt(stringValue, radix));
	}, 2, "parseInt"));

	if (options.parser) {
		let evalFunc = objectFactory.createBuiltInFunction(function (code) {
			if (!code) {
				return undefinedClass;
			}

			if (code.type !== "string") {
				return code;
			}

			let directCall = this.callee instanceof Reference && this.callee.base === globalObject;
			let ast;

			try {
				ast = options.parser(code.value);
			} catch (err) {
				if (err instanceof SyntaxError && /assigning to rvalue/i.test(err.message)) {
					// hack because acorn throws syntax error
					throw new ReferenceError("Invalid left-hand side in assignment");
				}

				throw err;
			}

			let strictScope = env.isStrict();
			let strictCode = strictScope || contracts.isStrictNode(ast.body);
			let currentGlobal = env.current.scope.parent === env.globalScope.scope;
			let scope;

			// use the same scope unless this is an "indirect" call
			// in which case we use the global scope
			if (directCall) {
				if (strictCode) {
					let thisArg;
					if (strictScope) {
						thisArg = currentGlobal ? globalObject : undefinedClass;
					} else {
						thisArg = env.getThisBinding() || globalObject;
					}

					scope = env.createScope(thisArg);
				} else {
					scope = env.setScope(env.current.scope.parent);
				}
			} else {
				scope = env.setScope(env.globalScope.scope);
				if (strictCode) {
					scope = env.createScope(globalObject);
				}
			}

			let executionResult = scope.use(() => {
				return this.create(ast).execute();
			});

			return executionResult && executionResult.result ? executionResult.result.getValue() : undefinedClass;
		}, 1, "eval");

		globalObject.define("eval", evalFunc);
	}

	objectFactory.init();

	if (options.exclude && options.exclude.length > 0) {
		options.exclude.forEach(name => {
			let segments = name.split(".");
			let parent = globalObject;

			while (segments.length > 1) {
				parent = parent.getValue(segments.shift());

				// api not defined - assume user error?
				if (!parent) {
					return;
				}
			}

			parent.remove(segments.shift());
		});
	}
}
