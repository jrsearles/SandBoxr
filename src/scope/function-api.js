var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var slice = Array.prototype.slice;
var propertyConfig = { configurable: false, enumerable: false, writable: false };

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(utils.wrapNative(Function));

	functionClass.setProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)), propertyConfig);
	functionClass.setProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)), propertyConfig);

	functionClass.setProperty("call", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}), propertyConfig);

	functionClass.setProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		var args = argsArray ? slice.call(argsArray.properties) : [];
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}), propertyConfig);

	functionClass.setProperty("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var callee = this.callee;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			utils.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}), propertyConfig);

	globalScope.setProperty("Function", functionClass);
};
