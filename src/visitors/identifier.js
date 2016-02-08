export default function Identifier (node, context) {
  return context.result(context.env.getReference(node.name));
}
