module.exports = function BlockStatement (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	for (; i < ln; i++) {
		try {
			result = context.create(context.node.body[i]).execute();
		} catch (err) {
			context.handleError(err);
			break;
		}

		if (result && (result.cancel || result.skip || result.exit)) {
			break;
		}
	}

	return result;
};
