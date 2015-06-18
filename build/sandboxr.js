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
var objectFactory = require("../types/object-factory");

module.exports = function ArrayExpression (context) {
	var arr = objectFactory.create("Array");
	var undef = context.scope.global.getValue("undefined");

	if (context.node.elements) {
		context.node.elements.forEach(function (element, index) {
			var item = element ? context.create(element).execute().result : undef;
			arr.putValue(index, item);
		});
	}

	return context.result(arr);
};

},{"../types/object-factory":57}],5:[function(require,module,exports){
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
	var assignment = context.node.operator === "=";

	// check for undeclared global
	if (context.node.left.type === "Identifier" && !context.scope.hasProperty(context.node.left.name)) {
		if (!assignment) {
			throw new ReferenceError(context.node.left.name + " is not defined");
		}

		// not found - add as reference
		context.scope.global.putValue(context.node.left.name, context.scope.global.getValue("undefined"), { configurable: true });
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
		newValue = objectFactory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));
	}

	var obj = left.object || context.scope;
	var name = left.name;

	if (obj.hasProperty(name)) {
		obj.putValue(name, newValue);
	} else {
		obj.putValue(name, newValue, { configurable: left.object ? true : false });
	}

	return context.result(newValue, name);
};

},{"../types/object-factory":57}],6:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

function implicitEquals (a, b, context) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if (a.type === "object" && b.type === "object") {
		return a === b;
	}

	var primitiveA = utils.toPrimitive(context, a);
	var primitiveB = utils.toPrimitive(context, b);

	if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
		return Number(primitiveA) === Number(primitiveB);
	}

	if (typeof primitiveA === "string") {
		return primitiveA === utils.toPrimitive(context, b, "string");
	}

	if (typeof primitiveB === "string") {
		return utils.toPrimitive(context, a, "string") === primitiveB;
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

	a = utils.toPrimitive(context, a);
	b = utils.toPrimitive(context, b);
	return a + b;
}

function toNumber (context, obj) {
	if (obj.className === "Number") {
		return obj.toNumber();
	}

	return utils.toPrimitive(context, obj, "number");
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
	"<": function (a, b, c) { return utils.toPrimitive(c, a) < utils.toPrimitive(c, b); },
	"<=": function (a, b, c) { return utils.toPrimitive(c, a) <= utils.toPrimitive(c, b); },
	">": function (a, b, c) { return utils.toPrimitive(c, a) > utils.toPrimitive(c, b); },
	">=": function (a, b, c) { return utils.toPrimitive(c, a) >= utils.toPrimitive(c, b); },
	"<<": function (a, b, c) { return utils.toPrimitive(c, a) << utils.toPrimitive(c, b); },
	">>": function (a, b, c) { return utils.toPrimitive(c, a) >> utils.toPrimitive(c, b); },
	">>>": function (a, b, c) { return utils.toPrimitive(c, a) >>> utils.toPrimitive(c, b); },
	"%": function (a, b, c) { return utils.toPrimitive(c, a) % utils.toPrimitive(c, b); },
	"|": function (a, b, c) { return utils.toInt32(c, a) | utils.toInt32(c, b); },
	"^": function (a, b, c) { return utils.toInt32(c, a) ^ utils.toInt32(c, b); },
	"&": function (a, b, c) { return utils.toInt32(c, a) & utils.toInt32(c, b); },
	"in": function (a, b, c) { return b.hasProperty(a.toString()); },
	"instanceof": function (a, b) {
		if (b.type !== "function") {
			throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
		}

		if (a.isPrimitive) {
			return false;
		}

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

			current = current.proto;
		}

		return false;
	}
};

module.exports = function BinaryExpression (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right, context);

	return context.result(objectFactory.createPrimitive(newValue));
};

},{"../types/object-factory":57,"../utils":65}],7:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
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
			scope.defineOwnProperty(name, objectFactory.createFunction(decl, scope), { configurable: false, enumerable: false }, true);
		} else {
			scope.defineOwnProperty(name, undef, { configurable: false, enumerable: false }, true);
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

},{"../types/object-factory":57}],8:[function(require,module,exports){
"use strict";
var FunctionType = require("../types/function-type");
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

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
		returnResult = objectFactory.createObject(fn.result);
	}

	var params = native ? [] : fn.result.node.params;
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	var thisArg = returnResult || fn.object;
	var callee = native ? fn : fn.result.node;

	return context.result(utils.executeFunction(context, fn.result, params, args, thisArg, callee, isNew));
};

},{"../types/function-type":55,"../types/object-factory":57,"../utils":65}],9:[function(require,module,exports){
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
var objectFactory = require("../types/object-factory");

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
				context.scope.putValue(left.name, objectFactory.createPrimitive(prop));
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

},{"../types/object-factory":57}],13:[function(require,module,exports){
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
var objectFactory = require("../types/object-factory");

module.exports = function FunctionExpression (context) {
	var ctor = context.scope.global.getValue("Function");
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.scope, proto, ctor);

	return context.result(func);
};

},{"../types/object-factory":57}],16:[function(require,module,exports){
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
var objectFactory = require("../types/object-factory");

module.exports = function Literal (context) {
	if (context.node.value === "use strict") {
		context.scope.setStrict(true);
	}

	return context.result(objectFactory.createPrimitive(context.node.value));
};

},{"../types/object-factory":57}],22:[function(require,module,exports){
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
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

function setDescriptor (context, obj, name, descriptor) {
	if (descriptor.get) {
		descriptor.getter = function () {
			return utils.executeFunction(context, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		};
	}

	if (descriptor.set) {
		descriptor.setter = function () {
			return utils.executeFunction(context, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		};
	}

	obj.defineOwnProperty(name, null, descriptor);
}

module.exports = function ObjectExpression (context) {
	var obj = objectFactory.createObject();
	var descriptors = Object.create(null);

	context.node.properties.forEach(function (property) {
		var value = context.create(property.value).execute().result;
		var name = property.key.name || property.key.value;

		switch (property.kind) {
			case "get":
			case "set":
				descriptors[name] = descriptors[name] || Object.create(null);
				descriptors[name][property.kind] = value;
				break;

			default:
				obj.defineOwnProperty(name, value);
				break;
		}
	});

	for (var prop in descriptors) {
		setDescriptor(context, obj, prop, descriptors[prop]);
	}

	return context.result(obj);
};

},{"../types/object-factory":57,"../utils":65}],25:[function(require,module,exports){
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

	throw new Error(arg.getValue("message"));
};

},{}],30:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var result;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			var scope = context.scope.createScope();
			scope.putValue(context.node.handler.param.name, objectFactory.createPrimitive(err));

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

},{"../types/object-factory":57}],31:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var Scope = require("../scope/scope");

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
	var value = result && result.result;
	var newValue;

	switch (context.node.operator) {
		case "typeof":
			newValue = result ? objectFactory.createPrimitive(value.type) : objectFactory.createPrimitive("undefined");
			break;

		case "-":
			newValue = objectFactory.createPrimitive(-(utils.toNumber(context, value)));
			break;

		case "+":
			newValue = objectFactory.createPrimitive(+(utils.toNumber(context, value)));
			break;

		case "!":
			newValue = objectFactory.createPrimitive(!(value.isPrimitive ? value.toBoolean() : true));
			break;

		case "~":
			newValue = objectFactory.createPrimitive(~(utils.toPrimitive(context, value)));
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

},{"../scope/scope":49,"../types/object-factory":57,"../utils":65}],32:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

