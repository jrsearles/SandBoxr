var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var slice = Array.prototype.slice;
var propertyConfig = { configurable: false, enumerable: false, writable: false };

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(utils.wrapNative(Function));
	var proto = functionClass.getProperty("prototype");

	proto.setProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)), propertyConfig);
	proto.setProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)), propertyConfig);

	proto.setProperty("call", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}), propertyConfig);

	proto.setProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		var args = argsArray ? slice.call(argsArray.properties) : [];
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}), propertyConfig);

	proto.setProperty("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var callee = this.callee;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			utils.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}), propertyConfig);

	typeRegistry.set("Function", functionClass);
	globalScope.setProperty("Function", functionClass);
};
