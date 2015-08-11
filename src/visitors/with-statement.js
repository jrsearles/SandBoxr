import {degenerate} from "../utils/async";

export default degenerate(function* WithStatement (context) {
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
