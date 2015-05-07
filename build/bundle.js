(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var handlers = require("./handlers");
var globalScope = require("./scope/global-scope");
var ObjectType = require("./types/object-type");

function SandBoxer(ast) {
	this.ast = ast;
	this.scope = null;
}

SandBoxer.prototype.execute = function (context) {
	if (!context) {
		context = { 
			node: this.ast, 
			scope: this.scope || (this.scope = globalScope())
		};
	}

	if (!(context.node.type in handlers)) {
		throw new TypeError("No handler defined for: " + context.node.type);
	}

	return handlers[context.node.type].call(this, context);
};

SandBoxer.prototype.setScope = function (scope) {
	this.scope = scope;
};

SandBoxer.prototype.createScope = function () {
	return globalScope();
};

module.exports = SandBoxer;
},{"./handlers":2,"./scope/global-scope":16,"./types/object-type":23}],2:[function(require,module,exports){
var handlers = {};

handlers["BinaryExpression"] = require("./handlers/binary-expression");
handlers["CallExpression"] = require("./handlers/call-expression");
handlers["EmptyStatement"] = require("./handlers/empty-statement");
handlers["ExpressionStatement"] = require("./handlers/expression-statement");
handlers["FunctionDeclaration"] = require("./handlers/function-declaration");
handlers["FunctionExpression"] = require("./handlers/function-expression");
handlers["Identifier"] = require("./handlers/identifier");
handlers["Literal"] = require("./handlers/literal");
handlers["MemberExpression"] = require("./handlers/member-expression");
handlers["Program"] = require("./handlers/program");
handlers["VariableDeclaration"] = require("./handlers/variable-declaration");
handlers["VariableDeclarator"] = require("./handlers/variable-declarator");

module.exports = handlers;
},{"./handlers/binary-expression":3,"./handlers/call-expression":4,"./handlers/empty-statement":5,"./handlers/expression-statement":6,"./handlers/function-declaration":7,"./handlers/function-expression":8,"./handlers/identifier":9,"./handlers/literal":10,"./handlers/member-expression":11,"./handlers/program":12,"./handlers/variable-declaration":13,"./handlers/variable-declarator":14}],3:[function(require,module,exports){
var binaryOperators = {
	"+": function (a, b) { return a + b; },
	"-": function (a, b) { return a - b; },
	"/": function (a, b) { return a / b; },
	"*": function (a, b) { return a * b; },
	"==": function (a, b) { return a == b; },
	"!=": function (a, b) { return a != b; },
	"===": function (a, b) { return a === b; },
	"!==": function (a, b) { return a !== b; },
	"<": function (a, b) { return a < b; },
	"<=": function (a, b) { return a <= b; },
	">": function (a, b) { return a > b; },
	">=": function (a, b) { return a >= b; }
	/*
         | "<<" | ">>" | ">>>"
         | "+" | "-" | "*" | "/" | "%"
         | "|" | "^" | "&" | "in"
         | "instanceof" | ".." */
}

module.exports = function (context) {
	var node = context.node;
	var scope = context.scope;
	
	var left = this.execute({ node: node.left, scope: scope }).value;
	var right = this.execute({ node: node.right, scope: scope }).value;
	var value = binaryOperators[node.operator](left, right);

	return scope.createPrimitive(value);
};

},{}],4:[function(require,module,exports){
module.exports = function (context) {
	var runner = this;
	var node = context.node;
	var scope = context.scope;

	var fn = this.execute({ node: node.callee, scope: scope, includeParent: true });
	var args = node.arguments.map(function (arg) { return runner.execute({ node: arg, scope: scope }); });

	if (fn.type === "function") {
		return fn.nativeFunction.apply(scope, args);
	} else {
		return fn.value.nativeFunction.apply(fn.parent, args);
	}
};
},{}],5:[function(require,module,exports){
module.exports = function() { };
},{}],6:[function(require,module,exports){
module.exports = 	function (context) {
	return this.execute({ node: context.node.expression, scope: context.scope });
};

},{}],7:[function(require,module,exports){
module.exports = function () { };
},{}],8:[function(require,module,exports){
module.exports = function (context) {
	
}
},{}],9:[function(require,module,exports){
module.exports = function (context) {
	return context.scope.getProperty(context.node.name);
};
},{}],10:[function(require,module,exports){
module.exports = function (context) {
	var node = context.node;
	var scope = context.scope;

	return scope.createPrimitive(node.value);
};
},{}],11:[function(require,module,exports){
module.exports = function (context) {
	var node = context.node;
	var scope = context.scope;

	//console.log(node);
	var obj = this.execute({ node: node.object, scope: scope });
	var value = this.execute({ node: node.property, scope: obj });
	
	// some callers need access to the parent as well
	// todo: this is sloppy - there should be another way to accomplish this
	if (context.includeParent) {
		return {
			parent: obj,
			value: value
		};
	}

	return value;
};
},{}],12:[function(require,module,exports){
module.exports = function (context) {
	var runner = this;
	var result;

	context.node.body.forEach(function (statement) {
		result = runner.execute({ node: statement, scope: context.scope });
	});

	return result;
};
},{}],13:[function(require,module,exports){
module.exports = function(context) {
	var runner = this;

	context.node.declarations.forEach(function (decl) {
		runner.execute({ node: decl, scope: context.scope });
	});
};
},{}],14:[function(require,module,exports){
module.exports = function(context) {
	var node = context.node;
	var scope = context.scope;
	var id = node.id.name;
	var value;

	if (node.init) {
		value = this.execute({ node: node.init, scope: scope });
	}

	scope.setProperty(id, value);
	return value;
};
},{}],15:[function(require,module,exports){
var FunctionType = require("../types/function-type");

module.exports = function (globalScope) {
	globalScope.types.FUNCTION = new FunctionType(function() {});
	globalScope.setProperty("Function", globalScope.types.FUNCTION);
};
},{"../types/function-type":21}],16:[function(require,module,exports){
var Scope = require("./scope");
var numberAPI = require("./number-api");
var stringAPI = require("./string-api");
var functionAPI = require("./function-api");
var objectAPI = require("./object-api");

module.exports = function () {
	var scope = new Scope();
	var types = scope.types;

	types.UNDEFINED = scope.createPrimitive(undefined);
	scope.setProperty("undefined", types.UNDEFINED, true);

	// set globals
	scope.setProperty("Infinity", scope.createPrimitive(Infinity), true);
	scope.setProperty("NaN", scope.createPrimitive(NaN), true);
	scope.setProperty("window", scope, true);

	// create function
	functionAPI(scope);
	objectAPI(scope);
	numberAPI(scope);
	stringAPI(scope);
	
	return scope;
};
},{"./function-api":15,"./number-api":17,"./object-api":18,"./scope":19,"./string-api":20}],17:[function(require,module,exports){
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toFixed", "toPrecision", "toString"];
var staticMethods = ["isNaN", "isInteger", "isFinite", "parseFloat", "parseInt"];

var polyfills = {
	"isNaN": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    	return typeof value === "number" && value !== value;
	},
	"isInteger": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
  		return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	},
	"isFinite": function (value) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
   		return typeof value === "number" && isFinite(value);
	},
	"parseFloat": parseFloat,
	"parseInt": parseInt
};

