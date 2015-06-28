(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast, options) {
	this.ast = ast;
	this.options = options || {};
	this.scope = null;
}

SandBoxr.prototype.execute = function (context) {
	context = context || new ExecutionContext(this, this.ast, null, this.scope || this.createScope());

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createScope = function () {
	return (this.scope = globalScope(this.options));
};

module.exports = SandBoxr;

},{"./execution-context":2,"./handlers":18,"./scope/global-scope":43}],2:[function(require,module,exports){
"use strict";
var ExecutionResult = require("./execution-result");

function ExecutionContext (runner, node, callee, scope, isNew) {
	this.runner = runner;
	this.node = node;
	this.callee = callee;
	this.scope = scope;
	this.label = null;
	this.isNew = !!isNew;
}

ExecutionContext.prototype.execute = function () {
	return this.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, scope, isNew) {
	return new ExecutionContext(this.runner, node, callee, scope || this.scope, isNew);
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = new ExecutionContext(this.runner, node, null, this.scope);
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

ExecutionContext.prototype.reference = function (value, name, obj) {
	var ref = new ExecutionResult(value, name, obj);
	ref.reference = true;
	return ref;
};

ExecutionContext.prototype.empty = function () {
	return new ExecutionResult();
};

module.exports = ExecutionContext;

},{"./execution-result":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
module.exports = function ArrayExpression (context) {
	var objectFactory = context.scope.global.factory;
	var arr = objectFactory.create("Array");

	if (context.node.elements) {
		var i = 0;
		var ln = context.node.elements.length;

		while (i < ln) {
			if (context.node.elements[i]) {
				var item = context.create(context.node.elements[i]).execute().result;
				arr.defineOwnProperty(i, null, { value: item, configurable: true, enumerable: true, writable: true });
			}

			i++;
		}

		arr.putValue("length", objectFactory.createPrimitive(ln), false, context);
	}

	return context.result(arr);
};

},{}],5:[function(require,module,exports){
"use strict";
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

	// check for undeclared global
	if (context.node.left.type === "Identifier" && !context.scope.hasProperty(context.node.left.name)) {
		if (!assignment) {
			throw new ReferenceError(context.node.left.name + " is not defined");
		}

		// not found - add as reference
		context.scope.global.putValue(context.node.left.name, context.scope.global.getValue("undefined"), { configurable: true, enumerable: true, writable: true });
	}

	var left = context.create(context.node.left).execute();
	if (!left.reference) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}

	var right = context.create(context.node.right).execute();
	var newValue;

	if (assignment) {
		newValue = right.result;
	} else {
		newValue = context.scope.global.factory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));
	}

	var obj = left.object || context.scope;
	var name = left.name;

	if (obj.hasProperty(name)) {
		obj.putValue(name, newValue, false, context);
	} else {
		var descriptor = { value: newValue, configurable: true, enumerable: true, writable: true };
		obj.defineOwnProperty(name, null, descriptor, false, context);
	}

	return context.result(newValue, name);
};

},{}],6:[function(require,module,exports){
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
	"in": function (a, b, c) { return b.hasProperty(a.toString()); },
	"instanceof": function (a, b) {
		if (b.type !== "function") {
			throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
		}

		// if (a.isPrimitive) {
		// 	return false;
		// }

		var visited = [];
		var current = a;
		while (current) {
			if (visited.indexOf(current) >= 0) {
				return false;
			}

			// keep a stack to avoid circular reference
			visited.push(current);
			if (current === b.proto) {
				return true;
			}

			if (current.parent && current.parent.proto === b.proto) {
				return true;
			}

			current = current.proto;
		}

		return false;
	}
};

module.exports = function BinaryExpression (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right, context);

	return context.result(context.scope.global.factory.createPrimitive(newValue));
};

},{"../utils/convert":65}],7:[function(require,module,exports){
"use strict";
var scopedBlock = { "CallExpression": true, "NewExpression": true, "FunctionExpression": true };

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

		if (scopedBlock[node.type]) {
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

function hoistVariables (nodes, scope) {
	var undef = scope.global.getValue("undefined");
	var variables = [];
	var name;

	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		name = decl.name || decl.id.name;

		if (decl.type === "FunctionDeclaration") {
			// functions can be used before they are defined
			scope.defineOwnProperty(name, scope.global.factory.createFunction(decl, scope), { configurable: false, enumerable: false, writable: true }, true);
		} else {
			scope.defineOwnProperty(name, undef, { configurable: false, enumerable: false, writable: true }, true);
		}
	});
}

module.exports = function BlockStatement (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	hoistVariables(context.node.body, context.scope);

	for (; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context)) {
			break;
		}
	}

	return result;
};

},{}],8:[function(require,module,exports){
"use strict";
var FunctionType = require("../types/function-type");
var func = require("../utils/func");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";
	var returnResult;

	var fn = context.create(node.callee).execute();
	if (!fn.result || !(fn.result instanceof FunctionType)) {
		throw new TypeError(fn.result.toString() + " not a function");
	}

	var native = fn.result.native;

	if (isNew && !native) {
		returnResult = context.scope.global.factory.createObject(fn.result);
	}

	var params = native ? [] : fn.result.node.params;
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	var thisArg = returnResult || fn.object;
	var callee = native ? fn : fn.result.node;

	return context.result(func.executeFunction(context, fn.result, params, args, thisArg, callee, isNew));
};

},{"../types/function-type":55,"../utils/func":66}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";
module.exports = function EmptyStatement (context) {
	return context.empty();
};

},{}],11:[function(require,module,exports){
"use strict";
module.exports = 	function ExpressionStatement (context) {
	return context.create(context.node.expression).execute();
};

},{}],12:[function(require,module,exports){
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

	var obj = context.create(context.node.right).execute().result;
	var result;

	while (obj) {
		for (var prop in obj.properties) {
			if (obj.properties[prop].enumerable) {
				context.scope.putValue(left.name, context.scope.global.factory.createPrimitive(prop), false, context);
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

},{}],13:[function(require,module,exports){
"use strict";
function shouldContinue (context) {
	if (!context.node.test) {
		return true;
	}

	return context.create(context.node.test).execute().result.toBoolean();
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

},{}],14:[function(require,module,exports){
"use strict";
module.exports = function FunctionDeclaration (context) {
	return context.result(context.scope.getValue(context.node.id.name));
};

},{}],15:[function(require,module,exports){
"use strict";
module.exports = function FunctionExpression (context) {
	var ctor = context.scope.global.getValue("Function");
	var objectFactory = context.scope.global.factory;
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.scope, proto, ctor);

	return context.result(func);
};

},{}],16:[function(require,module,exports){
"use strict";
module.exports = function Identifier (context) {
	var name = context.node.name;
	var value = context.scope.getValue(name);

	if (value === undefined) {
		throw new ReferenceError(name + " is not defined.");
	}

	return context.reference(value, name);
};

},{}],17:[function(require,module,exports){
"use strict";
module.exports = function IfStatement (context) {
	var testValue = context.create(context.node.test).execute().result;
	if (testValue.toBoolean()) {
		return context.create(context.node.consequent).execute();
	}

	if (context.node.alternate) {
		return context.create(context.node.alternate).execute();
	}
};

},{}],18:[function(require,module,exports){
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

},{"./array-expression":4,"./assignment-expression":5,"./binary-expression":6,"./block-statement":7,"./call-expression":8,"./do-while-statement.js":9,"./empty-statement":10,"./expression-statement":11,"./for-in-statement":12,"./for-statement":13,"./function-declaration":14,"./function-expression":15,"./identifier":16,"./if-statement":17,"./interrupt-statement":19,"./labeled-statement":20,"./literal":21,"./logical-expression":22,"./member-expression":23,"./object-expression":24,"./return-statement":25,"./sequence-expression":26,"./switch-statement":27,"./this-expression":28,"./throw-statement":29,"./try-statement":30,"./unary-expression":31,"./update-expression":32,"./variable-declaration":33,"./variable-declarator":34,"./with-statement":35}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
"use strict";
module.exports = function LabeledStatement (context) {
	var label = context.node.label.name;
	var value = context.createLabel(context.node.body, label).execute();
	// if (value && (value.cancel || value.skip)) {
	// 	if (value.name === label) {
	// 		value.cancel = value.skip = false;
	// 	}
	// }

	return value;
};

},{}],21:[function(require,module,exports){
"use strict";
module.exports = function Literal (context) {
	if (context.node.value === "use strict") {
		context.scope.setStrict(true);
	}

	return context.result(context.scope.global.factory.createPrimitive(context.node.value));
};

},{}],22:[function(require,module,exports){
"use strict";
module.exports = function LogicalExpression (context) {
	var left = context.create(context.node.left).execute();
	var passed = left.result.toBoolean();
	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return context.create(context.node.right).execute();
};

},{}],23:[function(require,module,exports){
"use strict";
// var typeRegistry = require("../types/type-registry");

module.exports = function MemberExpression (context) {
	var obj = context.create(context.node.object).execute().result;
	var undef = context.scope.global.getValue("undefined");
	var name, value;

	if (context.node.computed) {
		name = context.create(context.node.property).execute().result.value;
		// value = obj.getProperty(name);
	} else {
		name = context.node.property.name;
		// value = context.create(context.node.property, context.node, obj).execute().result;
	}

	// if (obj.hasProperty(name)) {
	value = obj.getValue(name);
	// } else {
	// 	obj.setProperty(name, undef);
	// }

	return context.reference(value || undef, name, obj);
};

},{}],24:[function(require,module,exports){
"use strict";
var func = require("../utils/func");

function setDescriptor (context, obj, name, descriptor) {
	if (descriptor.get) {
		descriptor.getter = function () {
			return func.executeFunction(context, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		};
	}

	if (descriptor.set) {
		descriptor.setter = function () {
			return func.executeFunction(context, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		};
	}

	obj.defineOwnProperty(name, null, descriptor);
}

function createDescriptor () {
	return { configurable: true, enumerable: true, writable: true };
}

module.exports = function ObjectExpression (context) {
	var obj = context.scope.global.factory.createObject();
	var descriptors = Object.create(null);

	context.node.properties.forEach(function (property) {
		var value = context.create(property.value).execute().result;
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

},{"../utils/func":66}],25:[function(require,module,exports){
"use strict";
module.exports = function ReturnStatement (context) {
	if (context.node.argument) {
		return context.exit(context.create(context.node.argument).execute().result);
	}

	return context.exit(context.scope.global.getValue("undefined"));
};

},{}],26:[function(require,module,exports){
"use strict";
module.exports = function SequenceExpression (context) {
	var value;

	context.node.expressions.forEach(function (expr) {
		value = context.create(expr).execute();
	});

	return value;
};

},{}],27:[function(require,module,exports){
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
	var testValue = context.create(context.node.discriminant).execute().result;
	var passed = false;
	var caseValue, value, defaultCase;

	for (var i = 0, ln = context.node.cases.length; i < ln; i++) {
		if (!passed) {
			if (context.node.cases[i].test) {
				caseValue = context.create(context.node.cases[i].test).execute().result;
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

},{}],28:[function(require,module,exports){
"use strict";
module.exports = function ThisExpression (context) {
	return context.result(context.scope.thisNode);
};

},{}],29:[function(require,module,exports){
"use strict";
module.exports = function ThrowStatement (context) {
	// todo: handle more specific errors
	var arg = context.create(context.node.argument).execute().result;

	if (arg.isPrimitive) {
		throw arg.value;
	}

	var err = new Error(arg.getValue("message"));
	err.wrappedError = arg;
	throw err;
};

},{}],30:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var result;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			var scope = context.scope.createScope();
			var caughtError = err.wrappedError || context.scope.global.factory.createPrimitive(err);
			scope.putValue(context.node.handler.param.name, caughtError, false, context);

			result = context.create(context.node.handler.body, context.node.handler, scope).execute();
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

},{}],31:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var safeOperators = {
	"typeof": true,
	"delete": true
};

function getArgument (context) {
	if (safeOperators[context.node.operator]) {
		// when checking typeof the argument might not exist
		// todo: this is ugly - need to come up with better strategy
		try {
			return context.create(context.node.argument).execute();
		} catch (ex) {
			if (ex instanceof ReferenceError) {
				return undefined;
			}

			throw ex;
		}
	}

	return context.create(context.node.argument).execute();
}

module.exports = function UnaryExpression (context) {
	var result = getArgument(context);
	var objectFactory = context.scope.global.factory;
	var value = result && result.result;
	var newValue;

	switch (context.node.operator) {
		case "typeof":
			newValue = result ? objectFactory.createPrimitive(value.type) : objectFactory.createPrimitive("undefined");
			break;

		case "-":
			newValue = objectFactory.createPrimitive(-(convert.toNumber(context, value)));
			break;

		case "+":
			newValue = objectFactory.createPrimitive(+(convert.toNumber(context, value)));
			break;

		case "!":
			newValue = objectFactory.createPrimitive(!(value.isPrimitive ? value.toBoolean() : true));
			break;

		case "~":
			newValue = objectFactory.createPrimitive(~(convert.toPrimitive(context, value)));
			break;

		case "delete":
			var deleted = true;
			if (result) {
				if (result.reference && result.name !== null) {
					deleted = (result.object || context.scope).deleteProperty(result.name);
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
			throw new TypeError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};

},{"../utils/convert":65}],32:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

module.exports = function UpdateExpression (context) {
	var objectFactory = context.scope.global.factory;
	var executionResult = context.create(context.node.argument).execute();
	var originalValue = convert.toNumber(context, executionResult.result);
	var newValue = originalValue;

	switch (context.node.operator) {
		case "++":
			newValue++;
			break;

		case "--":
			newValue--;
			break;

		default:
			throw new Error("Unexpected update operator: " + context.node.operator);
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	var obj = executionResult.object || context.scope;
	var name = executionResult.name;
	var returnValue = context.node.prefix ? newValue : originalValue;

	obj.putValue(name, newValue, false, context);
	return context.result(returnValue, name, obj);
};

},{"../utils/convert":65}],33:[function(require,module,exports){
"use strict";
module.exports = function VariableDeclaration (context) {
	context.node.declarations.forEach(function (decl) {
		context.create(decl).execute();
	});

	return context.empty();
};

},{}],34:[function(require,module,exports){
"use strict";
module.exports = function VariableDeclarator (context) {
	var id = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.scope.putValue(id, value, false, context);
	}

	return context.result(value, id);
};

},{}],35:[function(require,module,exports){
"use strict";
module.exports = function WithStatement (context) {
	var obj = context.create(context.node.object).execute().result;

	// context.scope.startWith(obj);
	// var result = context.create(context.node.body).execute();
	// context.scope.endWith();

	var result = context.create(context.node.body, null, context.scope.withObject(obj)).execute();
	return result;
};

},{}],36:[function(require,module,exports){
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
		if (this[scope.version].indexOf(name) >= 0) {
			return true;
		}

		if (scope.strict && this[scope.version + "-strict"].indexOf >= 0) {
			return true;
		}

		return false;
	}
};

},{}],37:[function(require,module,exports){
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
	var scope = executionContext.scope.createScope(thisArg || executionContext.scope.global);
	var objectFactory = scope.global.factory;
	var args = [executionContext.node.getValue(index), objectFactory.createPrimitive(index), executionContext.node];

	func.loadArguments(callback.node.params, args, scope);
	var executionResult = executionContext.create(callback.node.body, callback.node, scope).execute();
	return executionResult ? executionResult.result : scope.global.getValue("undefined");
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var undef = scope.global.getValue("undefined");
	var objectFactory = scope.global.factory;
	var args = [priorValue || undef, executionContext.node.getValue(index) || undef, objectFactory.createPrimitive(index), executionContext.node];

	func.loadArguments(callback.node.params, args, scope);
	var executionResult = executionContext.create(callback.node.body, callback.node, scope).execute();
	return executionResult ? executionResult.result : undef;
}

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
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
		var start = convert.toUInt32(this, this.node.getValue("length"));

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
		var length = convert.toUInt32(this, this.node.getValue("length"));
		if (length) {
			obj = this.node.getValue(--length);
			this.node.deleteProperty(length);
		}

		this.node.putValue("length", objectFactory.createPrimitive(length || 0));
		return obj || this.scope.global.getValue("undefined");
	}, 0, "Array.prototype.pop"), propertyConfig);

	proto.defineOwnProperty("shift", objectFactory.createBuiltInFunction(function () {
		var obj;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var i = 0;

		if (length > 0) {
			obj = this.node.getValue(i);
			this.node.deleteProperty(i);

			while (++i < length) {
				if (this.node.hasProperty(i)) {
					this.node.putValue(i - 1, this.node.getValue(i));
				} else {
					this.node.deleteProperty(i);
				}
			}
		}

		this.node.putValue("length", objectFactory.createPrimitive(length === 0 ? 0 : --length));
		return obj || this.scope.global.getValue("undefined");
	}, 0, "Array.prototype.shift"), propertyConfig);

	proto.defineOwnProperty("unshift", objectFactory.createBuiltInFunction(function (elementN) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var count = arguments.length;
		var i = length || 0;

		while (i > 0) {
			if (this.node.hasProperty(i - 1)) {
				this.node.putValue(i + count - 1, this.node.getValue(i - 1));
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
		var length = convert.toUInt32(this, source.getValue("length"));
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
			arr.putValue(index++, source.getValue(i));
		}

		return arr;
	}, 2, "Array.prototype.slice"), propertyConfig);

	proto.defineOwnProperty("splice", objectFactory.createBuiltInFunction(function (start, deleteCount) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
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
				removed.putValue(k, this.node.getValue(k + start));
			}

			k++;
		}

		var newCount = arguments.length - 2;
		if (newCount < deleteCount) {
			k = start;

			while (k < length - deleteCount) {
				if (this.node.hasProperty(k + deleteCount)) {
					this.node.putValue(k + newCount, this.node.getValue(k + deleteCount));
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
					this.node.putValue(k + newCount - 1, this.node.getValue(k + deleteCount - 1));
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
				for (i = 0, length = current.getValue("length").value; i < length; i++) {
					newArray.putValue(index++, current.getValue(i));
				}
			} else {
				newArray.putValue(index++, current);
			}
		}

		return newArray;
	}, 1, "Array.prototype.concat"), propertyConfig);

	function join (separator) {
		var undef = this.scope.global.getValue("undefined");
		var length = convert.toUInt32(this, this.node.getValue("length"));
		separator = arguments.length === 0 || separator === undef ? "," : convert.toPrimitive(this, separator, "string");
		var stringValues = [];
		var stringValue;

		for (var i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getValue(i);
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
		var undef = this.scope.global.getValue("undefined");
		searchElement = searchElement || undef;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var index = arguments.length === 1 ? 0 : convert.toInteger(this, fromIndex);
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getValue(index) || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}, 1, "Array.prototype.indexOf"), propertyConfig);

	proto.defineOwnProperty("lastIndexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		var undef = this.scope.global.getValue("undefined");
		searchElement = searchElement || undef;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var index = arguments.length === 1 ? length - 1 : convert.toInteger(this, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getValue(index) || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"), propertyConfig);

	proto.defineOwnProperty("forEach", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}, 1, "Array.prototype.forEach"), propertyConfig);

	proto.defineOwnProperty("map", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
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
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.putValue(index++, this.node.getValue(i));
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"), propertyConfig);

	proto.defineOwnProperty("every", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		var length = convert.toUInt32(this, this.node.getValue("length"));
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

		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"), propertyConfig);

	proto.defineOwnProperty("reduce", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
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

			value = this.node.getValue(index++);
		}

		for (; index < length; index++) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduce"), propertyConfig);

	proto.defineOwnProperty("reduceRight", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var index = convert.toUInt32(this, this.node.getValue("length"));
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

			value = this.node.getValue(index--);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduceRight"), propertyConfig);

	proto.defineOwnProperty("reverse", objectFactory.createBuiltInFunction(function () {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var temp;

		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.getValue(length - i - 1);
			this.node.putValue(length - i - 1, this.node.getValue(i));
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
			var scope = executionContext.scope.createScope();

			func.loadArguments(compareFunction.node.params, [a, b], scope);
			return executionContext.create(compareFunction.node.body, compareFunction.node, scope).execute().result.value;
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

	globalScope.defineOwnProperty("Array", arrayClass, propertyConfig);
};

},{"../types/array-type":52,"../utils/contracts":64,"../utils/convert":65,"../utils/func":66}],38:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
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

	globalScope.defineOwnProperty("Boolean", booleanClass, propertyConfig);
};

},{"../utils/convert":65}],39:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var methods = ["log", "info", "error"];

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(console[name])));
	});

	globalScope.defineOwnProperty("console", consoleClass);
};

},{"../utils/convert":65}],40:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var staticMethods = ["now"];
var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString", "valueOf"];
var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var dateClass = objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			args = [convert.toPrimitive(this, arguments[0], "string")];
		} else {
			args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "number"); });
		}

		if (this.isNew) {
			switch (arguments.length) {
				case 0:
					dateValue = new Date();
					break;

				case 1:
					dateValue = new Date(arguments[0].value);
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

	dateClass.defineOwnProperty("parse", objectFactory.createFunction(function (value) {
		var stringValue = convert.toPrimitive(this, value, "string");
		var dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, globalScope), propertyConfig);

	dateClass.defineOwnProperty("UTC", objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "number"); });
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, globalScope), propertyConfig);

	var proto = dateClass.proto;

	staticMethods.forEach(function (name) {
		dateClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(Date[name])), propertyConfig);
	});

	protoMethods.forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(Date.prototype[name])), propertyConfig);
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

	globalScope.defineOwnProperty("Date", dateClass, propertyConfig);
};

},{"../utils/convert":65}],41:[function(require,module,exports){
"use strict";
var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");
		obj.putValue("message", message, false, this);
		obj.putValue("name", objectFactory.createPrimitive("Error"), false, this);
		return obj;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	errorClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var name = this.node.getValue("name");
		var msg = this.node.getValue("message");

		name = name && name.toString();
		msg = msg && msg.toString();

		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}), propertyConfig);

	globalScope.defineOwnProperty("Error", errorClass, propertyConfig);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.create("Error", { name: type });
			err.putValue("message", message, false, this);
			err.putValue("name", objectFactory.createPrimitive(type), false, this);
			return err;
		}, null, null, null, { configurable: false, enumerable: false, writable: false });

		globalScope.defineOwnProperty(type, errClass, propertyConfig);
	});
};

},{}],42:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");
var func = require("../utils/func");

