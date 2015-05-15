var objectFactory = require("../types/object-factory");

module.exports = function ReturnStatement (context) {
	var returnValue = context.node.argument ? context.create(context.node.argument).execute().result : objectFactory.getType("undefined");
	return context.exit(returnValue);
};
