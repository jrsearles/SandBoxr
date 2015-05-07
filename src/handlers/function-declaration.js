var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var id = context.node.id.name;
	var fn = objectFactory.createFunction(context.node);

	context.scope.setProperty(id, fn);
	return context.result(fn);
};
