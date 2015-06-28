var convert = require("../utils/convert");
var func = require("../utils/func");

var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope, options) {
	var objectFactory = globalScope.factory;
	// var proto = new ObjectType();
	var functionClass = objectFactory.createFunction(function () {
		var context = this;
		if (options.parser && arguments.length > 0) {
			var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "string"); });
			var body = options.parser("(function () {" + args.pop() + "}).apply(this, arguments);");

			var fnNode = {
				type: "FunctionDeclaration",
				params: args.map(function (arg) {
					return {
						type: "Identifier",
						name: arg
					};
				}),
				body: body
			};

			var fn = objectFactory.createFunction(fnNode, globalScope);
			fn.putValue("constructor", functionClass, false, this);
			return fn;
		}

		if (this.isNew) {
			this.node.putValue("constructor", functionClass, false, this);
			return this.node;
		}

		return objectFactory.createObject();
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = functionClass.proto;
	proto.defineOwnProperty("toString", objectFactory.createFunction(convert.toNativeFunction(Function.prototype.toString)), propertyConfig);
	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		return this.node;
	}, 0, "Function.prototype.valueOf"), propertyConfig);

	proto.defineOwnProperty("call", objectFactory.createFunction(function (thisArg) {
		thisArg = convert.toObject(thisArg, objectFactory);
		var args = slice.call(arguments, 1);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}), propertyConfig);

	proto.defineOwnProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		thisArg = convert.toObject(thisArg, objectFactory);
		var args = convert.toArray(argsArray);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}), propertyConfig);

	proto.defineOwnProperty("bind", objectFactory.createFunction(function (thisArg) {
		thisArg = convert.toObject(thisArg, objectFactory);
		var args = slice.call(arguments, 1);
		var callee = this.node;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			func.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}), propertyConfig);

	globalScope.defineOwnProperty("Function", functionClass, propertyConfig);
};
