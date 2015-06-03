var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var util = require("../util");

var slice = Array.prototype.slice;
var propertyConfig = { configurable: false, enumerable: false, writable: false };

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(function () {
		return objectFactory.createObject();
	});

	functionClass.defineProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)), propertyConfig);
	functionClass.defineProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)), propertyConfig);

	functionClass.defineProperty("call", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.node.node.params, args, scope);
		return this.create(this.node.node.body, this.node, scope).execute().result;
	}), propertyConfig);

	functionClass.defineProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		var args = util.toArray(argsArray);
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.node.node.params, args, scope);
		return this.create(this.node.node.body, this.node, scope).execute().result;
	}), propertyConfig);

	functionClass.defineProperty("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var callee = this.node;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			utils.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}), propertyConfig);

	globalScope.defineProperty("Function", functionClass, { enumerable: false });
};
