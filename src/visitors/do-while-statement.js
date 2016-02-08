import { toBoolean } from "../utils/native";

export default function* DoWhileStatement (node, context, next) {
  let loopContext = context.createLoop();
  
  let result, priorResult;
  let passed = true;

  if (node.isWhileStatement()) {
    passed = toBoolean((yield next(node.test, loopContext)).result.getValue());
  }

  while (passed) {
    result = yield next(node.body, loopContext);
    
    if (loopContext.shouldBreak(result)) {
      return loopContext.abrupt(result, priorResult);
    }

    passed = toBoolean((yield next(node.test, loopContext)).result.getValue());
    priorResult = result;
  }

  return result || loopContext.empty();
}
