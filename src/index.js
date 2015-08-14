import "./polyfills";
import Environment from "./env";
import ExecutionContext from "./execution-context";
import {promisify} from "./utils/async";

export default class SandBoxr {
	constructor (ast, config = {}) {
		this.ast = ast;
		this.config = config;
	}
	
	execute (env) {
		if (!env) {
			env = SandBoxr.createEnvironment();
			env.init(this.config);
		}
		
		this.env = env;
		var response;
		
		try {
			response = new ExecutionContext(env, this.ast).execute();
		} catch (err) {
			return Promise.reject(err);
		}
		
		// convert to promise
		return promisify(response).then(r => r && r.result);
	}
	
	static createEnvironment () {
		return new Environment();
	}
	
	static create (ast, config) {
		return new SandBoxr(ast, config);
	}
}
