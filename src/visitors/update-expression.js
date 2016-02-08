import {toNumber} from "../utils/native";
import {assertIsValidAssignment} from "../utils/contracts";

export default function* UpdateExpression (node, context, next) {
  const objectFactory = context.env.objectFactory;
  let ref = (yield next(node.argument, context)).result;
  assertIsValidAssignment(ref, context.env.isStrict());

  let originalValue = yield toNumber(ref.getValue());
  let newValue = originalValue;

  if (node.operator === "++") {
    newValue++;
  } else {
    newValue--;
  }

  let newWrappedValue = objectFactory.createPrimitive(newValue);
  originalValue = objectFactory.createPrimitive(originalValue);

  let returnValue = node.prefix ? newWrappedValue : originalValue;

  ref.setValue(newWrappedValue);
  return context.result(returnValue);
}
