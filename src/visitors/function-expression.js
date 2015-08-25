import * as contracts from "../utils/contracts";

export default function FunctionExpression (context) {
	let objectFactory = context.env.objectFactory;
	let func = objectFactory.createFunction(context.node);
	let strict = context.env.isStrict() || contracts.isStrictNode(context.node.body.body);
	func.bindScope(context.env.current, strict);

	if (context.node.id) {
		func.name = context.node.id.name;
	}

	return context.result(func);
}
