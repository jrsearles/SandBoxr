import {degenerate} from "../utils/async";

export default degenerate(function* VariableDeclaration (context) {
	for (let decl of context.node.declarations) {
		yield context.create(decl).execute();
	}
	
	return context.empty();
});
