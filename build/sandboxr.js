(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, config) {
	this.ast = ast;
	this.config = config || {};
	this.env = null;
}

SandBoxr.prototype.execute = function (context) {
	context = context || new ExecutionContext(this.env || this.createScope(), this.ast);

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createScope = function () {
	return (this.env = globalScope(this));
};

module.exports = SandBoxr;

},{"./execution-context":7,"./handlers":23,"./scope/global-scope":48}],2:[function(require,module,exports){
"use strict";
var Reference = require("./reference");

function DeclarativeEnvironment (parent, thisArg, isEval) {
	this.bindings = Object.create(null);
	this.parent = parent;
	this.thisNode = thisArg;
	this.isEval = isEval;
}

DeclarativeEnvironment.prototype = {
	constructor: DeclarativeEnvironment,

	createReference: function (name, strict) {
		return new Reference(name, this, strict);
	},

	hasBinding: function (name) {
		return name in this.bindings;
	},

	createMutableBinding: function (name) {
		if (!this.hasBinding(name)) {
			this.bindings[name] = {
				name: name,
				value: undefined,
				configurable: this.isEval,
				writable: true
			};
		}
	},

	createImmutableBinding: function (name) {
		this.createMutableBinding(name, false);
	},

	initializeImmutableBinding: function (name, value) {
		if (this.hasBinding(name) && !this.bindings[name].value) {
			this.bindings[name].value = value;
		}
	},

	setMutableBinding: function (name, value, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.bindings[name].writable) {
				if (throwOnError) {
					throw new TypeError("Cannot write to immutable binding: " + name);
				}

				return;
			}

			this.bindings[name].value = value;
		}
	},

	getBindingValue: function (name, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.bindings[name].value) {
				if (throwOnError) {
					throw new ReferenceError(name + " is not defined");
				}

				return undefined;
			}

			return this.bindings[name].value;
		}
	},

	deleteBinding: function (name) {
		if (!this.hasBinding(name)) {
			return true;
		}

		if (!this.bindings[name].configurable) {
			return false;
		}

		delete this.bindings[name];
		return true;
	},

	getThisBinding: function () {
		return undefined;
	}
};

module.exports = DeclarativeEnvironment;

},{"./reference":6}],3:[function(require,module,exports){
"use strict";
var DeclarativeEnvironment = require("./declarative-environment");
var ObjectEnvironment = require("./object-environment");
var Reference = require("./reference");
var keywords = require("../keywords");

var scopedBlocks = {
	"CallExpression": true,
	"NewExpression": true,
	"FunctionExpression": true,
	"WithStatement": true
};

function populateHoistedVariables (node, declarators) {
	if (Array.isArray(node)) {
		node.forEach(function (child) {
			populateHoistedVariables(child, declarators);
		});

		return;
	}

	if (!node || !(typeof node === "object")) {
		return;
	}

	if (node.type) {
		if (node.type === "VariableDeclaration") {
			populateHoistedVariables(node.declarations, declarators);
			return;
		}

		if (node.type === "VariableDeclarator" || node.type === "FunctionDeclaration") {
			declarators.push(node);
			return;
		}

		if (node.type === "ForInStatement" && node.left.type === "Identifier") {
			declarators.push(node.left);
			// keep analyzing
		}

		if (node.type === "IfStatement") {
			// cannot hoist variables within if
			populateHoistedVariables(node.consequent, declarators);
			populateHoistedVariables(node.alternate, declarators);
			return;
		}

		if (scopedBlocks[node.type]) {
			return;
		}
	}

	// todo: we could be smarter about this by being more descerning about what nodes we traverse
	var prop;
	for (prop in node) {
		if (node.hasOwnProperty(prop) && node[prop] && typeof node[prop] === "object") {
			populateHoistedVariables(node[prop], declarators);
		}
	}
}

function isStrictMode (node) {
	if (Array.isArray(node)) {
		return isStrictMode(node[0]);
	}

	return node
		&& node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& node.expression.value === "use strict";
}


function Environment (runner) {
	this.runner = runner;
	this.current = null;
	this.globalScope = null;
}

Environment.prototype = {
	constructor: Environment,

	getReference: function (name, strict) {
		var scope = this.current;
		while (scope) {
			if (scope.hasBinding(name)) {
				return scope.createReference(name, strict);
			}

			scope = scope.parent;
		}

		return new Reference(name, undefined, strict, this.global);
	},

	getValue: function (name) {
		return this.getReference(name).getValue();
	},

	putValue: function (name, value, strict) {
		this.current.setMutableBinding(name, value, strict);
	},

	createBinding: function (name, immutable) {
		if (keywords.isReserved(name)) {
			throw new SyntaxError("Illegal use of reserved keyword: " + name);
		}

		this.current.createMutableBinding(name, !immutable);
	},

	hasBinding: function (name) {
		return this.current.hasBinding(name);
	},

	setBinding: function (name, value, strict) {
		this.current.setMutableBinding(name, value);
	},

	createScope: function (thisArg, isEval) {
		var env = new DeclarativeEnvironment(this.current, thisArg, isEval);
		return this.setScope(env);
	},

	createObjectScope: function (obj) {
		var env = new ObjectEnvironment(this.current, obj);
		return this.setScope(env);
	},

	initScope: function (node) {
		var env = this;
		var strict = isStrictMode(node);
		var undef = this.global.getProperty("undefined").getValue();
		var variables = [];
		var name;

		populateHoistedVariables(node, variables);

		variables.forEach(function (decl) {
			name = decl.name || decl.id.name;

			if (decl.type === "FunctionDeclaration") {
				// functions can be used before they are defined
				var func = env.objectFactory.createFunction(decl, env.current);
				env.createBinding(name, true);
				env.setBinding(name, func, strict);
				// note: since the function name may collide with a variable we need to test for existence

				// if (env.hasBinding(name)) {
				// 	env.putValue(name, func);
				// } else {
				// 	env.defineOwnProperty(name, func, { configurable: false, enumerable: false, writable: true }, true);
				// }
			} else {
				if (env.hasBinding(name)) {
					env.setBinding(name, undef, strict);
				} else {
					env.createBinding(name, true);
				}
			}
		});
	},

	setScope: function (scope) {
		this.globalScope = this.globalScope || scope;

		var env = this;
		var priorScope = this.current || this.globalScope;
		this.current = scope;

		return {
			init: function (node) {
				if (!node) {
					return;
				}

				env.initScope(node);
			},

			exitScope: function () {
				env.setScope(priorScope);
			}
		};
	}
};

module.exports = Environment;

},{"../keywords":41,"./declarative-environment":2,"./object-environment":4,"./reference":6}],4:[function(require,module,exports){
"use strict";
var PropertyReference = require("./property-reference");

function ObjectEnvironment (parent, obj) {
	this.parent = parent;
	this.object = this.thisNode = obj;
}

ObjectEnvironment.prototype = {
	constructor: ObjectEnvironment,

	createReference: function (name, strict) {
		return new PropertyReference(name, this.object, strict);
	},

	getValue: function (name) {
		return this.object.getValue(name);
	},

	hasBinding: function (name) {
		return this.object.hasProperty(name);
	},

	createMutableBinding: function (name, immutable) {
		if (this.parent) {
			this.parent.createMutableBinding.apply(this.parent, arguments);
		} else {
			this.object.defineOwnProperty(name, null, {
				value: undefined,
				configurable: immutable,
				enumerable: true,
				writable: true
			}, true);
		}
	},

	createImmutableBinding: function (name) {
		this.createMutableBinding(name, false);
	},

	setMutableBinding: function (name, value, throwOnError) {
		if (this.parent && !this.object.hasProperty(name)) {
			this.parent.setMutableBinding.apply(this.parent, arguments);
		} else {
			this.object.putValue(name, value, throwOnError);
		}
	},

	getBindingValue: function (name, throwOnError) {
		if (!this.hasBinding(name)) {
			if (throwOnError) {
				throw new ReferenceError(name + " is not defined.");
			}

			return undefined;
		}

		return this.object.getProperty(name).getValue();
	},

	deleteBinding: function (name) {
		return this.object.deleteProperty(name, false);
	},

	// getThisBinding: function () {
	// 	return undefined;
	// }
};

module.exports = ObjectEnvironment;

},{"./property-reference":5}],5:[function(require,module,exports){
"use strict";
var Reference = require("./reference");
var PrimitiveType = require("../types/primitive-type");

function PropertyReference (name, object, strict) {
	Reference.apply(this, arguments);
	this.isPropertyReference = true;
}

PropertyReference.prototype = Object.create(Reference.prototype);
PropertyReference.prototype.constructor = PropertyReference;

PropertyReference.prototype.getValue = function () {
	var prop = this.base.getProperty(this.name);
	return prop && prop.getValue() || new PrimitiveType(undefined);
};

PropertyReference.prototype.putValue = function (value) {
	if (this.base.hasProperty(this.name)) {
		this.base.putValue(this.name, value, this.strict);
	} else {
		this.base.defineOwnProperty(this.name, null, { value: value, configurable: true, enumerable: true, writable: true }, this.strict);
	}
};

PropertyReference.prototype.deleteBinding = function (name) {
	return this.base.deleteProperty(name);
};

PropertyReference.prototype.isUnresolved = function () { return false; };

module.exports = PropertyReference;

},{"../types/primitive-type":63,"./reference":6}],6:[function(require,module,exports){
"use strict";
function Reference (name, base, strict, global) {
	this.name = name;
	this.base = base;
	this.strict = strict;
	this.global = global;

	this.isReference = true;
}

Reference.prototype = {
	constructor: Reference,

	putValue: function (value, throwOnError) {
		if (this.base === undefined && throwOnError) {
			throw new ReferenceError(this.name + " is not defined");
		}

		if (this.base) {
			this.base.setMutableBinding(this.name, value, throwOnError);
		} else {
			this.global.defineOwnProperty(this.name, value, { configurable: true, enumerable: true, writable: true }, false);
		}
	},

	getValue: function () {
		if (!this.base) {
			throw new ReferenceError(this.name + " is not defined");
		}

		return this.base.getBindingValue(this.name);
	},

	deleteBinding: function (name) {
		if (this.base) {
			return this.base.deleteBinding(name);
		}

		return true;
	},

	isUnresolved: function () {
		return !this.base;
	}
};

module.exports = Reference;

},{}],7:[function(require,module,exports){
"use strict";
var ExecutionResult = require("./execution-result");

function ExecutionContext (env, node, callee) {
	this.node = node;
	this.callee = callee;
	this.env = env;

	this.label = "";
	this.isNew = false;
	this.strict = false;
}

ExecutionContext.prototype.execute = function () {
	return this.env.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, isNew) {
	var context = new ExecutionContext(this.env, node, callee);
	context.isNew = !!isNew;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = new ExecutionContext(this.env, node);
	context.label = label;
	return context;
};

ExecutionContext.prototype.cancel = function (label) {
	var result = new ExecutionResult(null, label);
	result.cancel = true;
	return result;
};

ExecutionContext.prototype.skip = function (label) {
	var result = new ExecutionResult(null, label);
	result.skip = true;
	return result;
};

ExecutionContext.prototype.exit = function (value) {
	var result = new ExecutionResult(value);
	result.exit = true;
	return result;
};

ExecutionContext.prototype.result = function (value, name, obj) {
	return new ExecutionResult(value, name, obj);
};

ExecutionContext.prototype.empty = function () {
	return new ExecutionResult();
};

module.exports = ExecutionContext;

},{"./execution-result":8}],8:[function(require,module,exports){
"use strict";
function ExecutionResult (value, name, obj) {
	this.result = value;
	this.name = name;
	this.object = obj;

	this.cancel = false;
	this.exit = false;
	this.skip = false;
}

ExecutionResult.prototype.isCancelled = function () {
	return this.cancel || this.exit;
};

ExecutionResult.prototype.shouldBreak = function (context, loop) {
	if (!this.exit && !this.cancel && !this.skip) {
		return false;
	}

	if (this.exit) {
		return true;
	}

	var breaking = true;
	if (this.name && this.name === context.label) {
		breaking = this.cancel;
		this.cancel = this.skip = false;
		return breaking;
	}

	if (loop && !this.name) {
		breaking = this.cancel;
		this.cancel = this.skip = false;
	}

	return breaking;
};

module.exports = ExecutionResult;

},{}],9:[function(require,module,exports){
"use strict";
module.exports = function ArrayExpression (context) {
	var objectFactory = context.env.objectFactory;
	var arr = objectFactory.create("Array");

	if (context.node.elements) {
		var i = 0;
		var ln = context.node.elements.length;

		while (i < ln) {
			if (context.node.elements[i]) {
				var item = context.create(context.node.elements[i]).execute().result.getValue();
				arr.defineOwnProperty(i, null, { value: item, configurable: true, enumerable: true, writable: true });
			}

			i++;
		}

		// todo: can we remove this?
		arr.putValue("length", objectFactory.createPrimitive(ln), false, context);
	}

	return context.result(arr);
};

},{}],10:[function(require,module,exports){
"use strict";
var Reference = require("../env/reference");

var assignOperators = {
	"+=": function (a, b) { return a.value + b.value; },
	"-=": function (a, b) { return a.value - b.value; },
	"*=": function (a, b) { return a.value * b.value; },
	"/=": function (a, b) { return a.value / b.value; },
	"%=": function (a, b) { return a.value % b.value; },
	"<<=": function (a, b) { return a.value << b.value; },
	">>=": function (a, b) { return a.value >> b.value; },
	">>>=": function (a, b) { return a.value >>> b.value; },
	"|=": function (a, b) { return a.value | b.value; },
	"^=": function (a, b) { return a.value ^ b.value; },
	"&=": function (a, b) { return a.value & b.value; }
};

module.exports = function AssignmentExpression (context) {
	var assignment = context.node.operator === "=";
	var right = context.create(context.node.right).execute().result;

	var left = context.create(context.node.left).execute().result;
	if (!(left instanceof Reference)) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}

	var newValue;
	if (assignment) {
		newValue = right.getValue();
	} else {
		var rawValue = assignOperators[context.node.operator](left.getValue(), right.getValue());
		newValue = context.env.objectFactory.createPrimitive(rawValue);
	}

	left.putValue(newValue);
	// var obj = left.object || context.env;
	// var name = left.name;


	// if (obj.hasProperty(name)) {
	// 	obj.putValue(name, newValue, context.strict, context);
	// } else {
	// 	var descriptor = { value: newValue, configurable: true, enumerable: true, writable: true };
	// 	obj.defineOwnProperty(name, null, descriptor, context.strict, context);
	// }

	return context.result(newValue);
};

},{"../env/reference":6}],11:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

