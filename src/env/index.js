var DeclarativeEnvironment = require("./declarative-environment");
var ObjectEnvironment = require("./object-environment");
var ExecutionContext = require("../execution-context");
var Reference = require("./reference");
var keywords = require("../keywords");
var api = require("../ecma-5.1");

var scopedBlocks = {
	"CallExpression": true,
	"NewExpression": true,
	"FunctionExpression": true,
	"WithStatement": true
};

function populateHoistedVariables (node, declarators, parent) {
	if (Array.isArray(node)) {
		node.forEach(function (child) {
			populateHoistedVariables(child, declarators, parent);
		});

		return;
	}

	if (!node || !(typeof node === "object")) {
		return;
	}

	if (node.type) {
		if (node.type === "VariableDeclaration") {
			populateHoistedVariables(node.declarations, declarators, node);
			return;
		}

		if (node.type === "VariableDeclarator" || node.type === "FunctionDeclaration") {
			declarators.push({
				decl: node,
				parent: parent
			});

			return;
		}

		if (node.type === "ForInStatement" && node.left.type === "Identifier") {
			declarators.push({
				decl: node.left,
				parent: node
			});

			// keep analyzing
		}

		if (node.type === "IfStatement") {
			// cannot hoist variables within if
			populateHoistedVariables(node.consequent, declarators, node);
			populateHoistedVariables(node.alternate, declarators, node);
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
			populateHoistedVariables(node[prop], declarators, "type" in node ? node : parent);
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
}

Environment.prototype = {
	constructor: Environment,

	init: function (config) {
		// clear state in case of re-init
		this.current = null;
		this.globalScope = null;
		
		api(this, config);
	},

	getReference: function (name, strict) {
		var scope = this.current;
		while (scope) {
			if (scope.hasVariable(name)) {
				return scope.getReference(name, strict);
			}

			scope = scope.parent;
		}

		return new Reference(name, undefined, strict, this);
	},

	getValue: function (name) {
		return this.getReference(name).getValue();
	},

	putValue: function (name, value, strict) {
		this.current.putValue(name, value, strict);
	},

	createVariable: function (name, immutable) {
		if (keywords.isReserved(name)) {
			throw new SyntaxError("Illegal use of reserved keyword: " + name);
		}

		this.current.createVariable(name, !immutable);
	},

	hasVariable: function (name) {
		return this.current.hasVariable(name);
	},

	deleteVariable: function (name) {
		this.current.deleteVariable(name);
	},

	getThisBinding: function () {
		return this.current.getThisBinding() || this.global;
	},

	createExecutionContext: function (node, callee) {
		return new ExecutionContext(this, node, callee);
	},

	createScope: function (thisArg) {
		var env = new DeclarativeEnvironment(this.current, thisArg, this);
		return this.setScope(env);
	},

	createObjectScope: function (obj) {
		var env = new ObjectEnvironment(this.current, obj, this);
		return this.setScope(env);
	},

	initScope: function (node) {
		var env = this;
		var strict = isStrictMode(node);
		var undef = this.global.getProperty("undefined").getValue();
		var variables = [];
		var name;

		populateHoistedVariables(node, variables, node);

		variables.forEach(function (obj) {
			var decl = obj.decl;
			name = decl.name || decl.id.name;

			if (decl.type === "FunctionDeclaration") {
				// functions can be used before they are defined
				var func = env.objectFactory.createFunction(decl);
				func.bindScope(env.current);
				
				env.createVariable(name, true);
				env.putValue(name, func, strict);
			} else {
				if (env.hasVariable(name)) {
					env.putValue(name, undef, strict);
				} else {
					env.createVariable(name, true);
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
