var objectFactory = require("./types/object-factory");
var typeRegistry = require("./types/type-registry");

function getValues (args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(args[i].value);
	}

	return values;
}

module.exports = {
	wrapNative: function (fn) {
		return function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(arguments);
			var value = fn.apply(scope, args);
			return objectFactory.createPrimitive(value);
		};
	},

	loadArguments: function (params, args, scope) {
		var argumentList = objectFactory.createObject();
		for (var i = 0, ln = args.length; i < ln; i++) {
			argumentList.setProperty(i, args[i]);
		}

		argumentList.setProperty("length", objectFactory.createPrimitive(ln));
		scope.setProperty("arguments", argumentList);

		params.forEach(function (param, index) {
			scope.setProperty(param.name, args[index] || typeRegistry.get("UNDEFINED"));
		});
	}
};
