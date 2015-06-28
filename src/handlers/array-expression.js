module.exports = function ArrayExpression (context) {
	var objectFactory = context.scope.global.factory;
	var arr = objectFactory.create("Array");

	if (context.node.elements) {
		var i = 0;
		var ln = context.node.elements.length;

		while (i < ln) {
			if (context.node.elements[i]) {
				var item = context.create(context.node.elements[i]).execute().result;
				arr.defineOwnProperty(i, null, { value: item, configurable: true, enumerable: true, writable: true });
			}

			i++;
		}

		arr.putValue("length", objectFactory.createPrimitive(ln), false, context);
	}

	return context.result(arr);
};
