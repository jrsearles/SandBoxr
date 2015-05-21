// var typeRegistry = require("../types/type-registry");
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

		if (scopedBlock[node.type]) {
			return;
		}
	}

	// todo: we could be smarter about this by being more descerning about what nodes we traverse
	var prop, current;
	for (prop in node) {
		if (node.hasOwnProperty(prop) && node[prop] && typeof prop[node] === "object") {
			populateHoistedVariables(current, declarators);
		}
	}
}

function hoistVariables (nodes, scope) {
	var undef = scope.global.getProperty("undefined");
	var variables = [];
	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		if (!scope.hasProperty(decl.id.name)) {
			scope.setProperty(decl.id.name, undef);
		}
	});
}

module.exports = function BlockStatement (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	hoistVariables(context.node.body, context.scope);

	for (; i < ln; i++) {
		try {
			result = context.create(context.node.body[i]).execute();
		} catch (err) {
			context.handleError(err);
			break;
		}

		if (result && (result.cancel || result.skip || result.exit)) {
			break;
		}
	}

	return result;
};
