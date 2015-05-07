(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ExecutionContext = require("./execution-context");

function SandBoxer (ast) {
	this.ast = ast;
	this.scope = null;
}

SandBoxer.prototype.execute = function (context) {
	context = context || new ExecutionContext(this, this.ast, this.scope || (this.scope = globalScope()));

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type](context);
};

SandBoxer.prototype.createScope = function () {
	return (this.scope = globalScope());
};

module.exports = SandBoxer;

},{"./execution-context":2,"./handlers":17,"./scope/global-scope":36}],2:[function(require,module,exports){
"use strict";
var ExecutionResult = require("./execution-result");

function ExecutionContext (runner, node, scope, label) {
	this.runner = runner;
	this.node = node;
	this.scope = scope;
	this.label = label;
}

ExecutionContext.prototype.execute = function () {
	return this.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, scope, label) {
	return new ExecutionContext(this.runner, node, scope || this.scope, label);
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
}

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

module.exports = ExecutionResult;

},{}],4:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var arr = objectFactory.createArray();

	if (context.node.elements) {
		context.node.elements.forEach(function (element, index) {
			arr.setProperty(index, context.create(element).execute().result);
		});
	}

	return context.result(arr);
};

},{"../types/object-factory":44}],5:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

var assignOperators = {
	"=": function (a, b) { return b.value; },
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

module.exports = function (context) {
	var left = context.create(context.node.left).execute();
	var right = context.create(context.node.right).execute();
	var newValue = objectFactory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));

	var obj = left.object || context.scope;
	var name = left.name;

	obj.setProperty(name, newValue);
	return context.result(newValue, name);
};

},{"../types/object-factory":44}],6:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

/* eslint eqeqeq:0 */
// todo: implement instanceof, in
var binaryOperators = {
	"+": function (a, b) { return a.value + b.value; },
	"-": function (a, b) { return a.value - b.value; },
	"/": function (a, b) { return a.value / b.value; },
	"*": function (a, b) { return a.value * b.value; },
	"==": function (a, b) { return a.value == b.value; },
	"!=": function (a, b) { return a.value != b.value; },
	"===": function (a, b) { return a.value === b.value; },
	"!==": function (a, b) { return a.value !== b.value; },
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
	"in": function (a, b) { return b.hasProperty(a.value); }
};

