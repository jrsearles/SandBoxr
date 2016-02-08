import { toBoolean } from "../utils/native";

export default function* LogicalExpression (node, context, next) {
  let left = yield next(node.left, context);
  let passed = toBoolean(left.result.getValue());

  if (passed && node.operator === "||") {
    return left;
  }

  if (!passed && node.operator === "&&") {
    return left;
  }

  return yield next(node.right, context);
}
