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
var PropertyDescriptor = require("../types/property-descriptor");

function DeclarativeEnvironment (parent, thisArg, env) {
	this.properties = Object.create(null);
	this.parent = parent;
	this.thisNode = thisArg;
	this.env = env;
}

DeclarativeEnvironment.prototype = {
	constructor: DeclarativeEnvironment,

	createReference: function (name, strict) {
		return new Reference(name, this, strict, this.env);
	},

	hasBinding: function (name) {
		return name in this.properties;
	},

	createMutableBinding: function (name) {
		if (this.hasBinding(name)) {
			return this.properties[name];
		}

		return this.properties[name] = new PropertyDescriptor(this, {
			value: undefined,
			configurable: false,
			enumerable: true,
			writable: true
		});
	},

	createImmutableBinding: function (name) {
		this.createMutableBinding(name, false);
	},

	initializeImmutableBinding: function (name, value) {
		if (this.hasBinding(name) && !this.properties[name].value) {
			this.properties[name].setValue(value);
		}
	},

	setMutableBinding: function (name, value, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.properties[name].writable) {
				if (throwOnError) {
					throw new TypeError("Cannot write to immutable binding: " + name);
				}

				return;
			}

			this.properties[name].setValue(value);
		}
	},

	getBindingValue: function (name, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.properties[name].value) {
				if (throwOnError) {
					throw new ReferenceError(name + " is not defined");
				}

				return undefined;
			}

			return this.properties[name].getValue();
		}
	},

	deleteBinding: function (name) {
		if (!this.hasBinding(name)) {
			return true;
		}

		if (!this.properties[name].configurable) {
			return false;
		}

		delete this.properties[name];
		return true;
	},

	getThisBinding: function () {
		return this.thisNode;
	}
};

