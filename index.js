import {Environment} from "./src/env";
import {Sandbox} from "./src";

export const version = "0.13.0";

/**
	* Creates an environment instance.
	* @param {Object} [options] The options to use with the environment.
	* @returns {Object} The environment instance.
	*/
export function createEnvironment (options) {
	return new Environment(options);
}

/**
	* Creates a new SandBoxr instance.
	* @param {AST} ast - The abstract syntax tree to execute.
	* @param {Object} [options] The options to use with the sandbox.
	* @returns {SandBoxr} A new sandbox.
	*/
export function create (ast, options) {
	return new Sandbox(ast, options);
}
