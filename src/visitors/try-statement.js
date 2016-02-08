// import {each} from "../utils/async";
import { declare } from "../utils/assign";

function* tryCatch (node, context, next) {
  try {
    return yield next(node, context);
  } catch (thrownError) {
    return context.raise(thrownError);
  }
}

function* executeBlock (context, body, swallow, next) {
  let result;

  for (let i = 0, ln = body.length; i < ln; i++) {
    let node = body[i];
    
    if (swallow) {
      result = yield* tryCatch(node, context, next);
    } else {
      result = yield next(node, context);
    }

    if (result.isAbrupt()) {
      break;
    }
  }
  
  // yield each(body, function* (node, i, all, abort) {
  //   if (swallow) {
  //     result = yield* tryCatch(node, context, next);
  //   } else {
  //     result = yield next(node, context);
  //   }

  //   if (result.isAbrupt()) {
  //     abort();
  //   }
  // });

  return result;
}

export default function* TryStatement (node, context, next) {
  let result = yield executeBlock(context, node.block.body, true, next);
  let finalizerResult;

  if (result && result.raised) {
    if (node.handler) {
      
      let scope = context.env.createScope();
      yield declare(context.env, node.handler.param, result.result);
      
      result = yield scope.use(function* () {
        return yield executeBlock(context, node.handler.body.body, true, next);
      });
    }
  }

  if (node.finalizer) {
    finalizerResult = yield executeBlock(context, node.finalizer.body, false, next);
    if (finalizerResult && finalizerResult.isAbrupt()) {
      return finalizerResult;
      // shouldReturn = true;
    }
  }

  return result || context.empty();
}
