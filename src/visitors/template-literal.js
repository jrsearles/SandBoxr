import {map} from "../utils/async";
import {toString} from "../utils/native";

export default function* TemplateLiteral (node, context, next) {
  let values = yield map(node.expressions, function* (expr) {
    let value = yield next(expr, context);
    return yield toString(value.result.getValue());
  });

  let result = [];
  let quasis = node.quasis;

  for (let i = 0, ln = quasis.length; i < ln; i++) {
    result.push(quasis[i].value.cooked);

    if (i < values.length) {
      result.push(values[i]);
    }
  }

  return context.result(context.env.objectFactory.createPrimitive(result.join("")));
}
