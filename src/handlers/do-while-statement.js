var convert = require("../utils/convert");

module.exports = function DoWhileStatement (context) {
	var result;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = convert.toBoolean(context.create(context.node.test).execute().result.getValue());
	}

	while (passed) {
		result = context.create(context.node.body).execute();

		if (result && result.shouldBreak(context, true)) {
			break;
		}

		passed = convert.toBoolean(context.create(context.node.test).execute().result.getValue());
	}

	return result;
};
