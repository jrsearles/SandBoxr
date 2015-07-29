var visitors = {};

visitors.ArrayExpression = require("./array-expression");
visitors.AssignmentExpression = require("./assignment-expression");
visitors.BinaryExpression = require("./binary-expression");
visitors.BreakStatement = visitors.ContinueStatement = require("./interrupt-statement");
visitors.CallExpression = visitors.NewExpression = require("./call-expression");
visitors.ConditionalExpression = visitors.IfStatement = require("./if-statement");
visitors.DebuggerStatement = require("./debugger-statement");
visitors.DoWhileStatement = visitors.WhileStatement = require("./do-while-statement.js");
visitors.EmptyStatement = require("./empty-statement");
visitors.ExpressionStatement = require("./expression-statement");
visitors.ForStatement = require("./for-statement");
visitors.ForInStatement = require("./for-in-statement");
visitors.FunctionDeclaration = require("./function-declaration");
visitors.FunctionExpression = require("./function-expression");
visitors.Identifier = require("./identifier");
visitors.LabeledStatement = require("./labeled-statement");
visitors.Literal = require("./literal");
visitors.LogicalExpression = require("./logical-expression");
visitors.MemberExpression = require("./member-expression");
visitors.ObjectExpression = require("./object-expression");
visitors.Program = visitors.BlockStatement = require("./block-statement");
visitors.ReturnStatement = require("./return-statement");
visitors.SequenceExpression = require("./sequence-expression");
visitors.SwitchStatement = require("./switch-statement");
visitors.ThisExpression = require("./this-expression");
visitors.ThrowStatement = require("./throw-statement");
visitors.TryStatement = require("./try-statement");
visitors.UnaryExpression = require("./unary-expression");
visitors.UpdateExpression = require("./update-expression");
visitors.VariableDeclaration = require("./variable-declaration");
visitors.VariableDeclarator = require("./variable-declarator");
visitors.WithStatement = require("./with-statement");

module.exports = {
	visit: function (context) {
		if (!(context.node.type in visitors)) {
			throw new TypeError("No handler defined for: " + context.node.type);
		}
		
		return visitors[context.node.type](context);
	}
};
