(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _env = require("./env");

var _env2 = _interopRequireDefault(_env);

var _executionContext = require("./execution-context");

var _executionContext2 = _interopRequireDefault(_executionContext);

var SandBoxr = (function () {
	function SandBoxr(ast, config) {
		_classCallCheck(this, SandBoxr);

		this.ast = ast;
		this.config = config || {};
	}

	_createClass(SandBoxr, [{
		key: "execute",
		value: function execute(env) {
			if (!env) {
				env = SandBoxr.createEnvironment();
				env.init(this.config);
			}

			this.env = env;
			var executionResult = new _executionContext2["default"](env, this.ast).execute();
			return executionResult && executionResult.result;
		}
	}], [{
		key: "createEnvironment",
		value: function createEnvironment() {
			return new _env2["default"]();
		}
	}, {
		key: "create",
		value: function create(ast, config) {
			return new SandBoxr(ast, config);
		}
	}]);

	return SandBoxr;
})();

exports["default"] = SandBoxr;
module.exports = exports["default"];

},{"./env":37,"./execution-context":41}],2:[function(require,module,exports){
require('../../modules/es6.string.repeat');
module.exports = require('../../modules/$.core').String.repeat;
},{"../../modules/$.core":9,"../../modules/es6.string.repeat":22}],3:[function(require,module,exports){
require('../../modules/es6.math.sign');
module.exports = require('../../modules/$.core').Math.sign;
},{"../../modules/$.core":4,"../../modules/es6.math.sign":8}],4:[function(require,module,exports){
var core = module.exports = {};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],5:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$.core":4,"./$.global":6}],6:[function(require,module,exports){
var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
module.exports = global;
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],7:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],8:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $def = require('./$.def');

$def($def.S, 'Math', {sign: require('./$.sign')});
},{"./$.def":5,"./$.sign":7}],9:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],10:[function(require,module,exports){
var global     = require('./$.global')
  , core       = require('./$.core')
  , hide       = require('./$.hide')
  , $redef     = require('./$.redef')
  , PROTOTYPE  = 'prototype';
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)$redef(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$.core":9,"./$.global":12,"./$.hide":14,"./$.redef":17}],11:[function(require,module,exports){
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],14:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":15,"./$.property-desc":16,"./$.support-desc":19}],15:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],16:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],17:[function(require,module,exports){
var global     = require('./$.global')
  , has        = require('./$.has')
  , hide       = require('./$.hide')
  , tpl        = String({}.hasOwnProperty)
  , SRC        = require('./$.uid')('src')
  , _toString  = Function.toString;

function $redef(O, key, val, safe){
  if(typeof val == 'function'){
    var base = O[key];
    hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
    if(!('name' in val))val.name = key;
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
}

// add fake Function#toString for correct work wrapped methods / constructors
// with methods similar to LoDash isNative
$redef(Function.prototype, 'toString', function toString(){
  return has(this, SRC) ? this[SRC] : _toString.call(this);
});

require('./$.core').inspectSource = function(it){
  return _toString.call(it);
};

module.exports = $redef;
},{"./$.core":9,"./$.global":12,"./$.has":13,"./$.hide":14,"./$.uid":21}],18:[function(require,module,exports){
'use strict';
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$.defined":11,"./$.to-integer":20}],19:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !!function(){
  try {
    return Object.defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
},{}],20:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],21:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],22:[function(require,module,exports){
var $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.def":10,"./$.string-repeat":18}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = arrayApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _typesArrayType = require("../types/array-type");

var _typesArrayType2 = _interopRequireDefault(_typesArrayType);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function getStartIndex(index, length) {
	if (index < 0) {
		return Math.max(length - Math.abs(index), 0);
	}

	return Math.min(index || 0, length);
}

function getEndIndex(index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index, length);
}

function getLength(env, source) {
	if (source.hasProperty("length")) {
		return convert.toUInt32(env, source.getProperty("length").getValue());
	}

	return 0;
}

function executeCallback(callback, thisArg, executionContext, index) {
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

function executeAccumulator(callback, priorValue, executionContext, index) {
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

function createIndexProperty(value) {
	return {
		value: value,
		configurable: true,
		enumerable: true,
		writable: true
	};
}

function arrayApi(env) {
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
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = arrayClass.getProperty("prototype").getValue();
	proto.className = "Array";
	proto.define("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

	arrayClass.define("isArray", objectFactory.createBuiltInFunction(function (obj) {
		return objectFactory.createPrimitive(!!(obj && obj.className === "Array"));
	}, 1, "Array.isArray"));

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

		for (var _len = arguments.length, elements = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			elements[_key - 2] = arguments[_key];
		}

		var newCount = elements.length;
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
			this.node.putValue(k, elements[i]);
			k++;
		}

		this.node.putValue("length", objectFactory.createPrimitive(length - deleteCount + newCount));
		return removed;
	}, 2, "Array.prototype.splice"));

	proto.define("concat", objectFactory.createBuiltInFunction(function () {
		var newArray = objectFactory.create("Array");

		// add "this" array to bunch

		for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			arrays[_key2] = arguments[_key2];
		}

		arrays.unshift(convert.toObject(env, this.node));

		var current,
		    index = 0,
		    i,
		    length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof _typesArrayType2["default"]) {
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

	function join(separator) {
		var length = getLength(env, this.node);
		separator = arguments.length === 0 || separator === undef ? "," : convert.toPrimitive(env, separator, "string");
		var stringValues = [];
		var stringValue;

		for (var i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getProperty(i).getValue();
				if (contracts.isNullOrUndefined(stringValue)) {
					stringValue = "";
				} else {
					stringValue = convert.toString(env, stringValue);
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
		contracts.assertIsFunction(callback, this.node);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}, 1, "Array.prototype.forEach"));

	proto.define("map", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");
		contracts.assertIsFunction(callback, this.node);

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
		contracts.assertIsFunction(callback, this.node);

		var newArray = objectFactory.create("Array");
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && convert.toBoolean(executeCallback(callback, thisArg, this, i))) {
				newArray.defineOwnProperty(index++, createIndexProperty(this.node.getProperty(i).getValue()), true, env);
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"));

	proto.define("every", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		var length = getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !convert.toBoolean(executeCallback(callback, thisArg, this, i))) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}, 1, "Array.prototype.every"));

	proto.define("some", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");
		var length = getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && convert.toBoolean(executeCallback(callback, thisArg, this, i))) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"));

	proto.define("reduce", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");
		contracts.assertIsFunction(callback, this.node);

		var index = 0;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index < length && !this.node.hasProperty(index)) {
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
		contracts.assertIsFunction(callback, this.node);

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
		if (contracts.isNullOrUndefined(compareFunction)) {
			comparer = function defaultComparer(a, b) {
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
		.map(function (el) {
			return el.isPrimitive && el.value === undefined ? undefined : el;
		}).sort(comparer);

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
		var length = getLength(env, this.node);
		var arr = new Array(length);
		var i = 0;
		var current;

		while (i < length) {
			if (this.node.hasProperty(i)) {
				current = this.node.getProperty(i).getValue();

				if (contracts.isNullOrUndefined(current)) {
					arr[i] = "";
				} else {
					arr[i] = convert.toString(env, func.tryCallMethod(env, current, "toLocaleString"));
				}
			}

			i++;
		}

		return objectFactory.createPrimitive(arr.join());
	}, 0, "Array.prototype.toLocaleString"));

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.define("toString", objectFactory.createBuiltInFunction(join, 0, "Array.prototype.toString"));
	globalObject.define("Array", arrayClass);
}

module.exports = exports["default"];

},{"../types/array-type":45,"../utils/contracts":56,"../utils/convert":57,"../utils/func":58}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = booleanApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function booleanApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var booleanClass = objectFactory.createFunction(function (obj) {
		var booleanValue = convert.toBoolean(obj);

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(env, booleanValue);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = booleanClass.getProperty("prototype").getValue();
	proto.className = "Boolean";
	proto.value = false;

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.toString");
		return objectFactory.createPrimitive(String(this.node.value));
	}, 0, "Boolean.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "Boolean.prototype.valueOf"));

	globalObject.define("Boolean", booleanClass);
}

module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = consoleApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var methods = ["log", "info", "error"];

function consoleApi(env) {
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
}

module.exports = exports["default"];

},{"../utils/convert":57}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = dateApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var staticMethods = ["now"];
var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];
var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];
var slice = Array.prototype.slice;

function dateApi(env) {
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
			args = slice.call(arguments).map(function (arg) {
				return convert.toPrimitive(env, arg, "number");
			});
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
	}, null, { configurable: false, enumerable: false, writable: false });

	dateClass.define("parse", objectFactory.createBuiltInFunction(function (value) {
		var stringValue = convert.toPrimitive(env, value, "string");
		var dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, 1, "Date.prototype.parse"));

	dateClass.define("UTC", objectFactory.createBuiltInFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var args = slice.call(arguments).map(function (arg) {
			return convert.toPrimitive(env, arg, "number");
		});
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, 7, "Date.prototype.UTC"));

	var proto = dateClass.getProperty("prototype").getValue();
	proto.className = "Date";
	proto.value = new Date(Date.prototype);

	staticMethods.forEach(function (name) {
		dateClass.define(name, convert.toNativeFunction(env, Date[name], "Date." + name));
	});

	protoMethods.forEach(function (name) {
		proto.define(name, convert.toNativeFunction(env, Date.prototype[name], "Date.prototype." + name));
	});

	setters.forEach(function (name) {
		function setter() {
			var args = slice.call(arguments).map(function (arg) {
				return convert.toPrimitive(env, arg);
			});
			Date.prototype[name].apply(this.node.value, args);
		}

		proto.define(name, objectFactory.createBuiltInFunction(setter, Date.prototype[name].length, "Date.prototype." + name));
	});

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		return objectFactory.createPrimitive(this.node.value.valueOf());
	}, 0, "Date.prototype.valueOf"));

	globalObject.define("Date", dateClass);
}

module.exports = exports["default"];

},{"../utils/convert":57}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = errorApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

function createError(objectFactory, message, name) {
	var options = null;
	if (name) {
		options = { name: name };
	}

	var obj = objectFactory.create("Error", options);

	if (!contracts.isNullOrUndefined(message)) {
		obj.defineOwnProperty("message", { value: message, configurable: true, enumerable: false, writable: true }, false);
	}

	return obj;
}

function errorApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var errorClass = objectFactory.createFunction(function (message) {
		return createError(objectFactory, message);
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = errorClass.getProperty("prototype").getValue();
	proto.className = "Error";
	proto.define("name", objectFactory.createPrimitive("Error"));
	proto.define("message", objectFactory.createPrimitive(""));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		var name = this.node.getProperty("name").getValue();
		var msg;

		if (this.node.hasProperty("message")) {
			msg = convert.toString(env, this.node.getProperty("message").getValue());
		}

		name = name && convert.toString(env, name);
		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}, 0, "Error.prototype.toString"));

	globalObject.define("Error", errorClass);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			return createError(objectFactory, message, type);
		}, null, { configurable: false, enumerable: false, writable: false });

		var typeProto = errClass.getProperty("prototype").getValue();
		typeProto.define("name", objectFactory.createPrimitive(type));

		// add to prototype chain to represent inheritance
		typeProto.setPrototype(proto);

		globalObject.define(type, errClass);
	});
}

module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = functionApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _typesNativeFunctionType = require("../types/native-function-type");

var _typesNativeFunctionType2 = _interopRequireDefault(_typesNativeFunctionType);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function defineThis(env, fn, thisArg) {
	if (fn.builtIn) {
		return thisArg || env.global.getProperty("undefined").getValue();
	}

	if (contracts.isNullOrUndefined(thisArg)) {
		return env.global;
	}

	return convert.toObject(env, thisArg);
}

var frozen = { configurable: false, enumerable: false, writable: false };

