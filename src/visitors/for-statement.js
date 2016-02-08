import {toBoolean} from "../utils/native";

function* shouldContinue (node, context, next) {
  if (!node) {
    return true;
  }

  return toBoolean((yield next(node, context)).result.getValue());
}

export default function* ForStatement (node, context, next) {
  let loopContext = context.createLoop();
  
  let scope = loopContext.env.createBlockScope(node);
  if (node.init) {
    yield next(node.init, loopContext);
  }

  let result, priorResult;
  
  while (yield shouldContinue(node.test, loopContext, next)) {
    result = yield next(node.body, loopContext);

    if (loopContext.shouldBreak(result)) {
      return loopContext.abrupt(result, priorResult);
    }

    priorResult = result;
    scope = yield scope.reset(node.init);
    
    if (node.update) {
      yield next(node.update, loopContext);
    }
  }

  scope.exit();
  return result || loopContext.empty();
}
