import { Environment } from "./src/env";
import { Sandbox } from "./src";

export const version = "0.16.1";

/**
	* Creates an environment instance.
	* @returns {Object} The environment instance.
	*/
export function createEnvironment () {
  return new Environment();
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
