var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var slice = Array.prototype.slice;

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(utils.wrapNative(Function));
	var proto = functionClass.getProperty("prototype");

	proto.setProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)));
	proto.setProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)));

	proto.setProperty("call", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}));

	proto.setProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		var args = argsArray ? slice.call(argsArray.properties) : [];
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}));

	proto.setProperty("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var callee = this.callee;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			utils.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}));

	typeRegistry.set("Function", functionClass);
	globalScope.setProperty("Function", functionClass);
};