module.exports = DeclarativeEnvironment;

},{"../types/property-descriptor":64,"./reference":6}],3:[function(require,module,exports){
"use strict";
var DeclarativeEnvironment = require("./declarative-environment");
var ObjectEnvironment = require("./object-environment");
var ExecutionContext = require("../execution-context");
var Reference = require("./reference");
var keywords = require("../keywords");

var scopedBlocks = {
	"CallExpression": true,
	"NewExpression": true,
	"FunctionExpression": true,
	"WithStatement": true
};

function populateHoistedVariables (node, declarators, parent) {
	if (Array.isArray(node)) {
		node.forEach(function (child) {
			populateHoistedVariables(child, declarators, parent);
		});

		return;
	}

	if (!node || !(typeof node === "object")) {
		return;
	}

	if (node.type) {
		if (node.type === "VariableDeclaration") {
			populateHoistedVariables(node.declarations, declarators, node);
			return;
		}

		if (node.type === "VariableDeclarator" || node.type === "FunctionDeclaration") {
			declarators.push({
				decl: node,
				parent: parent
			});

			return;
		}

		if (node.type === "ForInStatement" && node.left.type === "Identifier") {
			declarators.push({
				decl: node.left,
				parent: node
			});

			// keep analyzing
		}

		if (node.type === "IfStatement") {
			// cannot hoist variables within if
			populateHoistedVariables(node.consequent, declarators, node);
			populateHoistedVariables(node.alternate, declarators, node);
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
			populateHoistedVariables(node[prop], declarators, "type" in node ? node : parent);
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

		return new Reference(name, undefined, strict, this);
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

	createExecutionContext: function (node, callee) {
		return new ExecutionContext(this, node, callee);
	},

	hasBinding: function (name) {
		return this.current.hasBinding(name);
	},

	setBinding: function (name, value, strict) {
		this.current.setMutableBinding(name, value);
	},

	deleteBinding: function (name) {
		this.current.deleteBinding(name);
	},
	
	getThisBinding: function () {
		return this.current.getThisBinding() || this.global;
	},

	createScope: function (thisArg) {
		var env = new DeclarativeEnvironment(this.current, thisArg, this);
		return this.setScope(env);
	},

	createObjectScope: function (obj) {
		var env = new ObjectEnvironment(this.current, obj, this);
		return this.setScope(env);
	},

	initScope: function (node) {
		var env = this;
		var strict = isStrictMode(node);
		var undef = this.global.getProperty("undefined").getValue();
		var variables = [];
		var name;

		populateHoistedVariables(node, variables, node);

		variables.forEach(function (obj) {
			var decl = obj.decl;
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

},{"../execution-context":7,"../keywords":41,"./declarative-environment":2,"./object-environment":4,"./reference":6}],4:[function(require,module,exports){
"use strict";
var PropertyReference = require("./property-reference");

function ObjectEnvironment (parent, obj, env) {
	this.parent = parent;
	this.object = this.thisNode = obj;
	this.env = env;
}

ObjectEnvironment.prototype = {
	constructor: ObjectEnvironment,

	createReference: function (name, strict) {
		return new PropertyReference(name, this.object, strict, this.env);
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
			this.object.defineOwnProperty(name, {
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

	getThisBinding: function () {
		return this.object;
	}
};

module.exports = ObjectEnvironment;

},{"./property-reference":5}],5:[function(require,module,exports){
"use strict";
var Reference = require("./reference");
var PrimitiveType = require("../types/primitive-type");

function PropertyReference (name, object, strict, env) {
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
		this.base.putValue(this.name, value, this.strict, this.env);
	} else {
		this.base.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, this.strict, this.env);
	}
};

PropertyReference.prototype.deleteBinding = function (name) {
	return this.base.deleteProperty(name, true);
};

PropertyReference.prototype.isUnresolved = function () { return false; };

module.exports = PropertyReference;

},{"../types/primitive-type":63,"./reference":6}],6:[function(require,module,exports){
"use strict";
function Reference (name, base, strict, env) {
	this.name = name;
	this.base = base;
	this.strict = strict;
	this.env = env;
}

Reference.prototype = {
	constructor: Reference,

	putValue: function (value) {
		if (this.base === undefined && this.strict) {
			throw new ReferenceError(this.name + " is not defined");
		}

		if (this.base) {
			this.base.setMutableBinding(this.name, value, this.strict);
		} else {
			this.env.global.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, false);
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
	this.value = null;
	this.isNew = false;
	this.strict = false;
}

ExecutionContext.prototype.execute = function () {
	return this.env.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, isNew) {
	var context = new ExecutionContext(this.env, node, callee || this.callee);
	context.value = this.value;
	context.isNew = !!isNew;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = this.create(node);
	context.label = label;
	return context;
};

ExecutionContext.prototype.cancel = function (label) {
	var result = this.result(this.value, label);
	result.cancel = true;
	return result;
};

ExecutionContext.prototype.skip = function (label) {
	var result = this.result(this.value, label);
	result.skip = true;
	return result;
};

ExecutionContext.prototype.exit = function (value) {
	this.callee = null;

	var result = this.result(value);
	result.exit = true;
	return result;
};

ExecutionContext.prototype.result = function (value, name, obj) {
	this.value = value;
	return new ExecutionResult(value, name, obj);
};

ExecutionContext.prototype.empty = function () {
	return this.result(undefined);
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
	if (this.exit) {
		return true;
	}

	if (!this.cancel && !this.skip) {
		return false;
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
				arr.defineOwnProperty(i, { value: item, configurable: true, enumerable: true, writable: true });
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

function implicitEquals (a, b, env) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if ((a.type === "object" && b.type === "object") || (a.type === "function" && b.type === "function")) {
		return a === b;
	}

	var primitiveA = convert.toPrimitive(env, a);
	var primitiveB = convert.toPrimitive(env, b);

	if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
		return Number(primitiveA) === Number(primitiveB);
	}

	if (typeof primitiveA === "string") {
		return primitiveA === convert.toPrimitive(env, b, "string");
	}

	if (typeof primitiveB === "string") {
		return convert.toPrimitive(env, a, "string") === primitiveB;
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
	return function (a, b, e) {
		return !fn(a, b, e);
	};
}

function add (a, b, env) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(env, a);
	b = convert.toPrimitive(env, b);
	return a + b;
}

function toNumber (env, obj) {
	if (obj.className === "Number") {
		return obj.toNumber();
	}

	return convert.toPrimitive(env, obj, "number");
}

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": add,
	"-": function (a, b, e) { return toNumber(e, a) - toNumber(e, b); },
	"/": function (a, b, e) { return toNumber(e, a) / toNumber(e, b); },
	"*": function (a, b, e) { return toNumber(e, a) * toNumber(e, b); },
	"==": implicitEquals,
	"!=": not(implicitEquals),
	"===": strictEquals,
	"!==": not(strictEquals),
	"<": function (a, b, e) { return convert.toPrimitive(e, a) < convert.toPrimitive(e, b); },
	"<=": function (a, b, e) { return convert.toPrimitive(e, a) <= convert.toPrimitive(e, b); },
	">": function (a, b, e) { return convert.toPrimitive(e, a) > convert.toPrimitive(e, b); },
	">=": function (a, b, e) { return convert.toPrimitive(e, a) >= convert.toPrimitive(e, b); },
	"<<": function (a, b, e) { return convert.toPrimitive(e, a) << convert.toPrimitive(e, b); },
	">>": function (a, b, e) { return convert.toPrimitive(e, a) >> convert.toPrimitive(e, b); },
	">>>": function (a, b, e) { return convert.toPrimitive(e, a) >>> convert.toPrimitive(e, b); },
	"%": function (a, b, e) { return convert.toPrimitive(e, a) % convert.toPrimitive(e, b); },
	"|": function (a, b, e) { return convert.toInt32(e, a) | convert.toInt32(e, b); },
	"^": function (a, b, e) { return convert.toInt32(e, a) ^ convert.toInt32(e, b); },
	"&": function (a, b, e) { return convert.toInt32(e, a) & convert.toInt32(e, b); },
	"in": function (a, b, e) {
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

	var newValue = binaryOperators[context.node.operator](leftValue, rightValue, context.env);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
};

},{"../utils/convert":68}],12:[function(require,module,exports){
"use strict";
module.exports = function BlockStatement (context) {
	var result;

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
};

},{}],13:[function(require,module,exports){
"use strict";
var FunctionType = require("../types/function-type");
var Reference = require("../env/reference");
var func = require("../utils/func");
var convert = require("../utils/convert");

function assignThis (env, fnMember, fn, isNew, native) {
	if (isNew) {
		// if this is a native contructor we don't are about this
		// otherwise create a new object
		return native ? null : env.objectFactory.createObject(fn);
	}

	if (fnMember instanceof Reference && fnMember.isPropertyReference) {
		return convert.toObject(env, fnMember.base);
	}

	return null;
}

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";

	var fnMember = context.create(node.callee).execute().result;
	var fn = fnMember.getValue();
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result.getValue(); });

	if (!fn || fn.className !== "Function") {
		throw new TypeError(fn.toString() + " not a function");
	}

	var native = fn.native;
	var thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	var params = native ? [] : fn.node.params;
	var callee = fnMember;

	callee.identifier = fn.name;
	return context.result(func.executeFunction(context, fn, params, args, thisArg, callee, isNew));
};

},{"../env/reference":6,"../types/function-type":59,"../utils/convert":68,"../utils/func":69}],14:[function(require,module,exports){
"use strict";
module.exports = function DoWhileStatement (context) {
	var result;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = context.create(context.node.test).execute().result.getValue().toBoolean();
	}

	while (passed) {
		result = context.create(context.node.body).execute();

		if (result && result.shouldBreak(context, true)) {
			break;
		}

		passed = context.create(context.node.test).execute().result.getValue().toBoolean();
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
			left = context.create(decl).execute().result;
		});
	} else {
		left = context.create(context.node.left).execute().result;
	}

	var obj = context.create(context.node.right).execute().result.getValue();
	var result;

	// track visited properties to prevent iterating over shadowed properties, regardless of enumerable flag
	// 12.6.4 NOTE: a property of a prototype is not enumerated if it is “shadowed” because some previous
	// object in the prototype chain has a property with the same name. The values of [[Enumerable]] attributes
	// are not considered when determining if a property of a prototype object is shadowed by a previous object
	// on the prototype chain.
	var visited = Object.create(null);

	while (obj) {
		for (var prop in obj.properties) {
			if (obj.properties[prop].enumerable && !visited[prop]) {
				left.putValue(context.env.objectFactory.createPrimitive(prop));

				// context.env.putValue(left.name, context.env.objectFactory.createPrimitive(prop), false, context);
				result = context.create(context.node.body).execute();

				if (result && result.shouldBreak(context, true)) {
					return result;
				}
			}

			visited[prop] = true;
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
	var func = objectFactory.createFunction(context.node, context.env.current, proto);

	// todo:
	if (context.node.id) {
		func.name = context.node.id.name;
		// context.env.putValue(context.node.id.name, func);
	}

	return context.result(func);
};

},{}],21:[function(require,module,exports){
"use strict";
module.exports = function Identifier (context) {
	var name = context.node.name;

	if (context.callee && context.callee.identifier === name) {
		return context.result(context.callee);
	}
	
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
		name = convert.toString(context.env, context.create(context.node.property).execute().result.getValue());
	} else {
		name = context.node.property.name;
	}

	value = new PropertyReference(name, obj, false, context.env);
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

	obj.defineOwnProperty(name, descriptor);
}

function createDescriptor (value) {
	return { value: value, configurable: true, enumerable: true, writable: true };
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
				obj.defineOwnProperty(name, createDescriptor(value));
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
	return context.result(context.env.getThisBinding());
};

},{}],34:[function(require,module,exports){
"use strict";
module.exports = function ThrowStatement (context) {
	// todo: handle more specific errors
	var arg = context.create(context.node.argument).execute().result.getValue();

	if (arg.isPrimitive) {
		throw arg.value;
	}

	var err = new Error();
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

			// var scope = context.env.createScope();
			// scope.init(context.node.handler.body);

			var errVar = context.node.handler.param.name;
			var hasBinding = context.env.hasBinding(errVar);

			if (!hasBinding) {
				context.env.createBinding(errVar);
			}

			context.env.setBinding(errVar, caughtError);

			try {
				result = context.create(context.node.handler.body, context.node.handler).execute();
			} catch (catchError) {
				// scope.exitScope();
				throw catchError;
			} finally {
				if (!hasBinding) {
					context.env.deleteBinding(errVar);
				}
			}

			// scope.exitScope();
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
			newValue = objectFactory.createPrimitive(-(convert.toNumber(context.env, value)));
			break;

		case "+":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(+(convert.toNumber(context.env, value)));
			break;

		case "!":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(!(value.isPrimitive ? value.toBoolean() : true));
			break;

		case "~":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(~(convert.toInt32(context.env, value)));
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
	var originalValue = convert.toNumber(context.env, ref.getValue());
	var newValue = originalValue;

	if (context.node.operator === "++") {
		newValue++;
	} else {
		newValue--;
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	var returnValue = context.node.prefix ? newValue : originalValue;

	ref.putValue(newValue);
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
	var name = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.env.putValue(name, value.getValue(), false, context);
	}

	return context.result(context.env.getReference(name));
	// return context.result(value, id);
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
		// "eval",
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
var types = require("../utils/types");
var ArrayType = require("../types/array-type");

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

function getLength (env, source) {
	if (source.hasProperty("length")) {
		return convert.toUInt32(env, source.getProperty("length").getValue());
	}

	return 0;
}

function executeCallback (callback, thisArg, executionContext, index) {
	var arr = convert.toObject(executionContext.env, executionContext.node);
	var scope = executionContext.env.createScope(thisArg || executionContext.env.global);
	scope.init(callback.node.body);

	var undef = executionContext.env.global.getProperty("undefined").getValue();
	var objectFactory = executionContext.env.objectFactory;
	var args = [executionContext.node.getProperty(index).getValue(), objectFactory.createPrimitive(index), arr];
	var executionResult;

	func.loadArguments(executionContext.env, callback.node.params, args);

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
	var arr = convert.toObject(executionContext.env, executionContext.node);
	var scope = executionContext.env.createScope();
	scope.init(callback.node.body);

	var undef = executionContext.env.global.getProperty("undefined").getValue();
	var objectFactory = executionContext.env.objectFactory;
	var args = [priorValue || undef, executionContext.node.getProperty(index).getValue() || undef, objectFactory.createPrimitive(index), arr];
	var executionResult;

	func.loadArguments(executionContext.env, callback.node.params, args);

	try {
		executionResult = executionContext.create(callback.node.body, callback.node).execute();
		return executionResult ? executionResult.result : undef;
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
}

function createIndexProperty (value) {
	return {
		value: value,
		configurable: true,
		enumerable: true,
		writable: true
	};
}

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var undef = globalObject.getProperty("undefined").getValue();

	var arrayClass = objectFactory.createFunction(function (length) {
		var newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				contracts.assertIsValidArrayLength(arguments[0].value);
				newArray.putValue("length", length, false, this);
			} else {
				for (var i = 0, ln = arguments.length; i < ln; i++) {
					newArray.defineOwnProperty(i, createIndexProperty(arguments[i]), false, env);
				}
			}
		}

		return newArray;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = arrayClass.getProperty("prototype").getValue();
	proto.className = "Array";
	proto.define("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

	arrayClass.define("isArray", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(!!(obj && obj.className === "Array"));
	}));

	proto.define("push", objectFactory.createBuiltInFunction(function (arg) {
		var start = getLength(env, this.node);
		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.defineOwnProperty(start + i, createIndexProperty(arguments[i]), true, env);
		}

		var newLength = objectFactory.createPrimitive(start + i);
		this.node.putValue("length", newLength, true);
		return newLength;
	}, 1, "Array.prototype.push"));

	proto.define("pop", objectFactory.createBuiltInFunction(function () {
		var obj;
		var i = getLength(env, this.node);

		if (i > 0) {
			i--;

			if (this.node.hasProperty(i)) {
				obj = this.node.getProperty(i).getValue();
				this.node.deleteProperty(i, true);
			}
		}

		this.node.putValue("length", objectFactory.createPrimitive(i));
		return obj || undef;
	}, 0, "Array.prototype.pop"));

	proto.define("shift", objectFactory.createBuiltInFunction(function () {
		var obj;
		var length = getLength(env, this.node);
		var i = 0;

		if (length > 0) {
			if (this.node.hasProperty(i)) {
				obj = this.node.getProperty(i).getValue();
				this.node.deleteProperty(i);
			}

			while (++i < length) {
				if (this.node.hasProperty(i)) {
					this.node.putValue(i - 1, this.node.getProperty(i).getValue());
				} else {
					this.node.deleteProperty(i);
				}
			}

			this.node.deleteProperty(length - 1);
		}

		this.node.putValue("length", objectFactory.createPrimitive(length === 0 ? 0 : --length));
		return obj || undef;
	}, 0, "Array.prototype.shift"));

	proto.define("unshift", objectFactory.createBuiltInFunction(function () {
		var length = getLength(env, this.node);
		var argCount = arguments.length;
		var i = length;
		var to, from;

		while (i > 0) {
			from = i - 1;
			to = i + argCount - 1;

			if (this.node.hasProperty(from)) {
				this.node.putValue(to, this.node.getProperty(from).getValue(), true);
			} else {
				this.node.deleteProperty(to, true);
			}

			i--;
		}

		for (i = 0; i < argCount; i++) {
			this.node.putValue(i, arguments[i], true);
		}

		var newLength = objectFactory.createPrimitive(argCount + length);
		this.node.putValue("length", newLength, true);
		return newLength;
	}, 1, "Array.prototype.unshift"));

	proto.define("slice", objectFactory.createBuiltInFunction(function (begin, end) {
		var source = this.node;
		var length = getLength(env, this.node);
		begin = begin ? convert.toInteger(env, begin) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = convert.toInteger(env, end);
		}

		var arr = objectFactory.create("Array");
		var index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (var i = begin; i < end; i++) {
			arr.defineOwnProperty(index++, createIndexProperty(source.getProperty(i).getValue()), true, env);
		}

		return arr;
	}, 2, "Array.prototype.slice"));

	proto.define("splice", objectFactory.createBuiltInFunction(function (start, deleteCount) {
		var length = getLength(env, this.node);

		start = convert.toInteger(env, start);
		if (start < 0) {
			start = Math.max(length + start, 0);
		} else {
			start = Math.min(start, length);
		}

		deleteCount = convert.toInteger(env, deleteCount);
		if (deleteCount < 0) {
			deleteCount = 0;
		} else {
			deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
		}

		var removed = objectFactory.create("Array");

		var k = 0;
		while (k < deleteCount) {
			if (this.node.hasProperty(k + start)) {
				removed.defineOwnProperty(k, createIndexProperty(this.node.getProperty(k + start).getValue()), true, env);
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
	}, 2, "Array.prototype.splice"));

	proto.define("concat", objectFactory.createBuiltInFunction(function () {
		var newArray = objectFactory.create("Array");
		var arrays = Array.prototype.slice.call(arguments);

		// add "this" array to bunch
		arrays.unshift(convert.toObject(env, this.node));

		var current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof ArrayType) {
				for (i = 0, length = current.getProperty("length").getValue().value; i < length; i++) {
					if (current.hasProperty(i)) {
						newArray.defineOwnProperty(index, createIndexProperty(current.getProperty(i).getValue()), true, env);
					}

					index++;
				}
			} else {
				newArray.defineOwnProperty(index++, createIndexProperty(current), true, env);
			}
		}

		newArray.putValue("length", objectFactory.createPrimitive(index), true);
		return newArray;
	}, 1, "Array.prototype.concat"));

	function join (separator) {
		var length = getLength(env, this.node);
		separator = arguments.length === 0 || separator === undef ? "," : convert.toPrimitive(env, separator, "string");
		var stringValues = [];
		var stringValue;

		for (var i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getProperty(i).getValue();
				if (stringValue.isPrimitive) {
					stringValue = stringValue.value == null ? "" : stringValue.toString();
				} else {
					stringValue = convert.toPrimitive(env, stringValue, "string");
				}
			}

			stringValues.push(stringValue);
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}

	proto.define("join", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.join"));

	proto.define("indexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		searchElement = searchElement || undef;
		var length = getLength(env, this.node);
		var index = arguments.length === 1 ? 0 : convert.toInteger(env, fromIndex);
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
	}, 1, "Array.prototype.indexOf"));

	proto.define("lastIndexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		searchElement = searchElement || undef;
		var length = getLength(env, this.node);
		var index = arguments.length === 1 ? length - 1 : convert.toInteger(env, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getProperty(index).getValue() || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"));

	proto.define("forEach", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = getLength(env, this.node);
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}, 1, "Array.prototype.forEach"));

	proto.define("map", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		newArray.putValue("length", objectFactory.createPrimitive(length));

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				newArray.defineOwnProperty(i, createIndexProperty(executeCallback(callback, thisArg, this, i)), true, env);
			}
		}

		return newArray;
	}, 1, "Array.prototype.map"));

	proto.define("filter", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");
		var length = getLength(env, this.node);
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.defineOwnProperty(index++, createIndexProperty(this.node.getProperty(i).getValue()), true, env);
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"));

	proto.define("every", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		var length = getLength(env, this.node);
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}, 1, "Array.prototype.every"));

	proto.define("some", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");
		var length = getLength(env, this.node);
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"));

	proto.define("reduce", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var length = getLength(env, this.node);
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
	}, 1, "Array.prototype.reduce"));

	proto.define("reduceRight", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");
		contracts.assertIsFunction(callback);

		// length--;
		var accumulator;

		if (length === 0 && arguments.length === 1) {
			throw new TypeError("Reduce of empty array with no initial value");
		}

		var k = length - 1;
		if (arguments.length >= 2) {
			accumulator = initialValue;
		} else {
			// make sure array isn't empty
			var hasElements = false;
			while (k >= 0 && !hasElements) {
				hasElements = this.node.hasProperty(k);
				if (hasElements) {
					accumulator = this.node.getProperty(k).getValue();
				}

				k--;
			}

			if (!hasElements) {
				throw new TypeError("Reduce of empty array with no initial value");
			}
		}

		while (k >= 0) {
			if (this.node.hasProperty(k)) {
				accumulator = executeAccumulator(callback, accumulator, this, k);
			}

			k--;
		}

		return accumulator;
	}, 1, "Array.prototype.reduceRight"));

	proto.define("reverse", objectFactory.createBuiltInFunction(function () {
		var length = getLength(env, this.node);
		var middle = Math.floor(length / 2);
		var lower = 0;
		var upper, upperValue, lowerValue;

		while (lower !== middle) {
			upper = length - lower - 1;
			lowerValue = this.node.hasProperty(lower) && this.node.getProperty(lower).getValue();
			upperValue = this.node.hasProperty(upper) && this.node.getProperty(upper).getValue();

			if (upperValue) {
				this.node.putValue(lower, upperValue, true);
			}

			if (lowerValue) {
				this.node.putValue(upper, lowerValue, true);
			}

			if (upperValue && !lowerValue) {
				this.node.deleteProperty(upper);
			} else if (lowerValue && !upperValue) {
				this.node.deleteProperty(lower);
			}

			lower++;
		}

		return this.node;
	}, 0, "Array.prototype.reverse"));

	proto.define("sort", objectFactory.createBuiltInFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;
		var length = getLength(env, arr);
		var i = 0;

		var comparer;
		if (types.isNullOrUndefined(compareFunction)) {
			comparer = function defaultComparer (a, b) {
				a = convert.toString(env, a);
				b = convert.toString(env, b);

				if (a < b) {
					return -1;
				}

				if (a > b) {
					return 1;
				}

				return 0;
			};
		} else {
			comparer = function (a, b) {
				var scope = env.createScope(undef);
				scope.init(compareFunction.node.body);

				func.loadArguments(env, compareFunction.node.params, [a, b]);
				var executionResult;

				try {
					executionResult = executionContext.create(compareFunction.node.body, compareFunction.node).execute();
				} catch (err) {
					scope.exitScope();
					throw err;
				}

				scope.exitScope();

				if (executionResult && executionResult.exit && executionResult.result) {
					return executionResult.result.getValue().value;
				}

				return undefined;
			};
		}

		// convert to array, run the wrapped comparer, then re-assign indexes
		var sortedArray = convert.toArray(arr, length)
			// undefined positions are handled by the underlying sort algorithm, so replace them with the raw primitive value
			.map(function (el) { return el.isPrimitive && el.value === undefined ? undefined : el; })
			.sort(comparer);

		while (i < length) {
			if (i in sortedArray) {
				arr.putValue(i, sortedArray[i], false, env);
			} else {
				arr.deleteProperty(i, false);
			}

			i++;
		}

		return arr;
	}, 1, "Array.prototype.sort"));

	proto.define("toLocaleString", objectFactory.createBuiltInFunction(function () {
		// todo: implement for reach
		var length = getLength(env, this.node);
		var arr = new Array(length);
		var i = 0;
		var current;

		while (i < length) {
			if (this.node.hasProperty(i)) {
				current = this.node.getProperty(i).getValue();

				if (types.isNullOrUndefined(current)) {
					arr[i] = "";
				} else {
					arr[i] = convert.toString(env, func.callMethod(env, current, "toLocaleString", []));
				}
			}

			i++;
		}

		// var values = convert.toArray(this.node).map(function (arg) { return arg.value.toLocaleString(); });
		return objectFactory.createPrimitive(arr.join());
	}, 0, "Array.prototype.toLocaleString"));

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.define("toString", objectFactory.createBuiltInFunction(join, 0, "Array.prototype.toString"));
	globalObject.define("Array", arrayClass);
};

},{"../types/array-type":56,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69,"../utils/types":70}],43:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var booleanClass = objectFactory.createFunction(function (obj) {
		var booleanValue = obj && obj.isPrimitive ? obj.toBoolean() : !!obj;

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(env, booleanValue);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = booleanClass.getProperty("prototype").getValue();
	proto.className = "Boolean";
	proto.define("toString", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.toString is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value ? this.node.value.toString() : "false");
	}));

	proto.define("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Boolean") {
			throw new TypeError("Boolean.prototype.valueOf is not generic.");
		}

		return objectFactory.createPrimitive(this.node.value || false);
	}));

	globalObject.define("Boolean", booleanClass);
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
		consoleClass.define(name, objectFactory.createBuiltInFunction(function (message) {
			var stringValue = convert.toString(env, message);
			console[name](stringValue);
		}, 1, "console." + name));
	});

	globalObject.define("console", consoleClass);
};

},{"../utils/convert":68}],45:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var staticMethods = ["now"];
var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];
var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];
var slice = Array.prototype.slice;

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;

	var dateClass = objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			if (p1.isPrimitive) {
				args = [p1.value];
			} else {
				var primitiveValue = convert.toPrimitive(env, p1);
				if (typeof primitiveValue !== "string") {
					primitiveValue = convert.toNumber(env, p1);
				}

				args = [primitiveValue];
			}
		} else {
			args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(env, arg, "number"); });
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

	dateClass.define("parse", objectFactory.createBuiltInFunction(function (value) {
		var stringValue = convert.toPrimitive(env, value, "string");
		var dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, 1, "Date.prototype.parse"));

	dateClass.define("UTC", objectFactory.createBuiltInFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(env, arg, "number"); });
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, 7, "Date.prototype.UTC"));

	var proto = dateClass.getProperty("prototype").getValue();

	staticMethods.forEach(function (name) {
		dateClass.define(name, convert.toNativeFunction(env, Date[name], "Date." + name));
	});

	protoMethods.forEach(function (name) {
		proto.define(name, convert.toNativeFunction(env, Date.prototype[name], "Date.prototype." + name));
	});

	setters.forEach(function (name) {
		function setter () {
			var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(env, arg); });
			Date.prototype[name].apply(this.node.value, args);
		}

		setter.nativeLength = Date.prototype[name].length;
		proto.define(name, objectFactory.createFunction(setter));
	});

	proto.define("valueOf", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.value.valueOf());
	}));

	globalObject.define("Date", dateClass);
};

},{"../utils/convert":68}],46:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var types = require("../utils/types");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");

		if (!types.isNullOrUndefined(message)) {
			obj.putValue("message", message, false);
		}

		return obj;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = errorClass.getProperty("prototype").getValue();
	proto.className = "Error";
	proto.define("name", objectFactory.createPrimitive("Error"));
	proto.define("message", objectFactory.createPrimitive(""));

	proto.define("toString", objectFactory.createFunction(function () {
		var name = this.node.getProperty("name").getValue();
		var msg;

		if (this.node.hasProperty("message")) {
			msg = convert.toString(env, this.node.getProperty("message").getValue());
		}

		name = name && name.toString();
		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}));

	globalObject.define("Error", errorClass);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.create("Error", { name: type });
			err.putValue("message", message, false, this);
			err.putValue("name", objectFactory.createPrimitive(type), false, this);
			return err;
		}, null, null, null, { configurable: false, enumerable: false, writable: false });

		// errClass.setPrototype(proto);
		globalObject.define(type, errClass);
	});
};

},{"../utils/convert":68,"../utils/types":70}],47:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var contracts = require("../utils/contracts");
var types = require("../utils/types");
var func = require("../utils/func");
var NativeFunctionType = require("../types/native-function-type");
var slice = Array.prototype.slice;

