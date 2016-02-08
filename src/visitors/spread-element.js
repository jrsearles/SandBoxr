import { SymbolType } from "../types/symbol-type";
import { toString } from "../utils/native";

export default function* SpreadElement (node, context, next) {
  let args = yield next(node.argument, context);
  let iteratorKey = SymbolType.getByKey("iterator");
  let iterable = args.result.getValue();
  
  if (!iterable.has(iteratorKey)) {
    throw TypeError(`Object ${yield toString(iterable)} cannot be spread because it is not iterable`);
  }
  
  return context.result(iterable);
}
