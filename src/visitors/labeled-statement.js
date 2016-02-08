export default function* LabeledStatement (node, context, next) {
  let result = yield next(node.body, context.createLabel(node.label.name));
  return result || context.empty();
};
