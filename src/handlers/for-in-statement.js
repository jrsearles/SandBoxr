var objectFactory = require("../types/object-factory");

module.exports = function ForInStatement (context) {
	var left = context.create(context.node.left).execute();
	var obj = context.create(context.node.right).execute().result;
	var result;

	while (obj) {
		for (var prop in obj.properties) {
			if (obj.properties[prop].enumerable) {
				context.scope.setProperty(left.name, objectFactory.createPrimitive(prop));
				result = context.create(context.node.body).execute();

				if (result && result.shouldBreak(context, true)) {
					return result;
				}
			}
		}

		obj = obj.parent;
	}

	return result;
};
