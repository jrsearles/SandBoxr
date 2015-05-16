(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ExecutionContext = require("./execution-context");

function SandBoxr (ast) {
	this.ast = ast;
	this.scope = null;
}

SandBoxr.prototype.execute = function (context) {
	context = context || new ExecutionContext(this, this.ast, null, this.scope || (this.scope = globalScope()));

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxr.prototype.createScope = function () {
	return (this.scope = globalScope());
};

module.exports = SandBoxr;

},{"./execution-context":2,"./handlers":18,"./scope/global-scope":40}],2:[function(require,module,exports){
"use strict";
var ExecutionResult = require("./execution-result");

function ExecutionContext (runner, node, callee, scope) {
	this.runner = runner;
	this.node = node;
	this.callee = callee;
	this.scope = scope;
	this.label = null;

	this.trying = false;
	this.errorHandler = null;
}

ExecutionContext.prototype.execute = function () {
	return this.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, scope) {
	var context = new ExecutionContext(this.runner, node, callee, scope || this.scope);
	context.trying = this.trying;
	context.errorHandler = this.errorHandler;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = new ExecutionContext(this.runner, node, null, this.scope);
	context.label = label;
	context.trying = this.trying;
	context.errorHandler = this.errorHandler;
	return context;
};

ExecutionContext.prototype.beginTry = function (errorHandler) {
	this.trying = true;
	this.errorHandler = errorHandler;
};

ExecutionContext.prototype.endTry = function () {
	this.trying = false;
	this.errorHandler = null;
};

ExecutionContext.prototype.handleError = function (err) {
	if (!this.errorHandler) {
		throw err;
	}

	this.errorHandler(err);
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

module.exports = ExecutionResult;

},{}],4:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function ArrayExpression (context) {
	var arr = objectFactory.create("ARRAY");

	if (context.node.elements) {
		context.node.elements.forEach(function (element, index) {
			arr.setProperty(index, context.create(element).execute().result);
		});
	}

	return context.result(arr);
};

},{"../types/object-factory":51}],5:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

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
	var left = context.create(context.node.left).execute();
	var right = context.create(context.node.right).execute();
	var newValue;

	if (context.node.operator === "=") {
		newValue = right.result;
	} else {
		newValue = objectFactory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));
	}

	var obj = left.object || context.scope;
	var name = left.name;

	obj.setProperty(name, newValue);
	return context.result(newValue, name);
};

},{"../types/object-factory":51}],6:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": function (a, b) { return a.value + b.value; },
	"-": function (a, b) { return a.value - b.value; },
	"/": function (a, b) { return a.value / b.value; },
	"*": function (a, b) { return a.value * b.value; },
	"==": function (a, b) { return a.value == b.value; },
	"!=": function (a, b) { return a.value != b.value; },
	"===": function (a, b) { return a.equals(b); },
	"!==": function (a, b) { return !a.equals(b); },
	"<": function (a, b) { return a.value < b.value; },
	"<=": function (a, b) { return a.value <= b.value; },
	">": function (a, b) { return a.value > b.value; },
	">=": function (a, b) { return a.value >= b.value; },
	"<<": function (a, b) { return a.value << b.value; },
	">>": function (a, b) { return a.value >> b.value; },
	">>>": function (a, b) { return a.value >>> b.value; },
	"%": function (a, b) { return a.value % b.value; },
	"|": function (a, b) { return a.value | b.value; },
	"^": function (a, b) { return a.value ^ b.value; },
	"&": function (a, b) { return a.value & b.value; },
	"in": function (a, b) { return b.hasProperty(a.toString()); },
	"instanceof": function (a, b) {
		var current = a;
		while (current) {
			if (current === b.proto) {
				return true;
			}

			current = current.parent && current.parent.proto;
		}

		return false;
	}
};

module.exports = function BinaryExpression (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right);

	return context.result(objectFactory.createPrimitive(newValue));
};

},{"../types/object-factory":51}],7:[function(require,module,exports){
"use strict";
var typeRegistry = require("../types/type-registry");
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

		if (scopedBlock[node.type]) {
			return;
		}
	}

	// todo: we could be smarter about this by being more descerning about what nodes we traverse
	var prop, current;
	for (prop in node) {
		if (node.hasOwnProperty(prop) && node[prop] && typeof prop[node] === "object") {
			populateHoistedVariables(current, declarators);
		}
	}
}

function hoistVariables (nodes, scope) {
	var undef = typeRegistry.get("undefined");
	var variables = [];
	populateHoistedVariables(nodes, variables);

	variables.forEach(function (decl) {
		if (!scope.hasProperty(decl.id.name)) {
			scope.setProperty(decl.id.name, undef);
		}
	});
}

