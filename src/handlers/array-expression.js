var objectFactory = require("../types/object-factory");

module.exports = function ArrayExpression (context) {
	var arr = objectFactory.create("ARRAY");

	if (context.node.elements) {
		context.node.elements.forEach(function (element, index) {
			arr.setProperty(index, context.create(element).execute().result);
		});
	}

	return context.result(arr);
};