module.exports = function UpdateExpression (context) {
	var executionResult = context.create(context.node.argument).execute();
	var originalValue = utils.toNumber(context, executionResult.result);
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

	obj.putValue(name, newValue);
	return context.result(returnValue, name, obj);
};

},{"../types/object-factory":57,"../utils":65}],33:[function(require,module,exports){
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
		context.scope.putValue(id, value);
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
var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var util = require("../util");
var contracts = require("../utils/contracts");
var ArrayType = require("../types/array-type");

var propertyConfig = { enumerable: false };

function validateIndex (index) {
	return util.isInteger(index) && index >= 0 && index < 4294967296;
}

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
	var scope = executionContext.scope.createScope(thisArg);
	var args = [executionContext.node.getValue(index), objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var args = [priorValue, executionContext.node.getValue(index), objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

module.exports = function (globalScope) {
	var arrayClass = objectFactory.createFunction(function (length) {
		var newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				if (!validateIndex(length.toNumber())) {
					throw new RangeError("Invalid array length");
				}

				newArray.putValue("length", length);
			} else {
				for (var i = 0, ln = arguments.length; i < ln; i++) {
					newArray.putValue(i, arguments[i]);
				}
			}
		}

		return newArray;
	}, globalScope);

	var proto = arrayClass.proto;
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false });

	arrayClass.defineOwnProperty("isArray", objectFactory.createFunction(function (obj) {
		return globalScope.createPrimitive(obj === proto || obj instanceof ArrayType);
	}));

	proto.defineOwnProperty("push", objectFactory.createFunction(function () {
		var start = this.node.getValue("length").value || 0;

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.putValue(start + i, arguments[i]);
		}

		return this.node.getValue("length");
	}), propertyConfig);

	proto.defineOwnProperty("pop", objectFactory.createFunction(function () {
		var index = this.node.getValue("length").value;
		var obj = this.node.getValue(--index) || objectFactory.createPrimitive(undefined);

		// need to update length manually - deleting an item does not update length per spec
		if (index >= 0) {
			this.node.putValue("length", objectFactory.createPrimitive(index));
		}

		return obj;
	}), propertyConfig);

	proto.defineOwnProperty("shift", objectFactory.createFunction(function () {
		var obj = this.node.getValue(0);

		var i = 1;
		var length = this.node.getValue("length").value;
		for (; i < length; i++) {
			this.node.properties[i - 1] = this.node.properties[i];
		}

		this.node.putValue("length", objectFactory.createPrimitive(--length));
		return obj;
	}), propertyConfig);

	proto.defineOwnProperty("unshift", objectFactory.createFunction(function () {
		var i = this.node.getValue("length").value;
		var length = arguments.length;

		while (i--) {
			this.node.putValue(i + length, this.node.getValue(i));
		}

		for (; i < length; i++) {
			this.node.putValue(i, arguments[i]);
		}

		return this.node.getValue("length");
	}), propertyConfig);

	proto.defineOwnProperty("slice", objectFactory.createFunction(function (begin, end) {
		var source = this.node;
		var length = source.getValue("length").value;
		begin = begin ? utils.toInteger(this, begin) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = utils.toInteger(this, end);
		}

		var arr = objectFactory.create("Array");
		var index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (var i = begin; i < end; i++) {
			arr.putValue(index++, source.getValue(i));
		}

		return arr;
	}), propertyConfig);

	proto.defineOwnProperty("splice", objectFactory.createFunction(function (start, deleteCount) {
		start = start.toNumber();
		deleteCount = deleteCount.toNumber();

		var removed = objectFactory.create("Array");
		var length = this.node.getValue("length").value;
		var newCount = arguments.length - 2;
		var i, removedIndex = 0;

		start = getStartIndex(start, length);
		deleteCount = Math.min(deleteCount, length - start);

		for (i = start; i < start + deleteCount; i++) {
			removed.putValue(removedIndex++, this.node.getValue(i));
			// this.node.properties[i] = this.node.properties[i + deleteCount];
		}

		if (deleteCount > 0) {
			for (i = start + deleteCount; i < length; i++) {
				this.node.properties[i - deleteCount] = this.node.properties[i];
			}
		}

		length -= deleteCount;
		this.node.putValue("length", objectFactory.createPrimitive(length));

		if (newCount > 0) {
			i = length + newCount;
			while (i-- > start) {
				this.node.putValue(i, this.node.getValue([i - newCount]));
			}

			i = 0;
			while (i++ < newCount) {
				this.node.putValue(start++, arguments[i + 1]);
			}
		}

		return removed;
	}), propertyConfig);

	proto.defineOwnProperty("concat", objectFactory.createFunction(function () {
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
	}), propertyConfig);

	proto.defineOwnProperty("join", objectFactory.createFunction(function (separator) {
		separator = arguments.length === 0 ? "," : separator.toString();
		var stringValues = [];

		for (var i = 0, length = this.node.getValue("length").value; i < length; i++) {
			stringValues.push(this.node.getValue(i).toString());
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}), propertyConfig);

	proto.defineOwnProperty("indexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var index = arguments.length === 1 ? 0 : utils.toInteger(this, fromIndex);
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (index in this.node.properties && searchElement.equals(this.node.getValue(index))) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}), propertyConfig);

	proto.defineOwnProperty("lastIndexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var index = arguments.length === 1 ? length : utils.toInteger(this, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		while (index-- > 0) {
			if (index in this.node.properties && searchElement.equals(this.node.getValue(index))) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}), propertyConfig);

	proto.defineOwnProperty("forEach", objectFactory.createFunction(function (callback, thisArg) {
		var length = utils.toUInt32(this, this.node.getValue("length"));
		for (var i = 0; i < length; i++) {
			if (String(i) in this.node.properties) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}), propertyConfig);

	proto.defineOwnProperty("map", objectFactory.createFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");

		var newArray = objectFactory.create("Array");
		var length = utils.toUInt32(this, this.node.getValue("length"));

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				newArray.putValue(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}), propertyConfig);

	proto.defineOwnProperty("filter", objectFactory.createFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");

		var newArray = objectFactory.create("Array");
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.putValue(index++, this.node.getValue(i));
			}
		}

		return newArray;
	}), propertyConfig);

	function every (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");

		var length = utils.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}
	every.nativeLength = 1;
	proto.defineOwnProperty("every", objectFactory.createFunction(every), propertyConfig);

	function some (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");

		var length = utils.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}
	some.nativeLength = 1;
	proto.defineOwnProperty("some", objectFactory.createFunction(some), propertyConfig);

	proto.defineOwnProperty("reduce", objectFactory.createFunction(function (callback, initialValue) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");

		if (callback.type !== "function") {
			throw new TypeError();
		}

		var length = utils.toUInt32(this, this.node.getValue("length"));
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
	}), propertyConfig);

	proto.defineOwnProperty("reduceRight", objectFactory.createFunction(function (callback, initialValue) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");

		var index = this.node.getValue("length").value - 1;
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
	}), propertyConfig);

	proto.defineOwnProperty("reverse", objectFactory.createFunction(function () {
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var temp;

		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.properties[length - i - 1];
			this.node.properties[length - i - 1] = this.node.properties[i];
			this.node.properties[i] = temp;
		}

		return this.node;
	}), propertyConfig);

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

	proto.defineOwnProperty("sort", objectFactory.createFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.scope.createScope();

			utils.loadArguments(compareFunction.node.params, [a, b], scope);
			return executionContext.create(compareFunction.node.body, compareFunction.node, scope).execute().result.value;
		};

		// convert to array, run the wrapped comparer, then re-assign indexes
		util.toArray(arr)
			.sort(wrappedComparer || defaultComparer)
			.forEach(function (element, index) {
				arr.putValue(index, element);
			});

		return arr;
	}), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createFunction(function () {
		// todo: implement for reach
		var values = util.toArray(this.node).map(function (arg) { return arg.value.toLocaleString(); });
		return objectFactory.createPrimitive(values.toLocaleString());
	}), propertyConfig);

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.defineOwnProperty("toString", proto.properties.join.value, propertyConfig);

	globalScope.defineOwnProperty("Array", arrayClass, propertyConfig);
};

},{"../types/array-type":52,"../types/object-factory":57,"../util":64,"../utils":65,"../utils/contracts":66}],38:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

