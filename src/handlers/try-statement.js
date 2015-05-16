var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var result;

	function errorHandler (err) {
		context.endTry();

		if (err && context.node.handler) {
			var scope = context.scope.createScope();
			scope.setProperty(context.node.handler.param.name, objectFactory.createPrimitive(err));

			result = context.create(context.node.handler.body, context.node.handler, scope).execute();
		}

		if (context.node.finalizer) {
			context.create(context.node.finalizer).execute();
		}

		return result;
	}

	context.beginTry(errorHandler);
	result = context.create(context.node.block).execute();

	errorHandler();
	return result;
};
