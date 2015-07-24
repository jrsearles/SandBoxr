var handlers = require("./handlers");
var Environment = require("./env");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, config) {
	this.ast = ast;
	this.config = config || {};
	this.env = null;
}

SandBoxr.prototype.execute = function (context) {
	if (!this.env) {
		// create environment if it hasn't been created
		this.createEnvironment();
		this.env.init(this.config);
	}

	if (!context) {
		// initial call - create initial context
		context = new ExecutionContext(this.env, this.ast);
	}

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createEnvironment = function () {
	return this.env = new Environment(this);
};

module.exports = SandBoxr;