var propertyConfig = { enumerable: false };

module.exports = function (globalScope) {
	var booleanClass = objectFactory.createFunction(function (obj) {
		var value = obj && obj.isPrimitive ? obj.toBoolean() : !!obj;
		var booleanValue = objectFactory.create("Boolean", value);

		// called as new
		if (this.isNew) {
			booleanValue.type = "object";
			booleanValue.isPrimitive = false;

			// this is a quirk in the spec
			booleanValue.toBoolean = function () { return true; };
		}

		return booleanValue;
	}, globalScope);

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

},{"../types/object-factory":57}],39:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var methods = ["log", "info", "error"];

module.exports = function (globalScope) {
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(console[name])));
	});

	globalScope.defineOwnProperty("console", consoleClass);
};

},{"../types/object-factory":57,"../utils":65}],40:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var staticMethods = ["now"];
var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString", "valueOf"];
var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];
var slice = Array.prototype.slice;
var propertyConfig = { enumerable: false };

module.exports = function (globalScope) {
	var dateClass = objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			args = [utils.toPrimitive(this, arguments[0], "string")];
		} else {
			args = slice.call(arguments).map(function (arg) { return utils.toPrimitive(context, arg, "number"); });
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
	}, globalScope);

	dateClass.defineOwnProperty("parse", objectFactory.createFunction(function (value) {
		var stringValue = utils.toPrimitive(this, value, "string");
		var dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, globalScope), propertyConfig);

	dateClass.defineOwnProperty("UTC", objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return utils.toPrimitive(context, arg, "number"); });
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, globalScope), propertyConfig);

	var proto = dateClass.proto;

	staticMethods.forEach(function (name) {
		dateClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(Date[name])));
	});

	protoMethods.forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(Date.prototype[name])), propertyConfig);
	});

	setters.forEach(function (name) {
		function setter () {
			var args = slice.call(arguments).map(function (arg) { return utils.toPrimitive(arg); });
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

},{"../types/object-factory":57,"../utils":65}],41:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");
		obj.putValue("message", message);
		obj.putValue("name", objectFactory.createPrimitive("Error"));
		return obj;
	});

	errorClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var name = this.node.getValue("name");
		var msg = this.node.getValue("message");

		name = name && name.toString();
		msg = msg && msg.toString();

		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}), { enumerable: false });

	globalScope.defineOwnProperty("Error", errorClass, { enumerable: false });

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.createObject("Error", { name: type });
			err.putValue("message", message);
			err.putValue("name", objectFactory.createPrimitive(type));
			return err;
		});

		globalScope.defineOwnProperty(type, errClass, { enumerable: false });
	});
};

},{"../types/object-factory":57}],42:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var ObjectType = require("../types/object-type");
var utils = require("../utils");
var util = require("../util");

