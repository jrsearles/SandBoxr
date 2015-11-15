import {Environment} from "./env";
import {exhaust as x, isThenable} from "./utils/async";

export class Sandbox {
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
	 * @returns {ObjectType|Promise} Returns a resolved value syncronously if possible, otherwise
	 * returns a promise which will resolve to the result.
	 */
	execute (env) {
		if (!env) {
			env = new Environment();
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
	resolve (env) {
		// always return a promise
		return Promise.resolve(this.execute(env));
	}
}
