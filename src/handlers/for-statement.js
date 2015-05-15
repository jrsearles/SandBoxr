module.exports = function ForStatement (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var passed = !context.node.test || context.create(context.node.test).execute().result.toBoolean();
	var bodyValue;

	while (passed) {
		bodyValue = context.create(context.node.body).execute();
		if (bodyValue && (bodyValue.cancel || bodyValue.skip)) {
			if (bodyValue.name && bodyValue.name !== context.label) {
				break;
			}

			if (bodyValue.cancel) {
				bodyValue.cancel = false;
				return bodyValue;
			}
		}

		if (context.node.update) {
			context.create(context.node.update).execute();
		}

		passed = !context.node.test || context.create(context.node.test).execute().result.toBoolean();
	}

	return bodyValue;
};