module.exports = function BlockStatement (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	hoistVariables(context.node.body, context.scope);

	for (; i < ln; i++) {
		try {
			result = context.create(context.node.body[i]).execute();
		} catch (err) {
			context.handleError(err);
			break;
		}

		if (result && (result.cancel || result.skip || result.exit)) {
			break;
		}
	}

	return result;
};

},{"../types/type-registry":56}],8:[function(require,module,exports){
"use strict";
var FunctionType = require("../types/function-type");
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";
	var newObj, executionResult;

	var fn = context.create(node.callee).execute();
	if (!fn.result || !(fn.result instanceof FunctionType)) {
		throw new TypeError(fn.result.toString() + " not a function");
	}

	if (isNew && !fn.result.native) {
		newObj = objectFactory.createObject(fn.result);
	}

	var newScope = fn.result.createScope(context.scope, newObj || fn.object);
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	utils.loadArguments(fn.result.native ? [] : fn.result.node.params, args, newScope);

	if (fn.result.native) {
		executionResult = fn.result.nativeFunction.apply(context.create(newScope.thisNode, newScope.thisNode, newScope), args);
	} else {
		executionResult = context.create(fn.result.node.body, fn.result.node, newScope).execute();
		executionResult = executionResult && executionResult.result;
	}

	return context.result(newObj || executionResult || typeRegistry.get("undefined"));
};

},{"../types/function-type":49,"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],9:[function(require,module,exports){
"use strict";
module.exports = function DoWhileStatement (context) {
	var result;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = context.create(context.node.test).execute().result.toBoolean();
	}

	while (passed) {
		result = context.create(context.node.body).execute();
		passed = context.create(context.node.test).execute().result.toBoolean();
	}

	return result;
};

},{}],10:[function(require,module,exports){
"use strict";
module.exports = function EmptyStatement () { };

},{}],11:[function(require,module,exports){
"use strict";
module.exports = 	function ExpressionStatement (context) {
	return context.create(context.node.expression).execute();
};

},{}],12:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function ForInStatement (context) {
	var left = context.create(context.node.left).execute();
	var obj = context.create(context.node.right).execute().result;
	var value;

	while (obj) {
		for (var prop in obj.properties) {
			if (obj.enumerable[prop]) {
				context.scope.setProperty(left.name, objectFactory.createPrimitive(prop));
				value = context.create(context.node.body).execute();
			}
		}

		obj = obj.parent && obj.parent.proto;
	}

	return value;
};

},{"../types/object-factory":51}],13:[function(require,module,exports){
"use strict";
module.exports = function ForStatement (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var passed = !context.node.test || context.create(context.node.test).execute().result.toBoolean();
	var bodyValue;

	while (passed) {
		bodyValue = context.create(context.node.body).execute();
		if (bodyValue && (bodyValue.cancel || bodyValue.skip)) {
			if (bodyValue.name && bodyValue.name !== context.label) {
				break;
			}

			if (bodyValue.cancel) {
				bodyValue.cancel = false;
				return bodyValue;
			}
		}

		if (context.node.update) {
			context.create(context.node.update).execute();
		}

		passed = !context.node.test || context.create(context.node.test).execute().result.toBoolean();
	}

	return bodyValue;
};

},{}],14:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function FunctionDeclaration (context) {
	var id = context.node.id.name;
	var fn = objectFactory.createFunction(context.node, context.scope);

	context.scope.setProperty(id, fn);
	return context.result(fn);
};

},{"../types/object-factory":51}],15:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function FunctionExpression (context) {
	return context.result(objectFactory.createFunction(context.node, context.scope));
};

},{"../types/object-factory":51}],16:[function(require,module,exports){
"use strict";
module.exports = function Identifier (context) {
	var name = context.node.name;
	var value = context.scope.getProperty(name);
	return context.result(value, name);
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

module.exports = handlers;

},{"./array-expression":4,"./assignment-expression":5,"./binary-expression":6,"./block-statement":7,"./call-expression":8,"./do-while-statement.js":9,"./empty-statement":10,"./expression-statement":11,"./for-in-statement":12,"./for-statement":13,"./function-declaration":14,"./function-expression":15,"./identifier":16,"./if-statement":17,"./interrupt-statement":19,"./labeled-statement":20,"./literal":21,"./logical-expression":22,"./member-expression":23,"./object-expression":24,"./return-statement":25,"./sequence-expression":26,"./switch-statement":27,"./this-expression":28,"./throw-statement":29,"./try-statement":30,"./unary-expression":31,"./update-expression":32,"./variable-declaration":33,"./variable-declarator":34}],19:[function(require,module,exports){
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
var objectFactory = require("../types/object-factory");

module.exports = function Literal (context) {
	return context.result(objectFactory.createPrimitive(context.node.value));
};

},{"../types/object-factory":51}],22:[function(require,module,exports){
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
var typeRegistry = require("../types/type-registry");

module.exports = function MemberExpression (context) {
	var obj = context.create(context.node.object).execute().result;
	var name, value;

	if (context.node.computed) {
		name = context.create(context.node.property).execute().result.value;
		value = obj.getProperty(name);
	} else {
		name = context.node.property.name;
		value = context.create(context.node.property, context.node, obj).execute().result;
	}

	return context.result(value || typeRegistry.get("undefined"), name, obj);
};

},{"../types/type-registry":56}],24:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function ObjectExpression (context) {
	var obj = objectFactory.createObject();

	context.node.properties.forEach(function (prop) {
		var value = context.create(prop.value).execute().result;
		obj.setProperty(prop.key.name || prop.key.value, value);
	});

	return context.result(obj);
};

},{"../types/object-factory":51}],25:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function ReturnStatement (context) {
	var returnValue = context.node.argument ? context.create(context.node.argument).execute().result : objectFactory.getType("undefined");
	return context.exit(returnValue);
};

},{"../types/object-factory":51}],26:[function(require,module,exports){
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
	var caseValue, value;

	for (var i = 0, ln = context.node.cases.length; i < ln; i++) {
		if (!passed && context.node.cases[i].test) {
			caseValue = context.create(context.node.cases[i].test).execute().result;
			if (!caseValue.equals(testValue)) {
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
	throw new Error(arg.getProperty("message"));
};

},{}],30:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var result;

	function errorHandler (err) {
		context.endTry();

		if (err && context.node.handler) {
			var scope = context.scope.createScope();
			scope.setProperty(context.node.handler.param.name, objectFactory.createPrimitive(err));

			result = context.create(context.node.handler.body, context.node.handler, scope).execute();
		}

		if (context.node.finalizer) {
			context.create(context.node.finalizer).execute();
		}

		return result;
	}

	context.beginTry(errorHandler);
	result = context.create(context.node.block).execute();

	errorHandler();
	return result;
};

},{"../types/object-factory":51}],31:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function UnaryExpression (context) {
	var result = context.create(context.node.argument).execute();
	var value = result.result;
	var newValue;

	switch (context.node.operator) {
		case "typeof":
			newValue = objectFactory.createPrimitive(value.type);
			break;

		case "-":
			newValue = objectFactory.createPrimitive(-value.toNumber());
			break;

		case "+":
			newValue = objectFactory.createPrimitive(value.toNumber());
			break;

		case "!":
			newValue = objectFactory.createPrimitive(!value.toBoolean());
			break;

		case "~":
			newValue = objectFactory.createPrimitive(~value.toNumber());
			break;

		case "delete":
			newValue = objectFactory.createPrimitive(result.object.deleteProperty(result.name));
			break;

		case "void":
			newValue = objectFactory.createPrimitive(undefined);
			break;

		default:
			throw new TypeError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};

},{"../types/object-factory":51}],32:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function UpdateExpression (context) {
	var obj = context.create(context.node.argument).execute().result;
	var originalValue = obj.value;
	var newValue = obj.value;
	var returnValue;

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

	obj.value = newValue;
	returnValue = objectFactory.createPrimitive(context.node.prefix ? newValue : originalValue);
	return context.result(returnValue, null, obj);
};

},{"../types/object-factory":51}],33:[function(require,module,exports){
"use strict";
module.exports = function VariableDeclaration (context) {
	var value;

	context.node.declarations.forEach(function (decl) {
		value = context.create(decl).execute();
	});

	return value;
};

},{}],34:[function(require,module,exports){
"use strict";
var typeRegistry = require("../types/type-registry");

module.exports = function VariableDeclarator (context) {
	var id = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	value = value || typeRegistry.get("undefined");
	context.scope.setProperty(id, value);

	return context.result(value, id);
};

},{"../types/type-registry":56}],35:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var ArrayType = require("../types/array-type");
var typeRegistry = require("../types/type-registry");