var slice = Array.prototype.slice;
var propertyConfig = { enumerable: false };

module.exports = function (globalScope, options) {
	// var proto = new ObjectType();
	var functionClass = objectFactory.createFunction(function () {
		var context = this;
		if (options.parser && arguments.length > 0) {
			var args = slice.call(arguments).map(function (arg) { return utils.toPrimitive(context, arg, "string"); });
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
			fn.putValue("constructor", functionClass);
			return fn;
		}

		if (this.isNew) {
			this.node.putValue("constructor", functionClass);
			return this.node;
		}

		return objectFactory.createObject();
	}, globalScope);

	var proto = functionClass.proto;
	proto.defineOwnProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)), propertyConfig);
	proto.defineOwnProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)), propertyConfig);

	proto.defineOwnProperty("call", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return utils.executeFunction(this, this.node, params, args, thisArg, callee);
		// utils.loadArguments(this.node.node.params, args, scope);
		// return this.create(this.node.node.body, this.node, scope).execute().result;
	}), propertyConfig);

	proto.defineOwnProperty("apply", objectFactory.createFunction(function (thisArg, argsArray) {
		var args = util.toArray(argsArray);
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;

		return utils.executeFunction(this, this.node, params, args, thisArg, callee);
	}), propertyConfig);

	proto.defineOwnProperty("bind", objectFactory.createFunction(function (thisArg) {
		var args = slice.call(arguments, 1);
		var callee = this.node;

		return objectFactory.createFunction(function () {
			var scope = this.scope.createScope(thisArg);
			utils.loadArguments(callee.node.params, args.concat(slice.call(arguments)), scope);
			return this.create(callee.node.body, callee, scope).execute().result;
		});
	}), propertyConfig);

	globalScope.defineOwnProperty("Function", functionClass, { enumerable: false });
};

},{"../types/object-factory":57,"../types/object-type":58,"../util":64,"../utils":65}],43:[function(require,module,exports){
(function (global){
"use strict";
var Scope = require("./scope");
var PrimitiveType = require("../types/primitive-type");
var objectFactory = require("../types/object-factory");
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
var utils = require("../utils");

var globalFunctions = ["isNaN", "parseFloat", "isFinite", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"];

module.exports = function (options) {
	var globalScope = new Scope();
	globalScope.start();

	var undefinedClass = new PrimitiveType(undefined);
	globalScope.defineOwnProperty("undefined", undefinedClass, { configurable: false, enumerable: false, writable: false });

	var nullClass = new PrimitiveType(null);
	globalScope.defineOwnProperty("null", nullClass, { configurable: false, writable: false });

	globalScope.defineOwnProperty("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false, enumerable: false });
	globalScope.defineOwnProperty("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false, enumerable: false });

	// todo: node vs browser - do we care?
	globalScope.defineOwnProperty("window", globalScope, { configurable: false, writable: false });

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
		globalScope.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(global[name]), globalScope, null), { enumerable: false });
	});

	globalScope.defineOwnProperty("parseInt", objectFactory.createFunction(function (value, radix) {
		value = utils.toPrimitive(this, value, "string");
		radix = utils.toPrimitive(this, radix, "number");

		return objectFactory.createPrimitive(parseInt(value, radix));
	}, globalScope, null), { enumerable: false });

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
		}, globalScope, null);

		// evalFunc.parent = globalScope.getValue("Object");
		// evalFunc.setProto(null);
		globalScope.defineOwnProperty("eval", evalFunc, { enumerable: false });
	}

	globalScope.setProto(globalScope.getValue("Object").proto);
	globalScope.end();
	return globalScope;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../types/object-factory":57,"../types/primitive-type":59,"../utils":65,"./array-api":37,"./boolean-api":38,"./console-api":39,"./date-api":40,"./error-api":41,"./function-api":42,"./json-api":44,"./math-api":45,"./number-api":46,"./object-api":47,"./regex-api":48,"./scope":49,"./string-api":50}],44:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var methods = ["parse", "stringify"];

module.exports = function (globalScope) {
	var jsonClass = objectFactory.createObject();

	methods.forEach(function (name) {
		jsonClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(JSON[name])), { configurable: true, enumerable: false });
	});

	globalScope.defineOwnProperty("JSON", jsonClass, { enumerable: false });
};

},{"../types/object-factory":57,"../utils":65}],45:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

module.exports = function (globalScope) {
	var mathClass = objectFactory.createObject();

	constants.forEach(function (name) {
		mathClass.defineOwnProperty(name, objectFactory.createPrimitive(Math[name]), { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(Math[name])), { enumerable: false });
	});

	globalScope.defineOwnProperty("Math", mathClass, { enumerable: false });
};

},{"../types/object-factory":57,"../utils":65}],46:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

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

