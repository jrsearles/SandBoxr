// import {each} from "../utils/async";

export default function* BlockStatement (node, context, next) {
  context = context.create();
  
  let scope = context.env.createBlockScope(node);
  return yield scope.use(function* () {
    let result, priorResult;

    for (let i = 0, ln = node.body.length; i < ln; i++) {
      result = yield next(node.body[i], context);
      
      if (context.shouldBreak(result)) {
        result = context.abrupt(result, priorResult);
        break;
      }
  
      priorResult = result;
    }
    
    return result;
  });
}