function implicitEquals (a, b, context) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if ((a.type === "object" && b.type === "object") || (a.type === "function" && b.type === "function")) {
		return a === b;
	}

	var primitiveA = convert.toPrimitive(context, a);
	var primitiveB = convert.toPrimitive(context, b);

	if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
		return Number(primitiveA) === Number(primitiveB);
	}

	if (typeof primitiveA === "string") {
		return primitiveA === convert.toPrimitive(context, b, "string");
	}

	if (typeof primitiveB === "string") {
		return convert.toPrimitive(context, a, "string") === primitiveB;
	}

	return primitiveA == primitiveB;
}

function strictEquals (a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value === b.value;
	}

	if (a.isPrimitive || b.isPrimitive) {
		return false;
	}

	return a === b;
}

function not (fn) {
	return function (a, b, c) {
		return !fn(a, b, c);
	};
}

function add (a, b, context) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(context, a);
	b = convert.toPrimitive(context, b);
	return a + b;
}

function toNumber (context, obj) {
	if (obj.className === "Number") {
		return obj.toNumber();
	}

	return convert.toPrimitive(context, obj, "number");
}

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": add,
	"-": function (a, b, c) { return toNumber(c, a) - toNumber(c, b); },
	"/": function (a, b, c) { return toNumber(c, a) / toNumber(c, b); },
	"*": function (a, b, c) { return toNumber(c, a) * toNumber(c, b); },
	"==": implicitEquals,
	"!=": not(implicitEquals),
	"===": strictEquals,
	"!==": not(strictEquals),
	"<": function (a, b, c) { return convert.toPrimitive(c, a) < convert.toPrimitive(c, b); },
	"<=": function (a, b, c) { return convert.toPrimitive(c, a) <= convert.toPrimitive(c, b); },
	">": function (a, b, c) { return convert.toPrimitive(c, a) > convert.toPrimitive(c, b); },
	">=": function (a, b, c) { return convert.toPrimitive(c, a) >= convert.toPrimitive(c, b); },
	"<<": function (a, b, c) { return convert.toPrimitive(c, a) << convert.toPrimitive(c, b); },
	">>": function (a, b, c) { return convert.toPrimitive(c, a) >> convert.toPrimitive(c, b); },
	">>>": function (a, b, c) { return convert.toPrimitive(c, a) >>> convert.toPrimitive(c, b); },
	"%": function (a, b, c) { return convert.toPrimitive(c, a) % convert.toPrimitive(c, b); },
	"|": function (a, b, c) { return convert.toInt32(c, a) | convert.toInt32(c, b); },
	"^": function (a, b, c) { return convert.toInt32(c, a) ^ convert.toInt32(c, b); },
	"&": function (a, b, c) { return convert.toInt32(c, a) & convert.toInt32(c, b); },
	"in": function (a, b, c) {
		a = a.toString();
		if (b.isPrimitive) {
			throw new TypeError("Cannot use 'in' operator to search for '" + a + "' in " + b.toString());
		}

		return b.hasProperty(a);
	},
	"instanceof": function (a, b) {
		if (b.type !== "function") {
			throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
		}

		if (a.isPrimitive) {
			return false;
		}

		return b.hasInstance(a);
	}
};

module.exports = function BinaryExpression (context) {
	var undef = context.env.global.getProperty("undefined").getValue();
	var left = context.create(context.node.left).execute().result;
	var leftValue = left.getValue() || undef;

	var right = context.create(context.node.right).execute().result;
	var rightValue = right.getValue() || undef;

	var newValue = binaryOperators[context.node.operator](leftValue, rightValue, context);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
};

},{"../utils/convert":68}],12:[function(require,module,exports){
"use strict";
var scopedBlocks = {
	"CallExpression": true,
	"NewExpression": true,
	"FunctionExpression": true,
	"WithStatement": true
};

function populateHoistedVariables (node, declarators) {
	if (Array.isArray(node)) {
		node.forEach(function (child) {
			populateHoistedVariables(child, declarators);
		});

		return;
	}

	if (!node || !(typeof node === "object")) {
		return;
	}

	if (node.type) {
		if (node.type === "VariableDeclaration") {
			populateHoistedVariables(node.declarations, declarators);
			return;
		}

		if (node.type === "VariableDeclarator" || node.type === "FunctionDeclaration") {
			declarators.push(node);
			return;
		}

		if (node.type === "ForInStatement" && node.left.type === "Identifier") {
			declarators.push(node.left);
			// keep analyzing
		}

		if (node.type === "IfStatement") {
			// cannot hoist variables within if
			populateHoistedVariables(node.consequent, declarators);
			populateHoistedVariables(node.alternate, declarators);
			return;
		}

		if (scopedBlocks[node.type]) {
			return;
		}
	}

	// todo: we could be smarter about this by being more descerning about what nodes we traverse
	var prop;
	for (prop in node) {
		if (node.hasOwnProperty(prop) && node[prop] && typeof node[prop] === "object") {
			populateHoistedVariables(node[prop], declarators);
		}
	}
}

function hoistVariables (nodes, env, strict) {
	var undef = env.global.getProperty("undefined").getValue();
	var variables = [];
	var name;

	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		name = decl.name || decl.id.name;

		if (decl.type === "FunctionDeclaration") {
			// functions can be used before they are defined
			var func = env.objectFactory.createFunction(decl, env.current);
			env.createBinding(name);
			env.setBinding(name, func, strict);
			// note: since the function name may collide with a variable we need to test for existence

			// if (env.hasBinding(name)) {
			// 	env.putValue(name, func);
			// } else {
			// 	env.defineOwnProperty(name, func, { configurable: false, enumerable: false, writable: true }, true);
			// }
		} else {
			if (env.hasBinding(name)) {
				env.setBinding(name, undef, strict);
			} else {
				env.createBinding(name);
			}
		}
	});
}

function isStrictMode (node) {
	return node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& node.expression.value === "use strict";
}

module.exports = function BlockStatement (context) {
	var result;

	// var strict = context.node.body.length > 0 && isStrictMode(context.node.body[0]);
	// var i = strict ? 1 : 0;
	// hoistVariables(context.node.body, context.env, strict);

	if (context.node.type === "Program") {
		context.env.initScope(context.node.body);
	}

	for (var i = 0, ln = context.node.body.length; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context)) {
			break;
		}
	}

	return result;
	// var resultValue = result && result.result && result.result.getValue();
	// return context.result(resultValue);
};

},{}],13:[function(require,module,exports){
"use strict";
var FunctionType = require("../types/function-type");
var Reference = require("../env/reference");
var func = require("../utils/func");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";

	var fnMember = context.create(node.callee).execute().result;
	var fn = fnMember.getValue();
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result.getValue(); });

	if (!(fn instanceof FunctionType)) {
		throw new TypeError(fn.toString() + " not a function");
	}

	var native = fn.native;
	var thisArg;

	if (isNew && !native) {
		thisArg = context.env.objectFactory.createObject(fn);
	}

	if (!isNew && fnMember instanceof Reference) {
		if (fnMember.isPropertyReference) {
			thisArg = fnMember.base;
		} else {
			// thisArg = fnMember.base.getThisValue();
		}
	}

	var params = native ? [] : fn.node.params;
	var callee = native ? fnMember : fn.node;

	return context.result(func.executeFunction(context, fn, params, args, thisArg, callee, isNew));
};

},{"../env/reference":6,"../types/function-type":59,"../utils/func":69}],14:[function(require,module,exports){
"use strict";
module.exports = function DoWhileStatement (context) {
	var result;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = context.create(context.node.test).execute().result.toBoolean();
	}

	while (passed) {
		result = context.create(context.node.body).execute();

		if (result && result.shouldBreak(context, true)) {
			break;
		}

		passed = context.create(context.node.test).execute().result.toBoolean();
	}

	return result;
};

},{}],15:[function(require,module,exports){
"use strict";
module.exports = function EmptyStatement (context) {
	return context.empty();
};

},{}],16:[function(require,module,exports){
"use strict";
module.exports = 	function ExpressionStatement (context) {
	var executionResult = context.create(context.node.expression).execute();
	var executionValue = executionResult && executionResult.result && executionResult.result.getValue();
	return context.result(executionValue || context.env.global.getProperty("undefined").getValue());
};

},{}],17:[function(require,module,exports){
"use strict";
module.exports = function ForInStatement (context) {
	var left;
	if (context.node.left.type === "VariableDeclaration") {
		// should only be one, but
		// need to unwrap the declaration to get it
		// todo: this is sloppy - need to revisit
		context.node.left.declarations.forEach(function (decl) {
			left = context.create(decl).execute();
		});
	} else {
		left = context.create(context.node.left).execute();
	}

	var obj = context.create(context.node.right).execute().result.getValue();
	var result;

	while (obj) {
		for (var prop in obj.properties) {
			if (obj.properties[prop].enumerable) {
				context.env.putValue(left.name, context.env.objectFactory.createPrimitive(prop), false, context);
				result = context.create(context.node.body).execute();

				if (result && result.shouldBreak(context, true)) {
					return result;
				}
			}
		}

		obj = obj.proto;
	}

	return result;
};

},{}],18:[function(require,module,exports){
"use strict";
function shouldContinue (context) {
	if (!context.node.test) {
		return true;
	}

	return context.create(context.node.test).execute().result.getValue().toBoolean();
}

module.exports = function ForStatement (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var result;
	while (shouldContinue(context)) {
		result = context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true)) {
			break;
		}

		if (context.node.update) {
			context.create(context.node.update).execute();
		}
	}

	return result;
};

},{}],19:[function(require,module,exports){
"use strict";
module.exports = function FunctionDeclaration (context) {
	return context.result(context.env.getValue(context.node.id.name));
};

},{}],20:[function(require,module,exports){
"use strict";
module.exports = function FunctionExpression (context) {
	var ctor = context.env.global.getProperty("Function").getValue();
	var objectFactory = context.env.objectFactory;
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.env.current, proto, ctor);

	// todo:
	if (context.node.id /* && context.node.expression */) {
		context.env.putValue(context.node.id.name, func);
	}

	return context.result(func);
};

},{}],21:[function(require,module,exports){
"use strict";
module.exports = function Identifier (context) {
	return context.result(context.env.getReference(context.node.name));
};

},{}],22:[function(require,module,exports){
"use strict";
module.exports = function IfStatement (context) {
	var testValue = context.create(context.node.test).execute().result.getValue();
	if (testValue.toBoolean()) {
		return context.create(context.node.consequent).execute();
	}

	if (context.node.alternate) {
		return context.create(context.node.alternate).execute();
	}
};

},{}],23:[function(require,module,exports){
"use strict";
var handlers = {};

handlers.ArrayExpression = require("./array-expression");
handlers.AssignmentExpression = require("./assignment-expression");
handlers.BinaryExpression = require("./binary-expression");
handlers.BreakStatement = handlers.ContinueStatement = require("./interrupt-statement");
handlers.CallExpression = handlers.NewExpression = require("./call-expression");
handlers.ConditionalExpression = handlers.IfStatement = require("./if-statement");
handlers.DoWhileStatement = handlers.WhileStatement = require("./do-while-statement.js");
handlers.EmptyStatement = require("./empty-statement");
handlers.ExpressionStatement = require("./expression-statement");
handlers.ForStatement = require("./for-statement");
handlers.ForInStatement = require("./for-in-statement");
handlers.FunctionDeclaration = require("./function-declaration");
handlers.FunctionExpression = require("./function-expression");
handlers.Identifier = require("./identifier");
handlers.LabeledStatement = require("./labeled-statement");
handlers.Literal = require("./literal");
handlers.LogicalExpression = require("./logical-expression");
handlers.MemberExpression = require("./member-expression");
handlers.ObjectExpression = require("./object-expression");
handlers.Program = handlers.BlockStatement = require("./block-statement");
handlers.ReturnStatement = require("./return-statement");
handlers.SequenceExpression = require("./sequence-expression");
handlers.SwitchStatement = require("./switch-statement");
handlers.ThisExpression = require("./this-expression");
handlers.ThrowStatement = require("./throw-statement");
handlers.TryStatement = require("./try-statement");
handlers.UnaryExpression = require("./unary-expression");
handlers.UpdateExpression = require("./update-expression");
handlers.VariableDeclaration = require("./variable-declaration");
handlers.VariableDeclarator = require("./variable-declarator");
handlers.WithStatement = require("./with-statement");

module.exports = handlers;

},{"./array-expression":9,"./assignment-expression":10,"./binary-expression":11,"./block-statement":12,"./call-expression":13,"./do-while-statement.js":14,"./empty-statement":15,"./expression-statement":16,"./for-in-statement":17,"./for-statement":18,"./function-declaration":19,"./function-expression":20,"./identifier":21,"./if-statement":22,"./interrupt-statement":24,"./labeled-statement":25,"./literal":26,"./logical-expression":27,"./member-expression":28,"./object-expression":29,"./return-statement":30,"./sequence-expression":31,"./switch-statement":32,"./this-expression":33,"./throw-statement":34,"./try-statement":35,"./unary-expression":36,"./update-expression":37,"./variable-declaration":38,"./variable-declarator":39,"./with-statement":40}],24:[function(require,module,exports){
"use strict";
module.exports = function InterruptStatement (context) {
	var label;
	if (context.node.label) {
		label = context.node.label.name;
	}

	if (context.node.type === "BreakStatement") {
		return context.cancel(label);
	}

	return context.skip(label);
};

},{}],25:[function(require,module,exports){
"use strict";
module.exports = function LabeledStatement (context) {
	return context.createLabel(context.node.body, context.node.label.name).execute();
};

},{}],26:[function(require,module,exports){
"use strict";
module.exports = function Literal (context) {
	return context.result(context.env.objectFactory.createPrimitive(context.node.value));
};

},{}],27:[function(require,module,exports){
"use strict";
module.exports = function LogicalExpression (context) {
	var left = context.create(context.node.left).execute();
	var passed = left.result.getValue().toBoolean();

	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return context.create(context.node.right).execute();
};

},{}],28:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var PropertyReference = require("../env/property-reference");

