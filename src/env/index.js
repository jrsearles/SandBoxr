import {UNDEFINED} from "../types/primitive-type";
import {ExecutionContext} from "../execution-context";
import {DeclarativeEnvironment} from "./declarative-environment";
import {ObjectEnvironment} from "./object-environment";
import {Reference} from "./reference";
import es5 from "../es5";
import es6 from "../es6";
import {default as operators} from "../utils/operators";
import {assertIsValidIdentifier} from "../utils/contracts";
import {Scope} from "./scope";
import {BlockScope} from "./block-scope";

const defaultOptions = {
	allowDebugger: false,
	useStrict: false,
	ecmaVersion: 5
};

export class Environment {
	init (options = defaultOptions) {
		// clear state in case of re-init
		this.current = null;
		this.globalScope = null;

		this.options = Object.assign({}, defaultOptions, options);
		(options.ecmaVersion === 6 ? es6 : es5)(this);

		// todo: improve this
		this.ops = Object.assign({}, operators, options.operators);
		this.objectFactory.init();

		if (options.exclude && options.exclude.length > 0) {
			options.exclude.forEach(name => {
				let segments = name.split(".");
				let parent = this.global;

				while (segments.length > 1) {
					parent = parent.getValue(segments.shift());

					// api not defined - assume user error?
					if (!parent) {
						return;
					}
				}

				parent.remove(segments.shift());
			});
		}
	}

	/**
	 * Gets a reference from the environment
	 * @param {String} key - The key of the property
	 * @returns {Reference} The reference.
	 */
	getReference (key) {
		let scope = this.current && this.current.scope;
		while (scope) {
			if (scope.owns(key)) {
				return scope.getReference(key, true);
			}

			scope = scope.parent;
		}

		return new Reference(key, undefined, this);
	}

	getValue (key) {
		return this.getReference(key).getValue();
	}

	setValue (key, value, strict) {
		this.current.scope.setValue(key, value, strict);
	}

	has (key) {
		return this.current.scope.has(key);
	}

	deleteVariable (key) {
		this.current.scope.deleteVariable(key);
	}

	declare (key, value) {
		let propInfo = this.getVariable(key);
		if (!propInfo) {
			propInfo = this.createVariable(key);
		}	
		
		propInfo.init(value);
	}
	
	getVariable (key) {
    let scope = this.current && this.current.scope;
    while (scope) {
      if (scope.owns(key)) {
        return scope.getVariable(key);
      }
      
      scope = scope.parent;
    }
    
		return null;
	}
	
	/**
	 * Declares a variable within the current scope.
	 * @param {String} key - the key of the variable.
	 * @param {Object} [descriptor] - whether the variable is immutable or not.
	 * @returns {PropertyDescriptor} The property descriptor for the new variabble.
	 */
	createVariable (key, {configurable = true, writable = true, intitialized = true} = {}) {
		assertIsValidIdentifier(key, this.isStrict());
		return this.current.scope.createVariable(...arguments);
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

	createExecutionContext (obj, callee, isNew) {
		return new ExecutionContext(this, obj, callee, isNew);
	}

	/**
	 * Creates a new declarative scope.
	 * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
	 * @param {Boolean} [strict] - Indicates whether the scope is in strict mode.
	 * @returns {Scope} The new scope.
	 */
	createScope (thisArg, strict) {
		return this.setScope(new DeclarativeEnvironment(this.current, thisArg, this, strict || this.isStrict()));
	}

	/**
	 * Creates a new scope based on the provided object. This is used for the `with`
	 * statement, as well as the global scope.
	 * @param {ObjectType} obj - The object to bind the scope to.
	 * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
	 * @param {Boolean} [strict] - Indicates whether the scope is in strict mode.
	 * @returns {Scope} The new scope.
	 */
	createObjectScope (obj, thisArg, strict) {
		return this.setScope(new ObjectEnvironment(this.current, obj, thisArg, this, strict || this.isStrict()));
	}

	createExecutionScope (fn, thisArg) {
		let parentScope = this.current.scope;

		// if a parent scope is defined we need to limit this scope to that scope
		if (fn.boundScope) {
			this.setScope(fn.boundScope.scope);
		}

		thisArg = fn.boundThis || thisArg;
		if (fn.arrow) {
			thisArg = this.getThisBinding();
		}

		let scope = this.createScope(thisArg);
		scope.parentScope = parentScope;
		return scope;
	}
	
	createBlockScope (node) {
		let scope = this.current.scope;
		if (node.hasBindings() && !node.isProgram()) {
			scope = scope.createChildScope();
		}
	
		this.current = new BlockScope(this, scope, node);
		this.current.init(node);
		return this.current;
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
