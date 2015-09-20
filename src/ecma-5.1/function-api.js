import NativeFunctionType from "../types/native-function-type";
import * as contracts from "../utils/contracts";
import * as func from "../utils/func";
import * as convert from "../utils/convert";
import {map as asyncMap} from "../utils/async";

function defineThis (env, fn, thisArg) {
	if (fn.builtIn || fn.isStrict()) {
		return thisArg || env.global.getValue("undefined");
	}

	if (contracts.isNullOrUndefined(thisArg)) {
		return env.global;
	}

	return convert.toObject(env, thisArg);
}

const frozen = { configurable: false, enumerable: false, writable: false };

export default function functionApi (env) {
	const options = env.options;
	const globalObject = env.global;
	const undef = env.global.getValue("undefined");
	const objectFactory = env.objectFactory;

	let funcClass;

	let funcCtor = function* (...args) {
		let funcInstance;

		if (options.parser && args.length > 0) {
			let body = args.pop();

			if (args.length > 0) {
				args = yield asyncMap(args, function* (arg, index) {
					if (contracts.isNull(arg)) {
						return this.raise(new SyntaxError("Unexpected token null"));
					}

					return contracts.isUndefined(arg) ? "" : (yield convert.toString(env, arg));
				});

				// the spec allows parameters to be comma-delimited, so we will join and split again comma
				args = args.join(",").split(/\s*,\s*/g);
			}

			let ast = options.parser("(function(){" + (yield convert.toString(env, body)) + "}).apply(this,arguments);");
			let userNode = ast.body[0].expression.callee.object.body.body;
			let strict = contracts.isStrictNode(userNode);

			let params = args.map(arg => {
				return {
					type: "Identifier",
					name: arg.trim()
				};
			});

			contracts.assertAreValidArguments(params, strict);
			let callee = {
				type: "FunctionDeclaration",
				params: params,
				body: ast
			};

			let fn = objectFactory.createFunction(callee);
			let wrappedFunc = function* () {
				let thisArg;
				if (this.isNew) {
					thisArg = objectFactory.createObject(funcInstance);
				} else {
					thisArg = this.node;

					if (!thisArg) {
						thisArg = strict ? undef : globalObject;
					}
				}

				let executionResult = yield func.getFunctionResult(env, fn, params, arguments, thisArg, callee);

				if (this.isNew) {
					return thisArg;
				}

				return executionResult && executionResult.result || undef;
			};

			wrappedFunc.nativeLength = callee.params.length;
			wrappedFunc.strict = strict;
			funcInstance = objectFactory.createFunction(wrappedFunc, null, null, strict);
			funcInstance.bindScope(env.globalScope);
		} else {
			funcInstance = objectFactory.createFunction(function () {});
		}

		funcInstance.putValue("constructor", funcClass);
		return funcInstance;
	};

	// the prototype of a function is actually callable and evaluates as a function
	let proto = new NativeFunctionType(function () {});

	funcCtor.nativeLength = 1;
	funcClass = objectFactory.createFunction(funcCtor, proto, frozen);
	funcClass.putValue("constructor", funcClass);

	globalObject.define("Function", funcClass);

	proto.define("length", objectFactory.createPrimitive(0), frozen);

	// function itself is a function
	funcClass.setPrototype(proto);

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.native) {
			return objectFactory.createPrimitive("function () { [native code] }");
		}

		return objectFactory.createPrimitive("function () { [user code] }");
	}, 0, "Function.prototype.toString"));

	proto.define("call", objectFactory.createBuiltInFunction(function (thisArg, ...args) {
		let params = this.node.native ? [] : this.node.node.params;
		let callee = this.node.native ? this.node : this.node.node;
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);

		return func.executeFunction(env, this.node, params, args, thisArg, callee);
	}, 1, "Function.prototype.call"));

	proto.define("apply", objectFactory.createBuiltInFunction(function (thisArg, argsArray) {
		if (argsArray) {
			if (argsArray.className !== "Arguments" && argsArray.className !== "Array" && argsArray.className !== "Function") {
				return this.raise(new TypeError("Arguments list was wrong type"));
			}
		}

		let args = convert.toArray(argsArray);
		let params = this.node.native ? [] : this.node.node.params;
		let callee = this.node.native ? this.node : this.node.node;
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);

		return func.executeFunction(env, this.node, params, args, thisArg, callee);
	}, 2, "Function.prototype.apply"));

	proto.define("bind", objectFactory.createBuiltInFunction(function (thisArg, ...args) {
		let fn = this.node;
		let params = fn.native ? [] : fn.node.params;
		let callee = fn.native ? fn : fn.node;
		thisArg = defineThis(env, this.node, thisArg);

		let nativeFunc = function (...additionalArgs) {
			let mergedArgs = args.concat(additionalArgs);
			return func.executeFunction(env, fn, params, mergedArgs, thisArg, callee, this.isNew);
		};

		nativeFunc.nativeLength = Math.max(params.length - args.length, 0);
		nativeFunc.strict = env.isStrict() || !fn.native && contracts.isStrictNode(fn.node.body.body);

		let boundFunc = objectFactory.createFunction(nativeFunc);
		boundFunc.bindScope(this.env.current);
		boundFunc.bindThis(thisArg);

		if (!nativeFunc.strict) {
			boundFunc.remove("caller");
			boundFunc.remove("arguments");

			// these will be added in strict mode, but should always be here for bound functions
			let thrower = objectFactory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
			boundFunc.defineOwnProperty("caller", thrower);
			boundFunc.defineOwnProperty("arguments", thrower);
		}

		return boundFunc;
	}, 1, "Function.prototype.bind"));
}