module.exports = function MemberExpression (context) {
	var obj = context.create(context.node.object).execute().result.getValue();
	var name, value;

	if (context.node.computed) {
		name = convert.toString(context, context.create(context.node.property).execute().result.getValue());
	} else {
		name = context.node.property.name;
	}

	value = new PropertyReference(name, obj);
	return context.result(value);
};

},{"../env/property-reference":5,"../utils/convert":68}],29:[function(require,module,exports){
"use strict";
var func = require("../utils/func");

function setDescriptor (context, obj, name, descriptor) {
	// var currentScope = context.env.current;

	if (descriptor.get) {
		descriptor.getter = function () {
			return func.executeFunction(context, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		};
	}

	if (descriptor.set) {
		descriptor.setter = function () {
			func.executeFunction(context, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		};
	}

	obj.defineOwnProperty(name, null, descriptor);
}

function createDescriptor () {
	return { configurable: true, enumerable: true, writable: true };
}

module.exports = function ObjectExpression (context) {
	var obj = context.env.objectFactory.createObject();
	var descriptors = Object.create(null);

	context.node.properties.forEach(function (property) {
		var value = context.create(property.value).execute().result.getValue();
		var name = property.key.name || property.key.value;

		switch (property.kind) {
			case "get":
			case "set":
				descriptors[name] = descriptors[name] || createDescriptor();
				descriptors[name][property.kind] = value;
				break;

			default:
				obj.defineOwnProperty(name, value, createDescriptor());
				break;
		}
	});

	for (var prop in descriptors) {
		setDescriptor(context, obj, prop, descriptors[prop]);
	}

	return context.result(obj);
};

},{"../utils/func":69}],30:[function(require,module,exports){
"use strict";
module.exports = function ReturnStatement (context) {
	if (context.node.argument) {
		return context.exit(context.create(context.node.argument).execute().result.getValue());
	}

	return context.exit(context.env.global.getProperty("undefined").getValue());
};

},{}],31:[function(require,module,exports){
"use strict";
module.exports = function SequenceExpression (context) {
	var value;

	context.node.expressions.forEach(function (expr) {
		value = context.create(expr).execute().result.getValue();
	});

	return context.result(value);
};

},{}],32:[function(require,module,exports){
"use strict";
function executeStatements (context, statements) {
	var result;
	for (var i = 0, ln = statements.length; i < ln; i++) {
		result = context.create(statements[i]).execute();
		if (result && result.isCancelled()) {
			return result;
		}
	}

	return result;
}

module.exports = function SwitchStatement (context) {
	var testValue = context.create(context.node.discriminant).execute().result.getValue();
	var passed = false;
	var caseValue, value, defaultCase;

	for (var i = 0, ln = context.node.cases.length; i < ln; i++) {
		if (!passed) {
			if (context.node.cases[i].test) {
				caseValue = context.create(context.node.cases[i].test).execute().result.getValue();
				if (!caseValue.equals(testValue)) {
					continue;
				}
			} else {
				// default might not be the last case
				defaultCase = context.node.cases[i];
				continue;
			}
		}

		passed = true;
		value = executeStatements(context, context.node.cases[i].consequent);
		if (value && value.isCancelled()) {
			value.cancel = false;
			return value;
		}
	}

	if (!passed && defaultCase && defaultCase.consequent) {
		value = executeStatements(context, defaultCase.consequent);
		value.cancel = false;
		return value;
	}

	return value;
};

},{}],33:[function(require,module,exports){
"use strict";
module.exports = function ThisExpression (context) {
	return context.result(context.env.current.thisNode);
};

},{}],34:[function(require,module,exports){
"use strict";
module.exports = function ThrowStatement (context) {
	// todo: handle more specific errors
	var arg = context.create(context.node.argument).execute().result.getValue();

	if (arg.isPrimitive) {
		throw arg.value;
	}

	var err = new Error(arg.getProperty("message").getValue().value);
	err.wrappedError = arg;
	throw err;
};

},{}],35:[function(require,module,exports){
"use strict";
module.exports = function TryCatchStatement (context) {
	var result;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			var caughtError = err && err.wrappedError || context.env.objectFactory.createPrimitive(err);

			var scope = context.env.createScope();
			scope.init(context.node.handler.body);

			var errVar = context.node.handler.param.name;

			context.env.createBinding(errVar);
			context.env.setBinding(errVar, caughtError);

			try {
				result = context.create(context.node.handler.body, context.node.handler).execute();
			} catch (catchError) {
				scope.exitScope();
				throw catchError;
			}

			scope.exitScope();
		} else {
			throw err;
		}
	} finally {
		if (context.node.finalizer) {
			var finalResult = context.create(context.node.finalizer).execute();
			if (finalResult && finalResult.shouldBreak(context)) {
				return finalResult;
			}
		}
	}

	return result;
};

},{}],36:[function(require,module,exports){
"use strict";
var Reference = require("../env/reference");
var convert = require("../utils/convert");

module.exports = function UnaryExpression (context) {
	var result = context.create(context.node.argument).execute().result;
	var objectFactory = context.env.objectFactory;
	var value, newValue;

	switch (context.node.operator) {
		case "typeof":
			var type;
			if (result instanceof Reference && result.isUnresolved()) {
				type = "undefined";
			} else {
				value = result.getValue();
				type = value ? value.type : "undefined";
			}

			newValue = objectFactory.createPrimitive(type);
			break;

		case "-":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(-(convert.toNumber(context, value)));
			break;

		case "+":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(+(convert.toNumber(context, value)));
			break;

		case "!":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(!(value.isPrimitive ? value.toBoolean() : true));
			break;

		case "~":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(~(convert.toInt32(context, value)));
			break;

		case "delete":
			var deleted = true;
			if (result && result instanceof Reference) {
				if (!result.isUnresolved()) {
					deleted = result.deleteBinding(result.name);
				}
			} else if (context.node.argument.object) {
				throw new ReferenceError(context.node.argument.object.name + " is not defined");
			}

			newValue = objectFactory.createPrimitive(deleted);
			break;

		case "void":
			newValue = objectFactory.createPrimitive(undefined);
			break;

		default:
			throw new SyntaxError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};

},{"../env/reference":6,"../utils/convert":68}],37:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

module.exports = function UpdateExpression (context) {
	var objectFactory = context.env.objectFactory;
	var ref = context.create(context.node.argument).execute().result;
	var originalValue = convert.toNumber(context, ref.getValue());
	var newValue = originalValue;

	if (context.node.operator === "++") {
		newValue++;
	} else {
		newValue--;
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	// var obj = executionResult.object || context.env;
	// var name = executionResult.name;
	var returnValue = context.node.prefix ? newValue : originalValue;

	ref.putValue(newValue);
	// obj.putValue(name, newValue, false, context);
	return context.result(returnValue);
};

},{"../utils/convert":68}],38:[function(require,module,exports){
"use strict";
module.exports = function VariableDeclaration (context) {
	context.node.declarations.forEach(function (decl) {
		context.create(decl).execute();
	});

	return context.empty();
};

},{}],39:[function(require,module,exports){
"use strict";
module.exports = function VariableDeclarator (context) {
	var id = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.env.putValue(id, value.getValue(), false, context);
	}

	return context.result(value, id);
};

},{}],40:[function(require,module,exports){
"use strict";
module.exports = function WithStatement (context) {
	var obj = context.create(context.node.object).execute().result.getValue();
	var scope = context.env.createObjectScope(obj);
	var result;

	scope.init(context.node.body);

	try {
		result = context.create(context.node.body).execute();
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
	return result;
};

},{}],41:[function(require,module,exports){
"use strict";
module.exports = {
	"es5": [
		"do",
		"if",
		"in",
		"for",
		"new",
		"try",
		"var",
		"case",
		"else",
		"enum",
		"eval",
		"null",
		"this",
		"true",
		"void",
		"with",
		"break",
		"catch",
		"class",
		"const",
		"false",
		"super",
		"throw",
		"while",
		"delete",
		"export",
		"import",
		"return",
		"switch",
		"typeof",
		"default",
		"extends",
		"finally",
		"continue",
		"debugger",
		"function",
		// "arguments",
		"instanceof"],

	"es5-strict": [
		"implements",
		"let",
		"private",
		"public",
		"interface",
		"package",
		"protected",
		"static",
		"yield"],

	isReserved: function (name, scope) {
		return this.es5.indexOf(name) >= 0;
		// if (this[scope.version].indexOf(name) >= 0) {
		// 	return true;
		// }

		// if (scope.strict && this[scope.version + "-strict"].indexOf >= 0) {
		// 	return true;
		// }

		// return false;
	}
};

},{}],42:[function(require,module,exports){
"use strict";
var contracts = require("../utils/contracts");
var func = require("../utils/func");
var convert = require("../utils/convert");
var ArrayType = require("../types/array-type");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

function getStartIndex (index, length) {
	if (index < 0) {
		return Math.max(length - Math.abs(index), 0);
	}

	return Math.min(index || 0, length);
}

function getEndIndex (index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index, length);
}

function executeCallback (callback, thisArg, executionContext, index) {
	var scope = executionContext.env.createScope(thisArg);
	scope.init(callback.node.body);

	var undef = executionContext.env.global.getProperty("undefined").getValue();
	var objectFactory = executionContext.env.objectFactory;
	var args = [executionContext.node.getProperty(index).getValue(), objectFactory.createPrimitive(index), executionContext.node];
	var executionResult;

	func.loadArguments(callback.node.params, args, executionContext.env);

	try {
		executionResult = executionContext.create(callback.node.body, callback.node).execute();
		return executionResult ? executionResult.result : undef;
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.env.createScope();
	scope.init(callback.node.body);

	var undef = executionContext.env.global.getProperty("undefined").getValue();
	var objectFactory = executionContext.env.objectFactory;
	var args = [priorValue || undef, executionContext.node.getProperty(index).getValue() || undef, objectFactory.createPrimitive(index), executionContext.node];
	var executionResult;

	func.loadArguments(callback.node.params, args, executionContext.env);

	try {
		executionResult = executionContext.create(callback.node.body, callback.node).execute();
		return executionResult ? executionResult.result : undef;
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
}

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var undef = globalObject.getProperty("undefined").getValue();

	var arrayClass = objectFactory.createFunction(function (length) {
		var newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				newArray.putValue("length", length, false, this);
			} else {
				for (var i = 0, ln = arguments.length; i < ln; i++) {
					newArray.putValue(i, arguments[i], false, this);
				}
			}
		}

		return newArray;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = arrayClass.proto;
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

	arrayClass.defineOwnProperty("isArray", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj === proto || obj instanceof ArrayType);
	}));

	proto.defineOwnProperty("push", objectFactory.createBuiltInFunction(function (arg) {
		var start = convert.toUInt32(this, this.node.getProperty("length").getValue());

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.putValue(start + i, arguments[i]);
		}

		var newLength = objectFactory.createPrimitive(start + i);
		this.node.putValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.push"), propertyConfig);

	proto.defineOwnProperty("pop", objectFactory.createBuiltInFunction(function () {
		var obj;
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		if (length) {
			obj = this.node.getProperty(--length).getValue();
			this.node.deleteProperty(length);
		}

		this.node.putValue("length", objectFactory.createPrimitive(length || 0));
		return obj || undef;
	}, 0, "Array.prototype.pop"), propertyConfig);

	proto.defineOwnProperty("shift", objectFactory.createBuiltInFunction(function () {
		var obj;
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		var i = 0;

		if (length > 0) {
			obj = this.node.getProperty(i).getValue();
			this.node.deleteProperty(i);

			while (++i < length) {
				if (this.node.hasProperty(i)) {
					this.node.putValue(i - 1, this.node.getProperty(i).getValue());
				} else {
					this.node.deleteProperty(i);
				}
			}
		}

		this.node.putValue("length", objectFactory.createPrimitive(length === 0 ? 0 : --length));
		return obj || undef;
	}, 0, "Array.prototype.shift"), propertyConfig);

	proto.defineOwnProperty("unshift", objectFactory.createBuiltInFunction(function (elementN) {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		var count = arguments.length;
		var i = length || 0;

		while (i > 0) {
			if (this.node.hasProperty(i - 1)) {
				this.node.putValue(i + count - 1, this.node.getProperty(i - 1).getValue());
			} else {
				this.node.deleteProperty(i + count - 1);
			}

			i--;
		}

		for (; i < count; i++) {
			this.node.putValue(i, arguments[i]);
		}

		var newLength = objectFactory.createPrimitive(count + length);
		this.node.putValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.unshift"), propertyConfig);

	proto.defineOwnProperty("slice", objectFactory.createBuiltInFunction(function (begin, end) {
		var source = this.node;
		var length = convert.toUInt32(this, source.getProperty("length").getValue());
		begin = begin ? convert.toInteger(this, begin) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = convert.toInteger(this, end);
		}

		var arr = objectFactory.create("Array");
		var index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (var i = begin; i < end; i++) {
			arr.putValue(index++, source.getProperty(i).getValue());
		}

		return arr;
	}, 2, "Array.prototype.slice"), propertyConfig);

	proto.defineOwnProperty("splice", objectFactory.createBuiltInFunction(function (start, deleteCount) {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		start = convert.toInteger(this, start);
		if (start < 0) {
			start = Math.max(length + start, 0);
		} else {
			start = Math.min(start, length);
		}

		deleteCount = Math.min(Math.max(convert.toInteger(this, deleteCount), 0), length - start);
		var removed = objectFactory.create("Array");

		var k = 0;
		while (k < deleteCount) {
			if (this.node.hasProperty(k + start)) {
				removed.putValue(k, this.node.getProperty(k + start).getValue());
			}

			k++;
		}

		var newCount = arguments.length - 2;
		if (newCount < deleteCount) {
			k = start;

			while (k < length - deleteCount) {
				if (this.node.hasProperty(k + deleteCount)) {
					this.node.putValue(k + newCount, this.node.getProperty(k + deleteCount).getValue());
				} else {
					this.node.deleteProperty(k + deleteCount);
				}

				k++;
			}

			k = length;
			while (k > length - deleteCount + newCount) {
				this.node.deleteProperty(--k);
			}
		} else if (newCount > deleteCount) {
			k = length - start;
			while (k > start) {
				if (this.node.hasProperty(k + deleteCount - 1)) {
					this.node.putValue(k + newCount - 1, this.node.getProperty(k + deleteCount - 1).getValue());
				} else {
					this.node.deleteProperty(k + newCount - 1);
				}

				k--;
			}
		}

		k = start;
		var i = 0;
		for (; i < newCount; i++) {
			this.node.putValue(k, arguments[i + 2]);
			k++;
		}

		this.node.putValue("length", objectFactory.createPrimitive(length - deleteCount + newCount));
		return removed;
	}, 2, "Array.prototype.splice"), propertyConfig);

	proto.defineOwnProperty("concat", objectFactory.createBuiltInFunction(function () {
		var newArray = objectFactory.create("Array");
		var arrays = Array.prototype.slice.call(arguments);

		// add "this" array to bunch
		arrays.unshift(this.node);

		var current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof ArrayType) {
				for (i = 0, length = current.getProperty("length").getValue().value; i < length; i++) {
					newArray.putValue(index++, current.getProperty(i).getValue());
				}
			} else {
				newArray.putValue(index++, current);
			}
		}

		return newArray;
	}, 1, "Array.prototype.concat"), propertyConfig);

	function join (separator) {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		separator = arguments.length === 0 || separator === undef ? "," : convert.toPrimitive(this, separator, "string");
		var stringValues = [];
		var stringValue;

		for (var i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getProperty(i).getValue();
				if (stringValue.isPrimitive) {
					stringValue = stringValue.value == null ? "" : stringValue.toString();
				} else {
					stringValue = convert.toPrimitive(this, stringValue, "string");
				}
			}

			stringValues.push(stringValue);
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}

	proto.defineOwnProperty("join", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.join"), propertyConfig);

	proto.defineOwnProperty("indexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		searchElement = searchElement || undef;
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		var index = arguments.length === 1 ? 0 : convert.toInteger(this, fromIndex);
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getProperty(index).getValue() || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}, 1, "Array.prototype.indexOf"), propertyConfig);

	proto.defineOwnProperty("lastIndexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		searchElement = searchElement || undef;
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		var index = arguments.length === 1 ? length - 1 : convert.toInteger(this, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getProperty(index).getValue() || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"), propertyConfig);

	proto.defineOwnProperty("forEach", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}, 1, "Array.prototype.forEach"), propertyConfig);

	proto.defineOwnProperty("map", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		newArray.putValue("length", objectFactory.createPrimitive(length));

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				newArray.putValue(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}, 1, "Array.prototype.map"), propertyConfig);

	proto.defineOwnProperty("filter", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.putValue(index++, this.node.getProperty(i).getValue());
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"), propertyConfig);

	proto.defineOwnProperty("every", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}, 1, "Array.prototype.every"), propertyConfig);

	proto.defineOwnProperty("some", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");

		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"), propertyConfig);

	proto.defineOwnProperty("reduce", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");
		contracts.assertIsFunction(callback);

		var index = 0;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index < length && !(this.node.hasProperty(index))) {
				index++;
			}

			if (index >= length) {
				throw new TypeError("Reduce of empty array with no initial value");
			}

			value = this.node.getProperty(index++).getValue();
		}

		for (; index < length; index++) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduce"), propertyConfig);

	proto.defineOwnProperty("reduceRight", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var index = convert.toUInt32(this, this.node.getProperty("length").getValue());

		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");
		contracts.assertIsFunction(callback);

		index--;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index >= 0 && !(this.node.hasProperty(index))) {
				index--;
			}

			if (index <= 0) {
				throw new TypeError("Reduce of empty array with no initial value");
			}

			value = this.node.getProperty(index--).getValue();
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduceRight"), propertyConfig);

	proto.defineOwnProperty("reverse", objectFactory.createBuiltInFunction(function () {
		var length = convert.toUInt32(this, this.node.getProperty("length").getValue());
		var temp;

		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.getProperty(length - i - 1).getValue();
			this.node.putValue(length - i - 1, this.node.getProperty(i).getValue());
			this.node.putValue(i, temp);
		}

		return this.node;
	}, 0, "Array.prototype.reverse"), propertyConfig);

	function defaultComparer (a, b) {
		a = a.toString();
		b = b.toString();

		if (a < b) {
			return -1;
		}

		if (a > b) {
			return 1;
		}

		return 0;
	}

	proto.defineOwnProperty("sort", objectFactory.createBuiltInFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.env.createScope(arr);
			func.loadArguments(compareFunction.node.params, [a, b], executionContext.env);

			try {
				return executionContext.create(compareFunction.node.body, compareFunction.node).execute().result.getValue().value;
			} catch (err) {
				scope.exitScope();
				throw err;
			}

			scope.exitScope();
		};

		// convert to array, run the wrapped comparer, then re-assign indexes
		convert.toArray(arr)
			.sort(wrappedComparer || defaultComparer)
			.forEach(function (element, index) {
				arr.putValue(index, element, false, this);
			});

		return arr;
	}, 1, "Array.prototype.sort"), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createBuiltInFunction(function () {
		// todo: implement for reach
		var values = convert.toArray(this.node).map(function (arg) { return arg.value.toLocaleString(); });
		return objectFactory.createPrimitive(values.toLocaleString());
	}, 0, "Array.prototype.toLocaleString"), propertyConfig);

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.toString"), propertyConfig);

	globalObject.defineOwnProperty("Array", arrayClass, propertyConfig);
};

},{"../types/array-type":56,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69}],43:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var booleanClass = objectFactory.createFunction(function (obj) {
		var booleanValue = obj && obj.isPrimitive ? obj.toBoolean() : !!obj;

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(booleanValue, objectFactory);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	booleanClass.proto.className = "Boolean";
	booleanClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.toString is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value ? this.node.value.toString() : "false");
	}), propertyConfig);

	booleanClass.proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.valueOf is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value || false);
	}), propertyConfig);

	globalObject.defineOwnProperty("Boolean", booleanClass, propertyConfig);
};

},{"../utils/convert":68}],44:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var methods = ["log", "info", "error"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, objectFactory.createBuiltInFunction(function (message) {
			var stringValue = convert.toString(this, message);
			console[name](stringValue);
		}, 1, "console." + name));
	});

	globalObject.defineOwnProperty("console", consoleClass);
};

},{"../utils/convert":68}],45:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var staticMethods = ["now"];
var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];
var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var dateClass = objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			if (p1.isPrimitive) {
				args = [p1.value];
			} else {
				var primitiveValue = convert.toPrimitive(this, p1);
				if (typeof primitiveValue !== "string") {
					primitiveValue = convert.toNumber(this, p1);
				}

				args = [primitiveValue];
			}
		} else {
			args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "number"); });
		}

		if (this.isNew) {
			switch (args.length) {
				case 0:
					dateValue = new Date();
					break;

				case 1:
					dateValue = new Date(args[0]);
					break;

				default:
					var i = args.length;
					while (i < 7) {
						// default day to 1, all others to 0
						args[i++] = i === 3 ? 1 : 0;
					}

					dateValue = new Date(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
					break;
			}

			return objectFactory.create("Date", dateValue);
		}

		dateValue = Date.apply(null, args);
		return objectFactory.createPrimitive(dateValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	dateClass.defineOwnProperty("parse", objectFactory.createBuiltInFunction(function (value) {
		var stringValue = convert.toPrimitive(this, value, "string");
		var dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, 1, "Date.prototype.parse"), propertyConfig);

	dateClass.defineOwnProperty("UTC", objectFactory.createBuiltInFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "number"); });
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, 7, "Date.prototype.UTC"), propertyConfig);

	var proto = dateClass.proto;

	staticMethods.forEach(function (name) {
		dateClass.defineOwnProperty(name, convert.toNativeFunction(objectFactory, Date[name], "Date." + name), propertyConfig);
	});

	protoMethods.forEach(function (name) {
		proto.defineOwnProperty(name, convert.toNativeFunction(objectFactory, Date.prototype[name], "Date.prototype." + name), propertyConfig);
	});

	setters.forEach(function (name) {
		function setter () {
			var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(arg); });
			Date.prototype[name].apply(this.node.value, args);
		}

		setter.nativeLength = Date.prototype[name].length;
		proto.defineOwnProperty(name, objectFactory.createFunction(setter), propertyConfig);
	});

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.value.valueOf());
	}), propertyConfig);

	globalObject.defineOwnProperty("Date", dateClass, propertyConfig);
};

},{"../utils/convert":68}],46:[function(require,module,exports){
"use strict";
var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");
		obj.putValue("message", message, false, this);
		obj.putValue("name", objectFactory.createPrimitive("Error"), false, this);
		return obj;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	errorClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var name = this.node.getProperty("name").getValue();
		var msg = this.node.getProperty("message").getValue();

		name = name && name.toString();
		msg = msg && msg.toString();

		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}), propertyConfig);

	globalObject.defineOwnProperty("Error", errorClass, propertyConfig);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.create("Error", { name: type });
			err.putValue("message", message, false, this);
			err.putValue("name", objectFactory.createPrimitive(type), false, this);
			return err;
		}, null, null, null, { configurable: false, enumerable: false, writable: false });

		errClass.proto.parent = errorClass;
		globalObject.defineOwnProperty(type, errClass, propertyConfig);
	});
};

},{}],47:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var func = require("../utils/func");