function functionApi(env, options) {
	var globalObject = env.global;
	var undef = env.global.getProperty("undefined").getValue();
	var objectFactory = env.objectFactory;
	var funcClass;

	var funcCtor = function funcCtor() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var funcInstance;

		if (options.parser && args.length > 0) {
			var fn;
			var wrappedFunc;

			(function () {
				var body = args.pop();

				if (args.length > 0) {
					args = args.map(function (arg, index) {
						if (contracts.isNull(arg)) {
							throw new SyntaxError("Unexpected token null");
						}

						return contracts.isUndefined(arg) ? "" : convert.toString(env, arg);
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

				fn = objectFactory.createFunction(callee);

				wrappedFunc = function wrappedFunc() {
					var thisArg = this.node || globalObject;
					if (this.isNew) {
						thisArg = objectFactory.createObject(funcInstance);
					}

					var executionResult = func.getFunctionResult(env, fn, params, arguments, thisArg, callee);

					if (this.isNew) {
						return thisArg;
					}

					return executionResult && executionResult.result || undef;
				};

				wrappedFunc.nativeLength = callee.params.length;
				funcInstance = objectFactory.createFunction(wrappedFunc);
				funcInstance.bindScope(env.globalScope);
			})();
		} else {
			funcInstance = objectFactory.createFunction(function () {});
		}

		funcInstance.putValue("constructor", funcClass);
		return funcInstance;
	};

	// the prototype of a function is actually callable and evaluates as a function
	var proto = new _typesNativeFunctionType2["default"](function () {});

	funcCtor.nativeLength = 1;
	funcClass = objectFactory.createFunction(funcCtor, proto, frozen);
	funcClass.putValue("constructor", funcClass);

	globalObject.define("Function", funcClass);

	proto.define("length", objectFactory.createPrimitive(0), frozen);

	// function itself is a function
	funcClass.setPrototype(proto);

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.native) {
			return objectFactory.createPrimitive("function () { [native code] }");
		}

		return objectFactory.createPrimitive("function () { [user code] }");
	}, 0, "Function.prototype.toString"));

	proto.define("call", objectFactory.createBuiltInFunction(function (thisArg) {
		var params = this.node.native ? [] : this.node.node.params;
		var callee = this.node.native ? this.node : this.node.node;
		thisArg = defineThis(env, this.node, thisArg);
		this.node.bindThis(thisArg);

		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		return func.executeFunction(env, this.node, params, args, thisArg, callee);
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

		return func.executeFunction(env, this.node, params, args, thisArg, callee);
	}, 2, "Function.prototype.apply"));

	proto.define("bind", objectFactory.createBuiltInFunction(function (thisArg) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		var fn = this.node;
		var params = fn.native ? [] : fn.node.params;
		var callee = fn.native ? fn : fn.node;
		thisArg = defineThis(env, this.node, thisArg);

		var thrower = function thrower() {
			throw new TypeError("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
		};
		var throwProperties = {
			get: undefined,
			getter: thrower,
			set: undefined,
			setter: thrower,
			enumerable: false,
			configurable: false
		};

		var nativeFunc = function nativeFunc() {
			for (var _len4 = arguments.length, additionArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				additionArgs[_key4] = arguments[_key4];
			}

			var mergedArgs = args.concat(additionArgs);
			return func.executeFunction(env, fn, params, mergedArgs, thisArg, callee, this.isNew);
		};

		nativeFunc.nativeLength = Math.max(params.length - args.length, 0);
		var boundFunc = objectFactory.createFunction(nativeFunc);

		boundFunc.defineOwnProperty("caller", throwProperties);
		boundFunc.defineOwnProperty("arguments", throwProperties);
		boundFunc.defineOwnProperty("callee", throwProperties);
		boundFunc.bindScope(this.env.current);
		boundFunc.bindThis(thisArg);

		return boundFunc;
	}, 1, "Function.prototype.bind"));
}

module.exports = exports["default"];

},{"../types/native-function-type":49,"../utils/contracts":56,"../utils/convert":57,"../utils/func":58}],29:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ecma51;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _typesPrimitiveType = require("../types/primitive-type");

var _typesPrimitiveType2 = _interopRequireDefault(_typesPrimitiveType);

var _typesObjectFactory = require("../types/object-factory");

var _typesObjectFactory2 = _interopRequireDefault(_typesObjectFactory);

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var _numberApi = require("./number-api");

var _numberApi2 = _interopRequireDefault(_numberApi);

var _stringApi = require("./string-api");

var _stringApi2 = _interopRequireDefault(_stringApi);

var _functionApi = require("./function-api");

var _functionApi2 = _interopRequireDefault(_functionApi);

var _objectApi = require("./object-api");

var _objectApi2 = _interopRequireDefault(_objectApi);

var _booleanApi = require("./boolean-api");

var _booleanApi2 = _interopRequireDefault(_booleanApi);

var _dateApi = require("./date-api");

var _dateApi2 = _interopRequireDefault(_dateApi);

var _arrayApi = require("./array-api");

var _arrayApi2 = _interopRequireDefault(_arrayApi);

var _mathApi = require("./math-api");

var _mathApi2 = _interopRequireDefault(_mathApi);

var _regexApi = require("./regex-api");

var _regexApi2 = _interopRequireDefault(_regexApi);

var _errorApi = require("./error-api");

var _errorApi2 = _interopRequireDefault(_errorApi);

var _jsonApi = require("./json-api");

var _jsonApi2 = _interopRequireDefault(_jsonApi);

var _consoleApi = require("./console-api");

var _consoleApi2 = _interopRequireDefault(_consoleApi);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var frozen = { configurable: false, enumerable: false, writable: false };

function ecma51(env, config) {
	config = config || {};
	var objectFactory = env.objectFactory = new _typesObjectFactory2["default"](env);
	var globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	var undefinedClass = new _typesPrimitiveType2["default"](undefined);
	globalObject.define("undefined", undefinedClass, frozen);

	var nullClass = new _typesPrimitiveType2["default"](null);
	globalObject.define("null", nullClass, frozen);

	globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), frozen);
	globalObject.define("NaN", objectFactory.createPrimitive(NaN), frozen);

	// todo: node vs browser - do we care?
	globalObject.define("window", globalObject, frozen);

	(0, _functionApi2["default"])(env, config);
	(0, _objectApi2["default"])(env, config);
	(0, _arrayApi2["default"])(env, config);
	(0, _booleanApi2["default"])(env, config);
	(0, _numberApi2["default"])(env, config);
	(0, _stringApi2["default"])(env, config);
	(0, _dateApi2["default"])(env, config);
	(0, _regexApi2["default"])(env, config);
	(0, _mathApi2["default"])(env, config);
	(0, _errorApi2["default"])(env, config);
	(0, _jsonApi2["default"])(env, config);
	(0, _consoleApi2["default"])(env, config);

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

			var indirect = !(this.callee instanceof _envReference2["default"]) || this.callee.base !== globalObject;
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

		globalObject.define("eval", evalFunc);
	}

	objectFactory.init();

	if (config.exclude && config.exclude.length > 0) {
		config.exclude.forEach(function (name) {
			var segments = name.split(".");
			var parent = globalObject;

			while (segments.length > 1) {
				parent = parent.getValue(segments.shift());

				// api not defined - assume user error?
				if (!parent) {
					return;
				}
			}

			parent.remove(segments.shift());
		});
	}
}

module.exports = exports["default"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../env/reference":40,"../types/object-factory":50,"../types/primitive-type":52,"../utils/convert":57,"./array-api":23,"./boolean-api":24,"./console-api":25,"./date-api":26,"./error-api":27,"./function-api":28,"./json-api":30,"./math-api":31,"./number-api":32,"./object-api":33,"./regex-api":34,"./string-api":35}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = jsonApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

require("core-js/fn/string/repeat");

var primitives = {
	"String": true,
	"Number": true,
	"Boolean": true,
	"Date": true
};

function formatValues(values, gap, depth) {
	if (values.length === 0) {
		return "";
	}

	if (!gap) {
		return values.join(",");
	}

	var indent = "\n" + gap.repeat(depth);
	var joinedValues = values.join(indent + ",");

	// remove indent on closing
	return indent + joinedValues + "\n" + gap.repeat(depth - 1);
}

function serializePrimitive(value) {
	return JSON.stringify(value);
}

function serializeObject(env, stack, obj, replacer, gap, depth) {
	var colon = gap ? ": " : ":";
	var values = [];
	var value;

	for (var prop in obj.properties) {
		if (obj.properties[prop].enumerable) {
			value = replacer(obj, prop, obj.getProperty(prop).getValue());
			if (!contracts.isNullOrUndefined(value)) {
				values.push(serializePrimitive(prop) + colon + serialize(env, stack, value, replacer, gap, depth));
			}
		}
	}

	return "{" + formatValues(values, gap, depth, gap, depth) + "}";
}

function serializeArray(env, stack, arr, replacer, gap, depth) {
	var length = arr.getProperty("length").getValue().value;
	var values = [];
	var value;

	for (var i = 0; i < length; i++) {
		value = undefined;
		if (arr.hasProperty(i)) {
			value = replacer(arr, String(i), arr.getProperty(i).getValue());
		}

		if (contracts.isNullOrUndefined(value)) {
			// undefined positions are replaced with null
			values.push("null");
		} else {
			values.push(serialize(env, stack, value, replacer));
		}
	}

	return "[" + formatValues(values, gap, depth) + "]";
}

function serialize(env, stack, obj, replacer, gap, depth) {
	if (!obj) {
		return serializePrimitive();
	}

	if (obj.isPrimitive || obj.className in primitives) {
		return serializePrimitive(obj.value);
	}

	if (obj.className === "Function") {
		return undefined;
	}

	var jsonString = func.tryCallMethod(env, obj, "toJSON");
	if (jsonString) {
		return serializePrimitive(jsonString.value);
	}

	if (stack.indexOf(obj) >= 0) {
		throw new TypeError("Converting circular structure to JSON");
	}

	depth++;
	stack.push(obj);

	var jsonResult;
	if (obj.className === "Array") {
		jsonResult = serializeArray(env, stack, obj, replacer);
	} else {
		jsonResult = serializeObject(env, stack, obj, replacer, gap, depth);
	}

	depth--;
	stack.pop();
	return jsonResult;
}

function createReplacer(env, replacer) {
	if (replacer) {
		if (replacer.className === "Function") {
			return function (holder, key, value) {
				var args = [env.objectFactory.createPrimitive(key), value];
				var params = replacer.native ? [] : replacer.node.params;
				var callee = replacer.native ? replacer : replacer.node;

				return func.executeFunction(env, replacer, params, args, holder, callee);
			};
		}

		if (replacer.className === "Array") {
			var keys = convert.toArray(replacer).map(function (arg) {
				if (arg.className === "String") {
					return convert.toString(env, arg);
				}

				if (arg.className === "Number") {
					return String(convert.toNumber(env, arg));
				}

				return undefined;
			});

			return function (holder, key, value) {
				// allow empty key - this will be from the root
				if (!key || keys.indexOf(key) >= 0) {
					return value;
				}

				return undefined;
			};
		}
	}

	return function (holder, key, value) {
		return value;
	};
}

function getSpacer(env, spacer) {
	if (spacer) {
		if (spacer.className === "Number") {
			var count = Math.floor(convert.toNumber(env, spacer));
			count = Math.max(Math.min(10, count), 0);

			if (count > 0) {
				return " ".repeat(count);
			}

			return "";
		}

		if (spacer.className === "String") {
			var gap = convert.toString(env, spacer);
			return gap.substr(0, 10);
		}
	}

	return "";
}

function deserialize(objectFactory, value, reviver) {
	var valueType = contracts.getType(value);
	switch (valueType) {
		// these are the only types supported by JSON.parse - sad face...
		case "Undefined":
		case "Null":
		case "String":
		case "Number":
		case "Boolean":
			return objectFactory.create(valueType, value);

		case "Array":
			var arr = objectFactory.create("Array");
			value.forEach(function (element, index) {
				var elementValue = reviver(arr, String(index), deserialize(objectFactory, element, reviver));
				if (!contracts.isUndefined(elementValue)) {
					arr.defineOwnProperty(index, { value: deserialize(objectFactory, element), configurable: true, enumerable: true, writable: true });
				}
			});

			return arr;

		default:
			var obj = objectFactory.createObject();
			var propValue;

			for (var prop in value) {
				if (value.hasOwnProperty(prop)) {
					propValue = reviver(obj, prop, deserialize(objectFactory, value[prop], reviver));
					if (!contracts.isUndefined(propValue)) {
						obj.defineOwnProperty(prop, { value: propValue, configurable: true, enumerable: true, writable: true });
					}
				}
			}

			return obj;
	}
}

function createReviver(env, reviver) {
	if (reviver && reviver.className === "Function") {
		return function (holder, key, value) {
			var args = [env.objectFactory.createPrimitive(key), value];
			var params = reviver.native ? [] : reviver.node.params;
			var callee = reviver.native ? reviver : reviver.node;

			return func.executeFunction(env, reviver, params, args, holder, callee);
		};
	}

	return function (holder, key, value) {
		return value;
	};
}

function jsonApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var undef = env.global.getProperty("undefined").getValue();
	var jsonClass = objectFactory.createObject();
	jsonClass.className = "JSON";

	jsonClass.define("stringify", objectFactory.createBuiltInFunction(function (obj, replacer, spacer) {
		replacer = createReplacer(env, replacer);
		spacer = getSpacer(env, spacer);

		// run at the top value
		obj = replacer(obj, "", obj);
		if (contracts.isUndefined(obj)) {
			return undef;
		}

		var stack = [];
		return objectFactory.createPrimitive(serialize(env, stack, obj, replacer, spacer, 0));
	}, 3, "JSON.stringify"));

	jsonClass.define("parse", objectFactory.createBuiltInFunction(function (str, reviver) {
		reviver = createReviver(env, reviver);

		var stringValue = convert.toString(env, str);
		var parsedObject = JSON.parse(stringValue);
		var deserializedObject = deserialize(objectFactory, parsedObject, reviver);

		return reviver(deserializedObject, "", deserializedObject) || undef;
	}, 2, "JSON.parse"));

	globalObject.define("JSON", jsonClass);
}

module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57,"../utils/func":58,"core-js/fn/string/repeat":2}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = mathApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

function mathApi(env) {
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
}

module.exports = exports["default"];

},{"../utils/convert":57}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = numberApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var constants = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
var protoMethods = ["toExponential", "toPrecision", "toLocaleString"];

function numberApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var numberClass = objectFactory.createFunction(function (obj) {
		var numberValue = Number(convert.toPrimitive(env, obj, "number"));

		if (this.isNew) {
			return convert.primitiveToObject(env, numberValue);
		}

		return objectFactory.create("Number", numberValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = numberClass.getProperty("prototype").getValue();
	proto.className = "Number";
	proto.value = 0;

	proto.define("toString", objectFactory.createBuiltInFunction(function (radix) {
		contracts.assertIsNotGeneric(this.node, "Number", "Number.prototype.toString");

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
		contracts.assertIsNotGeneric(this.node, "Number", "Number.prototype.toFixed");

		var digits = 0;
		if (fractionDigits) {
			digits = convert.toNumber(env, fractionDigits);
		}

		return objectFactory.createPrimitive(Number.prototype.toFixed.call(this.node.value, digits));
	}, 1, "Number.prototype.toFixed"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Number", "Number.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value == null ? 0 : this.node.value);
	}, 0, "Number.prototype.valueOf"));

	constants.forEach(function (name) {
		numberClass.define(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
	});

	protoMethods.forEach(function (name) {
		var fn = Number.prototype[name];
		if (fn) {
			(function () {
				var methodName = "Number.prototype." + name;
				proto.define(name, objectFactory.createBuiltInFunction(function () {
					contracts.assertIsNotGeneric(this.node, "Number", methodName);
					return objectFactory.createPrimitive(fn.call(this.node.value));
				}, fn.length, methodName));
			})();
		}
	});

	globalObject.define("Number", numberClass);
}

module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = objectApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _typesObjectType = require("../types/object-type");

var _typesObjectType2 = _interopRequireDefault(_typesObjectType);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

function isObject(obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

function defineProperty(env, obj, name, descriptor) {
	if (!isObject(descriptor)) {
		throw new TypeError("Property description must be an object: " + convert.toString(env, descriptor));
	}

	var undef = env.global.getProperty("undefined").getValue();
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
				options[prop] = convert.toBoolean(attrValue);
			}
		});

		var currentScope = env.current;

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (hasGetter) {
			var getter = descriptor.getProperty("get").getValue() || undef;
			if (getter.isPrimitive && getter.value === undefined) {
				options.get = options.getter = undefined;
			} else {
				if (getter.className !== "Function") {
					throw new TypeError("Getter must be a function: " + convert.toString(env, getter));
				}

				options.get = getter;
				options.getter = function () {
					var scope = env.setScope(currentScope);
					var thisArg = convert.toObject(env, this);

					try {
						var getResult = func.getFunctionResult(env, getter, getter.node.params, [], thisArg, getter.node);
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
					throw new TypeError("Setter must be a function: " + convert.toString(env, setter));
				}

				options.set = setter;
				options.setter = function () {
					var scope = env.setScope(currentScope);
					var thisArg = convert.toObject(env, this);

					try {
						func.executeFunction(env, setter, setter.node.params, arguments, thisArg, setter.node);
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

	obj.defineOwnProperty(name, options, true, env);
}

function objectApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var undef = globalObject.getProperty("undefined").getValue();

	var proto = new _typesObjectType2["default"]();
	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				if (value.value == null) {
					return objectFactory.createObject();
				}

				var objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				return objectWrapper;
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	}, proto, { configurable: false, enumerable: false, writable: false });

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
		name = convert.toString(env, name);
		var descriptor = this.node.getOwnProperty(name);
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"));

	objectClass.define("create", objectFactory.createBuiltInFunction(function (parent, descriptors) {
		if (parent && parent.isPrimitive && parent.value !== null) {
			throw new TypeError("Object prototype may only be an Object or null:" + convert.toString(env, parent));
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
					defineProperty(env, obj, prop, descriptors.getProperty(prop).getValue());
				}
			}
		}

		return obj;
	}, 2, "Object.create"));

	objectClass.define("defineProperty", objectFactory.createBuiltInFunction(function (obj, prop, descriptor) {
		contracts.assertIsObject(obj, "Object.defineProperty");

		defineProperty(env, obj, convert.toString(env, prop), descriptor);
		return obj;
	}, 3, "Object.defineProperty"));

	objectClass.define("defineProperties", objectFactory.createBuiltInFunction(function (obj, descriptors) {
		contracts.assertIsObject(obj, "Object.defineProperties");
		contracts.assertArgIsNotNullOrUndefined(descriptors);

		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(env, obj, prop, descriptors.getProperty(prop).getValue());
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
			result.putValue("configurable", objectFactory.createPrimitive(descriptor.configurable), false);
			result.putValue("enumerable", objectFactory.createPrimitive(descriptor.enumerable), false);

			if (descriptor.dataProperty) {
				result.putValue("value", descriptor.value, false);
				result.putValue("writable", objectFactory.createPrimitive(descriptor.writable), false);
			} else {
				result.putValue("get", descriptor.get || undef, false);
				result.putValue("set", descriptor.set || undef, false);
			}

			return result;
		}

		return undef;
	}, 2, "Object.getOwnPropertyDescriptor"));

	objectClass.define("keys", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj);

		var arr = objectFactory.create("Array");
		var index = 0;

		for (var _name in obj.properties) {
			if (obj.properties[_name].enumerable) {
				var value = objectFactory.createPrimitive(_name);
				arr.defineOwnProperty(index++, { configurable: true, enumerable: true, writable: true, value: value }, false, env);
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

		var objProto = obj.getPrototype();
		return objProto || env.global.getProperty("null").getValue();
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
				if (obj.properties[prop].writable || obj.properties[prop].configurable) {
					return objectFactory.createPrimitive(false);
				}
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
				if (obj.properties[prop].configurable) {
					return objectFactory.createPrimitive(false);
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"));

	// function is an object - make sure that it is in the prototype chain
	globalObject.getProperty("Function").getValue().getPrototype().setPrototype(proto);
	globalObject.define("Object", objectClass);
}

module.exports = exports["default"];

},{"../types/object-type":51,"../utils/contracts":56,"../utils/convert":57,"../utils/func":58}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = regexApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

function regexApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var regexClass = objectFactory.createFunction(function (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			if (!contracts.isUndefined(flags)) {
				throw new TypeError("Cannot supply flags when constructing one RegExp from another");
			}

			return pattern;
		}

		var patternString = contracts.isUndefined(pattern) ? "" : convert.toString(env, pattern);
		flags = contracts.isUndefined(flags) ? "" : convert.toString(env, flags);

		return objectFactory.create("RegExp", new RegExp(patternString, flags));
	}, null, { configurable: false, enumerable: false, writable: false });

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
		return objectFactory.createPrimitive(String(this.node.source));
	}, 0, "RegExp.prototype.toString"));

	proto.define("compile", convert.toNativeFunction(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
	proto.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(0), writable: true });

	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, { value: objectFactory.createPrimitive(RegExp.prototype[name]) });
	});

	globalObject.define("RegExp", regexClass);
}

module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = stringApi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase"];
var slice = Array.prototype.slice;

function stringApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = value ? convert.toString(env, value.getValue()) : "";

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(env, stringValue);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, { configurable: false, enumerable: false, writable: false });

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
		end = contracts.isNullOrUndefined(end) ? length : convert.toInteger(env, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}, 2, "String.prototype.substring"));

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.define(name, objectFactory.createBuiltInFunction(function () {
				var stringValue = convert.toString(env, this.node);
				var args = slice.call(arguments).map(function (arg) {
					return convert.toPrimitive(env, arg);
				});
				return objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args));
			}, String.prototype[name].length, "String.prototype." + name));
		}
	});

	stringClass.define("fromCharCode", objectFactory.createBuiltInFunction(function () {
		for (var _len = arguments.length, charCodes = Array(_len), _key = 0; _key < _len; _key++) {
			charCodes[_key] = arguments[_key];
		}

		var args = charCodes.map(function (arg) {
			return convert.toPrimitive(env, arg);
		});
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}, 1, "String.fromCharCode"));

	proto.define("slice", objectFactory.createBuiltInFunction(function (start, end) {
		var stringValue = convert.toString(env, this.node);
		var startValue = convert.toInteger(env, start);
		var endValue;

		if (!contracts.isNullOrUndefined(end)) {
			endValue = convert.toInteger(env, end);
		}

		return objectFactory.createPrimitive(stringValue.slice(startValue, endValue));
	}, 2, "String.prototype.slice"));

	proto.define("split", objectFactory.createBuiltInFunction(function (separator, limit) {
		var stringValue = convert.toString(env, this.node);
		separator = separator && separator.getValue();
		limit = limit && limit.getValue();
		var limitValue = contracts.isUndefined(limit) ? undefined : convert.toUInt32(env, limit);

		var arr = objectFactory.create("Array");
		if (contracts.isUndefined(separator)) {
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
			var callee = substrOrFn.native ? substrOrFn : substrOrFn.node;
			var params = callee.params || [];

			replacer = function () {
				var args = slice.call(arguments).map(function (arg) {
					return objectFactory.createPrimitive(arg);
				});
				var replacedValue = func.executeFunction(env, substrOrFn, params, args, globalObject, callee);
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

		if (regex && regex.className === "RegExp") {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(convert.toPrimitive(env, regex));
		}

		var match = stringValue.match(actualRegex);
		if (match) {
			var matches = objectFactory.create("Array");

			match.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value), false);
			});

			matches.putValue("index", objectFactory.createPrimitive(match.index), false);
			matches.putValue("input", objectFactory.createPrimitive(match.input), false);
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
		contracts.assertIsNotGeneric(this.node, "String", "String.prototype.toString");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "String", "String.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.valueOf"));

	globalObject.define("String", stringClass);
}

module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57,"../utils/func":58}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _reference = require("./reference");

var _reference2 = _interopRequireDefault(_reference);

var _typesPropertyDescriptor = require("../types/property-descriptor");

var _typesPropertyDescriptor2 = _interopRequireDefault(_typesPropertyDescriptor);

var DeclarativeEnvironment = (function () {
	function DeclarativeEnvironment(parent, thisArg, env) {
		_classCallCheck(this, DeclarativeEnvironment);

		this.properties = Object.create(null);
		this.parent = parent;
		this.thisNode = thisArg;
		this.env = env;
	}

	_createClass(DeclarativeEnvironment, [{
		key: "getReference",
		value: function getReference(name, strict) {
			return new _reference2["default"](name, this, strict, this.env);
		}
	}, {
		key: "hasVariable",
		value: function hasVariable(name) {
			return name in this.properties;
		}
	}, {
		key: "getVariable",
		value: function getVariable(name) {
			return this.properties[name];
		}
	}, {
		key: "deleteVariable",
		value: function deleteVariable(name) {
			if (!this.hasVariable(name)) {
				return true;
			}

			if (!this.properties[name].configurable) {
				return false;
			}

			delete this.properties[name];
			return true;
		}
	}, {
		key: "createVariable",
		value: function createVariable(name) {
			if (this.hasVariable(name)) {
				return this.properties[name];
			}

			return this.properties[name] = new _typesPropertyDescriptor2["default"](this, {
				value: undefined,
				configurable: false,
				enumerable: true,
				writable: true
			});
		}
	}, {
		key: "putValue",
		value: function putValue(name, value, throwOnError) {
			if (this.hasVariable(name)) {
				if (!this.properties[name].writable) {
					if (throwOnError) {
						throw new TypeError("Cannot write to immutable binding: " + name);
					}

					return;
				}

				this.properties[name].setValue(value);
			}
		}
	}, {
		key: "getValue",
		value: function getValue(name, throwOnError) {
			if (this.hasVariable(name)) {
				if (!this.properties[name].value) {
					if (throwOnError) {
						throw new ReferenceError(name + " is not defined");
					}

					return undefined;
				}

				return this.properties[name].getValue();
			}
		}
	}, {
		key: "getThisBinding",
		value: function getThisBinding() {
			return this.thisNode;
		}
	}]);

	return DeclarativeEnvironment;
})();

exports["default"] = DeclarativeEnvironment;
module.exports = exports["default"];

},{"../types/property-descriptor":53,"./reference":40}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _executionContext = require("../execution-context");

var _executionContext2 = _interopRequireDefault(_executionContext);

var _declarativeEnvironment = require("./declarative-environment");

var _declarativeEnvironment2 = _interopRequireDefault(_declarativeEnvironment);

var _objectEnvironment = require("./object-environment");

var _objectEnvironment2 = _interopRequireDefault(_objectEnvironment);

var _reference = require("./reference");

var _reference2 = _interopRequireDefault(_reference);

var _keywords = require("../keywords");

var _keywords2 = _interopRequireDefault(_keywords);

var _ecma51 = require("../ecma-5.1");

var _ecma512 = _interopRequireDefault(_ecma51);

var scopedBlocks = {
	"CallExpression": true,
	"NewExpression": true,
	"FunctionExpression": true,
	"WithStatement": true
};

