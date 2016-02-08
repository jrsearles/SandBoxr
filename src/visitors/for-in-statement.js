import {toBoolean} from "../utils/native";
import {isNullOrUndefined} from "../utils/checks";
import {declare} from "../utils/assign";

export default function* ForInStatement (node, context, next) {
  let obj = (yield next(node.right, context)).result.getValue();
  
  if (isNullOrUndefined(obj)) {
    return context.empty();
  }

  let loopContext = context.createLoop();
  
  let it = obj.getIterator(context.env);
  let advance = it.getValue("next");
  let done = false;
  let result, priorResult;

  while (!done) {
    let scope = loopContext.env.createBlockScope(node);
    let itResult = yield advance.call(it);
    done = toBoolean(itResult.getValue("done"));

    if (!done && itResult.has("value")) {
      yield declare(loopContext.env, node.left, itResult.getValue("value"));
      // left.setValue(itResult.getValue("value"));
      
      result = yield next(node.body, loopContext);
      if (loopContext.shouldBreak(result)) {
        scope.exit();
        return loopContext.abrupt(result, priorResult);
      }
    }

    scope.exit();
    priorResult = result;
  }
  
  return result || loopContext.empty();
}