var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env, options) {
	var globalObject = env.global;
	var undef = globalObject.getProperty("undefined").getValue();
	var objectFactory = env.objectFactory;
	// var proto = new ObjectType();
	var functionClass = objectFactory.createFunction(function () {
		var context = this;
		var funcInstance;

		if (options.parser && arguments.length > 0) {
			var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "string"); });
			var body = options.parser("(function () {" + args.pop() + "}).apply(this, arguments);");

			var fnNode = {
				type: "FunctionDeclaration",
				params: args.map(function (arg) {
					return {
						type: "Identifier",
						name: arg
					};
				}),
				body: body
			};

			funcInstance = objectFactory.createFunction(fnNode, env.globalScope);
		} else {
			funcInstance = objectFactory.createFunction(function () {});
		}

		funcInstance.putValue("constructor", functionClass);
		return funcInstance;

		// if (this.isNew) {
		// 	// todo: verify the behavior here
		// 	this.node.putValue("constructor", functionClass, false, this);
		// 	this.node.type = "function";
		// 	this.node.className = "Function";
		// 	return this.node;
		// }

		// return objectFactory.createObject();
	}, null, null, null, { configurable: false, enumerable: false, writable: false });
	functionClass.putValue("constructor", functionClass);
	globalObject.defineOwnProperty("Function", functionClass, propertyConfig);

	var proto = functionClass.proto;
	proto.type = "function";
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0));

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.native) {
			return objectFactory.createPrimitive("function () { [native code] }");
		}

		return objectFactory.createPrimitive("function () { [user code] }");
	}), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		return this.node;
	}, 0, "Function.prototype.valueOf"), propertyConfig);

	proto.defineOwnProperty("call", objectFactory.createFunction(function (thisArg) {
		thisArg = convert.toObject(thisArg, objectFactory);
		var args = slice.call(arguments, 1);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}), propertyConfig);

	proto.defineOwnProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		thisArg = convert.toObject(thisArg, objectFactory);
		var args = convert.toArray(argsArray);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}), propertyConfig);

	proto.defineOwnProperty("bind", objectFactory.createFunction(function (thisArg) {
		thisArg = convert.toObject(thisArg, objectFactory);
		var args = slice.call(arguments, 1);
		var fn = this.node;
		var params = fn.native ? [] : fn.node.params;
		var callee = fn.native ? fn : fn.node;

		return objectFactory.createFunction(function () {
			var mergedArgs = args.concat(slice.call(arguments));
			return func.executeFunction(this, fn, params, mergedArgs, thisArg, callee);
			
			// var scope = this.env.createScope(thisArg);
			// scope.init(callee.node.body);

			// func.loadArguments(callee.node.params, args.concat(slice.call(arguments)), env, callee);

			// try {
			// 	var result = this.create(callee.node.body, callee).execute().result;
			// 	return result ? result.getValue() : undef;
			// } catch (err) {
			// 	scope.exitScope();
			// }

			// scope.exitScope();
		}, this.env.current);
	}), propertyConfig);
};

},{"../utils/convert":68,"../utils/func":69}],48:[function(require,module,exports){
(function (global){
"use strict";
var Environment = require("../env/environment");
// var Scope = require("./scope");
var PrimitiveType = require("../types/primitive-type");
var ObjectFactory = require("../types/object-factory");
var numberAPI = require("./number-api");
var stringAPI = require("./string-api");
var functionAPI = require("./function-api");
var objectAPI = require("./object-api");
var booleanAPI = require("./boolean-api");
var dateAPI = require("./date-api");
var arrayAPI = require("./array-api");
var mathAPI = require("./math-api");
var regexAPI = require("./regex-api");
var errorAPI = require("./error-api");
var jsonAPI = require("./json-api");
var consoleAPI = require("./console-api");
var convert = require("../utils/convert");
var Reference = require("../env/reference");

var globalFunctions = ["isNaN", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"];
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function GlobalScope (runner) {
	var config = runner.config;
	var env = new Environment(runner);
	var objectFactory = env.objectFactory = new ObjectFactory(env);
	var globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	var undefinedClass = new PrimitiveType(undefined);
	globalObject.defineOwnProperty("undefined", undefinedClass);

	var nullClass = new PrimitiveType(null);
	globalObject.defineOwnProperty("null", nullClass);

	globalObject.defineOwnProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false, enumerable: false });
	globalObject.defineOwnProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false, enumerable: false });

	// todo: node vs browser - do we care?
	globalObject.defineOwnProperty("window", globalObject, { configurable: false, enumerable: true, writable: false });

	functionAPI(env, config);
	objectAPI(env, config);
	arrayAPI(env, config);
	booleanAPI(env, config);
	numberAPI(env, config);
	stringAPI(env, config);
	dateAPI(env, config);
	regexAPI(env, config);
	mathAPI(env, config);
	errorAPI(env, config);
	jsonAPI(env, config);
	consoleAPI(env, config);

	globalFunctions.forEach(function (name) {
		globalObject.defineOwnProperty(name, convert.toNativeFunction(objectFactory, global[name], name), propertyConfig);
	});

	globalObject.defineOwnProperty("parseInt", objectFactory.createBuiltInFunction(function (value, radix) {
		var stringValue = convert.toPrimitive(this, value, "string");
		radix = convert.toPrimitive(this, radix, "number");

		return objectFactory.createPrimitive(parseInt(stringValue, radix));
	}, 2, "parseInt"), propertyConfig);

	globalObject.defineOwnProperty("parseFloat", objectFactory.createBuiltInFunction(function (value) {
		var stringValue = convert.toPrimitive(this, value, "string");
		return objectFactory.createPrimitive(parseFloat(stringValue));
	}, 2, "parseFloat"), propertyConfig);

	if (config.parser) {
		var evalFunc = objectFactory.createBuiltInFunction(function (code) {
			if (!code) {
				return undefinedClass;
			}

			if (code.type !== "string") {
				return code;
			}

			var indirect = !(this.callee instanceof Reference) || this.callee.base !== globalObject;
			var ast;

			try {
				ast = config.parser(code.value);
			} catch (err) {
				if (err instanceof SyntaxError && /assigning to rvalue/i.test(err.message)) {
					// hack because acorn throws syntax error
					throw new ReferenceError("Invalid left-hand side in assignment");
				}

				throw err;
			}

			// use the same scope unless this is an "indirect" call
			// in which case we use the global scope
			var scope = this.env.setScope(indirect ? this.env.globalScope : this.env.current.parent);
			var executionResult;

			try {
				executionResult = this.create(ast).execute();
			} catch (err) {
				scope.exitScope();
				throw err;
			}

			scope.exitScope();
			return executionResult && executionResult.result ? executionResult.result.getValue() : undefinedClass;
		}, 1, "eval");

		// evalFunc.parent = globalObject.getValue("Object");
		// evalFunc.setProto(null);
		globalObject.defineOwnProperty("eval", evalFunc, propertyConfig);
	}

	// globalObject.setProto(globalObject.getValue("Object").proto);
	objectFactory.init();
	return env;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../env/environment":3,"../env/reference":6,"../types/object-factory":61,"../types/primitive-type":63,"../utils/convert":68,"./array-api":42,"./boolean-api":43,"./console-api":44,"./date-api":45,"./error-api":46,"./function-api":47,"./json-api":49,"./math-api":50,"./number-api":51,"./object-api":52,"./regex-api":53,"./string-api":54}],49:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var methods = ["parse", "stringify"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var jsonClass = objectFactory.createObject();
	jsonClass.className = "JSON";

	methods.forEach(function (name) {
		jsonClass.defineOwnProperty(name, convert.toNativeFunction(objectFactory, JSON[name], "JSON." + name), { configurable: true, enumerable: false, writable: true });
	});

	globalObject.defineOwnProperty("JSON", jsonClass, { configurable: true, enumerable: false, writable: true });
};

},{"../utils/convert":68}],50:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var mathClass = objectFactory.createObject();
	mathClass.className = "Math";

	constants.forEach(function (name) {
		mathClass.defineOwnProperty(name, objectFactory.createPrimitive(Math[name]), { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.defineOwnProperty(name, convert.toNativeFunction(objectFactory, Math[name], "Math." + name), propertyConfig);
	});

	globalObject.defineOwnProperty("Math", mathClass, propertyConfig);
};

},{"../utils/convert":68}],51:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toPrecision", "toLocaleString"];
var staticMethods = ["isNaN", "isFinite", "parseFloat", "parseInt"];

