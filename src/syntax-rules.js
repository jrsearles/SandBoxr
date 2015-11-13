import {assertIsValidName, assertIsValidIdentifier, assertAreValidArguments, isOctalLiteral} from "./utils/contracts";

function validateAssignment (left, strict) {
	if (strict && left.type === "Identifier") {
		assertIsValidName(left.name, true);
	}
}

const rules = {
	AssignmentExpression (node, strict) {
		validateAssignment(node.left, strict);
	},

	CatchClause (node, strict) {
		assertIsValidName(node.param.name, strict);
	},

	Identifier (node, strict) {
		assertIsValidIdentifier(node.name, strict);
	},

	FunctionDeclaration (node, strict) {
		assertIsValidName(node.id.name, strict);
		assertAreValidArguments(node.params, strict);
	},

	FunctionExpression (node, strict) {
		if (node.id) {
			assertIsValidName(node.id.name, strict);
		}

		assertAreValidArguments(node.params, strict);
	},

	Literal (node, strict) {
		if (strict && node.raw) {
			if (isOctalLiteral(node.raw, node.value)) {
				throw SyntaxError("Octal literals are not allowed in strict mode.");
			}
		}
	},

	UpdateExpression (node, strict) {
		validateAssignment(node.argument, strict);
	},

	VariableDeclarator (node, strict) {
		assertIsValidName(node.id.name, strict);
	},

	WithStatement (node, strict) {
		if (strict) {
			throw SyntaxError("Strict mode code may not include a with statement");
		}
	}
};

export default rules;