module.exports = function (globalScope) {
	var numberClass = objectFactory.createFunction(function (value) {
		value = Number(utils.toPrimitive(this, value, "number"));
		var numberValue = objectFactory.create("Number", value);

		if (this.isNew) {
			numberValue.type = "object";
			numberValue.isPrimitive = false;
			// return utils.createWrappedPrimitive(this.node, value);
		}

		return numberValue;
		// return objectFactory.createPrimitive(value);
	}, globalScope);

	var proto = numberClass.proto;
	proto.className = "Number";
	proto.defineOwnProperty("toString", objectFactory.createFunction(function (radix) {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.toString is not generic");
		}

		var radixValue = 10;
		if (radix) {
			radixValue = utils.toPrimitive(this, radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw new RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return objectFactory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, globalScope), { enumerable: false });

	proto.defineOwnProperty("toFixed", objectFactory.createFunction(function (fractionDigits) {
		var digits = 0;
		if (fractionDigits) {
			digits = utils.toPrimitive(this, fractionDigits, "number");
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.toNumber(), digits));
	}, globalScope), { enumerable: false });

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if (this.node.className !== "Number") {
			throw new TypeError("Number.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, globalScope), { enumerable: false });

	constants.forEach(function (name) {
		numberClass.defineOwnProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), { configurable: true, enumerable: false, writable: true });
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), { configurable: true, enumerable: false, writable: true });
		}
	});

	globalScope.defineOwnProperty("Number", numberClass, { enumerable: false });
};

},{"../types/object-factory":57,"../utils":65}],47:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var ObjectType = require("../types/object-type");
var utils = require("../utils");

var propertyConfig = { enumerable: false };

function verifyObject (obj, source) {
	if (!obj || obj.isPrimitive) {
		throw new TypeError(source + " called on non-object");
	}
}

function defineProperty (context, obj, name, descriptor) {
	var value = objectFactory.scope.getValue("undefined");
	var options = { writable: false, enumerable: false, configurable: false };
	var getter, setter;

	if (descriptor) {
		["writable", "enumerable", "configurable"].forEach(function (prop) {
			var propValue = descriptor.getValue(prop);
			if (propValue) {
				options[prop] = propValue.value || options[prop];
			}
		});

		value = descriptor.getValue("value");
		getter = descriptor.getValue("get");
		setter = descriptor.getValue("set");

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (getter) {
			options.writable = true;
			options.get = getter;
			options.getter = function () {
				return utils.executeFunction(context, getter, getter.node.params, [], this, getter.node);
			};
		}

		if (setter) {
			options.writable = true;
			options.set = setter;
			options.setter = function () {
				return utils.executeFunction(context, setter, setter.node.params, arguments, this, setter.node);
			};
		}

		if (value) {
			options.value = value;
		}
	}

	obj.putValue(name, value, options);
}

module.exports = function (globalScope) {
	var undef = globalScope.getValue("undefined");

	var proto = new ObjectType();
	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				var objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				return objectWrapper;
				// var obj = this.isNew ? this.node : objectFactory.createObject();
				// if (value.value == null) {
				// 	return obj;
				// }

				// return utils.createWrappedPrimitive(obj, value.value);
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	}, globalScope, proto);

	// var proto = objectClass.proto;
	proto.defineOwnProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if ("value" in this.node) {
			return objectFactory.createPrimitive(this.node.value);
		}

		return this.node;
	}), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var obj = this.scope.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.toString());
	}), propertyConfig);

	proto.defineOwnProperty("isPrototypeOf", objectFactory.createFunction(function (obj) {
		var current = obj;
		while (current) {
			if (current === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			current = current.proto; // && current.parent.proto;
		}

		return objectFactory.createPrimitive(false);
	}), propertyConfig);

	proto.defineOwnProperty("propertyIsEnumerable", objectFactory.createFunction(function (name) {
		var descriptor = this.node.getProperty(name.toString());
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}), propertyConfig);

	objectClass.defineOwnProperty("create", objectFactory.createFunction(function (parent, properties) {
		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProto(parent.proto);
		}

		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("defineProperty", objectFactory.createFunction(function (obj, prop, descriptor) {
		defineProperty(this, obj, prop.toString(), descriptor);
	}), propertyConfig);

	objectClass.defineOwnProperty("defineProperties", objectFactory.createFunction(function (obj, descriptors) {
		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getValue(prop));
			}
		}
	}), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyDescriptor", objectFactory.createFunction(function (obj, prop) {
		verifyObject(obj, "Object.getOwnPropertyDescriptor");

		prop = utils.toPrimitive(this, prop, "string");

		if (obj.hasOwnProperty(prop)) {
			var descriptor = obj.getProperty(prop);

			var result = objectFactory.createObject();
			result.putValue("configurable", objectFactory.createPrimitive(descriptor.configurable));
			result.putValue("enumerable", objectFactory.createPrimitive(descriptor.enumerable));

			if (descriptor.get || descriptor.set) {
				result.putValue("get", descriptor.get || undef);
				result.putValue("set", descriptor.set || undef);
			} else {
				result.putValue("value", descriptor.value);
				result.putValue("writable", objectFactory.createPrimitive(descriptor.writable));
			}

			return result;
		}

		return undef;
	}), propertyConfig);

	objectClass.defineOwnProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.putValue(index++, objectFactory.createPrimitive(name));
			}
		});

		return arr;
	}), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyNames", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		var i = 0;

		for (var prop in obj.properties) {
			// ignore prototype
			if (prop !== "prototype") {
				arr.putValue(i++, objectFactory.createPrimitive(prop));
			}
		}

		return arr;
	}), propertyConfig);

	objectClass.defineOwnProperty("getPrototypeOf", objectFactory.createFunction(function (obj) {
		return obj.parent && obj.parent.proto;
	}), propertyConfig);

	objectClass.defineOwnProperty("freeze", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.freeze");
		obj.freeze();
		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("isFrozen", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isFrozen");
		return objectFactory.createPrimitive(obj.isPrimitive || obj.frozen);
	}), propertyConfig);

	objectClass.defineOwnProperty("preventExtensions", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("isExtensible", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible !== false);
	}), propertyConfig);

	objectClass.defineOwnProperty("seal", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("isSealed", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isSealed");
		return objectFactory.createPrimitive(obj.sealed);
	}), propertyConfig);

	globalScope.getValue("Function").parent = objectClass;
	globalScope.defineOwnProperty("Object", objectClass, propertyConfig);
};

},{"../types/object-factory":57,"../types/object-type":58,"../utils":65}],48:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var propertyConfig = { enumerable: false };

