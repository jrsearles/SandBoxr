export default function* SequenceExpression (node, context, next) {
  let value;

  for (let i = 0, ln = node.expressions.length; i < ln; i++) {
    value = (yield next(node.expressions[i], context)).result.getValue();
  }
  
  // yield each(node.expressions, function* (expr) {
  //   value = (yield next(expr, context)).result.getValue();
  // });

  return context.result(value);
}
