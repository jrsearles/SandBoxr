import "./polyfills";
import {Environment} from "./env";
import {promisify,step} from "./utils/async";

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
		if (!env) {
			env = SandBoxr.createEnvironment();
			env.init(this.options);
		}

		return promisify(env.createExecutionContext(this.ast).execute())
			.then(res => res.result);
	}

	[Symbol.iterator] () {
		return this.step();
	}

	step (env) {
		if (!env) {
			env = SandBoxr.createEnvironment();
			env.init(this.options);
		}

		return step(env.createExecutionContext(this.ast).execute());
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
