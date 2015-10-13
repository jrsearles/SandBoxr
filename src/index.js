import "./polyfills";
import {Environment} from "./env";
import {exhaust as x,isThenable} from "./utils/async";

export class SandBoxr {
	/**
	 * Creates a new Sandbox
	 * @class
	 * @param {AST} ast - The abstract syntax tree to execute.
	 * @param {Object} [options] The options to use with the sandbox.
	 */
	constructor (ast, options = {}) {
		this.ast = ast;
		this.options = options;
	}

	/**
	 * Executes the abstract syntax tree (AST) against the provided environment (or the default
	 * environment if not provided)
	 * @param {Environment} [env] - The environment to execute the AST against.
	 * @returns {Promise} A promise that resolves with the result of the execution
	 */
	execute (env) {
		// todo: obsolete
		
		try {
			return this.execAsync(env);
		} catch (err) {
			return Promise.reject(err.toNative());
		}
	}

	/**
	 * Executes the abstract syntax tree (AST) against the provided environment (or the default
	 * environment if not provided)
	 * @param {Environment} [env] - The environment to execute the AST against.
	 * @returns {ObjectType|Promise} Returns a resolve syncronously if possible, otherwise returns a promise which will resolve to the result
	 */
	exec (env) {
		if (!env) {
			env = SandBoxr.createEnvironment();
			env.init(this.options);
		}

		let executionResult = x(env.createExecutionContext(this.ast).execute());
		if (isThenable(executionResult)) {
			return executionResult.then(res => res.result);
		}
		
		return executionResult.result;
	}
	
	/**
	 * Executes the abstract syntax tree (AST) against the provided environment (or the default
	 * environment if not provided)
	 * @param {Environment} [env] - The environment to execute the AST against.
	 * @returns {Promise} A promise that resolves with the result of the execution
	 */
	execAsync (env) {
		// always return a promise
		return Promise.resolve(this.exec(env));
	}
	
	/**
	 * Creates an environment instance.
	 * @returns {Object} The environment instance.
	 */
	static createEnvironment () {
		return new Environment();
	}

	/**
	 * Creates a new SandBoxr instance.
	 * @param {AST} ast - The abstract syntax tree to execute.
	 * @param {Object} [options] The options to use with the sandbox.
	 * @returns {SandBoxr} A new sandbox.
	 */
	static create (ast, options) {
		return new SandBoxr(ast, options);
	}
}
