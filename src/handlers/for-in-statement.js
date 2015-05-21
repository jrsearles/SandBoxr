var objectFactory = require("../types/object-factory");

module.exports = function ForInStatement (context) {
	var left = context.create(context.node.left).execute();
	var obj = context.create(context.node.right).execute().result;
	var value;

	while (obj) {
		for (var prop in obj.properties) {
			if (obj.enumerable[prop]) {
				context.scope.setProperty(left.name, objectFactory.createPrimitive(prop));
				value = context.create(context.node.body).execute();
			}
		}

		obj = obj.parent;
	}

	return value;
};