var polyfills = {
	"isNaN": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
		return typeof value === "number" && value !== value;
	},
	"isFinite": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
		return typeof value === "number" && isFinite(value);
	},
	"parseFloat": parseFloat,
	"parseInt": parseInt
};

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var numberClass = objectFactory.createFunction(function (obj) {
		var numberValue = Number(convert.toPrimitive(this, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(numberValue, objectFactory);
		}

		return objectFactory.create("Number", numberValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = numberClass.proto;
	proto.className = "Number";

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function (radix) {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.toString is not generic");
		}

		var radixValue = 10;
		if (radix) {
			radixValue = convert.toPrimitive(this, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, 1, "Number.prototype.toString"), propertyConfig);

	proto.defineOwnProperty("toFixed", objectFactory.createBuiltInFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = convert.toPrimitive(this, fractionDigits, "number");
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.toNumber(), digits));
	}, 1, "Number.prototype.toFixed"), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"), propertyConfig);

	constants.forEach(function (name) {
		numberClass.defineOwnProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "Number.prototype." + name), propertyConfig);
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "Number." + name), propertyConfig);
		}
	});

	globalObject.defineOwnProperty("Number", numberClass, propertyConfig);
};

},{"../utils/convert":68}],52:[function(require,module,exports){
"use strict";
var ObjectType = require("../types/object-type");
var convert = require("../utils/convert");
var contracts = require("../utils/contracts");
var func = require("../utils/func");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

function isObject (obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

function defineProperty (context, obj, name, descriptor) {
	if (!isObject(descriptor)) {
		throw new TypeError("Property description must be an object: " + (descriptor ? descriptor.toString() : "undefined"));
	}

	var undef = context.env.global.getProperty("undefined").getValue();
	var options = {};  // { writable: false, enumerable: false, configurable: false };

	if (descriptor) {
		var hasValue = descriptor.hasProperty("value");
		var hasGetter = descriptor.hasProperty("get");
		var hasSetter = descriptor.hasProperty("set");

		if ((hasValue || descriptor.hasProperty("writable")) && (hasGetter || hasSetter)) {
			throw new TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");
		}

		["writable", "enumerable", "configurable"].forEach(function (prop) {
			if (descriptor.hasProperty(prop)) {
				var attrValue = descriptor.getProperty(prop).getValue();
				options[prop] = !!(attrValue && attrValue.toBoolean());
			}
		});

		var currentScope = context.env.current;

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (hasGetter) {
			var getter = descriptor.getProperty("get").getValue() || undef;
			if (getter.isPrimitive && getter.value === undefined) {
				options.get = options.getter = undefined;
			} else {
				if (getter.className !== "Function") {
					throw new TypeError("Getter must be a function: " + getter.toString());
				}

				options.get = getter;
				options.getter = function () {
					var scope = context.env.setScope(currentScope);

					try {
						var getResult = func.getFunctionResult(context, getter, getter.node.params, [], this, getter.node);
						return getResult && getResult.exit ? getResult.result.getValue() : undef;
					} catch (err) {
						scope.exitScope();
						throw err;
					}

					scope.exitScope();
				};
			}
		}

		if (hasSetter) {
			var setter = descriptor.getProperty("set").getValue() || undef;
			if (setter.isPrimitive && setter.value === undefined) {
				options.set = options.setter = undefined;
			} else {
				if (setter.className !== "Function") {
					throw new TypeError("Setter must be a function: " + setter.toString());
				}

				options.set = setter;
				options.setter = function () {
					var scope = context.env.setScope(currentScope);

					try {
						func.executeFunction(context, setter, setter.node.params, arguments, this, setter.node);
						return undef;
					} catch (err) {
						scope.exitScope();
						throw err;
					}

					scope.exitScope();
				};
			}
		}

		if (hasValue) {
			options.value = descriptor.getProperty("value").getValue() || undef;
		}
	}

	obj.defineOwnProperty(name, null, options, true, context);
}

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var undef = globalObject.getProperty("undefined").getValue();

	var proto = new ObjectType();
	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				if (value.value == null) {
					return objectFactory.createObject();
				}

				var objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				objectWrapper.toBoolean = function () { return true; };
				return objectWrapper;
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	}, null, proto, null, { configurable: false, enumerable: false, writable: false });

	// var proto = objectClass.proto;
	proto.defineOwnProperty("hasOwnProperty", objectFactory.createBuiltInFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}, 1, "Object.prototype.hasOwnProperty"), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		// if ("value" in this.node) {
		// 	return objectFactory.createPrimitive(this.node.value);
		// }

		return this.node;
	}, 0, "Object.prototype.valueOf"), propertyConfig);

	var toStringFunc = objectFactory.createBuiltInFunction(function () {
		var obj = this.env.current.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	proto.defineOwnProperty("toString", toStringFunc, propertyConfig);
	proto.defineOwnProperty("toLocaleString", toStringFunc, propertyConfig);

	proto.defineOwnProperty("isPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		var current = obj;
		var thisNode = this.env.current.thisNode;

		while (current) {
			if (thisNode === current || thisNode === (current.parent && current.parent.proto)) {
				return objectFactory.createPrimitive(true);
			}

			if (!current.hasOwnProperty("prototype")) {
				break;
			}

			current = current.getProperty("prototype").getValue();

			// if (current.parent && current.parent.proto === this.scope.thisNode) {
			// 	return objectFactory.createPrimitive(true);
			// }

			// current = current.proto; // && current.parent.proto;
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Object.isPrototypeOf"), propertyConfig);

	proto.defineOwnProperty("propertyIsEnumerable", objectFactory.createBuiltInFunction(function (name) {
		name = convert.toPrimitive(this, name, "string");
		var descriptor = this.node.getOwnProperty(name);
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"), propertyConfig);

	objectClass.defineOwnProperty("create", objectFactory.createBuiltInFunction(function (parent, descriptors) {
		if (parent && parent.isPrimitive && parent.value !== null) {
			throw new TypeError("Object prototype may only be an Object or null:" + parent.toString());
		}

		if (descriptors && descriptors.isPrimitive && descriptors.value === null) {
			throw new TypeError("Cannot convert null or undefined to object");
		}

		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProto(parent);
		}

		if (descriptors) {
			for (var prop in descriptors.properties) {
				if (descriptors.properties[prop].enumerable) {
					defineProperty(this, obj, prop, descriptors.getProperty(prop).getValue());
				}
			}
		}

		return obj;
	}, 2, "Object.create"), propertyConfig);

	objectClass.defineOwnProperty("defineProperty", objectFactory.createBuiltInFunction(function (obj, prop, descriptor) {
		contracts.assertIsObject(obj, "Object.defineProperty");
		defineProperty(this, obj, convert.toPrimitive(this, prop, "string"), descriptor);
		return obj;
	}, 3, "Object.defineProperty"), propertyConfig);

	objectClass.defineOwnProperty("defineProperties", objectFactory.createBuiltInFunction(function (obj, descriptors) {
		contracts.assertIsObject(obj, "Object.defineProperties");
		contracts.assertArgIsNotNullOrUndefined(descriptors);

		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getProperty(prop).getValue());
			}
		}

		return obj;
	}, 2, "Object.defineProperties"), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyDescriptor", objectFactory.createBuiltInFunction(function (obj, prop) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyDescriptor");

		prop = convert.toPrimitive(this, prop, "string");

		if (obj.hasOwnProperty(prop)) {
			var descriptor = obj.getProperty(prop);

			var result = objectFactory.createObject();
			result.putValue("configurable", objectFactory.createPrimitive(descriptor.configurable), false, this);
			result.putValue("enumerable", objectFactory.createPrimitive(descriptor.enumerable), false, this);

			if (descriptor.dataProperty) {
				result.putValue("value", descriptor.value, false, this);
				result.putValue("writable", objectFactory.createPrimitive(descriptor.writable), false, this);
			} else {
				result.putValue("get", descriptor.get || undef, false, this);
				result.putValue("set", descriptor.set || undef, false, this);
			}

			return result;
		}

		return undef;
	}, 2, "Object.getOwnPropertyDescriptor"), propertyConfig);

	objectClass.defineOwnProperty("keys", objectFactory.createBuiltInFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;
		var context = this;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.putValue(index++, objectFactory.createPrimitive(name), false, context);
			}
		});

		return arr;
	}, 1, "Object.keys"), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyNames", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		obj.getOwnPropertyNames().forEach(function (name, index) {
			arr.putValue(index, objectFactory.createPrimitive(name));
		});

		return arr;
	}, 1, "Object.getOwnPropertyNames"), propertyConfig);

	objectClass.defineOwnProperty("getPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getPrototypeOf");
		return obj.parent && obj.parent.proto || obj.proto || globalObject.getProperty("null").getValue();
	}, 1, "Object.getPrototypeOf"), propertyConfig);

	objectClass.defineOwnProperty("freeze", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.freeze");

		obj.freeze();
		return obj;
	}, 1, "Object.freeze"), propertyConfig);

	objectClass.defineOwnProperty("isFrozen", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isFrozen");

		if (obj.isPrimitive) {
			return objectFactory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				if (obj.type === "function" || prop !== "prototype") {
					if (obj.properties[prop].writable || obj.properties[prop].configurable) {
						return objectFactory.createPrimitive(false);
					}
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isFrozen"), propertyConfig);

	objectClass.defineOwnProperty("preventExtensions", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}, 1, "Object.preventExtensions"), propertyConfig);

	objectClass.defineOwnProperty("isExtensible", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible);
	}, 1, "Object.isExtensible"), propertyConfig);

	objectClass.defineOwnProperty("seal", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}, 1, "Object.seal"), propertyConfig);

	objectClass.defineOwnProperty("isSealed", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isSealed");

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				if (obj.type === "function" || prop !== "prototype") {
					if (obj.properties[prop].configurable) {
						return objectFactory.createPrimitive(false);
					}
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"), propertyConfig);

	globalObject.getProperty("Function").getValue().parent = objectClass;
	globalObject.defineOwnProperty("Object", objectClass, propertyConfig);
};

},{"../types/object-type":62,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69}],53:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var types = require("../utils/types");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var regexClass = objectFactory.createFunction(function (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			if (!types.isUndefined(flags)) {
				throw new TypeError("Cannot supply flags when constructing one RegExp from another");
			}

			return pattern;
		}

		var patternString = types.isUndefined(pattern) ? "" : convert.toString(this, pattern);
		flags = types.isUndefined(flags) ? "" : convert.toString(this, flags);

		return objectFactory.create("RegExp", new RegExp(patternString, flags));
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = regexClass.proto;
	proto.className = "RegExp";

	proto.defineOwnProperty("test", objectFactory.createBuiltInFunction(function (str) {
		var stringValue = convert.toString(this, str);

		this.node.source.lastIndex = convert.toInt32(this, this.node.getProperty("lastIndex").getValue());
		var testValue = this.node.source.test(stringValue);
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		return objectFactory.createPrimitive(testValue);
	}, 1, "RegExp.prototype.test"), propertyConfig);

	proto.defineOwnProperty("exec", objectFactory.createBuiltInFunction(function (str) {
		var stringValue = convert.toString(this, str);

		// update underlying regex in case the index was manually updated
		this.node.source.lastIndex = convert.toInt32(this, this.node.getProperty("lastIndex").getValue());

		// get match from underlying regex
		var match = this.node.source.exec(stringValue);

		// update the last index from the underlying regex
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		if (match) {
			var arr = objectFactory.create("Array");
			for (var i = 0, ln = match.length; i < ln; i++) {
				arr.putValue(i, objectFactory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.putValue("index", objectFactory.createPrimitive(match.index), false, this);
			arr.putValue("input", objectFactory.createPrimitive(match.input), false, this);
			return arr;
		}

		return this.env.global.getProperty("null").getValue();
	}, 1, "RegExp.prototype.exec"), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function () {
		var str = "/";
		str += this.node.getProperty("source").getValue().toString();
		str += "/";

		if (this.node.getProperty("global").getValue().toBoolean()) {
			str += "g";
		}

		if (this.node.getProperty("ignoreCase").getValue().toBoolean()) {
			str += "i";
		}

		if (this.node.getProperty("multiline").getValue().toBoolean()) {
			return str += "m";
		}

		return objectFactory.create("String", str);
	}, 0, "RegExp.prototype.toString"), propertyConfig);

	proto.defineOwnProperty("compile", convert.toNativeFunction(objectFactory, RegExp.prototype.compile, "RegExp.prototype.compile"), propertyConfig);
	proto.defineOwnProperty("lastIndex", objectFactory.createPrimitive(0), { writable: true });

	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createPrimitive(RegExp.prototype[name]));
	});

	globalObject.defineOwnProperty("RegExp", regexClass, propertyConfig);
};

},{"../utils/convert":68,"../utils/types":70}],54:[function(require,module,exports){
"use strict";
var contracts = require("../utils/contracts");
var convert = require("../utils/convert");
var func = require("../utils/func");
var types = require("../utils/types");
var RegexType = require("../types/regex-type");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = value ? String(convert.toString(this, value.getValue())) : "";

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(stringValue, objectFactory);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = stringClass.proto;

	// prototype can be coerced into an empty string
	proto.value = "";
	proto.className = "String";
	
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0));

	proto.defineOwnProperty("search", objectFactory.createBuiltInFunction(function (regex) {
		var stringValue = convert.toString(this, this.node);
		var underlyingRegex;

		if (regex) {
			if (regex.className === "RegExp") {
				underlyingRegex = regex.source;
			} else {
				underlyingRegex = new RegExp(convert.toString(this, regex));
			}
		}

		return objectFactory.createPrimitive(stringValue.search(underlyingRegex));
	}, 1, "String.prototype.search"), propertyConfig);

	proto.defineOwnProperty("substring", objectFactory.createBuiltInFunction(function (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		var value = convert.toPrimitive(this, this.node, "string");
		var length = value.length;

		start = convert.toInteger(this, start);
		end = types.isNullOrUndefined(end) ? length : convert.toInteger(this, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}, 2, "String.prototype.substring"), propertyConfig);

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createBuiltInFunction(function () {
				var context = this;
				var stringValue = convert.toString(this, this.node);
				var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg); });
				return objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args));
			}, String.prototype[name].length, "String.prototype." + name), propertyConfig);
			// proto.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "String.prototype." + name), propertyConfig);
		}
	}, propertyConfig);

	stringClass.defineOwnProperty("fromCharCode", objectFactory.createBuiltInFunction(function (charCode) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}, 1, "String.fromCharCode"), propertyConfig);

	proto.defineOwnProperty("slice", objectFactory.createBuiltInFunction(function (start, end) {
		var stringValue = convert.toString(this, this.node);
		var startValue = convert.toInteger(this, start);
		var endValue;

		if (!types.isNullOrUndefined(end)) {
			endValue = convert.toInteger(this, end);
		}

		return objectFactory.createPrimitive(stringValue.slice(startValue, endValue));
	}, 2, "String.prototype.slice"), propertyConfig);

	proto.defineOwnProperty("split", objectFactory.createBuiltInFunction(function (separator, limit) {
		var stringValue = convert.toString(this, this.node);
		separator = separator && separator.getValue();
		limit = limit && limit.getValue();
		var limitValue = types.isUndefined(limit) ? undefined : convert.toUInt32(this, limit);

		// if (!types.isNullOrUndefined(limit)) {
		// 	limitValue = convert.toUInt32(this, limit);
		// }

		var arr = objectFactory.create("Array");
		if (types.isUndefined(separator)) {
			arr.putValue(0, objectFactory.createPrimitive(stringValue), false, this);
		} else {
			var separatorValue;
			if (separator.className === "RegExp") {
				separatorValue = separator.source;
			} else {
				separatorValue = convert.toString(this, separator);
			}

			var result = stringValue.split(separatorValue, limitValue);
			var context = this;

			result.forEach(function (value, index) {
				arr.putValue(index, objectFactory.createPrimitive(value), false, context);
			});
		}

		return arr;
	}, 2, "String.prototype.split"), propertyConfig);

	proto.defineOwnProperty("replace", objectFactory.createBuiltInFunction(function (regexOrSubstr, substrOrFn) {
		var stringValue = convert.toString(this, this.node);

		var matcher;
		if (regexOrSubstr && regexOrSubstr.className === "RegExp") {
			matcher = regexOrSubstr.source;
		} else {
			matcher = convert.toString(this, regexOrSubstr);
		}

		var replacer;
		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var callee = substrOrFn.native ? substrOrFn : substrOrFn.node;
			var params = callee.params || [];

			replacer = function () {
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });
				var replacedValue = func.executeFunction(executionContext, substrOrFn, params, args, globalObject, callee);
				return replacedValue ? convert.toString(executionContext, replacedValue) : undefined;
				// var scope = executionContext.env.createScope(globalObject);
				// scope.init(substrOrFn.node.body);

				// var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				// func.loadArguments(substrOrFn.node.params, args, executionContext.env);

				// try {
				// 	var result = executionContext.create(substrOrFn.node.body, substrOrFn.node).execute().result;
				// 	return result && result.getValue().value;
				// } catch (err) {
				// 	scope.exitScope();
				// 	throw err;
				// }

				// scope.exitScope();
			};
		} else {
			replacer = convert.toString(this, substrOrFn);
		}

		return objectFactory.createPrimitive(stringValue.replace(matcher, replacer));
	}, 2, "String.prototype.replace"), propertyConfig);

	proto.defineOwnProperty("match", objectFactory.createBuiltInFunction(function (regex) {
		var stringValue = convert.toString(this, this.node);
		var actualRegex;

		if (regex && regex instanceof RegexType) {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(convert.toPrimitive(this, regex));
		}

		var match = stringValue.match(actualRegex);
		if (match) {
			var matches = objectFactory.create("Array");
			var context = this;

			match.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value), false, context);
			});

			matches.putValue("index", objectFactory.createPrimitive(match.index), false, this);
			matches.putValue("input", objectFactory.createPrimitive(match.input), false, this);
			return matches;
		}

		return globalObject.getProperty("null").getValue();
	}, 1, "String.prototype.match"), propertyConfig);

	proto.defineOwnProperty("trim", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		var stringValue = convert.toPrimitive(this, this.node, "string");
		return objectFactory.createPrimitive(stringValue.trim());
	}, 0, "String.prototype.trim"), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "String") {
			throw new TypeError("String.prototype.toString is not generic");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.toString"), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "String") {
			throw new TypeError("String.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.valueOf"), propertyConfig);

	globalObject.defineOwnProperty("String", stringClass, propertyConfig);
};

},{"../types/regex-type":65,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69,"../utils/types":70}],55:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function ArgumentType () {
	ObjectType.call(this);
	this.className = "Arguments";
}

