import { UNDEFINED } from "../types/primitive-type";

export default function* ExpressionStatement (node, context, next) {
  let executionResult = yield next(node.expression, context);
  let executionValue = executionResult && executionResult.result && executionResult.result.getValue();
  return context.result(executionValue || UNDEFINED);
}
