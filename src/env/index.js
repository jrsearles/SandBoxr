import ExecutionContext from "../execution-context";
import DeclarativeEnvironment from "./declarative-environment";
import ObjectEnvironment from "./object-environment";
import Reference from "./reference";
import api from "../ecma-5.1";
import comparers from "../utils/comparers";
import * as contracts from "../utils/contracts";
import {visit as hoister} from "./hoister";
import EstreeWalker from "../estree-walker";
import rules from "../syntax-rules";

let defaultOptions = {
	allowDebugger: false	
};

function validateSyntax (root) {
	for (let node of EstreeWalker.create(root)) {
		if (node.type in rules) {
			rules[node.type](node, true);
		}
	}
}

export default class Environment {
	init (options = defaultOptions) {
		// clear state in case of re-init
		this.current = null;
		this.globalScope = null;

		options = Object.assign({}, defaultOptions, options);
		api(this, options);
		
		// todo: improve this
		this.ops = Object.assign(comparers, options.comparers);
	}

	evaluate (left, right, operator) {
		// todo: improve this - why do we need this here?
		return this.ops[operator](this, left, right);
	}

	getReference (name) {
		let scope = this.current;
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
		this.current.putValue(name, value, strict);
	}

	hasProperty (name) {
		return this.current.hasProperty(name);
	}

	deleteVariable (name) {
		this.current.deleteVariable(name);
	}

	createVariable (name, immutable) {
		contracts.assertIsValidIdentifier(name, this.isStrict());
		return this.current.createVariable(name, !immutable);
	}

	isStrict () {
		let scope = this.current;
		
		while (scope) {
			if (scope.strict) {
				return true;
			}
			
			scope = scope.parent;
		}
		
		return false;
	}

	getThisBinding () {
		let thisArg = this.current.getThisBinding();
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
		let env = new DeclarativeEnvironment(this.current, thisArg, this);
		return this.setScope(env);
	}

	createObjectScope (obj, thisArg) {
		let env = new ObjectEnvironment(this.current, obj, thisArg, this);
		return this.setScope(env);
	}

	initScope (node) {
		let undef = this.global.getValue("undefined");
		this.current.strict = contracts.isStrictNode(node.body);
		
		let strict = this.current.strict || this.isStrict();
		if (strict && node.type === "Program") {
			validateSyntax(node);
		}
		
		hoister(node, decl => {
			let name = decl.name || decl.id.name;
			contracts.assertIsValidParameterName(name, this.isStrict());
			
			let value = undef;
			if (decl.type === "FunctionDeclaration") {
				// functions can be used before they are defined
				value = this.objectFactory.createFunction(decl, null, null, strict || contracts.isStrictNode(decl.body.body));
				value.bindScope(this.current);
			} else if (this.current.hasProperty(name)) {
				return;
			}
			
			let newVar = this.createVariable(name, true);
			newVar.setValue(value);
		});
	}

	setScope (scope) {
		this.globalScope = this.globalScope || scope;

		let env = this;
		let priorScope = this.current || this.globalScope;
		this.current = scope;

		return {
			init (node) {
				if (!node) {
					return;
				}

				env.initScope(node);
			},
			
			use (func) {
				try {
					let result = func();
					env.setScope(priorScope);
					return result;
				} catch (err) {
					env.setScope(priorScope);
					throw err;
				}
			},

			exitScope () {
				env.setScope(priorScope);
			}
		};
	}
}
