var convert = require("../utils/convert");
var types = require("../utils/types");
var func = require("../utils/func");
var slice = Array.prototype.slice;

module.exports = function (env, options) {
	var globalObject = env.global;
	var undef = env.global.getProperty("undefined").getValue();
	var objectFactory = env.objectFactory;
	// var proto = new ObjectType();
	var functionClass = objectFactory.createFunction(function () {
		var context = this;
		var funcInstance;

		if (options.parser && arguments.length > 0) {
			var args = slice.call(arguments).map(function (arg) { return types.isNullOrUndefined(arg) ? "" : convert.toPrimitive(context, arg, "string"); });
			var ast = options.parser("(function () { " + args.pop() + "}).apply(this, arguments);");

			args = Array.prototype.concat.apply([], args.map(function (arg) { return arg.split(","); }));
			var params = args.map(function (arg) {
				return {
					type: "Identifier",
					name: arg.trim()
				};
			});

			var callee = {
				type: "FunctionDeclaration",
				params: params,
				body: ast
			};

			var fn = objectFactory.createFunction(callee);
			funcInstance = objectFactory.createFunction(function () {
				// context, fn, params, args, thisArg, callee
				// func.loadArguments(params, arguments, this.env, callee);
				var executionResult = func.getFunctionResult(this, fn, params, arguments, globalObject, callee);
				return executionResult && executionResult.result || undef;
			}, env.globalScope);
		} else {
			funcInstance = objectFactory.createFunction(function () {});
		}

		funcInstance.putValue("constructor", functionClass);
		return funcInstance;

		// if (this.isNew) {
		// 	// todo: verify the behavior here
		// 	this.node.putValue("constructor", functionClass, false, this);
		// 	this.node.type = "function";
		// 	this.node.className = "Function";
		// 	return this.node;
		// }

		// return objectFactory.createObject();
	}, null, null, null, { configurable: false, enumerable: false, writable: false });
	functionClass.putValue("constructor", functionClass);
	
	// function itself is a function
	functionClass.parent = functionClass;

	globalObject.define("Function", functionClass);

	var proto = functionClass.proto;
	proto.type = "function";
	proto.define("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: false });

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.native) {
			return objectFactory.createPrimitive("function () { [native code] }");
		}

		return objectFactory.createPrimitive("function () { [user code] }");
	}, 0, "Function.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		return this.node;
	}, 0, "Function.prototype.valueOf"));

	proto.define("call", objectFactory.createBuiltInFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return func.executeFunction(this, this.node, params, args, thisArg || undef, callee);
	}, 1, "Function.prototype.call"));

	proto.define("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		if (argsArray) {
			if (argsArray.className !== "Arguments" && argsArray.className !== "Array") {
				throw new TypeError("Arguments list was wrong type");
			}
		}

		if (types.isNullOrUndefined(thisArg)) {
			thisArg = globalObject;
		} else {
			thisArg = convert.toObject(thisArg, objectFactory);
		}

		var args = convert.toArray(argsArray);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}));

	proto.define("bind", objectFactory.createFunction(function (thisArg) {
		if (types.isNullOrUndefined(thisArg)) {
			thisArg = globalObject;
		} else {
			thisArg = convert.toObject(thisArg, objectFactory);
		}
		
		var args = slice.call(arguments, 1);
		var fn = this.node;
		var params = fn.native ? [] : fn.node.params;
		var callee = fn.native ? fn : fn.node;

		var thrower = function () { throw new TypeError("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them"); };
		var throwProperties = {
			get: undefined,
			getter: thrower,
			set: undefined,
			setter: thrower,
			enumerable: false,
			configurable: false
		};

		var nativeFunc = function () {
			var mergedArgs = args.concat(slice.call(arguments));
			return func.executeFunction(this, fn, params, mergedArgs, thisArg, callee);
			// var scope = this.env.createScope(thisArg);
			// scope.init(callee.node.body);

			// func.loadArguments(callee.node.params, args.concat(slice.call(arguments)), env, callee);

			// try {
			// 	var result = this.create(callee.node.body, callee).execute().result;
			// 	return result ? result.getValue() : undef;
			// } catch (err) {
			// 	scope.exitScope();
			// }

			// scope.exitScope();
		};

		nativeFunc.nativeLength = params.length - args.length;
		var boundFunc = objectFactory.createFunction(nativeFunc, this.env.current);

		boundFunc.defineOwnProperty("caller", throwProperties);
		boundFunc.defineOwnProperty("arguments", throwProperties);
		boundFunc.defineOwnProperty("callee", throwProperties);

		return boundFunc;
	}));
};
