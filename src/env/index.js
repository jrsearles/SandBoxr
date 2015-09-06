import ExecutionContext from "../execution-context";
import DeclarativeEnvironment from "./declarative-environment";
import ObjectEnvironment from "./object-environment";
import Reference from "./reference";
import api from "../ecma-5.1";
import comparers from "../utils/comparers";
import * as contracts from "../utils/contracts";
import Scope from "./scope";

let defaultOptions = {
	allowDebugger: false,
	useStrict: false
};

export default class Environment {
	init (options = defaultOptions) {
		// clear state in case of re-init
		this.current = null;
		this.globalScope = null;

		this.options = Object.assign(this.options || {}, defaultOptions, options);
		api(this);

		// todo: improve this
		this.ops = Object.assign(comparers, options.comparers);
	}

	evaluate (left, right, operator) {
		// todo: improve this - why do we need this here?
		return this.ops[operator](this, left, right);
	}

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

	createVariable (name, immutable) {
		contracts.assertIsValidIdentifier(name, this.isStrict());
		return this.current.scope.createVariable(name, !immutable);
	}

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

	getThisBinding () {
		let thisArg = this.current.scope.getThisBinding();
		if (thisArg) {
			return thisArg;
		}

		if (this.isStrict()) {
			return this.global.getValue("undefined");
		}

		return this.global;
	}

	createExecutionContext (node, callee, isNew) {
		return new ExecutionContext(this, node, callee, isNew);
	}

	createScope (thisArg) {
		return this.setScope(new DeclarativeEnvironment(this.current, thisArg, this));
	}

	createObjectScope (obj, thisArg) {
		return this.setScope(new ObjectEnvironment(this.current, obj, thisArg, this));
	}

	setScope (scope) {
		return this.current = new Scope(this, scope);
	}
}
