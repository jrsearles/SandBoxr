import {UNDEFINED} from "../types/primitive-type";
import {declare} from "../utils/assign";

export default function* VariableDeclarator (node, context, next) {
	let name = node.id.name;
	let rightValue;

	if (node.init) {
		rightValue = (yield next(node.init, context)).result.getValue();
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (rightValue || node.isLet()) {
		yield declare(context.env, node.id, rightValue || UNDEFINED);
		// context.env.declare(name, value || UNDEFINED);
	}

	return context.result(context.env.getReference(name));
}
