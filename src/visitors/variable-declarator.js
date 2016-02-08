import {UNDEFINED} from "../types/primitive-type";
import {declare} from "../utils/assign";

export default function* VariableDeclarator (node, context, next) {
  let rightValue;

  if (node.init) {
    rightValue = (yield next(node.init, context)).result.getValue();
  }
  
  if (node.id.isIdentifier()) {
    // variables have already been hoisted so we just need to initialize them if defined
    let propInfo = context.env.getVariable(node.id.name);
    if (rightValue || !propInfo.initialized) {
      propInfo.init(rightValue || UNDEFINED);
    }
  } else {
    yield declare(context.env, node.id, rightValue || UNDEFINED);
  }


  return context.result(rightValue);
}
