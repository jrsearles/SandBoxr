function* walk (node) {
	if (Array.isArray(node)) {
		for (let n of node) {
			yield* walk(n);
		}

		return;
	}

	yield node;

	switch (node.type) {
		case "ArrayExpression":
			if (node.elements) {
				yield* walk(node.elements);
			}

			break;

		case "AssignmentExpression":
			// right should be evaluated first
			yield* walk(node.right);
			yield* walk(node.left);
			break;

		case "BinaryExpression":
		case "LogicalExpression":
			yield* walk(node.left);
			yield* walk(node.right);
			break;

		case "BlockStatement":
		case "LabeledStatement":
		case "Program":
			yield* walk(node.body);
			break;

		case "CallExpression":
		case "NewExpression":
			yield* walk(node.callee);
			yield* walk(node.arguments);
			break;

		case "CatchClause":
			yield* walk(node.param);
			yield* walk(node.body);
			break;

		case "ConditionalExpression":
		case "IfStatement":
			yield* walk(node.test);
			yield* walk(node.consequent);
			if (node.alternate) {
				yield* node.alternate;
			}

			break;

		case "DoWhileStatement":
			yield* walk(node.body);
			yield* walk(node.test);
			break;

		case "ExpressionStatement":
			yield* walk(node.expression);
			break;

		case "ForStatement":
			if (node.init) {
				yield* walk(node.init);
			}

			if (node.test) {
				yield* walk(node.test);
			}

			yield* walk(node.body);

			if (node.update) {
				yield* walk(node.update);
			}

			break;

		case "ForInStatement":
			yield* walk(node.right);
			yield* walk(node.left);
			yield* walk(node.body);
			break;

		case "FunctionDeclaration":
		case "FunctionExpression":
			if (node.id) {
				yield* walk(node.id);
			}

			yield* walk(node.params);
			yield* walk(node.body);
			break;

		case "MemberExpression":
			yield* walk(node.object);
			if (node.computed) {
				yield* walk(node.property);
			}

			break;

		case "ObjectExpression":
			yield* walk(node.properties);
			break;

		case "Property":
			yield* walk(node.value);
			break;

		case "ReturnStatement":
			if (node.argument) {
				yield* walk(node.argument);
			}

			break;

		case "SequenceExpression":
			yield* walk(node.expressions);
			break;

		case "SwitchStatement":
			yield* walk(node.discriminant);
			yield* walk(node.cases);
			break;

		case "SwitchCase":
			yield* walk(node.consequent);
			break;

		case "ThrowStatement":
		case "UnaryExpression":
		case "UpdateExpression":
			yield* walk(node.argument);
			break;

		case "TryStatement":
			yield* walk(node.block);
			if (node.handler) {
				yield* walk(node.handler);
			}

			if (node.finalizer) {
				yield* walk(node.finalizer);
			}

			break;

		case "VariableDeclaration":
			yield* walk(node.declarations);
			break;

		case "VariableDeclarator":
			yield* walk(node.id);
			if (node.init) {
				yield* walk(node.init);
			}

			break;

		case "WhileStatement":
			yield* walk(node.test);
			yield* walk(node.body);
			break;

		case "WithStatement":
			yield* walk(node.object);
			yield* walk(node.body);
			break;

		case "BreakStatement":
		case "ContinueStatement":
		case "EmptyStatement":
		case "Identifier":
		case "Literal":
		case "ThisExpression":
			// do nothing else
			break;

		default:
			// do nothing
	}
}

export default class EstreeWalker {
	constructor (node) {
		this.root = node;
	}

	[Symbol.iterator] () {
		return walk(this.root);
	}

	static create (node) {
		return new EstreeWalker(node);
	}
};
