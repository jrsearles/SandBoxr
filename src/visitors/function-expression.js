import {isStrictNode} from "../utils/contracts";

export default function FunctionExpression (node, context) {
	let objectFactory = context.env.objectFactory;
	let strict = context.env.isStrict() || isStrictNode(node.body.body);
	let name = node.id ? node.id.name : "anonymous";

	let func = objectFactory.createFunction(node, undefined, {strict, name});
	func.bindScope(context.env.current);
	return context.result(func);
}