module.exports = function (globalScope) {
	var regexClass = objectFactory.createFunction(function (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			return pattern;
		}

		pattern = pattern && pattern.toString();
		flags = flags && flags.toString();

		return objectFactory.create("RegExp", new RegExp(pattern, flags));
	});

	var proto = regexClass.proto;
	proto.defineOwnProperty("test", objectFactory.createFunction(function (str) {
		var value = utils.toPrimitive(this, str, "string");
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
			arr.putValue("index", objectFactory.createPrimitive(match.index));
			arr.putValue("input", objectFactory.createPrimitive(match.input));
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

	proto.defineOwnProperty("compile", objectFactory.createFunction(utils.wrapNative(RegExp.prototype.compile)), propertyConfig);

	var frozen = { configurable: false, enumerable: false, writable: false };
	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createPrimitive(RegExp.prototype[name]), frozen);
	});

	globalScope.defineOwnProperty("RegExp", regexClass, { enumerable: false });
};

},{"../types/object-factory":57,"../utils":65}],49:[function(require,module,exports){
"use strict";
var ObjectType = require("../types/object-type");
var objectFactory = require("../types/object-factory");
var keywords = require("../keywords");

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

Scope.prototype.start = function () {
	objectFactory.startScope(this);
};

Scope.prototype.end = function () {
	objectFactory.endScope();
};

Scope.prototype.getValue = function (name) {
	var current = this;

	while (current) {
		if (name in current.properties) {
			return current.properties[name].getValue(current);
		}

		current = current.parent;
	}

	return undefined; //ObjectType.prototype.getValue.call(this, name);
};

Scope.prototype.defineOwnProperty = function (name, value, descriptor, throwOnError) {
	if (throwOnError) {
		if (keywords.isReserved(name, this)) {
			throw new SyntaxError("Unexpected token " + name);
		}
	}

	// add to current scope
	ObjectType.prototype.defineOwnProperty.call(this, name, value, descriptor || { configurable: false });
};

Scope.prototype.putValue = function (name, value, descriptor) {
	// look for existing in scope and traverse up scope
	var current = this;
	while (current) {
		if (name in current.properties) {
			ObjectType.prototype.putValue.call(current, name, value);
			return;
		}

		current = current.parent;
	}

	this.defineOwnProperty(name, value, descriptor);
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

Scope.prototype.withObject = function (obj) {
	var scope = new Scope(this);
	scope.properties = obj.properties;
	return scope;
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

Scope.prototype.setStrict = function (strict) {
	this.strict = strict;
};

module.exports = Scope;

},{"../keywords":36,"../types/object-factory":57,"../types/object-type":58}],50:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var contracts = require("../utils/contracts");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "slice", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = String(utils.toPrimitive(this, value, "string"));
		var newValue = objectFactory.createPrimitive(stringValue);

		// called as new
		if (this.isNew) {
			// convert to object
			newValue.type = "object";
			newValue.isPrimitive = false;
			// return utils.createWrappedPrimitive(this.node, value);
		}

		return newValue;
		// return objectFactory.createPrimitive(value);
	}, globalScope);

	var proto = stringClass.proto;

	proto.defineOwnProperty("search", objectFactory.createFunction(function (regex) {
		return objectFactory.createPrimitive(this.node.value.search(regex.source));
	}), propertyConfig);

	proto.defineOwnProperty("substring", objectFactory.createFunction(function (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		var value = utils.toPrimitive(this, this.node, "string");
		var length = value.length;

		start = utils.toInteger(this, start);
		end = contracts.isNullOrUndefined(end) ? length : utils.toInteger(this, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}), propertyConfig);

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(fn)), propertyConfig);
		}
	}, propertyConfig);

	stringClass.defineOwnProperty("fromCharCode", objectFactory.createFunction(function (charCode) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return utils.toPrimitive(context, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}), propertyConfig);

	proto.defineOwnProperty("split", objectFactory.createFunction(function (separator, limit) {
		separator = separator && (separator.source || separator.value);
		limit = limit && limit.toNumber();

		var result = this.node.value.split(separator, limit);

		var arr = objectFactory.create("Array");
		result.forEach(function (value, index) {
			arr.putValue(index, objectFactory.createPrimitive(value));
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

				utils.loadArguments(substrOrFn.node.params, args, scope);
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
			results.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value));
			});

			return matches;
		}

		return globalScope.getValue("null");
	}), propertyConfig);

	proto.defineOwnProperty("trim", objectFactory.createFunction(function () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		var value = utils.toPrimitive(this, this.node, "string");
		return objectFactory.createPrimitive(value.trim());
	}), propertyConfig);

	globalScope.defineOwnProperty("String", stringClass, { enumerable: false });
};

},{"../types/object-factory":57,"../utils":65,"../utils/contracts":66}],51:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function ArgumentType () {
	ObjectType.call(this);
	this.className = "Arguments";
}

ArgumentType.prototype = Object.create(ObjectType.prototype);
ArgumentType.prototype.constructor = ArgumentType;

ArgumentType.prototype.putValue = function (name, value) {
	name = String(name);
	if (name in this.properties) {
		this.properties[name].setValue(this, value);
	}
};

