var objectFactory = require("../types/object-factory");

module.exports = function Literal (context) {
	return context.result(objectFactory.createPrimitive(context.node.value));
};
