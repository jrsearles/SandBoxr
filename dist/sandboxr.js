/**
 * SandBoxr JavaScript library v0.15.2
 * (c) Joshua Searles - https://github.com/jrsearles/SandBoxr
 * License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.version = undefined;
exports.createEnvironment = createEnvironment;
exports.create = create;

var _env = require("./src/env");

var _src = require("./src");

var version = exports.version = "0.15.2";

/**
	* Creates an environment instance.
	* @param {Object} [options] The options to use with the environment.
	* @returns {Object} The environment instance.
	*/
function createEnvironment(options) {
	return new _env.Environment(options);
}

/**
	* Creates a new SandBoxr instance.
	* @param {AST} ast - The abstract syntax tree to execute.
	* @param {Object} [options] The options to use with the sandbox.
	* @returns {SandBoxr} A new sandbox.
	*/
function create(ast, options) {
	return new _src.Sandbox(ast, options);
}

},{"./src":350,"./src/env":177}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":39}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":40}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":41}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/acosh"), __esModule: true };
},{"core-js/library/fn/math/acosh":42}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/asinh"), __esModule: true };
},{"core-js/library/fn/math/asinh":43}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/atanh"), __esModule: true };
},{"core-js/library/fn/math/atanh":44}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/cbrt"), __esModule: true };
},{"core-js/library/fn/math/cbrt":45}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/clz32"), __esModule: true };
},{"core-js/library/fn/math/clz32":46}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/cosh"), __esModule: true };
},{"core-js/library/fn/math/cosh":47}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/expm1"), __esModule: true };
},{"core-js/library/fn/math/expm1":48}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/fround"), __esModule: true };
},{"core-js/library/fn/math/fround":49}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/hypot"), __esModule: true };
},{"core-js/library/fn/math/hypot":50}],14:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/imul"), __esModule: true };
},{"core-js/library/fn/math/imul":51}],15:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log10"), __esModule: true };
},{"core-js/library/fn/math/log10":52}],16:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log1p"), __esModule: true };
},{"core-js/library/fn/math/log1p":53}],17:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log2"), __esModule: true };
},{"core-js/library/fn/math/log2":54}],18:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/sign"), __esModule: true };
},{"core-js/library/fn/math/sign":55}],19:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/sinh"), __esModule: true };
},{"core-js/library/fn/math/sinh":56}],20:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/tanh"), __esModule: true };
},{"core-js/library/fn/math/tanh":57}],21:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/trunc"), __esModule: true };
},{"core-js/library/fn/math/trunc":58}],22:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/epsilon"), __esModule: true };
},{"core-js/library/fn/number/epsilon":59}],23:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/max-safe-integer"), __esModule: true };
},{"core-js/library/fn/number/max-safe-integer":60}],24:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/min-safe-integer"), __esModule: true };
},{"core-js/library/fn/number/min-safe-integer":61}],25:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":62}],26:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":63}],27:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":64}],28:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":65}],29:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":66}],30:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/string/code-point-at"), __esModule: true };
},{"core-js/library/fn/string/code-point-at":67}],31:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/string/from-code-point"), __esModule: true };
},{"core-js/library/fn/string/from-code-point":68}],32:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/string/repeat"), __esModule: true };
},{"core-js/library/fn/string/repeat":69}],33:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":71}],34:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/for"), __esModule: true };
},{"core-js/library/fn/symbol/for":70}],35:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":72}],36:[function(require,module,exports){
"use strict";

var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":33,"../core-js/symbol/iterator":35}],37:[function(require,module,exports){
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
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":38}],38:[function(require,module,exports){
(function (process,global){
"use strict";

var _promise = require("../core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";

  var inModule = (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object";
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
    var generator = (0, _create2.default)((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

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
    if (_setPrototypeOf2.default) {
      (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = (0, _create2.default)(Gp);
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
      return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
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

    if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
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
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
        resolve(callInvokeWithMethodAndArg());
      });
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
          context._sent = arg;

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
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core-js/object/create":26,"../core-js/object/set-prototype-of":28,"../core-js/promise":29,"../core-js/symbol":33,"../core-js/symbol/iterator":35,"../helpers/typeof":36,"_process":172}],39:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":136,"../modules/es6.string.iterator":166,"../modules/web.dom.iterable":170}],40:[function(require,module,exports){
var core = require('../../modules/$.core');
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
};
},{"../../modules/$.core":81}],41:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/$.core').Map;
},{"../modules/$.core":81,"../modules/es6.map":138,"../modules/es6.object.to-string":162,"../modules/es6.string.iterator":166,"../modules/es7.map.to-json":169,"../modules/web.dom.iterable":170}],42:[function(require,module,exports){
require('../../modules/es6.math.acosh');
module.exports = require('../../modules/$.core').Math.acosh;
},{"../../modules/$.core":81,"../../modules/es6.math.acosh":139}],43:[function(require,module,exports){
require('../../modules/es6.math.asinh');
module.exports = require('../../modules/$.core').Math.asinh;
},{"../../modules/$.core":81,"../../modules/es6.math.asinh":140}],44:[function(require,module,exports){
require('../../modules/es6.math.atanh');
module.exports = require('../../modules/$.core').Math.atanh;
},{"../../modules/$.core":81,"../../modules/es6.math.atanh":141}],45:[function(require,module,exports){
require('../../modules/es6.math.cbrt');
module.exports = require('../../modules/$.core').Math.cbrt;
},{"../../modules/$.core":81,"../../modules/es6.math.cbrt":142}],46:[function(require,module,exports){
require('../../modules/es6.math.clz32');
module.exports = require('../../modules/$.core').Math.clz32;
},{"../../modules/$.core":81,"../../modules/es6.math.clz32":143}],47:[function(require,module,exports){
require('../../modules/es6.math.cosh');
module.exports = require('../../modules/$.core').Math.cosh;
},{"../../modules/$.core":81,"../../modules/es6.math.cosh":144}],48:[function(require,module,exports){
require('../../modules/es6.math.expm1');
module.exports = require('../../modules/$.core').Math.expm1;
},{"../../modules/$.core":81,"../../modules/es6.math.expm1":145}],49:[function(require,module,exports){
require('../../modules/es6.math.fround');
module.exports = require('../../modules/$.core').Math.fround;
},{"../../modules/$.core":81,"../../modules/es6.math.fround":146}],50:[function(require,module,exports){
require('../../modules/es6.math.hypot');
module.exports = require('../../modules/$.core').Math.hypot;
},{"../../modules/$.core":81,"../../modules/es6.math.hypot":147}],51:[function(require,module,exports){
require('../../modules/es6.math.imul');
module.exports = require('../../modules/$.core').Math.imul;
},{"../../modules/$.core":81,"../../modules/es6.math.imul":148}],52:[function(require,module,exports){
require('../../modules/es6.math.log10');
module.exports = require('../../modules/$.core').Math.log10;
},{"../../modules/$.core":81,"../../modules/es6.math.log10":149}],53:[function(require,module,exports){
require('../../modules/es6.math.log1p');
module.exports = require('../../modules/$.core').Math.log1p;
},{"../../modules/$.core":81,"../../modules/es6.math.log1p":150}],54:[function(require,module,exports){
require('../../modules/es6.math.log2');
module.exports = require('../../modules/$.core').Math.log2;
},{"../../modules/$.core":81,"../../modules/es6.math.log2":151}],55:[function(require,module,exports){
require('../../modules/es6.math.sign');
module.exports = require('../../modules/$.core').Math.sign;
},{"../../modules/$.core":81,"../../modules/es6.math.sign":152}],56:[function(require,module,exports){
require('../../modules/es6.math.sinh');
module.exports = require('../../modules/$.core').Math.sinh;
},{"../../modules/$.core":81,"../../modules/es6.math.sinh":153}],57:[function(require,module,exports){
require('../../modules/es6.math.tanh');
module.exports = require('../../modules/$.core').Math.tanh;
},{"../../modules/$.core":81,"../../modules/es6.math.tanh":154}],58:[function(require,module,exports){
require('../../modules/es6.math.trunc');
module.exports = require('../../modules/$.core').Math.trunc;
},{"../../modules/$.core":81,"../../modules/es6.math.trunc":155}],59:[function(require,module,exports){
require('../../modules/es6.number.epsilon');
module.exports = Math.pow(2, -52);
},{"../../modules/es6.number.epsilon":156}],60:[function(require,module,exports){
require('../../modules/es6.number.max-safe-integer');
module.exports = 0x1fffffffffffff;
},{"../../modules/es6.number.max-safe-integer":157}],61:[function(require,module,exports){
require('../../modules/es6.number.min-safe-integer');
module.exports = -0x1fffffffffffff;
},{"../../modules/es6.number.min-safe-integer":158}],62:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":81,"../../modules/es6.object.assign":159}],63:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":106}],64:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":81,"../../modules/es6.object.keys":160}],65:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":81,"../../modules/es6.object.set-prototype-of":161}],66:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":81,"../modules/es6.object.to-string":162,"../modules/es6.promise":163,"../modules/es6.string.iterator":166,"../modules/web.dom.iterable":170}],67:[function(require,module,exports){
require('../../modules/es6.string.code-point-at');
module.exports = require('../../modules/$.core').String.codePointAt;
},{"../../modules/$.core":81,"../../modules/es6.string.code-point-at":164}],68:[function(require,module,exports){
require('../../modules/es6.string.from-code-point');
module.exports = require('../../modules/$.core').String.fromCodePoint;
},{"../../modules/$.core":81,"../../modules/es6.string.from-code-point":165}],69:[function(require,module,exports){
require('../../modules/es6.string.repeat');
module.exports = require('../../modules/$.core').String.repeat;
},{"../../modules/$.core":81,"../../modules/es6.string.repeat":167}],70:[function(require,module,exports){
require('../../modules/es6.symbol');
module.exports = require('../../modules/$.core').Symbol['for'];
},{"../../modules/$.core":81,"../../modules/es6.symbol":168}],71:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":81,"../../modules/es6.object.to-string":162,"../../modules/es6.symbol":168}],72:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":134,"../../modules/es6.string.iterator":166,"../../modules/web.dom.iterable":170}],73:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],74:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],75:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":99}],76:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
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
},{"./$.cof":77,"./$.wks":134}],77:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],78:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":106,"./$.ctx":82,"./$.defined":83,"./$.descriptors":84,"./$.for-of":89,"./$.has":92,"./$.hide":93,"./$.is-object":99,"./$.iter-define":102,"./$.iter-step":104,"./$.redefine-all":116,"./$.set-species":120,"./$.strict-new":124,"./$.uid":133}],79:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":76,"./$.for-of":89}],80:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , global         = require('./$.global')
  , $export        = require('./$.export')
  , fails          = require('./$.fails')
  , hide           = require('./$.hide')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , setToStringTag = require('./$.set-to-string-tag')
  , DESCRIPTORS    = require('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":106,"./$.descriptors":84,"./$.export":87,"./$.fails":88,"./$.for-of":89,"./$.global":91,"./$.hide":93,"./$.is-object":99,"./$.redefine-all":116,"./$.set-to-string-tag":121,"./$.strict-new":124}],81:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],82:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
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
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":73}],83:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],84:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":88}],85:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":91,"./$.is-object":99}],86:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":106}],87:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":81,"./$.ctx":82,"./$.global":91}],88:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],89:[function(require,module,exports){
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
},{"./$.an-object":75,"./$.ctx":82,"./$.is-array-iter":97,"./$.iter-call":100,"./$.to-length":131,"./core.get-iterator-method":135}],90:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":106,"./$.to-iobject":130}],91:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],92:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],93:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":106,"./$.descriptors":84,"./$.property-desc":115}],94:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":91}],95:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
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
  } return              fn.apply(that, args);
};
},{}],96:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":77}],97:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":105,"./$.wks":134}],98:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":77}],99:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],100:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":75}],101:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":106,"./$.hide":93,"./$.property-desc":115,"./$.set-to-string-tag":121,"./$.wks":134}],102:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":106,"./$.export":87,"./$.has":92,"./$.hide":93,"./$.iter-create":101,"./$.iterators":105,"./$.library":108,"./$.redefine":117,"./$.set-to-string-tag":121,"./$.wks":134}],103:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":134}],104:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],105:[function(require,module,exports){
module.exports = {};
},{}],106:[function(require,module,exports){
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
},{}],107:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":106,"./$.to-iobject":130}],108:[function(require,module,exports){
module.exports = true;
},{}],109:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],110:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],111:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],112:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":77,"./$.global":91,"./$.task":127}],113:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":106,"./$.fails":88,"./$.iobject":96,"./$.to-object":132}],114:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":81,"./$.export":87,"./$.fails":88}],115:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],116:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":117}],117:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":93}],118:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],119:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":106,"./$.an-object":75,"./$.ctx":82,"./$.is-object":99}],120:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":106,"./$.core":81,"./$.descriptors":84,"./$.wks":134}],121:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":106,"./$.has":92,"./$.wks":134}],122:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":91}],123:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":73,"./$.an-object":75,"./$.wks":134}],124:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],125:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":83,"./$.to-integer":129}],126:[function(require,module,exports){
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
},{"./$.defined":83,"./$.to-integer":129}],127:[function(require,module,exports){
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
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
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
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
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
},{"./$.cof":77,"./$.ctx":82,"./$.dom-create":85,"./$.global":91,"./$.html":94,"./$.invoke":95}],128:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./$.to-integer":129}],129:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],130:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":83,"./$.iobject":96}],131:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":129}],132:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":83}],133:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],134:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":91,"./$.shared":122,"./$.uid":133}],135:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":76,"./$.core":81,"./$.iterators":105,"./$.wks":134}],136:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":75,"./$.core":81,"./core.get-iterator-method":135}],137:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
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

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":74,"./$.iter-define":102,"./$.iter-step":104,"./$.iterators":105,"./$.to-iobject":130}],138:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":80,"./$.collection-strong":78}],139:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./$.export')
  , log1p   = require('./$.math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./$.export":87,"./$.math-log1p":110}],140:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./$.export');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"./$.export":87}],141:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./$.export":87}],142:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./$.export')
  , sign    = require('./$.math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./$.export":87,"./$.math-sign":111}],143:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./$.export":87}],144:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./$.export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./$.export":87}],145:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./$.export');

$export($export.S, 'Math', {expm1: require('./$.math-expm1')});
},{"./$.export":87,"./$.math-expm1":109}],146:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./$.export')
  , sign      = require('./$.math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./$.export":87,"./$.math-sign":111}],147:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./$.export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum   = 0
      , i     = 0
      , $$    = arguments
      , $$len = $$.length
      , larg  = 0
      , arg, div;
    while(i < $$len){
      arg = abs($$[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./$.export":87}],148:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./$.export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./$.fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./$.export":87,"./$.fails":88}],149:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./$.export":87}],150:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./$.export');

$export($export.S, 'Math', {log1p: require('./$.math-log1p')});
},{"./$.export":87,"./$.math-log1p":110}],151:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./$.export":87}],152:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./$.export');

$export($export.S, 'Math', {sign: require('./$.math-sign')});
},{"./$.export":87,"./$.math-sign":111}],153:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./$.fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./$.export":87,"./$.fails":88,"./$.math-expm1":109}],154:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./$.export":87,"./$.math-expm1":109}],155:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./$.export":87}],156:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./$.export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./$.export":87}],157:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./$.export":87}],158:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./$.export":87}],159:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":87,"./$.object-assign":113}],160:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":114,"./$.to-object":132}],161:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":87,"./$.set-proto":119}],162:[function(require,module,exports){

},{}],163:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
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
    if(works && require('./$.descriptors')){
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
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
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
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":106,"./$.a-function":73,"./$.an-object":75,"./$.classof":76,"./$.core":81,"./$.ctx":82,"./$.descriptors":84,"./$.export":87,"./$.for-of":89,"./$.global":91,"./$.is-object":99,"./$.iter-detect":103,"./$.library":108,"./$.microtask":112,"./$.redefine-all":116,"./$.same-value":118,"./$.set-proto":119,"./$.set-species":120,"./$.set-to-string-tag":121,"./$.species-constructor":123,"./$.strict-new":124,"./$.wks":134}],164:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $at     = require('./$.string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.export":87,"./$.string-at":125}],165:[function(require,module,exports){
var $export        = require('./$.export')
  , toIndex        = require('./$.to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res   = []
      , $$    = arguments
      , $$len = $$.length
      , i     = 0
      , code;
    while($$len > i){
      code = +$$[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./$.export":87,"./$.to-index":128}],166:[function(require,module,exports){
'use strict';
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
},{"./$.iter-define":102,"./$.string-at":125}],167:[function(require,module,exports){
var $export = require('./$.export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.export":87,"./$.string-repeat":126}],168:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
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
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":106,"./$.an-object":75,"./$.descriptors":84,"./$.enum-keys":86,"./$.export":87,"./$.fails":88,"./$.get-names":90,"./$.global":91,"./$.has":92,"./$.is-array":98,"./$.keyof":107,"./$.library":108,"./$.property-desc":115,"./$.redefine":117,"./$.set-to-string-tag":121,"./$.shared":122,"./$.to-iobject":130,"./$.uid":133,"./$.wks":134}],169:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":79,"./$.export":87}],170:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":105,"./es6.array.iterator":137}],171:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],172:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
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

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],173:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],174:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":173,"_process":172,"inherits":171}],175:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.BlockScope = BlockScope;

var _util = require("util");

var _scope = require("./scope");

var _assign = require("../utils/assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BlockScope(env, scope, node) {
  _scope.Scope.call(this, env, scope);
  this.node = node;
}

(0, _util.inherits)(BlockScope, _scope.Scope);

BlockScope.prototype.use = _regenerator2.default.mark(function _callee(inner) {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.node.hasBindings()) {
            _context.next = 4;
            break;
          }

          _context.next = 3;
          return _scope.Scope.prototype.use.call(this, inner);

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
          _context.next = 6;
          return inner();

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
});

BlockScope.prototype.reset = _regenerator2.default.mark(function _callee2(initNode) {
  var nextScope;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.node.hasBindings()) {
            _context2.next = 7;
            break;
          }

          this.exit();
          nextScope = this.env.createBlockScope(this.node);

          if (!initNode) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return (0, _assign.reset)(this.env, initNode, this.scope, nextScope.scope);

        case 6:
          return _context2.abrupt("return", nextScope);

        case 7:
          return _context2.abrupt("return", this);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
});

},{"../utils/assign":374,"./scope":181,"babel-runtime/regenerator":37,"util":174}],176:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.DeclarativeEnvironment = DeclarativeEnvironment;

var _reference = require("./reference");

var _propertyDescriptor = require("../types/property-descriptor");

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeclarativeEnvironment(parent, thisArg, env, strict, block) {
  this.properties = (0, _create2.default)(null);
  this.parent = parent && parent.scope;
  this.thisBinding = thisArg;
  this.env = env;
  this.strict = strict;
  this.block = !!block;

  this.meta = (0, _create2.default)(null);
}

DeclarativeEnvironment.prototype = {
  constructor: DeclarativeEnvironment,

  createChildScope: function createChildScope() {
    return new DeclarativeEnvironment({ scope: this }, this.thisBinding, this.env, this.strict, true);
  },
  setParent: function setParent(parent) {
    this.parent = parent.scope || parent;
  },
  getReference: function getReference(key) {
    var ref = new _reference.Reference(key, this, this.env);
    ref.unqualified = true;
    return ref;
  },
  has: function has(key) {
    return key in this.properties;
  },
  owns: function owns(key) {
    return this.has(key);
  },
  getVariable: function getVariable(key) {
    return this.properties[key];
  },
  deleteVariable: function deleteVariable(key) {
    if (!this.has(key)) {
      return true;
    }

    if (!this.properties[key].configurable) {
      return false;
    }

    delete this.properties[key];
    return true;
  },
  createVariable: function createVariable(key) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$configurable = _ref.configurable;
    var configurable = _ref$configurable === undefined ? false : _ref$configurable;
    var _ref$writable = _ref.writable;
    var writable = _ref$writable === undefined ? true : _ref$writable;
    var _ref$initialized = _ref.initialized;
    var initialized = _ref$initialized === undefined ? true : _ref$initialized;

    if (this.has(key)) {
      return this.properties[key];
    }

    return this.properties[key] = new _propertyDescriptor.PropertyDescriptor(this, { value: undefined, enumerable: true, configurable: configurable, writable: writable, initialized: initialized }, key);
  },
  setValue: function setValue(key, value, throwOnError) {
    var _parent;

    var propInfo = this.properties[key];
    if (propInfo) {
      if (!propInfo.initialized) {
        throw ReferenceError(key + " cannot be set before it has been declared");
      }

      if (propInfo.initialized && !propInfo.writable) {
        throw TypeError("Cannot write to immutable binding: " + key);
      }

      propInfo.setValue(value);
      return true;
    }

    return (_parent = this.parent).setValue.apply(_parent, arguments);
  },
  getValue: function getValue(key, throwOnError) {
    var propInfo = this.properties[key];
    if (propInfo && propInfo.value) {
      return propInfo.value;
    }

    if (throwOnError || propInfo && !propInfo.initialized) {
      throw ReferenceError(key + " is not defined");
    }

    return _primitiveType.UNDEFINED;
  },
  getThisBinding: function getThisBinding() {
    return this.thisBinding;
  }
};

},{"../types/primitive-type":368,"../types/property-descriptor":369,"./reference":180,"babel-runtime/core-js/object/create":26}],177:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.Environment = Environment;

var _primitiveType = require("../types/primitive-type");

var _executionContext = require("../execution-context");

var _declarativeEnvironment = require("./declarative-environment");

var _objectEnvironment = require("./object-environment");

var _reference = require("./reference");

var _es = require("../es5");

var _es2 = _interopRequireDefault(_es);

var _es3 = require("../es6");

var _es4 = _interopRequireDefault(_es3);

var _operators = require("../utils/operators");

var _operators2 = _interopRequireDefault(_operators);

var _contracts = require("../utils/contracts");

var _scope = require("./scope");

var _blockScope = require("./block-scope");

var _symbolType = require("../types/symbol-type");

var _async = require("../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  allowDebugger: false,
  useStrict: false,
  ecmaVersion: 5
};

var declareKinds = {
  "var": { configurable: false, writable: true, initialized: true, block: false },
  "let": { configurable: false, writable: true, initialized: false, block: true },
  "const": { configurable: false, writable: false, initialized: false, block: true },
  "function": { configurable: false, writable: true, initialized: true, block: false },
  "class": { configurable: false, writable: true, initialized: false, block: true }
};

function Environment() {}

Environment.prototype = {
  constructor: Environment,

  init: function init() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

    // clear state in case of re-init
    this.current = null;
    this.globalScope = null;
    this.imports = (0, _create2.default)(null);

    this.options = (0, _assign2.default)({}, defaultOptions, options);
    this.ecmaVersion = options.ecmaVersion;

    (options.ecmaVersion === 6 ? _es4.default : _es2.default)(this);

    // todo: improve this
    this.ops = (0, _assign2.default)({}, _operators2.default, options.operators);
    this.objectFactory.init();

    if (options.exclude && options.exclude.length > 0) {
      options.exclude.forEach(function (name) {
        var segments = name.split(".");
        var parent = _this.global;

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

    if (options.imports) {
      options.imports.forEach(function (item) {
        var ast = item.ast || options.parser(item.code);

        if (item.name) {
          _this.imports[item.name] = ast;
        } else {
          (0, _async.exhaust)(_this.createExecutionContext().execute(ast));
        }
      });
    }
  },


  /**
   * Gets a reference from the environment
   * @param {String} key - The key of the property
   * @returns {Reference} The reference.
   */
  getReference: function getReference(key) {
    var scope = this.current && this.current.scope;
    while (scope) {
      if (scope.owns(key)) {
        return scope.getReference(key, true);
      }

      scope = scope.parent;
    }

    return new _reference.Reference(key, undefined, this);
  },
  getSymbol: function getSymbol(key) {
    return _symbolType.SymbolType.getByKey(key);
  },
  getValue: function getValue(key) {
    return this.getReference(key).getValue();
  },
  setValue: function setValue(key, value, strict) {
    this.current.scope.setValue(key, value, strict);
  },
  has: function has(key) {
    return this.current.scope.has(key);
  },
  deleteVariable: function deleteVariable(key) {
    this.current.scope.deleteVariable(key);
  },
  getVariable: function getVariable(key) {
    var scope = this.current && this.current.scope;
    while (scope) {
      if (scope.owns(key)) {
        return scope.getVariable(key);
      }

      scope = scope.parent;
    }

    return null;
  },


  /**
   * Declares a variable within the current scope.
   * @param {String} key - the key of the variable.
   * @param {String} [kind] - the type of variable to declare. Available options are "var", "let", and "const". "var" is the default.
   * @returns {PropertyDescriptor} The property descriptor for the new variabble.
   */
  createVariable: function createVariable(key, kind) {
    kind = kind ? kind.toLowerCase() : "var";
    var attr = declareKinds[kind];
    var scope = this.current.scope;

    (0, _contracts.assertIsValidIdentifier)(key, this.isStrict(), this.ecmaVersion);

    if (!attr.block) {
      while (scope) {
        if (!scope.block || !scope.parent) {
          break;
        }

        scope = scope.parent;
      }
    }

    return scope.createVariable(key, attr);
  },


  /**
   * Indicates whether the current lexical scope is in strict mode.
   * @returns {Boolean} true if in strict mode; false otherwise.
   */
  isStrict: function isStrict() {
    if (this.options.useStrict) {
      return true;
    }

    var scope = this.current && this.current.scope;
    while (scope) {
      if (scope.strict) {
        return true;
      }

      scope = scope.parent;
    }

    return false;
  },


  /**
   * Gets the current `this` object for the environment.
   * @returns {ObjectType} The `this` object for the current scope.
   */
  getThisBinding: function getThisBinding() {
    var thisArg = this.current.scope.getThisBinding();
    if (thisArg) {
      return thisArg;
    }

    if (this.isStrict()) {
      return _primitiveType.UNDEFINED;
    }

    return this.global;
  },
  createExecutionContext: function createExecutionContext(obj, callee, newTarget) {
    return new _executionContext.ExecutionContext(this, obj, callee, newTarget);
  },


  /**
   * Creates a new declarative scope.
   * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
   * @returns {Scope} The new scope.
   */
  createScope: function createScope(thisArg) {
    return this.setScope(new _declarativeEnvironment.DeclarativeEnvironment(this.current, thisArg, this, this.isStrict()));
  },


  /**
   * Creates a new scope based on the provided object. This is used for the `with`
   * statement, as well as the global scope.
   * @param {ObjectType} obj - The object to bind the scope to.
   * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
   * @returns {Scope} The new scope.
   */
  createObjectScope: function createObjectScope(obj, thisArg) {
    return this.setScope(new _objectEnvironment.ObjectEnvironment(this.current, obj, thisArg, this, this.isStrict()));
  },
  createExecutionScope: function createExecutionScope(fn, thisArg) {
    var parentScope = this.current.scope;

    // if a parent scope is defined we need to limit this scope to that scope
    if (fn.boundScope) {
      this.setScope(fn.boundScope.scope);
    }

    thisArg = fn.boundThis || thisArg;

    var scope = this.createScope(thisArg);
    scope.setParent(parentScope);
    return scope;
  },
  createBlockScope: function createBlockScope(node) {
    var scope = this.current.scope;
    if (node.hasBindings() && !node.isProgram()) {
      scope = scope.createChildScope();
    }

    this.current = new _blockScope.BlockScope(this, scope, node);
    this.current.init(node);
    return this.current;
  },


  /**
   * Sets the current scope.
   * @param {Environment} lexicalEnvironment - Sets the current environment.
   * @returns {Scope} The created scope.
   */
  setScope: function setScope(lexicalEnvironment) {
    return this.current = new _scope.Scope(this, lexicalEnvironment);
  }
};

},{"../es5":227,"../es6":284,"../execution-context":348,"../types/primitive-type":368,"../types/symbol-type":373,"../utils/async":375,"../utils/contracts":377,"../utils/operators":380,"./block-scope":175,"./declarative-environment":176,"./object-environment":178,"./reference":180,"./scope":181,"babel-runtime/core-js/object/assign":25,"babel-runtime/core-js/object/create":26}],178:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.ObjectEnvironment = ObjectEnvironment;

var _propertyReference = require("./property-reference");

var _declarativeEnvironment = require("./declarative-environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ObjectEnvironment(parent, obj, thisArg, env, strict) {
  this.parent = parent && parent.scope;
  this.object = obj;
  this.thisBinding = thisArg || obj;
  this.env = env;
  this.strict = strict;
  this.block = false;

  this.meta = (0, _create2.default)(null);
}

ObjectEnvironment.prototype = {
  constructor: ObjectEnvironment,

  createChildScope: function createChildScope() {
    return new _declarativeEnvironment.DeclarativeEnvironment({ scope: this }, this.thisBinding, this.env, this.strict, true);
  },
  getReference: function getReference(key, unqualified) {
    var ref = new _propertyReference.PropertyReference(key, this.object, this.env);
    ref.unqualified = unqualified;
    return ref;
  },
  has: function has(key) {
    return this.parent ? this.parent.has(key) : this.owns(key);
  },
  owns: function owns(key) {
    return this.object.has(key);
  },
  getVariable: function getVariable(key) {
    return this.object.getProperty(key);
  },
  deleteVariable: function deleteVariable(key) {
    return this.object.deleteProperty(key, false);
  },
  createVariable: function createVariable(key) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$configurable = _ref.configurable;
    var configurable = _ref$configurable === undefined ? true : _ref$configurable;
    var _ref$writable = _ref.writable;
    var writable = _ref$writable === undefined ? true : _ref$writable;
    var _ref$initialized = _ref.initialized;
    var initialized = _ref$initialized === undefined ? true : _ref$initialized;

    if (!this.owns(key)) {
      if (this.parent) {
        var _parent;

        return (_parent = this.parent).createVariable.apply(_parent, arguments);
      }

      this.object.defineProperty(key, { value: undefined, enumerable: true, configurable: configurable, writable: writable, initialized: initialized }, this.env.isStrict());
    }

    return this.object.getProperty(key);
  },
  setValue: function setValue(key, value, throwOnError) {
    if (this.parent && !this.object.has(key)) {
      var _parent2;

      (_parent2 = this.parent).setValue.apply(_parent2, arguments);
    } else {
      this.object.setValue(key, value, throwOnError);
    }
  },
  getValue: function getValue(key, throwOnError) {
    if (!this.owns(key)) {
      if (throwOnError) {
        throw ReferenceError(key + " is not defined.");
      }

      return undefined;
    }

    return this.object.getValue(key);
  },
  getThisBinding: function getThisBinding() {
    return this.thisBinding;
  }
};

},{"./declarative-environment":176,"./property-reference":179,"babel-runtime/core-js/object/create":26}],179:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.PropertyReference = PropertyReference;

var _util = require("util");

var _reference = require("./reference");

var _primitiveType = require("../types/primitive-type");

/**
 * An object which represents a reference to an object's property.
 * @param {String} key - the identifier for the property
 * @param {ObjectType} object - the base object for the property.
 * @param {Environment} env - the current environment.
 * @returns {PropertyReference} The property reference.
 */
function PropertyReference(key, object, env) {
  _reference.Reference.call(this, key, object, env);
  this.isPropertyReference = true;
}

(0, _util.inherits)(PropertyReference, _reference.Reference);

/**
 * Returns the value of the reference. If the reference is unresolved,
 * a ReferenceError will be thrown.
 * @returns {ObjectType} The value.
 */
PropertyReference.prototype.getValue = function () {
  var propInfo = this.base.getProperty(this.key);

  var value = propInfo && propInfo.getValue();
  if (value && value.isReference) {
    value = value.getValue();
  }

  return value || _primitiveType.UNDEFINED;
};

/**
 * Sets the value of the underlying property or value.
 * @param {ObjectType} value - The value to assign.
 * @param {Boolean} throwOnError - Set true if a failed assignment should throw an exception.
 * @returns {Boolean} The result of the value assignment.
 */
PropertyReference.prototype.setValue = function (value, throwOnError) {
  var propInfo = this.base.getProperty(this.key);
  if (propInfo && !propInfo.initialized) {
    throw ReferenceError("Cannot " + this.key + " before it has been initialized");
  }

  if (throwOnError) {
    // todo: why can't this go in the setValue function?
    if (propInfo && !propInfo.canSetValue()) {
      throw TypeError("Cannot assign to read only property '" + this.key + "'");
    }

    if (!propInfo && !this.base.isExtensible()) {
      throw TypeError("Cannot assign to '" + this.key + "' on non-extensible object");
    }
  }

  var result = this.base.setValue(this.key, value);
  if (!result && throwOnError) {
    throw TypeError("Cannot assign to read only property '" + this.key + "'");
  }

  return result;
};

/**
 * Deletes the underlying reference.
 * @returns {Boolean} The result of the delete operation.
 */
PropertyReference.prototype["delete"] = function () {
  return this.base.deleteProperty(this.key, this.env.isStrict());
};

/**
 * Indicates whether the reference is resolved or not.
 * @returns {Boolean} true if resolves; false otherwise.
 */
PropertyReference.prototype.isUnresolved = function () {
  return false;
};

},{"../types/primitive-type":368,"./reference":180,"util":174}],180:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _Reference$prototype;

exports.Reference = Reference;

var _contracts = require("../utils/contracts");

function Reference(key, base, env) {
  this.isReference = true;
  this.unqualified = false;

  this.key = key;
  this.base = base;
  this.env = env;
  this.strict = env.isStrict();
}

Reference.prototype = (_Reference$prototype = {
  constructor: Reference,

  /**
   * Returns the value of the reference. If the reference is unresolved,
   * a ReferenceError will be thrown.
   * @returns {ObjectType} The value.
   */
  getValue: function getValue() {
    if (!this.base) {
      throw ReferenceError(this.key + " is not defined");
    }

    return this.base.getValue(this.key, this.strict);
  },


  /**
   * Sets the value of the underlying property or value.
   * @param {ObjectType} value - The value to assign.
   * @param {Boolean} throwOnError - Causes errors to be thrown.
   * @returns {Boolean} The result of the value assignment.
   */
  setValue: function setValue(value, throwOnError) {
    if (this.base) {
      if (!this.base.setValue(this.key, value) && this.strict) {
        throw TypeError();
      }

      return true;
    }

    // check identifier before strict
    (0, _contracts.assertIsValidIdentifier)(this.key, this.strict, this.env.ecmaVersion);

    if (this.strict) {
      throw ReferenceError(this.key + " is not defined");
    }

    return this.env.global.defineProperty(this.key, {
      value: value,
      configurable: true,
      enumerable: true,
      writable: true
    }, false, this.env);
  },
  isStrict: function isStrict() {
    return this.strict || this.env.isStrict();
  }
}, _Reference$prototype["delete"] = function _delete() {
  if (this.base) {
    return this.base.deleteVariable(this.key);
  }

  return true;
}, _Reference$prototype.isUnresolved = function isUnresolved() {
  return !this.base;
}, _Reference$prototype);

},{"../utils/contracts":377}],181:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.Scope = Scope;

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

var _assign = require("../utils/assign");

var _helpers = require("../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Scope(env, scope) {
  env.globalScope = env.globalScope || this;

  this.scope = scope;
  this.env = env;
  this.parentScope = (env.current || env.globalScope).scope;
}

Scope.prototype = {
  constructor: Scope,

  setMeta: function setMeta(key, value) {
    this.scope.meta[key] = value;
  },
  getMeta: function getMeta(key) {
    var scope = this.scope;
    while (scope) {
      if (scope.meta[key]) {
        return scope.meta[key];
      }

      scope = scope.parent;
    }

    return null;
  },
  setParent: function setParent(parentScope) {
    this.parentScope = parentScope;
  },


  /**
   * Initializes the scope by validating the function body and hoisting variables.
   * @param {AST} node - The node to be executed.
   * @returns {void}
   */
  init: function init(node) {
    if (!node) {
      return;
    }

    var env = this.env;
    this.scope.strict = node.isStrict();

    var strict = this.scope.strict || env.isStrict();
    node.getBindings().forEach(function (decl) {
      var key = decl.id.name;

      (0, _contracts.assertIsValidParameterName)(key, strict);

      var initialized = decl.isVar();
      var value = _primitiveType.UNDEFINED;
      var kind = decl.getParent().kind;

      if (decl.isFunction()) {
        initialized = true;
        kind = "function";

        var strictFunc = strict || decl.isStrict();
        value = env.objectFactory.createFunction(decl, undefined, { strict: strictFunc, name: key });
        // value.bindScope(this);
      } else if (decl.isClass()) {
          kind = "class";
        } else if (env.has(key)) {
          return;
        }

      var newVar = env.createVariable(key, kind);
      if (initialized) {
        newVar.init(value);
      }
    });
  },
  loadComplexArgs: _regenerator2.default.mark(function loadComplexArgs(params, args, callee) {
    var env, strict, scope, argIndex, argLength, i, ln, param, rest, restIndex;
    return _regenerator2.default.wrap(function loadComplexArgs$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            env = this.env;
            strict = env.isStrict() || callee.node.isStrict();

            // create a temporary scope for the argument declarations

            scope = this.createParameterScope();
            argIndex = 0;
            argLength = args.length;
            i = 0, ln = params.length;

          case 6:
            if (!(i < ln)) {
              _context.next = 21;
              break;
            }

            param = params[i];

            if (!param.isRestElement()) {
              _context.next = 16;
              break;
            }

            rest = env.objectFactory.createArray();
            restIndex = 0;


            while (argIndex < argLength) {
              rest.setValue(restIndex++, args[argIndex++] || _primitiveType.UNDEFINED);
            }

            _context.next = 14;
            return (0, _assign.declare)(env, param.argument, rest);

          case 14:
            _context.next = 18;
            break;

          case 16:
            _context.next = 18;
            return (0, _assign.declare)(env, param, args[argIndex++] || _primitiveType.UNDEFINED);

          case 18:
            i++;
            _context.next = 6;
            break;

          case 21:

            if (!callee.arrow) {
              (function () {
                // preserve the passed in arguments, even if defaults are used instead
                var argumentList = env.objectFactory.createArguments(args, callee, strict);
                scope.createVariable("arguments");
                scope.setValue("arguments", argumentList);

                args.forEach(function (value, index) {
                  (0, _helpers.createDataProperty)(argumentList, index, value);
                });

                argumentList.defineProperty("length", {
                  value: env.objectFactory.createPrimitive(args.length),
                  configurable: true,
                  writable: true
                });
              })();
            }

            // return scope back to main scope
            this.env.setScope(this.scope);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, loadComplexArgs, this);
  }),


  /**
   * Loads the arguments into the scope and creates the special `arguments` object.
   * @param {Array<Identifier>} params - The parameter identifiers
   * @param {Array<ObjectType>} args - The argument values
   * @param {FunctionType} callee - The function
   * @returns {void}
   */
  loadArgs: _regenerator2.default.mark(function loadArgs(params, args, callee) {
    var

    // todo: this method is getting far too complex
    env, scope, strictCallee, strict, argumentList, argsLength, paramsLength, shouldMap, loadedParams, paramIndex, _param, value, name, mapped, descriptor, _i;

    return _regenerator2.default.wrap(function loadArgs$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = params || [];

            if (!(callee.arrow || params.some(function (p) {
              return !p.isIdentifier();
            }))) {
              _context2.next = 5;
              break;
            }

            _context2.next = 4;
            return this.loadComplexArgs(params, args, callee);

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
            env = this.env;
            scope = this.scope;
            strictCallee = callee.node.isStrict();
            strict = strictCallee || env.isStrict();
            argumentList = env.objectFactory.createArguments(args, callee, strict);

            scope.createVariable("arguments");
            scope.setValue("arguments", argumentList);

            argsLength = args.length;
            paramsLength = params.length;


            if (paramsLength > 0) {
              shouldMap = !strictCallee;
              loadedParams = (0, _create2.default)(null);
              paramIndex = paramsLength;


              while (paramIndex--) {
                _param = params[paramIndex];
                value = args[paramIndex] || _primitiveType.UNDEFINED;
                name = _param.name;
                mapped = false;


                if (!loadedParams[name]) {
                  loadedParams[name] = true;
                  // assertIsValidParameterName(name, strict);

                  if (shouldMap) {
                    mapped = true;

                    descriptor = scope.createVariable(name);

                    if (paramIndex < argsLength) {
                      argumentList.mapProperty(paramIndex, descriptor);
                    }
                  }

                  scope.setValue(name, value);
                }

                if (!mapped && paramIndex < argsLength) {
                  (0, _helpers.createDataProperty)(argumentList, paramIndex, value);
                }
              }
            }

            // just set value if additional, unnamed arguments are passed in
            for (_i = paramsLength; _i < argsLength; _i++) {
              (0, _helpers.createDataProperty)(argumentList, _i, args[_i]);
            }

            argumentList.defineProperty("length", {
              value: env.objectFactory.create("Number", argsLength),
              configurable: true,
              writable: true
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, loadArgs, this);
  }),
  createParameterScope: function createParameterScope() {
    var temp = this.env.createScope();
    temp.scope.setParent(this.scope.parent);
    this.scope.setParent(temp);
    return temp.scope;
  },


  /**
   * uses the passed in function and exits the scope when the function completes,
   * returning the environment back to the previos state.
   * @param {Function} inner - The function to execute.
   * @returns {Iterator} The function results
   */
  use: _regenerator2.default.mark(function use(inner) {
    var result;
    return _regenerator2.default.wrap(function use$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return inner();

          case 3:
            result = _context3.sent;

            this.exit();
            return _context3.abrupt("return", result);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);

            this.exit();
            throw _context3.t0;

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, use, this, [[0, 8]]);
  }),


  /**
   * Exits the scope, returning the environment to it's previous state.
   * (Typically you would call `use` which handles exiting the scope itself.)
   * @returns {void}
   */
  exit: function exit() {
    this.env.setScope(this.parentScope);
  }
};

},{"../types/primitive-type":368,"../utils/assign":374,"../utils/contracts":377,"../utils/helpers":378,"babel-runtime/core-js/object/create":26,"babel-runtime/regenerator":37}],182:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.getStartIndex = getStartIndex;
exports.getEndIndex = getEndIndex;
exports.executeCallback = executeCallback;
exports.executeAccumulator = executeAccumulator;
exports.isSpreadable = isSpreadable;

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _symbolType = require("../../types/symbol-type");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [executeCallback, executeAccumulator].map(_regenerator2.default.mark);

function getStartIndex(index, length) {
  if (index < 0) {
    return Math.max(length + index, 0);
  }

  return Math.min(index || 0, length);
}

function getEndIndex(index, length) {
  if (index < 0) {
    return Math.max(length + index, 0);
  }

  return Math.min(index, length);
}

function executeCallback(env, callback, entry, thisArg, arr) {
  var key, args;
  return _regenerator2.default.wrap(function executeCallback$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!thisArg) {
            thisArg = callback.isStrict() ? _primitiveType.UNDEFINED : env.global;
          }

          key = env.objectFactory.createPrimitive(entry.key);
          args = [entry.value, key, arr];
          _context.next = 5;
          return callback.call(thisArg, args) || _primitiveType.UNDEFINED;

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function executeAccumulator(env, callback, priorValue, entry, arr) {
  var key, args;
  return _regenerator2.default.wrap(function executeAccumulator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          key = env.objectFactory.createPrimitive(entry.key);
          args = [priorValue || _primitiveType.UNDEFINED, entry.value || _primitiveType.UNDEFINED, key, arr];
          _context2.next = 4;
          return callback.call(_primitiveType.UNDEFINED, args) || _primitiveType.UNDEFINED;

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function isSpreadable(obj) {
  if (!(0, _checks.isObject)(obj)) {
    return false;
  }

  var key = _symbolType.SymbolType.getByKey("isConcatSpreadable");
  var propInfo = obj.getProperty(key);
  if (propInfo) {
    var spreadable = propInfo.getValue();
    if (!(0, _checks.isUndefined)(spreadable)) {
      return (0, _native.toBoolean)(spreadable);
    }
  }

  return obj.className === "Array";
}

},{"../../types/primitive-type":368,"../../types/symbol-type":373,"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],183:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("concat", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
      arrays[_key] = arguments[_key];
    }

    var newArray, index, current, length, i, value;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return factory.createArrayFromSpecies(this.object, 0);

          case 2:
            newArray = _context.sent;


            // add "this" array to bunch
            arrays.unshift((0, _native.toObject)(this.object));

            index = 0;

          case 5:
            if (!(arrays.length > 0)) {
              _context.next = 17;
              break;
            }

            current = arrays.shift();

            if (!(0, _arrayHelpers.isSpreadable)(current)) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return (0, _native.toLength)(current);

          case 10:
            length = _context.sent;

            for (i = 0; i < length; i++) {
              if (current.has(i)) {
                value = current.getValue(i);

                (0, _helpers.createDataProperty)(newArray, index, value);
              }

              index++;
            }
            _context.next = 15;
            break;

          case 14:
            (0, _helpers.createDataProperty)(newArray, index++, current);

          case 15:
            _context.next = 5;
            break;

          case 17:

            newArray.setValue("length", factory.createPrimitive(index));
            return _context.abrupt("return", newArray);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.concat"));
};

var _native = require("../../utils/native");

var _arrayHelpers = require("./array-helpers");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/helpers":378,"../../utils/native":379,"./array-helpers":182,"babel-runtime/regenerator":37}],184:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("every", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
    var arr, length, _iterator, _isArray, _i, _ref, entry, passed;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.every");
            arr = (0, _native.toObject)(this.object);
            _context.next = 4;
            return (0, _native.toLength)(arr);

          case 4:
            length = _context.sent;

            (0, _contracts.assertIsFunction)(callback, arr);

            _iterator = _iterators2.default.forward(arr, 0, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 7:
            if (!_isArray) {
              _context.next = 13;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("break", 26);

          case 10:
            _ref = _iterator[_i++];
            _context.next = 17;
            break;

          case 13:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("break", 26);

          case 16:
            _ref = _i.value;

          case 17:
            entry = _ref;
            _context.next = 20;
            return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

          case 20:
            _context.t0 = _context.sent;
            passed = (0, _native.toBoolean)(_context.t0);

            if (passed) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(false));

          case 24:
            _context.next = 7;
            break;

          case 26:
            return _context.abrupt("return", factory.createPrimitive(true));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.every"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],185:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("filter", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
    var arr, length, newArray, index, _iterator, _isArray, _i, _ref, entry, passed;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.filter");

            arr = (0, _native.toObject)(this.object);
            _context.next = 4;
            return (0, _native.toLength)(arr);

          case 4:
            length = _context.sent;

            (0, _contracts.assertIsFunction)(callback, arr);

            _context.next = 8;
            return factory.createArrayFromSpecies(this.object, 0);

          case 8:
            newArray = _context.sent;
            index = 0;
            _iterator = _iterators2.default.forward(arr, 0, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 11:
            if (!_isArray) {
              _context.next = 17;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("break", 29);

          case 14:
            _ref = _iterator[_i++];
            _context.next = 21;
            break;

          case 17:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("break", 29);

          case 20:
            _ref = _i.value;

          case 21:
            entry = _ref;
            _context.next = 24;
            return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

          case 24:
            _context.t0 = _context.sent;
            passed = (0, _native.toBoolean)(_context.t0);

            if (passed) {
              (0, _helpers.createDataProperty)(newArray, index++, entry.value);
            }

          case 27:
            _context.next = 11;
            break;

          case 29:
            return _context.abrupt("return", newArray);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.filter"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/helpers":378,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],186:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("forEach", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
    var arr, length, _iterator, _isArray, _i, _ref, entry;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = (0, _native.toObject)(this.object);
            _context.next = 3;
            return (0, _native.toLength)(arr);

          case 3:
            length = _context.sent;

            (0, _contracts.assertIsFunction)(callback, arr);

            _iterator = _iterators2.default.forward(arr, 0, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 6:
            if (!_isArray) {
              _context.next = 12;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("break", 21);

          case 9:
            _ref = _iterator[_i++];
            _context.next = 16;
            break;

          case 12:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("break", 21);

          case 15:
            _ref = _i.value;

          case 16:
            entry = _ref;
            _context.next = 19;
            return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

          case 19:
            _context.next = 6;
            break;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.forEach"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],187:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("indexOf", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(searchElement, fromIndex) {
    var length,
        index,
        notFound,
        _iterator,
        _isArray,
        _i,
        _ref,
        _ref2,
        key,
        value,
        _args = arguments;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchElement = searchElement || _primitiveType.UNDEFINED;
            _context.next = 3;
            return (0, _native.toLength)(this.object);

          case 3:
            length = _context.sent;

            if (!(_args.length === 1)) {
              _context.next = 8;
              break;
            }

            _context.t0 = 0;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _native.toInteger)(fromIndex);

          case 10:
            _context.t0 = _context.sent;

          case 11:
            index = _context.t0;
            notFound = factory.createPrimitive(-1);

            if (!(length === 0 || index >= length)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", notFound);

          case 15:

            index = (0, _arrayHelpers.getStartIndex)(index, length);

            _iterator = _iterators2.default.forward(this.object, index, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 17:
            if (!_isArray) {
              _context.next = 23;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("break", 34);

          case 20:
            _ref = _iterator[_i++];
            _context.next = 27;
            break;

          case 23:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("break", 34);

          case 26:
            _ref = _i.value;

          case 27:
            _ref2 = _ref;
            key = _ref2.key;
            value = _ref2.value;

            if (!env.ops.strictEquals(searchElement, value || _primitiveType.UNDEFINED)) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(key));

          case 32:
            _context.next = 17;
            break;

          case 34:
            return _context.abrupt("return", notFound);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.indexOf"));
};

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _iterators = require("../../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators":352,"../../types/primitive-type":368,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],188:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  var proto = $target.getValue("prototype");
  $target.define("isArray", factory.createBuiltInFunction(function (obj) {
    return factory.createPrimitive(!!(obj && (obj.className === "Array" || obj === proto)));
  }, 1, "Array.isArray"));
};

},{}],189:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("join", factory.createBuiltInFunction(_regenerator2.default.mark(function join(separator) {
    var length,
        stringValues,
        stringValue,
        i,
        _args = arguments;
    return _regenerator2.default.wrap(function join$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            length = _context.sent;

            if (!(_args.length === 0 || separator === _primitiveType.UNDEFINED)) {
              _context.next = 7;
              break;
            }

            _context.t0 = ",";
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return (0, _native.toString)(separator);

          case 9:
            _context.t0 = _context.sent;

          case 10:
            separator = _context.t0;
            stringValues = [];
            stringValue = undefined;
            i = 0;

          case 14:
            if (!(i < length)) {
              _context.next = 29;
              break;
            }

            stringValue = "";

            if (!this.object.has(i)) {
              _context.next = 25;
              break;
            }

            stringValue = this.object.getValue(i);

            if (!(0, _checks.isNullOrUndefined)(stringValue)) {
              _context.next = 22;
              break;
            }

            stringValue = "";
            _context.next = 25;
            break;

          case 22:
            _context.next = 24;
            return (0, _native.toString)(stringValue);

          case 24:
            stringValue = _context.sent;

          case 25:

            stringValues.push(stringValue);

          case 26:
            i++;
            _context.next = 14;
            break;

          case 29:
            return _context.abrupt("return", factory.createPrimitive(stringValues.join(separator)));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, join, this);
  }), 1, "Array.prototype.join"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],190:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("lastIndexOf", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(searchElement, fromIndex) {
    var length,
        index,
        _iterator,
        _isArray,
        _i,
        _ref,
        _ref2,
        key,
        value,
        _args = arguments;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchElement = searchElement || _primitiveType.UNDEFINED;
            _context.next = 3;
            return (0, _native.toLength)(this.object);

          case 3:
            length = _context.sent;

            if (!(_args.length === 1)) {
              _context.next = 8;
              break;
            }

            _context.t0 = length - 1;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _native.toInteger)(fromIndex);

          case 10:
            _context.t0 = _context.sent;

          case 11:
            index = _context.t0;


            if (index < 0) {
              index = length - Math.abs(index);
            }

            _iterator = _iterators2.default.reverse(this.object, index), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 14:
            if (!_isArray) {
              _context.next = 20;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("break", 31);

          case 17:
            _ref = _iterator[_i++];
            _context.next = 24;
            break;

          case 20:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("break", 31);

          case 23:
            _ref = _i.value;

          case 24:
            _ref2 = _ref;
            key = _ref2.key;
            value = _ref2.value;

            if (!env.ops.strictEquals(searchElement, value || _primitiveType.UNDEFINED)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(key));

          case 29:
            _context.next = 14;
            break;

          case 31:
            return _context.abrupt("return", factory.createPrimitive(-1));

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.lastIndexOf"));
};

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _iterators = require("../../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators":352,"../../types/primitive-type":368,"../../utils/native":379,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],191:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
    $target.define("map", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
        var arr, length, newArray, _iterator, _isArray, _i, _ref, entry, value;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        arr = (0, _native.toObject)(this.object);
                        _context.next = 3;
                        return (0, _native.toLength)(arr);

                    case 3:
                        length = _context.sent;


                        (0, _contracts.assertIsNotNullOrUndefined)(arr, "Array.prototype.map");
                        (0, _contracts.assertIsFunction)(callback, arr);

                        _context.next = 8;
                        return factory.createArrayFromSpecies(this.object, length);

                    case 8:
                        newArray = _context.sent;

                        newArray.setValue("length", factory.createPrimitive(length));

                        _iterator = _iterators2.default.forward(arr, 0, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                    case 11:
                        if (!_isArray) {
                            _context.next = 17;
                            break;
                        }

                        if (!(_i >= _iterator.length)) {
                            _context.next = 14;
                            break;
                        }

                        return _context.abrupt("break", 28);

                    case 14:
                        _ref = _iterator[_i++];
                        _context.next = 21;
                        break;

                    case 17:
                        _i = _iterator.next();

                        if (!_i.done) {
                            _context.next = 20;
                            break;
                        }

                        return _context.abrupt("break", 28);

                    case 20:
                        _ref = _i.value;

                    case 21:
                        entry = _ref;
                        _context.next = 24;
                        return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

                    case 24:
                        value = _context.sent;

                        (0, _helpers.createDataProperty)(newArray, entry.key, value);
                        // newArray.defineProperty(entry.key, {value, configurable: true, enumerable: true, writable: true});

                    case 26:
                        _context.next = 11;
                        break;

                    case 28:
                        return _context.abrupt("return", newArray);

                    case 29:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }), 1, "Array.prototype.map"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/helpers":378,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],192:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("pop", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var obj, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            obj = undefined;
            _context.next = 3;
            return (0, _native.toLength)(this.object);

          case 3:
            i = _context.sent;


            if (i > 0) {
              i--;

              if (this.object.has(i)) {
                obj = this.object.getValue(i);
                this.object.deleteProperty(i, true);
              }
            }

            this.object.setValue("length", factory.createPrimitive(i));
            return _context.abrupt("return", obj || _primitiveType.UNDEFINED);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Array.prototype.pop"));
};

var _native = require("../../utils/native");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/native":379,"babel-runtime/regenerator":37}],193:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _maxSafeInteger = require("babel-runtime/core-js/number/max-safe-integer");

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

exports.default = function ($target, env, factory) {
  $target.define("push", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    var start, count, length, i, newLength;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            start = _context.sent;
            count = items.length;
            length = start + count;

            if (!(length > _maxSafeInteger2.default)) {
              _context.next = 7;
              break;
            }

            throw TypeError("The push operation will cause an invalid length value.");

          case 7:

            for (i = 0; i < count; i++) {
              this.object.setValue(start + i, items[i]);
            }

            newLength = factory.createPrimitive(length);

            this.object.setValue("length", newLength);
            return _context.abrupt("return", newLength);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.push"));
};

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"babel-runtime/core-js/number/max-safe-integer":23,"babel-runtime/regenerator":37}],194:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("reduceRight", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, initialValue) {
    var length,
        arr,
        accumulator,
        hasInitialValue,
        hasElements,
        _iterator,
        _isArray,
        _i,
        _ref,
        entry,
        _args = arguments;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            length = _context.sent;

            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.reduceRight");
            arr = (0, _native.toObject)(this.object);

            (0, _contracts.assertIsFunction)(callback, arr);

            accumulator = undefined;
            hasInitialValue = false;


            if (_args.length > 1) {
              accumulator = initialValue;
              hasInitialValue = true;
            }

            hasElements = false;

            if (!(length > 0)) {
              _context.next = 33;
              break;
            }

            _iterator = _iterators2.default.reverse(arr, length - 1), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 12:
            if (!_isArray) {
              _context.next = 18;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("break", 33);

          case 15:
            _ref = _iterator[_i++];
            _context.next = 22;
            break;

          case 18:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("break", 33);

          case 21:
            _ref = _i.value;

          case 22:
            entry = _ref;

            if (hasElements) {
              _context.next = 28;
              break;
            }

            hasElements = true;

            if (hasInitialValue) {
              _context.next = 28;
              break;
            }

            accumulator = entry.value;
            return _context.abrupt("continue", 31);

          case 28:
            _context.next = 30;
            return (0, _arrayHelpers.executeAccumulator)(env, callback, accumulator, entry, arr);

          case 30:
            accumulator = _context.sent;

          case 31:
            _context.next = 12;
            break;

          case 33:
            if (!(!hasElements && !hasInitialValue)) {
              _context.next = 35;
              break;
            }

            throw TypeError("Reduce of empty array with no initial value");

          case 35:
            return _context.abrupt("return", accumulator);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.reduceRight"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],195:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("reduce", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, initialValue) {
    var arr,
        length,
        hasInitialValue,
        value,
        hasElements,
        _iterator,
        _isArray,
        _i,
        _ref,
        entry,
        _args = arguments;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.reduce");
            arr = (0, _native.toObject)(this.object);
            _context.next = 4;
            return (0, _native.toLength)(arr);

          case 4:
            length = _context.sent;

            (0, _contracts.assertIsFunction)(callback, arr);

            hasInitialValue = false;
            value = undefined;


            if (_args.length > 1) {
              value = initialValue;
              hasInitialValue = true;
            }

            hasElements = false;

            if (!(length > 0)) {
              _context.next = 33;
              break;
            }

            _iterator = _iterators2.default.forward(arr, 0, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 12:
            if (!_isArray) {
              _context.next = 18;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("break", 33);

          case 15:
            _ref = _iterator[_i++];
            _context.next = 22;
            break;

          case 18:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("break", 33);

          case 21:
            _ref = _i.value;

          case 22:
            entry = _ref;

            if (hasElements) {
              _context.next = 28;
              break;
            }

            hasElements = true;

            if (hasInitialValue) {
              _context.next = 28;
              break;
            }

            value = entry.value;
            return _context.abrupt("continue", 31);

          case 28:
            _context.next = 30;
            return (0, _arrayHelpers.executeAccumulator)(env, callback, value, entry, arr);

          case 30:
            value = _context.sent;

          case 31:
            _context.next = 12;
            break;

          case 33:
            if (!(!hasElements && !hasInitialValue)) {
              _context.next = 35;
              break;
            }

            throw TypeError("Reduce of empty array with no initial value");

          case 35:
            return _context.abrupt("return", value);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.reduce"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],196:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("reverse", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var length, middle, lower, upper, upperValue, lowerValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            length = _context.sent;
            middle = Math.floor(length / 2);
            lower = 0;
            upper = undefined, upperValue = undefined, lowerValue = undefined;


            while (lower !== middle) {
              upper = length - lower - 1;
              lowerValue = this.object.has(lower) && this.object.getValue(lower);
              upperValue = this.object.has(upper) && this.object.getValue(upper);

              if (upperValue) {
                this.object.setValue(lower, upperValue);
              }

              if (lowerValue) {
                this.object.setValue(upper, lowerValue);
              }

              if (upperValue && !lowerValue) {
                this.object.deleteProperty(upper);
              } else if (lowerValue && !upperValue) {
                this.object.deleteProperty(lower);
              }

              lower++;
            }

            return _context.abrupt("return", this.object);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Array.prototype.reverse"));
};

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"babel-runtime/regenerator":37}],197:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("shift", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var obj, length, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            obj = _primitiveType.UNDEFINED;
            _context.next = 3;
            return (0, _native.toLength)(this.object);

          case 3:
            length = _context.sent;


            if (length > 0) {
              obj = this.object.getValue(0) || obj;

              i = 1;

              while (i < length) {
                if (this.object.has(i)) {
                  this.object.setValue(i - 1, this.object.getValue(i));
                } else {
                  this.object.deleteProperty(i - 1);
                }

                i++;
              }

              this.object.deleteProperty(length - 1);
            }

            this.object.setValue("length", factory.createPrimitive(length === 0 ? 0 : --length));
            return _context.abrupt("return", obj);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Array.prototype.shift"));
};

var _native = require("../../utils/native");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/native":379,"babel-runtime/regenerator":37}],198:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("slice", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(begin, end) {
    var source, length, newLength, arr, _iterator, _isArray, _i, _ref, _ref2, key, value, index;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = this.object;
            _context.next = 3;
            return (0, _native.toLength)(this.object);

          case 3:
            length = _context.sent;

            if (!begin) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return (0, _native.toInteger)(begin);

          case 7:
            _context.t0 = _context.sent;
            _context.next = 11;
            break;

          case 10:
            _context.t0 = 0;

          case 11:
            begin = _context.t0;

            if (!(!end || end.type === "undefined")) {
              _context.next = 16;
              break;
            }

            end = length;
            _context.next = 19;
            break;

          case 16:
            _context.next = 18;
            return (0, _native.toInteger)(end);

          case 18:
            end = _context.sent;

          case 19:

            begin = (0, _arrayHelpers.getStartIndex)(begin, length);
            end = (0, _arrayHelpers.getEndIndex)(end, length);

            newLength = Math.max(end - begin, 0);
            _context.next = 24;
            return factory.createArrayFromSpecies(this.object, newLength);

          case 24:
            arr = _context.sent;


            newLength = 0;
            _iterator = _iterators2.default.forward(source, begin, end), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 27:
            if (!_isArray) {
              _context.next = 33;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("break", 45);

          case 30:
            _ref = _iterator[_i++];
            _context.next = 37;
            break;

          case 33:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 36;
              break;
            }

            return _context.abrupt("break", 45);

          case 36:
            _ref = _i.value;

          case 37:
            _ref2 = _ref;
            key = _ref2.key;
            value = _ref2.value;
            index = key - begin;

            (0, _helpers.createDataProperty)(arr, index, value);
            newLength = ++index;

          case 43:
            _context.next = 27;
            break;

          case 45:

            arr.setValue("length", factory.createPrimitive(newLength));
            return _context.abrupt("return", arr);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Array.prototype.slice"));
};

var _native = require("../../utils/native");

var _arrayHelpers = require("./array-helpers");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/helpers":378,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],199:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ($target, env, factory) {
  $target.define("some", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
    var arr, length, _iterator, _isArray, _i, _ref, entry, passed;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.some");
            arr = (0, _native.toObject)(this.object);
            _context.next = 4;
            return (0, _native.toLength)(this.object);

          case 4:
            length = _context.sent;

            (0, _contracts.assertIsFunction)(callback, this.object);

            _iterator = _iterators2.default.forward(arr, 0, length), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 7:
            if (!_isArray) {
              _context.next = 13;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("break", 26);

          case 10:
            _ref = _iterator[_i++];
            _context.next = 17;
            break;

          case 13:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("break", 26);

          case 16:
            _ref = _i.value;

          case 17:
            entry = _ref;
            _context.next = 20;
            return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

          case 20:
            _context.t0 = _context.sent;
            passed = (0, _native.toBoolean)(_context.t0);

            if (!passed) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(true));

          case 24:
            _context.next = 7;
            break;

          case 26:
            return _context.abrupt("return", factory.createPrimitive(false));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.some"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":352,"../../utils/contracts":377,"../../utils/native":379,"./array-helpers":182,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],200:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  function defaultComparer(a, b) {
    a = (0, _async.exhaust)((0, _native.toString)(a));
    b = (0, _async.exhaust)((0, _native.toString)(b));

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  function getComparer(comparerFunc) {
    if ((0, _checks.isNullOrUndefined)(comparerFunc)) {
      return defaultComparer;
    }

    return function (a, b) {
      var result = (0, _async.exhaust)(comparerFunc.call(_primitiveType.UNDEFINED, [a, b]));
      if (result) {
        return result.toNative();
      }

      return undefined;
    };
  }

  $target.define("sort", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(compareFunc) {
    var arr, length, i, comparer, sortedArray;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = this.object;
            _context.next = 3;
            return (0, _native.toLength)(arr);

          case 3:
            length = _context.sent;
            i = 0;
            comparer = getComparer(compareFunc);

            // to array, run the wrapped comparer, then re-assign indexes

            _context.next = 8;
            return (0, _native.toArray)(arr, length);

          case 8:
            _context.t0 = function (el) {
              return el.isPrimitive && el.value === undefined ? undefined : el;
            };

            _context.t1 = comparer;
            sortedArray = _context.sent.
            // undefined positions are handled by the underlying sort algorithm, so replace them with the raw primitive value
            map(_context.t0).sort(_context.t1);


            while (i < length) {
              if (i in sortedArray) {
                arr.setValue(i, sortedArray[i] || _primitiveType.UNDEFINED);
              } else {
                arr.deleteProperty(i, false);
              }

              i++;
            }

            return _context.abrupt("return", arr);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.sort"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _async = require("../../utils/async");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/async":375,"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],201:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("splice", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(start, deleteCount) {
    for (var _len = arguments.length, elements = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      elements[_key - 2] = arguments[_key];
    }

    var length, removed, k, newCount, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            length = _context.sent;
            _context.next = 5;
            return (0, _native.toInteger)(start);

          case 5:
            start = _context.sent;

            if (start < 0) {
              start = Math.max(length + start, 0);
            } else {
              start = Math.min(start, length);
            }

            if (!deleteCount) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return (0, _native.toInteger)(deleteCount);

          case 10:
            deleteCount = _context.sent;

            if (deleteCount < 0) {
              deleteCount = 0;
            } else {
              deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
            }
            _context.next = 15;
            break;

          case 14:
            deleteCount = length - start;

          case 15:
            _context.next = 17;
            return factory.createArrayFromSpecies(this.object, deleteCount);

          case 17:
            removed = _context.sent;
            k = 0;

            while (k < deleteCount) {
              if (this.object.has(k + start)) {
                (0, _helpers.createDataProperty)(removed, k, this.object.getValue(k + start));
              }

              k++;
            }

            removed.setValue("length", factory.createPrimitive(k));

            newCount = elements.length;

            if (newCount < deleteCount) {
              k = start;

              while (k < length - deleteCount) {
                if (this.object.has(k + deleteCount)) {
                  this.object.setValue(k + newCount, this.object.getValue(k + deleteCount));
                } else {
                  this.object.deleteProperty(k + newCount);
                }

                k++;
              }

              k = length;
              while (k > length - deleteCount + newCount) {
                this.object.deleteProperty(--k);
              }
            } else if (newCount > deleteCount) {
              k = length - deleteCount;
              while (k > start) {
                if (this.object.has(k + deleteCount - 1)) {
                  this.object.setValue(k + newCount - 1, this.object.getValue(k + deleteCount - 1));
                } else {
                  this.object.deleteProperty(k + newCount - 1);
                }

                k--;
              }
            }

            k = start;
            for (i = 0; i < newCount; i++) {
              this.object.setValue(k, elements[i]);
              k++;
            }

            if (this.object.setValue("length", factory.createPrimitive(length - deleteCount + newCount))) {
              _context.next = 27;
              break;
            }

            throw TypeError("Unable to set length");

          case 27:
            return _context.abrupt("return", removed);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Array.prototype.splice"));
};

var _native = require("../../utils/native");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/regenerator":37}],202:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("toLocaleString", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var length, arr, i, current, func;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            length = _context.sent;
            arr = new Array(length);
            i = 0;
            current = undefined;

          case 6:
            if (!(i < length)) {
              _context.next = 23;
              break;
            }

            if (!this.object.has(i)) {
              _context.next = 20;
              break;
            }

            current = this.object.getValue(i);

            if (!(0, _checks.isNullOrUndefined)(current)) {
              _context.next = 13;
              break;
            }

            arr[i] = "";
            _context.next = 20;
            break;

          case 13:
            func = current.getValue("toLocaleString") || current.getValue("toString");
            _context.next = 16;
            return func.call(current);

          case 16:
            _context.t0 = _context.sent;
            _context.next = 19;
            return (0, _native.toString)(_context.t0);

          case 19:
            arr[i] = _context.sent;

          case 20:

            i++;
            _context.next = 6;
            break;

          case 23:
            return _context.abrupt("return", factory.createPrimitive(arr.join()));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Array.prototype.toLocaleString"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],203:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var func;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.toString");
            func = this.object.getValue("join");

            if (!func || !(0, _checks.isFunction)(func)) {
              func = env.global.getValue("Object").getValue("toString");
            }

            _context.next = 5;
            return func.call(this.object);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Array.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/contracts":377,"babel-runtime/regenerator":37}],204:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("unshift", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    var length, argCount, i, toIndex, fromIndex, newLength;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toLength)(this.object);

          case 2:
            length = _context.sent;
            argCount = items.length;
            i = length;
            toIndex = undefined, fromIndex = undefined;


            while (i > 0) {
              fromIndex = i - 1;
              toIndex = i + argCount - 1;

              if (this.object.has(fromIndex)) {
                this.object.setValue(toIndex, this.object.getValue(fromIndex));
              } else {
                this.object.deleteProperty(toIndex, true);
              }

              i--;
            }

            for (i = 0; i < argCount; i++) {
              this.object.setValue(i, items[i]);
            }

            newLength = factory.createPrimitive(argCount + length);

            this.object.setValue("length", newLength);
            return _context.abrupt("return", newLength);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.unshift"));
};

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"babel-runtime/regenerator":37}],205:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = objectFactory.createObject();
  proto.className = "Array";
  proto.define("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

  var arrayClass = objectFactory.createFunction(function (length) {
    if (arguments.length === 1 && length.type === "number") {
      (0, _contracts.assertIsValidArrayLength)(arguments[0].toNative());

      var newArray = objectFactory.createArray();
      newArray.setValue("length", length);
      return newArray;
    }

    return objectFactory.createArray(arguments);
  }, proto, { configurable: false, enumerable: false, writable: false, name: "Array" });

  (0, _array2.default)(arrayClass, env, objectFactory);
  (0, _array22.default)(proto, env, objectFactory);
  (0, _array20.default)(proto, env, objectFactory);
  (0, _array30.default)(proto, env, objectFactory);
  (0, _array44.default)(proto, env, objectFactory);
  (0, _array32.default)(proto, env, objectFactory);
  (0, _array38.default)(proto, env, objectFactory);
  (0, _array4.default)(proto, env, objectFactory);
  (0, _array14.default)(proto, env, objectFactory);
  (0, _array12.default)(proto, env, objectFactory);
  (0, _array16.default)(proto, env, objectFactory);
  (0, _array10.default)(proto, env, objectFactory);
  (0, _array18.default)(proto, env, objectFactory);
  (0, _array8.default)(proto, env, objectFactory);
  (0, _array6.default)(proto, env, objectFactory);
  (0, _array34.default)(proto, env, objectFactory);
  (0, _array24.default)(proto, env, objectFactory);
  (0, _array26.default)(proto, env, objectFactory);
  (0, _array28.default)(proto, env, objectFactory);
  (0, _array36.default)(proto, env, objectFactory);
  (0, _array40.default)(proto, env, objectFactory);
  (0, _array42.default)(proto, env, objectFactory);

  globalObject.define("Array", arrayClass);
};

var _contracts = require("../../utils/contracts");

var _array = require("./array.is-array");

var _array2 = _interopRequireDefault(_array);

var _array3 = require("./array.concat");

var _array4 = _interopRequireDefault(_array3);

var _array5 = require("./array.every");

var _array6 = _interopRequireDefault(_array5);

var _array7 = require("./array.filter");

var _array8 = _interopRequireDefault(_array7);

var _array9 = require("./array.for-each");

var _array10 = _interopRequireDefault(_array9);

var _array11 = require("./array.index-of");

var _array12 = _interopRequireDefault(_array11);

var _array13 = require("./array.join");

var _array14 = _interopRequireDefault(_array13);

var _array15 = require("./array.last-index-of");

var _array16 = _interopRequireDefault(_array15);

var _array17 = require("./array.map");

var _array18 = _interopRequireDefault(_array17);

var _array19 = require("./array.pop");

var _array20 = _interopRequireDefault(_array19);

var _array21 = require("./array.push");

var _array22 = _interopRequireDefault(_array21);

var _array23 = require("./array.reduce");

var _array24 = _interopRequireDefault(_array23);

var _array25 = require("./array.reduce-right");

var _array26 = _interopRequireDefault(_array25);

var _array27 = require("./array.reverse");

var _array28 = _interopRequireDefault(_array27);

var _array29 = require("./array.shift");

var _array30 = _interopRequireDefault(_array29);

var _array31 = require("./array.slice");

var _array32 = _interopRequireDefault(_array31);

var _array33 = require("./array.some");

var _array34 = _interopRequireDefault(_array33);

var _array35 = require("./array.sort");

var _array36 = _interopRequireDefault(_array35);

var _array37 = require("./array.splice");

var _array38 = _interopRequireDefault(_array37);

var _array39 = require("./array.to-locale-string");

var _array40 = _interopRequireDefault(_array39);

var _array41 = require("./array.to-string");

var _array42 = _interopRequireDefault(_array41);

var _array43 = require("./array.unshift");

var _array44 = _interopRequireDefault(_array43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"./array.concat":183,"./array.every":184,"./array.filter":185,"./array.for-each":186,"./array.index-of":187,"./array.is-array":188,"./array.join":189,"./array.last-index-of":190,"./array.map":191,"./array.pop":192,"./array.push":193,"./array.reduce":195,"./array.reduce-right":194,"./array.reverse":196,"./array.shift":197,"./array.slice":198,"./array.some":199,"./array.sort":200,"./array.splice":201,"./array.to-locale-string":202,"./array.to-string":203,"./array.unshift":204}],206:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "Boolean", "Boolean.prototype.toString");
    return factory.createPrimitive(String(this.object.value));
  }, 0, "Boolean.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],207:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "Boolean", "Boolean.prototype.valueOf");
    return factory.createPrimitive(this.object.value);
  }, 0, "Boolean.prototype.valueOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],208:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = booleanApi;

var _native = require("../../utils/native");

var _boolean = require("./boolean.to-string");

var _boolean2 = _interopRequireDefault(_boolean);

var _boolean3 = require("./boolean.value-of");

var _boolean4 = _interopRequireDefault(_boolean3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function booleanApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = objectFactory.createObject();
  proto.className = "Boolean";
  proto.value = false;

  var booleanClass = objectFactory.createFunction(function (value) {
    var booleanValue = (0, _native.toBoolean)(value);
    var obj = objectFactory.create("Boolean", booleanValue);

    // called as new
    if (this.isNew) {
      return obj.toObject();
    }

    return obj;
  }, proto, { configurable: false, enumerable: false, writable: false, name: "Boolean" });

  (0, _boolean2.default)(proto, env, objectFactory);
  (0, _boolean4.default)(proto, env, objectFactory);

  globalObject.define("Boolean", booleanClass);
}

},{"../../utils/native":379,"./boolean.to-string":206,"./boolean.value-of":207}],209:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = consoleApi;

var _native = require("../../utils/native");

var _async = require("../../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = ["log", "info", "error", "warn"];

function consoleApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;
  var consoleClass = objectFactory.createObject();

  methods.forEach(function (name) {
    consoleClass.define(name, objectFactory.createBuiltInFunction(_regenerator2.default.mark(function _callee2() {
      var _console;

      var args,
          _args2 = arguments;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _async.map)(_args2, _regenerator2.default.mark(function _callee(arg) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _native.toString)(arg);

                      case 2:
                        return _context.abrupt("return", _context.sent);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

            case 2:
              args = _context2.sent;

              (_console = console)[name].apply(_console, args);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }), 1, "console." + name));
  });

  globalObject.define("console", consoleClass);
}

},{"../../utils/async":375,"../../utils/native":379,"babel-runtime/regenerator":37}],210:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("parse", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
    var stringValue, dateValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toPrimitive)(value, "string");

          case 2:
            stringValue = _context.sent;
            dateValue = Date.parse(stringValue);
            return _context.abrupt("return", factory.createPrimitive(dateValue));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Date.prototype.parse"));
};

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"babel-runtime/regenerator":37}],211:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("UTC", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var nativeArgs,
        _args2 = arguments;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.delegateYield((0, _async.map)(_args2, _regenerator2.default.mark(function _callee(arg) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _native.toPrimitive)(arg, "number");

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })), "t0", 1);

          case 1:
            nativeArgs = _context2.t0;
            return _context2.abrupt("return", factory.createPrimitive(Date.UTC.apply(null, nativeArgs)));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 7, "Date.prototype.UTC"));
};

var _async = require("../../utils/async");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/async":375,"../../utils/native":379,"babel-runtime/regenerator":37}],212:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    return factory.createPrimitive(this.object.value.valueOf());
  }, 0, "Date.prototype.valueOf"));
};

},{}],213:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = dateApi;

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _date = require("./date.parse");

var _date2 = _interopRequireDefault(_date);

var _date3 = require("./date.utc");

var _date4 = _interopRequireDefault(_date3);

var _date5 = require("./date.value-of");

var _date6 = _interopRequireDefault(_date5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticMethods = ["now"];

var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];

var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];

function dateApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = objectFactory.createObject();
  proto.className = "Date";
  proto.value = new Date(0);

  var dateClass = objectFactory.createFunction(_regenerator2.default.mark(function _callee2(p1, p2, p3, p4, p5, p6, p7) {
    var dateValue,
        args,
        primitiveValue,
        i,
        _args2 = arguments;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dateValue = undefined, args = undefined;

            if (!(_args2.length === 0)) {
              _context2.next = 5;
              break;
            }

            args = [];
            _context2.next = 22;
            break;

          case 5:
            if (!(_args2.length === 1)) {
              _context2.next = 20;
              break;
            }

            if (!p1.isPrimitive) {
              _context2.next = 10;
              break;
            }

            args = [p1.value];
            _context2.next = 18;
            break;

          case 10:
            _context2.next = 12;
            return (0, _native.toPrimitive)(p1);

          case 12:
            primitiveValue = _context2.sent;

            if (!(typeof primitiveValue !== "string")) {
              _context2.next = 17;
              break;
            }

            _context2.next = 16;
            return (0, _native.toNumber)(p1);

          case 16:
            primitiveValue = _context2.sent;

          case 17:

            args = [primitiveValue];

          case 18:
            _context2.next = 22;
            break;

          case 20:
            return _context2.delegateYield((0, _async.map)(_args2, _regenerator2.default.mark(function _callee(arg) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _native.toPrimitive)(arg, "number");

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })), "t0", 21);

          case 21:
            args = _context2.t0;

          case 22:
            if (!this.isNew) {
              _context2.next = 35;
              break;
            }

            _context2.t1 = args.length;
            _context2.next = _context2.t1 === 0 ? 26 : _context2.t1 === 1 ? 28 : 30;
            break;

          case 26:
            dateValue = new Date();
            return _context2.abrupt("break", 34);

          case 28:
            dateValue = new Date(args[0]);
            return _context2.abrupt("break", 34);

          case 30:
            i = args.length;

            while (i < 7) {
              // default day to 1, all others to 0
              args[i++] = i === 3 ? 1 : 0;
            }

            dateValue = new (Function.prototype.bind.apply(Date, [null].concat(args)))();
            return _context2.abrupt("break", 34);

          case 34:
            return _context2.abrupt("return", objectFactory.create("Date", dateValue));

          case 35:

            dateValue = Date.apply(undefined, args);
            return _context2.abrupt("return", objectFactory.createPrimitive(dateValue));

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), proto, { configurable: false, enumerable: false, writable: false, name: "Date" });

  (0, _date2.default)(dateClass, env, objectFactory);
  (0, _date4.default)(dateClass, env, objectFactory);
  (0, _date6.default)(proto, env, objectFactory);

  staticMethods.forEach(function (name) {
    dateClass.define(name, (0, _native.toNativeFunction)(env, Date[name], "Date." + name));
  });

  protoMethods.forEach(function (name) {
    proto.define(name, (0, _native.toNativeFunction)(env, Date.prototype[name], "Date.prototype." + name));
  });

  setters.forEach(function (name) {
    var _marked = [setter].map(_regenerator2.default.mark);

    function setter() {
      var args,
          _args4 = arguments;
      return _regenerator2.default.wrap(function setter$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.delegateYield((0, _async.map)(_args4, _regenerator2.default.mark(function _callee3(arg) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _native.toPrimitive)(arg);

                      case 2:
                        return _context3.abrupt("return", _context3.sent);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              })), "t0", 1);

            case 1:
              args = _context4.t0;

              Date.prototype[name].apply(this.object.value, args);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _marked[0], this);
    }

    proto.define(name, objectFactory.createBuiltInFunction(setter, Date.prototype[name].length, "Date.prototype." + name));
  });

  globalObject.define("Date", dateClass);
}

},{"../../utils/async":375,"../../utils/native":379,"./date.parse":210,"./date.utc":211,"./date.value-of":212,"babel-runtime/regenerator":37}],214:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var nameValue, name, messageValue, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nameValue = this.object.getValue("name");

            if (!(0, _checks.isUndefined)(nameValue)) {
              _context.next = 5;
              break;
            }

            _context.t0 = "Error";
            _context.next = 8;
            break;

          case 5:
            _context.next = 7;
            return (0, _native.toString)(nameValue);

          case 7:
            _context.t0 = _context.sent;

          case 8:
            name = _context.t0;
            messageValue = this.object.getValue("message");

            if (!(0, _checks.isUndefined)(messageValue)) {
              _context.next = 14;
              break;
            }

            _context.t1 = "";
            _context.next = 17;
            break;

          case 14:
            _context.next = 16;
            return (0, _native.toString)(messageValue);

          case 16:
            _context.t1 = _context.sent;

          case 17:
            message = _context.t1;

            if (!(name && message)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(name + ": " + message));

          case 20:
            return _context.abrupt("return", factory.createPrimitive(name || message));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Error.prototype.toString"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],215:[function(require,module,exports){
(function (global){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = errorApi;

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _error = require("./error.to-string");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

function errorApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = objectFactory.createObject();
  proto.className = "Error";
  proto.define("name", objectFactory.createPrimitive("Error"));
  proto.define("message", objectFactory.createPrimitive(""));

  var errorClass = objectFactory.createFunction(_regenerator2.default.mark(function _callee(message) {
    var messageString;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            messageString = undefined;

            if ((0, _checks.isNullOrUndefined)(message)) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return (0, _native.toString)(message);

          case 4:
            messageString = _context.sent;

          case 5:
            return _context.abrupt("return", objectFactory.create("Error", new Error(messageString)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), proto, { configurable: false, enumerable: false, writable: false, name: "Error" });

  (0, _error2.default)(proto, env, objectFactory);
  globalObject.define("Error", errorClass);

  errorTypes.forEach(function (errorType) {
    var typeProto = objectFactory.createObject();
    typeProto.define("name", objectFactory.createPrimitive(errorType));

    // add to prototype chain to represent inheritance
    typeProto.setPrototype(proto);

    var errClass = objectFactory.createFunction(_regenerator2.default.mark(function _callee2(message) {
      var messageString, nativeError;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _native.toString)(message);

            case 2:
              messageString = _context2.sent;
              nativeError = new global[errorType](messageString);
              return _context2.abrupt("return", objectFactory.create(errorType, nativeError));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }), typeProto, { configurable: false, enumerable: false, writable: false, name: errorType });

    globalObject.define(errorType, errClass);
  });
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/checks":376,"../../utils/native":379,"./error.to-string":214,"babel-runtime/regenerator":37}],216:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.defineThis = defineThis;

var _primitiveType = require("../../types/primitive-type");

var _checks = require("../../utils/checks");

var _native = require("../../utils/native");

function defineThis(env, fn, thisArg) {
  if (fn.builtIn || fn.isProxy || fn.isStrict()) {
    return thisArg || _primitiveType.UNDEFINED;
  }

  if ((0, _checks.isNullOrUndefined)(thisArg)) {
    return env.global;
  }

  return (0, _native.toObject)(thisArg);
}

},{"../../types/primitive-type":368,"../../utils/checks":376,"../../utils/native":379}],217:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("apply", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(thisArg, argsArray) {
    var args;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!argsArray) {
              _context.next = 3;
              break;
            }

            if (!(argsArray.className !== "Arguments" && argsArray.className !== "Array" && argsArray.className !== "Function")) {
              _context.next = 3;
              break;
            }

            throw TypeError("Arguments list was wrong type");

          case 3:
            _context.next = 5;
            return (0, _native.toArray)(argsArray);

          case 5:
            args = _context.sent;

            thisArg = (0, _functionHelpers.defineThis)(env, this.object, thisArg);
            this.object.bindThis(thisArg);

            return _context.delegateYield(this.object.call(thisArg, args), "t0", 9);

          case 9:
            return _context.abrupt("return", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Function.prototype.apply"));
};

var _native = require("../../utils/native");

var _functionHelpers = require("./function-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"./function-helpers":216,"babel-runtime/regenerator":37}],218:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("bind", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var fn, length, lengthValue, nativeFunc, nameValue, name, boundFunc, thrower;
    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fn = this.object;
            length = 0;

            if (!fn.owns("length")) {
              _context2.next = 9;
              break;
            }

            lengthValue = fn.getValue("length");

            if (!(lengthValue && lengthValue.type === "number")) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return (0, _native.toInteger)(lengthValue);

          case 7:
            length = _context2.sent;

            length = Math.max(length - args.length, 0);

          case 9:

            thisArg = (0, _functionHelpers.defineThis)(env, fn, thisArg);

            nativeFunc = _regenerator2.default.mark(function nativeFunc() {
              for (var _len2 = arguments.length, additionalArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                additionalArgs[_key2] = arguments[_key2];
              }

              var mergedArgs;
              return _regenerator2.default.wrap(function nativeFunc$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      mergedArgs = args.concat(additionalArgs);
                      return _context.delegateYield(fn[this.isNew ? "construct" : "call"](thisArg, mergedArgs), "t0", 2);

                    case 2:
                      return _context.abrupt("return", _context.t0);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, nativeFunc, this);
            });


            nativeFunc.nativeLength = length;
            nativeFunc.strict = env.isStrict() || fn.node && fn.node.body.isStrict();

            nameValue = fn.getValue("name");

            if (!(0, _checks.isUndefined)(nameValue)) {
              _context2.next = 18;
              break;
            }

            _context2.t0 = "";
            _context2.next = 21;
            break;

          case 18:
            _context2.next = 20;
            return (0, _native.toString)(nameValue);

          case 20:
            _context2.t0 = _context2.sent;

          case 21:
            name = _context2.t0;
            boundFunc = factory.createFunction(nativeFunc, null, { name: "bound " + name });

            boundFunc.canConstruct = fn.canConstruct;
            boundFunc.bindScope(this.env.current);
            boundFunc.bindThis(thisArg);
            boundFunc.setPrototype(fn.getPrototype());

            if (!nativeFunc.strict) {
              boundFunc.remove("caller");
              boundFunc.remove("arguments");

              // these will be added in strict mode, but should always be here for bound functions
              thrower = factory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");

              boundFunc.defineProperty("caller", thrower);
              boundFunc.defineProperty("arguments", thrower);
            }

            return _context2.abrupt("return", boundFunc);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this);
  }), 1, "Function.prototype.bind"));
};

var _functionHelpers = require("./function-helpers");

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/native":379,"./function-helpers":216,"babel-runtime/regenerator":37}],219:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("call", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            thisArg = (0, _functionHelpers.defineThis)(env, this.object, thisArg);
            this.object.bindThis(thisArg);

            return _context.delegateYield(this.object.call(thisArg, args), "t0", 3);

          case 3:
            return _context.abrupt("return", _context.t0);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Function.prototype.call"));
};

var _functionHelpers = require("./function-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./function-helpers":216,"babel-runtime/regenerator":37}],220:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "Function", "Function.prototype.toString");

    if (this.object.native) {
      return factory.createPrimitive("function () { [native code] }");
    }

    return factory.createPrimitive("function () { [user code] }");
  }, 0, "Function.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],221:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = functionApi;

var _nativeFunctionType = require("../../types/native-function-type");

var _primitiveType = require("../../types/primitive-type");

var _checks = require("../../utils/checks");

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _function = require("./function.apply");

var _function2 = _interopRequireDefault(_function);

var _function3 = require("./function.bind");

var _function4 = _interopRequireDefault(_function3);

var _function5 = require("./function.call");

var _function6 = _interopRequireDefault(_function5);

var _function7 = require("./function.to-string");

var _function8 = _interopRequireDefault(_function7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function functionApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;
  var options = env.options;


  var funcClass = undefined;

  var funcCtor = _regenerator2.default.mark(function funcCtor() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var funcInstance;
    return _regenerator2.default.wrap(function funcCtor$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            funcInstance = undefined;

            if (!(options.parser && args.length > 0)) {
              _context4.next = 5;
              break;
            }

            return _context4.delegateYield(_regenerator2.default.mark(function _callee2() {
              var body, params, bodyString, ast, callee, userNode, strict, wrappedFunc;
              return _regenerator2.default.wrap(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      body = args.pop();
                      params = "";

                      if (!(args.length > 0)) {
                        _context3.next = 6;
                        break;
                      }

                      _context3.next = 5;
                      return (0, _async.map)(args, _regenerator2.default.mark(function _callee(arg, index) {
                        return _regenerator2.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (!(0, _checks.isNull)(arg)) {
                                  _context.next = 2;
                                  break;
                                }

                                throw SyntaxError("Unexpected token null");

                              case 2:
                                if (!(0, _checks.isUndefined)(arg)) {
                                  _context.next = 6;
                                  break;
                                }

                                _context.t0 = "";
                                _context.next = 9;
                                break;

                              case 6:
                                _context.next = 8;
                                return (0, _native.toString)(arg);

                              case 8:
                                _context.t0 = _context.sent;

                              case 9:
                                return _context.abrupt("return", _context.t0);

                              case 10:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      }));

                    case 5:
                      params = _context3.sent.
                      // the spec allows parameters to be comma-delimited, so we will join and split again comma
                      join(",");

                    case 6:
                      _context3.next = 8;
                      return (0, _native.toString)(body);

                    case 8:
                      bodyString = _context3.sent;
                      ast = options.parser("(function(" + params + "){" + bodyString + "}).apply($this,$args);");
                      callee = ast.body[0].expression.callee.object;
                      userNode = callee.body.body;
                      strict = (0, _checks.isStrictNode)(userNode);
                      wrappedFunc = _regenerator2.default.mark(function wrappedFunc() {
                        var thisArg,
                            $args,
                            executionResult,
                            _args2 = arguments;
                        return _regenerator2.default.wrap(function wrappedFunc$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                thisArg = undefined;

                                if (this.isNew) {
                                  thisArg = objectFactory.createObject(funcInstance);
                                } else {
                                  thisArg = this.object;

                                  if (!strict && (0, _checks.isUndefined)(thisArg)) {
                                    thisArg = globalObject;
                                  }
                                }

                                env.createVariable("$this").setValue(thisArg);

                                $args = objectFactory.createArray(_args2);

                                env.createVariable("$args").setValue($args);

                                _context2.next = 7;
                                return this.execute(ast);

                              case 7:
                                executionResult = _context2.sent;

                                if (!this.isNew) {
                                  _context2.next = 10;
                                  break;
                                }

                                return _context2.abrupt("return", thisArg);

                              case 10:
                                return _context2.abrupt("return", executionResult && executionResult.result || _primitiveType.UNDEFINED);

                              case 11:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, wrappedFunc, this);
                      });


                      wrappedFunc.nativeLength = callee.params.length;
                      wrappedFunc.strict = strict;
                      funcInstance = objectFactory.createFunction(wrappedFunc, undefined, { strict: strict, name: "anonymous" });
                      funcInstance.bindScope(env.globalScope);

                    case 18:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee2, _this);
            })(), "t0", 3);

          case 3:
            _context4.next = 6;
            break;

          case 5:
            funcInstance = objectFactory.createFunction(function () {}, undefined, { name: "anonymous" });

          case 6:

            funcInstance.setValue("constructor", funcClass);
            return _context4.abrupt("return", funcInstance);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, funcCtor, this);
  });

  // the prototype of a function is actually callable and evaluates as a function
  var proto = new _nativeFunctionType.NativeFunctionType(function () {
    if (this.isNew) {
      throw TypeError("Function.protoype is not a constructor");
    }

    return _primitiveType.UNDEFINED;
  });

  proto[(0, _for2.default)("env")] = env;

  funcCtor.nativeLength = 1;
  funcClass = objectFactory.createFunction(funcCtor, proto, { configurable: false, enumerable: false, writable: false, name: "Function" });
  funcClass.setValue("constructor", funcClass);

  globalObject.define("Function", funcClass);

  proto.define("length", objectFactory.createPrimitive(0), { writable: false });
  proto.define("name", objectFactory.createPrimitive(""), { writable: false });

  // function itself is a function
  funcClass.setPrototype(proto);

  (0, _function2.default)(proto, env, objectFactory);
  (0, _function4.default)(proto, env, objectFactory);
  (0, _function6.default)(proto, env, objectFactory);
  (0, _function8.default)(proto, env, objectFactory);

  var thrower = function thrower() {
    if (this.isStrict()) {
      throw TypeError("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
    }

    return undefined;
  };

  var throwerFunc = objectFactory.createBuiltInFunction(thrower);

  var prop = {
    get: throwerFunc,
    getter: thrower,
    set: throwerFunc,
    setter: thrower,
    enumerable: false,
    configurable: true
  };

  proto.defineProperty("caller", prop);
  proto.defineProperty("callee", prop);
  proto.defineProperty("arguments", prop);
}

},{"../../types/native-function-type":365,"../../types/primitive-type":368,"../../utils/async":375,"../../utils/checks":376,"../../utils/native":379,"./function.apply":217,"./function.bind":218,"./function.call":219,"./function.to-string":220,"babel-runtime/core-js/symbol/for":34,"babel-runtime/regenerator":37}],222:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  var parser = env.options.parser;

  function createScope(body, directCall) {
    var strictScope = env.isStrict();
    var strictCode = strictScope || (0, _checks.isStrictNode)(body);
    var inGlobal = env.current.scope.parent === env.globalScope.scope;

    // use the same scope unless this is an "indirect" call
    // in which case we use the global scope
    if (directCall) {
      if (strictCode) {
        var thisArg = undefined;
        if (strictScope) {
          thisArg = inGlobal ? $target : _primitiveType.UNDEFINED;
        } else {
          thisArg = env.getThisBinding() || $target;
        }

        return env.createScope(thisArg);
      }

      return env.setScope(env.current.scope.parent);
    }

    var scope = env.setScope(env.globalScope.scope);
    if (strictCode) {
      scope = env.createScope($target);
    }

    return scope;
  }

  function isDirectCall(context) {
    return context.callee instanceof _reference.Reference && context.callee.base === $target;
  }

  $target.define("eval", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2(code) {
    var ast, scope, context, executionResult;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (code) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", _primitiveType.UNDEFINED);

          case 2:
            if (!(code.type !== "string")) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", code);

          case 4:
            ast = undefined;
            _context2.prev = 5;

            ast = parser(code.value);
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](5);

            if (!(_context2.t0 instanceof SyntaxError && /assigning to rvalue/i.test(_context2.t0.message))) {
              _context2.next = 13;
              break;
            }

            throw ReferenceError("Invalid left-hand side in assignment");

          case 13:
            throw _context2.t0;

          case 14:
            scope = createScope(ast.body, isDirectCall(this));
            context = this;
            _context2.next = 18;
            return scope.use(_regenerator2.default.mark(function _callee() {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return context.execute(ast);

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

          case 18:
            executionResult = _context2.sent;
            return _context2.abrupt("return", executionResult && executionResult.result ? executionResult.result.getValue() : _primitiveType.UNDEFINED);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 9]]);
  }), 1, "eval"));
};

var _reference = require("../env/reference");

var _checks = require("../utils/checks");

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../env/reference":180,"../types/primitive-type":368,"../utils/checks":376,"babel-runtime/regenerator":37}],223:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("isFinite", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
    var numberValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toNumber)(value);

          case 2:
            numberValue = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(isFinite(numberValue)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "isFinite"));
};

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/regenerator":37}],224:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("isNaN", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
    var numberValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toNumber)(value);

          case 2:
            numberValue = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(isNaN(numberValue)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "isNaN"));
};

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/regenerator":37}],225:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("parseInt", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value, radix) {
    var stringValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toString)(value);

          case 2:
            stringValue = _context.sent;
            _context.next = 5;
            return (0, _native.toPrimitive)(radix, "number");

          case 5:
            radix = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(parseInt(stringValue, radix)));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "parseInt"));
};

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/regenerator":37}],226:[function(require,module,exports){
(function (global){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;
  var options = env.options;


  globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false });
  globalObject.define("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false });

  ["parseFloat", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"].forEach(function (name) {
    globalObject.define(name, objectFactory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
      var stringValue;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _native.toString)(value);

            case 2:
              stringValue = _context.sent;
              return _context.abrupt("return", objectFactory.createPrimitive(global[name](stringValue)));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }), 1, name));
  });

  (0, _global4.default)(globalObject, env, objectFactory);
  (0, _global6.default)(globalObject, env, objectFactory);
  (0, _global8.default)(globalObject, env, objectFactory);

  if (options.parser) {
    (0, _global2.default)(globalObject, env, objectFactory);
  }
};

var _native = require("../utils/native");

var _global = require("./global.eval");

var _global2 = _interopRequireDefault(_global);

var _global3 = require("./global.is-finite");

var _global4 = _interopRequireDefault(_global3);

var _global5 = require("./global.is-nan");

var _global6 = _interopRequireDefault(_global5);

var _global7 = require("./global.parse-int");

var _global8 = _interopRequireDefault(_global7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/native":379,"./global.eval":222,"./global.is-finite":223,"./global.is-nan":224,"./global.parse-int":225,"babel-runtime/regenerator":37}],227:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = ecma51;

var _primitiveType = require("../types/primitive-type");

var _objectFactory = require("../types/object-factory");

var _number = require("./number/");

var _number2 = _interopRequireDefault(_number);

var _string = require("./string/");

var _string2 = _interopRequireDefault(_string);

var _function = require("./function/");

var _function2 = _interopRequireDefault(_function);

var _object = require("./object/");

var _object2 = _interopRequireDefault(_object);

var _boolean = require("./boolean/");

var _boolean2 = _interopRequireDefault(_boolean);

var _date = require("./date/");

var _date2 = _interopRequireDefault(_date);

var _array = require("./array/");

var _array2 = _interopRequireDefault(_array);

var _math = require("./math/");

var _math2 = _interopRequireDefault(_math);

var _regex = require("./regex/");

var _regex2 = _interopRequireDefault(_regex);

var _error = require("./error/");

var _error2 = _interopRequireDefault(_error);

var _json = require("./json/");

var _json2 = _interopRequireDefault(_json);

var _console = require("./console/");

var _console2 = _interopRequireDefault(_console);

var _globals = require("./globals");

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frozen = { configurable: false, enumerable: false, writable: false };

function ecma51(env) {
  var objectFactory = env.objectFactory = new _objectFactory.ObjectFactory(env);
  var globalObject = env.global = objectFactory.createObject();

  env.createObjectScope(globalObject);

  globalObject.define("undefined", _primitiveType.UNDEFINED, frozen);
  globalObject.define("null", _primitiveType.NULL, frozen);

  // todo: node vs browser - do we care?
  globalObject.define("window", globalObject, frozen);

  (0, _function2.default)(env);
  (0, _object2.default)(env);
  (0, _array2.default)(env);
  (0, _boolean2.default)(env);
  (0, _number2.default)(env);
  (0, _string2.default)(env);
  (0, _date2.default)(env);
  (0, _regex2.default)(env);
  (0, _math2.default)(env);
  (0, _error2.default)(env);
  (0, _json2.default)(env);
  (0, _console2.default)(env);
  (0, _globals2.default)(env);
}

},{"../types/object-factory":366,"../types/primitive-type":368,"./array/":205,"./boolean/":208,"./console/":209,"./date/":213,"./error/":215,"./function/":221,"./globals":226,"./json/":228,"./math/":231,"./number/":232,"./object/":236,"./regex/":256,"./string/":260}],228:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = jsonApi;

var _json = require("./json.parse");

var _json2 = _interopRequireDefault(_json);

var _json3 = require("./json.stringify");

var _json4 = _interopRequireDefault(_json3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jsonApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var jsonClass = objectFactory.createObject();
  jsonClass.className = "JSON";

  (0, _json2.default)(jsonClass, env, objectFactory);
  (0, _json4.default)(jsonClass, env, objectFactory);

  globalObject.define("JSON", jsonClass);
}

},{"./json.parse":229,"./json.stringify":230}],229:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  var _marked = [deserialize].map(_regenerator2.default.mark);

  function createReviver(reviver) {
    if (reviver && reviver.className === "Function") {
      return _regenerator2.default.mark(function _callee(holder, key, value) {
        var args;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                args = [factory.createPrimitive(key), value];
                return _context.delegateYield(reviver.call(holder, args), "t0", 2);

              case 2:
                return _context.abrupt("return", _context.t0);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      });
    }

    return function (holder, key, value) {
      return value;
    };
  }

  function deserialize(value, reviver) {
    var valueType, arr, i, ln, element, elementValue, obj, propValue, prop;
    return _regenerator2.default.wrap(function deserialize$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            valueType = (0, _helpers.getNativeType)(value);
            _context2.t0 = valueType;
            _context2.next = _context2.t0 === "Undefined" ? 4 : _context2.t0 === "Null" ? 4 : _context2.t0 === "String" ? 4 : _context2.t0 === "Number" ? 4 : _context2.t0 === "Boolean" ? 4 : _context2.t0 === "Array" ? 5 : 28;
            break;

          case 4:
            return _context2.abrupt("return", factory.create(valueType, value));

          case 5:
            arr = factory.createArray();
            i = 0, ln = value.length;

          case 7:
            if (!(i < ln)) {
              _context2.next = 27;
              break;
            }

            element = value[i];
            _context2.t1 = arr;
            _context2.t2 = String(i);
            _context2.next = 13;
            return deserialize(element, reviver);

          case 13:
            _context2.t3 = _context2.sent;
            _context2.next = 16;
            return reviver(_context2.t1, _context2.t2, _context2.t3);

          case 16:
            elementValue = _context2.sent;

            if ((0, _checks.isUndefined)(elementValue)) {
              _context2.next = 24;
              break;
            }

            _context2.t4 = arr;
            _context2.t5 = i;
            _context2.next = 22;
            return deserialize(element);

          case 22:
            _context2.t6 = _context2.sent;

            _context2.t4.setIndex.call(_context2.t4, _context2.t5, _context2.t6);

          case 24:
            i++;
            _context2.next = 7;
            break;

          case 27:
            return _context2.abrupt("return", arr);

          case 28:
            obj = factory.createObject();
            propValue = undefined;
            _context2.t7 = _regenerator2.default.keys(value);

          case 31:
            if ((_context2.t8 = _context2.t7()).done) {
              _context2.next = 45;
              break;
            }

            prop = _context2.t8.value;

            if (!value.hasOwnProperty(prop)) {
              _context2.next = 43;
              break;
            }

            _context2.t9 = obj;
            _context2.t10 = prop;
            _context2.next = 38;
            return deserialize(value[prop], reviver);

          case 38:
            _context2.t11 = _context2.sent;
            _context2.next = 41;
            return reviver(_context2.t9, _context2.t10, _context2.t11);

          case 41:
            propValue = _context2.sent;

            if (!(0, _checks.isUndefined)(propValue)) {
              obj.defineProperty(prop, { value: propValue, configurable: true, enumerable: true, writable: true });
            }

          case 43:
            _context2.next = 31;
            break;

          case 45:
            return _context2.abrupt("return", obj);

          case 46:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked[0], this);
  }

  $target.define("parse", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2(str, reviver) {
    var stringValue, parsedObject, deserializedObject;
    return _regenerator2.default.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            reviver = createReviver(reviver);

            _context3.next = 3;
            return (0, _native.toString)(str);

          case 3:
            stringValue = _context3.sent;
            parsedObject = JSON.parse(stringValue);
            _context3.next = 7;
            return deserialize(parsedObject, reviver);

          case 7:
            deserializedObject = _context3.sent;
            _context3.next = 10;
            return reviver(deserializedObject, "", deserializedObject) || _primitiveType.UNDEFINED;

          case 10:
            return _context3.abrupt("return", _context3.sent);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, this);
  }), 2, "JSON.parse"));
};

var _primitiveType = require("../../types/primitive-type");

var _checks = require("../../utils/checks");

var _native = require("../../utils/native");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/checks":376,"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/regenerator":37}],230:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function ($target, env, factory) {
  var _marked = [serialize, serializeObject, serializeArray, createReplacer, getSpacer].map(_regenerator2.default.mark);

  var serializePrimitive = _stringify2.default;

  function serialize(stack, obj, replacer, gap, depth) {
    var toJson, jsonString, jsonResult;
    return _regenerator2.default.wrap(function serialize$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (obj) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", serializePrimitive());

          case 2:
            if (!(obj.isPrimitive || primitives[obj.className])) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", serializePrimitive(obj.value));

          case 4:
            if (!ignored[obj.className]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", undefined);

          case 6:
            toJson = (0, _helpers.getMethod)(obj, "toJSON");

            if (!toJson) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return toJson.call(obj);

          case 10:
            jsonString = _context.sent;
            return _context.abrupt("return", serializePrimitive(jsonString.toNative()));

          case 12:
            if (!(stack.indexOf(obj) >= 0)) {
              _context.next = 14;
              break;
            }

            throw TypeError("Converting circular structure to JSON");

          case 14:

            depth++;
            stack.push(obj);

            jsonResult = undefined;

            if (!(obj.className === "Array")) {
              _context.next = 23;
              break;
            }

            _context.next = 20;
            return serializeArray(stack, obj, replacer);

          case 20:
            jsonResult = _context.sent;
            _context.next = 26;
            break;

          case 23:
            _context.next = 25;
            return serializeObject(stack, obj, replacer, gap, depth);

          case 25:
            jsonResult = _context.sent;

          case 26:

            depth--;
            stack.pop();
            return _context.abrupt("return", jsonResult);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function formatValues(values, gap, depth) {
    if (values.length === 0) {
      return "";
    }

    if (!gap) {
      return values.join(",");
    }

    var indent = "\n" + (0, _repeat2.default)(gap, depth);
    var joinedValues = values.join(indent + ",");

    // remove indent on closing
    return "" + indent + joinedValues + "\n" + (0, _repeat2.default)(gap, depth - 1);
  }

  function serializeObject(stack, obj, replacer, gap, depth) {
    var colon, values, value, keys, _iterator, _isArray, _i, _ref, key, desc;

    return _regenerator2.default.wrap(function serializeObject$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            colon = gap ? ": " : ":";
            values = [];
            value = undefined;
            keys = obj.getOwnPropertyKeys("String");
            _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 5:
            if (!_isArray) {
              _context2.next = 11;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("break", 31);

          case 8:
            _ref = _iterator[_i++];
            _context2.next = 15;
            break;

          case 11:
            _i = _iterator.next();

            if (!_i.done) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("break", 31);

          case 14:
            _ref = _i.value;

          case 15:
            key = _ref;
            desc = obj.getOwnProperty(key);

            if (!desc.enumerable) {
              _context2.next = 29;
              break;
            }

            _context2.next = 20;
            return replacer(obj, key, obj.getValue(key));

          case 20:
            value = _context2.sent;

            if (!(!(0, _checks.isNullOrUndefined)(value) && !ignored[value.className])) {
              _context2.next = 29;
              break;
            }

            _context2.t0 = values;
            _context2.t1 = serializePrimitive(key) + colon;
            _context2.next = 26;
            return serialize(stack, value, replacer, gap, depth);

          case 26:
            _context2.t2 = _context2.sent;
            _context2.t3 = _context2.t1 + _context2.t2;

            _context2.t0.push.call(_context2.t0, _context2.t3);

          case 29:
            _context2.next = 5;
            break;

          case 31:
            return _context2.abrupt("return", "{" + formatValues(values, gap, depth, gap, depth) + "}");

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function serializeArray(stack, arr, replacer, gap, depth) {
    var length, values, i, value;
    return _regenerator2.default.wrap(function serializeArray$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            length = arr.getValue("length").toNative();
            values = [];
            i = 0;

          case 3:
            if (!(i < length)) {
              _context3.next = 21;
              break;
            }

            value = undefined;

            if (!arr.has(i)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return replacer(arr, String(i), arr.getValue(i));

          case 8:
            value = _context3.sent;

          case 9:
            if (!((0, _checks.isNullOrUndefined)(value) || ignored[value.className])) {
              _context3.next = 13;
              break;
            }

            // undefined positions are replaced with null
            values.push("null");
            _context3.next = 18;
            break;

          case 13:
            _context3.t0 = values;
            _context3.next = 16;
            return serialize(stack, value, replacer);

          case 16:
            _context3.t1 = _context3.sent;

            _context3.t0.push.call(_context3.t0, _context3.t1);

          case 18:
            i++;
            _context3.next = 3;
            break;

          case 21:
            return _context3.abrupt("return", "[" + formatValues(values, gap, depth) + "]");

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function createReplacer(replacer) {
    var _this = this;

    var _ret;

    return _regenerator2.default.wrap(function createReplacer$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!replacer) {
              _context7.next = 8;
              break;
            }

            if (!(replacer.className === "Function")) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", _regenerator2.default.mark(function _callee(holder, key, value) {
              var args;
              return _regenerator2.default.wrap(function _callee$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      args = [factory.createPrimitive(key), value];
                      _context4.next = 3;
                      return replacer.call(holder, args);

                    case 3:
                      return _context4.abrupt("return", _context4.sent);

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee, this);
            }));

          case 3:
            if (!(replacer.className === "Array")) {
              _context7.next = 8;
              break;
            }

            return _context7.delegateYield(_regenerator2.default.mark(function _callee3() {
              var arr, keys;
              return _regenerator2.default.wrap(function _callee3$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return (0, _native.toArray)(replacer);

                    case 2:
                      arr = _context6.sent;
                      return _context6.delegateYield((0, _async.map)(arr, _regenerator2.default.mark(function _callee2(arg) {
                        return _regenerator2.default.wrap(function _callee2$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                if (!(arg.className === "String")) {
                                  _context5.next = 4;
                                  break;
                                }

                                _context5.next = 3;
                                return (0, _native.toString)(arg);

                              case 3:
                                return _context5.abrupt("return", _context5.sent);

                              case 4:
                                if (!(arg.className === "Number")) {
                                  _context5.next = 9;
                                  break;
                                }

                                _context5.next = 7;
                                return (0, _native.toNumber)(arg);

                              case 7:
                                _context5.t0 = _context5.sent;
                                return _context5.abrupt("return", String(_context5.t0));

                              case 9:
                                return _context5.abrupt("return", undefined);

                              case 10:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, _callee2, this);
                      })), "t0", 4);

                    case 4:
                      keys = _context6.t0;
                      return _context6.abrupt("return", {
                        v: function v(holder, key, value) {
                          // allow empty key - this will be from the root
                          if (!key || keys.indexOf(key) >= 0) {
                            return value;
                          }

                          return undefined;
                        }
                      });

                    case 6:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee3, _this);
            })(), "t0", 5);

          case 5:
            _ret = _context7.t0;

            if (!((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object")) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", _ret.v);

          case 8:
            return _context7.abrupt("return", function (holder, key, value) {
              return value;
            });

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _marked[3], this);
  }

  function getSpacer(spacer) {
    var count, gap;
    return _regenerator2.default.wrap(function getSpacer$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!spacer) {
              _context8.next = 16;
              break;
            }

            if (!(spacer.className === "Number")) {
              _context8.next = 11;
              break;
            }

            _context8.t0 = Math;
            _context8.next = 5;
            return (0, _native.toNumber)(spacer);

          case 5:
            _context8.t1 = _context8.sent;
            count = _context8.t0.floor.call(_context8.t0, _context8.t1);

            count = Math.max(Math.min(10, count), 0);

            if (!(count > 0)) {
              _context8.next = 10;
              break;
            }

            return _context8.abrupt("return", (0, _repeat2.default)(" ", count));

          case 10:
            return _context8.abrupt("return", "");

          case 11:
            if (!(spacer.className === "String")) {
              _context8.next = 16;
              break;
            }

            _context8.next = 14;
            return (0, _native.toString)(spacer);

          case 14:
            gap = _context8.sent;
            return _context8.abrupt("return", gap.substr(0, 10));

          case 16:
            return _context8.abrupt("return", "");

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _marked[4], this);
  }

  $target.define("stringify", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee4(obj, replacer, spacer) {
    var stack;
    return _regenerator2.default.wrap(function _callee4$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return createReplacer(replacer);

          case 2:
            replacer = _context9.sent;
            _context9.next = 5;
            return getSpacer(spacer);

          case 5:
            spacer = _context9.sent;
            _context9.next = 8;
            return replacer(obj, "", obj);

          case 8:
            obj = _context9.sent;

            if (!(0, _checks.isUndefined)(obj)) {
              _context9.next = 11;
              break;
            }

            return _context9.abrupt("return", _primitiveType.UNDEFINED);

          case 11:
            stack = [];
            _context9.t0 = factory;
            _context9.next = 15;
            return serialize(stack, obj, replacer, spacer, 0);

          case 15:
            _context9.t1 = _context9.sent;
            return _context9.abrupt("return", _context9.t0.createPrimitive.call(_context9.t0, _context9.t1));

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee4, this);
  }), 3, "JSON.stringify"));
};

var _repeat = require("babel-runtime/core-js/string/repeat");

var _repeat2 = _interopRequireDefault(_repeat);

var _primitiveType = require("../../types/primitive-type");

var _checks = require("../../utils/checks");

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var primitives = {
  "String": true,
  "Number": true,
  "Boolean": true,
  "Date": true
};

var ignored = {
  "Function": true,
  "Symbol": true
};

},{"../../types/primitive-type":368,"../../utils/async":375,"../../utils/checks":376,"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/json/stringify":3,"babel-runtime/core-js/string/repeat":32,"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37}],231:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = mathApi;

var _native = require("../../utils/native");

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
    mathClass.define(name, (0, _native.toNativeFunction)(env, Math[name], "Math." + name));
  });

  globalObject.define("Math", mathClass);
}

},{"../../utils/native":379}],232:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = numberApi;

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _number = require("./number.to-fixed");

var _number2 = _interopRequireDefault(_number);

var _number3 = require("./number.to-string");

var _number4 = _interopRequireDefault(_number3);

var _number5 = require("./number.value-of");

var _number6 = _interopRequireDefault(_number5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function numberApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = objectFactory.createObject();
  proto.className = "Number";
  proto.value = 0;

  var numberClass = objectFactory.createFunction(_regenerator2.default.mark(function _callee(value) {
    var numberValue, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toPrimitive)(value, "number");

          case 2:
            _context.t0 = _context.sent;
            numberValue = Number(_context.t0);
            obj = objectFactory.create("Number", numberValue);

            if (!this.isNew) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", obj.toObject());

          case 7:
            return _context.abrupt("return", obj);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), proto, { configurable: false, enumerable: false, writable: false, name: "Number" });

  ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"].forEach(function (name) {
    numberClass.define(name, objectFactory.createPrimitive(Number[name]), { configurable: false, enumerable: false, writable: false });
  });

  (0, _number2.default)(proto, env, objectFactory);
  (0, _number4.default)(proto, env, objectFactory);
  (0, _number6.default)(proto, env, objectFactory);

  ["toExponential", "toPrecision", "toLocaleString"].forEach(function (name) {
    var fn = Number.prototype[name];
    if (fn) {
      (function () {
        var methodName = "Number.prototype." + name;
        proto.define(name, objectFactory.createBuiltInFunction(function () {
          (0, _contracts.assertIsNotGeneric)(this.object, "Number", methodName);
          return objectFactory.createPrimitive(fn.call(this.object.value));
        }, fn.length, methodName));
      })();
    }
  });

  globalObject.define("Number", numberClass);
}

},{"../../utils/contracts":377,"../../utils/native":379,"./number.to-fixed":233,"./number.to-string":234,"./number.value-of":235,"babel-runtime/regenerator":37}],233:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("toFixed", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(fractionDigits) {
    var digits;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotGeneric)(this.object, "Number", "Number.prototype.toFixed");

            digits = 0;

            if (!fractionDigits) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return (0, _native.toNumber)(fractionDigits);

          case 5:
            digits = _context.sent;

          case 6:
            return _context.abrupt("return", factory.createPrimitive(Number.prototype.toFixed.call(this.object.value, digits)));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Number.prototype.toFixed"));
};

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"../../utils/native":379,"babel-runtime/regenerator":37}],234:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(radix) {
    var radixValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotGeneric)(this.object, "Number", "Number.prototype.toString");

            radixValue = 10;

            if (!radix) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return (0, _native.toPrimitive)(radix, "number");

          case 5:
            radixValue = _context.sent;

            if (!(radixValue < 2 || radixValue > 36)) {
              _context.next = 8;
              break;
            }

            throw RangeError("toString() radix argument must be between 2 and 36");

          case 8:
            return _context.abrupt("return", factory.createPrimitive(this.object.value == null ? "0" : this.object.value.toString(radixValue)));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Number.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"../../utils/native":379,"babel-runtime/regenerator":37}],235:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "Number", "Number.prototype.valueOf");
    return factory.createPrimitive(this.object.value == null ? 0 : this.object.value);
  }, 0, "Number.prototype.valueOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],236:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = objectApi;

var _objectType = require("../../types/object-type");

var _object = require("./object.create");

var _object2 = _interopRequireDefault(_object);

var _object3 = require("./object.define-properties");

var _object4 = _interopRequireDefault(_object3);

var _object5 = require("./object.define-property");

var _object6 = _interopRequireDefault(_object5);

var _object7 = require("./object.freeze");

var _object8 = _interopRequireDefault(_object7);

var _object9 = require("./object.get-own-property-descriptor");

var _object10 = _interopRequireDefault(_object9);

var _object11 = require("./object.get-own-property-names");

var _object12 = _interopRequireDefault(_object11);

var _object13 = require("./object.get-prototype-of");

var _object14 = _interopRequireDefault(_object13);

var _object15 = require("./object.is-extensible");

var _object16 = _interopRequireDefault(_object15);

var _object17 = require("./object.is-frozen");

var _object18 = _interopRequireDefault(_object17);

var _object19 = require("./object.is-sealed");

var _object20 = _interopRequireDefault(_object19);

var _object21 = require("./object.keys");

var _object22 = _interopRequireDefault(_object21);

var _object23 = require("./object.prevent-extensions");

var _object24 = _interopRequireDefault(_object23);

var _object25 = require("./object.seal");

var _object26 = _interopRequireDefault(_object25);

var _object27 = require("./object.has-own-property");

var _object28 = _interopRequireDefault(_object27);

var _object29 = require("./object.is-prototype-of");

var _object30 = _interopRequireDefault(_object29);

var _object31 = require("./object.property-is-enumerable");

var _object32 = _interopRequireDefault(_object31);

var _object33 = require("./object.to-string");

var _object34 = _interopRequireDefault(_object33);

var _object35 = require("./object.value-of");

var _object36 = _interopRequireDefault(_object35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function objectApi(env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = new _objectType.ObjectType();
  var objectClass = objectFactory.createFunction(function (value) {
    if (value) {
      if (value.isPrimitive) {
        if (value.value == null) {
          return objectFactory.createObject();
        }

        return value.toObject();
      }

      if (value.isSymbol) {
        // should return a new symbol instance
        var instance = objectFactory.create("Symbol", value.description);
        instance.type = "object";
        return instance;
      }

      // if an object is passed in just return
      return value;
    }

    return objectFactory.createObject();
  }, proto, { configurable: false, enumerable: false, writable: false, name: "Object" });

  (0, _object28.default)(proto, env, objectFactory);
  (0, _object30.default)(proto, env, objectFactory);
  (0, _object34.default)(proto, env, objectFactory);
  (0, _object36.default)(proto, env, objectFactory);

  (0, _object2.default)(objectClass, env, objectFactory);
  (0, _object6.default)(objectClass, env, objectFactory);
  (0, _object4.default)(objectClass, env, objectFactory);
  (0, _object8.default)(objectClass, env, objectFactory);
  (0, _object10.default)(objectClass, env, objectFactory);
  (0, _object12.default)(objectClass, env, objectFactory);
  (0, _object14.default)(objectClass, env, objectFactory);
  (0, _object16.default)(objectClass, env, objectFactory);
  (0, _object18.default)(objectClass, env, objectFactory);
  (0, _object20.default)(objectClass, env, objectFactory);
  (0, _object22.default)(objectClass, env, objectFactory);
  (0, _object24.default)(objectClass, env, objectFactory);
  (0, _object32.default)(proto, env, objectFactory);
  (0, _object26.default)(objectClass, env, objectFactory);

  // function is an object - make sure that it is in the prototype chain
  globalObject.getValue("Function").getPrototype().setPrototype(proto);
  globalObject.define("Object", objectClass);
}

},{"../../types/object-type":367,"./object.create":238,"./object.define-properties":239,"./object.define-property":240,"./object.freeze":241,"./object.get-own-property-descriptor":242,"./object.get-own-property-names":243,"./object.get-prototype-of":244,"./object.has-own-property":245,"./object.is-extensible":246,"./object.is-frozen":247,"./object.is-prototype-of":248,"./object.is-sealed":249,"./object.keys":250,"./object.prevent-extensions":251,"./object.property-is-enumerable":252,"./object.seal":253,"./object.to-string":254,"./object.value-of":255}],237:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.defineProperty = defineProperty;
exports.confirmObject = confirmObject;
exports.getOwnPropertyDescriptor = getOwnPropertyDescriptor;

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [defineProperty, getOwnPropertyDescriptor].map(_regenerator2.default.mark);

function defineProperty(env, obj, key, descriptor) {
  var _this = this;

  var throwOnError = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
  var stringValue, options;
  return _regenerator2.default.wrap(function defineProperty$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if ((0, _checks.isObject)(descriptor)) {
            _context8.next = 5;
            break;
          }

          _context8.next = 3;
          return (0, _native.toString)(descriptor);

        case 3:
          stringValue = _context8.sent;
          throw TypeError("Property description must be an object: " + stringValue);

        case 5:
          options = (0, _create2.default)(null);

          if (!descriptor) {
            _context8.next = 8;
            break;
          }

          return _context8.delegateYield(_regenerator2.default.mark(function _callee7() {
            var hasValue, hasGetter, hasSetter, currentScope;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    hasValue = descriptor.has("value");
                    hasGetter = descriptor.has("get");
                    hasSetter = descriptor.has("set");

                    if (!((hasValue || descriptor.has("writable")) && (hasGetter || hasSetter))) {
                      _context7.next = 5;
                      break;
                    }

                    throw TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");

                  case 5:

                    ["writable", "enumerable", "configurable"].forEach(function (prop) {
                      if (descriptor.has(prop)) {
                        var attrValue = descriptor.getValue(prop);
                        options[prop] = (0, _native.toBoolean)(attrValue);
                      }
                    });

                    currentScope = env.current.scope;

                    // we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`

                    if (!hasGetter) {
                      _context7.next = 9;
                      break;
                    }

                    return _context7.delegateYield(_regenerator2.default.mark(function _callee3() {
                      var getter, stringValue;
                      return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              getter = descriptor.getValue("get") || _primitiveType.UNDEFINED;

                              if (!(getter.isPrimitive && getter.value === undefined)) {
                                _context3.next = 5;
                                break;
                              }

                              options.get = options.getter = undefined;
                              _context3.next = 12;
                              break;

                            case 5:
                              if (!(getter.className !== "Function")) {
                                _context3.next = 10;
                                break;
                              }

                              _context3.next = 8;
                              return (0, _native.toString)(getter);

                            case 8:
                              stringValue = _context3.sent;
                              throw TypeError("Getter must be a function: " + stringValue);

                            case 10:

                              options.get = getter;
                              options.getter = _regenerator2.default.mark(function _callee2() {
                                var scope, thisArg;
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        scope = env.setScope(currentScope);
                                        thisArg = getter.isStrict() ? this : (0, _native.toObject)(this);
                                        _context2.next = 4;
                                        return scope.use(_regenerator2.default.mark(function _callee() {
                                          return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                              switch (_context.prev = _context.next) {
                                                case 0:
                                                  _context.next = 2;
                                                  return getter.call(thisArg) || _primitiveType.UNDEFINED;

                                                case 2:
                                                  return _context.abrupt("return", _context.sent);

                                                case 3:
                                                case "end":
                                                  return _context.stop();
                                              }
                                            }
                                          }, _callee, this);
                                        }));

                                      case 4:
                                        return _context2.abrupt("return", _context2.sent);

                                      case 5:
                                      case "end":
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2, this);
                              });

                            case 12:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this);
                    })(), "t0", 9);

                  case 9:
                    if (!hasSetter) {
                      _context7.next = 11;
                      break;
                    }

                    return _context7.delegateYield(_regenerator2.default.mark(function _callee6() {
                      var setter, _stringValue;

                      return _regenerator2.default.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              setter = descriptor.getValue("set") || _primitiveType.UNDEFINED;

                              if (!(setter.isPrimitive && setter.value === undefined)) {
                                _context6.next = 5;
                                break;
                              }

                              options.set = options.setter = undefined;
                              _context6.next = 12;
                              break;

                            case 5:
                              if (!(setter.className !== "Function")) {
                                _context6.next = 10;
                                break;
                              }

                              _context6.next = 8;
                              return (0, _native.toString)(setter);

                            case 8:
                              _stringValue = _context6.sent;
                              throw TypeError("Setter must be a function: " + _stringValue);

                            case 10:

                              options.set = setter;
                              options.setter = _regenerator2.default.mark(function _callee5(value) {
                                var scope, thisArg;
                                return _regenerator2.default.wrap(function _callee5$(_context5) {
                                  while (1) {
                                    switch (_context5.prev = _context5.next) {
                                      case 0:
                                        scope = env.setScope(currentScope);
                                        thisArg = setter.isStrict() ? this : (0, _native.toObject)(this);
                                        _context5.next = 4;
                                        return scope.use(_regenerator2.default.mark(function _callee4() {
                                          return _regenerator2.default.wrap(function _callee4$(_context4) {
                                            while (1) {
                                              switch (_context4.prev = _context4.next) {
                                                case 0:
                                                  _context4.next = 2;
                                                  return setter.call(thisArg, [value]);

                                                case 2:
                                                  return _context4.abrupt("return", _primitiveType.UNDEFINED);

                                                case 3:
                                                case "end":
                                                  return _context4.stop();
                                              }
                                            }
                                          }, _callee4, this);
                                        }));

                                      case 4:
                                        return _context5.abrupt("return", _context5.sent);

                                      case 5:
                                      case "end":
                                        return _context5.stop();
                                    }
                                  }
                                }, _callee5, this);
                              });

                            case 12:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this);
                    })(), "t1", 11);

                  case 11:

                    if (hasValue) {
                      options.value = descriptor.getValue("value") || _primitiveType.UNDEFINED;
                    }

                  case 12:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, _this);
          })(), "t0", 8);

        case 8:
          return _context8.abrupt("return", obj.defineProperty(key, options, throwOnError, env));

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked[0], this);
}

function confirmObject(obj, methodName, ecmaVersion) {
  if ((0, _checks.isObject)(obj)) {
    return true;
  }

  if (ecmaVersion > 5) {
    return false;
  }

  throw TypeError(methodName + " called on non-object");
}

function getOwnPropertyDescriptor(env, target, propertyKey) {
  var key, descriptor, result;
  return _regenerator2.default.wrap(function getOwnPropertyDescriptor$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _native.toPropertyKey)(propertyKey);

        case 2:
          key = _context9.sent;
          descriptor = target.getOwnProperty(key);

          if (!descriptor) {
            _context9.next = 10;
            break;
          }

          result = env.objectFactory.createObject();

          if (descriptor.dataProperty) {
            result.setValue("value", descriptor.value);
            result.setValue("writable", env.objectFactory.createPrimitive(descriptor.writable));
          } else {
            result.setValue("get", descriptor.get || _primitiveType.UNDEFINED);
            result.setValue("set", descriptor.set || _primitiveType.UNDEFINED);
          }

          result.setValue("enumerable", env.objectFactory.createPrimitive(descriptor.enumerable));
          result.setValue("configurable", env.objectFactory.createPrimitive(descriptor.configurable));
          return _context9.abrupt("return", result);

        case 10:
          return _context9.abrupt("return", _primitiveType.UNDEFINED);

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked[1], this);
}

},{"../../types/primitive-type":368,"../../utils/checks":376,"../../utils/native":379,"babel-runtime/core-js/object/create":26,"babel-runtime/regenerator":37}],238:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("create", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(parent, descriptors) {
    var stringValue, obj, prop;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(parent && parent.isPrimitive && parent.value !== null)) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return (0, _native.toString)(parent);

          case 3:
            stringValue = _context.sent;
            throw TypeError("Object prototype may only be an Object or null: " + stringValue);

          case 5:
            if (!(descriptors && descriptors.isPrimitive && descriptors.value === null)) {
              _context.next = 7;
              break;
            }

            throw TypeError("Cannot convert null or undefined to object");

          case 7:
            obj = factory.createObject();


            if (parent) {
              obj.setPrototype(parent);
            }

            if (!descriptors) {
              _context.next = 18;
              break;
            }

            _context.t0 = _regenerator2.default.keys(descriptors.properties);

          case 11:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 18;
              break;
            }

            prop = _context.t1.value;

            if (!descriptors.properties[prop].enumerable) {
              _context.next = 16;
              break;
            }

            _context.next = 16;
            return (0, _objectHelpers.defineProperty)(env, obj, prop, descriptors.getValue(prop));

          case 16:
            _context.next = 11;
            break;

          case 18:
            return _context.abrupt("return", obj);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Object.create"));
};

var _native = require("../../utils/native");

var _objectHelpers = require("./object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"./object-helpers":237,"babel-runtime/regenerator":37}],239:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("defineProperties", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(obj, descriptors) {
    var prop;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(obj, "Object.defineProperties");
            (0, _contracts.assertArgIsNotNullOrUndefined)(descriptors);

            _context.t0 = _regenerator2.default.keys(descriptors.properties);

          case 3:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 10;
              break;
            }

            prop = _context.t1.value;

            if (!descriptors.properties[prop].enumerable) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return (0, _objectHelpers.defineProperty)(env, obj, prop, descriptors.getValue(prop));

          case 8:
            _context.next = 3;
            break;

          case 10:
            return _context.abrupt("return", obj);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Object.defineProperties"));
};

var _contracts = require("../../utils/contracts");

var _objectHelpers = require("./object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"./object-helpers":237,"babel-runtime/regenerator":37}],240:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("defineProperty", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(obj, propertyKey, descriptor) {
    var key;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(obj, "Object.defineProperty");
            _context.next = 3;
            return (0, _native.toPropertyKey)(propertyKey);

          case 3:
            key = _context.sent;
            _context.next = 6;
            return (0, _objectHelpers.defineProperty)(env, obj, key, descriptor);

          case 6:
            return _context.abrupt("return", obj);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 3, "Object.defineProperty"));
};

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

var _objectHelpers = require("./object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"../../utils/native":379,"./object-helpers":237,"babel-runtime/regenerator":37}],241:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("freeze", factory.createBuiltInFunction(function (obj) {
    if ((0, _objectHelpers.confirmObject)(obj, "Object.freeze", env.ecmaVersion)) {
      obj.freeze();
    }

    return obj;
  }, 1, "Object.freeze"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":237}],242:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("getOwnPropertyDescriptor", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(obj, key) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(obj, "Object.getOwnPropertyDescriptor");
            (0, _objectHelpers.confirmObject)(obj, "Object.getOwnPropertyDescriptor", env.ecmaVersion);

            _context.next = 4;
            return (0, _objectHelpers.getOwnPropertyDescriptor)(env, obj, key);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Object.getOwnPropertyDescriptor"));
};

var _contracts = require("../../utils/contracts");

var _objectHelpers = require("./object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"./object-helpers":237,"babel-runtime/regenerator":37}],243:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("getOwnPropertyNames", factory.createBuiltInFunction(function (obj) {
    (0, _contracts.assertIsObject)(obj, "Object.getOwnPropertyNames");

    var arr = factory.createArray();
    obj.getOwnPropertyKeys().forEach(function (name, index) {
      arr.setValue(index, factory.createPrimitive(name));
    });

    return arr;
  }, 1, "Object.getOwnPropertyNames"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],244:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("getPrototypeOf", factory.createBuiltInFunction(function (obj) {
    if (!(0, _objectHelpers.confirmObject)(obj, "Object.getPrototypeOf", env.ecmaVersion)) {
      obj = (0, _native.toObject)(obj, true);
    }

    var objProto = obj.getPrototype();
    return objProto || _primitiveType.NULL;
  }, 1, "Object.getPrototypeOf"));
};

var _native = require("../../utils/native");

var _primitiveType = require("../../types/primitive-type");

var _objectHelpers = require("./object-helpers");

},{"../../types/primitive-type":368,"../../utils/native":379,"./object-helpers":237}],245:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("hasOwnProperty", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(key) {
    var k;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Object.prototype.hasOwnProperty");
            _context.next = 3;
            return (0, _native.toPropertyKey)(key);

          case 3:
            k = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(this.object.owns(k)));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Object.prototype.hasOwnProperty"));
};

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"../../utils/native":379,"babel-runtime/regenerator":37}],246:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("isExtensible", factory.createBuiltInFunction(function (obj) {
    if (!(0, _objectHelpers.confirmObject)(obj, "Object.isExtensible", env.ecmaVersion)) {
      return factory.createPrimitive(false);
    }

    return factory.createPrimitive(obj.isExtensible());
  }, 1, "Object.isExtensible"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":237}],247:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("isFrozen", factory.createBuiltInFunction(function (obj) {
    if (!(0, _objectHelpers.confirmObject)(obj, "Object.isFrozen", env.ecmaVersion)) {
      return factory.createPrimitive(true);
    }

    if (obj.isPrimitive) {
      return factory.createPrimitive(true);
    }

    if (!obj.isExtensible()) {
      var keys = obj.getOwnPropertyKeys();
      for (var i = 0, ln = keys.length; i < ln; i++) {
        var desc = obj.getOwnProperty(keys[i]);
        if (desc.writable || desc.configurable) {
          return factory.createPrimitive(false);
        }
      }
    }

    return factory.createPrimitive(!obj.extensible);
  }, 1, "Object.isFrozen"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":237}],248:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("isPrototypeOf", factory.createBuiltInFunction(function (obj) {
    (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Object.isPrototypeOf");

    var current = obj;
    while (current) {
      if (this.object === current) {
        return factory.createPrimitive(true);
      }

      current = current.getPrototype();
    }

    return factory.createPrimitive(false);
  }, 1, "Object.isPrototypeOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],249:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("isSealed", factory.createBuiltInFunction(function (obj) {
    if (!(0, _objectHelpers.confirmObject)(obj, "Object.isSealed", env.ecmaVersion)) {
      return factory.createPrimitive(true);
    }

    var extensible = obj.isExtensible();
    if (!extensible) {
      var keys = obj.getOwnPropertyKeys();
      for (var i = 0, ln = keys.length; i < ln; i++) {
        var desc = obj.getOwnProperty(keys[i]);
        if (desc.configurable) {
          return factory.createPrimitive(false);
        }
      }
    }

    return factory.createPrimitive(!extensible);
  }, 1, "Object.isSealed"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":237}],250:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("keys", factory.createBuiltInFunction(function (obj) {
    (0, _contracts.assertIsObject)(obj);

    var arr = factory.createArray();
    var index = 0;

    obj.getOwnPropertyKeys().forEach(function (key) {
      if (typeof key === "string") {
        var propInfo = obj.getProperty(key);
        if (propInfo && propInfo.enumerable) {
          arr.setValue(index++, factory.createPrimitive(key));
        }
      }
    });

    return arr;
  }, 1, "Object.keys"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],251:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("preventExtensions", factory.createBuiltInFunction(function (obj) {
    if ((0, _objectHelpers.confirmObject)(obj, "Object.preventExtensions", env.ecmaVersion)) {
      obj.preventExtensions();
    }

    return obj;
  }, 1, "Object.preventExtensions"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":237}],252:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("propertyIsEnumerable", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(key) {
    var k, descriptor;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Object.propertyIsEnumerable");

            _context.next = 3;
            return (0, _native.toPropertyKey)(key);

          case 3:
            k = _context.sent;
            descriptor = this.object.getOwnProperty(k);
            return _context.abrupt("return", factory.createPrimitive(!!(descriptor && descriptor.enumerable)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Object.propertyIsEnumerable"));
};

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"../../utils/native":379,"babel-runtime/regenerator":37}],253:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("seal", factory.createBuiltInFunction(function (obj) {
    if ((0, _objectHelpers.confirmObject)(obj, "Object.seal", env.ecmaVersion)) {
      obj.seal();
    }

    return obj;
  }, 1, "Object.seal"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":237}],254:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    var className = this.object ? this.object.className : "Undefined";
    return factory.createPrimitive("[object " + className + "]");
  }, 0, "Object.prototype.toString"));

  $target.define("toLocaleString", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var toStringMethod;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _objectHelpers.confirmObject)(this.object, "toLocaleString", env.options.ecmaVersion);
            toStringMethod = (0, _helpers.getMethod)(this.object, "toString");
            _context.next = 4;
            return toStringMethod.call(this.object);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Object.prototype.toLocaleString"));
};

var _objectHelpers = require("./object-helpers");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/helpers":378,"./object-helpers":237,"babel-runtime/regenerator":37}],255:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    if ("value" in this.object && !this.object.isPrimitive) {
      // primitive called with 'new'
      return factory.createPrimitive(this.object.value);
    }

    return (0, _native.toObject)(this.object, true);
  }, 0, "Object.prototype.valueOf"));
};

var _native = require("../../utils/native");

},{"../../utils/native":379}],256:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (env) {
  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  var proto = objectFactory.createObject();
  proto.className = "RegExp";

  var regexClass = objectFactory.createFunction(_regenerator2.default.mark(function _callee(pattern, flags) {
    var patternString;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(pattern && pattern.className === "RegExp")) {
              _context.next = 4;
              break;
            }

            if (!(0, _checks.isUndefined)(flags)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", pattern);

          case 3:
            throw TypeError("Cannot supply flags when constructing one RegExp from another");

          case 4:
            if (!(0, _checks.isUndefined)(pattern)) {
              _context.next = 8;
              break;
            }

            _context.t0 = "";
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _native.toString)(pattern);

          case 10:
            _context.t0 = _context.sent;

          case 11:
            patternString = _context.t0;

            if (!(0, _checks.isUndefined)(flags)) {
              _context.next = 16;
              break;
            }

            _context.t1 = "";
            _context.next = 19;
            break;

          case 16:
            _context.next = 18;
            return (0, _native.toString)(flags);

          case 18:
            _context.t1 = _context.sent;

          case 19:
            flags = _context.t1;
            return _context.abrupt("return", objectFactory.create("RegExp", new RegExp(patternString, flags)));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), proto, { configurable: false, enumerable: false, writable: false, name: "RegExp" });

  (0, _regex2.default)(proto, env, objectFactory);
  (0, _regex4.default)(proto, env, objectFactory);
  (0, _regex6.default)(proto, env, objectFactory);

  proto.define("compile", (0, _native.toNativeFunction)(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
  proto.defineProperty("lastIndex", { value: objectFactory.createPrimitive(0), writable: true });

  ["global", "ignoreCase", "multiline"].forEach(function (name) {
    proto.defineProperty(name, { value: objectFactory.createPrimitive(false) });
  });

  proto.defineProperty("source", { value: objectFactory.createPrimitive("") });

  globalObject.define("RegExp", regexClass);
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _regex = require("./regex.exec");

var _regex2 = _interopRequireDefault(_regex);

var _regex3 = require("./regex.test");

var _regex4 = _interopRequireDefault(_regex3);

var _regex5 = require("./regex.to-string");

var _regex6 = _interopRequireDefault(_regex5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/native":379,"./regex.exec":257,"./regex.test":258,"./regex.to-string":259,"babel-runtime/regenerator":37}],257:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
    $target.define("exec", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(str) {
        var stringValue, match, arr, i, ln;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _native.toString)(str);

                    case 2:
                        stringValue = _context.sent;
                        _context.next = 5;
                        return (0, _native.toInt32)(this.object.getValue("lastIndex"));

                    case 5:
                        this.object.source.lastIndex = _context.sent;


                        // get match from underlying regex
                        match = this.object.source.exec(stringValue);

                        // update the last index from the underlying regex

                        this.object.setValue("lastIndex", factory.createPrimitive(this.object.source.lastIndex));

                        if (!match) {
                            _context.next = 14;
                            break;
                        }

                        arr = factory.createArray();

                        for (i = 0, ln = match.length; i < ln; i++) {
                            arr.setValue(i, factory.createPrimitive(match[i]));
                        }

                        // extra properties are added to the array
                        arr.setValue("index", factory.createPrimitive(match.index));
                        arr.setValue("input", factory.createPrimitive(match.input));
                        return _context.abrupt("return", arr);

                    case 14:
                        return _context.abrupt("return", _primitiveType.NULL);

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }), 1, "RegExp.prototype.exec"));
};

var _native = require("../../utils/native");

var _primitiveType = require("../../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/native":379,"babel-runtime/regenerator":37}],258:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("test", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(str) {
    var stringValue, testValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toString)(str);

          case 2:
            stringValue = _context.sent;
            _context.next = 5;
            return (0, _native.toInt32)(this.object.getValue("lastIndex"));

          case 5:
            this.object.source.lastIndex = _context.sent;
            testValue = this.object.source.test(stringValue);

            this.object.setValue("lastIndex", factory.createPrimitive(this.object.source.lastIndex));

            return _context.abrupt("return", factory.createPrimitive(testValue));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "RegExp.prototype.test"));
};

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/native":379,"babel-runtime/regenerator":37}],259:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    return factory.createPrimitive(String(this.object.source));
  }, 0, "RegExp.prototype.toString"));
};

},{}],260:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (env) {
  var _marked = [getString].map(_regenerator2.default.mark);

  var globalObject = env.global;
  var objectFactory = env.objectFactory;


  function getString(value, isNew) {
    return _regenerator2.default.wrap(function getString$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (value) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", "");

          case 2:
            if (!(!isNew && value.isSymbol)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", "Symbol(" + value.description + ")");

          case 4:
            _context.next = 6;
            return (0, _native.toString)(value.getValue());

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  var proto = objectFactory.createObject();

  // prototype can be coerced into an empty string
  proto.value = "";
  proto.className = "String";
  proto.defineProperty("length", { value: objectFactory.createPrimitive(0) });

  var stringClass = objectFactory.createFunction(_regenerator2.default.mark(function _callee(value) {
    var stringValue, obj;
    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getString(value, this.isNew);

          case 2:
            stringValue = _context2.sent;
            obj = objectFactory.create("String", stringValue);

            // called as new

            if (!this.isNew) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", obj.toObject());

          case 6:
            return _context2.abrupt("return", obj);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this);
  }), proto, { configurable: false, enumerable: false, writable: false, name: "String" });

  (0, _string2.default)(stringClass, env, objectFactory);

  (0, _string4.default)(proto, env, objectFactory);
  (0, _string6.default)(proto, env, objectFactory);
  (0, _string8.default)(proto, env, objectFactory);
  (0, _string10.default)(proto, env, objectFactory);
  (0, _string12.default)(proto, env, objectFactory);
  (0, _string14.default)(proto, env, objectFactory);
  (0, _string16.default)(proto, env, objectFactory);
  (0, _string18.default)(proto, env, objectFactory);
  (0, _string20.default)(proto, env, objectFactory);
  (0, _string22.default)(proto, env, objectFactory);

  ["charAt", "charCodeAt", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase"].forEach(function (name) {
    proto.define(name, objectFactory.createBuiltInFunction(_regenerator2.default.mark(function _callee3() {
      var stringValue,
          args,
          _args4 = arguments;
      return _regenerator2.default.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _native.toString)(this.object);

            case 2:
              stringValue = _context4.sent;
              return _context4.delegateYield((0, _async.map)(_args4, _regenerator2.default.mark(function _callee2(arg) {
                return _regenerator2.default.wrap(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _native.toPrimitive)(arg);

                      case 2:
                        return _context3.abrupt("return", _context3.sent);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee2, this);
              })), "t0", 4);

            case 4:
              args = _context4.t0;
              return _context4.abrupt("return", objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args)));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, this);
    }), String.prototype[name].length, "String.prototype." + name));
  });

  globalObject.define("String", stringClass);
};

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _string = require("./string.from-char-code");

var _string2 = _interopRequireDefault(_string);

var _string3 = require("./string.concat");

var _string4 = _interopRequireDefault(_string3);

var _string5 = require("./string.match");

var _string6 = _interopRequireDefault(_string5);

var _string7 = require("./string.replace");

var _string8 = _interopRequireDefault(_string7);

var _string9 = require("./string.search");

var _string10 = _interopRequireDefault(_string9);

var _string11 = require("./string.slice");

var _string12 = _interopRequireDefault(_string11);

var _string13 = require("./string.split");

var _string14 = _interopRequireDefault(_string13);

var _string15 = require("./string.substring");

var _string16 = _interopRequireDefault(_string15);

var _string17 = require("./string.to-string");

var _string18 = _interopRequireDefault(_string17);

var _string19 = require("./string.trim");

var _string20 = _interopRequireDefault(_string19);

var _string21 = require("./string.value-of");

var _string22 = _interopRequireDefault(_string21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/async":375,"../../utils/native":379,"./string.concat":261,"./string.from-char-code":262,"./string.match":263,"./string.replace":264,"./string.search":265,"./string.slice":266,"./string.split":267,"./string.substring":268,"./string.to-string":269,"./string.trim":270,"./string.value-of":271,"babel-runtime/regenerator":37}],261:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("concat", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var stringValue, values;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.concat");

            _context2.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context2.sent;
            values = [stringValue];
            _context2.t0 = values;
            _context2.next = 8;
            return (0, _async.map)(args, _regenerator2.default.mark(function _callee(arg) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _native.toString)(arg);

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

          case 8:
            _context2.t1 = _context2.sent;
            values = _context2.t0.concat.call(_context2.t0, _context2.t1);
            return _context2.abrupt("return", factory.create("String", values.join("")));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 1, "String.prototype.concat"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _async = require("../../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/async":375,"../../utils/contracts":377,"../../utils/native":379,"babel-runtime/regenerator":37}],262:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("fromCharCode", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2() {
    var _String;

    for (var _len = arguments.length, charCodes = Array(_len), _key = 0; _key < _len; _key++) {
      charCodes[_key] = arguments[_key];
    }

    var args;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.delegateYield((0, _async.map)(charCodes, _regenerator2.default.mark(function _callee(arg) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _native.toPrimitive)(arg);

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })), "t0", 1);

          case 1:
            args = _context2.t0;
            return _context2.abrupt("return", factory.create("String", (_String = String).fromCharCode.apply(_String, args)));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 1, "String.fromCharCode"));
};

var _async = require("../../utils/async");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/async":375,"../../utils/native":379,"babel-runtime/regenerator":37}],263:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function ($target, env, factory) {
  $target.define("match", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(regex) {
    var matchKey, matcher, stringValue, actualRegex, match, _ret;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _checks.isNullOrUndefined)(regex)) {
              _context.next = 8;
              break;
            }

            matchKey = env.getSymbol("match");

            if (!matchKey) {
              _context.next = 8;
              break;
            }

            matcher = (0, _helpers.getMethod)(regex, matchKey);

            if (!matcher) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return matcher.call(regex, [this.object]);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.next = 10;
            return (0, _native.toString)(this.object);

          case 10:
            stringValue = _context.sent;
            actualRegex = undefined;

            if (!(regex && regex.className === "RegExp")) {
              _context.next = 16;
              break;
            }

            actualRegex = regex.source;
            _context.next = 22;
            break;

          case 16:
            if (!regex) {
              _context.next = 22;
              break;
            }

            _context.t0 = RegExp;
            _context.next = 20;
            return (0, _native.toPrimitive)(regex);

          case 20:
            _context.t1 = _context.sent;
            actualRegex = new _context.t0(_context.t1);

          case 22:
            match = stringValue.match(actualRegex);

            if (!match) {
              _context.next = 27;
              break;
            }

            _ret = function () {
              var matches = factory.createArray();

              match.forEach(function (value, index) {
                matches.setValue(index, factory.createPrimitive(value));
              });

              matches.setValue("index", factory.create("Number", match.index));
              matches.setValue("input", factory.create("String", match.input));
              return {
                v: matches
              };
            }();

            if (!((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object")) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", _ret.v);

          case 27:
            return _context.abrupt("return", _primitiveType.NULL);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "String.prototype.match"));
};

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _helpers = require("../../utils/helpers");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/checks":376,"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37}],264:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("replace", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(regexOrSubstr, substrOrFn) {
    var replaceKey, replaceMethod, stringValue, matcher, replacer;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.replace");

            replaceKey = env.getSymbol("replace");

            if (!(replaceKey && !(0, _checks.isNullOrUndefined)(regexOrSubstr))) {
              _context.next = 8;
              break;
            }

            replaceMethod = (0, _helpers.getMethod)(regexOrSubstr, replaceKey);

            if (!replaceMethod) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return replaceMethod.call(regexOrSubstr, [this.object, substrOrFn]);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.next = 10;
            return (0, _native.toString)(this.object);

          case 10:
            stringValue = _context.sent;
            matcher = undefined;

            if (!(regexOrSubstr && regexOrSubstr.className === "RegExp")) {
              _context.next = 16;
              break;
            }

            matcher = regexOrSubstr.source;
            _context.next = 19;
            break;

          case 16:
            _context.next = 18;
            return (0, _native.toString)(regexOrSubstr);

          case 18:
            matcher = _context.sent;

          case 19:
            replacer = undefined;

            if (!(substrOrFn && substrOrFn.type === "function")) {
              _context.next = 24;
              break;
            }

            replacer = function replacer() {
              var thisArg = substrOrFn.isStrict() || substrOrFn.isStrict() ? _primitiveType.UNDEFINED : env.global;

              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var mappedArgs = args.map(function (arg) {
                return factory.createPrimitive(arg);
              });
              var replacedValue = (0, _async.exhaust)(substrOrFn.call(thisArg, mappedArgs));
              return replacedValue ? (0, _async.exhaust)((0, _native.toString)(replacedValue)) : undefined;
            };
            _context.next = 27;
            break;

          case 24:
            _context.next = 26;
            return (0, _native.toString)(substrOrFn);

          case 26:
            replacer = _context.sent;

          case 27:
            return _context.abrupt("return", factory.create("String", stringValue.replace(matcher, replacer)));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "String.prototype.replace"));
};

var _contracts = require("../../utils/contracts");

var _checks = require("../../utils/checks");

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../types/primitive-type":368,"../../utils/async":375,"../../utils/checks":376,"../../utils/contracts":377,"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/regenerator":37}],265:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("search", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(regexp) {
    var searchKey, searcher, rgx, stringValue, underlyingRegex;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchKey = env.getSymbol("search");

            if (!searchKey) {
              _context.next = 14;
              break;
            }

            if ((0, _checks.isNullOrUndefined)(regexp)) {
              _context.next = 8;
              break;
            }

            searcher = (0, _helpers.getMethod)(regexp, searchKey);

            if (!searcher) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return searcher.call(regexp, [this.object]);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.next = 10;
            return env.getValue("RegExp").construct(null, [regexp]);

          case 10:
            rgx = _context.sent;
            _context.next = 13;
            return rgx.getValue(searchKey).call(rgx, [this.object]);

          case 13:
            return _context.abrupt("return", _context.sent);

          case 14:
            _context.next = 16;
            return (0, _native.toString)(this.object);

          case 16:
            stringValue = _context.sent;
            underlyingRegex = undefined;

            if (!regexp) {
              _context.next = 28;
              break;
            }

            if (!(regexp.className === "RegExp")) {
              _context.next = 23;
              break;
            }

            underlyingRegex = regexp.source;
            _context.next = 28;
            break;

          case 23:
            _context.t0 = RegExp;
            _context.next = 26;
            return (0, _native.toString)(regexp);

          case 26:
            _context.t1 = _context.sent;
            underlyingRegex = new _context.t0(_context.t1);

          case 28:
            return _context.abrupt("return", factory.create("Number", stringValue.search(underlyingRegex)));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "String.prototype.search"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/regenerator":37}],266:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("slice", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(start, end) {
    var stringValue, startValue, endValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toString)(this.object);

          case 2:
            stringValue = _context.sent;
            _context.next = 5;
            return (0, _native.toInteger)(start);

          case 5:
            startValue = _context.sent;
            endValue = undefined;

            if ((0, _checks.isNullOrUndefined)(end)) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return (0, _native.toInteger)(end);

          case 10:
            endValue = _context.sent;

          case 11:
            return _context.abrupt("return", factory.create("String", stringValue.slice(startValue, endValue)));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "String.prototype.slice"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],267:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("split", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(separator, limit) {
    var splitKey, splitter, stringValue, limitValue, arr, separatorValue, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _checks.isNullOrUndefined)(separator)) {
              _context.next = 8;
              break;
            }

            splitKey = env.getSymbol("split");

            if (!splitKey) {
              _context.next = 8;
              break;
            }

            splitter = (0, _helpers.getMethod)(separator, splitKey);

            if (!splitter) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return splitter.call(separator, [this.object, limit]);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.next = 10;
            return (0, _native.toString)(this.object);

          case 10:
            stringValue = _context.sent;

            separator = separator && separator.getValue();
            limit = limit && limit.getValue();

            if (!(0, _checks.isUndefined)(limit)) {
              _context.next = 17;
              break;
            }

            _context.t0 = undefined;
            _context.next = 20;
            break;

          case 17:
            _context.next = 19;
            return (0, _native.toUInt32)(limit);

          case 19:
            _context.t0 = _context.sent;

          case 20:
            limitValue = _context.t0;
            arr = factory.createArray();

            if (!(0, _checks.isUndefined)(separator)) {
              _context.next = 26;
              break;
            }

            arr.setValue(0, factory.createPrimitive(stringValue));
            _context.next = 36;
            break;

          case 26:
            separatorValue = undefined;

            if (!(separator.className === "RegExp")) {
              _context.next = 31;
              break;
            }

            separatorValue = separator.source;
            _context.next = 34;
            break;

          case 31:
            _context.next = 33;
            return (0, _native.toString)(separator);

          case 33:
            separatorValue = _context.sent;

          case 34:
            result = stringValue.split(separatorValue, limitValue);

            result.forEach(function (value, index) {
              arr.setValue(index, factory.createPrimitive(value));
            });

          case 36:
            return _context.abrupt("return", arr);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "String.prototype.split"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

var _helpers = require("../../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/helpers":378,"../../utils/native":379,"babel-runtime/regenerator":37}],268:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("substring", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(start, end) {
    var value, length;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toString)(this.object);

          case 2:
            value = _context.sent;
            length = value.length;
            _context.next = 6;
            return (0, _native.toInteger)(start);

          case 6:
            start = _context.sent;

            if (!(0, _checks.isNullOrUndefined)(end)) {
              _context.next = 11;
              break;
            }

            _context.t0 = length;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return (0, _native.toInteger)(end);

          case 13:
            _context.t0 = _context.sent;

          case 14:
            end = _context.t0;
            return _context.abrupt("return", factory.create("String", value.substring(start, end)));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "String.prototype.substring"));
};

var _native = require("../../utils/native");

var _checks = require("../../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/checks":376,"../../utils/native":379,"babel-runtime/regenerator":37}],269:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "String", "String.prototype.toString");
    return factory.create("String", this.object.toNative());
  }, 0, "String.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],270:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("trim", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var stringValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.trim");

            _context.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context.sent;
            return _context.abrupt("return", factory.create("String", stringValue.trim()));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "String.prototype.trim"));
};

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":377,"../../utils/native":379,"babel-runtime/regenerator":37}],271:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "String", "String.prototype.valueOf");
    return factory.create("String", this.object.value);
  }, 0, "String.prototype.valueOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":377}],272:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.normalizeIndex = normalizeIndex;
exports.executeCallback = executeCallback;

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [executeCallback].map(_regenerator2.default.mark);

function normalizeIndex(index, length) {
  if (index < 0) {
    return Math.max(length + index, 0);
  }

  return Math.min(index, length);
}

function executeCallback(env, callback, entry, thisArg, arr) {
  var args;
  return _regenerator2.default.wrap(function executeCallback$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!thisArg) {
            thisArg = callback.isStrict() ? _primitiveType.UNDEFINED : env.global;
          }

          args = [entry.value, env.objectFactory.createPrimitive(entry.key), arr];
          _context.next = 4;
          return callback.call(thisArg, args) || _primitiveType.UNDEFINED;

        case 4:
          return _context.abrupt("return", _context.sent);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../types/primitive-type":368,"babel-runtime/regenerator":37}],273:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("copyWithin", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, start, end) {
    var arr, length, to, from, final, count, dir;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = (0, _native.toObject)(this.object);
            _context.next = 3;
            return (0, _native.toLength)(arr);

          case 3:
            length = _context.sent;
            _context.next = 6;
            return (0, _native.toInteger)(target);

          case 6:
            _context.t0 = _context.sent;
            _context.t1 = length;
            to = (0, _arrayHelpers.normalizeIndex)(_context.t0, _context.t1);
            _context.next = 11;
            return (0, _native.toInteger)(start);

          case 11:
            _context.t2 = _context.sent;
            _context.t3 = length;
            from = (0, _arrayHelpers.normalizeIndex)(_context.t2, _context.t3);

            if (!(0, _checks.isUndefined)(end)) {
              _context.next = 18;
              break;
            }

            _context.t4 = length;
            _context.next = 23;
            break;

          case 18:
            _context.next = 20;
            return (0, _native.toInteger)(end);

          case 20:
            _context.t5 = _context.sent;
            _context.t6 = length;
            _context.t4 = (0, _arrayHelpers.normalizeIndex)(_context.t5, _context.t6);

          case 23:
            final = _context.t4;
            count = Math.min(final - from, length - to);
            dir = 1;


            if (from < to && to < from + count) {
              dir = -1;
              from = from + count - 1;
              to = to + count - 1;
            }

            while (count > 0) {
              if (arr.has(from)) {
                arr.setValue(to, arr.getValue(from));
              } else {
                arr.deleteProperty(to, true);
              }

              from += dir;
              to += dir;
              count--;
            }

            return _context.abrupt("return", arr);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Array.prototype.copyWithin"));
};

var _checks = require("../utils/checks");

var _native = require("../utils/native");

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/native":379,"./array-helpers":272,"babel-runtime/regenerator":37}],274:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("fill", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value, start, end) {
    var arr, length, k, final;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = (0, _native.toObject)(this.object);
            _context.next = 3;
            return (0, _native.toLength)(arr);

          case 3:
            length = _context.sent;
            _context.next = 6;
            return (0, _native.toInteger)(start);

          case 6:
            k = _context.sent;

            if (!(0, _checks.isUndefined)(end)) {
              _context.next = 11;
              break;
            }

            _context.t0 = length;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return (0, _native.toInteger)(end);

          case 13:
            _context.t0 = _context.sent;

          case 14:
            final = _context.t0;


            k = (0, _arrayHelpers.normalizeIndex)(k, length);
            final = (0, _arrayHelpers.normalizeIndex)(final, length);

            while (k < final) {
              arr.setValue(k++, value || _primitiveType.UNDEFINED);
            }

            return _context.abrupt("return", arr);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.fill"));
};

var _primitiveType = require("../types/primitive-type");

var _native = require("../utils/native");

var _checks = require("../utils/checks");

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/checks":376,"../utils/native":379,"./array-helpers":272,"babel-runtime/regenerator":37}],275:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("findIndex", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(predicate, thisArg) {
    var length, i, propInfo, value, passed;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.findIndex");

            _context.next = 3;
            return (0, _native.toLength)(this.object);

          case 3:
            length = _context.sent;


            (0, _contracts.assertIsFunction)(predicate, "predicate");

            i = 0;

          case 6:
            if (!(i < length)) {
              _context.next = 18;
              break;
            }

            propInfo = this.object.getProperty(i);
            value = propInfo ? propInfo.getValue() : _primitiveType.UNDEFINED;
            _context.next = 11;
            return (0, _arrayHelpers.executeCallback)(env, predicate, { key: i, value: value }, thisArg, this.object);

          case 11:
            _context.t0 = _context.sent;
            passed = (0, _native.toBoolean)(_context.t0);

            if (!passed) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(i));

          case 15:

            i++;
            _context.next = 6;
            break;

          case 18:
            return _context.abrupt("return", factory.createPrimitive(-1));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.findIndex"));
};

var _native = require("../utils/native");

var _primitiveType = require("../types/primitive-type");

var _arrayHelpers = require("./array-helpers");

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"../utils/native":379,"./array-helpers":272,"babel-runtime/regenerator":37}],276:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("find", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(predicate, thisArg) {
    var arr, length, i, propInfo, value, passed;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = (0, _native.toObject)(this.object);
            _context.next = 3;
            return (0, _native.toLength)(arr);

          case 3:
            length = _context.sent;


            (0, _contracts.assertIsFunction)(predicate, "predicate");

            // for some reason the spec for the find methods calls empty array slots
            // how that is useful, beats me
            i = 0;

          case 6:
            if (!(i < length)) {
              _context.next = 18;
              break;
            }

            propInfo = arr.getProperty(i);
            value = propInfo ? propInfo.getValue() : _primitiveType.UNDEFINED;
            _context.next = 11;
            return (0, _arrayHelpers.executeCallback)(env, predicate, { key: i, value: value }, thisArg, arr);

          case 11:
            _context.t0 = _context.sent;
            passed = (0, _native.toBoolean)(_context.t0);

            if (!passed) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", value);

          case 15:

            i++;
            _context.next = 6;
            break;

          case 18:
            return _context.abrupt("return", _primitiveType.UNDEFINED);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Array.prototype.find"));
};

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

var _primitiveType = require("../types/primitive-type");

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"../utils/native":379,"./array-helpers":272,"babel-runtime/regenerator":37}],277:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  var _marked = [createArray].map(_regenerator2.default.mark);

  var iteratorKey = env.getSymbol("iterator");

  function createArray(ctor, source) {
    var args, hasIterator, length;
    return _regenerator2.default.wrap(function createArray$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(ctor === $target || !(0, _checks.isConstructor)(ctor))) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", factory.createArray());

          case 2:
            args = [];
            hasIterator = source.has(iteratorKey);

            if (hasIterator) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return (0, _native.toLength)(source);

          case 7:
            length = _context.sent;

            args.push(factory.createPrimitive(length));

          case 9:
            _context.next = 11;
            return ctor.construct(ctor, args);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  $target.define("from", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(items, mapFn, thisArg) {
    var mapper, arr, it, length, done, current, _it$next, value;

    return _regenerator2.default.wrap(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            thisArg = thisArg || _primitiveType.UNDEFINED;

            mapper = undefined;

            if ((0, _checks.isUndefined)(mapFn)) {
              mapper = function mapper(v) {
                return v;
              };
            } else {
              (0, _contracts.assertIsFunction)(mapFn, "mapFn");
              mapper = _regenerator2.default.mark(function mapper(v, i) {
                return _regenerator2.default.wrap(function mapper$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return mapFn.call(thisArg, [v, factory.createPrimitive(i)]);

                      case 2:
                        return _context2.abrupt("return", _context2.sent);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, mapper, this);
              });
            }

            _context3.next = 5;
            return createArray(this.object, items);

          case 5:
            arr = _context3.sent;
            it = _iterators2.default.getIterator(items);
            length = 0;
            done = false;

          case 9:
            if (done) {
              _context3.next = 29;
              break;
            }

            _context3.prev = 10;
            current = undefined;
            _it$next = it.next();
            done = _it$next.done;
            current = _it$next.value;

            if (done) {
              _context3.next = 21;
              break;
            }

            _context3.next = 18;
            return mapper(current.value || _primitiveType.UNDEFINED, current.key);

          case 18:
            value = _context3.sent;

            (0, _helpers.createDataProperty)(arr, current.key, value, true);
            // arr.defineProperty(current.key, {value, configurable: true, enumerable: true, writable: true});
            length = current.key + 1;

          case 21:
            _context3.next = 27;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](10);

            if ("return" in it) {
              it.return();
            }

            throw _context3.t0;

          case 27:
            _context3.next = 9;
            break;

          case 29:

            arr.setValue("length", factory.createPrimitive(length));
            return _context3.abrupt("return", arr);

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee, this, [[10, 23]]);
  }), 1, "Array.from"));
};

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _native = require("../utils/native");

var _helpers = require("../utils/helpers");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../iterators/":352,"../types/primitive-type":368,"../utils/checks":376,"../utils/contracts":377,"../utils/helpers":378,"../utils/native":379,"babel-runtime/regenerator":37}],278:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  var _marked = [getIterator].map(_regenerator2.default.mark);

  var iteratorProto = factory.createObject();
  iteratorProto.setPrototype(env.global.getValue("%IteratorPrototype%"));
  iteratorProto.className = "Array Iterator";

  iteratorProto.define("next", factory.createBuiltInFunction(function () {
    var result = this.object.advance();
    if (result.value) {
      return result.value;
    }

    return factory.createIteratorResult({ done: result.done });
  }, 0, "ArrayIterator.prototype.next"));

  function createIteratorValue(arr, index, kind) {
    var key = undefined;
    if (kind !== "value") {
      key = factory.createPrimitive(index);
      if (kind === "key") {
        return key;
      }
    }

    var propInfo = arr.getProperty(index);
    var value = _primitiveType.UNDEFINED;

    if (propInfo) {
      value = propInfo.getValue();
    }

    if (kind === "value") {
      return value;
    }

    return factory.createArray([key, value]);
  }

  function getIterator(arr, kind) {
    var done, index, length, value;
    return _regenerator2.default.wrap(function getIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            done = false;
            index = 0;

          case 2:
            if (done) {
              _context.next = 11;
              break;
            }

            length = (0, _async.exhaust)((0, _native.toLength)(arr));
            value = _primitiveType.UNDEFINED;


            if (index >= length) {
              done = true;
            } else {
              value = createIteratorValue(arr, index, kind);
            }

            _context.next = 8;
            return factory.createIteratorResult({ value: value, done: done });

          case 8:
            index++;
            _context.next = 2;
            break;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  $target.define("keys", factory.createBuiltInFunction(function () {
    var arr = (0, _native.toObject)(this.object, true);
    var it = getIterator(arr, "key");
    return factory.createIterator(it, iteratorProto);
  }, 0, "Array.prototype.keys"));

  $target.define("entries", factory.createBuiltInFunction(function () {
    var arr = (0, _native.toObject)(this.object, true);
    var it = getIterator(arr);
    return factory.createIterator(it, iteratorProto);
  }, 0, "Array.prototype.entries"));

  var stringTagKey = env.getSymbol("toStringTag");
  iteratorProto.define(stringTagKey, factory.createPrimitive("Array Iterator"), { writable: false });

  var iteratorFunc = factory.createBuiltInFunction(function () {
    var arr = (0, _native.toObject)(this.object, true);
    var it = getIterator(arr, "value");
    return factory.createIterator(it, iteratorProto);
  }, 0, "Array.prototype.values");

  $target.define("values", iteratorFunc);

  var iteratorKey = env.getSymbol("iterator");
  $target.define(iteratorKey, iteratorFunc);
};

var _primitiveType = require("../types/primitive-type");

var _async = require("../utils/async");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/async":375,"../utils/native":379,"babel-runtime/regenerator":37}],279:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($global, env, factory) {
  var arrayClass = $global.getValue("Array");
  var proto = arrayClass.getValue("prototype");

  (0, _array10.default)(arrayClass, env, factory);
  (0, _array14.default)(arrayClass, env, factory);

  (0, _array2.default)(proto, env, factory);
  (0, _array4.default)(proto, env, factory);
  (0, _array6.default)(proto, env, factory);
  (0, _array8.default)(proto, env, factory);
  (0, _array12.default)(proto, env, factory);
};

var _array = require("./array.copy-within");

var _array2 = _interopRequireDefault(_array);

var _array3 = require("./array.fill");

var _array4 = _interopRequireDefault(_array3);

var _array5 = require("./array.find");

var _array6 = _interopRequireDefault(_array5);

var _array7 = require("./array.find-index");

var _array8 = _interopRequireDefault(_array7);

var _array9 = require("./array.from");

var _array10 = _interopRequireDefault(_array9);

var _array11 = require("./array.iterator");

var _array12 = _interopRequireDefault(_array11);

var _array13 = require("./array.of");

var _array14 = _interopRequireDefault(_array13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./array.copy-within":273,"./array.fill":274,"./array.find":276,"./array.find-index":275,"./array.from":277,"./array.iterator":278,"./array.of":280}],280:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("of", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    var length, lengthValue, arr, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(this.object === $target || !(0, _checks.isConstructor)(this.object))) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", factory.createArray(items));

          case 2:
            length = items.length;
            lengthValue = factory.createPrimitive(length);
            _context.next = 6;
            return this.object.construct(this.object, [lengthValue]);

          case 6:
            arr = _context.sent;
            i = 0;


            while (i < length) {
              arr.defineProperty(i, { value: items[i], configurable: true, enumerable: true, writable: true }, true);
              i++;
            }

            arr.setValue("length", lengthValue);
            return _context.abrupt("return", arr);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "Array.of"));
};

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"babel-runtime/regenerator":37}],281:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

exports.findIndex = findIndex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findIndex(obj, key) {
  var env = obj[(0, _for2.default)("env")];

  for (var i = 0, length = obj.data.length; i < length; i++) {
    var current = obj.data[i];
    if (current) {
      if (env.ops.areSameOrZero(key, current.key)) {
        return i;
      }
    }
  }

  return -1;
}

},{"babel-runtime/core-js/symbol/for":34}],282:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (globalObject, env, factory) {
  var dateClass = globalObject.getValue("Date");
  var toPrimitiveKey = env.getSymbol("toPrimitive");

  var proto = dateClass.getValue("prototype");
  proto.define(toPrimitiveKey, factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(hint) {
    var primitiveHint, value;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(this.object);
            primitiveHint = undefined;

            if (!(hint && hint.type === "string")) {
              _context.next = 11;
              break;
            }

            _context.t0 = hint.value;
            _context.next = _context.t0 === "string" ? 6 : _context.t0 === "default" ? 6 : _context.t0 === "number" ? 8 : 10;
            break;

          case 6:
            primitiveHint = "string";
            return _context.abrupt("break", 11);

          case 8:
            primitiveHint = "number";
            return _context.abrupt("break", 11);

          case 10:
            return _context.abrupt("break", 11);

          case 11:
            if (primitiveHint) {
              _context.next = 18;
              break;
            }

            _context.next = 14;
            return (0, _native.toString)(hint);

          case 14:
            _context.t1 = _context.sent;
            _context.t2 = "Invalid hint '" + _context.t1;
            _context.t3 = _context.t2 + "'' used in primitive conversion";
            throw TypeError(_context.t3);

          case 18:
            _context.next = 20;
            return (0, _native.toPrimitiveOrdinary)(this.object, primitiveHint);

          case 20:
            value = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(value));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "[Symbol.toPrimitive]"));
};

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],283:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (globalObject, env, factory) {
  var errorClass = globalObject.getValue("Error");
  var proto = errorClass.getValue("prototype");
  proto.className = "Object";
};

},{}],284:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (env) {
  (0, _es2.default)(env);

  var objectFactory = env.objectFactory;
  var $global = env.global;

  (0, _symbol2.default)($global, env, objectFactory);
  (0, _iterator2.default)($global, env, objectFactory);
  (0, _object2.default)($global, env, objectFactory);
  (0, _string2.default)($global, env, objectFactory);
  (0, _array2.default)($global, env, objectFactory);
  (0, _number2.default)($global, env, objectFactory);
  (0, _date2.default)($global, env, objectFactory);
  (0, _error2.default)($global, env, objectFactory);
  (0, _math2.default)($global, env, objectFactory);
  (0, _proxy2.default)($global, env, objectFactory);
  (0, _regex2.default)($global, env, objectFactory);
  (0, _reflect2.default)($global, env, objectFactory);
  (0, _map2.default)($global, env, objectFactory);
  (0, _set2.default)($global, env, objectFactory);

  // setup class symbols
  var stringTagKey = env.getSymbol("toStringTag");
  var speciesKey = env.getSymbol("species");

  ["RegExp", "Array", "Map", "Set"].forEach(function (typeName) {
    var ctor = $global.getValue(typeName);

    var speciesGetter = function speciesGetter() {
      return ctor;
    };
    var speciesGetterFunc = objectFactory.createGetter(speciesGetter, "[Symbol.species]");
    ctor.define(speciesKey, null, { getter: speciesGetter, get: speciesGetterFunc });
  });

  ["JSON", "Math", "Map", "Set"].forEach(function (typeName) {
    var obj = $global.getValue(typeName);
    if (obj.has("prototype")) {
      obj = obj.getValue("prototype");
    }

    obj.define(stringTagKey, objectFactory.createPrimitive(typeName), { writable: false });
  });

  // update length attributes on built-ins
  var lengthAttr = { configurable: true, enumerable: false, writable: false };
  $global.getValue("Function").define("length", objectFactory.createPrimitive(1), lengthAttr);
  $global.getValue("Number").define("length", objectFactory.createPrimitive(1), lengthAttr);
  $global.getValue("Boolean").define("length", objectFactory.createPrimitive(1), lengthAttr);
  $global.getValue("Object").define("length", objectFactory.createPrimitive(1), lengthAttr);
  $global.getValue("Array").define("length", objectFactory.createPrimitive(1), lengthAttr);
  $global.getValue("String").define("length", objectFactory.createPrimitive(1), lengthAttr);
  $global.getValue("Date").define("length", objectFactory.createPrimitive(7), lengthAttr);
  $global.getValue("RegExp").define("length", objectFactory.createPrimitive(2), lengthAttr);
  $global.getValue("Map").define("length", objectFactory.createPrimitive(0), lengthAttr);
  $global.getValue("Set").define("length", objectFactory.createPrimitive(0), lengthAttr);

  var funcProto = $global.getValue("Function").getValue("prototype");

  var thrower = function thrower() {
    throw TypeError("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
  };

  var throwerFunc = objectFactory.createBuiltInFunction(thrower);
  var prop = {
    get: throwerFunc,
    getter: thrower,
    set: throwerFunc,
    setter: thrower,
    enumerable: false,
    configurable: false
  };

  funcProto.define("caller", null, prop);
  funcProto.define("arguments", null, prop);
};

var _es = require("../es5/");

var _es2 = _interopRequireDefault(_es);

var _number = require("./number");

var _number2 = _interopRequireDefault(_number);

var _array = require("./array");

var _array2 = _interopRequireDefault(_array);

var _date = require("./date");

var _date2 = _interopRequireDefault(_date);

var _error = require("./error");

var _error2 = _interopRequireDefault(_error);

var _object = require("./object");

var _object2 = _interopRequireDefault(_object);

var _symbol = require("./symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _string = require("./string");

var _string2 = _interopRequireDefault(_string);

var _proxy = require("./proxy");

var _proxy2 = _interopRequireDefault(_proxy);

var _set = require("./set");

var _set2 = _interopRequireDefault(_set);

var _map = require("./map");

var _map2 = _interopRequireDefault(_map);

var _math = require("./math");

var _math2 = _interopRequireDefault(_math);

var _reflect = require("./reflect");

var _reflect2 = _interopRequireDefault(_reflect);

var _regex = require("./regex");

var _regex2 = _interopRequireDefault(_regex);

var _iterator = require("./iterator");

var _iterator2 = _interopRequireDefault(_iterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../es5/":227,"./array":279,"./date":282,"./error":283,"./iterator":285,"./map":292,"./math":295,"./number":300,"./object":306,"./proxy":309,"./reflect":320,"./regex":325,"./set":332,"./string":338,"./symbol":342}],285:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  var proto = factory.createObject();
  proto.define(env.getSymbol("iterator"), factory.createBuiltInFunction(function () {
    return this.object;
  }, 0, "[Symbol.iterator]"));

  // hack: attach to global though it'd be better if there was another way to access
  $target.define("%IteratorPrototype%", proto);
};

},{}],286:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("clear", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.clear");
    this.object.data = [];
  }, 0, "Map.prototype.clear"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],287:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("delete", factory.createBuiltInFunction(function (key) {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.delete");

    var data = this.object.data;
    if (data.length > 0) {
      var index = (0, _collectionHelpers.findIndex)(this.object, key);
      if (index >= 0) {
        // leave holes in array
        data[index] = undefined;
        return factory.createPrimitive(true);
      }
    }

    return factory.createPrimitive(false);
  }, 1, "Map.prototype.delete"));
};

var _contracts = require("../utils/contracts");

var _collectionHelpers = require("./collection-helpers");

},{"../utils/contracts":377,"./collection-helpers":281}],288:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("forEach", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
    var data, index, entry, args;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsMap)(this.object, "Map.prototype.forEach");
            (0, _contracts.assertIsFunction)(callback, "callback");

            thisArg = thisArg || _primitiveType.UNDEFINED;
            data = this.object.data;
            index = 0;

            // length might change during iteration

          case 5:
            if (!(index < data.length)) {
              _context.next = 13;
              break;
            }

            entry = data[index++];

            if (!entry) {
              _context.next = 11;
              break;
            }

            args = [entry.value, entry.key, this.object];
            _context.next = 11;
            return callback.call(thisArg, args);

          case 11:
            _context.next = 5;
            break;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Map.prototype.forEach"));
};

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"babel-runtime/regenerator":37}],289:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("get", factory.createBuiltInFunction(function (key) {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.get");

    var index = (0, _collectionHelpers.findIndex)(this.object, key);
    if (index >= 0) {
      return this.object.data[index].value;
    }

    return _primitiveType.UNDEFINED;
  }, 1, "Map.prototype.get"));
};

var _contracts = require("../utils/contracts");

var _collectionHelpers = require("./collection-helpers");

var _primitiveType = require("../types/primitive-type");

},{"../types/primitive-type":368,"../utils/contracts":377,"./collection-helpers":281}],290:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("has", factory.createBuiltInFunction(function (key) {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.has");
    return factory.createPrimitive((0, _collectionHelpers.findIndex)(this.object, key) >= 0);
  }, 1, "Map.prototype.has"));
};

var _contracts = require("../utils/contracts");

var _collectionHelpers = require("./collection-helpers");

},{"../utils/contracts":377,"./collection-helpers":281}],291:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  var _marked = [getIterator].map(_regenerator2.default.mark);

  function createIteratorValue(entry, kind) {
    if (kind === "key") {
      return entry.key;
    }

    if (kind === "value") {
      return entry.value;
    }

    return factory.createArray([entry.key, entry.value]);
  }

  function getIterator(obj, kind) {
    var done, index, value, current;
    return _regenerator2.default.wrap(function getIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            done = false;
            index = 0;

          case 2:
            if (done) {
              _context.next = 16;
              break;
            }

            value = undefined;

          case 4:
            if (!(index < obj.data.length)) {
              _context.next = 11;
              break;
            }

            current = obj.data[index++];

            if (!current) {
              _context.next = 9;
              break;
            }

            value = createIteratorValue(current, kind);
            return _context.abrupt("break", 11);

          case 9:
            _context.next = 4;
            break;

          case 11:

            done = !value;
            _context.next = 14;
            return factory.createIteratorResult({ value: value, done: done });

          case 14:
            _context.next = 2;
            break;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  var proto = factory.createObject();
  proto.setPrototype(env.global.getValue("%IteratorPrototype%"));
  proto.define(env.getSymbol("toStringTag"), factory.createPrimitive("Map Iterator"), { writable: false });

  proto.define("next", factory.createBuiltInFunction(function () {
    var result = this.object.advance();
    if (result.value) {
      return result.value;
    }

    return factory.createIteratorResult({ done: result.done });
  }, 0, "MapIterator.prototype.next"));

  $target.define("keys", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.keys");
    var it = getIterator(this.object, "key");
    return factory.createIterator(it, proto);
  }, 0, "Map.prototype.keys"));

  $target.define("values", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.values");
    var it = getIterator(this.object, "value");
    return factory.createIterator(it, proto);
  }, 0, "Map.prototype.values"));

  var iteratorFunc = factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.entries");
    var it = getIterator(this.object);
    return factory.createIterator(it, proto);
  }, 0, "Map.prototype.entries");

  $target.define("entries", iteratorFunc);

  var iteratorKey = env.getSymbol("iterator");
  $target.define(iteratorKey, iteratorFunc);
};

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"babel-runtime/regenerator":37}],292:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($global, env, factory) {
  var proto = factory.createObject();

  var mapClass = factory.createFunction(_regenerator2.default.mark(function _callee3(iterable) {
    var _this = this;

    var instance;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (this.isNew) {
              _context3.next = 2;
              break;
            }

            throw TypeError("Constructor Map requires 'new'");

          case 2:
            instance = factory.create("Map");

            if ((0, _checks.isNullOrUndefined)(iterable)) {
              _context3.next = 5;
              break;
            }

            return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
              var setter, it;
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      (0, _contracts.assertIsObject)(iterable, "Map");

                      setter = instance.getValue("set");

                      (0, _contracts.assertIsFunction)(setter, "set");

                      it = _iterators2.default.getIterator(iterable);
                      _context2.next = 6;
                      return it.each(_regenerator2.default.mark(function _callee(item) {
                        var key, value;
                        return _regenerator2.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                (0, _contracts.assertIsObject)(item, "Map");

                                key = item.getValue("0") || _primitiveType.UNDEFINED;
                                value = item.getValue("1") || _primitiveType.UNDEFINED;
                                _context.next = 5;
                                return setter.call(instance, [key, value]);

                              case 5:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      }));

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            })(), "t0", 5);

          case 5:
            return _context3.abrupt("return", instance);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }), proto, { name: "Map", writable: false });

  (0, _map2.default)(proto, env, factory);
  (0, _map4.default)(proto, env, factory);
  (0, _map6.default)(proto, env, factory);
  (0, _map8.default)(proto, env, factory);
  (0, _map10.default)(proto, env, factory);
  (0, _map12.default)(proto, env, factory);
  (0, _map16.default)(proto, env, factory);
  (0, _map14.default)(proto, env, factory);

  $global.define("Map", mapClass);
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _primitiveType = require("../types/primitive-type");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _map = require("./map.clear");

var _map2 = _interopRequireDefault(_map);

var _map3 = require("./map.delete");

var _map4 = _interopRequireDefault(_map3);

var _map5 = require("./map.for-each");

var _map6 = _interopRequireDefault(_map5);

var _map7 = require("./map.get");

var _map8 = _interopRequireDefault(_map7);

var _map9 = require("./map.has");

var _map10 = _interopRequireDefault(_map9);

var _map11 = require("./map.set");

var _map12 = _interopRequireDefault(_map11);

var _map13 = require("./map.size");

var _map14 = _interopRequireDefault(_map13);

var _map15 = require("./map.iterator");

var _map16 = _interopRequireDefault(_map15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../iterators/":352,"../types/primitive-type":368,"../utils/checks":376,"../utils/contracts":377,"./map.clear":286,"./map.delete":287,"./map.for-each":288,"./map.get":289,"./map.has":290,"./map.iterator":291,"./map.set":293,"./map.size":294,"babel-runtime/regenerator":37}],293:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("set", factory.createBuiltInFunction(function (key, value) {
    (0, _contracts.assertIsMap)(this.object, "Map.prototype.set");

    var index = (0, _collectionHelpers.findIndex)(this.object, key);
    if (index >= 0) {
      this.object.data[index].value = value;
      return this.object;
    }

    if ((0, _checks.isNegativeZero)(key)) {
      key = factory.createPrimitive(+0);
    }

    this.object.data.push({ key: key, value: value });
    return this.object;
  }, 2, "Map.prototype.set"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _collectionHelpers = require("./collection-helpers");

},{"../utils/checks":376,"../utils/contracts":377,"./collection-helpers":281}],294:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  var getter = function getter() {
    (0, _contracts.assertIsMap)(this, "Map.prototype.size");
    return factory.createPrimitive(this.data.filter(function (v) {
      return v;
    }).length);
  };

  var getterFunc = factory.createGetter(function () {
    return getter.call(this.object);
  }, "size");

  $target.define("size", null, {
    getter: getter,
    get: getterFunc
  });
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],295:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($global, env, factory) {
  var mathClass = $global.getValue("Math");

  // todo: there's got to be a way to import these more dynamically...
  mathClass.define("acosh", (0, _native.toNativeFunction)(env, _acosh2.default), "Math.acosh");
  mathClass.define("asinh", (0, _native.toNativeFunction)(env, _asinh2.default), "Math.asinh");
  mathClass.define("atanh", (0, _native.toNativeFunction)(env, _atanh2.default), "Math.atanh");
  mathClass.define("cbrt", (0, _native.toNativeFunction)(env, _cbrt2.default), "Math.cbrt");
  mathClass.define("clz32", (0, _native.toNativeFunction)(env, _clz2.default), "Math.clz32");
  mathClass.define("cosh", (0, _native.toNativeFunction)(env, _cosh2.default), "Math.cosh");
  mathClass.define("expm1", (0, _native.toNativeFunction)(env, _expm2.default), "Math.expm1");
  mathClass.define("fround", (0, _native.toNativeFunction)(env, _fround2.default), "Math.fround");
  mathClass.define("hypot", (0, _native.toNativeFunction)(env, _hypot2.default), "Math.hypot");
  mathClass.define("imul", (0, _native.toNativeFunction)(env, _imul2.default), "Math.imul");
  mathClass.define("log10", (0, _native.toNativeFunction)(env, _log2.default), "Math.log10");
  mathClass.define("log2", (0, _native.toNativeFunction)(env, _log4.default), "Math.log2");
  mathClass.define("log1p", (0, _native.toNativeFunction)(env, _log1p2.default), "Math.log1p");
  mathClass.define("sign", (0, _native.toNativeFunction)(env, _sign2.default), "Math.sign");
  mathClass.define("sinh", (0, _native.toNativeFunction)(env, _sinh2.default), "Math.sinh");
  mathClass.define("tanh", (0, _native.toNativeFunction)(env, _tanh2.default), "Math.tanh");
  mathClass.define("trunc", (0, _native.toNativeFunction)(env, _trunc2.default), "Math.trunc");
};

var _acosh = require("babel-runtime/core-js/math/acosh");

var _acosh2 = _interopRequireDefault(_acosh);

var _asinh = require("babel-runtime/core-js/math/asinh");

var _asinh2 = _interopRequireDefault(_asinh);

var _atanh = require("babel-runtime/core-js/math/atanh");

var _atanh2 = _interopRequireDefault(_atanh);

var _cbrt = require("babel-runtime/core-js/math/cbrt");

var _cbrt2 = _interopRequireDefault(_cbrt);

var _clz = require("babel-runtime/core-js/math/clz32");

var _clz2 = _interopRequireDefault(_clz);

var _cosh = require("babel-runtime/core-js/math/cosh");

var _cosh2 = _interopRequireDefault(_cosh);

var _expm = require("babel-runtime/core-js/math/expm1");

var _expm2 = _interopRequireDefault(_expm);

var _fround = require("babel-runtime/core-js/math/fround");

var _fround2 = _interopRequireDefault(_fround);

var _hypot = require("babel-runtime/core-js/math/hypot");

var _hypot2 = _interopRequireDefault(_hypot);

var _imul = require("babel-runtime/core-js/math/imul");

var _imul2 = _interopRequireDefault(_imul);

var _log = require("babel-runtime/core-js/math/log10");

var _log2 = _interopRequireDefault(_log);

var _log3 = require("babel-runtime/core-js/math/log2");

var _log4 = _interopRequireDefault(_log3);

var _log1p = require("babel-runtime/core-js/math/log1p");

var _log1p2 = _interopRequireDefault(_log1p);

var _sign = require("babel-runtime/core-js/math/sign");

var _sign2 = _interopRequireDefault(_sign);

var _sinh = require("babel-runtime/core-js/math/sinh");

var _sinh2 = _interopRequireDefault(_sinh);

var _tanh = require("babel-runtime/core-js/math/tanh");

var _tanh2 = _interopRequireDefault(_tanh);

var _trunc = require("babel-runtime/core-js/math/trunc");

var _trunc2 = _interopRequireDefault(_trunc);

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/core-js/math/acosh":5,"babel-runtime/core-js/math/asinh":6,"babel-runtime/core-js/math/atanh":7,"babel-runtime/core-js/math/cbrt":8,"babel-runtime/core-js/math/clz32":9,"babel-runtime/core-js/math/cosh":10,"babel-runtime/core-js/math/expm1":11,"babel-runtime/core-js/math/fround":12,"babel-runtime/core-js/math/hypot":13,"babel-runtime/core-js/math/imul":14,"babel-runtime/core-js/math/log10":15,"babel-runtime/core-js/math/log1p":16,"babel-runtime/core-js/math/log2":17,"babel-runtime/core-js/math/sign":18,"babel-runtime/core-js/math/sinh":19,"babel-runtime/core-js/math/tanh":20,"babel-runtime/core-js/math/trunc":21}],296:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (target, env, factory) {
  target.define("isFinite", factory.createBuiltInFunction(function (value) {
    if (!(0, _checks.isNumber)(value)) {
      return factory.createPrimitive(false);
    }

    var numberValue = value.toNative();
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return factory.createPrimitive(false);
    }

    return factory.createPrimitive(true);
  }, 1, "Number.isFinite"));
};

var _checks = require("../utils/checks");

},{"../utils/checks":376}],297:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("isInteger", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
    var numberValue, intValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _checks.isNumber)(value)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(false));

          case 2:
            numberValue = value.toNative();

            if (!(isNaN(numberValue) || !isFinite(numberValue))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(false));

          case 5:
            _context.next = 7;
            return (0, _native.toInteger)(value);

          case 7:
            intValue = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(numberValue === intValue));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Number.isInteger"));
};

var _checks = require("../utils/checks");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/native":379,"babel-runtime/regenerator":37}],298:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (target, env, factory) {
  target.define("isNaN", factory.createBuiltInFunction(function (value) {
    if (!(0, _checks.isNumber)(value)) {
      return factory.createPrimitive(false);
    }

    return factory.createPrimitive(isNaN(value.toNative()));
  }, 1, "Number.isNaN"));
};

var _checks = require("../utils/checks");

},{"../utils/checks":376}],299:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _minSafeInteger = require("babel-runtime/core-js/number/min-safe-integer");

var _minSafeInteger2 = _interopRequireDefault(_minSafeInteger);

var _maxSafeInteger = require("babel-runtime/core-js/number/max-safe-integer");

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

exports.default = function (target, env, factory) {
  var MAX_SAFE_INTEGER = _maxSafeInteger2.default || 9007199254740991;
  var MIN_SAFE_INTEGER = _minSafeInteger2.default || -9007199254740991;

  target.define("MAX_SAFE_INTEGER", factory.createPrimitive(MAX_SAFE_INTEGER), { configurable: false, writable: false });
  target.define("MIN_SAFE_INTEGER", factory.createPrimitive(MIN_SAFE_INTEGER), { configurable: false, writable: false });

  target.define("isSafeInteger", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
    var numberValue, intValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _checks.isNumber)(value)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(false));

          case 2:
            numberValue = value.toNative();

            if (!(isNaN(numberValue) || !isFinite(numberValue))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(false));

          case 5:
            _context.next = 7;
            return (0, _native.toInteger)(value);

          case 7:
            intValue = _context.sent;

            if (!(intValue !== numberValue)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(false));

          case 10:
            return _context.abrupt("return", factory.createPrimitive(Math.abs(numberValue) <= MAX_SAFE_INTEGER));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Number.isSafeInteger"));
};

var _checks = require("../utils/checks");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/native":379,"babel-runtime/core-js/number/max-safe-integer":23,"babel-runtime/core-js/number/min-safe-integer":24,"babel-runtime/regenerator":37}],300:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _epsilon = require("babel-runtime/core-js/number/epsilon");

var _epsilon2 = _interopRequireDefault(_epsilon);

exports.default = function (globalObject, env, factory) {
  var numberClass = globalObject.getValue("Number");

  (0, _number2.default)(numberClass, env, factory);
  (0, _number4.default)(numberClass, env, factory);
  (0, _number6.default)(numberClass, env, factory);
  (0, _number8.default)(numberClass, env, factory);
  (0, _number10.default)(numberClass, env, factory);
  (0, _number12.default)(numberClass, env, factory);

  var epsilonValue = factory.createPrimitive(_epsilon2.default || 2.220446049250313e-16);
  numberClass.define("EPSILON", epsilonValue, { configurable: false, writable: false });
};

var _number = require("./number.is-finite");

var _number2 = _interopRequireDefault(_number);

var _number3 = require("./number.is-integer");

var _number4 = _interopRequireDefault(_number3);

var _number5 = require("./number.is-nan");

var _number6 = _interopRequireDefault(_number5);

var _number7 = require("./number.is-safe-integer");

var _number8 = _interopRequireDefault(_number7);

var _number9 = require("./number.parse-float");

var _number10 = _interopRequireDefault(_number9);

var _number11 = require("./number.parse-int");

var _number12 = _interopRequireDefault(_number11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./number.is-finite":296,"./number.is-integer":297,"./number.is-nan":298,"./number.is-safe-integer":299,"./number.parse-float":301,"./number.parse-int":302,"babel-runtime/core-js/number/epsilon":22}],301:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("parseFloat", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value) {
    var stringValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toString)(value);

          case 2:
            stringValue = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(parseFloat(stringValue)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Number.parseFloat"));
};

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/regenerator":37}],302:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("parseInt", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value, radix) {
    var stringValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return toString(value);

          case 2:
            stringValue = _context.sent;
            _context.next = 5;
            return (0, _native.toPrimitive)(radix, "number");

          case 5:
            radix = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(parseInt(stringValue, radix)));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Number.parseInt"));
};

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/regenerator":37}],303:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (objectClass, env, factory) {
  objectClass.define("assign", factory.createBuiltInFunction(function (target) {
    var to = (0, _native.toObject)(target, true);

    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (next) {
      if (!(0, _checks.isNullOrUndefined)(next)) {
        (function () {
          var source = (0, _native.toObject)(next);

          source.getOwnPropertyKeys().forEach(function (key) {
            var desc = source.getOwnProperty(key);
            if (desc && desc.enumerable) {
              if (!to.setValue(key, source.getValue(key))) {
                throw TypeError("Cannot assign to read only property '" + key + "'");
              }
            }
          });
        })();
      }
    });

    return to;
  }, 2, "Object.assign"));
};

var _native = require("../utils/native");

var _checks = require("../utils/checks");

},{"../utils/checks":376,"../utils/native":379}],304:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (target, env, factory) {
  target.define("getOwnPropertySymbols", factory.createBuiltInFunction(function (obj) {
    (0, _contracts.assertIsNotNullOrUndefined)(obj, "Object.getOwnPropertySymbols");
    var keys = [];

    obj.getOwnPropertyKeys("Symbol").forEach(function (key) {
      if (key && key.isSymbol) {
        keys.push(key);
      }
    });

    return factory.createArray(keys);
  }, 1, "Object.getOwnPropertySymbols"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],305:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (target, env, factory) {
  target.define("is", factory.createBuiltInFunction(function (a, b) {
    var result = env.ops.areSame(a || _primitiveType.UNDEFINED, b || _primitiveType.UNDEFINED);
    return factory.createPrimitive(result);
  }, 2, "Object.is"));
};

var _primitiveType = require("../types/primitive-type");

},{"../types/primitive-type":368}],306:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (globalObject, env, factory) {
  var objectClass = globalObject.getValue("Object");
  var proto = objectClass.getValue("prototype");

  objectClass.define("getOwnPropertyNames", factory.createBuiltInFunction(function (obj) {
    (0, _contracts.assertIsNotNullOrUndefined)(obj, "Object.getOwnPropertyNames");

    var keys = [];
    obj.getOwnPropertyKeys("String").forEach(function (key) {
      if (typeof key === "string") {
        keys.push(factory.createPrimitive(key));
      }
    });

    return factory.createArray(keys);
  }, 1, "Object.getOwnPropertyNames"));

  objectClass.define("keys", factory.createBuiltInFunction(function (obj) {
    (0, _contracts.assertIsNotNullOrUndefined)(obj, "Object.keys");

    var keys = [];
    obj.getOwnPropertyKeys("String").forEach(function (key) {
      if (typeof key === "string") {
        var propInfo = obj.getProperty(key);
        if (propInfo && propInfo.enumerable) {
          keys.push(factory.createPrimitive(key));
        }
      }
    });

    return factory.createArray(keys);
  }, 1, "Object.keys"));

  (0, _object4.default)(objectClass, env, factory);
  (0, _object2.default)(objectClass, env, factory);
  (0, _object6.default)(objectClass, env, factory);
  (0, _object8.default)(objectClass, env, factory);
  (0, _object10.default)(proto, env, factory);
};

var _contracts = require("../utils/contracts");

var _object = require("./object.is");

var _object2 = _interopRequireDefault(_object);

var _object3 = require("./object.assign");

var _object4 = _interopRequireDefault(_object3);

var _object5 = require("./object.get-own-property-symbols");

var _object6 = _interopRequireDefault(_object5);

var _object7 = require("./object.set-prototype-of");

var _object8 = _interopRequireDefault(_object7);

var _object9 = require("./object.to-string");

var _object10 = _interopRequireDefault(_object9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"./object.assign":303,"./object.get-own-property-symbols":304,"./object.is":305,"./object.set-prototype-of":307,"./object.to-string":308}],307:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("setPrototypeOf", factory.createBuiltInFunction(function (target, proto) {
    (0, _contracts.assertIsNotNullOrUndefined)(target, "setPrototypeOf");

    if (!(0, _checks.isObject)(proto) && !(0, _checks.isNull)(proto)) {
      throw TypeError("Object prototype may only be an Object or null");
    }

    if ((0, _checks.isObject)(target) && !target.setPrototype(proto)) {
      throw TypeError(target.className + " is not extensible");
    }

    return target;
  }, 2, "Object.setPrototypeOf"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

},{"../utils/checks":376,"../utils/contracts":377}],308:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (target, env, factory) {
  var stringTagKey = env.getSymbol("toStringTag");

  function objectToString(obj) {
    var tag = obj.className;

    if (!(0, _checks.isNullOrUndefined)(obj)) {
      var tagProperty = obj.getProperty(stringTagKey);
      if (tagProperty) {
        var tagValue = tagProperty.getValue();
        if (tagValue && tagValue.type === "string") {
          tag = tagValue.toNative();
        }
      }
    }

    return factory.createPrimitive("[object " + tag + "]");
  };

  target.define("toString", factory.createBuiltInFunction(function () {
    return objectToString(this.object);
  }, 0, "Object.prototype.toString"));

  target.define("toLocaleString", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotNullOrUndefined)(this.object, "Object.prototype.toLocaleString");
    return objectToString(this.object);
  }, 0, "Object.prototype.toLocaleString"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

},{"../utils/checks":376,"../utils/contracts":377}],309:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (globalObject, env, factory) {
  var proxyClass = factory.createFunction(function (target, handler) {
    if (!this.isNew) {
      throw TypeError();
    }

    return factory.createProxy(target, handler);
  }, null, { name: "Proxy" });

  proxyClass.define("revocable", factory.createBuiltInFunction(function (target, handler) {
    var proxy = factory.createProxy(target, handler);

    var obj = factory.createObject();
    obj.define("proxy", proxy);
    obj.define("revoke", factory.createBuiltInFunction(function () {
      proxy.revoke();
    }, 0));

    return obj;
  }, 2, "Proxy.revocable"));

  proxyClass.define("length", factory.createPrimitive(2), { writable: false });
  globalObject.define("Proxy", proxyClass);
};

},{}],310:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("apply", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, thisArg, argsArray) {
    var args, callee;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsFunction)(target, "target");

            if (argsArray) {
              (0, _contracts.assertIsObject)(argsArray, "Reflect.apply");
            }

            _context.next = 4;
            return (0, _native.toArray)(argsArray);

          case 4:
            args = _context.sent;
            callee = target.native ? target : target.node;
            _context.next = 8;
            return target.call(thisArg, args, callee);

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 3, "Reflect.apply"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],311:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("construct", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, argsArray, newTarget) {
    var args, ctor, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsFunction)(target, "target");

            if (argsArray) {
              (0, _contracts.assertIsObject)(argsArray, "Reflect.construct");
            }

            if (!(!(0, _checks.isUndefined)(newTarget) && !(0, _checks.isConstructor)(newTarget))) {
              _context.next = 4;
              break;
            }

            throw TypeError("Provided newTarget is not a constructor.");

          case 4:
            _context.next = 6;
            return (0, _native.toArray)(argsArray);

          case 6:
            args = _context.sent;
            ctor = newTarget || target;
            obj = factory.createObject(ctor);
            _context.next = 11;
            return target.construct(obj, args, ctor);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Reflect.construct"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],312:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("defineProperty", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, propertyKey, descriptor) {
    var key;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(target, "Reflect.defineProperty");

            _context.next = 3;
            return (0, _native.toPropertyKey)(propertyKey);

          case 3:
            key = _context.sent;
            _context.t0 = factory;
            _context.next = 7;
            return (0, _objectHelpers.defineProperty)(env, target, key, descriptor, false);

          case 7:
            _context.t1 = _context.sent;
            return _context.abrupt("return", _context.t0.createPrimitive.call(_context.t0, _context.t1));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 3, "Reflect.defineProperty"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

var _objectHelpers = require("../es5/object/object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../es5/object/object-helpers":237,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],313:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("deleteProperty", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, propertyKey) {
    var key;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(target, "Reflect.deleteProperty");

            _context.next = 3;
            return (0, _native.toPropertyKey)(propertyKey);

          case 3:
            key = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(target.deleteProperty(key, false)));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Reflect.deleteProperty"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],314:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("enumerate", factory.createBuiltInFunction(function (target) {
    (0, _contracts.assertIsObject)(target, "Reflect.enumerate");
    return target.getIterator();
  }, 1, "Reflect.enumerate"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],315:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("getOwnPropertyDescriptor", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, propertyKey) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(target, "Reflect.getOwnPropertyDescriptor");
            _context.next = 3;
            return (0, _objectHelpers.getOwnPropertyDescriptor)(env, target, propertyKey);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Reflect.getOwnPropertyDescriptor"));
};

var _contracts = require("../utils/contracts");

var _objectHelpers = require("../es5/object/object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../es5/object/object-helpers":237,"../utils/contracts":377,"babel-runtime/regenerator":37}],316:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("getPrototypeOf", factory.createBuiltInFunction(function (target) {
    (0, _contracts.assertIsObject)(target, "Reflect.getPrototypeOf");
    return target.getPrototype();
  }, 1, "Reflect.getPrototypeOf"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],317:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("get", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, propertyKey, receiver) {
    var key, property;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(target, "Reflect.get");
            _context.next = 3;
            return (0, _native.toPropertyKey)(propertyKey);

          case 3:
            key = _context.sent;
            property = target.getProperty(key);

            if (!property) {
              _context.next = 8;
              break;
            }

            property.bind(receiver || target);
            return _context.abrupt("return", property.getValue());

          case 8:
            return _context.abrupt("return", _primitiveType.UNDEFINED);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Reflect.get"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],318:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("has", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, propertyKey) {
    var key;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(target, "Reflect.has");
            _context.next = 3;
            return (0, _native.toPropertyKey)(propertyKey);

          case 3:
            key = _context.sent;
            return _context.abrupt("return", factory.createPrimitive(target.has(key)));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "Reflect.has"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],319:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("isExtensible", factory.createBuiltInFunction(function (target) {
    (0, _contracts.assertIsObject)(target, "Reflect.isExtensible");
    return factory.createPrimitive(target.isExtensible());
  }, 1, "Reflect.isExtensible"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],320:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (globalObject, env, factory) {
  var reflectClass = factory.createObject();

  (0, _reflect2.default)(reflectClass, env, factory);
  (0, _reflect4.default)(reflectClass, env, factory);
  (0, _reflect6.default)(reflectClass, env, factory);
  (0, _reflect8.default)(reflectClass, env, factory);
  (0, _reflect10.default)(reflectClass, env, factory);
  (0, _reflect12.default)(reflectClass, env, factory);
  (0, _reflect14.default)(reflectClass, env, factory);
  (0, _reflect16.default)(reflectClass, env, factory);
  (0, _reflect18.default)(reflectClass, env, factory);
  (0, _reflect20.default)(reflectClass, env, factory);
  (0, _reflect22.default)(reflectClass, env, factory);
  (0, _reflect24.default)(reflectClass, env, factory);
  (0, _reflect26.default)(reflectClass, env, factory);
  (0, _reflect28.default)(reflectClass, env, factory);

  globalObject.define("Reflect", reflectClass);
};

var _reflect = require("./reflect.apply");

var _reflect2 = _interopRequireDefault(_reflect);

var _reflect3 = require("./reflect.construct");

var _reflect4 = _interopRequireDefault(_reflect3);

var _reflect5 = require("./reflect.define-property");

var _reflect6 = _interopRequireDefault(_reflect5);

var _reflect7 = require("./reflect.delete-property");

var _reflect8 = _interopRequireDefault(_reflect7);

var _reflect9 = require("./reflect.enumerate");

var _reflect10 = _interopRequireDefault(_reflect9);

var _reflect11 = require("./reflect.get");

var _reflect12 = _interopRequireDefault(_reflect11);

var _reflect13 = require("./reflect.get-own-property-descriptor");

var _reflect14 = _interopRequireDefault(_reflect13);

var _reflect15 = require("./reflect.get-prototype-of");

var _reflect16 = _interopRequireDefault(_reflect15);

var _reflect17 = require("./reflect.has");

var _reflect18 = _interopRequireDefault(_reflect17);

var _reflect19 = require("./reflect.is-extensible");

var _reflect20 = _interopRequireDefault(_reflect19);

var _reflect21 = require("./reflect.own-keys");

var _reflect22 = _interopRequireDefault(_reflect21);

var _reflect23 = require("./reflect.prevent-extensions");

var _reflect24 = _interopRequireDefault(_reflect23);

var _reflect25 = require("./reflect.set");

var _reflect26 = _interopRequireDefault(_reflect25);

var _reflect27 = require("./reflect.set-prototype-of");

var _reflect28 = _interopRequireDefault(_reflect27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./reflect.apply":310,"./reflect.construct":311,"./reflect.define-property":312,"./reflect.delete-property":313,"./reflect.enumerate":314,"./reflect.get":317,"./reflect.get-own-property-descriptor":315,"./reflect.get-prototype-of":316,"./reflect.has":318,"./reflect.is-extensible":319,"./reflect.own-keys":321,"./reflect.prevent-extensions":322,"./reflect.set":324,"./reflect.set-prototype-of":323}],321:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("ownKeys", factory.createBuiltInFunction(function (target) {
    (0, _contracts.assertIsObject)(target, "Reflect.ownKeys");

    var keys = target.getOwnPropertyKeys().map(function (key) {
      return factory.createPrimitive(key);
    });
    return factory.createArray(keys);
  }, 1, "Reflect.ownKeys"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],322:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("preventExtensions", factory.createBuiltInFunction(function (target) {
    (0, _contracts.assertIsObject)(target, "Reflect.preventExtensions");
    return factory.createPrimitive(target.preventExtensions());
  }, 1, "Reflect.preventExtensions"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],323:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("setPrototypeOf", factory.createBuiltInFunction(function (target, proto) {
    (0, _contracts.assertIsObject)(target, "Reflect.setPrototypeOf");

    if (proto !== _primitiveType.NULL && proto.type !== "object") {
      throw TypeError("The prototype must be an object or null");
    }

    return factory.createPrimitive(target.setPrototype(proto));
  }, 2, "Reflect.setPrototypeOf"));
};

var _contracts = require("../utils/contracts");

var _primitiveType = require("../types/primitive-type");

},{"../types/primitive-type":368,"../utils/contracts":377}],324:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("set", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(target, key, value, receiver) {
    var k;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsObject)(target, "Reflect.set");
            _context.next = 3;
            return (0, _native.toPropertyKey)(key);

          case 3:
            k = _context.sent;


            if ((0, _checks.isUndefined)(receiver)) {
              receiver = target;
            }

            return _context.abrupt("return", factory.createPrimitive(target.setValue(k, value, receiver)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 3, "Reflect.set"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],325:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (globalObject, env, factory) {
  var regexClass = globalObject.getValue("RegExp");
  var proto = regexClass.getValue("prototype");

  var replaceKey = env.getSymbol("replace");
  proto.define(replaceKey, factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(value, replaceValue) {
    var stringValue, replacer;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _native.toString)(value);

          case 2:
            stringValue = _context.sent;
            replacer = undefined;

            if (!(0, _checks.isFunction)(replaceValue)) {
              _context.next = 8;
              break;
            }

            replacer = function replacer() {
              var thisArg = replaceValue.strict || env.isStrict() ? _primitiveType.UNDEFINED : env.global;

              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var mappedArgs = args.map(function (arg) {
                return factory.createPrimitive(arg);
              });
              var result = (0, _async.exhaust)(replaceValue.call(thisArg, mappedArgs));
              return result ? (0, _async.exhaust)((0, _native.toString)(result)) : undefined;
            };
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _native.toString)(replaceValue);

          case 10:
            replacer = _context.sent;

          case 11:
            return _context.abrupt("return", factory.createPrimitive(stringValue.replace(this.object.source, replacer)));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 2, "RegExp.prototype[Symbol.replace]"));

  var matchKey = env.getSymbol("match");
  proto.define(matchKey, factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2(value) {
    var stringValue, match, _ret;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _native.toString)(value);

          case 2:
            stringValue = _context2.sent;
            match = stringValue.match(this.object.source);

            if (!match) {
              _context2.next = 8;
              break;
            }

            _ret = function () {
              var matches = factory.createArray();

              match.forEach(function (v, i) {
                return matches.setValue(i, factory.createPrimitive(v));
              });
              matches.setValue("index", factory.createPrimitive(match.index));
              matches.setValue("input", factory.createPrimitive(match.input));

              return {
                v: matches
              };
            }();

            if (!((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object")) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", _ret.v);

          case 8:
            return _context2.abrupt("return", _primitiveType.NULL);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 1, "RegExp.prototype[Symbol.match]"));

  var splitKey = env.getSymbol("split");
  proto.define(splitKey, factory.createBuiltInFunction(_regenerator2.default.mark(function _callee3(value, limit) {
    var stringValue, limitValue, arr, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _native.toString)(value);

          case 2:
            stringValue = _context3.sent;

            limit = limit && limit.getValue();

            if (!(0, _checks.isUndefined)(limit)) {
              _context3.next = 8;
              break;
            }

            _context3.t0 = undefined;
            _context3.next = 11;
            break;

          case 8:
            _context3.next = 10;
            return (0, _native.toUInt32)(limit);

          case 10:
            _context3.t0 = _context3.sent;

          case 11:
            limitValue = _context3.t0;
            arr = factory.createArray();
            result = stringValue.split(this.object.source, limitValue);

            result.forEach(function (val, index) {
              arr.setValue(index, factory.createPrimitive(val));
            });

            return _context3.abrupt("return", arr);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }), 2, "RegExp.prototype[Symbol.split]"));

  var searchKey = env.getSymbol("search");
  proto.define(searchKey, factory.createBuiltInFunction(_regenerator2.default.mark(function _callee4(value) {
    var stringValue;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _native.toString)(value);

          case 2:
            stringValue = _context4.sent;
            return _context4.abrupt("return", factory.createPrimitive(stringValue.search(this.object.source)));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }), 1, "RegExp.prototype[Symbol.search]"));

  ["source", "global", "ignoreCase", "multiline"].forEach(function (key) {
    var source = RegExp.prototype;
    var getter = function getter() {
      return factory.createPrimitive(source[key]);
    };
    var getterFunc = factory.createGetter(getter, key);

    proto.define(key, null, {
      getter: getter,
      get: getterFunc
    });
  });

  var flagAliases = {
    "global": "g",
    "ignoreCase": "i",
    "multiline": "m",
    "unicode": "u",
    "sticky": "y"
  };

  var flags = ["global", "ignoreCase", "multiline", "unicode", "sticky"];

  var flagsGetter = function flagsGetter() {
    var _this = this;

    var thisFlags = "";
    flags.forEach(function (f) {
      if ((0, _native.toBoolean)(_this.getValue(f))) {
        thisFlags += flagAliases[f];
      }
    });

    return factory.createPrimitive(thisFlags);
  };

  proto.defineProperty("flags", { configurable: true, get: factory.createGetter(flagsGetter, "flags"), getter: flagsGetter });
};

var _async = require("../utils/async");

var _primitiveType = require("../types/primitive-type");

var _native = require("../utils/native");

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/async":375,"../utils/checks":376,"../utils/native":379,"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37}],326:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("add", factory.createBuiltInFunction(function (value) {
    (0, _contracts.assertIsSet)(this.object, "Set.prototype.add");

    if ((0, _checks.isNegativeZero)(value)) {
      value = factory.createPrimitive(+0);
    }

    if (!this.object.data.some(function (e) {
      return e && env.ops.areSameOrZero(e, value);
    })) {
      this.object.data.push(value);
    }

    return this.object;
  }, 1, "Set.prototype.add"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

},{"../utils/checks":376,"../utils/contracts":377}],327:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("clear", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsSet)(this.object, "Set.prototype.clear");
    this.object.data = [];
  }, 0, "Set.prototype.clear"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],328:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("delete", factory.createBuiltInFunction(function (value) {
    (0, _contracts.assertIsSet)(this.object, "Set.prototype.delete");

    var entries = this.object.data;
    var index = entries.length;

    while (index--) {
      var current = entries[index];
      if (current && env.ops.areSameOrZero(current, value)) {
        entries[index] = undefined;
        return factory.createPrimitive(true);
      }
    }

    return factory.createPrimitive(false);
  }, 1, "Set.prototype.delete"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],329:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  $target.define("forEach", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(callback, thisArg) {
    var data, index, entry, args;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsSet)(this.object, "Set.prototype.forEach");

            thisArg = thisArg || _primitiveType.UNDEFINED;
            data = this.object.data;
            index = 0;

            // length might change during iteration

          case 4:
            if (!(index < data.length)) {
              _context.next = 12;
              break;
            }

            entry = data[index++];

            if (!entry) {
              _context.next = 10;
              break;
            }

            args = [entry, entry, this.object];
            _context.next = 10;
            return callback.call(thisArg, args);

          case 10:
            _context.next = 4;
            break;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Set.prototype.forEach"));
};

var _contracts = require("../utils/contracts");

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"babel-runtime/regenerator":37}],330:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  $target.define("has", factory.createBuiltInFunction(function (value) {
    (0, _contracts.assertIsSet)(this.object, "Set.prototype.has");
    var has = this.object.data.some(function (e) {
      return e && env.ops.areSameOrZero(e, value);
    });
    return factory.createPrimitive(has);
  }, 1, "Set.prototype.has"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],331:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($target, env, factory) {
  var _marked = [getIterator].map(_regenerator2.default.mark);

  function getIterator(obj, kind) {
    var index, done, value;
    return _regenerator2.default.wrap(function getIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            index = 0;
            done = false;

          case 2:
            if (done) {
              _context.next = 16;
              break;
            }

            value = undefined;

          case 4:
            if (!(index < obj.data.length)) {
              _context.next = 10;
              break;
            }

            value = obj.data[index++];

            if (!value) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("break", 10);

          case 8:
            _context.next = 4;
            break;

          case 10:

            done = !value;
            if (value && kind !== "key" && kind !== "value") {
              value = factory.createArray([value, value]);
            }

            _context.next = 14;
            return factory.createIteratorResult({ value: value, done: done });

          case 14:
            _context.next = 2;
            break;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  var proto = factory.createObject();
  proto.setPrototype(env.global.getValue("%IteratorPrototype%"));
  proto.define(env.getSymbol("toStringTag"), factory.createPrimitive("Set Iterator"), { writable: false });

  proto.define("next", factory.createBuiltInFunction(function () {
    var result = this.object.advance();
    if (result.value) {
      return result.value;
    }

    return factory.createIteratorResult({ done: result.done });
  }, 0, "SetIterator.prototype.next"));

  $target.define("entries", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsSet)(this.object, "Set.prototype.entries");
    var it = getIterator(this.object, "key+value");
    return factory.createIterator(it, proto);
  }, 0, "Set.prototype.entries"));

  var valuesFunc = factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsSet)(this.object, "Set.prototype.values");
    var it = getIterator(this.object, "value");
    return factory.createIterator(it, proto);
  }, 0, "Set.prototype.values");

  $target.define("values", valuesFunc);
  $target.define("keys", valuesFunc);

  var iteratorKey = env.getSymbol("iterator");
  $target.define(iteratorKey, valuesFunc);
};

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"babel-runtime/regenerator":37}],332:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function ($global, env, factory) {
  var proto = factory.createObject();

  var setClass = factory.createFunction(_regenerator2.default.mark(function _callee3(iterable) {
    var _this = this;

    var instance;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (this.isNew) {
              _context3.next = 2;
              break;
            }

            throw TypeError("Constructor Set requires 'new'");

          case 2:
            instance = factory.create("Set");

            if ((0, _checks.isNullOrUndefined)(iterable)) {
              _context3.next = 5;
              break;
            }

            return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
              var adder, it;
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      (0, _contracts.assertIsObject)(iterable, "Set");

                      adder = proto.getValue("add");

                      (0, _contracts.assertIsFunction)(adder, "add");

                      it = _iterators2.default.getIterator(iterable);
                      _context2.next = 6;
                      return it.each(_regenerator2.default.mark(function _callee(item) {
                        return _regenerator2.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return adder.call(instance, [item]);

                              case 2:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      }));

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            })(), "t0", 5);

          case 5:
            return _context3.abrupt("return", instance);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }), proto, { name: "Set" });

  (0, _set2.default)(proto, env, factory);
  (0, _set4.default)(proto, env, factory);
  (0, _set6.default)(proto, env, factory);
  (0, _set8.default)(proto, env, factory);
  (0, _set10.default)(proto, env, factory);
  (0, _set12.default)(proto, env, factory);
  (0, _set14.default)(proto, env, factory);

  $global.define("Set", setClass);
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _iterators = require("../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

var _set = require("./set.add");

var _set2 = _interopRequireDefault(_set);

var _set3 = require("./set.clear");

var _set4 = _interopRequireDefault(_set3);

var _set5 = require("./set.delete");

var _set6 = _interopRequireDefault(_set5);

var _set7 = require("./set.for-each");

var _set8 = _interopRequireDefault(_set7);

var _set9 = require("./set.has");

var _set10 = _interopRequireDefault(_set9);

var _set11 = require("./set.size");

var _set12 = _interopRequireDefault(_set11);

var _set13 = require("./set.iterator");

var _set14 = _interopRequireDefault(_set13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../iterators":352,"../utils/checks":376,"../utils/contracts":377,"./set.add":326,"./set.clear":327,"./set.delete":328,"./set.for-each":329,"./set.has":330,"./set.iterator":331,"./set.size":333,"babel-runtime/regenerator":37}],333:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function ($target, env, factory) {
  var getter = function getter() {
    (0, _contracts.assertIsSet)(this, "Set.prototype.size");
    return factory.createPrimitive(this.data.filter(function (v) {
      return v;
    }).length);
  };

  var getterFunc = factory.createGetter(function () {
    return getter.call(this.object);
  }, "size");

  $target.define("size", null, {
    getter: getter,
    get: getterFunc
  });
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":377}],334:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("codePointAt", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(pos) {
    var stringValue, position;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.codePointAt");
            _context.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context.sent;
            _context.next = 6;
            return (0, _native.toInteger)(pos);

          case 6:
            position = _context.sent;

            if (!(position < 0 || position >= stringValue.length)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", _primitiveType.UNDEFINED);

          case 9:
            return _context.abrupt("return", factory.createPrimitive((0, _codePointAt2.default)(stringValue, position)));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "String.prototype.codePointAt"));
};

var _codePointAt = require("babel-runtime/core-js/string/code-point-at");

var _codePointAt2 = _interopRequireDefault(_codePointAt);

var _primitiveType = require("../types/primitive-type");

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"../utils/native":379,"babel-runtime/core-js/string/code-point-at":30,"babel-runtime/regenerator":37}],335:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("fromCodePoint", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2() {
    for (var _len = arguments.length, codePoints = Array(_len), _key = 0; _key < _len; _key++) {
      codePoints[_key] = arguments[_key];
    }

    var args;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _async.map)(codePoints, _regenerator2.default.mark(function _callee(cp) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _native.toNumber)(cp);

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

          case 2:
            args = _context2.sent;
            return _context2.abrupt("return", factory.createPrimitive(_fromCodePoint2.default.apply(undefined, args)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 1, "String.fromCodePoint"));
};

var _fromCodePoint = require("babel-runtime/core-js/string/from-code-point");

var _fromCodePoint2 = _interopRequireDefault(_fromCodePoint);

var _async = require("../utils/async");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/async":375,"../utils/native":379,"babel-runtime/core-js/string/from-code-point":31,"babel-runtime/regenerator":37}],336:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  function stringIncludes(source, search, start, end) {
    if (!search) {
      return true;
    }

    if (start < 0 || end > source.length) {
      return false;
    }

    return source.substring(start, end) === search;
  }

  target.define("endsWith", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(searchString, endPosition) {
    var stringValue, searchValue, end;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.endsWith");
            _context.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context.sent;

            if (!(0, _contracts.isRegExp)(searchString)) {
              _context.next = 6;
              break;
            }

            throw TypeError("First argument to String.prototype.endsWith must not be a regular expression");

          case 6:
            _context.next = 8;
            return (0, _native.toString)(searchString);

          case 8:
            searchValue = _context.sent;
            end = stringValue.length;

            if ((0, _checks.isUndefined)(endPosition)) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return (0, _native.toInteger)(endPosition);

          case 13:
            end = _context.sent;

          case 14:

            end = Math.min(Math.max(end, 0), stringValue.length);
            return _context.abrupt("return", factory.createPrimitive(stringIncludes(stringValue, searchValue, end - searchValue.length, end)));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "String.prototype.endsWith"));

  target.define("startsWith", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2(searchString, startPosition) {
    var stringValue, searchValue, start;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.startsWith");
            _context2.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context2.sent;

            if (!(0, _contracts.isRegExp)(searchString)) {
              _context2.next = 6;
              break;
            }

            throw TypeError("First argument to String.prototype.startsWith must not be a regular expression");

          case 6:
            _context2.next = 8;
            return (0, _native.toString)(searchString);

          case 8:
            searchValue = _context2.sent;
            _context2.next = 11;
            return (0, _native.toInteger)(startPosition);

          case 11:
            start = _context2.sent;

            start = Math.max(start, 0);
            return _context2.abrupt("return", factory.createPrimitive(stringIncludes(stringValue, searchValue, start, start + searchValue.length)));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 1, "String.prototype.startsWith"));

  target.define("includes", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee3(searchString, position) {
    var stringValue, searchValue, length, start, end, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.includes");
            _context3.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context3.sent;

            if (!(0, _contracts.isRegExp)(searchString)) {
              _context3.next = 6;
              break;
            }

            throw TypeError("First argument to String.prototype.includes must not be a regular expression");

          case 6:
            _context3.next = 8;
            return (0, _native.toString)(searchString);

          case 8:
            searchValue = _context3.sent;
            length = stringValue.length;
            _context3.next = 12;
            return (0, _native.toInteger)(position);

          case 12:
            start = _context3.sent;

            start = Math.min(Math.max(start, 0), length);

            end = start + searchValue.length;
            result = false;

          case 16:
            if (!stringIncludes(stringValue, searchValue, start++, end++)) {
              _context3.next = 19;
              break;
            }

            result = true;
            return _context3.abrupt("break", 20);

          case 19:
            if (end <= length) {
              _context3.next = 16;
              break;
            }

          case 20:
            return _context3.abrupt("return", factory.createPrimitive(result));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }), 1, "String.prototype.includes"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],337:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  var _marked = [getIterator].map(_regenerator2.default.mark);

  var iteratorProto = factory.createObject();
  iteratorProto.setPrototype(env.global.getValue("%IteratorPrototype%"));
  iteratorProto.className = "String Iterator";

  iteratorProto.define("next", factory.createBuiltInFunction(function () {
    var result = this.object.advance();
    if (result.value) {
      return result.value;
    }

    var obj = factory.createObject();
    obj.define("done", factory.createPrimitive(result.done));
    return obj;
  }, 0, "StringIterator.prototype.next"));

  function getIterator(stringValue) {
    var length, done, index, value, char, first, second;
    return _regenerator2.default.wrap(function getIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            length = stringValue.length;
            done = false;
            index = 0;

          case 3:
            if (done) {
              _context.next = 10;
              break;
            }

            value = _primitiveType.UNDEFINED;


            if (index === length) {
              done = true;
            } else {
              char = stringValue[index++];

              if (index < length) {
                first = char.charCodeAt(0);

                if (first >= 0xD800 && first <= 0xDBFF) {
                  second = stringValue.charCodeAt(index);

                  if (second >= 0xDC00 && second <= 0xDFFF) {
                    char += stringValue[index++];
                  }
                }
              }

              value = factory.createPrimitive(char);
            }

            _context.next = 8;
            return factory.createIteratorResult({ value: value, done: done });

          case 8:
            _context.next = 3;
            break;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  var iteratorKey = env.getSymbol("iterator");
  target.define(iteratorKey, factory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var stringValue, it;
    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.protoype[Symbol.iterator]");
            _context2.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context2.sent;
            it = getIterator(stringValue);
            return _context2.abrupt("return", factory.createIterator(it, iteratorProto));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this);
  }), 0, "[Symbol.iterator]"));

  var stringTagKey = env.getSymbol("toStringTag");
  iteratorProto.define(stringTagKey, factory.createPrimitive("String Iterator"), { writable: false });
};

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/primitive-type":368,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],338:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (globalObject, env, factory) {
  var stringClass = globalObject.getValue("String");
  var proto = stringClass.getValue("prototype");

  (0, _string4.default)(stringClass, env, factory);
  (0, _string12.default)(stringClass, env, factory);
  (0, _string2.default)(proto, env, factory);
  (0, _string6.default)(proto, env, factory);
  (0, _string10.default)(proto, env, factory);
  (0, _string14.default)(proto, env, factory);
  (0, _string8.default)(proto, env, factory);
};

var _string = require("./string.code-point-at");

var _string2 = _interopRequireDefault(_string);

var _string3 = require("./string.from-code-point");

var _string4 = _interopRequireDefault(_string3);

var _string5 = require("./string.includes");

var _string6 = _interopRequireDefault(_string5);

var _string7 = require("./string.iterator");

var _string8 = _interopRequireDefault(_string7);

var _string9 = require("./string.normalize");

var _string10 = _interopRequireDefault(_string9);

var _string11 = require("./string.raw");

var _string12 = _interopRequireDefault(_string11);

var _string13 = require("./string.repeat");

var _string14 = _interopRequireDefault(_string13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./string.code-point-at":334,"./string.from-code-point":335,"./string.includes":336,"./string.iterator":337,"./string.normalize":339,"./string.raw":340,"./string.repeat":341}],339:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("normalize", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(form) {
    var stringValue, formValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.normalize");
            _context.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context.sent;
            formValue = "NFC";

            if ((0, _checks.isUndefined)(form)) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return (0, _native.toString)(form);

          case 8:
            formValue = _context.sent;

            if (/^NFK?(?:C|D)$/.test(formValue)) {
              _context.next = 11;
              break;
            }

            throw RangeError("Supported forms are NFC, NFD, NFKC, or NFKD");

          case 11:
            return _context.abrupt("return", factory.createPrimitive(stringValue.normalize(formValue)));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 0, "String.prototype.normalize"));
};

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/checks":376,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],340:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("raw", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(template) {
    var numberOfSubstitutions,
        cooked,
        raw,
        literalSegments,
        stringElements,
        nextIndex,
        nextSegment,
        next,
        _args = arguments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            numberOfSubstitutions = _args.length - 1;
            cooked = (0, _native.toObject)(template, true);
            raw = (0, _native.toObject)(cooked.getValue("raw"), true);
            _context.next = 5;
            return (0, _native.toLength)(raw);

          case 5:
            literalSegments = _context.sent;

            if (!(literalSegments <= 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", factory.createPrimitive(""));

          case 8:
            stringElements = [];
            nextIndex = 0;

          case 10:
            if (!(nextIndex < literalSegments)) {
              _context.next = 26;
              break;
            }

            _context.next = 13;
            return (0, _native.toString)(raw.getValue(nextIndex));

          case 13:
            nextSegment = _context.sent;

            stringElements.push(nextSegment);

            if (!(nextIndex + 1 === literalSegments)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("break", 26);

          case 17:
            next = "";

            if (!(nextIndex < numberOfSubstitutions)) {
              _context.next = 22;
              break;
            }

            _context.next = 21;
            return (0, _native.toString)(_args[nextIndex + 1]);

          case 21:
            next = _context.sent;

          case 22:

            stringElements.push(next);
            nextIndex++;
            _context.next = 10;
            break;

          case 26:
            return _context.abrupt("return", factory.createPrimitive(stringElements.join("")));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "String.raw"));
};

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/native":379,"babel-runtime/regenerator":37}],341:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (target, env, factory) {
  target.define("repeat", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee(count) {
    var stringValue, countValue, returnValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.repeat");

            _context.next = 3;
            return (0, _native.toString)(this.object);

          case 3:
            stringValue = _context.sent;
            _context.next = 6;
            return (0, _native.toInteger)(count);

          case 6:
            countValue = _context.sent;

            if (!(countValue < 0 || !isFinite(countValue))) {
              _context.next = 9;
              break;
            }

            throw RangeError("Invalid count value");

          case 9:
            returnValue = "";

            if (countValue > 0 && stringValue) {
              if (countValue === 1) {
                returnValue = stringValue;
              } else {
                while (countValue > 0) {
                  returnValue += stringValue;
                  countValue--;
                }
              }
            }

            return _context.abrupt("return", factory.createPrimitive(returnValue));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "String.prototype.repeat"));
};

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],342:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (globalObject, env, factory) {
  var frozen = { configurable: false, enumerable: false, writable: false };
  var proto = factory.createObject();

  var symbolClass = factory.createFunction(_regenerator2.default.mark(function _callee(desc) {
    var descString;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.isNew) {
              _context.next = 2;
              break;
            }

            throw TypeError("Symbol is not a constructor");

          case 2:
            if (!(0, _checks.isUndefined)(desc)) {
              _context.next = 6;
              break;
            }

            _context.t0 = "";
            _context.next = 9;
            break;

          case 6:
            _context.next = 8;
            return (0, _native.toString)(desc);

          case 8:
            _context.t0 = _context.sent;

          case 9:
            descString = _context.t0;
            return _context.abrupt("return", factory.create("Symbol", descString));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), proto, { name: "Symbol" });

  symbolClass.define("for", factory.createBuiltInFunction(_regenerator2.default.mark(function _callee2(key) {
    var keyString, instance;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _native.toString)(key);

          case 2:
            keyString = _context2.sent;
            instance = _symbolType.SymbolType.getByKey(keyString);


            if (!instance) {
              instance = factory.create("Symbol", keyString);
              _symbolType.SymbolType.add(keyString, instance);
            }

            return _context2.abrupt("return", instance);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }), 1, "Symbol.for"));

  symbolClass.define("keyFor", factory.createBuiltInFunction(function (sym) {
    return factory.createPrimitive(sym.description);
  }, 1, "Symbol.keyFor"));

  proto.define("toString", factory.createBuiltInFunction(function () {
    var stringValue = "Symbol(" + this.object.description + ")";
    return factory.createPrimitive(stringValue);
  }, 0, "Symbol.prototype.toString"));

  proto.define("valueOf", factory.createBuiltInFunction(function () {
    (0, _contracts.assertIsNotGeneric)(this.object, "Symbol", "Symbol.prototype.valueOf");
    return this.object;
  }, 0, "Symbol.prototype.valueOf"));

  ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag"].forEach(function (key) {
    var sym = factory.create("Symbol", "@@" + key);

    // add to global registry
    _symbolType.SymbolType.add(key, sym);
    symbolClass.define(key, sym, frozen);
  });

  var toStringTagSymbol = _symbolType.SymbolType.getByKey("toStringTag");
  proto.define(toStringTagSymbol, factory.createPrimitive("Symbol"), { writable: false });

  var toPrimitiveKey = _symbolType.SymbolType.getByKey("toPrimitive");
  proto.define(toPrimitiveKey, factory.createBuiltInFunction(function () {
    if (this.object.className !== "Symbol") {
      throw TypeError("[Symbol.toPrimitive] called on non-object");
    }

    return this.object;
  }, 1, "[Symbol.toPrimitive]"), { writable: false });

  globalObject.define("Symbol", symbolClass);
};

var _native = require("../utils/native");

var _symbolType = require("../types/symbol-type");

var _contracts = require("../utils/contracts");

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../types/symbol-type":373,"../utils/checks":376,"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],343:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.makeVisitors = exports.makeRules = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.walker = walker;
exports.walk = walk;
exports.step = step;
exports.iterate = iterate;

var _traversalContext = require("./traversal-context");

var _visitors = require("./visitors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [walker, iterate].map(_regenerator2.default.mark);

function walker(visitors, node, state, next) {
  var i, ln, visitor;
  return _regenerator2.default.wrap(function walker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // create a bound walk function to pass to visitors so they can continue walking their child nodes
          next = next || walker.bind(null, visitors);

          if (!Array.isArray(node)) {
            _context.next = 10;
            break;
          }

          i = 0, ln = node.length;

        case 3:
          if (!(i < ln)) {
            _context.next = 8;
            break;
          }

          return _context.delegateYield(next(node[i], state, next), "t0", 5);

        case 5:
          i++;
          _context.next = 3;
          break;

        case 8:
          _context.next = 14;
          break;

        case 10:
          if (!node) {
            _context.next = 14;
            break;
          }

          visitor = visitors[node.type];

          if (!(typeof visitor === "function")) {
            _context.next = 14;
            break;
          }

          return _context.delegateYield(visitor(node, state, next), "t1", 14);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function walk(node, visitors, state) {
  var v = (0, _visitors.makeVisitors)(visitors);
  var it = walker(v, new _traversalContext.TraversalContext(node), state);
  var done = false;
  var value = undefined;

  do {
    var _it$next = it.next(value);

    done = _it$next.done;
    value = _it$next.value;
  } while (!done);
}

function step(root, visitors, state, rules) {
  var v = (0, _visitors.makeVisitors)(visitors);
  var r = (0, _visitors.makeRules)(rules);
  var node = new _traversalContext.TraversalContext(root, null, function (n) {
    return r(n, state);
  });

  function next(current, arg) {
    if (typeof v[current.type] === "function") {
      return v[current.type](current, arg, next);
    }
  };

  return next(node, state);
}

function iterate(node, filters) {
  var hash, _iterator, _isArray, _i, _ref, current;

  return _regenerator2.default.wrap(function iterate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          hash = undefined;

          if (filters && Array.isArray(filters)) {
            hash = (0, _create2.default)(null);
            filters.forEach(function (type) {
              return hash[type] = true;
            });
          }

          _iterator = walker(_visitors.defaultVisitors, new _traversalContext.TraversalContext(node)), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 3:
          if (!_isArray) {
            _context2.next = 9;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("break", 19);

        case 6:
          _ref = _iterator[_i++];
          _context2.next = 13;
          break;

        case 9:
          _i = _iterator.next();

          if (!_i.done) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("break", 19);

        case 12:
          _ref = _i.value;

        case 13:
          current = _ref;

          if (!(!hash || hash[current.type])) {
            _context2.next = 17;
            break;
          }

          _context2.next = 17;
          return current;

        case 17:
          _context2.next = 3;
          break;

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

exports.makeRules = _visitors.makeRules;
exports.makeVisitors = _visitors.makeVisitors;

},{"./traversal-context":345,"./visitors":347,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/create":26,"babel-runtime/regenerator":37}],344:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var interfaces = exports.interfaces = {
  "Block": ["BlockStatement", "Program", "IfStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "LabeledStatement", "WhileStatement", "WithStatement"],
  "Function": ["FunctionExpression", "FunctionDeclaration", "ArrowFunctionExpression"],
  "Class": ["ClassExpression", "ClassDeclaration"],
  "Declaration": ["FunctionDeclaration", "VariableDeclaration", "ClassDeclaration"],
  "Declarator": ["VariableDeclarator", "FunctionDeclaration", "ClassDeclaration"],
  "Statement": ["ExpressionStatement", "BlockStatement", "EmptyStatement", "DebuggerStatement", "WithStatement", "ReturnStatement", "LabeledStatement", "BreakStatement", "ContinueStatement", "IfStatement", "SwitchStatement", "SwitchCase"],
  "Loop": ["WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "ForOfStatement  "],
  "Expression": ["ThisExpression", "ArrayExpression", "ObjectExpression", "Property", "FunctionExpression", "UnaryExpression", "UpdateExpression", "BinaryExpression", "AssignmentExpression", "LogicalExpression", "MemberExpression", "ConditionalExpression", "CallExpression", "NewExpression", "SequenceExpression", "TemplateLiteral", "TaggedTemplateExpression", "ClassExpression"],
  "Directive": function Directive() {
    return this.type === "ExpressionStatement" && this.expression.type === "Literal" && typeof this.expression.value === "string";
  },

  "Scope": ["FunctionExpression", "FunctionDeclaration", "Program"]
};

},{}],345:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.TraversalContext = TraversalContext;

var _types = require("./types");

var _interfaces = require("./interfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_getDirectives].map(_regenerator2.default.mark);

function isNode(obj) {
  return obj && (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) === "object" && typeof obj.type === "string";
}

function assignChild(value, parent, rules) {
  if (value) {
    if (isNode(value)) {
      return new TraversalContext(value, parent, rules);
    }

    if (Array.isArray(value)) {
      return value.map(function (node) {
        return assignChild(node, parent, rules);
      });
    }
  }

  return value;
}

function isDirective(node) {
  return node.type === "ExpressionStatement" && node.expression.type === "Literal" && typeof node.expression.value === "string";
}

function _getDirectives(body) {
  var i, length, expr, value;
  return _regenerator2.default.wrap(function getDirectives$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!body.body) {
            _context.next = 2;
            break;
          }

          return _context.delegateYield(_getDirectives(body.body), "t0", 2);

        case 2:
          if (!Array.isArray(body)) {
            _context.next = 12;
            break;
          }

          i = 0, length = body.length;

        case 4:
          if (!(i < length && isDirective(body[i]))) {
            _context.next = 12;
            break;
          }

          expr = body[i++].expression;
          value = expr.value;


          if (expr.raw) {
            // remove quotes
            value = expr.raw.substr(1, expr.raw.length - 2);
          }

          _context.next = 10;
          return value;

        case 10:
          _context.next = 4;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function TraversalContext(node, parent, rules) {
  if (node instanceof TraversalContext) {
    return node;
  }

  this._node = node;
  this._parent = parent;

  this.type = node.type;
  this.init(rules);
}

var proto = TraversalContext.prototype = {
  constructor: TraversalContext,

  init: function init(rules) {
    var _this = this;

    this._bindings = [];

    var currentScope = this._parent ? this._parent.scopeParent : this;
    var currentBlock = this._parent ? this._parent.blockParent : this;

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

    (0, _keys2.default)(this._node).forEach(function (key) {
      return _this[key] = assignChild(_this._node[key], _this, rules);
    });
    rules(this);
  },
  is: function is(type) {
    if (type === this.type) {
      return true;
    }

    var key = "is" + type;
    if (typeof this[key] === "function") {
      return this[key]();
    }

    return false;
  },
  has: function has(key) {
    return this._node[key] != null;
  },
  getDirectives: function getDirectives() {
    if (!this._directives) {
      this._directives = [];
      var it = _getDirectives(this._node.body);
      var done = undefined,
          _value = undefined;

      do {
        var _it$next = it.next();

        done = _it$next.done;
        _value = _it$next.value;

        if (!done && _value) {
          this._directives.push(_value);
        }
      } while (!done);
    }

    return this._directives;
  },
  getBindings: function getBindings() {
    return this._bindings || [];
  },
  hasBindings: function hasBindings() {
    return this.getBindings().length > 0;
  },
  getParent: function getParent() {
    return this._parent;
  },
  isBlockScope: function isBlockScope() {
    return this.isLet() || this.isConst() || this.isClassDeclaration();
  },
  isStrict: function isStrict() {
    if ("_strict" in this) {
      return this._strict;
    }

    if (this.isScope()) {
      var directives = this.getDirectives();
      var strict = directives.some(function (d) {
        return d === "use strict";
      });

      if (strict || this.isProgram()) {
        return this._strict = strict;
      }

      return this.getParent().isStrict();
    }

    return this.scopeParent.isStrict();
  }
};

// add helper methods
(0, _keys2.default)(_interfaces.interfaces).forEach(function (key) {
  proto["is" + key] = typeof _interfaces.interfaces[key] === "function" ? _interfaces.interfaces[key] : function () {
    return _interfaces.interfaces[key].indexOf(this.type) >= 0;
  };
});

(0, _keys2.default)(_types.types).forEach(function (key) {
  proto["is" + key] = function () {
    return this.type === key;
  };
});

["Var", "Const", "Let"].forEach(function (key) {
  var lowerCaseKey = key.toLowerCase();
  proto["is" + key] = function () {
    return this._parent._node.kind === lowerCaseKey;
  };
});

},{"./interfaces":344,"./types":346,"babel-runtime/core-js/object/keys":27,"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37}],346:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var types = exports.types = {};
types.ArrayExpression = ["elements"];
types.AssignmentExpression = ["right", "left"];
types.BinaryExpression = types.LogicalExpression = ["left", "right"];
types.BlockStatement = types.Program = ["body"];
types.BreakStatement = types.ContinueStatement = ["label"];
types.CallExpression = types.NewExpression = ["callee", "arguments"];
types.CatchClause = ["param", "body"];
types.ConditionalExpression = types.IfStatement = ["test", "consequent", "alternate"];
types.DoWhileStatement = ["body", "test"];
types.ExpressionStatement = ["expression"];
types.ForStatement = ["init", "test", "body", "update"];
types.ForInStatement = ["right", "left", "body"];
types.FunctionDeclaration = types.FunctionExpression = ["id", "params", "body"];
types.LabeledStatement = ["label", "body"];
types.MemberExpression = ["object", "property"];
types.ObjectExpression = ["properties"];
types.Property = ["key", "value"];
types.ThrowStatement = types.UnaryExpression = types.UpdateExpression = types.ReturnStatement = ["argument"];
types.SequenceExpression = ["expressions"];
types.SwitchStatement = ["discriminant", "cases"];
types.SwitchCase = ["consequent"];
types.TryStatement = ["block", "handler", "finalizer"];
types.VariableDeclaration = ["declarations"];
types.VariableDeclarator = ["id", "init"];
types.WhileStatement = ["test", "body"];
types.WithStatement = ["object", "body"];

// ignore
types.DebuggerStatement = types.EmptyStatement = types.Identifier = types.Literal = types.ThisExpression = [];

// es6
types.SpreadElement = types.YieldExpression = ["argument"];
types.ArrowFunctionExpression = types.FunctionExpression;
types.TemplateLiteral = ["quasis", "expressions"];
types.TaggedTemplateExpression = ["tag", "quasi"];
types.TemplateElement = [];
types.AssignmentProperty = ["value"];
types.ObjectPattern = ["properties"];
types.ArrayPattern = ["elements"];
types.RestElement = ["argument"];
types.AssignmentPattern = ["left", "right"];
types.ClassExpression = types.ClassDeclaration = ["id", "superClass", "body"];
types.ClassBody = ["body"];
types.MethodDefinition = ["key", "value"];
types.MetaProperty = ["meta", "property"];
types.Super = [];
types.ExportDefaultDeclaration = ["declaration"];
types.ExportNamedDeclaration = ["declaration", "specifiers", "source"];
types.ExportSpecifier = ["exported", "local"];
types.ExportAllDeclaration = ["source"];
types.ImportDeclaration = ["specifiers", "source"];
types.ImportSpecifier = ["imported", "local"];
types.ImportDefaultSpecifier = ["local"];
types.ImportNamespaceSpecifier = ["local"];

},{}],347:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.defaultVisitors = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.defaultVisitor = defaultVisitor;
exports.makeVisitors = makeVisitors;
exports.makeRules = makeRules;

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [defaultVisitor].map(_regenerator2.default.mark);

var noop = function noop() {};

function makeVisitorFromKeys(keys) {
  return _regenerator2.default.mark(function visitor(node, state, w) {
    var i, ln, key;
    return _regenerator2.default.wrap(function visitor$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return node;

          case 2:
            i = 0, ln = keys.length;

          case 3:
            if (!(i < ln)) {
              _context.next = 10;
              break;
            }

            key = keys[i];

            if (!node.has(key)) {
              _context.next = 7;
              break;
            }

            return _context.delegateYield(w(node[key], state, w), "t0", 7);

          case 7:
            i++;
            _context.next = 3;
            break;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, visitor, this);
  });
}

function defaultVisitor(node, state, w) {
  var _i, _ln, _key;

  return _regenerator2.default.wrap(function defaultVisitor$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return node;

        case 2:
          if (!(node.type in _types.types)) {
            _context2.next = 11;
            break;
          }

          _i = 0, _ln = _types.types[node.type].length;

        case 4:
          if (!(_i < _ln)) {
            _context2.next = 11;
            break;
          }

          _key = _types.types[node.type][_i];

          if (!node.has(_key)) {
            _context2.next = 8;
            break;
          }

          return _context2.delegateYield(w(node[_key], state, w), "t0", 8);

        case 8:
          _i++;
          _context2.next = 4;
          break;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

var defaultVisitors = exports.defaultVisitors = {};
(0, _keys2.default)(_types.types).forEach(function (key) {
  return defaultVisitors[key] = makeVisitorFromKeys(_types.types[key]);
});

function makeVisitors(visitors) {
  if (!visitors) {
    return defaultVisitors;
  }

  if ("__made" in visitors) {
    return visitors;
  }

  var target = (0, _assign2.default)({ __made: true }, defaultVisitors);

  (0, _keys2.default)(visitors).forEach(function (key) {
    // skip false values using noop
    var current = visitors[key] || noop;

    // keep default visitor
    if (current === true) {
      return;
    }

    if (Array.isArray(current)) {
      current = makeVisitorFromKeys(current);
    }

    target[key] = current;
  });

  return target;
}

function makeRules(rules) {
  if (!rules) {
    return noop;
  }

  if (typeof rules === "function") {
    return rules;
  }

  var keys = (0, _keys2.default)(rules);

  return function (node, state) {
    keys.forEach(function (key) {
      if (node.is(key)) {
        rules[key](node, state);
      }
    });
  };
}

},{"./types":346,"babel-runtime/core-js/object/assign":25,"babel-runtime/core-js/object/keys":27,"babel-runtime/regenerator":37}],348:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.ExecutionContext = ExecutionContext;

var _primitiveType = require("./types/primitive-type");

var _executionResult = require("./execution-result");

var _visitors = require("./visitors");

var _estree = require("./estree");

var _syntaxRules = require("./syntax-rules");

var _syntaxRules2 = _interopRequireDefault(_syntaxRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extendedRules = (0, _estree.makeRules)(_syntaxRules2.default);
var extendedVisitors = (0, _estree.makeVisitors)(_visitors.visitors);

function ExecutionContext(env, obj, callee, newTarget) {
  this.object = obj;
  this.callee = callee;
  this.env = env;
  this.isNew = !!newTarget;
  this.newTarget = newTarget;

  this.label = "";
  this.value = null;
  this.strict = false;
}

ExecutionContext.prototype = {
  constructor: ExecutionContext,

  execute: _regenerator2.default.mark(function execute(node, callee) {
    var executionResult;
    return _regenerator2.default.wrap(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            executionResult = undefined;
            _context.prev = 1;
            _context.next = 4;
            return (0, _estree.step)(node, extendedVisitors, this, extendedRules);

          case 4:
            executionResult = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);

            executionResult = this.raise(_context.t0);

          case 10:
            if (!(executionResult && executionResult.raised)) {
              _context.next = 12;
              break;
            }

            throw this.env.objectFactory.create("Error", executionResult.result);

          case 12:
            return _context.abrupt("return", executionResult || this.empty());

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, execute, this, [[1, 7]]);
  }),
  create: function create() {
    var context = new ExecutionContext(this.env, this.object, this.callee, this.newTarget);
    context.value = this.value;
    return context;
  },
  createLabel: function createLabel(label) {
    var context = this.create();
    context.label = label;
    return context;
  },
  createLoop: function createLoop() {
    var context = this.create();
    context.label = this.label;
    context.loop = true;
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
  raise: function raise(err) {
    var wrappedError = this.env.objectFactory.create("Error", err);
    var result = this.result(wrappedError);
    result.raised = result.exit = true;
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
    return new _executionResult.ExecutionResult(value, name, obj);
  },
  empty: function empty() {
    return this.result(_primitiveType.UNDEFINED);
  },
  abrupt: function abrupt(result, priorResult) {
    if (priorResult && !result.raised && !result.exit) {
      result.result = priorResult.result;
    }

    return result || this.empty();
  },
  shouldBreak: function shouldBreak(result) {
    if (!result) {
      return false;
    }

    if (result.exit || result.raised) {
      return true;
    }

    if (!result.cancel && !result.skip) {
      return false;
    }

    var breaking = true;
    if (result.name && result.name === this.label) {
      breaking = result.cancelled = result.cancel;
      result.cancel = result.skip = false;

      return breaking;
    }

    if (this.loop && !result.name) {
      breaking = result.cancelled = result.cancel;
      result.cancel = result.skip = false;
    }

    return breaking;
  }
};

},{"./estree":343,"./execution-result":349,"./syntax-rules":357,"./types/primitive-type":368,"./visitors":399,"babel-runtime/regenerator":37}],349:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.ExecutionResult = ExecutionResult;
function ExecutionResult(value, name, obj) {
  this.result = value;
  this.name = name;
  this.object = obj;

  this.cancel = false;
  this.cancelled = false;
  this.exit = false;
  this.skip = false;
  this.raised = false;
}

ExecutionResult.prototype = {
  constructor: ExecutionResult,

  isAbrupt: function isAbrupt() {
    return this.cancel || this.exit || this.raised || this.skip;
  }
};

},{}],350:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.Sandbox = Sandbox;

var _env = require("./env");

var _async = require("./utils/async");

var _errorType = require("./types/error-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new Sandbox
 * @class
 * @param {AST} ast - The abstract syntax tree to execute.
 * @param {Object} [options] The options to use with the sandbox.
 */
function Sandbox(ast, options) {
  this.ast = ast;
  this.options = options || {};
}

Sandbox.prototype = {
  constructor: Sandbox,

  /**
   * Executes the abstract syntax tree (AST) against the provided environment (or the default
   * environment if not provided)
   * @param {Environment} [env] - The environment to execute the AST against.
   * @returns {ObjectType|Promise} Returns a resolved value syncronously if possible, otherwise
   * returns a promise which will resolve to the result.
   */
  execute: function execute(env) {
    if (!env) {
      env = new _env.Environment();
      env.init(this.options);
    }

    var executionResult = undefined;
    try {
      executionResult = (0, _async.exhaust)(env.createExecutionContext().execute(this.ast));
    } catch (err) {
      if (err instanceof _errorType.ErrorType) {
        err = err.toNative();
      }

      throw err;
    }

    if ((0, _async.isThenable)(executionResult)) {
      return executionResult.then(function (res) {
        return res.result;
      });
    }

    return executionResult.result;
  },


  /**
   * Executes the abstract syntax tree (AST) against the provided environment (or the default
   * environment if not provided)
   * @param {Environment} [env] - The environment to execute the AST against.
   * @returns {Promise} A promise that resolves with the result of the execution
   */
  resolve: function resolve(env) {
    // always return a promise
    return _promise2.default.resolve(this.execute(env));
  }
};

},{"./env":177,"./types/error-type":362,"./utils/async":375,"babel-runtime/core-js/promise":29}],351:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ascIterator, descIterator, yieldIndex].map(_regenerator2.default.mark);

function ascIterator(source, lo, hi) {
  var index;
  return _regenerator2.default.wrap(function ascIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = lo;

        case 1:
          if (!(index < hi)) {
            _context.next = 6;
            break;
          }

          return _context.delegateYield(yieldIndex(source, index), "t0", 3);

        case 3:
          index++;
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function descIterator(source, lo, hi) {
  var _index;

  return _regenerator2.default.wrap(function descIterator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _index = hi;

        case 1:
          if (!(_index >= lo)) {
            _context2.next = 6;
            break;
          }

          return _context2.delegateYield(yieldIndex(source, _index), "t0", 3);

        case 3:
          _index--;
          _context2.next = 1;
          break;

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function yieldIndex(source, key) {
  var prop, value;
  return _regenerator2.default.wrap(function yieldIndex$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          prop = source.getProperty(key);

          if (!prop) {
            _context3.next = 5;
            break;
          }

          value = prop.getValue();
          _context3.next = 5;
          return { value: value, key: key };

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

var ArrayIterator = {
  create: function create(obj, lo, hi, desc) {
    return (desc ? descIterator : ascIterator)(obj, lo, hi);
  }
};

exports.default = ArrayIterator;

},{"babel-runtime/regenerator":37}],352:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _stringIterator = require("./string-iterator");

var _stringIterator2 = _interopRequireDefault(_stringIterator);

var _sparseIterator = require("./sparse-iterator");

var _sparseIterator2 = _interopRequireDefault(_sparseIterator);

var _arrayIterator = require("./array-iterator");

var _arrayIterator2 = _interopRequireDefault(_arrayIterator);

var _iterableIterator = require("./iterable-iterator");

var _iterableIterator2 = _interopRequireDefault(_iterableIterator);

var _symbolType = require("../types/symbol-type");

var _native = require("../utils/native");

var _async = require("../utils/async");

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPARE_ARRAY_DENSITY = 0.8;

function arrayIsSparse(arr, length) {
  var ownPropertyCount = (0, _keys2.default)(arr.properties).length;

  // this is just to roughly estimate how dense the array is
  var density = (ownPropertyCount - 1) / length;
  return density < SPARE_ARRAY_DENSITY;
}

var iterate = {
  getIterator: function getIterator(obj) {
    var iteratorKey = _symbolType.SymbolType.getByKey("iterator");
    var iterator = obj.getProperty(iteratorKey);
    var fn = iterator && iterator.getValue();

    if (!(0, _checks.isNullOrUndefined)(fn)) {
      var it = (0, _async.exhaust)(fn.call(obj));
      return _iterableIterator2.default.create(it);
    }

    var length = (0, _async.exhaust)((0, _native.toLength)(obj));
    return this.forward(obj, 0, length);
  },
  forward: function forward(obj, lo, hi) {
    // string will never be dense
    if (obj.className === "String") {
      return _stringIterator2.default.create(obj, lo);
    }

    if (obj.className !== "Array" || arrayIsSparse(obj, hi)) {
      return _sparseIterator2.default.create(obj, lo, hi - 1);
    }

    return _arrayIterator2.default.create(obj, lo, hi);
  },
  reverse: function reverse(obj, hi) {
    var lo = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (obj.className === "String") {
      return _stringIterator2.default.create(obj, hi, true);
    }

    if (obj.className !== "Array" || arrayIsSparse(obj, hi)) {
      return _sparseIterator2.default.create(obj, lo, hi, true);
    }

    return _arrayIterator2.default.create(obj, lo, hi, true);
  }
};

exports.default = iterate;

},{"../types/symbol-type":373,"../utils/async":375,"../utils/checks":376,"../utils/native":379,"./array-iterator":351,"./iterable-iterator":353,"./sparse-iterator":354,"./string-iterator":355,"babel-runtime/core-js/object/keys":27}],353:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _IterableIterator$pro;

exports.default = IterableIterator;

var _native = require("../utils/native");

var _async = require("../utils/async");

var _primitiveType = require("../types/primitive-type");

var _helpers = require("../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IterableIterator(it) {
  this.currentIndex = 0;
  this.iterator = it;
  this.advancer = it.getValue("next");
}

IterableIterator.prototype = (_IterableIterator$pro = {
  constructor: IterableIterator

}, _IterableIterator$pro[_iterator2.default] = function () {
  return this;
}, _IterableIterator$pro.next = function next() {
  var result = (0, _async.exhaust)(this.advancer.call(this.iterator));
  var value = { key: this.currentIndex++, value: _primitiveType.UNDEFINED };

  var done = (0, _native.toBoolean)(result.getValue("done"));
  var valueProperty = result.getProperty("value");
  if (valueProperty) {
    value.value = valueProperty.getValue();
  }

  return { done: done, value: value };
}, _IterableIterator$pro.each = _regenerator2.default.mark(function each(func) {
  var done, current, _next;

  return _regenerator2.default.wrap(function each$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          done = false;

        case 1:
          if (done) {
            _context.next = 18;
            break;
          }

          _context.prev = 2;
          current = undefined;
          _next = this.next();
          done = _next.done;
          current = _next.value;

          if (done) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return func(current.value || _primitiveType.UNDEFINED);

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);

          this.return();
          throw _context.t0;

        case 16:
          _context.next = 1;
          break;

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, each, this, [[2, 12]]);
}), _IterableIterator$pro["return"] = function _return() {
  var returnFunc = (0, _helpers.getMethod)(this.iterator, "return");
  if (returnFunc) {
    return (0, _async.exhaust)(returnFunc.call(this.iterator));
  }

  return _primitiveType.UNDEFINED;
}, _IterableIterator$pro);

IterableIterator.create = function (it) {
  return new IterableIterator(it);
};

},{"../types/primitive-type":368,"../utils/async":375,"../utils/helpers":378,"../utils/native":379,"babel-runtime/core-js/symbol/iterator":35,"babel-runtime/regenerator":37}],354:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _SparseIterator$proto;

exports.default = SparseIterator;

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASCENDING = function ASCENDING(a, b) {
  return a - b;
};
var DESCENDING = function DESCENDING(a, b) {
  return b - a;
};

var isInRange = function isInRange(value, start, end) {
  return value >= start && value <= end;
};

var isValidIndex = function isValidIndex(keys, start, end) {
  return function (key) {
    return !(key in keys) && (0, _native.isInteger)(key) && isInRange(key, start, end);
  };
};

function SparseIterator(obj, start, end, desc) {
  this.object = obj;
  this.start = start;
  this.end = end;
  this.asc = !desc;
  this.version = 0;
}

SparseIterator.prototype = (_SparseIterator$proto = {
  constructor: SparseIterator

}, _SparseIterator$proto[_iterator2.default] = function () {
  return this;
}, _SparseIterator$proto.reset = function reset() {
  var _this = this;

  this.version = 0;
  this.prototypes = [];
  this.props = (0, _create2.default)(null);
  this.keys = [];

  var current = this.object;

  while (current) {
    this.prototypes.push(current);
    this.version += current.version;

    current.getOwnPropertyKeys("String").filter(isValidIndex(this.props, this.start, this.end)).forEach(function (key) {
      // wrap in function - avoid calling until iteration
      _this.props[key] = current.getValue.bind(current, key);
      _this.keys.push(Number(key));
    });

    current = current.getPrototype();
  }

  this.keys.sort(this.asc ? ASCENDING : DESCENDING);
}, _SparseIterator$proto.next = function next() {
  if (!this.version || this.shouldReset()) {
    this.reset();
  }

  if (this.keys.length > 0) {
    var key = this.currentIndex = this.keys.shift();
    var value = this.props[key]();

    return {
      value: { key: key, value: value },
      done: false
    };
  }

  return {
    done: true
  };
}, _SparseIterator$proto.shouldReset = function shouldReset() {
  var currentVersion = this.prototypes.reduce(function (v, o) {
    return o.version + v;
  }, 0);
  if (currentVersion !== this.version) {
    if (this.asc) {
      this.start = this.currentIndex + 1;
    } else {
      this.end = this.currentIndex - 1;
    }

    return true;
  }

  return false;
}, _SparseIterator$proto);

SparseIterator.create = function (arr, start, end, desc) {
  return new SparseIterator(arr, start, end, desc);
};

},{"../utils/native":379,"babel-runtime/core-js/object/create":26,"babel-runtime/core-js/symbol/iterator":35}],355:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ascIterator, descIterator].map(_regenerator2.default.mark);

function ascIterator(stringValue, start, length) {
  var key, value;
  return _regenerator2.default.wrap(function ascIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          key = start;

        case 1:
          if (!(key < length)) {
            _context.next = 8;
            break;
          }

          value = stringValue.getValue(key);
          _context.next = 5;
          return { value: value, key: key };

        case 5:
          key++;
          _context.next = 1;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function descIterator(stringValue, start) {
  var _key, _value;

  return _regenerator2.default.wrap(function descIterator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _key = start;

        case 1:
          if (!(_key >= 0)) {
            _context2.next = 8;
            break;
          }

          _value = stringValue.getValue(_key);
          _context2.next = 5;
          return { value: _value, key: _key };

        case 5:
          _key--;
          _context2.next = 1;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

var StringIterator = {
  create: function create(value, start, desc) {
    var length = value.toNative().length;
    return (desc ? descIterator : ascIterator)(value, start, length);
  }
};

exports.default = StringIterator;

},{"babel-runtime/regenerator":37}],356:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.isReserved = isReserved;
exports.isStrictReserved = isStrictReserved;
var keywords = {
  "es5": ["do", "if", "in", "for", "new", "try", "var", "case", "else", "enum", "null", "this", "true", "void", "with", "break", "catch", "class", "const", "false", "super", "throw", "while", "delete", "export", "import", "return", "switch", "typeof", "default", "extends", "finally", "continue", "debugger", "function", "instanceof"],

  "es5strict": ["implements", "let", "private", "public", "interface", "package", "protected", "static", "yield"]
};

keywords.es6 = keywords.es5.slice().concat(["class", "const", "debugger", "enum", "export", "extends", "super"]);

keywords.es6strict = keywords.es5strict.slice().concat(["static", "implements"]);

function isReserved(name) {
  var ecmaVersion = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];

  var v = "es" + ecmaVersion;
  if (v in keywords) {
    return keywords[v].indexOf(name) >= 0;
  }

  return false;
}

function isStrictReserved(name) {
  var ecmaVersion = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];

  var v = "es" + ecmaVersion + "strict";
  if (v in keywords) {
    return keywords[v].indexOf(name) >= 0;
  }

  return false;
}

},{}],357:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _rules;

var _contracts = require("./utils/contracts");

var _native = require("./utils/native");

function validateAssignment(left, strict, ecmaVersion) {
  if (strict && left.isIdentifier()) {
    (0, _contracts.assertIsValidName)(left.name, true);
    (0, _contracts.assertIsValidIdentifier)(left.name, true, ecmaVersion);
  }
}

var rules = (_rules = {
  AssignmentExpression: function AssignmentExpression(node, context) {
    validateAssignment(node.left, node.isStrict() || context.env.isStrict(), context.env.ecmaVersion);
  },
  CatchClause: function CatchClause(node, context) {
    (0, _contracts.assertIsValidName)(node.param.name, node.isStrict() || context.env.isStrict());
  },
  Declarator: function Declarator(node, context) {
    (0, _contracts.assertIsValidIdentifier)(node.id.name, node.isStrict() || context.env.isStrict(), context.env.ecmaVersion);
  }
}, _rules["Function"] = function Function(node, context) {
  if (node.id) {
    (0, _contracts.assertIsValidName)(node.id.name, node.isStrict() || context.env.isStrict());
  }

  (0, _contracts.assertAreValidArguments)(node.params, node.isStrict() || context.env.isStrict());
}, _rules.Literal = function Literal(node, context) {
  if (node.raw && (node.isStrict() || context.env.isStrict())) {
    if ((0, _native.isOctalLiteral)(node.raw, node.value)) {
      throw SyntaxError("Octal literals are not allowed in strict mode.");
    }
  }
}, _rules.UpdateExpression = function UpdateExpression(node, context) {
  validateAssignment(node.argument, node.isStrict() || context.env.isStrict(), context.env.ecmaVersion);
}, _rules.WithStatement = function WithStatement(node, context) {
  if (node.isStrict() || context.env.isStrict()) {
    throw SyntaxError("Strict mode code may not include a with statement");
  }
}, _rules);

exports.default = rules;

},{"./utils/contracts":377,"./utils/native":379}],358:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.ArgumentType = ArgumentType;

var _util = require("util");

var _objectType = require("./object-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArgumentType(callee) {
  _objectType.ObjectType.call(this);

  this.className = "Arguments";
  this.parameterMap = (0, _create2.default)(null);
  this.callee = callee;
}

(0, _util.inherits)(ArgumentType, _objectType.ObjectType);

ArgumentType.prototype.mapProperty = function (index, binding) {
  index = String(index);
  _objectType.ObjectType.prototype.defineProperty.call(this, index, { configurable: true, enumerable: true, writable: true, value: undefined }, true);
  this.parameterMap[index] = binding;
};

ArgumentType.prototype.getProperty = function (key) {
  var ownProperty = this.getOwnProperty(key);
  if (ownProperty) {
    return ownProperty;
  }

  return _objectType.ObjectType.prototype.getProperty.call(this, key);
};

ArgumentType.prototype.getOwnProperty = function (key) {
  var name = String(key);

  if (name in this.parameterMap) {
    var mappedProperty = this.properties[name];
    var linkedProperty = this.parameterMap[name];

    mappedProperty.value = linkedProperty.getValue();
    mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
    return mappedProperty;
  }

  return _objectType.ObjectType.prototype.getOwnProperty.call(this, key);
};

ArgumentType.prototype.defineProperty = function (key, descriptor, throwOnError) {
  var name = String(key);

  var allowed = _objectType.ObjectType.prototype.defineProperty.apply(this, arguments);
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

ArgumentType.prototype.deleteProperty = function (key, throwOnError) {
  var name = String(key);
  if (name in this.parameterMap) {
    delete this.parameterMap[name];
  }

  return _objectType.ObjectType.prototype.deleteProperty.apply(this, arguments);
};

},{"./object-type":367,"babel-runtime/core-js/object/create":26,"util":174}],359:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

exports.ArrayType = ArrayType;

var _util = require("util");

var _objectType = require("./object-type");

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

var _iterators = require("../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

var _async = require("../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArrayType() {
  _objectType.ObjectType.call(this);
  this.className = "Array";
}

(0, _util.inherits)(ArrayType, _objectType.ObjectType);

ArrayType.prototype.init = function (env) {
  _objectType.ObjectType.prototype.init.apply(this, arguments);
  this.defineProperty("length", { value: env.objectFactory.createPrimitive(0), writable: true });
};

ArrayType.prototype.setValue = function (name, value) {
  if (name === "length") {
    return this.setLength({ value: value }, false);
  }

  return _objectType.ObjectType.prototype.setValue.apply(this, arguments);
};

ArrayType.prototype.setIndex = function (key, value, descriptor, throwOnError) {
  descriptor = descriptor || { value: value, configurable: true, enumerable: true, writable: true };

  var index = Number(key);
  var lengthProperty = this.getProperty("length");
  var lengthValue = lengthProperty.getValue().toNative();

  if (!lengthProperty.canSetValue() && index >= lengthValue || !_objectType.ObjectType.prototype.defineProperty.call(this, key, descriptor)) {

    if (throwOnError) {
      throw TypeError("Cannot define property: " + key + ", object is not extensible.");
    }

    return false;
  }

  if (index >= lengthValue) {
    var newLength = this[(0, _for2.default)("env")].objectFactory.createPrimitive(index + 1);
    this.defineProperty("length", { value: newLength });
  }

  return true;
};

ArrayType.prototype.setLength = function (descriptor, throwOnError) {
  var env = this[(0, _for2.default)("env")];

  var newLengthValue = (0, _async.exhaust)((0, _native.toUInt32)(descriptor.value));
  if (newLengthValue !== (0, _async.exhaust)((0, _native.toNumber)(descriptor.value))) {
    throw RangeError("Array length out of range");
  }

  descriptor.value = env.objectFactory.createPrimitive(newLengthValue);
  var newLength = descriptor.value;
  var currentLength = this.getValue("length");
  (0, _contracts.assertIsValidArrayLength)(newLength.toNative());

  if (newLength.toNative() >= currentLength.toNative()) {
    return _objectType.ObjectType.prototype.defineProperty.call(this, "length", descriptor, throwOnError);
  }

  var isWritable = this.getProperty("length").writable;
  if (isWritable === false) {
    if (throwOnError) {
      throw TypeError("Cannot redefine property: length");
    }

    return false;
  }

  var notWritable = "writable" in descriptor && !descriptor.writable;
  if (notWritable) {
    // set to writable in case removing items fails
    descriptor.writable = true;
  }

  var i = currentLength.toNative();
  if (!_objectType.ObjectType.prototype.defineProperty.call(this, "length", descriptor, throwOnError)) {
    return false;
  }

  var succeeded = true;

  if (i > newLength.toNative()) {
    for (var _iterator = _iterators2.default.reverse(this, i - 1, newLength.toNative()), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref;
      var key = _ref2.key;

      if (!this.deleteProperty(key, false)) {
        newLength = env.objectFactory.createPrimitive(key + 1);
        this.defineProperty("length", { value: newLength });
        succeeded = false;
        break;
      }
    }
  }

  if (notWritable) {
    this.defineProperty("length", { writable: false });
  }

  if (!succeeded && throwOnError) {
    throw TypeError("Cannot redefine property: length");
  }

  return succeeded;
};

ArrayType.prototype.defineProperty = function (name, descriptor, throwOnError) {
  if ((0, _native.isInteger)(name) && (0, _native.isValidArrayLength)(Number(name) + 1) && !this.owns(name)) {
    return this.setIndex(name, null, descriptor, throwOnError);
  }

  if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
    return this.setLength(descriptor, throwOnError);
  }

  return _objectType.ObjectType.prototype.defineProperty.apply(this, arguments);
};

ArrayType.prototype.toNative = function () {
  var length = this.properties.length.getValue().toNative();
  var arr = new Array(length);

  // this won't grab properties from the prototype - do we care?
  // it's an edge case but we may want to address it
  for (var index in this.properties) {
    if (this.properties[index].enumerable) {
      arr[Number(index)] = this.getValue(index).toNative();
    }
  }

  return arr;
};

},{"../iterators":352,"../utils/async":375,"../utils/contracts":377,"../utils/native":379,"./object-type":367,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/symbol/for":34,"util":174}],360:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.CollectionType = CollectionType;

var _util = require("util");

var _objectType = require("./object-type");

function CollectionType(className) {
  _objectType.ObjectType.call(this);

  this.className = className;
  this.data = [];
}

(0, _util.inherits)(CollectionType, _objectType.ObjectType);

},{"./object-type":367,"util":174}],361:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.DateType = DateType;

var _util = require("util");

var _objectType = require("./object-type");

function DateType(value) {
  _objectType.ObjectType.call(this);

  this.value = value;
  this.type = "object";
  this.className = "Date";

  // 11.6.1 Note 1
  // All native ECMAScript objects except Date objects handle the absence of a hint as if the hint
  // Number were given; Date objects handle the absence of a hint as if the hint String were given.
  this.primitiveHint = "string";
}

(0, _util.inherits)(DateType, _objectType.ObjectType);

DateType.prototype.toNative = function () {
  return this.value;
};

},{"./object-type":367,"util":174}],362:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.ErrorType = ErrorType;

var _util = require("util");

var _objectType = require("./object-type");

function ErrorType(source) {
  _objectType.ObjectType.call(this);

  this.source = source;
  this.className = "Error";
}

(0, _util.inherits)(ErrorType, _objectType.ObjectType);

ErrorType.prototype.toNative = function () {
  return this.source;
};

},{"./object-type":367,"util":174}],363:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

exports.FunctionType = FunctionType;

var _util = require("util");

var _objectType = require("./object-type");

var _propertyDescriptor = require("./property-descriptor");

var _primitiveType = require("./primitive-type");

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [execute].map(_regenerator2.default.mark);

function getParameterLength(params) {
  for (var i = 0, ln = params.length; i < ln; i++) {
    // parameter length should only include the first "Formal" parameters
    if (params[i].isRestElement() || params[i].isAssignmentPattern()) {
      return i;
    }
  }

  return params.length;
}

function execute(func, thisArg, args, callee, newTarget) {
  var env, scope;
  return _regenerator2.default.wrap(function execute$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          env = func[(0, _for2.default)("env")];
          scope = env.createExecutionScope(func, thisArg, newTarget);


          callee = callee || func;
          _context2.next = 5;
          return scope.loadArgs(func.node.params, args || [], func);

        case 5:
          scope.init(func.node);

          if (newTarget) {
            scope.setMeta("newTarget", newTarget);
          }

          if (func.homeObject) {
            scope.setMeta("super", func.homeObject);
          }

          if (func.node.id) {
            env.createVariable(func.node.id.name).setValue(func);
          }

          return _context2.delegateYield(scope.use(_regenerator2.default.mark(function _callee() {
            var context;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    context = env.createExecutionContext(thisArg, callee, newTarget);
                    _context.next = 3;
                    return context.execute(func.node.body, callee);

                  case 3:
                    return _context.abrupt("return", _context.sent);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          })), "t0", 10);

        case 10:
          return _context2.abrupt("return", _context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

function FunctionType(node) {
  _objectType.ObjectType.call(this);

  this.type = "function";
  this.className = "Function";
  this.native = false;
  this.node = node;

  this.arrow = node && node.isArrowFunctionExpression();
  this.isConstructor = false;
  this.canConstruct = !this.arrow;

  this.kind = "base";
  this.boundScope = null;
  this.boundThis = null;
  this.homeObject = null;
}

(0, _util.inherits)(FunctionType, _objectType.ObjectType);

FunctionType.prototype.init = function (env, proto, descriptor, strict) {
  _objectType.ObjectType.prototype.init.apply(this, arguments);

  var _ref = descriptor || {};

  var _ref$isConstructor = _ref.isConstructor;
  var isConstructor = _ref$isConstructor === undefined ? false : _ref$isConstructor;
  var homeObject = _ref.homeObject;
  var _ref$kind = _ref.kind;
  var kind = _ref$kind === undefined ? "base" : _ref$kind;

  this.isConstructor = isConstructor;
  this.homeObject = homeObject;
  this.kind = kind;

  if (strict !== undefined) {
    this.strict = strict;
  }

  // set length property from the number of parameters
  this.setLength(getParameterLength(this.node.params));

  if (proto !== null) {
    // functions have a prototype
    proto = proto || env.objectFactory.createObject();
    this.defineProperty("prototype", { value: proto, writable: true });

    // set the contructor property as an instance of itself
    proto.properties.constructor = new _propertyDescriptor.PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this }, "constructor");
  }

  this.addPoison();
};

FunctionType.prototype.setLength = function (length) {
  var env = this[(0, _for2.default)("env")];
  var value = env.objectFactory.createPrimitive(length);
  var configurable = env.ecmaVersion > 5;

  this.defineProperty("length", { value: value, configurable: configurable });
};

FunctionType.prototype.addPoison = function () {
  var env = this[(0, _for2.default)("env")];
  if (env.ecmaVersion > 5) {
    return;
  }

  if (this.isStrict()) {
    var thrower = function thrower() {
      throw TypeError();
    };

    var throwerFunc = env.objectFactory.createBuiltInFunction(thrower);

    var throwerProp = {
      get: throwerFunc,
      getter: thrower,
      set: throwerFunc,
      setter: thrower,
      enumerable: false,
      configurable: false
    };

    this.define("caller", null, throwerProp);
    this.define("arguments", null, throwerProp);
  }
};

FunctionType.prototype.call = _regenerator2.default.mark(function _callee2(thisArg, args, callee) {
  var executionResult, shouldReturn;
  return _regenerator2.default.wrap(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!this.isConstructor) {
            _context3.next = 2;
            break;
          }

          throw TypeError("Constructor function " + this.name + " must be called with 'new'");

        case 2:
          _context3.next = 4;
          return execute(this, thisArg, args, callee);

        case 4:
          executionResult = _context3.sent;
          shouldReturn = this.arrow && !this.node.body.isBlockStatement() || executionResult && executionResult.exit;

          if (!(shouldReturn && executionResult.result)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", executionResult.result);

        case 8:
          return _context3.abrupt("return", _primitiveType.UNDEFINED);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee2, this);
});

FunctionType.prototype.construct = _regenerator2.default.mark(function _callee3(thisArg, args, callee) {
  var target, executionResult;
  return _regenerator2.default.wrap(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!this.node.isArrowFunctionExpression()) {
            _context4.next = 2;
            break;
          }

          throw TypeError("Function " + this.name + " is not a constructor.a");

        case 2:
          target = (callee || this).getValue();


          if (!thisArg || thisArg === this) {
            thisArg = this[(0, _for2.default)("env")].objectFactory.createObject(target);
          }

          _context4.next = 6;
          return execute(this, thisArg, args, callee, target);

        case 6:
          executionResult = _context4.sent;

          if (!(executionResult.exit && executionResult.result)) {
            _context4.next = 14;
            break;
          }

          if (!executionResult.result.isPrimitive) {
            _context4.next = 13;
            break;
          }

          if (!(this.kind === "classConstructor" && executionResult.result.value !== undefined)) {
            _context4.next = 11;
            break;
          }

          throw TypeError();

        case 11:
          _context4.next = 14;
          break;

        case 13:
          return _context4.abrupt("return", executionResult.result);

        case 14:
          return _context4.abrupt("return", thisArg);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee3, this);
});

FunctionType.prototype.bindThis = function (thisArg) {
  this.boundThis = this.boundThis || thisArg;
};

FunctionType.prototype.bindScope = function (scope) {
  this.boundScope = scope;
};

FunctionType.prototype.isStrict = function () {
  if ("strict" in this) {
    return this.strict;
  }

  if (this.native) {
    return false;
  }

  return this.node.body.isStrict();
};

FunctionType.prototype.hasInstance = function (obj) {
  if (obj === this) {
    // object obviously isn't an instance in this case
    return false;
  }

  var visited = [];
  var current = obj;

  var proto = this.getValue("prototype");
  if ((0, _checks.isNullOrUndefined)(proto) || !(0, _checks.isObject)(proto)) {
    throw TypeError("Function has non-object prototype in instanceof check");
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

FunctionType.prototype.toNative = function () {
  return undefined;
};

},{"../utils/checks":376,"./object-type":367,"./primitive-type":368,"./property-descriptor":369,"babel-runtime/core-js/symbol/for":34,"babel-runtime/regenerator":37,"util":174}],364:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.IteratorType = IteratorType;

var _util = require("util");

var _objectType = require("./object-type");

function IteratorType(iterable) {
  var kind = arguments.length <= 1 || arguments[1] === undefined ? "key+value" : arguments[1];

  _objectType.ObjectType.call(this);

  this.iterable = iterable;
  this.position = 0;
  this.className = "Iterator";
  this.kind = kind;
}

(0, _util.inherits)(IteratorType, _objectType.ObjectType);

IteratorType.prototype.init = function (env, proto) {
  _objectType.ObjectType.prototype.init.apply(this, arguments);

  if (!proto) {
    (function () {
      var factory = env.objectFactory;
      proto = factory.createObject();
      proto.className = "[Symbol.iterator]";
      proto.setPrototype(env.global.getValue("%IteratorPrototype%"));

      proto.define("next", factory.createBuiltInFunction(function () {
        var result = this.object.advance();
        if (result.value) {
          return result.value;
        }

        return factory.createIteratorResult({ done: true });
      }));
    })();
  }

  this.setPrototype(proto);
};

IteratorType.prototype.advance = function () {
  return this.iterable.next();
};

},{"./object-type":367,"util":174}],365:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

exports.NativeFunctionType = NativeFunctionType;

var _util = require("util");

var _functionType = require("./function-type");

var _propertyDescriptor = require("./property-descriptor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NativeFunctionType(fn) {
  _functionType.FunctionType.call(this);

  this.type = "function";
  this.native = true;
  this.nativeFunction = fn;
}

(0, _util.inherits)(NativeFunctionType, _functionType.FunctionType);

NativeFunctionType.prototype.init = function (env, proto) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$configurable = _ref.configurable;
  var configurable = _ref$configurable === undefined ? false : _ref$configurable;
  var _ref$enumerable = _ref.enumerable;
  var enumerable = _ref$enumerable === undefined ? false : _ref$enumerable;
  var _ref$writable = _ref.writable;
  var writable = _ref$writable === undefined ? true : _ref$writable;
  var _ref$isConstructor = _ref.isConstructor;
  var isConstructor = _ref$isConstructor === undefined ? false : _ref$isConstructor;
  var homeObject = _ref.homeObject;

  this[(0, _for2.default)("env")] = env;
  this.isConstructor = isConstructor;
  this.homeObject = homeObject;

  var length = this.nativeFunction.length;
  if ("nativeLength" in this.nativeFunction) {
    length = this.nativeFunction.nativeLength;
  }

  if ("strict" in this.nativeFunction) {
    this.strict = this.nativeFunction.strict;
  }

  this.setLength(length);

  if (proto !== null) {
    proto = proto || env.objectFactory.createObject();
    proto.properties.constructor = new _propertyDescriptor.PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this }, "constructor");

    var protoDescriptor = {
      value: proto,
      configurable: configurable,
      enumerable: enumerable,
      writable: writable
    };

    this.defineProperty("prototype", protoDescriptor);
  }

  this.addPoison();
};

NativeFunctionType.prototype.call = _regenerator2.default.mark(function _callee2(thisArg, args, callee) {
  var env, self, scope;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.isConstructor) {
            _context2.next = 2;
            break;
          }

          throw TypeError("Function " + this.name + " must be called with 'new' keyword");

        case 2:

          callee = callee || this;
          env = this[(0, _for2.default)("env")];
          self = this;
          scope = env.createExecutionScope(this, thisArg);
          _context2.next = 8;
          return scope.use(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return self.nativeFunction.apply(env.createExecutionContext(thisArg, callee), args || []);

                  case 2:
                    return _context.abrupt("return", _context.sent);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 8:
          return _context2.abrupt("return", _context2.sent);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
});

NativeFunctionType.prototype.construct = _regenerator2.default.mark(function _callee4(thisArg, args, callee) {
  var self, target, env, scope;
  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          self = this;
          target = (callee || this).getValue();
          env = this[(0, _for2.default)("env")];
          scope = env.createExecutionScope(this, thisArg, target);
          _context4.next = 6;
          return scope.use(_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return self.nativeFunction.apply(env.createExecutionContext(thisArg, self, target), args || []);

                  case 2:
                    return _context3.abrupt("return", _context3.sent);

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

        case 6:
          return _context4.abrupt("return", _context4.sent);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
});

},{"./function-type":363,"./property-descriptor":369,"babel-runtime/core-js/symbol/for":34,"babel-runtime/regenerator":37,"util":174}],366:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.ObjectFactory = ObjectFactory;

var _objectType = require("./object-type");

var _primitiveType = require("./primitive-type");

var _functionType = require("./function-type");

var _nativeFunctionType = require("./native-function-type");

var _regexType = require("./regex-type");

var _arrayType = require("./array-type");

var _stringType = require("./string-type");

var _dateType = require("./date-type");

var _errorType = require("./error-type");

var _argumentType = require("./argument-type");

var _iteratorType = require("./iterator-type");

var _symbolType = require("./symbol-type");

var _collectionType = require("./collection-type");

var _proxyType = require("./proxy-type");

var _contracts = require("../utils/contracts");

var _helpers = require("../utils/helpers");

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orphans = (0, _create2.default)(null);
var functionNameMatcher = /((?:get |set )?\[Symbol\.\w+\]|[^.]+)$/;

function setOrphans(scope) {
  var _loop = function _loop(typeName) {
    var parent = scope.getValue(typeName);
    if (parent) {
      orphans[typeName].forEach(function (child) {
        return child.setPrototype(parent.getValue("prototype"));
      });
      delete orphans[typeName];
    }
  };

  for (var typeName in orphans) {
    _loop(typeName);
  }

  orphans = (0, _create2.default)(null);
}

function setProto(typeName, instance, factory) {
  var env = factory.env;
  if (!env.global || !env.global.owns(typeName)) {
    if (!factory.initialized) {
      // during initialization it is possible for objects to be created
      // before the types have been registered - add a registry of items
      // and these can be filled in when the type is registered
      orphans[typeName] = orphans[typeName] || [];
      orphans[typeName].push(instance);
    }

    return;
  }

  var proto = env.global.getValue(typeName).getValue("prototype");
  instance.setPrototype(proto);
}

var defaultDescriptor = { configurable: true, enumerable: true, writable: true };
function createDataPropertyDescriptor(value) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? defaultDescriptor : arguments[1];

  var _ref$configurable = _ref.configurable;
  var configurable = _ref$configurable === undefined ? true : _ref$configurable;
  var _ref$enumerable = _ref.enumerable;
  var enumerable = _ref$enumerable === undefined ? true : _ref$enumerable;
  var _ref$writable = _ref.writable;
  var writable = _ref$writable === undefined ? true : _ref$writable;

  return { value: value, configurable: configurable, enumerable: enumerable, writable: writable };
}

function ObjectFactory(env) {
  this.env = env;
  this.options = env.options;
  this.ecmaVersion = env.ecmaVersion || 5;
  this.initialized = false;
  this.instanceCache = new _map2.default();
}

ObjectFactory.prototype = {
  constructor: ObjectFactory,

  init: function init() {
    setOrphans(this.env);
    this.initialized = true;
  },


  /**
   * Creates a primitive object based on the provided native value.
   * @param {any} value - The primitive value.
   * @returns {ObjectType} The primitive instance.
   */
  createPrimitive: function createPrimitive(value) {
    return this.create((0, _helpers.getNativeType)(value), value);
  },


  /**
   * Creates an object based on the type specified. For a primitive type the second
   * parameter is used as the objects underlying value.
   * @param {String} typeName - The name of the object to create.
   * @param {any} [value] - The primitive value.
   * @returns {ObjectType} The new instance.
   */
  create: function create(typeName, value) {
    // the value is already wrapped in an object
    // this can happen if an exception is rethrown
    if (value && value instanceof _objectType.ObjectType) {
      return value;
    }

    var instance = undefined;

    switch (typeName) {
      case "Null":
        return _primitiveType.NULL;

      case "Undefined":
        return _primitiveType.UNDEFINED;

      case "Symbol":
        instance = new _symbolType.SymbolType(value);
        break;

      case "String":
        if (this.instanceCache.has(value)) {
          return this.instanceCache.get(value);
        }

        this.instanceCache.set(value, instance = new _stringType.StringType(value));
        break;

      case "Number":
        if (value === 0 && 1 / value < 0) {
          // negative zero - can't store as key in map
          instance = new _primitiveType.PrimitiveType(value);
          break;
        }

      case "Boolean":
        if (this.instanceCache.has(value)) {
          return this.instanceCache.get(value);
        }

        this.instanceCache.set(value, instance = new _primitiveType.PrimitiveType(value));
        break;

      case "Date":
        instance = new _dateType.DateType(value);
        break;

      case "RegExp":
        instance = new _regexType.RegexType(value);
        break;

      case "Array":
        instance = new _arrayType.ArrayType();
        break;

      case "Set":
      case "Map":
        instance = new _collectionType.CollectionType(typeName);
        break;

      case "Error":
      case "TypeError":
      case "ReferenceError":
      case "SyntaxError":
      case "RangeError":
      case "URIError":
      case "EvalError":
        instance = new _errorType.ErrorType(value);

        if (value) {
          typeName = value.name || typeName;
          if (value.message) {
            var message = this.createPrimitive(value.message);
            instance.defineProperty("message", createDataPropertyDescriptor(message, { enumerable: false }));
          }
        }

        break;

      default:
        throw Error("Not a primitive: " + value);
    }

    instance.init(this.env);
    setProto(typeName, instance, this);
    return instance;
  },


  /**
   * Creates an array object.
   * @param {ObjectType[]} [elements] - If provided, the elements will be added to the new array.
   * @returns {ArrayType} The array instance.
   */
  createArray: function createArray(elements) {
    var instance = this.create("Array");

    if (elements) {
      for (var i = 0, ln = elements.length; i < ln; i++) {
        instance.setIndex(i, elements[i]);
      }
    }

    return instance;
  },


  /**
   * Creates an object.
   * @param {ObjectType} [ctor] - The prototype to use with the new object. If no value is provided
   * the Object prototype will be used. If `null` is passed in, no prototype will be assigned to the
   * new object.
   * @returns {ObjectType} The object instance.
   */
  createObject: function createObject(ctor) {
    var instance = new _objectType.ObjectType();

    if (ctor !== null) {
      if (ctor) {
        instance.setPrototype(ctor.getValue("prototype"));
      } else {
        setProto("Object", instance, this);
      }
    }

    instance.init(this.env);
    return instance;
  },
  createProxy: function createProxy(target, handler) {
    (0, _contracts.assertIsObject)(target, "Proxy");
    (0, _contracts.assertIsObject)(handler, "Proxy");

    if (target.isProxy && target.revoked) {
      throw TypeError();
    }

    if (handler.isProxy && handler.revoked) {
      throw TypeError();
    }

    var instance = new _proxyType.ProxyType(target, handler);
    instance.init(this.env);
    return instance;
  },
  createArguments: function createArguments(args, callee, strict) {
    var instance = new _argumentType.ArgumentType();
    var objectClass = this.env.global.getValue("Object");

    instance.init(this.env, objectClass, objectClass.getPrototype());
    instance.setPrototype(objectClass.getValue("prototype"));

    if (strict) {
      var thrower = this.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
      instance.defineProperty("callee", thrower);
      instance.defineProperty("caller", thrower);
    } else {
      instance.defineProperty("callee", {
        configurable: true,
        enumerable: false,
        value: callee,
        writable: true
      });
    }

    var stringTagKey = _symbolType.SymbolType.getByKey("toStringTag");
    if (stringTagKey) {
      instance.define(stringTagKey, this.createPrimitive("Arguments"));
    }

    return instance;
  },
  createIterator: function createIterator(iterable, proto) {
    var instance = new _iteratorType.IteratorType(iterable);
    instance.init(this.env, proto);
    return instance;
  },
  createIteratorResult: function createIteratorResult(_ref2) {
    var value = _ref2.value;
    var _ref2$done = _ref2.done;
    var done = _ref2$done === undefined ? false : _ref2$done;

    var instance = this.createObject();
    instance.defineProperty("done", { value: this.createPrimitive(done) });
    instance.defineProperty("value", { value: value || _primitiveType.UNDEFINED });
    return instance;
  },
  createArrayFromSpecies: _regenerator2.default.mark(function createArrayFromSpecies(obj, length) {
    var ctor, speciesKey, objCtor, speciesCtor, lengthValue;
    return _regenerator2.default.wrap(function createArrayFromSpecies$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctor = this.env.global.getValue("Array");

            if (obj && obj.className === "Array") {
              speciesKey = _symbolType.SymbolType.getByKey("species");

              if (speciesKey) {
                objCtor = obj.getValue("constructor");

                if (objCtor !== ctor) {
                  speciesCtor = objCtor.getValue(speciesKey);

                  if ((0, _checks.isConstructor)(speciesCtor)) {
                    ctor = speciesCtor;
                  }
                }
              }
            }

            lengthValue = this.createPrimitive(length);
            _context.next = 5;
            return ctor.construct(null, [lengthValue]);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, createArrayFromSpecies, this);
  }),
  createFromSpeciesOrDefault: _regenerator2.default.mark(function createFromSpeciesOrDefault(obj, defaultCtor, args) {
    var speciesKey, ctor, species;
    return _regenerator2.default.wrap(function createFromSpeciesOrDefault$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            args = args || [];

            speciesKey = _symbolType.SymbolType.getByKey("species");

            if (!speciesKey) {
              _context2.next = 10;
              break;
            }

            ctor = obj.getValue("constructor");

            if ((0, _checks.isNullOrUndefined)(ctor)) {
              _context2.next = 10;
              break;
            }

            species = ctor.getValue(speciesKey);

            if (!species) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return species.construct(null, args);

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 10:
            _context2.next = 12;
            return defaultCtor.construct(null, args);

          case 12:
            return _context2.abrupt("return", _context2.sent);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, createFromSpeciesOrDefault, this);
  }),


  /**
   * Creates a function instance.
   * @param {AST|Function} fnOrNode - The AST or function to be used when the function is called.
   * @param {ObjectType} [proto] - The prototype to use for the function. If no object is provided
   * an empty object is used.
   * @param {Object} [options] - Property values to be used for the prototype.
   * @returns {FunctionType} The function instance.
   */
  createFunction: function createFunction(fnOrNode, proto) {
    var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref3$configurable = _ref3.configurable;
    var configurable = _ref3$configurable === undefined ? false : _ref3$configurable;
    var _ref3$enumerable = _ref3.enumerable;
    var enumerable = _ref3$enumerable === undefined ? false : _ref3$enumerable;
    var _ref3$writable = _ref3.writable;
    var writable = _ref3$writable === undefined ? true : _ref3$writable;
    var _ref3$strict = _ref3.strict;
    var strict = _ref3$strict === undefined ? false : _ref3$strict;
    var _ref3$isConstructor = _ref3.isConstructor;
    var isConstructor = _ref3$isConstructor === undefined ? false : _ref3$isConstructor;
    var name = _ref3.name;
    var homeObject = _ref3.homeObject;
    var kind = _ref3.kind;

    var instance = undefined;

    if (typeof fnOrNode === "function") {
      instance = new _nativeFunctionType.NativeFunctionType(fnOrNode);
    } else {
      instance = new _functionType.FunctionType(fnOrNode);
    }

    instance.init(this.env, proto, { configurable: configurable, enumerable: enumerable, writable: writable, isConstructor: isConstructor, strict: strict, homeObject: homeObject, kind: kind }, strict);
    instance.name = name || "";

    if (name) {
      instance.defineProperty("name", { value: this.createPrimitive(name), configurable: true }, true);
    }

    setProto("Function", instance, this);
    return instance;
  },
  createClass: function createClass(fnOrNode, proto) {
    var _ref4 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var name = _ref4.name;
    var homeObject = _ref4.homeObject;

    return this.createFunction(fnOrNode, proto, { configurable: false, enumerable: false, writable: false, strict: true, isConstructor: true, kind: "classConstructor", name: name, homeObject: homeObject });
  },
  createGetter: function createGetter(func, key) {
    return this.createBuiltInFunction(func, 0, "get " + key);
  },
  createSetter: function createSetter(func, key) {
    return this.createBuiltInFunction(func, 1, "set " + key);
  },


  /**
   * Creates a function with no prototype that cannot be instantiated.
   * @param {Function} func - The underlying function.
   * @param {Number} length - The length property of the function.
   * @param {String} funcName - The name of the function.
   * @returns {NativeFunctionType} The function instance.
   */
  createBuiltInFunction: function createBuiltInFunction(func, length, funcName) {
    // todo: change this to route to standard createFunction method with appropriate presets
    var instance = new _nativeFunctionType.NativeFunctionType(function () {
      if (this.isNew) {
        throw TypeError(funcName + " is not a constructor");
      }

      return func.apply(this, arguments);
    });

    setProto("Function", instance, this);
    instance[(0, _for2.default)("env")] = this.env;
    instance.builtIn = true;
    instance.canConstruct = false;
    instance.setLength(length);
    // instance.defineProperty("length", {value: this.createPrimitive(length), configurable: this.ecmaVersion > 5});

    var match = functionNameMatcher.exec(funcName);
    var name = match && match[1] || funcName;

    instance.defineProperty("name", { value: this.createPrimitive(name), configurable: true }, true);

    return instance;
  },
  createThrower: function createThrower(message, thrower) {
    this.throwers = this.throwers || (0, _create2.default)(null);
    if (message in this.throwers) {
      return this.throwers[message];
    }

    thrower = thrower || function () {
      throw TypeError(message);
    };

    // we want to keep the same instance of the throwers because there
    // are silly tests that check for this
    var throwerInstance = this.createBuiltInFunction(thrower);
    return this.throwers[message] = {
      get: throwerInstance,
      getter: thrower,
      set: throwerInstance,
      setter: thrower,
      enumerable: false,
      configurable: false
    };
  }
};

},{"../utils/checks":376,"../utils/contracts":377,"../utils/helpers":378,"./argument-type":358,"./array-type":359,"./collection-type":360,"./date-type":361,"./error-type":362,"./function-type":363,"./iterator-type":364,"./native-function-type":365,"./object-type":367,"./primitive-type":368,"./proxy-type":370,"./regex-type":371,"./string-type":372,"./symbol-type":373,"babel-runtime/core-js/map":4,"babel-runtime/core-js/object/create":26,"babel-runtime/core-js/symbol/for":34,"babel-runtime/regenerator":37}],367:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.ObjectType = ObjectType;

var _operators = require("../utils/operators");

var _operators2 = _interopRequireDefault(_operators);

var _propertyDescriptor = require("./property-descriptor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [propertyIterator].map(_regenerator2.default.mark);

var integerMatcher = /^\d+$/;

function isSymbol(key) {
  return key && (typeof key === "undefined" ? "undefined" : (0, _typeof3.default)(key)) === "object" && key.isSymbol;
}

function getPropertySource(key) {
  return isSymbol(key) ? "symbols" : "properties";
}

function propertyIterator(env, obj) {
  var visited, objectFactory, current, keys, _iterator, _isArray, _i, _ref, key, desc, value;

  return _regenerator2.default.wrap(function propertyIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          visited = (0, _create2.default)(null);
          objectFactory = env.objectFactory;
          current = obj;

        case 3:
          if (!current) {
            _context.next = 29;
            break;
          }

          keys = current.getOwnPropertyKeys("String");
          _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 6:
          if (!_isArray) {
            _context.next = 12;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("break", 26);

        case 9:
          _ref = _iterator[_i++];
          _context.next = 16;
          break;

        case 12:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("break", 26);

        case 15:
          _ref = _i.value;

        case 16:
          key = _ref;
          desc = current.getProperty(key);

          if (!desc) {
            _context.next = 24;
            break;
          }

          if (!(desc.enumerable && !(key in visited))) {
            _context.next = 23;
            break;
          }

          value = objectFactory.createPrimitive(key);
          _context.next = 23;
          return objectFactory.createIteratorResult({ value: value });

        case 23:

          visited[key] = true;

        case 24:
          _context.next = 6;
          break;

        case 26:

          current = current.getPrototype();
          _context.next = 3;
          break;

        case 29:
          return _context.abrupt("return", objectFactory.createIteratorResult({ done: true }));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function propertyKeyComparer(a, b) {
  if (integerMatcher.test(a.key)) {
    if (integerMatcher.test(b.key)) {
      return a.key - b.key;
    }

    return -1;
  }

  if (integerMatcher.test(b.key)) {
    return 1;
  }

  return a.uid - b.uid;
}

function ObjectType() {
  this.isPrimitive = false;
  this.type = "object";
  this.className = "Object";
  this.extensible = true;
  this.properties = (0, _create2.default)(null);
  this.symbols = (0, _create2.default)(null);

  this.version = 0;
  this.primitiveHint = "number";
}

ObjectType.prototype = {
  constructor: ObjectType,

  init: function init(env, proto, descriptor, strict) {
    this[(0, _for2.default)("env")] = env;
  },
  getPrototype: function getPrototype() {
    return this.proto || null;
  },
  setPrototype: function setPrototype(proto) {
    if (this.proto === proto) {
      return true;
    }

    if (!this.isExtensible()) {
      return false;
    }

    // check whether prototype chain already includes object
    var current = proto;
    while (current) {
      if (current === this) {
        return false;
      }

      current = current.getPrototype();
    }

    this.proto = proto;
    this.version++;

    return true;
  },
  getProperty: function getProperty(key, receiver) {
    receiver = receiver || this;

    var localKey = String(key);
    var source = getPropertySource(key);

    if (localKey in this[source]) {
      return this[source][localKey].bind(receiver);
    }

    var current = this.getPrototype();
    if (current) {
      return current.getProperty(key, receiver);
    }

    return undefined;
  },
  getOwnProperty: function getOwnProperty(key) {
    return this[getPropertySource(key)][String(key)];
  },
  getOwnPropertyKeys: function getOwnPropertyKeys(keyType) {
    var _this = this;

    var keys = [];

    // add string keys
    if (keyType !== "Symbol") {
      // note: this uses native sort which may not be stable
      keys = (0, _keys2.default)(this.properties).map(function (key) {
        return _this.properties[key];
      }).sort(propertyKeyComparer).map(function (prop) {
        return String(prop.key);
      });
    }

    // add symbol keys
    if (keyType !== "String") {
      for (var _key in this.symbols) {
        keys.push(this.symbols[_key].key);
      }
    }

    return keys;
  },
  isExtensible: function isExtensible() {
    return this.extensible;
  },
  getIterator: function getIterator() {
    var env = this[(0, _for2.default)("env")];
    return env.objectFactory.createIterator(propertyIterator(env, this));
  },
  has: function has(key) {
    if (String(key) in this[getPropertySource(key)]) {
      return true;
    }

    var current = this.getPrototype();
    if (current) {
      return current.has(key);
    }

    return false;
  },
  owns: function owns(key) {
    return !!this.getOwnProperty(key);
  },
  setValue: function setValue(key, value, receiver) {
    receiver = receiver || this;

    var descriptor = this.getProperty(key);
    if (descriptor) {
      if (this !== receiver && receiver.owns(key)) {
        var receiverDescriptor = receiver.getProperty(key);
        if (!receiverDescriptor.dataProperty) {
          return false;
        }

        descriptor = receiverDescriptor;
      }

      if (descriptor.dataProperty && descriptor.hasValue() && receiver.owns(key) && _operators2.default.areSame(descriptor.getValue(), value)) {
        return true;
      }

      if (descriptor.initialized && !descriptor.canSetValue()) {
        return false;
      }

      if (!descriptor.dataProperty) {
        descriptor.bind(receiver);
        descriptor.setValue(value);
        return true;
      }

      if (!descriptor.canUpdate({ value: value })) {
        return false;
      }

      if (!receiver.owns(key)) {
        return receiver.defineProperty(key, {
          value: value,
          configurable: true,
          enumerable: true,
          writable: true
        }, false);
      }

      descriptor.setValue(value);
      return true;
    }

    return receiver.defineProperty(key, {
      value: value,
      configurable: true,
      enumerable: true,
      writable: true
    }, false);
  },
  defineProperty: function defineProperty(key, descriptor, throwOnError) {
    if (this.isPrimitive) {
      if (throwOnError) {
        throw TypeError("Cannot define property: " + key + ", object is not extensible");
      }

      return false;
    }

    var current = this.getOwnProperty(key);
    if (current) {
      if (current.canUpdate(descriptor)) {
        current.update(descriptor);
        return true;
      }

      if (throwOnError) {
        throw TypeError("Cannot redefine property: " + key);
      }

      return false;
    } else if (!this.extensible) {
      if (throwOnError) {
        throw TypeError("Cannot define property: " + key + ", object is not extensible");
      }

      return false;
    }

    this[getPropertySource(key)][String(key)] = new _propertyDescriptor.PropertyDescriptor(this, descriptor, key);
    this.version++;
    return true;
  },
  deleteProperty: function deleteProperty(key, throwOnError) {
    if (this.isPrimitive) {
      return false;
    }

    var source = getPropertySource(key);
    key = String(key);

    if (key in this[source]) {
      if (!this[source][key].configurable) {
        if (throwOnError) {
          throw TypeError("Cannot delete property: " + key);
        }

        return false;
      }
    }

    this.version++;
    return delete this[source][key];
  },
  define: function define(key, value) {
    var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref2$configurable = _ref2.configurable;
    var configurable = _ref2$configurable === undefined ? true : _ref2$configurable;
    var _ref2$enumerable = _ref2.enumerable;
    var enumerable = _ref2$enumerable === undefined ? false : _ref2$enumerable;
    var _ref2$writable = _ref2.writable;
    var writable = _ref2$writable === undefined ? true : _ref2$writable;
    var getter = _ref2.getter;
    var get = _ref2.get;
    var setter = _ref2.setter;
    var set = _ref2.set;

    // this method is intended for external usage only - it provides a way to define
    // methods and properties and overwrite any existing properties even if they are
    // not configurable

    var descriptor = undefined;
    if (getter || setter) {
      descriptor = { getter: getter, get: get, setter: setter, set: set, configurable: configurable, enumerable: enumerable };
    } else {
      descriptor = { value: value, configurable: configurable, enumerable: enumerable, writable: writable };
    }

    this[getPropertySource(key)][String(key)] = new _propertyDescriptor.PropertyDescriptor(this, descriptor, key);
    this.version++;
  },
  remove: function remove(key) {
    // this method is intended for external usage only - it provides a way to remove
    // properties even if they are not normally able to be deleted
    delete this[getPropertySource(key)][String(key)];
    this.version++;
  },
  getValue: function getValue(key) {
    if (arguments.length > 0) {
      var property = this.getProperty(key);
      return property && property.getValue();
    }

    return this;
  },
  each: function each(func) {
    var _this2 = this;

    this.getOwnPropertyKeys().forEach(function (key) {
      func(_this2.getOwnProperty(key));
    });
  },
  freeze: function freeze() {
    var _this3 = this;

    this.each(function (desc) {
      if (desc.dataProperty) {
        _this3.defineProperty(desc.key, { writable: false, configurable: false });
      } else {
        _this3.defineProperty(desc.key, { configurable: false });
      }
    });

    this.preventExtensions();
  },
  preventExtensions: function preventExtensions() {
    this.extensible = false;
    return true;
  },
  seal: function seal() {
    var _this4 = this;

    this.each(function (desc) {
      _this4.defineProperty(desc.key, { configurable: false }, true);
    });

    this.preventExtensions();
  },
  toNative: function toNative() {
    if ("value" in this) {
      return this.value;
    }

    var unwrapped = {};

    for (var name in this.properties) {
      if (this.properties[name].enumerable) {
        unwrapped[name] = this.getValue(name).toNative();
      }
    }

    return unwrapped;
  },
  toObject: function toObject() {
    return this;
  }
};

},{"../utils/operators":380,"./property-descriptor":369,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/create":26,"babel-runtime/core-js/object/keys":27,"babel-runtime/core-js/symbol/for":34,"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37}],368:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.NULL = exports.UNDEFINED = undefined;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.PrimitiveType = PrimitiveType;

var _util = require("util");

var _objectType = require("./object-type");

var _helpers = require("../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PrimitiveType(value) {
  _objectType.ObjectType.call(this);

  this.isPrimitive = true;
  this.value = value;
  this.type = typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value);

  this.className = (0, _helpers.getNativeType)(value);
}

(0, _util.inherits)(PrimitiveType, _objectType.ObjectType);

PrimitiveType.prototype.getProperty = function (name) {
  // can't read properties of null/undefined
  if (this.value == null) {
    throw TypeError("Cannot read property '" + name + "' of " + this.type);
  }

  return _objectType.ObjectType.prototype.getProperty.apply(this, arguments);
};

PrimitiveType.prototype.toNative = function () {
  return this.value;
};

PrimitiveType.prototype.toObject = function () {
  var ctor = this.getValue("constructor");
  var env = this[(0, _for2.default)("env")];
  var newValue = env.objectFactory.createObject(ctor);

  newValue.className = this.className;
  newValue.value = this.value;

  this.init.call(newValue, env);
  return newValue;
};

var UNDEFINED = exports.UNDEFINED = new PrimitiveType(undefined);
var NULL = exports.NULL = new PrimitiveType(null);

},{"../utils/helpers":378,"./object-type":367,"babel-runtime/core-js/symbol/for":34,"babel-runtime/helpers/typeof":36,"util":174}],369:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.PropertyDescriptor = PropertyDescriptor;

var _operators = require("../utils/operators");

var _operators2 = _interopRequireDefault(_operators);

var _async = require("../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwn = Object.prototype.hasOwnProperty;
var uid = 0;

var defaultDescriptor = {
  configurable: false,
  enumerable: false,
  writable: false,
  value: undefined
};

function PropertyDescriptor(base) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? defaultDescriptor : arguments[1];
  var key = arguments[2];

  this.base = base;
  this.configurable = config.configurable || false;
  this.enumerable = config.enumerable || false;
  this.initialized = config.initialized !== false;
  this.key = key;
  this.uid = ++uid;

  if ("get" in config || "set" in config) {
    this.dataProperty = false;
    this.get = config.get;
    this.getter = config.getter;
    this.set = config.set;
    this.setter = config.setter;
  } else {
    this.writable = config.writable || false;
    this.dataProperty = true;
    this.value = config.value;
  }
}

PropertyDescriptor.prototype = {
  constructor: PropertyDescriptor,

  bind: function bind(obj) {
    this.base = obj;
    return this;
  },
  update: function update(descriptor) {
    for (var prop in descriptor) {
      if (hasOwn.call(descriptor, prop)) {
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
  canUpdate: function canUpdate(descriptor) {
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
      if (!this.initialized) {
        return true;
      }

      if (!this.writable) {
        if (descriptor.writable) {
          return false;
        }

        return !("value" in descriptor) || _operators2.default.areSame(this.value, descriptor.value);
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
  getValue: function getValue() {
    if (!this.initialized) {
      throw ReferenceError(this.key + " has not been initialized");
    }

    if (this.dataProperty) {
      return this.value;
    }

    if (this.getter) {
      return (0, _async.exhaust)(this.getter.call(this.base));
    }

    return undefined;
  },
  canSetValue: function canSetValue(value) {
    return this.writable || !!this.setter || !this.initialized;
  },
  setValue: function setValue(value) {
    if (!this.canSetValue()) {
      return;
    }

    this.initialized = true;

    if (this.dataProperty) {
      this.value = value;
    } else if (this.setter) {
      (0, _async.exhaust)(this.setter.call(this.base, value));
    }
  },
  hasValue: function hasValue() {
    return !!this.value || !!this.getter;
  },
  init: function init(value) {
    this.initialized = true;
    this.value = value;
  }
};

},{"../utils/async":375,"../utils/operators":380}],370:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

exports.ProxyType = ProxyType;

var _util = require("util");

var _objectType = require("./object-type");

var _primitiveType = require("./primitive-type");

var _checks = require("../utils/checks");

var _contracts = require("../utils/contracts");

var _async = require("../utils/async");

var _native = require("../utils/native");

var _propertyDescriptor = require("./property-descriptor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envSymbol = (0, _for2.default)("env");

function getProxyMethod(proxy, key) {
  var handler = proxy.handler.getProperty(key);
  if (!handler) {
    return null;
  }

  var method = handler.getValue();
  if ((0, _checks.isUndefined)(method)) {
    return null;
  }

  (0, _contracts.assertIsFunction)(method, key);
  return method;
}

function getValueOrDefault(obj, key) {
  var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? _primitiveType.UNDEFINED : arguments[2];
  var transformer = arguments.length <= 3 || arguments[3] === undefined ? function (v) {
    return v;
  } : arguments[3];

  var propInfo = obj.getProperty(key);
  if (propInfo) {
    return transformer(propInfo.getValue());
  }

  return defaultValue;
}

function normalizeKey(env, key) {
  if ((typeof key === "undefined" ? "undefined" : (0, _typeof3.default)(key)) !== "object") {
    return env.objectFactory.createPrimitive(String(key));
  }

  return key;
}

function denormalizeKey(key) {
  if (key.isSymbol) {
    return key;
  }

  return key.toNative();
}

function toPropertyDescriptor(env, descriptor) {
  var result = env.objectFactory.createObject();
  if (descriptor.get || descriptor.set) {
    result.setValue("get", descriptor.get || _primitiveType.UNDEFINED);
    result.setValue("set", descriptor.set || _primitiveType.UNDEFINED);
  } else {
    result.setValue("value", descriptor.value);
    result.setValue("writable", env.objectFactory.createPrimitive(descriptor.writable));
  }

  result.setValue("enumerable", env.objectFactory.createPrimitive(descriptor.enumerable));
  result.setValue("configurable", env.objectFactory.createPrimitive(descriptor.configurable));
  return result;
}

function toCall(proxy, methodName) {
  var proxyMethod = getProxyMethod(proxy, "apply");
  if ((0, _checks.isUndefined)(proxyMethod)) {
    return proxy.target.getValue(methodName);
  }

  return proxy[envSymbol].objectFactory.createBuiltInFunction(_regenerator2.default.mark(function _callee(thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (methodName === "apply" && args.length > 0) {
              args = (0, _native.toArray)(args[0]);
            }

            _context.next = 3;
            return proxy.call(thisArg, args);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }), 1, "Function.prototype." + methodName);
}

function assertIsNotRevoked(proxy, methodName) {
  if (proxy.revoked) {
    throw TypeError("Method " + methodName + " called on a revoked Proxy object");
  }
}

function throwProxyInvariantError(methodName) {
  throw TypeError("Invariant check failed for proxy " + methodName + " trap");
}

function ProxyType(target, handler) {
  _objectType.ObjectType.call(this);

  this.target = target;
  this.handler = handler;
  this.className = target.className;
  this.type = target.type;
  this.revoked = false;
  this.isProxy = true;
}

(0, _util.inherits)(ProxyType, _objectType.ObjectType);

ProxyType.prototype.call = _regenerator2.default.mark(function _callee2(thisArg, args) {
  var proxyMethod,
      _target,
      argsArray,
      _args2 = arguments;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          assertIsNotRevoked(this, "apply");

          proxyMethod = getProxyMethod(this, "apply");

          if (!(0, _checks.isUndefined)(proxyMethod)) {
            _context2.next = 6;
            break;
          }

          _context2.next = 5;
          return (_target = this.target).call.apply(_target, _args2);

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          argsArray = this[envSymbol].objectFactory.createArray(args);
          _context2.next = 9;
          return proxyMethod.call(this.handler, [this.target, thisArg, argsArray]);

        case 9:
          return _context2.abrupt("return", _context2.sent);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
});

ProxyType.prototype.construct = _regenerator2.default.mark(function _callee3(thisArg, args) {
  var proxyMethod,
      _target2,
      argsArray,
      newObj,
      _args3 = arguments;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          assertIsNotRevoked(this, "construct");

          proxyMethod = getProxyMethod(this, "construct");

          if (!(0, _checks.isUndefined)(proxyMethod)) {
            _context3.next = 6;
            break;
          }

          _context3.next = 5;
          return (_target2 = this.target).construct.apply(_target2, _args3);

        case 5:
          return _context3.abrupt("return", _context3.sent);

        case 6:
          argsArray = this[envSymbol].objectFactory.createArray(args);
          _context3.next = 9;
          return proxyMethod.call(this.handler, [this.target, argsArray, this]);

        case 9:
          newObj = _context3.sent;

          if (!(0, _checks.isObject)(newObj)) {
            throwProxyInvariantError("construct");
          }

          return _context3.abrupt("return", newObj);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
});

ProxyType.prototype.has = function (key) {
  assertIsNotRevoked(this, "has");

  var proxyMethod = getProxyMethod(this, "has");
  if (!proxyMethod) {
    return this.target.has(key);
  }

  var env = this[envSymbol];
  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key)])));
  if (!result) {
    var propInfo = this.target.getProperty(key);
    if (propInfo) {
      if (!propInfo.configurable) {
        throwProxyInvariantError("has");
      }

      if (!this.target.isExtensible()) {
        throwProxyInvariantError("has");
      }
    }
  }

  return result;
};

ProxyType.prototype.owns = function (key) {
  return !!this.getOwnProperty(key);
};

ProxyType.prototype.getProperty = function (key, target) {
  assertIsNotRevoked(this, "get");

  // special case for function types
  if (this.type === "function" && (key === "call" || key === "apply")) {
    return new _propertyDescriptor.PropertyDescriptor(this, { value: toCall(this, key) }, key);
  }

  var proxyMethod = getProxyMethod(this, "get");
  if (!proxyMethod) {
    return this.target.getProperty(key, target);
  }

  var env = this[envSymbol];
  var value = (0, _async.exhaust)(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key), target || this]));
  var propInfo = this.target.getProperty(key);
  if (propInfo && !propInfo.configurable) {
    var targetValue = propInfo.getValue();
    if (propInfo.dataProperty && !propInfo.writable && !env.ops.areSame(value, targetValue)) {
      throwProxyInvariantError("get");
    }

    if (!propInfo.dataProperty && (0, _checks.isUndefined)(propInfo.get) && !(0, _checks.isUndefined)(value)) {
      throwProxyInvariantError("get");
    }
  }

  return new _propertyDescriptor.PropertyDescriptor(this, { value: value }, key);
};

ProxyType.prototype.getOwnProperty = function (key) {
  assertIsNotRevoked(this, "getOwnPropertyDescriptor");

  var proxyMethod = getProxyMethod(this, "getOwnPropertyDescriptor");
  if (!proxyMethod) {
    return this.target.getOwnProperty(key);
  }

  var env = this[envSymbol];
  var descriptor = (0, _async.exhaust)(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key)]));
  if (descriptor.type !== "object" && descriptor.type !== "undefined") {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  var propInfo = this.target.getOwnProperty(key);
  var hasDescriptor = !!propInfo;
  var frozen = !this.target.isExtensible() || hasDescriptor && !propInfo.configurable;

  if ((0, _checks.isUndefined)(descriptor)) {
    if (frozen) {
      throwProxyInvariantError("getOwnPropertyDescriptor");
    }

    return undefined;
  }

  if (!hasDescriptor && frozen) {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  var enumerable = getValueOrDefault(descriptor, "enumerable", false, _native.toBoolean);
  var configurable = getValueOrDefault(descriptor, "configurable", false, _native.toBoolean);
  var writable = getValueOrDefault(descriptor, "writable", false, _native.toBoolean);
  var value = getValueOrDefault(descriptor, "value");
  var getter = getValueOrDefault(descriptor, "get", null);
  var setter = getValueOrDefault(descriptor, "set", null);

  if (!configurable && (!hasDescriptor || !frozen)) {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  var proxyDescriptor = undefined;
  if (getter || setter) {
    proxyDescriptor = { getter: getter, setter: setter, get: undefined, set: undefined, enumerable: enumerable, configurable: configurable };
  } else {
    proxyDescriptor = { value: value, enumerable: enumerable, configurable: configurable, writable: writable };
  }

  if (hasDescriptor && !propInfo.canUpdate(proxyDescriptor)) {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  return new _propertyDescriptor.PropertyDescriptor(this, proxyDescriptor, key);
};

ProxyType.prototype.getPrototype = function () {
  assertIsNotRevoked(this, "getPrototypeOf");

  var proxyMethod = getProxyMethod(this, "getPrototypeOf");
  if (!proxyMethod) {
    return this.target.getPrototype();
  }

  var proto = (0, _async.exhaust)(proxyMethod.call(this.handler, [this.target]));
  if (!(0, _checks.isObject)(proto) && !(0, _checks.isNull)(proto)) {
    throwProxyInvariantError("getPrototypeOf");
  }

  if (this.target.isExtensible()) {
    return proto;
  }

  var targetProto = this.target.getPrototype();
  if (targetProto !== proto) {
    throwProxyInvariantError("getPrototypeOf");
  }

  return proto;
};

ProxyType.prototype.setPrototype = function (proto) {
  assertIsNotRevoked(this, "setPrototypeOf");

  var proxyMethod = getProxyMethod(this, "setPrototypeOf");
  if (!proxyMethod) {
    return this.target.setPrototype(proto);
  }

  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target, proto])));
  if (this.target.isExtensible()) {
    return result;
  }

  var targetProto = this.target.getPrototype();
  if (result && targetProto !== proto) {
    throwProxyInvariantError("setPrototypeOf");
  }

  return result;
};

ProxyType.prototype.isExtensible = function () {
  assertIsNotRevoked(this, "isExtensible");

  var proxyMethod = getProxyMethod(this, "isExtensible");
  if (!proxyMethod) {
    return this.target.isExtensible();
  }

  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target])));
  var targetResult = this.target.isExtensible();

  if (result !== targetResult) {
    throwProxyInvariantError("isExtensible");
  }

  return result;
};

ProxyType.prototype.preventExtensions = function () {
  assertIsNotRevoked(this, "preventExtensions");

  var proxyMethod = getProxyMethod(this, "preventExtensions");
  if (!proxyMethod) {
    return this.target.preventExtensions();
  }

  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target])));
  if (result && this.target.isExtensible()) {
    throwProxyInvariantError("preventExtensions");
  }

  return result;
};

ProxyType.prototype.deleteProperty = function (key, throwOnError) {
  assertIsNotRevoked(this, "deleteProperty");

  var proxyMethod = getProxyMethod(this, "deleteProperty");
  if ((0, _checks.isUndefined)(proxyMethod)) {
    return this.target.deleteProperty(key, throwOnError);
  }

  var env = this[envSymbol];
  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key)])));
  if (result) {
    var propInfo = this.target.getProperty(key);
    if (propInfo && !propInfo.configurable) {
      throwProxyInvariantError("deleteProperty");
    }
  }

  return result;
};

ProxyType.prototype.defineProperty = function (key, descriptor, throwOnError) {
  assertIsNotRevoked(this, "defineProperty");

  var proxyMethod = getProxyMethod(this, "defineProperty");
  if ((0, _checks.isUndefined)(proxyMethod)) {
    var _target3;

    return (_target3 = this.target).defineProperty.apply(_target3, arguments);
  }

  var env = this[envSymbol];
  var desc = toPropertyDescriptor(env, descriptor);
  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key), desc])));

  if (result) {
    var propInfo = this.target.getProperty(key);
    if (propInfo) {
      if ("configurable" in descriptor && descriptor.configurable !== propInfo.configurable) {
        throwProxyInvariantError("defineProperty");
      }

      if (!propInfo.canUpdate(descriptor)) {
        throwProxyInvariantError("defineProperty");
      }
    } else if (!this.target.isExtensible() || descriptor.configurable === false) {
      throwProxyInvariantError("defineProperty");
    }
  }

  return result;
};

ProxyType.prototype.getOwnPropertyKeys = function (keyType) {
  var _this = this;

  assertIsNotRevoked(this, "ownKeys");

  var proxyMethod = getProxyMethod(this, "ownKeys");
  if ((0, _checks.isUndefined)(proxyMethod)) {
    return this.target.getOwnPropertyKeys(keyType);
  }

  var proxyKeys = (0, _async.exhaust)((0, _native.toArray)((0, _async.exhaust)(proxyMethod.call(this.handler, [this.target]))));
  var rawKeys = proxyKeys.map(denormalizeKey);
  var targetKeys = this.target.getOwnPropertyKeys();

  if (!this.target.isExtensible()) {
    if (rawKeys.length !== targetKeys.length) {
      throwProxyInvariantError("ownKeys");
    }

    if (targetKeys.some(function (k) {
      return rawKeys.indexOf(k) === -1;
    })) {
      throwProxyInvariantError("ownKeys");
    }
  } else {
    var fixedKeys = targetKeys.filter(function (k) {
      return !_this.target.getProperty(k).configurable;
    });
    if (fixedKeys.length > 0) {
      if (fixedKeys.some(function (k) {
        return rawKeys.indexOf(k) === -1;
      })) {
        throwProxyInvariantError("ownKeys");
      }
    }
  }

  return rawKeys;
};

ProxyType.prototype.getIterator = function () {
  assertIsNotRevoked(this, "enumerate");

  var proxyMethod = getProxyMethod(this, "enumerate");
  if ((0, _checks.isUndefined)(proxyMethod)) {
    return this.target.getIterator();
  }

  var result = (0, _async.exhaust)(proxyMethod.call(this.handler, [this.target]));
  if (!(0, _checks.isObject)(result)) {
    throwProxyInvariantError("enumerate");
  }

  return result;
};

ProxyType.prototype.setValue = function (key, value) {
  assertIsNotRevoked(this, "set");

  var proxyMethod = getProxyMethod(this, "set");
  if ((0, _checks.isUndefined)(proxyMethod)) {
    var _target4;

    return (_target4 = this.target).setValue.apply(_target4, arguments);
  }

  var env = this[envSymbol];
  var args = [this.target, normalizeKey(env, key), value, this];
  var result = (0, _native.toBoolean)((0, _async.exhaust)(proxyMethod.call(this.handler, args)));
  if (result) {
    var propInfo = this.target.getProperty(key);
    if (propInfo && !propInfo.configurable) {
      var targetValue = propInfo.getValue();
      if (propInfo.dataProperty && !propInfo.writable && !env.ops.areSame(value, targetValue)) {
        throwProxyInvariantError("set");
      }

      if (!propInfo.dataProperty && (0, _checks.isUndefined)(propInfo.set)) {
        throwProxyInvariantError("set");
      }
    }
  }

  return result;
};

ProxyType.prototype.revoke = function () {
  this.revoked = true;
};

},{"../utils/async":375,"../utils/checks":376,"../utils/contracts":377,"../utils/native":379,"./object-type":367,"./primitive-type":368,"./property-descriptor":369,"babel-runtime/core-js/symbol/for":34,"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37,"util":174}],371:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.RegexType = RegexType;

var _util = require("util");

var _objectType = require("./object-type");

function RegexType(value) {
  _objectType.ObjectType.call(this);

  this.source = value;
  this.className = "RegExp";
}

(0, _util.inherits)(RegexType, _objectType.ObjectType);

RegexType.prototype.init = function (env) {
  var _this = this;

  _objectType.ObjectType.prototype.init.apply(this, arguments);

  // lastIndex is settable, all others are read-only attributes
  this.defineProperty("lastIndex", { value: env.objectFactory.createPrimitive(this.source.lastIndex), writable: true });

  ["source", "global", "ignoreCase", "multiline"].forEach(function (key) {
    if (env.ecmaVersion > 5) {
      var getter = function getter() {
        return env.objectFactory.createPrimitive(this.source[key]);
      };
      var getterFunc = env.objectFactory.createGetter(getter, key);

      _this.defineProperty(key, {
        getter: getter,
        get: getterFunc,
        configurable: true
      });
    } else {
      _this.defineProperty(key, { value: env.objectFactory.createPrimitive(_this.source[key]) });
    }
  });
};

RegexType.prototype.toNative = function () {
  return this.source;
};

},{"./object-type":367,"util":174}],372:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

exports.StringType = StringType;

var _util = require("util");

var _primitiveType = require("./primitive-type");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var charAttrs = { writable: false, enumerable: true, configurable: false };

function lazyInit(instance, key) {
  var nativeValue = instance.value;
  if (!nativeValue || !(0, _native.isInteger)(key) || "0" in instance.properties) {
    return;
  }

  if (nativeValue.length === 1) {
    instance.define("0", instance, charAttrs);
    return;
  }

  for (var i = 0, ln = nativeValue.length; i < ln; i++) {
    var c = instance[(0, _for2.default)("env")].objectFactory.create("String", nativeValue[i]);
    instance.define(i, c, charAttrs);
  }
}

function StringType(value) {
  _primitiveType.PrimitiveType.call(this, value);
}

(0, _util.inherits)(StringType, _primitiveType.PrimitiveType);

StringType.prototype.init = function (env) {
  _primitiveType.PrimitiveType.prototype.init.apply(this, arguments);

  var length = this.value.length;
  this.define("length", env.objectFactory.create("Number", length), { configurable: false, writable: false });

  if (length === 1) {
    this.define("0", this, { enumerable: true, configurable: false });
  }
};

StringType.prototype.getProperty = function (key) {
  lazyInit(this, key);
  return _primitiveType.PrimitiveType.prototype.getProperty.apply(this, arguments);
};

StringType.prototype.getOwnProperty = function (key) {
  lazyInit(this, key);
  return _primitiveType.PrimitiveType.prototype.getOwnProperty.apply(this, arguments);
};

StringType.prototype.getOwnPropertyKeys = function () {
  lazyInit(this, 0);
  return _primitiveType.PrimitiveType.prototype.getOwnPropertyKeys.apply(this, arguments);
};

StringType.prototype.has = function (key) {
  lazyInit(this, key);
  return _primitiveType.PrimitiveType.prototype.has.apply(this, arguments);
};

StringType.prototype.owns = function (key) {
  lazyInit(this, key);
  return _primitiveType.PrimitiveType.prototype.owns.apply(this, arguments);
};

StringType.prototype.toObject = function () {
  var obj = _primitiveType.PrimitiveType.prototype.toObject.call(this);

  // set all character properties
  lazyInit(obj, 0);
  return obj;
};

},{"../utils/native":379,"./primitive-type":368,"babel-runtime/core-js/symbol/for":34,"util":174}],373:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.SymbolType = SymbolType;

var _util = require("util");

var _objectType = require("./object-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GLOBAL_SYMBOL_REGISTRY = (0, _create2.default)(null);
var uid = 0;

function SymbolType(description) {
  _objectType.ObjectType.call(this);

  this.type = "symbol";
  this.className = "Symbol";
  this.description = description;
  this.uid = uid++;

  // add so we can easily check if an object is a symbol when we care
  this.isSymbol = true;
}

(0, _util.inherits)(SymbolType, _objectType.ObjectType);

SymbolType.prototype.defineProperty = function (key, descriptor) {
  return false;
};

SymbolType.prototype.setValue = function (key, value, target) {
  return false;
};

SymbolType.prototype.toNative = function () {
  return "Symbol(" + this.description + ")";
};

SymbolType.prototype.toString = function () {
  // this method is here so symbols can be coerced into strings for property lookups
  return "@@" + this.uid;
};

SymbolType.prototype.toSymbolString = function () {
  return this.description ? "[" + this.description + "]" : "";
};

SymbolType.add = function (key, sym) {
  GLOBAL_SYMBOL_REGISTRY[key] = sym;
};

SymbolType.getByKey = function (key) {
  return GLOBAL_SYMBOL_REGISTRY[key];
};

SymbolType.getByInstance = function (sym) {
  for (var key in GLOBAL_SYMBOL_REGISTRY) {
    if (sym === GLOBAL_SYMBOL_REGISTRY[key]) {
      return GLOBAL_SYMBOL_REGISTRY[key];
    }
  }

  return undefined;
};

},{"./object-type":367,"babel-runtime/core-js/object/create":26,"util":174}],374:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.reset = reset;
exports.declare = declare;
exports.assign = assign;

var _primitiveType = require("../types/primitive-type");

var _native = require("./native");

var _iterators = require("../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [reset, declare, assign, destructure, handleDefault, destructureArray, getObjectKey, destructureObject].map(_regenerator2.default.mark);

function reset(env, leftNode, priorScope, newScope) {
  var i, ln, currentBinding;
  return _regenerator2.default.wrap(function reset$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!leftNode.isVariableDeclaration()) {
            _context.next = 10;
            break;
          }

          i = 0, ln = leftNode.declarations.length;

        case 2:
          if (!(i < ln)) {
            _context.next = 8;
            break;
          }

          _context.next = 5;
          return reset(env, leftNode.declarations[i], priorScope, newScope);

        case 5:
          i++;
          _context.next = 2;
          break;

        case 8:
          _context.next = 17;
          break;

        case 10:
          if (!(leftNode.isLet() || leftNode.isConst())) {
            _context.next = 15;
            break;
          }

          currentBinding = priorScope.getVariable(leftNode.id.name);

          newScope.getVariable(leftNode.id.name).setValue(currentBinding.getValue());
          _context.next = 17;
          break;

        case 15:
          _context.next = 17;
          return destructure(env, leftNode, null, function (e, left) {
            return reset(e, left, priorScope, newScope);
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function declare(env, leftNode, rightValue, kind) {
  var _i, _ln, left;

  return _regenerator2.default.wrap(function declare$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          kind = kind || "var";

          if (!leftNode.isVariableDeclaration()) {
            _context3.next = 12;
            break;
          }

          kind = leftNode.kind;

          _i = 0, _ln = leftNode.declarations.length;

        case 4:
          if (!(_i < _ln)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return declare(env, leftNode.declarations[_i], rightValue, kind);

        case 7:
          _i++;
          _context3.next = 4;
          break;

        case 10:
          _context3.next = 24;
          break;

        case 12:
          if (!leftNode.isVariableDeclarator()) {
            _context3.next = 17;
            break;
          }

          _context3.next = 15;
          return declare(env, leftNode.id, rightValue, kind);

        case 15:
          _context3.next = 24;
          break;

        case 17:
          if (!leftNode.isIdentifier()) {
            _context3.next = 22;
            break;
          }

          left = env.createVariable(leftNode.name, kind);

          left.setValue(rightValue);
          _context3.next = 24;
          break;

        case 22:
          _context3.next = 24;
          return destructure(env, leftNode, rightValue, _regenerator2.default.mark(function _callee(e, l, v) {
            return _regenerator2.default.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return declare(e, l, v, kind);

                  case 2:
                    return _context2.abrupt("return", _context2.sent);

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee, this);
          }));

        case 24:
          return _context3.abrupt("return", rightValue);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[1], this);
}

function assign(env, leftNode, rightValue) {
  var left;
  return _regenerator2.default.wrap(function assign$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = leftNode.type;
          _context4.next = _context4.t0 === "Identifier" ? 3 : _context4.t0 === "MemberExpression" ? 3 : 8;
          break;

        case 3:
          _context4.next = 5;
          return env.createExecutionContext().execute(leftNode);

        case 5:
          left = _context4.sent.result;

          left.setValue(rightValue, env.isStrict());
          return _context4.abrupt("break", 10);

        case 8:
          _context4.next = 10;
          return destructure(env, leftNode, rightValue, assign);

        case 10:
          return _context4.abrupt("return", rightValue);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[2], this);
}

function destructure(env, leftNode, rightValue, cb) {
  return _regenerator2.default.wrap(function destructure$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.t0 = leftNode.type;
          _context5.next = _context5.t0 === "ArrayPattern" ? 3 : _context5.t0 === "ObjectPattern" ? 6 : _context5.t0 === "AssignmentPattern" ? 9 : 12;
          break;

        case 3:
          _context5.next = 5;
          return destructureArray(env, leftNode, rightValue, cb);

        case 5:
          return _context5.abrupt("break", 13);

        case 6:
          _context5.next = 8;
          return destructureObject(env, leftNode, rightValue, cb);

        case 8:
          return _context5.abrupt("break", 13);

        case 9:
          _context5.next = 11;
          return handleDefault(env, leftNode, rightValue, cb);

        case 11:
          return _context5.abrupt("break", 13);

        case 12:
          throw Error(leftNode.type + " not implemented");

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked[3], this);
}

function handleDefault(env, left, rightValue, cb) {
  var defaultValue;
  return _regenerator2.default.wrap(function handleDefault$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(rightValue === _primitiveType.UNDEFINED)) {
            _context6.next = 5;
            break;
          }

          _context6.next = 3;
          return env.createExecutionContext().execute(left.right);

        case 3:
          defaultValue = _context6.sent;

          rightValue = defaultValue.result.getValue();

        case 5:
          _context6.next = 7;
          return cb(env, left.left, rightValue);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked[4], this);
}

function destructureArray(env, pattern, arr, cb) {
  var it, done, _i2, _ln2, element, value, current, _it$next, rest, _it$next2;

  return _regenerator2.default.wrap(function destructureArray$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          it = _iterators2.default.getIterator(arr);
          done = false;
          _i2 = 0, _ln2 = pattern.elements.length;

        case 3:
          if (!(_i2 < _ln2)) {
            _context7.next = 21;
            break;
          }

          element = pattern.elements[_i2];
          value = undefined, current = undefined;


          if (!done) {
            _it$next = it.next();
            done = _it$next.done;
            current = _it$next.value;

            value = !done && current.value;
          }

          if (element) {
            _context7.next = 9;
            break;
          }

          return _context7.abrupt("continue", 18);

        case 9:
          if (!element.isRestElement()) {
            _context7.next = 16;
            break;
          }

          rest = value ? [value] : [];


          while (!done) {
            _it$next2 = it.next();
            done = _it$next2.done;
            current = _it$next2.value;

            if (!done) {
              rest.push(current.value);
            }
          }

          _context7.next = 14;
          return cb(env, element.argument, env.objectFactory.createArray(rest));

        case 14:
          _context7.next = 18;
          break;

        case 16:
          _context7.next = 18;
          return cb(env, element, value || _primitiveType.UNDEFINED);

        case 18:
          _i2++;
          _context7.next = 3;
          break;

        case 21:

          it.return();

        case 22:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked[5], this);
}

function getObjectKey(env, keyNode) {
  var key;
  return _regenerator2.default.wrap(function getObjectKey$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!keyNode.computed) {
            _context8.next = 7;
            break;
          }

          _context8.next = 3;
          return env.createExecutionContext().execute(keyNode);

        case 3:
          key = _context8.sent.result.getValue();
          _context8.next = 6;
          return (0, _native.toPropertyKey)(key);

        case 6:
          return _context8.abrupt("return", _context8.sent);

        case 7:
          return _context8.abrupt("return", keyNode.name);

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked[6], this);
}

function destructureObject(env, pattern, obj, cb) {
  var _i3, _ln3, _current, _key, propInfo, _value;

  return _regenerator2.default.wrap(function destructureObject$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _i3 = 0, _ln3 = pattern.properties.length;

        case 1:
          if (!(_i3 < _ln3)) {
            _context9.next = 23;
            break;
          }

          _current = pattern.properties[_i3];
          _key = undefined;

          if (!_current.computed) {
            _context9.next = 13;
            break;
          }

          _context9.next = 7;
          return env.createExecutionContext().execute(_current.key);

        case 7:
          _context9.t0 = _context9.sent.result.getValue();
          _context9.next = 10;
          return (0, _native.toPropertyKey)(_context9.t0);

        case 10:
          _key = _context9.sent;
          _context9.next = 16;
          break;

        case 13:
          _context9.next = 15;
          return getObjectKey(env, _current.key);

        case 15:
          _key = _context9.sent;

        case 16:
          propInfo = obj.getProperty(_key);
          _value = propInfo ? propInfo.getValue() : _primitiveType.UNDEFINED;
          _context9.next = 20;
          return cb(env, _current.value, _value);

        case 20:
          _i3++;
          _context9.next = 1;
          break;

        case 23:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked[7], this);
}

},{"../iterators":352,"../types/primitive-type":368,"./native":379,"babel-runtime/regenerator":37}],375:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.isThenable = isThenable;
exports.map = map;
exports.each = each;
exports.step = step;
exports.exhaust = exhaust;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [map, each, step].map(_regenerator2.default.mark);

// function isObject (obj) {
//   return obj && typeof obj === "object";
// }

// function isFunction (obj) {
//   return typeof obj === "function";
// }

function isThenable(obj) {
  if (!obj) {
    return false;
  }

  var type = typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj);
  if (type !== "object" && type !== "function") {
    return false;
  }

  return typeof obj.then === "function";
  // return (isObject(obj) || isFunction(obj)) && typeof obj.then === "function";
}

function isNextable(obj) {
  if (!obj) {
    return false;
  }

  return (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) === "object" && typeof obj.next === "function";
}

function map(arr, func) {
  var mapped;
  return _regenerator2.default.wrap(function map$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mapped = [];
          return _context2.delegateYield(each(arr, _regenerator2.default.mark(function _callee() {
            var _args = arguments;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = mapped;
                    return _context.delegateYield(func.apply(undefined, _args), "t1", 2);

                  case 2:
                    _context.t2 = _context.t1;

                    _context.t0.push.call(_context.t0, _context.t2);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          })), "t0", 2);

        case 2:
          return _context2.abrupt("return", mapped);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

function each(arr, func) {
  var aborted, aborter, i, ln;
  return _regenerator2.default.wrap(function each$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(arr.length === 0)) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return");

        case 2:
          aborted = false;

          aborter = function aborter() {
            aborted = true;
          };

          i = 0, ln = arr.length;

        case 5:
          if (!(!aborted && i < ln)) {
            _context3.next = 10;
            break;
          }

          return _context3.delegateYield(func(arr[i], i, arr, aborter), "t0", 7);

        case 7:
          i++;
          _context3.next = 5;
          break;

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[1], this);
}

function step(it, prev) {
  var result, value;
  return _regenerator2.default.wrap(function step$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          result = it.next(prev);
          value = result.value;

          if (!isNextable(value)) {
            _context4.next = 6;
            break;
          }

          return _context4.delegateYield(step(value), "t0", 4);

        case 4:
          _context4.next = 9;
          break;

        case 6:
          if (!isThenable(value)) {
            _context4.next = 9;
            break;
          }

          _context4.next = 9;
          return value.then(function (res) {
            return it;
          });

        case 9:
          if (!result.done) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", value);

        case 11:
          _context4.next = 13;
          return step(it, value);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[2], this);
}

function tryCatch(it, priorValue, method) {
  try {
    var _it$method = it[method](priorValue);

    var done = _it$method.done;
    var value = _it$method.value;

    return { state: "next", done: done, value: value };
  } catch (err) {
    return { state: "throw", done: false, value: err };
  }
}

/**
 * Fully exhausts an iterator, including delegated generators.
 * Special handling is taken if a Promise is returned, pausing
 * the generator until the promise is resolved.
 *
 * @param {Iterator} [it] - The iterator
 * @param {Object} [value] - The previous iteration value (internal)
 * @param {Array<Iterator>} [stack] - The stack of iterators (internal)
 * @returns {Object|Promise} Returns the final value, or a Promise if
 * at any point in the iteration a Promise is returned.
 */
function exhaust(it, value) {
  var stack = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
  var state = arguments.length <= 3 || arguments[3] === undefined ? "next" : arguments[3];

  while (it) {
    var done = undefined;

    var _tryCatch = tryCatch(it, value, state);

    state = _tryCatch.state;
    done = _tryCatch.done;
    value = _tryCatch.value;


    if (state === "throw") {
      if (it = stack.pop()) {
        continue;
      }

      throw value;
    }

    if (value) {
      if (typeof value.next === "function") {
        stack[stack.length] = it;

        it = value;
        value = undefined;

        continue;
      }

      if (typeof value.then === "function") {
        return value.then(function (res) {
          return exhaust(it, res, stack);
        }, function (err) {
          return exhaust(it, err, stack, "throw");
        });
      }
    }

    if (done) {
      it = stack.pop();
    }
  }

  return value;
}

},{"babel-runtime/helpers/typeof":36,"babel-runtime/regenerator":37}],376:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isFunction = isFunction;
exports.isSymbol = isSymbol;
exports.isObject = isObject;
exports.isNumber = isNumber;
exports.isNegativeZero = isNegativeZero;
exports.isConstructor = isConstructor;
exports.isStrictNode = isStrictNode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// these helpers should have no dependencies
var useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

function isUndefined(obj) {
  return !obj || obj.isPrimitive && obj.value === undefined;
}

function isNull(obj) {
  return !isUndefined(obj) && obj.isPrimitive && obj.value === null;
}

function isNullOrUndefined(obj) {
  return isUndefined(obj) || isNull(obj);
}

function isFunction(obj) {
  return !isUndefined(obj) && obj.className === "Function";
}

function isSymbol(obj) {
  return !isUndefined(obj) && obj.isSymbol;
}

function isObject(obj) {
  if (isNullOrUndefined(obj) || isSymbol(obj)) {
    return false;
  }

  return !obj.isPrimitive || obj.type === "object";
}

function isNumber(obj) {
  return !isUndefined(obj) && obj.type === "number";
}

function isNegativeZero(obj) {
  return isNumber(obj) && obj.value === 0 && 1 / obj.value < 0;
}

function isConstructor(obj) {
  if (!isFunction(obj)) {
    return false;
  }

  return obj.canConstruct;
}

function isDirective(node) {
  return node.type === "ExpressionStatement" && node.expression.type === "Literal" && typeof node.expression.value === "string";
}

function isStrictNode(nodes) {
  if (!nodes) {
    return false;
  }

  if (Array.isArray(nodes)) {
    for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var node = _ref;

      if (!isDirective(node)) {
        return false;
      }

      if (node.expression.value === "use strict" && useStrictPattern.test(node.expression.raw)) {
        return true;
      }
    }

    return false;
  }

  if (nodes.body) {
    return isStrictNode(nodes.body);
  }

  return false;
}

},{"babel-runtime/core-js/get-iterator":2}],377:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.assertIsObject = assertIsObject;
exports.assertIsNotNullOrUndefined = assertIsNotNullOrUndefined;
exports.assertArgIsNotNullOrUndefined = assertArgIsNotNullOrUndefined;
exports.assertIsFunction = assertIsFunction;
exports.assertIsNotConstructor = assertIsNotConstructor;
exports.assertIsConstructor = assertIsConstructor;
exports.assertIsValidArrayLength = assertIsValidArrayLength;
exports.assertIsValidAssignment = assertIsValidAssignment;
exports.assertIsValidParameterName = assertIsValidParameterName;
exports.assertIsValidName = assertIsValidName;
exports.assertIsNotGeneric = assertIsNotGeneric;
exports.assertIsValidIdentifier = assertIsValidIdentifier;
exports.assertAreValidArguments = assertAreValidArguments;
exports.assertAreValidSetterArguments = assertAreValidSetterArguments;
exports.assertIsMap = assertIsMap;
exports.assertIsSet = assertIsSet;
exports.isRegExp = isRegExp;

var _keywords = require("../keywords");

var _symbolType = require("../types/symbol-type");

var _native = require("./native");

var _checks = require("./checks");

// const objectPattern = /\[object (\w+)\]/;
// const integerPattern = /^-?\d+$/;
// const octalPattern = /^-?0[0-7]/;
// const octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;
// const useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

function assertIsObject(obj, methodName) {
  if (!(0, _checks.isObject)(obj)) {
    throw TypeError(methodName + " called on non-object");
  }
}

function assertIsNotNullOrUndefined(value, methodName) {
  if ((0, _checks.isNullOrUndefined)(value)) {
    throw TypeError(methodName + " called on null or undefined");
  }
}

function assertArgIsNotNullOrUndefined(obj) {
  if ((0, _checks.isNullOrUndefined)(obj)) {
    throw TypeError("Cannot convert null or undefined to object");
  }
}

function assertIsFunction(obj, argName) {
  if (!(0, _checks.isFunction)(obj)) {
    throw TypeError(argName + " is not a function");
  }
}

function assertIsNotConstructor(context, methodName) {
  if (context.isNew) {
    throw TypeError(methodName + " is not a constructor");
  }
}

function assertIsConstructor(context, methodName) {
  if (!context.isNew) {
    throw TypeError(methodName + " must be called with 'new'");
  }
}

function assertIsValidArrayLength(length) {
  if (!(0, _native.isValidArrayLength)(length)) {
    throw RangeError("Invalid array length");
  }
}

function assertIsValidAssignment(left, strict) {
  if (left && !left.isReference) {
    throw ReferenceError("Invalid left-hand side in assignment");
  }

  if (left && left.base === left.env.global) {
    assertIsValidName(left.name, strict);
  }
}

function assertIsValidParameterName(name, strict) {
  if (/^\d|[;\(\)"']/.test(name)) {
    throw SyntaxError("Unexpected token in " + name);
  }

  assertIsValidName(name, strict);
}

function assertIsValidName(name, strict) {
  if (strict && (name === "arguments" || name === "eval")) {
    throw SyntaxError("Unexpected eval or arguments in strict mode");
  }
}

function assertIsNotGeneric(obj, expectedClass, methodName) {
  if (!obj || obj.className !== expectedClass) {
    throw TypeError(methodName + " is not generic");
  }
}

function assertIsValidIdentifier(name, strict, ecmaVersion) {
  if ((0, _keywords.isReserved)(name, ecmaVersion)) {
    throw SyntaxError("Illegal use of reserved keyword: " + name);
  }

  if (strict && (0, _keywords.isStrictReserved)(name, ecmaVersion)) {
    throw SyntaxError("Illegal use of strict mode reserved keyword: " + name);
  }

  assertIsValidName(name, strict);
}

function assertAreValidArguments(params, strict) {
  params.forEach(function (param, index) {
    assertIsValidParameterName(param.name, strict);

    if (strict) {
      if (params.some(function (p, i) {
        return index !== i && param.name === p.name;
      })) {
        throw SyntaxError("Strict mode function may not have duplicate parameter names");
      }
    }
  });
}

function assertAreValidSetterArguments(params, strict) {
  assertAreValidArguments(params, strict);
  if (params.some(function (p) {
    return p.isRestElement();
  })) {
    throw SyntaxError("A rest element cannot be used with a setter");
  }
}

function assertIsMap(obj, methodName) {
  if (!obj || obj.className !== "Map") {
    throw TypeError("The object must be a map when calling " + methodName);
  }
}

function assertIsSet(obj, methodName) {
  if (!obj || obj.className !== "Set") {
    throw TypeError("The object must be a set when calling " + methodName);
  }
}

function isRegExp(obj) {
  if (!(0, _checks.isObject)(obj)) {
    return false;
  }

  var matchKey = _symbolType.SymbolType.getByKey("match");
  var matchProp = obj.getProperty(matchKey);
  if (matchProp) {
    var matchValue = matchProp.getValue();
    if (!(0, _checks.isUndefined)(matchValue)) {
      return (0, _native.toBoolean)(matchValue);
    }
  }

  return obj.className === "RegExp";
}

},{"../keywords":356,"../types/symbol-type":373,"./checks":376,"./native":379}],378:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getMethod = getMethod;
exports.getNativeType = getNativeType;
exports.createDataProperty = createDataProperty;

var _checks = require("./checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPattern = /\[object (\w+)\]/;
var toString = Object.prototype.toString;

function getMethod(obj, key) {
  var method = obj.getValue(key);

  if ((0, _checks.isNullOrUndefined)(method)) {
    return null;
  }

  if (!(0, _checks.isFunction)(method)) {
    throw TypeError(key + " is not a method");
  }

  return method;
}

function getNativeType(obj) {
  // manually check for null/undefined or IE9 will coerce them to the global
  if (obj === undefined) {
    return "Undefined";
  }

  if (obj === null) {
    return "Null";
  }

  switch (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) {
    case "string":
      return "String";

    case "number":
      return "Number";

    case "boolean":
      return "Boolean";

    default:
      return objectPattern.exec(toString.call(obj))[1];
  }
}

function createDataProperty(obj, key, value, throwOnError) {
  obj.defineProperty(key, { value: value, configurable: true, enumerable: true, writable: true }, throwOnError);
}

},{"./checks":376,"babel-runtime/helpers/typeof":36}],379:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _sign = require("babel-runtime/core-js/math/sign");

var _sign2 = _interopRequireDefault(_sign);

exports.toObject = toObject;
exports.toLength = toLength;
exports.toPropertyKey = toPropertyKey;
exports.toArray = toArray;
exports.toPrimitive = toPrimitive;
exports.toPrimitiveOrdinary = toPrimitiveOrdinary;
exports.toString = toString;
exports.toNumber = toNumber;
exports.toInteger = toInteger;
exports.toInt32 = toInt32;
exports.toUInt32 = toUInt32;
exports.toBoolean = toBoolean;
exports.toNativeFunction = toNativeFunction;
exports.isInteger = isInteger;
exports.isValidArrayLength = isValidArrayLength;
exports.isOctalLiteral = isOctalLiteral;

var _helpers = require("../utils/helpers");

var _checks = require("./checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getPrimitive, getValues, toLength, toPropertyKey, toArray, tryGetNativeConversion, toPrimitive, toPrimitiveOrdinary, toString, toNumber, toInteger, toInt32, toUInt32].map(_regenerator2.default.mark);

var sign = _sign2.default;
var floor = Math.floor;
var abs = Math.abs;
var MAX_LENGTH = Math.pow(2, 53) - 1;

var integerPattern = /^-?\d+$/;
var octalPattern = /^-?0[0-7]/;
var octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;

function getPrimitive(value, methods, defaultValue) {
  var getNative, primitiveValue;
  return _regenerator2.default.wrap(function getPrimitive$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (value) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", defaultValue);

        case 2:
          if (!value.isPrimitive) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", value.toNative());

        case 4:
          getNative = (0, _helpers.getMethod)(value, methods[0]);

          if (!(0, _checks.isFunction)(getNative)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return getNative.call(value);

        case 8:
          primitiveValue = _context.sent;

          if (!primitiveValue.isPrimitive) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", primitiveValue.toNative());

        case 11:

          getNative = (0, _helpers.getMethod)(value, methods[1]);

          if (!(0, _checks.isFunction)(getNative)) {
            _context.next = 18;
            break;
          }

          _context.next = 15;
          return getNative.call(value);

        case 15:
          primitiveValue = _context.sent;

          if (!primitiveValue.isPrimitive) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", primitiveValue.toNative());

        case 18:
          throw TypeError("Cannot convert object to primitive value.");

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function getValues(args) {
  var values, i, ln;
  return _regenerator2.default.wrap(function getValues$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          values = [];
          i = 0, ln = args.length;

        case 2:
          if (!(i < ln)) {
            _context2.next = 11;
            break;
          }

          _context2.t0 = values;
          _context2.next = 6;
          return toPrimitive(args[i]);

        case 6:
          _context2.t1 = _context2.sent;

          _context2.t0.push.call(_context2.t0, _context2.t1);

        case 8:
          i++;
          _context2.next = 2;
          break;

        case 11:
          return _context2.abrupt("return", values);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function toObject(obj, throwOnError) {
  // todo: is this ES6 only?
  if (throwOnError && obj.isPrimitive && obj.value == null) {
    throw TypeError(obj.type + " cannot be converted to an object");
  }

  if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
    return obj.toObject();
  }

  return obj;
}

function getEnv(obj) {
  return obj[(0, _for2.default)("env")];
}

function toLength(obj) {
  var lengthProperty, length;
  return _regenerator2.default.wrap(function toLength$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          lengthProperty = obj.getProperty("length");

          if (!lengthProperty) {
            _context3.next = 10;
            break;
          }

          if (!(getEnv(obj).ecmaVersion === 5)) {
            _context3.next = 6;
            break;
          }

          _context3.next = 5;
          return toUInt32(lengthProperty.getValue());

        case 5:
          return _context3.abrupt("return", _context3.sent);

        case 6:
          _context3.next = 8;
          return toInteger(lengthProperty.getValue());

        case 8:
          length = _context3.sent;
          return _context3.abrupt("return", Math.min(Math.max(length, 0), MAX_LENGTH));

        case 10:
          return _context3.abrupt("return", 0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function toPropertyKey(key) {
  return _regenerator2.default.wrap(function toPropertyKey$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(key && key.isSymbol)) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return", key);

        case 2:
          _context4.next = 4;
          return toString(key);

        case 4:
          return _context4.abrupt("return", _context4.sent);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function toArray(obj, length) {
  var arr,
      _i,
      _args5 = arguments;

  return _regenerator2.default.wrap(function toArray$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          arr = [];

          if (!obj) {
            _context5.next = 8;
            break;
          }

          if (!(_args5.length < 2)) {
            _context5.next = 6;
            break;
          }

          _context5.next = 5;
          return toLength(obj);

        case 5:
          length = _context5.sent;

        case 6:
          _i = 0;

          while (_i < length) {
            if (obj.has(_i)) {
              arr[_i] = obj.getValue(_i);
            }

            _i++;
          }

        case 8:
          return _context5.abrupt("return", arr);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function tryGetNativeConversion(obj, hint) {
  var env, toPrimitiveKey, toPrimitiveFunc, value;
  return _regenerator2.default.wrap(function tryGetNativeConversion$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(0, _checks.isNullOrUndefined)(obj)) {
            _context6.next = 2;
            break;
          }

          return _context6.abrupt("return", false);

        case 2:
          env = getEnv(obj);
          toPrimitiveKey = env.getSymbol("toPrimitive");

          if (toPrimitiveKey) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", false);

        case 6:
          toPrimitiveFunc = (0, _helpers.getMethod)(obj, toPrimitiveKey);

          if (toPrimitiveFunc) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", false);

        case 9:
          _context6.next = 11;
          return toPrimitiveFunc.call(obj, [env.objectFactory.createPrimitive(hint)]);

        case 11:
          value = _context6.sent;

          if (!(value.type === "object")) {
            _context6.next = 14;
            break;
          }

          return _context6.abrupt("return", false);

        case 14:
          return _context6.abrupt("return", value);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

function toPrimitive(obj, preferredType) {
  var hint, nativeConversion;
  return _regenerator2.default.wrap(function toPrimitive$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          hint = preferredType && preferredType.toLowerCase();

          if (!hint && obj) {
            hint = obj.primitiveHint;
          }

          _context7.next = 4;
          return tryGetNativeConversion(obj, preferredType || "default");

        case 4:
          nativeConversion = _context7.sent;

          if (!nativeConversion) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", nativeConversion.toNative());

        case 7:
          _context7.next = 9;
          return toPrimitiveOrdinary(obj, preferredType);

        case 9:
          return _context7.abrupt("return", _context7.sent);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked[6], this);
}

function toPrimitiveOrdinary(obj, preferredType) {
  var hint;
  return _regenerator2.default.wrap(function toPrimitiveOrdinary$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          hint = preferredType && preferredType.toLowerCase();

          if (!hint && obj) {
            hint = obj.primitiveHint;
          }

          if (!(obj && obj.isSymbol)) {
            _context8.next = 4;
            break;
          }

          throw TypeError("Cannot convert Symbol to a " + hint);

        case 4:
          if (!(hint === "string")) {
            _context8.next = 9;
            break;
          }

          _context8.next = 7;
          return getPrimitive(obj, ["toString", "valueOf"], "undefined");

        case 7:
          _context8.t0 = _context8.sent;
          return _context8.abrupt("return", String(_context8.t0));

        case 9:
          _context8.next = 11;
          return getPrimitive(obj, ["valueOf", "toString"], 0);

        case 11:
          return _context8.abrupt("return", _context8.sent);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked[7], this);
}

function toString(obj) {
  return _regenerator2.default.wrap(function toString$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!(0, _checks.isUndefined)(obj)) {
            _context9.next = 2;
            break;
          }

          return _context9.abrupt("return", "undefined");

        case 2:
          if (!(0, _checks.isNull)(obj)) {
            _context9.next = 4;
            break;
          }

          return _context9.abrupt("return", "null");

        case 4:
          if (!obj.isSymbol) {
            _context9.next = 6;
            break;
          }

          throw TypeError("Symbol cannot be coerced into a string.");

        case 6:
          _context9.next = 8;
          return toPrimitive(obj, "string");

        case 8:
          _context9.t0 = _context9.sent;
          return _context9.abrupt("return", String(_context9.t0));

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked[8], this);
}

function toNumber(obj) {
  return _regenerator2.default.wrap(function toNumber$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!(0, _checks.isUndefined)(obj)) {
            _context10.next = 2;
            break;
          }

          return _context10.abrupt("return", NaN);

        case 2:
          if (!(0, _checks.isNull)(obj)) {
            _context10.next = 4;
            break;
          }

          return _context10.abrupt("return", 0);

        case 4:
          if (!obj.isSymbol) {
            _context10.next = 6;
            break;
          }

          throw TypeError("Symbol cannot be coerced into a number.");

        case 6:
          _context10.next = 8;
          return toPrimitive(obj, "number");

        case 8:
          _context10.t0 = _context10.sent;
          return _context10.abrupt("return", Number(_context10.t0));

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked[9], this);
}

function toInteger(obj) {
  var value;
  return _regenerator2.default.wrap(function toInteger$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return toNumber(obj);

        case 2:
          value = _context11.sent;

          if (!isNaN(value)) {
            _context11.next = 5;
            break;
          }

          return _context11.abrupt("return", 0);

        case 5:
          if (!(value === 0 || !isFinite(value))) {
            _context11.next = 7;
            break;
          }

          return _context11.abrupt("return", value);

        case 7:
          return _context11.abrupt("return", sign(value) * floor(abs(value)));

        case 8:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked[10], this);
}

function toInt32(obj) {
  var value;
  return _regenerator2.default.wrap(function toInt32$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return toInteger(obj);

        case 2:
          value = _context12.sent;
          return _context12.abrupt("return", isFinite(value) ? value : 0);

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked[11], this);
}

function toUInt32(obj) {
  var value;
  return _regenerator2.default.wrap(function toUInt32$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return toInt32(obj);

        case 2:
          value = _context13.sent;
          return _context13.abrupt("return", value >>> 0);

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked[12], this);
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
  return env.objectFactory.createBuiltInFunction(_regenerator2.default.mark(function _callee() {
    var thisArg,
        args,
        value,
        _args14 = arguments;
    return _regenerator2.default.wrap(function _callee$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            thisArg = undefined;


            if (this && this.object && (this.object.isPrimitive || this.object.className === "Date")) {
              thisArg = this.object.value;
            }

            _context14.next = 4;
            return getValues(_args14);

          case 4:
            args = _context14.sent;
            value = fn.apply(thisArg, args);
            return _context14.abrupt("return", env.objectFactory.createPrimitive(value));

          case 7:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee, this);
  }), fn.length, name);
}

function isInteger(value) {
  if (typeof value === "string") {
    return integerPattern.test(value);
  }

  if (typeof value === "number") {
    return isFinite(value) && Math.floor(value) === value;
  }

  return false;
}

function isValidArrayLength(length) {
  return isInteger(length) && length >= 0 && length < 4294967296;
}

function isOctalLiteral(rawValue, actualValue) {
  if (typeof actualValue === "number" && octalPattern.test(rawValue)) {
    return true;
  }

  if (typeof actualValue === "string") {
    var match = rawValue.match(octalEscapePattern);
    if (match) {
      // \0 is actually not considered an octal
      if (match[2] !== "0" || typeof match[3] !== "undefined") {
        return true;
      }
    }
  }

  return false;
}

},{"../utils/helpers":378,"./checks":376,"babel-runtime/core-js/math/sign":18,"babel-runtime/core-js/symbol/for":34,"babel-runtime/regenerator":37}],380:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _ops;

var _native = require("./native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function neg(value) {
  if (value === undefined) {
    return false;
  }

  return !value;
}

function pos(value) {
  return !!value;
}

var ops = (_ops = {
  // algorithms

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
  areSameOrZero: function areSameOrZero(a, b) {
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
      }

      return a.value === b.value;
    }

    return a === b;
  },
  coerciveEquals: _regenerator2.default.mark(function coerciveEquals(a, b) {
    var primitiveA, primitiveB;
    return _regenerator2.default.wrap(function coerciveEquals$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(a.isPrimitive && b.isPrimitive)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", a.value == b.value);

          case 2:
            if (!(a.type === b.type)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", this.strictEquals(a, b));

          case 4:
            _context.next = 6;
            return (0, _native.toPrimitive)(a);

          case 6:
            primitiveA = _context.sent;
            _context.next = 9;
            return (0, _native.toPrimitive)(b);

          case 9:
            primitiveB = _context.sent;

            if (!(typeof primitiveA === "number" || typeof primitiveB === "number" || typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", Number(primitiveA) === Number(primitiveB));

          case 12:
            if (!(typeof primitiveA === "string")) {
              _context.next = 18;
              break;
            }

            _context.t0 = primitiveA;
            _context.next = 16;
            return (0, _native.toPrimitive)(b, "string");

          case 16:
            _context.t1 = _context.sent;
            return _context.abrupt("return", _context.t0 === _context.t1);

          case 18:
            if (!(typeof primitiveB === "string")) {
              _context.next = 24;
              break;
            }

            _context.next = 21;
            return (0, _native.toPrimitive)(a, "string");

          case 21:
            _context.t2 = _context.sent;
            _context.t3 = primitiveB;
            return _context.abrupt("return", _context.t2 === _context.t3);

          case 24:
            return _context.abrupt("return", primitiveA == primitiveB);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, coerciveEquals, this);
  }),

  /* eslint-enable eqeqeq */
  strictEquals: function strictEquals(a, b) {
    if (a.isPrimitive && b.isPrimitive) {
      return a.value === b.value;
    }

    if (a.isPrimitive || b.isPrimitive) {
      return false;
    }

    return a === b;
  },
  relationalCompare: _regenerator2.default.mark(function relationalCompare(a, b, leftFirst) {
    var primitiveA, primitiveB;
    return _regenerator2.default.wrap(function relationalCompare$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            primitiveA = undefined, primitiveB = undefined;

            if (!leftFirst) {
              _context2.next = 10;
              break;
            }

            _context2.next = 4;
            return (0, _native.toPrimitive)(a, "number");

          case 4:
            primitiveA = _context2.sent;
            _context2.next = 7;
            return (0, _native.toPrimitive)(b, "number");

          case 7:
            primitiveB = _context2.sent;
            _context2.next = 16;
            break;

          case 10:
            _context2.next = 12;
            return (0, _native.toPrimitive)(b, "number");

          case 12:
            primitiveB = _context2.sent;
            _context2.next = 15;
            return (0, _native.toPrimitive)(a, "number");

          case 15:
            primitiveA = _context2.sent;

          case 16:
            if (!(typeof primitiveA === "string" && typeof primitiveB === "string")) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", primitiveA < primitiveB);

          case 18:

            primitiveA = Number(primitiveA);
            primitiveB = Number(primitiveB);

            if (!(isNaN(primitiveA) || isNaN(primitiveB))) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", undefined);

          case 22:
            return _context2.abrupt("return", primitiveA < primitiveB);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, relationalCompare, this);
  })
}, _ops["=="] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return this.coerciveEquals(a, b);

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _, this);
}), _ops["!="] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return this.coerciveEquals(a, b);

        case 2:
          return _context4.abrupt("return", !_context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  }, _, this);
}), _ops["==="] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return this.strictEquals(a, b);

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  }, _, this);
}), _ops["!=="] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return this.strictEquals(a, b);

        case 2:
          return _context6.abrupt("return", !_context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  }, _, this);
}), _ops["+"] = _regenerator2.default.mark(function _(a, b) {
  var aa, bb, convertType;
  return _regenerator2.default.wrap(function _$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(a.isPrimitive && b.isPrimitive)) {
            _context7.next = 2;
            break;
          }

          return _context7.abrupt("return", a.value + b.value);

        case 2:
          _context7.next = 4;
          return (0, _native.toPrimitive)(a);

        case 4:
          aa = _context7.sent;
          _context7.next = 7;
          return (0, _native.toPrimitive)(b);

        case 7:
          bb = _context7.sent;

          if (!(a.isSymbol || b.isSymbol)) {
            _context7.next = 11;
            break;
          }

          convertType = typeof aa === "string" || typeof bb === "string" ? "string" : "number";
          throw TypeError("Cannot convert Symbol to a " + convertType);

        case 11:
          return _context7.abrupt("return", aa + bb);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, _, this);
}), _ops["-"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _native.toNumber)(a);

        case 2:
          _context8.t0 = _context8.sent;
          _context8.next = 5;
          return (0, _native.toNumber)(b);

        case 5:
          _context8.t1 = _context8.sent;
          return _context8.abrupt("return", _context8.t0 - _context8.t1);

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  }, _, this);
}), _ops["/"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _native.toNumber)(a);

        case 2:
          _context9.t0 = _context9.sent;
          _context9.next = 5;
          return (0, _native.toNumber)(b);

        case 5:
          _context9.t1 = _context9.sent;
          return _context9.abrupt("return", _context9.t0 / _context9.t1);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  }, _, this);
}), _ops["*"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _native.toNumber)(a);

        case 2:
          _context10.t0 = _context10.sent;
          _context10.next = 5;
          return (0, _native.toNumber)(b);

        case 5:
          _context10.t1 = _context10.sent;
          return _context10.abrupt("return", _context10.t0 * _context10.t1);

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  }, _, this);
}), _ops["%"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _native.toPrimitive)(a);

        case 2:
          _context11.t0 = _context11.sent;
          _context11.next = 5;
          return (0, _native.toPrimitive)(b);

        case 5:
          _context11.t1 = _context11.sent;
          return _context11.abrupt("return", _context11.t0 % _context11.t1);

        case 7:
        case "end":
          return _context11.stop();
      }
    }
  }, _, this);
}), _ops["<<"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _native.toPrimitive)(a);

        case 2:
          _context12.t0 = _context12.sent;
          _context12.next = 5;
          return (0, _native.toPrimitive)(b);

        case 5:
          _context12.t1 = _context12.sent;
          return _context12.abrupt("return", _context12.t0 << _context12.t1);

        case 7:
        case "end":
          return _context12.stop();
      }
    }
  }, _, this);
}), _ops[">>"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _native.toPrimitive)(a);

        case 2:
          _context13.t0 = _context13.sent;
          _context13.next = 5;
          return (0, _native.toPrimitive)(b);

        case 5:
          _context13.t1 = _context13.sent;
          return _context13.abrupt("return", _context13.t0 >> _context13.t1);

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  }, _, this);
}), _ops[">>>"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _native.toPrimitive)(a);

        case 2:
          _context14.t0 = _context14.sent;
          _context14.next = 5;
          return (0, _native.toPrimitive)(b);

        case 5:
          _context14.t1 = _context14.sent;
          return _context14.abrupt("return", _context14.t0 >>> _context14.t1);

        case 7:
        case "end":
          return _context14.stop();
      }
    }
  }, _, this);
}), _ops["|"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _native.toInt32)(a);

        case 2:
          _context15.t0 = _context15.sent;
          _context15.next = 5;
          return (0, _native.toInt32)(b);

        case 5:
          _context15.t1 = _context15.sent;
          return _context15.abrupt("return", _context15.t0 | _context15.t1);

        case 7:
        case "end":
          return _context15.stop();
      }
    }
  }, _, this);
}), _ops["^"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _native.toInt32)(a);

        case 2:
          _context16.t0 = _context16.sent;
          _context16.next = 5;
          return (0, _native.toInt32)(b);

        case 5:
          _context16.t1 = _context16.sent;
          return _context16.abrupt("return", _context16.t0 ^ _context16.t1);

        case 7:
        case "end":
          return _context16.stop();
      }
    }
  }, _, this);
}), _ops["&"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _native.toInt32)(a);

        case 2:
          _context17.t0 = _context17.sent;
          _context17.next = 5;
          return (0, _native.toInt32)(b);

        case 5:
          _context17.t1 = _context17.sent;
          return _context17.abrupt("return", _context17.t0 & _context17.t1);

        case 7:
        case "end":
          return _context17.stop();
      }
    }
  }, _, this);
}), _ops["<"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return this.relationalCompare(a, b, true);

        case 2:
          _context18.t0 = _context18.sent;
          return _context18.abrupt("return", pos(_context18.t0));

        case 4:
        case "end":
          return _context18.stop();
      }
    }
  }, _, this);
}), _ops["<="] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return this.relationalCompare(b, a, false);

        case 2:
          _context19.t0 = _context19.sent;
          return _context19.abrupt("return", neg(_context19.t0));

        case 4:
        case "end":
          return _context19.stop();
      }
    }
  }, _, this);
}), _ops[">"] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return this.relationalCompare(b, a, false);

        case 2:
          _context20.t0 = _context20.sent;
          return _context20.abrupt("return", pos(_context20.t0));

        case 4:
        case "end":
          return _context20.stop();
      }
    }
  }, _, this);
}), _ops[">="] = _regenerator2.default.mark(function _(a, b) {
  return _regenerator2.default.wrap(function _$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return this.relationalCompare(a, b, true);

        case 2:
          _context21.t0 = _context21.sent;
          return _context21.abrupt("return", neg(_context21.t0));

        case 4:
        case "end":
          return _context21.stop();
      }
    }
  }, _, this);
}), _ops["in"] = _regenerator2.default.mark(function _in(a, b) {
  var key, bString;
  return _regenerator2.default.wrap(function _in$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return (0, _native.toPropertyKey)(a);

        case 2:
          key = _context22.sent;

          if (!b.isPrimitive) {
            _context22.next = 8;
            break;
          }

          _context22.next = 6;
          return (0, _native.toString)(b);

        case 6:
          bString = _context22.sent;
          throw TypeError("Cannot use 'in' operator to search for '" + key + "' in " + bString);

        case 8:
          return _context22.abrupt("return", b.has(key));

        case 9:
        case "end":
          return _context22.stop();
      }
    }
  }, _in, this);
}), _ops["instanceof"] = function _instanceof(a, b) {
  if (b.type !== "function") {
    throw TypeError("Expecting a function in instanceof check, but got " + b.type);
  }

  if (a.isPrimitive) {
    return false;
  }

  return b.hasInstance(a);
}, _ops);

exports.default = ops;

},{"./native":379,"babel-runtime/regenerator":37}],381:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = ArrayExpression;

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ArrayExpression].map(_regenerator2.default.mark);

function ArrayExpression(node, context, next) {
  var objectFactory, arr, spreadOffset, i, ln, element, value, it, _iterator, _isArray, _i;

  return _regenerator2.default.wrap(function ArrayExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          objectFactory = context.env.objectFactory;
          arr = objectFactory.createArray();

          if (!node.elements) {
            _context.next = 35;
            break;
          }

          spreadOffset = 0;
          i = 0, ln = node.elements.length;

        case 5:
          if (!(i < ln)) {
            _context.next = 34;
            break;
          }

          element = node.elements[i];

          if (!element) {
            _context.next = 31;
            break;
          }

          _context.next = 10;
          return next(element, context);

        case 10:
          value = _context.sent.result.getValue();

          if (!element.isSpreadElement()) {
            _context.next = 30;
            break;
          }

          it = _iterators2.default.getIterator(value);
          _iterator = it, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 14:
          if (!_isArray) {
            _context.next = 20;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("break", 28);

        case 17:
          value = _iterator[_i++].value;
          _context.next = 24;
          break;

        case 20:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("break", 28);

        case 23:
          value = _i.value.value;

        case 24:
          arr.setIndex(i + spreadOffset, value);
          spreadOffset++;

        case 26:
          _context.next = 14;
          break;

        case 28:
          _context.next = 31;
          break;

        case 30:
          arr.setIndex(i + spreadOffset, value);

        case 31:
          i++;
          _context.next = 5;
          break;

        case 34:

          arr.setValue("length", objectFactory.createPrimitive(node.elements.length + spreadOffset));

        case 35:
          return _context.abrupt("return", context.result(arr));

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../iterators/":352,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],382:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = AssignmentExpression;

var _assign = require("../utils/assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [AssignmentExpression].map(_regenerator2.default.mark);

function AssignmentExpression(node, context, next) {
  var rightValue, right, left, op, nativeValue;
  return _regenerator2.default.wrap(function AssignmentExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rightValue = undefined;

          if (!(node.operator === "=")) {
            _context.next = 10;
            break;
          }

          _context.next = 4;
          return next(node.right, context);

        case 4:
          right = _context.sent.result;

          rightValue = right.getValue();

          _context.next = 8;
          return (0, _assign.assign)(context.env, node.left, rightValue);

        case 8:
          _context.next = 23;
          break;

        case 10:
          _context.next = 12;
          return next(node.left, context);

        case 12:
          left = _context.sent.result;
          _context.next = 15;
          return next(node.right, context);

        case 15:
          right = _context.sent.result;

          rightValue = right.getValue();

          // remove equals
          op = node.operator.slice(0, -1);
          _context.next = 20;
          return context.env.ops[op](left.getValue(), rightValue);

        case 20:
          nativeValue = _context.sent;

          rightValue = context.env.objectFactory.createPrimitive(nativeValue);
          left.setValue(rightValue, context.env.isStrict());

        case 23:
          return _context.abrupt("return", context.result(rightValue));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/assign":374,"babel-runtime/regenerator":37}],383:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = BinaryExpression;

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [BinaryExpression].map(_regenerator2.default.mark);

function BinaryExpression(node, context, next) {
  var left, leftValue, right, rightValue, op, newValue;
  return _regenerator2.default.wrap(function BinaryExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.left, context);

        case 2:
          left = _context.sent.result;
          leftValue = left.getValue() || _primitiveType.UNDEFINED;
          _context.next = 6;
          return next(node.right, context);

        case 6:
          right = _context.sent.result;
          rightValue = right.getValue() || _primitiveType.UNDEFINED;
          op = node.operator;
          _context.next = 11;
          return context.env.ops[op](leftValue, rightValue);

        case 11:
          newValue = _context.sent;
          return _context.abrupt("return", context.result(context.env.objectFactory.createPrimitive(newValue)));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../types/primitive-type":368,"babel-runtime/regenerator":37}],384:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = BlockStatement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [BlockStatement].map(_regenerator2.default.mark);

function BlockStatement(node, context, next) {
  var blockContext, scope;
  return _regenerator2.default.wrap(function BlockStatement$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          blockContext = context.create();
          scope = blockContext.env.createBlockScope(node);
          _context2.next = 4;
          return scope.use(_regenerator2.default.mark(function _callee() {
            var result, priorResult, i, ln;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    result = undefined, priorResult = undefined;
                    i = 0, ln = node.body.length;

                  case 2:
                    if (!(i < ln)) {
                      _context.next = 13;
                      break;
                    }

                    _context.next = 5;
                    return next(node.body[i], blockContext);

                  case 5:
                    result = _context.sent;

                    if (!blockContext.shouldBreak(result)) {
                      _context.next = 9;
                      break;
                    }

                    result = blockContext.abrupt(result, priorResult);
                    return _context.abrupt("break", 13);

                  case 9:

                    priorResult = result;

                  case 10:
                    i++;
                    _context.next = 2;
                    break;

                  case 13:
                    return _context.abrupt("return", result);

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

},{"babel-runtime/regenerator":37}],385:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = CallExpression;

var _propertyReference = require("../env/property-reference");

var _native = require("../utils/native");

var _primitiveType = require("../types/primitive-type");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [CallExpression].map(_regenerator2.default.mark);

function assignThis(env, fnMember, isNew, callee) {
  if (callee.isSuper() || callee.object && callee.object.isSuper()) {
    return env.getThisBinding();
  }

  if (isNew) {
    return null;
  }

  if (fnMember instanceof _propertyReference.PropertyReference && (!fnMember.unqualified || fnMember.base !== env.global)) {
    var thisArg = fnMember.base;
    if (env.ecmaVersion === 5) {
      return (0, _native.toObject)(thisArg);
    }

    return thisArg;
  }

  return null;
}

function CallExpression(node, context, next) {
  var isNew, fnMember, fn, args, i, ln, arg, value, it, _iterator, _isArray, _i, stringValue, thisArg, callee, result;

  return _regenerator2.default.wrap(function CallExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          isNew = node.isNewExpression() || node.callee.isSuper();
          _context.next = 3;
          return next(node.callee, context);

        case 3:
          fnMember = _context.sent.result;
          fn = fnMember.getValue();
          args = [];
          i = 0, ln = node.arguments.length;

        case 7:
          if (!(i < ln)) {
            _context.next = 34;
            break;
          }

          arg = node.arguments[i];
          _context.next = 11;
          return next(arg, context);

        case 11:
          value = _context.sent.result.getValue();

          if (!arg.isSpreadElement()) {
            _context.next = 30;
            break;
          }

          it = _iterators2.default.getIterator(value);
          _iterator = it, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 15:
          if (!_isArray) {
            _context.next = 21;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("break", 28);

        case 18:
          value = _iterator[_i++].value;
          _context.next = 25;
          break;

        case 21:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("break", 28);

        case 24:
          value = _i.value.value;

        case 25:
          args.push(value);

        case 26:
          _context.next = 15;
          break;

        case 28:
          _context.next = 31;
          break;

        case 30:
          args.push(value);

        case 31:
          i++;
          _context.next = 7;
          break;

        case 34:
          if (!(!fn || fn.className !== "Function")) {
            _context.next = 39;
            break;
          }

          _context.next = 37;
          return (0, _native.toString)(fn);

        case 37:
          stringValue = _context.sent;
          throw TypeError(stringValue + " not a function");

        case 39:
          thisArg = assignThis(context.env, fnMember, isNew, node.callee);
          callee = fnMember;


          callee.identifier = fn.name;
          _context.next = 44;
          return fn[isNew ? "construct" : "call"](thisArg, args, callee);

        case 44:
          result = _context.sent;
          return _context.abrupt("return", context.result(result || _primitiveType.UNDEFINED));

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../env/property-reference":179,"../iterators/":352,"../types/primitive-type":368,"../utils/native":379,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],386:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = DebuggerStatement;
function DebuggerStatement(node, context) {
  if (context.env.options.allowDebugger) {
    /* eslint-disable no-debugger */
    debugger;
    /* eslint-enable no-debugger */
  }

  return context.empty();
}

},{}],387:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = DoWhileStatement;

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [DoWhileStatement].map(_regenerator2.default.mark);

function DoWhileStatement(node, context, next) {
  var loopContext, result, priorResult, passed;
  return _regenerator2.default.wrap(function DoWhileStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          loopContext = context.createLoop();
          result = undefined, priorResult = undefined;
          passed = true;

          if (!node.isWhileStatement()) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return next(node.test, loopContext);

        case 6:
          _context.t0 = _context.sent.result.getValue();
          passed = (0, _native.toBoolean)(_context.t0);

        case 8:
          if (!passed) {
            _context.next = 21;
            break;
          }

          _context.next = 11;
          return next(node.body, loopContext);

        case 11:
          result = _context.sent;

          if (!loopContext.shouldBreak(result)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", loopContext.abrupt(result, priorResult));

        case 14:
          _context.next = 16;
          return next(node.test, loopContext);

        case 16:
          _context.t1 = _context.sent.result.getValue();
          passed = (0, _native.toBoolean)(_context.t1);

          priorResult = result;
          _context.next = 8;
          break;

        case 21:
          return _context.abrupt("return", result || loopContext.empty());

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/native":379,"babel-runtime/regenerator":37}],388:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = EmptyStatement;
function EmptyStatement(node, context) {
  return context.empty();
}

},{}],389:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ExportDeclaration;

var _propertyReference = require("../env/property-reference");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getSource, ExportDeclaration].map(_regenerator2.default.mark);

function exportSpecified(target, key, env, source) {
  var alias = arguments.length <= 4 || arguments[4] === undefined ? key : arguments[4];

  var ref = undefined;
  if (source) {
    // todo: add 'getReference' function to objects to make this simpler
    ref = new _propertyReference.PropertyReference(key, source, env);
  } else {
    ref = env.getReference(key);
  }

  target.define(alias, ref);
}

function getSource(env, name) {
  var ast, priorExport, source, scope;
  return _regenerator2.default.wrap(function getSource$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ast = env.imports[name];
          priorExport = env.exports;
          source = env.exports = env.objectFactory.createObject();
          scope = env.createScope(env.global);
          _context2.next = 6;
          return scope.use(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return env.createExecutionContext(env.global).execute(ast);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 6:

          env.exports = priorExport;
          return _context2.abrupt("return", source);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

function ExportDeclaration(node, context, next) {
  var _this = this;

  var target, decl;
  return _regenerator2.default.wrap(function ExportDeclaration$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          target = context.env.exports;

          if (!node.declaration) {
            _context4.next = 8;
            break;
          }

          _context4.next = 4;
          return next(node.declaration, context);

        case 4:
          decl = _context4.sent;


          if (node.isExportDefaultDeclaration()) {
            target.define("default", decl.result);
          } else if (node.declaration.isFunctionDeclaration()) {
            exportSpecified(target, node.declaration.id.name, context.env);
          } else {
            node.declaration.declarations.forEach(function (n) {
              exportSpecified(target, n.id.name, context.env);
            });
          }
          _context4.next = 9;
          break;

        case 8:
          return _context4.delegateYield(_regenerator2.default.mark(function _callee2() {
            var source;
            return _regenerator2.default.wrap(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    source = null;

                    if (!node.source) {
                      _context3.next = 5;
                      break;
                    }

                    _context3.next = 4;
                    return getSource(context.env, node.source.value);

                  case 4:
                    source = _context3.sent;

                  case 5:

                    if (node.isExportAllDeclaration()) {
                      // if using a wildcard export, just copy all the properties to the current export object
                      source.getOwnPropertyKeys().forEach(function (key) {
                        return exportSpecified(target, key, context.env, source);
                      });
                    } else {
                      node.specifiers.forEach(function (spec) {
                        return exportSpecified(target, spec.local.name, context.env, source, spec.exported.name);
                      });
                    }

                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee2, _this);
          })(), "t0", 9);

        case 9:
          return _context4.abrupt("return", context.empty());

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[1], this);
}

},{"../env/property-reference":179,"babel-runtime/regenerator":37}],390:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ExpressionStatement;

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ExpressionStatement].map(_regenerator2.default.mark);

function ExpressionStatement(node, context, next) {
  var executionResult, executionValue;
  return _regenerator2.default.wrap(function ExpressionStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.expression, context);

        case 2:
          executionResult = _context.sent;
          executionValue = executionResult && executionResult.result && executionResult.result.getValue();
          return _context.abrupt("return", context.result(executionValue || _primitiveType.UNDEFINED));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../types/primitive-type":368,"babel-runtime/regenerator":37}],391:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ForInStatement;

var _native = require("../utils/native");

var _checks = require("../utils/checks");

var _assign = require("../utils/assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ForInStatement].map(_regenerator2.default.mark);

function ForInStatement(node, context, next) {
  var obj, loopContext, it, advance, done, result, priorResult, scope, itResult;
  return _regenerator2.default.wrap(function ForInStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.right, context);

        case 2:
          obj = _context.sent.result.getValue();

          if (!(0, _checks.isNullOrUndefined)(obj)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", context.empty());

        case 5:
          loopContext = context.createLoop();
          it = obj.getIterator(context.env);
          advance = it.getValue("next");
          done = false;
          result = undefined, priorResult = undefined;

        case 10:
          if (done) {
            _context.next = 29;
            break;
          }

          scope = loopContext.env.createBlockScope(node);
          _context.next = 14;
          return advance.call(it);

        case 14:
          itResult = _context.sent;

          done = (0, _native.toBoolean)(itResult.getValue("done"));

          if (!(!done && itResult.has("value"))) {
            _context.next = 25;
            break;
          }

          _context.next = 19;
          return (0, _assign.declare)(loopContext.env, node.left, itResult.getValue("value"));

        case 19:
          _context.next = 21;
          return next(node.body, loopContext);

        case 21:
          result = _context.sent;

          if (!loopContext.shouldBreak(result)) {
            _context.next = 25;
            break;
          }

          scope.exit();
          return _context.abrupt("return", loopContext.abrupt(result, priorResult));

        case 25:

          scope.exit();
          priorResult = result;
          _context.next = 10;
          break;

        case 29:
          return _context.abrupt("return", result || loopContext.empty());

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/assign":374,"../utils/checks":376,"../utils/native":379,"babel-runtime/regenerator":37}],392:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ForOfStatement;

var _checks = require("../utils/checks");

var _assign = require("../utils/assign");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ForOfStatement].map(_regenerator2.default.mark);

function ForOfStatement(node, context, next) {
  var obj, loopContext, it, done, result, priorResult, scope, current, _it$next;

  return _regenerator2.default.wrap(function ForOfStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.right, context);

        case 2:
          obj = _context.sent.result.getValue();

          if (!(0, _checks.isNullOrUndefined)(obj)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", context.empty());

        case 5:
          loopContext = context.createLoop();
          it = _iterators2.default.getIterator(obj); // obj.getIterator(context.env);
          // let advance = it.getValue("next");

          done = false;
          result = undefined, priorResult = undefined;

        case 9:
          if (done) {
            _context.next = 27;
            break;
          }

          scope = loopContext.env.createBlockScope(node);
          current = undefined;
          _it$next = it.next();
          done = _it$next.done;
          current = _it$next.value;

          if (done) {
            _context.next = 22;
            break;
          }

          _context.next = 18;
          return (0, _assign.declare)(loopContext.env, node.left, current.value);

        case 18:
          _context.next = 20;
          return next(node.body, loopContext);

        case 20:
          result = _context.sent;

          if (loopContext.shouldBreak(result)) {
            done = true;
            result = loopContext.abrupt(result, priorResult);
          }

        case 22:

          if (done) {
            it.return();
          }

          scope.exit();
          priorResult = result;
          _context.next = 9;
          break;

        case 27:
          return _context.abrupt("return", result || loopContext.empty());

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../iterators/":352,"../utils/assign":374,"../utils/checks":376,"babel-runtime/regenerator":37}],393:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ForStatement;

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [shouldContinue, ForStatement].map(_regenerator2.default.mark);

function shouldContinue(node, context, next) {
  return _regenerator2.default.wrap(function shouldContinue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (node) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", true);

        case 2:
          _context.next = 4;
          return next(node, context);

        case 4:
          _context.t0 = _context.sent.result.getValue();
          return _context.abrupt("return", (0, _native.toBoolean)(_context.t0));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function ForStatement(node, context, next) {
  var loopContext, scope, result, priorResult;
  return _regenerator2.default.wrap(function ForStatement$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loopContext = context.createLoop();
          scope = loopContext.env.createBlockScope(node);

          if (!node.init) {
            _context2.next = 5;
            break;
          }

          _context2.next = 5;
          return next(node.init, loopContext);

        case 5:
          result = undefined, priorResult = undefined;

        case 6:
          _context2.next = 8;
          return shouldContinue(node.test, loopContext, next);

        case 8:
          if (!_context2.sent) {
            _context2.next = 23;
            break;
          }

          _context2.next = 11;
          return next(node.body, loopContext);

        case 11:
          result = _context2.sent;

          if (!loopContext.shouldBreak(result)) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", loopContext.abrupt(result, priorResult));

        case 14:

          priorResult = result;
          _context2.next = 17;
          return scope.reset(node.init);

        case 17:
          scope = _context2.sent;

          if (!node.update) {
            _context2.next = 21;
            break;
          }

          _context2.next = 21;
          return next(node.update, loopContext);

        case 21:
          _context2.next = 6;
          break;

        case 23:

          scope.exit();
          return _context2.abrupt("return", result || loopContext.empty());

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

},{"../utils/native":379,"babel-runtime/regenerator":37}],394:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = FunctionDeclaration;
function FunctionDeclaration(node, context) {
  var func = context.env.getValue(node.id.name);
  if (func && func.className === "Function") {
    func.bindScope(context.env.current);
  }

  return context.result(func);
}

},{}],395:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.FunctionExpression = FunctionExpression;
exports.ClassDeclaration = ClassDeclaration;

var _native = require("../utils/native");

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getName, FunctionExpression, ClassDeclaration].map(_regenerator2.default.mark);

function getName(node, context, next) {
  var parent, key, computedKey;
  return _regenerator2.default.wrap(function getName$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!node.name) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", node.name);

        case 2:
          if (!node.id) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", node.id.name);

        case 4:
          if (!node.isLiteral()) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", node.value);

        case 6:
          parent = node.getParent();

          if (!parent.isVariableDeclarator()) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return getName(parent, context, next);

        case 10:
          return _context.abrupt("return", _context.sent);

        case 11:
          if (!parent.isProperty()) {
            _context.next = 29;
            break;
          }

          key = undefined;

          if (!parent.computed) {
            _context.next = 23;
            break;
          }

          _context.next = 16;
          return next(parent.key, context);

        case 16:
          computedKey = _context.sent;
          _context.next = 19;
          return (0, _native.toPropertyKey)(computedKey.result.getValue());

        case 19:
          key = _context.sent;


          if (typeof key !== "string" && key.isSymbol) {
            key = key.toSymbolString();
          }
          _context.next = 26;
          break;

        case 23:
          _context.next = 25;
          return getName(parent.key, context, next);

        case 25:
          key = _context.sent;

        case 26:
          if (!(parent.kind === "get" || parent.kind === "set")) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return", parent.kind + " " + key);

        case 28:
          return _context.abrupt("return", key);

        case 29:
          return _context.abrupt("return", "");

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function setAccessors(target, descriptor) {
  if (descriptor.get) {
    descriptor.getter = _regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return descriptor.get.call(this);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this);
    });
  }

  if (descriptor.set) {
    descriptor.setter = _regenerator2.default.mark(function _callee2(value) {
      return _regenerator2.default.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return descriptor.set.call(this, [value]);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    });
  }

  target.defineProperty(descriptor.key, descriptor);
}

function FunctionExpression(node, context, next) {
  var objectFactory, strict, name, proto, func;
  return _regenerator2.default.wrap(function FunctionExpression$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          objectFactory = context.env.objectFactory;
          strict = context.env.isStrict() || node.body.isStrict();
          _context4.next = 4;
          return getName(node, context, next);

        case 4:
          name = _context4.sent;
          proto = null;

          if (!node.isArrowFunctionExpression()) {
            proto = objectFactory.createObject();
          }

          func = objectFactory.createFunction(node, proto, { strict: strict, name: name });

          func.bindScope(context.env.current);

          if (node.isArrowFunctionExpression()) {
            func.bindThis(context.env.getThisBinding());
          }

          return _context4.abrupt("return", context.result(func));

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[1], this);
}

function findOrCreate(arr, key, isStatic) {
  var i = arr.length;
  while (i--) {
    var current = arr[i];
    if (current.key === key && current.isStatic === isStatic) {
      return current;
    }
  }

  var entry = { enumerable: false, configurable: true, key: key, isStatic: isStatic };
  arr.push(entry);
  return entry;
}

function ClassDeclaration(node, context, next) {
  var objectFactory, props, ctor, proto, parent, parentProto, _iterator, _isArray, _i, _ref, method, kind, _key, homeObject, _computedKey, _name, entry, fn, name, def;

  return _regenerator2.default.wrap(function ClassDeclaration$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          objectFactory = context.env.objectFactory;
          props = [];
          ctor = undefined, proto = undefined, parent = undefined, parentProto = undefined;

          if (!node.superClass) {
            _context6.next = 9;
            break;
          }

          _context6.next = 6;
          return next(node.superClass, context);

        case 6:
          parent = _context6.sent.result.getValue();

          parentProto = parent.getValue("prototype");

          proto = objectFactory.createObject(parent === _primitiveType.NULL ? null : parent);

        case 9:

          proto = proto || objectFactory.createObject();

          _iterator = node.body.body, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 11:
          if (!_isArray) {
            _context6.next = 17;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context6.next = 14;
            break;
          }

          return _context6.abrupt("break", 51);

        case 14:
          _ref = _iterator[_i++];
          _context6.next = 21;
          break;

        case 17:
          _i = _iterator.next();

          if (!_i.done) {
            _context6.next = 20;
            break;
          }

          return _context6.abrupt("break", 51);

        case 20:
          _ref = _i.value;

        case 21:
          method = _ref;
          kind = method.kind;
          _key = method.key.name;
          homeObject = method.static ? parent : parentProto;

          if (!(method.computed || method.key.isLiteral())) {
            _context6.next = 32;
            break;
          }

          _context6.next = 28;
          return next(method.key, context);

        case 28:
          _computedKey = _context6.sent;
          _context6.next = 31;
          return (0, _native.toPropertyKey)(_computedKey.result.getValue());

        case 31:
          _key = _context6.sent;

        case 32:
          _name = typeof _key !== "string" && _key.isSymbol ? _key.toSymbolString() : _key;
          entry = undefined;
          _context6.t0 = kind;
          _context6.next = _context6.t0 === "constructor" ? 37 : _context6.t0 === "get" ? 39 : _context6.t0 === "set" ? 39 : 42;
          break;

        case 37:
          ctor = method.value;
          return _context6.abrupt("break", 49);

        case 39:
          entry = findOrCreate(props, _key, method.static);
          entry[kind] = objectFactory.createFunction(method.value, null, { strict: true, name: kind + " " + _name, homeObject: homeObject });
          return _context6.abrupt("break", 49);

        case 42:
          if (!method.static) {
            _context6.next = 46;
            break;
          }

          entry = findOrCreate(props, _key, true);
          entry.value = objectFactory.createFunction(method.value, null, { strict: true, name: _name, homeObject: homeObject });
          return _context6.abrupt("break", 49);

        case 46:
          fn = objectFactory.createFunction(method.value, null, { strict: true, name: _name, homeObject: homeObject });

          proto.define(_key, fn);
          return _context6.abrupt("break", 49);

        case 49:
          _context6.next = 11;
          break;

        case 51:

          ctor = ctor || _regenerator2.default.mark(function _callee3() {
            var instance,
                _args5 = arguments;
            return _regenerator2.default.wrap(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    instance = objectFactory.createObject(null);

                    if (!parent) {
                      _context5.next = 4;
                      break;
                    }

                    _context5.next = 4;
                    return parent.construct(instance, _args5);

                  case 4:

                    instance.setPrototype(proto);
                    return _context5.abrupt("return", instance);

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee3, this);
          });

          _context6.next = 54;
          return getName(node, context, next);

        case 54:
          name = _context6.sent;
          def = objectFactory.createClass(ctor, proto, { name: name, homeObject: parent });


          props.forEach(function (entry) {
            var target = entry.isStatic ? def : proto;
            setAccessors(target, entry);
          });

          // statics.forEach(entry => def.define(entry.key, entry.func));

          // if (name) {
          //   context.env.createVariable(name).setValue(def);

          //   def.name = name;
          //   def.defineProperty("name", { value: objectFactory.createPrimitive(name), configurable: true }, true, context.env);
          // }

          if (!node.isClassDeclaration()) {
            _context6.next = 60;
            break;
          }

          context.env.getVariable(name).init(def);
          // context.env.createVariable(name, "class").setValue(def);
          return _context6.abrupt("return", context.empty());

        case 60:
          return _context6.abrupt("return", context.result(def));

        case 61:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked[2], this);
}

},{"../types/primitive-type":368,"../utils/native":379,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],396:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = Identifier;
function Identifier(node, context) {
  return context.result(context.env.getReference(node.name));
}

},{}],397:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = IfStatement;

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [IfStatement].map(_regenerator2.default.mark);

function IfStatement(node, context, next) {
  var testValue;
  return _regenerator2.default.wrap(function IfStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.test, context);

        case 2:
          testValue = _context.sent.result.getValue();

          if (!(0, _native.toBoolean)(testValue)) {
            _context.next = 7;
            break;
          }

          _context.next = 6;
          return next(node.consequent, context);

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
          if (!node.alternate) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return next(node.alternate, context);

        case 10:
          return _context.abrupt("return", _context.sent);

        case 11:
          return _context.abrupt("return", context.empty());

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/native":379,"babel-runtime/regenerator":37}],398:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ImportDeclaration;

var _assign = require("../utils/assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ImportDeclaration].map(_regenerator2.default.mark);

function ImportDeclaration(node, context, next) {
  var moduleName, ast, source, thisArg, scope, _iterator, _isArray, _i, _ref, specifier, imported, local, value, key;

  return _regenerator2.default.wrap(function ImportDeclaration$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          moduleName = node.source.value;

          if (moduleName in context.env.imports) {
            _context2.next = 3;
            break;
          }

          throw ReferenceError("Cannot find module '" + moduleName + "'");

        case 3:
          ast = context.env.imports[moduleName];
          source = context.env.exports = context.env.objectFactory.createObject();
          thisArg = context.env.global;
          scope = context.env.createScope(thisArg);
          _context2.next = 9;
          return scope.use(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return context.env.createExecutionContext(thisArg).execute(ast);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 9:
          _iterator = node.specifiers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 10:
          if (!_isArray) {
            _context2.next = 16;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("break", 29);

        case 13:
          _ref = _iterator[_i++];
          _context2.next = 20;
          break;

        case 16:
          _i = _iterator.next();

          if (!_i.done) {
            _context2.next = 19;
            break;
          }

          return _context2.abrupt("break", 29);

        case 19:
          _ref = _i.value;

        case 20:
          specifier = _ref;
          imported = specifier.imported;
          local = specifier.local;
          value = source;


          if (!specifier.isImportNamespaceSpecifier()) {
            // wildcard imports use entire export object
            key = imported ? imported.name : "default";

            value = source.getValue(key);
          }

          _context2.next = 27;
          return (0, _assign.declare)(context.env, local, value);

        case 27:
          _context2.next = 10;
          break;

        case 29:
          return _context2.abrupt("return", context.empty());

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/assign":374,"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],399:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.visitors = undefined;

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

var _doWhileStatement = require("./do-while-statement.js");

var _doWhileStatement2 = _interopRequireDefault(_doWhileStatement);

var _emptyStatement = require("./empty-statement");

var _emptyStatement2 = _interopRequireDefault(_emptyStatement);

var _exportDeclaration = require("./export-declaration");

var _exportDeclaration2 = _interopRequireDefault(_exportDeclaration);

var _expressionStatement = require("./expression-statement");

var _expressionStatement2 = _interopRequireDefault(_expressionStatement);

var _forStatement = require("./for-statement");

var _forStatement2 = _interopRequireDefault(_forStatement);

var _forInStatement = require("./for-in-statement");

var _forInStatement2 = _interopRequireDefault(_forInStatement);

var _forOfStatement = require("./for-of-statement");

var _forOfStatement2 = _interopRequireDefault(_forOfStatement);

var _functionDeclaration = require("./function-declaration");

var _functionDeclaration2 = _interopRequireDefault(_functionDeclaration);

var _functionExpression = require("./function-expression");

var _identifier = require("./identifier");

var _identifier2 = _interopRequireDefault(_identifier);

var _importDeclaration = require("./import-declaration");

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _labeledStatement = require("./labeled-statement");

var _labeledStatement2 = _interopRequireDefault(_labeledStatement);

var _literal = require("./literal");

var _literal2 = _interopRequireDefault(_literal);

var _logicalExpression = require("./logical-expression");

var _logicalExpression2 = _interopRequireDefault(_logicalExpression);

var _memberExpression = require("./member-expression");

var _memberExpression2 = _interopRequireDefault(_memberExpression);

var _metaProperty = require("./meta-property");

var _metaProperty2 = _interopRequireDefault(_metaProperty);

var _objectExpression = require("./object-expression");

var _objectExpression2 = _interopRequireDefault(_objectExpression);

var _returnStatement = require("./return-statement");

var _returnStatement2 = _interopRequireDefault(_returnStatement);

var _sequenceExpression = require("./sequence-expression");

var _sequenceExpression2 = _interopRequireDefault(_sequenceExpression);

var _spreadElement = require("./spread-element");

var _spreadElement2 = _interopRequireDefault(_spreadElement);

var _super = require("./super");

var _super2 = _interopRequireDefault(_super);

var _switchStatement = require("./switch-statement");

var _switchStatement2 = _interopRequireDefault(_switchStatement);

var _taggedTemplateExpression = require("./tagged-template-expression");

var _taggedTemplateExpression2 = _interopRequireDefault(_taggedTemplateExpression);

var _templateLiteral = require("./template-literal");

var _templateLiteral2 = _interopRequireDefault(_templateLiteral);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visitors = exports.visitors = {
  ArrayExpression: _arrayExpression2.default,
  AssignmentExpression: _assignmentExpression2.default,
  BinaryExpression: _binaryExpression2.default,
  BlockStatement: _blockStatement2.default,
  BreakStatement: _interruptStatement2.default,
  CallExpression: _callExpression2.default,
  ClassDeclaration: _functionExpression.ClassDeclaration,
  ConditionalExpression: _ifStatement2.default,
  DebuggerStatement: _debuggerStatement2.default,
  DoWhileStatement: _doWhileStatement2.default,
  EmptyStatement: _emptyStatement2.default,
  ExpressionStatement: _expressionStatement2.default,
  ForStatement: _forStatement2.default,
  ForInStatement: _forInStatement2.default,
  ForOfStatement: _forOfStatement2.default,
  FunctionDeclaration: _functionDeclaration2.default,
  FunctionExpression: _functionExpression.FunctionExpression,
  Identifier: _identifier2.default,
  ImportDeclaration: _importDeclaration2.default,
  LabeledStatement: _labeledStatement2.default,
  Literal: _literal2.default,
  LogicalExpression: _logicalExpression2.default,
  MemberExpression: _memberExpression2.default,
  MetaProperty: _metaProperty2.default,
  ObjectExpression: _objectExpression2.default,
  ReturnStatement: _returnStatement2.default,
  SequenceExpression: _sequenceExpression2.default,
  SpreadElement: _spreadElement2.default,
  Super: _super2.default,
  SwitchStatement: _switchStatement2.default,
  TaggedTemplateExpression: _taggedTemplateExpression2.default,
  TemplateLiteral: _templateLiteral2.default,
  ThisExpression: _thisExpression2.default,
  ThrowStatement: _throwStatement2.default,
  TryStatement: _tryStatement2.default,
  UnaryExpression: _unaryExpression2.default,
  UpdateExpression: _updateExpression2.default,
  VariableDeclaration: _variableDeclaration2.default,
  VariableDeclarator: _variableDeclarator2.default,
  WithStatement: _withStatement2.default,

  ArrowFunctionExpression: _functionExpression.FunctionExpression,
  ClassExpression: _functionExpression.ClassDeclaration,
  ContinueStatement: _interruptStatement2.default,
  ExportAllDeclaration: _exportDeclaration2.default,
  ExportNamedDeclaration: _exportDeclaration2.default,
  ExportDefaultDeclaration: _exportDeclaration2.default,
  IfStatement: _ifStatement2.default,
  NewExpression: _callExpression2.default,
  Program: _blockStatement2.default,
  WhileStatement: _doWhileStatement2.default
};

},{"./array-expression":381,"./assignment-expression":382,"./binary-expression":383,"./block-statement":384,"./call-expression":385,"./debugger-statement":386,"./do-while-statement.js":387,"./empty-statement":388,"./export-declaration":389,"./expression-statement":390,"./for-in-statement":391,"./for-of-statement":392,"./for-statement":393,"./function-declaration":394,"./function-expression":395,"./identifier":396,"./if-statement":397,"./import-declaration":398,"./interrupt-statement":400,"./labeled-statement":401,"./literal":402,"./logical-expression":403,"./member-expression":404,"./meta-property":405,"./object-expression":406,"./return-statement":407,"./sequence-expression":408,"./spread-element":409,"./super":410,"./switch-statement":411,"./tagged-template-expression":412,"./template-literal":413,"./this-expression":414,"./throw-statement":415,"./try-statement":416,"./unary-expression":417,"./update-expression":418,"./variable-declaration":419,"./variable-declarator":420,"./with-statement":421}],400:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = InterruptStatement;
function InterruptStatement(node, context) {
  var label = undefined;

  if (node.label) {
    label = node.label.name;
  }

  if (node.isBreakStatement()) {
    return context.cancel(label);
  }

  return context.skip(label);
}

},{}],401:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = LabeledStatement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [LabeledStatement].map(_regenerator2.default.mark);

function LabeledStatement(node, context, next) {
  var result;
  return _regenerator2.default.wrap(function LabeledStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.body, context.createLabel(node.label.name));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", result || context.empty());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
};

},{"babel-runtime/regenerator":37}],402:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = Literal;
function Literal(node, context) {
  return context.result(context.env.objectFactory.createPrimitive(node.value));
}

},{}],403:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = LogicalExpression;

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [LogicalExpression].map(_regenerator2.default.mark);

function LogicalExpression(node, context, next) {
  var left, passed;
  return _regenerator2.default.wrap(function LogicalExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.left, context);

        case 2:
          left = _context.sent;
          passed = (0, _native.toBoolean)(left.result.getValue());

          if (!(passed && node.operator === "||")) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", left);

        case 6:
          if (!(!passed && node.operator === "&&")) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", left);

        case 8:
          _context.next = 10;
          return next(node.right, context);

        case 10:
          return _context.abrupt("return", _context.sent);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/native":379,"babel-runtime/regenerator":37}],404:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = MemberExpression;

var _propertyReference = require("../env/property-reference");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [MemberExpression].map(_regenerator2.default.mark);

function MemberExpression(node, context, next) {
  var obj, key, value, id;
  return _regenerator2.default.wrap(function MemberExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.object, context);

        case 2:
          obj = _context.sent.result.getValue();
          key = undefined, value = undefined;

          if (!node.computed) {
            _context.next = 17;
            break;
          }

          _context.next = 7;
          return next(node.property, context);

        case 7:
          id = _context.sent.result.getValue();

          if (!id.isSymbol) {
            _context.next = 12;
            break;
          }

          // if the identifier is a symbol, keep as is - property reference will handle it accordingly
          key = id;
          _context.next = 15;
          break;

        case 12:
          _context.next = 14;
          return (0, _native.toString)(id);

        case 14:
          key = _context.sent;

        case 15:
          _context.next = 18;
          break;

        case 17:
          key = node.property.name;

        case 18:

          value = new _propertyReference.PropertyReference(key, obj, context.env);
          return _context.abrupt("return", context.result(value));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../env/property-reference":179,"../utils/native":379,"babel-runtime/regenerator":37}],405:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = MetaProperty;

var _primitiveType = require("../types/primitive-type");

function MetaProperty(node, context) {
  if (node.meta.name === "new" && node.property.name === "target") {
    return context.result(context.env.current.getMeta("newTarget") || _primitiveType.UNDEFINED);
  }

  throw SyntaxError("Unknown MetaProperty: " + node.meta.name + "." + node.property.name);
}

},{"../types/primitive-type":368}],406:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ObjectExpression;

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ObjectExpression].map(_regenerator2.default.mark);

function setDescriptor(env, obj, descriptor) {
  var strict = env.isStrict();

  if (descriptor.get) {
    (0, _contracts.assertAreValidArguments)(descriptor.get.node.params, strict);
    descriptor.getter = _regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return descriptor.get.call(this);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    });
  }

  if (descriptor.set) {
    (0, _contracts.assertAreValidSetterArguments)(descriptor.set.node.params, strict);
    descriptor.setter = _regenerator2.default.mark(function _callee2(value) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return descriptor.set.call(this, [value]);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    });
  }

  obj.defineProperty(descriptor.key, descriptor);
}

function findOrCreateDescriptor(arr, key) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === key) {
      return arr[i];
    }
  }

  var descriptor = { configurable: true, enumerable: true, key: key };
  arr.push(descriptor);
  return descriptor;
}

function ObjectExpression(node, context, next) {
  var obj, descriptors, i, ln, property, value, key, keyValue, descriptor;
  return _regenerator2.default.wrap(function ObjectExpression$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          obj = context.env.objectFactory.createObject();
          descriptors = [];
          i = 0, ln = node.properties.length;

        case 3:
          if (!(i < ln)) {
            _context3.next = 31;
            break;
          }

          property = node.properties[i];
          _context3.next = 7;
          return next(property.value, context);

        case 7:
          value = _context3.sent.result.getValue();
          key = undefined;

          if (!property.computed) {
            _context3.next = 18;
            break;
          }

          _context3.next = 12;
          return next(property.key, context);

        case 12:
          keyValue = _context3.sent.result.getValue();
          _context3.next = 15;
          return (0, _native.toPropertyKey)(keyValue);

        case 15:
          key = _context3.sent;
          _context3.next = 19;
          break;

        case 18:
          key = property.key.name || property.key.value;

        case 19:
          descriptor = findOrCreateDescriptor(descriptors, key);
          _context3.t0 = property.kind;
          _context3.next = _context3.t0 === "get" ? 23 : _context3.t0 === "set" ? 23 : 25;
          break;

        case 23:
          descriptor[property.kind] = value;
          return _context3.abrupt("break", 28);

        case 25:
          descriptor.value = value;
          descriptor.writable = true;
          return _context3.abrupt("break", 28);

        case 28:
          i++;
          _context3.next = 3;
          break;

        case 31:

          // yield* each(node.properties, function* (property) {
          //   let value = (yield next(property.value, context)).result.getValue();
          //   let key;

          //   if (property.computed) {
          //     let keyValue = (yield next(property.key, context)).result.getValue();
          //     key = yield toPropertyKey(keyValue);
          //   } else {
          //     key = property.key.name || property.key.value;
          //   }

          //   let descriptor = findOrCreateDescriptor(descriptors, key);
          //   switch (property.kind) {
          //     case "get":
          //     case "set":
          //       descriptor[property.kind] = value;
          //       break;

          //     default:
          //       descriptor.value = value;
          //       descriptor.writable = true;
          //       break;
          //   }
          // });

          descriptors.forEach(function (desc) {
            return setDescriptor(context.env, obj, desc);
          });

          return _context3.abrupt("return", context.result(obj));

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],407:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ReturnStatement;

var _primitiveType = require("../types/primitive-type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ReturnStatement].map(_regenerator2.default.mark);

function ReturnStatement(node, context, next) {
  var arg;
  return _regenerator2.default.wrap(function ReturnStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          arg = _primitiveType.UNDEFINED;

          if (!node.argument) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return next(node.argument, context);

        case 4:
          arg = _context.sent.result.getValue();

        case 5:
          return _context.abrupt("return", context.exit(arg));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../types/primitive-type":368,"babel-runtime/regenerator":37}],408:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = SequenceExpression;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [SequenceExpression].map(_regenerator2.default.mark);

function SequenceExpression(node, context, next) {
  var value, i, ln;
  return _regenerator2.default.wrap(function SequenceExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = undefined;
          i = 0, ln = node.expressions.length;

        case 2:
          if (!(i < ln)) {
            _context.next = 9;
            break;
          }

          _context.next = 5;
          return next(node.expressions[i], context);

        case 5:
          value = _context.sent.result.getValue();

        case 6:
          i++;
          _context.next = 2;
          break;

        case 9:
          return _context.abrupt("return", context.result(value));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"babel-runtime/regenerator":37}],409:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = SpreadElement;

var _symbolType = require("../types/symbol-type");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [SpreadElement].map(_regenerator2.default.mark);

function SpreadElement(node, context, next) {
  var args, iteratorKey, iterable;
  return _regenerator2.default.wrap(function SpreadElement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.argument, context);

        case 2:
          args = _context.sent;
          iteratorKey = _symbolType.SymbolType.getByKey("iterator");
          iterable = args.result.getValue();

          if (iterable.has(iteratorKey)) {
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return (0, _native.toString)(iterable);

        case 8:
          _context.t0 = _context.sent;
          _context.t1 = "Object " + _context.t0;
          _context.t2 = _context.t1 + " cannot be spread because it is not iterable";
          throw TypeError(_context.t2);

        case 12:
          return _context.abrupt("return", context.result(iterable));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../types/symbol-type":373,"../utils/native":379,"babel-runtime/regenerator":37}],410:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = Super;
function Super(node, context) {
  // let homeObject = context.callee.getValue().homeObject;
  var homeObject = context.env.current.getMeta("super");
  var newTarget = context.env.current.getMeta("newTarget");

  if (homeObject && newTarget && !node.getParent().isCallExpression()) {
    // accessing `super` in a constructor without calling as function refers to prototype
    // todo: confirm this
    homeObject = homeObject.getValue("prototype");
  }

  return context.result(homeObject || context.env.getThisBinding());
}

},{}],411:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = SwitchStatement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [executeStatements, SwitchStatement].map(_regenerator2.default.mark);

function executeStatements(context, statements, next) {
  var result, i, ln;
  return _regenerator2.default.wrap(function executeStatements$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = undefined;
          i = 0, ln = statements.length;

        case 2:
          if (!(i < ln)) {
            _context.next = 11;
            break;
          }

          _context.next = 5;
          return next(statements[i], context, next);

        case 5:
          result = _context.sent;

          if (!(result && result.isAbrupt())) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("break", 11);

        case 8:
          i++;
          _context.next = 2;
          break;

        case 11:
          return _context.abrupt("return", result);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function SwitchStatement(node, context, next) {
  var testValue, passed, value, defaultCase, _iterator, _isArray, _i, _ref, current, caseValue;

  return _regenerator2.default.wrap(function SwitchStatement$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return next(node.discriminant, context);

        case 2:
          testValue = _context2.sent.result.getValue();
          passed = false;
          value = undefined, defaultCase = undefined;
          _iterator = node.cases, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 6:
          if (!_isArray) {
            _context2.next = 12;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("break", 37);

        case 9:
          _ref = _iterator[_i++];
          _context2.next = 16;
          break;

        case 12:
          _i = _iterator.next();

          if (!_i.done) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("break", 37);

        case 15:
          _ref = _i.value;

        case 16:
          current = _ref;

          if (passed) {
            _context2.next = 28;
            break;
          }

          if (!current.test) {
            _context2.next = 26;
            break;
          }

          _context2.next = 21;
          return next(current.test, context);

        case 21:
          caseValue = _context2.sent.result.getValue();

          if (context.env.ops.strictEquals(caseValue, testValue)) {
            _context2.next = 24;
            break;
          }

          return _context2.abrupt("continue", 35);

        case 24:
          _context2.next = 28;
          break;

        case 26:
          // default might not be the last case
          defaultCase = current;
          return _context2.abrupt("continue", 35);

        case 28:

          passed = true;
          _context2.next = 31;
          return executeStatements(context, current.consequent, next);

        case 31:
          value = _context2.sent;

          if (!(value && value.isAbrupt())) {
            _context2.next = 35;
            break;
          }

          value.cancel = false;
          return _context2.abrupt("return", value);

        case 35:
          _context2.next = 6;
          break;

        case 37:
          if (!(!passed && defaultCase && defaultCase.consequent)) {
            _context2.next = 43;
            break;
          }

          _context2.next = 40;
          return executeStatements(context, defaultCase.consequent, next);

        case 40:
          value = _context2.sent;

          value.cancel = false;
          return _context2.abrupt("return", value);

        case 43:
          return _context2.abrupt("return", value);

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/regenerator":37}],412:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.default = TaggedTemplateExpression;

var _async = require("../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [TaggedTemplateExpression].map(_regenerator2.default.mark);

var templateObjectCache = (0, _create2.default)(null);

function buildTemplateObject(env, node) {
  // per spec, template objects are cached
  var key = (0, _stringify2.default)(node.quasis.map(function (q) {
    return { cooked: q.value.cooked, raw: q.value.raw };
  }));
  if (key in templateObjectCache) {
    return templateObjectCache[key];
  }

  var objectFactory = env.objectFactory;
  var tag = objectFactory.createArray();
  var raw = objectFactory.createArray();
  var quasis = node.quasis;

  for (var i = 0, ln = quasis.length; i < ln; i++) {
    tag.setValue(i, objectFactory.createPrimitive(quasis[i].value.cooked));
    raw.setValue(i, objectFactory.createPrimitive(quasis[i].value.raw));
  }

  raw.freeze();
  tag.defineProperty("raw", { value: raw });
  tag.freeze();

  return templateObjectCache[key] = tag;
}

function TaggedTemplateExpression(node, context, next) {
  var templateObject, values, callee, func, value;
  return _regenerator2.default.wrap(function TaggedTemplateExpression$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          templateObject = buildTemplateObject(context.env, node.quasi);
          _context2.next = 3;
          return (0, _async.map)(node.quasi.expressions, _regenerator2.default.mark(function _callee(expr) {
            var value;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    value = next(expr, context);
                    _context.next = 3;
                    return value.result.getValue();

                  case 3:
                    return _context.abrupt("return", _context.sent);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 3:
          values = _context2.sent;
          _context2.next = 6;
          return next(node.tag, context);

        case 6:
          callee = _context2.sent.result;
          func = callee.getValue();
          _context2.next = 10;
          return func.call(callee.base, [templateObject].concat(values), callee);

        case 10:
          value = _context2.sent;
          return _context2.abrupt("return", context.result(value));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/async":375,"babel-runtime/core-js/json/stringify":3,"babel-runtime/core-js/object/create":26,"babel-runtime/regenerator":37}],413:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = TemplateLiteral;

var _async = require("../utils/async");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [TemplateLiteral].map(_regenerator2.default.mark);

function TemplateLiteral(node, context, next) {
  var values, result, quasis, i, ln;
  return _regenerator2.default.wrap(function TemplateLiteral$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _async.map)(node.expressions, _regenerator2.default.mark(function _callee(expr) {
            var value;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return next(expr, context);

                  case 2:
                    value = _context.sent;
                    _context.next = 5;
                    return (0, _native.toString)(value.result.getValue());

                  case 5:
                    return _context.abrupt("return", _context.sent);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 2:
          values = _context2.sent;
          result = [];
          quasis = node.quasis;


          for (i = 0, ln = quasis.length; i < ln; i++) {
            result.push(quasis[i].value.cooked);

            if (i < values.length) {
              result.push(values[i]);
            }
          }

          return _context2.abrupt("return", context.result(context.env.objectFactory.createPrimitive(result.join(""))));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/async":375,"../utils/native":379,"babel-runtime/regenerator":37}],414:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = ThisExpression;

var _checks = require("../utils/checks");

function ThisExpression(node, context) {
  var thisArg = context.env.getThisBinding();
  if ((0, _checks.isNullOrUndefined)(thisArg) && !context.env.isStrict()) {
    thisArg = context.env.global;
  }

  return context.result(thisArg);
}

},{"../utils/checks":376}],415:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = ThrowStatement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ThrowStatement].map(_regenerator2.default.mark);

function ThrowStatement(node, context, next) {
  var arg;
  return _regenerator2.default.wrap(function ThrowStatement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return next(node.argument, context);

        case 2:
          arg = _context.sent.result.getValue();
          return _context.abrupt("return", context.raise(arg));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"babel-runtime/regenerator":37}],416:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = TryStatement;

var _assign = require("../utils/assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [tryCatch, executeBlock, TryStatement].map(_regenerator2.default.mark); // import {each} from "../utils/async";


function tryCatch(node, context, next) {
  return _regenerator2.default.wrap(function tryCatch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return next(node, context);

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", context.raise(_context.t0));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this, [[0, 6]]);
}

function executeBlock(context, body, swallow, next) {
  var result, i, ln, node;
  return _regenerator2.default.wrap(function executeBlock$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          result = undefined;
          i = 0, ln = body.length;

        case 2:
          if (!(i < ln)) {
            _context2.next = 17;
            break;
          }

          node = body[i];

          if (!swallow) {
            _context2.next = 9;
            break;
          }

          return _context2.delegateYield(tryCatch(node, context, next), "t0", 6);

        case 6:
          result = _context2.t0;
          _context2.next = 12;
          break;

        case 9:
          _context2.next = 11;
          return next(node, context);

        case 11:
          result = _context2.sent;

        case 12:
          if (!result.isAbrupt()) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("break", 17);

        case 14:
          i++;
          _context2.next = 2;
          break;

        case 17:
          return _context2.abrupt("return", result);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function TryStatement(node, context, next) {
  var result, finalizerResult, scope;
  return _regenerator2.default.wrap(function TryStatement$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return executeBlock(context, node.block.body, true, next);

        case 2:
          result = _context4.sent;
          finalizerResult = undefined;

          if (!(result && result.raised)) {
            _context4.next = 12;
            break;
          }

          if (!node.handler) {
            _context4.next = 12;
            break;
          }

          scope = context.env.createScope();
          _context4.next = 9;
          return (0, _assign.declare)(context.env, node.handler.param, result.result);

        case 9:
          _context4.next = 11;
          return scope.use(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return executeBlock(context, node.handler.body.body, true, next);

                  case 2:
                    return _context3.abrupt("return", _context3.sent);

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee, this);
          }));

        case 11:
          result = _context4.sent;

        case 12:
          if (!node.finalizer) {
            _context4.next = 18;
            break;
          }

          _context4.next = 15;
          return executeBlock(context, node.finalizer.body, false, next);

        case 15:
          finalizerResult = _context4.sent;

          if (!(finalizerResult && finalizerResult.isAbrupt())) {
            _context4.next = 18;
            break;
          }

          return _context4.abrupt("return", finalizerResult);

        case 18:
          return _context4.abrupt("return", result || context.empty());

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[2], this);
}

},{"../utils/assign":374,"babel-runtime/regenerator":37}],417:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = UnaryExpression;

var _reference = require("../env/reference");

var _propertyReference = require("../env/property-reference");

var _native = require("../utils/native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [UnaryExpression].map(_regenerator2.default.mark);

function UnaryExpression(node, context, next) {
  var objectFactory, result, value, newValue, type, deleted, resolved;
  return _regenerator2.default.wrap(function UnaryExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          objectFactory = context.env.objectFactory;
          _context.next = 3;
          return next(node.argument, context);

        case 3:
          result = _context.sent.result;
          value = undefined, newValue = undefined;
          _context.t0 = node.operator;
          _context.next = _context.t0 === "typeof" ? 8 : _context.t0 === "-" ? 12 : _context.t0 === "+" ? 19 : _context.t0 === "!" ? 26 : _context.t0 === "~" ? 29 : _context.t0 === "delete" ? 36 : _context.t0 === "void" ? 49 : 52;
          break;

        case 8:
          type = undefined;

          if (result instanceof _reference.Reference && result.isUnresolved()) {
            type = "undefined";
          } else {
            value = result.getValue();
            type = value ? value.type : "undefined";
          }

          newValue = objectFactory.createPrimitive(type);
          return _context.abrupt("break", 53);

        case 12:
          value = result.getValue();
          _context.t1 = objectFactory;
          _context.next = 16;
          return (0, _native.toNumber)(value);

        case 16:
          _context.t2 = -_context.sent;
          newValue = _context.t1.createPrimitive.call(_context.t1, _context.t2);
          return _context.abrupt("break", 53);

        case 19:
          value = result.getValue();
          _context.t3 = objectFactory;
          _context.next = 23;
          return (0, _native.toNumber)(value);

        case 23:
          _context.t4 = +_context.sent;
          newValue = _context.t3.createPrimitive.call(_context.t3, _context.t4);
          return _context.abrupt("break", 53);

        case 26:
          value = result.getValue();
          newValue = objectFactory.createPrimitive(!(0, _native.toBoolean)(value));
          return _context.abrupt("break", 53);

        case 29:
          value = result.getValue();
          _context.t5 = objectFactory;
          _context.next = 33;
          return (0, _native.toInt32)(value);

        case 33:
          _context.t6 = ~_context.sent;
          newValue = _context.t5.createPrimitive.call(_context.t5, _context.t6);
          return _context.abrupt("break", 53);

        case 36:
          deleted = true;

          if (!(result && result instanceof _reference.Reference)) {
            _context.next = 45;
            break;
          }

          resolved = !result.isUnresolved();

          if (!context.env.isStrict()) {
            _context.next = 42;
            break;
          }

          if (!(!resolved || !(result instanceof _propertyReference.PropertyReference) || result.unqualified)) {
            _context.next = 42;
            break;
          }

          throw SyntaxError("Delete of an unqualified identifier in strict mode.");

        case 42:

          if (resolved) {
            deleted = result.delete();
          }
          _context.next = 47;
          break;

        case 45:
          if (!node.argument.object) {
            _context.next = 47;
            break;
          }

          throw ReferenceError(node.argument.object.name + " is not defined");

        case 47:

          newValue = objectFactory.createPrimitive(deleted);
          return _context.abrupt("break", 53);

        case 49:
          result.getValue();

          newValue = objectFactory.createPrimitive(undefined);
          return _context.abrupt("break", 53);

        case 52:
          throw SyntaxError("Unknown unary operator: " + node.operator);

        case 53:
          return _context.abrupt("return", context.result(newValue));

        case 54:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../env/property-reference":179,"../env/reference":180,"../utils/native":379,"babel-runtime/regenerator":37}],418:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = UpdateExpression;

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [UpdateExpression].map(_regenerator2.default.mark);

function UpdateExpression(node, context, next) {
  var objectFactory, ref, originalValue, newValue, newWrappedValue, returnValue;
  return _regenerator2.default.wrap(function UpdateExpression$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          objectFactory = context.env.objectFactory;
          _context.next = 3;
          return next(node.argument, context);

        case 3:
          ref = _context.sent.result;

          (0, _contracts.assertIsValidAssignment)(ref, context.env.isStrict());

          _context.next = 7;
          return (0, _native.toNumber)(ref.getValue());

        case 7:
          originalValue = _context.sent;
          newValue = originalValue;


          if (node.operator === "++") {
            newValue++;
          } else {
            newValue--;
          }

          newWrappedValue = objectFactory.createPrimitive(newValue);

          originalValue = objectFactory.createPrimitive(originalValue);

          returnValue = node.prefix ? newWrappedValue : originalValue;


          ref.setValue(newWrappedValue);
          return _context.abrupt("return", context.result(returnValue));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/contracts":377,"../utils/native":379,"babel-runtime/regenerator":37}],419:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = VariableDeclaration;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [VariableDeclaration].map(_regenerator2.default.mark);

// import {each} from "../utils/async";

function VariableDeclaration(node, context, next) {
  var i, ln;
  return _regenerator2.default.wrap(function VariableDeclaration$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0, ln = node.declarations.length;

        case 1:
          if (!(i < ln)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return next(node.declarations[i], context);

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
          return _context.abrupt("return", context.empty());

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"babel-runtime/regenerator":37}],420:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = VariableDeclarator;

var _primitiveType = require("../types/primitive-type");

var _assign = require("../utils/assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [VariableDeclarator].map(_regenerator2.default.mark);

function VariableDeclarator(node, context, next) {
  var rightValue, propInfo;
  return _regenerator2.default.wrap(function VariableDeclarator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rightValue = undefined;

          if (!node.init) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return next(node.init, context);

        case 4:
          rightValue = _context.sent.result.getValue();

        case 5:
          if (!node.id.isIdentifier()) {
            _context.next = 10;
            break;
          }

          // variables have already been hoisted so we just need to initialize them if defined
          propInfo = context.env.getVariable(node.id.name);

          if (rightValue || !propInfo.initialized) {
            propInfo.init(rightValue || _primitiveType.UNDEFINED);
          }
          _context.next = 12;
          break;

        case 10:
          _context.next = 12;
          return (0, _assign.declare)(context.env, node.id, rightValue || _primitiveType.UNDEFINED);

        case 12:
          return _context.abrupt("return", context.result(rightValue));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

},{"../types/primitive-type":368,"../utils/assign":374,"babel-runtime/regenerator":37}],421:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = WithStatement;

var _checks = require("../utils/checks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [WithStatement].map(_regenerator2.default.mark);

function WithStatement(node, context, next) {
  var obj, scope;
  return _regenerator2.default.wrap(function WithStatement$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!context.env.isStrict()) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return", context.raise(SyntaxError("Strict mode code may not include a with statement")));

        case 2:
          _context2.next = 4;
          return next(node.object, context);

        case 4:
          obj = _context2.sent.result.getValue();

          if (!(0, _checks.isNullOrUndefined)(obj)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", context.raise(TypeError(obj.className + " has no properties")));

        case 7:
          scope = context.env.createObjectScope(obj, context.env.getThisBinding());

          scope.init(node.body);

          _context2.next = 11;
          return scope.use(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return next(node.body, context);

                  case 2:
                    return _context.abrupt("return", _context.sent);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 11:
          return _context2.abrupt("return", _context2.sent);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

},{"../utils/checks":376,"babel-runtime/regenerator":37}]},{},[1])(1)
});