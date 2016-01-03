import {assertIsValidName, assertIsValidIdentifier, assertAreValidArguments} from "./utils/contracts";
import {isOctalLiteral} from "./utils/native";

function validateAssignment (left, strict) {
	if (strict && left.isIdentifier()) {
		assertIsValidName(left.name, true);
		assertIsValidIdentifier(left.name, true);
	}
}

const rules = {
	AssignmentExpression (node, context) {
		validateAssignment(node.left, node.isStrict() || context.env.isStrict());
	},

	CatchClause (node, context) {
		assertIsValidName(node.param.name, node.isStrict() || context.env.isStrict());
	},
	
	Declarator (node, context) {
		assertIsValidIdentifier(node.id.name, node.isStrict() || context.env.isStrict());
	},

	["Function"] (node, context) {
		if (node.id) {
			assertIsValidName(node.id.name, node.isStrict() || context.env.isStrict());
		}
		
		assertAreValidArguments(node.params, node.isStrict() || context.env.isStrict());
	},

	Literal (node, context) {
		if (node.raw && (node.isStrict() || context.env.isStrict())) {
			if (isOctalLiteral(node.raw, node.value)) {
				throw SyntaxError("Octal literals are not allowed in strict mode.");
			}
		}
	},

	UpdateExpression (node, context) {
		validateAssignment(node.argument, node.isStrict() || context.env.isStrict());
	},

	WithStatement (node, context) {
		if (node.isStrict() || context.env.isStrict()) {
			throw SyntaxError("Strict mode code may not include a with statement");
		}
	}
};

export default rules;
