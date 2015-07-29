var Environment = require("./env");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, config) {
	this.ast = ast;
	this.config = config || {};
	this.env = null;
}

SandBoxr.prototype.execute = function () {
	if (!this.env) {
		// create environment if it hasn't been created
		this.createEnvironment();
		this.env.init(this.config);
	}

	return new ExecutionContext(this.env, this.ast).execute();
};

SandBoxr.prototype.createEnvironment = function () {
	return this.env = new Environment(this);
};

module.exports = SandBoxr;
