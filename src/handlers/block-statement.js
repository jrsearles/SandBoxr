var scopedBlock = { "CallExpression": true, "NewExpression": true, "FunctionExpression": true };

function populateHoistedVariables (node, declarators) {
	if (Array.isArray(node)) {
		node.forEach(function (child) {
			populateHoistedVariables(child, declarators);
		});

		return;
	}

	if (!node || !(typeof node === "object")) {
		return;
	}

	if (node.type) {
		if (node.type === "VariableDeclaration") {
			populateHoistedVariables(node.declarations, declarators);
			return;
		}

		if (node.type === "VariableDeclarator" || node.type === "FunctionDeclaration") {
			declarators.push(node);
			return;
		}

		if (node.type === "ForInStatement" && node.left.type === "Identifier") {
			declarators.push(node.left);
			// keep analyzing
		}

		if (node.type === "IfStatement") {
			// cannot hoist variables within if
			populateHoistedVariables(node.consequent, declarators);
			populateHoistedVariables(node.alternate, declarators);
			return;
		}

		if (scopedBlock[node.type]) {
			return;
		}
	}

	// todo: we could be smarter about this by being more descerning about what nodes we traverse
	var prop;
	for (prop in node) {
		if (node.hasOwnProperty(prop) && node[prop] && typeof node[prop] === "object") {
			populateHoistedVariables(node[prop], declarators);
		}
	}
}

function hoistVariables (nodes, scope) {
	var undef = scope.global.getValue("undefined");
	var variables = [];
	var name;

	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		name = decl.name || decl.id.name;

		if (decl.type === "FunctionDeclaration") {
			// functions can be used before they are defined
			var func = scope.global.factory.createFunction(decl, scope);

			// note: since the function name may collide with a variable we need to test for existence
			if (scope.hasOwnProperty(name)) {
				scope.putValue(name, func);
			} else {
				scope.defineOwnProperty(name, func, { configurable: false, enumerable: false, writable: true }, true);
			}
		} else {
			scope.defineOwnProperty(name, null, { value: scope.getValue(name) || undef, configurable: false, enumerable: false, writable: true }, true);
		}
	});
}

function setStrictMode (context, executionResult) {
	var node = context.node.body[0];
	if (node.type !== "ExpressionStatement" || node.expression.type !== "Literal" || node.expression.value !== "use strict") {
		return false;
	}

	context.setStrict(true);
	return true;
}

module.exports = function BlockStatement (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	hoistVariables(context.node.body, context.scope);

	for (; i < ln; i++) {
		if (i === 0 && setStrictMode(context)) {
			continue;
		}

		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context)) {
			break;
		}
	}

	return result;
};
