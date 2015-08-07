export const visit = (node, callback) => {
	if (!node) {
		return;
	}

	if (Array.isArray(node)) {
		node.forEach(n => visit(n, callback));
		return;
	}

	switch (node.type) {
		// case "ArrayExpression":
		// case "AssignmentExpression":
		// case "BinaryExpression":
		case "BlockStatement":
			visit(node.body, callback);
			break;

		// case "BreakStatement":
		// case "CallExpression":
		// case "ConditionalExpression":
		// case "ContinueStatement":
		// case "DebuggerStatement":
		case "DoWhileStatement":
		case "WhileStatement":
			visit(node.test, callback);
			visit(node.body, callback);
			break;

		// case "EmptyStatement":
		case "ExpressionStatement":
			visit(node.expression, callback);
			break;

		case "ForStatement":
			visit(node.init, callback);
			visit(node.body, callback);
			break;

		case "ForInStatement":
			visit(node.left, callback);
			visit(node.body, callback);
			break;

		// case "FunctionExpression":
		// case "Identifier":
		case "IfStatement":
			// do not scan `test`
			visit(node.consequent, callback);
			visit(node.alternate, callback);
			break;

		case "LabeledStatement":
			visit(node.body, callback);
			break;
			
		// case "Literal":
		// case "LogicalExpression":
		// case "MemberExpression":
		// case "ObjectExpression":
		// case "ReturnStatement":
		// case "SequenceExpression":
		case "SwitchStatement":
			visit(node.discriminant, callback);
			break;

		case "SwitchCase":
			visit(node.consequent, callback);
			break;

		// case "ThisExpression":
		// case "ThrowStatement":
		case "TryStatement":
			visit(node.block, callback);
			visit(node.finalizer, callback);
			break;

		// case "UnaryExpression":
		// case "UpdateExpression":
		case "VariableDeclaration":
			visit(node.declarations, callback);
			break;


		case "FunctionDeclaration":
		case "VariableDeclarator":
			callback(node);
			break;
			
		// case "WithStatement":

		// case "NewExpression":
		// case "Program":
	}
};