function populateHoistedVariables(node, declarators, parent) {
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

function isStrictMode(_x) {
	var _again = true;

	_function: while (_again) {
		var node = _x;
		_again = false;

		if (Array.isArray(node)) {
			_x = node[0];
			_again = true;
			continue _function;
		}

		return node && node.type === "ExpressionStatement" && node.expression.type === "Literal" && node.expression.value === "use strict";
	}
}

var Environment = (function () {
	function Environment() {
		_classCallCheck(this, Environment);
	}

	_createClass(Environment, [{
		key: "init",
		value: function init(config) {
			// clear state in case of re-init
			this.current = null;
			this.globalScope = null;

			(0, _ecma512["default"])(this, config);
		}
	}, {
		key: "getReference",
		value: function getReference(name, strict) {
			var scope = this.current;
			while (scope) {
				if (scope.hasVariable(name)) {
					return scope.getReference(name, strict);
				}

				scope = scope.parent;
			}

			return new _reference2["default"](name, undefined, strict, this);
		}
	}, {
		key: "getValue",
		value: function getValue(name) {
			return this.getReference(name).getValue();
		}
	}, {
		key: "putValue",
		value: function putValue(name, value, strict) {
			this.current.putValue(name, value, strict);
		}
	}, {
		key: "hasVariable",
		value: function hasVariable(name) {
			return this.current.hasVariable(name);
		}
	}, {
		key: "getVariable",
		value: function getVariable(name) {
			return this.current.getVariable(name);
		}
	}, {
		key: "deleteVariable",
		value: function deleteVariable(name) {
			this.current.deleteVariable(name);
		}
	}, {
		key: "createVariable",
		value: function createVariable(name, immutable) {
			if (_keywords2["default"].isReserved(name)) {
				throw new SyntaxError("Illegal use of reserved keyword: " + name);
			}

			return this.current.createVariable(name, !immutable);
		}
	}, {
		key: "getThisBinding",
		value: function getThisBinding() {
			return this.current.getThisBinding() || this.global;
		}
	}, {
		key: "createExecutionContext",
		value: function createExecutionContext(node, callee, isNew) {
			return new _executionContext2["default"](this, node, callee, isNew);
		}
	}, {
		key: "createScope",
		value: function createScope(thisArg) {
			var env = new _declarativeEnvironment2["default"](this.current, thisArg, this);
			return this.setScope(env);
		}
	}, {
		key: "createObjectScope",
		value: function createObjectScope(obj) {
			var env = new _objectEnvironment2["default"](this.current, obj, this);
			return this.setScope(env);
		}
	}, {
		key: "initScope",
		value: function initScope(node) {
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
					var func = env.objectFactory.createFunction(decl);
					func.bindScope(env.current);

					env.createVariable(name, true);
					env.putValue(name, func, strict);
				} else {
					if (env.hasVariable(name)) {
						env.putValue(name, undef, strict);
					} else {
						env.createVariable(name, true);
					}
				}
			});
		}
	}, {
		key: "setScope",
		value: function setScope(scope) {
			this.globalScope = this.globalScope || scope;

			var env = this;
			var priorScope = this.current || this.globalScope;
			this.current = scope;

			return {
				init: function init(node) {
					if (!node) {
						return;
					}

					env.initScope(node);
				},

				exitScope: function exitScope() {
					env.setScope(priorScope);
				}
			};
		}
	}]);

	return Environment;
})();

exports["default"] = Environment;
module.exports = exports["default"];

},{"../ecma-5.1":29,"../execution-context":41,"../keywords":43,"./declarative-environment":36,"./object-environment":38,"./reference":40}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _propertyReference = require("./property-reference");

var _propertyReference2 = _interopRequireDefault(_propertyReference);

var ObjectEnvironment = (function () {
	function ObjectEnvironment(parent, obj, env) {
		_classCallCheck(this, ObjectEnvironment);

		this.parent = parent;
		this.object = this.thisNode = obj;
		this.env = env;
	}

	_createClass(ObjectEnvironment, [{
		key: "getReference",
		value: function getReference(name, strict) {
			return new _propertyReference2["default"](name, this.object, strict, this.env);
		}
	}, {
		key: "hasVariable",
		value: function hasVariable(name) {
			return this.object.hasProperty(name);
		}
	}, {
		key: "getVariable",
		value: function getVariable(name) {
			return this.object.getProperty(name);
		}
	}, {
		key: "deleteVariable",
		value: function deleteVariable(name) {
			return this.object.deleteProperty(name, false);
		}
	}, {
		key: "createVariable",
		value: function createVariable(name, immutable) {
			if (this.parent) {
				return this.parent.createVariable.apply(this.parent, arguments);
			} else {
				this.object.defineOwnProperty(name, {
					value: undefined,
					configurable: immutable,
					enumerable: true,
					writable: true
				}, true);

				return this.object.getProperty(name);
			}
		}
	}, {
		key: "putValue",
		value: function putValue(name, value, throwOnError) {
			if (this.parent && !this.object.hasProperty(name)) {
				this.parent.putValue.apply(this.parent, arguments);
			} else {
				this.object.putValue(name, value, throwOnError);
			}
		}
	}, {
		key: "getValue",
		value: function getValue(name, throwOnError) {
			if (!this.hasVariable(name)) {
				if (throwOnError) {
					throw new ReferenceError(name + " is not defined.");
				}

				return undefined;
			}

			return this.object.getProperty(name).getValue();
		}
	}, {
		key: "getThisBinding",
		value: function getThisBinding() {
			return this.object;
		}
	}]);

	return ObjectEnvironment;
})();

exports["default"] = ObjectEnvironment;
module.exports = exports["default"];

},{"./property-reference":39}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reference = require("./reference");

var _reference2 = _interopRequireDefault(_reference);

var _typesPrimitiveType = require("../types/primitive-type");

var _typesPrimitiveType2 = _interopRequireDefault(_typesPrimitiveType);

var PropertyReference = (function (_Reference) {
	_inherits(PropertyReference, _Reference);

	function PropertyReference(name, object, strict, env) {
		_classCallCheck(this, PropertyReference);

		_get(Object.getPrototypeOf(PropertyReference.prototype), "constructor", this).call(this, name, object, strict, env);
		this.isPropertyReference = true;
	}

	_createClass(PropertyReference, [{
		key: "getValue",
		value: function getValue() {
			var prop = this.base.getProperty(this.name);
			return prop && prop.getValue() || new _typesPrimitiveType2["default"]();
		}
	}, {
		key: "putValue",
		value: function putValue(value) {
			if (this.base.hasProperty(this.name)) {
				this.base.putValue(this.name, value, this.strict, this.env);
			} else {
				this.base.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, this.strict, this.env);
			}
		}
	}, {
		key: "deleteBinding",
		value: function deleteBinding(name) {
			return this.base.deleteProperty(name, true);
		}
	}, {
		key: "isUnresolved",
		value: function isUnresolved() {
			return false;
		}
	}]);

	return PropertyReference;
})(_reference2["default"]);

exports["default"] = PropertyReference;
module.exports = exports["default"];

},{"../types/primitive-type":52,"./reference":40}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reference = (function () {
	function Reference(name, base, strict, env) {
		_classCallCheck(this, Reference);

		this.name = name;
		this.base = base;
		this.strict = strict;
		this.env = env;
	}

	_createClass(Reference, [{
		key: "putValue",
		value: function putValue(value) {
			if (this.base === undefined && this.strict) {
				throw new ReferenceError(this.name + " is not defined");
			}

			if (this.base) {
				this.base.putValue(this.name, value, this.strict);
			} else {
				this.env.global.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, false);
			}
		}
	}, {
		key: "getValue",
		value: function getValue() {
			if (!this.base) {
				throw new ReferenceError(this.name + " is not defined");
			}

			return this.base.getValue(this.name, this.strict);
		}
	}, {
		key: "deleteBinding",
		value: function deleteBinding(name) {
			if (this.base) {
				return this.base.deleteVariable(name);
			}

			return true;
		}
	}, {
		key: "isUnresolved",
		value: function isUnresolved() {
			return !this.base;
		}
	}]);

	return Reference;
})();

exports["default"] = Reference;
module.exports = exports["default"];

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _executionResult = require("./execution-result");

var _executionResult2 = _interopRequireDefault(_executionResult);

var _visitors = require("./visitors");

var _visitors2 = _interopRequireDefault(_visitors);

var ExecutionContext = (function () {
	function ExecutionContext(env, node, callee, isNew) {
		_classCallCheck(this, ExecutionContext);

		this.node = node;
		this.callee = callee;
		this.env = env;
		this.isNew = !!isNew;

		this.label = "";
		this.value = null;
		this.strict = false;
	}

	_createClass(ExecutionContext, [{
		key: "execute",
		value: function execute() {
			return _visitors2["default"].visit(this);
		}
	}, {
		key: "create",
		value: function create(node, callee, isNew) {
			var context = new ExecutionContext(this.env, node, callee || this.callee, isNew);
			context.value = this.value;
			return context;
		}
	}, {
		key: "createLabel",
		value: function createLabel(node, label) {
			var context = this.create(node);
			context.label = label;
			return context;
		}
	}, {
		key: "cancel",
		value: function cancel(label) {
			var result = this.result(this.value, label);
			result.cancel = true;
			return result;
		}
	}, {
		key: "skip",
		value: function skip(label) {
			var result = this.result(this.value, label);
			result.skip = true;
			return result;
		}
	}, {
		key: "exit",
		value: function exit(value) {
			this.callee = null;

			var result = this.result(value);
			result.exit = true;
			return result;
		}
	}, {
		key: "result",
		value: function result(value, name, obj) {
			this.value = value;
			return new _executionResult2["default"](value, name, obj);
		}
	}, {
		key: "empty",
		value: function empty() {
			return this.result();
		}
	}]);

	return ExecutionContext;
})();

exports["default"] = ExecutionContext;
module.exports = exports["default"];

},{"./execution-result":42,"./visitors":74}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExecutionResult = (function () {
	function ExecutionResult(value, name, obj) {
		_classCallCheck(this, ExecutionResult);

		this.result = value;
		this.name = name;
		this.object = obj;

		this.cancel = false;
		this.cancelled = false;
		this.exit = false;
		this.skip = false;
	}

	_createClass(ExecutionResult, [{
		key: "isCancelled",
		value: function isCancelled() {
			return this.cancel || this.exit;
		}
	}, {
		key: "shouldBreak",
		value: function shouldBreak(context, loop, priorResult) {
			if (this.exit) {
				return true;
			}

			if (!this.cancel && !this.skip) {
				return false;
			}

			var breaking = true;
			if (this.name && this.name === context.label) {
				breaking = this.cancelled = this.cancel;
				this.cancel = this.skip = false;

				if (this.cancelled) {
					this.result = priorResult && priorResult.result || this.result;
				}

				return breaking;
			}

			if (loop && !this.name) {
				breaking = this.cancelled = this.cancel;
				this.cancel = this.skip = false;
			}

			this.result = priorResult && priorResult.result || this.result;
			return breaking;
		}
	}]);

	return ExecutionResult;
})();

exports["default"] = ExecutionResult;
module.exports = exports["default"];

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = {
	"es5": ["do", "if", "in", "for", "new", "try", "var", "case", "else", "enum", "null", "this", "true", "void", "with", "break", "catch", "class", "const", "false", "super", "throw", "while", "delete", "export", "import", "return", "switch", "typeof", "default", "extends", "finally", "continue", "debugger", "function", "instanceof"],

	"es5-strict": ["implements", "let", "private", "public", "interface", "package", "protected", "static", "yield"],

	isReserved: function isReserved(name, scope) {
		return this.es5.indexOf(name) >= 0;
	}
};
module.exports = exports["default"];

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var ArgumentType = (function (_ObjectType) {
	_inherits(ArgumentType, _ObjectType);

	function ArgumentType() {
		_classCallCheck(this, ArgumentType);

		_get(Object.getPrototypeOf(ArgumentType.prototype), "constructor", this).call(this);
		this.className = "Arguments";
		this.parameterMap = Object.create(null);
	}

	_createClass(ArgumentType, [{
		key: "mapProperty",
		value: function mapProperty(index, binding) {
			index = String(index);
			_get(Object.getPrototypeOf(ArgumentType.prototype), "defineOwnProperty", this).call(this, index, { configurable: true, enumerable: true, writable: true, value: undefined }, true);
			this.parameterMap[index] = binding;
		}
	}, {
		key: "getProperty",
		value: function getProperty(name) {
			var ownProperty = this.getOwnProperty(name);
			if (ownProperty) {
				return ownProperty;
			}

			return _get(Object.getPrototypeOf(ArgumentType.prototype), "getProperty", this).apply(this, arguments);
		}
	}, {
		key: "getOwnProperty",
		value: function getOwnProperty(name) {
			name = String(name);

			if (name in this.parameterMap) {
				var mappedProperty = this.properties[name];
				var linkedProperty = this.parameterMap[name];

				mappedProperty.value = linkedProperty.getValue();
				mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
				return mappedProperty;
			}

			return _get(Object.getPrototypeOf(ArgumentType.prototype), "getOwnProperty", this).apply(this, arguments);
		}
	}, {
		key: "defineOwnProperty",
		value: function defineOwnProperty(name, descriptor, throwOnError) {
			name = String(name);

			var allowed = _get(Object.getPrototypeOf(ArgumentType.prototype), "defineOwnProperty", this).apply(this, arguments);
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
		}
	}, {
		key: "deleteProperty",
		value: function deleteProperty(name, throwOnError) {
			name = String(name);
			if (name in this.parameterMap) {
				delete this.parameterMap[name];
			}

			return _get(Object.getPrototypeOf(ArgumentType.prototype), "deleteProperty", this).apply(this, arguments);
		}
	}]);

	return ArgumentType;
})(_objectType2["default"]);

exports["default"] = ArgumentType;
module.exports = exports["default"];

},{"./object-type":51}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsContracts = require("../utils/contracts");

