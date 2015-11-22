import {assertIsValidName, assertIsValidIdentifier, assertAreValidArguments, isOctalLiteral} from "./utils/contracts";

function validateAssignment (left, strict) {
	if (strict && left.type === "Identifier") {
		assertIsValidName(left.name, true);
	}
}

const rules = {
	AssignmentExpression (node, parent, state) {
		validateAssignment(node.left, state.strict);
	},

	CatchClause (node, parent, state) {
		assertIsValidName(node.param.name, state.strict);
	},

	Identifier (node, parent, state) {
		assertIsValidIdentifier(node.name, state.strict);
	},

	FunctionDeclaration (node, parent, state) {
		assertIsValidName(node.id.name, state.strict);
		assertAreValidArguments(node.params, state.strict);
	},

	FunctionExpression (node, parent, state) {
		if (node.id) {
			assertIsValidName(node.id.name, state.strict);
		}

		assertAreValidArguments(node.params, state.strict);
	},

	Literal (node, parent, state) {
		if (state.strict && node.raw) {
			if (isOctalLiteral(node.raw, node.value)) {
				throw SyntaxError("Octal literals are not allowed in strict mode.");
			}
		}
	},

	UpdateExpression (node, parent, state) {
		validateAssignment(node.argument, state.strict);
	},

	VariableDeclarator (node, parent, state) {
		assertIsValidName(node.id.name, state.strict);
	},

	WithStatement (node, parent, state) {
		if (state.strict) {
			throw SyntaxError("Strict mode code may not include a with statement");
		}
	}
};

export default rules;