function defineThis (env, fn, thisArg) {
	if (fn.builtIn) {
		return thisArg || env.global.getProperty("undefined").getValue();
	}

	if (types.isNullOrUndefined(thisArg)) {
		return env.global;
	}

	return convert.toObject(env, thisArg);
}

var frozen = { configurable: false, enumerable: false, writable: false };

module.exports = function (env, options) {
	var globalObject = env.global;
	var undef = env.global.getProperty("undefined").getValue();
	var objectFactory = env.objectFactory;

	var funcCtor = function () {
		var funcInstance;

		if (options.parser && arguments.length > 0) {
			var args = slice.call(arguments);
			var body = args.pop();
			
			if (args.length > 0) {
				args = args.map(function (arg, index) {
					if (types.isNull(arg)) {
						throw new SyntaxError("Unexpected token null");
					}
					
					return types.isUndefined(arg) ? "" : convert.toString(env, arg); 
				})
				// the spec allows parameters to be comma-delimited, so we will join and split again comma
				.join(",").split(/\s*,\s*/g);
			}
			
			var ast = options.parser("(function(){" + convert.toString(env, body) + "}).apply(this,arguments);");
			var params = args.map(function (arg) {
				arg = arg.trim();
				contracts.assertIsValidParameterName(arg);
				
				return {
					type: "Identifier",
					name: arg
				};
			});

			var callee = {
				type: "FunctionDeclaration",
				params: params,
				body: ast
			};

			var fn = objectFactory.createFunction(callee);
			var wrappedFunc = function () {
				var thisArg = this.node || globalObject;
				if (this.isNew) {
					thisArg = objectFactory.createObject(funcInstance);
				}
				
				var executionResult = func.getFunctionResult(this, fn, params, arguments, thisArg, callee);
				
				if (this.isNew) {
					return thisArg;
				}
				
				return executionResult && executionResult.result || undef;
			};
			
			wrappedFunc.nativeLength = callee.params.length;
			funcInstance = objectFactory.createFunction(wrappedFunc, env.globalScope);
		} else {
			funcInstance = objectFactory.createFunction(function () {});
		}

		funcInstance.putValue("constructor", functionClass);
		return funcInstance;
	};
	
	// the prototype of a function is actually callable and evaluates as a function
	var proto = new NativeFunctionType(function () {});

	funcCtor.nativeLength = 1;
	var functionClass = objectFactory.createFunction(funcCtor, null, proto, null, frozen);
	functionClass.putValue("constructor", functionClass);

	globalObject.define("Function", functionClass);

	// var proto = functionClass.getProperty("prototype").getValue();
	// proto.className = "Function";
	proto.define("length", objectFactory.createPrimitive(0), frozen);

	// function itself is a function
	functionClass.setPrototype(proto);
	
	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.native) {
			return objectFactory.createPrimitive("function () { [native code] }");
		}

		return objectFactory.createPrimitive("function () { [user code] }");
	}, 0, "Function.prototype.toString"));

	// proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
	// 	return this.node;
	// }, 0, "Function.prototype.valueOf"));

	proto.define("call", objectFactory.createBuiltInFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);
		
		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}, 1, "Function.prototype.call"));

	proto.define("apply", objectFactory.createBuiltInFunction(function (thisArg, argsArray) {
		if (argsArray) {
			if (argsArray.className !== "Arguments" && argsArray.className !== "Array") {
				throw new TypeError("Arguments list was wrong type");
			}
		}

		var args = convert.toArray(argsArray);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);
		
		return func.executeFunction(this, this.node, params, args, thisArg, callee);
	}, 2, "Function.prototype.apply"));

	proto.define("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var fn = this.node;
		var params = fn.native ? [] : fn.node.params;
		var callee = fn.native ? fn : fn.node;
		thisArg = defineThis(env, this.node, thisArg);

		var thrower = function () { throw new TypeError("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them"); };
		var throwProperties = {
			get: undefined,
			getter: thrower,
			set: undefined,
			setter: thrower,
			enumerable: false,
			configurable: false
		};

		var nativeFunc = function () {
			var mergedArgs = args.concat(slice.call(arguments));
			return func.executeFunction(this, fn, params, mergedArgs, thisArg, callee, this.isNew);
		};

		nativeFunc.nativeLength = Math.max(params.length - args.length, 0);
		var boundFunc = objectFactory.createFunction(nativeFunc, this.env.current);

		boundFunc.defineOwnProperty("caller", throwProperties);
		boundFunc.defineOwnProperty("arguments", throwProperties);
		boundFunc.defineOwnProperty("callee", throwProperties);
		boundFunc.bindThis(thisArg);
		
		return boundFunc;
	}));
};

},{"../types/native-function-type":60,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69,"../utils/types":70}],48:[function(require,module,exports){
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

var frozen = { configurable: false, enumerable: false, writable: false };

module.exports = function GlobalScope (runner) {
	var config = runner.config;
	var env = new Environment(runner);
	var objectFactory = env.objectFactory = new ObjectFactory(env);
	var globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	var undefinedClass = new PrimitiveType(undefined);
	globalObject.define("undefined", undefinedClass, frozen);

	var nullClass = new PrimitiveType(null);
	globalObject.define("null", nullClass, frozen);

	globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), frozen);
	globalObject.define("NaN", objectFactory.createPrimitive(NaN), frozen);

	// todo: node vs browser - do we care?
	globalObject.define("window", globalObject, frozen);

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

	["parseFloat", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"].forEach(function (name) {
		globalObject.define(name, objectFactory.createBuiltInFunction(function (value) {
			var stringValue = convert.toString(env, value);
			return objectFactory.createPrimitive(global[name](stringValue));
		}, 1, name));
	});

	["isNaN", "isFinite"].forEach(function (name) {
		globalObject.define(name, convert.toNativeFunction(env, global[name], name));
	});

	globalObject.define("parseInt", objectFactory.createBuiltInFunction(function (value, radix) {
		var stringValue = convert.toString(env, value);
		radix = convert.toPrimitive(env, radix, "number");

		return objectFactory.createPrimitive(parseInt(stringValue, radix));
	}, 2, "parseInt"));

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
			var scope = env.setScope(indirect ? env.globalScope : env.current.parent);
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
		globalObject.define("eval", evalFunc);
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
		jsonClass.define(name, convert.toNativeFunction(env, JSON[name], "JSON." + name));
	});

	globalObject.define("JSON", jsonClass);
};

},{"../utils/convert":68}],50:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var mathClass = objectFactory.createObject();
	mathClass.className = "Math";

	constants.forEach(function (name) {
		mathClass.define(name, objectFactory.createPrimitive(Math[name]), { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.define(name, convert.toNativeFunction(env, Math[name], "Math." + name));
	});

	globalObject.define("Math", mathClass);
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

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var numberClass = objectFactory.createFunction(function (obj) {
		var numberValue = Number(convert.toPrimitive(env, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(env, numberValue);
		}

		return objectFactory.create("Number", numberValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = numberClass.getProperty("prototype").getValue();
	proto.className = "Number";

	proto.define("toString", objectFactory.createBuiltInFunction(function (radix) {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.toString is not generic");
		}

		var radixValue = 10;
		if (radix) {
			radixValue = convert.toPrimitive(env, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, 1, "Number.prototype.toString"));

	proto.define("toFixed", objectFactory.createBuiltInFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = convert.toPrimitive(env, fractionDigits, "number");
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.toNumber(), digits));
	}, 1, "Number.prototype.toFixed"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"));

	constants.forEach(function (name) {
		numberClass.define(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.define(name, convert.toNativeFunction(env, fn, "Number.prototype." + name));
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.define(name, convert.toNativeFunction(env, fn, "Number." + name));
		}
	});

	globalObject.define("Number", numberClass);
};

},{"../utils/convert":68}],52:[function(require,module,exports){
"use strict";
var ObjectType = require("../types/object-type");
var convert = require("../utils/convert");
var contracts = require("../utils/contracts");
var func = require("../utils/func");

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
	var options = {};

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
					var thisArg = convert.toObject(context.env, this);

					try {
						var getResult = func.getFunctionResult(context, getter, getter.node.params, [], thisArg, getter.node);
						scope.exitScope();
						return getResult && getResult.exit ? getResult.result.getValue() : undef;
					} catch (err) {
						scope.exitScope();
						throw err;
					}
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
					var thisArg = convert.toObject(context.env, this);

					try {
						func.executeFunction(context, setter, setter.node.params, arguments, thisArg, setter.node);
						scope.exitScope();
						return undef;
					} catch (err) {
						scope.exitScope();
						throw err;
					}
				};
			}
		}

		if (hasValue) {
			options.value = descriptor.getProperty("value").getValue() || undef;
		}
	}

	obj.defineOwnProperty(name, options, true, context.env);
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
	proto.define("hasOwnProperty", objectFactory.createBuiltInFunction(function (name) {
		name = convert.toString(env, name);
		return objectFactory.createPrimitive(name in this.node.properties);
	}, 1, "Object.prototype.hasOwnProperty"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		return convert.toObject(env, this.node);
	}, 0, "Object.prototype.valueOf"));

	var toStringFunc = objectFactory.createBuiltInFunction(function () {
		return objectFactory.createPrimitive("[object " + this.node.className + "]");
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	proto.define("toString", toStringFunc);
	proto.define("toLocaleString", toStringFunc);

	proto.define("isPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		var current = obj;
		var thisNode = this.env.current.thisNode;

		while (current) {
			if (thisNode === current) {
				return objectFactory.createPrimitive(true);
			}

			current = current.getPrototype();
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Object.isPrototypeOf"));

	proto.define("propertyIsEnumerable", objectFactory.createBuiltInFunction(function (name) {
		name = convert.toPrimitive(env, name, "string");
		var descriptor = this.node.getOwnProperty(name);
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"));

	objectClass.define("create", objectFactory.createBuiltInFunction(function (parent, descriptors) {
		if (parent && parent.isPrimitive && parent.value !== null) {
			throw new TypeError("Object prototype may only be an Object or null:" + parent.toString());
		}

		if (descriptors && descriptors.isPrimitive && descriptors.value === null) {
			throw new TypeError("Cannot convert null or undefined to object");
		}

		var obj = objectFactory.createObject();

		if (parent) {
			obj.setPrototype(parent);
		}

		if (descriptors) {
			for (var prop in descriptors.properties) {
				if (descriptors.properties[prop].enumerable) {
					defineProperty(this, obj, prop, descriptors.getProperty(prop).getValue());
				}
			}
		}

		return obj;
	}, 2, "Object.create"));

	objectClass.define("defineProperty", objectFactory.createBuiltInFunction(function (obj, prop, descriptor) {
		contracts.assertIsObject(obj, "Object.defineProperty");
		defineProperty(this, obj, convert.toString(env, prop), descriptor);
		return obj;
	}, 3, "Object.defineProperty"));

	objectClass.define("defineProperties", objectFactory.createBuiltInFunction(function (obj, descriptors) {
		contracts.assertIsObject(obj, "Object.defineProperties");
		contracts.assertArgIsNotNullOrUndefined(descriptors);

		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getProperty(prop).getValue());
			}
		}

		return obj;
	}, 2, "Object.defineProperties"));

	objectClass.define("getOwnPropertyDescriptor", objectFactory.createBuiltInFunction(function (obj, prop) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyDescriptor");

		prop = convert.toString(env, prop);

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
	}, 2, "Object.getOwnPropertyDescriptor"));

	objectClass.define("keys", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj);

		var arr = objectFactory.create("Array");
		var index = 0;
		
		for (var name in obj.properties) {
			if (obj.properties[name].enumerable) {
				arr.defineOwnProperty(index++, { configurable: true, enumerable: true, writable: true, value: objectFactory.createPrimitive(name) }, false, env);
			}
		}

		return arr;
	}, 1, "Object.keys"));

	objectClass.define("getOwnPropertyNames", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		obj.getOwnPropertyNames().forEach(function (name, index) {
			arr.putValue(index, objectFactory.createPrimitive(name));
		});

		return arr;
	}, 1, "Object.getOwnPropertyNames"));

	objectClass.define("getPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getPrototypeOf");
		var proto = obj.getPrototype();
		return proto || env.global.getProperty("null").getValue();
	}, 1, "Object.getPrototypeOf"));

	objectClass.define("freeze", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.freeze");
		obj.freeze();
		return obj;
	}, 1, "Object.freeze"));

	objectClass.define("isFrozen", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isFrozen");

		if (obj.isPrimitive) {
			return objectFactory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				// if (obj.type === "function" || prop !== "prototype") {
				if (obj.properties[prop].writable || obj.properties[prop].configurable) {
					return objectFactory.createPrimitive(false);
				}
				// }
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isFrozen"));

	objectClass.define("preventExtensions", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}, 1, "Object.preventExtensions"));

	objectClass.define("isExtensible", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible);
	}, 1, "Object.isExtensible"));

	objectClass.define("seal", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}, 1, "Object.seal"));

	objectClass.define("isSealed", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isSealed");

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				// if (obj.type === "function" || prop !== "prototype") {
				if (obj.properties[prop].configurable) {
					return objectFactory.createPrimitive(false);
				}
				// }
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"));

	// function is an object - make sure that it is in the prototype chain
	globalObject.getProperty("Function").getValue().getPrototype().setPrototype(proto);
	globalObject.define("Object", objectClass);
};

},{"../types/object-type":62,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69}],53:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var types = require("../utils/types");

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

		var patternString = types.isUndefined(pattern) ? "" : convert.toString(env, pattern);
		flags = types.isUndefined(flags) ? "" : convert.toString(env, flags);

		return objectFactory.create("RegExp", new RegExp(patternString, flags));
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = regexClass.getProperty("prototype").getValue();
	proto.className = "RegExp";

	proto.define("test", objectFactory.createBuiltInFunction(function (str) {
		var stringValue = convert.toString(env, str);

		this.node.source.lastIndex = convert.toInt32(env, this.node.getProperty("lastIndex").getValue());
		var testValue = this.node.source.test(stringValue);
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		return objectFactory.createPrimitive(testValue);
	}, 1, "RegExp.prototype.test"));

	proto.define("exec", objectFactory.createBuiltInFunction(function (str) {
		var stringValue = convert.toString(env, str);

		// update underlying regex in case the index was manually updated
		this.node.source.lastIndex = convert.toInt32(env, this.node.getProperty("lastIndex").getValue());

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
	}, 1, "RegExp.prototype.exec"));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
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
	}, 0, "RegExp.prototype.toString"));

	proto.define("compile", convert.toNativeFunction(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
	proto.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(0), writable: true });

	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, { value: objectFactory.createPrimitive(RegExp.prototype[name]) });
	});

	globalObject.define("RegExp", regexClass);
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

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = value ? convert.toString(env, value.getValue()) : "";

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(env, stringValue);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = stringClass.getProperty("prototype").getValue();

	// prototype can be coerced into an empty string
	proto.value = "";
	proto.className = "String";
	proto.defineOwnProperty("length", { value: objectFactory.createPrimitive(0) });

	proto.define("search", objectFactory.createBuiltInFunction(function (regex) {
		var stringValue = convert.toString(env, this.node);
		var underlyingRegex;

		if (regex) {
			if (regex.className === "RegExp") {
				underlyingRegex = regex.source;
			} else {
				underlyingRegex = new RegExp(convert.toString(env, regex));
			}
		}

		return objectFactory.createPrimitive(stringValue.search(underlyingRegex));
	}, 1, "String.prototype.search"));

	proto.define("substring", objectFactory.createBuiltInFunction(function (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		var value = convert.toPrimitive(env, this.node, "string");
		var length = value.length;

		start = convert.toInteger(env, start);
		end = types.isNullOrUndefined(end) ? length : convert.toInteger(env, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}, 2, "String.prototype.substring"));

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.define(name, objectFactory.createBuiltInFunction(function () {
				var stringValue = convert.toString(env, this.node);
				var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(env, arg); });
				return objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args));
			}, String.prototype[name].length, "String.prototype." + name));
		}
	});

	stringClass.define("fromCharCode", objectFactory.createBuiltInFunction(function (charCode) {
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(env, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}, 1, "String.fromCharCode"));

	proto.define("slice", objectFactory.createBuiltInFunction(function (start, end) {
		var stringValue = convert.toString(env, this.node);
		var startValue = convert.toInteger(env, start);
		var endValue;

		if (!types.isNullOrUndefined(end)) {
			endValue = convert.toInteger(env, end);
		}

		return objectFactory.createPrimitive(stringValue.slice(startValue, endValue));
	}, 2, "String.prototype.slice"));

	proto.define("split", objectFactory.createBuiltInFunction(function (separator, limit) {
		var stringValue = convert.toString(env, this.node);
		separator = separator && separator.getValue();
		limit = limit && limit.getValue();
		var limitValue = types.isUndefined(limit) ? undefined : convert.toUInt32(env, limit);

		var arr = objectFactory.create("Array");
		if (types.isUndefined(separator)) {
			arr.putValue(0, objectFactory.createPrimitive(stringValue), false, this);
		} else {
			var separatorValue;
			if (separator.className === "RegExp") {
				separatorValue = separator.source;
			} else {
				separatorValue = convert.toString(env, separator);
			}

			var result = stringValue.split(separatorValue, limitValue);
			var context = this;

			result.forEach(function (value, index) {
				arr.putValue(index, objectFactory.createPrimitive(value), false, context);
			});
		}

		return arr;
	}, 2, "String.prototype.split"));

	proto.define("replace", objectFactory.createBuiltInFunction(function (regexOrSubstr, substrOrFn) {
		var stringValue = convert.toString(env, this.node);

		var matcher;
		if (regexOrSubstr && regexOrSubstr.className === "RegExp") {
			matcher = regexOrSubstr.source;
		} else {
			matcher = convert.toString(env, regexOrSubstr);
		}

		var replacer;
		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var callee = substrOrFn.native ? substrOrFn : substrOrFn.node;
			var params = callee.params || [];

			replacer = function () {
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });
				var replacedValue = func.executeFunction(executionContext, substrOrFn, params, args, globalObject, callee);
				return replacedValue ? convert.toString(env, replacedValue) : undefined;
			};
		} else {
			replacer = convert.toString(env, substrOrFn);
		}

		return objectFactory.createPrimitive(stringValue.replace(matcher, replacer));
	}, 2, "String.prototype.replace"));

	proto.define("match", objectFactory.createBuiltInFunction(function (regex) {
		var stringValue = convert.toString(env, this.node);
		var actualRegex;

		if (regex && regex instanceof RegexType) {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(convert.toPrimitive(env, regex));
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
	}, 1, "String.prototype.match"));

	proto.define("trim", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		var stringValue = convert.toPrimitive(env, this.node, "string");
		return objectFactory.createPrimitive(stringValue.trim());
	}, 0, "String.prototype.trim"));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "String") {
			throw new TypeError("String.prototype.toString is not generic");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "String") {
			throw new TypeError("String.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.valueOf"));

	globalObject.define("String", stringClass);
};

},{"../types/regex-type":65,"../utils/contracts":67,"../utils/convert":68,"../utils/func":69,"../utils/types":70}],55:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function ArgumentType () {
	ObjectType.call(this);
	this.className = "Arguments";
	this.parameterMap = Object.create(null);
}

