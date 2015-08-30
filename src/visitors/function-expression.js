import * as contracts from "../utils/contracts";

export default function FunctionExpression (context) {
	let objectFactory = context.env.objectFactory;
	let strict = context.env.isStrict() || contracts.isStrictNode(context.node.body.body);
	let func = objectFactory.createFunction(context.node, null, null, strict);
	
	func.bindScope(context.env.current);

	if (context.node.id) {
		func.name = context.node.id.name;
	}

	return context.result(func);
}
