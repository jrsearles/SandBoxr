var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, options) {
	this.ast = ast;
	this.options = options || {};
	this.scope = null;
}

SandBoxr.prototype.execute = function (context) {
	context = context || new ExecutionContext(this, this.ast, null, this.scope || this.createScope());

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createScope = function () {
	return (this.scope = globalScope(this.options));
};

module.exports = SandBoxr;
