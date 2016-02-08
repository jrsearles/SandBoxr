import {toBoolean} from "../utils/native";

export default function* DoWhileStatement (node, context, next) {
  context = context.createLoop();
  
  let result, priorResult;
  let passed = true;

  if (node.isWhileStatement()) {
    passed = toBoolean((yield next(node.test, context)).result.getValue());
  }

  while (passed) {
    result = yield next(node.body, context);
    
    if (context.shouldBreak(result)) {
      return context.abrupt(result, priorResult);
    }

    passed = toBoolean((yield next(node.test, context)).result.getValue());
    priorResult = result;
  }

  return result || context.empty();
}
