module.exports = function (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	for (; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && (result.cancel || result.skip || result.exit)) {
			break;
		}
	}

	return result;
};
