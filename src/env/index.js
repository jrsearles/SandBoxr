import ExecutionContext from "../execution-context";
import DeclarativeEnvironment from "./declarative-environment";
import ObjectEnvironment from "./object-environment";
import Reference from "./reference";
import keywords from "../keywords";
import api from "../ecma-5.1";
import comparers from "../utils/comparers";
import {visit as hoister} from "./hoister";

function blockIsStrict (node) {
	if (Array.isArray(node)) {
		return blockIsStrict(node[0]);
	}

	return node
		&& node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& node.expression.value === "use strict";
}

export default class Environment {
	init (config = {}) {
		// clear state in case of re-init
		this.current = null;
		this.globalScope = null;

		api(this, config);
		this.ops = Object.assign(comparers, config.comparers);
	}

	evaluate (left, right, operator) {
		return this.ops[operator](this, left, right);
	}

	getReference (name) {
		var scope = this.current;
		while (scope) {
			if (scope.hasVariable(name)) {
				return scope.getReference(name);
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

	hasVariable (name) {
		return this.current.hasVariable(name);
	}

	getVariable (name) {
		return this.current.getVariable(name);
	}

	deleteVariable (name) {
		this.current.deleteVariable(name);
	}

	createVariable (name, immutable) {
		if (keywords.isReserved(name)) {
			throw new SyntaxError(`Illegal use of reserved keyword: ${name}`);
		}
		
		if (this.isStrict() && keywords.isStrictReserved(name)) {
			throw new SyntaxError(`Illegal use of strict mode reserved keyword: ${name}`);
		}

		return this.current.createVariable(name, !immutable);
	}
	
	isStrict () {
		return this.current && this.current.strict;
	}

	getThisBinding () {
		return this.current.getThisBinding() || this.global;
	}

	createExecutionContext (node, callee, isNew) {
		return new ExecutionContext(this, node, callee, isNew);
	}

	createScope (thisArg) {
		var env = new DeclarativeEnvironment(this.current, thisArg, this);
		return this.setScope(env);
	}

	createObjectScope (obj) {
		var env = new ObjectEnvironment(this.current, obj, this);
		return this.setScope(env);
	}

	initScope (node) {
		let undef = this.global.getValue("undefined");
		this.current.strict = this.current.strict || blockIsStrict(node);

		hoister(node, decl => {
			let name = decl.name || decl.id.name;

			if (decl.type === "FunctionDeclaration") {
				// functions can be used before they are defined
				let func = this.objectFactory.createFunction(decl);
				func.bindScope(this.current);

				this.createVariable(name, true);
				this.putValue(name, func);
			} else {
				if (this.hasVariable(name)) {
					// shadow variable
					this.putValue(name, undef);
				} else {
					this.createVariable(name, true);
				}
			}
		});
	}

	setScope (scope) {
		this.globalScope = this.globalScope || scope;

		var env = this;
		var priorScope = this.current || this.globalScope;
		this.current = scope;
		this.current.strict = priorScope.strict;
		
		return {
			init (node) {
				if (!node) {
					return;
				}

				env.initScope(node);
			},

			exitScope () {
				env.setScope(priorScope);
			}
		};
	}
}
