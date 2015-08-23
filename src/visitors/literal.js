var octalRgx = /^0[0-7][0-7]*$/;

function validateLiteral (node, strict) {
	if (!strict || !node.raw) {
		return;
	}
	
	if (typeof node.value === "number" && octalRgx.test(node.raw)) {
			throw new SyntaxError("Octal literals are not allowed in strict mode.");
	}
}

export default function Literal (context) {
	validateLiteral(context.node, context.env.isStrict());
	return context.result(context.env.objectFactory.createPrimitive(context.node.value));
}
