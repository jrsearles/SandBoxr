import {degenerate} from "../utils/async";

export default degenerate(function* WithStatement (context) {
	if (context.env.isStrict()) {
		throw new SyntaxError("Strict mode code may not include a with statement");
	}
	
	var obj = (yield context.create(context.node.object).execute()).result.getValue();
	var scope = context.env.createObjectScope(obj);
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