module.exports = function (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right);

	return context.result(objectFactory.createPrimitive(newValue));
};

},{"../types/object-factory":44}],7:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var i = 0;
	var ln = context.node.body.length;
	var result;

	for (; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && (result.cancel || result.skip || result.exit)) {
			break;
		}
	}

	return result;
};

},{}],8:[function(require,module,exports){
"use strict";
var typeRegistry = require("../types/type-registry");

module.exports = function (context) {
	var node = context.node;
	var scope = context.scope;

	var fn = context.create(node.callee).execute();
	if (!fn.result) {
		throw new TypeError();
	}

	var newScope = scope.createScope(fn.object);

	// todo: handle unassigned parameters, extra arguments passed in
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	newScope.setProperty("arguments", args);

	if (fn.result.native) {
		return context.result(fn.result.nativeFunction.apply(context.create(newScope.thisNode, newScope), args));
	}

	// set named parameters
	fn.result.node.params.forEach(function (param, index) {
		newScope.setProperty(param.name, args[index] || typeRegistry.get("UNDEFINED"));
	});

	return context.create(fn.result.node.body, newScope).execute();
};

},{"../types/type-registry":49}],9:[function(require,module,exports){
"use strict";
module.exports = function () { };

},{}],10:[function(require,module,exports){
"use strict";
module.exports = 	function (context) {
	return context.create(context.node.expression).execute();
};

},{}],11:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var left = context.create(context.node.left).execute();
	var obj = context.create(context.node.right).execute().result;
	var value;

	while (obj) {
		for (var prop in obj.enumerable) {
			context.scope.setProperty(left.name, objectFactory.createPrimitive(prop));
			value = context.create(context.node.body).execute();
		}

		obj = obj.parent && obj.parent.proto;
	}

	return value;
};

},{"../types/object-factory":44}],12:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var testValue = context.create(context.node.test).execute().result;
	var bodyValue;

	while (testValue.toBoolean()) {
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

		testValue = context.create(context.node.test).execute().result;
	}

	return bodyValue;
};

},{}],13:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var id = context.node.id.name;
	var fn = objectFactory.createFunction(context.node);

	context.scope.setProperty(id, fn);
	return context.result(fn);
};

},{"../types/object-factory":44}],14:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	return context.result(objectFactory.createFunction(context.node));
};

},{"../types/object-factory":44}],15:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var name = context.node.name;
	var value = context.scope.getProperty(name);
	return context.result(value, name);
};

},{}],16:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var testValue = context.create(context.node.test).execute().result;
	if (testValue.toBoolean()) {
		return context.create(context.node.consequent).execute();
	}

	if (context.node.alternate) {
		return context.create(context.node.alternate).execute();
	}
};

},{}],17:[function(require,module,exports){
"use strict";
var handlers = {};

handlers.ArrayExpression = require("./array-expression");
handlers.AssignmentExpression = require("./assignment-expression");
handlers.BinaryExpression = require("./binary-expression");
handlers.BreakStatement = handlers.ContinueStatement = require("./interrupt-statement");
handlers.CallExpression = handlers.NewExpression = require("./call-expression");
handlers.ConditionalExpression = handlers.IfStatement = require("./if-statement");
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
handlers.UnaryExpression = require("./unary-expression");
handlers.UpdateExpression = require("./update-expression");
handlers.VariableDeclaration = require("./variable-declaration");
handlers.VariableDeclarator = require("./variable-declarator");

module.exports = handlers;

},{"./array-expression":4,"./assignment-expression":5,"./binary-expression":6,"./block-statement":7,"./call-expression":8,"./empty-statement":9,"./expression-statement":10,"./for-in-statement":11,"./for-statement":12,"./function-declaration":13,"./function-expression":14,"./identifier":15,"./if-statement":16,"./interrupt-statement":18,"./labeled-statement":19,"./literal":20,"./logical-expression":21,"./member-expression":22,"./object-expression":23,"./return-statement":24,"./sequence-expression":25,"./switch-statement":26,"./this-expression":27,"./unary-expression":28,"./update-expression":29,"./variable-declaration":30,"./variable-declarator":31}],18:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var label;
	if (context.node.label) {
		label = context.node.label.name;
	}

	if (context.node.type === "BreakStatement") {
		return context.cancel(label);
	}

	return context.skip(label);
};

},{}],19:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var label = context.node.label.name;
	var value = context.create(context.node.body, null, label).execute();
	// if (value && (value.cancel || value.skip)) {
	// 	if (value.name === label) {
	// 		value.cancel = value.skip = false;
	// 	}
	// }

	return value;
};

},{}],20:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	return context.result(objectFactory.createPrimitive(context.node.value));
};

},{"../types/object-factory":44}],21:[function(require,module,exports){
"use strict";
module.exports = function (context) {
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

},{}],22:[function(require,module,exports){
"use strict";
var typeRegistry = require("../types/type-registry");

module.exports = function (context) {
	var obj = context.create(context.node.object).execute().result;
	var name, value;

	if (context.node.computed) {
		name = context.create(context.node.property).execute().result.value;
		value = obj.getProperty(name);
	} else {
		name = context.node.property.name;
		value = context.create(context.node.property, obj).execute().result;
	}

	return context.result(value || typeRegistry.get("UNDEFINED"), name, obj);
};

},{"../types/type-registry":49}],23:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var obj = objectFactory.createObject();

	context.node.properties.forEach(function (prop) {
		var value = context.create(prop.value).execute().result;
		obj.setProperty(prop.key.name, value);
	});

	return context.result(obj);
};

},{"../types/object-factory":44}],24:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var returnValue = context.node.argument ? context.create(context.node.argument).execute().result : objectFactory.getType("undefined");
	return context.exit(returnValue);
};

},{"../types/object-factory":44}],25:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var value;

	context.node.expressions.forEach(function (expr) {
		value = context.create(expr).execute();
	});

	return value;
};

},{}],26:[function(require,module,exports){
"use strict";
function executeStatements (context, statements) {
	var value;
	for (var i = 0, ln = statements.length; i < ln; i++) {
		value = context.create(statements[i]).execute();
		if (value && value.cancel) {
			return value;
		}
	}

	return value;
}

module.exports = function (context) {
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
		if (value.cancel) {
			value.cancel = false;
			return value;
		}
	}

	return value;
};

},{}],27:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	return context.result(context.scope.thisNode);
};

},{}],28:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
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

		case "delete":
			newValue = objectFactory.createPrimitive(result.object.deleteProperty(result.name));
			break;

		default:
			throw new TypeError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};

},{"../types/object-factory":44}],29:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");

