import {UNDEFINED} from "../types/primitive-type";
import {isStrictNode, assertIsValidParameterName} from "../utils/contracts";
import {each} from "../utils/async";
import {declare} from "../utils/assign";

export class Scope {
	constructor (env, scope) {
		env.globalScope = env.globalScope || this;

		this.scope = scope;
		this.env = env;
		this.priorScope = (env.current || env.globalScope).scope;
	}

	/**
	 * Initializes the scope by validating the function body and hoisting variables.
	 * @param {AST} node - The node to be executed.
	 * @returns {void}
	 */
	init (node) {
		if (!node) {
			return;
		}

		let env = this.env;
		this.scope.strict = node.isStrict(); 

		let strict = this.scope.strict || env.isStrict();
		node.getBindings().forEach(decl => {
			let name = decl.id.name;
			
			assertIsValidParameterName(name, strict);
			
			let initialized = decl.isVar();
			let value = UNDEFINED;
			let writable = !decl.isConst();
			
			if (decl.isFunction()) {
				initialized = true;
				let strictFunc = strict || decl.isStrict(); 
				value = env.objectFactory.createFunction(decl, undefined, {strict: strictFunc});
				value.bindScope(this);
			} else if (env.has(name)) {
				return;
			}
		
			let newVar = env.createVariable(name, {configurable: false, writable, initialized});
			if (initialized) {
				newVar.setValue(value);
			}
		});
	}

	*loadComplexArgs (params, args, callee) {
		let env = this.env;
		let strict = env.isStrict() || isStrictNode(callee.node);

		// create a temporary scope for the argument declarations
		let scope = this.createParameterScope();

		let argIndex = 0;
		let argLength = args.length;

		yield each(params, function* (param, index) {
			if (param.isRestElement()) {
				let rest = env.objectFactory.createArray();
				let restIndex = 0;

				while (argIndex < argLength) {
					rest.setValue(restIndex++, args[argIndex++] || UNDEFINED);
				}

				yield declare(env, param.argument, rest);
			} else {
				yield declare(env, param, args[argIndex++] || UNDEFINED);
			}
		});

		if (!callee.arrow) {
			// preserve the passed in arguments, even if defaults are used instead
			let argumentList = env.objectFactory.createArguments(args, callee, strict);
			scope.createVariable("arguments");
			scope.setValue("arguments", argumentList);

			args.forEach(function (value, index) {
				argumentList.defineOwnProperty(index, {
					value: value,
					configurable: true,
					enumerable: true,
					writable: true
				});
			});

			argumentList.defineOwnProperty("length", {
				value: env.objectFactory.createPrimitive(args.length),
				configurable: true,
				writable: true
			});
		}

		// return scope back to main scope
		this.env.setScope(this.scope);
	}

	/**
	 * Loads the arguments into the scope and creates the special `arguments` object.
	 * @param {Array<Identifier>} params - The parameter identifiers
	 * @param {Array<ObjectType>} args - The argument values
	 * @param {FunctionType} callee - The function
	 * @returns {void}
	 */
	*loadArgs (params, args, callee) {
		if (params && params.some(p => p.type !== "Identifier")) {
			yield this.loadComplexArgs(params, args, callee);
			return;
		}

		// todo: this method is getting far too complex
		let {env, scope} = this;
		let strictCallee = isStrictNode(callee.node);
		let strict = env.isStrict() || strictCallee;

		let argumentList = env.objectFactory.createArguments(args, callee, strict);
		scope.createVariable("arguments");
		scope.setValue("arguments", argumentList);

		let argsLength = args.length;
		if (params) {
			let shouldMap = !strictCallee;

			for (let i = 0, ln = params.length; i < ln; i++) {
				let param = params[i];
				let value = args[i] || UNDEFINED;
				let name = param.name;

				if (shouldMap && !scope.has(name)) {
					let descriptor = scope.createVariable(name);
					if (argsLength > i) {
						argumentList.mapProperty(i, descriptor);
					}
				}

				if (!shouldMap && i < argsLength) {
					argumentList.defineOwnProperty(i, {
						value: value,
						configurable: true,
						enumerable: true,
						writable: true
					});
				}

				assertIsValidParameterName(name, strict);
				scope.setValue(name, value);
			}
		}

		// just set value if additional, unnamed arguments are passed in
		let i = params ? params.length : 0;
		for (; i < argsLength; i++) {
			argumentList.defineOwnProperty(i, {
				value: args[i],
				configurable: true,
				enumerable: true,
				writable: true
			});
		}

		argumentList.defineOwnProperty("length", {
			value: env.objectFactory.createPrimitive(argsLength),
			configurable: true,
			writable: true
		});
	}

	createParameterScope () {
		let temp = this.env.createScope();
		temp.scope.setParent(this.scope.parent);
		this.scope.setParent(temp);
		return temp.scope;
	}

	/**
	 * Runs the passed in function and exits the scope when the function completes,
	 * returning the environment back to the previos state.
	 * @param {Function} inner - The function to execute.
	 * @returns {Iterator} The function results
	 */
	*use (inner) {
		try {
			let result = yield inner();
			this.exit();
			return result;
		} catch (err) {
			this.exit();
			throw err;
		}
	}

	/**
	 * Exits the scope, returning the environment to it's previous state.
	 * (Typically you would call `use` which handles exiting the scope itself.)
	 * @returns {void}
	 */
	exit () {
		this.env.setScope(this.priorScope);
	}
}
