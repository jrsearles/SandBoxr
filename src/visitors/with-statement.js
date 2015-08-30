import {degenerate} from "../utils/async";
import * as contracts from "../utils/contracts";

export default degenerate(function* WithStatement (context) {
	if (context.env.isStrict()) {
		throw new SyntaxError("Strict mode code may not include a with statement");
	}
	
	var obj = (yield context.create(context.node.object).execute()).result.getValue();
	
	if (contracts.isNullOrUndefined(obj)) {
		throw new TypeError(`${obj.className} has no properties`);
	}
	
	var scope = context.env.createObjectScope(obj, context.env.getThisBinding());
	var result;

	scope.init(context.node.body);

	try {
		result = yield context.create(context.node.body).execute();
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
	return result;
});
