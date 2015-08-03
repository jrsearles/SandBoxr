import Environment from "./env";
import ExecutionContext from "./execution-context";

export default class SandBoxr {
	constructor (ast, config) {
		this.ast = ast;
		this.config = config || {};
	}
	
	execute (env) {
		if (!env) {
			env = SandBoxr.createEnvironment();
			env.init(this.config);
		}
		
		this.env = env;
		var executionResult = new ExecutionContext(env, this.ast).execute();
		return executionResult && executionResult.result;
	}

	static createEnvironment () {
		return new Environment();
	}

	static create (ast, config) {
		return new SandBoxr(ast, config);
	}
}
