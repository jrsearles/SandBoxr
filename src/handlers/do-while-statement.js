var convert = require("../utils/convert");

module.exports = function DoWhileStatement (context) {
	var result, priorResult;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = convert.toBoolean(context.create(context.node.test).execute().result.getValue());
	}

	while (passed) {
		result = context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true, priorResult)) {
			return result;
		}

		passed = convert.toBoolean(context.create(context.node.test).execute().result.getValue());
		priorResult = result;
	}

	return result;
};
