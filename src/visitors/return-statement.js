import { UNDEFINED } from "../types/primitive-type";

export default function* ReturnStatement (node, context, next) {
  let arg = UNDEFINED;
  if (node.argument) {
    arg = (yield next(node.argument, context)).result.getValue();
  }

  return context.exit(arg);
}
