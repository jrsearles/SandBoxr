var objectFactory = require("../types/object-factory");

module.exports = function Literal (context) {
	if (context.node.value === "use strict") {
		context.scope.setStrict(true);
	}

	return context.result(objectFactory.createPrimitive(context.node.value));
};
