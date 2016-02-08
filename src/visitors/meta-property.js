import {UNDEFINED} from "../types/primitive-type";

export default function MetaProperty (node, context) {
  if (node.meta.name === "new" && node.property.name === "target") {
    return context.result(context.env.current.getMeta("newTarget") || UNDEFINED);
  }
  
  throw SyntaxError(`Unknown MetaProperty: ${node.meta.name}.${node.property.name}`);
}