var slice = Array.prototype.slice;

function getStartIndex (index, length) {
	if (index < 0) {
		return Math.max(length - Math.abs(index), 0);
	}

	return Math.min(index || 0, length);
}

function executeCallback (callback, thisArg, executionContext, index) {
	// if (callback.type !== "function") {
	// 	throw new TypeError();
	// }

	var scope = executionContext.scope.createScope(thisArg);
	var args = [executionContext.node.properties[index], objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var args = [priorValue, executionContext.node.properties[index], objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

module.exports = function (globalScope) {
	var arrayClass = objectFactory.createFunction(utils.wrapNative(Array));
	var proto = arrayClass.getProperty("prototype");

	arrayClass.setProperty("isArray", objectFactory.createFunction(function (obj) {
		return globalScope.createPrimitive(obj instanceof ArrayType);
	}));

	proto.setProperty("push", objectFactory.createFunction(function () {
		var start = this.node.getProperty("length").value || 0;

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.setProperty(start + i, arguments[i]);
		}

		return this.node.getProperty("length");
	}));

	proto.setProperty("pop", objectFactory.createFunction(function () {
		var index = this.node.getProperty("length").value;
		var obj = this.node.getProperty(--index) || objectFactory.createPrimitive(undefined);

		// need to update length manually - deleting an item does not update length per spec
		if (index >= 0) {
			this.node.setProperty("length", objectFactory.createPrimitive(index));
		}

		return obj;
	}));

	proto.setProperty("shift", objectFactory.createFunction(function () {
		var obj = this.node.getProperty(0);

		var i = 1;
		var length = this.node.getProperty("length").value;
		for (; i < length; i++) {
			this.node.properties[i - 1] = this.node.properties[i];
		}

		this.node.setProperty("length", objectFactory.createPrimitive(--length));
		return obj;
	}));

	proto.setProperty("unshift", objectFactory.createFunction(function () {
		var i = this.node.getProperty("length").value;
		var length = arguments.length;

		while (i--) {
			this.node.setProperty(i + length, this.node.properties[i]);
		}

		for (; i < length; i++) {
			this.node.setProperty(i, arguments[i]);
		}

		return this.node.getProperty("length");
	}));

	proto.setProperty("slice", objectFactory.createFunction(function (begin, end) {
		begin = begin ? begin.toNumber() : 0;
		end = end ? end.toNumber() : this.node.properties.length.value;

		var arr = objectFactory.create("ARRAY");

		// since slice is generic we can just call it against our properties object which is array-like enough
		slice.call(this.node.properties, begin, end).forEach(function (element, index) {
			arr.setProperty(index, element);
		});

		return arr;
	}));

	proto.setProperty("splice", objectFactory.createFunction(function (start, deleteCount) {
		start = start.toNumber();
		deleteCount = deleteCount.toNumber();

		var removed = objectFactory.create("ARRAY");
		var length = this.node.properties.length.value;
		var newCount = arguments.length - 2;
		var i, j = 0;

		start = getStartIndex(start, length);
		deleteCount = Math.min(deleteCount, length - start);

		for (i = start; i < start + deleteCount; i++) {
			removed.setProperty(j++, this.node.properties[i]);
			this.node.properties[i] = this.node.properties[i + deleteCount];
		}

		this.node.setProperty("length", objectFactory.createPrimitive(length - deleteCount));

		if (newCount > 0) {
			i = this.node.properties.length.value + newCount;
			while (i-- > start) {
				this.node.setProperty(i, this.node.properties[i - newCount]);
			}

			i = 0;
			while (i++ < newCount) {
				this.node.setProperty(start++, arguments[i + 1]);
			}
		}

		return removed;
	}));

	proto.setProperty("concat", objectFactory.createFunction(function () {
		var newArray = objectFactory.create("ARRAY");
		var arrays = slice.call(arguments);

		// add "this" array to bunch
		arrays.unshift(this.node);

		var current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof ArrayType) {
				for (i = 0, length = current.properties.length.value; i < length; i++) {
					newArray.setProperty(index++, current.properties[i]);
				}
			} else {
				newArray.setProperty(index++, current);
			}
		}

		return newArray;
	}));

	proto.setProperty("join", objectFactory.createFunction(function (separator) {
		separator = arguments.length === 0 ? "," : separator.toString();
		var stringValues = [];

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			stringValues.push(this.node.properties[i].toString());
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}));

	proto.setProperty("indexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var index = arguments.length === 1 ? 0 : fromIndex.toNumber();
		var length = this.node.properties.length.value;
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (index in this.node.properties && searchElement.equals(this.node.properties[index])) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}));

	proto.setProperty("lastIndexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var length = this.node.properties.length.value;
		var index = arguments.length === 1 ? length : fromIndex.toNumber();

		if (index < 0) {
			index = length - Math.abs(index);
		}

		while (index-- > 0) {
			if (index in this.node.properties && searchElement.equals(this.node.properties[index])) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}));

	proto.setProperty("forEach", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}));

	proto.setProperty("map", objectFactory.createFunction(function (callback, thisArg) {
		var newArray = objectFactory.create("ARRAY");

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties) {
				newArray.setProperty(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}));

	proto.setProperty("filter", objectFactory.createFunction(function (callback, thisArg) {
		var newArray = objectFactory.create("ARRAY");
		var index = 0;

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.setProperty(index++, this.node.properties[i]);
			}
		}

		return newArray;
	}));

	proto.setProperty("every", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}));

	proto.setProperty("some", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}));

	proto.setProperty("reduce", objectFactory.createFunction(function (callback, initialValue) {
		if (callback.type !== "function") {
			throw new TypeError();
		}

		var length = this.node.properties.length.value;
		var index = 0;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index < length && !(index in this.node.properties)) {
				index++;
			}

			if (index >= length) {
				throw new TypeError("Reduce of empty array with no initial value");
			}

			value = this.node.properties[index++];
		}

		for (; index < length; index++) {
			if (index in this.node.properties) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}));

	proto.setProperty("reduceRight", objectFactory.createFunction(function (callback, initialValue) {
		var index = this.node.properties.length.value - 1;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index >= 0 && !(index in this.node.properties)) {
				index--;
			}

			value = this.node.properties[index--];
		}

		for (; index >= 0; index--) {
			if (index in this.node.properties) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}));

	proto.setProperty("reverse", objectFactory.createFunction(function () {
		var length = this.node.properties.length.value;
		var temp;
		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.properties[length - i - 1];
			this.node.properties[length - i - 1] = this.node.properties[i];
			this.node.properties[i] = temp;
		}

		return this.node;
	}));

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

	proto.setProperty("sort", objectFactory.createFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.scope.createScope();

			utils.loadArguments(compareFunction.node.params, [a, b], scope);
			return executionContext.create(compareFunction.node.body, compareFunction.node, scope).execute().result.value;
		};

		// convert to array, run the wrapped comparer, then re-assign indexes
		slice.call(arr.properties)
			.sort(wrappedComparer || defaultComparer)
			.forEach(function (element, index) {
				arr.properties[index] = element;
			});

		return arr;
	}));

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.setProperty("toString", proto.properties.join);

	typeRegistry.set("ARRAY", arrayClass);
	globalScope.setProperty("Array", arrayClass);
};

},{"../types/array-type":47,"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],36:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var booleanClass = objectFactory.createFunction(utils.wrapNative(Boolean));
	typeRegistry.set("Boolean", booleanClass);
	globalScope.setProperty("Boolean", booleanClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],37:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var dateClass = objectFactory.createFunction(utils.wrapNative(Date));
	typeRegistry.set("DATE", dateClass);
	globalScope.setProperty("Date", dateClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],38:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError"];

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.createObject();
		obj.setProperty("message", message);
		return obj;
	});

	typeRegistry.set("Error", errorClass);
	globalScope.setProperty("Error", errorClass);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.createObject(errorClass);
			err.setProperty("message", message);
			return err;
		});

		typeRegistry.set(type, errClass);
		globalScope.setProperty(type, errClass);
	});
};

},{"../types/object-factory":51,"../types/type-registry":56}],39:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var slice = Array.prototype.slice;

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(utils.wrapNative(Function));
	var proto = functionClass.getProperty("prototype");

	proto.setProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)));
	proto.setProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)));

	proto.setProperty("call", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}));

	proto.setProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		var args = argsArray ? slice.call(argsArray.properties) : [];
		var scope = this.scope.createScope(thisArg);

		utils.loadArguments(this.callee.node.params, args, scope);
		return this.create(this.callee.node.body, this.callee, scope).execute().result;
	}));

	proto.setProperty("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var callee = this.callee;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			utils.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}));

	typeRegistry.set("Function", functionClass);
	globalScope.setProperty("Function", functionClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],40:[function(require,module,exports){
"use strict";
var Scope = require("./scope");
var PrimitiveType = require("../types/primitive-type");
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
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

module.exports = function () {
	// var globalObject = new ObjectType();
	var scope = new Scope();
	// scope.thisNode = scope;

	var undefinedClass = new PrimitiveType(undefined);
	scope.setProperty("undefined", undefinedClass);
	typeRegistry.set("UNDEFINED", undefinedClass);

	var nullClass = new PrimitiveType(null);
	scope.setProperty("null", nullClass, { configurable: false, writable: false });
	typeRegistry.set("NULL", nullClass);

	// set globals
	scope.setProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false });
	scope.setProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false });

	// todo: node vs browser - do we care?
	scope.setProperty("window", scope, { configurable: false, writable: false });

	// create function
	functionAPI(scope);
	objectAPI(scope);
	arrayAPI(scope);
	booleanAPI(scope);
	numberAPI(scope);
	stringAPI(scope);
	dateAPI(scope);
	regexAPI(scope);
	mathAPI(scope);
	errorAPI(scope);

	return scope;
};

},{"../types/object-factory":51,"../types/primitive-type":53,"../types/type-registry":56,"./array-api":35,"./boolean-api":36,"./date-api":37,"./error-api":38,"./function-api":39,"./math-api":41,"./number-api":42,"./object-api":43,"./regex-api":44,"./scope":45,"./string-api":46}],41:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