// todo: this is hacky - remove this for passed in environment

var contracts = _interopRequireWildcard(_utilsContracts);

var localObjectFactory;

function setIndex(env, arr, name, descriptor, throwOnError) {
	var index = Number(name);
	var lengthProperty = arr.getProperty("length");
	var lengthValue = lengthProperty.getValue().value;

	if (!lengthProperty.canSetValue() && index >= lengthValue || !_objectType2["default"].prototype.defineOwnProperty.call(arr, name, descriptor, false, env)) {

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

function setLength(env, arr, name, descriptor, throwOnError) {
	var newLengthValue = convert.toUInt32(env, descriptor.value);
	if (newLengthValue !== convert.toNumber(env, descriptor.value)) {
		throw new RangeError("Array length out of range");
	}

	descriptor.value = localObjectFactory.createPrimitive(newLengthValue);
	var newLength = descriptor.value;
	var currentLength = arr.getProperty("length").getValue();
	contracts.assertIsValidArrayLength(newLength.value);

	if (newLength.value >= currentLength.value) {
		return _objectType2["default"].prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError);
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
	if (!_objectType2["default"].prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError)) {
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

var ArrayType = (function (_ObjectType) {
	_inherits(ArrayType, _ObjectType);

	function ArrayType() {
		_classCallCheck(this, ArrayType);

		_get(Object.getPrototypeOf(ArrayType.prototype), "constructor", this).call(this);
		this.className = "Array";
	}

	_createClass(ArrayType, [{
		key: "init",
		value: function init(objectFactory) {
			localObjectFactory = objectFactory;
			this.defineOwnProperty("length", { value: objectFactory.createPrimitive(0), configurable: false, enumerable: false, writable: true });
		}
	}, {
		key: "putValue",
		value: function putValue(name, value, throwOnError, env) {
			if (name === "length") {
				setLength(env, this, name, { value: value }, throwOnError);
				return;
			}

			_get(Object.getPrototypeOf(ArrayType.prototype), "putValue", this).apply(this, arguments);
		}
	}, {
		key: "defineOwnProperty",
		value: function defineOwnProperty(name, descriptor, throwOnError, env) {
			if (contracts.isInteger(name) && contracts.isValidArrayLength(Number(name) + 1) && !this.hasOwnProperty(name)) {
				return setIndex(env, this, name, descriptor, throwOnError);
			}

			if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
				return setLength(env, this, name, descriptor, throwOnError);
			}

			return _get(Object.getPrototypeOf(ArrayType.prototype), "defineOwnProperty", this).apply(this, arguments);
		}
	}, {
		key: "unwrap",
		value: function unwrap() {
			var arr = [];

			// this won't grab properties from the prototype - do we care?
			// it's an edge case but we may want to address it
			for (var index in this.properties) {
				if (this.properties[index].enumerable) {
					arr[Number(index)] = this.getValue(index).unwrap();
				}
			}

			return arr;
		}
	}]);

	return ArrayType;
})(_objectType2["default"]);

exports["default"] = ArrayType;
module.exports = exports["default"];

},{"../utils/contracts":56,"../utils/convert":57,"./object-type":51}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var DateType = (function (_ObjectType) {
	_inherits(DateType, _ObjectType);

	function DateType(value) {
		_classCallCheck(this, DateType);

		_get(Object.getPrototypeOf(DateType.prototype), "constructor", this).call(this);
		this.value = value;
		this.type = "object";
		this.className = "Date";

		// 11.6.1 Note 1
		// All native ECMAScript objects except Date objects handle the absence of a hint as if the hint
		// Number were given; Date objects handle the absence of a hint as if the hint String were given.
		this.primitiveHint = "string";
	}

	_createClass(DateType, [{
		key: "unwrap",
		value: function unwrap() {
			return this.value;
		}
	}]);

	return DateType;
})(_objectType2["default"]);

exports["default"] = DateType;
module.exports = exports["default"];

},{"./object-type":51}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var ErrorType = (function (_ObjectType) {
	_inherits(ErrorType, _ObjectType);

	function ErrorType(source) {
		_classCallCheck(this, ErrorType);

		_get(Object.getPrototypeOf(ErrorType.prototype), "constructor", this).call(this);
		this.source = source;
		this.className = "Error";
	}

	return ErrorType;
})(_objectType2["default"]);

exports["default"] = ErrorType;
module.exports = exports["default"];

},{"./object-type":51}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var _propertyDescriptor = require("./property-descriptor");

var _propertyDescriptor2 = _interopRequireDefault(_propertyDescriptor);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var FunctionType = (function (_ObjectType) {
	_inherits(FunctionType, _ObjectType);

	function FunctionType(node) {
		_classCallCheck(this, FunctionType);

		_get(Object.getPrototypeOf(FunctionType.prototype), "constructor", this).call(this);
		this.type = "function";
		this.className = "Function";
		this.native = false;
		this.node = node;

		this.parentScope = null;
		this.boundThis = null;
	}

	_createClass(FunctionType, [{
		key: "init",
		value: function init(objectFactory, proto, descriptor) {
			// set length property from the number of parameters
			this.defineOwnProperty("length", {
				value: objectFactory.createPrimitive(this.node.params.length),
				configurable: false,
				enumerable: false,
				writable: false
			});

			// functions have a prototype
			proto = proto || objectFactory.createObject();
			proto.properties.constructor = new _propertyDescriptor2["default"](this, { configurable: true, enumerable: false, writable: true, value: this });
			this.defineOwnProperty("prototype", { value: proto, configurable: false, enumerable: false, writable: true });
		}
	}, {
		key: "getProperty",
		value: function getProperty(name) {
			var prop = _get(Object.getPrototypeOf(FunctionType.prototype), "getProperty", this).apply(this, arguments);
			if (!prop && name !== "prototype") {
				// since a function instance is itself a function look at our own prototype
				var proto = this.getProperty("prototype");
				return proto && proto.getValue().getProperty(name);
			}

			return prop;
		}
	}, {
		key: "bindThis",
		value: function bindThis(thisArg) {
			this.boundThis = thisArg;
		}
	}, {
		key: "bindScope",
		value: function bindScope(scope) {
			this.parentScope = scope;
		}
	}, {
		key: "createScope",
		value: function createScope(env, thisArg) {
			// if a parent scope is defined we need to limit the scope to that scope
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
				exitScope: function exitScope() {
					scope.exitScope();
					env.current = priorScope;
				}
			};
		}
	}, {
		key: "hasInstance",
		value: function hasInstance(obj) {
			if (obj === this) {
				// object obviously isn't an instance in this case
				return false;
			}

			var visited = [];
			var current = obj;

			var proto = this.getProperty("prototype").getValue();
			if (contracts.isNullOrUndefined(proto) || !contracts.isObject(proto)) {
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
		}
	}, {
		key: "unwrap",
		value: function unwrap() {
			return undefined;
		}
	}]);

	return FunctionType;
})(_objectType2["default"]);

exports["default"] = FunctionType;
module.exports = exports["default"];

},{"../utils/contracts":56,"./object-type":51,"./property-descriptor":53}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _functionType = require("./function-type");

var _functionType2 = _interopRequireDefault(_functionType);

var _propertyDescriptor = require("./property-descriptor");

var _propertyDescriptor2 = _interopRequireDefault(_propertyDescriptor);

var NativeFunctionType = (function (_FunctionType) {
	_inherits(NativeFunctionType, _FunctionType);

	function NativeFunctionType(fn) {
		_classCallCheck(this, NativeFunctionType);

		_get(Object.getPrototypeOf(NativeFunctionType.prototype), "constructor", this).call(this);
		this.type = "function";
		this.native = true;
		this.nativeFunction = fn;
	}

	_createClass(NativeFunctionType, [{
		key: "init",
		value: function init(objectFactory, proto, descriptor) {
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
			proto.properties.constructor = new _propertyDescriptor2["default"](this, { configurable: true, enumerable: false, writable: true, value: this });

			descriptor = descriptor || { configurable: false, enumerable: false, writable: true };
			var protoDescriptor = {
				value: proto,
				configurable: descriptor.configurable,
				enumerable: descriptor.enumerable,
				writable: descriptor.writable
			};

			this.defineOwnProperty("prototype", protoDescriptor);
		}
	}]);

	return NativeFunctionType;
})(_functionType2["default"]);

exports["default"] = NativeFunctionType;
module.exports = exports["default"];

},{"./function-type":48,"./property-descriptor":53}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ObjectFactory;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _primitiveType = require("./primitive-type");

var _primitiveType2 = _interopRequireDefault(_primitiveType);

var _functionType = require("./function-type");

var _functionType2 = _interopRequireDefault(_functionType);

var _nativeFunctionType = require("./native-function-type");

var _nativeFunctionType2 = _interopRequireDefault(_nativeFunctionType);

var _regexType = require("./regex-type");

var _regexType2 = _interopRequireDefault(_regexType);

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var _arrayType = require("./array-type");

var _arrayType2 = _interopRequireDefault(_arrayType);

var _stringType = require("./string-type");

var _stringType2 = _interopRequireDefault(_stringType);

var _dateType = require("./date-type");

var _dateType2 = _interopRequireDefault(_dateType);

var _errorType = require("./error-type");

var _errorType2 = _interopRequireDefault(_errorType);

var _argumentType = require("./argument-type");

var _argumentType2 = _interopRequireDefault(_argumentType);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var parentless = {
	"Undefined": true,
	"Null": true,
	"Function": true
};

var orphans = Object.create(null);

function setOrphans(scope) {
	var parent;

	for (var typeName in orphans) {
		parent = scope.getValue(typeName);
		if (parent) {
			orphans[typeName].forEach(function (child) {
				child.setPrototype(parent.getProperty("prototype").getValue());
			});

			delete orphans[typeName];
		}
	}

	orphans = Object.create(null);
}

function setProto(typeName, instance, env) {
	if (typeName in parentless) {
		return;
	}

	var parent = env.getReference(typeName);
	if (!parent.isUnresolved()) {
		instance.setPrototype(parent.getValue().getProperty("prototype").getValue());
		return;
	}

	// during initialization it is possible for objects to be created
	// before the types have been registered - add a registry of items
	// and these can be filled in when the type is registered
	orphans[typeName] = orphans[typeName] || [];
	orphans[typeName].push(instance);
}

function ObjectFactory(env) {
	this.env = env;
}

