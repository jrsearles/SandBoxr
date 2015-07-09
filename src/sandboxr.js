var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, config) {
	this.ast = ast;
	this.config = config || {};
	this.env = null;
}

SandBoxr.prototype.execute = function (context) {
	context = context || new ExecutionContext(this.env || this.createScope(), this.ast);

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createScope = function () {
	return (this.env = globalScope(this));
};

module.exports = SandBoxr;
