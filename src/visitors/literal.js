export default function Literal (node, context) {
  return context.result(context.env.objectFactory.createPrimitive(node.value));
}