ArgumentType.prototype = Object.create(ObjectType.prototype);
ArgumentType.prototype.constructor = ArgumentType;

// ArgumentType.prototype.putValue = function (name, value) {
// 	name = String(name);
// 	if (name in this.properties) {
// 		this.properties[name].setValue(this, value);
// 	}
// };

module.exports = ArgumentType;

},{"./object-type":62}],56:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var types = require("../utils/types");
var contracts = require("../utils/contracts");
var convert = require("../utils/convert");

var localObjectFactory;

// Let index be ToUint32(P).
// Reject if index ≥ oldLen and oldLenDesc.[[Writable]] is false.
// Let succeeded be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing P, Desc, and false as arguments.
// Reject if succeeded is false.
// If index ≥ oldLen
// Set oldLenDesc.[[Value]] to index + 1.
// Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", oldLenDesc, and false as arguments. This call will always return true.
// Return true.

function setIndex (context, arr, name, descriptor, throwOnError) {
	var index = Number(name);
	var lengthProperty = arr.getProperty("length");
	var lengthValue = lengthProperty.getValue().value;

	if ((!lengthProperty.canSetValue() && index >= lengthValue)
		|| !ObjectType.prototype.defineOwnProperty.call(arr, name, null, descriptor, false, context)) {

		if (throwOnError) {
			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
		}

		return false;
	}

	if (index >= lengthValue) {
		var newLength = localObjectFactory.createPrimitive(index + 1);
		arr.defineOwnProperty("length", null, { value: newLength }, false, context);
	}

	return true;
}

// Let index be ToUint32(P).
// Reject if index ≥ oldLen and oldLenDesc.[[Writable]] is false.
// Let succeeded be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing P, Desc, and false as arguments.
// Reject if succeeded is false.
// If index ≥ oldLen
// Set oldLenDesc.[[Value]] to index + 1.
// Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", oldLenDesc, and false as arguments. This call will always return true.
// Return true.

// function setIndex (context, arr, name, descriptor, throwOnError) {
// 	var index = convert.toUInt32(context, descriptor.value);
// 	var lengthProperty = arr.getProperty("length");

// 	if (!lengthProperty.canSetValue() && index >= lengthProperty.getValue(arr).value) {
// 		if (throwOnError) {
// 			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
// 		}

// 		return false;
// 	}
// }

function setLength (context, arr, name, descriptor, throwOnError) {
	var newLengthValue = convert.toUInt32(context, descriptor.value);
	if (newLengthValue !== convert.toNumber(context, descriptor.value)) {
		if (throwOnError) {
			throw new RangeError("Array length out of range");
		}

		return false;
	}

	descriptor.value = localObjectFactory.createPrimitive(newLengthValue);
	var newLength = descriptor.value;
	var currentLength = arr.getProperty("length").getValue();
	contracts.assertIsValidArrayLength(newLength.value);

	if (newLength.value >= currentLength.value) {
		return ObjectType.prototype.defineOwnProperty.call(arr, name, null, descriptor, throwOnError);
	}

	if (arr.properties.length.writable === false) {
		if (throwOnError) {
			throw new TypeError("Cannot redefine property: length");
		}

		return false;
	}

	var notWritable = "writable" in descriptor && !descriptor.writable;
	if (notWritable) {
		// set to writable in case removing items fails
		descriptor.writable = true;
	}

	var i = currentLength.value;
	if (!ObjectType.prototype.defineOwnProperty.call(arr, name, null, descriptor, throwOnError)) {
		return false;
	}

	var succeeded = true;
	while (i > newLength.value) {
		if (!arr.deleteProperty(--i, false)) {
			newLength = localObjectFactory.createPrimitive(i + 1);
			arr.defineOwnProperty("length", null, { value: newLength }, false);
			succeeded = false;
			break;
		}
	}

	if (notWritable) {
		arr.defineOwnProperty("length", null, { writable: false }, false);
	}

	if (!succeeded && throwOnError) {
		throw new TypeError("Cannot redefine property: length");
	}

	return succeeded;
}

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value, throwOnError, context) {
	if (!this.hasOwnProperty(name)) {
		this.defineOwnProperty(name, null, { value: value, configurable: true, enumerable: true, writable: true }, throwOnError);
		return;
	}

	// if (types.isInteger(name)) {
	// 	setIndex(context, this, name, { value: value }, false);
	// 	return;
	// }

	if (name === "length") {
		setLength(context, this, name, { value: value }, throwOnError);
		return;
	}

	// resizeArray(this, name);
	// setLength(this, name, value);
	ObjectType.prototype.putValue.apply(this, arguments);
	// this.defineOwnProperty(name, null, { value: value }, false);
};

ArrayType.prototype.defineOwnProperty = function (name, value, descriptor, throwOnError, context) {
	if (types.isInteger(name) && "value" in descriptor) {
		return setIndex(context, this, name, descriptor, throwOnError);
	}

	if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
		return setLength(context, this, name, descriptor, throwOnError);
	}

	return ObjectType.prototype.defineOwnProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	localObjectFactory = objectFactory;
	this.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });
};