ArgumentType.prototype = Object.create(ObjectType.prototype);
ArgumentType.prototype.constructor = ArgumentType;

ArgumentType.prototype.mapProperty = function (index, binding) {
	index = String(index);

	ObjectType.prototype.defineOwnProperty.call(this, index, {
		configurable: true,
		enumerable: true,
		writable: true,
		value: undefined
	}, true);

	this.parameterMap[index] = binding;
};

ArgumentType.prototype.getProperty = function (name) {
	var ownProperty = this.getOwnProperty(name);
	if (ownProperty) {
		return ownProperty;
	}

	return ObjectType.prototype.getProperty.apply(this, arguments);
};

ArgumentType.prototype.getOwnProperty = function (name) {
	name = String(name);

	if (name in this.parameterMap) {
		var mappedProperty = this.properties[name];
		var linkedProperty = this.parameterMap[name];

		mappedProperty.value = linkedProperty.getValue();
		mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
		return mappedProperty;
	}

	return ObjectType.prototype.getOwnProperty.apply(this, arguments);
};

ArgumentType.prototype.defineOwnProperty = function (name, descriptor, throwOnError) {
	name = String(name);

	var allowed = ObjectType.prototype.defineOwnProperty.apply(this, arguments);
	if (allowed && name in this.parameterMap) {
		if ("set" in descriptor || "get" in descriptor) {
			delete this.parameterMap[name];
		} else if ("value" in descriptor) {
			this.parameterMap[name].setValue(descriptor.value, throwOnError);
		}

		if ("writable" in descriptor && !descriptor.writable) {
			delete this.parameterMap[name];
		}
	}

	return allowed;
};