module.exports = ArgumentType;

},{"./object-type":58}],52:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var PropertyDescriptor = require("./property-descriptor");

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value) {
	if (typeof name === "number") {
		// todo: should be a better way to set length, but we can't reference object factory here
		var currentLength = this.properties.length.value;
		currentLength.value = Math.max(name + 1, currentLength.value);

		name = String(name);
		this.properties[name] = this.properties[name] || new PropertyDescriptor(null, value);
		this.properties[name].setValue(this, value);
		return;
	}

	if (name === "length") {
		var ln = this.getValue("length");
		var i = value.toNumber();

		if (ln && i < ln.value) {
			for (; i < ln.value; i++) {
				this.deleteProperty(i);
			}
		}
	}

	ObjectType.prototype.putValue.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	this.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false });
};

module.exports = ArrayType;

},{"./object-type":58,"./property-descriptor":60}],53:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function DateType (value) {
	ObjectType.call(this);
	this.value = value;
	this.type = "date";
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

ErrorType.prototype = new ObjectType();
ErrorType.prototype.constructor = ErrorType;

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

FunctionType.prototype.init = function (objectFactory, proto, ctor) {
	// set length property from the number of parameters
	this.putValue("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, enumerable: false, writable: false });

	// functions have a prototype
	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor({ configurable: false, enumerable: false, writable: true, value: ctor || this });
	this.setProto(proto);
};

// FunctionType.prototype.getProperty = function (name) {
// 	name = String(name);
// 	if (name in this.properties) {
// 		return this.properties[name];
// 	}

// 	if (this.parent && this.parent.proto && name in this.parent.proto) {
// 		return this.parent.proto[name];
// 	}

// 	return undefined;
// };

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

NativeFunctionType.prototype.init = function (objectFactory, proto) {
	var length = this.nativeFunction.length;
	if ("nativeLength" in this.nativeFunction) {
		length = this.nativeFunction.nativeLength;
	}

	this.putValue("length", objectFactory.createPrimitive(length), { configurable: false, enumerable: false, writable: false });

	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor({ configurable: true, enumerable: false, writable: true, value: this });
	this.setProto(proto, { configurable: false, enumerable: false, writable: true });
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
var util = require("../util");

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

module.exports = {
	startScope: function (scope) {
		this.scope = scope;
	},

	endScope: function () {
		setOrphans(this.scope);
	},

	createPrimitive: function (value) {
		return this.create(util.getType(value), value);
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
		var ctor = this.scope.getValue("Object");
		var i, ln;

		// instance.setProto(proto);
		instance.init(this, ctor, ctor.proto);

		for (i = 0, ln = args.length; i < ln; i++) {
			instance.defineOwnProperty(i, args[i], { configurable: true });
		}

		instance.defineOwnProperty("length", this.createPrimitive(ln), { configurable: false, enumerable: false });
		instance.defineOwnProperty("callee", callee, { enumerable: false });
		return instance;
	},

	createFunction: function (fnOrNode, parentScope, proto, ctor) {
		// todo: need to verify that prototype arg is needed
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode, parentScope);
		} else {
			instance = new FunctionType(fnOrNode, parentScope);
		}

		instance.init(this, proto, ctor);
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
	}
};

},{"../util":64,"./argument-type":51,"./array-type":52,"./date-type":53,"./error-type":54,"./function-type":55,"./native-function-type":56,"./object-type":58,"./primitive-type":59,"./regex-type":61,"./string-type":62}],58:[function(require,module,exports){
"use strict";
var PropertyDescriptor = require("./property-descriptor");
var ValueReference = require("./value-reference");

function ObjectType () {
	this.isPrimitive = false;
	this.type = "object";
	this.className = "Object";

	this.properties = Object.create(null);

	this.frozen = false;
	this.extensible = true;
	this.sealed = false;
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	setProto: function (proto, descriptor) {
		if ("prototype" in this.properties && !this.properties.prototype.canSetValue()) {
			return;
		}

		this.proto = proto;
		this.properties.prototype = new PropertyDescriptor(descriptor || { enumerable: false }, proto);
	},

	getProperty: function (name) {
		name = String(name);
		var current = this;

		while (current) {
			if (name in current.properties) {
				return current.properties[name];
			}

			// current = current.proto;
			current = current.parent && current.parent.proto;  // current.proto;
		}

		// check parent
		// if (this.parent && this.parent.proto) {
		// 	return this.parent.getProperty(name);
		// }

		return undefined;
	},

	getOwnProperty: function (name) {
		return this.properties[name];
	},

	hasProperty: function (name) {
		return this.hasOwnProperty(name) || !!this.getProperty(name);
	},

	hasOwnProperty: function (name) {
		return name in this.properties;
	},

	putValue: function (name, value, options) {
		if (this.isPrimitive || this.frozen) {
			return;
		}

		name = String(name);
		if (name === "prototype") {
			this.setProto(value);
			return;
		}

		var descriptor = this.getProperty(name);
		if (descriptor && options) {
			descriptor.update(options);
		}

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
			this.defineOwnProperty(name, value, options);
		}
	},

	defineOwnProperty: function (name, value, descriptor) {
		if (this.isPrimitive || !this.extensible) {
			return;
		}

		if (value && value.reference) {
			this.properties[name] = value;
		} else {
			this.properties[name] = new PropertyDescriptor(descriptor, value);
		}
	},

	getValue: function (name) {
		var descriptor = this.getProperty(name);
		return descriptor && descriptor.getValue(this);
	},

	deleteProperty: function (name) {
		if (this.isPrimitive || this.sealed) {
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
		this.preventExtensions();
		this.seal();
		this.frozen = true;
	},

	preventExtensions: function () {
		this.extensible = false;
	},

	seal: function () {
		this.preventExtensions();
		this.sealed = true;
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

},{"./property-descriptor":60,"./value-reference":63}],59:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var util = require("../util");

function PrimitiveType (value) {
	ObjectType.call(this);
	this.isPrimitive = true;
	this.value = value;
	this.type = typeof value;
	this.className = util.getType(value);
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

},{"../util":64,"./object-type":58}],60:[function(require,module,exports){
"use strict";
var configs = ["configurable", "enumerable", "writable"];

var defaultDescriptor = {
	configurable: true,
	enumerable: true,
	writable: true
};

function PropertyDescriptor (config, value) {
	var self = this;

	config = config || defaultDescriptor;
	configs.forEach(function (prop) {
		self[prop] = prop in config ? config[prop] : true;
	});

	if (config.getter || config.setter) {
		this.dataProperty = false;
		this.get = config.get;
		this.getter = config.getter;
		this.set = config.set;
		this.setter = config.setter;
	} else {
		this.dataProperty = true;
		this.value = value || config.value;
	}
}

PropertyDescriptor.prototype.update = function (descriptor) {
	if (descriptor.setter || descriptor.getter) {
		this.get = descriptor.get;
		this.getter = descriptor.getter;
		this.set = descriptor.set;
		this.setter = descriptor.setter;

		this.dataProperty = false;
		this.value = undefined;
	} else if (descriptor.value) {
		this.get = this.getter = this.set = this.setter = undefined;

		this.writable = descriptor.writable;
		this.dataProperty = true;
		this.value = descriptor.value;
	}
};

PropertyDescriptor.prototype.getValue = function (obj) {
	if (this.getter || this.setter) {
		if (this.getter) {
			return this.getter.call(obj);
		}
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
	} else {
		this.value = value;
	}
};

PropertyDescriptor.prototype.canSetValue = function () {
	return this.writable;
};

module.exports = PropertyDescriptor;

},{}],61:[function(require,module,exports){
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
	this.putValue("lastIndex", objectFactory.createPrimitive(this.source.lastIndex), { enumerable: false, configurable: false });
	this.putValue("source", objectFactory.createPrimitive(this.source.source), { writable: false, enumerable: false });
	this.putValue("global", objectFactory.createPrimitive(this.source.global), { writable: false, enumerable: false });
	this.putValue("ignoreCase", objectFactory.createPrimitive(this.source.ignoreCase), { writable: false, enumerable: false });
	this.putValue("multiline", objectFactory.createPrimitive(this.source.multiline), { writable: false, enumerable: false });
};

module.exports = RegexType;

},{"./object-type":58}],62:[function(require,module,exports){
"use strict";
var PrimitiveType = require("./primitive-type");
var PropertyDescriptor = require("./property-descriptor");
var util = require("../util");

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
	if (util.isInteger(name)) {
		var position = Number(name);
		if (position < this.value.length) {
			return new PropertyDescriptor({ configurable: false, enumerable: true, writable: false, value: getCharacter(this, position) });
		}
	}

	return PrimitiveType.prototype.getProperty.apply(this, arguments);
};

StringType.prototype.hasOwnProperty = function (name) {
	if (util.isInteger(name)) {
		return name < this.value.length;
	}

	return PrimitiveType.prototype.hasOwnProperty.apply(this, arguments);
};

StringType.prototype.getValue = function (name) {
	if (util.isInteger(name)) {
		return getCharacter(this, Number(name));
	}

	return PrimitiveType.prototype.getValue.call(this, name);
};

module.exports = StringType;

},{"../util":64,"./primitive-type":59,"./property-descriptor":60}],63:[function(require,module,exports){
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
var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^\d+$/;

module.exports = {
	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
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

},{}],65:[function(require,module,exports){
"use strict";
var objectFactory = require("./types/object-factory");
var FunctionType = require("./types/function-type");

var util = require("./util");
var utils;

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

	var primitiveValue = utils.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
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

	var primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	primitiveValue = utils.callMethod(value, "toString", [], executionContext);
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

function defineThis (scope, thisArg, isNew) {
	if (!thisArg) {
		return scope.global;
	}

	if (isNew) {
		return thisArg;
	}

	if (thisArg.isPrimitive && thisArg.value != null) {
		// call toObject on primitive 10.4.3
		var obj = objectFactory.createObject();
		return utils.createWrappedPrimitive(obj, thisArg.value);
	}

	return thisArg;
}

utils = {
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
			if (isNew && executionResult && executionResult.exit) {
				returnResult = executionResult.result;
			} else {
				returnResult = returnResult || (executionResult && executionResult.result);
			}
		}

		return returnResult || context.scope.global.getValue("undefined");
	},

	wrapNative: function (fn) {
		var nativeFunction = function () {
			if (this.isNew) {
				throw new TypeError(fn.name + " is not a constructor.");
			}

			var scope = this && this.node && this.node.value;
			var args = getValues(this, arguments);

			var value = fn.apply(scope, args);
			return objectFactory.createPrimitive(value);
		};

		nativeFunction.nativeLength = fn.length;
		return nativeFunction;
	},

	loadArguments: function (params, args, scope, callee) {
		var undef = scope.global.getValue("undefined");
		var argumentList = objectFactory.createArguments(args);
		scope.defineOwnProperty("arguments", argumentList);

		params.forEach(function (param, index) {
			var ref = argumentList.createReference(index);
			scope.defineOwnProperty(param.name, ref || undef);
		});
	},

	callMethod: function (obj, name, args, executionContext) {
		var method = obj.getValue(name);

		if (method && method instanceof FunctionType) {
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
	},

	createWrappedPrimitive: function (source, value) {
		var type = util.getType(value);
		var ctor = objectFactory.scope.properties[type];
		source.properties.constructor = ctor;
		// source.setProperty("constructor", ctor);

		source.value = value;
		source.className = type;
		source.toString = function () { return String(value); };
		source.toNumber = function () { return Number(value); };
		source.toBoolean = function () { return Boolean(value); };
		source.valueOf = function () { return value; };
		return source;
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
	}
};

module.exports = utils;

},{"./types/function-type":55,"./types/object-factory":57,"./util":64}],66:[function(require,module,exports){
"use strict";
module.exports = {
	isNullOrUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value == null);
	},

	assertIsNotNullOrUndefined: function (value, methodName) {
		if (this.isNullOrUndefined(value)) {
			throw new TypeError(methodName + " called on null or undefined");
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
	}
};

},{}]},{},[1])(1)
});