module.exports = ArrayType;

},{"../utils/contracts":67,"../utils/convert":68,"../utils/types":70,"./object-type":62}],57:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function DateType (value) {
	ObjectType.call(this);
	this.value = value;
	this.type = "object";
	this.className = "Date";
}

DateType.prototype = Object.create(ObjectType.prototype);
DateType.prototype.constructor = DateType;

DateType.prototype.toBoolean = function () { return Boolean(this.value); };
DateType.prototype.toNumber = function () { return Number(this.value); };
DateType.prototype.toString = function () { return String(this.value); };
DateType.prototype.valueOf = function () { return this.value; };

module.exports = DateType;

},{"./object-type":62}],58:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function ErrorType (source) {
	ObjectType.call(this);
	this.source = source;
	this.className = "Error";
}

ErrorType.prototype = Object.create(ObjectType.prototype);
ErrorType.prototype.constructor = ErrorType;

ErrorType.prototype.toString = function () {
	return String(this.source);
};

module.exports = ErrorType;

},{"./object-type":62}],59:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var PropertyDescriptor = require("./property-descriptor");

function FunctionType (node, parentScope) {
	ObjectType.call(this);
	this.type = "function";
	this.className = "Function";
	this.native = false;
	this.node = node;
	this.parentScope = parentScope;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory, proto, ctor, descriptor) {
	// set length property from the number of parameters
	this.defineOwnProperty("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, enumerable: false, writable: false });

	// functions have a prototype
	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: ctor || this });
	this.setProto(proto, { configurable: true, enumerable: false, writable: true });
};

FunctionType.prototype.getOwnPropertyNames = function () {
	var props = ObjectType.prototype.getOwnPropertyNames.call(this);
	if ("prototype" in this.properties) {
		props.push("prototype");
	}

	return props;
};

FunctionType.prototype.createScope = function (env, thisArg) {
	// if a parent scope is defined we need to limit the scope to that scope
	// return (this.parentScope || currentScope).createScope(thisArg);

	var priorScope = env.current;
	if (this.parentScope) {
		env.current = this.parentScope;
	}

	var scope = env.createScope.apply(env, Array.prototype.slice.call(arguments, 1));
	if (!this.native) {
		scope.init(this.node.body);
	}

	return {
		exitScope: function () {
			scope.exitScope();
			env.current = priorScope;
		}
	};
};

FunctionType.prototype.hasInstance = function (obj) {
	// if (obj.isPrimitive || obj === this) {
	// 	return false;
	// }

	var visited = [];
	var current = obj;

	while (current) {
		if (visited.indexOf(current) >= 0) {
			return false;
		}

		// keep a stack to avoid circular reference
		visited.push(current);
		if (current === this.proto) {
			return true;
		}

		if (current.parent && current.parent.proto === this.proto) {
			return true;
		}

		current = current.proto;
	}

	return false;
};

module.exports = FunctionType;

},{"./object-type":62,"./property-descriptor":64}],60:[function(require,module,exports){
"use strict";
var FunctionType = require("./function-type");
var PropertyDescriptor = require("./property-descriptor");

function NativeFunctionType (fn, parentScope) {
	FunctionType.call(this, null, parentScope);
	this.type = "function";
	this.native = true;
	this.nativeFunction = fn;
}

NativeFunctionType.prototype = Object.create(FunctionType.prototype);
NativeFunctionType.prototype.constructor = NativeFunctionType;

NativeFunctionType.prototype.init = function (objectFactory, proto, ctor, descriptor) {
	var length = this.nativeFunction.length;
	if ("nativeLength" in this.nativeFunction) {
		length = this.nativeFunction.nativeLength;
	}

	this.defineOwnProperty("length", objectFactory.createPrimitive(length), { configurable: false, enumerable: false, writable: false });

	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });
	this.setProto(proto, descriptor || { configurable: false, enumerable: false, writable: true });
};

module.exports = NativeFunctionType;

},{"./function-type":59,"./property-descriptor":64}],61:[function(require,module,exports){
"use strict";
var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var DateType = require("./date-type");
var ErrorType = require("./error-type");
var ArgumentType = require("./argument-type");
var types = require("../utils/types");

var parentless = {
	"Undefined": true,
	"Null": true,
	"Function": true
};

var orphans = Object.create(null);

function setOrphans (scope) {
	var parent;

	for (var typeName in orphans) {
		parent = scope.getValue(typeName);
		if (parent) {
			orphans[typeName].forEach(function (child) {
				child.parent = parent;
				child.setProto(parent.proto);
			});

			delete orphans[typeName];
		}
	}

	orphans = Object.create(null);
}

function setProto (typeName, instance, env) {
	if (typeName in parentless) {
		return;
	}

	var parent = env.getReference(typeName);
	if (!parent.isUnresolved()) {
		instance.parent = parent.getValue();
		instance.setProto(instance.parent.proto);
		return;
	}

	// during initialization it is possible for objects to be created
	// before the types have been registered - add a registry of items
	// and these can be filled in when the type is registered
	orphans[typeName] = orphans[typeName] || [];
	orphans[typeName].push(instance);
}

function ObjectFactory (env) {
	this.env = env;
}

ObjectFactory.prototype = {
	constructor: ObjectFactory,

	init: function () {
		setOrphans(this.env);
	},

	createPrimitive: function (value) {
		return this.create(types.getType(value), value);
	},

	create: function (typeName, value) {
		var instance;

		switch (typeName) {
			case "String":
				instance = new StringType(value);
				break;

			case "Number":
			case "Boolean":
			case "Null":
			case "Undefined":
				instance = new PrimitiveType(value);
				break;

			case "Date":
				instance = new DateType(value);
				break;

			case "RegExp":
				instance = new RegexType(value);
				break;

			case "Array":
				instance = new ArrayType();
				break;

			case "Error":
				var message = "An unhandled exception has occurred";
				if (value) {
					typeName = value.name || typeName;
					message = value.message;
				}

				instance = new ErrorType(value);
				instance.putValue("message", this.createPrimitive(message));
				instance.putValue("name", this.createPrimitive(typeName));
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.env);
		return instance;
	},

	createObject: function (parent) {
		var instance = new ObjectType();
		if (parent !== null) {
			if (parent) {
				instance.parent = parent;
				instance.setProto(parent.proto);
			} else {
				setProto("Object", instance, this.env);
			}
		}

		instance.init(this);
		return instance;
	},

	createArguments: function (args, callee) {
		var instance = new ArgumentType();
		var objectClass = this.env.global.getProperty("Object").getValue();

		instance.init(this, objectClass, objectClass.proto);
		instance.parent = objectClass;

		for (var i = 0, ln = args.length; i < ln; i++) {
			instance.defineOwnProperty(i, args[i], { configurable: true, enumerable: true, writable: true }, false);
		}

		instance.defineOwnProperty("length", this.createPrimitive(ln), { configurable: true, enumerable: false, writable: true }, false);
		instance.defineOwnProperty("callee", callee, { configurable: true, enumerable: false, writable: true });
		return instance;
	},

	createFunction: function (fnOrNode, parentScope, proto, ctor, descriptor) {
		// todo: need to verify that prototype arg is needed
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode, parentScope);
		} else {
			instance = new FunctionType(fnOrNode, parentScope);
		}

		instance.init(this, proto, ctor, descriptor);
		var functionClass = this.env.getReference("Function");
		if (functionClass && !functionClass.isUnresolved()) {
			instance.parent = functionClass.getValue();
		}

		return instance;
	},

	createBuiltInFunction: function (fn, length, methodName) {
		var instance = new NativeFunctionType(function () {
			if (this.isNew) {
				throw new TypeError(methodName + " is not a constructor");
			}

			return fn.apply(this, arguments);
		});

		instance.parent = this.env.getValue("Function");
		instance.defineOwnProperty("length", this.createPrimitive(length), { configurable: false, enumerable: false, writable: false });
		return instance;
	}
};

module.exports = ObjectFactory;

},{"../utils/types":70,"./argument-type":55,"./array-type":56,"./date-type":57,"./error-type":58,"./function-type":59,"./native-function-type":60,"./object-type":62,"./primitive-type":63,"./regex-type":65,"./string-type":66}],62:[function(require,module,exports){
"use strict";
var PropertyDescriptor = require("./property-descriptor");

function ObjectType () {
	this.isPrimitive = false;
	this.type = "object";
	this.className = "Object";
	this.properties = Object.create(null);
	this.extensible = true;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	setProto: function (proto, descriptor) {
		if ("prototype" in this.properties && !this.properties.prototype.canSetValue()) {
			return;
		}

		this.proto = proto;
		this.properties.prototype = new PropertyDescriptor(this, descriptor || { configurable: true, enumerable: false, writable: true }, proto);
	},

	getProperty: function (name) {
		name = String(name);

		if (name === "prototype") {
			return this.getOwnProperty(name);
		}

		var current = this;

		while (current) {
			if (name in current.properties) {
				return current.properties[name];
			}

			current = current.parent && current.parent.proto;
		}

		return undefined;
	},

	getOwnProperty: function (name) {
		return this.properties[String(name)];
	},

	getOwnPropertyNames: function () {
		var props = [];
		for (var prop in this.properties) {
			// ignore prototype
			if (prop === "prototype" && this.properties[prop].getValue() === this.proto) {
				continue;
			}

			props.push(prop);
		}

		return props;
	},

	hasProperty: function (name) {
		return !!this.getProperty(String(name));
	},

	hasOwnProperty: function (name) {
		return String(name) in this.properties;
	},

	putValue: function (name, value, throwOnError) {
		if (this.isPrimitive) {
			return;
		}

		name = String(name);
		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		var descriptor = this.getProperty(name);
		if (descriptor) {
			if (!descriptor.canSetValue()) {
				if (throwOnError) {
					throw new TypeError("Cannot assign to read only property '" + name + "' of " + this.toString());
				}
				
				return;
			}

			if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
				this.properties[name] = new PropertyDescriptor(this, descriptor, value);
			} else {
				descriptor.setValue(value);
			}
		} else {
			this.defineOwnProperty(name, value, { configurable: true, enumerable: true, writable: true }, throwOnError);
		}
	},

	defineOwnProperty: function (name, value, descriptor, throwOnError) {
		if (this.isPrimitive) {
			if (throwOnError) {
				throw new TypeError("Cannot define property: " + name + ", object is not extensible");
			}

			return false;
		}

		// todo: obsolete the value arg
		if (value && descriptor && !descriptor.value) {
			descriptor.value = value;
		}

		var current = this.getOwnProperty(name);
		if (current) {
			if (current.canUpdate(descriptor)) {
				current.update(descriptor);
				return true;
			}

			if (throwOnError) {
				throw new TypeError("Cannot redefine property: " + name);
			}

			return false;
		} else if (!this.extensible) {
			if (throwOnError) {
				throw new TypeError("Cannot define property: " + name + ", object is not extensible");
			}

			return false;
		}

		if (value && value.reference) {
			this.properties[name] = value;
		} else {
			this.properties[name] = new PropertyDescriptor(this, descriptor, value);
		}

		return true;
	},

	getValue: function () {
		return this;
		// var descriptor = this.getProperty(name);
		// return descriptor && descriptor.getValue(this);
	},

	deleteProperty: function (name) {
		if (this.isPrimitive) {
			return false;
		}

		if (this.properties[name] && !this.properties[name].configurable) {
			return false;
		}

		return delete this.properties[name];
	},

	freeze: function () {
		for (var prop in this.properties) {
			if (this.properties[prop].dataProperty) {
				this.defineOwnProperty(prop, null, { writable: false, configurable: false }, true);
			} else {
				this.defineOwnProperty(prop, null, { configurable: false }, true);
			}
		}

		this.preventExtensions();
	},

	preventExtensions: function () {
		this.extensible = false;
	},

	seal: function () {
		for (var prop in this.properties) {
			this.defineOwnProperty(prop, null, { configurable: false }, true);
		}

		this.preventExtensions();
	},

	toBoolean: function () {
		return true;
	},

	toNumber: function () {
		return 0;
	},

	toString: function () {
		return "[" + this.type + "]";
	},

	valueOf: function () {
		return this;
	},

	"with": function (executionContext) {
		this.executionContext = executionContext;
		return this;
	},

	endWith: function () {
		this.executionContext = null;
	},

	equals: function (obj) {
		if (this.isPrimitive && obj.isPrimitive) {
			return this.value === obj.value;
		}

		return this === obj;
	}
};

module.exports = ObjectType;

},{"./property-descriptor":64}],63:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var types = require("../utils/types");

function PrimitiveType (value) {
	ObjectType.call(this);
	this.isPrimitive = true;
	this.value = value;
	this.type = typeof value;
	this.className = types.getType(value);
}

PrimitiveType.prototype = Object.create(ObjectType.prototype);
PrimitiveType.prototype.constructor = PrimitiveType;

PrimitiveType.prototype.getProperty = function (name) {
	// can't read properties off null/undefined
	if (this.value == null) {
		throw new TypeError("Cannot read property '" + name + "' of " + this.type);
	}

	return ObjectType.prototype.getProperty.apply(this, arguments);
};

// overwrite object methods
PrimitiveType.prototype.toBoolean = function () { return Boolean(this.value); };
PrimitiveType.prototype.toNumber = function () { return Number(this.value); };
PrimitiveType.prototype.toString = function () { return String(this.value); };
PrimitiveType.prototype.valueOf = function () { return this.value; };

