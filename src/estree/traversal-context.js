import {types} from "./types";
import {interfaces} from "./interfaces";

function isNode (obj) {
	return obj && typeof obj === "object" && typeof obj.type === "string";
}

function assignChild (value, parent, rules) {
	if (value) {
		if (isNode(value)) {
			return new TraversalContext(value, parent, rules);
		}
		
		if (Array.isArray(value)) {
			return value.map(node => assignChild(node, parent, rules));
		}
	}
	
	return value;
}

function isDirective (node) {
	return node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& typeof node.expression.value === "string";
}

function* getDirectives (body) {
	if (body.body) {
		yield* getDirectives(body.body);
	}
	
	if (Array.isArray(body)) {	
		let i = 0, length = body.length;
		while (i < length && isDirective(body[i])) {
			let expr = body[i++].expression;
			let value = expr.value;
			
			if (expr.raw) {
				// remove quotes
				value = expr.raw.substr(1, expr.raw.length - 2);
			}
			
			yield value;
		}
	}
}

export function TraversalContext (node, parent, rules) {
  if (node instanceof TraversalContext) {
    return node;
  }
  
  this._node = node;
  this._parent = parent;

  this.type = node.type;
  this.init(rules);
}

let proto = TraversalContext.prototype = {
  constructor: TraversalContext,
  
	init (rules) {
		this._bindings = [];
		
		let currentScope = this._parent ? this._parent.scopeParent : this;
		let currentBlock = this._parent ? this._parent.blockParent : this;
		
		if (this.isDeclarator()) {
			if (this.isBlockScope()) {
				currentBlock._bindings.push(this);
			} else {
				currentScope._bindings.push(this);
			}
		}
		
		if (this.isScope()) {
			this.scopeParent = this.blockParent = this;
		} else if (this.isBlock()) {
			this.scopeParent = currentScope;
			this.blockParent = this;
		} else {
			this.scopeParent = currentScope;
			this.blockParent = currentBlock;
		}
		
		Object.keys(this._node).forEach(key => this[key] = assignChild(this._node[key], this, rules));
    rules(this);
	},
	
	is (type) {
		if (type === this.type) {
			return true;
		}
		
		let key = `is${type}`;
		if (typeof this[key] === "function") {
			return this[key]();
		}
		
		return false;
	},
	
	has (key) {
		return this._node[key] != null;
	},
	
	getDirectives () {
		if (!this._directives) {
			this._directives = [];
			let it = getDirectives(this._node.body);
			let done, value;
			
			do {
				({done, value} = it.next());
				if (!done && value) {
					this._directives.push(value);
				}
			} while (!done);	
		}
		
		return this._directives;
	},
	
	getBindings () {
		return this._bindings || [];
	},
	
	hasBindings () {
		return this.getBindings().length > 0;
	},
	
	getParent () {
		return this._parent;
	},
	
	isBlockScope () {
		return this.isLet() || this.isConst() || this.isClassDeclaration();
	},
	
	isStrict () {
		if ("_strict" in this) {
			return this._strict;
		}
		
		if (this.isScope()) {
			let directives = this.getDirectives();
			let strict = directives.some(d => d === "use strict");
			
			if (strict || this.isProgram()) {
				return this._strict = strict;
			}
			
			return this.getParent().isStrict();
		}
		
		return this.scopeParent.isStrict();
	}
};

// add helper methods
Object.keys(interfaces).forEach(key => {
	proto[`is${key}`] = typeof interfaces[key] === "function" ? interfaces[key] : function () {
		return interfaces[key].indexOf(this.type) >= 0;
	};
});

Object.keys(types).forEach(key => {
	proto[`is${key}`] = function () {
		return this.type === key;
	};
});

["Var", "Const", "Let"].forEach(key => {
	const lowerCaseKey = key.toLowerCase();
	proto[`is${key}`] = function () {
		return this._parent._node.kind === lowerCaseKey;
	};
});
