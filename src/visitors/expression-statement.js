import {degenerate} from "../utils/async";

export default degenerate(function* ExpressionStatement (context) {
	let executionResult = yield context.create(context.node.expression).execute();
	let executionValue = executionResult && executionResult.result && executionResult.result.getValue();
	return context.result(executionValue || context.env.global.getValue("undefined"));
});