ArgumentType.prototype.deleteProperty = function (name, throwOnError) {
	name = String(name);
	if (name in this.parameterMap) {
		delete this.parameterMap[name];
	}

	return ObjectType.prototype.deleteProperty.apply(this, arguments);
};

module.exports = ArgumentType;

},{"./object-type":62}],56:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var types = require("../utils/types");
var contracts = require("../utils/contracts");
var convert = require("../utils/convert");

// todo: this is hacky - remove this for passed in environment
var localObjectFactory;

function setIndex (env, arr, name, descriptor, throwOnError) {
	var index = Number(name);
	var lengthProperty = arr.getProperty("length");
	var lengthValue = lengthProperty.getValue().value;

	if ((!lengthProperty.canSetValue() && index >= lengthValue)
		|| !ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, false, env)) {

		if (throwOnError) {
			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
		}

		return false;
	}

	if (index >= lengthValue) {
		var newLength = localObjectFactory.createPrimitive(index + 1);
		arr.defineOwnProperty("length", { value: newLength }, false, env);
	}

	return true;
}

function setLength (env, arr, name, descriptor, throwOnError) {
	var newLengthValue = convert.toUInt32(env, descriptor.value);
	if (newLengthValue !== convert.toNumber(env, descriptor.value)) {
		throw new RangeError("Array length out of range");
	}

	descriptor.value = localObjectFactory.createPrimitive(newLengthValue);
	var newLength = descriptor.value;
	var currentLength = arr.getProperty("length").getValue();
	contracts.assertIsValidArrayLength(newLength.value);

	if (newLength.value >= currentLength.value) {
		return ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError);
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
	if (!ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError)) {
		return false;
	}

	var succeeded = true;
	while (i > newLength.value) {
		if (!arr.deleteProperty(--i, false)) {
			newLength = localObjectFactory.createPrimitive(i + 1);
			arr.defineOwnProperty("length", { value: newLength }, false);
			succeeded = false;
			break;
		}
	}

	if (notWritable) {
		arr.defineOwnProperty("length", { writable: false }, false);
	}

	if (!succeeded && throwOnError) {
		throw new TypeError("Cannot redefine property: length");
	}

	return succeeded;
}

