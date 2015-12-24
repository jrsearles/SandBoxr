export default function FunctionDeclaration (node, context) {
	let func = context.env.getValue(node.id.name);
	if (func && func.className === "Function") {
		func.bindScope(context.env.current);
	}
	
	return context.result(func);
}