module.exports = function (globalScope) {
	var numberClass = objectFactory.create(utils.wrapNative(Number, globalScope));

	constants.forEach(function (name) {
		numberClass.setProperty(name, objectFactory.create(Number[name]), true, true);
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name] || polyfills[name];
		if (fn) {
			numberClass.proto.setProperty(name, objectFactory.create(utils.wrapNative(fn, globalScope)), false, true);
		}
	});

	staticMethods.forEach(function (name) {
		var fn = Number[name] || polyfills[name];
		if (fn) {
			numberClass.setProperty(name, objectFactory.create(utils.wrapNative(fn, globalScope)), false, true);
		}
	});

	objectFactory.types.NUMBER = numberClass;
	globalScope.setProperty("Number", numberClass);
};
},{"../types/object-factory":22,"../utils":26}],18:[function(require,module,exports){
var ObjectType = require("../types/object-type");

module.exports = function (globalScope) {
	globalScope.types.OBJECT = new ObjectType();
	globalScope.setProperty("Object", globalScope.types.OBJECT);
};
},{"../types/object-type":23}],19:[function(require,module,exports){
var ObjectType = require("../types/object-type");
var PrimitiveType = require("../types/primitive-type");

function Scope (parent) {
	ObjectType.call(this, parent);
	this.types = parent ? parent.types : Object.create(null);
}

Scope.prototype = Object.create(ObjectType.prototype);
Scope.prototype.createPrimitive = function (value) {
	var parent = this.types[(typeof value).toUpperCase()];
	return new PrimitiveType(value, parent);
};

Scope.prototype.createScope = function () {
	return new Scope(this);
};

Scope.prototype.constructor = Scope;
module.exports = Scope;
},{"../types/object-type":23,"../types/primitive-type":24}],20:[function(require,module,exports){
var FunctionType = require("../types/function-type");
var utils = require("../utils");

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice", "split", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim"];
var staticMethods = ["fromCharCode"];

var polyfills = {
	"trim": (function() {
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    	return function() {
      		return this.replace(rtrim, '');
    	};
	})()
};

module.exports = function (globalScope) {
	var stringClass = new FunctionType(utils.wrapNative(String, globalScope));

	constants.forEach(function (name) {
		stringClass.setProperty(name, globalScope.createPrimitive(String[name]), false, true);
	});

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name] || polyfills[name];
		if (fn) {
			stringClass.proto.setProperty(name, new FunctionType(utils.wrapNative(fn, globalScope)), false, true);
		}
	});

	staticMethods.forEach(function (name) {
		var fn = String[name] || polyfills[name];
		if (fn) {
			stringClass.setProperty(name, new FunctionType(utils.wrapNative(fn, globalScope)), false, true);
		}
	});

	globalScope.types.STRING = stringClass;
	globalScope.setProperty("String", stringClass);
};
},{"../types/function-type":21,"../utils":26}],21:[function(require,module,exports){
var ObjectType = require("./object-type");
var PrimitiveType = require("./primitive-type");

function FunctionType (nodeOrFn, parent) {
	ObjectType.call(this, null, parent);
	this.type = "function";

	// functions have prototypes - save to "proto" for easy reference
	this.setProperty("prototype", this.proto = new ObjectType());

	if (typeof nodeOrFn === "function") {
		this.nativeFunction = nodeOrFn;
		this.setProperty("length", new PrimitiveType(nodeOrFn.length), true);
	} else {
		this.node = nodeOrFn;
		this.setProperty("length", new PrimitiveType(nodeOrFn.params.length), true);
	}
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;
module.exports = FunctionType;
},{"./object-type":23,"./primitive-type":24}],22:[function(require,module,exports){
var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");

var objectRgx = /\[object (\w+)\]/

module.exports = {
	create: function (value) {
		var type = objectRgx.exec(Object.prototype.toString.call(value))[1].toUpperCase();
		var parent = this.types[type];

		switch (type) {
			case "STRING":
			case "NUMBER":
			case "BOOLEAN":
			case "DATE":
				return new PrimitiveType(value, parent);

			case "FUNCTION":
				return new FunctionType(value, parent);

			case "REGEXP":
				return new RegexType(value, parent);

			default:
				return new ObjectType(value, parent);
		}
	},

	types: Object.create(null)
};
},{"./function-type":21,"./object-type":23,"./primitive-type":24,"./regex-type":25}],23:[function(require,module,exports){
function ObjectType (value, parent) {
	this.isPrimitive = false;
	this.type = "object";
	this.value = value;
	this.parent = parent;
	
	this.fixed = Object.create(null);
	this.nonenumerable = Object.create(null);
	this.properties = Object.create(null);
}

ObjectType.prototype = {
	constructor: ObjectType,

	hasProperty: function (name) {
		return name in this.properties;
	},

	setProperty: function (name, value, fixed, nonenumerable) {
		if (fixed) {
			this.fixed[name] = true;
		}

		if (nonenumerable) {
			this.nonenumerable[name] = true;
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

		return null;
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
	}
};

module.exports = ObjectType;
},{}],24:[function(require,module,exports){
var ObjectType = require("./object-type");

function PrimitiveType(value, parent) {
	ObjectType.call(this, value, parent);

	this.isPrimitive = true;
	this.value = value;
	this.type = typeof value;
}

PrimitiveType.prototype = Object.create(ObjectType.prototype);
PrimitiveType.prototype.constructor = PrimitiveType;

// overwrite object methods
PrimitiveType.prototype.toBoolean = function () { return !!this.value; };
PrimitiveType.prototype.toNumber = function () { return Number(this.value); };
PrimitiveType.prototype.toString = function () { return String(this.value); };
PrimitiveType.prototype.valueOf = function () { return this.value; };

module.exports = PrimitiveType;
},{"./object-type":23}],25:[function(require,module,exports){
var ObjectType = require("./object-type");
var PrimitiveType = require("./primitive-type");

function RegexType (value, parent) {
	ObjectType.call(this, value, parent);

	// lastIndex is settable, all others are read-only attributes
	this.setProperty(obj, "lastIndex", new PrimitiveType(value.lastIndex), false, true);
	this.setProperty(obj, "source", new PrimitiveType(value.source), true, true);
	this.setProperty(obj, "global", new PrimitiveType(value.global), true, true);
	this.setProperty(obj, "ignoreCase", new PrimitiveType(value.ignoreCase), true, true);
	this.setProperty(obj, "multiline", new PrimitiveType(value.multiline), true, true);
}

RegexType.prototype = Object.create(ObjectType.prototype);
RegexType.prototype.constructor = RegexType;
module.exports = RegexType;
},{"./object-type":23,"./primitive-type":24}],26:[function(require,module,exports){
var PrimitiveType = require("./types/primitive-type");

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
	wrapNative: function (fn, globalScope) {
		return function () {
			var scope = this && this.value;
			var args = getValues(arguments);
			var value = fn.apply(scope, args);
			return globalScope.createPrimitive(value);
		}		
	}
};
},{"./types/primitive-type":24}]},{},[1]);
