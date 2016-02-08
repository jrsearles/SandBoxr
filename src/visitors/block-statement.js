export default function* BlockStatement (node, context, next) {
  let blockContext = context.create();
  
  let scope = blockContext.env.createBlockScope(node);
  return yield scope.use(function* () {
    let result, priorResult;

    for (let i = 0, ln = node.body.length; i < ln; i++) {
      result = yield next(node.body[i], blockContext);
      
      if (blockContext.shouldBreak(result)) {
        result = blockContext.abrupt(result, priorResult);
        break;
      }
  
      priorResult = result;
    }
    
    return result;
  });
}