module.exports = PrimitiveType;

},{"../utils/types":70,"./object-type":62}],64:[function(require,module,exports){
"use strict";
var contracts = require("../utils/contracts");

var defaultDescriptor = {
	configurable: false,
	enumerable: false,
	writable: false
};

function PropertyDescriptor (base, config, value) {
	config = config || defaultDescriptor;
	this.base = base;
	this.configurable = config.configurable || false;
	this.enumerable = config.enumerable || false;

	if ("get" in config || "set" in config) {
		this.dataProperty = false;
		this.get = config.get;
		this.getter = config.getter;
		this.set = config.set;
		this.setter = config.setter;
	} else {
		this.writable = config.writable || false;
		this.dataProperty = true;
		this.value = value || config.value;
	}
}

PropertyDescriptor.prototype.update = function (descriptor) {
	for (var prop in descriptor) {
		if (descriptor.hasOwnProperty(prop)) {
			this[prop] = descriptor[prop];
		}
	}

	if ("get" in descriptor || "set" in descriptor) {
		this.writable = undefined;
		this.dataProperty = false;
		this.value = undefined;
	} else if ("value" in descriptor) {
		this.writable = this.writable === undefined ? false : this.writable;
		this.dataProperty = true;
		this.get = this.getter = this.set = this.setter = undefined;
	}
};

PropertyDescriptor.prototype.canUpdate = function (descriptor) {
	if (this.configurable) {
		return true;
	}

	if ("configurable" in descriptor && this.configurable !== descriptor.configurable) {
		return false;
	}

	if ("enumerable" in descriptor && this.enumerable !== descriptor.enumerable) {
		return false;
	}

	if (("get" in descriptor || "set" in descriptor) && this.dataProperty) {
		return false;
	}

	if ("value" in descriptor && !this.dataProperty) {
		return false;
	}

	if (this.dataProperty) {
		if (!this.writable) {
			if (descriptor.writable) {
				return false;
			}

			return !("value" in descriptor) || contracts.areSame(this.value, descriptor.value);
		}

		return true;
	}

	if ("get" in descriptor && this.get !== descriptor.get) {
		return false;
	}

	if ("set" in descriptor && this.set !== descriptor.set) {
		return false;
	}

	return true;
};

PropertyDescriptor.prototype.getValue = function () {
	if (this.getter || this.setter) {
		return this.getter ? this.getter.call(this.base) : undefined;
	}

	return this.value;
};

PropertyDescriptor.prototype.setValue = function (value) {
	if (!this.canSetValue()) {
		return;
	}

	if (this.getter || this.setter) {
		if (this.setter) {
			this.setter.call(this.base, value);
		}

		return;
	}

	this.value = value;
};

PropertyDescriptor.prototype.canSetValue = function () {
	return this.writable || !!this.setter;
};

module.exports = PropertyDescriptor;

},{"../utils/contracts":67}],65:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function RegexType (value) {
	ObjectType.call(this);
	this.source = value;
	this.className = "RegExp";
}

RegexType.prototype = Object.create(ObjectType.prototype);
RegexType.prototype.constructor = RegexType;

RegexType.prototype.init = function (objectFactory) {
	// lastIndex is settable, all others are read-only attributes
	this.defineOwnProperty("lastIndex", objectFactory.createPrimitive(this.source.lastIndex), { enumerable: false, configurable: false, writable: true });
	this.defineOwnProperty("source", objectFactory.createPrimitive(this.source.source), { writable: false, enumerable: false });
	this.defineOwnProperty("global", objectFactory.createPrimitive(this.source.global), { writable: false, enumerable: false });
	this.defineOwnProperty("ignoreCase", objectFactory.createPrimitive(this.source.ignoreCase), { writable: false, enumerable: false });
	this.defineOwnProperty("multiline", objectFactory.createPrimitive(this.source.multiline), { writable: false, enumerable: false });
};

module.exports = RegexType;

},{"./object-type":62}],66:[function(require,module,exports){
"use strict";
var PrimitiveType = require("./primitive-type");
var PropertyDescriptor = require("./property-descriptor");
var types = require("../utils/types");

function StringType (value) {
	PrimitiveType.call(this, value);
}

function getCharacter (source, position) {
	if (position < source.value.length) {
		// todo: need to set length
		var character = new StringType(source.value[position]);
		character.parent = source.parent;
		character.setProto(source.proto);
		return character;
	}

	return new PrimitiveType(undefined);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.init = function (objectFactory) {
	this.properties.length = new PropertyDescriptor(this, { configurable: false, enumerable: false, writable: false }, objectFactory.createPrimitive(this.value.length));
};

StringType.prototype.getProperty = function (name) {
	if (types.isInteger(name)) {
		var position = Number(name);
		if (position < this.value.length) {
			return new PropertyDescriptor(this, { configurable: false, enumerable: true, writable: false, value: getCharacter(this, position) });
		}
	}

	return PrimitiveType.prototype.getProperty.apply(this, arguments);
};

StringType.prototype.getOwnPropertyNames = function () {
	var props = [];
	var ln, i;
	for (i = 0, ln = this.value.length; i < ln; i++) {
		props.push(String(i));
	}

	return props.concat(PrimitiveType.prototype.getOwnPropertyNames.call(this));
};

StringType.prototype.hasOwnProperty = function (name) {
	if (types.isInteger(name)) {
		return name < this.value.length;
	}

	return PrimitiveType.prototype.hasOwnProperty.apply(this, arguments);
};

StringType.prototype.getValue = function (name) {
	return this;
	// if (types.isInteger(name)) {
	// 	return getCharacter(this, Number(name));
	// }

	// return PrimitiveType.prototype.getValue.call(this, name);
};

module.exports = StringType;

},{"../utils/types":70,"./primitive-type":63,"./property-descriptor":64}],67:[function(require,module,exports){
"use strict";
var types = require("./types");

module.exports = {
	assertIsObject: function (obj, methodName, message) {
		if (!this.isObject(obj)) {
			throw new TypeError(methodName + " called on non-object");
		}
	},

	assertIsNotNullOrUndefined: function (value, methodName) {
		if (types.isNullOrUndefined(value)) {
			throw new TypeError(methodName + " called on null or undefined");
		}
	},

	assertArgIsNotNullOrUndefined: function (obj) {
		if (types.isNullOrUndefined(obj)) {
			throw new TypeError("Cannot convert null or undefined to object");
		}
	},

	assertIsFunction: function (obj) {
		if (!obj || obj.type !== "function") {
			throw new TypeError((obj ? obj.toString() : "undefined") + " is not a function");
		}
	},

	assertIsNotConstructor: function (context, methodName) {
		if (context.isNew) {
			throw new TypeError(methodName + " is not a constructor");
		}
	},

	assertIsValidArrayLength: function (length) {
		if (!this.isValidArrayLength(length)) {
			throw new RangeError("Invalid array length");
		}
	},

	isValidArrayLength: function (length) {
		return types.isInteger(length) && length >= 0 && length < 4294967296;
	},

	isObject: function (obj) {
		if (!obj) {
			return false;
		}

		if (obj.isPrimitive) {
			return obj.value && obj.type === "object";
		}

		return true;
	},

	areSame: function (a, b) {
		if (a.type !== b.type) {
			return false;
		}

		if (a.isPrimitive && b.isPrimitive) {
			if (a.value === undefined) {
				return true;
			}

			if (a.value === null) {
				return true;
			}

			if (a.type === "number") {
				if (isNaN(a.value) && isNaN(b.value)) {
					return true;
				}

				if (a.value === 0) {
					// this will account for negative zero
					return 1 / a.value === 1 / b.value;
				}
			}

			return a.value === b.value;
		}

		return a === b;
	},

	isEmptyObject: function (obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return false;
			}
		}

		return true;
	}
};

},{"./types":70}],68:[function(require,module,exports){
"use strict";
var func = require("./func");

var floor = Math.floor;
var abs = Math.abs;

function sign (value) {
	return value < 0 ? -1 : 1;
}

function getString (executionContext, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive /*|| "value" in value*/) {
		return value.toString();
	}

	var primitiveValue = func.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	primitiveValue = func.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive (executionContext, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive /*|| "value" in value*/) {
		return value.value;
	}

	var primitiveValue = func.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	primitiveValue = func.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	throw new TypeError("Cannot convert object to primitive");
}


function getValues (executionContext, args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(getPrimitive(executionContext, args[i]));
	}

	return values;
}

module.exports = {
	primitiveToObject: function (value, factory) {
		var newValue = factory.createPrimitive(value);
		newValue.isPrimitive = false;
		newValue.type = "object";
		newValue.toBoolean = function () { return true; };
		return newValue;
	},

	toObject: function (obj, factory) {
		if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
			return this.primitiveToObject(obj.value, factory);
		}

		return obj;
	},

	toArray: function (obj) {
		var arr = [];

		if (obj) {
			var ln = obj.getProperty("length").getValue().value;
			var i = 0;

			while (i < ln) {
				if (i in obj.properties) {
					arr.push(obj.getProperty(i).getValue());
				}

				i++;
			}
		}

		return arr;
	},

	toPrimitive: function (executionContext, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();

		if (preferredType === "string") {
			return getString(executionContext, obj);
		}

		// default case/number
		return getPrimitive(executionContext, obj);
	},

	toString: function (executionContext, obj) {
		return String(this.toPrimitive(executionContext, obj, "string"));
	},

	toNumber: function (executionContext, obj) {
		if (!obj || obj.type === "undefined") {
			return NaN;
		}

		return Number(this.toPrimitive(executionContext, obj, "number"));
	},

	toInteger: function (executionContext, obj) {
		var value = this.toNumber(executionContext, obj);
		if (isNaN(value)) {
			return 0;
		}

		if (value === 0 || !isFinite(value)) {
			return value;
		}

		return sign(value) * floor(abs(value));
	},

	toInt32: function (executionContext, obj) {
		var value = this.toNumber(executionContext, obj);
		if (value === 0 || isNaN(value) || !isFinite(value)) {
			return 0;
		}

		return sign(value) * floor(abs(value));
	},

	toUInt32: function (executionContext, obj) {
		var value = this.toInt32(executionContext, obj);
		return value >>> 0;
	},

	toNativeFunction: function (factory, fn, name) {
		return factory.createBuiltInFunction(function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(this, arguments);

			var value = fn.apply(scope, args);
			return factory.createPrimitive(value);
		}, fn.length, name);
	}
};

},{"./func":69}],69:[function(require,module,exports){
"use strict";
function defineThis (scope, thisArg, isNew) {
	if (!thisArg) {
		return scope.global;
	}

	if (isNew) {
		return thisArg;
	}

	if (thisArg.isPrimitive && thisArg.value != null) {
		// call toObject on primitive 10.4.3
		var obj = scope.objectFactory.createPrimitive(thisArg.value);
		obj.isPrimitive = false;
		obj.type = "object";
		obj.toBoolean = function () { return true; };
		return obj;
	}

	return thisArg;
}

function wrapArgument (scope, arg) {
	return {
		configurable: true,
		get: undefined,
		getter: function () {
			return arg.getValue(scope);
		},
		set: undefined,
		setter: function (value) {
			return arg.setValue(scope, value);
		}
	};
}

module.exports = {
	executeFunction: function (context, fn, params, args, thisArg, callee, isNew) {
		thisArg = defineThis(context.env, thisArg, isNew);
		var scope = fn.createScope(context.env, thisArg, false);
		var returnResult;

		if (isNew) {
			returnResult = thisArg;
		}

		this.loadArguments(params, args, context.env, fn);

		try {
			if (fn.native) {
				returnResult = fn.nativeFunction.apply(context.create(thisArg, callee, isNew), args) || returnResult;
			} else {
				var executionResult = context.create(fn.node.body, callee, isNew).execute();
				if (isNew && executionResult && executionResult.exit && executionResult.result && !executionResult.result.isPrimitive) {
					returnResult = executionResult.result;
				} else {
					returnResult = returnResult || (executionResult && executionResult.result);
				}
			}
		} catch (err) {
			scope.exitScope();
			throw err;
		}

		scope.exitScope();
		return returnResult || context.env.global.getProperty("undefined").getValue();
	},

	getFunctionResult: function (context, fn, params, args, thisArg, callee) {
		thisArg = defineThis(context.env, thisArg);
		var scope = fn.createScope(context.env, thisArg, false);

		this.loadArguments(params, args, context.env, fn);

		var executionResult;
		try {
			if (fn.native) {
				executionResult = fn.nativeFunction.apply(context.create(thisArg, callee, false), args);
			} else {
				executionResult = context.create(fn.node.body, callee, false).execute();
			}
		} catch (err) {
			scope.exitScope();
			throw err;
		}

		scope.exitScope();
		return executionResult;
	},

	loadArguments: function (params, args, env, callee) {
		var undef = env.global.getProperty("undefined").getValue();
		var argumentList = env.objectFactory.createArguments(args, callee);
		env.current.createMutableBinding("arguments");
		env.current.setMutableBinding("arguments", argumentList);

		params.forEach(function (param, index) {
			if (!env.current.hasBinding(param.name)) {
				env.current.createMutableBinding(param.name);
			}

			if (argumentList.hasProperty(index)) {
				env.current.setMutableBinding(param.name, argumentList.getProperty(index).getValue() || undef);
			} else {
				env.current.setMutableBinding(param.name, undef);
			}
		});
	},

	callMethod: function (obj, name, args, executionContext) {
		var fn = obj.getProperty(name).getValue();
		var undef = executionContext.env.global.getProperty("undefined").getValue();

		if (fn && fn.className === "Function") {
			var scope = fn.createScope(executionContext.env, obj);
			var executionResult;

			try {
				if (fn.native) {
					executionResult = fn.nativeFunction.apply(executionContext.create(obj, obj), args);
				} else {
					this.loadArguments(fn.node.params, args, executionContext.env);

					executionResult = executionContext.create(fn.node.body, fn.node).execute();
					executionResult = executionResult && executionResult.result;
				}
			} catch (err) {
				scope.exitScope();
				throw err;
			}

			scope.exitScope();
			return executionResult ? executionResult.getValue() : undef;
		}

		return null;
	}
};

},{}],70:[function(require,module,exports){
"use strict";
var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^-?\d+$/;

module.exports = {
	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
	},

	isNullOrUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value == null);
	},

	isUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value === undefined);
	},

	isInteger: function (value) {
		if (typeof value === "string") {
			return integerRgx.test(value);
		}

		if (typeof value === "number") {
			return isFinite(value) && Math.floor(value) === value;
		}

		return false;
	}
};

},{}]},{},[1])(1)
});