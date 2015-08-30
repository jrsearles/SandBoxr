import {degenerate} from "../utils/async";

let executeStatements = degenerate(function* executeStatements (context, statements) {
	let result;
	for (let statement of statements) {
		result = yield context.create(statement).execute();
		if (result && result.isCancelled()) {
			return result;
		}
	}
	
	return result;
});

export default degenerate(function* SwitchStatement (context) {
	let testValue = (yield context.create(context.node.discriminant).execute()).result.getValue();
	let passed = false;
	let value, defaultCase;
	
	for (let current of context.node.cases) {
		if (!passed) {
			if (current.test) {
				let caseValue = (yield context.create(current.test).execute()).result.getValue();
				if (!caseValue.equals(testValue)) {
					continue;
				}
			} else {
				// default might not be the last case
				defaultCase = current;
				continue;
			}
		}
		
		passed = true;
		value = yield executeStatements(context, current.consequent);
		if (value && value.isCancelled()) {
			value.cancel = false;
			return value;
		}
	}
	
	if (!passed && defaultCase && defaultCase.consequent) {
		value = yield executeStatements(context, defaultCase.consequent);
		value.cancel = false;
		return value;
	}

	return value;
});
