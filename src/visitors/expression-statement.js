import {UNDEFINED} from "../types/primitive-type";

export default function* ExpressionStatement (context) {
	let executionResult = yield context.create(context.node.expression).execute();
	let executionValue = executionResult && executionResult.result && executionResult.result.getValue();
	return context.result(executionValue || UNDEFINED);
}