ObjectFactory.prototype = {
	constructor: ObjectFactory,

	init: function init() {
		setOrphans(this.env);
	},

	createPrimitive: function createPrimitive(value) {
		return this.create(contracts.getType(value), value);
	},

	create: function create(typeName, value) {
		var instance;

		switch (typeName) {
			case "String":
				instance = new _stringType2["default"](value);
				break;

			case "Number":
			case "Boolean":
			case "Null":
			case "Undefined":
				instance = new _primitiveType2["default"](value);
				break;

			case "Date":
				instance = new _dateType2["default"](value);
				break;

			case "RegExp":
				instance = new _regexType2["default"](value);
				break;

			case "Array":
				instance = new _arrayType2["default"]();
				break;

			case "Error":
				instance = new _errorType2["default"](value);

				if (value) {
					typeName = value.name || typeName;
					instance.defineOwnProperty("message", {
						value: this.createPrimitive(value.message),
						configurable: true,
						enumerable: false,
						writable: true
					});
				}

				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.env);
		return instance;
	},

	createObject: function createObject(parent) {
		var instance = new _objectType2["default"]();

		if (parent !== null) {
			if (parent) {
				instance.setPrototype(parent && parent.getProperty("prototype").getValue());
			} else {
				setProto("Object", instance, this.env);
			}
		}

		instance.init(this);
		return instance;
	},

	createArguments: function createArguments(args, callee) {
		var instance = new _argumentType2["default"]();
		var objectClass = this.env.global.getProperty("Object").getValue();

		instance.init(this, objectClass, objectClass.proto);
		instance.setPrototype(objectClass.getProperty("prototype").getValue());
		instance.defineOwnProperty("callee", { value: callee, configurable: true, enumerable: false, writable: true });
		return instance;
	},

	createFunction: function createFunction(fnOrNode, proto, descriptor) {
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new _nativeFunctionType2["default"](fnOrNode);
		} else {
			instance = new _functionType2["default"](fnOrNode);
		}

		instance.init(this, proto, descriptor);

		var functionClass = this.env.getReference("Function");
		if (functionClass && !functionClass.isUnresolved()) {
			instance.setPrototype(functionClass.getValue().getProperty("prototype").getValue());
		}

		return instance;
	},

	createBuiltInFunction: function createBuiltInFunction(fn, length, methodName) {
		var instance = new _nativeFunctionType2["default"](function () {
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
module.exports = exports["default"];

},{"../utils/contracts":56,"./argument-type":44,"./array-type":45,"./date-type":46,"./error-type":47,"./function-type":48,"./native-function-type":49,"./object-type":51,"./primitive-type":52,"./regex-type":54,"./string-type":55}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _propertyDescriptor = require("./property-descriptor");

var _propertyDescriptor2 = _interopRequireDefault(_propertyDescriptor);

var ObjectType = (function () {
	function ObjectType() {
		_classCallCheck(this, ObjectType);

		this.isPrimitive = false;
		this.type = "object";
		this.className = "Object";
		this.properties = Object.create(null);
		this.extensible = true;

		this.primitiveHint = "number";
	}

	_createClass(ObjectType, [{
		key: "init",
		value: function init() {}
	}, {
		key: "getPrototype",
		value: function getPrototype() {
			return this.proto;
		}
	}, {
		key: "setPrototype",
		value: function setPrototype(proto) {
			this.proto = proto;
		}
	}, {
		key: "getProperty",
		value: function getProperty(name) {
			name = String(name);

			var current = this;
			while (current) {
				if (name in current.properties) {
					return current.properties[name].bind(this);
				}

				current = current.getPrototype();
			}

			return undefined;
		}
	}, {
		key: "getOwnProperty",
		value: function getOwnProperty(name) {
			return this.properties[String(name)];
		}
	}, {
		key: "getOwnPropertyNames",
		value: function getOwnPropertyNames() {
			return Object.keys(this.properties);
		}
	}, {
		key: "hasProperty",
		value: function hasProperty(name) {
			return !!this.getProperty(name);
		}
	}, {
		key: "hasOwnProperty",
		value: function hasOwnProperty(name) {
			return String(name) in this.properties;
		}
	}, {
		key: "putValue",
		value: function putValue(name, value, throwOnError) {
			if (this.isPrimitive) {
				return;
			}

			name = String(name);

			var descriptor = this.getProperty(name);
			if (descriptor) {
				if (!descriptor.canSetValue()) {
					if (throwOnError) {
						throw new TypeError("Cannot assign to read only property '" + name + "' of %s");
					}

					return;
				}

				if (descriptor.dataProperty && !this.hasOwnProperty(name)) {
					this.properties[name] = new _propertyDescriptor2["default"](this, {
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
		}
	}, {
		key: "defineOwnProperty",
		value: function defineOwnProperty(name, descriptor, throwOnError) {
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

			this.properties[name] = new _propertyDescriptor2["default"](this, descriptor);
			return true;
		}
	}, {
		key: "deleteProperty",
		value: function deleteProperty(name) {
			if (this.isPrimitive) {
				return false;
			}

			if (name in this.properties) {
				if (!this.properties[name].configurable) {
					return false;
				}
			}

			return delete this.properties[name];
		}
	}, {
		key: "define",
		value: function define(name, value, descriptor) {
			// this method is intended for external usage only - it provides a way to define
			// methods and properties and overwrite any existing properties even if they are
			// not configurable
			descriptor = descriptor || { configurable: true, enumerable: false, writable: true };
			descriptor.value = value;

			this.properties[name] = new _propertyDescriptor2["default"](this, descriptor);
		}
	}, {
		key: "remove",
		value: function remove(name) {
			// this method is intended for external usage only - it provides a way to remove
			// properties even if they are not normally able to be deleted
			delete this.properties[name];
		}
	}, {
		key: "getValue",
		value: function getValue(name) {
			if (name) {
				return this.getProperty(name).getValue();
			}

			return this;
		}
	}, {
		key: "freeze",
		value: function freeze() {
			for (var prop in this.properties) {
				if (this.properties[prop].dataProperty) {
					this.defineOwnProperty(prop, { writable: false, configurable: false }, true);
				} else {
					this.defineOwnProperty(prop, { configurable: false }, true);
				}
			}

			this.preventExtensions();
		}
	}, {
		key: "preventExtensions",
		value: function preventExtensions() {
			this.extensible = false;
		}
	}, {
		key: "seal",
		value: function seal() {
			for (var prop in this.properties) {
				this.defineOwnProperty(prop, { configurable: false }, true);
			}

			this.preventExtensions();
		}
	}, {
		key: "equals",
		value: function equals(obj) {
			if (this.isPrimitive && obj.isPrimitive) {
				return this.value === obj.value;
			}

			return this === obj;
		}
	}, {
		key: "unwrap",
		value: function unwrap() {
			var unwrapped = {};
			var current = this;

			while (current) {
				for (var name in current.properties) {
					if (current.properties[name].enumerable && !(name in unwrapped)) {
						unwrapped[name] = current.getValue(name).unwrap();
					}
				}

				current = current.getPrototype();
			}

			return unwrapped;
		}
	}]);

	return ObjectType;
})();

exports["default"] = ObjectType;
module.exports = exports["default"];

},{"./property-descriptor":53}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var PrimitiveType = (function (_ObjectType) {
	_inherits(PrimitiveType, _ObjectType);

	function PrimitiveType(value) {
		_classCallCheck(this, PrimitiveType);

		_get(Object.getPrototypeOf(PrimitiveType.prototype), "constructor", this).call(this);
		this.isPrimitive = true;
		this.value = value;
		this.type = typeof value;
		this.className = contracts.getType(value);
	}

	_createClass(PrimitiveType, [{
		key: "getProperty",
		value: function getProperty(name) {
			// can't read properties of null/undefined
			if (this.value == null) {
				throw new TypeError("Cannot read property '" + name + "' of " + this.type);
			}

			return _get(Object.getPrototypeOf(PrimitiveType.prototype), "getProperty", this).apply(this, arguments);
		}
	}, {
		key: "unwrap",
		value: function unwrap() {
			return this.value;
		}
	}]);

	return PrimitiveType;
})(_objectType2["default"]);

exports["default"] = PrimitiveType;
module.exports = exports["default"];

},{"../utils/contracts":56,"./object-type":51}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var defaultDescriptor = {
	configurable: false,
	enumerable: false,
	writable: false
};

var PropertyDescriptor = (function () {
	function PropertyDescriptor(base, config, value) {
		_classCallCheck(this, PropertyDescriptor);

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

	_createClass(PropertyDescriptor, [{
		key: "bind",
		value: function bind(obj) {
			this.base = obj;
			return this;
		}
	}, {
		key: "update",
		value: function update(descriptor) {
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
		}
	}, {
		key: "canUpdate",
		value: function canUpdate(descriptor) {
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
		}
	}, {
		key: "getValue",
		value: function getValue() {
			if (this.dataProperty) {
				return this.value;
			}

			if (this.getter) {
				return this.getter.call(this.base);
			}

			return undefined;
		}
	}, {
		key: "canSetValue",
		value: function canSetValue() {
			return this.writable || !!this.setter;
		}
	}, {
		key: "setValue",
		value: function setValue(value) {
			if (!this.canSetValue()) {
				return;
			}

			if (this.dataProperty) {
				this.value = value;
			} else if (this.setter) {
				this.setter.call(this.base, value);
			}
		}
	}]);

	return PropertyDescriptor;
})();

exports["default"] = PropertyDescriptor;
module.exports = exports["default"];

},{"../utils/contracts":56}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var RegexType = (function (_ObjectType) {
	_inherits(RegexType, _ObjectType);

	function RegexType(value) {
		_classCallCheck(this, RegexType);

		_get(Object.getPrototypeOf(RegexType.prototype), "constructor", this).call(this);
		this.source = value;
		this.className = "RegExp";
	}

	_createClass(RegexType, [{
		key: "init",
		value: function init(objectFactory) {
			// lastIndex is settable, all others are read-only attributes
			this.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(this.source.lastIndex), writable: true });
			this.defineOwnProperty("source", { value: objectFactory.createPrimitive(this.source.source) });
			this.defineOwnProperty("global", { value: objectFactory.createPrimitive(this.source.global) });
			this.defineOwnProperty("ignoreCase", { value: objectFactory.createPrimitive(this.source.ignoreCase) });
			this.defineOwnProperty("multiline", { value: objectFactory.createPrimitive(this.source.multiline) });
		}
	}, {
		key: "unwrap",
		value: function unwrap() {
			return this.source;
		}
	}]);

	return RegexType;
})(_objectType2["default"]);

exports["default"] = RegexType;
module.exports = exports["default"];

},{"./object-type":51}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _primitiveType = require("./primitive-type");

var _primitiveType2 = _interopRequireDefault(_primitiveType);

var _propertyDescriptor = require("./property-descriptor");

var _propertyDescriptor2 = _interopRequireDefault(_propertyDescriptor);

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

function getCharacter(source, position) {
	if (position < source.value.length) {
		// todo: need to set length
		var character = new StringType(source.value[position]);
		character.setPrototype(source.getPrototype());
		return character;
	}

	return new _primitiveType2["default"](undefined);
}

var StringType = (function (_PrimitiveType) {
	_inherits(StringType, _PrimitiveType);

	function StringType(value) {
		_classCallCheck(this, StringType);

		_get(Object.getPrototypeOf(StringType.prototype), "constructor", this).call(this, value);
	}

	_createClass(StringType, [{
		key: "init",
		value: function init(objectFactory) {
			this.properties.length = new _propertyDescriptor2["default"](this, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: objectFactory.createPrimitive(this.value.length)
			});
		}
	}, {
		key: "getProperty",
		value: function getProperty(name) {
			if (contracts.isInteger(name)) {
				var position = Number(name);
				if (position < this.value.length) {
					return new _propertyDescriptor2["default"](this, { configurable: false, enumerable: true, writable: false, value: getCharacter(this, position) });
				}
			}

			return _get(Object.getPrototypeOf(StringType.prototype), "getProperty", this).apply(this, arguments);
		}
	}, {
		key: "getOwnPropertyNames",
		value: function getOwnPropertyNames() {
			var props = [];
			var ln, i;
			for (i = 0, ln = this.value.length; i < ln; i++) {
				props.push(String(i));
			}

			return props.concat(_get(Object.getPrototypeOf(StringType.prototype), "getOwnPropertyNames", this).call(this));
		}
	}, {
		key: "hasOwnProperty",
		value: function hasOwnProperty(name) {
			if (contracts.isInteger(name)) {
				return name < this.value.length;
			}

			return _get(Object.getPrototypeOf(StringType.prototype), "hasOwnProperty", this).apply(this, arguments);
		}
	}]);

	return StringType;
})(_primitiveType2["default"]);

exports["default"] = StringType;
module.exports = exports["default"];

},{"../utils/contracts":56,"./primitive-type":52,"./property-descriptor":53}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.assertIsObject = assertIsObject;
exports.assertIsNotNullOrUndefined = assertIsNotNullOrUndefined;
exports.assertArgIsNotNullOrUndefined = assertArgIsNotNullOrUndefined;
exports.assertIsFunction = assertIsFunction;
exports.assertIsNotConstructor = assertIsNotConstructor;
exports.assertIsValidArrayLength = assertIsValidArrayLength;
exports.assertIsValidParameterName = assertIsValidParameterName;
exports.assertIsNotGeneric = assertIsNotGeneric;
exports.isValidArrayLength = isValidArrayLength;
exports.isObject = isObject;
exports.areSame = areSame;
exports.getType = getType;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isInteger = isInteger;
var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^-?\d+$/;

function assertIsObject(obj, methodName, message) {
	if (!isObject(obj)) {
		throw new TypeError(methodName + " called on non-object");
	}
}

function assertIsNotNullOrUndefined(value, methodName) {
	if (isNullOrUndefined(value)) {
		throw new TypeError(methodName + " called on null or undefined");
	}
}

function assertArgIsNotNullOrUndefined(obj) {
	if (isNullOrUndefined(obj)) {
		throw new TypeError("Cannot convert null or undefined to object");
	}
}

function assertIsFunction(obj, toString) {
	if (!obj || obj.className !== "Function") {
		throw new TypeError("%s is not a function");
	}
}

function assertIsNotConstructor(context, methodName) {
	if (context.isNew) {
		throw new TypeError(methodName + " is not a constructor");
	}
}

function assertIsValidArrayLength(length) {
	if (!isValidArrayLength(length)) {
		throw new RangeError("Invalid array length");
	}
}

