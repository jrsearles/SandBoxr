import "./polyfills";
import Environment from "./env";
import {exhaust as x} from "./utils/async";

export class SandBoxr {
	/**
	 * Creates a new Sandbox
	 * @class
	 * @param {Object} ast - The abstract syntax tree to execute.
	 * @param {Object} [options] The options to use with the sandbox.
	 */
	constructor (ast, options = {}) {
		this.ast = ast;
		this.options = options;
	}

	/**
	 * Executes the abstract syntax tree (AST) against the provided environment (or the default environment if not provided)
	 * @param {Object} [env] - The environment to execute the AST against.
	 * @returns {Promise} A promise that resolves with the result of the execution
	 */
	execute (env) {
		this.env = env;

		if (!this.env) {
			this.env = SandBoxr.createEnvironment();
			this.env.init(this.options);
		}

		try {
			let result = x(this.env.createExecutionContext(this.ast).execute());
			return Promise.resolve(result).then(res => res.result);
		} catch (err) {
			return Promise.reject(err.unwrap());
		}
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
	 * @param {Object} ast - The abstract syntax tree to execute.
	 * @param {Object} [options] The options to use with the sandbox.
	 * @returns {Object} A new sandbox.
	 */
	static create (ast, options) {
		return new SandBoxr(ast, options);
	}
}
