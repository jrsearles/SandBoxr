import {each} from "../utils/async";

export default function* VariableDeclaration (node, context, next) {
	yield each(node.declarations, function* (decl) {
		yield next(decl, context);
	});

	return context.empty();
}
