var scopedBlocks = {
	"CallExpression": true,
	"NewExpression": true,
	"FunctionExpression": true,
	"WithStatement": true
};

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

		if (scopedBlocks[node.type]) {
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

function hoistVariables (nodes, env, strict) {
	var undef = env.global.getProperty("undefined").getValue();
	var variables = [];
	var name;

	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		name = decl.name || decl.id.name;

		if (decl.type === "FunctionDeclaration") {
			// functions can be used before they are defined
			var func = env.objectFactory.createFunction(decl, env.current);
			env.createBinding(name);
			env.setBinding(name, func, strict);
			// note: since the function name may collide with a variable we need to test for existence

			// if (env.hasBinding(name)) {
			// 	env.putValue(name, func);
			// } else {
			// 	env.defineOwnProperty(name, func, { configurable: false, enumerable: false, writable: true }, true);
			// }
		} else {
			if (env.hasBinding(name)) {
				env.setBinding(name, undef, strict);
			} else {
				env.createBinding(name);
			}
		}
	});
}

function isStrictMode (node) {
	return node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& node.expression.value === "use strict";
}

module.exports = function BlockStatement (context) {
	var result;

	// var strict = context.node.body.length > 0 && isStrictMode(context.node.body[0]);
	// var i = strict ? 1 : 0;
	// hoistVariables(context.node.body, context.env, strict);

	if (context.node.type === "Program") {
		context.env.initScope(context.node.body);
	}

	for (var i = 0, ln = context.node.body.length; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context)) {
			break;
		}
	}

	return result;
	// var resultValue = result && result.result && result.result.getValue();
	// return context.result(resultValue);
};