function assertIsValidParameterName(name) {
	if (/^\d|[;\(\)"']/.test(name)) {
		throw new SyntaxError("Unexpected token in " + name);
	}
}

function assertIsNotGeneric(obj, expectedClass, methodName) {
	if (!obj || obj.className !== expectedClass) {
		throw new TypeError(methodName + " is not generic");
	}
}

function isValidArrayLength(length) {
	return isInteger(length) && length >= 0 && length < 4294967296;
}

function isObject(obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

function areSame(a, b) {
	if (a.type !== b.type) {
		return false;
	}

	if (a.isPrimitive && b.isPrimitive) {
		if (a.value == null) {
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

function getType(obj) {
	return objectRgx.exec(Object.prototype.toString.call(obj))[1];
}

function isNullOrUndefined(obj) {
	return isUndefined(obj) || isNull(obj);
}

function isUndefined(obj) {
	return !obj || obj.isPrimitive && obj.value === undefined;
}

function isNull(obj) {
	return obj && obj.isPrimitive && obj.value === null;
}

function isInteger(value) {
	if (typeof value === "string") {
		return integerRgx.test(value);
	}

	if (typeof value === "number") {
		return isFinite(value) && Math.floor(value) === value;
	}

	return false;
}

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.primitiveToObject = primitiveToObject;
exports.toObject = toObject;
exports.toArray = toArray;
exports.toPrimitive = toPrimitive;
exports.toString = toString;
exports.toNumber = toNumber;
exports.toInteger = toInteger;
exports.toInt32 = toInt32;
exports.toUInt32 = toUInt32;
exports.toBoolean = toBoolean;
exports.toNativeFunction = toNativeFunction;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var sign = require("core-js/library/fn/math/sign");
var floor = Math.floor;
var abs = Math.abs;

function getString(env, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive) {
		return String(value.value);
	}

	var primitiveValue = func.tryCallMethod(env, value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	primitiveValue = func.tryCallMethod(env, value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive(env, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive) {
		return value.value;
	}

	var primitiveValue = func.tryCallMethod(env, value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	primitiveValue = func.tryCallMethod(env, value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	throw new TypeError("Cannot convert object to primitive");
}

function getValues(env, args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(getPrimitive(env, args[i]));
	}

	return values;
}

function primitiveToObject(env, value) {
	var newValue = env.objectFactory.createPrimitive(value);
	newValue.isPrimitive = false;
	newValue.type = "object";
	return newValue;
}

function toObject(env, obj) {
	if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
		return primitiveToObject(env, obj.value);
	}

	return obj;
}

function toArray(obj, length) {
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
}

function toPrimitive(env, obj, preferredType) {
	preferredType = preferredType && preferredType.toLowerCase();
	if (!preferredType && obj) {
		preferredType = obj.primitiveHint;
	}

	if (preferredType === "string") {
		return getString(env, obj);
	}

	// default case/number
	return getPrimitive(env, obj);
}

function toString(env, obj) {
	return String(toPrimitive(env, obj, "string"));
}

function toNumber(env, obj) {
	if (!obj || obj.type === "undefined") {
		return NaN;
	}

	return Number(toPrimitive(env, obj, "number"));
}

function toInteger(env, obj) {
	var value = toNumber(env, obj);
	if (isNaN(value)) {
		return 0;
	}

	if (value === 0 || !isFinite(value)) {
		return value;
	}

	return sign(value) * floor(abs(value));
}

function toInt32(env, obj) {
	var value = toInteger(env, obj);
	return isFinite(value) ? value : 0;
}

function toUInt32(env, obj) {
	var value = toInt32(env, obj);
	return value >>> 0;
}

function toBoolean(obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return Boolean(obj.value);
	}

	return true;
}

function toNativeFunction(env, fn, name) {
	return env.objectFactory.createBuiltInFunction(function () {
		var scope = this && this.node && this.node.value;
		var args = getValues(env, arguments);

		var value = fn.apply(scope, args);
		return env.objectFactory.createPrimitive(value);
	}, fn.length, name);
}

},{"../utils/func":58,"core-js/library/fn/math/sign":3}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.executeFunction = executeFunction;
exports.getFunctionResult = getFunctionResult;
exports.loadArguments = loadArguments;
exports.tryCallMethod = tryCallMethod;

function executeFunction(env, fn, params, args, thisArg, callee, isNew) {
	var scope = fn.createScope(env, thisArg, false);
	var returnResult;

	if (isNew) {
		returnResult = thisArg;
	}

	loadArguments(env, params, args, fn);

	try {
		if (fn.native) {
			returnResult = fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee, isNew), args) || returnResult;
		} else {
			var executionResult = env.createExecutionContext(fn.node.body, callee, isNew).execute();
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
	return returnResult || env.global.getProperty("undefined").getValue();
}

function getFunctionResult(env, fn, params, args, thisArg, callee) {
	var scope = fn.createScope(env, thisArg, false);
	loadArguments(env, params, args, fn);

	var executionResult;
	try {
		if (fn.native) {
			executionResult = fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee), args);
		} else {
			executionResult = env.createExecutionContext(fn.node.body, callee).execute();
		}
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
	return executionResult;
}

function loadArguments(env, params, args, callee) {
	var undef = env.global.getProperty("undefined").getValue();

	var argumentList = env.objectFactory.createArguments(args, callee);
	env.current.createVariable("arguments");
	env.current.putValue("arguments", argumentList);

	params.forEach(function (param, index) {
		if (!env.current.hasVariable(param.name)) {
			var descriptor = env.current.createVariable(param.name);
			if (args.length > index) {
				argumentList.mapProperty(index, descriptor);
			}
		}

		env.current.putValue(param.name, args[index] || undef);
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
}

function tryCallMethod(env, obj, name) {
	var fn = obj.getProperty(name);
	if (!fn) {
		return false;
	}

	fn = fn.getValue();
	var undef = env.global.getProperty("undefined").getValue();

	if (fn && fn.className === "Function") {
		var scope = fn.createScope(env, obj);
		var executionResult;

		try {
			if (fn.native) {
				executionResult = fn.nativeFunction.apply(env.createExecutionContext(obj, obj), []);
			} else {
				loadArguments(env, fn.node.params, []);

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

	return false;
}

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ArrayExpression;

function ArrayExpression(context) {
	var objectFactory = context.env.objectFactory;
	var arr = objectFactory.create("Array");

	if (context.node.elements) {
		var i = 0;
		var ln = context.node.elements.length;

		while (i < ln) {
			if (context.node.elements[i]) {
				var item = context.create(context.node.elements[i]).execute().result.getValue();
				arr.defineOwnProperty(i, { value: item, configurable: true, enumerable: true, writable: true }, true, context.env);
			}

			i++;
		}

		arr.putValue("length", objectFactory.createPrimitive(ln), false, context);
	}

	return context.result(arr);
}

module.exports = exports["default"];

},{}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = AssignmentExpression;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var assignOperators = {
	"+=": function _(a, b) {
		return a.value + b.value;
	},
	"-=": function _(a, b) {
		return a.value - b.value;
	},
	"*=": function _(a, b) {
		return a.value * b.value;
	},
	"/=": function _(a, b) {
		return a.value / b.value;
	},
	"%=": function _(a, b) {
		return a.value % b.value;
	},
	"<<=": function _(a, b) {
		return a.value << b.value;
	},
	">>=": function _(a, b) {
		return a.value >> b.value;
	},
	">>>=": function _(a, b) {
		return a.value >>> b.value;
	},
	"|=": function _(a, b) {
		return a.value | b.value;
	},
	"^=": function _(a, b) {
		return a.value ^ b.value;
	},
	"&=": function _(a, b) {
		return a.value & b.value;
	}
};

function AssignmentExpression(context) {
	var assignment = context.node.operator === "=";
	var right = context.create(context.node.right).execute().result;

	var left = context.create(context.node.left).execute().result;
	if (!(left instanceof _envReference2["default"])) {
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
	return context.result(newValue);
}

module.exports = exports["default"];

},{"../env/reference":40}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = BinaryExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function implicitEquals(a, b, env) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if (a.type === "object" && b.type === "object" || a.type === "function" && b.type === "function") {
		return a === b;
	}

	var primitiveA = convert.toPrimitive(env, a);
	var primitiveB = convert.toPrimitive(env, b);

	if (typeof primitiveA === "number" || typeof primitiveB === "number" || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
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

function strictEquals(a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value === b.value;
	}

	if (a.isPrimitive || b.isPrimitive) {
		return false;
	}

	return a === b;
}

function not(fn) {
	return function (a, b, e) {
		return !fn(a, b, e);
	};
}

function add(a, b, env) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(env, a);
	b = convert.toPrimitive(env, b);
	return a + b;
}

function toNumber(env, obj) {
	if (obj.className === "Number") {
		return obj.value;
	}

	return convert.toNumber(env, obj);
}

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": add,
	"-": function _(a, b, e) {
		return toNumber(e, a) - toNumber(e, b);
	},
	"/": function _(a, b, e) {
		return toNumber(e, a) / toNumber(e, b);
	},
	"*": function _(a, b, e) {
		return toNumber(e, a) * toNumber(e, b);
	},
	"==": implicitEquals,
	"!=": not(implicitEquals),
	"===": strictEquals,
	"!==": not(strictEquals),
	"<": function _(a, b, e) {
		return convert.toPrimitive(e, a) < convert.toPrimitive(e, b);
	},
	"<=": function _(a, b, e) {
		return convert.toPrimitive(e, a) <= convert.toPrimitive(e, b);
	},
	">": function _(a, b, e) {
		return convert.toPrimitive(e, a) > convert.toPrimitive(e, b);
	},
	">=": function _(a, b, e) {
		return convert.toPrimitive(e, a) >= convert.toPrimitive(e, b);
	},
	"<<": function _(a, b, e) {
		return convert.toPrimitive(e, a) << convert.toPrimitive(e, b);
	},
	">>": function _(a, b, e) {
		return convert.toPrimitive(e, a) >> convert.toPrimitive(e, b);
	},
	">>>": function _(a, b, e) {
		return convert.toPrimitive(e, a) >>> convert.toPrimitive(e, b);
	},
	"%": function _(a, b, e) {
		return convert.toPrimitive(e, a) % convert.toPrimitive(e, b);
	},
	"|": function _(a, b, e) {
		return convert.toInt32(e, a) | convert.toInt32(e, b);
	},
	"^": function _(a, b, e) {
		return convert.toInt32(e, a) ^ convert.toInt32(e, b);
	},
	"&": function _(a, b, e) {
		return convert.toInt32(e, a) & convert.toInt32(e, b);
	},
	"in": function _in(a, b, e) {
		a = convert.toString(e, a);
		if (b.isPrimitive) {
			throw new TypeError("Cannot use 'in' operator to search for '" + a + "' in " + convert.toString(e, b));
		}

		return b.hasProperty(a);
	},
	"instanceof": function _instanceof(a, b) {
		if (b.type !== "function") {
			throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
		}

		if (a.isPrimitive) {
			return false;
		}

		return b.hasInstance(a);
	}
};

function BinaryExpression(context) {
	var undef = context.env.global.getProperty("undefined").getValue();
	var left = context.create(context.node.left).execute().result;
	var leftValue = left.getValue() || undef;

	var right = context.create(context.node.right).execute().result;
	var rightValue = right.getValue() || undef;

	var newValue = binaryOperators[context.node.operator](leftValue, rightValue, context.env);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
}

module.exports = exports["default"];

},{"../utils/convert":57}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = BlockStatement;

function BlockStatement(context) {
	var result, priorResult;

	if (context.node.type === "Program") {
		context.env.initScope(context.node.body);
	}

	for (var i = 0, ln = context.node.body.length; i < ln; i++) {
		result = context.create(context.node.body[i]).execute();
		if (result && result.shouldBreak(context, false, priorResult)) {
			return result;
		}

		priorResult = result;
	}

	return result;
}

module.exports = exports["default"];

},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = CallExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

function assignThis(env, fnMember, fn, isNew, native) {
	if (isNew) {
		// if this is a native contructor we don't are about this
		// otherwise create a new object
		return native ? null : env.objectFactory.createObject(fn);
	}

	if (fnMember instanceof _envReference2["default"] && fnMember.isPropertyReference) {
		return convert.toObject(env, fnMember.base);
	}

	return null;
}

function CallExpression(context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";

	var fnMember = context.create(node.callee).execute().result;
	var fn = fnMember.getValue();
	var args = node.arguments.map(function (arg) {
		return context.create(arg).execute().result.getValue();
	});

	if (!fn || fn.className !== "Function") {
		throw new TypeError(convert.toString(context.env, fn) + " not a function");
	}

	var native = fn.native;
	var thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	var params = native ? [] : fn.node.params;
	var callee = fnMember;

	callee.identifier = fn.name;
	return context.result(func.executeFunction(context.env, fn, params, args, thisArg, callee, isNew));
}

module.exports = exports["default"];

},{"../env/reference":40,"../utils/convert":57,"../utils/func":58}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = DebuggerStatement;

function DebuggerStatement(context) {
	return context.empty();
}

module.exports = exports["default"];

},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = DoWhileStatement;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function DoWhileStatement(context) {
	var result, priorResult;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = convert.toBoolean(context.create(context.node.test).execute().result.getValue());
	}

	while (passed) {
		result = context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true, priorResult)) {
			return result;
		}

		passed = convert.toBoolean(context.create(context.node.test).execute().result.getValue());
		priorResult = result;
	}

	return result;
}

module.exports = exports["default"];

},{"../utils/convert":57}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = EmptyStatement;

function EmptyStatement(context) {
	return context.empty();
}

module.exports = exports["default"];

},{}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ExpressionStatement;

function ExpressionStatement(context) {
	var executionResult = context.create(context.node.expression).execute();
	var executionValue = executionResult && executionResult.result && executionResult.result.getValue();
	return context.result(executionValue || context.env.global.getProperty("undefined").getValue());
}

module.exports = exports["default"];

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ForInStatement;

function ForInStatement(context) {
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
	var result, priorResult;

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

				result = context.create(context.node.body).execute();
				if (result && result.shouldBreak(context, true, priorResult)) {
					return result;
				}
			}

			visited[prop] = true;
		}

		priorResult = result;
		obj = obj.getPrototype();
	}

	return result;
}

module.exports = exports["default"];

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ForStatement;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function shouldContinue(context) {
	if (!context.node.test) {
		return true;
	}

	return convert.toBoolean(context.create(context.node.test).execute().result.getValue());
}

function ForStatement(context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var result, priorResult;
	while (shouldContinue(context)) {
		result = context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true, priorResult)) {
			return result;
		}

		if (context.node.update) {
			context.create(context.node.update).execute();
		}

		priorResult = result;
	}

	return result;
}

module.exports = exports["default"];

},{"../utils/convert":57}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = FunctionDeclaration;

function FunctionDeclaration(context) {
	return context.result(context.env.getValue(context.node.id.name));
}

