var handlers = require("./handlers");
var api = require("./ecma-5.1");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, config) {
	this.ast = ast;
	this.config = config || {};
	this.env = null;
}

SandBoxr.prototype.execute = function (context) {
	context = context || new ExecutionContext(this.env || this.createEnvironment(), this.ast);

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createEnvironment = function () {
	return (this.env = api(this));
};

module.exports = SandBoxr;
