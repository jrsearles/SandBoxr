import Environment from "./env";
import ExecutionContext from "./execution-context";

export default function SandBoxr (ast, config) {
	this.ast = ast;
	this.config = config || {};
	this.env = null;
}

SandBoxr.prototype.execute = function (env) {
	if (!env) {
		// create environment if it hasn't been created
		env = SandBoxr.createEnvironment();
		env.init(this.config);
	}

	this.env = env;
	var executionResult = new ExecutionContext(this.env, this.ast).execute();
	return executionResult && executionResult.result;
};

SandBoxr.create = function (ast, config) {
	return new SandBoxr(ast, config);
};

SandBoxr.createEnvironment = function () {
	return new Environment();
};