module.exports = exports["default"];

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = FunctionExpression;

function FunctionExpression(context) {
	var objectFactory = context.env.objectFactory;
	var func = objectFactory.createFunction(context.node);
	func.bindScope(context.env.current);

	if (context.node.id) {
		func.name = context.node.id.name;
	}

	return context.result(func);
}

module.exports = exports["default"];

},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = Identifier;

function Identifier(context) {
	var name = context.node.name;

	if (context.callee && context.callee.identifier === name) {
		return context.result(context.callee);
	}

	return context.result(context.env.getReference(context.node.name));
}

module.exports = exports["default"];

},{}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = IfStatement;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function IfStatement(context) {
	var testValue = context.create(context.node.test).execute().result.getValue();
	if (convert.toBoolean(testValue)) {
		return context.create(context.node.consequent).execute();
	}

	if (context.node.alternate) {
		return context.create(context.node.alternate).execute();
	}
}

module.exports = exports["default"];

},{"../utils/convert":57}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _arrayExpression = require("./array-expression");

var _arrayExpression2 = _interopRequireDefault(_arrayExpression);

var _assignmentExpression = require("./assignment-expression");

var _assignmentExpression2 = _interopRequireDefault(_assignmentExpression);

var _binaryExpression = require("./binary-expression");

var _binaryExpression2 = _interopRequireDefault(_binaryExpression);

var _blockStatement = require("./block-statement");

var _blockStatement2 = _interopRequireDefault(_blockStatement);

var _interruptStatement = require("./interrupt-statement");

var _interruptStatement2 = _interopRequireDefault(_interruptStatement);

var _callExpression = require("./call-expression");

var _callExpression2 = _interopRequireDefault(_callExpression);

var _ifStatement = require("./if-statement");

var _ifStatement2 = _interopRequireDefault(_ifStatement);

var _debuggerStatement = require("./debugger-statement");

var _debuggerStatement2 = _interopRequireDefault(_debuggerStatement);

var _doWhileStatementJs = require("./do-while-statement.js");

var _doWhileStatementJs2 = _interopRequireDefault(_doWhileStatementJs);

var _emptyStatement = require("./empty-statement");

var _emptyStatement2 = _interopRequireDefault(_emptyStatement);

var _expressionStatement = require("./expression-statement");

var _expressionStatement2 = _interopRequireDefault(_expressionStatement);

var _forStatement = require("./for-statement");

var _forStatement2 = _interopRequireDefault(_forStatement);

var _forInStatement = require("./for-in-statement");

var _forInStatement2 = _interopRequireDefault(_forInStatement);

var _functionDeclaration = require("./function-declaration");

var _functionDeclaration2 = _interopRequireDefault(_functionDeclaration);

var _functionExpression = require("./function-expression");

var _functionExpression2 = _interopRequireDefault(_functionExpression);

var _identifier = require("./identifier");

var _identifier2 = _interopRequireDefault(_identifier);

var _labeledStatement = require("./labeled-statement");

var _labeledStatement2 = _interopRequireDefault(_labeledStatement);

var _literal = require("./literal");

var _literal2 = _interopRequireDefault(_literal);

var _logicalExpression = require("./logical-expression");

var _logicalExpression2 = _interopRequireDefault(_logicalExpression);

var _memberExpression = require("./member-expression");

var _memberExpression2 = _interopRequireDefault(_memberExpression);

var _objectExpression = require("./object-expression");

var _objectExpression2 = _interopRequireDefault(_objectExpression);

var _returnStatement = require("./return-statement");

var _returnStatement2 = _interopRequireDefault(_returnStatement);

var _sequenceExpression = require("./sequence-expression");

var _sequenceExpression2 = _interopRequireDefault(_sequenceExpression);

var _switchStatement = require("./switch-statement");

var _switchStatement2 = _interopRequireDefault(_switchStatement);

var _thisExpression = require("./this-expression");

var _thisExpression2 = _interopRequireDefault(_thisExpression);

var _throwStatement = require("./throw-statement");

var _throwStatement2 = _interopRequireDefault(_throwStatement);

var _tryStatement = require("./try-statement");

var _tryStatement2 = _interopRequireDefault(_tryStatement);

var _unaryExpression = require("./unary-expression");

var _unaryExpression2 = _interopRequireDefault(_unaryExpression);

var _updateExpression = require("./update-expression");

var _updateExpression2 = _interopRequireDefault(_updateExpression);

var _variableDeclaration = require("./variable-declaration");

var _variableDeclaration2 = _interopRequireDefault(_variableDeclaration);

var _variableDeclarator = require("./variable-declarator");

var _variableDeclarator2 = _interopRequireDefault(_variableDeclarator);

var _withStatement = require("./with-statement");

var _withStatement2 = _interopRequireDefault(_withStatement);

var visitors = {
	ArrayExpression: _arrayExpression2["default"],
	AssignmentExpression: _assignmentExpression2["default"],
	BinaryExpression: _binaryExpression2["default"],
	BlockStatement: _blockStatement2["default"],
	BreakStatement: _interruptStatement2["default"],
	CallExpression: _callExpression2["default"],
	ConditionalExpression: _ifStatement2["default"],
	DebuggerStatement: _debuggerStatement2["default"],
	DoWhileStatement: _doWhileStatementJs2["default"],
	EmptyStatement: _emptyStatement2["default"],
	ExpressionStatement: _expressionStatement2["default"],
	ForStatement: _forStatement2["default"],
	ForInStatement: _forInStatement2["default"],
	FunctionDeclaration: _functionDeclaration2["default"],
	FunctionExpression: _functionExpression2["default"],
	Identifier: _identifier2["default"],
	LabeledStatement: _labeledStatement2["default"],
	Literal: _literal2["default"],
	LogicalExpression: _logicalExpression2["default"],
	MemberExpression: _memberExpression2["default"],
	ObjectExpression: _objectExpression2["default"],
	ReturnStatement: _returnStatement2["default"],
	SequenceExpression: _sequenceExpression2["default"],
	SwitchStatement: _switchStatement2["default"],
	ThisExpression: _thisExpression2["default"],
	ThrowStatement: _throwStatement2["default"],
	TryStatement: _tryStatement2["default"],
	UnaryExpression: _unaryExpression2["default"],
	UpdateExpression: _updateExpression2["default"],
	VariableDeclaration: _variableDeclaration2["default"],
	VariableDeclarator: _variableDeclarator2["default"],
	WithStatement: _withStatement2["default"],

	ContinueStatement: _interruptStatement2["default"],
	IfStatement: _ifStatement2["default"],
	NewExpression: _callExpression2["default"],
	Program: _blockStatement2["default"],
	WhileStatement: _doWhileStatementJs2["default"]
};

exports["default"] = {
	visit: function visit(context) {
		if (!(context.node.type in visitors)) {
			throw new TypeError("No handler defined for: " + context.node.type);
		}

		return visitors[context.node.type](context);
	}
};
module.exports = exports["default"];

},{"./array-expression":59,"./assignment-expression":60,"./binary-expression":61,"./block-statement":62,"./call-expression":63,"./debugger-statement":64,"./do-while-statement.js":65,"./empty-statement":66,"./expression-statement":67,"./for-in-statement":68,"./for-statement":69,"./function-declaration":70,"./function-expression":71,"./identifier":72,"./if-statement":73,"./interrupt-statement":75,"./labeled-statement":76,"./literal":77,"./logical-expression":78,"./member-expression":79,"./object-expression":80,"./return-statement":81,"./sequence-expression":82,"./switch-statement":83,"./this-expression":84,"./throw-statement":85,"./try-statement":86,"./unary-expression":87,"./update-expression":88,"./variable-declaration":89,"./variable-declarator":90,"./with-statement":91}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = InterruptStatement;

function InterruptStatement(context) {
	var label;
	if (context.node.label) {
		label = context.node.label.name;
	}

	if (context.node.type === "BreakStatement") {
		return context.cancel(label);
	}

	return context.skip(label);
}

module.exports = exports["default"];

},{}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = LabeledStatement;

function LabeledStatement(context) {
	return context.createLabel(context.node.body, context.node.label.name).execute();
}

module.exports = exports["default"];

},{}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = Literal;

function Literal(context) {
	return context.result(context.env.objectFactory.createPrimitive(context.node.value));
}

module.exports = exports["default"];

},{}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = LogicalExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function LogicalExpression(context) {
	var left = context.create(context.node.left).execute();
	var passed = convert.toBoolean(left.result.getValue());

	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return context.create(context.node.right).execute();
}

module.exports = exports["default"];

},{"../utils/convert":57}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = MemberExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _envPropertyReference = require("../env/property-reference");

var _envPropertyReference2 = _interopRequireDefault(_envPropertyReference);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function MemberExpression(context) {
	var obj = context.create(context.node.object).execute().result.getValue();
	var name, value;

	if (context.node.computed) {
		name = convert.toString(context.env, context.create(context.node.property).execute().result.getValue());
	} else {
		name = context.node.property.name;
	}

	value = new _envPropertyReference2["default"](name, obj, false, context.env);
	return context.result(value);
}

module.exports = exports["default"];

},{"../env/property-reference":39,"../utils/convert":57}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ObjectExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

function setDescriptor(env, obj, name, descriptor) {
	if (descriptor.get) {
		descriptor.getter = function () {
			return func.executeFunction(env, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		};
	}

	if (descriptor.set) {
		descriptor.setter = function () {
			func.executeFunction(env, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		};
	}

	obj.defineOwnProperty(name, descriptor);
}

function createDescriptor(value) {
	return { value: value, configurable: true, enumerable: true, writable: true };
}

function ObjectExpression(context) {
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
		setDescriptor(context.env, obj, prop, descriptors[prop]);
	}

	return context.result(obj);
}

module.exports = exports["default"];

},{"../utils/func":58}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ReturnStatement;

function ReturnStatement(context) {
	if (context.node.argument) {
		return context.exit(context.create(context.node.argument).execute().result.getValue());
	}

	return context.exit(context.env.global.getProperty("undefined").getValue());
}

module.exports = exports["default"];

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = SequenceExpression;

function SequenceExpression(context) {
	var value;

	context.node.expressions.forEach(function (expr) {
		value = context.create(expr).execute().result.getValue();
	});

	return context.result(value);
}

module.exports = exports["default"];

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = SwitchStatement;
function executeStatements(context, statements) {
	var result;
	for (var i = 0, ln = statements.length; i < ln; i++) {
		result = context.create(statements[i]).execute();
		if (result && result.isCancelled()) {
			return result;
		}
	}

	return result;
}

function SwitchStatement(context) {
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
}

module.exports = exports["default"];

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ThisExpression;

function ThisExpression(context) {
	return context.result(context.env.getThisBinding());
}

module.exports = exports["default"];

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ThrowStatement;

function ThrowStatement(context) {
	// todo: handle more specific errors
	var arg = context.create(context.node.argument).execute().result.getValue();

	if (arg.isPrimitive) {
		throw arg.value;
	}

	var err = new Error();
	err.wrappedError = arg;
	throw err;
}

module.exports = exports["default"];

},{}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = TryCatchStatement;

function TryCatchStatement(context) {
	var result;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			var caughtError = err && err.wrappedError || context.env.objectFactory.createPrimitive(err);

			// var scope = context.env.createScope();
			// scope.init(context.node.handler.body);

			var errVar = context.node.handler.param.name;
			var hasVariable = context.env.hasVariable(errVar);

			if (!hasVariable) {
				context.env.createVariable(errVar);
			}

			context.env.putValue(errVar, caughtError);

			try {
				result = context.create(context.node.handler.body, context.node.handler).execute();
			} catch (catchError) {
				// scope.exitScope();
				throw catchError;
			} finally {
				if (!hasVariable) {
					context.env.deleteVariable(errVar);
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
}

module.exports = exports["default"];

},{}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = UnaryExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function UnaryExpression(context) {
	var result = context.create(context.node.argument).execute().result;
	var objectFactory = context.env.objectFactory;
	var value, newValue;

	switch (context.node.operator) {
		case "typeof":
			var type = undefined;
			if (result instanceof _envReference2["default"] && result.isUnresolved()) {
				type = "undefined";
			} else {
				value = result.getValue();
				type = value ? value.type : "undefined";
			}

			newValue = objectFactory.createPrimitive(type);
			break;

		case "-":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(-convert.toNumber(context.env, value));
			break;

		case "+":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(+convert.toNumber(context.env, value));
			break;

		case "!":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(!convert.toBoolean(value));
			break;

		case "~":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(~convert.toInt32(context.env, value));
			break;

		case "delete":
			var deleted = true;
			if (result && result instanceof _envReference2["default"]) {
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
}

module.exports = exports["default"];

},{"../env/reference":40,"../utils/convert":57}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = UpdateExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

function UpdateExpression(context) {
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
}

module.exports = exports["default"];

},{"../utils/convert":57}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = VariableDeclaration;

function VariableDeclaration(context) {
	context.node.declarations.forEach(function (decl) {
		return context.create(decl).execute();
	});
	return context.empty();
}

module.exports = exports["default"];

},{}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = VariableDeclarator;

function VariableDeclarator(context) {
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
}

module.exports = exports["default"];

},{}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = WithStatement;

function WithStatement(context) {
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
}

module.exports = exports["default"];

},{}]},{},[1])(1)
});