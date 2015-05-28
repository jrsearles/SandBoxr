var objectFactory = require("../types/object-factory");

module.exports = function ArrayExpression (context) {
	var arr = objectFactory.create("Array");
	var undef = context.scope.global.getProperty("undefined");

	if (context.node.elements) {
		context.node.elements.forEach(function (element, index) {
			var item = element ? context.create(element).execute().result : undef;
			arr.setProperty(index, item);
		});
	}

	return context.result(arr);
};