function descriptorHasValue (descriptor) {
	return descriptor && ("value" in descriptor || "getter" in descriptor);
}

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value, throwOnError, env) {
	if (name === "length") {
		setLength(env, this, name, { value: value }, throwOnError);
		return;
	}

	ObjectType.prototype.putValue.apply(this, arguments);
};

ArrayType.prototype.defineOwnProperty = function (name, descriptor, throwOnError, env) {
	if (types.isInteger(name) && contracts.isValidArrayLength(Number(name) + 1) && !this.hasOwnProperty(name)) {
		return setIndex(env, this, name, descriptor, throwOnError);
	}

	if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
		return setLength(env, this, name, descriptor, throwOnError);
	}

	return ObjectType.prototype.defineOwnProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	localObjectFactory = objectFactory;
	this.defineOwnProperty("length", { value: objectFactory.createPrimitive(0), configurable: false, enumerable: false, writable: true });
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

	// 11.6.1 Note 1
	// All native ECMAScript objects except Date objects handle the absence of a hint as if the hint
	// Number were given; Date objects handle the absence of a hint as if the hint String were given.
	this.primitiveHint = "string";
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
var contracts = require("../utils/contracts");
var types = require("../utils/types");

function FunctionType (node, parentScope) {
	ObjectType.call(this);
	this.type = "function";
	this.className = "Function";
	this.native = false;
	this.node = node;
	this.parentScope = parentScope;
	this.boundThis = null;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory, proto, ctor, descriptor) {
	// set length property from the number of parameters
	this.defineOwnProperty("length", {
		value: objectFactory.createPrimitive(this.node.params.length),
		configurable: false,
		enumerable: false,
		writable: false
	});

	// functions have a prototype
	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: ctor || this });
	this.defineOwnProperty("prototype", { value: proto, configurable: false, enumerable: false, writable: true });
};

