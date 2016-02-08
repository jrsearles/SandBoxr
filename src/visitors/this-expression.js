import { isNullOrUndefined } from "../utils/checks";

export default function ThisExpression (node, context) {
  let thisArg = context.env.getThisBinding();
  if (isNullOrUndefined(thisArg) && !context.env.isStrict()) {
    thisArg = context.env.global;
  }

  return context.result(thisArg);
}