module.exports = function (globalScope) {
	var mathClass = objectFactory.createObject();

	constants.forEach(function (name) {
		mathClass.setProperty(name, objectFactory.createPrimitive(Math[name]), { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(Math[name])));
	});

	globalScope.setProperty("Math", mathClass);
};

},{"../types/object-factory":51,"../utils":57}],42:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toFixed", "toPrecision", "toString"];
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

module.exports = function (globalScope) {
	var numberClass = objectFactory.createFunction(function (value) {
		if (!value) {
			return objectFactory.createPrimitive(0);
		}

		if (!value.isPrimitive) {
			var primitiveValue = utils.callMethod(value, "valueOf", [], this);
			if (!primitiveValue || !primitiveValue.isPrimitive) {
				primitiveValue = utils.callMethod(value, "toString", [], this) || primitiveValue;
			}

			if (primitiveValue && !primitiveValue.isPrimitive) {
				throw new TypeError("Cannot convert object to primitive");
			}

			value = primitiveValue;
		}

		return objectFactory.createPrimitive(value.toNumber());
	});

	var proto = numberClass.getProperty("prototype");

	constants.forEach(function (name) {
		numberClass.setProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	typeRegistry.set("NUMBER", numberClass);
	globalScope.setProperty("Number", numberClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],43:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var objectClass = objectFactory.createFunction(function () {
		return objectFactory.createObject();
	});

	var proto = objectClass.getProperty("prototype");
	proto.setProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		// var hasOwn = name in this.node.properties || (this.node.parent && this.node.parent.proto && name in this.node.parent.proto.properties);
		return objectFactory.createPrimitive(name in this.node.properties);
	}), { enumerable: false });

	proto.setProperty("valueOf", objectFactory.createFunction(function () {
		return this.node;
	}));

	objectClass.setProperty("create", objectFactory.createFunction(function (parent, properties) {
		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProperty("prototype", parent);
		}

		return obj;
	}));

	objectClass.setProperty("defineProperty", objectFactory.createFunction(function (obj, prop, descriptor) {
		var value = typeRegistry.get("undefined");
		var options = { writable: false, enumerable: false, configurable: false };
		var executionContext = this;
		var getter, setter;

		if (descriptor) {
			["writable", "enumerable", "configurable"].forEach(function (name) {
				var propValue = descriptor.getProperty(name);
				if (propValue) {
					options[name] = propValue.value || options[name];
				}
			});

			value = descriptor.getProperty("value");
			getter = descriptor.getProperty("get");
			setter = descriptor.getProperty("set");

			// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
			if (getter) {
				options.writable = true;
				options.get = getter;
				options.getter = function () {
					var scope = executionContext.scope.createScope(obj);

					utils.loadArguments(getter.node.params, [], scope);
					return executionContext.create(getter.node.body, getter.node, scope).execute().result;
				};
			}

			if (setter) {
				options.writable = true;
				options.set = setter;
				options.setter = function () {
					var scope = executionContext.scope.createScope(obj);

					utils.loadArguments(setter.node.params, arguments, scope);
					var executionResult = executionContext.create(setter.node.body, setter.node, scope).execute();
					return executionResult ? executionResult.result : typeRegistry.get("undefined");
				};
			}

			if (value) {
				options.value = value;
			}
		}

		obj.setProperty(prop.toString(), value, options);
	}));

	objectClass.setProperty("getOwnPropertyDescriptor", objectFactory.createFunction(function (obj, prop) {
		prop = prop.toString();
		if (prop in obj.properties) {
			var descriptor = obj.getPropertyDescriptor(prop);
			var undef = typeRegistry.get("undefined");

			var result = objectFactory.createObject();
			result.setProperty("configurable", objectFactory.createPrimitive(descriptor.configurable));
			result.setProperty("enumerable", objectFactory.createPrimitive(descriptor.enumerable));

			if (descriptor.get || descriptor.set) {
				result.setProperty("value", undef);
				result.setProperty("writable", undef);
				result.setProperty("get", descriptor.get || undef);
				result.setProperty("set", descriptor.set || undef);
			} else {
				result.setProperty("value", descriptor.value);
				result.setProperty("writable", objectFactory.createPrimitive(descriptor.writable));
				result.setProperty("get", undef);
				result.setProperty("set", undef);
			}

			return result;
		}

		return typeRegistry.get("undefined");
	}));

	objectClass.setProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("Array");
		Object.keys(obj.enumerable).forEach(function (name, index) {
			arr.setProperty(index, objectFactory.createPrimitive(name));
		});

		return arr;
	}));

	objectClass.setProperty("freeze", objectFactory.createFunction(function (obj) {
		obj.freeze();
		return obj;
	}));

	objectClass.setProperty("isFrozen", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.isPrimitive || !!obj.frozen);
	}));

	objectClass.setProperty("preventExtensions", objectFactory.createFunction(function (obj) {
		obj.preventExtensions();
		return obj;
	}));

	objectClass.setProperty("isExtensible", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.extensible !== false);
	}));

	typeRegistry.set("Object", objectClass);
	globalScope.setProperty("Object", objectClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],44:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var regexClass = objectFactory.createFunction(utils.wrapNative(RegExp));
	var proto = regexClass.getProperty("prototype");

	proto.setProperty("test", objectFactory.createFunction(utils.wrapNative(RegExp.prototype.test)));

	proto.setProperty("exec", objectFactory.createFunction(function (str) {
		var match = this.node.value.exec(str.toString());

		// update the last index from the underlying regex
		this.node.setProperty("lastIndex", objectFactory.createPrimitive(this.node.value.lastIndex));

		if (match) {
			var arr = objectFactory.create("ARRAY");
			for (var i = 0, ln = match.length; i < ln; i++) {
				arr.setProperty(i, objectFactory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.setProperty("index", objectFactory.createPrimitive(match.index));
			arr.setProperty("input", objectFactory.createPrimitive(match.input));
			return arr;
		}

		return typeRegistry.get("null");
	}));

	typeRegistry.set("RegExp", regexClass);
	globalScope.setProperty("RegExp", regexClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],45:[function(require,module,exports){
"use strict";
var ObjectType = require("../types/object-type");
var objectFactory = require("../types/object-factory");

function Scope (parent, thisNode) {
	ObjectType.call(this, parent);
	this.thisNode = thisNode || (parent && parent.thisNode) || this;
}

Scope.prototype = Object.create(ObjectType.prototype);
Scope.prototype.constructor = Scope;

Scope.prototype.getProperty = function (name) {
	var current = this;

	while (current) {
		if (name in current.properties) {
			return current.properties[name];
		}

		current = current.parent;
	}

	throw new ReferenceError(name + " is not defined");
};

Scope.prototype.setProperty = function (name, value, fixed, nonenumerable) {
	// look for existing in scope and traverse up scope
	var current = this;
	while (current) {
		if (name in current.properties) {
			if (current.writable[name]) {
				ObjectType.prototype.setProperty.apply(current, arguments);
			}

			return;
		}

		current = current.parent;
	}

	// add to current scope if not found
	ObjectType.prototype.setProperty.apply(this, arguments);
};

Scope.prototype.hasProperty = function (name) {
	var current = this;
	while (current) {
		if (name in current.properties) {
			return true;
		}

		current = current.parent;
	}

	return false;
};

Scope.prototype.createScope = function (thisNode) {
	return new Scope(this, thisNode);
};

Scope.prototype.createPrimitive = function (value) {
	return objectFactory.createPrimitive(value);
};

Scope.prototype.createObject = function (value) {
	return objectFactory.createObject(value);
};

Scope.prototype.createFunction = function (fnOrNode) {
	return objectFactory.createFunction(fnOrNode);
};


module.exports = Scope;

},{"../types/object-factory":51,"../types/object-type":52}],46:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "search", "slice", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"];
var staticMethods = ["fromCharCode"];
var slice = Array.prototype.slice;

module.exports = function (globalScope) {
	var stringClass = objectFactory.createFunction(function (value) {
		if (!value) {
			return objectFactory.createPrimitive("");
		}

		if (!value.isPrimitive) {
			var primitiveValue = utils.callMethod(value, "toString", [], this);
			if (!primitiveValue || !primitiveValue.isPrimitive) {
				primitiveValue = utils.callMethod(value, "valueOf", [], this) || primitiveValue;
			}

			if (primitiveValue && !primitiveValue.isPrimitive) {
				throw new TypeError("Cannot convert object to primitive value.");
			}

			value = primitiveValue;
		}

		return objectFactory.createPrimitive(value.toString());
	});

	var proto = stringClass.getProperty("prototype");

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	staticMethods.forEach(function (name) {
		var fn = String[name];
		if (fn) {
			stringClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	proto.setProperty("split", objectFactory.createFunction(function (separator, limit) {
		separator = separator && separator.value;
		limit = limit && limit.toNumber();

		var result = this.node.value.split(separator, limit);

		var arr = objectFactory.create("ARRAY");
		result.forEach(function (value, index) {
			arr.setProperty(index, objectFactory.createPrimitive(value));
		});

		return arr;
	}));

	proto.setProperty("replace", objectFactory.createFunction(function (regexOrSubstr, substrOrFn) {
		var match = regexOrSubstr && regexOrSubstr.value;
		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var wrappedReplacer = function () {
				var scope = executionContext.scope.createScope();
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				utils.loadArguments(substrOrFn.node.params, args, scope);
				var result = executionContext.create(substrOrFn.node.body, substrOrFn.node, scope).execute().result;
				return result && result.value;
			};

			return objectFactory.createPrimitive(this.node.value.replace(match, wrappedReplacer));
		}

		return objectFactory.createPrimitive(this.node.value.replace(match, substrOrFn && substrOrFn.value));
	}));

	proto.setProperty("match", objectFactory.createFunction(function (regex) {
		var results = this.node.value.match(regex && regex.value);
		if (results) {
			var matches = objectFactory.create("ARRAY");
			results.forEach(function (value, index) {
				matches.setProperty(index, objectFactory.createPrimitive(value));
			});

			return matches;
		}

		return typeRegistry.get("NULL");
	}));

	typeRegistry.set("String", stringClass);
	globalScope.setProperty("String", stringClass);
};

},{"../types/object-factory":51,"../types/type-registry":56,"../utils":57}],47:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function ArrayType (parent) {
	ObjectType.call(this, parent);
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.setProperty = function (name, value) {
	if (typeof name === "number") {
		// todo: should be a better way to set length, but we can't reference object factory here
		this.properties.length.value = Math.max(name + 1, this.properties.length.value);
	} else if (name === "length") {
		var ln = this.getProperty("length");
		var i = value.toNumber();

		if (ln && i < ln.value) {
			for (; i < ln.value; i++) {
				this.deleteProperty(i);
			}
		}
	}

	ObjectType.prototype.setProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	this.setProperty("length", objectFactory.createPrimitive(0));
};

ArrayType.prototype.constructor = ArrayType;
module.exports = ArrayType;

},{"./object-type":52}],48:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function ErrorType (source) {
	ObjectType.call(this);
	this.source = source;
}

ErrorType.prototype = new ObjectType();
ErrorType.prototype.constructor = ErrorType;

module.exports = ErrorType;

},{"./object-type":52}],49:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function FunctionType (node, parentScope) {
	ObjectType.call(this);
	this.type = "function";
	this.native = false;
	this.node = node;
	this.parentScope = parentScope;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory) {
	// set length property from the number of parameters
	this.setProperty("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, writable: false });

	// functions have a prototype
	this.setProto(objectFactory.createObject());
};

FunctionType.prototype.createScope = function (currentScope, thisArg) {
	// if a parent scope is defined we need to limit the scope to that scope
	return (this.parentScope || currentScope).createScope(thisArg);
};

module.exports = FunctionType;

},{"./object-type":52}],50:[function(require,module,exports){
"use strict";
var FunctionType = require("./function-type");
var ObjectType = require("./object-type");

function NativeFunctionType (fn, parentScope) {
	FunctionType.call(this, null, parentScope);
	this.type = "function";
	this.native = true;
	this.nativeFunction = fn;
}

NativeFunctionType.prototype = Object.create(FunctionType.prototype);
NativeFunctionType.prototype.constructor = NativeFunctionType;

NativeFunctionType.prototype.init = function (objectFactory) {
	// set length property
	this.setProperty("length", objectFactory.createPrimitive(this.nativeFunction.length), { configurable: false, writable: false });
	this.setProto(new ObjectType());
};

module.exports = NativeFunctionType;

},{"./function-type":49,"./object-type":52}],51:[function(require,module,exports){
"use strict";
var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var ErrorType = require("./error-type");
var typeRegistry = require("./type-registry");

var objectRgx = /\[object (\w+)\]/;

var parentless = {
	"UNDEFINED": true,
	"NULL": true,
	"FUNCTION": true
};

module.exports = {
	createPrimitive: function (value) {
		var typeName = objectRgx.exec(Object.prototype.toString.call(value))[1];
		return this.create(typeName, value);
	},

	create: function (typeName, value) {
		typeName = typeName.toUpperCase();
		var instance;

		switch (typeName) {
			case "STRING":
				instance = new StringType(value);
				break;

			case "NUMBER":
			case "BOOLEAN":
			case "DATE":
			case "NULL":
			case "UNDEFINED":
				instance = new PrimitiveType(value);
				break;

			case "REGEXP":
				instance = new RegexType(value);
				break;

			case "ARRAY":
				instance = new ArrayType();
				break;

			case "ERROR":
				typeName = (value.name || typeName).toUpperCase();
				instance = new ErrorType(value);
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);

		// during initialization it is possible for objects to be created
		// before the types have been registered - add a registry of items
		// and these can be filled in when the type is registered
		if (!(typeName in parentless)) {
			typeRegistry.setParent(instance, typeName);
		}

		return instance;
	},

	createObject: function (parent) {
		if (parent !== null) {
			parent = parent || typeRegistry.get("Object");
			// instance.setProto(parent);
		}

		var instance = new ObjectType(parent);
		instance.init(this);

		return instance;
	},

	createFunction: function (fnOrNode, parentScope) {
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode, parentScope);
		} else {
			instance = new FunctionType(fnOrNode, parentScope);
		}

		instance.init(this);
		typeRegistry.setParent(instance, "Function");
		return instance;
	}
};

},{"./array-type":47,"./error-type":48,"./function-type":49,"./native-function-type":50,"./object-type":52,"./primitive-type":53,"./regex-type":54,"./string-type":55,"./type-registry":56}],52:[function(require,module,exports){
"use strict";
var configs = ["configurable", "enumerable", "writable"];

function configureAccessor (obj, name, descriptor) {
	Object.defineProperty(obj.properties, name, {
		enumerable: true,
		configurable: true,
		get: descriptor.getter,
		set: descriptor.setter
	});

	// keep original around for `getOwnPropertyDescriptor`
	obj.accessors[name] = {
		get: descriptor.get,
		getter: descriptor.getter,
		set: descriptor.set,
		setter: descriptor.setter
	};
}

function ObjectType (parent) {
	this.isPrimitive = false;
	this.type = "object";
	this.parent = parent;

	this.writable = Object.create(null);
	this.enumerable = Object.create(null);
	this.configurable = Object.create(null);
	this.properties = Object.create(null);
	this.accessors = Object.create(null);

	this.frozen = false;
	this.extensible = true;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	setProto: function (proto) {
		this.proto = this.properties.prototype = proto;
	},

	getPropertyDescriptor: function (name) {
		name = String(name);
		var current = this;

		while (current) {
			if (name in current.properties) {
				return {
					configurable: current.configurable[name],
					enumerable: current.enumerable[name],
					writable: current.writable[name],
					value: current.properties[name],
					get: current.accessors[name] && current.accessors[name].get,
					set: current.accessors[name] && current.accessors[name].set
				};
			}

			current = current.parent && current.parent.proto;
		}

		return undefined;
	},

	hasProperty: function (name) {
		return !!this.getPropertyDescriptor(name);
	},

	setProperty: function (name, value, options) {
		if (this.isPrimitive || this.frozen) {
			return;
		}

		name = String(name);
		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		var descriptor = this.getPropertyDescriptor(name);
		if (descriptor && options) {
			this.updateProperty(name, options, descriptor);
			return;
		}

		if (!descriptor) {
			this.setupProperty(name, value, options);
			return;
		}

		if (descriptor.writable) {
			this.properties[name] = value;
		}
	},

	setupProperty: function (name, value, descriptor) {
		if (this.isPrimitive || this.frozen || !this.extensible) {
			return;
		}

		descriptor = descriptor || {};

		var self = this;
		configs.forEach(function (prop) {
			descriptor[prop] = prop in descriptor ? descriptor[prop] : true;
			self[prop][name] = descriptor[prop];
		});

		if (descriptor.getter || descriptor.setter) {
			configureAccessor(this, name, descriptor);
		} else {
			this.properties[name] = descriptor.value || value;
		}
	},

	updateProperty: function (name, descriptor, priorDescriptor) {
		priorDescriptor = priorDescriptor || this.getPropertyDescriptor(name);

		if (descriptor.setter || descriptor.getter) {
			configureAccessor(this, name, descriptor);
		} else if (descriptor.value) {
			delete this.accessors[name];
			this.writable[name] = descriptor.writable;
			Object.defineProperty(this.properties, name, {
				configurable: true,
				enumerable: true,
				value: descriptor.value
			});
		}
	},

	getProperty: function (name) {
		var descriptor = this.getPropertyDescriptor(name);
		return descriptor && descriptor.value;
	},

	deleteProperty: function (name) {
		name = String(name);
		if (this.isPrimitive || this.frozen) {
			return false;
		}

		if (name in this.properties && !this.configurable[name]) {
			return false;
		}

		return delete this.properties[name];
	},

	freeze: function () {
		this.preventExtensions();
		this.frozen = true;
	},

	preventExtensions: function () {
		this.extensible = false;
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

},{}],53:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function PrimitiveType (value, parent) {
	ObjectType.call(this, parent);
	this.isPrimitive = true;
	this.value = value;
	this.type = typeof value;
}

PrimitiveType.prototype = Object.create(ObjectType.prototype);
PrimitiveType.prototype.constructor = PrimitiveType;

// overwrite object methods
PrimitiveType.prototype.toBoolean = function () { return Boolean(this.value); };
PrimitiveType.prototype.toNumber = function () { return Number(this.value); };
PrimitiveType.prototype.toString = function () { return String(this.value); };
PrimitiveType.prototype.valueOf = function () { return this.value; };

module.exports = PrimitiveType;

},{"./object-type":52}],54:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function RegexType (value, parent) {
	ObjectType.call(this, parent);
	this.value = value;
}