FunctionType.prototype.getProperty = function (name) {
	var prop = ObjectType.prototype.getProperty.apply(this, arguments);
	if (!prop && name !== "prototype") {
		// since a function instance is itself a function look at our own prototype
		var proto = this.getProperty("prototype");
		return proto && proto.getValue().getProperty(name);
	}

	return prop;
};

FunctionType.prototype.bindThis = function (thisArg) {
	this.boundThis = thisArg;
};

// FunctionType.prototype.defineOwnProperty = function (name, descriptor) {
// 	var allowed = ObjectType.prototype.defineOwnProperty.apply(this, arguments);
// 	if (allowed && name === "prototype" && "value" in descriptor) {
// 		this.proto = descriptor.value;
// 	}
// };

// FunctionType.prototype.putValue = function (name, value) {
// 	ObjectType.prototype.putValue.apply(this, arguments);
// 	if (name === "prototype") {
// 		this.proto = value;
// 	}
// };

// FunctionType.prototype.getProperty = function (name) {
// 	var prop = ObjectType.prototype.getProperty.apply(this, arguments);

// 	// since function itself is a function, look at our own properties
// 	if (!prop && name !== "prototype") {
// 		return this.properties.prototype.getValue().properties[name];
// 	}

// 	return prop;
// };

// FunctionType.prototype.getOwnPropertyNames = function () {
// 	var props = ObjectType.prototype.getOwnPropertyNames.call(this);
// 	if ("prototype" in this.properties) {
// 		props.push("prototype");
// 	}

// 	return props;
// };

FunctionType.prototype.createScope = function (env, thisArg) {
	// if a parent scope is defined we need to limit the scope to that scope
	// return (this.parentScope || currentScope).createScope(thisArg);

	var priorScope = env.current;
	if (this.parentScope) {
		env.current = this.parentScope;
	}

	var args = Array.prototype.slice.call(arguments, 1);
	if (this.boundThis) {
		args[0] = this.boundThis;
	}
	
	var scope = env.createScope.apply(env, args);
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
	if (obj === this) {
		// object obviously isn't an instance in this case
		return false;
	}

	var visited = [];
	var current = obj;

	var proto = this.getProperty("prototype").getValue();
	if (types.isNullOrUndefined(proto) || !contracts.isObject(proto)) {
		throw new TypeError("Function has non-object prototype in instanceof check");
	}

	while (current) {
		if (visited.indexOf(current) >= 0) {
			return false;
		}

		if (current === proto) {
			return true;
		}

		// keep a stack to avoid circular reference
		visited.push(current);
		current = current.getPrototype();
	}

	return false;
};

