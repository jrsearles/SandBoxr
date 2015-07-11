var DeclarativeEnvironment = require("./declarative-environment");
var ObjectEnvironment = require("./object-environment");
var Reference = require("./reference");
var keywords = require("../keywords");

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

function isStrictMode (node) {
	if (Array.isArray(node)) {
		return isStrictMode(node[0]);
	}

	return node
		&& node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& node.expression.value === "use strict";
}


function Environment (runner) {
	this.runner = runner;
	this.current = null;
	this.globalScope = null;
}

Environment.prototype = {
	constructor: Environment,

	getReference: function (name, strict) {
		var scope = this.current;
		while (scope) {
			if (scope.hasBinding(name)) {
				return scope.createReference(name, strict);
			}

			scope = scope.parent;
		}

		return new Reference(name, undefined, strict, this.global);
	},

	getValue: function (name) {
		return this.getReference(name).getValue();
	},

	putValue: function (name, value, strict) {
		this.current.setMutableBinding(name, value, strict);
	},

	createBinding: function (name, immutable) {
		if (keywords.isReserved(name)) {
			throw new SyntaxError("Illegal use of reserved keyword: " + name);
		}

		this.current.createMutableBinding(name, !immutable);
	},

	hasBinding: function (name) {
		return this.current.hasBinding(name);
	},

	setBinding: function (name, value, strict) {
		this.current.setMutableBinding(name, value);
	},

	createScope: function (thisArg, isEval) {
		var env = new DeclarativeEnvironment(this.current, thisArg, isEval);
		return this.setScope(env);
	},

	createObjectScope: function (obj) {
		var env = new ObjectEnvironment(this.current, obj);
		return this.setScope(env);
	},

	initScope: function (node) {
		var env = this;
		var strict = isStrictMode(node);
		var undef = this.global.getProperty("undefined").getValue();
		var variables = [];
		var name;

		populateHoistedVariables(node, variables);

		variables.forEach(function (decl) {
			name = decl.name || decl.id.name;

			if (decl.type === "FunctionDeclaration") {
				// functions can be used before they are defined
				var func = env.objectFactory.createFunction(decl, env.current);
				env.createBinding(name, true);
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
					env.createBinding(name, true);
				}
			}
		});
	},

	setScope: function (scope) {
		this.globalScope = this.globalScope || scope;

		var env = this;
		var priorScope = this.current || this.globalScope;
		this.current = scope;

		return {
			init: function (node) {
				if (!node) {
					return;
				}

				env.initScope(node);
			},

			exitScope: function () {
				env.setScope(priorScope);
			}
		};
	}
};

module.exports = Environment;