RegexType.prototype = Object.create(ObjectType.prototype);
RegexType.prototype.constructor = RegexType;

RegexType.prototype.init = function (objectFactory) {
	// lastIndex is settable, all others are read-only attributes
	this.setProperty("lastIndex", objectFactory.createPrimitive(this.value.lastIndex), { enumerable: false, configurable: false });
	this.setProperty("source", objectFactory.createPrimitive(this.value.source), { writable: false, enumerable: false });
	this.setProperty("global", objectFactory.createPrimitive(this.value.global), { writable: false, enumerable: false });
	this.setProperty("ignoreCase", objectFactory.createPrimitive(this.value.ignoreCase), { writable: false, enumerable: false });
	this.setProperty("multiline", objectFactory.createPrimitive(this.value.multiline), { writable: false, enumerable: false });
};

module.exports = RegexType;

},{"./object-type":52}],55:[function(require,module,exports){
"use strict";
var PrimitiveType = require("./primitive-type");
var typeRegistry = require("./type-registry");

function StringType (value, parent) {
	PrimitiveType.call(this, value);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.getProperty = function (name) {
	if (name === "length") {
		var length = new PrimitiveType(this.value.length);
		typeRegistry.setParent(length, "NUMBER");
		return length;
	}

	if (typeof name === "number") {
		var character = new StringType(this.value[name]);
		typeRegistry.setParent(character, "STRING");
		return character;
	}

	return PrimitiveType.prototype.getProperty.call(this, name);
};

module.exports = StringType;

},{"./primitive-type":53,"./type-registry":56}],56:[function(require,module,exports){
"use strict";
var types = Object.create(null);
var parentsToSet = Object.create(null);

module.exports = {
	get: function (typeName) {
		return types[typeName.toUpperCase()];
	},

	set: function (typeName, type) {
		typeName = typeName.toUpperCase();
		types[typeName] = type;

		if (typeName in parentsToSet) {
			parentsToSet[typeName].forEach(function (obj) {
				obj.parent = type;
				// obj.setProto(type);
			});

			delete parentsToSet[typeName];
		}
	},

	setParent: function (obj, typeName) {
		typeName = typeName.toUpperCase();

		if (!(typeName in types)) {
			// the type might not be registered due to timing so we will set it when it gets registered
			parentsToSet[typeName] = parentsToSet[typeName] || [];
			parentsToSet[typeName].push(obj);
		} else {
			// obj.setProto(types[typeName]);
			obj.parent = types[typeName];
		}
	}
};

},{}],57:[function(require,module,exports){
"use strict";
var objectFactory = require("./types/object-factory");
var typeRegistry = require("./types/type-registry");
var FunctionType = require("./types/function-type");

function getValues (args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(args[i].value);
	}

	return values;
}

module.exports = {
	wrapNative: function (fn) {
		return function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(arguments);
			var value = fn.apply(scope, args);
			return objectFactory.createPrimitive(value);
		};
	},

	loadArguments: function (params, args, scope) {
		var argumentList = objectFactory.createObject();
		for (var i = 0, ln = args.length; i < ln; i++) {
			argumentList.setProperty(i, args[i]);
		}

		argumentList.setProperty("length", objectFactory.createPrimitive(ln));
		scope.setProperty("arguments", argumentList);

		params.forEach(function (param, index) {
			scope.setProperty(param.name, args[index] || typeRegistry.get("undefined"));
		});
	},

	callMethod: function (obj, name, args, executionContext) {
		var method = obj.getProperty(name);
		if (method && method instanceof FunctionType && !(method.native)) {
			var scope = executionContext.scope.createScope(obj);

			this.loadArguments(method.node.params, args, scope);
			return executionContext.create(method.node.body, method.node, scope).execute().result;
		}

		return null;
	}
};

},{"./types/function-type":49,"./types/object-factory":51,"./types/type-registry":56}]},{},[1])(1)
});