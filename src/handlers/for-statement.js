module.exports = function (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var testValue = context.create(context.node.test).execute().result;
	var bodyValue;

	while (testValue.toBoolean()) {
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

		testValue = context.create(context.node.test).execute().result;
	}

	return bodyValue;
};
