var convert = require("../utils/convert");

function shouldContinue (context) {
	if (!context.node.test) {
		return true;
	}

	return convert.toBoolean(context.create(context.node.test).execute().result.getValue());
}

module.exports = function ForStatement (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var result;
	while (shouldContinue(context)) {
		result = context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true)) {
			break;
		}

		if (context.node.update) {
			context.create(context.node.update).execute();
		}
	}

	return result;
};
