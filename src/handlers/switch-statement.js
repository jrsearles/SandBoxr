function executeStatements (context, statements) {
	var value;
	for (var i = 0, ln = statements.length; i < ln; i++) {
		value = context.create(statements[i]).execute();
		if (value && value.cancel) {
			return value;
		}
	}

	return value;
}

module.exports = function (context) {
	var testValue = context.create(context.node.discriminant).execute().result;
	var passed = false;
	var caseValue, value;

	for (var i = 0, ln = context.node.cases.length; i < ln; i++) {
		if (!passed && context.node.cases[i].test) {
			caseValue = context.create(context.node.cases[i].test).execute().result;
			if (!caseValue.equals(testValue)) {
				continue;
			}
		}

		passed = true;
		value = executeStatements(context, context.node.cases[i].consequent);
		if (value.cancel) {
			value.cancel = false;
			return value;
		}
	}

	return value;
};