module.exports = function (context) {
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

},{"../types/object-factory":44}],30:[function(require,module,exports){
"use strict";
module.exports = function (context) {
	var value;

	context.node.declarations.forEach(function (decl) {
		value = context.create(decl).execute();
	});

	return value;
};

},{}],31:[function(require,module,exports){
"use strict";
var typeRegistry = require("../types/type-registry");

module.exports = function (context) {
	var id = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	value = value || typeRegistry.get("UNDEFINED");
	context.scope.setProperty(id, value);

	return context.result(value, id);
};

},{"../types/type-registry":49}],32:[function(require,module,exports){
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
	return executionContext.create(callback.node.body, scope).execute().result;
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var args = [priorValue, executionContext.node.properties[index], objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, scope).execute().result;
}

module.exports = function (globalScope) {
	var arrayClass = objectFactory.createFunction(utils.wrapNative(Array));

	arrayClass.setProperty("isArray", objectFactory.createFunction(function (obj) {
		return globalScope.createPrimitive(obj instanceof ArrayType);
	}));

	arrayClass.proto.setProperty("push", objectFactory.createFunction(function () {
		var start = this.node.getProperty("length").value || 0;

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.setProperty(start + i, arguments[i]);
		}

		return this.node.getProperty("length");
	}));

	arrayClass.proto.setProperty("pop", objectFactory.createFunction(function () {
		var index = this.node.getProperty("length").value;
		var obj = this.node.getProperty(--index) || objectFactory.createPrimitive(undefined);

		// need to update length manually - deleting an item does not update length per spec
		if (index >= 0) {
			this.node.setProperty("length", objectFactory.createPrimitive(index));
		}

		return obj;
	}));

	arrayClass.proto.setProperty("shift", objectFactory.createFunction(function () {
		var obj = this.node.getProperty(0);

		var i = 1;
		var length = this.node.getProperty("length").value;
		for (; i < length; i++) {
			this.node.properties[i - 1] = this.node.properties[i];
		}

		this.node.setProperty("length", objectFactory.createPrimitive(--length));
		return obj;
	}));

	arrayClass.proto.setProperty("unshift", objectFactory.createFunction(function () {
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

	arrayClass.proto.setProperty("slice", objectFactory.createFunction(function (begin, end) {
		begin = begin ? begin.toNumber() : 0;
		end = end ? end.toNumber() : this.node.properties.length.value;

		var arr = objectFactory.createArray();

		// since slice is generic we can just call it against our properties object which is array-like enough
		slice.call(this.node.properties, begin, end).forEach(function (element, index) {
			arr.setProperty(index, element);
		});

		return arr;
	}));

	arrayClass.proto.setProperty("splice", objectFactory.createFunction(function (start, deleteCount) {
		start = start.toNumber();
		deleteCount = deleteCount.toNumber();

		var removed = objectFactory.createArray();
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

	arrayClass.proto.setProperty("concat", objectFactory.createFunction(function () {
		var newArray = objectFactory.createArray();
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

	arrayClass.proto.setProperty("join", objectFactory.createFunction(function (separator) {
		separator = arguments.length === 0 ? "," : separator.toString();
		var stringValues = [];

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			stringValues.push(this.node.properties[i].toString());
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}));

	arrayClass.proto.setProperty("indexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
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

	arrayClass.proto.setProperty("lastIndexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
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

	arrayClass.proto.setProperty("forEach", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}));

	arrayClass.proto.setProperty("map", objectFactory.createFunction(function (callback, thisArg) {
		var newArray = objectFactory.createArray();

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties) {
				newArray.setProperty(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}));

	arrayClass.proto.setProperty("filter", objectFactory.createFunction(function (callback, thisArg) {
		var newArray = objectFactory.createArray();
		var index = 0;

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.setProperty(index++, this.node.properties[i]);
			}
		}

		return newArray;
	}));

	arrayClass.proto.setProperty("every", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}));

	arrayClass.proto.setProperty("some", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}));

	arrayClass.proto.setProperty("reduce", objectFactory.createFunction(function (callback, initialValue) {
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

	arrayClass.proto.setProperty("reduceRight", objectFactory.createFunction(function (callback, initialValue) {
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

	arrayClass.proto.setProperty("reverse", objectFactory.createFunction(function () {
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

	arrayClass.proto.setProperty("sort", objectFactory.createFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.scope.createScope();
			var args = [a, b];

			utils.loadArguments(compareFunction.node.params, args, scope);
			return executionContext.create(compareFunction.node.body, scope).execute().result.value;
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
	arrayClass.proto.setProperty("toString", arrayClass.proto.properties.join);

	typeRegistry.set("ARRAY", arrayClass);
	globalScope.setProperty("Array", arrayClass);
};

},{"../types/array-type":41,"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],33:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var booleanClass = objectFactory.createFunction(utils.wrapNative(Boolean));
	typeRegistry.set("BOOLEAN", booleanClass);
	globalScope.setProperty("Boolean", booleanClass);
};

},{"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],34:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var dateClass = objectFactory.createFunction(utils.wrapNative(Date));
	typeRegistry.set("DATE", dateClass);
	globalScope.setProperty("Date", dateClass);
};

},{"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],35:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(utils.wrapNative(Function));
	typeRegistry.set("FUNCTION", functionClass);

	// since function doesn't have a parent, need to setup explicit toString/valueOf
	functionClass.proto.setProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)));
	functionClass.proto.setProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)));

	globalScope.setProperty("Function", functionClass);
};

},{"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],36:[function(require,module,exports){
"use strict";
var Scope = require("./scope");
var ObjectType = require("../types/object-type");
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

module.exports = function () {
	var globalObject = new ObjectType();
	var scope = new Scope(null, globalObject);

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

	return scope;
};

},{"../types/object-factory":44,"../types/object-type":45,"../types/primitive-type":46,"../types/type-registry":49,"./array-api":32,"./boolean-api":33,"./date-api":34,"./function-api":35,"./number-api":37,"./object-api":38,"./scope":39,"./string-api":40}],37:[function(require,module,exports){
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
	var numberClass = objectFactory.createFunction(utils.wrapNative(Number));

	constants.forEach(function (name) {
		numberClass.setProperty(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			numberClass.proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
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

},{"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],38:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var objectClass = objectFactory.createFunction(utils.wrapNative(Object), null);
	typeRegistry.set("OBJECT", objectClass);

	objectClass.proto.setProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}), { enumerable: false });

	globalScope.setProperty("Object", objectClass);
};

},{"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],39:[function(require,module,exports){
"use strict";
var ObjectType = require("../types/object-type");
var objectFactory = require("../types/object-factory");

function Scope (parent, thisNode) {
	ObjectType.call(this, parent);
	this.thisNode = thisNode || parent.thisNode;
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

},{"../types/object-factory":44,"../types/object-type":45}],40:[function(require,module,exports){
"use strict";
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "search", "slice", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"];
var staticMethods = ["fromCharCode"];
var slice = Array.prototype.slice;

var polyfills = {
	"trim": (function () {
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		return function () {
			return this.replace(rtrim, "");
		};
	})()
};

module.exports = function (globalScope) {
	var stringClass = objectFactory.createFunction(utils.wrapNative(String));

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name] || polyfills[name];
		if (fn) {
			stringClass.proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	staticMethods.forEach(function (name) {
		var fn = String[name] || polyfills[name];
		if (fn) {
			stringClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	stringClass.proto.setProperty("split", objectFactory.createFunction(function (separator, limit) {
		separator = separator && separator.value;
		limit = limit && limit.toNumber();

		var result = this.node.value.split(separator, limit);

		var arr = objectFactory.createArray();
		result.forEach(function (value, index) {
			arr.setProperty(index, objectFactory.createPrimitive(value));
		});

		return arr;
	}));

	stringClass.proto.setProperty("replace", objectFactory.createFunction(function (regexOrSubstr, substrOrFn) {
		var match = regexOrSubstr && regexOrSubstr.value;
		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var wrappedReplacer = function () {
				var scope = executionContext.scope.createScope();
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				utils.loadArguments(substrOrFn.node.params, args, scope);
				var result = executionContext.create(substrOrFn.node.body, scope).execute().result;
				return result && result.value;
			};

			return objectFactory.createPrimitive(this.node.value.replace(match, wrappedReplacer));
		}

		return objectFactory.createPrimitive(this.node.value.replace(match, substrOrFn && substrOrFn.value));
	}));

	stringClass.proto.setProperty("match", objectFactory.createFunction(function (regex) {
		var results = this.node.value.match(regex && regex.value);
		if (results) {
			var matches = objectFactory.createArray();
			results.forEach(function (value, index) {
				matches.setProperty(index, objectFactory.createPrimitive(value));
			});

			return matches;
		}

		return typeRegistry.get("NULL");
	}));

	typeRegistry.set("STRING", stringClass);
	globalScope.setProperty("String", stringClass);
};

},{"../types/object-factory":44,"../types/type-registry":49,"../utils":50}],41:[function(require,module,exports){
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

},{"./object-type":45}],42:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");

function FunctionType (node) {
	ObjectType.call(this);
	this.type = "function";
	this.native = false;
	this.node = node;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory) {
	// set length property
	this.setProperty("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, writable: false });

	// save prototype to `proto` for quick access
	this.proto = new ObjectType();
	this.setProperty("prototype", this.proto);
};

module.exports = FunctionType;

},{"./object-type":45}],43:[function(require,module,exports){
"use strict";
var FunctionType = require("./function-type");
var ObjectType = require("./object-type");

function NativeFunctionType (fn) {
	FunctionType.call(this);
	this.type = "function";
	this.native = true;
	this.nativeFunction = fn;
}

NativeFunctionType.prototype = Object.create(FunctionType.prototype);
NativeFunctionType.prototype.constructor = NativeFunctionType;

NativeFunctionType.prototype.init = function (objectFactory) {
	// set length property
	this.setProperty("length", objectFactory.createPrimitive(this.nativeFunction.length), { configurable: false, writable: false });

	// save prototype to `proto` for quick access
	this.proto = new ObjectType();
	this.setProperty("prototype", this.proto);
};

module.exports = NativeFunctionType;

},{"./function-type":42,"./object-type":45}],44:[function(require,module,exports){
"use strict";
var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var typeRegistry = require("./type-registry");

var objectRgx = /\[object (\w+)\]/;

var parentless = {
	"UNDEFINED": true,
	"NULL": true,
	"FUNCTION": true
};

module.exports = {
	createPrimitive: function (value) {
		var typeName = objectRgx.exec(Object.prototype.toString.call(value))[1].toUpperCase();
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

			default:
				throw new Error("Not a primitive: " + value);
		}

		// during initialization it is possible for objects to be created
		// before the types have been registered - add a registry of items
		// and these can be filled in when the type is registered
		if (!(typeName in parentless)) {
			typeRegistry.setParent(instance, typeName);
		}

		instance.init(this);
		return instance;
	},

	createArray: function () {
		var instance = new ArrayType();
		typeRegistry.setParent(instance, "ARRAY");
		instance.init(this);
		return instance;
	},

	createObject: function (parent) {
		var instance = new ObjectType(parent);
		if (arguments.length === 0) {
			typeRegistry.setParent(instance, "OBJECT");
		}

		instance.init(this);
		return instance;
	},

	createFunction: function (fnOrNode) {
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode);
		} else {
			instance = new FunctionType(fnOrNode);
		}

		instance.init(this);
		return instance;
	}
};

},{"./array-type":41,"./function-type":42,"./native-function-type":43,"./object-type":45,"./primitive-type":46,"./regex-type":47,"./string-type":48,"./type-registry":49}],45:[function(require,module,exports){
"use strict";
var defaultOptions = {
	configurable: true,
	enumerable: true,
	writable: true
};

var configs = ["configurable", "enumerable", "writable"];

function ObjectType (parent) {
	this.isPrimitive = false;
	this.type = "object";
	this.parent = parent;

	this.writable = Object.create(null);
	this.enumerable = Object.create(null);
	this.configurable = Object.create(null);
	this.properties = Object.create(null);
}

ObjectType.prototype = {
	constructor: ObjectType,

	init: function () { },

	hasProperty: function (name) {
		return name in this.properties;
	},

	setProperty: function (name, value, options) {
		if (!(name in this.properties)) {
			options = options || defaultOptions;
			var self = this;

			configs.forEach(function (prop) {
				if (!(prop in options) || options[prop]) {
					self[prop][name] = true;
				}
			});
		}

		this.properties[name] = value;
	},

	getProperty: function (name) {
		if (name in this.properties) {
			return this.properties[name];
		}

		if (this.parent && this.parent.proto) {
			return this.parent.proto.getProperty(name);
		}

		return undefined;
	},

	deleteProperty: function (name) {
		if (this.isPrimitive || !(name in this.configurable)) {
			return false;
		}

		return delete this.properties[name];
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

},{}],46:[function(require,module,exports){
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

},{"./object-type":45}],47:[function(require,module,exports){
"use strict";
var ObjectType = require("./object-type");
var PrimitiveType = require("./primitive-type");

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

},{"./object-type":45,"./primitive-type":46}],48:[function(require,module,exports){
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
		//return new PrimitiveType(this.value.length);
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

},{"./primitive-type":46,"./type-registry":49}],49:[function(require,module,exports){
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
			obj.parent = types[typeName];
		}
	}
};

},{}],50:[function(require,module,exports){
"use strict";
var objectFactory = require("./types/object-factory");
var typeRegistry = require("./types/type-registry");

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
			scope.setProperty(param.name, args[index] || typeRegistry.get("UNDEFINED"));
		});
	}
};

},{"./types/object-factory":44,"./types/type-registry":49}]},{},[1])(1)
});