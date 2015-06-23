module.exports = function Literal (context) {
	if (context.node.value === "use strict") {
		context.scope.setStrict(true);
	}

	return context.result(context.scope.global.factory.createPrimitive(context.node.value));
};