module.exports = FunctionType;

},{"../utils/contracts":67,"../utils/types":70,"./object-type":62,"./property-descriptor":64}],60:[function(require,module,exports){
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

	this.defineOwnProperty("length", {
		value: objectFactory.createPrimitive(length),
		configurable: false,
		enumerable: false,
		writable: false
	});

	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });

	descriptor = descriptor || { configurable: false, enumerable: false, writable: true };
	var protoDescriptor = {
		value: proto,
		configurable: descriptor.configurable,
		enumerable: descriptor.enumerable,
		writable: descriptor.writable
	};

	this.defineOwnProperty("prototype", protoDescriptor);
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
				child.setPrototype(parent.getProperty("prototype").getValue());
				// child.setProto(parent.proto);
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
		instance.setPrototype(parent.getValue().getProperty("prototype").getValue());
		// instance.parent = parent.getValue();
		// instance.setProto(instance.parent.proto);
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
				instance = new ErrorType(value);

				if (value) {
					typeName = value.name || typeName;
					instance.putValue("message", this.createPrimitive(value.message));
				}

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
				instance.setPrototype(parent && parent.getProperty("prototype").getValue());
				// instance.parent = parent;
				// instance.setProto(parent.proto);
			} else {
				// instance.parent = this.env.global.getProperty("Object").getValue();
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
		// instance.parent = objectClass;
		instance.setPrototype(objectClass.getProperty("prototype").getValue());
		
		// for (var i = 0, ln = args.length; i < ln; i++) {
		// 	instance.defineOwnProperty(i, args[i], { configurable: true, enumerable: true, writable: true }, false);
		// }

		// instance.defineOwnProperty("length", this.createPrimitive(ln), { configurable: true, enumerable: false, writable: true }, false);
		instance.defineOwnProperty("callee", { value: callee, configurable: true, enumerable: false, writable: true });
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
			// instance.parent = functionClass.getValue();
			instance.setPrototype(functionClass.getValue().getProperty("prototype").getValue());
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

		instance.setPrototype(this.env.getValue("Function").getProperty("prototype").getValue());
		instance.builtIn = true;
		instance.defineOwnProperty("length", { value: this.createPrimitive(length), configurable: false, enumerable: false, writable: false });
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

	this.primitiveHint = "number";
	this.propertyCount = 0;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	getPrototype: function () {
		return this.proto;
	},

	setPrototype: function (proto) {
		this.proto = proto;
	},

	getProperty: function (name) {
		name = String(name);

		var current = this;
		while (current) {
			if (name in current.properties) {
				return current.properties[name].bind(this);
			}

			current = current.getPrototype();
		}

		return undefined;
	},

	getOwnProperty: function (name) {
		return this.properties[String(name)];
	},

	getOwnPropertyNames: function () {
		return Object.keys(this.properties);
	},

	hasProperty: function (name) {
		return !!this.getProperty(name);
	},

	hasOwnProperty: function (name) {
		return String(name) in this.properties;
	},

	putValue: function (name, value, throwOnError) {
		if (this.isPrimitive) {
			return;
		}

		name = String(name);

		var descriptor = this.getProperty(name);
		if (descriptor) {
			if (!descriptor.canSetValue()) {
				if (throwOnError) {
					throw new TypeError("Cannot assign to read only property '" + name + "' of " + this.toString());
				}

				return;
			}

			if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
				this.propertyCount++;
				this.properties[name] = new PropertyDescriptor(this, {
					value: value,
					configurable: descriptor.configurable,
					enumerable: descriptor.enumerable,
					writable: descriptor.writable
				});
			} else {
				descriptor.setValue(value);
			}
		} else {
			this.defineOwnProperty(name, { value: value, configurable: true, enumerable: true, writable: true }, throwOnError);
		}
	},

	defineOwnProperty: function (name, descriptor, throwOnError) {
		if (this.isPrimitive) {
			if (throwOnError) {
				throw new TypeError("Cannot define property: " + name + ", object is not extensible");
			}

			return false;
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

		this.propertyCount++;
		this.properties[name] = new PropertyDescriptor(this, descriptor);
		return true;
	},

	define: function (name, value, descriptor) {
		descriptor = descriptor || { configurable: true, enumerable: false, writable: true };
		descriptor.value = value;
		return this.defineOwnProperty(name, descriptor, false);
	},

	getValue: function () {
		return this;
	},

	deleteProperty: function (name) {
		if (this.isPrimitive) {
			return false;
		}

		if (this.properties[name] && !this.properties[name].configurable) {
			return false;
		}

		this.propertyCount--;
		return delete this.properties[name];
	},

	freeze: function () {
		for (var prop in this.properties) {
			if (this.properties[prop].dataProperty) {
				this.defineOwnProperty(prop, { writable: false, configurable: false }, true);
			} else {
				this.defineOwnProperty(prop, { configurable: false }, true);
			}
		}

		this.preventExtensions();
	},

	preventExtensions: function () {
		this.extensible = false;
	},

	seal: function () {
		for (var prop in this.properties) {
			this.defineOwnProperty(prop, { configurable: false }, true);
		}

		this.preventExtensions();
	},
	
	getDensity: function (length) {
		// -1 to exclude length
		return this.propertyCount - 1 / length;
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

PropertyDescriptor.prototype = {
	constructor: PropertyDescriptor,

	bind: function (obj) {
		this.base = obj;
		return this;
	},

	update: function (descriptor) {
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
	},

	canUpdate: function (descriptor) {
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
	},

	getValue: function () {
		if (this.dataProperty) {
			return this.value;
		}

		if (this.getter) {
			return this.getter.call(this.base);
		}

		return undefined;
	},

	setValue: function (value) {
		if (!this.canSetValue()) {
			return;
		}

		if (this.dataProperty) {
			this.value = value;
		} else if (this.setter) {
			this.setter.call(this.base, value);
		}
	},

	canSetValue: function () {
		return this.writable || !!this.setter;
	}
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
	this.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(this.source.lastIndex), writable: true });
	this.defineOwnProperty("source", { value: objectFactory.createPrimitive(this.source.source) });
	this.defineOwnProperty("global", { value: objectFactory.createPrimitive(this.source.global) });
	this.defineOwnProperty("ignoreCase", { value: objectFactory.createPrimitive(this.source.ignoreCase) });
	this.defineOwnProperty("multiline", { value: objectFactory.createPrimitive(this.source.multiline) });
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
		// character.setProto(source.proto);
		return character;
	}

	return new PrimitiveType(undefined);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.init = function (objectFactory) {
	this.properties.length = new PropertyDescriptor(this, { configurable: false, enumerable: false, writable: false, value: objectFactory.createPrimitive(this.value.length) });
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

StringType.prototype.getDensity = function () {
	return 100;	
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
	
	assertIsValidParameterName: function (name) {
		if (/^\d|[;\(\)"']/.test(name)) {
			throw new SyntaxError("Unexpected token in " + name);
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

function getString (env, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive) {
		return String(value.value);
	}

	var primitiveValue = func.callMethod(env, value, "toString", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	primitiveValue = func.callMethod(env, value, "valueOf", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive (env, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive) {
		return value.value;
	}

	var primitiveValue = func.callMethod(env, value, "valueOf", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	primitiveValue = func.callMethod(env, value, "toString", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	throw new TypeError("Cannot convert object to primitive");
}


function getValues (env, args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(getPrimitive(env, args[i]));
	}

	return values;
}

module.exports = {
	primitiveToObject: function (env, value) {
		var newValue = env.objectFactory.createPrimitive(value);
		newValue.isPrimitive = false;
		newValue.type = "object";
		newValue.toBoolean = function () { return true; };
		return newValue;
	},

	toObject: function (env, obj) {
		if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
			return this.primitiveToObject(env, obj.value);
		}

		return obj;
	},

	toArray: function (obj, length) {
		var arr = [];

		if (obj) {
			var ln = length >= 0 ? length : obj.getProperty("length").getValue().value;
			var i = 0;

			while (i < ln) {
				if (obj.hasProperty(i)) {
					arr[i] = obj.getProperty(i).getValue();
				}

				i++;
			}
		}

		return arr;
	},

	toPrimitive: function (env, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();
		if (!preferredType && obj) {
			preferredType = obj.primitiveHint;
		}

		if (preferredType === "string") {
			return getString(env, obj);
		}

		// default case/number
		return getPrimitive(env, obj);
	},

	toString: function (env, obj) {
		return String(this.toPrimitive(env, obj, "string"));
	},

	toNumber: function (env, obj) {
		if (!obj || obj.type === "undefined") {
			return NaN;
		}

		return Number(this.toPrimitive(env, obj, "number"));
	},

	toInteger: function (env, obj) {
		var value = this.toNumber(env, obj);
		if (isNaN(value)) {
			return 0;
		}

		if (value === 0 || !isFinite(value)) {
			return value;
		}

		return sign(value) * floor(abs(value));
	},

	toInt32: function (env, obj) {
		var value = this.toNumber(env, obj);
		if (value === 0 || isNaN(value) || !isFinite(value)) {
			return 0;
		}

		return sign(value) * floor(abs(value));
	},

	toUInt32: function (env, obj) {
		var value = this.toInt32(env, obj);
		return value >>> 0;
	},

	toNativeFunction: function (env, fn, name) {
		return env.objectFactory.createBuiltInFunction(function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(env, arguments);

			var value = fn.apply(scope, args);
			return env.objectFactory.createPrimitive(value);
		}, fn.length, name);
	}
};

},{"./func":69}],69:[function(require,module,exports){
"use strict";
module.exports = {
	executeFunction: function (context, fn, params, args, thisArg, callee, isNew) {
		var scope = fn.createScope(context.env, thisArg, false);
		var returnResult;

		if (isNew) {
			returnResult = thisArg;
		}

		this.loadArguments(context.env, params, args, fn);

		try {
			if (fn.native) {
				returnResult = fn.nativeFunction.apply(context.create(thisArg, callee, isNew), args) || returnResult;
			} else {
				var executionResult = context.create(fn.node.body, callee, isNew).execute();
				if (executionResult && executionResult.exit && executionResult.result) {
					if (!isNew || !executionResult.result.isPrimitive) {
						returnResult = executionResult.result;
					}
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
		var scope = fn.createScope(context.env, thisArg, false);
		this.loadArguments(context.env, params, args, fn);

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

	loadArguments: function (env, params, args, callee) {
		var undef = env.global.getProperty("undefined").getValue();

		var argumentList = env.objectFactory.createArguments(args, callee);
		env.current.createMutableBinding("arguments");
		env.current.setMutableBinding("arguments", argumentList);

		params.forEach(function (param, index) {
			if (!env.current.hasBinding(param.name)) {
				var descriptor = env.current.createMutableBinding(param.name);
				if (args.length > index) {
					argumentList.mapProperty(index, descriptor);
				}
			}

			env.current.setMutableBinding(param.name, args[index] || undef);
		});

		// just set value if additional, unnamed arguments are passed in
		var length = args.length;
		for (var i = params.length; i < length; i++) {
			argumentList.defineOwnProperty(i, {
				value: args[i],
				configurable: true,
				enumerable: true,
				writable: true
			});
		}

		argumentList.defineOwnProperty("length", {
			value: env.objectFactory.createPrimitive(length),
			configurable: true,
			enumerable: false,
			writable: true
		});
	},

	callMethod: function (env, obj, name, args) {
		var fn = obj.getProperty(name).getValue();
		var undef = env.global.getProperty("undefined").getValue();

		if (fn && fn.className === "Function") {
			var scope = fn.createScope(env, obj);
			var executionResult;

			try {
				if (fn.native) {
					executionResult = fn.nativeFunction.apply(env.createExecutionContext(obj, obj), args);
				} else {
					this.loadArguments(env, fn.node.params, args);

					executionResult = env.createExecutionContext(fn.node.body, fn.node).execute();
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
		return this.isUndefined(obj) || this.isNull(obj);
	},

	isUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value === undefined);
	},
	
	isNull: function (obj) {
		return obj && obj.isPrimitive && obj.value === null;	
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