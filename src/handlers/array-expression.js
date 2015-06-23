module.exports = function ArrayExpression (context) {
	var objectFactory = context.scope.global.factory;
	var arr = objectFactory.create("Array");

	if (context.node.elements) {
		var i = 0;
		var ln = context.node.elements.length;

		while (i < ln) {
			if (context.node.elements[i]) {
				var item = context.create(context.node.elements[i]).execute().result;
				arr.defineOwnProperty(i, item);
			}

			i++;
		}

		arr.putValue("length", objectFactory.createPrimitive(ln));
	}

	return context.result(arr);
};
