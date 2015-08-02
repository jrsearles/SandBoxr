module.exports = function BlockStatement (context) {
	var result, priorResult;

	if (context.node.type === "Program") {
		context.env.initScope(context.node.body);
	}

	for (let i = 0, ln = context.node.body.length; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context, false, priorResult)) {
			return result;
		}

		priorResult = result;
	}

	return result;
};
