// import {each} from "../utils/async";

export default function* VariableDeclaration (node, context, next) {
  for (let i = 0, ln = node.declarations.length; i < ln; i++) {
    yield next(node.declarations[i], context);
  }
  
  // yield each(node.declarations, function* (decl) {
  //   yield next(decl, context);
  // });

  return context.empty();
}
