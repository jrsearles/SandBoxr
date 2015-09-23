import {UNDEFINED} from "../types/primitive-type";
import {ExecutionContext} from "../execution-context";
import {DeclarativeEnvironment} from "./declarative-environment";
import {ObjectEnvironment} from "./object-environment";
import {Reference} from "./reference";
import api from "../ecma-5.1";
import operators from "../utils/operators";
import * as contracts from "../utils/contracts";
import {Scope} from "./scope";

let defaultOptions = {
	allowDebugger: false,
	useStrict: false
};

export class Environment {
	init (options = defaultOptions) {
		// clear state in case of re-init
		this.current = null;
		this.globalScope = null;

		this.options = Object.assign({}, defaultOptions, options);
		api(this);

		// todo: improve this
		this.ops = Object.assign(operators, options.operators);
		this.ops.env = this;
	}

	/**
	 * Gets a reference from the environment
	 * @param {String} name - The name of the property
	 * @returns {Reference} The reference.
	 */
	getReference (name) {
		let scope = this.current && this.current.scope;
		while (scope) {
			if (scope.hasOwnProperty(name)) {
				return scope.getReference(name, true);
			}

			scope = scope.parent;
		}

		return new Reference(name, undefined, this);
	}

	getValue (name) {
		return this.getReference(name).getValue();
	}

	putValue (name, value, strict) {
		this.current.scope.putValue(name, value, strict);
	}

	hasProperty (name) {
		return this.current.scope.hasProperty(name);
	}

	deleteVariable (name) {
		this.current.scope.deleteVariable(name);
	}

	/**
	 * Declares a variable within the current scope.
	 * @param {String} name - the name of the variable.
	 * @param {Boolean} [immutable] - whether the variable is immutable or not.
	 * @returns {PropertyDescriptor} The property descriptor for the new variabble.
	 */
	createVariable (name, immutable) {
		contracts.assertIsValidIdentifier(name, this.isStrict());
		return this.current.scope.createVariable(name, !immutable);
	}

	/**
	 * Indicates whether the current lexical scope is in strict mode.
	 * @returns {Boolean} true if in strict mode; false otherwise.
	 */
	isStrict () {
		if (this.options.useStrict) {
			return true;
		}

		let scope = this.current && this.current.scope;
		while (scope) {
			if (scope.strict) {
				return true;
			}

			scope = scope.parent;
		}

		return false;
	}

	/**
	 * Gets the current `this` object for the environment.
	 * @returns {ObjectType} The `this` object for the current scope.
	 */
	getThisBinding () {
		let thisArg = this.current.scope.getThisBinding();
		if (thisArg) {
			return thisArg;
		}

		if (this.isStrict()) {
			return UNDEFINED;
		}

		return this.global;
	}

	createExecutionContext (node, callee, isNew) {
		return new ExecutionContext(this, node, callee, isNew);
	}

	/**
	 * Creates a new declarative scope.
	 * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
	 * @returns {Scope} The new scope.
	 */
	createScope (thisArg) {
		return this.setScope(new DeclarativeEnvironment(this.current, thisArg, this));
	}

	/**
	 * Creates a new scope based on the provided object. This is used for the `with`
	 * statement, as well as the global scope.
	 * @param {ObjectType} obj - The object to bind the scope to.
	 * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
	 * @returns {Scope} The new scope.
	 */
	createObjectScope (obj, thisArg) {
		return this.setScope(new ObjectEnvironment(this.current, obj, thisArg, this));
	}

	/**
	 * Sets the current scope.
	 * @param {Environment} scope - Sets the current environment.
	 * @returns {Scope} The created scope.
	 */
	setScope (scope) {
		return this.current = new Scope(this, scope);
	}
}
