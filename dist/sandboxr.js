(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

require("./polyfills");

var _env = require("./env");

var _env2 = _interopRequireDefault(_env);

var _executionContext = require("./execution-context");

var _executionContext2 = _interopRequireDefault(_executionContext);

var _utilsAsync = require("./utils/async");

var SandBoxr = (function () {
	function SandBoxr(ast) {
		var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, SandBoxr);

		this.ast = ast;
		this.config = config;
	}

	_createClass(SandBoxr, [{
		key: "execute",
		value: function execute(env) {
			if (!env) {
				env = SandBoxr.createEnvironment();
				env.init(this.config);
			}

			this.env = env;
			var response;

			try {
				response = new _executionContext2["default"](env, this.ast).execute();
			} catch (err) {
				return _Promise.reject(err);
			}

			// convert to promise
			return (0, _utilsAsync.promisify)(response).then(function (r) {
				return r && r.result;
			});
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
},{"./env":169,"./execution-context":173,"./polyfills":176,"./utils/async":189,"babel-runtime/core-js/promise":10,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/interop-require-default":18}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":26}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/sign"), __esModule: true };
},{"core-js/library/fn/math/sign":27}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":28}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":29}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":30}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":31}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":32}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":33}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":34}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":35}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":36}],13:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],14:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":6}],15:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = function (obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":6}],16:[function(require,module,exports){
"use strict";

var _Object$getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;
    desc = parent = getter = undefined;
    _again = false;
    if (object === null) object = Function.prototype;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/get-own-property-descriptor":7}],17:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":5,"babel-runtime/core-js/object/set-prototype-of":9}],18:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],19:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],20:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  delete g.regeneratorRuntime;
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9XG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpcztcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogbW9kdWxlLmV4cG9ydHMsIF9fZXNNb2R1bGU6IHRydWUgfTtcbiJdfQ==
},{"./runtime":21}],21:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = _Object$create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = _Object$create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument ? _Promise.resolve(value.arg).then(invokeNext, invokeThrow) : _Promise.resolve(value).then(function (unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration. If the Promise is rejected, however, the
        // result for this iteration will be rejected with the same
        // reason. Note that rejections of yielded Promises are not
        // thrown back into the generator function, as is the case
        // when an awaited Promise is rejected. This difference in
        // behavior between yield and await is important, because it
        // allows the consumer to decide what to do with the yielded
        // rejection (swallow it and continue, manually .throw it back
        // into the generator, abandon iteration, whatever). With
        // await, by contrast, there is no opportunity to examine the
        // rejection reason outside the generator function, so the
        // only option is to throw it from the await expression, and
        // let the generator function handle the exception.
        result.value = unwrapped;
        return result;
      });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(function () {
        return invoke(method, arg);
      }) : new _Promise(function (resolve) {
        resolve(invoke(method, arg));
      });

      // Avoid propagating enqueueResult failures to Promises returned by
      // later invocations of the iterator.
      previousPromise = enqueueResult["catch"](function (ignored) {});

      return enqueueResult;
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX1N5bWJvbCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9TeW1ib2wkaXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JGNyZWF0ZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfUHJvbWlzZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKVtcImRlZmF1bHRcIl07XG5cbiEoZnVuY3Rpb24gKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciBpdGVyYXRvclN5bWJvbCA9IHR5cGVvZiBfU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX1N5bWJvbCRpdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBnZW5lcmF0b3IgPSBfT2JqZWN0JGNyZWF0ZSgob3V0ZXJGbiB8fCBHZW5lcmF0b3IpLnByb3RvdHlwZSk7XG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiB8fCBudWxsLCBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSkpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICBnZW5GdW4ucHJvdG90eXBlID0gX09iamVjdCRjcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLiBTb21lIG1heSBjb25zaWRlciB0aGUgbmFtZSBvZiB0aGlzIG1ldGhvZCB0b29cbiAgLy8gY3V0ZXN5LCBidXQgdGhleSBhcmUgY3VybXVkZ2VvbnMuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgLy8gVGhpcyBpbnZva2UgZnVuY3Rpb24gaXMgd3JpdHRlbiBpbiBhIHN0eWxlIHRoYXQgYXNzdW1lcyBzb21lXG4gICAgLy8gY2FsbGluZyBmdW5jdGlvbiAob3IgUHJvbWlzZSkgd2lsbCBoYW5kbGUgZXhjZXB0aW9ucy5cbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbbWV0aG9kXShhcmcpO1xuICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudCA/IF9Qcm9taXNlLnJlc29sdmUodmFsdWUuYXJnKS50aGVuKGludm9rZU5leHQsIGludm9rZVRocm93KSA6IF9Qcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgLy8gcmVzdWx0IGZvciB0aGlzIGl0ZXJhdGlvbiB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHNhbWVcbiAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAvLyB3aGVuIGFuIGF3YWl0ZWQgUHJvbWlzZSBpcyByZWplY3RlZC4gVGhpcyBkaWZmZXJlbmNlIGluXG4gICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgLy8gcmVqZWN0aW9uIChzd2FsbG93IGl0IGFuZCBjb250aW51ZSwgbWFudWFsbHkgLnRocm93IGl0IGJhY2tcbiAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgLy8gcmVqZWN0aW9uIHJlYXNvbiBvdXRzaWRlIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIHNvIHRoZVxuICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBpbnZva2VOZXh0ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgdmFyIGludm9rZVRocm93ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuICAgIHZhciBpbnZva2VSZXR1cm4gPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwicmV0dXJuXCIpO1xuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgZW5xdWV1ZVJlc3VsdCA9XG4gICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pIDogbmV3IF9Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUoaW52b2tlKG1ldGhvZCwgYXJnKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZW5xdWV1ZVJlc3VsdCBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieVxuICAgICAgLy8gbGF0ZXIgaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgcHJldmlvdXNQcm9taXNlID0gZW5xdWV1ZVJlc3VsdFtcImNhdGNoXCJdKGZ1bmN0aW9uIChpZ25vcmVkKSB7fSk7XG5cbiAgICAgIHJldHVybiBlbnF1ZXVlUmVzdWx0O1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIgfHwgbWV0aG9kID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSwgZGVsZWdhdGUuaXRlcmF0b3IsIGFyZyk7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIExpa2UgcmV0dXJuaW5nIGdlbmVyYXRvci50aHJvdyh1bmNhdWdodCksIGJ1dCB3aXRob3V0IHRoZVxuICAgICAgICAgICAgLy8gb3ZlcmhlYWQgb2YgYW4gZXh0cmEgZnVuY3Rpb24gY2FsbC5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWxlZ2F0ZSBnZW5lcmF0b3IgcmFuIGFuZCBoYW5kbGVkIGl0cyBvd24gZXhjZXB0aW9ucyBzb1xuICAgICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2Ygd2hhdCB0aGUgbWV0aG9kIHdhcywgd2UgY29udGludWUgYXMgaWYgaXQgaXNcbiAgICAgICAgICAvLyBcIm5leHRcIiB3aXRoIGFuIHVuZGVmaW5lZCBhcmcuXG4gICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCkge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gYXJnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IEdlblN0YXRlQ29tcGxldGVkIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlICYmIG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICB0aGlzLnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHwgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbiBmaW5pc2goZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiBfY2F0Y2godHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbi8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbi8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbnR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDogdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdW5kZWZpbmVkKTsiXX0=
},{"_process":22,"babel-runtime/core-js/object/create":5,"babel-runtime/core-js/promise":10,"babel-runtime/core-js/symbol":11,"babel-runtime/core-js/symbol/iterator":12}],22:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],23:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":103,"../modules/es6.object.to-string":149,"../modules/es6.promise":150,"../modules/es6.string.iterator":151,"../modules/web.dom.iterable":153}],24:[function(require,module,exports){
require('../../modules/es6.math.sign');
module.exports = require('../../modules/$.core').Math.sign;
},{"../../modules/$.core":103,"../../modules/es6.math.sign":148}],25:[function(require,module,exports){
require('../../modules/es6.string.repeat');
module.exports = require('../../modules/$.core').String.repeat;
},{"../../modules/$.core":103,"../../modules/es6.string.repeat":152}],26:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":88,"../modules/es6.string.iterator":96,"../modules/web.dom.iterable":98}],27:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"../../modules/$.core":42,"../../modules/es6.math.sign":90,"dup":24}],28:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":42,"../../modules/es6.object.assign":91}],29:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":65}],30:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":65}],31:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.statics-accept-primitives');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":65,"../../modules/es6.object.statics-accept-primitives":93}],32:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":42,"../../modules/es6.object.statics-accept-primitives":93}],33:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":42,"../../modules/es6.object.set-prototype-of":92}],34:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"../modules/$.core":42,"../modules/es6.object.to-string":94,"../modules/es6.promise":95,"../modules/es6.string.iterator":96,"../modules/web.dom.iterable":98,"dup":23}],35:[function(require,module,exports){
require('../../modules/es6.symbol');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":42,"../../modules/es6.symbol":97}],36:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":86,"../../modules/es6.string.iterator":96,"../../modules/web.dom.iterable":98}],37:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],38:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":57}],39:[function(require,module,exports){
var toObject  = require('./$.to-object')
  , ES5Object = require('./$.es5-object')
  , enumKeys  = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = toObject(target, true)
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$.enum-keys":47,"./$.es5-object":48,"./$.to-object":83}],40:[function(require,module,exports){
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":41,"./$.wks":86}],41:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],42:[function(require,module,exports){
var core = module.exports = {};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],43:[function(require,module,exports){
// Optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.a-function":37}],44:[function(require,module,exports){
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
},{"./$.core":42,"./$.global":51}],45:[function(require,module,exports){
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],46:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":51,"./$.is-object":57}],47:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , isEnum     = $.isEnum
    , getSymbols = $.getSymbols;
  if(getSymbols)for(var symbols = getSymbols(it), i = 0, key; symbols.length > i; ){
    if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":65}],48:[function(require,module,exports){
// fallback for not array-like ES3 strings
var cof     = require('./$.cof')
  , $Object = Object;
module.exports = 0 in $Object('z') ? $Object : function(it){
  return cof(it) == 'String' ? it.split('') : $Object(it);
};
},{"./$.cof":41}],49:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":38,"./$.ctx":43,"./$.is-array-iter":56,"./$.iter-call":59,"./$.to-length":82,"./core.get-iterator-method":87}],50:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toString = {}.toString
  , toObject = require('./$.to-object')
  , getNames = require('./$').getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

function getWindowNames(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
}

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toObject(it));
};
},{"./$":65,"./$.to-object":83}],51:[function(require,module,exports){
var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
module.exports = global;
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],52:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],53:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":65,"./$.property-desc":69,"./$.support-desc":78}],54:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":51}],55:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],56:[function(require,module,exports){
var Iterators = require('./$.iterators')
  , ITERATOR  = require('./$.wks')('iterator');
module.exports = function(it){
  return ('Array' in Iterators ? Iterators.Array : Array.prototype[ITERATOR]) === it;
};
},{"./$.iterators":64,"./$.wks":86}],57:[function(require,module,exports){
// http://jsperf.com/core-js-isobject
module.exports = function(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
};
},{}],58:[function(require,module,exports){
// Safari has buggy iterators w/o `next`
module.exports = 'keys' in [] && !('next' in [].keys());
},{}],59:[function(require,module,exports){
var anObject = require('./$.an-object');
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)anObject(ret.call(iterator));
}
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
};
},{"./$.an-object":38}],60:[function(require,module,exports){
'use strict';
var $ = require('./$')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: require('./$.property-desc')(1,next)});
  require('./$.tag')(Constructor, NAME + ' Iterator');
};
},{"./$":65,"./$.hide":53,"./$.property-desc":69,"./$.tag":79,"./$.wks":86}],61:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
function returnThis(){ return this; }
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  require('./$.iter-create')(Constructor, NAME, next);
  function createMethod(kind){
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = require('./$').getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    require('./$.tag')(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * require('./$.iter-buggy'), NAME, methods);
  }
};
},{"./$":65,"./$.def":44,"./$.has":52,"./$.hide":53,"./$.iter-buggy":58,"./$.iter-create":60,"./$.iterators":64,"./$.library":67,"./$.redef":70,"./$.tag":79,"./$.wks":86}],62:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":86}],63:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],64:[function(require,module,exports){
module.exports = {};
},{}],65:[function(require,module,exports){
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
},{}],66:[function(require,module,exports){
var $        = require('./$')
  , toObject = require('./$.to-object');
module.exports = function(object, el){
  var O      = toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":65,"./$.to-object":83}],67:[function(require,module,exports){
module.exports = true;
},{}],68:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":70}],69:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],70:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":53}],71:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],72:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
function check(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":65,"./$.an-object":38,"./$.ctx":43,"./$.is-object":57}],73:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":51}],74:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],75:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if(require('./$.support-desc') && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":65,"./$.support-desc":78,"./$.wks":86}],76:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],77:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":45,"./$.to-integer":81}],78:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !!function(){
  try {
    return Object.defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
},{}],79:[function(require,module,exports){
var has  = require('./$.has')
  , hide = require('./$.hide')
  , TAG  = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
};
},{"./$.has":52,"./$.hide":53,"./$.wks":86}],80:[function(require,module,exports){
'use strict';
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id, '*');
    };
    global.addEventListener('message', listner, false);
  // WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":41,"./$.ctx":43,"./$.dom-create":46,"./$.global":51,"./$.html":54,"./$.invoke":55}],81:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],82:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":81}],83:[function(require,module,exports){
var ES5Object = require('./$.es5-object')
  , defined   = require('./$.defined');
module.exports = function(it, realString){
  return (realString ? Object : ES5Object)(defined(it));
};
},{"./$.defined":45,"./$.es5-object":48}],84:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],85:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],86:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || require('./$.uid'))('Symbol.' + name));
};
},{"./$.global":51,"./$.shared":73,"./$.uid":84}],87:[function(require,module,exports){
var global    = require('./$.global')
  , classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  var Symbol = global.Symbol;
  if(it != undefined){
    return it[Symbol && Symbol.iterator || '@@iterator']
      || it[ITERATOR]
      || Iterators[classof(it)];
  }
};
},{"./$.classof":40,"./$.core":42,"./$.global":51,"./$.iterators":64,"./$.wks":86}],88:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":38,"./$.core":42,"./core.get-iterator-method":87}],89:[function(require,module,exports){
var setUnscope = require('./$.unscope')
  , step       = require('./$.iter-step')
  , Iterators  = require('./$.iterators')
  , toObject   = require('./$.to-object');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toObject(iterated); // target
  this._i = 0;                  // next index
  this._k = kind;               // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$.iter-define":61,"./$.iter-step":63,"./$.iterators":64,"./$.to-object":83,"./$.unscope":85}],90:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $def = require('./$.def');

$def($def.S, 'Math', {sign: require('./$.sign')});
},{"./$.def":44,"./$.sign":74}],91:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":39,"./$.def":44}],92:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":44,"./$.set-proto":72}],93:[function(require,module,exports){
var $        = require('./$')
  , core     = require('./$.core')
  , $def     = require('./$.def')
  , toObject = require('./$.to-object')
  , isObject = require('./$.is-object');
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = (core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(toObject(it, true));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : require('./$.get-names').get;
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":65,"./$.core":42,"./$.def":44,"./$.get-names":50,"./$.is-object":57,"./$.to-object":83}],94:[function(require,module,exports){

},{}],95:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $def       = require('./$.def')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same')
  , species    = require('./$.species')
  , SPECIES    = require('./$.wks')('species')
  , RECORD     = require('./$.uid')('record')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , asap       = process && process.nextTick || require('./$.task').set
  , P          = global[PROMISE]
  , Wrapper;

function testResolve(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
}

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.support-desc')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function isPromise(it){
  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
}
function sameConstructor(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
}
function getConstructor(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
}
function notify(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  // strange IE + webpack dev server bug - use .call(global)
  asap.call(global, function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        if(isUnhandled(record.p)){
          if(isNode){
            process.emit('unhandledRejection', value, record.p);
          } else if(global.console && console.error){
            console.error('Unhandled promise rejection', value);
          }
        }
        record.a = undefined;
      });
    }, 1);
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
}
function $resolve(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    this[RECORD] = record;
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = anObject(anObject(this).constructor)[SPECIES];
      var react = {
        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
        fail: typeof onRejected == 'function'  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = aFunction(res);
        react.rej = aFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
require('./$.tag')(P, PROMISE);
species(P);
species(Wrapper = require('./$.core')[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new this(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":65,"./$.a-function":37,"./$.an-object":38,"./$.classof":40,"./$.core":42,"./$.ctx":43,"./$.def":44,"./$.for-of":49,"./$.global":51,"./$.is-object":57,"./$.iter-detect":62,"./$.library":67,"./$.mix":68,"./$.same":71,"./$.set-proto":72,"./$.species":75,"./$.strict-new":76,"./$.support-desc":78,"./$.tag":79,"./$.task":80,"./$.uid":84,"./$.wks":86}],96:[function(require,module,exports){
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":61,"./$.string-at":77}],97:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , SUPPORT_DESC   = require('./$.support-desc')
  , $def           = require('./$.def')
  , $redef         = require('./$.redef')
  , shared         = require('./$.shared')
  , setTag         = require('./$.tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , anObject       = require('./$.an-object')
  , toObject       = require('./$.to-object')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , $create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

var setSymbolDesc = SUPPORT_DESC ? function(){ // fallback for old Android
  try {
    return $create(setDesc({}, HIDDEN, {
      get: function(){
        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
      }
    }))[HIDDEN] || setDesc;
  } catch(e){
    return function(it, key, D){
      var protoDesc = getDesc(ObjectProto, key);
      if(protoDesc)delete ObjectProto[key];
      setDesc(it, key, D);
      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
    };
  }
}() : setDesc;

function wrap(tag){
  var sym = AllSymbols[tag] = $create($Symbol.prototype);
  sym._k = tag;
  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function(){
    return this._k;
  });

  $.create     = create;
  $.isEnum     = propertyIsEnumerable;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDesc    = defineProperty;
  $.setDescs   = defineProperties;
  $.getNames   = $names.get = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if(SUPPORT_DESC && !require('./$.library')){
    $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = wks(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag(global.JSON, 'JSON', true);
},{"./$":65,"./$.an-object":38,"./$.def":44,"./$.enum-keys":47,"./$.get-names":50,"./$.global":51,"./$.has":52,"./$.keyof":66,"./$.library":67,"./$.property-desc":69,"./$.redef":70,"./$.shared":73,"./$.support-desc":78,"./$.tag":79,"./$.to-object":83,"./$.uid":84,"./$.wks":86}],98:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":64,"./es6.array.iterator":89}],99:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],100:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./$.is-object":116,"dup":38}],101:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"./$.cof":102,"./$.wks":145,"dup":40}],102:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],103:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],104:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"./$.a-function":99,"dup":43}],105:[function(require,module,exports){
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
},{"./$.core":103,"./$.global":110,"./$.hide":112,"./$.redef":128}],106:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],107:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./$.global":110,"./$.is-object":116,"dup":46}],108:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./$.cof":102,"dup":48}],109:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./$.an-object":100,"./$.ctx":104,"./$.is-array-iter":115,"./$.iter-call":118,"./$.to-length":141,"./core.get-iterator-method":146,"dup":49}],110:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],111:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],112:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"./$":124,"./$.property-desc":127,"./$.support-desc":137,"dup":53}],113:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./$.global":110,"dup":54}],114:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],115:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"./$.iterators":123,"./$.wks":145,"dup":56}],116:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],117:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],118:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./$.an-object":100,"dup":59}],119:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./$":124,"./$.hide":112,"./$.property-desc":127,"./$.tag":138,"./$.wks":145,"dup":60}],120:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./$":124,"./$.def":105,"./$.has":111,"./$.hide":112,"./$.iter-buggy":117,"./$.iter-create":119,"./$.iterators":123,"./$.library":125,"./$.redef":128,"./$.tag":138,"./$.wks":145,"dup":61}],121:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./$.wks":145,"dup":62}],122:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"dup":63}],123:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"dup":64}],124:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],125:[function(require,module,exports){
module.exports = false;
},{}],126:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"./$.redef":128,"dup":68}],127:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"dup":69}],128:[function(require,module,exports){
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
},{"./$.core":103,"./$.global":110,"./$.has":111,"./$.hide":112,"./$.uid":143}],129:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"dup":71}],130:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"./$":124,"./$.an-object":100,"./$.ctx":104,"./$.is-object":116,"dup":72}],131:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"./$.global":110,"dup":73}],132:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"dup":74}],133:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./$":124,"./$.support-desc":137,"./$.wks":145,"dup":75}],134:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"dup":76}],135:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"./$.defined":106,"./$.to-integer":140,"dup":77}],136:[function(require,module,exports){
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
},{"./$.defined":106,"./$.to-integer":140}],137:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],138:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"./$.has":111,"./$.hide":112,"./$.wks":145,"dup":79}],139:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"./$.cof":102,"./$.ctx":104,"./$.dom-create":107,"./$.global":110,"./$.html":113,"./$.invoke":114,"dup":80}],140:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"dup":81}],141:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"./$.to-integer":140,"dup":82}],142:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"./$.defined":106,"./$.es5-object":108,"dup":83}],143:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"dup":84}],144:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables');
if(!(UNSCOPABLES in []))require('./$.hide')(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  [][UNSCOPABLES][key] = true;
};
},{"./$.hide":112,"./$.wks":145}],145:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"./$.global":110,"./$.shared":131,"./$.uid":143,"dup":86}],146:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"./$.classof":101,"./$.core":103,"./$.global":110,"./$.iterators":123,"./$.wks":145,"dup":87}],147:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"./$.iter-define":120,"./$.iter-step":122,"./$.iterators":123,"./$.to-object":142,"./$.unscope":144,"dup":89}],148:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./$.def":105,"./$.sign":132,"dup":90}],149:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./$.classof')
  , test    = {};
test[require('./$.wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./$.redef')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./$.classof":101,"./$.redef":128,"./$.wks":145}],150:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./$":124,"./$.a-function":99,"./$.an-object":100,"./$.classof":101,"./$.core":103,"./$.ctx":104,"./$.def":105,"./$.for-of":109,"./$.global":110,"./$.is-object":116,"./$.iter-detect":121,"./$.library":125,"./$.mix":126,"./$.same":129,"./$.set-proto":130,"./$.species":133,"./$.strict-new":134,"./$.support-desc":137,"./$.tag":138,"./$.task":139,"./$.uid":143,"./$.wks":145,"dup":95}],151:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"./$.iter-define":120,"./$.string-at":135,"dup":96}],152:[function(require,module,exports){
var $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.def":105,"./$.string-repeat":136}],153:[function(require,module,exports){
require('./es6.array.iterator');
var global      = require('./$.global')
  , hide        = require('./$.hide')
  , Iterators   = require('./$.iterators')
  , ITERATOR    = require('./$.wks')('iterator')
  , NL          = global.NodeList
  , HTC         = global.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype
  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if(NL && !(ITERATOR in NLProto))hide(NLProto, ITERATOR, ArrayValues);
if(HTC && !(ITERATOR in HTCProto))hide(HTCProto, ITERATOR, ArrayValues);
},{"./$.global":110,"./$.hide":112,"./$.iterators":123,"./$.wks":145,"./es6.array.iterator":147}],154:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = arrayApi;

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

	proto.define("push", objectFactory.createBuiltInFunction(function () {
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
},{"../types/array-type":178,"../utils/contracts":191,"../utils/convert":192,"../utils/func":193,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],155:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = booleanApi;

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
},{"../utils/contracts":191,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],156:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = consoleApi;

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
},{"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],157:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = dateApi;

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
},{"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],158:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = errorApi;

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
},{"../utils/contracts":191,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],159:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = functionApi;

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
},{"../types/native-function-type":182,"../utils/contracts":191,"../utils/convert":192,"../utils/func":193,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],160:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ecma51;

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

function ecma51(env) {
	var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var objectFactory = env.objectFactory = new _typesObjectFactory2["default"](env);
	var globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	var undefinedClass = new _typesPrimitiveType2["default"]();
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

			var directCall = this.callee instanceof _envReference2["default"] && this.callee.base === globalObject;
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
			var scope = env.setScope(directCall ? env.current.parent : env.globalScope);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lY21hLTUuMS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGVjbWE1MTtcblxudmFyIF90eXBlc1ByaW1pdGl2ZVR5cGUgPSByZXF1aXJlKFwiLi4vdHlwZXMvcHJpbWl0aXZlLXR5cGVcIik7XG5cbnZhciBfdHlwZXNQcmltaXRpdmVUeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVzUHJpbWl0aXZlVHlwZSk7XG5cbnZhciBfdHlwZXNPYmplY3RGYWN0b3J5ID0gcmVxdWlyZShcIi4uL3R5cGVzL29iamVjdC1mYWN0b3J5XCIpO1xuXG52YXIgX3R5cGVzT2JqZWN0RmFjdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlc09iamVjdEZhY3RvcnkpO1xuXG52YXIgX2VudlJlZmVyZW5jZSA9IHJlcXVpcmUoXCIuLi9lbnYvcmVmZXJlbmNlXCIpO1xuXG52YXIgX2VudlJlZmVyZW5jZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lbnZSZWZlcmVuY2UpO1xuXG52YXIgX251bWJlckFwaSA9IHJlcXVpcmUoXCIuL251bWJlci1hcGlcIik7XG5cbnZhciBfbnVtYmVyQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX251bWJlckFwaSk7XG5cbnZhciBfc3RyaW5nQXBpID0gcmVxdWlyZShcIi4vc3RyaW5nLWFwaVwiKTtcblxudmFyIF9zdHJpbmdBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RyaW5nQXBpKTtcblxudmFyIF9mdW5jdGlvbkFwaSA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uLWFwaVwiKTtcblxudmFyIF9mdW5jdGlvbkFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mdW5jdGlvbkFwaSk7XG5cbnZhciBfb2JqZWN0QXBpID0gcmVxdWlyZShcIi4vb2JqZWN0LWFwaVwiKTtcblxudmFyIF9vYmplY3RBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0QXBpKTtcblxudmFyIF9ib29sZWFuQXBpID0gcmVxdWlyZShcIi4vYm9vbGVhbi1hcGlcIik7XG5cbnZhciBfYm9vbGVhbkFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ib29sZWFuQXBpKTtcblxudmFyIF9kYXRlQXBpID0gcmVxdWlyZShcIi4vZGF0ZS1hcGlcIik7XG5cbnZhciBfZGF0ZUFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXRlQXBpKTtcblxudmFyIF9hcnJheUFwaSA9IHJlcXVpcmUoXCIuL2FycmF5LWFwaVwiKTtcblxudmFyIF9hcnJheUFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcnJheUFwaSk7XG5cbnZhciBfbWF0aEFwaSA9IHJlcXVpcmUoXCIuL21hdGgtYXBpXCIpO1xuXG52YXIgX21hdGhBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWF0aEFwaSk7XG5cbnZhciBfcmVnZXhBcGkgPSByZXF1aXJlKFwiLi9yZWdleC1hcGlcIik7XG5cbnZhciBfcmVnZXhBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVnZXhBcGkpO1xuXG52YXIgX2Vycm9yQXBpID0gcmVxdWlyZShcIi4vZXJyb3ItYXBpXCIpO1xuXG52YXIgX2Vycm9yQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Vycm9yQXBpKTtcblxudmFyIF9qc29uQXBpID0gcmVxdWlyZShcIi4vanNvbi1hcGlcIik7XG5cbnZhciBfanNvbkFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qc29uQXBpKTtcblxudmFyIF9jb25zb2xlQXBpID0gcmVxdWlyZShcIi4vY29uc29sZS1hcGlcIik7XG5cbnZhciBfY29uc29sZUFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zb2xlQXBpKTtcblxudmFyIF91dGlsc0NvbnZlcnQgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udmVydFwiKTtcblxudmFyIGNvbnZlcnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb252ZXJ0KTtcblxudmFyIGZyb3plbiA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSB9O1xuXG5mdW5jdGlvbiBlY21hNTEoZW52KSB7XG5cdHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHR2YXIgb2JqZWN0RmFjdG9yeSA9IGVudi5vYmplY3RGYWN0b3J5ID0gbmV3IF90eXBlc09iamVjdEZhY3RvcnkyW1wiZGVmYXVsdFwiXShlbnYpO1xuXHR2YXIgZ2xvYmFsT2JqZWN0ID0gZW52Lmdsb2JhbCA9IG9iamVjdEZhY3RvcnkuY3JlYXRlT2JqZWN0KCk7XG5cblx0ZW52LmNyZWF0ZU9iamVjdFNjb3BlKGdsb2JhbE9iamVjdCk7XG5cblx0dmFyIHVuZGVmaW5lZENsYXNzID0gbmV3IF90eXBlc1ByaW1pdGl2ZVR5cGUyW1wiZGVmYXVsdFwiXSgpO1xuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwidW5kZWZpbmVkXCIsIHVuZGVmaW5lZENsYXNzLCBmcm96ZW4pO1xuXG5cdHZhciBudWxsQ2xhc3MgPSBuZXcgX3R5cGVzUHJpbWl0aXZlVHlwZTJbXCJkZWZhdWx0XCJdKG51bGwpO1xuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwibnVsbFwiLCBudWxsQ2xhc3MsIGZyb3plbik7XG5cblx0Z2xvYmFsT2JqZWN0LmRlZmluZShcIkluZmluaXR5XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKEluZmluaXR5KSwgZnJvemVuKTtcblx0Z2xvYmFsT2JqZWN0LmRlZmluZShcIk5hTlwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShOYU4pLCBmcm96ZW4pO1xuXG5cdC8vIHRvZG86IG5vZGUgdnMgYnJvd3NlciAtIGRvIHdlIGNhcmU/XG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJ3aW5kb3dcIiwgZ2xvYmFsT2JqZWN0LCBmcm96ZW4pO1xuXG5cdCgwLCBfZnVuY3Rpb25BcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX29iamVjdEFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfYXJyYXlBcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX2Jvb2xlYW5BcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX251bWJlckFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfc3RyaW5nQXBpMltcImRlZmF1bHRcIl0pKGVudiwgY29uZmlnKTtcblx0KDAsIF9kYXRlQXBpMltcImRlZmF1bHRcIl0pKGVudiwgY29uZmlnKTtcblx0KDAsIF9yZWdleEFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfbWF0aEFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfZXJyb3JBcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX2pzb25BcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX2NvbnNvbGVBcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXG5cdFtcInBhcnNlRmxvYXRcIiwgXCJkZWNvZGVVUklcIiwgXCJlbmNvZGVVUklcIiwgXCJkZWNvZGVVUklDb21wb25lbnRcIiwgXCJlbmNvZGVVUklDb21wb25lbnRcIiwgXCJlc2NhcGVcIiwgXCJ1bmVzY2FwZVwiXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Z2xvYmFsT2JqZWN0LmRlZmluZShuYW1lLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHZhciBzdHJpbmdWYWx1ZSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCB2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoZ2xvYmFsW25hbWVdKHN0cmluZ1ZhbHVlKSk7XG5cdFx0fSwgMSwgbmFtZSkpO1xuXHR9KTtcblxuXHRbXCJpc05hTlwiLCBcImlzRmluaXRlXCJdLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRnbG9iYWxPYmplY3QuZGVmaW5lKG5hbWUsIGNvbnZlcnQudG9OYXRpdmVGdW5jdGlvbihlbnYsIGdsb2JhbFtuYW1lXSwgbmFtZSkpO1xuXHR9KTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwicGFyc2VJbnRcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHZhbHVlLCByYWRpeCkge1xuXHRcdHZhciBzdHJpbmdWYWx1ZSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCB2YWx1ZSk7XG5cdFx0cmFkaXggPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgcmFkaXgsIFwibnVtYmVyXCIpO1xuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHBhcnNlSW50KHN0cmluZ1ZhbHVlLCByYWRpeCkpO1xuXHR9LCAyLCBcInBhcnNlSW50XCIpKTtcblxuXHRpZiAoY29uZmlnLnBhcnNlcikge1xuXHRcdHZhciBldmFsRnVuYyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChjb2RlKSB7XG5cdFx0XHRpZiAoIWNvZGUpIHtcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZENsYXNzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY29kZS50eXBlICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHJldHVybiBjb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGlyZWN0Q2FsbCA9IHRoaXMuY2FsbGVlIGluc3RhbmNlb2YgX2VudlJlZmVyZW5jZTJbXCJkZWZhdWx0XCJdICYmIHRoaXMuY2FsbGVlLmJhc2UgPT09IGdsb2JhbE9iamVjdDtcblx0XHRcdHZhciBhc3Q7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGFzdCA9IGNvbmZpZy5wYXJzZXIoY29kZS52YWx1ZSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKGVyciBpbnN0YW5jZW9mIFN5bnRheEVycm9yICYmIC9hc3NpZ25pbmcgdG8gcnZhbHVlL2kudGVzdChlcnIubWVzc2FnZSkpIHtcblx0XHRcdFx0XHQvLyBoYWNrIGJlY2F1c2UgYWNvcm4gdGhyb3dzIHN5bnRheCBlcnJvclxuXHRcdFx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkludmFsaWQgbGVmdC1oYW5kIHNpZGUgaW4gYXNzaWdubWVudFwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IGVycjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdXNlIHRoZSBzYW1lIHNjb3BlIHVubGVzcyB0aGlzIGlzIGFuIFwiaW5kaXJlY3RcIiBjYWxsXG5cdFx0XHQvLyBpbiB3aGljaCBjYXNlIHdlIHVzZSB0aGUgZ2xvYmFsIHNjb3BlXG5cdFx0XHR2YXIgc2NvcGUgPSBlbnYuc2V0U2NvcGUoZGlyZWN0Q2FsbCA/IGVudi5jdXJyZW50LnBhcmVudCA6IGVudi5nbG9iYWxTY29wZSk7XG5cdFx0XHR2YXIgZXhlY3V0aW9uUmVzdWx0O1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRleGVjdXRpb25SZXN1bHQgPSB0aGlzLmNyZWF0ZShhc3QpLmV4ZWN1dGUoKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0fVxuXG5cdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdHJldHVybiBleGVjdXRpb25SZXN1bHQgJiYgZXhlY3V0aW9uUmVzdWx0LnJlc3VsdCA/IGV4ZWN1dGlvblJlc3VsdC5yZXN1bHQuZ2V0VmFsdWUoKSA6IHVuZGVmaW5lZENsYXNzO1xuXHRcdH0sIDEsIFwiZXZhbFwiKTtcblxuXHRcdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJldmFsXCIsIGV2YWxGdW5jKTtcblx0fVxuXG5cdG9iamVjdEZhY3RvcnkuaW5pdCgpO1xuXG5cdGlmIChjb25maWcuZXhjbHVkZSAmJiBjb25maWcuZXhjbHVkZS5sZW5ndGggPiAwKSB7XG5cdFx0Y29uZmlnLmV4Y2x1ZGUuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0dmFyIHNlZ21lbnRzID0gbmFtZS5zcGxpdChcIi5cIik7XG5cdFx0XHR2YXIgcGFyZW50ID0gZ2xvYmFsT2JqZWN0O1xuXG5cdFx0XHR3aGlsZSAoc2VnbWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQuZ2V0VmFsdWUoc2VnbWVudHMuc2hpZnQoKSk7XG5cblx0XHRcdFx0Ly8gYXBpIG5vdCBkZWZpbmVkIC0gYXNzdW1lIHVzZXIgZXJyb3I/XG5cdFx0XHRcdGlmICghcGFyZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHBhcmVudC5yZW1vdmUoc2VnbWVudHMuc2hpZnQoKSk7XG5cdFx0fSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiXX0=
},{"../env/reference":172,"../types/object-factory":183,"../types/primitive-type":185,"../utils/convert":192,"./array-api":154,"./boolean-api":155,"./console-api":156,"./date-api":157,"./error-api":158,"./function-api":159,"./json-api":161,"./math-api":162,"./number-api":163,"./object-api":164,"./regex-api":165,"./string-api":166,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],161:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = jsonApi;

var _utilsContracts = require("../utils/contracts");

var contracts = _interopRequireWildcard(_utilsContracts);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

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
	var length = arr.getValue("length").unwrap();
	var values = [];

	for (var i = 0; i < length; i++) {
		var value = undefined;
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
},{"../utils/contracts":191,"../utils/convert":192,"../utils/func":193,"babel-runtime/helpers/interop-require-wildcard":19}],162:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = mathApi;

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
},{"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],163:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = numberApi;

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
},{"../utils/contracts":191,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],164:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = objectApi;

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
},{"../types/object-type":184,"../utils/contracts":191,"../utils/convert":192,"../utils/func":193,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],165:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = regexApi;

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
},{"../utils/contracts":191,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19}],166:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = stringApi;

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
},{"../utils/contracts":191,"../utils/convert":192,"../utils/func":193,"babel-runtime/helpers/interop-require-wildcard":19}],167:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reference = require("./reference");

var _reference2 = _interopRequireDefault(_reference);

var _typesPropertyDescriptor = require("../types/property-descriptor");

var _typesPropertyDescriptor2 = _interopRequireDefault(_typesPropertyDescriptor);

var DeclarativeEnvironment = (function () {
	function DeclarativeEnvironment(parent, thisArg, env) {
		_classCallCheck(this, DeclarativeEnvironment);

		this.properties = _Object$create(null);
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
			} else {
				this.parent.putValue.apply(this.parent, arguments);
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
},{"../types/property-descriptor":186,"./reference":172,"babel-runtime/core-js/object/create":5,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/interop-require-default":18}],168:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.visit = visit;

function visit(node, callback) {
	if (!node) {
		return;
	}

	if (Array.isArray(node)) {
		node.forEach(function (n) {
			return visit(n, callback);
		});
		return;
	}

	switch (node.type) {
		case "BlockStatement":
			visit(node.body, callback);
			break;

		case "CatchClause":
			visit(node.body, callback);
			break;

		case "DoWhileStatement":
		case "WhileStatement":
			visit(node.test, callback);
			visit(node.body, callback);
			break;

		case "ExpressionStatement":
			visit(node.expression, callback);
			break;

		case "ForStatement":
			visit(node.init, callback);
			visit(node.body, callback);
			break;

		case "ForInStatement":
			visit(node.left, callback);
			visit(node.body, callback);
			break;

		case "IfStatement":
			// do not scan `test`
			visit(node.consequent, callback);
			visit(node.alternate, callback);
			break;

		case "LabeledStatement":
			visit(node.body, callback);
			break;

		case "SwitchStatement":
			visit(node.discriminant, callback);
			break;

		case "SwitchCase":
			visit(node.consequent, callback);
			break;

		case "TryStatement":
			visit(node.block, callback);
			visit(node.handler, callback);
			visit(node.finalizer, callback);
			break;

		case "VariableDeclaration":
			visit(node.declarations, callback);
			break;

		case "FunctionDeclaration":
		case "VariableDeclarator":
			callback(node);
			break;

		default:
		// ignore all other nodes
	}
}

;
},{}],169:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _utilsComparers = require("../utils/comparers");

var _utilsComparers2 = _interopRequireDefault(_utilsComparers);

var _hoister = require("./hoister");

function isStrictMode(_x2) {
	var _again = true;

	_function: while (_again) {
		var node = _x2;
		_again = false;

		if (Array.isArray(node)) {
			_x2 = node[0];
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
		value: function init() {
			var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			// clear state in case of re-init
			this.current = null;
			this.globalScope = null;

			(0, _ecma512["default"])(this, config);
			this.ops = _Object$assign(_utilsComparers2["default"], config.comparers);
		}
	}, {
		key: "evaluate",
		value: function evaluate(left, right, operator) {
			return this.ops[operator](this, left, right);
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
			var _this = this;

			var strict = isStrictMode(node);
			var undef = this.global.getProperty("undefined").getValue();

			(0, _hoister.visit)(node, function (decl) {
				var name = decl.name || decl.id.name;

				if (decl.type === "FunctionDeclaration") {
					// functions can be used before they are defined
					var func = _this.objectFactory.createFunction(decl);
					func.bindScope(_this.current);

					_this.createVariable(name, true);
					_this.putValue(name, func, strict);
				} else {
					if (_this.hasVariable(name)) {
						_this.putValue(name, undef, strict);
					} else {
						_this.createVariable(name, true);
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
},{"../ecma-5.1":160,"../execution-context":173,"../keywords":175,"../utils/comparers":190,"./declarative-environment":167,"./hoister":168,"./object-environment":170,"./reference":172,"babel-runtime/core-js/object/assign":4,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/interop-require-default":18}],170:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"./property-reference":171,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/interop-require-default":18}],171:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"../types/primitive-type":185,"./reference":172,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18}],172:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14}],173:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ExecutionContext;

var _executionResult = require("./execution-result");

var _executionResult2 = _interopRequireDefault(_executionResult);

var _visitors = require("./visitors");

var _visitors2 = _interopRequireDefault(_visitors);

var _utilsAsync = require("./utils/async");

function ExecutionContext(env, node, callee, isNew) {
	this.node = node;
	this.callee = callee;
	this.env = env;
	this.isNew = !!isNew;

	this.label = "";
	this.value = null;
	this.strict = false;
}

ExecutionContext.prototype = {
	constructor: ExecutionContext,

	execute: (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function callee$0$0() {
		return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					context$1$0.next = 2;
					return _visitors2["default"].visit(this);

				case 2:
					return context$1$0.abrupt("return", context$1$0.sent);

				case 3:
				case "end":
					return context$1$0.stop();
			}
		}, callee$0$0, this);
	})),

	create: function create(node, callee, isNew) {
		var context = new ExecutionContext(this.env, node, callee || this.callee, isNew);
		context.value = this.value;
		return context;
	},

	createLabel: function createLabel(node, label) {
		var context = this.create(node);
		context.label = label;
		return context;
	},

	cancel: function cancel(label) {
		var result = this.result(this.value, label);
		result.cancel = true;
		return result;
	},

	skip: function skip(label) {
		var result = this.result(this.value, label);
		result.skip = true;
		return result;
	},

	exit: function exit(value) {
		this.callee = null;

		var result = this.result(value);
		result.exit = true;
		return result;
	},

	result: function result(value, name, obj) {
		this.value = value;
		return new _executionResult2["default"](value, name, obj);
	},

	empty: function empty() {
		return this.result();
	}
};
module.exports = exports["default"];
},{"./execution-result":174,"./utils/async":189,"./visitors":210,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/regenerator":20}],174:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14}],175:[function(require,module,exports){
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
},{}],176:[function(require,module,exports){
"use strict";

require("core-js/fn/string/repeat");

require("core-js/fn/math/sign");

require("core-js/es6/promise");
},{"core-js/es6/promise":23,"core-js/fn/math/sign":24,"core-js/fn/string/repeat":25}],177:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectType = require("./object-type");

var _objectType2 = _interopRequireDefault(_objectType);

var ArgumentType = (function (_ObjectType) {
	_inherits(ArgumentType, _ObjectType);

	function ArgumentType() {
		_classCallCheck(this, ArgumentType);

		_get(Object.getPrototypeOf(ArgumentType.prototype), "constructor", this).call(this);
		this.className = "Arguments";
		this.parameterMap = _Object$create(null);
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
},{"./object-type":184,"babel-runtime/core-js/object/create":5,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18}],178:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"../utils/contracts":191,"../utils/convert":192,"./object-type":184,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],179:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"./object-type":184,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18}],180:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"./object-type":184,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18}],181:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"../utils/contracts":191,"./object-type":184,"./property-descriptor":186,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],182:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"./function-type":181,"./property-descriptor":186,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18}],183:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ObjectFactory;

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

var orphans = _Object$create(null);

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

	orphans = _Object$create(null);
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
},{"../utils/contracts":191,"./argument-type":177,"./array-type":178,"./date-type":179,"./error-type":180,"./function-type":181,"./native-function-type":182,"./object-type":184,"./primitive-type":185,"./regex-type":187,"./string-type":188,"babel-runtime/core-js/object/create":5,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],184:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _propertyDescriptor = require("./property-descriptor");

var _propertyDescriptor2 = _interopRequireDefault(_propertyDescriptor);

var ObjectType = (function () {
	function ObjectType() {
		_classCallCheck(this, ObjectType);

		this.isPrimitive = false;
		this.type = "object";
		this.className = "Object";
		this.properties = _Object$create(null);
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
			return _Object$keys(this.properties);
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
},{"./property-descriptor":186,"babel-runtime/core-js/object/create":5,"babel-runtime/core-js/object/keys":8,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/interop-require-default":18}],185:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"../utils/contracts":191,"./object-type":184,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],186:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsComparers = require("../utils/comparers");

var comparers = _interopRequireWildcard(_utilsComparers);

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

					return !("value" in descriptor) || comparers.areSame(this.value, descriptor.value);
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
},{"../utils/comparers":190,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/interop-require-wildcard":19}],187:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"./object-type":184,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18}],188:[function(require,module,exports){
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
},{"../utils/contracts":191,"./primitive-type":185,"./property-descriptor":186,"babel-runtime/helpers/class-call-check":13,"babel-runtime/helpers/create-class":14,"babel-runtime/helpers/get":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19}],189:[function(require,module,exports){
"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.degenerate = degenerate;
exports.promisify = promisify;

require("../polyfills");

function isThenable(obj) {
	return obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

function isNextable(obj) {
	return obj && typeof obj === "object" && typeof obj.next === "function";
}

function degenerate(fn) {
	return function () {
		var generator = fn.apply(this, arguments);

		function handle(_x) {
			var _again = true;

			_function: while (_again) {
				var result = _x;
				_again = false;

				if (result.done) {
					return result.value;
				}

				if (isThenable(result.value)) {
					return result.value.then(function (res) {
						return handle(generator.next(res));
					}, function (err) {
						return handle(generator["throw"](err));
					});
				}

				_x = generator.next(result.value);
				_again = true;
				continue _function;
			}
		}

		return handle(generator.next());
		// try {
		// 	return handle(generator.next());
		// } catch (err) {
		// 	return generator.throw(err);
		// }
	};
}

function promisify(obj) {
	if (isThenable(obj)) {
		return obj;
	}

	if (isNextable(obj)) {
		var result = undefined;
		while (result = obj.next()) {
			if (isThenable(result.value)) {
				return result.value;
			}

			if (result.done) {
				return _Promise.resolve(result.value);
			}
		}
		// let result = obj.next();
		// if (isThenable(result.value)) {
		// 	return result.value;
		// }

		// while (!result.done) {
		// 	result = obj.next();
		// }

		// return promisify(result.value);
	}

	return _Promise.resolve(obj);
}
},{"../polyfills":176,"babel-runtime/core-js/promise":10}],190:[function(require,module,exports){
"use strict";

var _defineProperty = require("babel-runtime/helpers/define-property")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _comparers;

var _convert = require("./convert");

var convert = _interopRequireWildcard(_convert);

function negate(value) {
	if (value === undefined) {
		return false;
	}

	return !value;
}

var comparers = (_comparers = {
	areSame: function areSame(a, b) {
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
	},

	implicitEquals: function implicitEquals(env, a, b) {
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
	},

	strictEquals: function strictEquals(env, a, b) {
		if (a.isPrimitive && b.isPrimitive) {
			return a.value === b.value;
		}

		if (a.isPrimitive || b.isPrimitive) {
			return false;
		}

		return a === b;
	},

	relationalCompare: function relationalCompare(env, a, b, leftFirst) {
		var primitiveA, primitiveB;
		if (leftFirst) {
			primitiveA = convert.toPrimitive(env, a, "number");
			primitiveB = convert.toPrimitive(env, b, "number");
		} else {
			primitiveB = convert.toPrimitive(env, b, "number");
			primitiveA = convert.toPrimitive(env, a, "number");
		}

		if (typeof primitiveA === "string" && typeof primitiveB === "string") {
			return primitiveA < primitiveB;
		}

		primitiveA = Number(primitiveA);
		primitiveB = Number(primitiveB);

		if (isNaN(primitiveA) || isNaN(primitiveB)) {
			return undefined;
		}

		return primitiveA < primitiveB;
	}

}, _defineProperty(_comparers, "==", function _() {
	return this.implicitEquals.apply(this, arguments);
}), _defineProperty(_comparers, "!=", function _() {
	return !this.implicitEquals.apply(this, arguments);
}), _defineProperty(_comparers, "===", function _() {
	return this.strictEquals.apply(this, arguments);
}), _defineProperty(_comparers, "!==", function _() {
	return !this.strictEquals.apply(this, arguments);
}), _defineProperty(_comparers, "<", function _(env, a, b) {
	return !!this.relationalCompare(env, a, b, true);
}), _defineProperty(_comparers, "<=", function _(env, a, b) {
	return negate(this.relationalCompare(env, b, a, false));
}), _defineProperty(_comparers, ">", function _(env, a, b) {
	return !!this.relationalCompare(env, b, a, false);
}), _defineProperty(_comparers, ">=", function _(env, a, b) {
	return negate(this.relationalCompare(env, a, b, true));
}), _comparers);

exports["default"] = comparers;
module.exports = exports["default"];
},{"./convert":192,"babel-runtime/helpers/define-property":15,"babel-runtime/helpers/interop-require-wildcard":19}],191:[function(require,module,exports){
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
},{}],192:[function(require,module,exports){
"use strict";

var _Math$sign = require("babel-runtime/core-js/math/sign")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

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

require("../polyfills");

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var sign = _Math$sign;
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
},{"../polyfills":176,"../utils/func":193,"babel-runtime/core-js/math/sign":3,"babel-runtime/helpers/interop-require-wildcard":19}],193:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFunctionResult = getFunctionResult;
exports.loadArguments = loadArguments;
exports.tryCallMethod = tryCallMethod;

var _async = require("./async");

var executeFunction = (0, _async.degenerate)(_regeneratorRuntime.mark(function callee$0$0(env, fn, params, args, thisArg, callee, isNew) {
	var scope, returnResult, executionResult;
	return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				scope = fn.createScope(env, thisArg, false);

				if (isNew) {
					returnResult = thisArg;
				}

				loadArguments(env, params, args, fn);

				context$1$0.prev = 3;

				if (!fn.native) {
					context$1$0.next = 10;
					break;
				}

				context$1$0.next = 7;
				return fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee, isNew), args) || returnResult;

			case 7:
				returnResult = context$1$0.sent;
				context$1$0.next = 12;
				break;

			case 10:
				executionResult = env.createExecutionContext(fn.node.body, callee, isNew).execute();

				if (executionResult && executionResult.exit && executionResult.result) {
					if (!isNew || !executionResult.result.isPrimitive) {
						returnResult = executionResult.result;
					}
				}

			case 12:
				context$1$0.next = 18;
				break;

			case 14:
				context$1$0.prev = 14;
				context$1$0.t0 = context$1$0["catch"](3);

				scope.exitScope();
				throw context$1$0.t0;

			case 18:

				scope.exitScope();
				return context$1$0.abrupt("return", returnResult || env.global.getProperty("undefined").getValue());

			case 20:
			case "end":
				return context$1$0.stop();
		}
	}, callee$0$0, this, [[3, 14]]);
}));

exports.executeFunction = executeFunction;

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
},{"./async":189,"babel-runtime/regenerator":20}],194:[function(require,module,exports){
"use strict";

var _defineProperty = require("babel-runtime/helpers/define-property")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _$$$$$$$$$$$in$instanceof;

var _convert = require("./convert");

var convert = _interopRequireWildcard(_convert);

function addOrConcat(env, a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(env, a);
	b = convert.toPrimitive(env, b);
	return a + b;
}

exports["default"] = (_$$$$$$$$$$$in$instanceof = {}, _defineProperty(_$$$$$$$$$$$in$instanceof, "+", addOrConcat), _defineProperty(_$$$$$$$$$$$in$instanceof, "-", function _(env, a, b) {
	return convert.toNumber(env, a) - convert.toNumber(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "/", function _(env, a, b) {
	return convert.toNumber(env, a) / convert.toNumber(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "*", function _(env, a, b) {
	return convert.toNumber(env, a) * convert.toNumber(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "<<", function _(env, a, b) {
	return convert.toPrimitive(env, a) << convert.toPrimitive(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, ">>", function _(env, a, b) {
	return convert.toPrimitive(env, a) >> convert.toPrimitive(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, ">>>", function _(env, a, b) {
	return convert.toPrimitive(env, a) >>> convert.toPrimitive(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "%", function _(env, a, b) {
	return convert.toPrimitive(env, a) % convert.toPrimitive(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "|", function _(env, a, b) {
	return convert.toInt32(env, a) | convert.toInt32(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "^", function _(env, a, b) {
	return convert.toInt32(env, a) ^ convert.toInt32(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "&", function _(env, a, b) {
	return convert.toInt32(env, a) & convert.toInt32(env, b);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "in", function _in(env, a, b) {
	a = convert.toString(env, a);
	if (b.isPrimitive) {
		throw new TypeError("Cannot use 'in' operator to search for '" + a + "' in " + convert.toString(env, b));
	}

	return b.hasProperty(a);
}), _defineProperty(_$$$$$$$$$$$in$instanceof, "instanceof", function _instanceof(env, a, b) {
	if (b.type !== "function") {
		throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
	}

	if (a.isPrimitive) {
		return false;
	}

	return b.hasInstance(a);
}), _$$$$$$$$$$$in$instanceof);
module.exports = exports["default"];
},{"./convert":192,"babel-runtime/helpers/define-property":15,"babel-runtime/helpers/interop-require-wildcard":19}],195:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ArrayExpression(context) {
	var objectFactory, arr, i, ln, item;
	return _regeneratorRuntime.wrap(function ArrayExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				objectFactory = context.env.objectFactory;
				arr = objectFactory.create("Array");

				if (!context.node.elements) {
					context$1$0.next = 15;
					break;
				}

				i = 0;
				ln = context.node.elements.length;

			case 5:
				if (!(i < ln)) {
					context$1$0.next = 14;
					break;
				}

				if (!context.node.elements[i]) {
					context$1$0.next = 11;
					break;
				}

				context$1$0.next = 9;
				return context.create(context.node.elements[i]).execute();

			case 9:
				item = context$1$0.sent.result.getValue();

				arr.defineOwnProperty(i, { value: item, configurable: true, enumerable: true, writable: true }, true, context.env);

			case 11:

				i++;
				context$1$0.next = 5;
				break;

			case 14:

				arr.putValue("length", objectFactory.createPrimitive(ln), false, context);

			case 15:
				return context$1$0.abrupt("return", context.result(arr));

			case 16:
			case "end":
				return context$1$0.stop();
		}
	}, ArrayExpression, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/regenerator":20}],196:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var _utilsOperators = require("../utils/operators");

var _utilsOperators2 = _interopRequireDefault(_utilsOperators);

var _utilsAsync = require("../utils/async");

var assignOperators = {
	"+=": _utilsOperators2["default"]["+"],
	"-=": _utilsOperators2["default"]["-"],
	"*=": _utilsOperators2["default"]["*"],
	"/=": _utilsOperators2["default"]["/"],
	"%=": _utilsOperators2["default"]["%"],
	"<<=": _utilsOperators2["default"]["<<"],
	">>=": _utilsOperators2["default"][">>"],
	">>>=": _utilsOperators2["default"][">>>"],
	"|=": _utilsOperators2["default"]["|"],
	"^=": _utilsOperators2["default"]["^"],
	"&=": _utilsOperators2["default"]["&"]
};

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function AssignmentExpression(context) {
	var assignment, right, left, newValue, rawValue;
	return _regeneratorRuntime.wrap(function AssignmentExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				assignment = context.node.operator === "=";
				context$1$0.next = 3;
				return context.create(context.node.right).execute();

			case 3:
				right = context$1$0.sent.result;
				context$1$0.next = 6;
				return context.create(context.node.left).execute();

			case 6:
				left = context$1$0.sent.result;

				if (left instanceof _envReference2["default"]) {
					context$1$0.next = 9;
					break;
				}

				throw new ReferenceError("Invalid left-hand side in assignment");

			case 9:
				if (assignment) {
					newValue = right.getValue();
				} else {
					rawValue = assignOperators[context.node.operator](context.env, left.getValue(), right.getValue());

					newValue = context.env.objectFactory.createPrimitive(rawValue);
				}

				left.putValue(newValue);
				return context$1$0.abrupt("return", context.result(newValue));

			case 12:
			case "end":
				return context$1$0.stop();
		}
	}, AssignmentExpression, this);
}));
module.exports = exports["default"];
},{"../env/reference":172,"../utils/async":189,"../utils/operators":194,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/regenerator":20}],197:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsOperators = require("../utils/operators");

var operators = _interopRequireWildcard(_utilsOperators);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function BinaryExpression(context) {
	var undef, left, leftValue, right, rightValue, newValue;
	return _regeneratorRuntime.wrap(function BinaryExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				undef = context.env.global.getProperty("undefined").getValue();
				context$1$0.next = 3;
				return context.create(context.node.left).execute();

			case 3:
				left = context$1$0.sent.result;
				leftValue = left.getValue() || undef;
				context$1$0.next = 7;
				return context.create(context.node.right).execute();

			case 7:
				right = context$1$0.sent.result;
				rightValue = right.getValue() || undef;

				if (context.node.operator in operators) {
					newValue = operators[context.node.operator](context.env, leftValue, rightValue);
				} else {
					newValue = context.env.evaluate(leftValue, rightValue, context.node.operator);
				}

				return context$1$0.abrupt("return", context.result(context.env.objectFactory.createPrimitive(newValue)));

			case 11:
			case "end":
				return context$1$0.stop();
		}
	}, BinaryExpression, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/operators":194,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],198:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function BlockStatement(context) {
	var result, priorResult, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, current;

	return _regeneratorRuntime.wrap(function BlockStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:

				if (context.node.type === "Program") {
					context.env.initScope(context.node.body);
				}

				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 4;
				_iterator = _getIterator(context.node.body);

			case 6:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 17;
					break;
				}

				current = _step.value;
				context$1$0.next = 10;
				return context.create(current).execute();

			case 10:
				result = context$1$0.sent;

				if (!(result && result.shouldBreak(context, false, priorResult))) {
					context$1$0.next = 13;
					break;
				}

				return context$1$0.abrupt("return", result);

			case 13:

				priorResult = result;

			case 14:
				_iteratorNormalCompletion = true;
				context$1$0.next = 6;
				break;

			case 17:
				context$1$0.next = 23;
				break;

			case 19:
				context$1$0.prev = 19;
				context$1$0.t0 = context$1$0["catch"](4);
				_didIteratorError = true;
				_iteratorError = context$1$0.t0;

			case 23:
				context$1$0.prev = 23;
				context$1$0.prev = 24;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 26:
				context$1$0.prev = 26;

				if (!_didIteratorError) {
					context$1$0.next = 29;
					break;
				}

				throw _iteratorError;

			case 29:
				return context$1$0.finish(26);

			case 30:
				return context$1$0.finish(23);

			case 31:
				return context$1$0.abrupt("return", result);

			case 32:
			case "end":
				return context$1$0.stop();
		}
	}, BlockStatement, this, [[4, 19, 23, 31], [24,, 26, 30]]);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":20}],199:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var _utilsAsync = require("../utils/async");

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

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function CallExpression(context) {
	var node, isNew, fnMember, fn, args, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg, native, thisArg, params, callee;

	return _regeneratorRuntime.wrap(function CallExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				node = context.node;
				isNew = context.node.type === "NewExpression";
				context$1$0.next = 4;
				return context.create(node.callee).execute();

			case 4:
				fnMember = context$1$0.sent.result;
				fn = fnMember.getValue();
				args = [];
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 10;
				_iterator = _getIterator(node.arguments);

			case 12:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 22;
					break;
				}

				arg = _step.value;
				context$1$0.t0 = args;
				context$1$0.next = 17;
				return context.create(arg).execute();

			case 17:
				context$1$0.t1 = context$1$0.sent.result.getValue();
				context$1$0.t0.push.call(context$1$0.t0, context$1$0.t1);

			case 19:
				_iteratorNormalCompletion = true;
				context$1$0.next = 12;
				break;

			case 22:
				context$1$0.next = 28;
				break;

			case 24:
				context$1$0.prev = 24;
				context$1$0.t2 = context$1$0["catch"](10);
				_didIteratorError = true;
				_iteratorError = context$1$0.t2;

			case 28:
				context$1$0.prev = 28;
				context$1$0.prev = 29;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 31:
				context$1$0.prev = 31;

				if (!_didIteratorError) {
					context$1$0.next = 34;
					break;
				}

				throw _iteratorError;

			case 34:
				return context$1$0.finish(31);

			case 35:
				return context$1$0.finish(28);

			case 36:
				if (!(!fn || fn.className !== "Function")) {
					context$1$0.next = 38;
					break;
				}

				throw new TypeError(convert.toString(context.env, fn) + " not a function");

			case 38:
				native = fn.native;
				thisArg = assignThis(context.env, fnMember, fn, isNew, native);
				params = native ? [] : fn.node.params;
				callee = fnMember;

				callee.identifier = fn.name;
				context$1$0.t3 = context;
				context$1$0.next = 46;
				return func.executeFunction(context.env, fn, params, args, thisArg, callee, isNew);

			case 46:
				context$1$0.t4 = context$1$0.sent;
				return context$1$0.abrupt("return", context$1$0.t3.result.call(context$1$0.t3, context$1$0.t4));

			case 48:
			case "end":
				return context$1$0.stop();
		}
	}, CallExpression, this, [[10, 24, 28, 36], [29,, 31, 35]]);
}));
module.exports = exports["default"];
},{"../env/reference":172,"../utils/async":189,"../utils/convert":192,"../utils/func":193,"babel-runtime/core-js/get-iterator":2,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],200:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = DebuggerStatement;

function DebuggerStatement(context) {
	return context.empty();
}

module.exports = exports["default"];
},{}],201:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function DoWhileStatement(context) {
	var result, priorResult, passed;
	return _regeneratorRuntime.wrap(function DoWhileStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				passed = true;

				if (!(context.node.type === "WhileStatement")) {
					context$1$0.next = 7;
					break;
				}

				context$1$0.t0 = convert;
				context$1$0.next = 5;
				return context.create(context.node.test).execute();

			case 5:
				context$1$0.t1 = context$1$0.sent.result.getValue();
				passed = context$1$0.t0.toBoolean.call(context$1$0.t0, context$1$0.t1);

			case 7:
				if (!passed) {
					context$1$0.next = 21;
					break;
				}

				context$1$0.next = 10;
				return context.create(context.node.body).execute();

			case 10:
				result = context$1$0.sent;

				if (!(result && result.shouldBreak(context, true, priorResult))) {
					context$1$0.next = 13;
					break;
				}

				return context$1$0.abrupt("return", result);

			case 13:
				context$1$0.t2 = convert;
				context$1$0.next = 16;
				return context.create(context.node.test).execute();

			case 16:
				context$1$0.t3 = context$1$0.sent.result.getValue();
				passed = context$1$0.t2.toBoolean.call(context$1$0.t2, context$1$0.t3);

				priorResult = result;
				context$1$0.next = 7;
				break;

			case 21:
				return context$1$0.abrupt("return", result);

			case 22:
			case "end":
				return context$1$0.stop();
		}
	}, DoWhileStatement, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],202:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = EmptyStatement;

function EmptyStatement(context) {
	return context.empty();
}

module.exports = exports["default"];
},{}],203:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ExpressionStatement(context) {
	var executionResult, executionValue;
	return _regeneratorRuntime.wrap(function ExpressionStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.expression).execute();

			case 2:
				executionResult = context$1$0.sent;
				executionValue = executionResult && executionResult.result && executionResult.result.getValue();
				return context$1$0.abrupt("return", context.result(executionValue || context.env.global.getProperty("undefined").getValue()));

			case 5:
			case "end":
				return context$1$0.stop();
		}
	}, ExpressionStatement, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/regenerator":20}],204:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ForInStatement(context) {
	var left, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, decl, obj, result, priorResult, visited, prop;

	return _regeneratorRuntime.wrap(function ForInStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				if (!(context.node.left.type === "VariableDeclaration")) {
					context$1$0.next = 30;
					break;
				}

				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 4;
				_iterator = _getIterator(context.node.left.declarations);

			case 6:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 14;
					break;
				}

				decl = _step.value;
				context$1$0.next = 10;
				return context.create(decl).execute();

			case 10:
				left = context$1$0.sent.result;

			case 11:
				_iteratorNormalCompletion = true;
				context$1$0.next = 6;
				break;

			case 14:
				context$1$0.next = 20;
				break;

			case 16:
				context$1$0.prev = 16;
				context$1$0.t0 = context$1$0["catch"](4);
				_didIteratorError = true;
				_iteratorError = context$1$0.t0;

			case 20:
				context$1$0.prev = 20;
				context$1$0.prev = 21;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 23:
				context$1$0.prev = 23;

				if (!_didIteratorError) {
					context$1$0.next = 26;
					break;
				}

				throw _iteratorError;

			case 26:
				return context$1$0.finish(23);

			case 27:
				return context$1$0.finish(20);

			case 28:
				context$1$0.next = 33;
				break;

			case 30:
				context$1$0.next = 32;
				return context.create(context.node.left).execute();

			case 32:
				left = context$1$0.sent.result;

			case 33:
				context$1$0.next = 35;
				return context.create(context.node.right).execute();

			case 35:
				obj = context$1$0.sent.result.getValue();
				visited = _Object$create(null);

			case 37:
				if (!obj) {
					context$1$0.next = 55;
					break;
				}

				context$1$0.t1 = _regeneratorRuntime.keys(obj.properties);

			case 39:
				if ((context$1$0.t2 = context$1$0.t1()).done) {
					context$1$0.next = 51;
					break;
				}

				prop = context$1$0.t2.value;

				if (!(obj.properties[prop].enumerable && !visited[prop])) {
					context$1$0.next = 48;
					break;
				}

				left.putValue(context.env.objectFactory.createPrimitive(prop));

				context$1$0.next = 45;
				return context.create(context.node.body).execute();

			case 45:
				result = context$1$0.sent;

				if (!(result && result.shouldBreak(context, true, priorResult))) {
					context$1$0.next = 48;
					break;
				}

				return context$1$0.abrupt("return", result);

			case 48:

				visited[prop] = true;
				context$1$0.next = 39;
				break;

			case 51:

				priorResult = result;
				obj = obj.getPrototype();
				context$1$0.next = 37;
				break;

			case 55:
				return context$1$0.abrupt("return", result);

			case 56:
			case "end":
				return context$1$0.stop();
		}
	}, ForInStatement, this, [[4, 16, 20, 28], [21,, 23, 27]]);
}));
module.exports = exports["default"];

// should only be one, but
// need to unwrap the declaration to get it
// todo: this is sloppy - need to revisit

// track visited properties to prevent iterating over shadowed properties, regardless of enumerable flag
// 12.6.4 NOTE: a property of a prototype is not enumerated if it is “shadowed” because some previous
// object in the prototype chain has a property with the same name. The values of [[Enumerable]] attributes
// are not considered when determining if a property of a prototype object is shadowed by a previous object
// on the prototype chain.
},{"../utils/async":189,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/create":5,"babel-runtime/regenerator":20}],205:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

var shouldContinue = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function shouldContinue(context) {
	return _regeneratorRuntime.wrap(function shouldContinue$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				if (context.node.test) {
					context$1$0.next = 2;
					break;
				}

				return context$1$0.abrupt("return", true);

			case 2:
				context$1$0.t0 = convert;
				context$1$0.next = 5;
				return context.create(context.node.test).execute();

			case 5:
				context$1$0.t1 = context$1$0.sent.result.getValue();
				return context$1$0.abrupt("return", context$1$0.t0.toBoolean.call(context$1$0.t0, context$1$0.t1));

			case 7:
			case "end":
				return context$1$0.stop();
		}
	}, shouldContinue, this);
}));

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ForStatement(context) {
	var result, priorResult;
	return _regeneratorRuntime.wrap(function ForStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				if (!context.node.init) {
					context$1$0.next = 3;
					break;
				}

				context$1$0.next = 3;
				return context.create(context.node.init).execute();

			case 3:
				context$1$0.next = 5;
				return shouldContinue(context);

			case 5:
				if (!context$1$0.sent) {
					context$1$0.next = 17;
					break;
				}

				context$1$0.next = 8;
				return context.create(context.node.body).execute();

			case 8:
				result = context$1$0.sent;

				if (!(result && result.shouldBreak(context, true, priorResult))) {
					context$1$0.next = 11;
					break;
				}

				return context$1$0.abrupt("return", result);

			case 11:
				if (!context.node.update) {
					context$1$0.next = 14;
					break;
				}

				context$1$0.next = 14;
				return context.create(context.node.update).execute();

			case 14:

				priorResult = result;
				context$1$0.next = 3;
				break;

			case 17:
				return context$1$0.abrupt("return", result);

			case 18:
			case "end":
				return context$1$0.stop();
		}
	}, ForStatement, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],206:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = FunctionDeclaration;

function FunctionDeclaration(context) {
	return context.result(context.env.getValue(context.node.id.name));
}

module.exports = exports["default"];
},{}],207:[function(require,module,exports){
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
},{}],208:[function(require,module,exports){
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
},{}],209:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function IfStatement(context) {
	var testValue;
	return _regeneratorRuntime.wrap(function IfStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.test).execute();

			case 2:
				testValue = context$1$0.sent.result.getValue();

				if (!convert.toBoolean(testValue)) {
					context$1$0.next = 7;
					break;
				}

				context$1$0.next = 6;
				return context.create(context.node.consequent).execute();

			case 6:
				return context$1$0.abrupt("return", context$1$0.sent);

			case 7:
				if (!context.node.alternate) {
					context$1$0.next = 11;
					break;
				}

				context$1$0.next = 10;
				return context.create(context.node.alternate).execute();

			case 10:
				return context$1$0.abrupt("return", context$1$0.sent);

			case 11:
			case "end":
				return context$1$0.stop();
		}
	}, IfStatement, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],210:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _utilsAsync = require("../utils/async");

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
	visit: (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function callee$0$0(context) {
		return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					if (context.node.type in visitors) {
						context$1$0.next = 2;
						break;
					}

					throw new TypeError("No handler defined for: " + context.node.type);

				case 2:
					context$1$0.next = 4;
					return visitors[context.node.type](context);

				case 4:
					return context$1$0.abrupt("return", context$1$0.sent);

				case 5:
				case "end":
					return context$1$0.stop();
			}
		}, callee$0$0, this);
	}))
};
module.exports = exports["default"];
},{"../utils/async":189,"./array-expression":195,"./assignment-expression":196,"./binary-expression":197,"./block-statement":198,"./call-expression":199,"./debugger-statement":200,"./do-while-statement.js":201,"./empty-statement":202,"./expression-statement":203,"./for-in-statement":204,"./for-statement":205,"./function-declaration":206,"./function-expression":207,"./identifier":208,"./if-statement":209,"./interrupt-statement":211,"./labeled-statement":212,"./literal":213,"./logical-expression":214,"./member-expression":215,"./object-expression":216,"./return-statement":217,"./sequence-expression":218,"./switch-statement":219,"./this-expression":220,"./throw-statement":221,"./try-statement":222,"./unary-expression":223,"./update-expression":224,"./variable-declaration":225,"./variable-declarator":226,"./with-statement":227,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/regenerator":20}],211:[function(require,module,exports){
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
},{}],212:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function LabeledStatement(context) {
	return _regeneratorRuntime.wrap(function LabeledStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.createLabel(context.node.body, context.node.label.name).execute();

			case 2:
				return context$1$0.abrupt("return", context$1$0.sent);

			case 3:
			case "end":
				return context$1$0.stop();
		}
	}, LabeledStatement, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/regenerator":20}],213:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = Literal;

function Literal(context) {
	return context.result(context.env.objectFactory.createPrimitive(context.node.value));
}

module.exports = exports["default"];
},{}],214:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function LogicalExpression(context) {
	var left, passed;
	return _regeneratorRuntime.wrap(function LogicalExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.left).execute();

			case 2:
				left = context$1$0.sent;
				passed = convert.toBoolean(left.result.getValue());

				if (!(passed && context.node.operator === "||")) {
					context$1$0.next = 6;
					break;
				}

				return context$1$0.abrupt("return", left);

			case 6:
				if (!(!passed && context.node.operator === "&&")) {
					context$1$0.next = 8;
					break;
				}

				return context$1$0.abrupt("return", left);

			case 8:
				context$1$0.next = 10;
				return context.create(context.node.right).execute();

			case 10:
				return context$1$0.abrupt("return", context$1$0.sent);

			case 11:
			case "end":
				return context$1$0.stop();
		}
	}, LogicalExpression, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],215:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _envPropertyReference = require("../env/property-reference");

var _envPropertyReference2 = _interopRequireDefault(_envPropertyReference);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function MemberExpression(context) {
	var obj, name, value;
	return _regeneratorRuntime.wrap(function MemberExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.object).execute();

			case 2:
				obj = context$1$0.sent.result.getValue();

				if (!context.node.computed) {
					context$1$0.next = 12;
					break;
				}

				context$1$0.t0 = convert;
				context$1$0.t1 = context.env;
				context$1$0.next = 8;
				return context.create(context.node.property).execute();

			case 8:
				context$1$0.t2 = context$1$0.sent.result.getValue();
				name = context$1$0.t0.toString.call(context$1$0.t0, context$1$0.t1, context$1$0.t2);
				context$1$0.next = 13;
				break;

			case 12:
				name = context.node.property.name;

			case 13:

				value = new _envPropertyReference2["default"](name, obj, false, context.env);
				return context$1$0.abrupt("return", context.result(value));

			case 15:
			case "end":
				return context$1$0.stop();
		}
	}, MemberExpression, this);
}));
module.exports = exports["default"];
},{"../env/property-reference":171,"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],216:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsFunc = require("../utils/func");

var func = _interopRequireWildcard(_utilsFunc);

var _utilsAsync = require("../utils/async");

function setDescriptor(env, obj, name, descriptor) {
	if (descriptor.get) {
		descriptor.getter = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function callee$1$0() {
			return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.next = 2;
						return func.executeFunction(env, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);

					case 2:
						return context$2$0.abrupt("return", context$2$0.sent);

					case 3:
					case "end":
						return context$2$0.stop();
				}
			}, callee$1$0, this);
		}));
	}

	if (descriptor.set) {
		descriptor.setter = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function callee$1$0() {
			var args$2$0 = arguments;
			return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.next = 2;
						return func.executeFunction(env, descriptor.set, descriptor.set.node.params, args$2$0, this, descriptor.set.node);

					case 2:
					case "end":
						return context$2$0.stop();
				}
			}, callee$1$0, this);
		}));
	}

	obj.defineOwnProperty(name, descriptor);
}

function createDescriptor(value) {
	return { value: value, configurable: true, enumerable: true, writable: true };
}

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ObjectExpression(context) {
	var obj, descriptors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, property, value, name, prop;

	return _regeneratorRuntime.wrap(function ObjectExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				obj = context.env.objectFactory.createObject();
				descriptors = _Object$create(null);
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 5;
				_iterator = _getIterator(context.node.properties);

			case 7:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 24;
					break;
				}

				property = _step.value;
				context$1$0.next = 11;
				return context.create(property.value).execute();

			case 11:
				value = context$1$0.sent.result.getValue();
				name = property.key.name || property.key.value;
				context$1$0.t0 = property.kind;
				context$1$0.next = context$1$0.t0 === "get" ? 16 : context$1$0.t0 === "set" ? 16 : 19;
				break;

			case 16:
				descriptors[name] = descriptors[name] || createDescriptor();
				descriptors[name][property.kind] = value;
				return context$1$0.abrupt("break", 21);

			case 19:
				obj.defineOwnProperty(name, createDescriptor(value));
				return context$1$0.abrupt("break", 21);

			case 21:
				_iteratorNormalCompletion = true;
				context$1$0.next = 7;
				break;

			case 24:
				context$1$0.next = 30;
				break;

			case 26:
				context$1$0.prev = 26;
				context$1$0.t1 = context$1$0["catch"](5);
				_didIteratorError = true;
				_iteratorError = context$1$0.t1;

			case 30:
				context$1$0.prev = 30;
				context$1$0.prev = 31;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 33:
				context$1$0.prev = 33;

				if (!_didIteratorError) {
					context$1$0.next = 36;
					break;
				}

				throw _iteratorError;

			case 36:
				return context$1$0.finish(33);

			case 37:
				return context$1$0.finish(30);

			case 38:

				for (prop in descriptors) {
					setDescriptor(context.env, obj, prop, descriptors[prop]);
				}

				return context$1$0.abrupt("return", context.result(obj));

			case 40:
			case "end":
				return context$1$0.stop();
		}
	}, ObjectExpression, this, [[5, 26, 30, 38], [31,, 33, 37]]);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/func":193,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/create":5,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],217:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ReturnStatement(context) {
	return _regeneratorRuntime.wrap(function ReturnStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				if (!context.node.argument) {
					context$1$0.next = 6;
					break;
				}

				context$1$0.t0 = context;
				context$1$0.next = 4;
				return context.create(context.node.argument).execute();

			case 4:
				context$1$0.t1 = context$1$0.sent.result.getValue();
				return context$1$0.abrupt("return", context$1$0.t0.exit.call(context$1$0.t0, context$1$0.t1));

			case 6:
				return context$1$0.abrupt("return", context.exit(context.env.global.getProperty("undefined").getValue()));

			case 7:
			case "end":
				return context$1$0.stop();
		}
	}, ReturnStatement, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/regenerator":20}],218:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function SequenceExpression(context) {
	var value, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, expr;

	return _regeneratorRuntime.wrap(function SequenceExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 3;
				_iterator = _getIterator(context.node.expressions);

			case 5:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 13;
					break;
				}

				expr = _step.value;
				context$1$0.next = 9;
				return context.create(expr).execute();

			case 9:
				value = context$1$0.sent.result.getValue();

			case 10:
				_iteratorNormalCompletion = true;
				context$1$0.next = 5;
				break;

			case 13:
				context$1$0.next = 19;
				break;

			case 15:
				context$1$0.prev = 15;
				context$1$0.t0 = context$1$0["catch"](3);
				_didIteratorError = true;
				_iteratorError = context$1$0.t0;

			case 19:
				context$1$0.prev = 19;
				context$1$0.prev = 20;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 22:
				context$1$0.prev = 22;

				if (!_didIteratorError) {
					context$1$0.next = 25;
					break;
				}

				throw _iteratorError;

			case 25:
				return context$1$0.finish(22);

			case 26:
				return context$1$0.finish(19);

			case 27:
				return context$1$0.abrupt("return", context.result(value));

			case 28:
			case "end":
				return context$1$0.stop();
		}
	}, SequenceExpression, this, [[3, 15, 19, 27], [20,, 22, 26]]);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":20}],219:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

var executeStatements = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function executeStatements(context, statements) {
	var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, statement;

	return _regeneratorRuntime.wrap(function executeStatements$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 3;
				_iterator = _getIterator(statements);

			case 5:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 15;
					break;
				}

				statement = _step.value;
				context$1$0.next = 9;
				return context.create(statement).execute();

			case 9:
				result = context$1$0.sent;

				if (!(result && result.isCancelled())) {
					context$1$0.next = 12;
					break;
				}

				return context$1$0.abrupt("return", result);

			case 12:
				_iteratorNormalCompletion = true;
				context$1$0.next = 5;
				break;

			case 15:
				context$1$0.next = 21;
				break;

			case 17:
				context$1$0.prev = 17;
				context$1$0.t0 = context$1$0["catch"](3);
				_didIteratorError = true;
				_iteratorError = context$1$0.t0;

			case 21:
				context$1$0.prev = 21;
				context$1$0.prev = 22;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 24:
				context$1$0.prev = 24;

				if (!_didIteratorError) {
					context$1$0.next = 27;
					break;
				}

				throw _iteratorError;

			case 27:
				return context$1$0.finish(24);

			case 28:
				return context$1$0.finish(21);

			case 29:
				return context$1$0.abrupt("return", result);

			case 30:
			case "end":
				return context$1$0.stop();
		}
	}, executeStatements, this, [[3, 17, 21, 29], [22,, 24, 28]]);
}));

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function SwitchStatement(context) {
	var testValue, passed, value, defaultCase, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, current, caseValue;

	return _regeneratorRuntime.wrap(function SwitchStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.discriminant).execute();

			case 2:
				testValue = context$1$0.sent.result.getValue();
				passed = false;
				_iteratorNormalCompletion2 = true;
				_didIteratorError2 = false;
				_iteratorError2 = undefined;
				context$1$0.prev = 7;
				_iterator2 = _getIterator(context.node.cases);

			case 9:
				if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
					context$1$0.next = 32;
					break;
				}

				current = _step2.value;

				if (passed) {
					context$1$0.next = 22;
					break;
				}

				if (!current.test) {
					context$1$0.next = 20;
					break;
				}

				context$1$0.next = 15;
				return context.create(current.test).execute();

			case 15:
				caseValue = context$1$0.sent.result.getValue();

				if (caseValue.equals(testValue)) {
					context$1$0.next = 18;
					break;
				}

				return context$1$0.abrupt("continue", 29);

			case 18:
				context$1$0.next = 22;
				break;

			case 20:
				// default might not be the last case
				defaultCase = current;
				return context$1$0.abrupt("continue", 29);

			case 22:

				passed = true;
				context$1$0.next = 25;
				return executeStatements(context, current.consequent);

			case 25:
				value = context$1$0.sent;

				if (!(value && value.isCancelled())) {
					context$1$0.next = 29;
					break;
				}

				value.cancel = false;
				return context$1$0.abrupt("return", value);

			case 29:
				_iteratorNormalCompletion2 = true;
				context$1$0.next = 9;
				break;

			case 32:
				context$1$0.next = 38;
				break;

			case 34:
				context$1$0.prev = 34;
				context$1$0.t0 = context$1$0["catch"](7);
				_didIteratorError2 = true;
				_iteratorError2 = context$1$0.t0;

			case 38:
				context$1$0.prev = 38;
				context$1$0.prev = 39;

				if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
					_iterator2["return"]();
				}

			case 41:
				context$1$0.prev = 41;

				if (!_didIteratorError2) {
					context$1$0.next = 44;
					break;
				}

				throw _iteratorError2;

			case 44:
				return context$1$0.finish(41);

			case 45:
				return context$1$0.finish(38);

			case 46:
				if (!(!passed && defaultCase && defaultCase.consequent)) {
					context$1$0.next = 52;
					break;
				}

				context$1$0.next = 49;
				return executeStatements(context, defaultCase.consequent);

			case 49:
				value = context$1$0.sent;

				value.cancel = false;
				return context$1$0.abrupt("return", value);

			case 52:
				return context$1$0.abrupt("return", value);

			case 53:
			case "end":
				return context$1$0.stop();
		}
	}, SwitchStatement, this, [[7, 34, 38, 46], [39,, 41, 45]]);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":20}],220:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = ThisExpression;

function ThisExpression(context) {
	return context.result(context.env.getThisBinding());
}

module.exports = exports["default"];
},{}],221:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function ThrowStatement(context) {
	var arg, err;
	return _regeneratorRuntime.wrap(function ThrowStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.argument).execute();

			case 2:
				arg = context$1$0.sent.result.getValue();

				if (!arg.isPrimitive) {
					context$1$0.next = 5;
					break;
				}

				throw arg.value;

			case 5:
				err = new Error();

				err.wrappedError = arg;
				throw err;

			case 8:
			case "end":
				return context$1$0.stop();
		}
	}, ThrowStatement, this);
}));
module.exports = exports["default"];

// todo: handle more specific errors
},{"../utils/async":189,"babel-runtime/regenerator":20}],222:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function TryStatement(context) {
	var result, uncaughtError, caughtError, scope, errVar, finalResult;
	return _regeneratorRuntime.wrap(function TryStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.prev = 0;
				context$1$0.next = 3;
				return context.create(context.node.block).execute();

			case 3:
				result = context$1$0.sent;
				context$1$0.next = 29;
				break;

			case 6:
				context$1$0.prev = 6;
				context$1$0.t0 = context$1$0["catch"](0);

				if (!context.node.handler) {
					context$1$0.next = 28;
					break;
				}

				caughtError = context$1$0.t0 && context$1$0.t0.wrappedError || context.env.objectFactory.createPrimitive(context$1$0.t0);
				scope = context.env.createScope();
				errVar = context.node.handler.param.name;

				// let hasVariable = context.env.hasVariable(errVar);

				// if (!hasVariable) {
				context.env.createVariable(errVar);
				// }

				context.env.putValue(errVar, caughtError);

				context$1$0.prev = 14;
				context$1$0.next = 17;
				return context.create(context.node.handler.body, context.node.handler).execute();

			case 17:
				result = context$1$0.sent;
				context$1$0.next = 23;
				break;

			case 20:
				context$1$0.prev = 20;
				context$1$0.t1 = context$1$0["catch"](14);

				// scope.exitScope();
				uncaughtError = context$1$0.t1;

			case 23:
				context$1$0.prev = 23;
				return context$1$0.finish(23);

			case 25:
				// if (!hasVariable) {
				// 	context.env.deleteVariable(errVar);
				// }

				scope.exitScope();
				context$1$0.next = 29;
				break;

			case 28:
				uncaughtError = context$1$0.t0;

			case 29:
				context$1$0.prev = 29;

				if (!context.node.finalizer) {
					context$1$0.next = 36;
					break;
				}

				context$1$0.next = 33;
				return context.create(context.node.finalizer).execute();

			case 33:
				finalResult = context$1$0.sent;

				if (!(finalResult && finalResult.shouldBreak(context))) {
					context$1$0.next = 36;
					break;
				}

				return context$1$0.abrupt("return", finalResult);

			case 36:
				return context$1$0.finish(29);

			case 37:
				if (!uncaughtError) {
					context$1$0.next = 39;
					break;
				}

				throw uncaughtError;

			case 39:
				return context$1$0.abrupt("return", result);

			case 40:
			case "end":
				return context$1$0.stop();
		}
	}, TryStatement, this, [[0, 6, 29, 37], [14, 20, 23, 25]]);
}));
module.exports = exports["default"];

// context.env.initScope(context.node.handler);
// scope.init(context.node.handler.body);
},{"../utils/async":189,"babel-runtime/regenerator":20}],223:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _envReference = require("../env/reference");

var _envReference2 = _interopRequireDefault(_envReference);

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function UnaryExpression(context) {
	var result, objectFactory, value, newValue, type, deleted;
	return _regeneratorRuntime.wrap(function UnaryExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.argument).execute();

			case 2:
				result = context$1$0.sent.result;
				objectFactory = context.env.objectFactory;
				context$1$0.t0 = context.node.operator;
				context$1$0.next = context$1$0.t0 === "typeof" ? 7 : context$1$0.t0 === "-" ? 11 : context$1$0.t0 === "+" ? 14 : context$1$0.t0 === "!" ? 17 : context$1$0.t0 === "~" ? 20 : context$1$0.t0 === "delete" ? 23 : context$1$0.t0 === "void" ? 32 : 34;
				break;

			case 7:
				type = undefined;

				if (result instanceof _envReference2["default"] && result.isUnresolved()) {
					type = "undefined";
				} else {
					value = result.getValue();
					type = value ? value.type : "undefined";
				}

				newValue = objectFactory.createPrimitive(type);
				return context$1$0.abrupt("break", 35);

			case 11:
				value = result.getValue();
				newValue = objectFactory.createPrimitive(-convert.toNumber(context.env, value));
				return context$1$0.abrupt("break", 35);

			case 14:
				value = result.getValue();
				newValue = objectFactory.createPrimitive(+convert.toNumber(context.env, value));
				return context$1$0.abrupt("break", 35);

			case 17:
				value = result.getValue();
				newValue = objectFactory.createPrimitive(!convert.toBoolean(value));
				return context$1$0.abrupt("break", 35);

			case 20:
				value = result.getValue();
				newValue = objectFactory.createPrimitive(~convert.toInt32(context.env, value));
				return context$1$0.abrupt("break", 35);

			case 23:
				deleted = true;

				if (!(result && result instanceof _envReference2["default"])) {
					context$1$0.next = 28;
					break;
				}

				if (!result.isUnresolved()) {
					deleted = result.deleteBinding(result.name);
				}
				context$1$0.next = 30;
				break;

			case 28:
				if (!context.node.argument.object) {
					context$1$0.next = 30;
					break;
				}

				throw new ReferenceError(context.node.argument.object.name + " is not defined");

			case 30:

				newValue = objectFactory.createPrimitive(deleted);
				return context$1$0.abrupt("break", 35);

			case 32:
				newValue = objectFactory.createPrimitive(undefined);
				return context$1$0.abrupt("break", 35);

			case 34:
				throw new SyntaxError("Unknown unary operator: " + context.node.operator);

			case 35:
				return context$1$0.abrupt("return", context.result(newValue));

			case 36:
			case "end":
				return context$1$0.stop();
		}
	}, UnaryExpression, this);
}));
module.exports = exports["default"];
},{"../env/reference":172,"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-default":18,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],224:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsConvert = require("../utils/convert");

var convert = _interopRequireWildcard(_utilsConvert);

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function UpdateExpression(context) {
	var objectFactory, ref, originalValue, newValue, returnValue;
	return _regeneratorRuntime.wrap(function UpdateExpression$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				objectFactory = context.env.objectFactory;
				context$1$0.next = 3;
				return context.create(context.node.argument).execute();

			case 3:
				ref = context$1$0.sent.result;
				originalValue = convert.toNumber(context.env, ref.getValue());
				newValue = originalValue;

				if (context.node.operator === "++") {
					newValue++;
				} else {
					newValue--;
				}

				newValue = objectFactory.createPrimitive(newValue);
				originalValue = objectFactory.createPrimitive(originalValue);

				returnValue = context.node.prefix ? newValue : originalValue;

				ref.putValue(newValue);
				return context$1$0.abrupt("return", context.result(returnValue));

			case 12:
			case "end":
				return context$1$0.stop();
		}
	}, UpdateExpression, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"../utils/convert":192,"babel-runtime/helpers/interop-require-wildcard":19,"babel-runtime/regenerator":20}],225:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function VariableDeclaration(context) {
	var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, decl;

	return _regeneratorRuntime.wrap(function VariableDeclaration$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 3;
				_iterator = _getIterator(context.node.declarations);

			case 5:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 12;
					break;
				}

				decl = _step.value;
				context$1$0.next = 9;
				return context.create(decl).execute();

			case 9:
				_iteratorNormalCompletion = true;
				context$1$0.next = 5;
				break;

			case 12:
				context$1$0.next = 18;
				break;

			case 14:
				context$1$0.prev = 14;
				context$1$0.t0 = context$1$0["catch"](3);
				_didIteratorError = true;
				_iteratorError = context$1$0.t0;

			case 18:
				context$1$0.prev = 18;
				context$1$0.prev = 19;

				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}

			case 21:
				context$1$0.prev = 21;

				if (!_didIteratorError) {
					context$1$0.next = 24;
					break;
				}

				throw _iteratorError;

			case 24:
				return context$1$0.finish(21);

			case 25:
				return context$1$0.finish(18);

			case 26:
				return context$1$0.abrupt("return", context.empty());

			case 27:
			case "end":
				return context$1$0.stop();
		}
	}, VariableDeclaration, this, [[3, 14, 18, 26], [19,, 21, 25]]);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":20}],226:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function VariableDeclarator(context) {
	var name, value;
	return _regeneratorRuntime.wrap(function VariableDeclarator$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				name = context.node.id.name;

				if (!context.node.init) {
					context$1$0.next = 5;
					break;
				}

				context$1$0.next = 4;
				return context.create(context.node.init).execute();

			case 4:
				value = context$1$0.sent.result;

			case 5:

				// variables have already been hoisted so we just need to initialize them if defined
				if (value) {
					context.env.putValue(name, value.getValue(), false, context);
				}

				return context$1$0.abrupt("return", context.result(context.env.getReference(name)));

			case 7:
			case "end":
				return context$1$0.stop();
		}
	}, VariableDeclarator, this);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/regenerator":20}],227:[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utilsAsync = require("../utils/async");

exports["default"] = (0, _utilsAsync.degenerate)(_regeneratorRuntime.mark(function WithStatement(context) {
	var obj, scope, result;
	return _regeneratorRuntime.wrap(function WithStatement$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return context.create(context.node.object).execute();

			case 2:
				obj = context$1$0.sent.result.getValue();
				scope = context.env.createObjectScope(obj);

				scope.init(context.node.body);

				context$1$0.prev = 5;
				context$1$0.next = 8;
				return context.create(context.node.body).execute();

			case 8:
				result = context$1$0.sent;
				context$1$0.next = 15;
				break;

			case 11:
				context$1$0.prev = 11;
				context$1$0.t0 = context$1$0["catch"](5);

				scope.exitScope();
				throw context$1$0.t0;

			case 15:

				scope.exitScope();
				return context$1$0.abrupt("return", result);

			case 17:
			case "end":
				return context$1$0.stop();
		}
	}, WithStatement, this, [[5, 11]]);
}));
module.exports = exports["default"];
},{"../utils/async":189,"babel-runtime/regenerator":20}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9zaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9lczYvcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL21hdGgvc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3N0cmluZy9yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmEtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZXM1LW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdldC1uYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW52b2tlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLXN0ZXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmtleW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1peC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmljdC1uZXcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YXNrLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWxlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5zaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZGVmLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC51bnNjb3BlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJzcmMvZWNtYS01LjEvYXJyYXktYXBpLmpzIiwic3JjL2VjbWEtNS4xL2Jvb2xlYW4tYXBpLmpzIiwic3JjL2VjbWEtNS4xL2NvbnNvbGUtYXBpLmpzIiwic3JjL2VjbWEtNS4xL2RhdGUtYXBpLmpzIiwic3JjL2VjbWEtNS4xL2Vycm9yLWFwaS5qcyIsInNyYy9lY21hLTUuMS9mdW5jdGlvbi1hcGkuanMiLCJzcmMvZWNtYS01LjEvaW5kZXguanMiLCJzcmMvZWNtYS01LjEvanNvbi1hcGkuanMiLCJzcmMvZWNtYS01LjEvbWF0aC1hcGkuanMiLCJzcmMvZWNtYS01LjEvbnVtYmVyLWFwaS5qcyIsInNyYy9lY21hLTUuMS9vYmplY3QtYXBpLmpzIiwic3JjL2VjbWEtNS4xL3JlZ2V4LWFwaS5qcyIsInNyYy9lY21hLTUuMS9zdHJpbmctYXBpLmpzIiwic3JjL2Vudi9kZWNsYXJhdGl2ZS1lbnZpcm9ubWVudC5qcyIsInNyYy9lbnYvaG9pc3Rlci5qcyIsInNyYy9lbnYvaW5kZXguanMiLCJzcmMvZW52L29iamVjdC1lbnZpcm9ubWVudC5qcyIsInNyYy9lbnYvcHJvcGVydHktcmVmZXJlbmNlLmpzIiwic3JjL2Vudi9yZWZlcmVuY2UuanMiLCJzcmMvZXhlY3V0aW9uLWNvbnRleHQuanMiLCJzcmMvZXhlY3V0aW9uLXJlc3VsdC5qcyIsInNyYy9rZXl3b3Jkcy5qcyIsInNyYy9wb2x5ZmlsbHMuanMiLCJzcmMvdHlwZXMvYXJndW1lbnQtdHlwZS5qcyIsInNyYy90eXBlcy9hcnJheS10eXBlLmpzIiwic3JjL3R5cGVzL2RhdGUtdHlwZS5qcyIsInNyYy90eXBlcy9lcnJvci10eXBlLmpzIiwic3JjL3R5cGVzL2Z1bmN0aW9uLXR5cGUuanMiLCJzcmMvdHlwZXMvbmF0aXZlLWZ1bmN0aW9uLXR5cGUuanMiLCJzcmMvdHlwZXMvb2JqZWN0LWZhY3RvcnkuanMiLCJzcmMvdHlwZXMvb2JqZWN0LXR5cGUuanMiLCJzcmMvdHlwZXMvcHJpbWl0aXZlLXR5cGUuanMiLCJzcmMvdHlwZXMvcHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNyYy90eXBlcy9yZWdleC10eXBlLmpzIiwic3JjL3R5cGVzL3N0cmluZy10eXBlLmpzIiwic3JjL3V0aWxzL2FzeW5jLmpzIiwic3JjL3V0aWxzL2NvbXBhcmVycy5qcyIsInNyYy91dGlscy9jb250cmFjdHMuanMiLCJzcmMvdXRpbHMvY29udmVydC5qcyIsInNyYy91dGlscy9mdW5jLmpzIiwic3JjL3V0aWxzL29wZXJhdG9ycy5qcyIsInNyYy92aXNpdG9ycy9hcnJheS1leHByZXNzaW9uLmpzIiwic3JjL3Zpc2l0b3JzL2Fzc2lnbm1lbnQtZXhwcmVzc2lvbi5qcyIsInNyYy92aXNpdG9ycy9iaW5hcnktZXhwcmVzc2lvbi5qcyIsInNyYy92aXNpdG9ycy9ibG9jay1zdGF0ZW1lbnQuanMiLCJzcmMvdmlzaXRvcnMvY2FsbC1leHByZXNzaW9uLmpzIiwic3JjL3Zpc2l0b3JzL2RlYnVnZ2VyLXN0YXRlbWVudC5qcyIsInNyYy92aXNpdG9ycy9kby13aGlsZS1zdGF0ZW1lbnQuanMiLCJzcmMvdmlzaXRvcnMvZW1wdHktc3RhdGVtZW50LmpzIiwic3JjL3Zpc2l0b3JzL2V4cHJlc3Npb24tc3RhdGVtZW50LmpzIiwic3JjL3Zpc2l0b3JzL2Zvci1pbi1zdGF0ZW1lbnQuanMiLCJzcmMvdmlzaXRvcnMvZm9yLXN0YXRlbWVudC5qcyIsInNyYy92aXNpdG9ycy9mdW5jdGlvbi1kZWNsYXJhdGlvbi5qcyIsInNyYy92aXNpdG9ycy9mdW5jdGlvbi1leHByZXNzaW9uLmpzIiwic3JjL3Zpc2l0b3JzL2lkZW50aWZpZXIuanMiLCJzcmMvdmlzaXRvcnMvaWYtc3RhdGVtZW50LmpzIiwic3JjL3Zpc2l0b3JzL2luZGV4LmpzIiwic3JjL3Zpc2l0b3JzL2ludGVycnVwdC1zdGF0ZW1lbnQuanMiLCJzcmMvdmlzaXRvcnMvbGFiZWxlZC1zdGF0ZW1lbnQuanMiLCJzcmMvdmlzaXRvcnMvbGl0ZXJhbC5qcyIsInNyYy92aXNpdG9ycy9sb2dpY2FsLWV4cHJlc3Npb24uanMiLCJzcmMvdmlzaXRvcnMvbWVtYmVyLWV4cHJlc3Npb24uanMiLCJzcmMvdmlzaXRvcnMvb2JqZWN0LWV4cHJlc3Npb24uanMiLCJzcmMvdmlzaXRvcnMvcmV0dXJuLXN0YXRlbWVudC5qcyIsInNyYy92aXNpdG9ycy9zZXF1ZW5jZS1leHByZXNzaW9uLmpzIiwic3JjL3Zpc2l0b3JzL3N3aXRjaC1zdGF0ZW1lbnQuanMiLCJzcmMvdmlzaXRvcnMvdGhpcy1leHByZXNzaW9uLmpzIiwic3JjL3Zpc2l0b3JzL3Rocm93LXN0YXRlbWVudC5qcyIsInNyYy92aXNpdG9ycy90cnktc3RhdGVtZW50LmpzIiwic3JjL3Zpc2l0b3JzL3VuYXJ5LWV4cHJlc3Npb24uanMiLCJzcmMvdmlzaXRvcnMvdXBkYXRlLWV4cHJlc3Npb24uanMiLCJzcmMvdmlzaXRvcnMvdmFyaWFibGUtZGVjbGFyYXRpb24uanMiLCJzcmMvdmlzaXRvcnMvdmFyaWFibGUtZGVjbGFyYXRvci5qcyIsInNyYy92aXNpdG9ycy93aXRoLXN0YXRlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTs7OztBQ0ZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7Ozs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE1BO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ByQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzc1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2tcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX1Byb21pc2UgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG5yZXF1aXJlKFwiLi9wb2x5ZmlsbHNcIik7XG5cbnZhciBfZW52ID0gcmVxdWlyZShcIi4vZW52XCIpO1xuXG52YXIgX2VudjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lbnYpO1xuXG52YXIgX2V4ZWN1dGlvbkNvbnRleHQgPSByZXF1aXJlKFwiLi9leGVjdXRpb24tY29udGV4dFwiKTtcblxudmFyIF9leGVjdXRpb25Db250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4ZWN1dGlvbkNvbnRleHQpO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi91dGlscy9hc3luY1wiKTtcblxudmFyIFNhbmRCb3hyID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gU2FuZEJveHIoYXN0KSB7XG5cdFx0dmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNhbmRCb3hyKTtcblxuXHRcdHRoaXMuYXN0ID0gYXN0O1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKFNhbmRCb3hyLCBbe1xuXHRcdGtleTogXCJleGVjdXRlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGV4ZWN1dGUoZW52KSB7XG5cdFx0XHRpZiAoIWVudikge1xuXHRcdFx0XHRlbnYgPSBTYW5kQm94ci5jcmVhdGVFbnZpcm9ubWVudCgpO1xuXHRcdFx0XHRlbnYuaW5pdCh0aGlzLmNvbmZpZyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZW52ID0gZW52O1xuXHRcdFx0dmFyIHJlc3BvbnNlO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBfZXhlY3V0aW9uQ29udGV4dDJbXCJkZWZhdWx0XCJdKGVudiwgdGhpcy5hc3QpLmV4ZWN1dGUoKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXR1cm4gX1Byb21pc2UucmVqZWN0KGVycik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNvbnZlcnQgdG8gcHJvbWlzZVxuXHRcdFx0cmV0dXJuICgwLCBfdXRpbHNBc3luYy5wcm9taXNpZnkpKHJlc3BvbnNlKS50aGVuKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRcdHJldHVybiByICYmIHIucmVzdWx0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XSwgW3tcblx0XHRrZXk6IFwiY3JlYXRlRW52aXJvbm1lbnRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlRW52aXJvbm1lbnQoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IF9lbnYyW1wiZGVmYXVsdFwiXSgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJjcmVhdGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlKGFzdCwgY29uZmlnKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFNhbmRCb3hyKGFzdCwgY29uZmlnKTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gU2FuZEJveHI7XG59KSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNhbmRCb3hyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfT2JqZWN0JGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpW1wiZGVmYXVsdFwiXTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgX09iamVjdCRkZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHtcbiAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgdmFyIG9iamVjdCA9IF94LFxuICAgICAgICBwcm9wZXJ0eSA9IF94MixcbiAgICAgICAgcmVjZWl2ZXIgPSBfeDM7XG4gICAgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDtcbiAgICBfYWdhaW4gPSBmYWxzZTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgICB2YXIgZGVzYyA9IF9PYmplY3QkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfeCA9IHBhcmVudDtcbiAgICAgICAgX3gyID0gcHJvcGVydHk7XG4gICAgICAgIF94MyA9IHJlY2VpdmVyO1xuICAgICAgICBfYWdhaW4gPSB0cnVlO1xuICAgICAgICBjb250aW51ZSBfZnVuY3Rpb247XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBfT2JqZWN0JGNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX09iamVjdCRzZXRQcm90b3R5cGVPZiA/IF9PYmplY3Qkc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbmV3T2JqID0ge307XG5cbiAgICBpZiAob2JqICE9IG51bGwpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajtcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9XG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpcztcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogbW9kdWxlLmV4cG9ydHMsIF9fZXNNb2R1bGU6IHRydWUgfTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aVlXSmxiQzF5ZFc1MGFXMWxMM0psWjJWdVpYSmhkRzl5TDJsdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4dklGUm9hWE1nYldWMGFHOWtJRzltSUc5aWRHRnBibWx1WnlCaElISmxabVZ5Wlc1alpTQjBieUIwYUdVZ1oyeHZZbUZzSUc5aWFtVmpkQ0J1WldWa2N5QjBieUJpWlZ4dUx5OGdhMlZ3ZENCcFpHVnVkR2xqWVd3Z2RHOGdkR2hsSUhkaGVTQnBkQ0JwY3lCdlluUmhhVzVsWkNCcGJpQnlkVzUwYVcxbExtcHpYRzUyWVhJZ1p5QTlYRzRnSUhSNWNHVnZaaUJuYkc5aVlXd2dQVDA5SUZ3aWIySnFaV04wWENJZ1B5Qm5iRzlpWVd3Z09seHVJQ0IwZVhCbGIyWWdkMmx1Wkc5M0lEMDlQU0JjSW05aWFtVmpkRndpSUQ4Z2QybHVaRzkzSURwY2JpQWdkSGx3Wlc5bUlITmxiR1lnUFQwOUlGd2liMkpxWldOMFhDSWdQeUJ6Wld4bUlEb2dkR2hwY3p0Y2JseHVMeThnVlhObElHQm5aWFJQZDI1UWNtOXdaWEowZVU1aGJXVnpZQ0JpWldOaGRYTmxJRzV2ZENCaGJHd2dZbkp2ZDNObGNuTWdjM1Z3Y0c5eWRDQmpZV3hzYVc1blhHNHZMeUJnYUdGelQzZHVVSEp2Y0dWeWRIbGdJRzl1SUhSb1pTQm5iRzlpWVd3Z1lITmxiR1pnSUc5aWFtVmpkQ0JwYmlCaElIZHZjbXRsY2k0Z1UyVmxJQ014T0RNdVhHNTJZWElnYUdGa1VuVnVkR2x0WlNBOUlHY3VjbVZuWlc1bGNtRjBiM0pTZFc1MGFXMWxJQ1ltWEc0Z0lFOWlhbVZqZEM1blpYUlBkMjVRY205d1pYSjBlVTVoYldWektHY3BMbWx1WkdWNFQyWW9YQ0p5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1ZjSWlrZ1BqMGdNRHRjYmx4dUx5OGdVMkYyWlNCMGFHVWdiMnhrSUhKbFoyVnVaWEpoZEc5eVVuVnVkR2x0WlNCcGJpQmpZWE5sSUdsMElHNWxaV1J6SUhSdklHSmxJSEpsYzNSdmNtVmtJR3hoZEdWeUxseHVkbUZ5SUc5c1pGSjFiblJwYldVZ1BTQm9ZV1JTZFc1MGFXMWxJQ1ltSUdjdWNtVm5aVzVsY21GMGIzSlNkVzUwYVcxbE8xeHVYRzR2THlCR2IzSmpaU0J5WldWMllXeDFkR0YwYVc5dUlHOW1JSEoxYm5ScGJXVXVhbk11WEc1bkxuSmxaMlZ1WlhKaGRHOXlVblZ1ZEdsdFpTQTlJSFZ1WkdWbWFXNWxaRHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCeVpYRjFhWEpsS0Z3aUxpOXlkVzUwYVcxbFhDSXBPMXh1WEc1cFppQW9hR0ZrVW5WdWRHbHRaU2tnZTF4dUlDQXZMeUJTWlhOMGIzSmxJSFJvWlNCdmNtbG5hVzVoYkNCeWRXNTBhVzFsTGx4dUlDQm5MbkpsWjJWdVpYSmhkRzl5VW5WdWRHbHRaU0E5SUc5c1pGSjFiblJwYldVN1hHNTlJR1ZzYzJVZ2UxeHVJQ0F2THlCU1pXMXZkbVVnZEdobElHZHNiMkpoYkNCd2NtOXdaWEowZVNCaFpHUmxaQ0JpZVNCeWRXNTBhVzFsTG1wekxseHVJQ0JrWld4bGRHVWdaeTV5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1U3WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdleUJjSW1SbFptRjFiSFJjSWpvZ2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZlpYTk5iMlIxYkdVNklIUnlkV1VnZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9TeW1ib2wgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfU3ltYm9sJGl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX1Byb21pc2UgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIilbXCJkZWZhdWx0XCJdO1xuXG4hKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSB0eXBlb2YgX1N5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF9TeW1ib2wkaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gX09iamVjdCRjcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYgfHwgbnVsbCwgbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pKTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IF9PYmplY3QkY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIC8vIFRoaXMgaW52b2tlIGZ1bmN0aW9uIGlzIHdyaXR0ZW4gaW4gYSBzdHlsZSB0aGF0IGFzc3VtZXMgc29tZVxuICAgIC8vIGNhbGxpbmcgZnVuY3Rpb24gKG9yIFByb21pc2UpIHdpbGwgaGFuZGxlIGV4Y2VwdGlvbnMuXG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW21ldGhvZF0oYXJnKTtcbiAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnQgPyBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihpbnZva2VOZXh0LCBpbnZva2VUaHJvdykgOiBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIGVucXVldWVSZXN1bHQgPVxuICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KSA6IG5ldyBfUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKGludm9rZShtZXRob2QsIGFyZykpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGVucXVldWVSZXN1bHQgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnlcbiAgICAgIC8vIGxhdGVyIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA9IGVucXVldWVSZXN1bHRbXCJjYXRjaFwiXShmdW5jdGlvbiAoaWdub3JlZCkge30pO1xuXG4gICAgICByZXR1cm4gZW5xdWV1ZVJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8IG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gZGlzcGF0Y2hFeGNlcHRpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4vLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4vLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3Rcbi8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG50eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHVuZGVmaW5lZCk7XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlZV0psYkMxeWRXNTBhVzFsTDNKbFoyVnVaWEpoZEc5eUwzSjFiblJwYldVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxS2x4dUlDb2dRMjl3ZVhKcFoyaDBJQ2hqS1NBeU1ERTBMQ0JHWVdObFltOXZheXdnU1c1akxseHVJQ29nUVd4c0lISnBaMmgwY3lCeVpYTmxjblpsWkM1Y2JpQXFYRzRnS2lCVWFHbHpJSE52ZFhKalpTQmpiMlJsSUdseklHeHBZMlZ1YzJWa0lIVnVaR1Z5SUhSb1pTQkNVMFF0YzNSNWJHVWdiR2xqWlc1elpTQm1iM1Z1WkNCcGJpQjBhR1ZjYmlBcUlHaDBkSEJ6T2k4dmNtRjNMbWRwZEdoMVlpNWpiMjB2Wm1GalpXSnZiMnN2Y21WblpXNWxjbUYwYjNJdmJXRnpkR1Z5TDB4SlEwVk9VMFVnWm1sc1pTNGdRVzVjYmlBcUlHRmtaR2wwYVc5dVlXd2daM0poYm5RZ2IyWWdjR0YwWlc1MElISnBaMmgwY3lCallXNGdZbVVnWm05MWJtUWdhVzRnZEdobElGQkJWRVZPVkZNZ1ptbHNaU0JwYmx4dUlDb2dkR2hsSUhOaGJXVWdaR2x5WldOMGIzSjVMbHh1SUNvdlhHNWNibHdpZFhObElITjBjbWxqZEZ3aU8xeHVYRzUyWVhJZ1gxTjViV0p2YkNBOUlISmxjWFZwY21Vb1hDSmlZV0psYkMxeWRXNTBhVzFsTDJOdmNtVXRhbk12YzNsdFltOXNYQ0lwVzF3aVpHVm1ZWFZzZEZ3aVhUdGNibHh1ZG1GeUlGOVRlVzFpYjJ3a2FYUmxjbUYwYjNJZ1BTQnlaWEYxYVhKbEtGd2lZbUZpWld3dGNuVnVkR2x0WlM5amIzSmxMV3B6TDNONWJXSnZiQzlwZEdWeVlYUnZjbHdpS1Z0Y0ltUmxabUYxYkhSY0lsMDdYRzVjYm5aaGNpQmZUMkpxWldOMEpHTnlaV0YwWlNBOUlISmxjWFZwY21Vb1hDSmlZV0psYkMxeWRXNTBhVzFsTDJOdmNtVXRhbk12YjJKcVpXTjBMMk55WldGMFpWd2lLVnRjSW1SbFptRjFiSFJjSWwwN1hHNWNiblpoY2lCZlVISnZiV2x6WlNBOUlISmxjWFZwY21Vb1hDSmlZV0psYkMxeWRXNTBhVzFsTDJOdmNtVXRhbk12Y0hKdmJXbHpaVndpS1Z0Y0ltUmxabUYxYkhSY0lsMDdYRzVjYmlFb1puVnVZM1JwYjI0Z0tHZHNiMkpoYkNrZ2UxeHVJQ0JjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1SUNCMllYSWdhR0Z6VDNkdUlEMGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVR0Y2JpQWdkbUZ5SUhWdVpHVm1hVzVsWkRzZ0x5OGdUVzl5WlNCamIyMXdjbVZ6YzJsaWJHVWdkR2hoYmlCMmIybGtJREF1WEc0Z0lIWmhjaUJwZEdWeVlYUnZjbE41YldKdmJDQTlJSFI1Y0dWdlppQmZVM2x0WW05c0lEMDlQU0JjSW1aMWJtTjBhVzl1WENJZ0ppWWdYMU41YldKdmJDUnBkR1Z5WVhSdmNpQjhmQ0JjSWtCQWFYUmxjbUYwYjNKY0lqdGNibHh1SUNCMllYSWdhVzVOYjJSMWJHVWdQU0IwZVhCbGIyWWdiVzlrZFd4bElEMDlQU0JjSW05aWFtVmpkRndpTzF4dUlDQjJZWElnY25WdWRHbHRaU0E5SUdkc2IySmhiQzV5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1U3WEc0Z0lHbG1JQ2h5ZFc1MGFXMWxLU0I3WEc0Z0lDQWdhV1lnS0dsdVRXOWtkV3hsS1NCN1hHNGdJQ0FnSUNBdkx5QkpaaUJ5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1VnYVhNZ1pHVm1hVzVsWkNCbmJHOWlZV3hzZVNCaGJtUWdkMlVuY21VZ2FXNGdZU0J0YjJSMWJHVXNYRzRnSUNBZ0lDQXZMeUJ0WVd0bElIUm9aU0JsZUhCdmNuUnpJRzlpYW1WamRDQnBaR1Z1ZEdsallXd2dkRzhnY21WblpXNWxjbUYwYjNKU2RXNTBhVzFsTGx4dUlDQWdJQ0FnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5ZFc1MGFXMWxPMXh1SUNBZ0lIMWNiaUFnSUNBdkx5QkViMjRuZENCaWIzUm9aWElnWlhaaGJIVmhkR2x1WnlCMGFHVWdjbVZ6ZENCdlppQjBhR2x6SUdacGJHVWdhV1lnZEdobElISjFiblJwYldVZ2QyRnpYRzRnSUNBZ0x5OGdZV3h5WldGa2VTQmtaV1pwYm1Wa0lHZHNiMkpoYkd4NUxseHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVYRzRnSUM4dklFUmxabWx1WlNCMGFHVWdjblZ1ZEdsdFpTQm5iRzlpWVd4c2VTQW9ZWE1nWlhod1pXTjBaV1FnWW5rZ1oyVnVaWEpoZEdWa0lHTnZaR1VwSUdGeklHVnBkR2hsY2x4dUlDQXZMeUJ0YjJSMWJHVXVaWGh3YjNKMGN5QW9hV1lnZDJVbmNtVWdhVzRnWVNCdGIyUjFiR1VwSUc5eUlHRWdibVYzTENCbGJYQjBlU0J2WW1wbFkzUXVYRzRnSUhKMWJuUnBiV1VnUFNCbmJHOWlZV3d1Y21WblpXNWxjbUYwYjNKU2RXNTBhVzFsSUQwZ2FXNU5iMlIxYkdVZ1B5QnRiMlIxYkdVdVpYaHdiM0owY3lBNklIdDlPMXh1WEc0Z0lHWjFibU4wYVc5dUlIZHlZWEFvYVc1dVpYSkdiaXdnYjNWMFpYSkdiaXdnYzJWc1ppd2dkSEo1VEc5amMweHBjM1FwSUh0Y2JpQWdJQ0F2THlCSlppQnZkWFJsY2tadUlIQnliM1pwWkdWa0xDQjBhR1Z1SUc5MWRHVnlSbTR1Y0hKdmRHOTBlWEJsSUdsdWMzUmhibU5sYjJZZ1IyVnVaWEpoZEc5eUxseHVJQ0FnSUhaaGNpQm5aVzVsY21GMGIzSWdQU0JmVDJKcVpXTjBKR055WldGMFpTZ29iM1YwWlhKR2JpQjhmQ0JIWlc1bGNtRjBiM0lwTG5CeWIzUnZkSGx3WlNrN1hHNWNiaUFnSUNCblpXNWxjbUYwYjNJdVgybHVkbTlyWlNBOUlHMWhhMlZKYm5admEyVk5aWFJvYjJRb2FXNXVaWEpHYml3Z2MyVnNaaUI4ZkNCdWRXeHNMQ0J1WlhjZ1EyOXVkR1Y0ZENoMGNubE1iMk56VEdsemRDQjhmQ0JiWFNrcE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUdkbGJtVnlZWFJ2Y2p0Y2JpQWdmVnh1SUNCeWRXNTBhVzFsTG5keVlYQWdQU0IzY21Gd08xeHVYRzRnSUM4dklGUnllUzlqWVhSamFDQm9aV3h3WlhJZ2RHOGdiV2x1YVcxcGVtVWdaR1Z2Y0hScGJXbDZZWFJwYjI1ekxpQlNaWFIxY201eklHRWdZMjl0Y0d4bGRHbHZibHh1SUNBdkx5QnlaV052Y21RZ2JHbHJaU0JqYjI1MFpYaDBMblJ5ZVVWdWRISnBaWE5iYVYwdVkyOXRjR3hsZEdsdmJpNGdWR2hwY3lCcGJuUmxjbVpoWTJVZ1kyOTFiR1JjYmlBZ0x5OGdhR0YyWlNCaVpXVnVJQ2hoYm1RZ2QyRnpJSEJ5WlhacGIzVnpiSGtwSUdSbGMybG5ibVZrSUhSdklIUmhhMlVnWVNCamJHOXpkWEpsSUhSdklHSmxYRzRnSUM4dklHbHVkbTlyWldRZ2QybDBhRzkxZENCaGNtZDFiV1Z1ZEhNc0lHSjFkQ0JwYmlCaGJHd2dkR2hsSUdOaGMyVnpJSGRsSUdOaGNtVWdZV0p2ZFhRZ2QyVmNiaUFnTHk4Z1lXeHlaV0ZrZVNCb1lYWmxJR0Z1SUdWNGFYTjBhVzVuSUcxbGRHaHZaQ0IzWlNCM1lXNTBJSFJ2SUdOaGJHd3NJSE52SUhSb1pYSmxKM01nYm04Z2JtVmxaRnh1SUNBdkx5QjBieUJqY21WaGRHVWdZU0J1WlhjZ1puVnVZM1JwYjI0Z2IySnFaV04wTGlCWFpTQmpZVzRnWlhabGJpQm5aWFFnWVhkaGVTQjNhWFJvSUdGemMzVnRhVzVuWEc0Z0lDOHZJSFJvWlNCdFpYUm9iMlFnZEdGclpYTWdaWGhoWTNSc2VTQnZibVVnWVhKbmRXMWxiblFzSUhOcGJtTmxJSFJvWVhRZ2FHRndjR1Z1Y3lCMGJ5QmlaU0IwY25WbFhHNGdJQzh2SUdsdUlHVjJaWEo1SUdOaGMyVXNJSE52SUhkbElHUnZiaWQwSUdoaGRtVWdkRzhnZEc5MVkyZ2dkR2hsSUdGeVozVnRaVzUwY3lCdlltcGxZM1F1SUZSb1pWeHVJQ0F2THlCdmJteDVJR0ZrWkdsMGFXOXVZV3dnWVd4c2IyTmhkR2x2YmlCeVpYRjFhWEpsWkNCcGN5QjBhR1VnWTI5dGNHeGxkR2x2YmlCeVpXTnZjbVFzSUhkb2FXTm9YRzRnSUM4dklHaGhjeUJoSUhOMFlXSnNaU0J6YUdGd1pTQmhibVFnYzI4Z2FHOXdaV1oxYkd4NUlITm9iM1ZzWkNCaVpTQmphR1ZoY0NCMGJ5QmhiR3h2WTJGMFpTNWNiaUFnWm5WdVkzUnBiMjRnZEhKNVEyRjBZMmdvWm00c0lHOWlhaXdnWVhKbktTQjdYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjdJSFI1Y0dVNklGd2libTl5YldGc1hDSXNJR0Z5WnpvZ1ptNHVZMkZzYkNodlltb3NJR0Z5WnlrZ2ZUdGNiaUFnSUNCOUlHTmhkR05vSUNobGNuSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjdJSFI1Y0dVNklGd2lkR2h5YjNkY0lpd2dZWEpuT2lCbGNuSWdmVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0IyWVhJZ1IyVnVVM1JoZEdWVGRYTndaVzVrWldSVGRHRnlkQ0E5SUZ3aWMzVnpjR1Z1WkdWa1UzUmhjblJjSWp0Y2JpQWdkbUZ5SUVkbGJsTjBZWFJsVTNWemNHVnVaR1ZrV1dsbGJHUWdQU0JjSW5OMWMzQmxibVJsWkZscFpXeGtYQ0k3WEc0Z0lIWmhjaUJIWlc1VGRHRjBaVVY0WldOMWRHbHVaeUE5SUZ3aVpYaGxZM1YwYVc1blhDSTdYRzRnSUhaaGNpQkhaVzVUZEdGMFpVTnZiWEJzWlhSbFpDQTlJRndpWTI5dGNHeGxkR1ZrWENJN1hHNWNiaUFnTHk4Z1VtVjBkWEp1YVc1bklIUm9hWE1nYjJKcVpXTjBJR1p5YjIwZ2RHaGxJR2x1Ym1WeVJtNGdhR0Z6SUhSb1pTQnpZVzFsSUdWbVptVmpkQ0JoYzF4dUlDQXZMeUJpY21WaGEybHVaeUJ2ZFhRZ2IyWWdkR2hsSUdScGMzQmhkR05vSUhOM2FYUmphQ0J6ZEdGMFpXMWxiblF1WEc0Z0lIWmhjaUJEYjI1MGFXNTFaVk5sYm5ScGJtVnNJRDBnZTMwN1hHNWNiaUFnTHk4Z1JIVnRiWGtnWTI5dWMzUnlkV04wYjNJZ1puVnVZM1JwYjI1eklIUm9ZWFFnZDJVZ2RYTmxJR0Z6SUhSb1pTQXVZMjl1YzNSeWRXTjBiM0lnWVc1a1hHNGdJQzh2SUM1amIyNXpkSEoxWTNSdmNpNXdjbTkwYjNSNWNHVWdjSEp2Y0dWeWRHbGxjeUJtYjNJZ1puVnVZM1JwYjI1eklIUm9ZWFFnY21WMGRYSnVJRWRsYm1WeVlYUnZjbHh1SUNBdkx5QnZZbXBsWTNSekxpQkdiM0lnWm5Wc2JDQnpjR1ZqSUdOdmJYQnNhV0Z1WTJVc0lIbHZkU0J0WVhrZ2QybHphQ0IwYnlCamIyNW1hV2QxY21VZ2VXOTFjbHh1SUNBdkx5QnRhVzVwWm1sbGNpQnViM1FnZEc4Z2JXRnVaMnhsSUhSb1pTQnVZVzFsY3lCdlppQjBhR1Z6WlNCMGQyOGdablZ1WTNScGIyNXpMbHh1SUNCbWRXNWpkR2x2YmlCSFpXNWxjbUYwYjNJb0tTQjdmVnh1SUNCbWRXNWpkR2x2YmlCSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmlncElIdDlYRzRnSUdaMWJtTjBhVzl1SUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1VUhKdmRHOTBlWEJsS0NrZ2UzMWNibHh1SUNCMllYSWdSM0FnUFNCSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmxCeWIzUnZkSGx3WlM1d2NtOTBiM1I1Y0dVZ1BTQkhaVzVsY21GMGIzSXVjSEp2ZEc5MGVYQmxPMXh1SUNCSFpXNWxjbUYwYjNKR2RXNWpkR2x2Ymk1d2NtOTBiM1I1Y0dVZ1BTQkhjQzVqYjI1emRISjFZM1J2Y2lBOUlFZGxibVZ5WVhSdmNrWjFibU4wYVc5dVVISnZkRzkwZVhCbE8xeHVJQ0JIWlc1bGNtRjBiM0pHZFc1amRHbHZibEJ5YjNSdmRIbHdaUzVqYjI1emRISjFZM1J2Y2lBOUlFZGxibVZ5WVhSdmNrWjFibU4wYVc5dU8xeHVJQ0JIWlc1bGNtRjBiM0pHZFc1amRHbHZiaTVrYVhOd2JHRjVUbUZ0WlNBOUlGd2lSMlZ1WlhKaGRHOXlSblZ1WTNScGIyNWNJanRjYmx4dUlDQXZMeUJJWld4d1pYSWdabTl5SUdSbFptbHVhVzVuSUhSb1pTQXVibVY0ZEN3Z0xuUm9jbTkzTENCaGJtUWdMbkpsZEhWeWJpQnRaWFJvYjJSeklHOW1JSFJvWlZ4dUlDQXZMeUJKZEdWeVlYUnZjaUJwYm5SbGNtWmhZMlVnYVc0Z2RHVnliWE1nYjJZZ1lTQnphVzVuYkdVZ0xsOXBiblp2YTJVZ2JXVjBhRzlrTGx4dUlDQm1kVzVqZEdsdmJpQmtaV1pwYm1WSmRHVnlZWFJ2Y2sxbGRHaHZaSE1vY0hKdmRHOTBlWEJsS1NCN1hHNGdJQ0FnVzF3aWJtVjRkRndpTENCY0luUm9jbTkzWENJc0lGd2ljbVYwZFhKdVhDSmRMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNGdLRzFsZEdodlpDa2dlMXh1SUNBZ0lDQWdjSEp2ZEc5MGVYQmxXMjFsZEdodlpGMGdQU0JtZFc1amRHbHZiaUFvWVhKbktTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TGw5cGJuWnZhMlVvYldWMGFHOWtMQ0JoY21jcE8xeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOUtUdGNiaUFnZlZ4dVhHNGdJSEoxYm5ScGJXVXVhWE5IWlc1bGNtRjBiM0pHZFc1amRHbHZiaUE5SUdaMWJtTjBhVzl1SUNoblpXNUdkVzRwSUh0Y2JpQWdJQ0IyWVhJZ1kzUnZjaUE5SUhSNWNHVnZaaUJuWlc1R2RXNGdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJuWlc1R2RXNHVZMjl1YzNSeWRXTjBiM0k3WEc0Z0lDQWdjbVYwZFhKdUlHTjBiM0lnUHlCamRHOXlJRDA5UFNCSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmlCOGZGeHVJQ0FnSUM4dklFWnZjaUIwYUdVZ2JtRjBhWFpsSUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1SUdOdmJuTjBjblZqZEc5eUxDQjBhR1VnWW1WemRDQjNaU0JqWVc1Y2JpQWdJQ0F2THlCa2J5QnBjeUIwYnlCamFHVmpheUJwZEhNZ0xtNWhiV1VnY0hKdmNHVnlkSGt1WEc0Z0lDQWdLR04wYjNJdVpHbHpjR3hoZVU1aGJXVWdmSHdnWTNSdmNpNXVZVzFsS1NBOVBUMGdYQ0pIWlc1bGNtRjBiM0pHZFc1amRHbHZibHdpSURvZ1ptRnNjMlU3WEc0Z0lIMDdYRzVjYmlBZ2NuVnVkR2x0WlM1dFlYSnJJRDBnWm5WdVkzUnBiMjRnS0dkbGJrWjFiaWtnZTF4dUlDQWdJR2RsYmtaMWJpNWZYM0J5YjNSdlgxOGdQU0JIWlc1bGNtRjBiM0pHZFc1amRHbHZibEJ5YjNSdmRIbHdaVHRjYmlBZ0lDQm5aVzVHZFc0dWNISnZkRzkwZVhCbElEMGdYMDlpYW1WamRDUmpjbVZoZEdVb1IzQXBPMXh1SUNBZ0lISmxkSFZ5YmlCblpXNUdkVzQ3WEc0Z0lIMDdYRzVjYmlBZ0x5OGdWMmwwYUdsdUlIUm9aU0JpYjJSNUlHOW1JR0Z1ZVNCaGMzbHVZeUJtZFc1amRHbHZiaXdnWUdGM1lXbDBJSGhnSUdseklIUnlZVzV6Wm05eWJXVmtJSFJ2WEc0Z0lDOHZJR0I1YVdWc1pDQnlaV2RsYm1WeVlYUnZjbEoxYm5ScGJXVXVZWGR5WVhBb2VDbGdMQ0J6YnlCMGFHRjBJSFJvWlNCeWRXNTBhVzFsSUdOaGJpQjBaWE4wWEc0Z0lDOHZJR0IyWVd4MVpTQnBibk4wWVc1alpXOW1JRUYzWVdsMFFYSm5kVzFsYm5SZ0lIUnZJR1JsZEdWeWJXbHVaU0JwWmlCMGFHVWdlV2xsYkdSbFpDQjJZV3gxWlNCcGMxeHVJQ0F2THlCdFpXRnVkQ0IwYnlCaVpTQmhkMkZwZEdWa0xpQlRiMjFsSUcxaGVTQmpiMjV6YVdSbGNpQjBhR1VnYm1GdFpTQnZaaUIwYUdseklHMWxkR2h2WkNCMGIyOWNiaUFnTHk4Z1kzVjBaWE41TENCaWRYUWdkR2hsZVNCaGNtVWdZM1Z5YlhWa1oyVnZibk11WEc0Z0lISjFiblJwYldVdVlYZHlZWEFnUFNCbWRXNWpkR2x2YmlBb1lYSm5LU0I3WEc0Z0lDQWdjbVYwZFhKdUlHNWxkeUJCZDJGcGRFRnlaM1Z0Wlc1MEtHRnlaeWs3WEc0Z0lIMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z1FYZGhhWFJCY21kMWJXVnVkQ2hoY21jcElIdGNiaUFnSUNCMGFHbHpMbUZ5WnlBOUlHRnlaenRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUVGemVXNWpTWFJsY21GMGIzSW9aMlZ1WlhKaGRHOXlLU0I3WEc0Z0lDQWdMeThnVkdocGN5QnBiblp2YTJVZ1puVnVZM1JwYjI0Z2FYTWdkM0pwZEhSbGJpQnBiaUJoSUhOMGVXeGxJSFJvWVhRZ1lYTnpkVzFsY3lCemIyMWxYRzRnSUNBZ0x5OGdZMkZzYkdsdVp5Qm1kVzVqZEdsdmJpQW9iM0lnVUhKdmJXbHpaU2tnZDJsc2JDQm9ZVzVrYkdVZ1pYaGpaWEIwYVc5dWN5NWNiaUFnSUNCbWRXNWpkR2x2YmlCcGJuWnZhMlVvYldWMGFHOWtMQ0JoY21jcElIdGNiaUFnSUNBZ0lIWmhjaUJ5WlhOMWJIUWdQU0JuWlc1bGNtRjBiM0piYldWMGFHOWtYU2hoY21jcE8xeHVJQ0FnSUNBZ2RtRnlJSFpoYkhWbElEMGdjbVZ6ZFd4MExuWmhiSFZsTzF4dUlDQWdJQ0FnY21WMGRYSnVJSFpoYkhWbElHbHVjM1JoYm1ObGIyWWdRWGRoYVhSQmNtZDFiV1Z1ZENBL0lGOVFjbTl0YVhObExuSmxjMjlzZG1Vb2RtRnNkV1V1WVhKbktTNTBhR1Z1S0dsdWRtOXJaVTVsZUhRc0lHbHVkbTlyWlZSb2NtOTNLU0E2SUY5UWNtOXRhWE5sTG5KbGMyOXNkbVVvZG1Gc2RXVXBMblJvWlc0b1puVnVZM1JwYjI0Z0tIVnVkM0poY0hCbFpDa2dlMXh1SUNBZ0lDQWdJQ0F2THlCWGFHVnVJR0VnZVdsbGJHUmxaQ0JRY205dGFYTmxJR2x6SUhKbGMyOXNkbVZrTENCcGRITWdabWx1WVd3Z2RtRnNkV1VnWW1WamIyMWxjMXh1SUNBZ0lDQWdJQ0F2THlCMGFHVWdMblpoYkhWbElHOW1JSFJvWlNCUWNtOXRhWE5sUEh0MllXeDFaU3hrYjI1bGZUNGdjbVZ6ZFd4MElHWnZjaUIwYUdWY2JpQWdJQ0FnSUNBZ0x5OGdZM1Z5Y21WdWRDQnBkR1Z5WVhScGIyNHVJRWxtSUhSb1pTQlFjbTl0YVhObElHbHpJSEpsYW1WamRHVmtMQ0JvYjNkbGRtVnlMQ0IwYUdWY2JpQWdJQ0FnSUNBZ0x5OGdjbVZ6ZFd4MElHWnZjaUIwYUdseklHbDBaWEpoZEdsdmJpQjNhV3hzSUdKbElISmxhbVZqZEdWa0lIZHBkR2dnZEdobElITmhiV1ZjYmlBZ0lDQWdJQ0FnTHk4Z2NtVmhjMjl1TGlCT2IzUmxJSFJvWVhRZ2NtVnFaV04wYVc5dWN5QnZaaUI1YVdWc1pHVmtJRkJ5YjIxcGMyVnpJR0Z5WlNCdWIzUmNiaUFnSUNBZ0lDQWdMeThnZEdoeWIzZHVJR0poWTJzZ2FXNTBieUIwYUdVZ1oyVnVaWEpoZEc5eUlHWjFibU4wYVc5dUxDQmhjeUJwY3lCMGFHVWdZMkZ6WlZ4dUlDQWdJQ0FnSUNBdkx5QjNhR1Z1SUdGdUlHRjNZV2wwWldRZ1VISnZiV2x6WlNCcGN5QnlaV3BsWTNSbFpDNGdWR2hwY3lCa2FXWm1aWEpsYm1ObElHbHVYRzRnSUNBZ0lDQWdJQzh2SUdKbGFHRjJhVzl5SUdKbGRIZGxaVzRnZVdsbGJHUWdZVzVrSUdGM1lXbDBJR2x6SUdsdGNHOXlkR0Z1ZEN3Z1ltVmpZWFZ6WlNCcGRGeHVJQ0FnSUNBZ0lDQXZMeUJoYkd4dmQzTWdkR2hsSUdOdmJuTjFiV1Z5SUhSdklHUmxZMmxrWlNCM2FHRjBJSFJ2SUdSdklIZHBkR2dnZEdobElIbHBaV3hrWldSY2JpQWdJQ0FnSUNBZ0x5OGdjbVZxWldOMGFXOXVJQ2h6ZDJGc2JHOTNJR2wwSUdGdVpDQmpiMjUwYVc1MVpTd2diV0Z1ZFdGc2JIa2dMblJvY205M0lHbDBJR0poWTJ0Y2JpQWdJQ0FnSUNBZ0x5OGdhVzUwYnlCMGFHVWdaMlZ1WlhKaGRHOXlMQ0JoWW1GdVpHOXVJR2wwWlhKaGRHbHZiaXdnZDJoaGRHVjJaWElwTGlCWGFYUm9YRzRnSUNBZ0lDQWdJQzh2SUdGM1lXbDBMQ0JpZVNCamIyNTBjbUZ6ZEN3Z2RHaGxjbVVnYVhNZ2JtOGdiM0J3YjNKMGRXNXBkSGtnZEc4Z1pYaGhiV2x1WlNCMGFHVmNiaUFnSUNBZ0lDQWdMeThnY21WcVpXTjBhVzl1SUhKbFlYTnZiaUJ2ZFhSemFXUmxJSFJvWlNCblpXNWxjbUYwYjNJZ1puVnVZM1JwYjI0c0lITnZJSFJvWlZ4dUlDQWdJQ0FnSUNBdkx5QnZibXg1SUc5d2RHbHZiaUJwY3lCMGJ5QjBhSEp2ZHlCcGRDQm1jbTl0SUhSb1pTQmhkMkZwZENCbGVIQnlaWE56YVc5dUxDQmhibVJjYmlBZ0lDQWdJQ0FnTHk4Z2JHVjBJSFJvWlNCblpXNWxjbUYwYjNJZ1puVnVZM1JwYjI0Z2FHRnVaR3hsSUhSb1pTQmxlR05sY0hScGIyNHVYRzRnSUNBZ0lDQWdJSEpsYzNWc2RDNTJZV3gxWlNBOUlIVnVkM0poY0hCbFpEdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ2NISnZZMlZ6Y3lBOVBUMGdYQ0p2WW1wbFkzUmNJaUFtSmlCd2NtOWpaWE56TG1SdmJXRnBiaWtnZTF4dUlDQWdJQ0FnYVc1MmIydGxJRDBnY0hKdlkyVnpjeTVrYjIxaGFXNHVZbWx1WkNocGJuWnZhMlVwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSFpoY2lCcGJuWnZhMlZPWlhoMElEMGdhVzUyYjJ0bExtSnBibVFvWjJWdVpYSmhkRzl5TENCY0ltNWxlSFJjSWlrN1hHNGdJQ0FnZG1GeUlHbHVkbTlyWlZSb2NtOTNJRDBnYVc1MmIydGxMbUpwYm1Rb1oyVnVaWEpoZEc5eUxDQmNJblJvY205M1hDSXBPMXh1SUNBZ0lIWmhjaUJwYm5admEyVlNaWFIxY200Z1BTQnBiblp2YTJVdVltbHVaQ2huWlc1bGNtRjBiM0lzSUZ3aWNtVjBkWEp1WENJcE8xeHVJQ0FnSUhaaGNpQndjbVYyYVc5MWMxQnliMjFwYzJVN1hHNWNiaUFnSUNCbWRXNWpkR2x2YmlCbGJuRjFaWFZsS0cxbGRHaHZaQ3dnWVhKbktTQjdYRzRnSUNBZ0lDQjJZWElnWlc1eGRXVjFaVkpsYzNWc2RDQTlYRzRnSUNBZ0lDQXZMeUJKWmlCbGJuRjFaWFZsSUdoaGN5QmlaV1Z1SUdOaGJHeGxaQ0JpWldadmNtVXNJSFJvWlc0Z2QyVWdkMkZ1ZENCMGJ5QjNZV2wwSUhWdWRHbHNYRzRnSUNBZ0lDQXZMeUJoYkd3Z2NISmxkbWx2ZFhNZ1VISnZiV2x6WlhNZ2FHRjJaU0JpWldWdUlISmxjMjlzZG1Wa0lHSmxabTl5WlNCallXeHNhVzVuSUdsdWRtOXJaU3hjYmlBZ0lDQWdJQzh2SUhOdklIUm9ZWFFnY21WemRXeDBjeUJoY21VZ1lXeDNZWGx6SUdSbGJHbDJaWEpsWkNCcGJpQjBhR1VnWTI5eWNtVmpkQ0J2Y21SbGNpNGdTV1pjYmlBZ0lDQWdJQzh2SUdWdWNYVmxkV1VnYUdGeklHNXZkQ0JpWldWdUlHTmhiR3hsWkNCaVpXWnZjbVVzSUhSb1pXNGdhWFFnYVhNZ2FXMXdiM0owWVc1MElIUnZYRzRnSUNBZ0lDQXZMeUJqWVd4c0lHbHVkbTlyWlNCcGJXMWxaR2xoZEdWc2VTd2dkMmwwYUc5MWRDQjNZV2wwYVc1bklHOXVJR0VnWTJGc2JHSmhZMnNnZEc4Z1ptbHlaU3hjYmlBZ0lDQWdJQzh2SUhOdklIUm9ZWFFnZEdobElHRnplVzVqSUdkbGJtVnlZWFJ2Y2lCbWRXNWpkR2x2YmlCb1lYTWdkR2hsSUc5d2NHOXlkSFZ1YVhSNUlIUnZJR1J2WEc0Z0lDQWdJQ0F2THlCaGJua2dibVZqWlhOellYSjVJSE5sZEhWd0lHbHVJR0VnY0hKbFpHbGpkR0ZpYkdVZ2QyRjVMaUJVYUdseklIQnlaV1JwWTNSaFltbHNhWFI1WEc0Z0lDQWdJQ0F2THlCcGN5QjNhSGtnZEdobElGQnliMjFwYzJVZ1kyOXVjM1J5ZFdOMGIzSWdjM2x1WTJoeWIyNXZkWE5zZVNCcGJuWnZhMlZ6SUdsMGMxeHVJQ0FnSUNBZ0x5OGdaWGhsWTNWMGIzSWdZMkZzYkdKaFkyc3NJR0Z1WkNCM2FIa2dZWE41Ym1NZ1puVnVZM1JwYjI1eklITjVibU5vY205dWIzVnpiSGxjYmlBZ0lDQWdJQzh2SUdWNFpXTjFkR1VnWTI5a1pTQmlaV1p2Y21VZ2RHaGxJR1pwY25OMElHRjNZV2wwTGlCVGFXNWpaU0IzWlNCcGJYQnNaVzFsYm5RZ2MybHRjR3hsWEc0Z0lDQWdJQ0F2THlCaGMzbHVZeUJtZFc1amRHbHZibk1nYVc0Z2RHVnliWE1nYjJZZ1lYTjVibU1nWjJWdVpYSmhkRzl5Y3l3Z2FYUWdhWE1nWlhOd1pXTnBZV3hzZVZ4dUlDQWdJQ0FnTHk4Z2FXMXdiM0owWVc1MElIUnZJR2RsZENCMGFHbHpJSEpwWjJoMExDQmxkbVZ1SUhSb2IzVm5hQ0JwZENCeVpYRjFhWEpsY3lCallYSmxMbHh1SUNBZ0lDQWdjSEpsZG1sdmRYTlFjbTl0YVhObElEOGdjSEpsZG1sdmRYTlFjbTl0YVhObExuUm9aVzRvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2FXNTJiMnRsS0cxbGRHaHZaQ3dnWVhKbktUdGNiaUFnSUNBZ0lIMHBJRG9nYm1WM0lGOVFjbTl0YVhObEtHWjFibU4wYVc5dUlDaHlaWE52YkhabEtTQjdYRzRnSUNBZ0lDQWdJSEpsYzI5c2RtVW9hVzUyYjJ0bEtHMWxkR2h2WkN3Z1lYSm5LU2s3WEc0Z0lDQWdJQ0I5S1R0Y2JseHVJQ0FnSUNBZ0x5OGdRWFp2YVdRZ2NISnZjR0ZuWVhScGJtY2daVzV4ZFdWMVpWSmxjM1ZzZENCbVlXbHNkWEpsY3lCMGJ5QlFjbTl0YVhObGN5QnlaWFIxY201bFpDQmllVnh1SUNBZ0lDQWdMeThnYkdGMFpYSWdhVzUyYjJOaGRHbHZibk1nYjJZZ2RHaGxJR2wwWlhKaGRHOXlMbHh1SUNBZ0lDQWdjSEpsZG1sdmRYTlFjbTl0YVhObElEMGdaVzV4ZFdWMVpWSmxjM1ZzZEZ0Y0ltTmhkR05vWENKZEtHWjFibU4wYVc5dUlDaHBaMjV2Y21Wa0tTQjdmU2s3WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUJsYm5GMVpYVmxVbVZ6ZFd4ME8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklFUmxabWx1WlNCMGFHVWdkVzVwWm1sbFpDQm9aV3h3WlhJZ2JXVjBhRzlrSUhSb1lYUWdhWE1nZFhObFpDQjBieUJwYlhCc1pXMWxiblFnTG01bGVIUXNYRzRnSUNBZ0x5OGdMblJvY205M0xDQmhibVFnTG5KbGRIVnliaUFvYzJWbElHUmxabWx1WlVsMFpYSmhkRzl5VFdWMGFHOWtjeWt1WEc0Z0lDQWdkR2hwY3k1ZmFXNTJiMnRsSUQwZ1pXNXhkV1YxWlR0Y2JpQWdmVnh1WEc0Z0lHUmxabWx1WlVsMFpYSmhkRzl5VFdWMGFHOWtjeWhCYzNsdVkwbDBaWEpoZEc5eUxuQnliM1J2ZEhsd1pTazdYRzVjYmlBZ0x5OGdUbTkwWlNCMGFHRjBJSE5wYlhCc1pTQmhjM2x1WXlCbWRXNWpkR2x2Ym5NZ1lYSmxJR2x0Y0d4bGJXVnVkR1ZrSUc5dUlIUnZjQ0J2Wmx4dUlDQXZMeUJCYzNsdVkwbDBaWEpoZEc5eUlHOWlhbVZqZEhNN0lIUm9aWGtnYW5WemRDQnlaWFIxY200Z1lTQlFjbTl0YVhObElHWnZjaUIwYUdVZ2RtRnNkV1VnYjJaY2JpQWdMeThnZEdobElHWnBibUZzSUhKbGMzVnNkQ0J3Y205a2RXTmxaQ0JpZVNCMGFHVWdhWFJsY21GMGIzSXVYRzRnSUhKMWJuUnBiV1V1WVhONWJtTWdQU0JtZFc1amRHbHZiaUFvYVc1dVpYSkdiaXdnYjNWMFpYSkdiaXdnYzJWc1ppd2dkSEo1VEc5amMweHBjM1FwSUh0Y2JpQWdJQ0IyWVhJZ2FYUmxjaUE5SUc1bGR5QkJjM2x1WTBsMFpYSmhkRzl5S0hkeVlYQW9hVzV1WlhKR2Jpd2diM1YwWlhKR2Jpd2djMlZzWml3Z2RISjVURzlqYzB4cGMzUXBLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQnlkVzUwYVcxbExtbHpSMlZ1WlhKaGRHOXlSblZ1WTNScGIyNG9iM1YwWlhKR2Jpa2dQeUJwZEdWeUlDOHZJRWxtSUc5MWRHVnlSbTRnYVhNZ1lTQm5aVzVsY21GMGIzSXNJSEpsZEhWeWJpQjBhR1VnWm5Wc2JDQnBkR1Z5WVhSdmNpNWNiaUFnSUNBNklHbDBaWEl1Ym1WNGRDZ3BMblJvWlc0b1puVnVZM1JwYjI0Z0tISmxjM1ZzZENrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMzVnNkQzVrYjI1bElEOGdjbVZ6ZFd4MExuWmhiSFZsSURvZ2FYUmxjaTV1WlhoMEtDazdYRzRnSUNBZ2ZTazdYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnYldGclpVbHVkbTlyWlUxbGRHaHZaQ2hwYm01bGNrWnVMQ0J6Wld4bUxDQmpiMjUwWlhoMEtTQjdYRzRnSUNBZ2RtRnlJSE4wWVhSbElEMGdSMlZ1VTNSaGRHVlRkWE53Wlc1a1pXUlRkR0Z5ZER0Y2JseHVJQ0FnSUhKbGRIVnliaUJtZFc1amRHbHZiaUJwYm5admEyVW9iV1YwYUc5a0xDQmhjbWNwSUh0Y2JpQWdJQ0FnSUdsbUlDaHpkR0YwWlNBOVBUMGdSMlZ1VTNSaGRHVkZlR1ZqZFhScGJtY3BJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLRndpUjJWdVpYSmhkRzl5SUdseklHRnNjbVZoWkhrZ2NuVnVibWx1WjF3aUtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdhV1lnS0hOMFlYUmxJRDA5UFNCSFpXNVRkR0YwWlVOdmJYQnNaWFJsWkNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvYldWMGFHOWtJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUhKdmR5QmhjbWM3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQXZMeUJDWlNCbWIzSm5hWFpwYm1jc0lIQmxjaUF5TlM0ekxqTXVNeTR6SUc5bUlIUm9aU0J6Y0dWak9seHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM0JsYjNCc1pTNXRiM3BwYkd4aExtOXlaeTkrYW05eVpXNWtiM0ptWmk5bGN6WXRaSEpoWm5RdWFIUnRiQ056WldNdFoyVnVaWEpoZEc5eWNtVnpkVzFsWEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJrYjI1bFVtVnpkV3gwS0NrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lIZG9hV3hsSUNoMGNuVmxLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmtaV3hsWjJGMFpTQTlJR052Ym5SbGVIUXVaR1ZzWldkaGRHVTdYRzRnSUNBZ0lDQWdJR2xtSUNoa1pXeGxaMkYwWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJR2xtSUNodFpYUm9iMlFnUFQwOUlGd2ljbVYwZFhKdVhDSWdmSHdnYldWMGFHOWtJRDA5UFNCY0luUm9jbTkzWENJZ0ppWWdaR1ZzWldkaGRHVXVhWFJsY21GMGIzSmJiV1YwYUc5a1hTQTlQVDBnZFc1a1pXWnBibVZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCQklISmxkSFZ5YmlCdmNpQjBhSEp2ZHlBb2QyaGxiaUIwYUdVZ1pHVnNaV2RoZEdVZ2FYUmxjbUYwYjNJZ2FHRnpJRzV2SUhSb2NtOTNYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QnRaWFJvYjJRcElHRnNkMkY1Y3lCMFpYSnRhVzVoZEdWeklIUm9aU0I1YVdWc1pDb2diRzl2Y0M1Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVaR1ZzWldkaGRHVWdQU0J1ZFd4c08xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QkpaaUIwYUdVZ1pHVnNaV2RoZEdVZ2FYUmxjbUYwYjNJZ2FHRnpJR0VnY21WMGRYSnVJRzFsZEdodlpDd2daMmwyWlNCcGRDQmhYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QmphR0Z1WTJVZ2RHOGdZMnhsWVc0Z2RYQXVYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVYwZFhKdVRXVjBhRzlrSUQwZ1pHVnNaV2RoZEdVdWFYUmxjbUYwYjNKYlhDSnlaWFIxY201Y0lsMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jbVYwZFhKdVRXVjBhRzlrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnlaV052Y21RZ1BTQjBjbmxEWVhSamFDaHlaWFIxY201TlpYUm9iMlFzSUdSbGJHVm5ZWFJsTG1sMFpYSmhkRzl5TENCaGNtY3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY21WamIzSmtMblI1Y0dVZ1BUMDlJRndpZEdoeWIzZGNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklFbG1JSFJvWlNCeVpYUjFjbTRnYldWMGFHOWtJSFJvY21WM0lHRnVJR1Y0WTJWd2RHbHZiaXdnYkdWMElIUm9ZWFJjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlCbGVHTmxjSFJwYjI0Z2NISmxkbUZwYkNCdmRtVnlJSFJvWlNCdmNtbG5hVzVoYkNCeVpYUjFjbTRnYjNJZ2RHaHliM2N1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYldWMGFHOWtJRDBnWENKMGFISnZkMXdpTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdGeVp5QTlJSEpsWTI5eVpDNWhjbWM3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWRHbHVkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRzFsZEdodlpDQTlQVDBnWENKeVpYUjFjbTVjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QkRiMjUwYVc1MVpTQjNhWFJvSUhSb1pTQnZkWFJsY2lCeVpYUjFjbTRzSUc1dmR5QjBhR0YwSUhSb1pTQmtaV3hsWjJGMFpWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QnBkR1Z5WVhSdmNpQm9ZWE1nWW1WbGJpQjBaWEp0YVc1aGRHVmtMbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjUwYVc1MVpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNCMllYSWdjbVZqYjNKa0lEMGdkSEo1UTJGMFkyZ29aR1ZzWldkaGRHVXVhWFJsY21GMGIzSmJiV1YwYUc5a1hTd2daR1ZzWldkaGRHVXVhWFJsY21GMGIzSXNJR0Z5WnlrN1hHNWNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2NtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aWRHaHliM2RjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVrWld4bFoyRjBaU0E5SUc1MWJHdzdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRXhwYTJVZ2NtVjBkWEp1YVc1bklHZGxibVZ5WVhSdmNpNTBhSEp2ZHloMWJtTmhkV2RvZENrc0lHSjFkQ0IzYVhSb2IzVjBJSFJvWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYjNabGNtaGxZV1FnYjJZZ1lXNGdaWGgwY21FZ1puVnVZM1JwYjI0Z1kyRnNiQzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHMWxkR2h2WkNBOUlGd2lkR2h5YjNkY0lqdGNiaUFnSUNBZ0lDQWdJQ0FnSUdGeVp5QTlJSEpsWTI5eVpDNWhjbWM3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjUwYVc1MVpUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJFWld4bFoyRjBaU0JuWlc1bGNtRjBiM0lnY21GdUlHRnVaQ0JvWVc1a2JHVmtJR2wwY3lCdmQyNGdaWGhqWlhCMGFXOXVjeUJ6YjF4dUlDQWdJQ0FnSUNBZ0lDOHZJSEpsWjJGeVpHeGxjM01nYjJZZ2QyaGhkQ0IwYUdVZ2JXVjBhRzlrSUhkaGN5d2dkMlVnWTI5dWRHbHVkV1VnWVhNZ2FXWWdhWFFnYVhOY2JpQWdJQ0FnSUNBZ0lDQXZMeUJjSW01bGVIUmNJaUIzYVhSb0lHRnVJSFZ1WkdWbWFXNWxaQ0JoY21jdVhHNGdJQ0FnSUNBZ0lDQWdiV1YwYUc5a0lEMGdYQ0p1WlhoMFhDSTdYRzRnSUNBZ0lDQWdJQ0FnWVhKbklEMGdkVzVrWldacGJtVmtPMXh1WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJR2x1Wm04Z1BTQnlaV052Y21RdVlYSm5PMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHBibVp2TG1SdmJtVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZiblJsZUhSYlpHVnNaV2RoZEdVdWNtVnpkV3gwVG1GdFpWMGdQU0JwYm1adkxuWmhiSFZsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNXVaWGgwSUQwZ1pHVnNaV2RoZEdVdWJtVjRkRXh2WXp0Y2JpQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNSaGRHVWdQU0JIWlc1VGRHRjBaVk4xYzNCbGJtUmxaRmxwWld4a08xeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR2x1Wm04N1hHNGdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1a1pXeGxaMkYwWlNBOUlHNTFiR3c3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQnBaaUFvYldWMGFHOWtJRDA5UFNCY0ltNWxlSFJjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJR2xtSUNoemRHRjBaU0E5UFQwZ1IyVnVVM1JoZEdWVGRYTndaVzVrWldSWmFXVnNaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNXpaVzUwSUQwZ1lYSm5PMXh1SUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjUwWlhoMExuTmxiblFnUFNCMWJtUmxabWx1WldRN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0cxbGRHaHZaQ0E5UFQwZ1hDSjBhSEp2ZDF3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tITjBZWFJsSUQwOVBTQkhaVzVUZEdGMFpWTjFjM0JsYm1SbFpGTjBZWEowS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZEdGMFpTQTlJRWRsYmxOMFlYUmxRMjl0Y0d4bGRHVmtPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnWVhKbk8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hqYjI1MFpYaDBMbVJwYzNCaGRHTm9SWGhqWlhCMGFXOXVLR0Z5WnlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklFbG1JSFJvWlNCa2FYTndZWFJqYUdWa0lHVjRZMlZ3ZEdsdmJpQjNZWE1nWTJGMVoyaDBJR0o1SUdFZ1kyRjBZMmdnWW14dlkyc3NYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QjBhR1Z1SUd4bGRDQjBhR0YwSUdOaGRHTm9JR0pzYjJOcklHaGhibVJzWlNCMGFHVWdaWGhqWlhCMGFXOXVJRzV2Y20xaGJHeDVMbHh1SUNBZ0lDQWdJQ0FnSUNBZ2JXVjBhRzlrSUQwZ1hDSnVaWGgwWENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JoY21jZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHMWxkR2h2WkNBOVBUMGdYQ0p5WlhSMWNtNWNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZiblJsZUhRdVlXSnlkWEIwS0Z3aWNtVjBkWEp1WENJc0lHRnlaeWs3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQnpkR0YwWlNBOUlFZGxibE4wWVhSbFJYaGxZM1YwYVc1bk8xeHVYRzRnSUNBZ0lDQWdJSFpoY2lCeVpXTnZjbVFnUFNCMGNubERZWFJqYUNocGJtNWxja1p1TENCelpXeG1MQ0JqYjI1MFpYaDBLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0ltNXZjbTFoYkZ3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1NXWWdZVzRnWlhoalpYQjBhVzl1SUdseklIUm9jbTkzYmlCbWNtOXRJR2x1Ym1WeVJtNHNJSGRsSUd4bFlYWmxJSE4wWVhSbElEMDlQVnh1SUNBZ0lDQWdJQ0FnSUM4dklFZGxibE4wWVhSbFJYaGxZM1YwYVc1bklHRnVaQ0JzYjI5d0lHSmhZMnNnWm05eUlHRnViM1JvWlhJZ2FXNTJiMk5oZEdsdmJpNWNiaUFnSUNBZ0lDQWdJQ0J6ZEdGMFpTQTlJR052Ym5SbGVIUXVaRzl1WlNBL0lFZGxibE4wWVhSbFEyOXRjR3hsZEdWa0lEb2dSMlZ1VTNSaGRHVlRkWE53Wlc1a1pXUlphV1ZzWkR0Y2JseHVJQ0FnSUNBZ0lDQWdJSFpoY2lCcGJtWnZJRDBnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZzZFdVNklISmxZMjl5WkM1aGNtY3NYRzRnSUNBZ0lDQWdJQ0FnSUNCa2IyNWxPaUJqYjI1MFpYaDBMbVJ2Ym1WY2JpQWdJQ0FnSUNBZ0lDQjlPMXh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSEpsWTI5eVpDNWhjbWNnUFQwOUlFTnZiblJwYm5WbFUyVnVkR2x1Wld3cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGpiMjUwWlhoMExtUmxiR1ZuWVhSbElDWW1JRzFsZEdodlpDQTlQVDBnWENKdVpYaDBYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1JHVnNhV0psY21GMFpXeDVJR1p2Y21kbGRDQjBhR1VnYkdGemRDQnpaVzUwSUhaaGJIVmxJSE52SUhSb1lYUWdkMlVnWkc5dUozUmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdZV05qYVdSbGJuUmhiR3g1SUhCaGMzTWdhWFFnYjI0Z2RHOGdkR2hsSUdSbGJHVm5ZWFJsTGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JoY21jZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJwYm1adk8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoeVpXTnZjbVF1ZEhsd1pTQTlQVDBnWENKMGFISnZkMXdpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdjM1JoZEdVZ1BTQkhaVzVUZEdGMFpVTnZiWEJzWlhSbFpEdGNiaUFnSUNBZ0lDQWdJQ0F2THlCRWFYTndZWFJqYUNCMGFHVWdaWGhqWlhCMGFXOXVJR0o1SUd4dmIzQnBibWNnWW1GamF5QmhjbTkxYm1RZ2RHOGdkR2hsWEc0Z0lDQWdJQ0FnSUNBZ0x5OGdZMjl1ZEdWNGRDNWthWE53WVhSamFFVjRZMlZ3ZEdsdmJpaGhjbWNwSUdOaGJHd2dZV0p2ZG1VdVhHNGdJQ0FnSUNBZ0lDQWdiV1YwYUc5a0lEMGdYQ0owYUhKdmQxd2lPMXh1SUNBZ0lDQWdJQ0FnSUdGeVp5QTlJSEpsWTI5eVpDNWhjbWM3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dUlDQjlYRzVjYmlBZ0x5OGdSR1ZtYVc1bElFZGxibVZ5WVhSdmNpNXdjbTkwYjNSNWNHVXVlMjVsZUhRc2RHaHliM2NzY21WMGRYSnVmU0JwYmlCMFpYSnRjeUJ2WmlCMGFHVmNiaUFnTHk4Z2RXNXBabWxsWkNBdVgybHVkbTlyWlNCb1pXeHdaWElnYldWMGFHOWtMbHh1SUNCa1pXWnBibVZKZEdWeVlYUnZjazFsZEdodlpITW9SM0FwTzF4dVhHNGdJRWR3VzJsMFpYSmhkRzl5VTNsdFltOXNYU0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN6dGNiaUFnZlR0Y2JseHVJQ0JIY0M1MGIxTjBjbWx1WnlBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z1hDSmJiMkpxWldOMElFZGxibVZ5WVhSdmNsMWNJanRjYmlBZ2ZUdGNibHh1SUNCbWRXNWpkR2x2YmlCd2RYTm9WSEo1Ulc1MGNua29iRzlqY3lrZ2UxeHVJQ0FnSUhaaGNpQmxiblJ5ZVNBOUlIc2dkSEo1VEc5ak9pQnNiMk56V3pCZElIMDdYRzVjYmlBZ0lDQnBaaUFvTVNCcGJpQnNiMk56S1NCN1hHNGdJQ0FnSUNCbGJuUnllUzVqWVhSamFFeHZZeUE5SUd4dlkzTmJNVjA3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0RJZ2FXNGdiRzlqY3lrZ2UxeHVJQ0FnSUNBZ1pXNTBjbmt1Wm1sdVlXeHNlVXh2WXlBOUlHeHZZM05iTWwwN1hHNGdJQ0FnSUNCbGJuUnllUzVoWm5SbGNreHZZeUE5SUd4dlkzTmJNMTA3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkR2hwY3k1MGNubEZiblJ5YVdWekxuQjFjMmdvWlc1MGNua3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY21WelpYUlVjbmxGYm5SeWVTaGxiblJ5ZVNrZ2UxeHVJQ0FnSUhaaGNpQnlaV052Y21RZ1BTQmxiblJ5ZVM1amIyMXdiR1YwYVc5dUlIeDhJSHQ5TzF4dUlDQWdJSEpsWTI5eVpDNTBlWEJsSUQwZ1hDSnViM0p0WVd4Y0lqdGNiaUFnSUNCa1pXeGxkR1VnY21WamIzSmtMbUZ5Wnp0Y2JpQWdJQ0JsYm5SeWVTNWpiMjF3YkdWMGFXOXVJRDBnY21WamIzSmtPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnUTI5dWRHVjRkQ2gwY25sTWIyTnpUR2x6ZENrZ2UxeHVJQ0FnSUM4dklGUm9aU0J5YjI5MElHVnVkSEo1SUc5aWFtVmpkQ0FvWldabVpXTjBhWFpsYkhrZ1lTQjBjbmtnYzNSaGRHVnRaVzUwSUhkcGRHaHZkWFFnWVNCallYUmphRnh1SUNBZ0lDOHZJRzl5SUdFZ1ptbHVZV3hzZVNCaWJHOWpheWtnWjJsMlpYTWdkWE1nWVNCd2JHRmpaU0IwYnlCemRHOXlaU0IyWVd4MVpYTWdkR2h5YjNkdUlHWnliMjFjYmlBZ0lDQXZMeUJzYjJOaGRHbHZibk1nZDJobGNtVWdkR2hsY21VZ2FYTWdibThnWlc1amJHOXphVzVuSUhSeWVTQnpkR0YwWlcxbGJuUXVYRzRnSUNBZ2RHaHBjeTUwY25sRmJuUnlhV1Z6SUQwZ1czc2dkSEo1VEc5ak9pQmNJbkp2YjNSY0lpQjlYVHRjYmlBZ0lDQjBjbmxNYjJOelRHbHpkQzVtYjNKRllXTm9LSEIxYzJoVWNubEZiblJ5ZVN3Z2RHaHBjeWs3WEc0Z0lDQWdkR2hwY3k1eVpYTmxkQ2gwY25WbEtUdGNiaUFnZlZ4dVhHNGdJSEoxYm5ScGJXVXVhMlY1Y3lBOUlHWjFibU4wYVc5dUlDaHZZbXBsWTNRcElIdGNiaUFnSUNCMllYSWdhMlY1Y3lBOUlGdGRPMXh1SUNBZ0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCdlltcGxZM1FwSUh0Y2JpQWdJQ0FnSUd0bGVYTXVjSFZ6YUNoclpYa3BPMXh1SUNBZ0lIMWNiaUFnSUNCclpYbHpMbkpsZG1WeWMyVW9LVHRjYmx4dUlDQWdJQzh2SUZKaGRHaGxjaUIwYUdGdUlISmxkSFZ5Ym1sdVp5QmhiaUJ2WW1wbFkzUWdkMmwwYUNCaElHNWxlSFFnYldWMGFHOWtMQ0IzWlNCclpXVndYRzRnSUNBZ0x5OGdkR2hwYm1keklITnBiWEJzWlNCaGJtUWdjbVYwZFhKdUlIUm9aU0J1WlhoMElHWjFibU4wYVc5dUlHbDBjMlZzWmk1Y2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdibVY0ZENncElIdGNiaUFnSUNBZ0lIZG9hV3hsSUNoclpYbHpMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2EyVjVJRDBnYTJWNWN5NXdiM0FvS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLR3RsZVNCcGJpQnZZbXBsWTNRcElIdGNiaUFnSUNBZ0lDQWdJQ0J1WlhoMExuWmhiSFZsSUQwZ2EyVjVPMXh1SUNBZ0lDQWdJQ0FnSUc1bGVIUXVaRzl1WlNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYaDBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUM4dklGUnZJR0YyYjJsa0lHTnlaV0YwYVc1bklHRnVJR0ZrWkdsMGFXOXVZV3dnYjJKcVpXTjBMQ0IzWlNCcWRYTjBJR2hoYm1jZ2RHaGxJQzUyWVd4MVpWeHVJQ0FnSUNBZ0x5OGdZVzVrSUM1a2IyNWxJSEJ5YjNCbGNuUnBaWE1nYjJabUlIUm9aU0J1WlhoMElHWjFibU4wYVc5dUlHOWlhbVZqZENCcGRITmxiR1l1SUZSb2FYTmNiaUFnSUNBZ0lDOHZJR0ZzYzI4Z1pXNXpkWEpsY3lCMGFHRjBJSFJvWlNCdGFXNXBabWxsY2lCM2FXeHNJRzV2ZENCaGJtOXVlVzFwZW1VZ2RHaGxJR1oxYm1OMGFXOXVMbHh1SUNBZ0lDQWdibVY0ZEM1a2IyNWxJRDBnZEhKMVpUdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdVpYaDBPMXh1SUNBZ0lIMDdYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnZG1Gc2RXVnpLR2wwWlhKaFlteGxLU0I3WEc0Z0lDQWdhV1lnS0dsMFpYSmhZbXhsS1NCN1hHNGdJQ0FnSUNCMllYSWdhWFJsY21GMGIzSk5aWFJvYjJRZ1BTQnBkR1Z5WVdKc1pWdHBkR1Z5WVhSdmNsTjViV0p2YkYwN1hHNGdJQ0FnSUNCcFppQW9hWFJsY21GMGIzSk5aWFJvYjJRcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHbDBaWEpoZEc5eVRXVjBhRzlrTG1OaGJHd29hWFJsY21GaWJHVXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdsMFpYSmhZbXhsTG01bGVIUWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdhWFJsY21GaWJHVTdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR2xtSUNnaGFYTk9ZVTRvYVhSbGNtRmliR1V1YkdWdVozUm9LU2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdhU0E5SUMweExGeHVJQ0FnSUNBZ0lDQWdJQ0FnYm1WNGRDQTlJR1oxYm1OMGFXOXVJRzVsZUhRb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnZDJocGJHVWdLQ3NyYVNBOElHbDBaWEpoWW14bExteGxibWQwYUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHaGhjMDkzYmk1allXeHNLR2wwWlhKaFlteGxMQ0JwS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCdVpYaDBMblpoYkhWbElEMGdhWFJsY21GaWJHVmJhVjA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRzVsZUhRdVpHOXVaU0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjRkRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQnVaWGgwTG5aaGJIVmxJRDBnZFc1a1pXWnBibVZrTzF4dUlDQWdJQ0FnSUNBZ0lHNWxlSFF1Wkc5dVpTQTlJSFJ5ZFdVN1hHNWNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdibVY0ZER0Y2JpQWdJQ0FnSUNBZ2ZUdGNibHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdibVY0ZEM1dVpYaDBJRDBnYm1WNGREdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QlNaWFIxY200Z1lXNGdhWFJsY21GMGIzSWdkMmwwYUNCdWJ5QjJZV3gxWlhNdVhHNGdJQ0FnY21WMGRYSnVJSHNnYm1WNGREb2daRzl1WlZKbGMzVnNkQ0I5TzF4dUlDQjlYRzRnSUhKMWJuUnBiV1V1ZG1Gc2RXVnpJRDBnZG1Gc2RXVnpPMXh1WEc0Z0lHWjFibU4wYVc5dUlHUnZibVZTWlhOMWJIUW9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIc2dkbUZzZFdVNklIVnVaR1ZtYVc1bFpDd2daRzl1WlRvZ2RISjFaU0I5TzF4dUlDQjlYRzVjYmlBZ1EyOXVkR1Y0ZEM1d2NtOTBiM1I1Y0dVZ1BTQjdYRzRnSUNBZ1kyOXVjM1J5ZFdOMGIzSTZJRU52Ym5SbGVIUXNYRzVjYmlBZ0lDQnlaWE5sZERvZ1puVnVZM1JwYjI0Z2NtVnpaWFFvYzJ0cGNGUmxiWEJTWlhObGRDa2dlMXh1SUNBZ0lDQWdkR2hwY3k1d2NtVjJJRDBnTUR0Y2JpQWdJQ0FnSUhSb2FYTXVibVY0ZENBOUlEQTdYRzRnSUNBZ0lDQjBhR2x6TG5ObGJuUWdQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdJQ0IwYUdsekxtUnZibVVnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJSFJvYVhNdVpHVnNaV2RoZEdVZ1BTQnVkV3hzTzF4dVhHNGdJQ0FnSUNCMGFHbHpMblJ5ZVVWdWRISnBaWE11Wm05eVJXRmphQ2h5WlhObGRGUnllVVZ1ZEhKNUtUdGNibHh1SUNBZ0lDQWdhV1lnS0NGemEybHdWR1Z0Y0ZKbGMyVjBLU0I3WEc0Z0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUc1aGJXVWdhVzRnZEdocGN5a2dlMXh1SUNBZ0lDQWdJQ0FnSUM4dklFNXZkQ0J6ZFhKbElHRmliM1YwSUhSb1pTQnZjSFJwYldGc0lHOXlaR1Z5SUc5bUlIUm9aWE5sSUdOdmJtUnBkR2x2Ym5NNlhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0c1aGJXVXVZMmhoY2tGMEtEQXBJRDA5UFNCY0luUmNJaUFtSmlCb1lYTlBkMjR1WTJGc2JDaDBhR2x6TENCdVlXMWxLU0FtSmlBaGFYTk9ZVTRvSzI1aGJXVXVjMnhwWTJVb01Ta3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6VzI1aGJXVmRJRDBnZFc1a1pXWnBibVZrTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNYRzVjYmlBZ0lDQnpkRzl3T2lCbWRXNWpkR2x2YmlCemRHOXdLQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NWtiMjVsSUQwZ2RISjFaVHRjYmx4dUlDQWdJQ0FnZG1GeUlISnZiM1JGYm5SeWVTQTlJSFJvYVhNdWRISjVSVzUwY21sbGMxc3dYVHRjYmlBZ0lDQWdJSFpoY2lCeWIyOTBVbVZqYjNKa0lEMGdjbTl2ZEVWdWRISjVMbU52YlhCc1pYUnBiMjQ3WEc0Z0lDQWdJQ0JwWmlBb2NtOXZkRkpsWTI5eVpDNTBlWEJsSUQwOVBTQmNJblJvY205M1hDSXBJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2djbTl2ZEZKbFkyOXlaQzVoY21jN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbkoyWVd3N1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdScGMzQmhkR05vUlhoalpYQjBhVzl1T2lCbWRXNWpkR2x2YmlCa2FYTndZWFJqYUVWNFkyVndkR2x2YmlobGVHTmxjSFJwYjI0cElIdGNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxtUnZibVVwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHliM2NnWlhoalpYQjBhVzl1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMllYSWdZMjl1ZEdWNGRDQTlJSFJvYVhNN1hHNGdJQ0FnSUNCbWRXNWpkR2x2YmlCb1lXNWtiR1VvYkc5akxDQmpZWFZuYUhRcElIdGNiaUFnSUNBZ0lDQWdjbVZqYjNKa0xuUjVjR1VnUFNCY0luUm9jbTkzWENJN1hHNGdJQ0FnSUNBZ0lISmxZMjl5WkM1aGNtY2dQU0JsZUdObGNIUnBiMjQ3WEc0Z0lDQWdJQ0FnSUdOdmJuUmxlSFF1Ym1WNGRDQTlJR3h2WXp0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUNFaFkyRjFaMmgwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdkR2hwY3k1MGNubEZiblJ5YVdWekxteGxibWQwYUNBdElERTdJR2tnUGowZ01Ec2dMUzFwS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJsYm5SeWVTQTlJSFJvYVhNdWRISjVSVzUwY21sbGMxdHBYVHRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxZMjl5WkNBOUlHVnVkSEo1TG1OdmJYQnNaWFJwYjI0N1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMblJ5ZVV4dll5QTlQVDBnWENKeWIyOTBYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJGZUdObGNIUnBiMjRnZEdoeWIzZHVJRzkxZEhOcFpHVWdiMllnWVc1NUlIUnllU0JpYkc5amF5QjBhR0YwSUdOdmRXeGtJR2hoYm1Sc1pWeHVJQ0FnSUNBZ0lDQWdJQzh2SUdsMExDQnpieUJ6WlhRZ2RHaGxJR052YlhCc1pYUnBiMjRnZG1Gc2RXVWdiMllnZEdobElHVnVkR2x5WlNCbWRXNWpkR2x2YmlCMGIxeHVJQ0FnSUNBZ0lDQWdJQzh2SUhSb2NtOTNJSFJvWlNCbGVHTmxjSFJwYjI0dVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHaGhibVJzWlNoY0ltVnVaRndpS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR2xtSUNobGJuUnllUzUwY25sTWIyTWdQRDBnZEdocGN5NXdjbVYyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUdoaGMwTmhkR05vSUQwZ2FHRnpUM2R1TG1OaGJHd29aVzUwY25rc0lGd2lZMkYwWTJoTWIyTmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJR2hoYzBacGJtRnNiSGtnUFNCb1lYTlBkMjR1WTJGc2JDaGxiblJ5ZVN3Z1hDSm1hVzVoYkd4NVRHOWpYQ0lwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0doaGMwTmhkR05vSUNZbUlHaGhjMFpwYm1Gc2JIa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQnlaWFlnUENCbGJuUnllUzVqWVhSamFFeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1OaGRHTm9URzlqTENCMGNuVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kR2hwY3k1d2NtVjJJRHdnWlc1MGNua3VabWx1WVd4c2VVeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1acGJtRnNiSGxNYjJNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9hR0Z6UTJGMFkyZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQnlaWFlnUENCbGJuUnllUzVqWVhSamFFeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1OaGRHTm9URzlqTENCMGNuVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0doaGMwWnBibUZzYkhrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG5CeVpYWWdQQ0JsYm5SeWVTNW1hVzVoYkd4NVRHOWpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm9ZVzVrYkdVb1pXNTBjbmt1Wm1sdVlXeHNlVXh2WXlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpaGNJblJ5ZVNCemRHRjBaVzFsYm5RZ2QybDBhRzkxZENCallYUmphQ0J2Y2lCbWFXNWhiR3g1WENJcE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBzWEc1Y2JpQWdJQ0JoWW5KMWNIUTZJR1oxYm1OMGFXOXVJR0ZpY25Wd2RDaDBlWEJsTENCaGNtY3BJSHRjYmlBZ0lDQWdJR1p2Y2lBb2RtRnlJR2tnUFNCMGFHbHpMblJ5ZVVWdWRISnBaWE11YkdWdVozUm9JQzBnTVRzZ2FTQStQU0F3T3lBdExXa3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHVnVkSEo1SUQwZ2RHaHBjeTUwY25sRmJuUnlhV1Z6VzJsZE8xeHVJQ0FnSUNBZ0lDQnBaaUFvWlc1MGNua3VkSEo1VEc5aklEdzlJSFJvYVhNdWNISmxkaUFtSmlCb1lYTlBkMjR1WTJGc2JDaGxiblJ5ZVN3Z1hDSm1hVzVoYkd4NVRHOWpYQ0lwSUNZbUlIUm9hWE11Y0hKbGRpQThJR1Z1ZEhKNUxtWnBibUZzYkhsTWIyTXBJSHRjYmlBZ0lDQWdJQ0FnSUNCMllYSWdabWx1WVd4c2VVVnVkSEo1SUQwZ1pXNTBjbms3WEc0Z0lDQWdJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLR1pwYm1Gc2JIbEZiblJ5ZVNBbUppQW9kSGx3WlNBOVBUMGdYQ0ppY21WaGExd2lJSHg4SUhSNWNHVWdQVDA5SUZ3aVkyOXVkR2x1ZFdWY0lpa2dKaVlnWm1sdVlXeHNlVVZ1ZEhKNUxuUnllVXh2WXlBOFBTQmhjbWNnSmlZZ1lYSm5JRHc5SUdacGJtRnNiSGxGYm5SeWVTNW1hVzVoYkd4NVRHOWpLU0I3WEc0Z0lDQWdJQ0FnSUM4dklFbG5ibTl5WlNCMGFHVWdabWx1WVd4c2VTQmxiblJ5ZVNCcFppQmpiMjUwY205c0lHbHpJRzV2ZENCcWRXMXdhVzVuSUhSdklHRmNiaUFnSUNBZ0lDQWdMeThnYkc5allYUnBiMjRnYjNWMGMybGtaU0IwYUdVZ2RISjVMMk5oZEdOb0lHSnNiMk5yTGx4dUlDQWdJQ0FnSUNCbWFXNWhiR3g1Ulc1MGNua2dQU0J1ZFd4c08xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQjJZWElnY21WamIzSmtJRDBnWm1sdVlXeHNlVVZ1ZEhKNUlEOGdabWx1WVd4c2VVVnVkSEo1TG1OdmJYQnNaWFJwYjI0Z09pQjdmVHRjYmlBZ0lDQWdJSEpsWTI5eVpDNTBlWEJsSUQwZ2RIbHdaVHRjYmlBZ0lDQWdJSEpsWTI5eVpDNWhjbWNnUFNCaGNtYzdYRzVjYmlBZ0lDQWdJR2xtSUNobWFXNWhiR3g1Ulc1MGNua3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXVaWGgwSUQwZ1ptbHVZV3hzZVVWdWRISjVMbVpwYm1Gc2JIbE1iMk03WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtTnZiWEJzWlhSbEtISmxZMjl5WkNrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCRGIyNTBhVzUxWlZObGJuUnBibVZzTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0JqYjIxd2JHVjBaVG9nWm5WdVkzUnBiMjRnWTI5dGNHeGxkR1VvY21WamIzSmtMQ0JoWm5SbGNreHZZeWtnZTF4dUlDQWdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdkR2h5YjNjZ2NtVmpiM0prTG1GeVp6dGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdhV1lnS0hKbFkyOXlaQzUwZVhCbElEMDlQU0JjSW1KeVpXRnJYQ0lnZkh3Z2NtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aVkyOXVkR2x1ZFdWY0lpa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtNWxlSFFnUFNCeVpXTnZjbVF1WVhKbk8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaHlaV052Y21RdWRIbHdaU0E5UFQwZ1hDSnlaWFIxY201Y0lpa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuSjJZV3dnUFNCeVpXTnZjbVF1WVhKbk8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG01bGVIUWdQU0JjSW1WdVpGd2lPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0p1YjNKdFlXeGNJaUFtSmlCaFpuUmxja3h2WXlrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG01bGVIUWdQU0JoWm5SbGNreHZZenRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdabWx1YVhOb09pQm1kVzVqZEdsdmJpQm1hVzVwYzJnb1ptbHVZV3hzZVV4dll5a2dlMXh1SUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SUhSb2FYTXVkSEo1Ulc1MGNtbGxjeTVzWlc1bmRHZ2dMU0F4T3lCcElENDlJREE3SUMwdGFTa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1pXNTBjbmtnUFNCMGFHbHpMblJ5ZVVWdWRISnBaWE5iYVYwN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsYm5SeWVTNW1hVzVoYkd4NVRHOWpJRDA5UFNCbWFXNWhiR3g1VEc5aktTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NWpiMjF3YkdWMFpTaGxiblJ5ZVM1amIyMXdiR1YwYVc5dUxDQmxiblJ5ZVM1aFpuUmxja3h2WXlrN1hHNGdJQ0FnSUNBZ0lDQWdjbVZ6WlhSVWNubEZiblJ5ZVNobGJuUnllU2s3WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUVOdmJuUnBiblZsVTJWdWRHbHVaV3c3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnWENKallYUmphRndpT2lCbWRXNWpkR2x2YmlCZlkyRjBZMmdvZEhKNVRHOWpLU0I3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ2RHaHBjeTUwY25sRmJuUnlhV1Z6TG14bGJtZDBhQ0F0SURFN0lHa2dQajBnTURzZ0xTMXBLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmxiblJ5ZVNBOUlIUm9hWE11ZEhKNVJXNTBjbWxsYzF0cFhUdGNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMblJ5ZVV4dll5QTlQVDBnZEhKNVRHOWpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJR1Z1ZEhKNUxtTnZiWEJzWlhScGIyNDdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBhSEp2ZDI0Z1BTQnlaV052Y21RdVlYSm5PMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVnpaWFJVY25sRmJuUnllU2hsYm5SeWVTazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFISnZkMjQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0x5OGdWR2hsSUdOdmJuUmxlSFF1WTJGMFkyZ2diV1YwYUc5a0lHMTFjM1FnYjI1c2VTQmlaU0JqWVd4c1pXUWdkMmwwYUNCaElHeHZZMkYwYVc5dVhHNGdJQ0FnSUNBdkx5QmhjbWQxYldWdWRDQjBhR0YwSUdOdmNuSmxjM0J2Ym1SeklIUnZJR0VnYTI1dmQyNGdZMkYwWTJnZ1lteHZZMnN1WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0pwYkd4bFoyRnNJR05oZEdOb0lHRjBkR1Z0Y0hSY0lpazdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHUmxiR1ZuWVhSbFdXbGxiR1E2SUdaMWJtTjBhVzl1SUdSbGJHVm5ZWFJsV1dsbGJHUW9hWFJsY21GaWJHVXNJSEpsYzNWc2RFNWhiV1VzSUc1bGVIUk1iMk1wSUh0Y2JpQWdJQ0FnSUhSb2FYTXVaR1ZzWldkaGRHVWdQU0I3WEc0Z0lDQWdJQ0FnSUdsMFpYSmhkRzl5T2lCMllXeDFaWE1vYVhSbGNtRmliR1VwTEZ4dUlDQWdJQ0FnSUNCeVpYTjFiSFJPWVcxbE9pQnlaWE4xYkhST1lXMWxMRnh1SUNBZ0lDQWdJQ0J1WlhoMFRHOWpPaUJ1WlhoMFRHOWpYRzRnSUNBZ0lDQjlPMXh1WEc0Z0lDQWdJQ0J5WlhSMWNtNGdRMjl1ZEdsdWRXVlRaVzUwYVc1bGJEdGNiaUFnSUNCOVhHNGdJSDA3WEc1OUtTaGNiaTh2SUVGdGIyNW5JSFJvWlNCMllYSnBiM1Z6SUhSeWFXTnJjeUJtYjNJZ2IySjBZV2x1YVc1bklHRWdjbVZtWlhKbGJtTmxJSFJ2SUhSb1pTQm5iRzlpWVd4Y2JpOHZJRzlpYW1WamRDd2dkR2hwY3lCelpXVnRjeUIwYnlCaVpTQjBhR1VnYlc5emRDQnlaV3hwWVdKc1pTQjBaV05vYm1seGRXVWdkR2hoZENCa2IyVnpJRzV2ZEZ4dUx5OGdkWE5sSUdsdVpHbHlaV04wSUdWMllXd2dLSGRvYVdOb0lIWnBiMnhoZEdWeklFTnZiblJsYm5RZ1UyVmpkWEpwZEhrZ1VHOXNhV041S1M1Y2JuUjVjR1Z2WmlCbmJHOWlZV3dnUFQwOUlGd2liMkpxWldOMFhDSWdQeUJuYkc5aVlXd2dPaUIwZVhCbGIyWWdkMmx1Wkc5M0lEMDlQU0JjSW05aWFtVmpkRndpSUQ4Z2QybHVaRzkzSURvZ2RIbHdaVzltSUhObGJHWWdQVDA5SUZ3aWIySnFaV04wWENJZ1B5QnpaV3htSURvZ2RXNWtaV1pwYm1Wa0tUc2lYWDA9IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50UXVldWU7XG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtpXSgpO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbn1cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgcXVldWUucHVzaChmdW4pO1xuICAgIGlmICghZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuUHJvbWlzZTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5tYXRoLnNpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5NYXRoLnNpZ247IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLlN0cmluZy5yZXBlYXQ7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3QuYXNzaWduOyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICQuY3JlYXRlKFAsIEQpO1xufTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhpdCwga2V5LCBkZXNjKTtcbn07IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zdGF0aWNzLWFjY2VwdC1wcmltaXRpdmVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgcmV0dXJuICQuZ2V0RGVzYyhpdCwga2V5KTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3Qua2V5czsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5TeW1ib2w7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLndrcycpKCdpdGVyYXRvcicpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgdG9PYmplY3QgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgRVM1T2JqZWN0ID0gcmVxdWlyZSgnLi8kLmVzNS1vYmplY3QnKVxuICAsIGVudW1LZXlzICA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKTtcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQsIHRydWUpXG4gICAgLCBsID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaSA9IDE7XG4gIHdoaWxlKGwgPiBpKXtcbiAgICB2YXIgUyAgICAgID0gRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn07IiwidmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gKE8gPSBPYmplY3QoaXQpKVtUQUddKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBPcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYofmxlbmd0aCAmJiB0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfSByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICB9O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuZnVuY3Rpb24gY3R4KGZuLCB0aGF0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4vLyB0eXBlIGJpdG1hcFxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxuJGRlZi5HID0gMjsgIC8vIGdsb2JhbFxuJGRlZi5TID0gNDsgIC8vIHN0YXRpY1xuJGRlZi5QID0gODsgIC8vIHByb3RvXG4kZGVmLkIgPSAxNjsgLy8gYmluZFxuJGRlZi5XID0gMzI7IC8vIHdyYXBcbmZ1bmN0aW9uICRkZWYodHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGlmKGlzR2xvYmFsICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nKWV4cCA9IHNvdXJjZVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5XICYmIHRhcmdldFtrZXldID09IG91dCkhZnVuY3Rpb24oQyl7XG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xuICAgICAgfTtcbiAgICAgIGV4cFtQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgIH0ob3V0KTtcbiAgICBlbHNlIGV4cCA9IGlzUHJvdG8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0XG4gICAgZXhwb3J0c1trZXldID0gZXhwO1xuICAgIGlmKGlzUHJvdG8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9ICRkZWY7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0S2V5cyhpdClcbiAgICAsIGlzRW51bSAgICAgPSAkLmlzRW51bVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scylmb3IodmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KSwgaSA9IDAsIGtleTsgc3ltYm9scy5sZW5ndGggPiBpOyApe1xuICAgIGlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKWtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBjb2YgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gMCBpbiAkT2JqZWN0KCd6JykgPyAkT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6ICRPYmplY3QoaXQpO1xufTsiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZ1xuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgZ2V0TmFtZXMgPSByZXF1aXJlKCcuLyQnKS5nZXROYW1lcztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxuZnVuY3Rpb24gZ2V0V2luZG93TmFtZXMoaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnZXROYW1lcyhpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XG4gIHJldHVybiBnZXROYW1lcyh0b09iamVjdChpdCkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwiLy8gRmFzdCBhcHBseVxuLy8gaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgIGNhc2UgNTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07IiwidmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gKCdBcnJheScgaW4gSXRlcmF0b3JzID8gSXRlcmF0b3JzLkFycmF5IDogQXJyYXkucHJvdG90eXBlW0lURVJBVE9SXSkgPT09IGl0O1xufTsiLCIvLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xufTsiLCIvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG5tb2R1bGUuZXhwb3J0cyA9ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpOyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbmZ1bmN0aW9uIGNsb3NlKGl0ZXJhdG9yKXtcbiAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgfSBjYXRjaChlKXtcbiAgICBjbG9zZShpdGVyYXRvcik7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpKDEsbmV4dCl9KTtcbiAgcmVxdWlyZSgnLi8kLnRhZycpKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgaGlkZSAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIEZGX0lURVJBVE9SICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgICA9ICd2YWx1ZXMnO1xuZnVuY3Rpb24gcmV0dXJuVGhpcygpeyByZXR1cm4gdGhpczsgfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRSl7XG4gIHJlcXVpcmUoJy4vJC5pdGVyLWNyZWF0ZScpKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKGtpbmQpe1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9XG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgX25hdGl2ZSAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgY3JlYXRlTWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoX25hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICByZXF1aXJlKCcuLyQudGFnJykoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgU1lNQk9MX0lURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoIUxJQlJBUlkgfHwgRk9SQ0UpaGlkZShwcm90bywgU1lNQk9MX0lURVJBVE9SLCBfZGVmYXVsdCk7XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5pdGVyLWJ1Z2d5JyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG59OyIsInZhciBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgICAgPSBmYWxzZTtcbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtTWU1CT0xfSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgaWYoIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltTWU1CT0xfSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW1NZTUJPTF9JVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsInZhciAkcmVkZWYgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5oaWRlJyk7IiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gaXMoeCwgeSl7XG4gIHJldHVybiB4ID09PSB5ID8geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkgOiB4ICE9IHggJiYgeSAhPSB5O1xufTsiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbmZ1bmN0aW9uIGNoZWNrKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyBmdW5jdGlvbihidWdneSwgc2V0KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgICBzZXQoe30sIFtdKTtcbiAgICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICAgIHJldHVybiBPO1xuICAgICAgICB9O1xuICAgICAgfSgpXG4gICAgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwiLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnNpZ24gfHwgZnVuY3Rpb24gc2lnbih4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgfHwgeCAhPSB4ID8geCA6IHggPCAwID8gLTEgOiAxO1xufTsiLCJ2YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDKXtcbiAgaWYocmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpICYmICEoU1BFQ0lFUyBpbiBDKSkkLnNldERlc2MoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpdGhyb3cgVHlwZUVycm9yKG5hbWUgKyBcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsXG4gICAgICB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDI7IH19KS5hID09IDI7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTsiLCJ2YXIgaGFzICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIGhpZGUgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgVEFHICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSloaWRlKGl0LCBUQUcsIHRhZyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5mdW5jdGlvbiBydW4oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufVxuZnVuY3Rpb24gbGlzdG5lcihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufVxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBNb2Rlcm4gYnJvd3NlcnMsIHNraXAgaW1wbGVtZW50YXRpb24gZm9yIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RuZXIsIGZhbHNlKTtcbiAgLy8gV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0bmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIEVTNU9iamVjdCA9IHJlcXVpcmUoJy4vJC5lczUtb2JqZWN0JylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgcmVhbFN0cmluZyl7XG4gIHJldHVybiAocmVhbFN0cmluZyA/IE9iamVjdCA6IEVTNU9iamVjdCkoZGVmaW5lZChpdCkpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHJlcXVpcmUoJy4vJC51aWQnKSkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZCl7XG4gICAgcmV0dXJuIGl0W1N5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgJ0BAaXRlcmF0b3InXVxuICAgICAgfHwgaXRbSVRFUkFUT1JdXG4gICAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xuICB9XG59OyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59OyIsInZhciBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxuICAsIHN0ZXAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgdG9PYmplY3QgICA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuc2V0VW5zY29wZSgna2V5cycpO1xuc2V0VW5zY29wZSgndmFsdWVzJyk7XG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7IiwiLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtzaWduOiByZXF1aXJlKCcuLyQuc2lnbicpfSk7IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTsiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldH0pOyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29yZSAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuJC5lYWNoLmNhbGwoKCdmcmVlemUsc2VhbCxwcmV2ZW50RXh0ZW5zaW9ucyxpc0Zyb3plbixpc1NlYWxlZCxpc0V4dGVuc2libGUsJyArXG4gICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsZ2V0UHJvdG90eXBlT2Ysa2V5cyxnZXRPd25Qcm9wZXJ0eU5hbWVzJykuc3BsaXQoJywnKVxuLCBmdW5jdGlvbihLRVksIElEKXtcbiAgdmFyIGZuICAgICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZm9yY2VkID0gMFxuICAgICwgbWV0aG9kID0ge307XG4gIG1ldGhvZFtLRVldID0gSUQgPT0gMCA/IGZ1bmN0aW9uIGZyZWV6ZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMSA/IGZ1bmN0aW9uIHNlYWwoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBpdDtcbiAgfSA6IElEID09IDIgPyBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMyA/IGZ1bmN0aW9uIGlzRnJvemVuKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcbiAgfSA6IElEID09IDQgPyBmdW5jdGlvbiBpc1NlYWxlZChpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IHRydWU7XG4gIH0gOiBJRCA9PSA1ID8gZnVuY3Rpb24gaXNFeHRlbnNpYmxlKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogZmFsc2U7XG4gIH0gOiBJRCA9PSA2ID8gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCksIGtleSk7XG4gIH0gOiBJRCA9PSA3ID8gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCwgdHJ1ZSkpO1xuICB9IDogSUQgPT0gOCA/IGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCkpO1xuICB9IDogcmVxdWlyZSgnLi8kLmdldC1uYW1lcycpLmdldDtcbiAgdHJ5IHtcbiAgICBmbigneicpO1xuICB9IGNhdGNoKGUpe1xuICAgIGZvcmNlZCA9IDE7XG4gIH1cbiAgJGRlZigkZGVmLlMgKyAkZGVmLkYgKiBmb3JjZWQsICdPYmplY3QnLCBtZXRob2QpO1xufSk7IixudWxsLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgTElCUkFSWSAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY3R4ICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNsYXNzb2YgICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgJGRlZiAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBzdHJpY3ROZXcgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byAgID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxuICAsIHNhbWUgICAgICAgPSByZXF1aXJlKCcuLyQuc2FtZScpXG4gICwgc3BlY2llcyAgICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJylcbiAgLCBSRUNPUkQgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdyZWNvcmQnKVxuICAsIFBST01JU0UgICAgPSAnUHJvbWlzZSdcbiAgLCBwcm9jZXNzICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBhc2FwICAgICAgID0gcHJvY2VzcyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgUCAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIFdyYXBwZXI7XG5cbmZ1bmN0aW9uIHRlc3RSZXNvbHZlKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KTtcbiAgaWYoc3ViKXRlc3QuY29uc3RydWN0b3IgPSBPYmplY3Q7XG4gIHJldHVybiBQLnJlc29sdmUodGVzdCkgPT09IHRlc3Q7XG59XG5cbnZhciB1c2VOYXRpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgd29ya3MgPSBmYWxzZTtcbiAgZnVuY3Rpb24gUDIoeCl7XG4gICAgdmFyIHNlbGYgPSBuZXcgUCh4KTtcbiAgICBzZXRQcm90byhzZWxmLCBQMi5wcm90b3R5cGUpO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIHRyeSB7XG4gICAgd29ya3MgPSBQICYmIFAucmVzb2x2ZSAmJiB0ZXN0UmVzb2x2ZSgpO1xuICAgIHNldFByb3RvKFAyLCBQKTtcbiAgICBQMi5wcm90b3R5cGUgPSAkLmNyZWF0ZShQLnByb3RvdHlwZSwge2NvbnN0cnVjdG9yOiB7dmFsdWU6IFAyfX0pO1xuICAgIC8vIGFjdHVhbCBGaXJlZm94IGhhcyBicm9rZW4gc3ViY2xhc3Mgc3VwcG9ydCwgdGVzdCB0aGF0XG4gICAgaWYoIShQMi5yZXNvbHZlKDUpLnRoZW4oZnVuY3Rpb24oKXt9KSBpbnN0YW5jZW9mIFAyKSl7XG4gICAgICB3b3JrcyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBhY3R1YWwgVjggYnVnLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDE2MlxuICAgIGlmKHdvcmtzICYmIHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSl7XG4gICAgICB2YXIgdGhlbmFibGVUaGVuR290dGVuID0gZmFsc2U7XG4gICAgICBQLnJlc29sdmUoJC5zZXREZXNjKHt9LCAndGhlbicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSB0cnVlOyB9XG4gICAgICB9KSk7XG4gICAgICB3b3JrcyA9IHRoZW5hYmxlVGhlbkdvdHRlbjtcbiAgICB9XG4gIH0gY2F0Y2goZSl7IHdvcmtzID0gZmFsc2U7IH1cbiAgcmV0dXJuIHdvcmtzO1xufSgpO1xuXG4vLyBoZWxwZXJzXG5mdW5jdGlvbiBpc1Byb21pc2UoaXQpe1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICh1c2VOYXRpdmUgPyBjbGFzc29mKGl0KSA9PSAnUHJvbWlzZScgOiBSRUNPUkQgaW4gaXQpO1xufVxuZnVuY3Rpb24gc2FtZUNvbnN0cnVjdG9yKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn1cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yKEMpe1xuICB2YXIgUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdO1xuICByZXR1cm4gUyAhPSB1bmRlZmluZWQgPyBTIDogQztcbn1cbmZ1bmN0aW9uIGlzVGhlbmFibGUoaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufVxuZnVuY3Rpb24gbm90aWZ5KHJlY29yZCwgaXNSZWplY3Qpe1xuICBpZihyZWNvcmQubilyZXR1cm47XG4gIHJlY29yZC5uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcmVjb3JkLmM7XG4gIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgYXNhcC5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSByZWNvcmQudlxuICAgICAgLCBvayAgICA9IHJlY29yZC5zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIGZ1bmN0aW9uIHJ1bihyZWFjdCl7XG4gICAgICB2YXIgY2IgPSBvayA/IHJlYWN0Lm9rIDogcmVhY3QuZmFpbFxuICAgICAgICAsIHJldCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGNiKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJldCA9IGNiID09PSB0cnVlID8gdmFsdWUgOiBjYih2YWx1ZSk7XG4gICAgICAgICAgaWYocmV0ID09PSByZWFjdC5QKXtcbiAgICAgICAgICAgIHJlYWN0LnJlaihUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJldCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJldCwgcmVhY3QucmVzLCByZWFjdC5yZWopO1xuICAgICAgICAgIH0gZWxzZSByZWFjdC5yZXMocmV0KTtcbiAgICAgICAgfSBlbHNlIHJlYWN0LnJlaih2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGVycil7XG4gICAgICAgIHJlYWN0LnJlaihlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgYXNhcC5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNVbmhhbmRsZWQocmVjb3JkLnApKXtcbiAgICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcmVjb3JkLnApO1xuICAgICAgICAgIH0gZWxzZSBpZihnbG9iYWwuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgICB9KTtcbiAgICB9LCAxKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBpc1VuaGFuZGxlZChwcm9taXNlKXtcbiAgdmFyIHJlY29yZCA9IHByb21pc2VbUkVDT1JEXVxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0O1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0ID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdC5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdC5QKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiAkcmVqZWN0KHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXM7XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICByZWNvcmQudiA9IHZhbHVlO1xuICByZWNvcmQucyA9IDI7XG4gIHJlY29yZC5hID0gcmVjb3JkLmMuc2xpY2UoKTtcbiAgbm90aWZ5KHJlY29yZCwgdHJ1ZSk7XG59XG5mdW5jdGlvbiAkcmVzb2x2ZSh2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgYXNhcC5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7cjogcmVjb3JkLCBkOiBmYWxzZX07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgICAgIHJlY29yZC5zID0gMTtcbiAgICAgIG5vdGlmeShyZWNvcmQsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtyOiByZWNvcmQsIGQ6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufVxuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIHZhciByZWNvcmQgPSB7XG4gICAgICBwOiBzdHJpY3ROZXcodGhpcywgUCwgUFJPTUlTRSksICAgICAgICAgLy8gPC0gcHJvbWlzZVxuICAgICAgYzogW10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgICAgYTogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgICBzOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICAgIGQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBkb25lXG4gICAgICB2OiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgIGg6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBoYW5kbGVkIHJlamVjdGlvblxuICAgICAgbjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICAgIH07XG4gICAgdGhpc1tSRUNPUkRdID0gcmVjb3JkO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYW5PYmplY3QoYW5PYmplY3QodGhpcykuY29uc3RydWN0b3IpW1NQRUNJRVNdO1xuICAgICAgdmFyIHJlYWN0ID0ge1xuICAgICAgICBvazogICB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZSxcbiAgICAgICAgZmFpbDogdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAgPyBvblJlamVjdGVkICA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIHByb21pc2UgPSByZWFjdC5QID0gbmV3IChTICE9IHVuZGVmaW5lZCA/IFMgOiBQKShmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICAgIHJlYWN0LnJlcyA9IGFGdW5jdGlvbihyZXMpO1xuICAgICAgICByZWFjdC5yZWogPSBhRnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gZXhwb3J0XG4kZGVmKCRkZWYuRyArICRkZWYuVyArICRkZWYuRiAqICF1c2VOYXRpdmUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQudGFnJykoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gcmVxdWlyZSgnLi8kLmNvcmUnKVtQUk9NSVNFXSk7XG5cbi8vIHN0YXRpY3NcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXVzZU5hdGl2ZSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzLCByZWopeyByZWoocik7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogKCF1c2VOYXRpdmUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIHJldHVybiBpc1Byb21pc2UoeCkgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpXG4gICAgICA/IHggOiBuZXcgdGhpcyhmdW5jdGlvbihyZXMpeyByZXMoeCk7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISh1c2VOYXRpdmUgJiYgcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gIFAuYWxsKGl0ZXIpWydjYXRjaCddKGZ1bmN0aW9uKCl7fSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgdmFsdWVzID0gW107XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlcyhyZXN1bHRzKTtcbiAgICAgICAgfSwgcmVqKTtcbiAgICAgIH0pO1xuICAgICAgZWxzZSByZXMocmVzdWx0cyk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4ocmVzLCByZWopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pOyIsInZhciAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBTVVBQT1JUX0RFU0MgICA9IHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKVxuICAsICRkZWYgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpXG4gICwgc2V0VGFnICAgICAgICAgPSByZXF1aXJlKCcuLyQudGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuLyQua2V5b2YnKVxuICAsICRuYW1lcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdldC1uYW1lcycpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgZ2V0RGVzYyAgICAgICAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICAgICAgICA9ICQuc2V0RGVzY1xuICAsICRjcmVhdGUgICAgICAgID0gJC5jcmVhdGVcbiAgLCBnZXROYW1lcyAgICAgICA9ICRuYW1lcy5nZXRcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCBzZXR0ZXIgICAgICAgICA9IGZhbHNlXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIGlzRW51bSAgICAgICAgID0gJC5pc0VudW1cbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgdXNlTmF0aXZlICAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3QucHJvdG90eXBlO1xuXG52YXIgc2V0U3ltYm9sRGVzYyA9IFNVUFBPUlRfREVTQyA/IGZ1bmN0aW9uKCl7IC8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZFxuICB0cnkge1xuICAgIHJldHVybiAkY3JlYXRlKHNldERlc2Moe30sIEhJRERFTiwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gc2V0RGVzYyh0aGlzLCBISURERU4sIHt2YWx1ZTogZmFsc2V9KVtISURERU5dO1xuICAgICAgfVxuICAgIH0pKVtISURERU5dIHx8IHNldERlc2M7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICAgICAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gICAgICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gICAgICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICAgICAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG4gICAgfTtcbiAgfVxufSgpIDogc2V0RGVzYztcblxuZnVuY3Rpb24gd3JhcCh0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gJGNyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSk7XG4gIHN5bS5fayA9IHRhZztcbiAgU1VQUE9SVF9ERVNDICYmIHNldHRlciAmJiBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzeW07XG59XG5cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpc2V0RGVzYyhpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9ICRjcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gc2V0RGVzYyhpdCwga2V5LCBEKTtcbn1cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSlkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59XG5mdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gJGNyZWF0ZShpdCkgOiBkZWZpbmVQcm9wZXJ0aWVzKCRjcmVhdGUoaXQpLCBQKTtcbn1cbmZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5KTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XVxuICAgID8gRSA6IHRydWU7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHZhciBEID0gZ2V0RGVzYyhpdCA9IHRvT2JqZWN0KGl0KSwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufVxuZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b09iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTilyZXN1bHQucHVzaChrZXkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIXVzZU5hdGl2ZSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHJldHVybiB3cmFwKHVpZChhcmd1bWVudHNbMF0pKTtcbiAgfTtcbiAgJHJlZGVmKCRTeW1ib2wucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkLmNyZWF0ZSAgICAgPSBjcmVhdGU7XG4gICQuaXNFbnVtICAgICA9IHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICAkLmdldERlc2MgICAgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICQuc2V0RGVzYyAgICA9IGRlZmluZVByb3BlcnR5O1xuICAkLnNldERlc2NzICAgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKFNVUFBPUlRfREVTQyAmJiAhcmVxdWlyZSgnLi8kLmxpYnJhcnknKSl7XG4gICAgJHJlZGVmKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCBwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cbn1cblxudmFyIHN5bWJvbFN0YXRpY3MgPSB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn07XG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2Vcbi8vIDE5LjQuMi4zIFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVcbi8vIDE5LjQuMi40IFN5bWJvbC5pdGVyYXRvclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXG4vLyAxOS40LjIuOCBTeW1ib2wucmVwbGFjZVxuLy8gMTkuNC4yLjkgU3ltYm9sLnNlYXJjaFxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXG4vLyAxOS40LjIuMTEgU3ltYm9sLnNwbGl0XG4vLyAxOS40LjIuMTIgU3ltYm9sLnRvUHJpbWl0aXZlXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXG4vLyAxOS40LjIuMTQgU3ltYm9sLnVuc2NvcGFibGVzXG4kLmVhY2guY2FsbCgoXG4gICAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCwnICtcbiAgICAnc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbiAgKS5zcGxpdCgnLCcpLCBmdW5jdGlvbihpdCl7XG4gICAgdmFyIHN5bSA9IHdrcyhpdCk7XG4gICAgc3ltYm9sU3RhdGljc1tpdF0gPSB1c2VOYXRpdmUgPyBzeW0gOiB3cmFwKHN5bSk7XG4gIH1cbik7XG5cbnNldHRlciA9IHRydWU7XG5cbiRkZWYoJGRlZi5HICsgJGRlZi5XLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbiRkZWYoJGRlZi5TLCAnU3ltYm9sJywgc3ltYm9sU3RhdGljcyk7XG5cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXVzZU5hdGl2ZSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6IGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiBkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6IGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7IiwidmFyIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGhpZGUgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgJHJlZGVmICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgUFJPVE9UWVBFICA9ICdwcm90b3R5cGUnO1xuZnVuY3Rpb24gY3R4KGZuLCB0aGF0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxuJGRlZi5HID0gMjsgIC8vIGdsb2JhbFxuJGRlZi5TID0gNDsgIC8vIHN0YXRpY1xuJGRlZi5QID0gODsgIC8vIHByb3RvXG4kZGVmLkIgPSAxNjsgLy8gYmluZFxuJGRlZi5XID0gMzI7IC8vIHdyYXBcbmZ1bmN0aW9uICRkZWYodHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICA9IGlzR2xvYmFsID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIGlmKGlzR2xvYmFsKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhKHR5cGUgJiAkZGVmLkYpICYmIHRhcmdldCAmJiBrZXkgaW4gdGFyZ2V0O1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGlmKHR5cGUgJiAkZGVmLkIgJiYgb3duKWV4cCA9IGN0eChvdXQsIGdsb2JhbCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQgJiYgIW93bikkcmVkZWYodGFyZ2V0LCBrZXksIG91dCk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSAkZGVmOyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7IiwidmFyIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaGlkZSAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCB0cGwgICAgICAgID0gU3RyaW5nKHt9Lmhhc093blByb3BlcnR5KVxuICAsIFNSQyAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ3NyYycpXG4gICwgX3RvU3RyaW5nICA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiAkcmVkZWYoTywga2V5LCB2YWwsIHNhZmUpe1xuICBpZih0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpe1xuICAgIHZhciBiYXNlID0gT1trZXldO1xuICAgIGhpZGUodmFsLCBTUkMsIGJhc2UgPyBTdHJpbmcoYmFzZSkgOiB0cGwucmVwbGFjZSgvaGFzT3duUHJvcGVydHkvLCBTdHJpbmcoa2V5KSkpO1xuICAgIGlmKCEoJ25hbWUnIGluIHZhbCkpdmFsLm5hbWUgPSBrZXk7XG4gIH1cbiAgaWYoTyA9PT0gZ2xvYmFsKXtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaWYoIXNhZmUpZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfVxufVxuXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9yc1xuLy8gd2l0aCBtZXRob2RzIHNpbWlsYXIgdG8gTG9EYXNoIGlzTmF0aXZlXG4kcmVkZWYoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gaGFzKHRoaXMsIFNSQykgPyB0aGlzW1NSQ10gOiBfdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuXG5yZXF1aXJlKCcuLyQuY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICRyZWRlZjsiLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwZWF0KGNvdW50KXtcbiAgdmFyIHN0ciA9IFN0cmluZyhkZWZpbmVkKHRoaXMpKVxuICAgICwgcmVzID0gJydcbiAgICAsIG4gICA9IHRvSW50ZWdlcihjb3VudCk7XG4gIGlmKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSlpZihuICYgMSlyZXMgKz0gc3RyO1xuICByZXR1cm4gcmVzO1xufTsiLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3Vuc2NvcGFibGVzJyk7XG5pZighKFVOU0NPUEFCTEVTIGluIFtdKSlyZXF1aXJlKCcuLyQuaGlkZScpKEFycmF5LnByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgW11bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIHRlc3QgICAgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcbmlmKHRlc3QgKyAnJyAhPSAnW29iamVjdCB6XScpe1xuICByZXF1aXJlKCcuLyQucmVkZWYnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbiAgfSwgdHJ1ZSk7XG59IiwidmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMTMgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQoY291bnQpXG4gIHJlcGVhdDogcmVxdWlyZSgnLi8kLnN0cmluZy1yZXBlYXQnKVxufSk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIEl0ZXJhdG9ycyAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBOTCAgICAgICAgICA9IGdsb2JhbC5Ob2RlTGlzdFxuICAsIEhUQyAgICAgICAgID0gZ2xvYmFsLkhUTUxDb2xsZWN0aW9uXG4gICwgTkxQcm90byAgICAgPSBOTCAmJiBOTC5wcm90b3R5cGVcbiAgLCBIVENQcm90byAgICA9IEhUQyAmJiBIVEMucHJvdG90eXBlXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7XG5pZihOTCAmJiAhKElURVJBVE9SIGluIE5MUHJvdG8pKWhpZGUoTkxQcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbmlmKEhUQyAmJiAhKElURVJBVE9SIGluIEhUQ1Byb3RvKSloaWRlKEhUQ1Byb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGFycmF5QXBpO1xuXG52YXIgX3R5cGVzQXJyYXlUeXBlID0gcmVxdWlyZShcIi4uL3R5cGVzL2FycmF5LXR5cGVcIik7XG5cbnZhciBfdHlwZXNBcnJheVR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZXNBcnJheVR5cGUpO1xuXG52YXIgX3V0aWxzQ29udHJhY3RzID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnRyYWN0c1wiKTtcblxudmFyIGNvbnRyYWN0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnRyYWN0cyk7XG5cbnZhciBfdXRpbHNGdW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmNcIik7XG5cbnZhciBmdW5jID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzRnVuYyk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbmZ1bmN0aW9uIGdldFN0YXJ0SW5kZXgoaW5kZXgsIGxlbmd0aCkge1xuXHRpZiAoaW5kZXggPCAwKSB7XG5cdFx0cmV0dXJuIE1hdGgubWF4KGxlbmd0aCAtIE1hdGguYWJzKGluZGV4KSwgMCk7XG5cdH1cblxuXHRyZXR1cm4gTWF0aC5taW4oaW5kZXggfHwgMCwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gZ2V0RW5kSW5kZXgoaW5kZXgsIGxlbmd0aCkge1xuXHRpZiAoaW5kZXggPCAwKSB7XG5cdFx0cmV0dXJuIE1hdGgubWF4KGxlbmd0aCArIGluZGV4LCAwKTtcblx0fVxuXG5cdHJldHVybiBNYXRoLm1pbihpbmRleCwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGVuZ3RoKGVudiwgc291cmNlKSB7XG5cdGlmIChzb3VyY2UuaGFzUHJvcGVydHkoXCJsZW5ndGhcIikpIHtcblx0XHRyZXR1cm4gY29udmVydC50b1VJbnQzMihlbnYsIHNvdXJjZS5nZXRQcm9wZXJ0eShcImxlbmd0aFwiKS5nZXRWYWx1ZSgpKTtcblx0fVxuXG5cdHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIGV4ZWN1dGlvbkNvbnRleHQsIGluZGV4KSB7XG5cdHZhciBhcnIgPSBjb252ZXJ0LnRvT2JqZWN0KGV4ZWN1dGlvbkNvbnRleHQuZW52LCBleGVjdXRpb25Db250ZXh0Lm5vZGUpO1xuXHR2YXIgc2NvcGUgPSBleGVjdXRpb25Db250ZXh0LmVudi5jcmVhdGVTY29wZSh0aGlzQXJnIHx8IGV4ZWN1dGlvbkNvbnRleHQuZW52Lmdsb2JhbCk7XG5cdHNjb3BlLmluaXQoY2FsbGJhY2subm9kZS5ib2R5KTtcblxuXHR2YXIgdW5kZWYgPSBleGVjdXRpb25Db250ZXh0LmVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKTtcblx0dmFyIG9iamVjdEZhY3RvcnkgPSBleGVjdXRpb25Db250ZXh0LmVudi5vYmplY3RGYWN0b3J5O1xuXHR2YXIgYXJncyA9IFtleGVjdXRpb25Db250ZXh0Lm5vZGUuZ2V0UHJvcGVydHkoaW5kZXgpLmdldFZhbHVlKCksIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGluZGV4KSwgYXJyXTtcblx0dmFyIGV4ZWN1dGlvblJlc3VsdDtcblxuXHRmdW5jLmxvYWRBcmd1bWVudHMoZXhlY3V0aW9uQ29udGV4dC5lbnYsIGNhbGxiYWNrLm5vZGUucGFyYW1zLCBhcmdzKTtcblxuXHR0cnkge1xuXHRcdGV4ZWN1dGlvblJlc3VsdCA9IGV4ZWN1dGlvbkNvbnRleHQuY3JlYXRlKGNhbGxiYWNrLm5vZGUuYm9keSwgY2FsbGJhY2subm9kZSkuZXhlY3V0ZSgpO1xuXHRcdHJldHVybiBleGVjdXRpb25SZXN1bHQgPyBleGVjdXRpb25SZXN1bHQucmVzdWx0IDogdW5kZWY7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdHRocm93IGVycjtcblx0fVxuXG5cdHNjb3BlLmV4aXRTY29wZSgpO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlQWNjdW11bGF0b3IoY2FsbGJhY2ssIHByaW9yVmFsdWUsIGV4ZWN1dGlvbkNvbnRleHQsIGluZGV4KSB7XG5cdHZhciBhcnIgPSBjb252ZXJ0LnRvT2JqZWN0KGV4ZWN1dGlvbkNvbnRleHQuZW52LCBleGVjdXRpb25Db250ZXh0Lm5vZGUpO1xuXHR2YXIgc2NvcGUgPSBleGVjdXRpb25Db250ZXh0LmVudi5jcmVhdGVTY29wZSgpO1xuXHRzY29wZS5pbml0KGNhbGxiYWNrLm5vZGUuYm9keSk7XG5cblx0dmFyIHVuZGVmID0gZXhlY3V0aW9uQ29udGV4dC5lbnYuZ2xvYmFsLmdldFByb3BlcnR5KFwidW5kZWZpbmVkXCIpLmdldFZhbHVlKCk7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZXhlY3V0aW9uQ29udGV4dC5lbnYub2JqZWN0RmFjdG9yeTtcblx0dmFyIGFyZ3MgPSBbcHJpb3JWYWx1ZSB8fCB1bmRlZiwgZXhlY3V0aW9uQ29udGV4dC5ub2RlLmdldFByb3BlcnR5KGluZGV4KS5nZXRWYWx1ZSgpIHx8IHVuZGVmLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShpbmRleCksIGFycl07XG5cdHZhciBleGVjdXRpb25SZXN1bHQ7XG5cblx0ZnVuYy5sb2FkQXJndW1lbnRzKGV4ZWN1dGlvbkNvbnRleHQuZW52LCBjYWxsYmFjay5ub2RlLnBhcmFtcywgYXJncyk7XG5cblx0dHJ5IHtcblx0XHRleGVjdXRpb25SZXN1bHQgPSBleGVjdXRpb25Db250ZXh0LmNyZWF0ZShjYWxsYmFjay5ub2RlLmJvZHksIGNhbGxiYWNrLm5vZGUpLmV4ZWN1dGUoKTtcblx0XHRyZXR1cm4gZXhlY3V0aW9uUmVzdWx0ID8gZXhlY3V0aW9uUmVzdWx0LnJlc3VsdCA6IHVuZGVmO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHR0aHJvdyBlcnI7XG5cdH1cblxuXHRzY29wZS5leGl0U2NvcGUoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5kZXhQcm9wZXJ0eSh2YWx1ZSkge1xuXHRyZXR1cm4ge1xuXHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogdHJ1ZVxuXHR9O1xufVxuXG5mdW5jdGlvbiBhcnJheUFwaShlbnYpIHtcblx0dmFyIGdsb2JhbE9iamVjdCA9IGVudi5nbG9iYWw7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3Rvcnk7XG5cdHZhciB1bmRlZiA9IGdsb2JhbE9iamVjdC5nZXRQcm9wZXJ0eShcInVuZGVmaW5lZFwiKS5nZXRWYWx1ZSgpO1xuXG5cdHZhciBhcnJheUNsYXNzID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihmdW5jdGlvbiAobGVuZ3RoKSB7XG5cdFx0dmFyIG5ld0FycmF5ID0gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJBcnJheVwiKTtcblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgbGVuZ3RoLnR5cGUgPT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0Y29udHJhY3RzLmFzc2VydElzVmFsaWRBcnJheUxlbmd0aChhcmd1bWVudHNbMF0udmFsdWUpO1xuXHRcdFx0XHRuZXdBcnJheS5wdXRWYWx1ZShcImxlbmd0aFwiLCBsZW5ndGgsIGZhbHNlLCB0aGlzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsbjsgaSsrKSB7XG5cdFx0XHRcdFx0bmV3QXJyYXkuZGVmaW5lT3duUHJvcGVydHkoaSwgY3JlYXRlSW5kZXhQcm9wZXJ0eShhcmd1bWVudHNbaV0pLCBmYWxzZSwgZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBuZXdBcnJheTtcblx0fSwgbnVsbCwgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuXG5cdHZhciBwcm90byA9IGFycmF5Q2xhc3MuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKTtcblx0cHJvdG8uY2xhc3NOYW1lID0gXCJBcnJheVwiO1xuXHRwcm90by5kZWZpbmUoXCJsZW5ndGhcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoMCksIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH0pO1xuXG5cdGFycmF5Q2xhc3MuZGVmaW5lKFwiaXNBcnJheVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKCEhKG9iaiAmJiBvYmouY2xhc3NOYW1lID09PSBcIkFycmF5XCIpKTtcblx0fSwgMSwgXCJBcnJheS5pc0FycmF5XCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJwdXNoXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc3RhcnQgPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLm5vZGUuZGVmaW5lT3duUHJvcGVydHkoc3RhcnQgKyBpLCBjcmVhdGVJbmRleFByb3BlcnR5KGFyZ3VtZW50c1tpXSksIHRydWUsIGVudik7XG5cdFx0fVxuXG5cdFx0dmFyIG5ld0xlbmd0aCA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHN0YXJ0ICsgaSk7XG5cdFx0dGhpcy5ub2RlLnB1dFZhbHVlKFwibGVuZ3RoXCIsIG5ld0xlbmd0aCwgdHJ1ZSk7XG5cdFx0cmV0dXJuIG5ld0xlbmd0aDtcblx0fSwgMSwgXCJBcnJheS5wcm90b3R5cGUucHVzaFwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwicG9wXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgb2JqO1xuXHRcdHZhciBpID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblxuXHRcdGlmIChpID4gMCkge1xuXHRcdFx0aS0tO1xuXG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGkpKSB7XG5cdFx0XHRcdG9iaiA9IHRoaXMubm9kZS5nZXRQcm9wZXJ0eShpKS5nZXRWYWx1ZSgpO1xuXHRcdFx0XHR0aGlzLm5vZGUuZGVsZXRlUHJvcGVydHkoaSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ub2RlLnB1dFZhbHVlKFwibGVuZ3RoXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGkpKTtcblx0XHRyZXR1cm4gb2JqIHx8IHVuZGVmO1xuXHR9LCAwLCBcIkFycmF5LnByb3RvdHlwZS5wb3BcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInNoaWZ0XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgb2JqO1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdHZhciBpID0gMDtcblxuXHRcdGlmIChsZW5ndGggPiAwKSB7XG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGkpKSB7XG5cdFx0XHRcdG9iaiA9IHRoaXMubm9kZS5nZXRQcm9wZXJ0eShpKS5nZXRWYWx1ZSgpO1xuXHRcdFx0XHR0aGlzLm5vZGUuZGVsZXRlUHJvcGVydHkoaSk7XG5cdFx0XHR9XG5cblx0XHRcdHdoaWxlICgrK2kgPCBsZW5ndGgpIHtcblx0XHRcdFx0aWYgKHRoaXMubm9kZS5oYXNQcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdHRoaXMubm9kZS5wdXRWYWx1ZShpIC0gMSwgdGhpcy5ub2RlLmdldFByb3BlcnR5KGkpLmdldFZhbHVlKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMubm9kZS5kZWxldGVQcm9wZXJ0eShpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm5vZGUuZGVsZXRlUHJvcGVydHkobGVuZ3RoIC0gMSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5ub2RlLnB1dFZhbHVlKFwibGVuZ3RoXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGxlbmd0aCA9PT0gMCA/IDAgOiAtLWxlbmd0aCkpO1xuXHRcdHJldHVybiBvYmogfHwgdW5kZWY7XG5cdH0sIDAsIFwiQXJyYXkucHJvdG90eXBlLnNoaWZ0XCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJ1bnNoaWZ0XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblx0XHR2YXIgYXJnQ291bnQgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdHZhciBpID0gbGVuZ3RoO1xuXHRcdHZhciB0bywgZnJvbTtcblxuXHRcdHdoaWxlIChpID4gMCkge1xuXHRcdFx0ZnJvbSA9IGkgLSAxO1xuXHRcdFx0dG8gPSBpICsgYXJnQ291bnQgLSAxO1xuXG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGZyb20pKSB7XG5cdFx0XHRcdHRoaXMubm9kZS5wdXRWYWx1ZSh0bywgdGhpcy5ub2RlLmdldFByb3BlcnR5KGZyb20pLmdldFZhbHVlKCksIHRydWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5ub2RlLmRlbGV0ZVByb3BlcnR5KHRvLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0aS0tO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCBhcmdDb3VudDsgaSsrKSB7XG5cdFx0XHR0aGlzLm5vZGUucHV0VmFsdWUoaSwgYXJndW1lbnRzW2ldLCB0cnVlKTtcblx0XHR9XG5cblx0XHR2YXIgbmV3TGVuZ3RoID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoYXJnQ291bnQgKyBsZW5ndGgpO1xuXHRcdHRoaXMubm9kZS5wdXRWYWx1ZShcImxlbmd0aFwiLCBuZXdMZW5ndGgsIHRydWUpO1xuXHRcdHJldHVybiBuZXdMZW5ndGg7XG5cdH0sIDEsIFwiQXJyYXkucHJvdG90eXBlLnVuc2hpZnRcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInNsaWNlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChiZWdpbiwgZW5kKSB7XG5cdFx0dmFyIHNvdXJjZSA9IHRoaXMubm9kZTtcblx0XHR2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblx0XHRiZWdpbiA9IGJlZ2luID8gY29udmVydC50b0ludGVnZXIoZW52LCBiZWdpbikgOiAwO1xuXG5cdFx0aWYgKCFlbmQgfHwgZW5kLnR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdGVuZCA9IGxlbmd0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZW5kID0gY29udmVydC50b0ludGVnZXIoZW52LCBlbmQpO1xuXHRcdH1cblxuXHRcdHZhciBhcnIgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZShcIkFycmF5XCIpO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRiZWdpbiA9IGdldFN0YXJ0SW5kZXgoYmVnaW4sIGxlbmd0aCk7XG5cdFx0ZW5kID0gZ2V0RW5kSW5kZXgoZW5kLCBsZW5ndGgpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IGJlZ2luOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdGFyci5kZWZpbmVPd25Qcm9wZXJ0eShpbmRleCsrLCBjcmVhdGVJbmRleFByb3BlcnR5KHNvdXJjZS5nZXRQcm9wZXJ0eShpKS5nZXRWYWx1ZSgpKSwgdHJ1ZSwgZW52KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9LCAyLCBcIkFycmF5LnByb3RvdHlwZS5zbGljZVwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwic3BsaWNlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChzdGFydCwgZGVsZXRlQ291bnQpIHtcblx0XHR2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblxuXHRcdHN0YXJ0ID0gY29udmVydC50b0ludGVnZXIoZW52LCBzdGFydCk7XG5cdFx0aWYgKHN0YXJ0IDwgMCkge1xuXHRcdFx0c3RhcnQgPSBNYXRoLm1heChsZW5ndGggKyBzdGFydCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0YXJ0ID0gTWF0aC5taW4oc3RhcnQsIGxlbmd0aCk7XG5cdFx0fVxuXG5cdFx0ZGVsZXRlQ291bnQgPSBjb252ZXJ0LnRvSW50ZWdlcihlbnYsIGRlbGV0ZUNvdW50KTtcblx0XHRpZiAoZGVsZXRlQ291bnQgPCAwKSB7XG5cdFx0XHRkZWxldGVDb3VudCA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZUNvdW50ID0gTWF0aC5taW4oTWF0aC5tYXgoZGVsZXRlQ291bnQsIDApLCBsZW5ndGggLSBzdGFydCk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlbW92ZWQgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZShcIkFycmF5XCIpO1xuXG5cdFx0dmFyIGsgPSAwO1xuXHRcdHdoaWxlIChrIDwgZGVsZXRlQ291bnQpIHtcblx0XHRcdGlmICh0aGlzLm5vZGUuaGFzUHJvcGVydHkoayArIHN0YXJ0KSkge1xuXHRcdFx0XHRyZW1vdmVkLmRlZmluZU93blByb3BlcnR5KGssIGNyZWF0ZUluZGV4UHJvcGVydHkodGhpcy5ub2RlLmdldFByb3BlcnR5KGsgKyBzdGFydCkuZ2V0VmFsdWUoKSksIHRydWUsIGVudik7XG5cdFx0XHR9XG5cblx0XHRcdGsrKztcblx0XHR9XG5cblx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZWxlbWVudHMgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0XHRlbGVtZW50c1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG5cdFx0fVxuXG5cdFx0dmFyIG5ld0NvdW50ID0gZWxlbWVudHMubGVuZ3RoO1xuXHRcdGlmIChuZXdDb3VudCA8IGRlbGV0ZUNvdW50KSB7XG5cdFx0XHRrID0gc3RhcnQ7XG5cblx0XHRcdHdoaWxlIChrIDwgbGVuZ3RoIC0gZGVsZXRlQ291bnQpIHtcblx0XHRcdFx0aWYgKHRoaXMubm9kZS5oYXNQcm9wZXJ0eShrICsgZGVsZXRlQ291bnQpKSB7XG5cdFx0XHRcdFx0dGhpcy5ub2RlLnB1dFZhbHVlKGsgKyBuZXdDb3VudCwgdGhpcy5ub2RlLmdldFByb3BlcnR5KGsgKyBkZWxldGVDb3VudCkuZ2V0VmFsdWUoKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5ub2RlLmRlbGV0ZVByb3BlcnR5KGsgKyBkZWxldGVDb3VudCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrKys7XG5cdFx0XHR9XG5cblx0XHRcdGsgPSBsZW5ndGg7XG5cdFx0XHR3aGlsZSAoayA+IGxlbmd0aCAtIGRlbGV0ZUNvdW50ICsgbmV3Q291bnQpIHtcblx0XHRcdFx0dGhpcy5ub2RlLmRlbGV0ZVByb3BlcnR5KC0tayk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChuZXdDb3VudCA+IGRlbGV0ZUNvdW50KSB7XG5cdFx0XHRrID0gbGVuZ3RoIC0gc3RhcnQ7XG5cdFx0XHR3aGlsZSAoayA+IHN0YXJ0KSB7XG5cdFx0XHRcdGlmICh0aGlzLm5vZGUuaGFzUHJvcGVydHkoayArIGRlbGV0ZUNvdW50IC0gMSkpIHtcblx0XHRcdFx0XHR0aGlzLm5vZGUucHV0VmFsdWUoayArIG5ld0NvdW50IC0gMSwgdGhpcy5ub2RlLmdldFByb3BlcnR5KGsgKyBkZWxldGVDb3VudCAtIDEpLmdldFZhbHVlKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMubm9kZS5kZWxldGVQcm9wZXJ0eShrICsgbmV3Q291bnQgLSAxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGstLTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRrID0gc3RhcnQ7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdGZvciAoOyBpIDwgbmV3Q291bnQ7IGkrKykge1xuXHRcdFx0dGhpcy5ub2RlLnB1dFZhbHVlKGssIGVsZW1lbnRzW2ldKTtcblx0XHRcdGsrKztcblx0XHR9XG5cblx0XHR0aGlzLm5vZGUucHV0VmFsdWUoXCJsZW5ndGhcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobGVuZ3RoIC0gZGVsZXRlQ291bnQgKyBuZXdDb3VudCkpO1xuXHRcdHJldHVybiByZW1vdmVkO1xuXHR9LCAyLCBcIkFycmF5LnByb3RvdHlwZS5zcGxpY2VcIikpO1xuXG5cdHByb3RvLmRlZmluZShcImNvbmNhdFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG5ld0FycmF5ID0gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJBcnJheVwiKTtcblxuXHRcdC8vIGFkZCBcInRoaXNcIiBhcnJheSB0byBidW5jaFxuXG5cdFx0Zm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuXHRcdFx0YXJyYXlzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG5cdFx0fVxuXG5cdFx0YXJyYXlzLnVuc2hpZnQoY29udmVydC50b09iamVjdChlbnYsIHRoaXMubm9kZSkpO1xuXG5cdFx0dmFyIGN1cnJlbnQsXG5cdFx0ICAgIGluZGV4ID0gMCxcblx0XHQgICAgaSxcblx0XHQgICAgbGVuZ3RoO1xuXHRcdHdoaWxlIChhcnJheXMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y3VycmVudCA9IGFycmF5cy5zaGlmdCgpO1xuXG5cdFx0XHRpZiAoY3VycmVudCBpbnN0YW5jZW9mIF90eXBlc0FycmF5VHlwZTJbXCJkZWZhdWx0XCJdKSB7XG5cdFx0XHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnQuZ2V0UHJvcGVydHkoXCJsZW5ndGhcIikuZ2V0VmFsdWUoKS52YWx1ZTsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQuaGFzUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdG5ld0FycmF5LmRlZmluZU93blByb3BlcnR5KGluZGV4LCBjcmVhdGVJbmRleFByb3BlcnR5KGN1cnJlbnQuZ2V0UHJvcGVydHkoaSkuZ2V0VmFsdWUoKSksIHRydWUsIGVudik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3QXJyYXkuZGVmaW5lT3duUHJvcGVydHkoaW5kZXgrKywgY3JlYXRlSW5kZXhQcm9wZXJ0eShjdXJyZW50KSwgdHJ1ZSwgZW52KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRuZXdBcnJheS5wdXRWYWx1ZShcImxlbmd0aFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShpbmRleCksIHRydWUpO1xuXHRcdHJldHVybiBuZXdBcnJheTtcblx0fSwgMSwgXCJBcnJheS5wcm90b3R5cGUuY29uY2F0XCIpKTtcblxuXHRmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdHNlcGFyYXRvciA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgc2VwYXJhdG9yID09PSB1bmRlZiA/IFwiLFwiIDogY29udmVydC50b1ByaW1pdGl2ZShlbnYsIHNlcGFyYXRvciwgXCJzdHJpbmdcIik7XG5cdFx0dmFyIHN0cmluZ1ZhbHVlcyA9IFtdO1xuXHRcdHZhciBzdHJpbmdWYWx1ZTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdHN0cmluZ1ZhbHVlID0gXCJcIjtcblx0XHRcdGlmICh0aGlzLm5vZGUuaGFzUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0c3RyaW5nVmFsdWUgPSB0aGlzLm5vZGUuZ2V0UHJvcGVydHkoaSkuZ2V0VmFsdWUoKTtcblx0XHRcdFx0aWYgKGNvbnRyYWN0cy5pc051bGxPclVuZGVmaW5lZChzdHJpbmdWYWx1ZSkpIHtcblx0XHRcdFx0XHRzdHJpbmdWYWx1ZSA9IFwiXCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc3RyaW5nVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHN0cmluZ1ZhbHVlcy5wdXNoKHN0cmluZ1ZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoc3RyaW5nVmFsdWVzLmpvaW4oc2VwYXJhdG9yKSk7XG5cdH1cblxuXHRwcm90by5kZWZpbmUoXCJqb2luXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGpvaW4sIDEsIFwiQXJyYXkucHJvdG90eXBlLmpvaW5cIikpO1xuXG5cdHByb3RvLmRlZmluZShcImluZGV4T2ZcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCkge1xuXHRcdHNlYXJjaEVsZW1lbnQgPSBzZWFyY2hFbGVtZW50IHx8IHVuZGVmO1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdHZhciBpbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyAwIDogY29udmVydC50b0ludGVnZXIoZW52LCBmcm9tSW5kZXgpO1xuXHRcdHZhciBub3RGb3VuZCA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKC0xKTtcblxuXHRcdGlmIChsZW5ndGggPT09IDAgfHwgaW5kZXggPj0gbGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbm90Rm91bmQ7XG5cdFx0fVxuXG5cdFx0aW5kZXggPSBnZXRTdGFydEluZGV4KGluZGV4LCBsZW5ndGgpO1xuXG5cdFx0Zm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGluZGV4KSAmJiBzZWFyY2hFbGVtZW50LmVxdWFscyh0aGlzLm5vZGUuZ2V0UHJvcGVydHkoaW5kZXgpLmdldFZhbHVlKCkgfHwgdW5kZWYpKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShpbmRleCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vdEZvdW5kO1xuXHR9LCAxLCBcIkFycmF5LnByb3RvdHlwZS5pbmRleE9mXCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJsYXN0SW5kZXhPZlwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KSB7XG5cdFx0c2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQgfHwgdW5kZWY7XG5cdFx0dmFyIGxlbmd0aCA9IGdldExlbmd0aChlbnYsIHRoaXMubm9kZSk7XG5cdFx0dmFyIGluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGxlbmd0aCAtIDEgOiBjb252ZXJ0LnRvSW50ZWdlcihlbnYsIGZyb21JbmRleCk7XG5cblx0XHRpZiAoaW5kZXggPCAwKSB7XG5cdFx0XHRpbmRleCA9IGxlbmd0aCAtIE1hdGguYWJzKGluZGV4KTtcblx0XHR9XG5cblx0XHRmb3IgKDsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuXHRcdFx0aWYgKHRoaXMubm9kZS5oYXNQcm9wZXJ0eShpbmRleCkgJiYgc2VhcmNoRWxlbWVudC5lcXVhbHModGhpcy5ub2RlLmdldFByb3BlcnR5KGluZGV4KS5nZXRWYWx1ZSgpIHx8IHVuZGVmKSkge1xuXHRcdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoaW5kZXgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSgtMSk7XG5cdH0sIDEsIFwiQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mXCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJmb3JFYWNoXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc0Z1bmN0aW9uKGNhbGxiYWNrLCB0aGlzLm5vZGUpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMubm9kZS5oYXNQcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRleGVjdXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIHRoaXMsIGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwgMSwgXCJBcnJheS5wcm90b3R5cGUuZm9yRWFjaFwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwibWFwXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc05vdE51bGxPclVuZGVmaW5lZCh0aGlzLm5vZGUsIFwiQXJyYXkucHJvdG90eXBlLm1hcFwiKTtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNGdW5jdGlvbihjYWxsYmFjaywgdGhpcy5ub2RlKTtcblxuXHRcdHZhciBuZXdBcnJheSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlKFwiQXJyYXlcIik7XG5cdFx0bmV3QXJyYXkucHV0VmFsdWUoXCJsZW5ndGhcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobGVuZ3RoKSk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGkpKSB7XG5cdFx0XHRcdG5ld0FycmF5LmRlZmluZU93blByb3BlcnR5KGksIGNyZWF0ZUluZGV4UHJvcGVydHkoZXhlY3V0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnLCB0aGlzLCBpKSksIHRydWUsIGVudik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ld0FycmF5O1xuXHR9LCAxLCBcIkFycmF5LnByb3RvdHlwZS5tYXBcIikpO1xuXG5cdHByb3RvLmRlZmluZShcImZpbHRlclwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNOb3ROdWxsT3JVbmRlZmluZWQodGhpcy5ub2RlLCBcIkFycmF5LnByb3RvdHlwZS5maWx0ZXJcIik7XG5cdFx0dmFyIGxlbmd0aCA9IGdldExlbmd0aChlbnYsIHRoaXMubm9kZSk7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzRnVuY3Rpb24oY2FsbGJhY2ssIHRoaXMubm9kZSk7XG5cblx0XHR2YXIgbmV3QXJyYXkgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZShcIkFycmF5XCIpO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGkpICYmIGNvbnZlcnQudG9Cb29sZWFuKGV4ZWN1dGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZywgdGhpcywgaSkpKSB7XG5cdFx0XHRcdG5ld0FycmF5LmRlZmluZU93blByb3BlcnR5KGluZGV4KyssIGNyZWF0ZUluZGV4UHJvcGVydHkodGhpcy5ub2RlLmdldFByb3BlcnR5KGkpLmdldFZhbHVlKCkpLCB0cnVlLCBlbnYpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBuZXdBcnJheTtcblx0fSwgMSwgXCJBcnJheS5wcm90b3R5cGUuZmlsdGVyXCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJldmVyeVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNOb3ROdWxsT3JVbmRlZmluZWQodGhpcy5ub2RlLCBcIkFycmF5LnByb3RvdHlwZS5ldmVyeVwiKTtcblx0XHR2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNGdW5jdGlvbihjYWxsYmFjaywgdGhpcy5ub2RlKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLm5vZGUuaGFzUHJvcGVydHkoaSkgJiYgIWNvbnZlcnQudG9Cb29sZWFuKGV4ZWN1dGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZywgdGhpcywgaSkpKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRydWUpO1xuXHR9LCAxLCBcIkFycmF5LnByb3RvdHlwZS5ldmVyeVwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwic29tZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNOb3ROdWxsT3JVbmRlZmluZWQodGhpcy5ub2RlLCBcIkFycmF5LnByb3RvdHlwZS5zb21lXCIpO1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc0Z1bmN0aW9uKGNhbGxiYWNrLCB0aGlzLm5vZGUpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMubm9kZS5oYXNQcm9wZXJ0eShpKSAmJiBjb252ZXJ0LnRvQm9vbGVhbihleGVjdXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIHRoaXMsIGkpKSkge1xuXHRcdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGZhbHNlKTtcblx0fSwgMSwgXCJBcnJheS5wcm90b3R5cGUuc29tZVwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwicmVkdWNlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG5cdFx0dmFyIGxlbmd0aCA9IGdldExlbmd0aChlbnYsIHRoaXMubm9kZSk7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzTm90TnVsbE9yVW5kZWZpbmVkKHRoaXMubm9kZSwgXCJBcnJheS5wcm90b3R5cGUucmVkdWNlXCIpO1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc0Z1bmN0aW9uKGNhbGxiYWNrLCB0aGlzLm5vZGUpO1xuXG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG5cdFx0XHR2YWx1ZSA9IGluaXRpYWxWYWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gbWFrZSBzdXJlIGFycmF5IGlzbid0IGVtcHR5XG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5ndGggJiYgIXRoaXMubm9kZS5oYXNQcm9wZXJ0eShpbmRleCkpIHtcblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGluZGV4ID49IGxlbmd0aCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZVwiKTtcblx0XHRcdH1cblxuXHRcdFx0dmFsdWUgPSB0aGlzLm5vZGUuZ2V0UHJvcGVydHkoaW5kZXgrKykuZ2V0VmFsdWUoKTtcblx0XHR9XG5cblx0XHRmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdGlmICh0aGlzLm5vZGUuaGFzUHJvcGVydHkoaW5kZXgpKSB7XG5cdFx0XHRcdHZhbHVlID0gZXhlY3V0ZUFjY3VtdWxhdG9yKGNhbGxiYWNrLCB2YWx1ZSwgdGhpcywgaW5kZXgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSwgMSwgXCJBcnJheS5wcm90b3R5cGUucmVkdWNlXCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJyZWR1Y2VSaWdodFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCB0aGlzLm5vZGUpO1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc05vdE51bGxPclVuZGVmaW5lZCh0aGlzLm5vZGUsIFwiQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0XCIpO1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc0Z1bmN0aW9uKGNhbGxiYWNrLCB0aGlzLm5vZGUpO1xuXG5cdFx0Ly8gbGVuZ3RoLS07XG5cdFx0dmFyIGFjY3VtdWxhdG9yO1xuXG5cdFx0aWYgKGxlbmd0aCA9PT0gMCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZVwiKTtcblx0XHR9XG5cblx0XHR2YXIgayA9IGxlbmd0aCAtIDE7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuXHRcdFx0YWNjdW11bGF0b3IgPSBpbml0aWFsVmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIG1ha2Ugc3VyZSBhcnJheSBpc24ndCBlbXB0eVxuXHRcdFx0dmFyIGhhc0VsZW1lbnRzID0gZmFsc2U7XG5cdFx0XHR3aGlsZSAoayA+PSAwICYmICFoYXNFbGVtZW50cykge1xuXHRcdFx0XHRoYXNFbGVtZW50cyA9IHRoaXMubm9kZS5oYXNQcm9wZXJ0eShrKTtcblx0XHRcdFx0aWYgKGhhc0VsZW1lbnRzKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3IgPSB0aGlzLm5vZGUuZ2V0UHJvcGVydHkoaykuZ2V0VmFsdWUoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGstLTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFoYXNFbGVtZW50cykge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZVwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR3aGlsZSAoayA+PSAwKSB7XG5cdFx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KGspKSB7XG5cdFx0XHRcdGFjY3VtdWxhdG9yID0gZXhlY3V0ZUFjY3VtdWxhdG9yKGNhbGxiYWNrLCBhY2N1bXVsYXRvciwgdGhpcywgayk7XG5cdFx0XHR9XG5cblx0XHRcdGstLTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XG5cdH0sIDEsIFwiQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0XCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJyZXZlcnNlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblx0XHR2YXIgbWlkZGxlID0gTWF0aC5mbG9vcihsZW5ndGggLyAyKTtcblx0XHR2YXIgbG93ZXIgPSAwO1xuXHRcdHZhciB1cHBlciwgdXBwZXJWYWx1ZSwgbG93ZXJWYWx1ZTtcblxuXHRcdHdoaWxlIChsb3dlciAhPT0gbWlkZGxlKSB7XG5cdFx0XHR1cHBlciA9IGxlbmd0aCAtIGxvd2VyIC0gMTtcblx0XHRcdGxvd2VyVmFsdWUgPSB0aGlzLm5vZGUuaGFzUHJvcGVydHkobG93ZXIpICYmIHRoaXMubm9kZS5nZXRQcm9wZXJ0eShsb3dlcikuZ2V0VmFsdWUoKTtcblx0XHRcdHVwcGVyVmFsdWUgPSB0aGlzLm5vZGUuaGFzUHJvcGVydHkodXBwZXIpICYmIHRoaXMubm9kZS5nZXRQcm9wZXJ0eSh1cHBlcikuZ2V0VmFsdWUoKTtcblxuXHRcdFx0aWYgKHVwcGVyVmFsdWUpIHtcblx0XHRcdFx0dGhpcy5ub2RlLnB1dFZhbHVlKGxvd2VyLCB1cHBlclZhbHVlLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGxvd2VyVmFsdWUpIHtcblx0XHRcdFx0dGhpcy5ub2RlLnB1dFZhbHVlKHVwcGVyLCBsb3dlclZhbHVlLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHVwcGVyVmFsdWUgJiYgIWxvd2VyVmFsdWUpIHtcblx0XHRcdFx0dGhpcy5ub2RlLmRlbGV0ZVByb3BlcnR5KHVwcGVyKTtcblx0XHRcdH0gZWxzZSBpZiAobG93ZXJWYWx1ZSAmJiAhdXBwZXJWYWx1ZSkge1xuXHRcdFx0XHR0aGlzLm5vZGUuZGVsZXRlUHJvcGVydHkobG93ZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRsb3dlcisrO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm5vZGU7XG5cdH0sIDAsIFwiQXJyYXkucHJvdG90eXBlLnJldmVyc2VcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInNvcnRcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKGNvbXBhcmVGdW5jdGlvbikge1xuXHRcdHZhciBleGVjdXRpb25Db250ZXh0ID0gdGhpcztcblx0XHR2YXIgYXJyID0gdGhpcy5ub2RlO1xuXHRcdHZhciBsZW5ndGggPSBnZXRMZW5ndGgoZW52LCBhcnIpO1xuXHRcdHZhciBpID0gMDtcblxuXHRcdHZhciBjb21wYXJlcjtcblx0XHRpZiAoY29udHJhY3RzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikpIHtcblx0XHRcdGNvbXBhcmVyID0gZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVyKGEsIGIpIHtcblx0XHRcdFx0YSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCBhKTtcblx0XHRcdFx0YiA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCBiKTtcblxuXHRcdFx0XHRpZiAoYSA8IGIpIHtcblx0XHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYSA+IGIpIHtcblx0XHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29tcGFyZXIgPSBmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHR2YXIgc2NvcGUgPSBlbnYuY3JlYXRlU2NvcGUodW5kZWYpO1xuXHRcdFx0XHRzY29wZS5pbml0KGNvbXBhcmVGdW5jdGlvbi5ub2RlLmJvZHkpO1xuXG5cdFx0XHRcdGZ1bmMubG9hZEFyZ3VtZW50cyhlbnYsIGNvbXBhcmVGdW5jdGlvbi5ub2RlLnBhcmFtcywgW2EsIGJdKTtcblx0XHRcdFx0dmFyIGV4ZWN1dGlvblJlc3VsdDtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGV4ZWN1dGlvblJlc3VsdCA9IGV4ZWN1dGlvbkNvbnRleHQuY3JlYXRlKGNvbXBhcmVGdW5jdGlvbi5ub2RlLmJvZHksIGNvbXBhcmVGdW5jdGlvbi5ub2RlKS5leGVjdXRlKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdFx0XHRcdHRocm93IGVycjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXG5cdFx0XHRcdGlmIChleGVjdXRpb25SZXN1bHQgJiYgZXhlY3V0aW9uUmVzdWx0LmV4aXQgJiYgZXhlY3V0aW9uUmVzdWx0LnJlc3VsdCkge1xuXHRcdFx0XHRcdHJldHVybiBleGVjdXRpb25SZXN1bHQucmVzdWx0LmdldFZhbHVlKCkudmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRvIGFycmF5LCBydW4gdGhlIHdyYXBwZWQgY29tcGFyZXIsIHRoZW4gcmUtYXNzaWduIGluZGV4ZXNcblx0XHR2YXIgc29ydGVkQXJyYXkgPSBjb252ZXJ0LnRvQXJyYXkoYXJyLCBsZW5ndGgpXG5cdFx0Ly8gdW5kZWZpbmVkIHBvc2l0aW9ucyBhcmUgaGFuZGxlZCBieSB0aGUgdW5kZXJseWluZyBzb3J0IGFsZ29yaXRobSwgc28gcmVwbGFjZSB0aGVtIHdpdGggdGhlIHJhdyBwcmltaXRpdmUgdmFsdWVcblx0XHQubWFwKGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsLmlzUHJpbWl0aXZlICYmIGVsLnZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBlbDtcblx0XHR9KS5zb3J0KGNvbXBhcmVyKTtcblxuXHRcdHdoaWxlIChpIDwgbGVuZ3RoKSB7XG5cdFx0XHRpZiAoaSBpbiBzb3J0ZWRBcnJheSkge1xuXHRcdFx0XHRhcnIucHV0VmFsdWUoaSwgc29ydGVkQXJyYXlbaV0sIGZhbHNlLCBlbnYpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YXJyLmRlbGV0ZVByb3BlcnR5KGksIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0aSsrO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcnI7XG5cdH0sIDEsIFwiQXJyYXkucHJvdG90eXBlLnNvcnRcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInRvTG9jYWxlU3RyaW5nXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGVudiwgdGhpcy5ub2RlKTtcblx0XHR2YXIgYXJyID0gbmV3IEFycmF5KGxlbmd0aCk7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciBjdXJyZW50O1xuXG5cdFx0d2hpbGUgKGkgPCBsZW5ndGgpIHtcblx0XHRcdGlmICh0aGlzLm5vZGUuaGFzUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0Y3VycmVudCA9IHRoaXMubm9kZS5nZXRQcm9wZXJ0eShpKS5nZXRWYWx1ZSgpO1xuXG5cdFx0XHRcdGlmIChjb250cmFjdHMuaXNOdWxsT3JVbmRlZmluZWQoY3VycmVudCkpIHtcblx0XHRcdFx0XHRhcnJbaV0gPSBcIlwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFycltpXSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCBmdW5jLnRyeUNhbGxNZXRob2QoZW52LCBjdXJyZW50LCBcInRvTG9jYWxlU3RyaW5nXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGFyci5qb2luKCkpO1xuXHR9LCAwLCBcIkFycmF5LnByb3RvdHlwZS50b0xvY2FsZVN0cmluZ1wiKSk7XG5cblx0Ly8gdG9kbzogdGhpcyBpcyBhIGJpdCBoYWNreSAtIHRvU3RyaW5nIHdpbGwgY2FsbCBqb2luIGlmIGF2YWlsYWJsZSBwZXIgc3BlYyxcblx0Ly8gYnV0IHdpbGwgY2FsbCBPYmplY3QuLnRvU3RyaW5nIGlmIG5vdFxuXHRwcm90by5kZWZpbmUoXCJ0b1N0cmluZ1wiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihqb2luLCAwLCBcIkFycmF5LnByb3RvdHlwZS50b1N0cmluZ1wiKSk7XG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJBcnJheVwiLCBhcnJheUNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBib29sZWFuQXBpO1xuXG52YXIgX3V0aWxzQ29udHJhY3RzID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnRyYWN0c1wiKTtcblxudmFyIGNvbnRyYWN0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnRyYWN0cyk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbmZ1bmN0aW9uIGJvb2xlYW5BcGkoZW52KSB7XG5cdHZhciBnbG9iYWxPYmplY3QgPSBlbnYuZ2xvYmFsO1xuXHR2YXIgb2JqZWN0RmFjdG9yeSA9IGVudi5vYmplY3RGYWN0b3J5O1xuXHR2YXIgYm9vbGVhbkNsYXNzID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0dmFyIGJvb2xlYW5WYWx1ZSA9IGNvbnZlcnQudG9Cb29sZWFuKG9iaik7XG5cblx0XHQvLyBjYWxsZWQgYXMgbmV3XG5cdFx0aWYgKHRoaXMuaXNOZXcpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0LnByaW1pdGl2ZVRvT2JqZWN0KGVudiwgYm9vbGVhblZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJCb29sZWFuXCIsIGJvb2xlYW5WYWx1ZSk7XG5cdH0sIG51bGwsIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSB9KTtcblxuXHR2YXIgcHJvdG8gPSBib29sZWFuQ2xhc3MuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKTtcblx0cHJvdG8uY2xhc3NOYW1lID0gXCJCb29sZWFuXCI7XG5cdHByb3RvLnZhbHVlID0gZmFsc2U7XG5cblx0cHJvdG8uZGVmaW5lKFwidG9TdHJpbmdcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc05vdEdlbmVyaWModGhpcy5ub2RlLCBcIkJvb2xlYW5cIiwgXCJCb29sZWFuLnByb3RvdHlwZS50b1N0cmluZ1wiKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoU3RyaW5nKHRoaXMubm9kZS52YWx1ZSkpO1xuXHR9LCAwLCBcIkJvb2xlYW4ucHJvdG90eXBlLnRvU3RyaW5nXCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJ2YWx1ZU9mXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNOb3RHZW5lcmljKHRoaXMubm9kZSwgXCJCb29sZWFuXCIsIFwiQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZlwiKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodGhpcy5ub2RlLnZhbHVlKTtcblx0fSwgMCwgXCJCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mXCIpKTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiQm9vbGVhblwiLCBib29sZWFuQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbnNvbGVBcGk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBtZXRob2RzID0gW1wibG9nXCIsIFwiaW5mb1wiLCBcImVycm9yXCJdO1xuXG5mdW5jdGlvbiBjb25zb2xlQXBpKGVudikge1xuXHR2YXIgZ2xvYmFsT2JqZWN0ID0gZW52Lmdsb2JhbDtcblx0dmFyIG9iamVjdEZhY3RvcnkgPSBlbnYub2JqZWN0RmFjdG9yeTtcblx0dmFyIGNvbnNvbGVDbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlT2JqZWN0KCk7XG5cblx0bWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc29sZUNsYXNzLmRlZmluZShuYW1lLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAobWVzc2FnZSkge1xuXHRcdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIG1lc3NhZ2UpO1xuXHRcdFx0Y29uc29sZVtuYW1lXShzdHJpbmdWYWx1ZSk7XG5cdFx0fSwgMSwgXCJjb25zb2xlLlwiICsgbmFtZSkpO1xuXHR9KTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiY29uc29sZVwiLCBjb25zb2xlQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRhdGVBcGk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBzdGF0aWNNZXRob2RzID0gW1wibm93XCJdO1xudmFyIHByb3RvTWV0aG9kcyA9IFtcImdldERhdGVcIiwgXCJnZXREYXlcIiwgXCJnZXRGdWxsWWVhclwiLCBcImdldEhvdXJzXCIsIFwiZ2V0TWlsbGlzZWNvbmRzXCIsIFwiZ2V0TWludXRlc1wiLCBcImdldE1vbnRoXCIsIFwiZ2V0TWlsbGlzZWNvbmRzXCIsIFwiZ2V0TWludXRlc1wiLCBcImdldE1vbnRoXCIsIFwiZ2V0U2Vjb25kc1wiLCBcImdldFRpbWVcIiwgXCJnZXRUaW1lem9uZU9mZnNldFwiLCBcImdldFVUQ0RheVwiLCBcImdldFVUQ0RhdGVcIiwgXCJnZXRVVENGdWxsWWVhclwiLCBcImdldFVUQ0hvdXJzXCIsIFwiZ2V0VVRDTWlsbGlzZWNvbmRzXCIsIFwiZ2V0VVRDTWludXRlc1wiLCBcImdldFVUQ01vbnRoXCIsIFwiZ2V0VVRDU2Vjb25kc1wiLCBcImdldFllYXJcIiwgXCJ0b0RhdGVTdHJpbmdcIiwgXCJ0b0dNVFN0cmluZ1wiLCBcInRvSVNPU3RyaW5nXCIsIFwidG9KU09OXCIsIFwidG9Mb2NhbGVTdHJpbmdcIiwgXCJ0b0xvY2FsZURhdGVTdHJpbmdcIiwgXCJ0b0xvY2FsZVRpbWVTdHJpbmdcIiwgXCJ0b1N0cmluZ1wiLCBcInRvVGltZVN0cmluZ1wiLCBcInRvVVRDU3RyaW5nXCJdO1xudmFyIHNldHRlcnMgPSBbXCJzZXREYXRlXCIsIFwic2V0RnVsbFllYXJcIiwgXCJzZXRIb3Vyc1wiLCBcInNldE1pbGxpc2Vjb25kc1wiLCBcInNldE1pbnV0ZXNcIiwgXCJzZXRNb250aFwiLCBcInNldFNlY29uZHNcIiwgXCJzZXRUaW1lXCIsIFwic2V0VVRDRGF0ZVwiLCBcInNldFVUQ0Z1bGxZZWFyXCIsIFwic2V0VVRDSG91cnNcIiwgXCJzZXRVVENNaWxsaXNlY29uZHNcIiwgXCJzZXRVVENNaW51dGVzXCIsIFwic2V0VVRDTW9udGhcIiwgXCJzZXRVVENTZWNvbmRzXCIsIFwic2V0WWVhclwiXTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuZnVuY3Rpb24gZGF0ZUFwaShlbnYpIHtcblx0dmFyIGdsb2JhbE9iamVjdCA9IGVudi5nbG9iYWw7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3Rvcnk7XG5cblx0dmFyIGRhdGVDbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlRnVuY3Rpb24oZnVuY3Rpb24gKHAxLCBwMiwgcDMsIHA0LCBwNSwgcDYsIHA3KSB7XG5cdFx0dmFyIGRhdGVWYWx1ZSwgYXJncztcblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRhcmdzID0gW107XG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRpZiAocDEuaXNQcmltaXRpdmUpIHtcblx0XHRcdFx0YXJncyA9IFtwMS52YWx1ZV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgcHJpbWl0aXZlVmFsdWUgPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgcDEpO1xuXHRcdFx0XHRpZiAodHlwZW9mIHByaW1pdGl2ZVZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0cHJpbWl0aXZlVmFsdWUgPSBjb252ZXJ0LnRvTnVtYmVyKGVudiwgcDEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXJncyA9IFtwcmltaXRpdmVWYWx1ZV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdFx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhcmcsIFwibnVtYmVyXCIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuaXNOZXcpIHtcblx0XHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdGRhdGVWYWx1ZSA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdGRhdGVWYWx1ZSA9IG5ldyBEYXRlKGFyZ3NbMF0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dmFyIGkgPSBhcmdzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IDcpIHtcblx0XHRcdFx0XHRcdC8vIGRlZmF1bHQgZGF5IHRvIDEsIGFsbCBvdGhlcnMgdG8gMFxuXHRcdFx0XHRcdFx0YXJnc1tpKytdID0gaSA9PT0gMyA/IDEgOiAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRhdGVWYWx1ZSA9IG5ldyBEYXRlKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJEYXRlXCIsIGRhdGVWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0ZGF0ZVZhbHVlID0gRGF0ZS5hcHBseShudWxsLCBhcmdzKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoZGF0ZVZhbHVlKTtcblx0fSwgbnVsbCwgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuXG5cdGRhdGVDbGFzcy5kZWZpbmUoXCJwYXJzZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR2YXIgc3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgdmFsdWUsIFwic3RyaW5nXCIpO1xuXHRcdHZhciBkYXRlVmFsdWUgPSBEYXRlLnBhcnNlKHN0cmluZ1ZhbHVlKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoZGF0ZVZhbHVlKTtcblx0fSwgMSwgXCJEYXRlLnByb3RvdHlwZS5wYXJzZVwiKSk7XG5cblx0ZGF0ZUNsYXNzLmRlZmluZShcIlVUQ1wiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAocDEsIHAyLCBwMywgcDQsIHA1LCBwNiwgcDcpIHtcblx0XHR2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKS5tYXAoZnVuY3Rpb24gKGFyZykge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhcmcsIFwibnVtYmVyXCIpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmdzKSk7XG5cdH0sIDcsIFwiRGF0ZS5wcm90b3R5cGUuVVRDXCIpKTtcblxuXHR2YXIgcHJvdG8gPSBkYXRlQ2xhc3MuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKTtcblx0cHJvdG8uY2xhc3NOYW1lID0gXCJEYXRlXCI7XG5cdHByb3RvLnZhbHVlID0gbmV3IERhdGUoRGF0ZS5wcm90b3R5cGUpO1xuXG5cdHN0YXRpY01ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdGRhdGVDbGFzcy5kZWZpbmUobmFtZSwgY29udmVydC50b05hdGl2ZUZ1bmN0aW9uKGVudiwgRGF0ZVtuYW1lXSwgXCJEYXRlLlwiICsgbmFtZSkpO1xuXHR9KTtcblxuXHRwcm90b01ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdHByb3RvLmRlZmluZShuYW1lLCBjb252ZXJ0LnRvTmF0aXZlRnVuY3Rpb24oZW52LCBEYXRlLnByb3RvdHlwZVtuYW1lXSwgXCJEYXRlLnByb3RvdHlwZS5cIiArIG5hbWUpKTtcblx0fSk7XG5cblx0c2V0dGVycy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0ZnVuY3Rpb24gc2V0dGVyKCkge1xuXHRcdFx0dmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdFx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhcmcpO1xuXHRcdFx0fSk7XG5cdFx0XHREYXRlLnByb3RvdHlwZVtuYW1lXS5hcHBseSh0aGlzLm5vZGUudmFsdWUsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdHByb3RvLmRlZmluZShuYW1lLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihzZXR0ZXIsIERhdGUucHJvdG90eXBlW25hbWVdLmxlbmd0aCwgXCJEYXRlLnByb3RvdHlwZS5cIiArIG5hbWUpKTtcblx0fSk7XG5cblx0cHJvdG8uZGVmaW5lKFwidmFsdWVPZlwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRoaXMubm9kZS52YWx1ZS52YWx1ZU9mKCkpO1xuXHR9LCAwLCBcIkRhdGUucHJvdG90eXBlLnZhbHVlT2ZcIikpO1xuXG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJEYXRlXCIsIGRhdGVDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXJyb3JBcGk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBfdXRpbHNDb250cmFjdHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udHJhY3RzXCIpO1xuXG52YXIgY29udHJhY3RzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udHJhY3RzKTtcblxudmFyIGVycm9yVHlwZXMgPSBbXCJUeXBlRXJyb3JcIiwgXCJSZWZlcmVuY2VFcnJvclwiLCBcIlN5bnRheEVycm9yXCIsIFwiUmFuZ2VFcnJvclwiLCBcIlVSSUVycm9yXCIsIFwiRXZhbEVycm9yXCJdO1xuXG5mdW5jdGlvbiBjcmVhdGVFcnJvcihvYmplY3RGYWN0b3J5LCBtZXNzYWdlLCBuYW1lKSB7XG5cdHZhciBvcHRpb25zID0gbnVsbDtcblx0aWYgKG5hbWUpIHtcblx0XHRvcHRpb25zID0geyBuYW1lOiBuYW1lIH07XG5cdH1cblxuXHR2YXIgb2JqID0gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJFcnJvclwiLCBvcHRpb25zKTtcblxuXHRpZiAoIWNvbnRyYWN0cy5pc051bGxPclVuZGVmaW5lZChtZXNzYWdlKSkge1xuXHRcdG9iai5kZWZpbmVPd25Qcm9wZXJ0eShcIm1lc3NhZ2VcIiwgeyB2YWx1ZTogbWVzc2FnZSwgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfSwgZmFsc2UpO1xuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZXJyb3JBcGkoZW52KSB7XG5cdHZhciBnbG9iYWxPYmplY3QgPSBlbnYuZ2xvYmFsO1xuXHR2YXIgb2JqZWN0RmFjdG9yeSA9IGVudi5vYmplY3RGYWN0b3J5O1xuXHR2YXIgZXJyb3JDbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlRnVuY3Rpb24oZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0XHRyZXR1cm4gY3JlYXRlRXJyb3Iob2JqZWN0RmFjdG9yeSwgbWVzc2FnZSk7XG5cdH0sIG51bGwsIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSB9KTtcblxuXHR2YXIgcHJvdG8gPSBlcnJvckNsYXNzLmdldFByb3BlcnR5KFwicHJvdG90eXBlXCIpLmdldFZhbHVlKCk7XG5cdHByb3RvLmNsYXNzTmFtZSA9IFwiRXJyb3JcIjtcblx0cHJvdG8uZGVmaW5lKFwibmFtZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShcIkVycm9yXCIpKTtcblx0cHJvdG8uZGVmaW5lKFwibWVzc2FnZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShcIlwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwidG9TdHJpbmdcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuXHRcdHZhciBuYW1lID0gdGhpcy5ub2RlLmdldFByb3BlcnR5KFwibmFtZVwiKS5nZXRWYWx1ZSgpO1xuXHRcdHZhciBtc2c7XG5cblx0XHRpZiAodGhpcy5ub2RlLmhhc1Byb3BlcnR5KFwibWVzc2FnZVwiKSkge1xuXHRcdFx0bXNnID0gY29udmVydC50b1N0cmluZyhlbnYsIHRoaXMubm9kZS5nZXRQcm9wZXJ0eShcIm1lc3NhZ2VcIikuZ2V0VmFsdWUoKSk7XG5cdFx0fVxuXG5cdFx0bmFtZSA9IG5hbWUgJiYgY29udmVydC50b1N0cmluZyhlbnYsIG5hbWUpO1xuXHRcdGlmIChuYW1lICYmIG1zZykge1xuXHRcdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlKFwiU3RyaW5nXCIsIG5hbWUgKyBcIjogXCIgKyBtc2cpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZShcIlN0cmluZ1wiLCBuYW1lIHx8IG1zZyk7XG5cdH0sIDAsIFwiRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nXCIpKTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiRXJyb3JcIiwgZXJyb3JDbGFzcyk7XG5cblx0ZXJyb3JUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG5cdFx0dmFyIGVyckNsYXNzID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihmdW5jdGlvbiAobWVzc2FnZSkge1xuXHRcdFx0cmV0dXJuIGNyZWF0ZUVycm9yKG9iamVjdEZhY3RvcnksIG1lc3NhZ2UsIHR5cGUpO1xuXHRcdH0sIG51bGwsIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSB9KTtcblxuXHRcdHZhciB0eXBlUHJvdG8gPSBlcnJDbGFzcy5nZXRQcm9wZXJ0eShcInByb3RvdHlwZVwiKS5nZXRWYWx1ZSgpO1xuXHRcdHR5cGVQcm90by5kZWZpbmUoXCJuYW1lXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHR5cGUpKTtcblxuXHRcdC8vIGFkZCB0byBwcm90b3R5cGUgY2hhaW4gdG8gcmVwcmVzZW50IGluaGVyaXRhbmNlXG5cdFx0dHlwZVByb3RvLnNldFByb3RvdHlwZShwcm90byk7XG5cblx0XHRnbG9iYWxPYmplY3QuZGVmaW5lKHR5cGUsIGVyckNsYXNzKTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb25BcGk7XG5cbnZhciBfdHlwZXNOYXRpdmVGdW5jdGlvblR5cGUgPSByZXF1aXJlKFwiLi4vdHlwZXMvbmF0aXZlLWZ1bmN0aW9uLXR5cGVcIik7XG5cbnZhciBfdHlwZXNOYXRpdmVGdW5jdGlvblR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZXNOYXRpdmVGdW5jdGlvblR5cGUpO1xuXG52YXIgX3V0aWxzQ29udHJhY3RzID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnRyYWN0c1wiKTtcblxudmFyIGNvbnRyYWN0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnRyYWN0cyk7XG5cbnZhciBfdXRpbHNGdW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmNcIik7XG5cbnZhciBmdW5jID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzRnVuYyk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbmZ1bmN0aW9uIGRlZmluZVRoaXMoZW52LCBmbiwgdGhpc0FyZykge1xuXHRpZiAoZm4uYnVpbHRJbikge1xuXHRcdHJldHVybiB0aGlzQXJnIHx8IGVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKTtcblx0fVxuXG5cdGlmIChjb250cmFjdHMuaXNOdWxsT3JVbmRlZmluZWQodGhpc0FyZykpIHtcblx0XHRyZXR1cm4gZW52Lmdsb2JhbDtcblx0fVxuXG5cdHJldHVybiBjb252ZXJ0LnRvT2JqZWN0KGVudiwgdGhpc0FyZyk7XG59XG5cbnZhciBmcm96ZW4gPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UgfTtcblxuZnVuY3Rpb24gZnVuY3Rpb25BcGkoZW52LCBvcHRpb25zKSB7XG5cdHZhciBnbG9iYWxPYmplY3QgPSBlbnYuZ2xvYmFsO1xuXHR2YXIgdW5kZWYgPSBlbnYuZ2xvYmFsLmdldFByb3BlcnR5KFwidW5kZWZpbmVkXCIpLmdldFZhbHVlKCk7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3Rvcnk7XG5cdHZhciBmdW5jQ2xhc3M7XG5cblx0dmFyIGZ1bmNDdG9yID0gZnVuY3Rpb24gZnVuY0N0b3IoKSB7XG5cdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdFx0fVxuXG5cdFx0dmFyIGZ1bmNJbnN0YW5jZTtcblxuXHRcdGlmIChvcHRpb25zLnBhcnNlciAmJiBhcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBmbjtcblx0XHRcdHZhciB3cmFwcGVkRnVuYztcblxuXHRcdFx0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIGJvZHkgPSBhcmdzLnBvcCgpO1xuXG5cdFx0XHRcdGlmIChhcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRhcmdzID0gYXJncy5tYXAoZnVuY3Rpb24gKGFyZywgaW5kZXgpIHtcblx0XHRcdFx0XHRcdGlmIChjb250cmFjdHMuaXNOdWxsKGFyZykpIHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVW5leHBlY3RlZCB0b2tlbiBudWxsXCIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29udHJhY3RzLmlzVW5kZWZpbmVkKGFyZykgPyBcIlwiIDogY29udmVydC50b1N0cmluZyhlbnYsIGFyZyk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQvLyB0aGUgc3BlYyBhbGxvd3MgcGFyYW1ldGVycyB0byBiZSBjb21tYS1kZWxpbWl0ZWQsIHNvIHdlIHdpbGwgam9pbiBhbmQgc3BsaXQgYWdhaW4gY29tbWFcblx0XHRcdFx0XHQuam9pbihcIixcIikuc3BsaXQoL1xccyosXFxzKi9nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBhc3QgPSBvcHRpb25zLnBhcnNlcihcIihmdW5jdGlvbigpe1wiICsgY29udmVydC50b1N0cmluZyhlbnYsIGJvZHkpICsgXCJ9KS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XCIpO1xuXHRcdFx0XHR2YXIgcGFyYW1zID0gYXJncy5tYXAoZnVuY3Rpb24gKGFyZykge1xuXHRcdFx0XHRcdGFyZyA9IGFyZy50cmltKCk7XG5cdFx0XHRcdFx0Y29udHJhY3RzLmFzc2VydElzVmFsaWRQYXJhbWV0ZXJOYW1lKGFyZyk7XG5cblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJJZGVudGlmaWVyXCIsXG5cdFx0XHRcdFx0XHRuYW1lOiBhcmdcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgY2FsbGVlID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiRnVuY3Rpb25EZWNsYXJhdGlvblwiLFxuXHRcdFx0XHRcdHBhcmFtczogcGFyYW1zLFxuXHRcdFx0XHRcdGJvZHk6IGFzdFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGZuID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihjYWxsZWUpO1xuXG5cdFx0XHRcdHdyYXBwZWRGdW5jID0gZnVuY3Rpb24gd3JhcHBlZEZ1bmMoKSB7XG5cdFx0XHRcdFx0dmFyIHRoaXNBcmcgPSB0aGlzLm5vZGUgfHwgZ2xvYmFsT2JqZWN0O1xuXHRcdFx0XHRcdGlmICh0aGlzLmlzTmV3KSB7XG5cdFx0XHRcdFx0XHR0aGlzQXJnID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVPYmplY3QoZnVuY0luc3RhbmNlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgZXhlY3V0aW9uUmVzdWx0ID0gZnVuYy5nZXRGdW5jdGlvblJlc3VsdChlbnYsIGZuLCBwYXJhbXMsIGFyZ3VtZW50cywgdGhpc0FyZywgY2FsbGVlKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmlzTmV3KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc0FyZztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gZXhlY3V0aW9uUmVzdWx0ICYmIGV4ZWN1dGlvblJlc3VsdC5yZXN1bHQgfHwgdW5kZWY7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0d3JhcHBlZEZ1bmMubmF0aXZlTGVuZ3RoID0gY2FsbGVlLnBhcmFtcy5sZW5ndGg7XG5cdFx0XHRcdGZ1bmNJbnN0YW5jZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlRnVuY3Rpb24od3JhcHBlZEZ1bmMpO1xuXHRcdFx0XHRmdW5jSW5zdGFuY2UuYmluZFNjb3BlKGVudi5nbG9iYWxTY29wZSk7XG5cdFx0XHR9KSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmdW5jSW5zdGFuY2UgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZUZ1bmN0aW9uKGZ1bmN0aW9uICgpIHt9KTtcblx0XHR9XG5cblx0XHRmdW5jSW5zdGFuY2UucHV0VmFsdWUoXCJjb25zdHJ1Y3RvclwiLCBmdW5jQ2xhc3MpO1xuXHRcdHJldHVybiBmdW5jSW5zdGFuY2U7XG5cdH07XG5cblx0Ly8gdGhlIHByb3RvdHlwZSBvZiBhIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGNhbGxhYmxlIGFuZCBldmFsdWF0ZXMgYXMgYSBmdW5jdGlvblxuXHR2YXIgcHJvdG8gPSBuZXcgX3R5cGVzTmF0aXZlRnVuY3Rpb25UeXBlMltcImRlZmF1bHRcIl0oZnVuY3Rpb24gKCkge30pO1xuXG5cdGZ1bmNDdG9yLm5hdGl2ZUxlbmd0aCA9IDE7XG5cdGZ1bmNDbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlRnVuY3Rpb24oZnVuY0N0b3IsIHByb3RvLCBmcm96ZW4pO1xuXHRmdW5jQ2xhc3MucHV0VmFsdWUoXCJjb25zdHJ1Y3RvclwiLCBmdW5jQ2xhc3MpO1xuXG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJGdW5jdGlvblwiLCBmdW5jQ2xhc3MpO1xuXG5cdHByb3RvLmRlZmluZShcImxlbmd0aFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSgwKSwgZnJvemVuKTtcblxuXHQvLyBmdW5jdGlvbiBpdHNlbGYgaXMgYSBmdW5jdGlvblxuXHRmdW5jQ2xhc3Muc2V0UHJvdG90eXBlKHByb3RvKTtcblxuXHRwcm90by5kZWZpbmUoXCJ0b1N0cmluZ1wiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMubm9kZS5uYXRpdmUpIHtcblx0XHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShcImZ1bmN0aW9uICgpIHsgW25hdGl2ZSBjb2RlXSB9XCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShcImZ1bmN0aW9uICgpIHsgW3VzZXIgY29kZV0gfVwiKTtcblx0fSwgMCwgXCJGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmdcIikpO1xuXG5cdHByb3RvLmRlZmluZShcImNhbGxcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHRoaXNBcmcpIHtcblx0XHR2YXIgcGFyYW1zID0gdGhpcy5ub2RlLm5hdGl2ZSA/IFtdIDogdGhpcy5ub2RlLm5vZGUucGFyYW1zO1xuXHRcdHZhciBjYWxsZWUgPSB0aGlzLm5vZGUubmF0aXZlID8gdGhpcy5ub2RlIDogdGhpcy5ub2RlLm5vZGU7XG5cdFx0dGhpc0FyZyA9IGRlZmluZVRoaXMoZW52LCB0aGlzLm5vZGUsIHRoaXNBcmcpO1xuXHRcdHRoaXMubm9kZS5iaW5kVGhpcyh0aGlzQXJnKTtcblxuXHRcdGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcblx0XHRcdGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZ1bmMuZXhlY3V0ZUZ1bmN0aW9uKGVudiwgdGhpcy5ub2RlLCBwYXJhbXMsIGFyZ3MsIHRoaXNBcmcsIGNhbGxlZSk7XG5cdH0sIDEsIFwiRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcIikpO1xuXG5cdHByb3RvLmRlZmluZShcImFwcGx5XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICh0aGlzQXJnLCBhcmdzQXJyYXkpIHtcblx0XHRpZiAoYXJnc0FycmF5KSB7XG5cdFx0XHRpZiAoYXJnc0FycmF5LmNsYXNzTmFtZSAhPT0gXCJBcmd1bWVudHNcIiAmJiBhcmdzQXJyYXkuY2xhc3NOYW1lICE9PSBcIkFycmF5XCIpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50cyBsaXN0IHdhcyB3cm9uZyB0eXBlXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBhcmdzID0gY29udmVydC50b0FycmF5KGFyZ3NBcnJheSk7XG5cdFx0dmFyIHBhcmFtcyA9IHRoaXMubm9kZS5uYXRpdmUgPyBbXSA6IHRoaXMubm9kZS5ub2RlLnBhcmFtcztcblx0XHR2YXIgY2FsbGVlID0gdGhpcy5ub2RlLm5hdGl2ZSA/IHRoaXMubm9kZSA6IHRoaXMubm9kZS5ub2RlO1xuXHRcdHRoaXNBcmcgPSBkZWZpbmVUaGlzKGVudiwgdGhpcy5ub2RlLCB0aGlzQXJnKTtcblx0XHR0aGlzLm5vZGUuYmluZFRoaXModGhpc0FyZyk7XG5cblx0XHRyZXR1cm4gZnVuYy5leGVjdXRlRnVuY3Rpb24oZW52LCB0aGlzLm5vZGUsIHBhcmFtcywgYXJncywgdGhpc0FyZywgY2FsbGVlKTtcblx0fSwgMiwgXCJGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlcIikpO1xuXG5cdHByb3RvLmRlZmluZShcImJpbmRcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHRoaXNBcmcpIHtcblx0XHRmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG5cdFx0XHRhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuXHRcdH1cblxuXHRcdHZhciBmbiA9IHRoaXMubm9kZTtcblx0XHR2YXIgcGFyYW1zID0gZm4ubmF0aXZlID8gW10gOiBmbi5ub2RlLnBhcmFtcztcblx0XHR2YXIgY2FsbGVlID0gZm4ubmF0aXZlID8gZm4gOiBmbi5ub2RlO1xuXHRcdHRoaXNBcmcgPSBkZWZpbmVUaGlzKGVudiwgdGhpcy5ub2RlLCB0aGlzQXJnKTtcblxuXHRcdHZhciB0aHJvd2VyID0gZnVuY3Rpb24gdGhyb3dlcigpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCInY2FsbGVyJywgJ2NhbGxlZScsIGFuZCAnYXJndW1lbnRzJyBwcm9wZXJ0aWVzIG1heSBub3QgYmUgYWNjZXNzZWQgb24gc3RyaWN0IG1vZGUgZnVuY3Rpb25zIG9yIHRoZSBhcmd1bWVudHMgb2JqZWN0cyBmb3IgY2FsbHMgdG8gdGhlbVwiKTtcblx0XHR9O1xuXHRcdHZhciB0aHJvd1Byb3BlcnRpZXMgPSB7XG5cdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdGdldHRlcjogdGhyb3dlcixcblx0XHRcdHNldDogdW5kZWZpbmVkLFxuXHRcdFx0c2V0dGVyOiB0aHJvd2VyLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdFx0fTtcblxuXHRcdHZhciBuYXRpdmVGdW5jID0gZnVuY3Rpb24gbmF0aXZlRnVuYygpIHtcblx0XHRcdGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYWRkaXRpb25BcmdzID0gQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcblx0XHRcdFx0YWRkaXRpb25BcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG5cdFx0XHR9XG5cblx0XHRcdHZhciBtZXJnZWRBcmdzID0gYXJncy5jb25jYXQoYWRkaXRpb25BcmdzKTtcblx0XHRcdHJldHVybiBmdW5jLmV4ZWN1dGVGdW5jdGlvbihlbnYsIGZuLCBwYXJhbXMsIG1lcmdlZEFyZ3MsIHRoaXNBcmcsIGNhbGxlZSwgdGhpcy5pc05ldyk7XG5cdFx0fTtcblxuXHRcdG5hdGl2ZUZ1bmMubmF0aXZlTGVuZ3RoID0gTWF0aC5tYXgocGFyYW1zLmxlbmd0aCAtIGFyZ3MubGVuZ3RoLCAwKTtcblx0XHR2YXIgYm91bmRGdW5jID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihuYXRpdmVGdW5jKTtcblxuXHRcdGJvdW5kRnVuYy5kZWZpbmVPd25Qcm9wZXJ0eShcImNhbGxlclwiLCB0aHJvd1Byb3BlcnRpZXMpO1xuXHRcdGJvdW5kRnVuYy5kZWZpbmVPd25Qcm9wZXJ0eShcImFyZ3VtZW50c1wiLCB0aHJvd1Byb3BlcnRpZXMpO1xuXHRcdGJvdW5kRnVuYy5kZWZpbmVPd25Qcm9wZXJ0eShcImNhbGxlZVwiLCB0aHJvd1Byb3BlcnRpZXMpO1xuXHRcdGJvdW5kRnVuYy5iaW5kU2NvcGUodGhpcy5lbnYuY3VycmVudCk7XG5cdFx0Ym91bmRGdW5jLmJpbmRUaGlzKHRoaXNBcmcpO1xuXG5cdFx0cmV0dXJuIGJvdW5kRnVuYztcblx0fSwgMSwgXCJGdW5jdGlvbi5wcm90b3R5cGUuYmluZFwiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZWNtYTUxO1xuXG52YXIgX3R5cGVzUHJpbWl0aXZlVHlwZSA9IHJlcXVpcmUoXCIuLi90eXBlcy9wcmltaXRpdmUtdHlwZVwiKTtcblxudmFyIF90eXBlc1ByaW1pdGl2ZVR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZXNQcmltaXRpdmVUeXBlKTtcblxudmFyIF90eXBlc09iamVjdEZhY3RvcnkgPSByZXF1aXJlKFwiLi4vdHlwZXMvb2JqZWN0LWZhY3RvcnlcIik7XG5cbnZhciBfdHlwZXNPYmplY3RGYWN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVzT2JqZWN0RmFjdG9yeSk7XG5cbnZhciBfZW52UmVmZXJlbmNlID0gcmVxdWlyZShcIi4uL2Vudi9yZWZlcmVuY2VcIik7XG5cbnZhciBfZW52UmVmZXJlbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudlJlZmVyZW5jZSk7XG5cbnZhciBfbnVtYmVyQXBpID0gcmVxdWlyZShcIi4vbnVtYmVyLWFwaVwiKTtcblxudmFyIF9udW1iZXJBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbnVtYmVyQXBpKTtcblxudmFyIF9zdHJpbmdBcGkgPSByZXF1aXJlKFwiLi9zdHJpbmctYXBpXCIpO1xuXG52YXIgX3N0cmluZ0FwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHJpbmdBcGkpO1xuXG52YXIgX2Z1bmN0aW9uQXBpID0gcmVxdWlyZShcIi4vZnVuY3Rpb24tYXBpXCIpO1xuXG52YXIgX2Z1bmN0aW9uQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Z1bmN0aW9uQXBpKTtcblxudmFyIF9vYmplY3RBcGkgPSByZXF1aXJlKFwiLi9vYmplY3QtYXBpXCIpO1xuXG52YXIgX29iamVjdEFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RBcGkpO1xuXG52YXIgX2Jvb2xlYW5BcGkgPSByZXF1aXJlKFwiLi9ib29sZWFuLWFwaVwiKTtcblxudmFyIF9ib29sZWFuQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Jvb2xlYW5BcGkpO1xuXG52YXIgX2RhdGVBcGkgPSByZXF1aXJlKFwiLi9kYXRlLWFwaVwiKTtcblxudmFyIF9kYXRlQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RhdGVBcGkpO1xuXG52YXIgX2FycmF5QXBpID0gcmVxdWlyZShcIi4vYXJyYXktYXBpXCIpO1xuXG52YXIgX2FycmF5QXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FycmF5QXBpKTtcblxudmFyIF9tYXRoQXBpID0gcmVxdWlyZShcIi4vbWF0aC1hcGlcIik7XG5cbnZhciBfbWF0aEFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXRoQXBpKTtcblxudmFyIF9yZWdleEFwaSA9IHJlcXVpcmUoXCIuL3JlZ2V4LWFwaVwiKTtcblxudmFyIF9yZWdleEFwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWdleEFwaSk7XG5cbnZhciBfZXJyb3JBcGkgPSByZXF1aXJlKFwiLi9lcnJvci1hcGlcIik7XG5cbnZhciBfZXJyb3JBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXJyb3JBcGkpO1xuXG52YXIgX2pzb25BcGkgPSByZXF1aXJlKFwiLi9qc29uLWFwaVwiKTtcblxudmFyIF9qc29uQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pzb25BcGkpO1xuXG52YXIgX2NvbnNvbGVBcGkgPSByZXF1aXJlKFwiLi9jb25zb2xlLWFwaVwiKTtcblxudmFyIF9jb25zb2xlQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnNvbGVBcGkpO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgZnJvemVuID0geyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH07XG5cbmZ1bmN0aW9uIGVjbWE1MShlbnYpIHtcblx0dmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3RvcnkgPSBuZXcgX3R5cGVzT2JqZWN0RmFjdG9yeTJbXCJkZWZhdWx0XCJdKGVudik7XG5cdHZhciBnbG9iYWxPYmplY3QgPSBlbnYuZ2xvYmFsID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVPYmplY3QoKTtcblxuXHRlbnYuY3JlYXRlT2JqZWN0U2NvcGUoZ2xvYmFsT2JqZWN0KTtcblxuXHR2YXIgdW5kZWZpbmVkQ2xhc3MgPSBuZXcgX3R5cGVzUHJpbWl0aXZlVHlwZTJbXCJkZWZhdWx0XCJdKCk7XG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJ1bmRlZmluZWRcIiwgdW5kZWZpbmVkQ2xhc3MsIGZyb3plbik7XG5cblx0dmFyIG51bGxDbGFzcyA9IG5ldyBfdHlwZXNQcmltaXRpdmVUeXBlMltcImRlZmF1bHRcIl0obnVsbCk7XG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJudWxsXCIsIG51bGxDbGFzcywgZnJvemVuKTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiSW5maW5pdHlcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoSW5maW5pdHkpLCBmcm96ZW4pO1xuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiTmFOXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKE5hTiksIGZyb3plbik7XG5cblx0Ly8gdG9kbzogbm9kZSB2cyBicm93c2VyIC0gZG8gd2UgY2FyZT9cblx0Z2xvYmFsT2JqZWN0LmRlZmluZShcIndpbmRvd1wiLCBnbG9iYWxPYmplY3QsIGZyb3plbik7XG5cblx0KDAsIF9mdW5jdGlvbkFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfb2JqZWN0QXBpMltcImRlZmF1bHRcIl0pKGVudiwgY29uZmlnKTtcblx0KDAsIF9hcnJheUFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfYm9vbGVhbkFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfbnVtYmVyQXBpMltcImRlZmF1bHRcIl0pKGVudiwgY29uZmlnKTtcblx0KDAsIF9zdHJpbmdBcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX2RhdGVBcGkyW1wiZGVmYXVsdFwiXSkoZW52LCBjb25maWcpO1xuXHQoMCwgX3JlZ2V4QXBpMltcImRlZmF1bHRcIl0pKGVudiwgY29uZmlnKTtcblx0KDAsIF9tYXRoQXBpMltcImRlZmF1bHRcIl0pKGVudiwgY29uZmlnKTtcblx0KDAsIF9lcnJvckFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfanNvbkFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cdCgwLCBfY29uc29sZUFwaTJbXCJkZWZhdWx0XCJdKShlbnYsIGNvbmZpZyk7XG5cblx0W1wicGFyc2VGbG9hdFwiLCBcImRlY29kZVVSSVwiLCBcImVuY29kZVVSSVwiLCBcImRlY29kZVVSSUNvbXBvbmVudFwiLCBcImVuY29kZVVSSUNvbXBvbmVudFwiLCBcImVzY2FwZVwiLCBcInVuZXNjYXBlXCJdLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRnbG9iYWxPYmplY3QuZGVmaW5lKG5hbWUsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIHZhbHVlKTtcblx0XHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShnbG9iYWxbbmFtZV0oc3RyaW5nVmFsdWUpKTtcblx0XHR9LCAxLCBuYW1lKSk7XG5cdH0pO1xuXG5cdFtcImlzTmFOXCIsIFwiaXNGaW5pdGVcIl0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdGdsb2JhbE9iamVjdC5kZWZpbmUobmFtZSwgY29udmVydC50b05hdGl2ZUZ1bmN0aW9uKGVudiwgZ2xvYmFsW25hbWVdLCBuYW1lKSk7XG5cdH0pO1xuXG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJwYXJzZUludFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAodmFsdWUsIHJhZGl4KSB7XG5cdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIHZhbHVlKTtcblx0XHRyYWRpeCA9IGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCByYWRpeCwgXCJudW1iZXJcIik7XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUocGFyc2VJbnQoc3RyaW5nVmFsdWUsIHJhZGl4KSk7XG5cdH0sIDIsIFwicGFyc2VJbnRcIikpO1xuXG5cdGlmIChjb25maWcucGFyc2VyKSB7XG5cdFx0dmFyIGV2YWxGdW5jID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKGNvZGUpIHtcblx0XHRcdGlmICghY29kZSkge1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkQ2xhc3M7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb2RlLnR5cGUgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0cmV0dXJuIGNvZGU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkaXJlY3RDYWxsID0gdGhpcy5jYWxsZWUgaW5zdGFuY2VvZiBfZW52UmVmZXJlbmNlMltcImRlZmF1bHRcIl0gJiYgdGhpcy5jYWxsZWUuYmFzZSA9PT0gZ2xvYmFsT2JqZWN0O1xuXHRcdFx0dmFyIGFzdDtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXN0ID0gY29uZmlnLnBhcnNlcihjb2RlLnZhbHVlKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAoZXJyIGluc3RhbmNlb2YgU3ludGF4RXJyb3IgJiYgL2Fzc2lnbmluZyB0byBydmFsdWUvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuXHRcdFx0XHRcdC8vIGhhY2sgYmVjYXVzZSBhY29ybiB0aHJvd3Mgc3ludGF4IGVycm9yXG5cdFx0XHRcdFx0dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiSW52YWxpZCBsZWZ0LWhhbmQgc2lkZSBpbiBhc3NpZ25tZW50XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB1c2UgdGhlIHNhbWUgc2NvcGUgdW5sZXNzIHRoaXMgaXMgYW4gXCJpbmRpcmVjdFwiIGNhbGxcblx0XHRcdC8vIGluIHdoaWNoIGNhc2Ugd2UgdXNlIHRoZSBnbG9iYWwgc2NvcGVcblx0XHRcdHZhciBzY29wZSA9IGVudi5zZXRTY29wZShkaXJlY3RDYWxsID8gZW52LmN1cnJlbnQucGFyZW50IDogZW52Lmdsb2JhbFNjb3BlKTtcblx0XHRcdHZhciBleGVjdXRpb25SZXN1bHQ7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGV4ZWN1dGlvblJlc3VsdCA9IHRoaXMuY3JlYXRlKGFzdCkuZXhlY3V0ZSgpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHR9XG5cblx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdFx0cmV0dXJuIGV4ZWN1dGlvblJlc3VsdCAmJiBleGVjdXRpb25SZXN1bHQucmVzdWx0ID8gZXhlY3V0aW9uUmVzdWx0LnJlc3VsdC5nZXRWYWx1ZSgpIDogdW5kZWZpbmVkQ2xhc3M7XG5cdFx0fSwgMSwgXCJldmFsXCIpO1xuXG5cdFx0Z2xvYmFsT2JqZWN0LmRlZmluZShcImV2YWxcIiwgZXZhbEZ1bmMpO1xuXHR9XG5cblx0b2JqZWN0RmFjdG9yeS5pbml0KCk7XG5cblx0aWYgKGNvbmZpZy5leGNsdWRlICYmIGNvbmZpZy5leGNsdWRlLmxlbmd0aCA+IDApIHtcblx0XHRjb25maWcuZXhjbHVkZS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHR2YXIgc2VnbWVudHMgPSBuYW1lLnNwbGl0KFwiLlwiKTtcblx0XHRcdHZhciBwYXJlbnQgPSBnbG9iYWxPYmplY3Q7XG5cblx0XHRcdHdoaWxlIChzZWdtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5nZXRWYWx1ZShzZWdtZW50cy5zaGlmdCgpKTtcblxuXHRcdFx0XHQvLyBhcGkgbm90IGRlZmluZWQgLSBhc3N1bWUgdXNlciBlcnJvcj9cblx0XHRcdFx0aWYgKCFwYXJlbnQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cGFyZW50LnJlbW92ZShzZWdtZW50cy5zaGlmdCgpKTtcblx0XHR9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5bFkyMWhMVFV1TVM5cGJtUmxlQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbHdpZFhObElITjBjbWxqZEZ3aU8xeHVYRzUyWVhJZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ0E5SUhKbGNYVnBjbVVvWENKaVlXSmxiQzF5ZFc1MGFXMWxMMmhsYkhCbGNuTXZhVzUwWlhKdmNDMXlaWEYxYVhKbExXUmxabUYxYkhSY0lpbGJYQ0prWldaaGRXeDBYQ0pkTzF4dVhHNTJZWElnWDJsdWRHVnliM0JTWlhGMWFYSmxWMmxzWkdOaGNtUWdQU0J5WlhGMWFYSmxLRndpWW1GaVpXd3RjblZ1ZEdsdFpTOW9aV3h3WlhKekwybHVkR1Z5YjNBdGNtVnhkV2x5WlMxM2FXeGtZMkZ5WkZ3aUtWdGNJbVJsWm1GMWJIUmNJbDA3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1WEhSMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1bGVIQnZjblJ6VzF3aVpHVm1ZWFZzZEZ3aVhTQTlJR1ZqYldFMU1UdGNibHh1ZG1GeUlGOTBlWEJsYzFCeWFXMXBkR2wyWlZSNWNHVWdQU0J5WlhGMWFYSmxLRndpTGk0dmRIbHdaWE12Y0hKcGJXbDBhWFpsTFhSNWNHVmNJaWs3WEc1Y2JuWmhjaUJmZEhsd1pYTlFjbWx0YVhScGRtVlVlWEJsTWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDNSNWNHVnpVSEpwYldsMGFYWmxWSGx3WlNrN1hHNWNiblpoY2lCZmRIbHdaWE5QWW1wbFkzUkdZV04wYjNKNUlEMGdjbVZ4ZFdseVpTaGNJaTR1TDNSNWNHVnpMMjlpYW1WamRDMW1ZV04wYjNKNVhDSXBPMXh1WEc1MllYSWdYM1I1Y0dWelQySnFaV04wUm1GamRHOXllVElnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjkwZVhCbGMwOWlhbVZqZEVaaFkzUnZjbmtwTzF4dVhHNTJZWElnWDJWdWRsSmxabVZ5Wlc1alpTQTlJSEpsY1hWcGNtVW9YQ0l1TGk5bGJuWXZjbVZtWlhKbGJtTmxYQ0lwTzF4dVhHNTJZWElnWDJWdWRsSmxabVZ5Wlc1alpUSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOWxiblpTWldabGNtVnVZMlVwTzF4dVhHNTJZWElnWDI1MWJXSmxja0Z3YVNBOUlISmxjWFZwY21Vb1hDSXVMMjUxYldKbGNpMWhjR2xjSWlrN1hHNWNiblpoY2lCZmJuVnRZbVZ5UVhCcE1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gyNTFiV0psY2tGd2FTazdYRzVjYm5aaGNpQmZjM1J5YVc1blFYQnBJRDBnY21WeGRXbHlaU2hjSWk0dmMzUnlhVzVuTFdGd2FWd2lLVHRjYmx4dWRtRnlJRjl6ZEhKcGJtZEJjR2t5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYzNSeWFXNW5RWEJwS1R0Y2JseHVkbUZ5SUY5bWRXNWpkR2x2YmtGd2FTQTlJSEpsY1hWcGNtVW9YQ0l1TDJaMWJtTjBhVzl1TFdGd2FWd2lLVHRjYmx4dWRtRnlJRjltZFc1amRHbHZia0Z3YVRJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5bWRXNWpkR2x2YmtGd2FTazdYRzVjYm5aaGNpQmZiMkpxWldOMFFYQnBJRDBnY21WeGRXbHlaU2hjSWk0dmIySnFaV04wTFdGd2FWd2lLVHRjYmx4dWRtRnlJRjl2WW1wbFkzUkJjR2t5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYjJKcVpXTjBRWEJwS1R0Y2JseHVkbUZ5SUY5aWIyOXNaV0Z1UVhCcElEMGdjbVZ4ZFdseVpTaGNJaTR2WW05dmJHVmhiaTFoY0dsY0lpazdYRzVjYm5aaGNpQmZZbTl2YkdWaGJrRndhVElnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlpYjI5c1pXRnVRWEJwS1R0Y2JseHVkbUZ5SUY5a1lYUmxRWEJwSUQwZ2NtVnhkV2x5WlNoY0lpNHZaR0YwWlMxaGNHbGNJaWs3WEc1Y2JuWmhjaUJmWkdGMFpVRndhVElnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlrWVhSbFFYQnBLVHRjYmx4dWRtRnlJRjloY25KaGVVRndhU0E5SUhKbGNYVnBjbVVvWENJdUwyRnljbUY1TFdGd2FWd2lLVHRjYmx4dWRtRnlJRjloY25KaGVVRndhVElnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjloY25KaGVVRndhU2s3WEc1Y2JuWmhjaUJmYldGMGFFRndhU0E5SUhKbGNYVnBjbVVvWENJdUwyMWhkR2d0WVhCcFhDSXBPMXh1WEc1MllYSWdYMjFoZEdoQmNHa3lJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZiV0YwYUVGd2FTazdYRzVjYm5aaGNpQmZjbVZuWlhoQmNHa2dQU0J5WlhGMWFYSmxLRndpTGk5eVpXZGxlQzFoY0dsY0lpazdYRzVjYm5aaGNpQmZjbVZuWlhoQmNHa3lJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZjbVZuWlhoQmNHa3BPMXh1WEc1MllYSWdYMlZ5Y205eVFYQnBJRDBnY21WeGRXbHlaU2hjSWk0dlpYSnliM0l0WVhCcFhDSXBPMXh1WEc1MllYSWdYMlZ5Y205eVFYQnBNaUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YMlZ5Y205eVFYQnBLVHRjYmx4dWRtRnlJRjlxYzI5dVFYQnBJRDBnY21WeGRXbHlaU2hjSWk0dmFuTnZiaTFoY0dsY0lpazdYRzVjYm5aaGNpQmZhbk52YmtGd2FUSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOXFjMjl1UVhCcEtUdGNibHh1ZG1GeUlGOWpiMjV6YjJ4bFFYQnBJRDBnY21WeGRXbHlaU2hjSWk0dlkyOXVjMjlzWlMxaGNHbGNJaWs3WEc1Y2JuWmhjaUJmWTI5dWMyOXNaVUZ3YVRJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5amIyNXpiMnhsUVhCcEtUdGNibHh1ZG1GeUlGOTFkR2xzYzBOdmJuWmxjblFnUFNCeVpYRjFhWEpsS0Z3aUxpNHZkWFJwYkhNdlkyOXVkbVZ5ZEZ3aUtUdGNibHh1ZG1GeUlHTnZiblpsY25RZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WWGFXeGtZMkZ5WkNoZmRYUnBiSE5EYjI1MlpYSjBLVHRjYmx4dWRtRnlJR1p5YjNwbGJpQTlJSHNnWTI5dVptbG5kWEpoWW14bE9pQm1ZV3h6WlN3Z1pXNTFiV1Z5WVdKc1pUb2dabUZzYzJVc0lIZHlhWFJoWW14bE9pQm1ZV3h6WlNCOU8xeHVYRzVtZFc1amRHbHZiaUJsWTIxaE5URW9aVzUyS1NCN1hHNWNkSFpoY2lCamIyNW1hV2NnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUR3OUlERWdmSHdnWVhKbmRXMWxiblJ6V3pGZElEMDlQU0IxYm1SbFptbHVaV1FnUHlCN2ZTQTZJR0Z5WjNWdFpXNTBjMXN4WFR0Y2JseHVYSFIyWVhJZ2IySnFaV04wUm1GamRHOXllU0E5SUdWdWRpNXZZbXBsWTNSR1lXTjBiM0o1SUQwZ2JtVjNJRjkwZVhCbGMwOWlhbVZqZEVaaFkzUnZjbmt5VzF3aVpHVm1ZWFZzZEZ3aVhTaGxibllwTzF4dVhIUjJZWElnWjJ4dlltRnNUMkpxWldOMElEMGdaVzUyTG1kc2IySmhiQ0E5SUc5aWFtVmpkRVpoWTNSdmNua3VZM0psWVhSbFQySnFaV04wS0NrN1hHNWNibHgwWlc1MkxtTnlaV0YwWlU5aWFtVmpkRk5qYjNCbEtHZHNiMkpoYkU5aWFtVmpkQ2s3WEc1Y2JseDBkbUZ5SUhWdVpHVm1hVzVsWkVOc1lYTnpJRDBnYm1WM0lGOTBlWEJsYzFCeWFXMXBkR2wyWlZSNWNHVXlXMXdpWkdWbVlYVnNkRndpWFNncE8xeHVYSFJuYkc5aVlXeFBZbXBsWTNRdVpHVm1hVzVsS0Z3aWRXNWtaV1pwYm1Wa1hDSXNJSFZ1WkdWbWFXNWxaRU5zWVhOekxDQm1jbTk2Wlc0cE8xeHVYRzVjZEhaaGNpQnVkV3hzUTJ4aGMzTWdQU0J1WlhjZ1gzUjVjR1Z6VUhKcGJXbDBhWFpsVkhsd1pUSmJYQ0prWldaaGRXeDBYQ0pkS0c1MWJHd3BPMXh1WEhSbmJHOWlZV3hQWW1wbFkzUXVaR1ZtYVc1bEtGd2liblZzYkZ3aUxDQnVkV3hzUTJ4aGMzTXNJR1p5YjNwbGJpazdYRzVjYmx4MFoyeHZZbUZzVDJKcVpXTjBMbVJsWm1sdVpTaGNJa2x1Wm1sdWFYUjVYQ0lzSUc5aWFtVmpkRVpoWTNSdmNua3VZM0psWVhSbFVISnBiV2wwYVhabEtFbHVabWx1YVhSNUtTd2dabkp2ZW1WdUtUdGNibHgwWjJ4dlltRnNUMkpxWldOMExtUmxabWx1WlNoY0lrNWhUbHdpTENCdlltcGxZM1JHWVdOMGIzSjVMbU55WldGMFpWQnlhVzFwZEdsMlpTaE9ZVTRwTENCbWNtOTZaVzRwTzF4dVhHNWNkQzh2SUhSdlpHODZJRzV2WkdVZ2RuTWdZbkp2ZDNObGNpQXRJR1J2SUhkbElHTmhjbVUvWEc1Y2RHZHNiMkpoYkU5aWFtVmpkQzVrWldacGJtVW9YQ0ozYVc1a2IzZGNJaXdnWjJ4dlltRnNUMkpxWldOMExDQm1jbTk2Wlc0cE8xeHVYRzVjZENnd0xDQmZablZ1WTNScGIyNUJjR2t5VzF3aVpHVm1ZWFZzZEZ3aVhTa29aVzUyTENCamIyNW1hV2NwTzF4dVhIUW9NQ3dnWDI5aWFtVmpkRUZ3YVRKYlhDSmtaV1poZFd4MFhDSmRLU2hsYm5Zc0lHTnZibVpwWnlrN1hHNWNkQ2d3TENCZllYSnlZWGxCY0dreVcxd2laR1ZtWVhWc2RGd2lYU2tvWlc1MkxDQmpiMjVtYVdjcE8xeHVYSFFvTUN3Z1gySnZiMnhsWVc1QmNHa3lXMXdpWkdWbVlYVnNkRndpWFNrb1pXNTJMQ0JqYjI1bWFXY3BPMXh1WEhRb01Dd2dYMjUxYldKbGNrRndhVEpiWENKa1pXWmhkV3gwWENKZEtTaGxibllzSUdOdmJtWnBaeWs3WEc1Y2RDZ3dMQ0JmYzNSeWFXNW5RWEJwTWx0Y0ltUmxabUYxYkhSY0lsMHBLR1Z1ZGl3Z1kyOXVabWxuS1R0Y2JseDBLREFzSUY5a1lYUmxRWEJwTWx0Y0ltUmxabUYxYkhSY0lsMHBLR1Z1ZGl3Z1kyOXVabWxuS1R0Y2JseDBLREFzSUY5eVpXZGxlRUZ3YVRKYlhDSmtaV1poZFd4MFhDSmRLU2hsYm5Zc0lHTnZibVpwWnlrN1hHNWNkQ2d3TENCZmJXRjBhRUZ3YVRKYlhDSmtaV1poZFd4MFhDSmRLU2hsYm5Zc0lHTnZibVpwWnlrN1hHNWNkQ2d3TENCZlpYSnliM0pCY0dreVcxd2laR1ZtWVhWc2RGd2lYU2tvWlc1MkxDQmpiMjVtYVdjcE8xeHVYSFFvTUN3Z1gycHpiMjVCY0dreVcxd2laR1ZtWVhWc2RGd2lYU2tvWlc1MkxDQmpiMjVtYVdjcE8xeHVYSFFvTUN3Z1gyTnZibk52YkdWQmNHa3lXMXdpWkdWbVlYVnNkRndpWFNrb1pXNTJMQ0JqYjI1bWFXY3BPMXh1WEc1Y2RGdGNJbkJoY25ObFJteHZZWFJjSWl3Z1hDSmtaV052WkdWVlVrbGNJaXdnWENKbGJtTnZaR1ZWVWtsY0lpd2dYQ0prWldOdlpHVlZVa2xEYjIxd2IyNWxiblJjSWl3Z1hDSmxibU52WkdWVlVrbERiMjF3YjI1bGJuUmNJaXdnWENKbGMyTmhjR1ZjSWl3Z1hDSjFibVZ6WTJGd1pWd2lYUzVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdYRzVjZEZ4MFoyeHZZbUZzVDJKcVpXTjBMbVJsWm1sdVpTaHVZVzFsTENCdlltcGxZM1JHWVdOMGIzSjVMbU55WldGMFpVSjFhV3gwU1c1R2RXNWpkR2x2YmlobWRXNWpkR2x2YmlBb2RtRnNkV1VwSUh0Y2JseDBYSFJjZEhaaGNpQnpkSEpwYm1kV1lXeDFaU0E5SUdOdmJuWmxjblF1ZEc5VGRISnBibWNvWlc1MkxDQjJZV3gxWlNrN1hHNWNkRngwWEhSeVpYUjFjbTRnYjJKcVpXTjBSbUZqZEc5eWVTNWpjbVZoZEdWUWNtbHRhWFJwZG1Vb1oyeHZZbUZzVzI1aGJXVmRLSE4wY21sdVoxWmhiSFZsS1NrN1hHNWNkRngwZlN3Z01Td2dibUZ0WlNrcE8xeHVYSFI5S1R0Y2JseHVYSFJiWENKcGMwNWhUbHdpTENCY0ltbHpSbWx1YVhSbFhDSmRMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNGdLRzVoYldVcElIdGNibHgwWEhSbmJHOWlZV3hQWW1wbFkzUXVaR1ZtYVc1bEtHNWhiV1VzSUdOdmJuWmxjblF1ZEc5T1lYUnBkbVZHZFc1amRHbHZiaWhsYm5Zc0lHZHNiMkpoYkZ0dVlXMWxYU3dnYm1GdFpTa3BPMXh1WEhSOUtUdGNibHh1WEhSbmJHOWlZV3hQWW1wbFkzUXVaR1ZtYVc1bEtGd2ljR0Z5YzJWSmJuUmNJaXdnYjJKcVpXTjBSbUZqZEc5eWVTNWpjbVZoZEdWQ2RXbHNkRWx1Um5WdVkzUnBiMjRvWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J5WVdScGVDa2dlMXh1WEhSY2RIWmhjaUJ6ZEhKcGJtZFdZV3gxWlNBOUlHTnZiblpsY25RdWRHOVRkSEpwYm1jb1pXNTJMQ0IyWVd4MVpTazdYRzVjZEZ4MGNtRmthWGdnUFNCamIyNTJaWEowTG5SdlVISnBiV2wwYVhabEtHVnVkaXdnY21Ga2FYZ3NJRndpYm5WdFltVnlYQ0lwTzF4dVhHNWNkRngwY21WMGRYSnVJRzlpYW1WamRFWmhZM1J2Y25rdVkzSmxZWFJsVUhKcGJXbDBhWFpsS0hCaGNuTmxTVzUwS0hOMGNtbHVaMVpoYkhWbExDQnlZV1JwZUNrcE8xeHVYSFI5TENBeUxDQmNJbkJoY25ObFNXNTBYQ0lwS1R0Y2JseHVYSFJwWmlBb1kyOXVabWxuTG5CaGNuTmxjaWtnZTF4dVhIUmNkSFpoY2lCbGRtRnNSblZ1WXlBOUlHOWlhbVZqZEVaaFkzUnZjbmt1WTNKbFlYUmxRblZwYkhSSmJrWjFibU4wYVc5dUtHWjFibU4wYVc5dUlDaGpiMlJsS1NCN1hHNWNkRngwWEhScFppQW9JV052WkdVcElIdGNibHgwWEhSY2RGeDBjbVYwZFhKdUlIVnVaR1ZtYVc1bFpFTnNZWE56TzF4dVhIUmNkRngwZlZ4dVhHNWNkRngwWEhScFppQW9ZMjlrWlM1MGVYQmxJQ0U5UFNCY0luTjBjbWx1WjF3aUtTQjdYRzVjZEZ4MFhIUmNkSEpsZEhWeWJpQmpiMlJsTzF4dVhIUmNkRngwZlZ4dVhHNWNkRngwWEhSMllYSWdaR2x5WldOMFEyRnNiQ0E5SUhSb2FYTXVZMkZzYkdWbElHbHVjM1JoYm1ObGIyWWdYMlZ1ZGxKbFptVnlaVzVqWlRKYlhDSmtaV1poZFd4MFhDSmRJQ1ltSUhSb2FYTXVZMkZzYkdWbExtSmhjMlVnUFQwOUlHZHNiMkpoYkU5aWFtVmpkRHRjYmx4MFhIUmNkSFpoY2lCaGMzUTdYRzVjYmx4MFhIUmNkSFJ5ZVNCN1hHNWNkRngwWEhSY2RHRnpkQ0E5SUdOdmJtWnBaeTV3WVhKelpYSW9ZMjlrWlM1MllXeDFaU2s3WEc1Y2RGeDBYSFI5SUdOaGRHTm9JQ2hsY25JcElIdGNibHgwWEhSY2RGeDBhV1lnS0dWeWNpQnBibk4wWVc1alpXOW1JRk41Ym5SaGVFVnljbTl5SUNZbUlDOWhjM05wWjI1cGJtY2dkRzhnY25aaGJIVmxMMmt1ZEdWemRDaGxjbkl1YldWemMyRm5aU2twSUh0Y2JseDBYSFJjZEZ4MFhIUXZMeUJvWVdOcklHSmxZMkYxYzJVZ1lXTnZjbTRnZEdoeWIzZHpJSE41Ym5SaGVDQmxjbkp2Y2x4dVhIUmNkRngwWEhSY2RIUm9jbTkzSUc1bGR5QlNaV1psY21WdVkyVkZjbkp2Y2loY0lrbHVkbUZzYVdRZ2JHVm1kQzFvWVc1a0lITnBaR1VnYVc0Z1lYTnphV2R1YldWdWRGd2lLVHRjYmx4MFhIUmNkRngwZlZ4dVhHNWNkRngwWEhSY2RIUm9jbTkzSUdWeWNqdGNibHgwWEhSY2RIMWNibHh1WEhSY2RGeDBMeThnZFhObElIUm9aU0J6WVcxbElITmpiM0JsSUhWdWJHVnpjeUIwYUdseklHbHpJR0Z1SUZ3aWFXNWthWEpsWTNSY0lpQmpZV3hzWEc1Y2RGeDBYSFF2THlCcGJpQjNhR2xqYUNCallYTmxJSGRsSUhWelpTQjBhR1VnWjJ4dlltRnNJSE5qYjNCbFhHNWNkRngwWEhSMllYSWdjMk52Y0dVZ1BTQmxibll1YzJWMFUyTnZjR1VvWkdseVpXTjBRMkZzYkNBL0lHVnVkaTVqZFhKeVpXNTBMbkJoY21WdWRDQTZJR1Z1ZGk1bmJHOWlZV3hUWTI5d1pTazdYRzVjZEZ4MFhIUjJZWElnWlhobFkzVjBhVzl1VW1WemRXeDBPMXh1WEc1Y2RGeDBYSFIwY25rZ2UxeHVYSFJjZEZ4MFhIUmxlR1ZqZFhScGIyNVNaWE4xYkhRZ1BTQjBhR2x6TG1OeVpXRjBaU2hoYzNRcExtVjRaV04xZEdVb0tUdGNibHgwWEhSY2RIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dVhIUmNkRngwWEhSelkyOXdaUzVsZUdsMFUyTnZjR1VvS1R0Y2JseDBYSFJjZEZ4MGRHaHliM2NnWlhKeU8xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUnpZMjl3WlM1bGVHbDBVMk52Y0dVb0tUdGNibHgwWEhSY2RISmxkSFZ5YmlCbGVHVmpkWFJwYjI1U1pYTjFiSFFnSmlZZ1pYaGxZM1YwYVc5dVVtVnpkV3gwTG5KbGMzVnNkQ0EvSUdWNFpXTjFkR2x2YmxKbGMzVnNkQzV5WlhOMWJIUXVaMlYwVm1Gc2RXVW9LU0E2SUhWdVpHVm1hVzVsWkVOc1lYTnpPMXh1WEhSY2RIMHNJREVzSUZ3aVpYWmhiRndpS1R0Y2JseHVYSFJjZEdkc2IySmhiRTlpYW1WamRDNWtaV1pwYm1Vb1hDSmxkbUZzWENJc0lHVjJZV3hHZFc1aktUdGNibHgwZlZ4dVhHNWNkRzlpYW1WamRFWmhZM1J2Y25rdWFXNXBkQ2dwTzF4dVhHNWNkR2xtSUNoamIyNW1hV2N1WlhoamJIVmtaU0FtSmlCamIyNW1hV2N1WlhoamJIVmtaUzVzWlc1bmRHZ2dQaUF3S1NCN1hHNWNkRngwWTI5dVptbG5MbVY0WTJ4MVpHVXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9ibUZ0WlNrZ2UxeHVYSFJjZEZ4MGRtRnlJSE5sWjIxbGJuUnpJRDBnYm1GdFpTNXpjR3hwZENoY0lpNWNJaWs3WEc1Y2RGeDBYSFIyWVhJZ2NHRnlaVzUwSUQwZ1oyeHZZbUZzVDJKcVpXTjBPMXh1WEc1Y2RGeDBYSFIzYUdsc1pTQW9jMlZuYldWdWRITXViR1Z1WjNSb0lENGdNU2tnZTF4dVhIUmNkRngwWEhSd1lYSmxiblFnUFNCd1lYSmxiblF1WjJWMFZtRnNkV1VvYzJWbmJXVnVkSE11YzJocFpuUW9LU2s3WEc1Y2JseDBYSFJjZEZ4MEx5OGdZWEJwSUc1dmRDQmtaV1pwYm1Wa0lDMGdZWE56ZFcxbElIVnpaWElnWlhKeWIzSS9YRzVjZEZ4MFhIUmNkR2xtSUNnaGNHRnlaVzUwS1NCN1hHNWNkRngwWEhSY2RGeDBjbVYwZFhKdU8xeHVYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkSEJoY21WdWRDNXlaVzF2ZG1Vb2MyVm5iV1Z1ZEhNdWMyaHBablFvS1NrN1hHNWNkRngwZlNrN1hHNWNkSDFjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmxlSEJ2Y25Selcxd2laR1ZtWVhWc2RGd2lYVHNpWFgwPSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGpzb25BcGk7XG5cbnZhciBfdXRpbHNDb250cmFjdHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udHJhY3RzXCIpO1xuXG52YXIgY29udHJhY3RzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udHJhY3RzKTtcblxudmFyIF91dGlsc0Z1bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvZnVuY1wiKTtcblxudmFyIGZ1bmMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNGdW5jKTtcblxudmFyIF91dGlsc0NvbnZlcnQgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udmVydFwiKTtcblxudmFyIGNvbnZlcnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb252ZXJ0KTtcblxudmFyIHByaW1pdGl2ZXMgPSB7XG5cdFwiU3RyaW5nXCI6IHRydWUsXG5cdFwiTnVtYmVyXCI6IHRydWUsXG5cdFwiQm9vbGVhblwiOiB0cnVlLFxuXHRcIkRhdGVcIjogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZm9ybWF0VmFsdWVzKHZhbHVlcywgZ2FwLCBkZXB0aCkge1xuXHRpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9XG5cblx0aWYgKCFnYXApIHtcblx0XHRyZXR1cm4gdmFsdWVzLmpvaW4oXCIsXCIpO1xuXHR9XG5cblx0dmFyIGluZGVudCA9IFwiXFxuXCIgKyBnYXAucmVwZWF0KGRlcHRoKTtcblx0dmFyIGpvaW5lZFZhbHVlcyA9IHZhbHVlcy5qb2luKGluZGVudCArIFwiLFwiKTtcblxuXHQvLyByZW1vdmUgaW5kZW50IG9uIGNsb3Npbmdcblx0cmV0dXJuIGluZGVudCArIGpvaW5lZFZhbHVlcyArIFwiXFxuXCIgKyBnYXAucmVwZWF0KGRlcHRoIC0gMSk7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVByaW1pdGl2ZSh2YWx1ZSkge1xuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVPYmplY3QoZW52LCBzdGFjaywgb2JqLCByZXBsYWNlciwgZ2FwLCBkZXB0aCkge1xuXHR2YXIgY29sb24gPSBnYXAgPyBcIjogXCIgOiBcIjpcIjtcblx0dmFyIHZhbHVlcyA9IFtdO1xuXHR2YXIgdmFsdWU7XG5cblx0Zm9yICh2YXIgcHJvcCBpbiBvYmoucHJvcGVydGllcykge1xuXHRcdGlmIChvYmoucHJvcGVydGllc1twcm9wXS5lbnVtZXJhYmxlKSB7XG5cdFx0XHR2YWx1ZSA9IHJlcGxhY2VyKG9iaiwgcHJvcCwgb2JqLmdldFByb3BlcnR5KHByb3ApLmdldFZhbHVlKCkpO1xuXHRcdFx0aWYgKCFjb250cmFjdHMuaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpKSB7XG5cdFx0XHRcdHZhbHVlcy5wdXNoKHNlcmlhbGl6ZVByaW1pdGl2ZShwcm9wKSArIGNvbG9uICsgc2VyaWFsaXplKGVudiwgc3RhY2ssIHZhbHVlLCByZXBsYWNlciwgZ2FwLCBkZXB0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBcIntcIiArIGZvcm1hdFZhbHVlcyh2YWx1ZXMsIGdhcCwgZGVwdGgsIGdhcCwgZGVwdGgpICsgXCJ9XCI7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZUFycmF5KGVudiwgc3RhY2ssIGFyciwgcmVwbGFjZXIsIGdhcCwgZGVwdGgpIHtcblx0dmFyIGxlbmd0aCA9IGFyci5nZXRWYWx1ZShcImxlbmd0aFwiKS51bndyYXAoKTtcblx0dmFyIHZhbHVlcyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKGFyci5oYXNQcm9wZXJ0eShpKSkge1xuXHRcdFx0dmFsdWUgPSByZXBsYWNlcihhcnIsIFN0cmluZyhpKSwgYXJyLmdldFByb3BlcnR5KGkpLmdldFZhbHVlKCkpO1xuXHRcdH1cblxuXHRcdGlmIChjb250cmFjdHMuaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpKSB7XG5cdFx0XHQvLyB1bmRlZmluZWQgcG9zaXRpb25zIGFyZSByZXBsYWNlZCB3aXRoIG51bGxcblx0XHRcdHZhbHVlcy5wdXNoKFwibnVsbFwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWVzLnB1c2goc2VyaWFsaXplKGVudiwgc3RhY2ssIHZhbHVlLCByZXBsYWNlcikpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBcIltcIiArIGZvcm1hdFZhbHVlcyh2YWx1ZXMsIGdhcCwgZGVwdGgpICsgXCJdXCI7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShlbnYsIHN0YWNrLCBvYmosIHJlcGxhY2VyLCBnYXAsIGRlcHRoKSB7XG5cdGlmICghb2JqKSB7XG5cdFx0cmV0dXJuIHNlcmlhbGl6ZVByaW1pdGl2ZSgpO1xuXHR9XG5cblx0aWYgKG9iai5pc1ByaW1pdGl2ZSB8fCBvYmouY2xhc3NOYW1lIGluIHByaW1pdGl2ZXMpIHtcblx0XHRyZXR1cm4gc2VyaWFsaXplUHJpbWl0aXZlKG9iai52YWx1ZSk7XG5cdH1cblxuXHRpZiAob2JqLmNsYXNzTmFtZSA9PT0gXCJGdW5jdGlvblwiKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdHZhciBqc29uU3RyaW5nID0gZnVuYy50cnlDYWxsTWV0aG9kKGVudiwgb2JqLCBcInRvSlNPTlwiKTtcblx0aWYgKGpzb25TdHJpbmcpIHtcblx0XHRyZXR1cm4gc2VyaWFsaXplUHJpbWl0aXZlKGpzb25TdHJpbmcudmFsdWUpO1xuXHR9XG5cblx0aWYgKHN0YWNrLmluZGV4T2Yob2JqKSA+PSAwKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNvbnZlcnRpbmcgY2lyY3VsYXIgc3RydWN0dXJlIHRvIEpTT05cIik7XG5cdH1cblxuXHRkZXB0aCsrO1xuXHRzdGFjay5wdXNoKG9iaik7XG5cblx0dmFyIGpzb25SZXN1bHQ7XG5cdGlmIChvYmouY2xhc3NOYW1lID09PSBcIkFycmF5XCIpIHtcblx0XHRqc29uUmVzdWx0ID0gc2VyaWFsaXplQXJyYXkoZW52LCBzdGFjaywgb2JqLCByZXBsYWNlcik7XG5cdH0gZWxzZSB7XG5cdFx0anNvblJlc3VsdCA9IHNlcmlhbGl6ZU9iamVjdChlbnYsIHN0YWNrLCBvYmosIHJlcGxhY2VyLCBnYXAsIGRlcHRoKTtcblx0fVxuXG5cdGRlcHRoLS07XG5cdHN0YWNrLnBvcCgpO1xuXHRyZXR1cm4ganNvblJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVwbGFjZXIoZW52LCByZXBsYWNlcikge1xuXHRpZiAocmVwbGFjZXIpIHtcblx0XHRpZiAocmVwbGFjZXIuY2xhc3NOYW1lID09PSBcIkZ1bmN0aW9uXCIpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoaG9sZGVyLCBrZXksIHZhbHVlKSB7XG5cdFx0XHRcdHZhciBhcmdzID0gW2Vudi5vYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShrZXkpLCB2YWx1ZV07XG5cdFx0XHRcdHZhciBwYXJhbXMgPSByZXBsYWNlci5uYXRpdmUgPyBbXSA6IHJlcGxhY2VyLm5vZGUucGFyYW1zO1xuXHRcdFx0XHR2YXIgY2FsbGVlID0gcmVwbGFjZXIubmF0aXZlID8gcmVwbGFjZXIgOiByZXBsYWNlci5ub2RlO1xuXG5cdFx0XHRcdHJldHVybiBmdW5jLmV4ZWN1dGVGdW5jdGlvbihlbnYsIHJlcGxhY2VyLCBwYXJhbXMsIGFyZ3MsIGhvbGRlciwgY2FsbGVlKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHJlcGxhY2VyLmNsYXNzTmFtZSA9PT0gXCJBcnJheVwiKSB7XG5cdFx0XHR2YXIga2V5cyA9IGNvbnZlcnQudG9BcnJheShyZXBsYWNlcikubWFwKGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdFx0aWYgKGFyZy5jbGFzc05hbWUgPT09IFwiU3RyaW5nXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29udmVydC50b1N0cmluZyhlbnYsIGFyZyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXJnLmNsYXNzTmFtZSA9PT0gXCJOdW1iZXJcIikge1xuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcoY29udmVydC50b051bWJlcihlbnYsIGFyZykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGhvbGRlciwga2V5LCB2YWx1ZSkge1xuXHRcdFx0XHQvLyBhbGxvdyBlbXB0eSBrZXkgLSB0aGlzIHdpbGwgYmUgZnJvbSB0aGUgcm9vdFxuXHRcdFx0XHRpZiAoIWtleSB8fCBrZXlzLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChob2xkZXIsIGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGdldFNwYWNlcihlbnYsIHNwYWNlcikge1xuXHRpZiAoc3BhY2VyKSB7XG5cdFx0aWYgKHNwYWNlci5jbGFzc05hbWUgPT09IFwiTnVtYmVyXCIpIHtcblx0XHRcdHZhciBjb3VudCA9IE1hdGguZmxvb3IoY29udmVydC50b051bWJlcihlbnYsIHNwYWNlcikpO1xuXHRcdFx0Y291bnQgPSBNYXRoLm1heChNYXRoLm1pbigxMCwgY291bnQpLCAwKTtcblxuXHRcdFx0aWYgKGNvdW50ID4gMCkge1xuXHRcdFx0XHRyZXR1cm4gXCIgXCIucmVwZWF0KGNvdW50KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0fVxuXG5cdFx0aWYgKHNwYWNlci5jbGFzc05hbWUgPT09IFwiU3RyaW5nXCIpIHtcblx0XHRcdHZhciBnYXAgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc3BhY2VyKTtcblx0XHRcdHJldHVybiBnYXAuc3Vic3RyKDAsIDEwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gZGVzZXJpYWxpemUob2JqZWN0RmFjdG9yeSwgdmFsdWUsIHJldml2ZXIpIHtcblx0dmFyIHZhbHVlVHlwZSA9IGNvbnRyYWN0cy5nZXRUeXBlKHZhbHVlKTtcblx0c3dpdGNoICh2YWx1ZVR5cGUpIHtcblx0XHQvLyB0aGVzZSBhcmUgdGhlIG9ubHkgdHlwZXMgc3VwcG9ydGVkIGJ5IEpTT04ucGFyc2UgLSBzYWQgZmFjZS4uLlxuXHRcdGNhc2UgXCJVbmRlZmluZWRcIjpcblx0XHRjYXNlIFwiTnVsbFwiOlxuXHRcdGNhc2UgXCJTdHJpbmdcIjpcblx0XHRjYXNlIFwiTnVtYmVyXCI6XG5cdFx0Y2FzZSBcIkJvb2xlYW5cIjpcblx0XHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZSh2YWx1ZVR5cGUsIHZhbHVlKTtcblxuXHRcdGNhc2UgXCJBcnJheVwiOlxuXHRcdFx0dmFyIGFyciA9IG9iamVjdEZhY3RvcnkuY3JlYXRlKFwiQXJyYXlcIik7XG5cdFx0XHR2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xuXHRcdFx0XHR2YXIgZWxlbWVudFZhbHVlID0gcmV2aXZlcihhcnIsIFN0cmluZyhpbmRleCksIGRlc2VyaWFsaXplKG9iamVjdEZhY3RvcnksIGVsZW1lbnQsIHJldml2ZXIpKTtcblx0XHRcdFx0aWYgKCFjb250cmFjdHMuaXNVbmRlZmluZWQoZWxlbWVudFZhbHVlKSkge1xuXHRcdFx0XHRcdGFyci5kZWZpbmVPd25Qcm9wZXJ0eShpbmRleCwgeyB2YWx1ZTogZGVzZXJpYWxpemUob2JqZWN0RmFjdG9yeSwgZWxlbWVudCksIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gYXJyO1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHZhciBvYmogPSBvYmplY3RGYWN0b3J5LmNyZWF0ZU9iamVjdCgpO1xuXHRcdFx0dmFyIHByb3BWYWx1ZTtcblxuXHRcdFx0Zm9yICh2YXIgcHJvcCBpbiB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodmFsdWUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcblx0XHRcdFx0XHRwcm9wVmFsdWUgPSByZXZpdmVyKG9iaiwgcHJvcCwgZGVzZXJpYWxpemUob2JqZWN0RmFjdG9yeSwgdmFsdWVbcHJvcF0sIHJldml2ZXIpKTtcblx0XHRcdFx0XHRpZiAoIWNvbnRyYWN0cy5pc1VuZGVmaW5lZChwcm9wVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRvYmouZGVmaW5lT3duUHJvcGVydHkocHJvcCwgeyB2YWx1ZTogcHJvcFZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2JqO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJldml2ZXIoZW52LCByZXZpdmVyKSB7XG5cdGlmIChyZXZpdmVyICYmIHJldml2ZXIuY2xhc3NOYW1lID09PSBcIkZ1bmN0aW9uXCIpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGhvbGRlciwga2V5LCB2YWx1ZSkge1xuXHRcdFx0dmFyIGFyZ3MgPSBbZW52Lm9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGtleSksIHZhbHVlXTtcblx0XHRcdHZhciBwYXJhbXMgPSByZXZpdmVyLm5hdGl2ZSA/IFtdIDogcmV2aXZlci5ub2RlLnBhcmFtcztcblx0XHRcdHZhciBjYWxsZWUgPSByZXZpdmVyLm5hdGl2ZSA/IHJldml2ZXIgOiByZXZpdmVyLm5vZGU7XG5cblx0XHRcdHJldHVybiBmdW5jLmV4ZWN1dGVGdW5jdGlvbihlbnYsIHJldml2ZXIsIHBhcmFtcywgYXJncywgaG9sZGVyLCBjYWxsZWUpO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gKGhvbGRlciwga2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24ganNvbkFwaShlbnYpIHtcblx0dmFyIGdsb2JhbE9iamVjdCA9IGVudi5nbG9iYWw7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3Rvcnk7XG5cdHZhciB1bmRlZiA9IGVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKTtcblx0dmFyIGpzb25DbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlT2JqZWN0KCk7XG5cdGpzb25DbGFzcy5jbGFzc05hbWUgPSBcIkpTT05cIjtcblxuXHRqc29uQ2xhc3MuZGVmaW5lKFwic3RyaW5naWZ5XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChvYmosIHJlcGxhY2VyLCBzcGFjZXIpIHtcblx0XHRyZXBsYWNlciA9IGNyZWF0ZVJlcGxhY2VyKGVudiwgcmVwbGFjZXIpO1xuXHRcdHNwYWNlciA9IGdldFNwYWNlcihlbnYsIHNwYWNlcik7XG5cblx0XHQvLyBydW4gYXQgdGhlIHRvcCB2YWx1ZVxuXHRcdG9iaiA9IHJlcGxhY2VyKG9iaiwgXCJcIiwgb2JqKTtcblx0XHRpZiAoY29udHJhY3RzLmlzVW5kZWZpbmVkKG9iaikpIHtcblx0XHRcdHJldHVybiB1bmRlZjtcblx0XHR9XG5cblx0XHR2YXIgc3RhY2sgPSBbXTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoc2VyaWFsaXplKGVudiwgc3RhY2ssIG9iaiwgcmVwbGFjZXIsIHNwYWNlciwgMCkpO1xuXHR9LCAzLCBcIkpTT04uc3RyaW5naWZ5XCIpKTtcblxuXHRqc29uQ2xhc3MuZGVmaW5lKFwicGFyc2VcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHN0ciwgcmV2aXZlcikge1xuXHRcdHJldml2ZXIgPSBjcmVhdGVSZXZpdmVyKGVudiwgcmV2aXZlcik7XG5cblx0XHR2YXIgc3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc3RyKTtcblx0XHR2YXIgcGFyc2VkT2JqZWN0ID0gSlNPTi5wYXJzZShzdHJpbmdWYWx1ZSk7XG5cdFx0dmFyIGRlc2VyaWFsaXplZE9iamVjdCA9IGRlc2VyaWFsaXplKG9iamVjdEZhY3RvcnksIHBhcnNlZE9iamVjdCwgcmV2aXZlcik7XG5cblx0XHRyZXR1cm4gcmV2aXZlcihkZXNlcmlhbGl6ZWRPYmplY3QsIFwiXCIsIGRlc2VyaWFsaXplZE9iamVjdCkgfHwgdW5kZWY7XG5cdH0sIDIsIFwiSlNPTi5wYXJzZVwiKSk7XG5cblx0Z2xvYmFsT2JqZWN0LmRlZmluZShcIkpTT05cIiwganNvbkNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtYXRoQXBpO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgY29uc3RhbnRzID0gW1wiRVwiLCBcIkxOMTBcIiwgXCJMTjJcIiwgXCJMT0cxMEVcIiwgXCJMT0cyRVwiLCBcIlBJXCIsIFwiU1FSVDFfMlwiLCBcIlNRUlQyXCJdO1xudmFyIG1ldGhvZHMgPSBbXCJhYnNcIiwgXCJhY29zXCIsIFwiYXNpblwiLCBcImF0YW5cIiwgXCJhdGFuMlwiLCBcImNlaWxcIiwgXCJjb3NcIiwgXCJleHBcIiwgXCJmbG9vclwiLCBcImxvZ1wiLCBcIm1heFwiLCBcIm1pblwiLCBcInBvd1wiLCBcInJhbmRvbVwiLCBcInJvdW5kXCIsIFwic2luXCIsIFwic3FydFwiLCBcInRhblwiXTtcblxuZnVuY3Rpb24gbWF0aEFwaShlbnYpIHtcblx0dmFyIGdsb2JhbE9iamVjdCA9IGVudi5nbG9iYWw7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3Rvcnk7XG5cdHZhciBtYXRoQ2xhc3MgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZU9iamVjdCgpO1xuXHRtYXRoQ2xhc3MuY2xhc3NOYW1lID0gXCJNYXRoXCI7XG5cblx0Y29uc3RhbnRzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRtYXRoQ2xhc3MuZGVmaW5lKG5hbWUsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKE1hdGhbbmFtZV0pLCB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UgfSk7XG5cdH0pO1xuXG5cdG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdG1hdGhDbGFzcy5kZWZpbmUobmFtZSwgY29udmVydC50b05hdGl2ZUZ1bmN0aW9uKGVudiwgTWF0aFtuYW1lXSwgXCJNYXRoLlwiICsgbmFtZSkpO1xuXHR9KTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiTWF0aFwiLCBtYXRoQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG51bWJlckFwaTtcblxudmFyIF91dGlsc0NvbnZlcnQgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udmVydFwiKTtcblxudmFyIGNvbnZlcnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb252ZXJ0KTtcblxudmFyIF91dGlsc0NvbnRyYWN0cyA9IHJlcXVpcmUoXCIuLi91dGlscy9jb250cmFjdHNcIik7XG5cbnZhciBjb250cmFjdHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb250cmFjdHMpO1xuXG52YXIgY29uc3RhbnRzID0gW1wiTUFYX1ZBTFVFXCIsIFwiTUlOX1ZBTFVFXCIsIFwiTmFOXCIsIFwiTkVHQVRJVkVfSU5GSU5JVFlcIiwgXCJQT1NJVElWRV9JTkZJTklUWVwiXTtcbnZhciBwcm90b01ldGhvZHMgPSBbXCJ0b0V4cG9uZW50aWFsXCIsIFwidG9QcmVjaXNpb25cIiwgXCJ0b0xvY2FsZVN0cmluZ1wiXTtcblxuZnVuY3Rpb24gbnVtYmVyQXBpKGVudikge1xuXHR2YXIgZ2xvYmFsT2JqZWN0ID0gZW52Lmdsb2JhbDtcblx0dmFyIG9iamVjdEZhY3RvcnkgPSBlbnYub2JqZWN0RmFjdG9yeTtcblx0dmFyIG51bWJlckNsYXNzID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0dmFyIG51bWJlclZhbHVlID0gTnVtYmVyKGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBvYmosIFwibnVtYmVyXCIpKTtcblxuXHRcdGlmICh0aGlzLmlzTmV3KSB7XG5cdFx0XHRyZXR1cm4gY29udmVydC5wcmltaXRpdmVUb09iamVjdChlbnYsIG51bWJlclZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJOdW1iZXJcIiwgbnVtYmVyVmFsdWUpO1xuXHR9LCBudWxsLCB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UgfSk7XG5cblx0dmFyIHByb3RvID0gbnVtYmVyQ2xhc3MuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKTtcblx0cHJvdG8uY2xhc3NOYW1lID0gXCJOdW1iZXJcIjtcblx0cHJvdG8udmFsdWUgPSAwO1xuXG5cdHByb3RvLmRlZmluZShcInRvU3RyaW5nXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChyYWRpeCkge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc05vdEdlbmVyaWModGhpcy5ub2RlLCBcIk51bWJlclwiLCBcIk51bWJlci5wcm90b3R5cGUudG9TdHJpbmdcIik7XG5cblx0XHR2YXIgcmFkaXhWYWx1ZSA9IDEwO1xuXHRcdGlmIChyYWRpeCkge1xuXHRcdFx0cmFkaXhWYWx1ZSA9IGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCByYWRpeCwgXCJudW1iZXJcIik7XG5cdFx0XHRpZiAocmFkaXhWYWx1ZSA8IDIgfHwgcmFkaXhWYWx1ZSA+IDM2KSB7XG5cdFx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwidG9TdHJpbmcoKSByYWRpeCBhcmd1bWVudCBtdXN0IGJlIGJldHdlZW4gMiBhbmQgMzZcIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRoaXMubm9kZS52YWx1ZSA9PSBudWxsID8gXCIwXCIgOiB0aGlzLm5vZGUudmFsdWUudG9TdHJpbmcocmFkaXhWYWx1ZSkpO1xuXHR9LCAxLCBcIk51bWJlci5wcm90b3R5cGUudG9TdHJpbmdcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInRvRml4ZWRcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKGZyYWN0aW9uRGlnaXRzKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzTm90R2VuZXJpYyh0aGlzLm5vZGUsIFwiTnVtYmVyXCIsIFwiTnVtYmVyLnByb3RvdHlwZS50b0ZpeGVkXCIpO1xuXG5cdFx0dmFyIGRpZ2l0cyA9IDA7XG5cdFx0aWYgKGZyYWN0aW9uRGlnaXRzKSB7XG5cdFx0XHRkaWdpdHMgPSBjb252ZXJ0LnRvTnVtYmVyKGVudiwgZnJhY3Rpb25EaWdpdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShOdW1iZXIucHJvdG90eXBlLnRvRml4ZWQuY2FsbCh0aGlzLm5vZGUudmFsdWUsIGRpZ2l0cykpO1xuXHR9LCAxLCBcIk51bWJlci5wcm90b3R5cGUudG9GaXhlZFwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwidmFsdWVPZlwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzTm90R2VuZXJpYyh0aGlzLm5vZGUsIFwiTnVtYmVyXCIsIFwiTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mXCIpO1xuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh0aGlzLm5vZGUudmFsdWUgPT0gbnVsbCA/IDAgOiB0aGlzLm5vZGUudmFsdWUpO1xuXHR9LCAwLCBcIk51bWJlci5wcm90b3R5cGUudmFsdWVPZlwiKSk7XG5cblx0Y29uc3RhbnRzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRudW1iZXJDbGFzcy5kZWZpbmUobmFtZSwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoTnVtYmVyW25hbWVdKSwgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuXHR9KTtcblxuXHRwcm90b01ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdHZhciBmbiA9IE51bWJlci5wcm90b3R5cGVbbmFtZV07XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgbWV0aG9kTmFtZSA9IFwiTnVtYmVyLnByb3RvdHlwZS5cIiArIG5hbWU7XG5cdFx0XHRcdHByb3RvLmRlZmluZShuYW1lLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y29udHJhY3RzLmFzc2VydElzTm90R2VuZXJpYyh0aGlzLm5vZGUsIFwiTnVtYmVyXCIsIG1ldGhvZE5hbWUpO1xuXHRcdFx0XHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShmbi5jYWxsKHRoaXMubm9kZS52YWx1ZSkpO1xuXHRcdFx0XHR9LCBmbi5sZW5ndGgsIG1ldGhvZE5hbWUpKTtcblx0XHRcdH0pKCk7XG5cdFx0fVxuXHR9KTtcblxuXHRnbG9iYWxPYmplY3QuZGVmaW5lKFwiTnVtYmVyXCIsIG51bWJlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBvYmplY3RBcGk7XG5cbnZhciBfdHlwZXNPYmplY3RUeXBlID0gcmVxdWlyZShcIi4uL3R5cGVzL29iamVjdC10eXBlXCIpO1xuXG52YXIgX3R5cGVzT2JqZWN0VHlwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlc09iamVjdFR5cGUpO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgX3V0aWxzQ29udHJhY3RzID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnRyYWN0c1wiKTtcblxudmFyIGNvbnRyYWN0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnRyYWN0cyk7XG5cbnZhciBfdXRpbHNGdW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmNcIik7XG5cbnZhciBmdW5jID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzRnVuYyk7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmIChvYmouaXNQcmltaXRpdmUpIHtcblx0XHRyZXR1cm4gb2JqLnZhbHVlICYmIG9iai50eXBlID09PSBcIm9iamVjdFwiO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGVudiwgb2JqLCBuYW1lLCBkZXNjcmlwdG9yKSB7XG5cdGlmICghaXNPYmplY3QoZGVzY3JpcHRvcikpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJvcGVydHkgZGVzY3JpcHRpb24gbXVzdCBiZSBhbiBvYmplY3Q6IFwiICsgY29udmVydC50b1N0cmluZyhlbnYsIGRlc2NyaXB0b3IpKTtcblx0fVxuXG5cdHZhciB1bmRlZiA9IGVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKTtcblx0dmFyIG9wdGlvbnMgPSB7fTtcblxuXHRpZiAoZGVzY3JpcHRvcikge1xuXHRcdHZhciBoYXNWYWx1ZSA9IGRlc2NyaXB0b3IuaGFzUHJvcGVydHkoXCJ2YWx1ZVwiKTtcblx0XHR2YXIgaGFzR2V0dGVyID0gZGVzY3JpcHRvci5oYXNQcm9wZXJ0eShcImdldFwiKTtcblx0XHR2YXIgaGFzU2V0dGVyID0gZGVzY3JpcHRvci5oYXNQcm9wZXJ0eShcInNldFwiKTtcblxuXHRcdGlmICgoaGFzVmFsdWUgfHwgZGVzY3JpcHRvci5oYXNQcm9wZXJ0eShcIndyaXRhYmxlXCIpKSAmJiAoaGFzR2V0dGVyIHx8IGhhc1NldHRlcikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIHByb3BlcnR5LiBBIHByb3BlcnR5IGNhbm5vdCBib3RoIGhhdmUgYWNjZXNzb3JzIGFuZCBiZSB3cml0YWJsZSBvciBoYXZlIGEgdmFsdWVcIik7XG5cdFx0fVxuXG5cdFx0W1wid3JpdGFibGVcIiwgXCJlbnVtZXJhYmxlXCIsIFwiY29uZmlndXJhYmxlXCJdLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcblx0XHRcdGlmIChkZXNjcmlwdG9yLmhhc1Byb3BlcnR5KHByb3ApKSB7XG5cdFx0XHRcdHZhciBhdHRyVmFsdWUgPSBkZXNjcmlwdG9yLmdldFByb3BlcnR5KHByb3ApLmdldFZhbHVlKCk7XG5cdFx0XHRcdG9wdGlvbnNbcHJvcF0gPSBjb252ZXJ0LnRvQm9vbGVhbihhdHRyVmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIGN1cnJlbnRTY29wZSA9IGVudi5jdXJyZW50O1xuXG5cdFx0Ly8gd2Ugb25seSBrZWVwIGEgY29weSBvZiB0aGUgb3JpZ2luYWwgZ2V0dGVyL3NldHRlciBmb3IgdXNlIHdpdGggYGdldE93blByb3BlcnR5RGVzY3JpcHRvcmBcblx0XHRpZiAoaGFzR2V0dGVyKSB7XG5cdFx0XHR2YXIgZ2V0dGVyID0gZGVzY3JpcHRvci5nZXRQcm9wZXJ0eShcImdldFwiKS5nZXRWYWx1ZSgpIHx8IHVuZGVmO1xuXHRcdFx0aWYgKGdldHRlci5pc1ByaW1pdGl2ZSAmJiBnZXR0ZXIudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRvcHRpb25zLmdldCA9IG9wdGlvbnMuZ2V0dGVyID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGdldHRlci5jbGFzc05hbWUgIT09IFwiRnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZXR0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uOiBcIiArIGNvbnZlcnQudG9TdHJpbmcoZW52LCBnZXR0ZXIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG9wdGlvbnMuZ2V0ID0gZ2V0dGVyO1xuXHRcdFx0XHRvcHRpb25zLmdldHRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgc2NvcGUgPSBlbnYuc2V0U2NvcGUoY3VycmVudFNjb3BlKTtcblx0XHRcdFx0XHR2YXIgdGhpc0FyZyA9IGNvbnZlcnQudG9PYmplY3QoZW52LCB0aGlzKTtcblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgZ2V0UmVzdWx0ID0gZnVuYy5nZXRGdW5jdGlvblJlc3VsdChlbnYsIGdldHRlciwgZ2V0dGVyLm5vZGUucGFyYW1zLCBbXSwgdGhpc0FyZywgZ2V0dGVyLm5vZGUpO1xuXHRcdFx0XHRcdFx0c2NvcGUuZXhpdFNjb3BlKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZ2V0UmVzdWx0ICYmIGdldFJlc3VsdC5leGl0ID8gZ2V0UmVzdWx0LnJlc3VsdC5nZXRWYWx1ZSgpIDogdW5kZWY7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdFx0XHRcdHRocm93IGVycjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGhhc1NldHRlcikge1xuXHRcdFx0dmFyIHNldHRlciA9IGRlc2NyaXB0b3IuZ2V0UHJvcGVydHkoXCJzZXRcIikuZ2V0VmFsdWUoKSB8fCB1bmRlZjtcblx0XHRcdGlmIChzZXR0ZXIuaXNQcmltaXRpdmUgJiYgc2V0dGVyLnZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0b3B0aW9ucy5zZXQgPSBvcHRpb25zLnNldHRlciA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChzZXR0ZXIuY2xhc3NOYW1lICE9PSBcIkZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiU2V0dGVyIG11c3QgYmUgYSBmdW5jdGlvbjogXCIgKyBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc2V0dGVyKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRvcHRpb25zLnNldCA9IHNldHRlcjtcblx0XHRcdFx0b3B0aW9ucy5zZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIHNjb3BlID0gZW52LnNldFNjb3BlKGN1cnJlbnRTY29wZSk7XG5cdFx0XHRcdFx0dmFyIHRoaXNBcmcgPSBjb252ZXJ0LnRvT2JqZWN0KGVudiwgdGhpcyk7XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0ZnVuYy5leGVjdXRlRnVuY3Rpb24oZW52LCBzZXR0ZXIsIHNldHRlci5ub2RlLnBhcmFtcywgYXJndW1lbnRzLCB0aGlzQXJnLCBzZXR0ZXIubm9kZSk7XG5cdFx0XHRcdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdFx0XHRcdHJldHVybiB1bmRlZjtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaGFzVmFsdWUpIHtcblx0XHRcdG9wdGlvbnMudmFsdWUgPSBkZXNjcmlwdG9yLmdldFByb3BlcnR5KFwidmFsdWVcIikuZ2V0VmFsdWUoKSB8fCB1bmRlZjtcblx0XHR9XG5cdH1cblxuXHRvYmouZGVmaW5lT3duUHJvcGVydHkobmFtZSwgb3B0aW9ucywgdHJ1ZSwgZW52KTtcbn1cblxuZnVuY3Rpb24gb2JqZWN0QXBpKGVudikge1xuXHR2YXIgZ2xvYmFsT2JqZWN0ID0gZW52Lmdsb2JhbDtcblx0dmFyIG9iamVjdEZhY3RvcnkgPSBlbnYub2JqZWN0RmFjdG9yeTtcblx0dmFyIHVuZGVmID0gZ2xvYmFsT2JqZWN0LmdldFByb3BlcnR5KFwidW5kZWZpbmVkXCIpLmdldFZhbHVlKCk7XG5cblx0dmFyIHByb3RvID0gbmV3IF90eXBlc09iamVjdFR5cGUyW1wiZGVmYXVsdFwiXSgpO1xuXHR2YXIgb2JqZWN0Q2xhc3MgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZUZ1bmN0aW9uKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0aWYgKHZhbHVlLmlzUHJpbWl0aXZlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZS52YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlT2JqZWN0KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb2JqZWN0V3JhcHBlciA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHZhbHVlLnZhbHVlKTtcblx0XHRcdFx0b2JqZWN0V3JhcHBlci50eXBlID0gXCJvYmplY3RcIjtcblx0XHRcdFx0b2JqZWN0V3JhcHBlci5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gb2JqZWN0V3JhcHBlcjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBpbiBqdXN0IHJldHVyblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZU9iamVjdCgpO1xuXHR9LCBwcm90bywgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuXG5cdHByb3RvLmRlZmluZShcImhhc093blByb3BlcnR5XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0bmFtZSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCBuYW1lKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobmFtZSBpbiB0aGlzLm5vZGUucHJvcGVydGllcyk7XG5cdH0sIDEsIFwiT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwidmFsdWVPZlwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGNvbnZlcnQudG9PYmplY3QoZW52LCB0aGlzLm5vZGUpO1xuXHR9LCAwLCBcIk9iamVjdC5wcm90b3R5cGUudmFsdWVPZlwiKSk7XG5cblx0dmFyIHRvU3RyaW5nRnVuYyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoXCJbb2JqZWN0IFwiICsgdGhpcy5ub2RlLmNsYXNzTmFtZSArIFwiXVwiKTtcblx0fSwgMCwgXCJPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXCIpO1xuXG5cdC8vIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgPT09IE9iamVjdC5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmdcblx0cHJvdG8uZGVmaW5lKFwidG9TdHJpbmdcIiwgdG9TdHJpbmdGdW5jKTtcblx0cHJvdG8uZGVmaW5lKFwidG9Mb2NhbGVTdHJpbmdcIiwgdG9TdHJpbmdGdW5jKTtcblxuXHRwcm90by5kZWZpbmUoXCJpc1Byb3RvdHlwZU9mXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChvYmopIHtcblx0XHR2YXIgY3VycmVudCA9IG9iajtcblx0XHR2YXIgdGhpc05vZGUgPSB0aGlzLmVudi5jdXJyZW50LnRoaXNOb2RlO1xuXG5cdFx0d2hpbGUgKGN1cnJlbnQpIHtcblx0XHRcdGlmICh0aGlzTm9kZSA9PT0gY3VycmVudCkge1xuXHRcdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LmdldFByb3RvdHlwZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShmYWxzZSk7XG5cdH0sIDEsIFwiT2JqZWN0LmlzUHJvdG90eXBlT2ZcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0bmFtZSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCBuYW1lKTtcblx0XHR2YXIgZGVzY3JpcHRvciA9IHRoaXMubm9kZS5nZXRPd25Qcm9wZXJ0eShuYW1lKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoISEoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGUpKTtcblx0fSwgMSwgXCJPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGVcIikpO1xuXG5cdG9iamVjdENsYXNzLmRlZmluZShcImNyZWF0ZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAocGFyZW50LCBkZXNjcmlwdG9ycykge1xuXHRcdGlmIChwYXJlbnQgJiYgcGFyZW50LmlzUHJpbWl0aXZlICYmIHBhcmVudC52YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBwcm90b3R5cGUgbWF5IG9ubHkgYmUgYW4gT2JqZWN0IG9yIG51bGw6XCIgKyBjb252ZXJ0LnRvU3RyaW5nKGVudiwgcGFyZW50KSk7XG5cdFx0fVxuXG5cdFx0aWYgKGRlc2NyaXB0b3JzICYmIGRlc2NyaXB0b3JzLmlzUHJpbWl0aXZlICYmIGRlc2NyaXB0b3JzLnZhbHVlID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgbnVsbCBvciB1bmRlZmluZWQgdG8gb2JqZWN0XCIpO1xuXHRcdH1cblxuXHRcdHZhciBvYmogPSBvYmplY3RGYWN0b3J5LmNyZWF0ZU9iamVjdCgpO1xuXG5cdFx0aWYgKHBhcmVudCkge1xuXHRcdFx0b2JqLnNldFByb3RvdHlwZShwYXJlbnQpO1xuXHRcdH1cblxuXHRcdGlmIChkZXNjcmlwdG9ycykge1xuXHRcdFx0Zm9yICh2YXIgcHJvcCBpbiBkZXNjcmlwdG9ycy5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdGlmIChkZXNjcmlwdG9ycy5wcm9wZXJ0aWVzW3Byb3BdLmVudW1lcmFibGUpIHtcblx0XHRcdFx0XHRkZWZpbmVQcm9wZXJ0eShlbnYsIG9iaiwgcHJvcCwgZGVzY3JpcHRvcnMuZ2V0UHJvcGVydHkocHJvcCkuZ2V0VmFsdWUoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LCAyLCBcIk9iamVjdC5jcmVhdGVcIikpO1xuXG5cdG9iamVjdENsYXNzLmRlZmluZShcImRlZmluZVByb3BlcnR5XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChvYmosIHByb3AsIGRlc2NyaXB0b3IpIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNPYmplY3Qob2JqLCBcIk9iamVjdC5kZWZpbmVQcm9wZXJ0eVwiKTtcblxuXHRcdGRlZmluZVByb3BlcnR5KGVudiwgb2JqLCBjb252ZXJ0LnRvU3RyaW5nKGVudiwgcHJvcCksIGRlc2NyaXB0b3IpO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sIDMsIFwiT2JqZWN0LmRlZmluZVByb3BlcnR5XCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJkZWZpbmVQcm9wZXJ0aWVzXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChvYmosIGRlc2NyaXB0b3JzKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzT2JqZWN0KG9iaiwgXCJPYmplY3QuZGVmaW5lUHJvcGVydGllc1wiKTtcblx0XHRjb250cmFjdHMuYXNzZXJ0QXJnSXNOb3ROdWxsT3JVbmRlZmluZWQoZGVzY3JpcHRvcnMpO1xuXG5cdFx0Zm9yICh2YXIgcHJvcCBpbiBkZXNjcmlwdG9ycy5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRpZiAoZGVzY3JpcHRvcnMucHJvcGVydGllc1twcm9wXS5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdGRlZmluZVByb3BlcnR5KGVudiwgb2JqLCBwcm9wLCBkZXNjcmlwdG9ycy5nZXRQcm9wZXJ0eShwcm9wKS5nZXRWYWx1ZSgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LCAyLCBcIk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc09iamVjdChvYmosIFwiT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvclwiKTtcblxuXHRcdHByb3AgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgcHJvcCk7XG5cblx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IG9iai5nZXRQcm9wZXJ0eShwcm9wKTtcblxuXHRcdFx0dmFyIHJlc3VsdCA9IG9iamVjdEZhY3RvcnkuY3JlYXRlT2JqZWN0KCk7XG5cdFx0XHRyZXN1bHQucHV0VmFsdWUoXCJjb25maWd1cmFibGVcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoZGVzY3JpcHRvci5jb25maWd1cmFibGUpLCBmYWxzZSk7XG5cdFx0XHRyZXN1bHQucHV0VmFsdWUoXCJlbnVtZXJhYmxlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGRlc2NyaXB0b3IuZW51bWVyYWJsZSksIGZhbHNlKTtcblxuXHRcdFx0aWYgKGRlc2NyaXB0b3IuZGF0YVByb3BlcnR5KSB7XG5cdFx0XHRcdHJlc3VsdC5wdXRWYWx1ZShcInZhbHVlXCIsIGRlc2NyaXB0b3IudmFsdWUsIGZhbHNlKTtcblx0XHRcdFx0cmVzdWx0LnB1dFZhbHVlKFwid3JpdGFibGVcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoZGVzY3JpcHRvci53cml0YWJsZSksIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC5wdXRWYWx1ZShcImdldFwiLCBkZXNjcmlwdG9yLmdldCB8fCB1bmRlZiwgZmFsc2UpO1xuXHRcdFx0XHRyZXN1bHQucHV0VmFsdWUoXCJzZXRcIiwgZGVzY3JpcHRvci5zZXQgfHwgdW5kZWYsIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWY7XG5cdH0sIDIsIFwiT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvclwiKSk7XG5cblx0b2JqZWN0Q2xhc3MuZGVmaW5lKFwia2V5c1wiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzT2JqZWN0KG9iaik7XG5cblx0XHR2YXIgYXJyID0gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJBcnJheVwiKTtcblx0XHR2YXIgaW5kZXggPSAwO1xuXG5cdFx0Zm9yICh2YXIgX25hbWUgaW4gb2JqLnByb3BlcnRpZXMpIHtcblx0XHRcdGlmIChvYmoucHJvcGVydGllc1tfbmFtZV0uZW51bWVyYWJsZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShfbmFtZSk7XG5cdFx0XHRcdGFyci5kZWZpbmVPd25Qcm9wZXJ0eShpbmRleCsrLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9LCBmYWxzZSwgZW52KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9LCAxLCBcIk9iamVjdC5rZXlzXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJnZXRPd25Qcm9wZXJ0eU5hbWVzXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChvYmopIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNPYmplY3Qob2JqLCBcIk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXCIpO1xuXG5cdFx0dmFyIGFyciA9IG9iamVjdEZhY3RvcnkuY3JlYXRlKFwiQXJyYXlcIik7XG5cdFx0b2JqLmdldE93blByb3BlcnR5TmFtZXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuXHRcdFx0YXJyLnB1dFZhbHVlKGluZGV4LCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShuYW1lKSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9LCAxLCBcIk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJnZXRQcm90b3R5cGVPZlwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzT2JqZWN0KG9iaiwgXCJPYmplY3QuZ2V0UHJvdG90eXBlT2ZcIik7XG5cblx0XHR2YXIgb2JqUHJvdG8gPSBvYmouZ2V0UHJvdG90eXBlKCk7XG5cdFx0cmV0dXJuIG9ialByb3RvIHx8IGVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJudWxsXCIpLmdldFZhbHVlKCk7XG5cdH0sIDEsIFwiT2JqZWN0LmdldFByb3RvdHlwZU9mXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJmcmVlemVcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKG9iaikge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc09iamVjdChvYmosIFwiT2JqZWN0LmZyZWV6ZVwiKTtcblx0XHRvYmouZnJlZXplKCk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwgMSwgXCJPYmplY3QuZnJlZXplXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJpc0Zyb3plblwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzT2JqZWN0KG9iaiwgXCJPYmplY3QuaXNGcm96ZW5cIik7XG5cblx0XHRpZiAob2JqLmlzUHJpbWl0aXZlKSB7XG5cdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFvYmouZXh0ZW5zaWJsZSkge1xuXHRcdFx0Zm9yICh2YXIgcHJvcCBpbiBvYmoucHJvcGVydGllcykge1xuXHRcdFx0XHRpZiAob2JqLnByb3BlcnRpZXNbcHJvcF0ud3JpdGFibGUgfHwgb2JqLnByb3BlcnRpZXNbcHJvcF0uY29uZmlndXJhYmxlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSghb2JqLmV4dGVuc2libGUpO1xuXHR9LCAxLCBcIk9iamVjdC5pc0Zyb3plblwiKSk7XG5cblx0b2JqZWN0Q2xhc3MuZGVmaW5lKFwicHJldmVudEV4dGVuc2lvbnNcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKG9iaikge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc09iamVjdChvYmosIFwiT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zXCIpO1xuXG5cdFx0b2JqLnByZXZlbnRFeHRlbnNpb25zKCk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwgMSwgXCJPYmplY3QucHJldmVudEV4dGVuc2lvbnNcIikpO1xuXG5cdG9iamVjdENsYXNzLmRlZmluZShcImlzRXh0ZW5zaWJsZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzT2JqZWN0KG9iaiwgXCJPYmplY3QuaXNFeHRlbnNpYmxlXCIpO1xuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKG9iai5leHRlbnNpYmxlKTtcblx0fSwgMSwgXCJPYmplY3QuaXNFeHRlbnNpYmxlXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJzZWFsXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChvYmopIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNPYmplY3Qob2JqLCBcIk9iamVjdC5zZWFsXCIpO1xuXG5cdFx0b2JqLnNlYWwoKTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LCAxLCBcIk9iamVjdC5zZWFsXCIpKTtcblxuXHRvYmplY3RDbGFzcy5kZWZpbmUoXCJpc1NlYWxlZFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAob2JqKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzT2JqZWN0KG9iaiwgXCJPYmplY3QuaXNTZWFsZWRcIik7XG5cblx0XHRpZiAoIW9iai5leHRlbnNpYmxlKSB7XG5cdFx0XHRmb3IgKHZhciBwcm9wIGluIG9iai5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdGlmIChvYmoucHJvcGVydGllc1twcm9wXS5jb25maWd1cmFibGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKCFvYmouZXh0ZW5zaWJsZSk7XG5cdH0sIDEsIFwiT2JqZWN0LmlzU2VhbGVkXCIpKTtcblxuXHQvLyBmdW5jdGlvbiBpcyBhbiBvYmplY3QgLSBtYWtlIHN1cmUgdGhhdCBpdCBpcyBpbiB0aGUgcHJvdG90eXBlIGNoYWluXG5cdGdsb2JhbE9iamVjdC5nZXRQcm9wZXJ0eShcIkZ1bmN0aW9uXCIpLmdldFZhbHVlKCkuZ2V0UHJvdG90eXBlKCkuc2V0UHJvdG90eXBlKHByb3RvKTtcblx0Z2xvYmFsT2JqZWN0LmRlZmluZShcIk9iamVjdFwiLCBvYmplY3RDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcmVnZXhBcGk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBfdXRpbHNDb250cmFjdHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udHJhY3RzXCIpO1xuXG52YXIgY29udHJhY3RzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udHJhY3RzKTtcblxuZnVuY3Rpb24gcmVnZXhBcGkoZW52KSB7XG5cdHZhciBnbG9iYWxPYmplY3QgPSBlbnYuZ2xvYmFsO1xuXHR2YXIgb2JqZWN0RmFjdG9yeSA9IGVudi5vYmplY3RGYWN0b3J5O1xuXHR2YXIgcmVnZXhDbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlRnVuY3Rpb24oZnVuY3Rpb24gKHBhdHRlcm4sIGZsYWdzKSB7XG5cdFx0aWYgKHBhdHRlcm4gJiYgcGF0dGVybi5jbGFzc05hbWUgPT09IFwiUmVnRXhwXCIpIHtcblx0XHRcdGlmICghY29udHJhY3RzLmlzVW5kZWZpbmVkKGZsYWdzKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHN1cHBseSBmbGFncyB3aGVuIGNvbnN0cnVjdGluZyBvbmUgUmVnRXhwIGZyb20gYW5vdGhlclwiKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHBhdHRlcm47XG5cdFx0fVxuXG5cdFx0dmFyIHBhdHRlcm5TdHJpbmcgPSBjb250cmFjdHMuaXNVbmRlZmluZWQocGF0dGVybikgPyBcIlwiIDogY29udmVydC50b1N0cmluZyhlbnYsIHBhdHRlcm4pO1xuXHRcdGZsYWdzID0gY29udHJhY3RzLmlzVW5kZWZpbmVkKGZsYWdzKSA/IFwiXCIgOiBjb252ZXJ0LnRvU3RyaW5nKGVudiwgZmxhZ3MpO1xuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlKFwiUmVnRXhwXCIsIG5ldyBSZWdFeHAocGF0dGVyblN0cmluZywgZmxhZ3MpKTtcblx0fSwgbnVsbCwgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuXG5cdHZhciBwcm90byA9IHJlZ2V4Q2xhc3MuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKTtcblx0cHJvdG8uY2xhc3NOYW1lID0gXCJSZWdFeHBcIjtcblxuXHRwcm90by5kZWZpbmUoXCJ0ZXN0XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChzdHIpIHtcblx0XHR2YXIgc3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc3RyKTtcblxuXHRcdHRoaXMubm9kZS5zb3VyY2UubGFzdEluZGV4ID0gY29udmVydC50b0ludDMyKGVudiwgdGhpcy5ub2RlLmdldFByb3BlcnR5KFwibGFzdEluZGV4XCIpLmdldFZhbHVlKCkpO1xuXHRcdHZhciB0ZXN0VmFsdWUgPSB0aGlzLm5vZGUuc291cmNlLnRlc3Qoc3RyaW5nVmFsdWUpO1xuXHRcdHRoaXMubm9kZS5wdXRWYWx1ZShcImxhc3RJbmRleFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh0aGlzLm5vZGUuc291cmNlLmxhc3RJbmRleCkpO1xuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRlc3RWYWx1ZSk7XG5cdH0sIDEsIFwiUmVnRXhwLnByb3RvdHlwZS50ZXN0XCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJleGVjXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChzdHIpIHtcblx0XHR2YXIgc3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc3RyKTtcblxuXHRcdC8vIHVwZGF0ZSB1bmRlcmx5aW5nIHJlZ2V4IGluIGNhc2UgdGhlIGluZGV4IHdhcyBtYW51YWxseSB1cGRhdGVkXG5cdFx0dGhpcy5ub2RlLnNvdXJjZS5sYXN0SW5kZXggPSBjb252ZXJ0LnRvSW50MzIoZW52LCB0aGlzLm5vZGUuZ2V0UHJvcGVydHkoXCJsYXN0SW5kZXhcIikuZ2V0VmFsdWUoKSk7XG5cblx0XHQvLyBnZXQgbWF0Y2ggZnJvbSB1bmRlcmx5aW5nIHJlZ2V4XG5cdFx0dmFyIG1hdGNoID0gdGhpcy5ub2RlLnNvdXJjZS5leGVjKHN0cmluZ1ZhbHVlKTtcblxuXHRcdC8vIHVwZGF0ZSB0aGUgbGFzdCBpbmRleCBmcm9tIHRoZSB1bmRlcmx5aW5nIHJlZ2V4XG5cdFx0dGhpcy5ub2RlLnB1dFZhbHVlKFwibGFzdEluZGV4XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRoaXMubm9kZS5zb3VyY2UubGFzdEluZGV4KSk7XG5cblx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdHZhciBhcnIgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZShcIkFycmF5XCIpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxuID0gbWF0Y2gubGVuZ3RoOyBpIDwgbG47IGkrKykge1xuXHRcdFx0XHRhcnIucHV0VmFsdWUoaSwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobWF0Y2hbaV0pKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZXh0cmEgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gdGhlIGFycmF5XG5cdFx0XHRhcnIucHV0VmFsdWUoXCJpbmRleFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShtYXRjaC5pbmRleCksIGZhbHNlLCB0aGlzKTtcblx0XHRcdGFyci5wdXRWYWx1ZShcImlucHV0XCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKG1hdGNoLmlucHV0KSwgZmFsc2UsIHRoaXMpO1xuXHRcdFx0cmV0dXJuIGFycjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lbnYuZ2xvYmFsLmdldFByb3BlcnR5KFwibnVsbFwiKS5nZXRWYWx1ZSgpO1xuXHR9LCAxLCBcIlJlZ0V4cC5wcm90b3R5cGUuZXhlY1wiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwidG9TdHJpbmdcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShTdHJpbmcodGhpcy5ub2RlLnNvdXJjZSkpO1xuXHR9LCAwLCBcIlJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmdcIikpO1xuXG5cdHByb3RvLmRlZmluZShcImNvbXBpbGVcIiwgY29udmVydC50b05hdGl2ZUZ1bmN0aW9uKGVudiwgUmVnRXhwLnByb3RvdHlwZS5jb21waWxlLCBcIlJlZ0V4cC5wcm90b3R5cGUuY29tcGlsZVwiKSk7XG5cdHByb3RvLmRlZmluZU93blByb3BlcnR5KFwibGFzdEluZGV4XCIsIHsgdmFsdWU6IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKDApLCB3cml0YWJsZTogdHJ1ZSB9KTtcblxuXHRbXCJnbG9iYWxcIiwgXCJpZ25vcmVDYXNlXCIsIFwibXVsdGlsaW5lXCIsIFwic291cmNlXCJdLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRwcm90by5kZWZpbmVPd25Qcm9wZXJ0eShuYW1lLCB7IHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShSZWdFeHAucHJvdG90eXBlW25hbWVdKSB9KTtcblx0fSk7XG5cblx0Z2xvYmFsT2JqZWN0LmRlZmluZShcIlJlZ0V4cFwiLCByZWdleENsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBzdHJpbmdBcGk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBfdXRpbHNDb250cmFjdHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udHJhY3RzXCIpO1xuXG52YXIgY29udHJhY3RzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udHJhY3RzKTtcblxudmFyIF91dGlsc0Z1bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvZnVuY1wiKTtcblxudmFyIGZ1bmMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNGdW5jKTtcblxudmFyIHByb3RvTWV0aG9kcyA9IFtcImNoYXJBdFwiLCBcImNoYXJDb2RlQXRcIiwgXCJjb25jYXRcIiwgXCJpbmRleE9mXCIsIFwibGFzdEluZGV4T2ZcIiwgXCJsb2NhbGVDb21wYXJlXCIsIFwic3Vic3RyXCIsIFwidG9Mb2NhbGVMb3dlckNhc2VcIiwgXCJ0b0xvY2FsZVVwcGVyQ2FzZVwiLCBcInRvTG93ZXJDYXNlXCIsIFwidG9VcHBlckNhc2VcIl07XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbmZ1bmN0aW9uIHN0cmluZ0FwaShlbnYpIHtcblx0dmFyIGdsb2JhbE9iamVjdCA9IGVudi5nbG9iYWw7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gZW52Lm9iamVjdEZhY3Rvcnk7XG5cdHZhciBzdHJpbmdDbGFzcyA9IG9iamVjdEZhY3RvcnkuY3JlYXRlRnVuY3Rpb24oZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0dmFyIHN0cmluZ1ZhbHVlID0gdmFsdWUgPyBjb252ZXJ0LnRvU3RyaW5nKGVudiwgdmFsdWUuZ2V0VmFsdWUoKSkgOiBcIlwiO1xuXG5cdFx0Ly8gY2FsbGVkIGFzIG5ld1xuXHRcdGlmICh0aGlzLmlzTmV3KSB7XG5cdFx0XHRyZXR1cm4gY29udmVydC5wcmltaXRpdmVUb09iamVjdChlbnYsIHN0cmluZ1ZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoc3RyaW5nVmFsdWUpO1xuXHR9LCBudWxsLCB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UgfSk7XG5cblx0dmFyIHByb3RvID0gc3RyaW5nQ2xhc3MuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKTtcblxuXHQvLyBwcm90b3R5cGUgY2FuIGJlIGNvZXJjZWQgaW50byBhbiBlbXB0eSBzdHJpbmdcblx0cHJvdG8udmFsdWUgPSBcIlwiO1xuXHRwcm90by5jbGFzc05hbWUgPSBcIlN0cmluZ1wiO1xuXHRwcm90by5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7IHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSgwKSB9KTtcblxuXHRwcm90by5kZWZpbmUoXCJzZWFyY2hcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHJlZ2V4KSB7XG5cdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIHRoaXMubm9kZSk7XG5cdFx0dmFyIHVuZGVybHlpbmdSZWdleDtcblxuXHRcdGlmIChyZWdleCkge1xuXHRcdFx0aWYgKHJlZ2V4LmNsYXNzTmFtZSA9PT0gXCJSZWdFeHBcIikge1xuXHRcdFx0XHR1bmRlcmx5aW5nUmVnZXggPSByZWdleC5zb3VyY2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1bmRlcmx5aW5nUmVnZXggPSBuZXcgUmVnRXhwKGNvbnZlcnQudG9TdHJpbmcoZW52LCByZWdleCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShzdHJpbmdWYWx1ZS5zZWFyY2godW5kZXJseWluZ1JlZ2V4KSk7XG5cdH0sIDEsIFwiU3RyaW5nLnByb3RvdHlwZS5zZWFyY2hcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInN1YnN0cmluZ1wiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc05vdENvbnN0cnVjdG9yKHRoaXMsIFwic3Vic3RyaW5nXCIpO1xuXG5cdFx0dmFyIHZhbHVlID0gY29udmVydC50b1ByaW1pdGl2ZShlbnYsIHRoaXMubm9kZSwgXCJzdHJpbmdcIik7XG5cdFx0dmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcblxuXHRcdHN0YXJ0ID0gY29udmVydC50b0ludGVnZXIoZW52LCBzdGFydCk7XG5cdFx0ZW5kID0gY29udHJhY3RzLmlzTnVsbE9yVW5kZWZpbmVkKGVuZCkgPyBsZW5ndGggOiBjb252ZXJ0LnRvSW50ZWdlcihlbnYsIGVuZCk7XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodmFsdWUuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpKTtcblx0fSwgMiwgXCJTdHJpbmcucHJvdG90eXBlLnN1YnN0cmluZ1wiKSk7XG5cblx0cHJvdG9NZXRob2RzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHR2YXIgZm4gPSBTdHJpbmcucHJvdG90eXBlW25hbWVdO1xuXHRcdGlmIChmbikge1xuXHRcdFx0cHJvdG8uZGVmaW5lKG5hbWUsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIHRoaXMubm9kZSk7XG5cdFx0XHRcdHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLm1hcChmdW5jdGlvbiAoYXJnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhcmcpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKFN0cmluZy5wcm90b3R5cGVbbmFtZV0uYXBwbHkoc3RyaW5nVmFsdWUsIGFyZ3MpKTtcblx0XHRcdH0sIFN0cmluZy5wcm90b3R5cGVbbmFtZV0ubGVuZ3RoLCBcIlN0cmluZy5wcm90b3R5cGUuXCIgKyBuYW1lKSk7XG5cdFx0fVxuXHR9KTtcblxuXHRzdHJpbmdDbGFzcy5kZWZpbmUoXCJmcm9tQ2hhckNvZGVcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjaGFyQ29kZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdGNoYXJDb2Rlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0XHR9XG5cblx0XHR2YXIgYXJncyA9IGNoYXJDb2Rlcy5tYXAoZnVuY3Rpb24gKGFyZykge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhcmcpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFyZ3MpKTtcblx0fSwgMSwgXCJTdHJpbmcuZnJvbUNoYXJDb2RlXCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJzbGljZVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuXHRcdHZhciBzdHJpbmdWYWx1ZSA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCB0aGlzLm5vZGUpO1xuXHRcdHZhciBzdGFydFZhbHVlID0gY29udmVydC50b0ludGVnZXIoZW52LCBzdGFydCk7XG5cdFx0dmFyIGVuZFZhbHVlO1xuXG5cdFx0aWYgKCFjb250cmFjdHMuaXNOdWxsT3JVbmRlZmluZWQoZW5kKSkge1xuXHRcdFx0ZW5kVmFsdWUgPSBjb252ZXJ0LnRvSW50ZWdlcihlbnYsIGVuZCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHN0cmluZ1ZhbHVlLnNsaWNlKHN0YXJ0VmFsdWUsIGVuZFZhbHVlKSk7XG5cdH0sIDIsIFwiU3RyaW5nLnByb3RvdHlwZS5zbGljZVwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwic3BsaXRcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHNlcGFyYXRvciwgbGltaXQpIHtcblx0XHR2YXIgc3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgdGhpcy5ub2RlKTtcblx0XHRzZXBhcmF0b3IgPSBzZXBhcmF0b3IgJiYgc2VwYXJhdG9yLmdldFZhbHVlKCk7XG5cdFx0bGltaXQgPSBsaW1pdCAmJiBsaW1pdC5nZXRWYWx1ZSgpO1xuXHRcdHZhciBsaW1pdFZhbHVlID0gY29udHJhY3RzLmlzVW5kZWZpbmVkKGxpbWl0KSA/IHVuZGVmaW5lZCA6IGNvbnZlcnQudG9VSW50MzIoZW52LCBsaW1pdCk7XG5cblx0XHR2YXIgYXJyID0gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJBcnJheVwiKTtcblx0XHRpZiAoY29udHJhY3RzLmlzVW5kZWZpbmVkKHNlcGFyYXRvcikpIHtcblx0XHRcdGFyci5wdXRWYWx1ZSgwLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShzdHJpbmdWYWx1ZSksIGZhbHNlLCB0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHNlcGFyYXRvclZhbHVlO1xuXHRcdFx0aWYgKHNlcGFyYXRvci5jbGFzc05hbWUgPT09IFwiUmVnRXhwXCIpIHtcblx0XHRcdFx0c2VwYXJhdG9yVmFsdWUgPSBzZXBhcmF0b3Iuc291cmNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VwYXJhdG9yVmFsdWUgPSBjb252ZXJ0LnRvU3RyaW5nKGVudiwgc2VwYXJhdG9yKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHJlc3VsdCA9IHN0cmluZ1ZhbHVlLnNwbGl0KHNlcGFyYXRvclZhbHVlLCBsaW1pdFZhbHVlKTtcblx0XHRcdHZhciBjb250ZXh0ID0gdGhpcztcblxuXHRcdFx0cmVzdWx0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuXHRcdFx0XHRhcnIucHV0VmFsdWUoaW5kZXgsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHZhbHVlKSwgZmFsc2UsIGNvbnRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFycjtcblx0fSwgMiwgXCJTdHJpbmcucHJvdG90eXBlLnNwbGl0XCIpKTtcblxuXHRwcm90by5kZWZpbmUoXCJyZXBsYWNlXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uIChyZWdleE9yU3Vic3RyLCBzdWJzdHJPckZuKSB7XG5cdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIHRoaXMubm9kZSk7XG5cblx0XHR2YXIgbWF0Y2hlcjtcblx0XHRpZiAocmVnZXhPclN1YnN0ciAmJiByZWdleE9yU3Vic3RyLmNsYXNzTmFtZSA9PT0gXCJSZWdFeHBcIikge1xuXHRcdFx0bWF0Y2hlciA9IHJlZ2V4T3JTdWJzdHIuc291cmNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyID0gY29udmVydC50b1N0cmluZyhlbnYsIHJlZ2V4T3JTdWJzdHIpO1xuXHRcdH1cblxuXHRcdHZhciByZXBsYWNlcjtcblx0XHRpZiAoc3Vic3RyT3JGbiAmJiBzdWJzdHJPckZuLnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dmFyIGNhbGxlZSA9IHN1YnN0ck9yRm4ubmF0aXZlID8gc3Vic3RyT3JGbiA6IHN1YnN0ck9yRm4ubm9kZTtcblx0XHRcdHZhciBwYXJhbXMgPSBjYWxsZWUucGFyYW1zIHx8IFtdO1xuXG5cdFx0XHRyZXBsYWNlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoYXJnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHZhciByZXBsYWNlZFZhbHVlID0gZnVuYy5leGVjdXRlRnVuY3Rpb24oZW52LCBzdWJzdHJPckZuLCBwYXJhbXMsIGFyZ3MsIGdsb2JhbE9iamVjdCwgY2FsbGVlKTtcblx0XHRcdFx0cmV0dXJuIHJlcGxhY2VkVmFsdWUgPyBjb252ZXJ0LnRvU3RyaW5nKGVudiwgcmVwbGFjZWRWYWx1ZSkgOiB1bmRlZmluZWQ7XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXBsYWNlciA9IGNvbnZlcnQudG9TdHJpbmcoZW52LCBzdWJzdHJPckZuKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoc3RyaW5nVmFsdWUucmVwbGFjZShtYXRjaGVyLCByZXBsYWNlcikpO1xuXHR9LCAyLCBcIlN0cmluZy5wcm90b3R5cGUucmVwbGFjZVwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwibWF0Y2hcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKHJlZ2V4KSB7XG5cdFx0dmFyIHN0cmluZ1ZhbHVlID0gY29udmVydC50b1N0cmluZyhlbnYsIHRoaXMubm9kZSk7XG5cdFx0dmFyIGFjdHVhbFJlZ2V4O1xuXG5cdFx0aWYgKHJlZ2V4ICYmIHJlZ2V4LmNsYXNzTmFtZSA9PT0gXCJSZWdFeHBcIikge1xuXHRcdFx0YWN0dWFsUmVnZXggPSByZWdleC5zb3VyY2U7XG5cdFx0fSBlbHNlIGlmIChyZWdleCkge1xuXHRcdFx0YWN0dWFsUmVnZXggPSBuZXcgUmVnRXhwKGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCByZWdleCkpO1xuXHRcdH1cblxuXHRcdHZhciBtYXRjaCA9IHN0cmluZ1ZhbHVlLm1hdGNoKGFjdHVhbFJlZ2V4KTtcblx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdHZhciBtYXRjaGVzID0gb2JqZWN0RmFjdG9yeS5jcmVhdGUoXCJBcnJheVwiKTtcblxuXHRcdFx0bWF0Y2guZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG5cdFx0XHRcdG1hdGNoZXMucHV0VmFsdWUoaW5kZXgsIG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHZhbHVlKSwgZmFsc2UpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hdGNoZXMucHV0VmFsdWUoXCJpbmRleFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShtYXRjaC5pbmRleCksIGZhbHNlKTtcblx0XHRcdG1hdGNoZXMucHV0VmFsdWUoXCJpbnB1dFwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShtYXRjaC5pbnB1dCksIGZhbHNlKTtcblx0XHRcdHJldHVybiBtYXRjaGVzO1xuXHRcdH1cblxuXHRcdHJldHVybiBnbG9iYWxPYmplY3QuZ2V0UHJvcGVydHkoXCJudWxsXCIpLmdldFZhbHVlKCk7XG5cdH0sIDEsIFwiU3RyaW5nLnByb3RvdHlwZS5tYXRjaFwiKSk7XG5cblx0cHJvdG8uZGVmaW5lKFwidHJpbVwiLCBvYmplY3RGYWN0b3J5LmNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmdW5jdGlvbiAoKSB7XG5cdFx0Y29udHJhY3RzLmFzc2VydElzTm90TnVsbE9yVW5kZWZpbmVkKHRoaXMubm9kZSwgXCJTdHJpbmcucHJvdG90eXBlLnRyaW1cIik7XG5cblx0XHR2YXIgc3RyaW5nVmFsdWUgPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgdGhpcy5ub2RlLCBcInN0cmluZ1wiKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoc3RyaW5nVmFsdWUudHJpbSgpKTtcblx0fSwgMCwgXCJTdHJpbmcucHJvdG90eXBlLnRyaW1cIikpO1xuXG5cdHByb3RvLmRlZmluZShcInRvU3RyaW5nXCIsIG9iamVjdEZhY3RvcnkuY3JlYXRlQnVpbHRJbkZ1bmN0aW9uKGZ1bmN0aW9uICgpIHtcblx0XHRjb250cmFjdHMuYXNzZXJ0SXNOb3RHZW5lcmljKHRoaXMubm9kZSwgXCJTdHJpbmdcIiwgXCJTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nXCIpO1xuXHRcdHJldHVybiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh0aGlzLm5vZGUudmFsdWUpO1xuXHR9LCAwLCBcIlN0cmluZy5wcm90b3R5cGUudG9TdHJpbmdcIikpO1xuXG5cdHByb3RvLmRlZmluZShcInZhbHVlT2ZcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuXHRcdGNvbnRyYWN0cy5hc3NlcnRJc05vdEdlbmVyaWModGhpcy5ub2RlLCBcIlN0cmluZ1wiLCBcIlN0cmluZy5wcm90b3R5cGUudmFsdWVPZlwiKTtcblx0XHRyZXR1cm4gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodGhpcy5ub2RlLnZhbHVlKTtcblx0fSwgMCwgXCJTdHJpbmcucHJvdG90eXBlLnZhbHVlT2ZcIikpO1xuXG5cdGdsb2JhbE9iamVjdC5kZWZpbmUoXCJTdHJpbmdcIiwgc3RyaW5nQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3NcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkY3JlYXRlID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWZlcmVuY2UgPSByZXF1aXJlKFwiLi9yZWZlcmVuY2VcIik7XG5cbnZhciBfcmVmZXJlbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlZmVyZW5jZSk7XG5cbnZhciBfdHlwZXNQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi4vdHlwZXMvcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxudmFyIF90eXBlc1Byb3BlcnR5RGVzY3JpcHRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlc1Byb3BlcnR5RGVzY3JpcHRvcik7XG5cbnZhciBEZWNsYXJhdGl2ZUVudmlyb25tZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gRGVjbGFyYXRpdmVFbnZpcm9ubWVudChwYXJlbnQsIHRoaXNBcmcsIGVudikge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEZWNsYXJhdGl2ZUVudmlyb25tZW50KTtcblxuXHRcdHRoaXMucHJvcGVydGllcyA9IF9PYmplY3QkY3JlYXRlKG51bGwpO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMudGhpc05vZGUgPSB0aGlzQXJnO1xuXHRcdHRoaXMuZW52ID0gZW52O1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKERlY2xhcmF0aXZlRW52aXJvbm1lbnQsIFt7XG5cdFx0a2V5OiBcImdldFJlZmVyZW5jZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRSZWZlcmVuY2UobmFtZSwgc3RyaWN0KSB7XG5cdFx0XHRyZXR1cm4gbmV3IF9yZWZlcmVuY2UyW1wiZGVmYXVsdFwiXShuYW1lLCB0aGlzLCBzdHJpY3QsIHRoaXMuZW52KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzVmFyaWFibGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzVmFyaWFibGUobmFtZSkge1xuXHRcdFx0cmV0dXJuIG5hbWUgaW4gdGhpcy5wcm9wZXJ0aWVzO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJnZXRWYXJpYWJsZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRWYXJpYWJsZShuYW1lKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wZXJ0aWVzW25hbWVdO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJkZWxldGVWYXJpYWJsZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBkZWxldGVWYXJpYWJsZShuYW1lKSB7XG5cdFx0XHRpZiAoIXRoaXMuaGFzVmFyaWFibGUobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5wcm9wZXJ0aWVzW25hbWVdLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGRlbGV0ZSB0aGlzLnByb3BlcnRpZXNbbmFtZV07XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiY3JlYXRlVmFyaWFibGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVmFyaWFibGUobmFtZSkge1xuXHRcdFx0aWYgKHRoaXMuaGFzVmFyaWFibGUobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucHJvcGVydGllc1tuYW1lXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcGVydGllc1tuYW1lXSA9IG5ldyBfdHlwZXNQcm9wZXJ0eURlc2NyaXB0b3IyW1wiZGVmYXVsdFwiXSh0aGlzLCB7XG5cdFx0XHRcdHZhbHVlOiB1bmRlZmluZWQsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwicHV0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gcHV0VmFsdWUobmFtZSwgdmFsdWUsIHRocm93T25FcnJvcikge1xuXHRcdFx0aWYgKHRoaXMuaGFzVmFyaWFibGUobmFtZSkpIHtcblx0XHRcdFx0aWYgKCF0aGlzLnByb3BlcnRpZXNbbmFtZV0ud3JpdGFibGUpIHtcblx0XHRcdFx0XHRpZiAodGhyb3dPbkVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHRvIGltbXV0YWJsZSBiaW5kaW5nOiBcIiArIG5hbWUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucHJvcGVydGllc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnBhcmVudC5wdXRWYWx1ZS5hcHBseSh0aGlzLnBhcmVudCwgYXJndW1lbnRzKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUobmFtZSwgdGhyb3dPbkVycm9yKSB7XG5cdFx0XHRpZiAodGhpcy5oYXNWYXJpYWJsZShuYW1lKSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucHJvcGVydGllc1tuYW1lXS52YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh0aHJvd09uRXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihuYW1lICsgXCIgaXMgbm90IGRlZmluZWRcIik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzLnByb3BlcnRpZXNbbmFtZV0uZ2V0VmFsdWUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0VGhpc0JpbmRpbmdcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VGhpc0JpbmRpbmcoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aGlzTm9kZTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gRGVjbGFyYXRpdmVFbnZpcm9ubWVudDtcbn0pKCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRGVjbGFyYXRpdmVFbnZpcm9ubWVudDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnZpc2l0ID0gdmlzaXQ7XG5cbmZ1bmN0aW9uIHZpc2l0KG5vZGUsIGNhbGxiYWNrKSB7XG5cdGlmICghbm9kZSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG5cdFx0bm9kZS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdmlzaXQobiwgY2FsbGJhY2spO1xuXHRcdH0pO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHN3aXRjaCAobm9kZS50eXBlKSB7XG5cdFx0Y2FzZSBcIkJsb2NrU3RhdGVtZW50XCI6XG5cdFx0XHR2aXNpdChub2RlLmJvZHksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIkNhdGNoQ2xhdXNlXCI6XG5cdFx0XHR2aXNpdChub2RlLmJvZHksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIkRvV2hpbGVTdGF0ZW1lbnRcIjpcblx0XHRjYXNlIFwiV2hpbGVTdGF0ZW1lbnRcIjpcblx0XHRcdHZpc2l0KG5vZGUudGVzdCwgY2FsbGJhY2spO1xuXHRcdFx0dmlzaXQobm9kZS5ib2R5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgXCJFeHByZXNzaW9uU3RhdGVtZW50XCI6XG5cdFx0XHR2aXNpdChub2RlLmV4cHJlc3Npb24sIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIkZvclN0YXRlbWVudFwiOlxuXHRcdFx0dmlzaXQobm9kZS5pbml0LCBjYWxsYmFjayk7XG5cdFx0XHR2aXNpdChub2RlLmJvZHksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIkZvckluU3RhdGVtZW50XCI6XG5cdFx0XHR2aXNpdChub2RlLmxlZnQsIGNhbGxiYWNrKTtcblx0XHRcdHZpc2l0KG5vZGUuYm9keSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiSWZTdGF0ZW1lbnRcIjpcblx0XHRcdC8vIGRvIG5vdCBzY2FuIGB0ZXN0YFxuXHRcdFx0dmlzaXQobm9kZS5jb25zZXF1ZW50LCBjYWxsYmFjayk7XG5cdFx0XHR2aXNpdChub2RlLmFsdGVybmF0ZSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiTGFiZWxlZFN0YXRlbWVudFwiOlxuXHRcdFx0dmlzaXQobm9kZS5ib2R5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgXCJTd2l0Y2hTdGF0ZW1lbnRcIjpcblx0XHRcdHZpc2l0KG5vZGUuZGlzY3JpbWluYW50LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgXCJTd2l0Y2hDYXNlXCI6XG5cdFx0XHR2aXNpdChub2RlLmNvbnNlcXVlbnQsIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIlRyeVN0YXRlbWVudFwiOlxuXHRcdFx0dmlzaXQobm9kZS5ibG9jaywgY2FsbGJhY2spO1xuXHRcdFx0dmlzaXQobm9kZS5oYW5kbGVyLCBjYWxsYmFjayk7XG5cdFx0XHR2aXNpdChub2RlLmZpbmFsaXplciwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVmFyaWFibGVEZWNsYXJhdGlvblwiOlxuXHRcdFx0dmlzaXQobm9kZS5kZWNsYXJhdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIkZ1bmN0aW9uRGVjbGFyYXRpb25cIjpcblx0XHRjYXNlIFwiVmFyaWFibGVEZWNsYXJhdG9yXCI6XG5cdFx0XHRjYWxsYmFjayhub2RlKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0ZGVmYXVsdDpcblx0XHQvLyBpZ25vcmUgYWxsIG90aGVyIG5vZGVzXG5cdH1cbn1cblxuOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3NcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkYXNzaWduID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leGVjdXRpb25Db250ZXh0ID0gcmVxdWlyZShcIi4uL2V4ZWN1dGlvbi1jb250ZXh0XCIpO1xuXG52YXIgX2V4ZWN1dGlvbkNvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhlY3V0aW9uQ29udGV4dCk7XG5cbnZhciBfZGVjbGFyYXRpdmVFbnZpcm9ubWVudCA9IHJlcXVpcmUoXCIuL2RlY2xhcmF0aXZlLWVudmlyb25tZW50XCIpO1xuXG52YXIgX2RlY2xhcmF0aXZlRW52aXJvbm1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVjbGFyYXRpdmVFbnZpcm9ubWVudCk7XG5cbnZhciBfb2JqZWN0RW52aXJvbm1lbnQgPSByZXF1aXJlKFwiLi9vYmplY3QtZW52aXJvbm1lbnRcIik7XG5cbnZhciBfb2JqZWN0RW52aXJvbm1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0RW52aXJvbm1lbnQpO1xuXG52YXIgX3JlZmVyZW5jZSA9IHJlcXVpcmUoXCIuL3JlZmVyZW5jZVwiKTtcblxudmFyIF9yZWZlcmVuY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVmZXJlbmNlKTtcblxudmFyIF9rZXl3b3JkcyA9IHJlcXVpcmUoXCIuLi9rZXl3b3Jkc1wiKTtcblxudmFyIF9rZXl3b3JkczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9rZXl3b3Jkcyk7XG5cbnZhciBfZWNtYTUxID0gcmVxdWlyZShcIi4uL2VjbWEtNS4xXCIpO1xuXG52YXIgX2VjbWE1MTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lY21hNTEpO1xuXG52YXIgX3V0aWxzQ29tcGFyZXJzID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbXBhcmVyc1wiKTtcblxudmFyIF91dGlsc0NvbXBhcmVyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0NvbXBhcmVycyk7XG5cbnZhciBfaG9pc3RlciA9IHJlcXVpcmUoXCIuL2hvaXN0ZXJcIik7XG5cbmZ1bmN0aW9uIGlzU3RyaWN0TW9kZShfeDIpIHtcblx0dmFyIF9hZ2FpbiA9IHRydWU7XG5cblx0X2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG5cdFx0dmFyIG5vZGUgPSBfeDI7XG5cdFx0X2FnYWluID0gZmFsc2U7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuXHRcdFx0X3gyID0gbm9kZVswXTtcblx0XHRcdF9hZ2FpbiA9IHRydWU7XG5cdFx0XHRjb250aW51ZSBfZnVuY3Rpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS50eXBlID09PSBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIiAmJiBub2RlLmV4cHJlc3Npb24udHlwZSA9PT0gXCJMaXRlcmFsXCIgJiYgbm9kZS5leHByZXNzaW9uLnZhbHVlID09PSBcInVzZSBzdHJpY3RcIjtcblx0fVxufVxuXG52YXIgRW52aXJvbm1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBFbnZpcm9ubWVudCgpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW52aXJvbm1lbnQpO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKEVudmlyb25tZW50LCBbe1xuXHRcdGtleTogXCJpbml0XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHR2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cblx0XHRcdC8vIGNsZWFyIHN0YXRlIGluIGNhc2Ugb2YgcmUtaW5pdFxuXHRcdFx0dGhpcy5jdXJyZW50ID0gbnVsbDtcblx0XHRcdHRoaXMuZ2xvYmFsU2NvcGUgPSBudWxsO1xuXG5cdFx0XHQoMCwgX2VjbWE1MTJbXCJkZWZhdWx0XCJdKSh0aGlzLCBjb25maWcpO1xuXHRcdFx0dGhpcy5vcHMgPSBfT2JqZWN0JGFzc2lnbihfdXRpbHNDb21wYXJlcnMyW1wiZGVmYXVsdFwiXSwgY29uZmlnLmNvbXBhcmVycyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImV2YWx1YXRlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGV2YWx1YXRlKGxlZnQsIHJpZ2h0LCBvcGVyYXRvcikge1xuXHRcdFx0cmV0dXJuIHRoaXMub3BzW29wZXJhdG9yXSh0aGlzLCBsZWZ0LCByaWdodCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFJlZmVyZW5jZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRSZWZlcmVuY2UobmFtZSwgc3RyaWN0KSB7XG5cdFx0XHR2YXIgc2NvcGUgPSB0aGlzLmN1cnJlbnQ7XG5cdFx0XHR3aGlsZSAoc2NvcGUpIHtcblx0XHRcdFx0aWYgKHNjb3BlLmhhc1ZhcmlhYmxlKG5hbWUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNjb3BlLmdldFJlZmVyZW5jZShuYW1lLCBzdHJpY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2NvcGUgPSBzY29wZS5wYXJlbnQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBuZXcgX3JlZmVyZW5jZTJbXCJkZWZhdWx0XCJdKG5hbWUsIHVuZGVmaW5lZCwgc3RyaWN0LCB0aGlzKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUobmFtZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVmZXJlbmNlKG5hbWUpLmdldFZhbHVlKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInB1dFZhbHVlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHB1dFZhbHVlKG5hbWUsIHZhbHVlLCBzdHJpY3QpIHtcblx0XHRcdHRoaXMuY3VycmVudC5wdXRWYWx1ZShuYW1lLCB2YWx1ZSwgc3RyaWN0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzVmFyaWFibGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzVmFyaWFibGUobmFtZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5oYXNWYXJpYWJsZShuYW1lKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0VmFyaWFibGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VmFyaWFibGUobmFtZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5nZXRWYXJpYWJsZShuYW1lKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZGVsZXRlVmFyaWFibGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZGVsZXRlVmFyaWFibGUobmFtZSkge1xuXHRcdFx0dGhpcy5jdXJyZW50LmRlbGV0ZVZhcmlhYmxlKG5hbWUpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJjcmVhdGVWYXJpYWJsZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZShuYW1lLCBpbW11dGFibGUpIHtcblx0XHRcdGlmIChfa2V5d29yZHMyW1wiZGVmYXVsdFwiXS5pc1Jlc2VydmVkKG5hbWUpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBTeW50YXhFcnJvcihcIklsbGVnYWwgdXNlIG9mIHJlc2VydmVkIGtleXdvcmQ6IFwiICsgbmFtZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnQuY3JlYXRlVmFyaWFibGUobmFtZSwgIWltbXV0YWJsZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFRoaXNCaW5kaW5nXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFRoaXNCaW5kaW5nKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5nZXRUaGlzQmluZGluZygpIHx8IHRoaXMuZ2xvYmFsO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJjcmVhdGVFeGVjdXRpb25Db250ZXh0XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUV4ZWN1dGlvbkNvbnRleHQobm9kZSwgY2FsbGVlLCBpc05ldykge1xuXHRcdFx0cmV0dXJuIG5ldyBfZXhlY3V0aW9uQ29udGV4dDJbXCJkZWZhdWx0XCJdKHRoaXMsIG5vZGUsIGNhbGxlZSwgaXNOZXcpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJjcmVhdGVTY29wZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVTY29wZSh0aGlzQXJnKSB7XG5cdFx0XHR2YXIgZW52ID0gbmV3IF9kZWNsYXJhdGl2ZUVudmlyb25tZW50MltcImRlZmF1bHRcIl0odGhpcy5jdXJyZW50LCB0aGlzQXJnLCB0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzLnNldFNjb3BlKGVudik7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImNyZWF0ZU9iamVjdFNjb3BlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZU9iamVjdFNjb3BlKG9iaikge1xuXHRcdFx0dmFyIGVudiA9IG5ldyBfb2JqZWN0RW52aXJvbm1lbnQyW1wiZGVmYXVsdFwiXSh0aGlzLmN1cnJlbnQsIG9iaiwgdGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTY29wZShlbnYpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJpbml0U2NvcGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdFNjb3BlKG5vZGUpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdHZhciBzdHJpY3QgPSBpc1N0cmljdE1vZGUobm9kZSk7XG5cdFx0XHR2YXIgdW5kZWYgPSB0aGlzLmdsb2JhbC5nZXRQcm9wZXJ0eShcInVuZGVmaW5lZFwiKS5nZXRWYWx1ZSgpO1xuXG5cdFx0XHQoMCwgX2hvaXN0ZXIudmlzaXQpKG5vZGUsIGZ1bmN0aW9uIChkZWNsKSB7XG5cdFx0XHRcdHZhciBuYW1lID0gZGVjbC5uYW1lIHx8IGRlY2wuaWQubmFtZTtcblxuXHRcdFx0XHRpZiAoZGVjbC50eXBlID09PSBcIkZ1bmN0aW9uRGVjbGFyYXRpb25cIikge1xuXHRcdFx0XHRcdC8vIGZ1bmN0aW9ucyBjYW4gYmUgdXNlZCBiZWZvcmUgdGhleSBhcmUgZGVmaW5lZFxuXHRcdFx0XHRcdHZhciBmdW5jID0gX3RoaXMub2JqZWN0RmFjdG9yeS5jcmVhdGVGdW5jdGlvbihkZWNsKTtcblx0XHRcdFx0XHRmdW5jLmJpbmRTY29wZShfdGhpcy5jdXJyZW50KTtcblxuXHRcdFx0XHRcdF90aGlzLmNyZWF0ZVZhcmlhYmxlKG5hbWUsIHRydWUpO1xuXHRcdFx0XHRcdF90aGlzLnB1dFZhbHVlKG5hbWUsIGZ1bmMsIHN0cmljdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKF90aGlzLmhhc1ZhcmlhYmxlKG5hbWUpKSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5wdXRWYWx1ZShuYW1lLCB1bmRlZiwgc3RyaWN0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMuY3JlYXRlVmFyaWFibGUobmFtZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwic2V0U2NvcGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2V0U2NvcGUoc2NvcGUpIHtcblx0XHRcdHRoaXMuZ2xvYmFsU2NvcGUgPSB0aGlzLmdsb2JhbFNjb3BlIHx8IHNjb3BlO1xuXG5cdFx0XHR2YXIgZW52ID0gdGhpcztcblx0XHRcdHZhciBwcmlvclNjb3BlID0gdGhpcy5jdXJyZW50IHx8IHRoaXMuZ2xvYmFsU2NvcGU7XG5cdFx0XHR0aGlzLmN1cnJlbnQgPSBzY29wZTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdDogZnVuY3Rpb24gaW5pdChub2RlKSB7XG5cdFx0XHRcdFx0aWYgKCFub2RlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZW52LmluaXRTY29wZShub2RlKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHRleGl0U2NvcGU6IGZ1bmN0aW9uIGV4aXRTY29wZSgpIHtcblx0XHRcdFx0XHRlbnYuc2V0U2NvcGUocHJpb3JTY29wZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIEVudmlyb25tZW50O1xufSkoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFbnZpcm9ubWVudDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzc1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2tcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Byb3BlcnR5UmVmZXJlbmNlID0gcmVxdWlyZShcIi4vcHJvcGVydHktcmVmZXJlbmNlXCIpO1xuXG52YXIgX3Byb3BlcnR5UmVmZXJlbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BlcnR5UmVmZXJlbmNlKTtcblxudmFyIE9iamVjdEVudmlyb25tZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gT2JqZWN0RW52aXJvbm1lbnQocGFyZW50LCBvYmosIGVudikge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBPYmplY3RFbnZpcm9ubWVudCk7XG5cblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLm9iamVjdCA9IHRoaXMudGhpc05vZGUgPSBvYmo7XG5cdFx0dGhpcy5lbnYgPSBlbnY7XG5cdH1cblxuXHRfY3JlYXRlQ2xhc3MoT2JqZWN0RW52aXJvbm1lbnQsIFt7XG5cdFx0a2V5OiBcImdldFJlZmVyZW5jZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRSZWZlcmVuY2UobmFtZSwgc3RyaWN0KSB7XG5cdFx0XHRyZXR1cm4gbmV3IF9wcm9wZXJ0eVJlZmVyZW5jZTJbXCJkZWZhdWx0XCJdKG5hbWUsIHRoaXMub2JqZWN0LCBzdHJpY3QsIHRoaXMuZW52KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzVmFyaWFibGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzVmFyaWFibGUobmFtZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMub2JqZWN0Lmhhc1Byb3BlcnR5KG5hbWUpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJnZXRWYXJpYWJsZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRWYXJpYWJsZShuYW1lKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vYmplY3QuZ2V0UHJvcGVydHkobmFtZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlbGV0ZVZhcmlhYmxlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZVZhcmlhYmxlKG5hbWUpIHtcblx0XHRcdHJldHVybiB0aGlzLm9iamVjdC5kZWxldGVQcm9wZXJ0eShuYW1lLCBmYWxzZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImNyZWF0ZVZhcmlhYmxlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVZhcmlhYmxlKG5hbWUsIGltbXV0YWJsZSkge1xuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5jcmVhdGVWYXJpYWJsZS5hcHBseSh0aGlzLnBhcmVudCwgYXJndW1lbnRzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMub2JqZWN0LmRlZmluZU93blByb3BlcnR5KG5hbWUsIHtcblx0XHRcdFx0XHR2YWx1ZTogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogaW1tdXRhYmxlLFxuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHRcdFx0fSwgdHJ1ZSk7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMub2JqZWN0LmdldFByb3BlcnR5KG5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJwdXRWYWx1ZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBwdXRWYWx1ZShuYW1lLCB2YWx1ZSwgdGhyb3dPbkVycm9yKSB7XG5cdFx0XHRpZiAodGhpcy5wYXJlbnQgJiYgIXRoaXMub2JqZWN0Lmhhc1Byb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50LnB1dFZhbHVlLmFwcGx5KHRoaXMucGFyZW50LCBhcmd1bWVudHMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5vYmplY3QucHV0VmFsdWUobmFtZSwgdmFsdWUsIHRocm93T25FcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFZhbHVlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKG5hbWUsIHRocm93T25FcnJvcikge1xuXHRcdFx0aWYgKCF0aGlzLmhhc1ZhcmlhYmxlKG5hbWUpKSB7XG5cdFx0XHRcdGlmICh0aHJvd09uRXJyb3IpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IobmFtZSArIFwiIGlzIG5vdCBkZWZpbmVkLlwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzLm9iamVjdC5nZXRQcm9wZXJ0eShuYW1lKS5nZXRWYWx1ZSgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJnZXRUaGlzQmluZGluZ1wiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRUaGlzQmluZGluZygpIHtcblx0XHRcdHJldHVybiB0aGlzLm9iamVjdDtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gT2JqZWN0RW52aXJvbm1lbnQ7XG59KSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE9iamVjdEVudmlyb25tZW50O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW5oZXJpdHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlLWNsYXNzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVja1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVmZXJlbmNlID0gcmVxdWlyZShcIi4vcmVmZXJlbmNlXCIpO1xuXG52YXIgX3JlZmVyZW5jZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWZlcmVuY2UpO1xuXG52YXIgX3R5cGVzUHJpbWl0aXZlVHlwZSA9IHJlcXVpcmUoXCIuLi90eXBlcy9wcmltaXRpdmUtdHlwZVwiKTtcblxudmFyIF90eXBlc1ByaW1pdGl2ZVR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZXNQcmltaXRpdmVUeXBlKTtcblxudmFyIFByb3BlcnR5UmVmZXJlbmNlID0gKGZ1bmN0aW9uIChfUmVmZXJlbmNlKSB7XG5cdF9pbmhlcml0cyhQcm9wZXJ0eVJlZmVyZW5jZSwgX1JlZmVyZW5jZSk7XG5cblx0ZnVuY3Rpb24gUHJvcGVydHlSZWZlcmVuY2UobmFtZSwgb2JqZWN0LCBzdHJpY3QsIGVudikge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm9wZXJ0eVJlZmVyZW5jZSk7XG5cblx0XHRfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihQcm9wZXJ0eVJlZmVyZW5jZS5wcm90b3R5cGUpLCBcImNvbnN0cnVjdG9yXCIsIHRoaXMpLmNhbGwodGhpcywgbmFtZSwgb2JqZWN0LCBzdHJpY3QsIGVudik7XG5cdFx0dGhpcy5pc1Byb3BlcnR5UmVmZXJlbmNlID0gdHJ1ZTtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhQcm9wZXJ0eVJlZmVyZW5jZSwgW3tcblx0XHRrZXk6IFwiZ2V0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG5cdFx0XHR2YXIgcHJvcCA9IHRoaXMuYmFzZS5nZXRQcm9wZXJ0eSh0aGlzLm5hbWUpO1xuXHRcdFx0cmV0dXJuIHByb3AgJiYgcHJvcC5nZXRWYWx1ZSgpIHx8IG5ldyBfdHlwZXNQcmltaXRpdmVUeXBlMltcImRlZmF1bHRcIl0oKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwicHV0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gcHV0VmFsdWUodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLmJhc2UuaGFzUHJvcGVydHkodGhpcy5uYW1lKSkge1xuXHRcdFx0XHR0aGlzLmJhc2UucHV0VmFsdWUodGhpcy5uYW1lLCB2YWx1ZSwgdGhpcy5zdHJpY3QsIHRoaXMuZW52KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYmFzZS5kZWZpbmVPd25Qcm9wZXJ0eSh0aGlzLm5hbWUsIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sIHRoaXMuc3RyaWN0LCB0aGlzLmVudik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlbGV0ZUJpbmRpbmdcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZGVsZXRlQmluZGluZyhuYW1lKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5iYXNlLmRlbGV0ZVByb3BlcnR5KG5hbWUsIHRydWUpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJpc1VucmVzb2x2ZWRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaXNVbnJlc29sdmVkKCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBQcm9wZXJ0eVJlZmVyZW5jZTtcbn0pKF9yZWZlcmVuY2UyW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUHJvcGVydHlSZWZlcmVuY2U7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3NcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIFJlZmVyZW5jZSA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIFJlZmVyZW5jZShuYW1lLCBiYXNlLCBzdHJpY3QsIGVudikge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWZlcmVuY2UpO1xuXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLmJhc2UgPSBiYXNlO1xuXHRcdHRoaXMuc3RyaWN0ID0gc3RyaWN0O1xuXHRcdHRoaXMuZW52ID0gZW52O1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKFJlZmVyZW5jZSwgW3tcblx0XHRrZXk6IFwicHV0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gcHV0VmFsdWUodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLmJhc2UgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnN0cmljdCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IodGhpcy5uYW1lICsgXCIgaXMgbm90IGRlZmluZWRcIik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmJhc2UpIHtcblx0XHRcdFx0dGhpcy5iYXNlLnB1dFZhbHVlKHRoaXMubmFtZSwgdmFsdWUsIHRoaXMuc3RyaWN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZW52Lmdsb2JhbC5kZWZpbmVPd25Qcm9wZXJ0eSh0aGlzLm5hbWUsIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG5cdFx0XHRpZiAoIXRoaXMuYmFzZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IodGhpcy5uYW1lICsgXCIgaXMgbm90IGRlZmluZWRcIik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzLmJhc2UuZ2V0VmFsdWUodGhpcy5uYW1lLCB0aGlzLnN0cmljdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlbGV0ZUJpbmRpbmdcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZGVsZXRlQmluZGluZyhuYW1lKSB7XG5cdFx0XHRpZiAodGhpcy5iYXNlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmJhc2UuZGVsZXRlVmFyaWFibGUobmFtZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJpc1VucmVzb2x2ZWRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaXNVbnJlc29sdmVkKCkge1xuXHRcdFx0cmV0dXJuICF0aGlzLmJhc2U7XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIFJlZmVyZW5jZTtcbn0pKCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUmVmZXJlbmNlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV4ZWN1dGlvbkNvbnRleHQ7XG5cbnZhciBfZXhlY3V0aW9uUmVzdWx0ID0gcmVxdWlyZShcIi4vZXhlY3V0aW9uLXJlc3VsdFwiKTtcblxudmFyIF9leGVjdXRpb25SZXN1bHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhlY3V0aW9uUmVzdWx0KTtcblxudmFyIF92aXNpdG9ycyA9IHJlcXVpcmUoXCIuL3Zpc2l0b3JzXCIpO1xuXG52YXIgX3Zpc2l0b3JzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Zpc2l0b3JzKTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4vdXRpbHMvYXN5bmNcIik7XG5cbmZ1bmN0aW9uIEV4ZWN1dGlvbkNvbnRleHQoZW52LCBub2RlLCBjYWxsZWUsIGlzTmV3KSB7XG5cdHRoaXMubm9kZSA9IG5vZGU7XG5cdHRoaXMuY2FsbGVlID0gY2FsbGVlO1xuXHR0aGlzLmVudiA9IGVudjtcblx0dGhpcy5pc05ldyA9ICEhaXNOZXc7XG5cblx0dGhpcy5sYWJlbCA9IFwiXCI7XG5cdHRoaXMudmFsdWUgPSBudWxsO1xuXHR0aGlzLnN0cmljdCA9IGZhbHNlO1xufVxuXG5FeGVjdXRpb25Db250ZXh0LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IEV4ZWN1dGlvbkNvbnRleHQsXG5cblx0ZXhlY3V0ZTogKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBjYWxsZWUkMCQwKCkge1xuXHRcdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gY2FsbGVlJDAkMCQoY29udGV4dCQxJDApIHtcblx0XHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRcdGNhc2UgMDpcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjtcblx0XHRcdFx0XHRyZXR1cm4gX3Zpc2l0b3JzMltcImRlZmF1bHRcIl0udmlzaXQodGhpcyk7XG5cblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dCQxJDAuc2VudCk7XG5cblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcblx0XHRcdH1cblx0XHR9LCBjYWxsZWUkMCQwLCB0aGlzKTtcblx0fSkpLFxuXG5cdGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKG5vZGUsIGNhbGxlZSwgaXNOZXcpIHtcblx0XHR2YXIgY29udGV4dCA9IG5ldyBFeGVjdXRpb25Db250ZXh0KHRoaXMuZW52LCBub2RlLCBjYWxsZWUgfHwgdGhpcy5jYWxsZWUsIGlzTmV3KTtcblx0XHRjb250ZXh0LnZhbHVlID0gdGhpcy52YWx1ZTtcblx0XHRyZXR1cm4gY29udGV4dDtcblx0fSxcblxuXHRjcmVhdGVMYWJlbDogZnVuY3Rpb24gY3JlYXRlTGFiZWwobm9kZSwgbGFiZWwpIHtcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuY3JlYXRlKG5vZGUpO1xuXHRcdGNvbnRleHQubGFiZWwgPSBsYWJlbDtcblx0XHRyZXR1cm4gY29udGV4dDtcblx0fSxcblxuXHRjYW5jZWw6IGZ1bmN0aW9uIGNhbmNlbChsYWJlbCkge1xuXHRcdHZhciByZXN1bHQgPSB0aGlzLnJlc3VsdCh0aGlzLnZhbHVlLCBsYWJlbCk7XG5cdFx0cmVzdWx0LmNhbmNlbCA9IHRydWU7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHRza2lwOiBmdW5jdGlvbiBza2lwKGxhYmVsKSB7XG5cdFx0dmFyIHJlc3VsdCA9IHRoaXMucmVzdWx0KHRoaXMudmFsdWUsIGxhYmVsKTtcblx0XHRyZXN1bHQuc2tpcCA9IHRydWU7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHRleGl0OiBmdW5jdGlvbiBleGl0KHZhbHVlKSB7XG5cdFx0dGhpcy5jYWxsZWUgPSBudWxsO1xuXG5cdFx0dmFyIHJlc3VsdCA9IHRoaXMucmVzdWx0KHZhbHVlKTtcblx0XHRyZXN1bHQuZXhpdCA9IHRydWU7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHRyZXN1bHQ6IGZ1bmN0aW9uIHJlc3VsdCh2YWx1ZSwgbmFtZSwgb2JqKSB7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdHJldHVybiBuZXcgX2V4ZWN1dGlvblJlc3VsdDJbXCJkZWZhdWx0XCJdKHZhbHVlLCBuYW1lLCBvYmopO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5yZXN1bHQoKTtcblx0fVxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzc1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2tcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgRXhlY3V0aW9uUmVzdWx0ID0gKGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gRXhlY3V0aW9uUmVzdWx0KHZhbHVlLCBuYW1lLCBvYmopIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhlY3V0aW9uUmVzdWx0KTtcblxuXHRcdHRoaXMucmVzdWx0ID0gdmFsdWU7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLm9iamVjdCA9IG9iajtcblxuXHRcdHRoaXMuY2FuY2VsID0gZmFsc2U7XG5cdFx0dGhpcy5jYW5jZWxsZWQgPSBmYWxzZTtcblx0XHR0aGlzLmV4aXQgPSBmYWxzZTtcblx0XHR0aGlzLnNraXAgPSBmYWxzZTtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhFeGVjdXRpb25SZXN1bHQsIFt7XG5cdFx0a2V5OiBcImlzQ2FuY2VsbGVkXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGlzQ2FuY2VsbGVkKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY2FuY2VsIHx8IHRoaXMuZXhpdDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwic2hvdWxkQnJlYWtcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQnJlYWsoY29udGV4dCwgbG9vcCwgcHJpb3JSZXN1bHQpIHtcblx0XHRcdGlmICh0aGlzLmV4aXQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5jYW5jZWwgJiYgIXRoaXMuc2tpcCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBicmVha2luZyA9IHRydWU7XG5cdFx0XHRpZiAodGhpcy5uYW1lICYmIHRoaXMubmFtZSA9PT0gY29udGV4dC5sYWJlbCkge1xuXHRcdFx0XHRicmVha2luZyA9IHRoaXMuY2FuY2VsbGVkID0gdGhpcy5jYW5jZWw7XG5cdFx0XHRcdHRoaXMuY2FuY2VsID0gdGhpcy5za2lwID0gZmFsc2U7XG5cblx0XHRcdFx0aWYgKHRoaXMuY2FuY2VsbGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXN1bHQgPSBwcmlvclJlc3VsdCAmJiBwcmlvclJlc3VsdC5yZXN1bHQgfHwgdGhpcy5yZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYnJlYWtpbmc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsb29wICYmICF0aGlzLm5hbWUpIHtcblx0XHRcdFx0YnJlYWtpbmcgPSB0aGlzLmNhbmNlbGxlZCA9IHRoaXMuY2FuY2VsO1xuXHRcdFx0XHR0aGlzLmNhbmNlbCA9IHRoaXMuc2tpcCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlc3VsdCA9IHByaW9yUmVzdWx0ICYmIHByaW9yUmVzdWx0LnJlc3VsdCB8fCB0aGlzLnJlc3VsdDtcblx0XHRcdHJldHVybiBicmVha2luZztcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gRXhlY3V0aW9uUmVzdWx0O1xufSkoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFeGVjdXRpb25SZXN1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG5cdFwiZXM1XCI6IFtcImRvXCIsIFwiaWZcIiwgXCJpblwiLCBcImZvclwiLCBcIm5ld1wiLCBcInRyeVwiLCBcInZhclwiLCBcImNhc2VcIiwgXCJlbHNlXCIsIFwiZW51bVwiLCBcIm51bGxcIiwgXCJ0aGlzXCIsIFwidHJ1ZVwiLCBcInZvaWRcIiwgXCJ3aXRoXCIsIFwiYnJlYWtcIiwgXCJjYXRjaFwiLCBcImNsYXNzXCIsIFwiY29uc3RcIiwgXCJmYWxzZVwiLCBcInN1cGVyXCIsIFwidGhyb3dcIiwgXCJ3aGlsZVwiLCBcImRlbGV0ZVwiLCBcImV4cG9ydFwiLCBcImltcG9ydFwiLCBcInJldHVyblwiLCBcInN3aXRjaFwiLCBcInR5cGVvZlwiLCBcImRlZmF1bHRcIiwgXCJleHRlbmRzXCIsIFwiZmluYWxseVwiLCBcImNvbnRpbnVlXCIsIFwiZGVidWdnZXJcIiwgXCJmdW5jdGlvblwiLCBcImluc3RhbmNlb2ZcIl0sXG5cblx0XCJlczUtc3RyaWN0XCI6IFtcImltcGxlbWVudHNcIiwgXCJsZXRcIiwgXCJwcml2YXRlXCIsIFwicHVibGljXCIsIFwiaW50ZXJmYWNlXCIsIFwicGFja2FnZVwiLCBcInByb3RlY3RlZFwiLCBcInN0YXRpY1wiLCBcInlpZWxkXCJdLFxuXG5cdGlzUmVzZXJ2ZWQ6IGZ1bmN0aW9uIGlzUmVzZXJ2ZWQobmFtZSwgc2NvcGUpIHtcblx0XHRyZXR1cm4gdGhpcy5lczUuaW5kZXhPZihuYW1lKSA+PSAwO1xuXHR9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcImNvcmUtanMvZm4vc3RyaW5nL3JlcGVhdFwiKTtcblxucmVxdWlyZShcImNvcmUtanMvZm4vbWF0aC9zaWduXCIpO1xuXG5yZXF1aXJlKFwiY29yZS1qcy9lczYvcHJvbWlzZVwiKTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW5oZXJpdHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlLWNsYXNzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVja1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JGNyZWF0ZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfb2JqZWN0VHlwZSA9IHJlcXVpcmUoXCIuL29iamVjdC10eXBlXCIpO1xuXG52YXIgX29iamVjdFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0VHlwZSk7XG5cbnZhciBBcmd1bWVudFR5cGUgPSAoZnVuY3Rpb24gKF9PYmplY3RUeXBlKSB7XG5cdF9pbmhlcml0cyhBcmd1bWVudFR5cGUsIF9PYmplY3RUeXBlKTtcblxuXHRmdW5jdGlvbiBBcmd1bWVudFR5cGUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFyZ3VtZW50VHlwZSk7XG5cblx0XHRfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihBcmd1bWVudFR5cGUucHJvdG90eXBlKSwgXCJjb25zdHJ1Y3RvclwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJBcmd1bWVudHNcIjtcblx0XHR0aGlzLnBhcmFtZXRlck1hcCA9IF9PYmplY3QkY3JlYXRlKG51bGwpO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKEFyZ3VtZW50VHlwZSwgW3tcblx0XHRrZXk6IFwibWFwUHJvcGVydHlcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gbWFwUHJvcGVydHkoaW5kZXgsIGJpbmRpbmcpIHtcblx0XHRcdGluZGV4ID0gU3RyaW5nKGluZGV4KTtcblx0XHRcdF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFyZ3VtZW50VHlwZS5wcm90b3R5cGUpLCBcImRlZmluZU93blByb3BlcnR5XCIsIHRoaXMpLmNhbGwodGhpcywgaW5kZXgsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9LCB0cnVlKTtcblx0XHRcdHRoaXMucGFyYW1ldGVyTWFwW2luZGV4XSA9IGJpbmRpbmc7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFByb3BlcnR5KG5hbWUpIHtcblx0XHRcdHZhciBvd25Qcm9wZXJ0eSA9IHRoaXMuZ2V0T3duUHJvcGVydHkobmFtZSk7XG5cdFx0XHRpZiAob3duUHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIG93blByb3BlcnR5O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJndW1lbnRUeXBlLnByb3RvdHlwZSksIFwiZ2V0UHJvcGVydHlcIiwgdGhpcykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0T3duUHJvcGVydHlcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHkobmFtZSkge1xuXHRcdFx0bmFtZSA9IFN0cmluZyhuYW1lKTtcblxuXHRcdFx0aWYgKG5hbWUgaW4gdGhpcy5wYXJhbWV0ZXJNYXApIHtcblx0XHRcdFx0dmFyIG1hcHBlZFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW25hbWVdO1xuXHRcdFx0XHR2YXIgbGlua2VkUHJvcGVydHkgPSB0aGlzLnBhcmFtZXRlck1hcFtuYW1lXTtcblxuXHRcdFx0XHRtYXBwZWRQcm9wZXJ0eS52YWx1ZSA9IGxpbmtlZFByb3BlcnR5LmdldFZhbHVlKCk7XG5cdFx0XHRcdG1hcHBlZFByb3BlcnR5LnNldFZhbHVlID0gbGlua2VkUHJvcGVydHkuc2V0VmFsdWUuYmluZChsaW5rZWRQcm9wZXJ0eSk7XG5cdFx0XHRcdHJldHVybiBtYXBwZWRQcm9wZXJ0eTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFyZ3VtZW50VHlwZS5wcm90b3R5cGUpLCBcImdldE93blByb3BlcnR5XCIsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlZmluZU93blByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGRlZmluZU93blByb3BlcnR5KG5hbWUsIGRlc2NyaXB0b3IsIHRocm93T25FcnJvcikge1xuXHRcdFx0bmFtZSA9IFN0cmluZyhuYW1lKTtcblxuXHRcdFx0dmFyIGFsbG93ZWQgPSBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihBcmd1bWVudFR5cGUucHJvdG90eXBlKSwgXCJkZWZpbmVPd25Qcm9wZXJ0eVwiLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0aWYgKGFsbG93ZWQgJiYgbmFtZSBpbiB0aGlzLnBhcmFtZXRlck1hcCkge1xuXHRcdFx0XHRpZiAoXCJzZXRcIiBpbiBkZXNjcmlwdG9yIHx8IFwiZ2V0XCIgaW4gZGVzY3JpcHRvcikge1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLnBhcmFtZXRlck1hcFtuYW1lXTtcblx0XHRcdFx0fSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikge1xuXHRcdFx0XHRcdHRoaXMucGFyYW1ldGVyTWFwW25hbWVdLnNldFZhbHVlKGRlc2NyaXB0b3IudmFsdWUsIHRocm93T25FcnJvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXCJ3cml0YWJsZVwiIGluIGRlc2NyaXB0b3IgJiYgIWRlc2NyaXB0b3Iud3JpdGFibGUpIHtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5wYXJhbWV0ZXJNYXBbbmFtZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFsbG93ZWQ7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlbGV0ZVByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KG5hbWUsIHRocm93T25FcnJvcikge1xuXHRcdFx0bmFtZSA9IFN0cmluZyhuYW1lKTtcblx0XHRcdGlmIChuYW1lIGluIHRoaXMucGFyYW1ldGVyTWFwKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLnBhcmFtZXRlck1hcFtuYW1lXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFyZ3VtZW50VHlwZS5wcm90b3R5cGUpLCBcImRlbGV0ZVByb3BlcnR5XCIsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIEFyZ3VtZW50VHlwZTtcbn0pKF9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEFyZ3VtZW50VHlwZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9nZXRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2luaGVyaXRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzc1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2tcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfb2JqZWN0VHlwZSA9IHJlcXVpcmUoXCIuL29iamVjdC10eXBlXCIpO1xuXG52YXIgX29iamVjdFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0VHlwZSk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBfdXRpbHNDb250cmFjdHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udHJhY3RzXCIpO1xuXG4vLyB0b2RvOiB0aGlzIGlzIGhhY2t5IC0gcmVtb3ZlIHRoaXMgZm9yIHBhc3NlZCBpbiBlbnZpcm9ubWVudFxuXG52YXIgY29udHJhY3RzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udHJhY3RzKTtcblxudmFyIGxvY2FsT2JqZWN0RmFjdG9yeTtcblxuZnVuY3Rpb24gc2V0SW5kZXgoZW52LCBhcnIsIG5hbWUsIGRlc2NyaXB0b3IsIHRocm93T25FcnJvcikge1xuXHR2YXIgaW5kZXggPSBOdW1iZXIobmFtZSk7XG5cdHZhciBsZW5ndGhQcm9wZXJ0eSA9IGFyci5nZXRQcm9wZXJ0eShcImxlbmd0aFwiKTtcblx0dmFyIGxlbmd0aFZhbHVlID0gbGVuZ3RoUHJvcGVydHkuZ2V0VmFsdWUoKS52YWx1ZTtcblxuXHRpZiAoIWxlbmd0aFByb3BlcnR5LmNhblNldFZhbHVlKCkgJiYgaW5kZXggPj0gbGVuZ3RoVmFsdWUgfHwgIV9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0ucHJvdG90eXBlLmRlZmluZU93blByb3BlcnR5LmNhbGwoYXJyLCBuYW1lLCBkZXNjcmlwdG9yLCBmYWxzZSwgZW52KSkge1xuXG5cdFx0aWYgKHRocm93T25FcnJvcikge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBkZWZpbmUgcHJvcGVydHk6IFwiICsgbmFtZSArIFwiLCBvYmplY3QgaXMgbm90IGV4dGVuc2libGUuXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmIChpbmRleCA+PSBsZW5ndGhWYWx1ZSkge1xuXHRcdHZhciBuZXdMZW5ndGggPSBsb2NhbE9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGluZGV4ICsgMSk7XG5cdFx0YXJyLmRlZmluZU93blByb3BlcnR5KFwibGVuZ3RoXCIsIHsgdmFsdWU6IG5ld0xlbmd0aCB9LCBmYWxzZSwgZW52KTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZXRMZW5ndGgoZW52LCBhcnIsIG5hbWUsIGRlc2NyaXB0b3IsIHRocm93T25FcnJvcikge1xuXHR2YXIgbmV3TGVuZ3RoVmFsdWUgPSBjb252ZXJ0LnRvVUludDMyKGVudiwgZGVzY3JpcHRvci52YWx1ZSk7XG5cdGlmIChuZXdMZW5ndGhWYWx1ZSAhPT0gY29udmVydC50b051bWJlcihlbnYsIGRlc2NyaXB0b3IudmFsdWUpKSB7XG5cdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJBcnJheSBsZW5ndGggb3V0IG9mIHJhbmdlXCIpO1xuXHR9XG5cblx0ZGVzY3JpcHRvci52YWx1ZSA9IGxvY2FsT2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobmV3TGVuZ3RoVmFsdWUpO1xuXHR2YXIgbmV3TGVuZ3RoID0gZGVzY3JpcHRvci52YWx1ZTtcblx0dmFyIGN1cnJlbnRMZW5ndGggPSBhcnIuZ2V0UHJvcGVydHkoXCJsZW5ndGhcIikuZ2V0VmFsdWUoKTtcblx0Y29udHJhY3RzLmFzc2VydElzVmFsaWRBcnJheUxlbmd0aChuZXdMZW5ndGgudmFsdWUpO1xuXG5cdGlmIChuZXdMZW5ndGgudmFsdWUgPj0gY3VycmVudExlbmd0aC52YWx1ZSkge1xuXHRcdHJldHVybiBfb2JqZWN0VHlwZTJbXCJkZWZhdWx0XCJdLnByb3RvdHlwZS5kZWZpbmVPd25Qcm9wZXJ0eS5jYWxsKGFyciwgbmFtZSwgZGVzY3JpcHRvciwgdGhyb3dPbkVycm9yKTtcblx0fVxuXG5cdGlmIChhcnIucHJvcGVydGllcy5sZW5ndGgud3JpdGFibGUgPT09IGZhbHNlKSB7XG5cdFx0aWYgKHRocm93T25FcnJvcikge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWRlZmluZSBwcm9wZXJ0eTogbGVuZ3RoXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBub3RXcml0YWJsZSA9IFwid3JpdGFibGVcIiBpbiBkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLndyaXRhYmxlO1xuXHRpZiAobm90V3JpdGFibGUpIHtcblx0XHQvLyBzZXQgdG8gd3JpdGFibGUgaW4gY2FzZSByZW1vdmluZyBpdGVtcyBmYWlsc1xuXHRcdGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHR9XG5cblx0dmFyIGkgPSBjdXJyZW50TGVuZ3RoLnZhbHVlO1xuXHRpZiAoIV9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0ucHJvdG90eXBlLmRlZmluZU93blByb3BlcnR5LmNhbGwoYXJyLCBuYW1lLCBkZXNjcmlwdG9yLCB0aHJvd09uRXJyb3IpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIHN1Y2NlZWRlZCA9IHRydWU7XG5cdHdoaWxlIChpID4gbmV3TGVuZ3RoLnZhbHVlKSB7XG5cdFx0aWYgKCFhcnIuZGVsZXRlUHJvcGVydHkoLS1pLCBmYWxzZSkpIHtcblx0XHRcdG5ld0xlbmd0aCA9IGxvY2FsT2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUoaSArIDEpO1xuXHRcdFx0YXJyLmRlZmluZU93blByb3BlcnR5KFwibGVuZ3RoXCIsIHsgdmFsdWU6IG5ld0xlbmd0aCB9LCBmYWxzZSk7XG5cdFx0XHRzdWNjZWVkZWQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmIChub3RXcml0YWJsZSkge1xuXHRcdGFyci5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9LCBmYWxzZSk7XG5cdH1cblxuXHRpZiAoIXN1Y2NlZWRlZCAmJiB0aHJvd09uRXJyb3IpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlZGVmaW5lIHByb3BlcnR5OiBsZW5ndGhcIik7XG5cdH1cblxuXHRyZXR1cm4gc3VjY2VlZGVkO1xufVxuXG52YXIgQXJyYXlUeXBlID0gKGZ1bmN0aW9uIChfT2JqZWN0VHlwZSkge1xuXHRfaW5oZXJpdHMoQXJyYXlUeXBlLCBfT2JqZWN0VHlwZSk7XG5cblx0ZnVuY3Rpb24gQXJyYXlUeXBlKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcnJheVR5cGUpO1xuXG5cdFx0X2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJyYXlUeXBlLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzKTtcblx0XHR0aGlzLmNsYXNzTmFtZSA9IFwiQXJyYXlcIjtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhBcnJheVR5cGUsIFt7XG5cdFx0a2V5OiBcImluaXRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdChvYmplY3RGYWN0b3J5KSB7XG5cdFx0XHRsb2NhbE9iamVjdEZhY3RvcnkgPSBvYmplY3RGYWN0b3J5O1xuXHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7IHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSgwKSwgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJwdXRWYWx1ZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBwdXRWYWx1ZShuYW1lLCB2YWx1ZSwgdGhyb3dPbkVycm9yLCBlbnYpIHtcblx0XHRcdGlmIChuYW1lID09PSBcImxlbmd0aFwiKSB7XG5cdFx0XHRcdHNldExlbmd0aChlbnYsIHRoaXMsIG5hbWUsIHsgdmFsdWU6IHZhbHVlIH0sIHRocm93T25FcnJvcik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0X2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJyYXlUeXBlLnByb3RvdHlwZSksIFwicHV0VmFsdWVcIiwgdGhpcykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZGVmaW5lT3duUHJvcGVydHlcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZGVmaW5lT3duUHJvcGVydHkobmFtZSwgZGVzY3JpcHRvciwgdGhyb3dPbkVycm9yLCBlbnYpIHtcblx0XHRcdGlmIChjb250cmFjdHMuaXNJbnRlZ2VyKG5hbWUpICYmIGNvbnRyYWN0cy5pc1ZhbGlkQXJyYXlMZW5ndGgoTnVtYmVyKG5hbWUpICsgMSkgJiYgIXRoaXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIHNldEluZGV4KGVudiwgdGhpcywgbmFtZSwgZGVzY3JpcHRvciwgdGhyb3dPbkVycm9yKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG5hbWUgPT09IFwibGVuZ3RoXCIgJiYgXCJsZW5ndGhcIiBpbiB0aGlzLnByb3BlcnRpZXMgJiYgZGVzY3JpcHRvciAmJiBcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikge1xuXHRcdFx0XHRyZXR1cm4gc2V0TGVuZ3RoKGVudiwgdGhpcywgbmFtZSwgZGVzY3JpcHRvciwgdGhyb3dPbkVycm9yKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFycmF5VHlwZS5wcm90b3R5cGUpLCBcImRlZmluZU93blByb3BlcnR5XCIsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInVud3JhcFwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB1bndyYXAoKSB7XG5cdFx0XHR2YXIgYXJyID0gW107XG5cblx0XHRcdC8vIHRoaXMgd29uJ3QgZ3JhYiBwcm9wZXJ0aWVzIGZyb20gdGhlIHByb3RvdHlwZSAtIGRvIHdlIGNhcmU/XG5cdFx0XHQvLyBpdCdzIGFuIGVkZ2UgY2FzZSBidXQgd2UgbWF5IHdhbnQgdG8gYWRkcmVzcyBpdFxuXHRcdFx0Zm9yICh2YXIgaW5kZXggaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdGlmICh0aGlzLnByb3BlcnRpZXNbaW5kZXhdLmVudW1lcmFibGUpIHtcblx0XHRcdFx0XHRhcnJbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmdldFZhbHVlKGluZGV4KS51bndyYXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYXJyO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBBcnJheVR5cGU7XG59KShfb2JqZWN0VHlwZTJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBcnJheVR5cGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZ2V0XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbmhlcml0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3NcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9vYmplY3RUeXBlID0gcmVxdWlyZShcIi4vb2JqZWN0LXR5cGVcIik7XG5cbnZhciBfb2JqZWN0VHlwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RUeXBlKTtcblxudmFyIERhdGVUeXBlID0gKGZ1bmN0aW9uIChfT2JqZWN0VHlwZSkge1xuXHRfaW5oZXJpdHMoRGF0ZVR5cGUsIF9PYmplY3RUeXBlKTtcblxuXHRmdW5jdGlvbiBEYXRlVHlwZSh2YWx1ZSkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEYXRlVHlwZSk7XG5cblx0XHRfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihEYXRlVHlwZS5wcm90b3R5cGUpLCBcImNvbnN0cnVjdG9yXCIsIHRoaXMpLmNhbGwodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdHRoaXMudHlwZSA9IFwib2JqZWN0XCI7XG5cdFx0dGhpcy5jbGFzc05hbWUgPSBcIkRhdGVcIjtcblxuXHRcdC8vIDExLjYuMSBOb3RlIDFcblx0XHQvLyBBbGwgbmF0aXZlIEVDTUFTY3JpcHQgb2JqZWN0cyBleGNlcHQgRGF0ZSBvYmplY3RzIGhhbmRsZSB0aGUgYWJzZW5jZSBvZiBhIGhpbnQgYXMgaWYgdGhlIGhpbnRcblx0XHQvLyBOdW1iZXIgd2VyZSBnaXZlbjsgRGF0ZSBvYmplY3RzIGhhbmRsZSB0aGUgYWJzZW5jZSBvZiBhIGhpbnQgYXMgaWYgdGhlIGhpbnQgU3RyaW5nIHdlcmUgZ2l2ZW4uXG5cdFx0dGhpcy5wcmltaXRpdmVIaW50ID0gXCJzdHJpbmdcIjtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhEYXRlVHlwZSwgW3tcblx0XHRrZXk6IFwidW53cmFwXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHVud3JhcCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBEYXRlVHlwZTtcbn0pKF9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IERhdGVUeXBlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW5oZXJpdHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVja1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfb2JqZWN0VHlwZSA9IHJlcXVpcmUoXCIuL29iamVjdC10eXBlXCIpO1xuXG52YXIgX29iamVjdFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0VHlwZSk7XG5cbnZhciBFcnJvclR5cGUgPSAoZnVuY3Rpb24gKF9PYmplY3RUeXBlKSB7XG5cdF9pbmhlcml0cyhFcnJvclR5cGUsIF9PYmplY3RUeXBlKTtcblxuXHRmdW5jdGlvbiBFcnJvclR5cGUoc291cmNlKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVycm9yVHlwZSk7XG5cblx0XHRfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihFcnJvclR5cGUucHJvdG90eXBlKSwgXCJjb25zdHJ1Y3RvclwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXHRcdHRoaXMuc291cmNlID0gc291cmNlO1xuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJFcnJvclwiO1xuXHR9XG5cblx0cmV0dXJuIEVycm9yVHlwZTtcbn0pKF9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEVycm9yVHlwZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9nZXRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2luaGVyaXRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzc1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2tcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfb2JqZWN0VHlwZSA9IHJlcXVpcmUoXCIuL29iamVjdC10eXBlXCIpO1xuXG52YXIgX29iamVjdFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0VHlwZSk7XG5cbnZhciBfcHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxudmFyIF9wcm9wZXJ0eURlc2NyaXB0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcGVydHlEZXNjcmlwdG9yKTtcblxudmFyIF91dGlsc0NvbnRyYWN0cyA9IHJlcXVpcmUoXCIuLi91dGlscy9jb250cmFjdHNcIik7XG5cbnZhciBjb250cmFjdHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb250cmFjdHMpO1xuXG52YXIgRnVuY3Rpb25UeXBlID0gKGZ1bmN0aW9uIChfT2JqZWN0VHlwZSkge1xuXHRfaW5oZXJpdHMoRnVuY3Rpb25UeXBlLCBfT2JqZWN0VHlwZSk7XG5cblx0ZnVuY3Rpb24gRnVuY3Rpb25UeXBlKG5vZGUpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRnVuY3Rpb25UeXBlKTtcblxuXHRcdF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEZ1bmN0aW9uVHlwZS5wcm90b3R5cGUpLCBcImNvbnN0cnVjdG9yXCIsIHRoaXMpLmNhbGwodGhpcyk7XG5cdFx0dGhpcy50eXBlID0gXCJmdW5jdGlvblwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJGdW5jdGlvblwiO1xuXHRcdHRoaXMubmF0aXZlID0gZmFsc2U7XG5cdFx0dGhpcy5ub2RlID0gbm9kZTtcblxuXHRcdHRoaXMucGFyZW50U2NvcGUgPSBudWxsO1xuXHRcdHRoaXMuYm91bmRUaGlzID0gbnVsbDtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhGdW5jdGlvblR5cGUsIFt7XG5cdFx0a2V5OiBcImluaXRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdChvYmplY3RGYWN0b3J5LCBwcm90bywgZGVzY3JpcHRvcikge1xuXHRcdFx0Ly8gc2V0IGxlbmd0aCBwcm9wZXJ0eSBmcm9tIHRoZSBudW1iZXIgb2YgcGFyYW1ldGVyc1xuXHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7XG5cdFx0XHRcdHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh0aGlzLm5vZGUucGFyYW1zLmxlbmd0aCksXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHR3cml0YWJsZTogZmFsc2Vcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBmdW5jdGlvbnMgaGF2ZSBhIHByb3RvdHlwZVxuXHRcdFx0cHJvdG8gPSBwcm90byB8fCBvYmplY3RGYWN0b3J5LmNyZWF0ZU9iamVjdCgpO1xuXHRcdFx0cHJvdG8ucHJvcGVydGllcy5jb25zdHJ1Y3RvciA9IG5ldyBfcHJvcGVydHlEZXNjcmlwdG9yMltcImRlZmF1bHRcIl0odGhpcywgeyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHRoaXMgfSk7XG5cdFx0XHR0aGlzLmRlZmluZU93blByb3BlcnR5KFwicHJvdG90eXBlXCIsIHsgdmFsdWU6IHByb3RvLCBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFByb3BlcnR5KG5hbWUpIHtcblx0XHRcdHZhciBwcm9wID0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRnVuY3Rpb25UeXBlLnByb3RvdHlwZSksIFwiZ2V0UHJvcGVydHlcIiwgdGhpcykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdGlmICghcHJvcCAmJiBuYW1lICE9PSBcInByb3RvdHlwZVwiKSB7XG5cdFx0XHRcdC8vIHNpbmNlIGEgZnVuY3Rpb24gaW5zdGFuY2UgaXMgaXRzZWxmIGEgZnVuY3Rpb24gbG9vayBhdCBvdXIgb3duIHByb3RvdHlwZVxuXHRcdFx0XHR2YXIgcHJvdG8gPSB0aGlzLmdldFByb3BlcnR5KFwicHJvdG90eXBlXCIpO1xuXHRcdFx0XHRyZXR1cm4gcHJvdG8gJiYgcHJvdG8uZ2V0VmFsdWUoKS5nZXRQcm9wZXJ0eShuYW1lKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3A7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImJpbmRUaGlzXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJpbmRUaGlzKHRoaXNBcmcpIHtcblx0XHRcdHRoaXMuYm91bmRUaGlzID0gdGhpc0FyZztcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiYmluZFNjb3BlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJpbmRTY29wZShzY29wZSkge1xuXHRcdFx0dGhpcy5wYXJlbnRTY29wZSA9IHNjb3BlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJjcmVhdGVTY29wZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVTY29wZShlbnYsIHRoaXNBcmcpIHtcblx0XHRcdC8vIGlmIGEgcGFyZW50IHNjb3BlIGlzIGRlZmluZWQgd2UgbmVlZCB0byBsaW1pdCB0aGUgc2NvcGUgdG8gdGhhdCBzY29wZVxuXHRcdFx0dmFyIHByaW9yU2NvcGUgPSBlbnYuY3VycmVudDtcblx0XHRcdGlmICh0aGlzLnBhcmVudFNjb3BlKSB7XG5cdFx0XHRcdGVudi5jdXJyZW50ID0gdGhpcy5wYXJlbnRTY29wZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXHRcdFx0aWYgKHRoaXMuYm91bmRUaGlzKSB7XG5cdFx0XHRcdGFyZ3NbMF0gPSB0aGlzLmJvdW5kVGhpcztcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNjb3BlID0gZW52LmNyZWF0ZVNjb3BlLmFwcGx5KGVudiwgYXJncyk7XG5cdFx0XHRpZiAoIXRoaXMubmF0aXZlKSB7XG5cdFx0XHRcdHNjb3BlLmluaXQodGhpcy5ub2RlLmJvZHkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleGl0U2NvcGU6IGZ1bmN0aW9uIGV4aXRTY29wZSgpIHtcblx0XHRcdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdFx0XHRlbnYuY3VycmVudCA9IHByaW9yU2NvcGU7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImhhc0luc3RhbmNlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhc0luc3RhbmNlKG9iaikge1xuXHRcdFx0aWYgKG9iaiA9PT0gdGhpcykge1xuXHRcdFx0XHQvLyBvYmplY3Qgb2J2aW91c2x5IGlzbid0IGFuIGluc3RhbmNlIGluIHRoaXMgY2FzZVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciB2aXNpdGVkID0gW107XG5cdFx0XHR2YXIgY3VycmVudCA9IG9iajtcblxuXHRcdFx0dmFyIHByb3RvID0gdGhpcy5nZXRQcm9wZXJ0eShcInByb3RvdHlwZVwiKS5nZXRWYWx1ZSgpO1xuXHRcdFx0aWYgKGNvbnRyYWN0cy5pc051bGxPclVuZGVmaW5lZChwcm90bykgfHwgIWNvbnRyYWN0cy5pc09iamVjdChwcm90bykpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGhhcyBub24tb2JqZWN0IHByb3RvdHlwZSBpbiBpbnN0YW5jZW9mIGNoZWNrXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoY3VycmVudCkge1xuXHRcdFx0XHRpZiAodmlzaXRlZC5pbmRleE9mKGN1cnJlbnQpID49IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudCA9PT0gcHJvdG8pIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGtlZXAgYSBzdGFjayB0byBhdm9pZCBjaXJjdWxhciByZWZlcmVuY2Vcblx0XHRcdFx0dmlzaXRlZC5wdXNoKGN1cnJlbnQpO1xuXHRcdFx0XHRjdXJyZW50ID0gY3VycmVudC5nZXRQcm90b3R5cGUoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJ1bndyYXBcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gdW53cmFwKCkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gRnVuY3Rpb25UeXBlO1xufSkoX29iamVjdFR5cGUyW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRnVuY3Rpb25UeXBlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW5oZXJpdHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlLWNsYXNzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVja1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZnVuY3Rpb25UeXBlID0gcmVxdWlyZShcIi4vZnVuY3Rpb24tdHlwZVwiKTtcblxudmFyIF9mdW5jdGlvblR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnVuY3Rpb25UeXBlKTtcblxudmFyIF9wcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpO1xuXG52YXIgX3Byb3BlcnR5RGVzY3JpcHRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG52YXIgTmF0aXZlRnVuY3Rpb25UeXBlID0gKGZ1bmN0aW9uIChfRnVuY3Rpb25UeXBlKSB7XG5cdF9pbmhlcml0cyhOYXRpdmVGdW5jdGlvblR5cGUsIF9GdW5jdGlvblR5cGUpO1xuXG5cdGZ1bmN0aW9uIE5hdGl2ZUZ1bmN0aW9uVHlwZShmbikge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXRpdmVGdW5jdGlvblR5cGUpO1xuXG5cdFx0X2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoTmF0aXZlRnVuY3Rpb25UeXBlLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzKTtcblx0XHR0aGlzLnR5cGUgPSBcImZ1bmN0aW9uXCI7XG5cdFx0dGhpcy5uYXRpdmUgPSB0cnVlO1xuXHRcdHRoaXMubmF0aXZlRnVuY3Rpb24gPSBmbjtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhOYXRpdmVGdW5jdGlvblR5cGUsIFt7XG5cdFx0a2V5OiBcImluaXRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdChvYmplY3RGYWN0b3J5LCBwcm90bywgZGVzY3JpcHRvcikge1xuXHRcdFx0dmFyIGxlbmd0aCA9IHRoaXMubmF0aXZlRnVuY3Rpb24ubGVuZ3RoO1xuXHRcdFx0aWYgKFwibmF0aXZlTGVuZ3RoXCIgaW4gdGhpcy5uYXRpdmVGdW5jdGlvbikge1xuXHRcdFx0XHRsZW5ndGggPSB0aGlzLm5hdGl2ZUZ1bmN0aW9uLm5hdGl2ZUxlbmd0aDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7XG5cdFx0XHRcdHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShsZW5ndGgpLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0d3JpdGFibGU6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvdG8gPSBwcm90byB8fCBvYmplY3RGYWN0b3J5LmNyZWF0ZU9iamVjdCgpO1xuXHRcdFx0cHJvdG8ucHJvcGVydGllcy5jb25zdHJ1Y3RvciA9IG5ldyBfcHJvcGVydHlEZXNjcmlwdG9yMltcImRlZmF1bHRcIl0odGhpcywgeyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHRoaXMgfSk7XG5cblx0XHRcdGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9yIHx8IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH07XG5cdFx0XHR2YXIgcHJvdG9EZXNjcmlwdG9yID0ge1xuXHRcdFx0XHR2YWx1ZTogcHJvdG8sXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogZGVzY3JpcHRvci5jb25maWd1cmFibGUsXG5cdFx0XHRcdGVudW1lcmFibGU6IGRlc2NyaXB0b3IuZW51bWVyYWJsZSxcblx0XHRcdFx0d3JpdGFibGU6IGRlc2NyaXB0b3Iud3JpdGFibGVcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZGVmaW5lT3duUHJvcGVydHkoXCJwcm90b3R5cGVcIiwgcHJvdG9EZXNjcmlwdG9yKTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gTmF0aXZlRnVuY3Rpb25UeXBlO1xufSkoX2Z1bmN0aW9uVHlwZTJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBOYXRpdmVGdW5jdGlvblR5cGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE9iamVjdEZhY3Rvcnk7XG5cbnZhciBfcHJpbWl0aXZlVHlwZSA9IHJlcXVpcmUoXCIuL3ByaW1pdGl2ZS10eXBlXCIpO1xuXG52YXIgX3ByaW1pdGl2ZVR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJpbWl0aXZlVHlwZSk7XG5cbnZhciBfZnVuY3Rpb25UeXBlID0gcmVxdWlyZShcIi4vZnVuY3Rpb24tdHlwZVwiKTtcblxudmFyIF9mdW5jdGlvblR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnVuY3Rpb25UeXBlKTtcblxudmFyIF9uYXRpdmVGdW5jdGlvblR5cGUgPSByZXF1aXJlKFwiLi9uYXRpdmUtZnVuY3Rpb24tdHlwZVwiKTtcblxudmFyIF9uYXRpdmVGdW5jdGlvblR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbmF0aXZlRnVuY3Rpb25UeXBlKTtcblxudmFyIF9yZWdleFR5cGUgPSByZXF1aXJlKFwiLi9yZWdleC10eXBlXCIpO1xuXG52YXIgX3JlZ2V4VHlwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWdleFR5cGUpO1xuXG52YXIgX29iamVjdFR5cGUgPSByZXF1aXJlKFwiLi9vYmplY3QtdHlwZVwiKTtcblxudmFyIF9vYmplY3RUeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29iamVjdFR5cGUpO1xuXG52YXIgX2FycmF5VHlwZSA9IHJlcXVpcmUoXCIuL2FycmF5LXR5cGVcIik7XG5cbnZhciBfYXJyYXlUeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FycmF5VHlwZSk7XG5cbnZhciBfc3RyaW5nVHlwZSA9IHJlcXVpcmUoXCIuL3N0cmluZy10eXBlXCIpO1xuXG52YXIgX3N0cmluZ1R5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RyaW5nVHlwZSk7XG5cbnZhciBfZGF0ZVR5cGUgPSByZXF1aXJlKFwiLi9kYXRlLXR5cGVcIik7XG5cbnZhciBfZGF0ZVR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGF0ZVR5cGUpO1xuXG52YXIgX2Vycm9yVHlwZSA9IHJlcXVpcmUoXCIuL2Vycm9yLXR5cGVcIik7XG5cbnZhciBfZXJyb3JUeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Vycm9yVHlwZSk7XG5cbnZhciBfYXJndW1lbnRUeXBlID0gcmVxdWlyZShcIi4vYXJndW1lbnQtdHlwZVwiKTtcblxudmFyIF9hcmd1bWVudFR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXJndW1lbnRUeXBlKTtcblxudmFyIF91dGlsc0NvbnRyYWN0cyA9IHJlcXVpcmUoXCIuLi91dGlscy9jb250cmFjdHNcIik7XG5cbnZhciBjb250cmFjdHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb250cmFjdHMpO1xuXG52YXIgcGFyZW50bGVzcyA9IHtcblx0XCJVbmRlZmluZWRcIjogdHJ1ZSxcblx0XCJOdWxsXCI6IHRydWUsXG5cdFwiRnVuY3Rpb25cIjogdHJ1ZVxufTtcblxudmFyIG9ycGhhbnMgPSBfT2JqZWN0JGNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gc2V0T3JwaGFucyhzY29wZSkge1xuXHR2YXIgcGFyZW50O1xuXG5cdGZvciAodmFyIHR5cGVOYW1lIGluIG9ycGhhbnMpIHtcblx0XHRwYXJlbnQgPSBzY29wZS5nZXRWYWx1ZSh0eXBlTmFtZSk7XG5cdFx0aWYgKHBhcmVudCkge1xuXHRcdFx0b3JwaGFuc1t0eXBlTmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcblx0XHRcdFx0Y2hpbGQuc2V0UHJvdG90eXBlKHBhcmVudC5nZXRQcm9wZXJ0eShcInByb3RvdHlwZVwiKS5nZXRWYWx1ZSgpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkZWxldGUgb3JwaGFuc1t0eXBlTmFtZV07XG5cdFx0fVxuXHR9XG5cblx0b3JwaGFucyA9IF9PYmplY3QkY3JlYXRlKG51bGwpO1xufVxuXG5mdW5jdGlvbiBzZXRQcm90byh0eXBlTmFtZSwgaW5zdGFuY2UsIGVudikge1xuXHRpZiAodHlwZU5hbWUgaW4gcGFyZW50bGVzcykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBwYXJlbnQgPSBlbnYuZ2V0UmVmZXJlbmNlKHR5cGVOYW1lKTtcblx0aWYgKCFwYXJlbnQuaXNVbnJlc29sdmVkKCkpIHtcblx0XHRpbnN0YW5jZS5zZXRQcm90b3R5cGUocGFyZW50LmdldFZhbHVlKCkuZ2V0UHJvcGVydHkoXCJwcm90b3R5cGVcIikuZ2V0VmFsdWUoKSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gZHVyaW5nIGluaXRpYWxpemF0aW9uIGl0IGlzIHBvc3NpYmxlIGZvciBvYmplY3RzIHRvIGJlIGNyZWF0ZWRcblx0Ly8gYmVmb3JlIHRoZSB0eXBlcyBoYXZlIGJlZW4gcmVnaXN0ZXJlZCAtIGFkZCBhIHJlZ2lzdHJ5IG9mIGl0ZW1zXG5cdC8vIGFuZCB0aGVzZSBjYW4gYmUgZmlsbGVkIGluIHdoZW4gdGhlIHR5cGUgaXMgcmVnaXN0ZXJlZFxuXHRvcnBoYW5zW3R5cGVOYW1lXSA9IG9ycGhhbnNbdHlwZU5hbWVdIHx8IFtdO1xuXHRvcnBoYW5zW3R5cGVOYW1lXS5wdXNoKGluc3RhbmNlKTtcbn1cblxuZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShlbnYpIHtcblx0dGhpcy5lbnYgPSBlbnY7XG59XG5cbk9iamVjdEZhY3RvcnkucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogT2JqZWN0RmFjdG9yeSxcblxuXHRpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuXHRcdHNldE9ycGhhbnModGhpcy5lbnYpO1xuXHR9LFxuXG5cdGNyZWF0ZVByaW1pdGl2ZTogZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRoaXMuY3JlYXRlKGNvbnRyYWN0cy5nZXRUeXBlKHZhbHVlKSwgdmFsdWUpO1xuXHR9LFxuXG5cdGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKHR5cGVOYW1lLCB2YWx1ZSkge1xuXHRcdHZhciBpbnN0YW5jZTtcblxuXHRcdHN3aXRjaCAodHlwZU5hbWUpIHtcblx0XHRcdGNhc2UgXCJTdHJpbmdcIjpcblx0XHRcdFx0aW5zdGFuY2UgPSBuZXcgX3N0cmluZ1R5cGUyW1wiZGVmYXVsdFwiXSh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwiTnVtYmVyXCI6XG5cdFx0XHRjYXNlIFwiQm9vbGVhblwiOlxuXHRcdFx0Y2FzZSBcIk51bGxcIjpcblx0XHRcdGNhc2UgXCJVbmRlZmluZWRcIjpcblx0XHRcdFx0aW5zdGFuY2UgPSBuZXcgX3ByaW1pdGl2ZVR5cGUyW1wiZGVmYXVsdFwiXSh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwiRGF0ZVwiOlxuXHRcdFx0XHRpbnN0YW5jZSA9IG5ldyBfZGF0ZVR5cGUyW1wiZGVmYXVsdFwiXSh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwiUmVnRXhwXCI6XG5cdFx0XHRcdGluc3RhbmNlID0gbmV3IF9yZWdleFR5cGUyW1wiZGVmYXVsdFwiXSh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwiQXJyYXlcIjpcblx0XHRcdFx0aW5zdGFuY2UgPSBuZXcgX2FycmF5VHlwZTJbXCJkZWZhdWx0XCJdKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwiRXJyb3JcIjpcblx0XHRcdFx0aW5zdGFuY2UgPSBuZXcgX2Vycm9yVHlwZTJbXCJkZWZhdWx0XCJdKHZhbHVlKTtcblxuXHRcdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0XHR0eXBlTmFtZSA9IHZhbHVlLm5hbWUgfHwgdHlwZU5hbWU7XG5cdFx0XHRcdFx0aW5zdGFuY2UuZGVmaW5lT3duUHJvcGVydHkoXCJtZXNzYWdlXCIsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmNyZWF0ZVByaW1pdGl2ZSh2YWx1ZS5tZXNzYWdlKSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYSBwcmltaXRpdmU6IFwiICsgdmFsdWUpO1xuXHRcdH1cblxuXHRcdGluc3RhbmNlLmluaXQodGhpcyk7XG5cdFx0c2V0UHJvdG8odHlwZU5hbWUsIGluc3RhbmNlLCB0aGlzLmVudik7XG5cdFx0cmV0dXJuIGluc3RhbmNlO1xuXHR9LFxuXG5cdGNyZWF0ZU9iamVjdDogZnVuY3Rpb24gY3JlYXRlT2JqZWN0KHBhcmVudCkge1xuXHRcdHZhciBpbnN0YW5jZSA9IG5ldyBfb2JqZWN0VHlwZTJbXCJkZWZhdWx0XCJdKCk7XG5cblx0XHRpZiAocGFyZW50ICE9PSBudWxsKSB7XG5cdFx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRcdGluc3RhbmNlLnNldFByb3RvdHlwZShwYXJlbnQgJiYgcGFyZW50LmdldFByb3BlcnR5KFwicHJvdG90eXBlXCIpLmdldFZhbHVlKCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0UHJvdG8oXCJPYmplY3RcIiwgaW5zdGFuY2UsIHRoaXMuZW52KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpbnN0YW5jZS5pbml0KHRoaXMpO1xuXHRcdHJldHVybiBpbnN0YW5jZTtcblx0fSxcblxuXHRjcmVhdGVBcmd1bWVudHM6IGZ1bmN0aW9uIGNyZWF0ZUFyZ3VtZW50cyhhcmdzLCBjYWxsZWUpIHtcblx0XHR2YXIgaW5zdGFuY2UgPSBuZXcgX2FyZ3VtZW50VHlwZTJbXCJkZWZhdWx0XCJdKCk7XG5cdFx0dmFyIG9iamVjdENsYXNzID0gdGhpcy5lbnYuZ2xvYmFsLmdldFByb3BlcnR5KFwiT2JqZWN0XCIpLmdldFZhbHVlKCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KHRoaXMsIG9iamVjdENsYXNzLCBvYmplY3RDbGFzcy5wcm90byk7XG5cdFx0aW5zdGFuY2Uuc2V0UHJvdG90eXBlKG9iamVjdENsYXNzLmdldFByb3BlcnR5KFwicHJvdG90eXBlXCIpLmdldFZhbHVlKCkpO1xuXHRcdGluc3RhbmNlLmRlZmluZU93blByb3BlcnR5KFwiY2FsbGVlXCIsIHsgdmFsdWU6IGNhbGxlZSwgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfSk7XG5cdFx0cmV0dXJuIGluc3RhbmNlO1xuXHR9LFxuXG5cdGNyZWF0ZUZ1bmN0aW9uOiBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbihmbk9yTm9kZSwgcHJvdG8sIGRlc2NyaXB0b3IpIHtcblx0XHR2YXIgaW5zdGFuY2U7XG5cblx0XHRpZiAodHlwZW9mIGZuT3JOb2RlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdGluc3RhbmNlID0gbmV3IF9uYXRpdmVGdW5jdGlvblR5cGUyW1wiZGVmYXVsdFwiXShmbk9yTm9kZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluc3RhbmNlID0gbmV3IF9mdW5jdGlvblR5cGUyW1wiZGVmYXVsdFwiXShmbk9yTm9kZSk7XG5cdFx0fVxuXG5cdFx0aW5zdGFuY2UuaW5pdCh0aGlzLCBwcm90bywgZGVzY3JpcHRvcik7XG5cblx0XHR2YXIgZnVuY3Rpb25DbGFzcyA9IHRoaXMuZW52LmdldFJlZmVyZW5jZShcIkZ1bmN0aW9uXCIpO1xuXHRcdGlmIChmdW5jdGlvbkNsYXNzICYmICFmdW5jdGlvbkNsYXNzLmlzVW5yZXNvbHZlZCgpKSB7XG5cdFx0XHRpbnN0YW5jZS5zZXRQcm90b3R5cGUoZnVuY3Rpb25DbGFzcy5nZXRWYWx1ZSgpLmdldFByb3BlcnR5KFwicHJvdG90eXBlXCIpLmdldFZhbHVlKCkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnN0YW5jZTtcblx0fSxcblxuXHRjcmVhdGVCdWlsdEluRnVuY3Rpb246IGZ1bmN0aW9uIGNyZWF0ZUJ1aWx0SW5GdW5jdGlvbihmbiwgbGVuZ3RoLCBtZXRob2ROYW1lKSB7XG5cdFx0dmFyIGluc3RhbmNlID0gbmV3IF9uYXRpdmVGdW5jdGlvblR5cGUyW1wiZGVmYXVsdFwiXShmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5pc05ldykge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKG1ldGhvZE5hbWUgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvclwiKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fSk7XG5cblx0XHRpbnN0YW5jZS5zZXRQcm90b3R5cGUodGhpcy5lbnYuZ2V0VmFsdWUoXCJGdW5jdGlvblwiKS5nZXRQcm9wZXJ0eShcInByb3RvdHlwZVwiKS5nZXRWYWx1ZSgpKTtcblx0XHRpbnN0YW5jZS5idWlsdEluID0gdHJ1ZTtcblx0XHRpbnN0YW5jZS5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7IHZhbHVlOiB0aGlzLmNyZWF0ZVByaW1pdGl2ZShsZW5ndGgpLCBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuXHRcdHJldHVybiBpbnN0YW5jZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3RGYWN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlLWNsYXNzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVja1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JGNyZWF0ZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JGtleXMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpO1xuXG52YXIgX3Byb3BlcnR5RGVzY3JpcHRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG52YXIgT2JqZWN0VHlwZSA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIE9iamVjdFR5cGUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIE9iamVjdFR5cGUpO1xuXG5cdFx0dGhpcy5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuXHRcdHRoaXMudHlwZSA9IFwib2JqZWN0XCI7XG5cdFx0dGhpcy5jbGFzc05hbWUgPSBcIk9iamVjdFwiO1xuXHRcdHRoaXMucHJvcGVydGllcyA9IF9PYmplY3QkY3JlYXRlKG51bGwpO1xuXHRcdHRoaXMuZXh0ZW5zaWJsZSA9IHRydWU7XG5cblx0XHR0aGlzLnByaW1pdGl2ZUhpbnQgPSBcIm51bWJlclwiO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKE9iamVjdFR5cGUsIFt7XG5cdFx0a2V5OiBcImluaXRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHt9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0UHJvdG90eXBlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFByb3RvdHlwZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLnByb3RvO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJzZXRQcm90b3R5cGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2V0UHJvdG90eXBlKHByb3RvKSB7XG5cdFx0XHR0aGlzLnByb3RvID0gcHJvdG87XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFByb3BlcnR5KG5hbWUpIHtcblx0XHRcdG5hbWUgPSBTdHJpbmcobmFtZSk7XG5cblx0XHRcdHZhciBjdXJyZW50ID0gdGhpcztcblx0XHRcdHdoaWxlIChjdXJyZW50KSB7XG5cdFx0XHRcdGlmIChuYW1lIGluIGN1cnJlbnQucHJvcGVydGllcykge1xuXHRcdFx0XHRcdHJldHVybiBjdXJyZW50LnByb3BlcnRpZXNbbmFtZV0uYmluZCh0aGlzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LmdldFByb3RvdHlwZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJnZXRPd25Qcm9wZXJ0eVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eShuYW1lKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wZXJ0aWVzW1N0cmluZyhuYW1lKV07XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldE93blByb3BlcnR5TmFtZXNcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcygpIHtcblx0XHRcdHJldHVybiBfT2JqZWN0JGtleXModGhpcy5wcm9wZXJ0aWVzKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzUHJvcGVydHlcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzUHJvcGVydHkobmFtZSkge1xuXHRcdFx0cmV0dXJuICEhdGhpcy5nZXRQcm9wZXJ0eShuYW1lKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzT3duUHJvcGVydHlcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzT3duUHJvcGVydHkobmFtZSkge1xuXHRcdFx0cmV0dXJuIFN0cmluZyhuYW1lKSBpbiB0aGlzLnByb3BlcnRpZXM7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInB1dFZhbHVlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHB1dFZhbHVlKG5hbWUsIHZhbHVlLCB0aHJvd09uRXJyb3IpIHtcblx0XHRcdGlmICh0aGlzLmlzUHJpbWl0aXZlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bmFtZSA9IFN0cmluZyhuYW1lKTtcblxuXHRcdFx0dmFyIGRlc2NyaXB0b3IgPSB0aGlzLmdldFByb3BlcnR5KG5hbWUpO1xuXHRcdFx0aWYgKGRlc2NyaXB0b3IpIHtcblx0XHRcdFx0aWYgKCFkZXNjcmlwdG9yLmNhblNldFZhbHVlKCkpIHtcblx0XHRcdFx0XHRpZiAodGhyb3dPbkVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFzc2lnbiB0byByZWFkIG9ubHkgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvZiAlc1wiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5kYXRhUHJvcGVydHkgJiYgIXRoaXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSBuZXcgX3Byb3BlcnR5RGVzY3JpcHRvcjJbXCJkZWZhdWx0XCJdKHRoaXMsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZGVzY3JpcHRvci5jb25maWd1cmFibGUsXG5cdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiBkZXNjcmlwdG9yLmVudW1lcmFibGUsXG5cdFx0XHRcdFx0XHR3cml0YWJsZTogZGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlc2NyaXB0b3Iuc2V0VmFsdWUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmluZU93blByb3BlcnR5KG5hbWUsIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sIHRocm93T25FcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlZmluZU93blByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGRlZmluZU93blByb3BlcnR5KG5hbWUsIGRlc2NyaXB0b3IsIHRocm93T25FcnJvcikge1xuXHRcdFx0aWYgKHRoaXMuaXNQcmltaXRpdmUpIHtcblx0XHRcdFx0aWYgKHRocm93T25FcnJvcikge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgZGVmaW5lIHByb3BlcnR5OiBcIiArIG5hbWUgKyBcIiwgb2JqZWN0IGlzIG5vdCBleHRlbnNpYmxlXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuZ2V0T3duUHJvcGVydHkobmFtZSk7XG5cdFx0XHRpZiAoY3VycmVudCkge1xuXHRcdFx0XHRpZiAoY3VycmVudC5jYW5VcGRhdGUoZGVzY3JpcHRvcikpIHtcblx0XHRcdFx0XHRjdXJyZW50LnVwZGF0ZShkZXNjcmlwdG9yKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aHJvd09uRXJyb3IpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlZGVmaW5lIHByb3BlcnR5OiBcIiArIG5hbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICghdGhpcy5leHRlbnNpYmxlKSB7XG5cdFx0XHRcdGlmICh0aHJvd09uRXJyb3IpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGRlZmluZSBwcm9wZXJ0eTogXCIgKyBuYW1lICsgXCIsIG9iamVjdCBpcyBub3QgZXh0ZW5zaWJsZVwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gbmV3IF9wcm9wZXJ0eURlc2NyaXB0b3IyW1wiZGVmYXVsdFwiXSh0aGlzLCBkZXNjcmlwdG9yKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJkZWxldGVQcm9wZXJ0eVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eShuYW1lKSB7XG5cdFx0XHRpZiAodGhpcy5pc1ByaW1pdGl2ZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuYW1lIGluIHRoaXMucHJvcGVydGllcykge1xuXHRcdFx0XHRpZiAoIXRoaXMucHJvcGVydGllc1tuYW1lXS5jb25maWd1cmFibGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlbGV0ZSB0aGlzLnByb3BlcnRpZXNbbmFtZV07XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImRlZmluZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBkZWZpbmUobmFtZSwgdmFsdWUsIGRlc2NyaXB0b3IpIHtcblx0XHRcdC8vIHRoaXMgbWV0aG9kIGlzIGludGVuZGVkIGZvciBleHRlcm5hbCB1c2FnZSBvbmx5IC0gaXQgcHJvdmlkZXMgYSB3YXkgdG8gZGVmaW5lXG5cdFx0XHQvLyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFuZCBvdmVyd3JpdGUgYW55IGV4aXN0aW5nIHByb3BlcnRpZXMgZXZlbiBpZiB0aGV5IGFyZVxuXHRcdFx0Ly8gbm90IGNvbmZpZ3VyYWJsZVxuXHRcdFx0ZGVzY3JpcHRvciA9IGRlc2NyaXB0b3IgfHwgeyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSB9O1xuXHRcdFx0ZGVzY3JpcHRvci52YWx1ZSA9IHZhbHVlO1xuXG5cdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSBuZXcgX3Byb3BlcnR5RGVzY3JpcHRvcjJbXCJkZWZhdWx0XCJdKHRoaXMsIGRlc2NyaXB0b3IpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJyZW1vdmVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcblx0XHRcdC8vIHRoaXMgbWV0aG9kIGlzIGludGVuZGVkIGZvciBleHRlcm5hbCB1c2FnZSBvbmx5IC0gaXQgcHJvdmlkZXMgYSB3YXkgdG8gcmVtb3ZlXG5cdFx0XHQvLyBwcm9wZXJ0aWVzIGV2ZW4gaWYgdGhleSBhcmUgbm90IG5vcm1hbGx5IGFibGUgdG8gYmUgZGVsZXRlZFxuXHRcdFx0ZGVsZXRlIHRoaXMucHJvcGVydGllc1tuYW1lXTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiZ2V0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUobmFtZSkge1xuXHRcdFx0aWYgKG5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkobmFtZSkuZ2V0VmFsdWUoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImZyZWV6ZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmcmVlemUoKSB7XG5cdFx0XHRmb3IgKHZhciBwcm9wIGluIHRoaXMucHJvcGVydGllcykge1xuXHRcdFx0XHRpZiAodGhpcy5wcm9wZXJ0aWVzW3Byb3BdLmRhdGFQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdHRoaXMuZGVmaW5lT3duUHJvcGVydHkocHJvcCwgeyB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSwgdHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShwcm9wLCB7IGNvbmZpZ3VyYWJsZTogZmFsc2UgfSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcmV2ZW50RXh0ZW5zaW9ucygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJwcmV2ZW50RXh0ZW5zaW9uc1wiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucygpIHtcblx0XHRcdHRoaXMuZXh0ZW5zaWJsZSA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJzZWFsXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNlYWwoKSB7XG5cdFx0XHRmb3IgKHZhciBwcm9wIGluIHRoaXMucHJvcGVydGllcykge1xuXHRcdFx0XHR0aGlzLmRlZmluZU93blByb3BlcnR5KHByb3AsIHsgY29uZmlndXJhYmxlOiBmYWxzZSB9LCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcmV2ZW50RXh0ZW5zaW9ucygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJlcXVhbHNcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gZXF1YWxzKG9iaikge1xuXHRcdFx0aWYgKHRoaXMuaXNQcmltaXRpdmUgJiYgb2JqLmlzUHJpbWl0aXZlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlID09PSBvYmoudmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzID09PSBvYmo7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInVud3JhcFwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB1bndyYXAoKSB7XG5cdFx0XHR2YXIgdW53cmFwcGVkID0ge307XG5cdFx0XHR2YXIgY3VycmVudCA9IHRoaXM7XG5cblx0XHRcdHdoaWxlIChjdXJyZW50KSB7XG5cdFx0XHRcdGZvciAodmFyIG5hbWUgaW4gY3VycmVudC5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQucHJvcGVydGllc1tuYW1lXS5lbnVtZXJhYmxlICYmICEobmFtZSBpbiB1bndyYXBwZWQpKSB7XG5cdFx0XHRcdFx0XHR1bndyYXBwZWRbbmFtZV0gPSBjdXJyZW50LmdldFZhbHVlKG5hbWUpLnVud3JhcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LmdldFByb3RvdHlwZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW53cmFwcGVkO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBPYmplY3RUeXBlO1xufSkoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBPYmplY3RUeXBlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW5oZXJpdHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlLWNsYXNzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVja1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9vYmplY3RUeXBlID0gcmVxdWlyZShcIi4vb2JqZWN0LXR5cGVcIik7XG5cbnZhciBfb2JqZWN0VHlwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RUeXBlKTtcblxudmFyIF91dGlsc0NvbnRyYWN0cyA9IHJlcXVpcmUoXCIuLi91dGlscy9jb250cmFjdHNcIik7XG5cbnZhciBjb250cmFjdHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb250cmFjdHMpO1xuXG52YXIgUHJpbWl0aXZlVHlwZSA9IChmdW5jdGlvbiAoX09iamVjdFR5cGUpIHtcblx0X2luaGVyaXRzKFByaW1pdGl2ZVR5cGUsIF9PYmplY3RUeXBlKTtcblxuXHRmdW5jdGlvbiBQcmltaXRpdmVUeXBlKHZhbHVlKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByaW1pdGl2ZVR5cGUpO1xuXG5cdFx0X2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJpbWl0aXZlVHlwZS5wcm90b3R5cGUpLCBcImNvbnN0cnVjdG9yXCIsIHRoaXMpLmNhbGwodGhpcyk7XG5cdFx0dGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdHRoaXMudHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHR0aGlzLmNsYXNzTmFtZSA9IGNvbnRyYWN0cy5nZXRUeXBlKHZhbHVlKTtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhQcmltaXRpdmVUeXBlLCBbe1xuXHRcdGtleTogXCJnZXRQcm9wZXJ0eVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRQcm9wZXJ0eShuYW1lKSB7XG5cdFx0XHQvLyBjYW4ndCByZWFkIHByb3BlcnRpZXMgb2YgbnVsbC91bmRlZmluZWRcblx0XHRcdGlmICh0aGlzLnZhbHVlID09IG51bGwpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByb3BlcnR5ICdcIiArIG5hbWUgKyBcIicgb2YgXCIgKyB0aGlzLnR5cGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJpbWl0aXZlVHlwZS5wcm90b3R5cGUpLCBcImdldFByb3BlcnR5XCIsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInVud3JhcFwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB1bndyYXAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gUHJpbWl0aXZlVHlwZTtcbn0pKF9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFByaW1pdGl2ZVR5cGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3NcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQ29tcGFyZXJzID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbXBhcmVyc1wiKTtcblxudmFyIGNvbXBhcmVycyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbXBhcmVycyk7XG5cbnZhciBkZWZhdWx0RGVzY3JpcHRvciA9IHtcblx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdHdyaXRhYmxlOiBmYWxzZVxufTtcblxudmFyIFByb3BlcnR5RGVzY3JpcHRvciA9IChmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIFByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBjb25maWcsIHZhbHVlKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByb3BlcnR5RGVzY3JpcHRvcik7XG5cblx0XHRjb25maWcgPSBjb25maWcgfHwgZGVmYXVsdERlc2NyaXB0b3I7XG5cdFx0dGhpcy5iYXNlID0gYmFzZTtcblx0XHR0aGlzLmNvbmZpZ3VyYWJsZSA9IGNvbmZpZy5jb25maWd1cmFibGUgfHwgZmFsc2U7XG5cdFx0dGhpcy5lbnVtZXJhYmxlID0gY29uZmlnLmVudW1lcmFibGUgfHwgZmFsc2U7XG5cblx0XHRpZiAoXCJnZXRcIiBpbiBjb25maWcgfHwgXCJzZXRcIiBpbiBjb25maWcpIHtcblx0XHRcdHRoaXMuZGF0YVByb3BlcnR5ID0gZmFsc2U7XG5cdFx0XHR0aGlzLmdldCA9IGNvbmZpZy5nZXQ7XG5cdFx0XHR0aGlzLmdldHRlciA9IGNvbmZpZy5nZXR0ZXI7XG5cdFx0XHR0aGlzLnNldCA9IGNvbmZpZy5zZXQ7XG5cdFx0XHR0aGlzLnNldHRlciA9IGNvbmZpZy5zZXR0ZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMud3JpdGFibGUgPSBjb25maWcud3JpdGFibGUgfHwgZmFsc2U7XG5cdFx0XHR0aGlzLmRhdGFQcm9wZXJ0eSA9IHRydWU7XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWUgfHwgY29uZmlnLnZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhQcm9wZXJ0eURlc2NyaXB0b3IsIFt7XG5cdFx0a2V5OiBcImJpbmRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gYmluZChvYmopIHtcblx0XHRcdHRoaXMuYmFzZSA9IG9iajtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJ1cGRhdGVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKGRlc2NyaXB0b3IpIHtcblx0XHRcdGZvciAodmFyIHByb3AgaW4gZGVzY3JpcHRvcikge1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHRcdHRoaXNbcHJvcF0gPSBkZXNjcmlwdG9yW3Byb3BdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcImdldFwiIGluIGRlc2NyaXB0b3IgfHwgXCJzZXRcIiBpbiBkZXNjcmlwdG9yKSB7XG5cdFx0XHRcdHRoaXMud3JpdGFibGUgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHRoaXMuZGF0YVByb3BlcnR5ID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSB7XG5cdFx0XHRcdHRoaXMud3JpdGFibGUgPSB0aGlzLndyaXRhYmxlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRoaXMud3JpdGFibGU7XG5cdFx0XHRcdHRoaXMuZGF0YVByb3BlcnR5ID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5nZXQgPSB0aGlzLmdldHRlciA9IHRoaXMuc2V0ID0gdGhpcy5zZXR0ZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImNhblVwZGF0ZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjYW5VcGRhdGUoZGVzY3JpcHRvcikge1xuXHRcdFx0aWYgKHRoaXMuY29uZmlndXJhYmxlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoXCJjb25maWd1cmFibGVcIiBpbiBkZXNjcmlwdG9yICYmIHRoaXMuY29uZmlndXJhYmxlICE9PSBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcImVudW1lcmFibGVcIiBpbiBkZXNjcmlwdG9yICYmIHRoaXMuZW51bWVyYWJsZSAhPT0gZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChcImdldFwiIGluIGRlc2NyaXB0b3IgfHwgXCJzZXRcIiBpbiBkZXNjcmlwdG9yKSAmJiB0aGlzLmRhdGFQcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvciAmJiAhdGhpcy5kYXRhUHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5kYXRhUHJvcGVydHkpIHtcblx0XHRcdFx0aWYgKCF0aGlzLndyaXRhYmxlKSB7XG5cdFx0XHRcdFx0aWYgKGRlc2NyaXB0b3Iud3JpdGFibGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gIShcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgfHwgY29tcGFyZXJzLmFyZVNhbWUodGhpcy52YWx1ZSwgZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKFwiZ2V0XCIgaW4gZGVzY3JpcHRvciAmJiB0aGlzLmdldCAhPT0gZGVzY3JpcHRvci5nZXQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoXCJzZXRcIiBpbiBkZXNjcmlwdG9yICYmIHRoaXMuc2V0ICE9PSBkZXNjcmlwdG9yLnNldCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJnZXRWYWx1ZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcblx0XHRcdGlmICh0aGlzLmRhdGFQcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuZ2V0dGVyKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldHRlci5jYWxsKHRoaXMuYmFzZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImNhblNldFZhbHVlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNhblNldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMud3JpdGFibGUgfHwgISF0aGlzLnNldHRlcjtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwic2V0VmFsdWVcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdGlmICghdGhpcy5jYW5TZXRWYWx1ZSgpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuZGF0YVByb3BlcnR5KSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5zZXR0ZXIpIHtcblx0XHRcdFx0dGhpcy5zZXR0ZXIuY2FsbCh0aGlzLmJhc2UsIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gUHJvcGVydHlEZXNjcmlwdG9yO1xufSkoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQcm9wZXJ0eURlc2NyaXB0b3I7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZ2V0XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbmhlcml0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3NcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9vYmplY3RUeXBlID0gcmVxdWlyZShcIi4vb2JqZWN0LXR5cGVcIik7XG5cbnZhciBfb2JqZWN0VHlwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RUeXBlKTtcblxudmFyIFJlZ2V4VHlwZSA9IChmdW5jdGlvbiAoX09iamVjdFR5cGUpIHtcblx0X2luaGVyaXRzKFJlZ2V4VHlwZSwgX09iamVjdFR5cGUpO1xuXG5cdGZ1bmN0aW9uIFJlZ2V4VHlwZSh2YWx1ZSkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWdleFR5cGUpO1xuXG5cdFx0X2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVnZXhUeXBlLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzKTtcblx0XHR0aGlzLnNvdXJjZSA9IHZhbHVlO1xuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJSZWdFeHBcIjtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhSZWdleFR5cGUsIFt7XG5cdFx0a2V5OiBcImluaXRcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdChvYmplY3RGYWN0b3J5KSB7XG5cdFx0XHQvLyBsYXN0SW5kZXggaXMgc2V0dGFibGUsIGFsbCBvdGhlcnMgYXJlIHJlYWQtb25seSBhdHRyaWJ1dGVzXG5cdFx0XHR0aGlzLmRlZmluZU93blByb3BlcnR5KFwibGFzdEluZGV4XCIsIHsgdmFsdWU6IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRoaXMuc291cmNlLmxhc3RJbmRleCksIHdyaXRhYmxlOiB0cnVlIH0pO1xuXHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShcInNvdXJjZVwiLCB7IHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh0aGlzLnNvdXJjZS5zb3VyY2UpIH0pO1xuXHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShcImdsb2JhbFwiLCB7IHZhbHVlOiBvYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh0aGlzLnNvdXJjZS5nbG9iYWwpIH0pO1xuXHRcdFx0dGhpcy5kZWZpbmVPd25Qcm9wZXJ0eShcImlnbm9yZUNhc2VcIiwgeyB2YWx1ZTogb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUodGhpcy5zb3VyY2UuaWdub3JlQ2FzZSkgfSk7XG5cdFx0XHR0aGlzLmRlZmluZU93blByb3BlcnR5KFwibXVsdGlsaW5lXCIsIHsgdmFsdWU6IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRoaXMuc291cmNlLm11bHRpbGluZSkgfSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcInVud3JhcFwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB1bndyYXAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zb3VyY2U7XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIFJlZ2V4VHlwZTtcbn0pKF9vYmplY3RUeXBlMltcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFJlZ2V4VHlwZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9nZXRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2luaGVyaXRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzc1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2tcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcHJpbWl0aXZlVHlwZSA9IHJlcXVpcmUoXCIuL3ByaW1pdGl2ZS10eXBlXCIpO1xuXG52YXIgX3ByaW1pdGl2ZVR5cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJpbWl0aXZlVHlwZSk7XG5cbnZhciBfcHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxudmFyIF9wcm9wZXJ0eURlc2NyaXB0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcGVydHlEZXNjcmlwdG9yKTtcblxudmFyIF91dGlsc0NvbnRyYWN0cyA9IHJlcXVpcmUoXCIuLi91dGlscy9jb250cmFjdHNcIik7XG5cbnZhciBjb250cmFjdHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb250cmFjdHMpO1xuXG5mdW5jdGlvbiBnZXRDaGFyYWN0ZXIoc291cmNlLCBwb3NpdGlvbikge1xuXHRpZiAocG9zaXRpb24gPCBzb3VyY2UudmFsdWUubGVuZ3RoKSB7XG5cdFx0Ly8gdG9kbzogbmVlZCB0byBzZXQgbGVuZ3RoXG5cdFx0dmFyIGNoYXJhY3RlciA9IG5ldyBTdHJpbmdUeXBlKHNvdXJjZS52YWx1ZVtwb3NpdGlvbl0pO1xuXHRcdGNoYXJhY3Rlci5zZXRQcm90b3R5cGUoc291cmNlLmdldFByb3RvdHlwZSgpKTtcblx0XHRyZXR1cm4gY2hhcmFjdGVyO1xuXHR9XG5cblx0cmV0dXJuIG5ldyBfcHJpbWl0aXZlVHlwZTJbXCJkZWZhdWx0XCJdKHVuZGVmaW5lZCk7XG59XG5cbnZhciBTdHJpbmdUeXBlID0gKGZ1bmN0aW9uIChfUHJpbWl0aXZlVHlwZSkge1xuXHRfaW5oZXJpdHMoU3RyaW5nVHlwZSwgX1ByaW1pdGl2ZVR5cGUpO1xuXG5cdGZ1bmN0aW9uIFN0cmluZ1R5cGUodmFsdWUpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RyaW5nVHlwZSk7XG5cblx0XHRfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTdHJpbmdUeXBlLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzLCB2YWx1ZSk7XG5cdH1cblxuXHRfY3JlYXRlQ2xhc3MoU3RyaW5nVHlwZSwgW3tcblx0XHRrZXk6IFwiaW5pdFwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBpbml0KG9iamVjdEZhY3RvcnkpIHtcblx0XHRcdHRoaXMucHJvcGVydGllcy5sZW5ndGggPSBuZXcgX3Byb3BlcnR5RGVzY3JpcHRvcjJbXCJkZWZhdWx0XCJdKHRoaXMsIHtcblx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdFx0dmFsdWU6IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHRoaXMudmFsdWUubGVuZ3RoKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFByb3BlcnR5XCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFByb3BlcnR5KG5hbWUpIHtcblx0XHRcdGlmIChjb250cmFjdHMuaXNJbnRlZ2VyKG5hbWUpKSB7XG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IE51bWJlcihuYW1lKTtcblx0XHRcdFx0aWYgKHBvc2l0aW9uIDwgdGhpcy52YWx1ZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IF9wcm9wZXJ0eURlc2NyaXB0b3IyW1wiZGVmYXVsdFwiXSh0aGlzLCB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IGdldENoYXJhY3Rlcih0aGlzLCBwb3NpdGlvbikgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFN0cmluZ1R5cGUucHJvdG90eXBlKSwgXCJnZXRQcm9wZXJ0eVwiLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJnZXRPd25Qcm9wZXJ0eU5hbWVzXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoKSB7XG5cdFx0XHR2YXIgcHJvcHMgPSBbXTtcblx0XHRcdHZhciBsbiwgaTtcblx0XHRcdGZvciAoaSA9IDAsIGxuID0gdGhpcy52YWx1ZS5sZW5ndGg7IGkgPCBsbjsgaSsrKSB7XG5cdFx0XHRcdHByb3BzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3BzLmNvbmNhdChfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTdHJpbmdUeXBlLnByb3RvdHlwZSksIFwiZ2V0T3duUHJvcGVydHlOYW1lc1wiLCB0aGlzKS5jYWxsKHRoaXMpKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzT3duUHJvcGVydHlcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzT3duUHJvcGVydHkobmFtZSkge1xuXHRcdFx0aWYgKGNvbnRyYWN0cy5pc0ludGVnZXIobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIG5hbWUgPCB0aGlzLnZhbHVlLmxlbmd0aDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFN0cmluZ1R5cGUucHJvdG90eXBlKSwgXCJoYXNPd25Qcm9wZXJ0eVwiLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBTdHJpbmdUeXBlO1xufSkoX3ByaW1pdGl2ZVR5cGUyW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU3RyaW5nVHlwZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfUHJvbWlzZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZ2VuZXJhdGUgPSBkZWdlbmVyYXRlO1xuZXhwb3J0cy5wcm9taXNpZnkgPSBwcm9taXNpZnk7XG5cbnJlcXVpcmUoXCIuLi9wb2x5ZmlsbHNcIik7XG5cbmZ1bmN0aW9uIGlzVGhlbmFibGUob2JqKSB7XG5cdHJldHVybiBvYmogJiYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZnVuY3Rpb24gaXNOZXh0YWJsZShvYmopIHtcblx0cmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmoubmV4dCA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5mdW5jdGlvbiBkZWdlbmVyYXRlKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGdlbmVyYXRvciA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRmdW5jdGlvbiBoYW5kbGUoX3gpIHtcblx0XHRcdHZhciBfYWdhaW4gPSB0cnVlO1xuXG5cdFx0XHRfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IF94O1xuXHRcdFx0XHRfYWdhaW4gPSBmYWxzZTtcblxuXHRcdFx0XHRpZiAocmVzdWx0LmRvbmUpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0LnZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzVGhlbmFibGUocmVzdWx0LnZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQudmFsdWUudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KHJlcykpO1xuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRcdHJldHVybiBoYW5kbGUoZ2VuZXJhdG9yW1widGhyb3dcIl0oZXJyKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfeCA9IGdlbmVyYXRvci5uZXh0KHJlc3VsdC52YWx1ZSk7XG5cdFx0XHRcdF9hZ2FpbiA9IHRydWU7XG5cdFx0XHRcdGNvbnRpbnVlIF9mdW5jdGlvbjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KCkpO1xuXHRcdC8vIHRyeSB7XG5cdFx0Ly8gXHRyZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KCkpO1xuXHRcdC8vIH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFx0cmV0dXJuIGdlbmVyYXRvci50aHJvdyhlcnIpO1xuXHRcdC8vIH1cblx0fTtcbn1cblxuZnVuY3Rpb24gcHJvbWlzaWZ5KG9iaikge1xuXHRpZiAoaXNUaGVuYWJsZShvYmopKSB7XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdGlmIChpc05leHRhYmxlKG9iaikpIHtcblx0XHR2YXIgcmVzdWx0ID0gdW5kZWZpbmVkO1xuXHRcdHdoaWxlIChyZXN1bHQgPSBvYmoubmV4dCgpKSB7XG5cdFx0XHRpZiAoaXNUaGVuYWJsZShyZXN1bHQudmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHQudmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXN1bHQuZG9uZSkge1xuXHRcdFx0XHRyZXR1cm4gX1Byb21pc2UucmVzb2x2ZShyZXN1bHQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBsZXQgcmVzdWx0ID0gb2JqLm5leHQoKTtcblx0XHQvLyBpZiAoaXNUaGVuYWJsZShyZXN1bHQudmFsdWUpKSB7XG5cdFx0Ly8gXHRyZXR1cm4gcmVzdWx0LnZhbHVlO1xuXHRcdC8vIH1cblxuXHRcdC8vIHdoaWxlICghcmVzdWx0LmRvbmUpIHtcblx0XHQvLyBcdHJlc3VsdCA9IG9iai5uZXh0KCk7XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gcmV0dXJuIHByb21pc2lmeShyZXN1bHQudmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIF9Qcm9taXNlLnJlc29sdmUob2JqKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lLXByb3BlcnR5XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NvbXBhcmVycztcblxudmFyIF9jb252ZXJ0ID0gcmVxdWlyZShcIi4vY29udmVydFwiKTtcblxudmFyIGNvbnZlcnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfY29udmVydCk7XG5cbmZ1bmN0aW9uIG5lZ2F0ZSh2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiAhdmFsdWU7XG59XG5cbnZhciBjb21wYXJlcnMgPSAoX2NvbXBhcmVycyA9IHtcblx0YXJlU2FtZTogZnVuY3Rpb24gYXJlU2FtZShhLCBiKSB7XG5cdFx0aWYgKGEudHlwZSAhPT0gYi50eXBlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGEuaXNQcmltaXRpdmUgJiYgYi5pc1ByaW1pdGl2ZSkge1xuXHRcdFx0aWYgKGEudmFsdWUgPT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGEudHlwZSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRpZiAoaXNOYU4oYS52YWx1ZSkgJiYgaXNOYU4oYi52YWx1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhLnZhbHVlID09PSAwKSB7XG5cdFx0XHRcdFx0Ly8gdGhpcyB3aWxsIGFjY291bnQgZm9yIG5lZ2F0aXZlIHplcm9cblx0XHRcdFx0XHRyZXR1cm4gMSAvIGEudmFsdWUgPT09IDEgLyBiLnZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhLnZhbHVlID09PSBiLnZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBhID09PSBiO1xuXHR9LFxuXG5cdGltcGxpY2l0RXF1YWxzOiBmdW5jdGlvbiBpbXBsaWNpdEVxdWFscyhlbnYsIGEsIGIpIHtcblx0XHRpZiAoYS5pc1ByaW1pdGl2ZSAmJiBiLmlzUHJpbWl0aXZlKSB7XG5cdFx0XHRyZXR1cm4gYS52YWx1ZSA9PSBiLnZhbHVlO1xuXHRcdH1cblxuXHRcdGlmIChhLnR5cGUgPT09IFwib2JqZWN0XCIgJiYgYi50eXBlID09PSBcIm9iamVjdFwiIHx8IGEudHlwZSA9PT0gXCJmdW5jdGlvblwiICYmIGIudHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRyZXR1cm4gYSA9PT0gYjtcblx0XHR9XG5cblx0XHR2YXIgcHJpbWl0aXZlQSA9IGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhKTtcblx0XHR2YXIgcHJpbWl0aXZlQiA9IGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBiKTtcblxuXHRcdGlmICh0eXBlb2YgcHJpbWl0aXZlQSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgcHJpbWl0aXZlQiA9PT0gXCJudW1iZXJcIiB8fCAodHlwZW9mIHByaW1pdGl2ZUEgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiBwcmltaXRpdmVCID09PSBcImJvb2xlYW5cIikpIHtcblx0XHRcdHJldHVybiBOdW1iZXIocHJpbWl0aXZlQSkgPT09IE51bWJlcihwcmltaXRpdmVCKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHByaW1pdGl2ZUEgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHJldHVybiBwcmltaXRpdmVBID09PSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYiwgXCJzdHJpbmdcIik7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBwcmltaXRpdmVCID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRyZXR1cm4gY29udmVydC50b1ByaW1pdGl2ZShlbnYsIGEsIFwic3RyaW5nXCIpID09PSBwcmltaXRpdmVCO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcmltaXRpdmVBID09IHByaW1pdGl2ZUI7XG5cdH0sXG5cblx0c3RyaWN0RXF1YWxzOiBmdW5jdGlvbiBzdHJpY3RFcXVhbHMoZW52LCBhLCBiKSB7XG5cdFx0aWYgKGEuaXNQcmltaXRpdmUgJiYgYi5pc1ByaW1pdGl2ZSkge1xuXHRcdFx0cmV0dXJuIGEudmFsdWUgPT09IGIudmFsdWU7XG5cdFx0fVxuXG5cdFx0aWYgKGEuaXNQcmltaXRpdmUgfHwgYi5pc1ByaW1pdGl2ZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBhID09PSBiO1xuXHR9LFxuXG5cdHJlbGF0aW9uYWxDb21wYXJlOiBmdW5jdGlvbiByZWxhdGlvbmFsQ29tcGFyZShlbnYsIGEsIGIsIGxlZnRGaXJzdCkge1xuXHRcdHZhciBwcmltaXRpdmVBLCBwcmltaXRpdmVCO1xuXHRcdGlmIChsZWZ0Rmlyc3QpIHtcblx0XHRcdHByaW1pdGl2ZUEgPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYSwgXCJudW1iZXJcIik7XG5cdFx0XHRwcmltaXRpdmVCID0gY29udmVydC50b1ByaW1pdGl2ZShlbnYsIGIsIFwibnVtYmVyXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcmltaXRpdmVCID0gY29udmVydC50b1ByaW1pdGl2ZShlbnYsIGIsIFwibnVtYmVyXCIpO1xuXHRcdFx0cHJpbWl0aXZlQSA9IGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhLCBcIm51bWJlclwiKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHByaW1pdGl2ZUEgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHByaW1pdGl2ZUIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHJldHVybiBwcmltaXRpdmVBIDwgcHJpbWl0aXZlQjtcblx0XHR9XG5cblx0XHRwcmltaXRpdmVBID0gTnVtYmVyKHByaW1pdGl2ZUEpO1xuXHRcdHByaW1pdGl2ZUIgPSBOdW1iZXIocHJpbWl0aXZlQik7XG5cblx0XHRpZiAoaXNOYU4ocHJpbWl0aXZlQSkgfHwgaXNOYU4ocHJpbWl0aXZlQikpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByaW1pdGl2ZUEgPCBwcmltaXRpdmVCO1xuXHR9XG5cbn0sIF9kZWZpbmVQcm9wZXJ0eShfY29tcGFyZXJzLCBcIj09XCIsIGZ1bmN0aW9uIF8oKSB7XG5cdHJldHVybiB0aGlzLmltcGxpY2l0RXF1YWxzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9jb21wYXJlcnMsIFwiIT1cIiwgZnVuY3Rpb24gXygpIHtcblx0cmV0dXJuICF0aGlzLmltcGxpY2l0RXF1YWxzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9jb21wYXJlcnMsIFwiPT09XCIsIGZ1bmN0aW9uIF8oKSB7XG5cdHJldHVybiB0aGlzLnN0cmljdEVxdWFscy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfY29tcGFyZXJzLCBcIiE9PVwiLCBmdW5jdGlvbiBfKCkge1xuXHRyZXR1cm4gIXRoaXMuc3RyaWN0RXF1YWxzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9jb21wYXJlcnMsIFwiPFwiLCBmdW5jdGlvbiBfKGVudiwgYSwgYikge1xuXHRyZXR1cm4gISF0aGlzLnJlbGF0aW9uYWxDb21wYXJlKGVudiwgYSwgYiwgdHJ1ZSk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9jb21wYXJlcnMsIFwiPD1cIiwgZnVuY3Rpb24gXyhlbnYsIGEsIGIpIHtcblx0cmV0dXJuIG5lZ2F0ZSh0aGlzLnJlbGF0aW9uYWxDb21wYXJlKGVudiwgYiwgYSwgZmFsc2UpKTtcbn0pLCBfZGVmaW5lUHJvcGVydHkoX2NvbXBhcmVycywgXCI+XCIsIGZ1bmN0aW9uIF8oZW52LCBhLCBiKSB7XG5cdHJldHVybiAhIXRoaXMucmVsYXRpb25hbENvbXBhcmUoZW52LCBiLCBhLCBmYWxzZSk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9jb21wYXJlcnMsIFwiPj1cIiwgZnVuY3Rpb24gXyhlbnYsIGEsIGIpIHtcblx0cmV0dXJuIG5lZ2F0ZSh0aGlzLnJlbGF0aW9uYWxDb21wYXJlKGVudiwgYSwgYiwgdHJ1ZSkpO1xufSksIF9jb21wYXJlcnMpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbXBhcmVycztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFzc2VydElzT2JqZWN0ID0gYXNzZXJ0SXNPYmplY3Q7XG5leHBvcnRzLmFzc2VydElzTm90TnVsbE9yVW5kZWZpbmVkID0gYXNzZXJ0SXNOb3ROdWxsT3JVbmRlZmluZWQ7XG5leHBvcnRzLmFzc2VydEFyZ0lzTm90TnVsbE9yVW5kZWZpbmVkID0gYXNzZXJ0QXJnSXNOb3ROdWxsT3JVbmRlZmluZWQ7XG5leHBvcnRzLmFzc2VydElzRnVuY3Rpb24gPSBhc3NlcnRJc0Z1bmN0aW9uO1xuZXhwb3J0cy5hc3NlcnRJc05vdENvbnN0cnVjdG9yID0gYXNzZXJ0SXNOb3RDb25zdHJ1Y3RvcjtcbmV4cG9ydHMuYXNzZXJ0SXNWYWxpZEFycmF5TGVuZ3RoID0gYXNzZXJ0SXNWYWxpZEFycmF5TGVuZ3RoO1xuZXhwb3J0cy5hc3NlcnRJc1ZhbGlkUGFyYW1ldGVyTmFtZSA9IGFzc2VydElzVmFsaWRQYXJhbWV0ZXJOYW1lO1xuZXhwb3J0cy5hc3NlcnRJc05vdEdlbmVyaWMgPSBhc3NlcnRJc05vdEdlbmVyaWM7XG5leHBvcnRzLmlzVmFsaWRBcnJheUxlbmd0aCA9IGlzVmFsaWRBcnJheUxlbmd0aDtcbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcbmV4cG9ydHMuZ2V0VHlwZSA9IGdldFR5cGU7XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcbmV4cG9ydHMuaXNJbnRlZ2VyID0gaXNJbnRlZ2VyO1xudmFyIG9iamVjdFJneCA9IC9cXFtvYmplY3QgKFxcdyspXFxdLztcbnZhciBpbnRlZ2VyUmd4ID0gL14tP1xcZCskLztcblxuZnVuY3Rpb24gYXNzZXJ0SXNPYmplY3Qob2JqLCBtZXRob2ROYW1lLCBtZXNzYWdlKSB7XG5cdGlmICghaXNPYmplY3Qob2JqKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IobWV0aG9kTmFtZSArIFwiIGNhbGxlZCBvbiBub24tb2JqZWN0XCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzc2VydElzTm90TnVsbE9yVW5kZWZpbmVkKHZhbHVlLCBtZXRob2ROYW1lKSB7XG5cdGlmIChpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKG1ldGhvZE5hbWUgKyBcIiBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0QXJnSXNOb3ROdWxsT3JVbmRlZmluZWQob2JqKSB7XG5cdGlmIChpc051bGxPclVuZGVmaW5lZChvYmopKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IG51bGwgb3IgdW5kZWZpbmVkIHRvIG9iamVjdFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiBhc3NlcnRJc0Z1bmN0aW9uKG9iaiwgdG9TdHJpbmcpIHtcblx0aWYgKCFvYmogfHwgb2JqLmNsYXNzTmFtZSAhPT0gXCJGdW5jdGlvblwiKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIiVzIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzc2VydElzTm90Q29uc3RydWN0b3IoY29udGV4dCwgbWV0aG9kTmFtZSkge1xuXHRpZiAoY29udGV4dC5pc05ldykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IobWV0aG9kTmFtZSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzc2VydElzVmFsaWRBcnJheUxlbmd0aChsZW5ndGgpIHtcblx0aWYgKCFpc1ZhbGlkQXJyYXlMZW5ndGgobGVuZ3RoKSkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCBhcnJheSBsZW5ndGhcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0SXNWYWxpZFBhcmFtZXRlck5hbWUobmFtZSkge1xuXHRpZiAoL15cXGR8WztcXChcXClcIiddLy50ZXN0KG5hbWUpKSB7XG5cdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVW5leHBlY3RlZCB0b2tlbiBpbiBcIiArIG5hbWUpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzc2VydElzTm90R2VuZXJpYyhvYmosIGV4cGVjdGVkQ2xhc3MsIG1ldGhvZE5hbWUpIHtcblx0aWYgKCFvYmogfHwgb2JqLmNsYXNzTmFtZSAhPT0gZXhwZWN0ZWRDbGFzcykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IobWV0aG9kTmFtZSArIFwiIGlzIG5vdCBnZW5lcmljXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRBcnJheUxlbmd0aChsZW5ndGgpIHtcblx0cmV0dXJuIGlzSW50ZWdlcihsZW5ndGgpICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8IDQyOTQ5NjcyOTY7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmIChvYmouaXNQcmltaXRpdmUpIHtcblx0XHRyZXR1cm4gb2JqLnZhbHVlICYmIG9iai50eXBlID09PSBcIm9iamVjdFwiO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFR5cGUob2JqKSB7XG5cdHJldHVybiBvYmplY3RSZ3guZXhlYyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSlbMV07XG59XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKG9iaikge1xuXHRyZXR1cm4gaXNVbmRlZmluZWQob2JqKSB8fCBpc051bGwob2JqKTtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG5cdHJldHVybiAhb2JqIHx8IG9iai5pc1ByaW1pdGl2ZSAmJiBvYmoudmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNOdWxsKG9iaikge1xuXHRyZXR1cm4gb2JqICYmIG9iai5pc1ByaW1pdGl2ZSAmJiBvYmoudmFsdWUgPT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGludGVnZXJSZ3gudGVzdCh2YWx1ZSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG5cdFx0cmV0dXJuIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfTWF0aCRzaWduID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL3NpZ25cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnByaW1pdGl2ZVRvT2JqZWN0ID0gcHJpbWl0aXZlVG9PYmplY3Q7XG5leHBvcnRzLnRvT2JqZWN0ID0gdG9PYmplY3Q7XG5leHBvcnRzLnRvQXJyYXkgPSB0b0FycmF5O1xuZXhwb3J0cy50b1ByaW1pdGl2ZSA9IHRvUHJpbWl0aXZlO1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuZXhwb3J0cy50b051bWJlciA9IHRvTnVtYmVyO1xuZXhwb3J0cy50b0ludGVnZXIgPSB0b0ludGVnZXI7XG5leHBvcnRzLnRvSW50MzIgPSB0b0ludDMyO1xuZXhwb3J0cy50b1VJbnQzMiA9IHRvVUludDMyO1xuZXhwb3J0cy50b0Jvb2xlYW4gPSB0b0Jvb2xlYW47XG5leHBvcnRzLnRvTmF0aXZlRnVuY3Rpb24gPSB0b05hdGl2ZUZ1bmN0aW9uO1xuXG5yZXF1aXJlKFwiLi4vcG9seWZpbGxzXCIpO1xuXG52YXIgX3V0aWxzRnVuYyA9IHJlcXVpcmUoXCIuLi91dGlscy9mdW5jXCIpO1xuXG52YXIgZnVuYyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0Z1bmMpO1xuXG52YXIgc2lnbiA9IF9NYXRoJHNpZ247XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGFicyA9IE1hdGguYWJzO1xuXG5mdW5jdGlvbiBnZXRTdHJpbmcoZW52LCB2YWx1ZSkge1xuXHRpZiAoIXZhbHVlKSB7XG5cdFx0cmV0dXJuIFwidW5kZWZpbmVkXCI7XG5cdH1cblxuXHRpZiAodmFsdWUuaXNQcmltaXRpdmUpIHtcblx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlLnZhbHVlKTtcblx0fVxuXG5cdHZhciBwcmltaXRpdmVWYWx1ZSA9IGZ1bmMudHJ5Q2FsbE1ldGhvZChlbnYsIHZhbHVlLCBcInRvU3RyaW5nXCIpO1xuXHRpZiAocHJpbWl0aXZlVmFsdWUgJiYgcHJpbWl0aXZlVmFsdWUuaXNQcmltaXRpdmUpIHtcblx0XHRyZXR1cm4gU3RyaW5nKHByaW1pdGl2ZVZhbHVlLnZhbHVlKTtcblx0fVxuXG5cdHByaW1pdGl2ZVZhbHVlID0gZnVuYy50cnlDYWxsTWV0aG9kKGVudiwgdmFsdWUsIFwidmFsdWVPZlwiKTtcblx0aWYgKHByaW1pdGl2ZVZhbHVlICYmIHByaW1pdGl2ZVZhbHVlLmlzUHJpbWl0aXZlKSB7XG5cdFx0cmV0dXJuIFN0cmluZyhwcmltaXRpdmVWYWx1ZS52YWx1ZSk7XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG59XG5cbmZ1bmN0aW9uIGdldFByaW1pdGl2ZShlbnYsIHZhbHVlKSB7XG5cdGlmICghdmFsdWUpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGlmICh2YWx1ZS5pc1ByaW1pdGl2ZSkge1xuXHRcdHJldHVybiB2YWx1ZS52YWx1ZTtcblx0fVxuXG5cdHZhciBwcmltaXRpdmVWYWx1ZSA9IGZ1bmMudHJ5Q2FsbE1ldGhvZChlbnYsIHZhbHVlLCBcInZhbHVlT2ZcIik7XG5cdGlmIChwcmltaXRpdmVWYWx1ZSAmJiBwcmltaXRpdmVWYWx1ZS5pc1ByaW1pdGl2ZSkge1xuXHRcdHJldHVybiBwcmltaXRpdmVWYWx1ZS52YWx1ZTtcblx0fVxuXG5cdHByaW1pdGl2ZVZhbHVlID0gZnVuYy50cnlDYWxsTWV0aG9kKGVudiwgdmFsdWUsIFwidG9TdHJpbmdcIik7XG5cdGlmIChwcmltaXRpdmVWYWx1ZSAmJiBwcmltaXRpdmVWYWx1ZS5pc1ByaW1pdGl2ZSkge1xuXHRcdHJldHVybiBwcmltaXRpdmVWYWx1ZS52YWx1ZTtcblx0fVxuXG5cdHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZXMoZW52LCBhcmdzKSB7XG5cdHZhciBpID0gMDtcblx0dmFyIGxuID0gYXJncy5sZW5ndGg7XG5cdHZhciB2YWx1ZXMgPSBbXTtcblxuXHRmb3IgKDsgaSA8IGxuOyBpKyspIHtcblx0XHR2YWx1ZXMucHVzaChnZXRQcmltaXRpdmUoZW52LCBhcmdzW2ldKSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBwcmltaXRpdmVUb09iamVjdChlbnYsIHZhbHVlKSB7XG5cdHZhciBuZXdWYWx1ZSA9IGVudi5vYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh2YWx1ZSk7XG5cdG5ld1ZhbHVlLmlzUHJpbWl0aXZlID0gZmFsc2U7XG5cdG5ld1ZhbHVlLnR5cGUgPSBcIm9iamVjdFwiO1xuXHRyZXR1cm4gbmV3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KGVudiwgb2JqKSB7XG5cdGlmIChvYmouaXNQcmltaXRpdmUgJiYgb2JqLnZhbHVlICE9IG51bGwgJiYgb2JqLnR5cGUgIT09IFwib2JqZWN0XCIpIHtcblx0XHRyZXR1cm4gcHJpbWl0aXZlVG9PYmplY3QoZW52LCBvYmoudmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gdG9BcnJheShvYmosIGxlbmd0aCkge1xuXHR2YXIgYXJyID0gW107XG5cblx0aWYgKG9iaikge1xuXHRcdHZhciBsbiA9IGxlbmd0aCA+PSAwID8gbGVuZ3RoIDogb2JqLmdldFByb3BlcnR5KFwibGVuZ3RoXCIpLmdldFZhbHVlKCkudmFsdWU7XG5cdFx0dmFyIGkgPSAwO1xuXG5cdFx0d2hpbGUgKGkgPCBsbikge1xuXHRcdFx0aWYgKG9iai5oYXNQcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRhcnJbaV0gPSBvYmouZ2V0UHJvcGVydHkoaSkuZ2V0VmFsdWUoKTtcblx0XHRcdH1cblxuXHRcdFx0aSsrO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIHRvUHJpbWl0aXZlKGVudiwgb2JqLCBwcmVmZXJyZWRUeXBlKSB7XG5cdHByZWZlcnJlZFR5cGUgPSBwcmVmZXJyZWRUeXBlICYmIHByZWZlcnJlZFR5cGUudG9Mb3dlckNhc2UoKTtcblx0aWYgKCFwcmVmZXJyZWRUeXBlICYmIG9iaikge1xuXHRcdHByZWZlcnJlZFR5cGUgPSBvYmoucHJpbWl0aXZlSGludDtcblx0fVxuXG5cdGlmIChwcmVmZXJyZWRUeXBlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGdldFN0cmluZyhlbnYsIG9iaik7XG5cdH1cblxuXHQvLyBkZWZhdWx0IGNhc2UvbnVtYmVyXG5cdHJldHVybiBnZXRQcmltaXRpdmUoZW52LCBvYmopO1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZyhlbnYsIG9iaikge1xuXHRyZXR1cm4gU3RyaW5nKHRvUHJpbWl0aXZlKGVudiwgb2JqLCBcInN0cmluZ1wiKSk7XG59XG5cbmZ1bmN0aW9uIHRvTnVtYmVyKGVudiwgb2JqKSB7XG5cdGlmICghb2JqIHx8IG9iai50eXBlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0cmV0dXJuIE5hTjtcblx0fVxuXG5cdHJldHVybiBOdW1iZXIodG9QcmltaXRpdmUoZW52LCBvYmosIFwibnVtYmVyXCIpKTtcbn1cblxuZnVuY3Rpb24gdG9JbnRlZ2VyKGVudiwgb2JqKSB7XG5cdHZhciB2YWx1ZSA9IHRvTnVtYmVyKGVudiwgb2JqKTtcblx0aWYgKGlzTmFOKHZhbHVlKSkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0aWYgKHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRyZXR1cm4gc2lnbih2YWx1ZSkgKiBmbG9vcihhYnModmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gdG9JbnQzMihlbnYsIG9iaikge1xuXHR2YXIgdmFsdWUgPSB0b0ludGVnZXIoZW52LCBvYmopO1xuXHRyZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiAwO1xufVxuXG5mdW5jdGlvbiB0b1VJbnQzMihlbnYsIG9iaikge1xuXHR2YXIgdmFsdWUgPSB0b0ludDMyKGVudiwgb2JqKTtcblx0cmV0dXJuIHZhbHVlID4+PiAwO1xufVxuXG5mdW5jdGlvbiB0b0Jvb2xlYW4ob2JqKSB7XG5cdGlmICghb2JqKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aWYgKG9iai5pc1ByaW1pdGl2ZSkge1xuXHRcdHJldHVybiBCb29sZWFuKG9iai52YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdG9OYXRpdmVGdW5jdGlvbihlbnYsIGZuLCBuYW1lKSB7XG5cdHJldHVybiBlbnYub2JqZWN0RmFjdG9yeS5jcmVhdGVCdWlsdEluRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzY29wZSA9IHRoaXMgJiYgdGhpcy5ub2RlICYmIHRoaXMubm9kZS52YWx1ZTtcblx0XHR2YXIgYXJncyA9IGdldFZhbHVlcyhlbnYsIGFyZ3VtZW50cyk7XG5cblx0XHR2YXIgdmFsdWUgPSBmbi5hcHBseShzY29wZSwgYXJncyk7XG5cdFx0cmV0dXJuIGVudi5vYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZSh2YWx1ZSk7XG5cdH0sIGZuLmxlbmd0aCwgbmFtZSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5nZXRGdW5jdGlvblJlc3VsdCA9IGdldEZ1bmN0aW9uUmVzdWx0O1xuZXhwb3J0cy5sb2FkQXJndW1lbnRzID0gbG9hZEFyZ3VtZW50cztcbmV4cG9ydHMudHJ5Q2FsbE1ldGhvZCA9IHRyeUNhbGxNZXRob2Q7XG5cbnZhciBfYXN5bmMgPSByZXF1aXJlKFwiLi9hc3luY1wiKTtcblxudmFyIGV4ZWN1dGVGdW5jdGlvbiA9ICgwLCBfYXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIGNhbGxlZSQwJDAoZW52LCBmbiwgcGFyYW1zLCBhcmdzLCB0aGlzQXJnLCBjYWxsZWUsIGlzTmV3KSB7XG5cdHZhciBzY29wZSwgcmV0dXJuUmVzdWx0LCBleGVjdXRpb25SZXN1bHQ7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gY2FsbGVlJDAkMCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRzY29wZSA9IGZuLmNyZWF0ZVNjb3BlKGVudiwgdGhpc0FyZywgZmFsc2UpO1xuXG5cdFx0XHRcdGlmIChpc05ldykge1xuXHRcdFx0XHRcdHJldHVyblJlc3VsdCA9IHRoaXNBcmc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsb2FkQXJndW1lbnRzKGVudiwgcGFyYW1zLCBhcmdzLCBmbik7XG5cblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDM7XG5cblx0XHRcdFx0aWYgKCFmbi5uYXRpdmUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNztcblx0XHRcdFx0cmV0dXJuIGZuLm5hdGl2ZUZ1bmN0aW9uLmFwcGx5KGVudi5jcmVhdGVFeGVjdXRpb25Db250ZXh0KHRoaXNBcmcsIGNhbGxlZSwgaXNOZXcpLCBhcmdzKSB8fCByZXR1cm5SZXN1bHQ7XG5cblx0XHRcdGNhc2UgNzpcblx0XHRcdFx0cmV0dXJuUmVzdWx0ID0gY29udGV4dCQxJDAuc2VudDtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDEyO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxMDpcblx0XHRcdFx0ZXhlY3V0aW9uUmVzdWx0ID0gZW52LmNyZWF0ZUV4ZWN1dGlvbkNvbnRleHQoZm4ubm9kZS5ib2R5LCBjYWxsZWUsIGlzTmV3KS5leGVjdXRlKCk7XG5cblx0XHRcdFx0aWYgKGV4ZWN1dGlvblJlc3VsdCAmJiBleGVjdXRpb25SZXN1bHQuZXhpdCAmJiBleGVjdXRpb25SZXN1bHQucmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKCFpc05ldyB8fCAhZXhlY3V0aW9uUmVzdWx0LnJlc3VsdC5pc1ByaW1pdGl2ZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuUmVzdWx0ID0gZXhlY3V0aW9uUmVzdWx0LnJlc3VsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2FzZSAxMjpcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDE4O1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxNDpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDE0O1xuXHRcdFx0XHRjb250ZXh0JDEkMC50MCA9IGNvbnRleHQkMSQwW1wiY2F0Y2hcIl0oMyk7XG5cblx0XHRcdFx0c2NvcGUuZXhpdFNjb3BlKCk7XG5cdFx0XHRcdHRocm93IGNvbnRleHQkMSQwLnQwO1xuXG5cdFx0XHRjYXNlIDE4OlxuXG5cdFx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJldHVyblJlc3VsdCB8fCBlbnYuZ2xvYmFsLmdldFByb3BlcnR5KFwidW5kZWZpbmVkXCIpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRjYXNlIDIwOlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgY2FsbGVlJDAkMCwgdGhpcywgW1szLCAxNF1dKTtcbn0pKTtcblxuZXhwb3J0cy5leGVjdXRlRnVuY3Rpb24gPSBleGVjdXRlRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uUmVzdWx0KGVudiwgZm4sIHBhcmFtcywgYXJncywgdGhpc0FyZywgY2FsbGVlKSB7XG5cdHZhciBzY29wZSA9IGZuLmNyZWF0ZVNjb3BlKGVudiwgdGhpc0FyZywgZmFsc2UpO1xuXHRsb2FkQXJndW1lbnRzKGVudiwgcGFyYW1zLCBhcmdzLCBmbik7XG5cblx0dmFyIGV4ZWN1dGlvblJlc3VsdDtcblx0dHJ5IHtcblx0XHRpZiAoZm4ubmF0aXZlKSB7XG5cdFx0XHRleGVjdXRpb25SZXN1bHQgPSBmbi5uYXRpdmVGdW5jdGlvbi5hcHBseShlbnYuY3JlYXRlRXhlY3V0aW9uQ29udGV4dCh0aGlzQXJnLCBjYWxsZWUpLCBhcmdzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhlY3V0aW9uUmVzdWx0ID0gZW52LmNyZWF0ZUV4ZWN1dGlvbkNvbnRleHQoZm4ubm9kZS5ib2R5LCBjYWxsZWUpLmV4ZWN1dGUoKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdHRocm93IGVycjtcblx0fVxuXG5cdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRyZXR1cm4gZXhlY3V0aW9uUmVzdWx0O1xufVxuXG5mdW5jdGlvbiBsb2FkQXJndW1lbnRzKGVudiwgcGFyYW1zLCBhcmdzLCBjYWxsZWUpIHtcblx0dmFyIHVuZGVmID0gZW52Lmdsb2JhbC5nZXRQcm9wZXJ0eShcInVuZGVmaW5lZFwiKS5nZXRWYWx1ZSgpO1xuXG5cdHZhciBhcmd1bWVudExpc3QgPSBlbnYub2JqZWN0RmFjdG9yeS5jcmVhdGVBcmd1bWVudHMoYXJncywgY2FsbGVlKTtcblx0ZW52LmN1cnJlbnQuY3JlYXRlVmFyaWFibGUoXCJhcmd1bWVudHNcIik7XG5cdGVudi5jdXJyZW50LnB1dFZhbHVlKFwiYXJndW1lbnRzXCIsIGFyZ3VtZW50TGlzdCk7XG5cblx0cGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtLCBpbmRleCkge1xuXHRcdGlmICghZW52LmN1cnJlbnQuaGFzVmFyaWFibGUocGFyYW0ubmFtZSkpIHtcblx0XHRcdHZhciBkZXNjcmlwdG9yID0gZW52LmN1cnJlbnQuY3JlYXRlVmFyaWFibGUocGFyYW0ubmFtZSk7XG5cdFx0XHRpZiAoYXJncy5sZW5ndGggPiBpbmRleCkge1xuXHRcdFx0XHRhcmd1bWVudExpc3QubWFwUHJvcGVydHkoaW5kZXgsIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGVudi5jdXJyZW50LnB1dFZhbHVlKHBhcmFtLm5hbWUsIGFyZ3NbaW5kZXhdIHx8IHVuZGVmKTtcblx0fSk7XG5cblx0Ly8ganVzdCBzZXQgdmFsdWUgaWYgYWRkaXRpb25hbCwgdW5uYW1lZCBhcmd1bWVudHMgYXJlIHBhc3NlZCBpblxuXHR2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG5cdGZvciAodmFyIGkgPSBwYXJhbXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRhcmd1bWVudExpc3QuZGVmaW5lT3duUHJvcGVydHkoaSwge1xuXHRcdFx0dmFsdWU6IGFyZ3NbaV0sXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHR9KTtcblx0fVxuXG5cdGFyZ3VtZW50TGlzdC5kZWZpbmVPd25Qcm9wZXJ0eShcImxlbmd0aFwiLCB7XG5cdFx0dmFsdWU6IGVudi5vYmplY3RGYWN0b3J5LmNyZWF0ZVByaW1pdGl2ZShsZW5ndGgpLFxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR3cml0YWJsZTogdHJ1ZVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gdHJ5Q2FsbE1ldGhvZChlbnYsIG9iaiwgbmFtZSkge1xuXHR2YXIgZm4gPSBvYmouZ2V0UHJvcGVydHkobmFtZSk7XG5cdGlmICghZm4pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmbiA9IGZuLmdldFZhbHVlKCk7XG5cdHZhciB1bmRlZiA9IGVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKTtcblxuXHRpZiAoZm4gJiYgZm4uY2xhc3NOYW1lID09PSBcIkZ1bmN0aW9uXCIpIHtcblx0XHR2YXIgc2NvcGUgPSBmbi5jcmVhdGVTY29wZShlbnYsIG9iaik7XG5cdFx0dmFyIGV4ZWN1dGlvblJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRpZiAoZm4ubmF0aXZlKSB7XG5cdFx0XHRcdGV4ZWN1dGlvblJlc3VsdCA9IGZuLm5hdGl2ZUZ1bmN0aW9uLmFwcGx5KGVudi5jcmVhdGVFeGVjdXRpb25Db250ZXh0KG9iaiwgb2JqKSwgW10pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9hZEFyZ3VtZW50cyhlbnYsIGZuLm5vZGUucGFyYW1zLCBbXSk7XG5cblx0XHRcdFx0ZXhlY3V0aW9uUmVzdWx0ID0gZW52LmNyZWF0ZUV4ZWN1dGlvbkNvbnRleHQoZm4ubm9kZS5ib2R5LCBmbi5ub2RlKS5leGVjdXRlKCk7XG5cdFx0XHRcdGV4ZWN1dGlvblJlc3VsdCA9IGV4ZWN1dGlvblJlc3VsdCAmJiBleGVjdXRpb25SZXN1bHQucmVzdWx0O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0c2NvcGUuZXhpdFNjb3BlKCk7XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXG5cdFx0c2NvcGUuZXhpdFNjb3BlKCk7XG5cdFx0cmV0dXJuIGV4ZWN1dGlvblJlc3VsdCA/IGV4ZWN1dGlvblJlc3VsdC5nZXRWYWx1ZSgpIDogdW5kZWY7XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2Y7XG5cbnZhciBfY29udmVydCA9IHJlcXVpcmUoXCIuL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2NvbnZlcnQpO1xuXG5mdW5jdGlvbiBhZGRPckNvbmNhdChlbnYsIGEsIGIpIHtcblx0aWYgKGEuaXNQcmltaXRpdmUgJiYgYi5pc1ByaW1pdGl2ZSkge1xuXHRcdHJldHVybiBhLnZhbHVlICsgYi52YWx1ZTtcblx0fVxuXG5cdGEgPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYSk7XG5cdGIgPSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYik7XG5cdHJldHVybiBhICsgYjtcbn1cblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoXyQkJCQkJCQkJCQkaW4kaW5zdGFuY2VvZiA9IHt9LCBfZGVmaW5lUHJvcGVydHkoXyQkJCQkJCQkJCQkaW4kaW5zdGFuY2VvZiwgXCIrXCIsIGFkZE9yQ29uY2F0KSwgX2RlZmluZVByb3BlcnR5KF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2YsIFwiLVwiLCBmdW5jdGlvbiBfKGVudiwgYSwgYikge1xuXHRyZXR1cm4gY29udmVydC50b051bWJlcihlbnYsIGEpIC0gY29udmVydC50b051bWJlcihlbnYsIGIpO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfJCQkJCQkJCQkJCRpbiRpbnN0YW5jZW9mLCBcIi9cIiwgZnVuY3Rpb24gXyhlbnYsIGEsIGIpIHtcblx0cmV0dXJuIGNvbnZlcnQudG9OdW1iZXIoZW52LCBhKSAvIGNvbnZlcnQudG9OdW1iZXIoZW52LCBiKTtcbn0pLCBfZGVmaW5lUHJvcGVydHkoXyQkJCQkJCQkJCQkaW4kaW5zdGFuY2VvZiwgXCIqXCIsIGZ1bmN0aW9uIF8oZW52LCBhLCBiKSB7XG5cdHJldHVybiBjb252ZXJ0LnRvTnVtYmVyKGVudiwgYSkgKiBjb252ZXJ0LnRvTnVtYmVyKGVudiwgYik7XG59KSwgX2RlZmluZVByb3BlcnR5KF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2YsIFwiPDxcIiwgZnVuY3Rpb24gXyhlbnYsIGEsIGIpIHtcblx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhKSA8PCBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYik7XG59KSwgX2RlZmluZVByb3BlcnR5KF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2YsIFwiPj5cIiwgZnVuY3Rpb24gXyhlbnYsIGEsIGIpIHtcblx0cmV0dXJuIGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBhKSA+PiBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYik7XG59KSwgX2RlZmluZVByb3BlcnR5KF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2YsIFwiPj4+XCIsIGZ1bmN0aW9uIF8oZW52LCBhLCBiKSB7XG5cdHJldHVybiBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYSkgPj4+IGNvbnZlcnQudG9QcmltaXRpdmUoZW52LCBiKTtcbn0pLCBfZGVmaW5lUHJvcGVydHkoXyQkJCQkJCQkJCQkaW4kaW5zdGFuY2VvZiwgXCIlXCIsIGZ1bmN0aW9uIF8oZW52LCBhLCBiKSB7XG5cdHJldHVybiBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYSkgJSBjb252ZXJ0LnRvUHJpbWl0aXZlKGVudiwgYik7XG59KSwgX2RlZmluZVByb3BlcnR5KF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2YsIFwifFwiLCBmdW5jdGlvbiBfKGVudiwgYSwgYikge1xuXHRyZXR1cm4gY29udmVydC50b0ludDMyKGVudiwgYSkgfCBjb252ZXJ0LnRvSW50MzIoZW52LCBiKTtcbn0pLCBfZGVmaW5lUHJvcGVydHkoXyQkJCQkJCQkJCQkaW4kaW5zdGFuY2VvZiwgXCJeXCIsIGZ1bmN0aW9uIF8oZW52LCBhLCBiKSB7XG5cdHJldHVybiBjb252ZXJ0LnRvSW50MzIoZW52LCBhKSBeIGNvbnZlcnQudG9JbnQzMihlbnYsIGIpO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfJCQkJCQkJCQkJCRpbiRpbnN0YW5jZW9mLCBcIiZcIiwgZnVuY3Rpb24gXyhlbnYsIGEsIGIpIHtcblx0cmV0dXJuIGNvbnZlcnQudG9JbnQzMihlbnYsIGEpICYgY29udmVydC50b0ludDMyKGVudiwgYik7XG59KSwgX2RlZmluZVByb3BlcnR5KF8kJCQkJCQkJCQkJGluJGluc3RhbmNlb2YsIFwiaW5cIiwgZnVuY3Rpb24gX2luKGVudiwgYSwgYikge1xuXHRhID0gY29udmVydC50b1N0cmluZyhlbnYsIGEpO1xuXHRpZiAoYi5pc1ByaW1pdGl2ZSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3IgdG8gc2VhcmNoIGZvciAnXCIgKyBhICsgXCInIGluIFwiICsgY29udmVydC50b1N0cmluZyhlbnYsIGIpKTtcblx0fVxuXG5cdHJldHVybiBiLmhhc1Byb3BlcnR5KGEpO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfJCQkJCQkJCQkJCRpbiRpbnN0YW5jZW9mLCBcImluc3RhbmNlb2ZcIiwgZnVuY3Rpb24gX2luc3RhbmNlb2YoZW52LCBhLCBiKSB7XG5cdGlmIChiLnR5cGUgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RpbmcgYSBmdW5jdGlvbiBpbiBpbnN0YW5jZW9mIGNoZWNrLCBidXQgZ290IFwiICsgYi50eXBlKTtcblx0fVxuXG5cdGlmIChhLmlzUHJpbWl0aXZlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIGIuaGFzSW5zdGFuY2UoYSk7XG59KSwgXyQkJCQkJCQkJCQkaW4kaW5zdGFuY2VvZik7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gQXJyYXlFeHByZXNzaW9uKGNvbnRleHQpIHtcblx0dmFyIG9iamVjdEZhY3RvcnksIGFyciwgaSwgbG4sIGl0ZW07XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gQXJyYXlFeHByZXNzaW9uJChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdG9iamVjdEZhY3RvcnkgPSBjb250ZXh0LmVudi5vYmplY3RGYWN0b3J5O1xuXHRcdFx0XHRhcnIgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZShcIkFycmF5XCIpO1xuXG5cdFx0XHRcdGlmICghY29udGV4dC5ub2RlLmVsZW1lbnRzKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDE1O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGxuID0gY29udGV4dC5ub2RlLmVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdFx0Y2FzZSA1OlxuXHRcdFx0XHRpZiAoIShpIDwgbG4pKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDE0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFjb250ZXh0Lm5vZGUuZWxlbWVudHNbaV0pIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTE7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gOTtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5lbGVtZW50c1tpXSkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDk6XG5cdFx0XHRcdGl0ZW0gPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXG5cdFx0XHRcdGFyci5kZWZpbmVPd25Qcm9wZXJ0eShpLCB7IHZhbHVlOiBpdGVtLCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sIHRydWUsIGNvbnRleHQuZW52KTtcblxuXHRcdFx0Y2FzZSAxMTpcblxuXHRcdFx0XHRpKys7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA1O1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxNDpcblxuXHRcdFx0XHRhcnIucHV0VmFsdWUoXCJsZW5ndGhcIiwgb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobG4pLCBmYWxzZSwgY29udGV4dCk7XG5cblx0XHRcdGNhc2UgMTU6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5yZXN1bHQoYXJyKSk7XG5cblx0XHRcdGNhc2UgMTY6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBBcnJheUV4cHJlc3Npb24sIHRoaXMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZW52UmVmZXJlbmNlID0gcmVxdWlyZShcIi4uL2Vudi9yZWZlcmVuY2VcIik7XG5cbnZhciBfZW52UmVmZXJlbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudlJlZmVyZW5jZSk7XG5cbnZhciBfdXRpbHNPcGVyYXRvcnMgPSByZXF1aXJlKFwiLi4vdXRpbHMvb3BlcmF0b3JzXCIpO1xuXG52YXIgX3V0aWxzT3BlcmF0b3JzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzT3BlcmF0b3JzKTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG52YXIgYXNzaWduT3BlcmF0b3JzID0ge1xuXHRcIis9XCI6IF91dGlsc09wZXJhdG9yczJbXCJkZWZhdWx0XCJdW1wiK1wiXSxcblx0XCItPVwiOiBfdXRpbHNPcGVyYXRvcnMyW1wiZGVmYXVsdFwiXVtcIi1cIl0sXG5cdFwiKj1cIjogX3V0aWxzT3BlcmF0b3JzMltcImRlZmF1bHRcIl1bXCIqXCJdLFxuXHRcIi89XCI6IF91dGlsc09wZXJhdG9yczJbXCJkZWZhdWx0XCJdW1wiL1wiXSxcblx0XCIlPVwiOiBfdXRpbHNPcGVyYXRvcnMyW1wiZGVmYXVsdFwiXVtcIiVcIl0sXG5cdFwiPDw9XCI6IF91dGlsc09wZXJhdG9yczJbXCJkZWZhdWx0XCJdW1wiPDxcIl0sXG5cdFwiPj49XCI6IF91dGlsc09wZXJhdG9yczJbXCJkZWZhdWx0XCJdW1wiPj5cIl0sXG5cdFwiPj4+PVwiOiBfdXRpbHNPcGVyYXRvcnMyW1wiZGVmYXVsdFwiXVtcIj4+PlwiXSxcblx0XCJ8PVwiOiBfdXRpbHNPcGVyYXRvcnMyW1wiZGVmYXVsdFwiXVtcInxcIl0sXG5cdFwiXj1cIjogX3V0aWxzT3BlcmF0b3JzMltcImRlZmF1bHRcIl1bXCJeXCJdLFxuXHRcIiY9XCI6IF91dGlsc09wZXJhdG9yczJbXCJkZWZhdWx0XCJdW1wiJlwiXVxufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIEFzc2lnbm1lbnRFeHByZXNzaW9uKGNvbnRleHQpIHtcblx0dmFyIGFzc2lnbm1lbnQsIHJpZ2h0LCBsZWZ0LCBuZXdWYWx1ZSwgcmF3VmFsdWU7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gQXNzaWdubWVudEV4cHJlc3Npb24kKGNvbnRleHQkMSQwKSB7XG5cdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0YXNzaWdubWVudCA9IGNvbnRleHQubm9kZS5vcGVyYXRvciA9PT0gXCI9XCI7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUoY29udGV4dC5ub2RlLnJpZ2h0KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0cmlnaHQgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdDtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDY7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUubGVmdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDY6XG5cdFx0XHRcdGxlZnQgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdDtcblxuXHRcdFx0XHRpZiAobGVmdCBpbnN0YW5jZW9mIF9lbnZSZWZlcmVuY2UyW1wiZGVmYXVsdFwiXSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA5O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiSW52YWxpZCBsZWZ0LWhhbmQgc2lkZSBpbiBhc3NpZ25tZW50XCIpO1xuXG5cdFx0XHRjYXNlIDk6XG5cdFx0XHRcdGlmIChhc3NpZ25tZW50KSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUgPSByaWdodC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJhd1ZhbHVlID0gYXNzaWduT3BlcmF0b3JzW2NvbnRleHQubm9kZS5vcGVyYXRvcl0oY29udGV4dC5lbnYsIGxlZnQuZ2V0VmFsdWUoKSwgcmlnaHQuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRuZXdWYWx1ZSA9IGNvbnRleHQuZW52Lm9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHJhd1ZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxlZnQucHV0VmFsdWUobmV3VmFsdWUpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQucmVzdWx0KG5ld1ZhbHVlKSk7XG5cblx0XHRcdGNhc2UgMTI6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgdGhpcyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzT3BlcmF0b3JzID0gcmVxdWlyZShcIi4uL3V0aWxzL29wZXJhdG9yc1wiKTtcblxudmFyIG9wZXJhdG9ycyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc09wZXJhdG9ycyk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIEJpbmFyeUV4cHJlc3Npb24oY29udGV4dCkge1xuXHR2YXIgdW5kZWYsIGxlZnQsIGxlZnRWYWx1ZSwgcmlnaHQsIHJpZ2h0VmFsdWUsIG5ld1ZhbHVlO1xuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIEJpbmFyeUV4cHJlc3Npb24kKGNvbnRleHQkMSQwKSB7XG5cdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0dW5kZWYgPSBjb250ZXh0LmVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUubGVmdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDM6XG5cdFx0XHRcdGxlZnQgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdDtcblx0XHRcdFx0bGVmdFZhbHVlID0gbGVmdC5nZXRWYWx1ZSgpIHx8IHVuZGVmO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNztcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5yaWdodCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDc6XG5cdFx0XHRcdHJpZ2h0ID0gY29udGV4dCQxJDAuc2VudC5yZXN1bHQ7XG5cdFx0XHRcdHJpZ2h0VmFsdWUgPSByaWdodC5nZXRWYWx1ZSgpIHx8IHVuZGVmO1xuXG5cdFx0XHRcdGlmIChjb250ZXh0Lm5vZGUub3BlcmF0b3IgaW4gb3BlcmF0b3JzKSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUgPSBvcGVyYXRvcnNbY29udGV4dC5ub2RlLm9wZXJhdG9yXShjb250ZXh0LmVudiwgbGVmdFZhbHVlLCByaWdodFZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRuZXdWYWx1ZSA9IGNvbnRleHQuZW52LmV2YWx1YXRlKGxlZnRWYWx1ZSwgcmlnaHRWYWx1ZSwgY29udGV4dC5ub2RlLm9wZXJhdG9yKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5yZXN1bHQoY29udGV4dC5lbnYub2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobmV3VmFsdWUpKSk7XG5cblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBCaW5hcnlFeHByZXNzaW9uLCB0aGlzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBCbG9ja1N0YXRlbWVudChjb250ZXh0KSB7XG5cdHZhciByZXN1bHQsIHByaW9yUmVzdWx0LCBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uLCBfZGlkSXRlcmF0b3JFcnJvciwgX2l0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvciwgX3N0ZXAsIGN1cnJlbnQ7XG5cblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBCbG9ja1N0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXG5cdFx0XHRcdGlmIChjb250ZXh0Lm5vZGUudHlwZSA9PT0gXCJQcm9ncmFtXCIpIHtcblx0XHRcdFx0XHRjb250ZXh0LmVudi5pbml0U2NvcGUoY29udGV4dC5ub2RlLmJvZHkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG5cdFx0XHRcdF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG5cdFx0XHRcdF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gNDtcblx0XHRcdFx0X2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKGNvbnRleHQubm9kZS5ib2R5KTtcblxuXHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRpZiAoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjdXJyZW50ID0gX3N0ZXAudmFsdWU7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGN1cnJlbnQpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAxMDpcblx0XHRcdFx0cmVzdWx0ID0gY29udGV4dCQxJDAuc2VudDtcblxuXHRcdFx0XHRpZiAoIShyZXN1bHQgJiYgcmVzdWx0LnNob3VsZEJyZWFrKGNvbnRleHQsIGZhbHNlLCBwcmlvclJlc3VsdCkpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDEzO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCByZXN1bHQpO1xuXG5cdFx0XHRjYXNlIDEzOlxuXG5cdFx0XHRcdHByaW9yUmVzdWx0ID0gcmVzdWx0O1xuXG5cdFx0XHRjYXNlIDE0OlxuXHRcdFx0XHRfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDY7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE3OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjM7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE5OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMTk7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udGV4dCQxJDBbXCJjYXRjaFwiXSg0KTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IGNvbnRleHQkMSQwLnQwO1xuXG5cdFx0XHRjYXNlIDIzOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMjM7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyNDtcblxuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2FzZSAyNjpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDI2O1xuXG5cdFx0XHRcdGlmICghX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuXHRcdFx0Y2FzZSAyOTpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgyNik7XG5cblx0XHRcdGNhc2UgMzA6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMjMpO1xuXG5cdFx0XHRjYXNlIDMxOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJlc3VsdCk7XG5cblx0XHRcdGNhc2UgMzI6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBCbG9ja1N0YXRlbWVudCwgdGhpcywgW1s0LCAxOSwgMjMsIDMxXSwgWzI0LCwgMjYsIDMwXV0pO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9lbnZSZWZlcmVuY2UgPSByZXF1aXJlKFwiLi4vZW52L3JlZmVyZW5jZVwiKTtcblxudmFyIF9lbnZSZWZlcmVuY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW52UmVmZXJlbmNlKTtcblxudmFyIF91dGlsc0NvbnZlcnQgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udmVydFwiKTtcblxudmFyIGNvbnZlcnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb252ZXJ0KTtcblxudmFyIF91dGlsc0Z1bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvZnVuY1wiKTtcblxudmFyIGZ1bmMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNGdW5jKTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5mdW5jdGlvbiBhc3NpZ25UaGlzKGVudiwgZm5NZW1iZXIsIGZuLCBpc05ldywgbmF0aXZlKSB7XG5cdGlmIChpc05ldykge1xuXHRcdC8vIGlmIHRoaXMgaXMgYSBuYXRpdmUgY29udHJ1Y3RvciB3ZSBkb24ndCBhcmUgYWJvdXQgdGhpc1xuXHRcdC8vIG90aGVyd2lzZSBjcmVhdGUgYSBuZXcgb2JqZWN0XG5cdFx0cmV0dXJuIG5hdGl2ZSA/IG51bGwgOiBlbnYub2JqZWN0RmFjdG9yeS5jcmVhdGVPYmplY3QoZm4pO1xuXHR9XG5cblx0aWYgKGZuTWVtYmVyIGluc3RhbmNlb2YgX2VudlJlZmVyZW5jZTJbXCJkZWZhdWx0XCJdICYmIGZuTWVtYmVyLmlzUHJvcGVydHlSZWZlcmVuY2UpIHtcblx0XHRyZXR1cm4gY29udmVydC50b09iamVjdChlbnYsIGZuTWVtYmVyLmJhc2UpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBDYWxsRXhwcmVzc2lvbihjb250ZXh0KSB7XG5cdHZhciBub2RlLCBpc05ldywgZm5NZW1iZXIsIGZuLCBhcmdzLCBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uLCBfZGlkSXRlcmF0b3JFcnJvciwgX2l0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvciwgX3N0ZXAsIGFyZywgbmF0aXZlLCB0aGlzQXJnLCBwYXJhbXMsIGNhbGxlZTtcblxuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIENhbGxFeHByZXNzaW9uJChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdG5vZGUgPSBjb250ZXh0Lm5vZGU7XG5cdFx0XHRcdGlzTmV3ID0gY29udGV4dC5ub2RlLnR5cGUgPT09IFwiTmV3RXhwcmVzc2lvblwiO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKG5vZGUuY2FsbGVlKS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgNDpcblx0XHRcdFx0Zm5NZW1iZXIgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdDtcblx0XHRcdFx0Zm4gPSBmbk1lbWJlci5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRhcmdzID0gW107XG5cdFx0XHRcdF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDEwO1xuXHRcdFx0XHRfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3Iobm9kZS5hcmd1bWVudHMpO1xuXG5cdFx0XHRjYXNlIDEyOlxuXHRcdFx0XHRpZiAoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhcmcgPSBfc3RlcC52YWx1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAudDAgPSBhcmdzO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTc7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShhcmcpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAxNzpcblx0XHRcdFx0Y29udGV4dCQxJDAudDEgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRjb250ZXh0JDEkMC50MC5wdXNoLmNhbGwoY29udGV4dCQxJDAudDAsIGNvbnRleHQkMSQwLnQxKTtcblxuXHRcdFx0Y2FzZSAxOTpcblx0XHRcdFx0X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMjtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjI6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyODtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjQ6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyNDtcblx0XHRcdFx0Y29udGV4dCQxJDAudDIgPSBjb250ZXh0JDEkMFtcImNhdGNoXCJdKDEwKTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IGNvbnRleHQkMSQwLnQyO1xuXG5cdFx0XHRjYXNlIDI4OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMjg7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyOTtcblxuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2FzZSAzMTpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDMxO1xuXG5cdFx0XHRcdGlmICghX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMzQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuXHRcdFx0Y2FzZSAzNDpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgzMSk7XG5cblx0XHRcdGNhc2UgMzU6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMjgpO1xuXG5cdFx0XHRjYXNlIDM2OlxuXHRcdFx0XHRpZiAoISghZm4gfHwgZm4uY2xhc3NOYW1lICE9PSBcIkZ1bmN0aW9uXCIpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM4O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihjb252ZXJ0LnRvU3RyaW5nKGNvbnRleHQuZW52LCBmbikgKyBcIiBub3QgYSBmdW5jdGlvblwiKTtcblxuXHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0bmF0aXZlID0gZm4ubmF0aXZlO1xuXHRcdFx0XHR0aGlzQXJnID0gYXNzaWduVGhpcyhjb250ZXh0LmVudiwgZm5NZW1iZXIsIGZuLCBpc05ldywgbmF0aXZlKTtcblx0XHRcdFx0cGFyYW1zID0gbmF0aXZlID8gW10gOiBmbi5ub2RlLnBhcmFtcztcblx0XHRcdFx0Y2FsbGVlID0gZm5NZW1iZXI7XG5cblx0XHRcdFx0Y2FsbGVlLmlkZW50aWZpZXIgPSBmbi5uYW1lO1xuXHRcdFx0XHRjb250ZXh0JDEkMC50MyA9IGNvbnRleHQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA0Njtcblx0XHRcdFx0cmV0dXJuIGZ1bmMuZXhlY3V0ZUZ1bmN0aW9uKGNvbnRleHQuZW52LCBmbiwgcGFyYW1zLCBhcmdzLCB0aGlzQXJnLCBjYWxsZWUsIGlzTmV3KTtcblxuXHRcdFx0Y2FzZSA0Njpcblx0XHRcdFx0Y29udGV4dCQxJDAudDQgPSBjb250ZXh0JDEkMC5zZW50O1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQkMSQwLnQzLnJlc3VsdC5jYWxsKGNvbnRleHQkMSQwLnQzLCBjb250ZXh0JDEkMC50NCkpO1xuXG5cdFx0XHRjYXNlIDQ4OlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgQ2FsbEV4cHJlc3Npb24sIHRoaXMsIFtbMTAsIDI0LCAyOCwgMzZdLCBbMjksLCAzMSwgMzVdXSk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBEZWJ1Z2dlclN0YXRlbWVudDtcblxuZnVuY3Rpb24gRGVidWdnZXJTdGF0ZW1lbnQoY29udGV4dCkge1xuXHRyZXR1cm4gY29udGV4dC5lbXB0eSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBEb1doaWxlU3RhdGVtZW50KGNvbnRleHQpIHtcblx0dmFyIHJlc3VsdCwgcHJpb3JSZXN1bHQsIHBhc3NlZDtcblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBEb1doaWxlU3RhdGVtZW50JChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdHBhc3NlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCEoY29udGV4dC5ub2RlLnR5cGUgPT09IFwiV2hpbGVTdGF0ZW1lbnRcIikpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udmVydDtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDU7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUudGVzdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDU6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQxID0gY29udGV4dCQxJDAuc2VudC5yZXN1bHQuZ2V0VmFsdWUoKTtcblx0XHRcdFx0cGFzc2VkID0gY29udGV4dCQxJDAudDAudG9Cb29sZWFuLmNhbGwoY29udGV4dCQxJDAudDAsIGNvbnRleHQkMSQwLnQxKTtcblxuXHRcdFx0Y2FzZSA3OlxuXHRcdFx0XHRpZiAoIXBhc3NlZCkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyMTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5ib2R5KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMTA6XG5cdFx0XHRcdHJlc3VsdCA9IGNvbnRleHQkMSQwLnNlbnQ7XG5cblx0XHRcdFx0aWYgKCEocmVzdWx0ICYmIHJlc3VsdC5zaG91bGRCcmVhayhjb250ZXh0LCB0cnVlLCBwcmlvclJlc3VsdCkpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDEzO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCByZXN1bHQpO1xuXG5cdFx0XHRjYXNlIDEzOlxuXHRcdFx0XHRjb250ZXh0JDEkMC50MiA9IGNvbnZlcnQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxNjtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS50ZXN0KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMTY6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQzID0gY29udGV4dCQxJDAuc2VudC5yZXN1bHQuZ2V0VmFsdWUoKTtcblx0XHRcdFx0cGFzc2VkID0gY29udGV4dCQxJDAudDIudG9Cb29sZWFuLmNhbGwoY29udGV4dCQxJDAudDIsIGNvbnRleHQkMSQwLnQzKTtcblxuXHRcdFx0XHRwcmlvclJlc3VsdCA9IHJlc3VsdDtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDIxOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJlc3VsdCk7XG5cblx0XHRcdGNhc2UgMjI6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBEb1doaWxlU3RhdGVtZW50LCB0aGlzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEVtcHR5U3RhdGVtZW50O1xuXG5mdW5jdGlvbiBFbXB0eVN0YXRlbWVudChjb250ZXh0KSB7XG5cdHJldHVybiBjb250ZXh0LmVtcHR5KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBFeHByZXNzaW9uU3RhdGVtZW50KGNvbnRleHQpIHtcblx0dmFyIGV4ZWN1dGlvblJlc3VsdCwgZXhlY3V0aW9uVmFsdWU7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gRXhwcmVzc2lvblN0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5leHByZXNzaW9uKS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0ZXhlY3V0aW9uUmVzdWx0ID0gY29udGV4dCQxJDAuc2VudDtcblx0XHRcdFx0ZXhlY3V0aW9uVmFsdWUgPSBleGVjdXRpb25SZXN1bHQgJiYgZXhlY3V0aW9uUmVzdWx0LnJlc3VsdCAmJiBleGVjdXRpb25SZXN1bHQucmVzdWx0LmdldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5yZXN1bHQoZXhlY3V0aW9uVmFsdWUgfHwgY29udGV4dC5lbnYuZ2xvYmFsLmdldFByb3BlcnR5KFwidW5kZWZpbmVkXCIpLmdldFZhbHVlKCkpKTtcblxuXHRcdFx0Y2FzZSA1OlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgRXhwcmVzc2lvblN0YXRlbWVudCwgdGhpcyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkY3JlYXRlID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gRm9ySW5TdGF0ZW1lbnQoY29udGV4dCkge1xuXHR2YXIgbGVmdCwgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiwgX2RpZEl0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvckVycm9yLCBfaXRlcmF0b3IsIF9zdGVwLCBkZWNsLCBvYmosIHJlc3VsdCwgcHJpb3JSZXN1bHQsIHZpc2l0ZWQsIHByb3A7XG5cblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBGb3JJblN0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRpZiAoIShjb250ZXh0Lm5vZGUubGVmdC50eXBlID09PSBcIlZhcmlhYmxlRGVjbGFyYXRpb25cIikpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMzA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcblx0XHRcdFx0X2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSA0O1xuXHRcdFx0XHRfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IoY29udGV4dC5ub2RlLmxlZnQuZGVjbGFyYXRpb25zKTtcblxuXHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRpZiAoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWNsID0gX3N0ZXAudmFsdWU7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGRlY2wpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAxMDpcblx0XHRcdFx0bGVmdCA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0O1xuXG5cdFx0XHRjYXNlIDExOlxuXHRcdFx0XHRfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDY7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE0OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjA7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE2OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMTY7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udGV4dCQxJDBbXCJjYXRjaFwiXSg0KTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IGNvbnRleHQkMSQwLnQwO1xuXG5cdFx0XHRjYXNlIDIwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMjA7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyMTtcblxuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2FzZSAyMzpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDIzO1xuXG5cdFx0XHRcdGlmICghX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjY7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuXHRcdFx0Y2FzZSAyNjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgyMyk7XG5cblx0XHRcdGNhc2UgMjc6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMjApO1xuXG5cdFx0XHRjYXNlIDI4OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMzM7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDMwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMzI7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUubGVmdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRsZWZ0ID0gY29udGV4dCQxJDAuc2VudC5yZXN1bHQ7XG5cblx0XHRcdGNhc2UgMzM6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzNTtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5yaWdodCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDM1OlxuXHRcdFx0XHRvYmogPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHR2aXNpdGVkID0gX09iamVjdCRjcmVhdGUobnVsbCk7XG5cblx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGlmICghb2JqKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDU1O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGV4dCQxJDAudDEgPSBfcmVnZW5lcmF0b3JSdW50aW1lLmtleXMob2JqLnByb3BlcnRpZXMpO1xuXG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRpZiAoKGNvbnRleHQkMSQwLnQyID0gY29udGV4dCQxJDAudDEoKSkuZG9uZSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA1MTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHByb3AgPSBjb250ZXh0JDEkMC50Mi52YWx1ZTtcblxuXHRcdFx0XHRpZiAoIShvYmoucHJvcGVydGllc1twcm9wXS5lbnVtZXJhYmxlICYmICF2aXNpdGVkW3Byb3BdKSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA0ODtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxlZnQucHV0VmFsdWUoY29udGV4dC5lbnYub2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUocHJvcCkpO1xuXG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA0NTtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5ib2R5KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgNDU6XG5cdFx0XHRcdHJlc3VsdCA9IGNvbnRleHQkMSQwLnNlbnQ7XG5cblx0XHRcdFx0aWYgKCEocmVzdWx0ICYmIHJlc3VsdC5zaG91bGRCcmVhayhjb250ZXh0LCB0cnVlLCBwcmlvclJlc3VsdCkpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDQ4O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCByZXN1bHQpO1xuXG5cdFx0XHRjYXNlIDQ4OlxuXG5cdFx0XHRcdHZpc2l0ZWRbcHJvcF0gPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMzk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDUxOlxuXG5cdFx0XHRcdHByaW9yUmVzdWx0ID0gcmVzdWx0O1xuXHRcdFx0XHRvYmogPSBvYmouZ2V0UHJvdG90eXBlKCk7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzNztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgNTU6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzdWx0KTtcblxuXHRcdFx0Y2FzZSA1Njpcblx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcblx0XHR9XG5cdH0sIEZvckluU3RhdGVtZW50LCB0aGlzLCBbWzQsIDE2LCAyMCwgMjhdLCBbMjEsLCAyMywgMjddXSk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4vLyBzaG91bGQgb25seSBiZSBvbmUsIGJ1dFxuLy8gbmVlZCB0byB1bndyYXAgdGhlIGRlY2xhcmF0aW9uIHRvIGdldCBpdFxuLy8gdG9kbzogdGhpcyBpcyBzbG9wcHkgLSBuZWVkIHRvIHJldmlzaXRcblxuLy8gdHJhY2sgdmlzaXRlZCBwcm9wZXJ0aWVzIHRvIHByZXZlbnQgaXRlcmF0aW5nIG92ZXIgc2hhZG93ZWQgcHJvcGVydGllcywgcmVnYXJkbGVzcyBvZiBlbnVtZXJhYmxlIGZsYWdcbi8vIDEyLjYuNCBOT1RFOiBhIHByb3BlcnR5IG9mIGEgcHJvdG90eXBlIGlzIG5vdCBlbnVtZXJhdGVkIGlmIGl0IGlzIOKAnHNoYWRvd2Vk4oCdIGJlY2F1c2Ugc29tZSBwcmV2aW91c1xuLy8gb2JqZWN0IGluIHRoZSBwcm90b3R5cGUgY2hhaW4gaGFzIGEgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lLiBUaGUgdmFsdWVzIG9mIFtbRW51bWVyYWJsZV1dIGF0dHJpYnV0ZXNcbi8vIGFyZSBub3QgY29uc2lkZXJlZCB3aGVuIGRldGVybWluaW5nIGlmIGEgcHJvcGVydHkgb2YgYSBwcm90b3R5cGUgb2JqZWN0IGlzIHNoYWRvd2VkIGJ5IGEgcHJldmlvdXMgb2JqZWN0XG4vLyBvbiB0aGUgcHJvdG90eXBlIGNoYWluLiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbnZhciBzaG91bGRDb250aW51ZSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gc2hvdWxkQ29udGludWUoY29udGV4dCkge1xuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIHNob3VsZENvbnRpbnVlJChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGlmIChjb250ZXh0Lm5vZGUudGVzdCkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCB0cnVlKTtcblxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRjb250ZXh0JDEkMC50MCA9IGNvbnZlcnQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA1O1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUoY29udGV4dC5ub2RlLnRlc3QpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSA1OlxuXHRcdFx0XHRjb250ZXh0JDEkMC50MSA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0LmdldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dCQxJDAudDAudG9Cb29sZWFuLmNhbGwoY29udGV4dCQxJDAudDAsIGNvbnRleHQkMSQwLnQxKSk7XG5cblx0XHRcdGNhc2UgNzpcblx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcblx0XHR9XG5cdH0sIHNob3VsZENvbnRpbnVlLCB0aGlzKTtcbn0pKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIEZvclN0YXRlbWVudChjb250ZXh0KSB7XG5cdHZhciByZXN1bHQsIHByaW9yUmVzdWx0O1xuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIEZvclN0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRpZiAoIWNvbnRleHQubm9kZS5pbml0KSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMztcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5pbml0KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDU7XG5cdFx0XHRcdHJldHVybiBzaG91bGRDb250aW51ZShjb250ZXh0KTtcblxuXHRcdFx0Y2FzZSA1OlxuXHRcdFx0XHRpZiAoIWNvbnRleHQkMSQwLnNlbnQpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gODtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5ib2R5KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgODpcblx0XHRcdFx0cmVzdWx0ID0gY29udGV4dCQxJDAuc2VudDtcblxuXHRcdFx0XHRpZiAoIShyZXN1bHQgJiYgcmVzdWx0LnNob3VsZEJyZWFrKGNvbnRleHQsIHRydWUsIHByaW9yUmVzdWx0KSkpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTE7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJlc3VsdCk7XG5cblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRcdGlmICghY29udGV4dC5ub2RlLnVwZGF0ZSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxNDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxNDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS51cGRhdGUpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAxNDpcblxuXHRcdFx0XHRwcmlvclJlc3VsdCA9IHJlc3VsdDtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE3OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJlc3VsdCk7XG5cblx0XHRcdGNhc2UgMTg6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBGb3JTdGF0ZW1lbnQsIHRoaXMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRnVuY3Rpb25EZWNsYXJhdGlvbjtcblxuZnVuY3Rpb24gRnVuY3Rpb25EZWNsYXJhdGlvbihjb250ZXh0KSB7XG5cdHJldHVybiBjb250ZXh0LnJlc3VsdChjb250ZXh0LmVudi5nZXRWYWx1ZShjb250ZXh0Lm5vZGUuaWQubmFtZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBGdW5jdGlvbkV4cHJlc3Npb247XG5cbmZ1bmN0aW9uIEZ1bmN0aW9uRXhwcmVzc2lvbihjb250ZXh0KSB7XG5cdHZhciBvYmplY3RGYWN0b3J5ID0gY29udGV4dC5lbnYub2JqZWN0RmFjdG9yeTtcblx0dmFyIGZ1bmMgPSBvYmplY3RGYWN0b3J5LmNyZWF0ZUZ1bmN0aW9uKGNvbnRleHQubm9kZSk7XG5cdGZ1bmMuYmluZFNjb3BlKGNvbnRleHQuZW52LmN1cnJlbnQpO1xuXG5cdGlmIChjb250ZXh0Lm5vZGUuaWQpIHtcblx0XHRmdW5jLm5hbWUgPSBjb250ZXh0Lm5vZGUuaWQubmFtZTtcblx0fVxuXG5cdHJldHVybiBjb250ZXh0LnJlc3VsdChmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSWRlbnRpZmllcjtcblxuZnVuY3Rpb24gSWRlbnRpZmllcihjb250ZXh0KSB7XG5cdHZhciBuYW1lID0gY29udGV4dC5ub2RlLm5hbWU7XG5cblx0aWYgKGNvbnRleHQuY2FsbGVlICYmIGNvbnRleHQuY2FsbGVlLmlkZW50aWZpZXIgPT09IG5hbWUpIHtcblx0XHRyZXR1cm4gY29udGV4dC5yZXN1bHQoY29udGV4dC5jYWxsZWUpO1xuXHR9XG5cblx0cmV0dXJuIGNvbnRleHQucmVzdWx0KGNvbnRleHQuZW52LmdldFJlZmVyZW5jZShjb250ZXh0Lm5vZGUubmFtZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBJZlN0YXRlbWVudChjb250ZXh0KSB7XG5cdHZhciB0ZXN0VmFsdWU7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gSWZTdGF0ZW1lbnQkKGNvbnRleHQkMSQwKSB7XG5cdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUudGVzdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlc3RWYWx1ZSA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0LmdldFZhbHVlKCk7XG5cblx0XHRcdFx0aWYgKCFjb252ZXJ0LnRvQm9vbGVhbih0ZXN0VmFsdWUpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNjtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5jb25zZXF1ZW50KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgNjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCBjb250ZXh0JDEkMC5zZW50KTtcblxuXHRcdFx0Y2FzZSA3OlxuXHRcdFx0XHRpZiAoIWNvbnRleHQubm9kZS5hbHRlcm5hdGUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTE7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTA7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuYWx0ZXJuYXRlKS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMTA6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dCQxJDAuc2VudCk7XG5cblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBJZlN0YXRlbWVudCwgdGhpcyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9hcnJheUV4cHJlc3Npb24gPSByZXF1aXJlKFwiLi9hcnJheS1leHByZXNzaW9uXCIpO1xuXG52YXIgX2FycmF5RXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcnJheUV4cHJlc3Npb24pO1xuXG52YXIgX2Fzc2lnbm1lbnRFeHByZXNzaW9uID0gcmVxdWlyZShcIi4vYXNzaWdubWVudC1leHByZXNzaW9uXCIpO1xuXG52YXIgX2Fzc2lnbm1lbnRFeHByZXNzaW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbm1lbnRFeHByZXNzaW9uKTtcblxudmFyIF9iaW5hcnlFeHByZXNzaW9uID0gcmVxdWlyZShcIi4vYmluYXJ5LWV4cHJlc3Npb25cIik7XG5cbnZhciBfYmluYXJ5RXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5hcnlFeHByZXNzaW9uKTtcblxudmFyIF9ibG9ja1N0YXRlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrLXN0YXRlbWVudFwiKTtcblxudmFyIF9ibG9ja1N0YXRlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ibG9ja1N0YXRlbWVudCk7XG5cbnZhciBfaW50ZXJydXB0U3RhdGVtZW50ID0gcmVxdWlyZShcIi4vaW50ZXJydXB0LXN0YXRlbWVudFwiKTtcblxudmFyIF9pbnRlcnJ1cHRTdGF0ZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW50ZXJydXB0U3RhdGVtZW50KTtcblxudmFyIF9jYWxsRXhwcmVzc2lvbiA9IHJlcXVpcmUoXCIuL2NhbGwtZXhwcmVzc2lvblwiKTtcblxudmFyIF9jYWxsRXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYWxsRXhwcmVzc2lvbik7XG5cbnZhciBfaWZTdGF0ZW1lbnQgPSByZXF1aXJlKFwiLi9pZi1zdGF0ZW1lbnRcIik7XG5cbnZhciBfaWZTdGF0ZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWZTdGF0ZW1lbnQpO1xuXG52YXIgX2RlYnVnZ2VyU3RhdGVtZW50ID0gcmVxdWlyZShcIi4vZGVidWdnZXItc3RhdGVtZW50XCIpO1xuXG52YXIgX2RlYnVnZ2VyU3RhdGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlYnVnZ2VyU3RhdGVtZW50KTtcblxudmFyIF9kb1doaWxlU3RhdGVtZW50SnMgPSByZXF1aXJlKFwiLi9kby13aGlsZS1zdGF0ZW1lbnQuanNcIik7XG5cbnZhciBfZG9XaGlsZVN0YXRlbWVudEpzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvV2hpbGVTdGF0ZW1lbnRKcyk7XG5cbnZhciBfZW1wdHlTdGF0ZW1lbnQgPSByZXF1aXJlKFwiLi9lbXB0eS1zdGF0ZW1lbnRcIik7XG5cbnZhciBfZW1wdHlTdGF0ZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW1wdHlTdGF0ZW1lbnQpO1xuXG52YXIgX2V4cHJlc3Npb25TdGF0ZW1lbnQgPSByZXF1aXJlKFwiLi9leHByZXNzaW9uLXN0YXRlbWVudFwiKTtcblxudmFyIF9leHByZXNzaW9uU3RhdGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4cHJlc3Npb25TdGF0ZW1lbnQpO1xuXG52YXIgX2ZvclN0YXRlbWVudCA9IHJlcXVpcmUoXCIuL2Zvci1zdGF0ZW1lbnRcIik7XG5cbnZhciBfZm9yU3RhdGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZvclN0YXRlbWVudCk7XG5cbnZhciBfZm9ySW5TdGF0ZW1lbnQgPSByZXF1aXJlKFwiLi9mb3ItaW4tc3RhdGVtZW50XCIpO1xuXG52YXIgX2ZvckluU3RhdGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZvckluU3RhdGVtZW50KTtcblxudmFyIF9mdW5jdGlvbkRlY2xhcmF0aW9uID0gcmVxdWlyZShcIi4vZnVuY3Rpb24tZGVjbGFyYXRpb25cIik7XG5cbnZhciBfZnVuY3Rpb25EZWNsYXJhdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mdW5jdGlvbkRlY2xhcmF0aW9uKTtcblxudmFyIF9mdW5jdGlvbkV4cHJlc3Npb24gPSByZXF1aXJlKFwiLi9mdW5jdGlvbi1leHByZXNzaW9uXCIpO1xuXG52YXIgX2Z1bmN0aW9uRXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mdW5jdGlvbkV4cHJlc3Npb24pO1xuXG52YXIgX2lkZW50aWZpZXIgPSByZXF1aXJlKFwiLi9pZGVudGlmaWVyXCIpO1xuXG52YXIgX2lkZW50aWZpZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRlbnRpZmllcik7XG5cbnZhciBfbGFiZWxlZFN0YXRlbWVudCA9IHJlcXVpcmUoXCIuL2xhYmVsZWQtc3RhdGVtZW50XCIpO1xuXG52YXIgX2xhYmVsZWRTdGF0ZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGFiZWxlZFN0YXRlbWVudCk7XG5cbnZhciBfbGl0ZXJhbCA9IHJlcXVpcmUoXCIuL2xpdGVyYWxcIik7XG5cbnZhciBfbGl0ZXJhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saXRlcmFsKTtcblxudmFyIF9sb2dpY2FsRXhwcmVzc2lvbiA9IHJlcXVpcmUoXCIuL2xvZ2ljYWwtZXhwcmVzc2lvblwiKTtcblxudmFyIF9sb2dpY2FsRXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dpY2FsRXhwcmVzc2lvbik7XG5cbnZhciBfbWVtYmVyRXhwcmVzc2lvbiA9IHJlcXVpcmUoXCIuL21lbWJlci1leHByZXNzaW9uXCIpO1xuXG52YXIgX21lbWJlckV4cHJlc3Npb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVtYmVyRXhwcmVzc2lvbik7XG5cbnZhciBfb2JqZWN0RXhwcmVzc2lvbiA9IHJlcXVpcmUoXCIuL29iamVjdC1leHByZXNzaW9uXCIpO1xuXG52YXIgX29iamVjdEV4cHJlc3Npb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0RXhwcmVzc2lvbik7XG5cbnZhciBfcmV0dXJuU3RhdGVtZW50ID0gcmVxdWlyZShcIi4vcmV0dXJuLXN0YXRlbWVudFwiKTtcblxudmFyIF9yZXR1cm5TdGF0ZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmV0dXJuU3RhdGVtZW50KTtcblxudmFyIF9zZXF1ZW5jZUV4cHJlc3Npb24gPSByZXF1aXJlKFwiLi9zZXF1ZW5jZS1leHByZXNzaW9uXCIpO1xuXG52YXIgX3NlcXVlbmNlRXhwcmVzc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXF1ZW5jZUV4cHJlc3Npb24pO1xuXG52YXIgX3N3aXRjaFN0YXRlbWVudCA9IHJlcXVpcmUoXCIuL3N3aXRjaC1zdGF0ZW1lbnRcIik7XG5cbnZhciBfc3dpdGNoU3RhdGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N3aXRjaFN0YXRlbWVudCk7XG5cbnZhciBfdGhpc0V4cHJlc3Npb24gPSByZXF1aXJlKFwiLi90aGlzLWV4cHJlc3Npb25cIik7XG5cbnZhciBfdGhpc0V4cHJlc3Npb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGhpc0V4cHJlc3Npb24pO1xuXG52YXIgX3Rocm93U3RhdGVtZW50ID0gcmVxdWlyZShcIi4vdGhyb3ctc3RhdGVtZW50XCIpO1xuXG52YXIgX3Rocm93U3RhdGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Rocm93U3RhdGVtZW50KTtcblxudmFyIF90cnlTdGF0ZW1lbnQgPSByZXF1aXJlKFwiLi90cnktc3RhdGVtZW50XCIpO1xuXG52YXIgX3RyeVN0YXRlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90cnlTdGF0ZW1lbnQpO1xuXG52YXIgX3VuYXJ5RXhwcmVzc2lvbiA9IHJlcXVpcmUoXCIuL3VuYXJ5LWV4cHJlc3Npb25cIik7XG5cbnZhciBfdW5hcnlFeHByZXNzaW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VuYXJ5RXhwcmVzc2lvbik7XG5cbnZhciBfdXBkYXRlRXhwcmVzc2lvbiA9IHJlcXVpcmUoXCIuL3VwZGF0ZS1leHByZXNzaW9uXCIpO1xuXG52YXIgX3VwZGF0ZUV4cHJlc3Npb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXBkYXRlRXhwcmVzc2lvbik7XG5cbnZhciBfdmFyaWFibGVEZWNsYXJhdGlvbiA9IHJlcXVpcmUoXCIuL3ZhcmlhYmxlLWRlY2xhcmF0aW9uXCIpO1xuXG52YXIgX3ZhcmlhYmxlRGVjbGFyYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmFyaWFibGVEZWNsYXJhdGlvbik7XG5cbnZhciBfdmFyaWFibGVEZWNsYXJhdG9yID0gcmVxdWlyZShcIi4vdmFyaWFibGUtZGVjbGFyYXRvclwiKTtcblxudmFyIF92YXJpYWJsZURlY2xhcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmFyaWFibGVEZWNsYXJhdG9yKTtcblxudmFyIF93aXRoU3RhdGVtZW50ID0gcmVxdWlyZShcIi4vd2l0aC1zdGF0ZW1lbnRcIik7XG5cbnZhciBfd2l0aFN0YXRlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93aXRoU3RhdGVtZW50KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG52YXIgdmlzaXRvcnMgPSB7XG5cdEFycmF5RXhwcmVzc2lvbjogX2FycmF5RXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRBc3NpZ25tZW50RXhwcmVzc2lvbjogX2Fzc2lnbm1lbnRFeHByZXNzaW9uMltcImRlZmF1bHRcIl0sXG5cdEJpbmFyeUV4cHJlc3Npb246IF9iaW5hcnlFeHByZXNzaW9uMltcImRlZmF1bHRcIl0sXG5cdEJsb2NrU3RhdGVtZW50OiBfYmxvY2tTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0QnJlYWtTdGF0ZW1lbnQ6IF9pbnRlcnJ1cHRTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0Q2FsbEV4cHJlc3Npb246IF9jYWxsRXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRDb25kaXRpb25hbEV4cHJlc3Npb246IF9pZlN0YXRlbWVudDJbXCJkZWZhdWx0XCJdLFxuXHREZWJ1Z2dlclN0YXRlbWVudDogX2RlYnVnZ2VyU3RhdGVtZW50MltcImRlZmF1bHRcIl0sXG5cdERvV2hpbGVTdGF0ZW1lbnQ6IF9kb1doaWxlU3RhdGVtZW50SnMyW1wiZGVmYXVsdFwiXSxcblx0RW1wdHlTdGF0ZW1lbnQ6IF9lbXB0eVN0YXRlbWVudDJbXCJkZWZhdWx0XCJdLFxuXHRFeHByZXNzaW9uU3RhdGVtZW50OiBfZXhwcmVzc2lvblN0YXRlbWVudDJbXCJkZWZhdWx0XCJdLFxuXHRGb3JTdGF0ZW1lbnQ6IF9mb3JTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0Rm9ySW5TdGF0ZW1lbnQ6IF9mb3JJblN0YXRlbWVudDJbXCJkZWZhdWx0XCJdLFxuXHRGdW5jdGlvbkRlY2xhcmF0aW9uOiBfZnVuY3Rpb25EZWNsYXJhdGlvbjJbXCJkZWZhdWx0XCJdLFxuXHRGdW5jdGlvbkV4cHJlc3Npb246IF9mdW5jdGlvbkV4cHJlc3Npb24yW1wiZGVmYXVsdFwiXSxcblx0SWRlbnRpZmllcjogX2lkZW50aWZpZXIyW1wiZGVmYXVsdFwiXSxcblx0TGFiZWxlZFN0YXRlbWVudDogX2xhYmVsZWRTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0TGl0ZXJhbDogX2xpdGVyYWwyW1wiZGVmYXVsdFwiXSxcblx0TG9naWNhbEV4cHJlc3Npb246IF9sb2dpY2FsRXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRNZW1iZXJFeHByZXNzaW9uOiBfbWVtYmVyRXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRPYmplY3RFeHByZXNzaW9uOiBfb2JqZWN0RXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRSZXR1cm5TdGF0ZW1lbnQ6IF9yZXR1cm5TdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0U2VxdWVuY2VFeHByZXNzaW9uOiBfc2VxdWVuY2VFeHByZXNzaW9uMltcImRlZmF1bHRcIl0sXG5cdFN3aXRjaFN0YXRlbWVudDogX3N3aXRjaFN0YXRlbWVudDJbXCJkZWZhdWx0XCJdLFxuXHRUaGlzRXhwcmVzc2lvbjogX3RoaXNFeHByZXNzaW9uMltcImRlZmF1bHRcIl0sXG5cdFRocm93U3RhdGVtZW50OiBfdGhyb3dTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0VHJ5U3RhdGVtZW50OiBfdHJ5U3RhdGVtZW50MltcImRlZmF1bHRcIl0sXG5cdFVuYXJ5RXhwcmVzc2lvbjogX3VuYXJ5RXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRVcGRhdGVFeHByZXNzaW9uOiBfdXBkYXRlRXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uOiBfdmFyaWFibGVEZWNsYXJhdGlvbjJbXCJkZWZhdWx0XCJdLFxuXHRWYXJpYWJsZURlY2xhcmF0b3I6IF92YXJpYWJsZURlY2xhcmF0b3IyW1wiZGVmYXVsdFwiXSxcblx0V2l0aFN0YXRlbWVudDogX3dpdGhTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblxuXHRDb250aW51ZVN0YXRlbWVudDogX2ludGVycnVwdFN0YXRlbWVudDJbXCJkZWZhdWx0XCJdLFxuXHRJZlN0YXRlbWVudDogX2lmU3RhdGVtZW50MltcImRlZmF1bHRcIl0sXG5cdE5ld0V4cHJlc3Npb246IF9jYWxsRXhwcmVzc2lvbjJbXCJkZWZhdWx0XCJdLFxuXHRQcm9ncmFtOiBfYmxvY2tTdGF0ZW1lbnQyW1wiZGVmYXVsdFwiXSxcblx0V2hpbGVTdGF0ZW1lbnQ6IF9kb1doaWxlU3RhdGVtZW50SnMyW1wiZGVmYXVsdFwiXVxufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG5cdHZpc2l0OiAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIGNhbGxlZSQwJDAoY29udGV4dCkge1xuXHRcdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gY2FsbGVlJDAkMCQoY29udGV4dCQxJDApIHtcblx0XHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRcdGNhc2UgMDpcblx0XHRcdFx0XHRpZiAoY29udGV4dC5ub2RlLnR5cGUgaW4gdmlzaXRvcnMpIHtcblx0XHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIGhhbmRsZXIgZGVmaW5lZCBmb3I6IFwiICsgY29udGV4dC5ub2RlLnR5cGUpO1xuXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNDtcblx0XHRcdFx0XHRyZXR1cm4gdmlzaXRvcnNbY29udGV4dC5ub2RlLnR5cGVdKGNvbnRleHQpO1xuXG5cdFx0XHRcdGNhc2UgNDpcblx0XHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQkMSQwLnNlbnQpO1xuXG5cdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0XHR9XG5cdFx0fSwgY2FsbGVlJDAkMCwgdGhpcyk7XG5cdH0pKVxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEludGVycnVwdFN0YXRlbWVudDtcblxuZnVuY3Rpb24gSW50ZXJydXB0U3RhdGVtZW50KGNvbnRleHQpIHtcblx0dmFyIGxhYmVsO1xuXHRpZiAoY29udGV4dC5ub2RlLmxhYmVsKSB7XG5cdFx0bGFiZWwgPSBjb250ZXh0Lm5vZGUubGFiZWwubmFtZTtcblx0fVxuXG5cdGlmIChjb250ZXh0Lm5vZGUudHlwZSA9PT0gXCJCcmVha1N0YXRlbWVudFwiKSB7XG5cdFx0cmV0dXJuIGNvbnRleHQuY2FuY2VsKGxhYmVsKTtcblx0fVxuXG5cdHJldHVybiBjb250ZXh0LnNraXAobGFiZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gTGFiZWxlZFN0YXRlbWVudChjb250ZXh0KSB7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gTGFiZWxlZFN0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlTGFiZWwoY29udGV4dC5ub2RlLmJvZHksIGNvbnRleHQubm9kZS5sYWJlbC5uYW1lKS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCBjb250ZXh0JDEkMC5zZW50KTtcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgTGFiZWxlZFN0YXRlbWVudCwgdGhpcyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBMaXRlcmFsO1xuXG5mdW5jdGlvbiBMaXRlcmFsKGNvbnRleHQpIHtcblx0cmV0dXJuIGNvbnRleHQucmVzdWx0KGNvbnRleHQuZW52Lm9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGNvbnRleHQubm9kZS52YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQ29udmVydCA9IHJlcXVpcmUoXCIuLi91dGlscy9jb252ZXJ0XCIpO1xuXG52YXIgY29udmVydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0NvbnZlcnQpO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBMb2dpY2FsRXhwcmVzc2lvbihjb250ZXh0KSB7XG5cdHZhciBsZWZ0LCBwYXNzZWQ7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gTG9naWNhbEV4cHJlc3Npb24kKGNvbnRleHQkMSQwKSB7XG5cdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUubGVmdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdGxlZnQgPSBjb250ZXh0JDEkMC5zZW50O1xuXHRcdFx0XHRwYXNzZWQgPSBjb252ZXJ0LnRvQm9vbGVhbihsZWZ0LnJlc3VsdC5nZXRWYWx1ZSgpKTtcblxuXHRcdFx0XHRpZiAoIShwYXNzZWQgJiYgY29udGV4dC5ub2RlLm9wZXJhdG9yID09PSBcInx8XCIpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDY7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGxlZnQpO1xuXG5cdFx0XHRjYXNlIDY6XG5cdFx0XHRcdGlmICghKCFwYXNzZWQgJiYgY29udGV4dC5ub2RlLm9wZXJhdG9yID09PSBcIiYmXCIpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGxlZnQpO1xuXG5cdFx0XHRjYXNlIDg6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5yaWdodCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDEwOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQkMSQwLnNlbnQpO1xuXG5cdFx0XHRjYXNlIDExOlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgTG9naWNhbEV4cHJlc3Npb24sIHRoaXMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9lbnZQcm9wZXJ0eVJlZmVyZW5jZSA9IHJlcXVpcmUoXCIuLi9lbnYvcHJvcGVydHktcmVmZXJlbmNlXCIpO1xuXG52YXIgX2VudlByb3BlcnR5UmVmZXJlbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudlByb3BlcnR5UmVmZXJlbmNlKTtcblxudmFyIF91dGlsc0NvbnZlcnQgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29udmVydFwiKTtcblxudmFyIGNvbnZlcnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNDb252ZXJ0KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gTWVtYmVyRXhwcmVzc2lvbihjb250ZXh0KSB7XG5cdHZhciBvYmosIG5hbWUsIHZhbHVlO1xuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIE1lbWJlckV4cHJlc3Npb24kKGNvbnRleHQkMSQwKSB7XG5cdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUub2JqZWN0KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0b2JqID0gY29udGV4dCQxJDAuc2VudC5yZXN1bHQuZ2V0VmFsdWUoKTtcblxuXHRcdFx0XHRpZiAoIWNvbnRleHQubm9kZS5jb21wdXRlZCkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udmVydDtcblx0XHRcdFx0Y29udGV4dCQxJDAudDEgPSBjb250ZXh0LmVudjtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDg7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUucHJvcGVydHkpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSA4OlxuXHRcdFx0XHRjb250ZXh0JDEkMC50MiA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0LmdldFZhbHVlKCk7XG5cdFx0XHRcdG5hbWUgPSBjb250ZXh0JDEkMC50MC50b1N0cmluZy5jYWxsKGNvbnRleHQkMSQwLnQwLCBjb250ZXh0JDEkMC50MSwgY29udGV4dCQxJDAudDIpO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTM7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDEyOlxuXHRcdFx0XHRuYW1lID0gY29udGV4dC5ub2RlLnByb3BlcnR5Lm5hbWU7XG5cblx0XHRcdGNhc2UgMTM6XG5cblx0XHRcdFx0dmFsdWUgPSBuZXcgX2VudlByb3BlcnR5UmVmZXJlbmNlMltcImRlZmF1bHRcIl0obmFtZSwgb2JqLCBmYWxzZSwgY29udGV4dC5lbnYpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQucmVzdWx0KHZhbHVlKSk7XG5cblx0XHRcdGNhc2UgMTU6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBNZW1iZXJFeHByZXNzaW9uLCB0aGlzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHNGdW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmNcIik7XG5cbnZhciBmdW5jID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzRnVuYyk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZnVuY3Rpb24gc2V0RGVzY3JpcHRvcihlbnYsIG9iaiwgbmFtZSwgZGVzY3JpcHRvcikge1xuXHRpZiAoZGVzY3JpcHRvci5nZXQpIHtcblx0XHRkZXNjcmlwdG9yLmdldHRlciA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gY2FsbGVlJDEkMCgpIHtcblx0XHRcdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gY2FsbGVlJDEkMCQoY29udGV4dCQyJDApIHtcblx0XHRcdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQyJDAucHJldiA9IGNvbnRleHQkMiQwLm5leHQpIHtcblx0XHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0XHRjb250ZXh0JDIkMC5uZXh0ID0gMjtcblx0XHRcdFx0XHRcdHJldHVybiBmdW5jLmV4ZWN1dGVGdW5jdGlvbihlbnYsIGRlc2NyaXB0b3IuZ2V0LCBkZXNjcmlwdG9yLmdldC5ub2RlLnBhcmFtcywgW10sIHRoaXMsIGRlc2NyaXB0b3IuZ2V0Lm5vZGUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMiQwLmFicnVwdChcInJldHVyblwiLCBjb250ZXh0JDIkMC5zZW50KTtcblxuXHRcdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29udGV4dCQyJDAuc3RvcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBjYWxsZWUkMSQwLCB0aGlzKTtcblx0XHR9KSk7XG5cdH1cblxuXHRpZiAoZGVzY3JpcHRvci5zZXQpIHtcblx0XHRkZXNjcmlwdG9yLnNldHRlciA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gY2FsbGVlJDEkMCgpIHtcblx0XHRcdHZhciBhcmdzJDIkMCA9IGFyZ3VtZW50cztcblx0XHRcdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gY2FsbGVlJDEkMCQoY29udGV4dCQyJDApIHtcblx0XHRcdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQyJDAucHJldiA9IGNvbnRleHQkMiQwLm5leHQpIHtcblx0XHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0XHRjb250ZXh0JDIkMC5uZXh0ID0gMjtcblx0XHRcdFx0XHRcdHJldHVybiBmdW5jLmV4ZWN1dGVGdW5jdGlvbihlbnYsIGRlc2NyaXB0b3Iuc2V0LCBkZXNjcmlwdG9yLnNldC5ub2RlLnBhcmFtcywgYXJncyQyJDAsIHRoaXMsIGRlc2NyaXB0b3Iuc2V0Lm5vZGUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0XHRcdHJldHVybiBjb250ZXh0JDIkMC5zdG9wKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGNhbGxlZSQxJDAsIHRoaXMpO1xuXHRcdH0pKTtcblx0fVxuXG5cdG9iai5kZWZpbmVPd25Qcm9wZXJ0eShuYW1lLCBkZXNjcmlwdG9yKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVzY3JpcHRvcih2YWx1ZSkge1xuXHRyZXR1cm4geyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfTtcbn1cblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIE9iamVjdEV4cHJlc3Npb24oY29udGV4dCkge1xuXHR2YXIgb2JqLCBkZXNjcmlwdG9ycywgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiwgX2RpZEl0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvckVycm9yLCBfaXRlcmF0b3IsIF9zdGVwLCBwcm9wZXJ0eSwgdmFsdWUsIG5hbWUsIHByb3A7XG5cblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBPYmplY3RFeHByZXNzaW9uJChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdG9iaiA9IGNvbnRleHQuZW52Lm9iamVjdEZhY3RvcnkuY3JlYXRlT2JqZWN0KCk7XG5cdFx0XHRcdGRlc2NyaXB0b3JzID0gX09iamVjdCRjcmVhdGUobnVsbCk7XG5cdFx0XHRcdF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDU7XG5cdFx0XHRcdF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihjb250ZXh0Lm5vZGUucHJvcGVydGllcyk7XG5cblx0XHRcdGNhc2UgNzpcblx0XHRcdFx0aWYgKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cHJvcGVydHkgPSBfc3RlcC52YWx1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDExO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUocHJvcGVydHkudmFsdWUpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAxMTpcblx0XHRcdFx0dmFsdWUgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRuYW1lID0gcHJvcGVydHkua2V5Lm5hbWUgfHwgcHJvcGVydHkua2V5LnZhbHVlO1xuXHRcdFx0XHRjb250ZXh0JDEkMC50MCA9IHByb3BlcnR5LmtpbmQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSBjb250ZXh0JDEkMC50MCA9PT0gXCJnZXRcIiA/IDE2IDogY29udGV4dCQxJDAudDAgPT09IFwic2V0XCIgPyAxNiA6IDE5O1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxNjpcblx0XHRcdFx0ZGVzY3JpcHRvcnNbbmFtZV0gPSBkZXNjcmlwdG9yc1tuYW1lXSB8fCBjcmVhdGVEZXNjcmlwdG9yKCk7XG5cdFx0XHRcdGRlc2NyaXB0b3JzW25hbWVdW3Byb3BlcnR5LmtpbmRdID0gdmFsdWU7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJicmVha1wiLCAyMSk7XG5cblx0XHRcdGNhc2UgMTk6XG5cdFx0XHRcdG9iai5kZWZpbmVPd25Qcm9wZXJ0eShuYW1lLCBjcmVhdGVEZXNjcmlwdG9yKHZhbHVlKSk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJicmVha1wiLCAyMSk7XG5cblx0XHRcdGNhc2UgMjE6XG5cdFx0XHRcdF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjQ6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzMDtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjY6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyNjtcblx0XHRcdFx0Y29udGV4dCQxJDAudDEgPSBjb250ZXh0JDEkMFtcImNhdGNoXCJdKDUpO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG5cdFx0XHRcdF9pdGVyYXRvckVycm9yID0gY29udGV4dCQxJDAudDE7XG5cblx0XHRcdGNhc2UgMzA6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAzMDtcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDMxO1xuXG5cdFx0XHRcdGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcblx0XHRcdFx0XHRfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRjYXNlIDMzOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMzM7XG5cblx0XHRcdFx0aWYgKCFfZGlkSXRlcmF0b3JFcnJvcikge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzNjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yO1xuXG5cdFx0XHRjYXNlIDM2OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuZmluaXNoKDMzKTtcblxuXHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgzMCk7XG5cblx0XHRcdGNhc2UgMzg6XG5cblx0XHRcdFx0Zm9yIChwcm9wIGluIGRlc2NyaXB0b3JzKSB7XG5cdFx0XHRcdFx0c2V0RGVzY3JpcHRvcihjb250ZXh0LmVudiwgb2JqLCBwcm9wLCBkZXNjcmlwdG9yc1twcm9wXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQucmVzdWx0KG9iaikpO1xuXG5cdFx0XHRjYXNlIDQwOlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgT2JqZWN0RXhwcmVzc2lvbiwgdGhpcywgW1s1LCAyNiwgMzAsIDM4XSwgWzMxLCwgMzMsIDM3XV0pO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIFJldHVyblN0YXRlbWVudChjb250ZXh0KSB7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gUmV0dXJuU3RhdGVtZW50JChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGlmICghY29udGV4dC5ub2RlLmFyZ3VtZW50KSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDY7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0JDEkMC50MCA9IGNvbnRleHQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA0O1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUoY29udGV4dC5ub2RlLmFyZ3VtZW50KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgNDpcblx0XHRcdFx0Y29udGV4dCQxJDAudDEgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQkMSQwLnQwLmV4aXQuY2FsbChjb250ZXh0JDEkMC50MCwgY29udGV4dCQxJDAudDEpKTtcblxuXHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuZXhpdChjb250ZXh0LmVudi5nbG9iYWwuZ2V0UHJvcGVydHkoXCJ1bmRlZmluZWRcIikuZ2V0VmFsdWUoKSkpO1xuXG5cdFx0XHRjYXNlIDc6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBSZXR1cm5TdGF0ZW1lbnQsIHRoaXMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIFNlcXVlbmNlRXhwcmVzc2lvbihjb250ZXh0KSB7XG5cdHZhciB2YWx1ZSwgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiwgX2RpZEl0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvckVycm9yLCBfaXRlcmF0b3IsIF9zdGVwLCBleHByO1xuXG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gU2VxdWVuY2VFeHByZXNzaW9uJChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDM7XG5cdFx0XHRcdF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihjb250ZXh0Lm5vZGUuZXhwcmVzc2lvbnMpO1xuXG5cdFx0XHRjYXNlIDU6XG5cdFx0XHRcdGlmIChfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxMztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGV4cHIgPSBfc3RlcC52YWx1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShleHByKS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgOTpcblx0XHRcdFx0dmFsdWUgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXG5cdFx0XHRjYXNlIDEwOlxuXHRcdFx0XHRfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDEzOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE1OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMTU7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udGV4dCQxJDBbXCJjYXRjaFwiXSgzKTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IGNvbnRleHQkMSQwLnQwO1xuXG5cdFx0XHRjYXNlIDE5OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMTk7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyMDtcblxuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2FzZSAyMjpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDIyO1xuXG5cdFx0XHRcdGlmICghX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuXHRcdFx0Y2FzZSAyNTpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgyMik7XG5cblx0XHRcdGNhc2UgMjY6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMTkpO1xuXG5cdFx0XHRjYXNlIDI3OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQucmVzdWx0KHZhbHVlKSk7XG5cblx0XHRcdGNhc2UgMjg6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBTZXF1ZW5jZUV4cHJlc3Npb24sIHRoaXMsIFtbMywgMTUsIDE5LCAyN10sIFsyMCwsIDIyLCAyNl1dKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbnZhciBleGVjdXRlU3RhdGVtZW50cyA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gZXhlY3V0ZVN0YXRlbWVudHMoY29udGV4dCwgc3RhdGVtZW50cykge1xuXHR2YXIgcmVzdWx0LCBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uLCBfZGlkSXRlcmF0b3JFcnJvciwgX2l0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvciwgX3N0ZXAsIHN0YXRlbWVudDtcblxuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIGV4ZWN1dGVTdGF0ZW1lbnRzJChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDM7XG5cdFx0XHRcdF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihzdGF0ZW1lbnRzKTtcblxuXHRcdFx0Y2FzZSA1OlxuXHRcdFx0XHRpZiAoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzdGF0ZW1lbnQgPSBfc3RlcC52YWx1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShzdGF0ZW1lbnQpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSA5OlxuXHRcdFx0XHRyZXN1bHQgPSBjb250ZXh0JDEkMC5zZW50O1xuXG5cdFx0XHRcdGlmICghKHJlc3VsdCAmJiByZXN1bHQuaXNDYW5jZWxsZWQoKSkpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJlc3VsdCk7XG5cblx0XHRcdGNhc2UgMTI6XG5cdFx0XHRcdF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMTU6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyMTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMTc6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAxNztcblx0XHRcdFx0Y29udGV4dCQxJDAudDAgPSBjb250ZXh0JDEkMFtcImNhdGNoXCJdKDMpO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG5cdFx0XHRcdF9pdGVyYXRvckVycm9yID0gY29udGV4dCQxJDAudDA7XG5cblx0XHRcdGNhc2UgMjE6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAyMTtcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDIyO1xuXG5cdFx0XHRcdGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcblx0XHRcdFx0XHRfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRjYXNlIDI0OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMjQ7XG5cblx0XHRcdFx0aWYgKCFfZGlkSXRlcmF0b3JFcnJvcikge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyNztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yO1xuXG5cdFx0XHRjYXNlIDI3OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuZmluaXNoKDI0KTtcblxuXHRcdFx0Y2FzZSAyODpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgyMSk7XG5cblx0XHRcdGNhc2UgMjk6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzdWx0KTtcblxuXHRcdFx0Y2FzZSAzMDpcblx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcblx0XHR9XG5cdH0sIGV4ZWN1dGVTdGF0ZW1lbnRzLCB0aGlzLCBbWzMsIDE3LCAyMSwgMjldLCBbMjIsLCAyNCwgMjhdXSk7XG59KSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBTd2l0Y2hTdGF0ZW1lbnQoY29udGV4dCkge1xuXHR2YXIgdGVzdFZhbHVlLCBwYXNzZWQsIHZhbHVlLCBkZWZhdWx0Q2FzZSwgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIsIF9kaWRJdGVyYXRvckVycm9yMiwgX2l0ZXJhdG9yRXJyb3IyLCBfaXRlcmF0b3IyLCBfc3RlcDIsIGN1cnJlbnQsIGNhc2VWYWx1ZTtcblxuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIFN3aXRjaFN0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5kaXNjcmltaW5hbnQpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZXN0VmFsdWUgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRwYXNzZWQgPSBmYWxzZTtcblx0XHRcdFx0X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcblx0XHRcdFx0X2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gNztcblx0XHRcdFx0X2l0ZXJhdG9yMiA9IF9nZXRJdGVyYXRvcihjb250ZXh0Lm5vZGUuY2FzZXMpO1xuXG5cdFx0XHRjYXNlIDk6XG5cdFx0XHRcdGlmIChfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzMjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnJlbnQgPSBfc3RlcDIudmFsdWU7XG5cblx0XHRcdFx0aWYgKHBhc3NlZCkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyMjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghY3VycmVudC50ZXN0KSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDIwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDE1O1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUoY3VycmVudC50ZXN0KS5leGVjdXRlKCk7XG5cblx0XHRcdGNhc2UgMTU6XG5cdFx0XHRcdGNhc2VWYWx1ZSA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0LmdldFZhbHVlKCk7XG5cblx0XHRcdFx0aWYgKGNhc2VWYWx1ZS5lcXVhbHModGVzdFZhbHVlKSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxODtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJjb250aW51ZVwiLCAyOSk7XG5cblx0XHRcdGNhc2UgMTg6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyMjtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjA6XG5cdFx0XHRcdC8vIGRlZmF1bHQgbWlnaHQgbm90IGJlIHRoZSBsYXN0IGNhc2Vcblx0XHRcdFx0ZGVmYXVsdENhc2UgPSBjdXJyZW50O1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwiY29udGludWVcIiwgMjkpO1xuXG5cdFx0XHRjYXNlIDIyOlxuXG5cdFx0XHRcdHBhc3NlZCA9IHRydWU7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyNTtcblx0XHRcdFx0cmV0dXJuIGV4ZWN1dGVTdGF0ZW1lbnRzKGNvbnRleHQsIGN1cnJlbnQuY29uc2VxdWVudCk7XG5cblx0XHRcdGNhc2UgMjU6XG5cdFx0XHRcdHZhbHVlID0gY29udGV4dCQxJDAuc2VudDtcblxuXHRcdFx0XHRpZiAoISh2YWx1ZSAmJiB2YWx1ZS5pc0NhbmNlbGxlZCgpKSkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyOTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhbHVlLmNhbmNlbCA9IGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHZhbHVlKTtcblxuXHRcdFx0Y2FzZSAyOTpcblx0XHRcdFx0X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gOTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzODtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMzQ6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAzNDtcblx0XHRcdFx0Y29udGV4dCQxJDAudDAgPSBjb250ZXh0JDEkMFtcImNhdGNoXCJdKDcpO1xuXHRcdFx0XHRfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvcjIgPSBjb250ZXh0JDEkMC50MDtcblxuXHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDM4O1xuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMzk7XG5cblx0XHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yMltcInJldHVyblwiXSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdGNhc2UgNDE6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSA0MTtcblxuXHRcdFx0XHRpZiAoIV9kaWRJdGVyYXRvckVycm9yMikge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA0NDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yMjtcblxuXHRcdFx0Y2FzZSA0NDpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCg0MSk7XG5cblx0XHRcdGNhc2UgNDU6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMzgpO1xuXG5cdFx0XHRjYXNlIDQ2OlxuXHRcdFx0XHRpZiAoISghcGFzc2VkICYmIGRlZmF1bHRDYXNlICYmIGRlZmF1bHRDYXNlLmNvbnNlcXVlbnQpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDUyO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDQ5O1xuXHRcdFx0XHRyZXR1cm4gZXhlY3V0ZVN0YXRlbWVudHMoY29udGV4dCwgZGVmYXVsdENhc2UuY29uc2VxdWVudCk7XG5cblx0XHRcdGNhc2UgNDk6XG5cdFx0XHRcdHZhbHVlID0gY29udGV4dCQxJDAuc2VudDtcblxuXHRcdFx0XHR2YWx1ZS5jYW5jZWwgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCB2YWx1ZSk7XG5cblx0XHRcdGNhc2UgNTI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgdmFsdWUpO1xuXG5cdFx0XHRjYXNlIDUzOlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgU3dpdGNoU3RhdGVtZW50LCB0aGlzLCBbWzcsIDM0LCAzOCwgNDZdLCBbMzksLCA0MSwgNDVdXSk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBUaGlzRXhwcmVzc2lvbjtcblxuZnVuY3Rpb24gVGhpc0V4cHJlc3Npb24oY29udGV4dCkge1xuXHRyZXR1cm4gY29udGV4dC5yZXN1bHQoY29udGV4dC5lbnYuZ2V0VGhpc0JpbmRpbmcoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBUaHJvd1N0YXRlbWVudChjb250ZXh0KSB7XG5cdHZhciBhcmcsIGVycjtcblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBUaHJvd1N0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGNvbnRleHQubm9kZS5hcmd1bWVudCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdGFyZyA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0LmdldFZhbHVlKCk7XG5cblx0XHRcdFx0aWYgKCFhcmcuaXNQcmltaXRpdmUpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gNTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IGFyZy52YWx1ZTtcblxuXHRcdFx0Y2FzZSA1OlxuXHRcdFx0XHRlcnIgPSBuZXcgRXJyb3IoKTtcblxuXHRcdFx0XHRlcnIud3JhcHBlZEVycm9yID0gYXJnO1xuXHRcdFx0XHR0aHJvdyBlcnI7XG5cblx0XHRcdGNhc2UgODpcblx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcblx0XHR9XG5cdH0sIFRocm93U3RhdGVtZW50LCB0aGlzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbi8vIHRvZG86IGhhbmRsZSBtb3JlIHNwZWNpZmljIGVycm9ycyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gVHJ5U3RhdGVtZW50KGNvbnRleHQpIHtcblx0dmFyIHJlc3VsdCwgdW5jYXVnaHRFcnJvciwgY2F1Z2h0RXJyb3IsIHNjb3BlLCBlcnJWYXIsIGZpbmFsUmVzdWx0O1xuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIFRyeVN0YXRlbWVudCQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMDtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuYmxvY2spLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRyZXN1bHQgPSBjb250ZXh0JDEkMC5zZW50O1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDY6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSA2O1xuXHRcdFx0XHRjb250ZXh0JDEkMC50MCA9IGNvbnRleHQkMSQwW1wiY2F0Y2hcIl0oMCk7XG5cblx0XHRcdFx0aWYgKCFjb250ZXh0Lm5vZGUuaGFuZGxlcikge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyODtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhdWdodEVycm9yID0gY29udGV4dCQxJDAudDAgJiYgY29udGV4dCQxJDAudDAud3JhcHBlZEVycm9yIHx8IGNvbnRleHQuZW52Lm9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGNvbnRleHQkMSQwLnQwKTtcblx0XHRcdFx0c2NvcGUgPSBjb250ZXh0LmVudi5jcmVhdGVTY29wZSgpO1xuXHRcdFx0XHRlcnJWYXIgPSBjb250ZXh0Lm5vZGUuaGFuZGxlci5wYXJhbS5uYW1lO1xuXG5cdFx0XHRcdC8vIGxldCBoYXNWYXJpYWJsZSA9IGNvbnRleHQuZW52Lmhhc1ZhcmlhYmxlKGVyclZhcik7XG5cblx0XHRcdFx0Ly8gaWYgKCFoYXNWYXJpYWJsZSkge1xuXHRcdFx0XHRjb250ZXh0LmVudi5jcmVhdGVWYXJpYWJsZShlcnJWYXIpO1xuXHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0Y29udGV4dC5lbnYucHV0VmFsdWUoZXJyVmFyLCBjYXVnaHRFcnJvcik7XG5cblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDE0O1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTc7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuaGFuZGxlci5ib2R5LCBjb250ZXh0Lm5vZGUuaGFuZGxlcikuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDE3OlxuXHRcdFx0XHRyZXN1bHQgPSBjb250ZXh0JDEkMC5zZW50O1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjM7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDIwOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMjA7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQxID0gY29udGV4dCQxJDBbXCJjYXRjaFwiXSgxNCk7XG5cblx0XHRcdFx0Ly8gc2NvcGUuZXhpdFNjb3BlKCk7XG5cdFx0XHRcdHVuY2F1Z2h0RXJyb3IgPSBjb250ZXh0JDEkMC50MTtcblxuXHRcdFx0Y2FzZSAyMzpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDIzO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuZmluaXNoKDIzKTtcblxuXHRcdFx0Y2FzZSAyNTpcblx0XHRcdFx0Ly8gaWYgKCFoYXNWYXJpYWJsZSkge1xuXHRcdFx0XHQvLyBcdGNvbnRleHQuZW52LmRlbGV0ZVZhcmlhYmxlKGVyclZhcik7XG5cdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI5O1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAyODpcblx0XHRcdFx0dW5jYXVnaHRFcnJvciA9IGNvbnRleHQkMSQwLnQwO1xuXG5cdFx0XHRjYXNlIDI5OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMjk7XG5cblx0XHRcdFx0aWYgKCFjb250ZXh0Lm5vZGUuZmluYWxpemVyKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM2O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDMzO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUoY29udGV4dC5ub2RlLmZpbmFsaXplcikuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDMzOlxuXHRcdFx0XHRmaW5hbFJlc3VsdCA9IGNvbnRleHQkMSQwLnNlbnQ7XG5cblx0XHRcdFx0aWYgKCEoZmluYWxSZXN1bHQgJiYgZmluYWxSZXN1bHQuc2hvdWxkQnJlYWsoY29udGV4dCkpKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM2O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCBmaW5hbFJlc3VsdCk7XG5cblx0XHRcdGNhc2UgMzY6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMjkpO1xuXG5cdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRpZiAoIXVuY2F1Z2h0RXJyb3IpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMzk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyB1bmNhdWdodEVycm9yO1xuXG5cdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIHJlc3VsdCk7XG5cblx0XHRcdGNhc2UgNDA6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBUcnlTdGF0ZW1lbnQsIHRoaXMsIFtbMCwgNiwgMjksIDM3XSwgWzE0LCAyMCwgMjMsIDI1XV0pO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuLy8gY29udGV4dC5lbnYuaW5pdFNjb3BlKGNvbnRleHQubm9kZS5oYW5kbGVyKTtcbi8vIHNjb3BlLmluaXQoY29udGV4dC5ub2RlLmhhbmRsZXIuYm9keSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZW52UmVmZXJlbmNlID0gcmVxdWlyZShcIi4uL2Vudi9yZWZlcmVuY2VcIik7XG5cbnZhciBfZW52UmVmZXJlbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudlJlZmVyZW5jZSk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIFVuYXJ5RXhwcmVzc2lvbihjb250ZXh0KSB7XG5cdHZhciByZXN1bHQsIG9iamVjdEZhY3RvcnksIHZhbHVlLCBuZXdWYWx1ZSwgdHlwZSwgZGVsZXRlZDtcblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBVbmFyeUV4cHJlc3Npb24kKGNvbnRleHQkMSQwKSB7XG5cdFx0d2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuYXJndW1lbnQpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRyZXN1bHQgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdDtcblx0XHRcdFx0b2JqZWN0RmFjdG9yeSA9IGNvbnRleHQuZW52Lm9iamVjdEZhY3Rvcnk7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udGV4dC5ub2RlLm9wZXJhdG9yO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gY29udGV4dCQxJDAudDAgPT09IFwidHlwZW9mXCIgPyA3IDogY29udGV4dCQxJDAudDAgPT09IFwiLVwiID8gMTEgOiBjb250ZXh0JDEkMC50MCA9PT0gXCIrXCIgPyAxNCA6IGNvbnRleHQkMSQwLnQwID09PSBcIiFcIiA/IDE3IDogY29udGV4dCQxJDAudDAgPT09IFwiflwiID8gMjAgOiBjb250ZXh0JDEkMC50MCA9PT0gXCJkZWxldGVcIiA/IDIzIDogY29udGV4dCQxJDAudDAgPT09IFwidm9pZFwiID8gMzIgOiAzNDtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgNzpcblx0XHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgX2VudlJlZmVyZW5jZTJbXCJkZWZhdWx0XCJdICYmIHJlc3VsdC5pc1VucmVzb2x2ZWQoKSkge1xuXHRcdFx0XHRcdHR5cGUgPSBcInVuZGVmaW5lZFwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gcmVzdWx0LmdldFZhbHVlKCk7XG5cdFx0XHRcdFx0dHlwZSA9IHZhbHVlID8gdmFsdWUudHlwZSA6IFwidW5kZWZpbmVkXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwiYnJlYWtcIiwgMzUpO1xuXG5cdFx0XHRjYXNlIDExOlxuXHRcdFx0XHR2YWx1ZSA9IHJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKC1jb252ZXJ0LnRvTnVtYmVyKGNvbnRleHQuZW52LCB2YWx1ZSkpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwiYnJlYWtcIiwgMzUpO1xuXG5cdFx0XHRjYXNlIDE0OlxuXHRcdFx0XHR2YWx1ZSA9IHJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKCtjb252ZXJ0LnRvTnVtYmVyKGNvbnRleHQuZW52LCB2YWx1ZSkpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwiYnJlYWtcIiwgMzUpO1xuXG5cdFx0XHRjYXNlIDE3OlxuXHRcdFx0XHR2YWx1ZSA9IHJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKCFjb252ZXJ0LnRvQm9vbGVhbih2YWx1ZSkpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwiYnJlYWtcIiwgMzUpO1xuXG5cdFx0XHRjYXNlIDIwOlxuXHRcdFx0XHR2YWx1ZSA9IHJlc3VsdC5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKH5jb252ZXJ0LnRvSW50MzIoY29udGV4dC5lbnYsIHZhbHVlKSk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJicmVha1wiLCAzNSk7XG5cblx0XHRcdGNhc2UgMjM6XG5cdFx0XHRcdGRlbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmICghKHJlc3VsdCAmJiByZXN1bHQgaW5zdGFuY2VvZiBfZW52UmVmZXJlbmNlMltcImRlZmF1bHRcIl0pKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDI4O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQuaXNVbnJlc29sdmVkKCkpIHtcblx0XHRcdFx0XHRkZWxldGVkID0gcmVzdWx0LmRlbGV0ZUJpbmRpbmcocmVzdWx0Lm5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzMDtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjg6XG5cdFx0XHRcdGlmICghY29udGV4dC5ub2RlLmFyZ3VtZW50Lm9iamVjdCkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAzMDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihjb250ZXh0Lm5vZGUuYXJndW1lbnQub2JqZWN0Lm5hbWUgKyBcIiBpcyBub3QgZGVmaW5lZFwiKTtcblxuXHRcdFx0Y2FzZSAzMDpcblxuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKGRlbGV0ZWQpO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwiYnJlYWtcIiwgMzUpO1xuXG5cdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRuZXdWYWx1ZSA9IG9iamVjdEZhY3RvcnkuY3JlYXRlUHJpbWl0aXZlKHVuZGVmaW5lZCk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJicmVha1wiLCAzNSk7XG5cblx0XHRcdGNhc2UgMzQ6XG5cdFx0XHRcdHRocm93IG5ldyBTeW50YXhFcnJvcihcIlVua25vd24gdW5hcnkgb3BlcmF0b3I6IFwiICsgY29udGV4dC5ub2RlLm9wZXJhdG9yKTtcblxuXHRcdFx0Y2FzZSAzNTpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LnJlc3VsdChuZXdWYWx1ZSkpO1xuXG5cdFx0XHRjYXNlIDM2OlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgVW5hcnlFeHByZXNzaW9uLCB0aGlzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS13aWxkY2FyZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHNDb252ZXJ0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbnZlcnRcIik7XG5cbnZhciBjb252ZXJ0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzQ29udmVydCk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIFVwZGF0ZUV4cHJlc3Npb24oY29udGV4dCkge1xuXHR2YXIgb2JqZWN0RmFjdG9yeSwgcmVmLCBvcmlnaW5hbFZhbHVlLCBuZXdWYWx1ZSwgcmV0dXJuVmFsdWU7XG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gVXBkYXRlRXhwcmVzc2lvbiQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRvYmplY3RGYWN0b3J5ID0gY29udGV4dC5lbnYub2JqZWN0RmFjdG9yeTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDM7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuYXJndW1lbnQpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRyZWYgPSBjb250ZXh0JDEkMC5zZW50LnJlc3VsdDtcblx0XHRcdFx0b3JpZ2luYWxWYWx1ZSA9IGNvbnZlcnQudG9OdW1iZXIoY29udGV4dC5lbnYsIHJlZi5nZXRWYWx1ZSgpKTtcblx0XHRcdFx0bmV3VmFsdWUgPSBvcmlnaW5hbFZhbHVlO1xuXG5cdFx0XHRcdGlmIChjb250ZXh0Lm5vZGUub3BlcmF0b3IgPT09IFwiKytcIikge1xuXHRcdFx0XHRcdG5ld1ZhbHVlKys7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5ld1ZhbHVlID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUobmV3VmFsdWUpO1xuXHRcdFx0XHRvcmlnaW5hbFZhbHVlID0gb2JqZWN0RmFjdG9yeS5jcmVhdGVQcmltaXRpdmUob3JpZ2luYWxWYWx1ZSk7XG5cblx0XHRcdFx0cmV0dXJuVmFsdWUgPSBjb250ZXh0Lm5vZGUucHJlZml4ID8gbmV3VmFsdWUgOiBvcmlnaW5hbFZhbHVlO1xuXG5cdFx0XHRcdHJlZi5wdXRWYWx1ZShuZXdWYWx1ZSk7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5yZXN1bHQocmV0dXJuVmFsdWUpKTtcblxuXHRcdFx0Y2FzZSAxMjpcblx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcblx0XHR9XG5cdH0sIFVwZGF0ZUV4cHJlc3Npb24sIHRoaXMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHNBc3luYyA9IHJlcXVpcmUoXCIuLi91dGlscy9hc3luY1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoMCwgX3V0aWxzQXN5bmMuZGVnZW5lcmF0ZSkoX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIFZhcmlhYmxlRGVjbGFyYXRpb24oY29udGV4dCkge1xuXHR2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiwgX2RpZEl0ZXJhdG9yRXJyb3IsIF9pdGVyYXRvckVycm9yLCBfaXRlcmF0b3IsIF9zdGVwLCBkZWNsO1xuXG5cdHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gVmFyaWFibGVEZWNsYXJhdGlvbiQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcblx0XHRcdFx0X2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAzO1xuXHRcdFx0XHRfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IoY29udGV4dC5ub2RlLmRlY2xhcmF0aW9ucyk7XG5cblx0XHRcdGNhc2UgNTpcblx0XHRcdFx0aWYgKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG5cdFx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDEyO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVjbCA9IF9zdGVwLnZhbHVlO1xuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gOTtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuY3JlYXRlKGRlY2wpLmV4ZWN1dGUoKTtcblxuXHRcdFx0Y2FzZSA5OlxuXHRcdFx0XHRfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDEyOlxuXHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMTg7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE0OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMTQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnQwID0gY29udGV4dCQxJDBbXCJjYXRjaFwiXSgzKTtcblx0XHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRfaXRlcmF0b3JFcnJvciA9IGNvbnRleHQkMSQwLnQwO1xuXG5cdFx0XHRjYXNlIDE4OlxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gMTg7XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAxOTtcblxuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2FzZSAyMTpcblx0XHRcdFx0Y29udGV4dCQxJDAucHJldiA9IDIxO1xuXG5cdFx0XHRcdGlmICghX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0XHRjb250ZXh0JDEkMC5uZXh0ID0gMjQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblxuXHRcdFx0Y2FzZSAyNDpcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmZpbmlzaCgyMSk7XG5cblx0XHRcdGNhc2UgMjU6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5maW5pc2goMTgpO1xuXG5cdFx0XHRjYXNlIDI2OlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuZW1wdHkoKSk7XG5cblx0XHRcdGNhc2UgMjc6XG5cdFx0XHRjYXNlIFwiZW5kXCI6XG5cdFx0XHRcdHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG5cdFx0fVxuXHR9LCBWYXJpYWJsZURlY2xhcmF0aW9uLCB0aGlzLCBbWzMsIDE0LCAxOCwgMjZdLCBbMTksLCAyMSwgMjVdXSk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsc0FzeW5jID0gcmVxdWlyZShcIi4uL3V0aWxzL2FzeW5jXCIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9ICgwLCBfdXRpbHNBc3luYy5kZWdlbmVyYXRlKShfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gVmFyaWFibGVEZWNsYXJhdG9yKGNvbnRleHQpIHtcblx0dmFyIG5hbWUsIHZhbHVlO1xuXHRyZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIFZhcmlhYmxlRGVjbGFyYXRvciQoY29udGV4dCQxJDApIHtcblx0XHR3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRuYW1lID0gY29udGV4dC5ub2RlLmlkLm5hbWU7XG5cblx0XHRcdFx0aWYgKCFjb250ZXh0Lm5vZGUuaW5pdCkge1xuXHRcdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSA1O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDQ7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuaW5pdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdHZhbHVlID0gY29udGV4dCQxJDAuc2VudC5yZXN1bHQ7XG5cblx0XHRcdGNhc2UgNTpcblxuXHRcdFx0XHQvLyB2YXJpYWJsZXMgaGF2ZSBhbHJlYWR5IGJlZW4gaG9pc3RlZCBzbyB3ZSBqdXN0IG5lZWQgdG8gaW5pdGlhbGl6ZSB0aGVtIGlmIGRlZmluZWRcblx0XHRcdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRcdFx0Y29udGV4dC5lbnYucHV0VmFsdWUobmFtZSwgdmFsdWUuZ2V0VmFsdWUoKSwgZmFsc2UsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LnJlc3VsdChjb250ZXh0LmVudi5nZXRSZWZlcmVuY2UobmFtZSkpKTtcblxuXHRcdFx0Y2FzZSA3OlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgVmFyaWFibGVEZWNsYXJhdG9yLCB0aGlzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVnZW5lcmF0b3JSdW50aW1lID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzQXN5bmMgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXN5bmNcIik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKDAsIF91dGlsc0FzeW5jLmRlZ2VuZXJhdGUpKF9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBXaXRoU3RhdGVtZW50KGNvbnRleHQpIHtcblx0dmFyIG9iaiwgc2NvcGUsIHJlc3VsdDtcblx0cmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBXaXRoU3RhdGVtZW50JChjb250ZXh0JDEkMCkge1xuXHRcdHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAyO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5jcmVhdGUoY29udGV4dC5ub2RlLm9iamVjdCkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdG9iaiA9IGNvbnRleHQkMSQwLnNlbnQucmVzdWx0LmdldFZhbHVlKCk7XG5cdFx0XHRcdHNjb3BlID0gY29udGV4dC5lbnYuY3JlYXRlT2JqZWN0U2NvcGUob2JqKTtcblxuXHRcdFx0XHRzY29wZS5pbml0KGNvbnRleHQubm9kZS5ib2R5KTtcblxuXHRcdFx0XHRjb250ZXh0JDEkMC5wcmV2ID0gNTtcblx0XHRcdFx0Y29udGV4dCQxJDAubmV4dCA9IDg7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmNyZWF0ZShjb250ZXh0Lm5vZGUuYm9keSkuZXhlY3V0ZSgpO1xuXG5cdFx0XHRjYXNlIDg6XG5cdFx0XHRcdHJlc3VsdCA9IGNvbnRleHQkMSQwLnNlbnQ7XG5cdFx0XHRcdGNvbnRleHQkMSQwLm5leHQgPSAxNTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRcdGNvbnRleHQkMSQwLnByZXYgPSAxMTtcblx0XHRcdFx0Y29udGV4dCQxJDAudDAgPSBjb250ZXh0JDEkMFtcImNhdGNoXCJdKDUpO1xuXG5cdFx0XHRcdHNjb3BlLmV4aXRTY29wZSgpO1xuXHRcdFx0XHR0aHJvdyBjb250ZXh0JDEkMC50MDtcblxuXHRcdFx0Y2FzZSAxNTpcblxuXHRcdFx0XHRzY29wZS5leGl0U2NvcGUoKTtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiLCByZXN1bHQpO1xuXG5cdFx0XHRjYXNlIDE3OlxuXHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRyZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuXHRcdH1cblx0fSwgV2l0aFN0YXRlbWVudCwgdGhpcywgW1s1LCAxMV1dKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07Il19