var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope, options) {
	var objectFactory = globalScope.factory;
	// var proto = new ObjectType();
	var functionClass = objectFactory.createFunction(function () {
		var context = this;
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

			var fn = objectFactory.createFunction(fnNode, globalScope);
			fn.putValue("constructor", functionClass, false, this);
			return fn;
		}

		if (this.isNew) {
			this.node.putValue("constructor", functionClass, false, this);
			return this.node;
		}

		return objectFactory.createObject();
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = functionClass.proto;
	proto.defineOwnProperty("toString", objectFactory.createFunction(convert.toNativeFunction(Function.prototype.toString)), propertyConfig);
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
		var callee = this.node;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			func.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}), propertyConfig);

	globalScope.defineOwnProperty("Function", functionClass, propertyConfig);
};

},{"../utils/convert":65,"../utils/func":66}],43:[function(require,module,exports){
(function (global){
"use strict";
var Scope = require("./scope");
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

var globalFunctions = ["isNaN", "parseFloat", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"];
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (options) {
	var globalScope = new Scope();
	var objectFactory = new ObjectFactory(globalScope);

	var undefinedClass = new PrimitiveType(undefined);
	globalScope.defineOwnProperty("undefined", undefinedClass, { configurable: false, enumerable: false, writable: false });

	var nullClass = new PrimitiveType(null);
	globalScope.defineOwnProperty("null", nullClass, { configurable: false, writable: false });

	globalScope.defineOwnProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false, enumerable: false });
	globalScope.defineOwnProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false, enumerable: false });

	// todo: node vs browser - do we care?
	globalScope.defineOwnProperty("window", globalScope, { configurable: false, enumerable: true, writable: false });

	functionAPI(globalScope, options);
	objectAPI(globalScope, options);
	arrayAPI(globalScope, options);
	booleanAPI(globalScope, options);
	numberAPI(globalScope, options);
	stringAPI(globalScope, options);
	dateAPI(globalScope, options);
	regexAPI(globalScope, options);
	mathAPI(globalScope, options);
	errorAPI(globalScope, options);
	jsonAPI(globalScope, options);
	consoleAPI(globalScope, options);

	globalFunctions.forEach(function (name) {
		globalScope.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(global[name]), globalScope, null), propertyConfig);
	});

	globalScope.defineOwnProperty("parseInt", objectFactory.createFunction(function (value, radix) {
		value = convert.toPrimitive(this, value, "string");
		radix = convert.toPrimitive(this, radix, "number");

		return objectFactory.createPrimitive(parseInt(value, radix));
	}, globalScope, null), propertyConfig);

	if (options.parser) {
		var evalFunc = objectFactory.createFunction(function (code) {
			if (this.isNew) {
				throw new TypeError("function eval() is not a constructor");
			}

			if (!code) {
				return undefinedClass;
			}

			if (code.type !== "string") {
				return code;
			}

			var indirect = this.callee.name !== "eval";

			try {
				var ast = options.parser(code.toString());
			} catch (err) {
				if (err instanceof SyntaxError && /assigning to rvalue/i.test(err.message)) {
					// hack because acorn throws syntax error
					throw new ReferenceError("Invalid left-hand side in assignment");
				}

				throw err;
			}

			var executionResult = this.create(ast, null, indirect ? globalScope : this.scope.parent).execute();
			if (executionResult && executionResult.result) {
				return executionResult.result;
			}

			return undefinedClass;
		}, null, null);

		// evalFunc.parent = globalScope.getValue("Object");
		// evalFunc.setProto(null);
		globalScope.defineOwnProperty("eval", evalFunc, propertyConfig);
	}

	globalScope.setProto(globalScope.getValue("Object").proto);
	objectFactory.endScope();
	return globalScope;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../types/object-factory":57,"../types/primitive-type":59,"../utils/convert":65,"./array-api":37,"./boolean-api":38,"./console-api":39,"./date-api":40,"./error-api":41,"./function-api":42,"./json-api":44,"./math-api":45,"./number-api":46,"./object-api":47,"./regex-api":48,"./scope":49,"./string-api":50}],44:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var methods = ["parse", "stringify"];

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var jsonClass = objectFactory.createObject();
	jsonClass.className = "JSON";

	methods.forEach(function (name) {
		jsonClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(JSON[name])), { configurable: true, enumerable: false, writable: true });
	});

	globalScope.defineOwnProperty("JSON", jsonClass, { configurable: true, enumerable: false, writable: true });
};

},{"../utils/convert":65}],45:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var mathClass = objectFactory.createObject();
	mathClass.className = "Math";

	constants.forEach(function (name) {
		mathClass.defineOwnProperty(name, objectFactory.createPrimitive(Math[name]), { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(Math[name])), propertyConfig);
	});

	globalScope.defineOwnProperty("Math", mathClass, propertyConfig);
};

},{"../utils/convert":65}],46:[function(require,module,exports){
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

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var numberClass = objectFactory.createFunction(function (obj) {
		var numberValue = Number(convert.toPrimitive(this, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(numberValue, objectFactory);
		}

		return objectFactory.create("Number", numberValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = numberClass.proto;
	proto.className = "Number";

	proto.defineOwnProperty("toString", objectFactory.createFunction(function (radix) {
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
	}, globalScope), propertyConfig);

	proto.defineOwnProperty("toFixed", objectFactory.createFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = convert.toPrimitive(this, fractionDigits, "number");
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.toNumber(), digits));
	}, globalScope), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, globalScope), propertyConfig);

	constants.forEach(function (name) {
		numberClass.defineOwnProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(fn)), propertyConfig);
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(fn)), propertyConfig);
		}
	});

	globalScope.defineOwnProperty("Number", numberClass, propertyConfig);
};

},{"../utils/convert":65}],47:[function(require,module,exports){
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

	var undef = context.scope.global.getValue("undefined");
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
				var attrValue = descriptor.getValue(prop);
				options[prop] = !!(attrValue && attrValue.toBoolean());
			}
		});

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (hasGetter) {
			var getter = descriptor.getValue("get") || undef;
			if (getter.isPrimitive && getter.value === undefined) {
				options.get = options.getter = undefined;
			} else {
				if (getter.className !== "Function") {
					throw new TypeError("Getter must be a function: " + getter.toString());
				}

				options.get = getter;
				options.getter = function () {
					var getResult = func.getFunctionResult(context, getter, getter.node.params, [], this, getter.node);
					return getResult && getResult.exit ? getResult.result : undef;
				};
			}
		}

		if (hasSetter) {
			var setter = descriptor.getValue("set") || undef;
			if (setter.isPrimitive && setter.value === undefined) {
				options.set = options.setter = undefined;
			} else {
				if (setter.className !== "Function") {
					throw new TypeError("Setter must be a function: " + setter.toString());
				}

				options.set = setter;
				options.setter = function () {
					return func.executeFunction(context, setter, setter.node.params, arguments, this, setter.node);
				};
			}
		}

		if (hasValue) {
			options.value = descriptor.getValue("value") || undef;
		}
	}

	obj.defineOwnProperty(name, null, options, true, context);
}

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var undef = globalScope.getValue("undefined");

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
	}, globalScope, proto, null, { configurable: false, enumerable: false, writable: false });

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
		var obj = this.scope.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	proto.defineOwnProperty("toString", toStringFunc, propertyConfig);
	proto.defineOwnProperty("toLocaleString", toStringFunc, propertyConfig);

	proto.defineOwnProperty("isPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		var current = obj;
		while (current) {
			if (current === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			if (current.parent && current.parent.proto === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			current = current.proto; // && current.parent.proto;
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
					defineProperty(this, obj, prop, descriptors.getValue(prop));
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
				defineProperty(this, obj, prop, descriptors.getValue(prop));
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
		return obj.parent && obj.parent.proto || obj.proto || globalScope.getValue("null");
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

	globalScope.getValue("Function").parent = objectClass;
	globalScope.defineOwnProperty("Object", objectClass, propertyConfig);
};

},{"../types/object-type":58,"../utils/contracts":64,"../utils/convert":65,"../utils/func":66}],48:[function(require,module,exports){
"use strict";
var convert = require("../utils/convert");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var regexClass = objectFactory.createFunction(function (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			return pattern;
		}

		pattern = pattern && pattern.toString();
		flags = flags && flags.toString();

		return objectFactory.create("RegExp", new RegExp(pattern, flags));
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = regexClass.proto;
	proto.defineOwnProperty("test", objectFactory.createFunction(function (str) {
		var value = convert.toPrimitive(this, str, "string");
		return objectFactory.createPrimitive(this.node.source.test(value));
	}), propertyConfig);

	proto.defineOwnProperty("exec", objectFactory.createFunction(function (str) {
		var match = this.node.source.exec(str.toString());

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

		return this.scope.global.getValue("null");
	}), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var str = "/";
		str += this.node.getValue("source").toString();
		str += "/";

		if (this.node.getValue("global").toBoolean()) {
			str += "g";
		}

		if (this.node.getValue("ignoreCase").toBoolean()) {
			str += "i";
		}

		if (this.node.getValue("multiline").toBoolean()) {
			return str += "m";
		}

		return objectFactory.create("String", str);
	}), propertyConfig);

	proto.defineOwnProperty("compile", objectFactory.createFunction(convert.toNativeFunction(RegExp.prototype.compile)), propertyConfig);

	var frozen = { configurable: false, enumerable: false, writable: false };
	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createPrimitive(RegExp.prototype[name]), frozen);
	});

	globalScope.defineOwnProperty("RegExp", regexClass, propertyConfig);
};

},{"../utils/convert":65}],49:[function(require,module,exports){
"use strict";
var ObjectType = require("../types/object-type");
var keywords = require("../keywords");

function createDescriptor (value) {
	return {
		configurable: false,
		enumerable: true,
		writable: true,
		value: value
	};
}

function Scope (parent, thisNode) {
	ObjectType.call(this);

	this.parent = parent;
	this.thisNode = thisNode;

	if (parent) {
		this.thisNode = this.thisNode || parent.thisNode;
		this.global = parent.global;
		this.version = parent.version;
		this.strict = parent.strict;
		this.setProto(parent.proto);
	} else {
		this.thisNode = this.thisNode || this;
		this.global = this;
		this.version = "es5";
		this.strict = false;
	}
}

Scope.prototype = Object.create(ObjectType.prototype);
Scope.prototype.constructor = Scope;

Scope.prototype.getValue = function (name) {
	var current = this;

	while (current) {
		if (name in current.properties) {
			return current.properties[name].getValue(current);
		}

		current = current.parent;
	}

	return this.global.proto && this.global.proto.getValue(name);
};

Scope.prototype.defineOwnProperty = function (name, value, descriptor, throwOnError, context) {
	if (throwOnError) {
		if (keywords.isReserved(name, this)) {
			throw new SyntaxError("Unexpected token " + name);
		}
	}

	// add to current scope
	descriptor = descriptor || createDescriptor(value);
	ObjectType.prototype.defineOwnProperty.call(this, name, value, descriptor, context);
};

Scope.prototype.putValue = function (name, value, throwOnError, context) {
	// look for existing in scope and traverse up scope
	var current = this;
	while (current) {
		if (name in current.properties) {
			ObjectType.prototype.putValue.call(current, name, value, context);
			return;
		}

		current = current.parent;
	}

	this.defineOwnProperty(name, null, createDescriptor(value), throwOnError, context);
};

Scope.prototype.deleteProperty = function (name) {
	name = String(name);

	if (name in this.properties) {
		return ObjectType.prototype.deleteProperty.call(this, name);
	}

	if (this.parent) {
		return this.parent.deleteProperty(name);
	}

	return true;
};

Scope.prototype.getProperty = function (name) {
	name = String(name);

	var current = this;
	while (current) {
		if (name in current.properties) {
			return current.properties[name];
		}

		current = current.parent;
	}

	return this.global.proto && this.global.proto.getProperty(name);
};

// Scope.prototype.hasProperty = function (name) {
// 	// var current = this;
// 	// while (current) {
// 	// 	if (name in current.properties) {
// 	// 		return true;
// 	// 	}

// 	// 	current = current.parent;
// 	// }

// 	// return this.global.proto.hasProperty(name);

// 	// return false;
// };

Scope.prototype.createScope = function (thisNode) {
	return new Scope(this, thisNode);
};

Scope.prototype.withObject = function (obj) {
	var scope = new Scope(this);
	scope.properties = obj.properties;
	return scope;
};

Scope.prototype.setStrict = function (strict) {
	this.strict = strict;
};

module.exports = Scope;

},{"../keywords":36,"../types/object-type":58}],50:[function(require,module,exports){
"use strict";
var contracts = require("../utils/contracts");
var convert = require("../utils/convert");
var func = require("../utils/func");
var types = require("../utils/types");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "slice", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = String(convert.toPrimitive(this, value, "string"));

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(stringValue, objectFactory);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = stringClass.proto;

	proto.defineOwnProperty("search", objectFactory.createFunction(function (regex) {
		return objectFactory.createPrimitive(this.node.value.search(regex.source));
	}), propertyConfig);

	proto.defineOwnProperty("substring", objectFactory.createFunction(function (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		var value = convert.toPrimitive(this, this.node, "string");
		var length = value.length;

		start = convert.toInteger(this, start);
		end = types.isNullOrUndefined(end) ? length : convert.toInteger(this, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}), propertyConfig);

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(fn)), propertyConfig);
		}
	}, propertyConfig);

	stringClass.defineOwnProperty("fromCharCode", objectFactory.createFunction(function (charCode) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}), propertyConfig);

	proto.defineOwnProperty("split", objectFactory.createFunction(function (separator, limit) {
		separator = separator && (separator.source || separator.value);
		limit = limit && limit.toNumber();

		var result = this.node.value.split(separator, limit);
		var arr = objectFactory.create("Array");
		var context = this;

		result.forEach(function (value, index) {
			arr.putValue(index, objectFactory.createPrimitive(value), false, context);
		});

		return arr;
	}), propertyConfig);

	proto.defineOwnProperty("replace", objectFactory.createFunction(function (regexOrSubstr, substrOrFn) {
		var match = regexOrSubstr && (regexOrSubstr.source || regexOrSubstr.value);

		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var wrappedReplacer = function () {
				var scope = executionContext.scope.createScope();
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				func.loadArguments(substrOrFn.node.params, args, scope);
				var result = executionContext.create(substrOrFn.node.body, substrOrFn.node, scope).execute().result;
				return result && result.value;
			};

			return objectFactory.createPrimitive(this.node.value.replace(match, wrappedReplacer));
		}

		return objectFactory.createPrimitive(this.node.value.replace(match, substrOrFn && substrOrFn.value));
	}), propertyConfig);

	proto.defineOwnProperty("match", objectFactory.createFunction(function (regex) {
		var results = this.node.toString().match(regex && regex.source);
		if (results) {
			var matches = objectFactory.create("Array");
			var context = this;
			results.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value), false, context);
			});

			return matches;
		}

		return globalScope.getValue("null");
	}), propertyConfig);

	proto.defineOwnProperty("trim", objectFactory.createFunction(function () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		var value = convert.toPrimitive(this, this.node, "string");
		return objectFactory.createPrimitive(value.trim());
	}), propertyConfig);

	globalScope.defineOwnProperty("String", stringClass, propertyConfig);
};

},{"../utils/contracts":64,"../utils/convert":65,"../utils/func":66,"../utils/types":67}],51:[function(require,module,exports){
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

},{"./object-type":58}],52:[function(require,module,exports){
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
	var lengthValue = lengthProperty.getValue(arr).value;

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
	var currentLength = arr.getValue("length");
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

},{"../utils/contracts":64,"../utils/convert":65,"../utils/types":67,"./object-type":58}],53:[function(require,module,exports){
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

},{"./object-type":58}],54:[function(require,module,exports){
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

},{"./object-type":58}],55:[function(require,module,exports){
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
	proto.properties.constructor = new PropertyDescriptor({ configurable: true, enumerable: false, writable: true, value: ctor || this });
	this.setProto(proto, { configurable: true, enumerable: false, writable: true });
};

FunctionType.prototype.getOwnPropertyNames = function () {
	var props = ObjectType.prototype.getOwnPropertyNames.call(this);
	if ("prototype" in this.properties) {
		props.push("prototype");
	}

	return props;
};

FunctionType.prototype.createScope = function (currentScope, thisArg) {
	// if a parent scope is defined we need to limit the scope to that scope
	return (this.parentScope || currentScope).createScope(thisArg);
};

module.exports = FunctionType;

},{"./object-type":58,"./property-descriptor":60}],56:[function(require,module,exports){
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
	proto.properties.constructor = new PropertyDescriptor({ configurable: true, enumerable: false, writable: true, value: this });
	this.setProto(proto, descriptor || { configurable: false, enumerable: false, writable: true });
};

module.exports = NativeFunctionType;

},{"./function-type":55,"./property-descriptor":60}],57:[function(require,module,exports){
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

function setProto (typeName, instance, scope) {
	if (typeName in parentless) {
		return;
	}

	var parent = scope.getValue(typeName);
	if (parent) {
		instance.parent = parent;
		instance.setProto(parent.proto);
		return;
	}

	// during initialization it is possible for objects to be created
	// before the types have been registered - add a registry of items
	// and these can be filled in when the type is registered
	orphans[typeName] = orphans[typeName] || [];
	orphans[typeName].push(instance);
}

function ObjectFactory (globalScope) {
	this.scope = globalScope;
	globalScope.factory = this;
}

ObjectFactory.prototype = {
	constructor: ObjectFactory,

	endScope: function () {
		setOrphans(this.scope);
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
				typeName = value && value.name || typeName;
				instance = new ErrorType(value);
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.scope);
		return instance;
	},

	createObject: function (parent) {
		if (parent) {
			// special cases
			if (parent === this.scope.getValue("Date")) {
				return this.create("Date", new Date());
			}

			if (parent === this.scope.getValue("Array")) {
				return this.create("Array");
			}
		}

		// if (parent !== null) {
		// 	parent = parent || this.scope.getValue("Object");
		// }

		var instance = new ObjectType();
		if (parent !== null) {
			if (parent) {
				instance.parent = parent;
				instance.setProto(parent && parent.proto);
			} else {
				setProto("Object", instance, this.scope);
			}
		}

		instance.init(this);
		return instance;
	},

	createArguments: function (args, callee) {
		var instance = new ArgumentType();
		var objectClass = this.scope.getValue("Object");
		var i, ln;

		// instance.setProto(proto);
		instance.init(this, objectClass, objectClass.proto);
		instance.parent = objectClass;

		for (i = 0, ln = args.length; i < ln; i++) {
			instance.defineOwnProperty(i, args[i], { configurable: true, enumerable: true, writable: true });
		}

		instance.defineOwnProperty("length", this.createPrimitive(ln), { configurable: false, enumerable: false });
		instance.defineOwnProperty("callee", callee, { enumerable: false });
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
		var functionClass = this.scope.getValue("Function");
		if (functionClass) {
			instance.parent = functionClass;
			// for (var prop in functionClass.proto) {
			// 	instance.properties[prop] = functionClass.properties[prop];
			// }
			// instance.setProto(functionClass);
			// instance.parent = functionClass;
		} else {
			// delete instance.properties.prototype;
			// delete instance.proto;
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
		instance.parent = this.scope.getValue("Function");
		instance.defineOwnProperty("length", this.createPrimitive(length), { configurable: false, enumerable: false, writable: false });
		return instance;
	}
};

module.exports = ObjectFactory;

},{"../utils/types":67,"./argument-type":51,"./array-type":52,"./date-type":53,"./error-type":54,"./function-type":55,"./native-function-type":56,"./object-type":58,"./primitive-type":59,"./regex-type":61,"./string-type":62}],58:[function(require,module,exports){
"use strict";
var PropertyDescriptor = require("./property-descriptor");
var ValueReference = require("./value-reference");

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
		this.properties.prototype = new PropertyDescriptor(descriptor || { configurable: true, enumerable: false, writable: true }, proto);
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
			if (prop === "prototype" && this.properties[prop].getValue(this) === this.proto) {
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
				return;
			}

			if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
				this.properties[name] = new PropertyDescriptor(descriptor, value);
			} else {
				descriptor.setValue(this, value);
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
			this.properties[name] = new PropertyDescriptor(descriptor, value);
		}

		return true;
	},

	getValue: function (name) {
		var descriptor = this.getProperty(name);
		return descriptor && descriptor.getValue(this);
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

	createReference: function (name) {
		name = String(name);
		var descriptor = this.getProperty(name);
		if (descriptor) {
			return new ValueReference(name, this, descriptor);
		}

		return undefined;
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

},{"./property-descriptor":60,"./value-reference":63}],59:[function(require,module,exports){
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

PrimitiveType.prototype.getValue = function (name) {
	// can't read properties off null/undefined
	if (this.value == null) {
		throw new TypeError("Cannot read property '" + name + "' of " + this.type);
	}

	return ObjectType.prototype.getValue.apply(this, arguments);
};

// overwrite object methods
PrimitiveType.prototype.toBoolean = function () { return Boolean(this.value); };
PrimitiveType.prototype.toNumber = function () { return Number(this.value); };
PrimitiveType.prototype.toString = function () { return String(this.value); };
PrimitiveType.prototype.valueOf = function () { return this.value; };

module.exports = PrimitiveType;

},{"../utils/types":67,"./object-type":58}],60:[function(require,module,exports){
"use strict";
var contracts = require("../utils/contracts");

var defaultDescriptor = {
	configurable: true,
	enumerable: true,
	writable: true
};

function PropertyDescriptor (config, value) {
	config = config || defaultDescriptor;
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

PropertyDescriptor.prototype.getValue = function (obj) {
	if (this.getter || this.setter) {
		return this.getter ? this.getter.call(obj) : undefined;
	}

	return this.value;
};

PropertyDescriptor.prototype.setValue = function (obj, value) {
	if (!this.canSetValue()) {
		return;
	}

	if (this.getter || this.setter) {
		if (this.setter) {
			this.setter.call(obj, value);
		}

		return;
	}

	this.value = value;
};

PropertyDescriptor.prototype.canSetValue = function () {
	return this.writable || !!this.setter;
};

module.exports = PropertyDescriptor;

},{"../utils/contracts":64}],61:[function(require,module,exports){
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

},{"./object-type":58}],62:[function(require,module,exports){
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
	this.properties.length = new PropertyDescriptor({ configurable: false, enumerable: false, writable: false }, objectFactory.createPrimitive(this.value.length));
};

StringType.prototype.getProperty = function (name) {
	if (types.isInteger(name)) {
		var position = Number(name);
		if (position < this.value.length) {
			return new PropertyDescriptor({ configurable: false, enumerable: true, writable: false, value: getCharacter(this, position) });
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
	if (types.isInteger(name)) {
		return getCharacter(this, Number(name));
	}

	return PrimitiveType.prototype.getValue.call(this, name);
};

module.exports = StringType;

},{"../utils/types":67,"./primitive-type":59,"./property-descriptor":60}],63:[function(require,module,exports){
"use strict";
function ValueReference (name, obj, descriptor) {
	this.name = name;
	this.object = obj;
	this.descriptor = descriptor;
	this.reference = true;
}

ValueReference.prototype.getValue = function () {
	return this.descriptor.getValue(this.object);
};

ValueReference.prototype.setValue = function (obj, value) {
	return this.descriptor.setValue(this.object, value);
};

ValueReference.prototype.canSetValue = function () {
	return this.descriptor.canSetValue();
};

module.exports = ValueReference;

},{}],64:[function(require,module,exports){
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

},{"./types":67}],65:[function(require,module,exports){
"use strict";
var func = require("./func");

var floor = Math.floor;
var abs = Math.abs;

function sign (value) {
	return value < 0 ? -1 : 1;
}

function getString (executionContext, value) {
	if (!value) {
		return "";
	}

	if (value.isPrimitive || "value" in value) {
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

	if (value.isPrimitive || "value" in value) {
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
		if (obj.isPrimitive && obj.type !== "object") {
			return this.primitiveToObject(obj.value, factory);
		}

		return obj;
	},

	toArray: function (obj) {
		var arr = [];

		if (obj) {
			var ln = obj.getValue("length").value;
			var i = 0;

			while (i < ln) {
				if (i in obj.properties) {
					arr.push(obj.getValue(i));
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

	toNumber: function (executionContext, obj) {
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

	toNativeFunction: function (fn) {
		var nativeFunction = function () {
			if (this.isNew) {
				throw new TypeError(fn.name + " is not a constructor.");
			}

			var scope = this && this.node && this.node.value;
			var args = getValues(this, arguments);

			var value = fn.apply(scope, args);
			return this.scope.global.factory.createPrimitive(value);
		};

		nativeFunction.nativeLength = fn.length;
		return nativeFunction;
	}
};

},{"./func":66}],66:[function(require,module,exports){
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
		var obj = scope.global.factory.createPrimitive(thisArg.value);
		obj.isPrimitive = false;
		obj.type = "object";
		obj.toBoolean = function () { return true; };
		return obj;
	}

	return thisArg;
}

module.exports = {
	executeFunction: function (context, fn, params, args, thisArg, callee, isNew) {
		thisArg = defineThis(context.scope, thisArg, isNew);
		var newScope = fn.createScope(context.scope, thisArg);
		var returnResult;

		if (isNew) {
			returnResult = thisArg;
		}

		this.loadArguments(params, args, newScope, fn);

		if (fn.native) {
			returnResult = fn.nativeFunction.apply(context.create(newScope.thisNode, callee, newScope, isNew), args) || returnResult;
		} else {
			var executionResult = context.create(fn.node.body, callee, newScope, isNew).execute();
			if (isNew && executionResult && executionResult.exit && executionResult.result && !executionResult.result.isPrimitive) {
				returnResult = executionResult.result;
			} else {
				returnResult = returnResult || (executionResult && executionResult.result);
			}
		}

		return returnResult || context.scope.global.getValue("undefined");
	},

	getFunctionResult: function (context, fn, params, args, thisArg, callee) {
		thisArg = defineThis(context.scope, thisArg);
		var newScope = fn.createScope(context.scope, thisArg);

		this.loadArguments(params, args, newScope, fn);

		if (fn.native) {
			return fn.nativeFunction.apply(context.create(newScope.thisNode, callee, newScope), args);
		}

		return context.create(fn.node.body, callee, newScope).execute();
	},

	loadArguments: function (params, args, scope, callee) {
		var undef = scope.global.getValue("undefined");
		var argumentList = scope.global.factory.createArguments(args);
		scope.defineOwnProperty("arguments", argumentList);

		params.forEach(function (param, index) {
			var ref = argumentList.createReference(index);

			// check for existence in case of duplicates - first one wins
			scope.defineOwnProperty(param.name, ref || undef);
		});
	},

	callMethod: function (obj, name, args, executionContext) {
		var method = obj.getValue(name);

		if (method && method.className === "Function") {
			var scope = executionContext.scope.createScope(obj);

			if (method.native) {
				return method.nativeFunction.apply(executionContext.create(obj, obj, scope), args);
			} else {
				this.loadArguments(method.node.params, args, scope);

				var executionResult = executionContext.create(method.node.body, method.node, scope).execute();
				return executionResult ? executionResult.result : scope.global.getValue("undefined");
			}
		}

		return null;
	}
};

},{}],67:[function(require,module,exports){
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