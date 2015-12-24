import {UNDEFINED} from "../types/primitive-type";

export default function* VariableDeclarator (node, context, next) {
	let name = node.id.name;
	let value;

	if (node.init) {
		value = (yield next(node.init, context)).result.getValue();
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value || node.isLet()) {
		context.env.declare(name, value || UNDEFINED);
	}

	return context.result(context.env.getReference(name));
}
