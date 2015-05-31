var objectFactory = require("../types/object-factory");
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
	var undef = scope.global.getProperty("undefined");
	var variables = [];
	var name;

	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		name = decl.name || decl.id.name;

		if (decl.type === "FunctionDeclaration") {
			// functions can be used before they are defined
			scope.setProperty(name, objectFactory.createFunction(decl, scope));
		} else {
			if (!scope.hasProperty(name)) {
				scope.setProperty(name, undef);
			}
		}
	});
}

module.exports = function BlockStatement (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	hoistVariables(context.node.body, context.scope);

	for (; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context)) {
			break;
		}
	}

	return result;
};
