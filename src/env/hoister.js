export function visit (node, callback) {
	if (!node) {
		return;
	}
	
	if (Array.isArray(node)) {
		node.forEach(n => visit(n, callback));
		return;
	}
	
	switch (node.type) {
		case "BlockStatement":
			visit(node.body, callback);
			break;
			
		case "CatchClause":
			visit(node.body, callback);
			break;
			
		case "DoWhileStatement":
		case "WhileStatement":
			visit(node.test, callback);
			visit(node.body, callback);
			break;
			
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
			
		case "IfStatement":
			// do not scan `test`
			visit(node.consequent, callback);
			visit(node.alternate, callback);
			break;
			
		case "LabeledStatement":
			visit(node.body, callback);
			break;
			
		case "SwitchStatement":
			visit(node.discriminant, callback);
			break;
			
		case "SwitchCase":
			visit(node.consequent, callback);
			break;
			
		case "TryStatement":
			visit(node.block, callback);
			visit(node.handler, callback);
			visit(node.finalizer, callback);
			break;
			
		case "VariableDeclaration":
			visit(node.declarations, callback);
			break;
			
		case "FunctionDeclaration":
		case "VariableDeclarator":
			callback(node);
			break;
			
		default:
			// ignore all other nodes
	}
};
