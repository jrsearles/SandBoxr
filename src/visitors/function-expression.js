import {isStrictNode} from "../utils/contracts";

export default function FunctionExpression (context) {
	let objectFactory = context.env.objectFactory;
	let strict = context.env.isStrict() || isStrictNode(context.node.body.body);
	let name = context.node.id ? context.node.id.name : "anonymous";

	let func = objectFactory.createFunction(context.node, undefined, {strict, name});
	func.bindScope(context.env.current);
	return context.result(func);
}
