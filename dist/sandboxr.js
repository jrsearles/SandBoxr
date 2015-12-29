/**
 * SandBoxr JavaScript library v1.0.0
 * (c) Joshua Searles - https://github.com/jrsearles/SandBoxr
 * License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SandBoxr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.version = undefined;
exports.createEnvironment = createEnvironment;
exports.create = create;

require("babel-polyfill");

var _env = require("./src/env");

var _src = require("./src");

var version = exports.version = "1.0.0";

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

},{"./src":365,"./src/env":194,"babel-polyfill":2}],2:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("babel-regenerator-runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-regenerator-runtime":3,"core-js/shim":190}],3:[function(require,module,exports){
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

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

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
    var generator = Object.create((outerFn || Generator).prototype);
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
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
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
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
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
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
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
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
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

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

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
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

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

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
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

  runtime.keys = function(object) {
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
        var i = -1, next = function next() {
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

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
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

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
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

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
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

    delegateYield: function(iterable, resultName, nextLoc) {
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
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":191}],4:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./$.hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./$.hide":33,"./$.wks":85}],6:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":40}],7:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , $$    = arguments
    , end   = $$.length > 2 ? $$[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./$.to-index":78,"./$.to-length":81,"./$.to-object":82}],8:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');
module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , $$     = arguments
    , $$len  = $$.length
    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
    , end    = $$len > 2 ? $$[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./$.to-index":78,"./$.to-length":81,"./$.to-object":82}],9:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length')
  , toIndex   = require('./$.to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$.to-index":78,"./$.to-iobject":80,"./$.to-length":81}],10:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./$.ctx')
  , IObject  = require('./$.iobject')
  , toObject = require('./$.to-object')
  , toLength = require('./$.to-length')
  , asc      = require('./$.array-species-create');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$.array-species-create":11,"./$.ctx":19,"./$.iobject":36,"./$.to-length":81,"./$.to-object":82}],11:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = require('./$.is-object')
  , isArray  = require('./$.is-array')
  , SPECIES  = require('./$.wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./$.is-array":38,"./$.is-object":40,"./$.wks":85}],12:[function(require,module,exports){
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
},{"./$.cof":13,"./$.wks":85}],13:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],14:[function(require,module,exports){
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
},{"./$":48,"./$.ctx":19,"./$.defined":20,"./$.descriptors":21,"./$.for-of":29,"./$.has":32,"./$.hide":33,"./$.is-object":40,"./$.iter-define":44,"./$.iter-step":46,"./$.redefine-all":62,"./$.set-species":67,"./$.strict-new":71,"./$.uid":84}],15:[function(require,module,exports){
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
},{"./$.classof":12,"./$.for-of":29}],16:[function(require,module,exports){
'use strict';
var hide              = require('./$.hide')
  , redefineAll       = require('./$.redefine-all')
  , anObject          = require('./$.an-object')
  , isObject          = require('./$.is-object')
  , strictNew         = require('./$.strict-new')
  , forOf             = require('./$.for-of')
  , createArrayMethod = require('./$.array-methods')
  , $has              = require('./$.has')
  , WEAK              = require('./$.uid')('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"./$.an-object":6,"./$.array-methods":10,"./$.for-of":29,"./$.has":32,"./$.hide":33,"./$.is-object":40,"./$.redefine-all":62,"./$.strict-new":71,"./$.uid":84}],17:[function(require,module,exports){
'use strict';
var global         = require('./$.global')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , fails          = require('./$.fails')
  , $iterDetect    = require('./$.iter-detect')
  , setToStringTag = require('./$.set-to-string-tag');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO;
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        strictNew(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || instance.forEach(function(val, key){
      BUGGY_ZERO = 1 / key === -Infinity;
    });
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$.export":24,"./$.fails":26,"./$.for-of":29,"./$.global":31,"./$.is-object":40,"./$.iter-detect":45,"./$.redefine":63,"./$.redefine-all":62,"./$.set-to-string-tag":68,"./$.strict-new":71}],18:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],19:[function(require,module,exports){
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
},{"./$.a-function":4}],20:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],21:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":26}],22:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":31,"./$.is-object":40}],23:[function(require,module,exports){
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
},{"./$":48}],24:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , hide      = require('./$.hide')
  , redefine  = require('./$.redefine')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)redefine(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":18,"./$.ctx":19,"./$.global":31,"./$.hide":33,"./$.redefine":63}],25:[function(require,module,exports){
var MATCH = require('./$.wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./$.wks":85}],26:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],27:[function(require,module,exports){
'use strict';
var hide     = require('./$.hide')
  , redefine = require('./$.redefine')
  , fails    = require('./$.fails')
  , defined  = require('./$.defined')
  , wks      = require('./$.wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , original = ''[KEY];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return original.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return original.call(string, this); }
    );
  }
};
},{"./$.defined":20,"./$.fails":26,"./$.hide":33,"./$.redefine":63,"./$.wks":85}],28:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./$.an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./$.an-object":6}],29:[function(require,module,exports){
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
},{"./$.an-object":6,"./$.ctx":19,"./$.is-array-iter":37,"./$.iter-call":42,"./$.to-length":81,"./core.get-iterator-method":86}],30:[function(require,module,exports){
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
},{"./$":48,"./$.to-iobject":80}],31:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],32:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],33:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":48,"./$.descriptors":21,"./$.property-desc":61}],34:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":31}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":13}],37:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":47,"./$.wks":85}],38:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":13}],39:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./$.is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./$.is-object":40}],40:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],41:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./$.is-object')
  , cof      = require('./$.cof')
  , MATCH    = require('./$.wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./$.cof":13,"./$.is-object":40,"./$.wks":85}],42:[function(require,module,exports){
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
},{"./$.an-object":6}],43:[function(require,module,exports){
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
},{"./$":48,"./$.hide":33,"./$.property-desc":61,"./$.set-to-string-tag":68,"./$.wks":85}],44:[function(require,module,exports){
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
},{"./$":48,"./$.export":24,"./$.has":32,"./$.hide":33,"./$.iter-create":43,"./$.iterators":47,"./$.library":50,"./$.redefine":63,"./$.set-to-string-tag":68,"./$.wks":85}],45:[function(require,module,exports){
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
},{"./$.wks":85}],46:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],47:[function(require,module,exports){
module.exports = {};
},{}],48:[function(require,module,exports){
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
},{}],49:[function(require,module,exports){
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
},{"./$":48,"./$.to-iobject":80}],50:[function(require,module,exports){
module.exports = false;
},{}],51:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],52:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],53:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],54:[function(require,module,exports){
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
},{"./$.cof":13,"./$.global":31,"./$.task":77}],55:[function(require,module,exports){
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
},{"./$":48,"./$.fails":26,"./$.iobject":36,"./$.to-object":82}],56:[function(require,module,exports){
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
},{"./$.core":18,"./$.export":24,"./$.fails":26}],57:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject')
  , isEnum    = $.isEnum;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./$":48,"./$.to-iobject":80}],58:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var $        = require('./$')
  , anObject = require('./$.an-object')
  , Reflect  = require('./$.global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = $.getNames(anObject(it))
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":48,"./$.an-object":6,"./$.global":31}],59:[function(require,module,exports){
'use strict';
var path      = require('./$.path')
  , invoke    = require('./$.invoke')
  , aFunction = require('./$.a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that  = this
      , $$    = arguments
      , $$len = $$.length
      , j = 0, k = 0, args;
    if(!holder && !$$len)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
    while($$len > k)args.push($$[k++]);
    return invoke(fn, args, that);
  };
};
},{"./$.a-function":4,"./$.invoke":35,"./$.path":60}],60:[function(require,module,exports){
module.exports = require('./$.global');
},{"./$.global":31}],61:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],62:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":63}],63:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":18,"./$.global":31,"./$.hide":33,"./$.uid":84}],64:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],65:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],66:[function(require,module,exports){
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
},{"./$":48,"./$.an-object":6,"./$.ctx":19,"./$.is-object":40}],67:[function(require,module,exports){
'use strict';
var global      = require('./$.global')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":48,"./$.descriptors":21,"./$.global":31,"./$.wks":85}],68:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":48,"./$.has":32,"./$.wks":85}],69:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":31}],70:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":4,"./$.an-object":6,"./$.wks":85}],71:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],72:[function(require,module,exports){
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
},{"./$.defined":20,"./$.to-integer":79}],73:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./$.is-regexp')
  , defined  = require('./$.defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./$.defined":20,"./$.is-regexp":41}],74:[function(require,module,exports){
// https://github.com/ljharb/proposal-string-pad-left-right
var toLength = require('./$.to-length')
  , repeat   = require('./$.string-repeat')
  , defined  = require('./$.defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};
},{"./$.defined":20,"./$.string-repeat":75,"./$.to-length":81}],75:[function(require,module,exports){
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
},{"./$.defined":20,"./$.to-integer":79}],76:[function(require,module,exports){
var $export = require('./$.export')
  , defined = require('./$.defined')
  , fails   = require('./$.fails')
  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec){
  var exp  = {};
  exp[KEY] = exec(trim);
  $export($export.P + $export.F * fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  }), 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./$.defined":20,"./$.export":24,"./$.fails":26}],77:[function(require,module,exports){
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
},{"./$.cof":13,"./$.ctx":19,"./$.dom-create":22,"./$.global":31,"./$.html":34,"./$.invoke":35}],78:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./$.to-integer":79}],79:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],80:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":20,"./$.iobject":36}],81:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":79}],82:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":20}],83:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./$.is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./$.is-object":40}],84:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],85:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":31,"./$.shared":69,"./$.uid":84}],86:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":12,"./$.core":18,"./$.iterators":47,"./$.wks":85}],87:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , $export           = require('./$.export')
  , DESCRIPTORS       = require('./$.descriptors')
  , createDesc        = require('./$.property-desc')
  , html              = require('./$.html')
  , cel               = require('./$.dom-create')
  , has               = require('./$.has')
  , cof               = require('./$.cof')
  , invoke            = require('./$.invoke')
  , fails             = require('./$.fails')
  , anObject          = require('./$.an-object')
  , aFunction         = require('./$.a-function')
  , isObject          = require('./$.is-object')
  , toObject          = require('./$.to-object')
  , toIObject         = require('./$.to-iobject')
  , toInteger         = require('./$.to-integer')
  , toIndex           = require('./$.to-index')
  , toLength          = require('./$.to-length')
  , IObject           = require('./$.iobject')
  , IE_PROTO          = require('./$.uid')('__proto__')
  , createArrayMethod = require('./$.array-methods')
  , arrayIndexOf      = require('./$.array-includes')(false)
  , ObjectProto       = Object.prototype
  , ArrayProto        = Array.prototype
  , arraySlice        = ArrayProto.slice
  , arrayJoin         = ArrayProto.join
  , defineProperty    = $.setDesc
  , getOwnDescriptor  = $.getDesc
  , defineProperties  = $.setDescs
  , factories         = {}
  , IE8_DOM_DEFINE;

if(!DESCRIPTORS){
  IE8_DOM_DEFINE = !fails(function(){
    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
  });
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)anObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    anObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
var createGetKeys = function(names, length){
  return function(object){
    var O      = toIObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };
};
var Empty = function(){};
$export($export.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = toObject(O);
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(typeof O.constructor == 'function' && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = anObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
});

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }
  return factories[len](F, args);
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$export($export.P, 'Function', {
  bind: function bind(that /*, args... */){
    var fn       = aFunction(this)
      , partArgs = arraySlice.call(arguments, 1);
    var bound = function(/* args... */){
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
    };
    if(isObject(fn.prototype))bound.prototype = fn.prototype;
    return bound;
  }
});

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * fails(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
$export($export.P + $export.F * (IObject != Object), 'Array', {
  join: function join(separator){
    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$export($export.S, 'Array', {isArray: require('./$.is-array')});

var createArrayReduce = function(isRight){
  return function(callbackfn, memo){
    aFunction(callbackfn);
    var O      = IObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      if(isRight ? index < 0 : length <= index){
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
};

var methodize = function($fn){
  return function(arg1/*, arg2 = undefined */){
    return $fn(this, arg1, arguments[1]);
  };
};

$export($export.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || methodize(createArrayMethod(0)),
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: methodize(createArrayMethod(1)),
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: methodize(createArrayMethod(2)),
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: methodize(createArrayMethod(3)),
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: methodize(createArrayMethod(4)),
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: methodize(arrayIndexOf),
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 20.3.3.1 / 15.9.4.4 Date.now()
$export($export.S, 'Date', {now: function(){ return +new Date; }});

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./$":48,"./$.a-function":4,"./$.an-object":6,"./$.array-includes":9,"./$.array-methods":10,"./$.cof":13,"./$.descriptors":21,"./$.dom-create":22,"./$.export":24,"./$.fails":26,"./$.has":32,"./$.html":34,"./$.invoke":35,"./$.iobject":36,"./$.is-array":38,"./$.is-object":40,"./$.property-desc":61,"./$.to-index":78,"./$.to-integer":79,"./$.to-iobject":80,"./$.to-length":81,"./$.to-object":82,"./$.uid":84}],88:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./$.export');

$export($export.P, 'Array', {copyWithin: require('./$.array-copy-within')});

require('./$.add-to-unscopables')('copyWithin');
},{"./$.add-to-unscopables":5,"./$.array-copy-within":7,"./$.export":24}],89:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./$.export');

$export($export.P, 'Array', {fill: require('./$.array-fill')});

require('./$.add-to-unscopables')('fill');
},{"./$.add-to-unscopables":5,"./$.array-fill":8,"./$.export":24}],90:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./$.export')
  , $find   = require('./$.array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./$.add-to-unscopables')(KEY);
},{"./$.add-to-unscopables":5,"./$.array-methods":10,"./$.export":24}],91:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./$.export')
  , $find   = require('./$.array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./$.add-to-unscopables')(KEY);
},{"./$.add-to-unscopables":5,"./$.array-methods":10,"./$.export":24}],92:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":19,"./$.export":24,"./$.is-array-iter":37,"./$.iter-call":42,"./$.iter-detect":45,"./$.to-length":81,"./$.to-object":82,"./core.get-iterator-method":86}],93:[function(require,module,exports){
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
},{"./$.add-to-unscopables":5,"./$.iter-define":44,"./$.iter-step":46,"./$.iterators":47,"./$.to-iobject":80}],94:[function(require,module,exports){
'use strict';
var $export = require('./$.export');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./$.fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , $$     = arguments
      , $$len  = $$.length
      , result = new (typeof this == 'function' ? this : Array)($$len);
    while($$len > index)result[index] = $$[index++];
    result.length = $$len;
    return result;
  }
});
},{"./$.export":24,"./$.fails":26}],95:[function(require,module,exports){
require('./$.set-species')('Array');
},{"./$.set-species":67}],96:[function(require,module,exports){
'use strict';
var $             = require('./$')
  , isObject      = require('./$.is-object')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":48,"./$.is-object":40,"./$.wks":85}],97:[function(require,module,exports){
var setDesc    = require('./$').setDesc
  , createDesc = require('./$.property-desc')
  , has        = require('./$.has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || require('./$.descriptors') && setDesc(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"./$":48,"./$.descriptors":21,"./$.has":32,"./$.property-desc":61}],98:[function(require,module,exports){
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
},{"./$.collection":17,"./$.collection-strong":14}],99:[function(require,module,exports){
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
},{"./$.export":24,"./$.math-log1p":52}],100:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./$.export');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"./$.export":24}],101:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./$.export":24}],102:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./$.export')
  , sign    = require('./$.math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./$.export":24,"./$.math-sign":53}],103:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./$.export":24}],104:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./$.export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./$.export":24}],105:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./$.export');

$export($export.S, 'Math', {expm1: require('./$.math-expm1')});
},{"./$.export":24,"./$.math-expm1":51}],106:[function(require,module,exports){
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
},{"./$.export":24,"./$.math-sign":53}],107:[function(require,module,exports){
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
},{"./$.export":24}],108:[function(require,module,exports){
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
},{"./$.export":24,"./$.fails":26}],109:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./$.export":24}],110:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./$.export');

$export($export.S, 'Math', {log1p: require('./$.math-log1p')});
},{"./$.export":24,"./$.math-log1p":52}],111:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./$.export":24}],112:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./$.export');

$export($export.S, 'Math', {sign: require('./$.math-sign')});
},{"./$.export":24,"./$.math-sign":53}],113:[function(require,module,exports){
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
},{"./$.export":24,"./$.fails":26,"./$.math-expm1":51}],114:[function(require,module,exports){
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
},{"./$.export":24,"./$.math-expm1":51}],115:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./$.export":24}],116:[function(require,module,exports){
'use strict';
var $           = require('./$')
  , global      = require('./$.global')
  , has         = require('./$.has')
  , cof         = require('./$.cof')
  , toPrimitive = require('./$.to-primitive')
  , fails       = require('./$.fails')
  , $trim       = require('./$.string-trim').trim
  , NUMBER      = 'Number'
  , $Number     = global[NUMBER]
  , Base        = $Number
  , proto       = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF  = cof($.create(proto)) == NUMBER
  , TRIM        = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call(require('./$.descriptors') ? $.getNames(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), function(key){
    if(has(Base, key) && !has($Number, key)){
      $.setDesc($Number, key, $.getDesc(Base, key));
    }
  });
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redefine')(global, NUMBER, $Number);
}
},{"./$":48,"./$.cof":13,"./$.descriptors":21,"./$.fails":26,"./$.global":31,"./$.has":32,"./$.redefine":63,"./$.string-trim":76,"./$.to-primitive":83}],117:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./$.export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./$.export":24}],118:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./$.export')
  , _isFinite = require('./$.global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./$.export":24,"./$.global":31}],119:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./$.export');

$export($export.S, 'Number', {isInteger: require('./$.is-integer')});
},{"./$.export":24,"./$.is-integer":39}],120:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./$.export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./$.export":24}],121:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./$.export')
  , isInteger = require('./$.is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./$.export":24,"./$.is-integer":39}],122:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./$.export":24}],123:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./$.export":24}],124:[function(require,module,exports){
// 20.1.2.12 Number.parseFloat(string)
var $export = require('./$.export');

$export($export.S, 'Number', {parseFloat: parseFloat});
},{"./$.export":24}],125:[function(require,module,exports){
// 20.1.2.13 Number.parseInt(string, radix)
var $export = require('./$.export');

$export($export.S, 'Number', {parseInt: parseInt});
},{"./$.export":24}],126:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":24,"./$.object-assign":55}],127:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"./$.is-object":40,"./$.object-sap":56}],128:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":56,"./$.to-iobject":80}],129:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./$.object-sap')('getOwnPropertyNames', function(){
  return require('./$.get-names').get;
});
},{"./$.get-names":30,"./$.object-sap":56}],130:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('getPrototypeOf', function($getPrototypeOf){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./$.object-sap":56,"./$.to-object":82}],131:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./$.is-object":40,"./$.object-sap":56}],132:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./$.is-object":40,"./$.object-sap":56}],133:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./$.is-object":40,"./$.object-sap":56}],134:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./$.export');
$export($export.S, 'Object', {is: require('./$.same-value')});
},{"./$.export":24,"./$.same-value":65}],135:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":56,"./$.to-object":82}],136:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
  };
});
},{"./$.is-object":40,"./$.object-sap":56}],137:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(it) : it;
  };
});
},{"./$.is-object":40,"./$.object-sap":56}],138:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":24,"./$.set-proto":66}],139:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./$.classof')
  , test    = {};
test[require('./$.wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./$.redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./$.classof":12,"./$.redefine":63,"./$.wks":85}],140:[function(require,module,exports){
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
},{"./$":48,"./$.a-function":4,"./$.an-object":6,"./$.classof":12,"./$.core":18,"./$.ctx":19,"./$.descriptors":21,"./$.export":24,"./$.for-of":29,"./$.global":31,"./$.is-object":40,"./$.iter-detect":45,"./$.library":50,"./$.microtask":54,"./$.redefine-all":62,"./$.same-value":65,"./$.set-proto":66,"./$.set-species":67,"./$.set-to-string-tag":68,"./$.species-constructor":70,"./$.strict-new":71,"./$.wks":85}],141:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./$.export')
  , _apply  = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"./$.export":24}],142:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $         = require('./$')
  , $export   = require('./$.export')
  , aFunction = require('./$.a-function')
  , anObject  = require('./$.an-object')
  , isObject  = require('./$.is-object')
  , bind      = Function.bind || require('./$.core').Function.prototype.bind;

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./$.fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./$":48,"./$.a-function":4,"./$.an-object":6,"./$.core":18,"./$.export":24,"./$.fails":26,"./$.is-object":40}],143:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var $        = require('./$')
  , $export  = require('./$.export')
  , anObject = require('./$.an-object');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./$.fails')(function(){
  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$":48,"./$.an-object":6,"./$.export":24,"./$.fails":26}],144:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./$.export')
  , getDesc  = require('./$').getDesc
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = getDesc(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./$":48,"./$.an-object":6,"./$.export":24}],145:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./$.export')
  , anObject = require('./$.an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./$.iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./$.an-object":6,"./$.export":24,"./$.iter-create":43}],146:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var $        = require('./$')
  , $export  = require('./$.export')
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(anObject(target), propertyKey);
  }
});
},{"./$":48,"./$.an-object":6,"./$.export":24}],147:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./$.export')
  , getProto = require('./$').getProto
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./$":48,"./$.an-object":6,"./$.export":24}],148:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var $        = require('./$')
  , has      = require('./$.has')
  , $export  = require('./$.export')
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./$":48,"./$.an-object":6,"./$.export":24,"./$.has":32,"./$.is-object":40}],149:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./$.export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./$.export":24}],150:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./$.export')
  , anObject      = require('./$.an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./$.an-object":6,"./$.export":24}],151:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./$.export');

$export($export.S, 'Reflect', {ownKeys: require('./$.own-keys')});
},{"./$.export":24,"./$.own-keys":58}],152:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./$.export')
  , anObject           = require('./$.an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.an-object":6,"./$.export":24}],153:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./$.export')
  , setProto = require('./$.set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.export":24,"./$.set-proto":66}],154:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var $          = require('./$')
  , has        = require('./$.has')
  , $export    = require('./$.export')
  , createDesc = require('./$.property-desc')
  , anObject   = require('./$.an-object')
  , isObject   = require('./$.is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = $.getDesc(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = $.getProto(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    $.setDesc(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./$":48,"./$.an-object":6,"./$.export":24,"./$.has":32,"./$.is-object":40,"./$.property-desc":61}],155:[function(require,module,exports){
var $        = require('./$')
  , global   = require('./$.global')
  , isRegExp = require('./$.is-regexp')
  , $flags   = require('./$.flags')
  , $RegExp  = global.RegExp
  , Base     = $RegExp
  , proto    = $RegExp.prototype
  , re1      = /a/g
  , re2      = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW = new $RegExp(re1) !== re1;

if(require('./$.descriptors') && (!CORRECT_NEW || require('./$.fails')(function(){
  re2[require('./$.wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
      : CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
  };
  $.each.call($.getNames(Base), function(key){
    key in $RegExp || $.setDesc($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  });
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./$.redefine')(global, 'RegExp', $RegExp);
}

require('./$.set-species')('RegExp');
},{"./$":48,"./$.descriptors":21,"./$.fails":26,"./$.flags":28,"./$.global":31,"./$.is-regexp":41,"./$.redefine":63,"./$.set-species":67,"./$.wks":85}],156:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
var $ = require('./$');
if(require('./$.descriptors') && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./$.flags')
});
},{"./$":48,"./$.descriptors":21,"./$.flags":28}],157:[function(require,module,exports){
// @@match logic
require('./$.fix-re-wks')('match', 1, function(defined, MATCH){
  // 21.1.3.11 String.prototype.match(regexp)
  return function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  };
});
},{"./$.fix-re-wks":27}],158:[function(require,module,exports){
// @@replace logic
require('./$.fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  };
});
},{"./$.fix-re-wks":27}],159:[function(require,module,exports){
// @@search logic
require('./$.fix-re-wks')('search', 1, function(defined, SEARCH){
  // 21.1.3.15 String.prototype.search(regexp)
  return function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  };
});
},{"./$.fix-re-wks":27}],160:[function(require,module,exports){
// @@split logic
require('./$.fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  // 21.1.3.17 String.prototype.split(separator, limit)
  return function split(separator, limit){
    'use strict';
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined
      ? fn.call(separator, O, limit)
      : $split.call(String(O), separator, limit);
  };
});
},{"./$.fix-re-wks":27}],161:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":17,"./$.collection-strong":14}],162:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $at     = require('./$.string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.export":24,"./$.string-at":72}],163:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./$.export')
  , toLength  = require('./$.to-length')
  , context   = require('./$.string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , $$   = arguments
      , endPosition = $$.length > 1 ? $$[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./$.export":24,"./$.fails-is-regexp":25,"./$.string-context":73,"./$.to-length":81}],164:[function(require,module,exports){
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
},{"./$.export":24,"./$.to-index":78}],165:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./$.export')
  , context  = require('./$.string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./$.fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./$.export":24,"./$.fails-is-regexp":25,"./$.string-context":73}],166:[function(require,module,exports){
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
},{"./$.iter-define":44,"./$.string-at":72}],167:[function(require,module,exports){
var $export   = require('./$.export')
  , toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl   = toIObject(callSite.raw)
      , len   = toLength(tpl.length)
      , $$    = arguments
      , $$len = $$.length
      , res   = []
      , i     = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < $$len)res.push(String($$[i]));
    } return res.join('');
  }
});
},{"./$.export":24,"./$.to-iobject":80,"./$.to-length":81}],168:[function(require,module,exports){
var $export = require('./$.export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.export":24,"./$.string-repeat":75}],169:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./$.export')
  , toLength    = require('./$.to-length')
  , context     = require('./$.string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , $$     = arguments
      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./$.export":24,"./$.fails-is-regexp":25,"./$.string-context":73,"./$.to-length":81}],170:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./$.string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./$.string-trim":76}],171:[function(require,module,exports){
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
},{"./$":48,"./$.an-object":6,"./$.descriptors":21,"./$.enum-keys":23,"./$.export":24,"./$.fails":26,"./$.get-names":30,"./$.global":31,"./$.has":32,"./$.is-array":38,"./$.keyof":49,"./$.library":50,"./$.property-desc":61,"./$.redefine":63,"./$.set-to-string-tag":68,"./$.shared":69,"./$.to-iobject":80,"./$.uid":84,"./$.wks":85}],172:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , redefine     = require('./$.redefine')
  , weak         = require('./$.collection-weak')
  , isObject     = require('./$.is-object')
  , has          = require('./$.has')
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":48,"./$.collection":17,"./$.collection-weak":16,"./$.has":32,"./$.is-object":40,"./$.redefine":63}],173:[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":17,"./$.collection-weak":16}],174:[function(require,module,exports){
'use strict';
var $export   = require('./$.export')
  , $includes = require('./$.array-includes')(true);

$export($export.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./$.add-to-unscopables')('includes');
},{"./$.add-to-unscopables":5,"./$.array-includes":9,"./$.export":24}],175:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":15,"./$.export":24}],176:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export  = require('./$.export')
  , $entries = require('./$.object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./$.export":24,"./$.object-to-array":57}],177:[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $          = require('./$')
  , $export    = require('./$.export')
  , ownKeys    = require('./$.own-keys')
  , toIObject  = require('./$.to-iobject')
  , createDesc = require('./$.property-desc');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , setDesc = $.setDesc
      , getDesc = $.getDesc
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)setDesc(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"./$":48,"./$.export":24,"./$.own-keys":58,"./$.property-desc":61,"./$.to-iobject":80}],178:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export = require('./$.export')
  , $values = require('./$.object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./$.export":24,"./$.object-to-array":57}],179:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./$.export')
  , $re     = require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./$.export":24,"./$.replacer":64}],180:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":15,"./$.export":24}],181:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./$.export')
  , $at     = require('./$.string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.export":24,"./$.string-at":72}],182:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $pad    = require('./$.string-pad');

$export($export.P, 'String', {
  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./$.export":24,"./$.string-pad":74}],183:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $pad    = require('./$.string-pad');

$export($export.P, 'String', {
  padRight: function padRight(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./$.export":24,"./$.string-pad":74}],184:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
});
},{"./$.string-trim":76}],185:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
});
},{"./$.string-trim":76}],186:[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $export = require('./$.export')
  , $ctx    = require('./$.ctx')
  , $Array  = require('./$.core').Array || Array
  , statics = {};
var setStatics = function(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
  });
};
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill');
$export($export.S, 'Array', statics);
},{"./$":48,"./$.core":18,"./$.ctx":19,"./$.export":24}],187:[function(require,module,exports){
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
if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);
},{"./$.global":31,"./$.hide":33,"./$.iterators":47,"./$.wks":85,"./es6.array.iterator":93}],188:[function(require,module,exports){
var $export = require('./$.export')
  , $task   = require('./$.task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.export":24,"./$.task":77}],189:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./$.global')
  , $export    = require('./$.export')
  , invoke     = require('./$.invoke')
  , partial    = require('./$.partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./$.export":24,"./$.global":31,"./$.invoke":35,"./$.partial":59}],190:[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.iterator');
require('./modules/es6.array.species');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-left');
require('./modules/es7.string.pad-right');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$.core');
},{"./modules/$.core":18,"./modules/es5":87,"./modules/es6.array.copy-within":88,"./modules/es6.array.fill":89,"./modules/es6.array.find":91,"./modules/es6.array.find-index":90,"./modules/es6.array.from":92,"./modules/es6.array.iterator":93,"./modules/es6.array.of":94,"./modules/es6.array.species":95,"./modules/es6.function.has-instance":96,"./modules/es6.function.name":97,"./modules/es6.map":98,"./modules/es6.math.acosh":99,"./modules/es6.math.asinh":100,"./modules/es6.math.atanh":101,"./modules/es6.math.cbrt":102,"./modules/es6.math.clz32":103,"./modules/es6.math.cosh":104,"./modules/es6.math.expm1":105,"./modules/es6.math.fround":106,"./modules/es6.math.hypot":107,"./modules/es6.math.imul":108,"./modules/es6.math.log10":109,"./modules/es6.math.log1p":110,"./modules/es6.math.log2":111,"./modules/es6.math.sign":112,"./modules/es6.math.sinh":113,"./modules/es6.math.tanh":114,"./modules/es6.math.trunc":115,"./modules/es6.number.constructor":116,"./modules/es6.number.epsilon":117,"./modules/es6.number.is-finite":118,"./modules/es6.number.is-integer":119,"./modules/es6.number.is-nan":120,"./modules/es6.number.is-safe-integer":121,"./modules/es6.number.max-safe-integer":122,"./modules/es6.number.min-safe-integer":123,"./modules/es6.number.parse-float":124,"./modules/es6.number.parse-int":125,"./modules/es6.object.assign":126,"./modules/es6.object.freeze":127,"./modules/es6.object.get-own-property-descriptor":128,"./modules/es6.object.get-own-property-names":129,"./modules/es6.object.get-prototype-of":130,"./modules/es6.object.is":134,"./modules/es6.object.is-extensible":131,"./modules/es6.object.is-frozen":132,"./modules/es6.object.is-sealed":133,"./modules/es6.object.keys":135,"./modules/es6.object.prevent-extensions":136,"./modules/es6.object.seal":137,"./modules/es6.object.set-prototype-of":138,"./modules/es6.object.to-string":139,"./modules/es6.promise":140,"./modules/es6.reflect.apply":141,"./modules/es6.reflect.construct":142,"./modules/es6.reflect.define-property":143,"./modules/es6.reflect.delete-property":144,"./modules/es6.reflect.enumerate":145,"./modules/es6.reflect.get":148,"./modules/es6.reflect.get-own-property-descriptor":146,"./modules/es6.reflect.get-prototype-of":147,"./modules/es6.reflect.has":149,"./modules/es6.reflect.is-extensible":150,"./modules/es6.reflect.own-keys":151,"./modules/es6.reflect.prevent-extensions":152,"./modules/es6.reflect.set":154,"./modules/es6.reflect.set-prototype-of":153,"./modules/es6.regexp.constructor":155,"./modules/es6.regexp.flags":156,"./modules/es6.regexp.match":157,"./modules/es6.regexp.replace":158,"./modules/es6.regexp.search":159,"./modules/es6.regexp.split":160,"./modules/es6.set":161,"./modules/es6.string.code-point-at":162,"./modules/es6.string.ends-with":163,"./modules/es6.string.from-code-point":164,"./modules/es6.string.includes":165,"./modules/es6.string.iterator":166,"./modules/es6.string.raw":167,"./modules/es6.string.repeat":168,"./modules/es6.string.starts-with":169,"./modules/es6.string.trim":170,"./modules/es6.symbol":171,"./modules/es6.weak-map":172,"./modules/es6.weak-set":173,"./modules/es7.array.includes":174,"./modules/es7.map.to-json":175,"./modules/es7.object.entries":176,"./modules/es7.object.get-own-property-descriptors":177,"./modules/es7.object.values":178,"./modules/es7.regexp.escape":179,"./modules/es7.set.to-json":180,"./modules/es7.string.at":181,"./modules/es7.string.pad-left":182,"./modules/es7.string.pad-right":183,"./modules/es7.string.trim-left":184,"./modules/es7.string.trim-right":185,"./modules/js.array.statics":186,"./modules/web.dom.iterable":187,"./modules/web.immediate":188,"./modules/web.timers":189}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BlockScope = undefined;

var _scope = require("./scope");

var _assign = require("../utils/assign");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockScope = exports.BlockScope = (function (_Scope) {
	_inherits(BlockScope, _Scope);

	function BlockScope(env, scope, node) {
		_classCallCheck(this, BlockScope);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BlockScope).call(this, env, scope));

		_this.node = node;
		return _this;
	}

	_createClass(BlockScope, [{
		key: "use",
		value: regeneratorRuntime.mark(function use(inner) {
			return regeneratorRuntime.wrap(function use$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!this.node.hasBindings()) {
								_context.next = 4;
								break;
							}

							_context.next = 3;
							return _get(Object.getPrototypeOf(BlockScope.prototype), "use", this).call(this, inner);

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
			}, use, this);
		})
	}, {
		key: "reset",
		value: regeneratorRuntime.mark(function reset(initNode) {
			var nextScope;
			return regeneratorRuntime.wrap(function reset$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!this.node.hasBindings()) {
								_context2.next = 7;
								break;
							}

							_get(Object.getPrototypeOf(BlockScope.prototype), "exit", this).call(this);
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
			}, reset, this);
		})
	}]);

	return BlockScope;
})(_scope.Scope);

},{"../utils/assign":389,"./scope":198}],193:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DeclarativeEnvironment = undefined;

var _reference = require("./reference");

var _propertyDescriptor = require("../types/property-descriptor");

var _primitiveType = require("../types/primitive-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeclarativeEnvironment = exports.DeclarativeEnvironment = (function () {
	function DeclarativeEnvironment(parent, thisArg, env, strict, block) {
		_classCallCheck(this, DeclarativeEnvironment);

		this.properties = Object.create(null);
		this.parent = parent && parent.scope;
		this.thisBinding = thisArg;
		this.env = env;
		this.strict = strict;
		this.block = !!block;
	}

	_createClass(DeclarativeEnvironment, [{
		key: "createChildScope",
		value: function createChildScope() {
			return new DeclarativeEnvironment({ scope: this }, this.thisBinding, this.env, this.strict, true);
		}
	}, {
		key: "setParent",
		value: function setParent(parent) {
			this.parent = parent.scope || parent;
		}
	}, {
		key: "getReference",
		value: function getReference(key) {
			var ref = new _reference.Reference(key, this, this.env);
			ref.unqualified = true;
			return ref;
		}
	}, {
		key: "has",
		value: function has(key) {
			return key in this.properties;
		}
	}, {
		key: "owns",
		value: function owns(key) {
			return this.has(key);
		}
	}, {
		key: "getVariable",
		value: function getVariable(key) {
			return this.properties[key];
		}
	}, {
		key: "deleteVariable",
		value: function deleteVariable(key) {
			if (!this.has(key)) {
				return true;
			}

			if (!this.properties[key].configurable) {
				return false;
			}

			delete this.properties[key];
			return true;
		}
	}, {
		key: "createVariable",
		value: function createVariable(key) {
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

			return this.properties[key] = new _propertyDescriptor.PropertyDescriptor(this, { value: undefined, enumerable: true, configurable: configurable, writable: writable, initialized: initialized });
		}
	}, {
		key: "setValue",
		value: function setValue(key, value, throwOnError) {
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
			} else {
				var _parent;

				return (_parent = this.parent).setValue.apply(_parent, arguments);
			}
		}
	}, {
		key: "getValue",
		value: function getValue(key, throwOnError) {
			var propInfo = this.properties[key];
			if (propInfo && propInfo.value) {
				return propInfo.value;
			}

			if (throwOnError || propInfo && !propInfo.initialized) {
				throw ReferenceError(key + " is not defined");
			}

			return _primitiveType.UNDEFINED;
		}
	}, {
		key: "getThisBinding",
		value: function getThisBinding() {
			return this.thisBinding;
		}
	}]);

	return DeclarativeEnvironment;
})();

},{"../types/primitive-type":383,"../types/property-descriptor":384,"./reference":197}],194:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Environment = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
	allowDebugger: false,
	useStrict: false,
	ecmaVersion: 5
};

var kindAttr = {
	"var": { configurable: false, writable: true, initialized: true, block: false },
	"let": { configurable: false, writable: true, initialized: false, block: true },
	"const": { configurable: false, writable: false, initialized: false, block: true }
};

var Environment = exports.Environment = (function () {
	function Environment() {
		_classCallCheck(this, Environment);
	}

	_createClass(Environment, [{
		key: "init",
		value: function init() {
			var _this = this;

			var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

			// clear state in case of re-init
			this.current = null;
			this.globalScope = null;

			this.options = Object.assign({}, defaultOptions, options);
			(options.ecmaVersion === 6 ? _es4.default : _es2.default)(this);

			// todo: improve this
			this.ops = Object.assign({}, _operators2.default, options.operators);
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
		}

		/**
   * Gets a reference from the environment
   * @param {String} key - The key of the property
   * @returns {Reference} The reference.
   */

	}, {
		key: "getReference",
		value: function getReference(key) {
			var scope = this.current && this.current.scope;
			while (scope) {
				if (scope.owns(key)) {
					return scope.getReference(key, true);
				}

				scope = scope.parent;
			}

			return new _reference.Reference(key, undefined, this);
		}
	}, {
		key: "getSymbol",
		value: function getSymbol(key) {
			return _symbolType.SymbolType.getByKey(key);
		}
	}, {
		key: "getValue",
		value: function getValue(key) {
			return this.getReference(key).getValue();
		}
	}, {
		key: "setValue",
		value: function setValue(key, value, strict) {
			this.current.scope.setValue(key, value, strict);
		}
	}, {
		key: "has",
		value: function has(key) {
			return this.current.scope.has(key);
		}
	}, {
		key: "deleteVariable",
		value: function deleteVariable(key) {
			this.current.scope.deleteVariable(key);
		}

		// declare (key, value) {
		// 	let propInfo = this.getVariable(key);
		// 	if (!propInfo) {
		// 		propInfo = this.createVariable(key);
		// 	}	

		// 	propInfo.init(value);
		// }

	}, {
		key: "getVariable",
		value: function getVariable(key) {
			var scope = this.current && this.current.scope;
			while (scope) {
				if (scope.owns(key)) {
					return scope.getVariable(key);
				}

				scope = scope.parent;
			}

			return null;
		}

		/**
   * Declares a variable within the current scope.
   * @param {String} key - the key of the variable.
   * @param {Object} [descriptor] - whether the variable is immutable or not.
   * @returns {PropertyDescriptor} The property descriptor for the new variabble.
   */

	}, {
		key: "createVariable",
		value: function createVariable(key) {
			var kind = arguments.length <= 1 || arguments[1] === undefined ? "var" : arguments[1];

			var attr = kindAttr[kind];
			var scope = this.current.scope;

			(0, _contracts.assertIsValidIdentifier)(key, this.isStrict());

			if (!attr.block) {
				while (scope) {
					if (!scope.block || !scope.parent) {
						break;
					}

					scope = scope.parent;
				}
			}

			return scope.createVariable(key, attr);
		}

		/**
   * Indicates whether the current lexical scope is in strict mode.
   * @returns {Boolean} true if in strict mode; false otherwise.
   */

	}, {
		key: "isStrict",
		value: function isStrict() {
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
		}

		/**
   * Gets the current `this` object for the environment.
   * @returns {ObjectType} The `this` object for the current scope.
   */

	}, {
		key: "getThisBinding",
		value: function getThisBinding() {
			var thisArg = this.current.scope.getThisBinding();
			if (thisArg) {
				return thisArg;
			}

			if (this.isStrict()) {
				return _primitiveType.UNDEFINED;
			}

			return this.global;
		}
	}, {
		key: "createExecutionContext",
		value: function createExecutionContext(obj, callee, isNew) {
			return new _executionContext.ExecutionContext(this, obj, callee, isNew);
		}

		/**
   * Creates a new declarative scope.
   * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
   * @param {Boolean} [strict] - Indicates whether the scope is in strict mode.
   * @returns {Scope} The new scope.
   */

	}, {
		key: "createScope",
		value: function createScope(thisArg, strict) {
			return this.setScope(new _declarativeEnvironment.DeclarativeEnvironment(this.current, thisArg, this, strict || this.isStrict()));
		}

		/**
   * Creates a new scope based on the provided object. This is used for the `with`
   * statement, as well as the global scope.
   * @param {ObjectType} obj - The object to bind the scope to.
   * @param {ObjectType} [thisArg] - The `this` binding for the new scope.
   * @param {Boolean} [strict] - Indicates whether the scope is in strict mode.
   * @returns {Scope} The new scope.
   */

	}, {
		key: "createObjectScope",
		value: function createObjectScope(obj, thisArg, strict) {
			return this.setScope(new _objectEnvironment.ObjectEnvironment(this.current, obj, thisArg, this, strict || this.isStrict()));
		}
	}, {
		key: "createExecutionScope",
		value: function createExecutionScope(fn, thisArg) {
			var parentScope = this.current.scope;

			// if a parent scope is defined we need to limit this scope to that scope
			if (fn.boundScope) {
				this.setScope(fn.boundScope.scope);
			}

			thisArg = fn.boundThis || thisArg;
			if (fn.arrow) {
				thisArg = this.getThisBinding();
			}

			var scope = this.createScope(thisArg);
			scope.parentScope = parentScope;
			return scope;
		}
	}, {
		key: "createBlockScope",
		value: function createBlockScope(node) {
			var scope = this.current.scope;
			if (node.hasBindings() && !node.isProgram()) {
				scope = scope.createChildScope();
			}

			this.current = new _blockScope.BlockScope(this, scope, node);
			this.current.init(node);
			return this.current;
		}

		/**
   * Sets the current scope.
   * @param {Environment} scope - Sets the current environment.
   * @returns {Scope} The created scope.
   */

	}, {
		key: "setScope",
		value: function setScope(scope) {
			return this.current = new _scope.Scope(this, scope);
		}
	}]);

	return Environment;
})();

},{"../es5":244,"../es6":299,"../execution-context":363,"../types/primitive-type":383,"../types/symbol-type":388,"../utils/contracts":391,"../utils/operators":395,"./block-scope":192,"./declarative-environment":193,"./object-environment":195,"./reference":197,"./scope":198}],195:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ObjectEnvironment = undefined;

var _propertyReference = require("./property-reference");

var _declarativeEnvironment = require("./declarative-environment");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectEnvironment = exports.ObjectEnvironment = (function () {
	function ObjectEnvironment(parent, obj, thisArg, env, strict) {
		_classCallCheck(this, ObjectEnvironment);

		this.parent = parent && parent.scope;
		this.object = obj;
		this.thisBinding = thisArg || obj;
		this.env = env;
		this.strict = strict;
		this.block = false;
	}

	_createClass(ObjectEnvironment, [{
		key: "createChildScope",
		value: function createChildScope() {
			return new _declarativeEnvironment.DeclarativeEnvironment({ scope: this }, this.thisBinding, this.env, this.strict, true);
		}
	}, {
		key: "getReference",
		value: function getReference(key, unqualified) {
			var ref = new _propertyReference.PropertyReference(key, this.object, this.env);
			ref.unqualified = unqualified;
			return ref;
		}
	}, {
		key: "has",
		value: function has(key) {
			return this.parent ? this.parent.has(key) : this.owns(key);
		}
	}, {
		key: "owns",
		value: function owns(key) {
			return this.object.has(key);
		}
	}, {
		key: "getVariable",
		value: function getVariable(key) {
			return this.object.getProperty(key);
		}
	}, {
		key: "deleteVariable",
		value: function deleteVariable(key) {
			return this.object.deleteProperty(key, false);
		}
	}, {
		key: "createVariable",
		value: function createVariable(key) {
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

				this.object.defineOwnProperty(key, { value: undefined, enumerable: true, configurable: configurable, writable: writable, initialized: initialized }, this.env.isStrict());
			}

			return this.object.getProperty(key);
		}
	}, {
		key: "setValue",
		value: function setValue(key, value, throwOnError) {
			if (this.parent && !this.object.has(key)) {
				var _parent2;

				(_parent2 = this.parent).setValue.apply(_parent2, arguments);
			} else {
				this.object.setValue(key, value, throwOnError);
			}
		}
	}, {
		key: "getValue",
		value: function getValue(key, throwOnError) {
			if (!this.owns(key)) {
				if (throwOnError) {
					throw ReferenceError(key + " is not defined.");
				}

				return undefined;
			}

			return this.object.getValue(key);
		}
	}, {
		key: "getThisBinding",
		value: function getThisBinding() {
			return this.thisBinding;
		}
	}]);

	return ObjectEnvironment;
})();

},{"./declarative-environment":193,"./property-reference":196}],196:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PropertyReference = undefined;

var _reference = require("./reference");

var _primitiveType = require("../types/primitive-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An object which represents a reference to an object's property.
 */

var PropertyReference = exports.PropertyReference = (function (_Reference) {
	_inherits(PropertyReference, _Reference);

	function PropertyReference(key, object, env) {
		_classCallCheck(this, PropertyReference);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PropertyReference).call(this, key, object, env));

		_this.isPropertyReference = true;
		return _this;
	}

	/**
  * Returns the value of the reference. If the reference is unresolved,
  * a ReferenceError will be thrown.
  * @returns {ObjectType} The value.
  */

	_createClass(PropertyReference, [{
		key: "getValue",
		value: function getValue() {
			var prop = this.base.getProperty(this.key);
			return prop && prop.getValue() || _primitiveType.UNDEFINED;
		}

		/**
   * Sets the value of the underlying property or value.
   * @param {ObjectType} value - The value to assign.
   * @param {Boolean} throwOnError - Set true if a failed assignment should throw an exception.
   * @returns {Boolean} The result of the value assignment.
   */

	}, {
		key: "setValue",
		value: function setValue(value, throwOnError) {
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
		}

		/**
   * Deletes the underlying reference.
   * @returns {Boolean} The result of the delete operation.
   */

	}, {
		key: "delete",
		value: function _delete() {
			return this.base.deleteProperty(this.key, this.env.isStrict());
		}

		/**
   * Indicates whether the reference is resolved or not.
   * @returns {Boolean} true if resolves; false otherwise.
   */

	}, {
		key: "isUnresolved",
		value: function isUnresolved() {
			return false;
		}
	}]);

	return PropertyReference;
})(_reference.Reference);

},{"../types/primitive-type":383,"./reference":197}],197:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Reference = undefined;

var _contracts = require("../utils/contracts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reference = exports.Reference = (function () {
	function Reference(key, base, env) {
		_classCallCheck(this, Reference);

		this.isReference = true;
		this.unqualified = false;

		this.key = key;
		this.base = base;
		this.env = env;
		this.strict = env.isStrict();
	}

	/**
  * Returns the value of the reference. If the reference is unresolved,
  * a ReferenceError will be thrown.
  * @returns {ObjectType} The value.
  */

	_createClass(Reference, [{
		key: "getValue",
		value: function getValue() {
			if (!this.base) {
				throw ReferenceError(this.key + " is not defined");
			}

			return this.base.getValue(this.key, this.strict);
		}

		/**
   * Sets the value of the underlying property or value.
   * @param {ObjectType} value - The value to assign.
   * @param {Boolean} throwOnError - Causes errors to be thrown.
   * @returns {Boolean} The result of the value assignment.
   */

	}, {
		key: "setValue",
		value: function setValue(value, throwOnError) {
			if (this.base) {
				if (!this.base.setValue(this.key, value) && this.strict) {
					throw TypeError();
				}

				return true;
			}

			// check identifier before strict
			(0, _contracts.assertIsValidIdentifier)(this.key, this.strict);

			if (this.strict) {
				throw ReferenceError(this.key + " is not defined");
			}

			return this.env.global.defineOwnProperty(this.key, {
				value: value,
				configurable: true,
				enumerable: true,
				writable: true
			}, false, this.env);
		}
	}, {
		key: "isStrict",
		value: function isStrict() {
			return this.strict || this.env.isStrict();
		}

		/**
   * Deletes the underlying reference.
   * @returns {Boolean} The result of the delete operation.
   */

	}, {
		key: "delete",
		value: function _delete() {
			if (this.base) {
				return this.base.deleteVariable(this.key);
			}

			return true;
		}

		/**
   * Indicates whether the reference is resolved or not.
   * @returns {Boolean} true if resolves; false otherwise.
   */

	}, {
		key: "isUnresolved",
		value: function isUnresolved() {
			return !this.base;
		}
	}]);

	return Reference;
})();

},{"../utils/contracts":391}],198:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Scope = undefined;

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

var _async = require("../utils/async");

var _assign = require("../utils/assign");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scope = exports.Scope = (function () {
	function Scope(env, scope) {
		_classCallCheck(this, Scope);

		env.globalScope = env.globalScope || this;

		this.scope = scope;
		this.env = env;
		this.parentScope = (env.current || env.globalScope).scope;
	}

	/**
  * Initializes the scope by validating the function body and hoisting variables.
  * @param {AST} node - The node to be executed.
  * @returns {void}
  */

	_createClass(Scope, [{
		key: "init",
		value: function init(node) {
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
					kind = "var";

					var strictFunc = strict || decl.isStrict();
					value = env.objectFactory.createFunction(decl, undefined, { strict: strictFunc, name: key });
					// value.bindScope(this);
				} else if (env.has(key)) {
						return;
					}

				var newVar = env.createVariable(key, kind);
				if (initialized) {
					newVar.init(value);
				}
			});
		}
	}, {
		key: "loadComplexArgs",
		value: regeneratorRuntime.mark(function loadComplexArgs(params, args, callee) {
			var env, strict, scope, argIndex, argLength;
			return regeneratorRuntime.wrap(function loadComplexArgs$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							env = this.env;
							strict = env.isStrict() || callee.node.isStrict();

							// create a temporary scope for the argument declarations

							scope = this.createParameterScope();
							argIndex = 0;
							argLength = args.length;
							_context2.next = 7;
							return (0, _async.each)(params, regeneratorRuntime.mark(function _callee(param, index) {
								var rest, restIndex;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												if (!param.isRestElement()) {
													_context.next = 8;
													break;
												}

												rest = env.objectFactory.createArray();
												restIndex = 0;

												while (argIndex < argLength) {
													rest.setValue(restIndex++, args[argIndex++] || _primitiveType.UNDEFINED);
												}

												_context.next = 6;
												return (0, _assign.declare)(env, param.argument, rest);

											case 6:
												_context.next = 10;
												break;

											case 8:
												_context.next = 10;
												return (0, _assign.declare)(env, param, args[argIndex++] || _primitiveType.UNDEFINED);

											case 10:
											case "end":
												return _context.stop();
										}
									}
								}, _callee, this);
							}));

						case 7:

							if (!callee.arrow) {
								(function () {
									// preserve the passed in arguments, even if defaults are used instead
									var argumentList = env.objectFactory.createArguments(args, callee, strict);
									scope.createVariable("arguments");
									scope.setValue("arguments", argumentList);

									args.forEach(function (value, index) {
										argumentList.defineOwnProperty(index, {
											value: value,
											configurable: true,
											enumerable: true,
											writable: true
										});
									});

									argumentList.defineOwnProperty("length", {
										value: env.objectFactory.createPrimitive(args.length),
										configurable: true,
										writable: true
									});
								})();
							}

							// return scope back to main scope
							this.env.setScope(this.scope);

						case 9:
						case "end":
							return _context2.stop();
					}
				}
			}, loadComplexArgs, this);
		})

		/**
   * Loads the arguments into the scope and creates the special `arguments` object.
   * @param {Array<Identifier>} params - The parameter identifiers
   * @param {Array<ObjectType>} args - The argument values
   * @param {FunctionType} callee - The function
   * @returns {void}
   */

	}, {
		key: "loadArgs",
		value: regeneratorRuntime.mark(function loadArgs(params, args, callee) {
			var

			// todo: this method is getting far too complex
			env, scope, strictCallee, strict, argumentList, argsLength, shouldMap, _i, ln, param, value, name, descriptor, i;

			return regeneratorRuntime.wrap(function loadArgs$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (!(params && params.some(function (p) {
								return p.type !== "Identifier";
							}))) {
								_context3.next = 4;
								break;
							}

							_context3.next = 3;
							return this.loadComplexArgs(params, args, callee);

						case 3:
							return _context3.abrupt("return");

						case 4:
							env = this.env;
							scope = this.scope;
							strictCallee = callee.node.isStrict();
							strict = env.isStrict() || strictCallee;
							argumentList = env.objectFactory.createArguments(args, callee, strict);

							scope.createVariable("arguments");
							scope.setValue("arguments", argumentList);

							argsLength = args.length;

							if (params) {
								shouldMap = !strictCallee;

								for (_i = 0, ln = params.length; _i < ln; _i++) {
									param = params[_i];
									value = args[_i] || _primitiveType.UNDEFINED;
									name = param.name;

									if (shouldMap && !scope.has(name)) {
										descriptor = scope.createVariable(name);

										if (argsLength > _i) {
											argumentList.mapProperty(_i, descriptor);
										}
									}

									if (!shouldMap && _i < argsLength) {
										argumentList.defineOwnProperty(_i, {
											value: value,
											configurable: true,
											enumerable: true,
											writable: true
										});
									}

									(0, _contracts.assertIsValidParameterName)(name, strict);
									scope.setValue(name, value);
								}
							}

							// just set value if additional, unnamed arguments are passed in
							i = params ? params.length : 0;

							for (; i < argsLength; i++) {
								argumentList.defineOwnProperty(i, {
									value: args[i],
									configurable: true,
									enumerable: true,
									writable: true
								});
							}

							argumentList.defineOwnProperty("length", {
								value: env.objectFactory.createPrimitive(argsLength),
								configurable: true,
								writable: true
							});

						case 16:
						case "end":
							return _context3.stop();
					}
				}
			}, loadArgs, this);
		})
	}, {
		key: "createParameterScope",
		value: function createParameterScope() {
			var temp = this.env.createScope();
			temp.scope.setParent(this.scope.parent);
			this.scope.setParent(temp);
			return temp.scope;
		}

		/**
   * uses the passed in function and exits the scope when the function completes,
   * returning the environment back to the previos state.
   * @param {Function} inner - The function to execute.
   * @returns {Iterator} The function results
   */

	}, {
		key: "use",
		value: regeneratorRuntime.mark(function use(inner) {
			var result;
			return regeneratorRuntime.wrap(function use$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.next = 3;
							return inner();

						case 3:
							result = _context4.sent;

							this.exit();
							return _context4.abrupt("return", result);

						case 8:
							_context4.prev = 8;
							_context4.t0 = _context4["catch"](0);

							this.exit();
							throw _context4.t0;

						case 12:
						case "end":
							return _context4.stop();
					}
				}
			}, use, this, [[0, 8]]);
		})

		/**
   * Exits the scope, returning the environment to it's previous state.
   * (Typically you would call `use` which handles exiting the scope itself.)
   * @returns {void}
   */

	}, {
		key: "exit",
		value: function exit() {
			this.env.setScope(this.parentScope);
		}
	}]);

	return Scope;
})();

},{"../types/primitive-type":383,"../utils/assign":389,"../utils/async":390,"../utils/contracts":391}],199:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStartIndex = getStartIndex;
exports.getEndIndex = getEndIndex;
exports.executeCallback = executeCallback;
exports.executeAccumulator = executeAccumulator;
exports.isSpreadable = isSpreadable;

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _symbolType = require("../../types/symbol-type");

var _primitiveType = require("../../types/primitive-type");

var _marked = [executeCallback, executeAccumulator].map(regeneratorRuntime.mark);

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

function executeCallback(env, callback, entry, thisArg, arr) {
	var key, args;
	return regeneratorRuntime.wrap(function executeCallback$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

function executeAccumulator(env, callback, priorValue, entry, arr) {
	var args;
	return regeneratorRuntime.wrap(function executeAccumulator$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				args = [priorValue || _primitiveType.UNDEFINED, entry.value || _primitiveType.UNDEFINED, env.objectFactory.createPrimitive(entry.key), arr];
				_context2.next = 3;
				return callback.call(_primitiveType.UNDEFINED, args) || _primitiveType.UNDEFINED;

			case 3:
				return _context2.abrupt("return", _context2.sent);

			case 4:
			case "end":
				return _context2.stop();
		}
	}, _marked[1], this);
}

function isSpreadable(obj) {
	if (!(0, _contracts.isObject)(obj)) {
		return false;
	}

	var key = _symbolType.SymbolType.getByKey("isConcatSpreadable");
	var propInfo = obj.getProperty(key);
	if (propInfo) {
		var spreadable = propInfo.getValue();
		if (!(0, _contracts.isUndefined)(spreadable)) {
			return (0, _native.toBoolean)(spreadable);
		}
	}

	return obj.className === "Array";
}

},{"../../types/primitive-type":383,"../../types/symbol-type":388,"../../utils/contracts":391,"../../utils/native":393}],200:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("concat", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
			arrays[_key] = arguments[_key];
		}

		var newArray, index, current, length, i;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return factory.createFromSpeciesOrDefault(this.object, $target.getValue("constructor"));

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
								newArray.setIndex(index, current.getValue(i));
							}

							index++;
						}
						_context.next = 15;
						break;

					case 14:
						newArray.setIndex(index++, current);

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

},{"../../utils/native":393,"./array-helpers":199}],201:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("every", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
		var arr, length, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, passed;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 9;
						_iterator = _iterators2.default.forward(arr, 0, length)[Symbol.iterator]();

					case 11:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 22;
							break;
						}

						entry = _step.value;
						_context.next = 15;
						return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

					case 15:
						_context.t0 = _context.sent;
						passed = (0, _native.toBoolean)(_context.t0);

						if (passed) {
							_context.next = 19;
							break;
						}

						return _context.abrupt("return", factory.createPrimitive(false));

					case 19:
						_iteratorNormalCompletion = true;
						_context.next = 11;
						break;

					case 22:
						_context.next = 28;
						break;

					case 24:
						_context.prev = 24;
						_context.t1 = _context["catch"](9);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 28:
						_context.prev = 28;
						_context.prev = 29;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 31:
						_context.prev = 31;

						if (!_didIteratorError) {
							_context.next = 34;
							break;
						}

						throw _iteratorError;

					case 34:
						return _context.finish(31);

					case 35:
						return _context.finish(28);

					case 36:
						return _context.abrupt("return", factory.createPrimitive(true));

					case 37:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[9, 24, 28, 36], [29,, 31, 35]]);
	}), 1, "Array.prototype.every"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],202:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("filter", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
		var arr, length, newArray, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, passed;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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
						return factory.createFromSpeciesOrDefault(this.object, $target.getValue("constructor"));

					case 8:
						newArray = _context.sent;
						index = 0;
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 13;
						_iterator = _iterators2.default.forward(arr, 0, length)[Symbol.iterator]();

					case 15:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 25;
							break;
						}

						entry = _step.value;
						_context.next = 19;
						return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

					case 19:
						_context.t0 = _context.sent;
						passed = (0, _native.toBoolean)(_context.t0);

						if (passed) {
							newArray.setIndex(index++, entry.value);
						}

					case 22:
						_iteratorNormalCompletion = true;
						_context.next = 15;
						break;

					case 25:
						_context.next = 31;
						break;

					case 27:
						_context.prev = 27;
						_context.t1 = _context["catch"](13);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 31:
						_context.prev = 31;
						_context.prev = 32;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 34:
						_context.prev = 34;

						if (!_didIteratorError) {
							_context.next = 37;
							break;
						}

						throw _iteratorError;

					case 37:
						return _context.finish(34);

					case 38:
						return _context.finish(31);

					case 39:
						return _context.abrupt("return", newArray);

					case 40:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[13, 27, 31, 39], [32,, 34, 38]]);
	}), 1, "Array.prototype.filter"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],203:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("forEach", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
		var arr, length, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						arr = (0, _native.toObject)(this.object);
						_context.next = 3;
						return (0, _native.toLength)(arr);

					case 3:
						length = _context.sent;

						(0, _contracts.assertIsFunction)(callback, arr);

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 8;
						_iterator = _iterators2.default.forward(arr, 0, length)[Symbol.iterator]();

					case 10:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 17;
							break;
						}

						entry = _step.value;
						_context.next = 14;
						return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

					case 14:
						_iteratorNormalCompletion = true;
						_context.next = 10;
						break;

					case 17:
						_context.next = 23;
						break;

					case 19:
						_context.prev = 19;
						_context.t0 = _context["catch"](8);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 23:
						_context.prev = 23;
						_context.prev = 24;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 26:
						_context.prev = 26;

						if (!_didIteratorError) {
							_context.next = 29;
							break;
						}

						throw _iteratorError;

					case 29:
						return _context.finish(26);

					case 30:
						return _context.finish(23);

					case 31:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[8, 19, 23, 31], [24,, 26, 30]]);
	}), 1, "Array.prototype.forEach"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],204:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("indexOf", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(searchElement, fromIndex) {
		var length,
		    index,
		    notFound,
		    _iteratorNormalCompletion,
		    _didIteratorError,
		    _iteratorError,
		    _iterator,
		    _step,
		    _step$value,
		    key,
		    value,
		    _args = arguments;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 19;
						_iterator = _iterators2.default.forward(this.object, index, length)[Symbol.iterator]();

					case 21:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 30;
							break;
						}

						_step$value = _step.value;
						key = _step$value.key;
						value = _step$value.value;

						if (!env.ops.strictEquals(searchElement, value || _primitiveType.UNDEFINED)) {
							_context.next = 27;
							break;
						}

						return _context.abrupt("return", factory.createPrimitive(key));

					case 27:
						_iteratorNormalCompletion = true;
						_context.next = 21;
						break;

					case 30:
						_context.next = 36;
						break;

					case 32:
						_context.prev = 32;
						_context.t1 = _context["catch"](19);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 36:
						_context.prev = 36;
						_context.prev = 37;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 39:
						_context.prev = 39;

						if (!_didIteratorError) {
							_context.next = 42;
							break;
						}

						throw _iteratorError;

					case 42:
						return _context.finish(39);

					case 43:
						return _context.finish(36);

					case 44:
						return _context.abrupt("return", notFound);

					case 45:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[19, 32, 36, 44], [37,, 39, 43]]);
	}), 1, "Array.prototype.indexOf"));
};

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _iterators = require("../../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators":367,"../../types/primitive-type":383,"../../utils/native":393,"./array-helpers":199}],205:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var proto = $target.getValue("prototype");
	$target.define("isArray", factory.createBuiltInFunction(function (obj) {
		return factory.createPrimitive(!!(obj && (obj.className === "Array" || obj === proto)));
	}, 1, "Array.isArray"));
};

},{}],206:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("join", factory.createBuiltInFunction(regeneratorRuntime.mark(function join(separator) {
		var length,
		    stringValues,
		    stringValue,
		    i,
		    _args = arguments;
		return regeneratorRuntime.wrap(function join$(_context) {
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

						if (!(0, _contracts.isNullOrUndefined)(stringValue)) {
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

var _contracts = require("../../utils/contracts");

var _primitiveType = require("../../types/primitive-type");

},{"../../types/primitive-type":383,"../../utils/contracts":391,"../../utils/native":393}],207:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("lastIndexOf", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(searchElement, fromIndex) {
		var length,
		    index,
		    _iteratorNormalCompletion,
		    _didIteratorError,
		    _iteratorError,
		    _iterator,
		    _step,
		    _step$value,
		    key,
		    value,
		    _args = arguments;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 16;
						_iterator = _iterators2.default.reverse(this.object, index)[Symbol.iterator]();

					case 18:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 27;
							break;
						}

						_step$value = _step.value;
						key = _step$value.key;
						value = _step$value.value;

						if (!env.ops.strictEquals(searchElement, value || _primitiveType.UNDEFINED)) {
							_context.next = 24;
							break;
						}

						return _context.abrupt("return", factory.createPrimitive(key));

					case 24:
						_iteratorNormalCompletion = true;
						_context.next = 18;
						break;

					case 27:
						_context.next = 33;
						break;

					case 29:
						_context.prev = 29;
						_context.t1 = _context["catch"](16);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 33:
						_context.prev = 33;
						_context.prev = 34;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 36:
						_context.prev = 36;

						if (!_didIteratorError) {
							_context.next = 39;
							break;
						}

						throw _iteratorError;

					case 39:
						return _context.finish(36);

					case 40:
						return _context.finish(33);

					case 41:
						return _context.abrupt("return", factory.createPrimitive(-1));

					case 42:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[16, 29, 33, 41], [34,, 36, 40]]);
	}), 1, "Array.prototype.lastIndexOf"));
};

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _iterators = require("../../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators":367,"../../types/primitive-type":383,"../../utils/native":393}],208:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});

exports.default = function ($target, env, factory) {
		$target.define("map", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
				var arr, length, newArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, value;

				return regeneratorRuntime.wrap(function _callee$(_context) {
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
												return factory.createFromSpeciesOrDefault(this.object, $target.getValue("constructor"));

										case 8:
												newArray = _context.sent;

												newArray.setValue("length", factory.createPrimitive(length));

												_iteratorNormalCompletion = true;
												_didIteratorError = false;
												_iteratorError = undefined;
												_context.prev = 13;
												_iterator = _iterators2.default.forward(arr, 0, length)[Symbol.iterator]();

										case 15:
												if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
														_context.next = 24;
														break;
												}

												entry = _step.value;
												_context.next = 19;
												return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

										case 19:
												value = _context.sent;

												newArray.setIndex(entry.key, value);

										case 21:
												_iteratorNormalCompletion = true;
												_context.next = 15;
												break;

										case 24:
												_context.next = 30;
												break;

										case 26:
												_context.prev = 26;
												_context.t0 = _context["catch"](13);
												_didIteratorError = true;
												_iteratorError = _context.t0;

										case 30:
												_context.prev = 30;
												_context.prev = 31;

												if (!_iteratorNormalCompletion && _iterator.return) {
														_iterator.return();
												}

										case 33:
												_context.prev = 33;

												if (!_didIteratorError) {
														_context.next = 36;
														break;
												}

												throw _iteratorError;

										case 36:
												return _context.finish(33);

										case 37:
												return _context.finish(30);

										case 38:
												return _context.abrupt("return", newArray);

										case 39:
										case "end":
												return _context.stop();
								}
						}
				}, _callee, this, [[13, 26, 30, 38], [31,, 33, 37]]);
		}), 1, "Array.prototype.map"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],209:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("pop", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var obj, i;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../types/primitive-type":383,"../../utils/native":393}],210:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("push", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var start,
		    i,
		    length,
		    newLength,
		    _args = arguments;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return (0, _native.toLength)(this.object);

					case 2:
						start = _context.sent;
						i = 0;

						for (length = _args.length; i < length; i++) {
							this.object.setValue(start + i, _args[i]);
						}

						newLength = factory.createPrimitive(start + i);

						this.object.setValue("length", newLength);
						return _context.abrupt("return", newLength);

					case 8:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 1, "Array.prototype.push"));
};

var _native = require("../../utils/native");

},{"../../utils/native":393}],211:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("reduceRight", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, initialValue) {
		var length,
		    arr,
		    accumulator,
		    hasInitialValue,
		    hasElements,
		    _iteratorNormalCompletion,
		    _didIteratorError,
		    _iteratorError,
		    _iterator,
		    _step,
		    entry,
		    _args = arguments;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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
							_context.next = 43;
							break;
						}

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 14;
						_iterator = _iterators2.default.reverse(arr, length - 1)[Symbol.iterator]();

					case 16:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 29;
							break;
						}

						entry = _step.value;

						if (hasElements) {
							_context.next = 23;
							break;
						}

						hasElements = true;

						if (hasInitialValue) {
							_context.next = 23;
							break;
						}

						accumulator = entry.value;
						return _context.abrupt("continue", 26);

					case 23:
						_context.next = 25;
						return (0, _arrayHelpers.executeAccumulator)(env, callback, accumulator, entry, arr);

					case 25:
						accumulator = _context.sent;

					case 26:
						_iteratorNormalCompletion = true;
						_context.next = 16;
						break;

					case 29:
						_context.next = 35;
						break;

					case 31:
						_context.prev = 31;
						_context.t0 = _context["catch"](14);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 35:
						_context.prev = 35;
						_context.prev = 36;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 38:
						_context.prev = 38;

						if (!_didIteratorError) {
							_context.next = 41;
							break;
						}

						throw _iteratorError;

					case 41:
						return _context.finish(38);

					case 42:
						return _context.finish(35);

					case 43:
						if (!(!hasElements && !hasInitialValue)) {
							_context.next = 45;
							break;
						}

						throw TypeError("Reduce of empty array with no initial value");

					case 45:
						return _context.abrupt("return", accumulator);

					case 46:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[14, 31, 35, 43], [36,, 38, 42]]);
	}), 1, "Array.prototype.reduceRight"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],212:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("reduce", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, initialValue) {
		var arr,
		    length,
		    hasInitialValue,
		    value,
		    hasElements,
		    _iteratorNormalCompletion,
		    _didIteratorError,
		    _iteratorError,
		    _iterator,
		    _step,
		    entry,
		    _args = arguments;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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
							_context.next = 43;
							break;
						}

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 14;
						_iterator = _iterators2.default.forward(arr, 0, length)[Symbol.iterator]();

					case 16:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 29;
							break;
						}

						entry = _step.value;

						if (hasElements) {
							_context.next = 23;
							break;
						}

						hasElements = true;

						if (hasInitialValue) {
							_context.next = 23;
							break;
						}

						value = entry.value;
						return _context.abrupt("continue", 26);

					case 23:
						_context.next = 25;
						return (0, _arrayHelpers.executeAccumulator)(env, callback, value, entry, arr);

					case 25:
						value = _context.sent;

					case 26:
						_iteratorNormalCompletion = true;
						_context.next = 16;
						break;

					case 29:
						_context.next = 35;
						break;

					case 31:
						_context.prev = 31;
						_context.t0 = _context["catch"](14);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 35:
						_context.prev = 35;
						_context.prev = 36;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 38:
						_context.prev = 38;

						if (!_didIteratorError) {
							_context.next = 41;
							break;
						}

						throw _iteratorError;

					case 41:
						return _context.finish(38);

					case 42:
						return _context.finish(35);

					case 43:
						if (!(!hasElements && !hasInitialValue)) {
							_context.next = 45;
							break;
						}

						throw TypeError("Reduce of empty array with no initial value");

					case 45:
						return _context.abrupt("return", value);

					case 46:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[14, 31, 35, 43], [36,, 38, 42]]);
	}), 1, "Array.prototype.reduce"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],213:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("reverse", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var length, middle, lower, upper, upperValue, lowerValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/native":393}],214:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("shift", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var obj, length, i;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../types/primitive-type":383,"../../utils/native":393}],215:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("slice", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(begin, end) {
		var source, length, arr, newLength, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value, index;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_context.next = 23;
						return factory.createFromSpeciesOrDefault(this.object, $target.getValue("constructor"));

					case 23:
						arr = _context.sent;
						newLength = 0;
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 28;

						for (_iterator = _iterators2.default.forward(source, begin, end)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							_step$value = _step.value;
							key = _step$value.key;
							value = _step$value.value;
							index = key - begin;

							arr.setIndex(index, value);
							newLength = ++index;
						}

						_context.next = 36;
						break;

					case 32:
						_context.prev = 32;
						_context.t1 = _context["catch"](28);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 36:
						_context.prev = 36;
						_context.prev = 37;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 39:
						_context.prev = 39;

						if (!_didIteratorError) {
							_context.next = 42;
							break;
						}

						throw _iteratorError;

					case 42:
						return _context.finish(39);

					case 43:
						return _context.finish(36);

					case 44:
						arr.setValue("length", factory.createPrimitive(newLength));
						return _context.abrupt("return", arr);

					case 46:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[28, 32, 36, 44], [37,, 39, 43]]);
	}), 2, "Array.prototype.slice"));
};

var _native = require("../../utils/native");

var _arrayHelpers = require("./array-helpers");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/native":393,"./array-helpers":199}],216:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("some", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
		var arr, length, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, passed;

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 9;
						_iterator = _iterators2.default.forward(arr, 0, length)[Symbol.iterator]();

					case 11:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 22;
							break;
						}

						entry = _step.value;
						_context.next = 15;
						return (0, _arrayHelpers.executeCallback)(env, callback, entry, thisArg, arr);

					case 15:
						_context.t0 = _context.sent;
						passed = (0, _native.toBoolean)(_context.t0);

						if (!passed) {
							_context.next = 19;
							break;
						}

						return _context.abrupt("return", factory.createPrimitive(true));

					case 19:
						_iteratorNormalCompletion = true;
						_context.next = 11;
						break;

					case 22:
						_context.next = 28;
						break;

					case 24:
						_context.prev = 24;
						_context.t1 = _context["catch"](9);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 28:
						_context.prev = 28;
						_context.prev = 29;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 31:
						_context.prev = 31;

						if (!_didIteratorError) {
							_context.next = 34;
							break;
						}

						throw _iteratorError;

					case 34:
						return _context.finish(31);

					case 35:
						return _context.finish(28);

					case 36:
						return _context.abrupt("return", factory.createPrimitive(false));

					case 37:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[9, 24, 28, 36], [29,, 31, 35]]);
	}), 1, "Array.prototype.some"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _iterators = require("../../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../iterators/":367,"../../utils/contracts":391,"../../utils/native":393,"./array-helpers":199}],217:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		if ((0, _contracts.isNullOrUndefined)(comparerFunc)) {
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

	$target.define("sort", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(compareFunc) {
		var arr, length, i, comparer, sortedArray;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

var _contracts = require("../../utils/contracts");

var _async = require("../../utils/async");

var _primitiveType = require("../../types/primitive-type");

},{"../../types/primitive-type":383,"../../utils/async":390,"../../utils/contracts":391,"../../utils/native":393}],218:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("splice", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(start, deleteCount) {
		for (var _len = arguments.length, elements = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			elements[_key - 2] = arguments[_key];
		}

		var length, removed, k, newCount, i;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_context.next = 9;
						return (0, _native.toInteger)(deleteCount);

					case 9:
						deleteCount = _context.sent;

						if (deleteCount < 0) {
							deleteCount = 0;
						} else {
							deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
						}

						_context.next = 13;
						return factory.createFromSpeciesOrDefault(this.object, $target.getValue("constructor"));

					case 13:
						removed = _context.sent;
						k = 0;

						while (k < deleteCount) {
							if (this.object.has(k + start)) {
								removed.defineOwnProperty(k, { value: this.object.getValue(k + start), configurable: true, enumerable: true, writable: true });
								// removed.setIndex(k, this.object.getValue(k + start));
							}

							k++;
						}

						removed.setValue("length", factory.createPrimitive(k));

						newCount = elements.length;

						if (newCount < deleteCount) {
							k = start;

							while (k < length - deleteCount) {
								if (this.object.has(k + deleteCount)) {
									// this.object.defineOwnProperty(k + newCount, {value: this.object.getValue(k + deleteCount), configurable: true, enumerable: true, writable: true});
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
									// this.object.defineOwnProperty(k + newCount - 1, {value: this.object.getValue(k + deleteCount - 1), configurable: true, enumerable: true, writable: true});
									this.object.setValue(k + newCount - 1, this.object.getValue(k + deleteCount - 1));
								} else {
									this.object.deleteProperty(k + newCount - 1);
								}

								k--;
							}
						}

						k = start;
						for (i = 0; i < newCount; i++) {
							// this.object.defineOwnProperty(k, {value: elements[i], configurable: true, enumerable: true, writable: true});
							this.object.setValue(k, elements[i]);
							k++;
						}

						this.object.setValue("length", factory.createPrimitive(length - deleteCount + newCount));
						return _context.abrupt("return", removed);

					case 23:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 2, "Array.prototype.splice"));
};

var _native = require("../../utils/native");

},{"../../utils/native":393}],219:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toLocaleString", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var length, arr, i, current, func;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						if (!(0, _contracts.isNullOrUndefined)(current)) {
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

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391,"../../utils/native":393}],220:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var func;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsNotNullOrUndefined)(this.object, "Array.prototype.toString");
						func = this.object.getValue("join");

						if (!func || !(0, _contracts.isFunction)(func)) {
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

},{"../../utils/contracts":391}],221:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("unshift", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
			items[_key] = arguments[_key];
		}

		var length, argCount, i, toIndex, fromIndex, newLength;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/native":393}],222:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
	}, proto, { configurable: false, enumerable: false, writable: false });

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

},{"../../utils/contracts":391,"./array.concat":200,"./array.every":201,"./array.filter":202,"./array.for-each":203,"./array.index-of":204,"./array.is-array":205,"./array.join":206,"./array.last-index-of":207,"./array.map":208,"./array.pop":209,"./array.push":210,"./array.reduce":212,"./array.reduce-right":211,"./array.reverse":213,"./array.shift":214,"./array.slice":215,"./array.some":216,"./array.sort":217,"./array.splice":218,"./array.to-locale-string":219,"./array.to-string":220,"./array.unshift":221}],223:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsNotGeneric)(this.object, "Boolean", "Boolean.prototype.toString");
		return factory.createPrimitive(String(this.object.value));
	}, 0, "Boolean.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391}],224:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsNotGeneric)(this.object, "Boolean", "Boolean.prototype.valueOf");
		return factory.createPrimitive(this.object.value);
	}, 0, "Boolean.prototype.valueOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391}],225:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

	var booleanClass = objectFactory.createFunction(function (obj) {
		var booleanValue = (0, _native.toBoolean)(obj);

		// called as new
		if (this.isNew) {
			return (0, _native.primitiveToObject)(env, booleanValue);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, proto, { configurable: false, enumerable: false, writable: false });

	(0, _boolean2.default)(proto, env, objectFactory);
	(0, _boolean4.default)(proto, env, objectFactory);

	globalObject.define("Boolean", booleanClass);
}

},{"../../utils/native":393,"./boolean.to-string":223,"./boolean.value-of":224}],226:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = consoleApi;

var _native = require("../../utils/native");

var _async = require("../../utils/async");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var methods = ["log", "info", "error", "warn"];

function consoleApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.define(name, objectFactory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2() {
			var _console;

			var args,
			    _args2 = arguments;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return (0, _async.map)(_args2, regeneratorRuntime.mark(function _callee(arg) {
								return regeneratorRuntime.wrap(function _callee$(_context) {
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

							(_console = console)[name].apply(_console, _toConsumableArray(args));

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

},{"../../utils/async":390,"../../utils/native":393}],227:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("parse", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
		var stringValue, dateValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/native":393}],228:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("UTC", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var nativeArgs,
		    _args2 = arguments;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						return _context2.delegateYield((0, _async.map)(_args2, regeneratorRuntime.mark(function _callee(arg) {
							return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/async":390,"../../utils/native":393}],229:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		return factory.createPrimitive(this.object.value.valueOf());
	}, 0, "Date.prototype.valueOf"));
};

},{}],230:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var staticMethods = ["now"];

var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString"];

var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];

function dateApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;

	var proto = objectFactory.createObject();
	proto.className = "Date";
	proto.value = new Date(0);

	var dateClass = objectFactory.createFunction(regeneratorRuntime.mark(function _callee2(p1, p2, p3, p4, p5, p6, p7) {
		var dateValue,
		    args,
		    primitiveValue,
		    i,
		    _args2 = arguments;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
						return _context2.delegateYield((0, _async.map)(_args2, regeneratorRuntime.mark(function _callee(arg) {
							return regeneratorRuntime.wrap(function _callee$(_context) {
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

						dateValue = new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(args))))();
						return _context2.abrupt("break", 34);

					case 34:
						return _context2.abrupt("return", objectFactory.create("Date", dateValue));

					case 35:

						dateValue = Date.apply(undefined, _toConsumableArray(args));
						return _context2.abrupt("return", objectFactory.createPrimitive(dateValue));

					case 37:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}), proto, { configurable: false, enumerable: false, writable: false });

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
		var _marked = [setter].map(regeneratorRuntime.mark);

		function setter() {
			var args,
			    _args4 = arguments;
			return regeneratorRuntime.wrap(function setter$(_context4) {
				while (1) switch (_context4.prev = _context4.next) {
					case 0:
						return _context4.delegateYield((0, _async.map)(_args4, regeneratorRuntime.mark(function _callee3(arg) {
							return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
			}, _marked[0], this);
		}

		proto.define(name, objectFactory.createBuiltInFunction(setter, Date.prototype[name].length, "Date.prototype." + name));
	});

	globalObject.define("Date", dateClass);
}

},{"../../utils/async":390,"../../utils/native":393,"./date.parse":227,"./date.utc":228,"./date.value-of":229}],231:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var name, msg;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = this.object.getValue("name");
						msg = undefined;

						if (!this.object.has("message")) {
							_context.next = 6;
							break;
						}

						_context.next = 5;
						return (0, _native.toString)(this.object.getValue("message"));

					case 5:
						msg = _context.sent;

					case 6:
						_context.t0 = name;

						if (!_context.t0) {
							_context.next = 11;
							break;
						}

						_context.next = 10;
						return (0, _native.toString)(name);

					case 10:
						_context.t0 = _context.sent;

					case 11:
						name = _context.t0;

						if (!(name && msg)) {
							_context.next = 14;
							break;
						}

						return _context.abrupt("return", factory.create("String", name + ": " + msg));

					case 14:
						return _context.abrupt("return", factory.create("String", name || msg));

					case 15:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 0, "Error.prototype.toString"));
};

var _native = require("../../utils/native");

},{"../../utils/native":393}],232:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = errorApi;

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

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

	var errorClass = objectFactory.createFunction(regeneratorRuntime.mark(function _callee(message) {
		var messageString;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						messageString = undefined;

						if ((0, _contracts.isNullOrUndefined)(message)) {
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
	}), proto, { configurable: false, enumerable: false, writable: false });

	(0, _error2.default)(proto, env, objectFactory);
	globalObject.define("Error", errorClass);

	errorTypes.forEach(function (errorType) {
		var typeProto = objectFactory.createObject();
		typeProto.define("name", objectFactory.createPrimitive(errorType));

		// add to prototype chain to represent inheritance
		typeProto.setPrototype(proto);

		var errClass = objectFactory.createFunction(regeneratorRuntime.mark(function _callee2(message) {
			var messageString, nativeError;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
		}), typeProto, { configurable: false, enumerable: false, writable: false });

		globalObject.define(errorType, errClass);
	});
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/contracts":391,"../../utils/native":393,"./error.to-string":231}],233:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defineThis = defineThis;

var _primitiveType = require("../../types/primitive-type");

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

function defineThis(env, fn, thisArg) {
	if (fn.builtIn || fn.isStrict()) {
		return thisArg || _primitiveType.UNDEFINED;
	}

	if ((0, _contracts.isNullOrUndefined)(thisArg)) {
		return env.global;
	}

	return (0, _native.toObject)(thisArg);
}

},{"../../types/primitive-type":383,"../../utils/contracts":391,"../../utils/native":393}],234:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("apply", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(thisArg, argsArray) {
		var args;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/native":393,"./function-helpers":233}],235:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});

exports.default = function ($target, env, factory) {
		$target.define("bind", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(thisArg) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
				}

				var fn, callee, params, nativeFunc, boundFunc, thrower;
				return regeneratorRuntime.wrap(function _callee$(_context2) {
						while (1) {
								switch (_context2.prev = _context2.next) {
										case 0:
												fn = this.object;
												callee = fn.native ? fn : fn.node;
												params = callee.params || [];

												thisArg = (0, _functionHelpers.defineThis)(env, this.object, thisArg);

												nativeFunc = regeneratorRuntime.mark(function nativeFunc() {
														for (var _len2 = arguments.length, additionalArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
																additionalArgs[_key2] = arguments[_key2];
														}

														var mergedArgs;
														return regeneratorRuntime.wrap(function nativeFunc$(_context) {
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

												nativeFunc.nativeLength = Math.max(params.length - args.length, 0);
												nativeFunc.strict = env.isStrict() || !fn.native && fn.node.body.isStrict();

												boundFunc = factory.createFunction(nativeFunc, null, { name: "bound " + fn.name });

												boundFunc.canConstruct = this.object.canConstruct;
												boundFunc.bindScope(this.env.current);
												boundFunc.bindThis(thisArg);

												if (!nativeFunc.strict) {
														boundFunc.remove("caller");
														boundFunc.remove("arguments");

														// these will be added in strict mode, but should always be here for bound functions
														thrower = factory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");

														boundFunc.defineOwnProperty("caller", thrower);
														boundFunc.defineOwnProperty("arguments", thrower);
												}

												return _context2.abrupt("return", boundFunc);

										case 13:
										case "end":
												return _context2.stop();
								}
						}
				}, _callee, this);
		}), 1, "Function.prototype.bind"));
};

var _functionHelpers = require("./function-helpers");

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391,"./function-helpers":233}],236:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("call", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(thisArg) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"./function-helpers":233}],237:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		if (this.object.native) {
			return factory.createPrimitive("function () { [native code] }");
		}

		return factory.createPrimitive("function () { [user code] }");
	}, 0, "Function.prototype.toString"));
};

},{}],238:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = functionApi;

var _nativeFunctionType = require("../../types/native-function-type");

var _primitiveType = require("../../types/primitive-type");

var _contracts = require("../../utils/contracts");

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

var frozen = { configurable: false, enumerable: false, writable: false };

function functionApi(env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var options = env.options;

	var funcClass = undefined;

	var funcCtor = regeneratorRuntime.mark(function funcCtor() {
		var _this = this;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var funcInstance;
		return regeneratorRuntime.wrap(function funcCtor$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						funcInstance = undefined;

						if (!(options.parser && args.length > 0)) {
							_context4.next = 5;
							break;
						}

						return _context4.delegateYield(regeneratorRuntime.mark(function _callee2() {
							var body, params, bodyString, ast, callee, userNode, strict, wrappedFunc;
							return regeneratorRuntime.wrap(function _callee2$(_context3) {
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
											return (0, _async.map)(args, regeneratorRuntime.mark(function _callee(arg, index) {
												return regeneratorRuntime.wrap(function _callee$(_context) {
													while (1) {
														switch (_context.prev = _context.next) {
															case 0:
																if (!(0, _contracts.isNull)(arg)) {
																	_context.next = 2;
																	break;
																}

																throw SyntaxError("Unexpected token null");

															case 2:
																if (!(0, _contracts.isUndefined)(arg)) {
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
											strict = (0, _contracts.isStrictNode)(userNode);
											wrappedFunc = regeneratorRuntime.mark(function wrappedFunc() {
												var thisArg,
												    $args,
												    executionResult,
												    _args2 = arguments;
												return regeneratorRuntime.wrap(function wrappedFunc$(_context2) {
													while (1) {
														switch (_context2.prev = _context2.next) {
															case 0:
																thisArg = undefined;

																if (this.isNew) {
																	thisArg = objectFactory.createObject(funcInstance);
																} else {
																	thisArg = this.object;

																	if (!strict && (0, _contracts.isUndefined)(thisArg)) {
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

	proto[Symbol.for("env")] = env;

	funcCtor.nativeLength = 1;
	funcClass = objectFactory.createFunction(funcCtor, proto, frozen);
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

	proto.defineOwnProperty("caller", prop);
	proto.defineOwnProperty("callee", prop);
	proto.defineOwnProperty("arguments", prop);
}

},{"../../types/native-function-type":380,"../../types/primitive-type":383,"../../utils/async":390,"../../utils/contracts":391,"../../utils/native":393,"./function.apply":234,"./function.bind":235,"./function.call":236,"./function.to-string":237}],239:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var parser = env.options.parser;

	function createScope(body, directCall) {
		var strictScope = env.isStrict();
		var strictCode = strictScope || (0, _contracts.isStrictNode)(body);
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

	$target.define("eval", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2(code) {
		var ast, scope, context, executionResult;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
						return scope.use(regeneratorRuntime.mark(function _callee() {
							return regeneratorRuntime.wrap(function _callee$(_context) {
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

var _contracts = require("../utils/contracts");

var _primitiveType = require("../types/primitive-type");

},{"../env/reference":197,"../types/primitive-type":383,"../utils/contracts":391}],240:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("isFinite", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
		var numberValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/native":393}],241:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("isNaN", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
		var numberValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/native":393}],242:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("parseInt", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value, radix) {
		var stringValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/native":393}],243:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var options = env.options;

	globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false });
	globalObject.define("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false });

	["parseFloat", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"].forEach(function (name) {
		globalObject.define(name, objectFactory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
			var stringValue;
			return regeneratorRuntime.wrap(function _callee$(_context) {
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
},{"../utils/native":393,"./global.eval":239,"./global.is-finite":240,"./global.is-nan":241,"./global.parse-int":242}],244:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

},{"../types/object-factory":381,"../types/primitive-type":383,"./array/":222,"./boolean/":225,"./console/":226,"./date/":230,"./error/":232,"./function/":238,"./globals":243,"./json/":245,"./math/":248,"./number/":249,"./object/":253,"./regex/":273,"./string/":277}],245:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

},{"./json.parse":246,"./json.stringify":247}],246:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var _marked = [deserialize].map(regeneratorRuntime.mark);

	function createReviver(reviver) {
		if (reviver && reviver.className === "Function") {
			return regeneratorRuntime.mark(function _callee(holder, key, value) {
				var args;
				return regeneratorRuntime.wrap(function _callee$(_context) {
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
		return regeneratorRuntime.wrap(function deserialize$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						valueType = (0, _contracts.getType)(value);
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

						if ((0, _contracts.isUndefined)(elementValue)) {
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
						_context2.t7 = regeneratorRuntime.keys(value);

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

						if (!(0, _contracts.isUndefined)(propValue)) {
							obj.defineOwnProperty(prop, { value: propValue, configurable: true, enumerable: true, writable: true });
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

	$target.define("parse", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2(str, reviver) {
		var stringValue, parsedObject, deserializedObject;
		return regeneratorRuntime.wrap(function _callee2$(_context3) {
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

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

},{"../../types/primitive-type":383,"../../utils/contracts":391,"../../utils/native":393}],247:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var _marked = [serialize, serializeObject, serializeArray, createReplacer, getSpacer].map(regeneratorRuntime.mark);

	var serializePrimitive = JSON.stringify;

	function serialize(stack, obj, replacer, gap, depth) {
		var jsonString, jsonResult;
		return regeneratorRuntime.wrap(function serialize$(_context) {
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
						_context.next = 8;
						return (0, _func.tryExecute)(obj, "toJSON");

					case 8:
						jsonString = _context.sent;

						if (!jsonString) {
							_context.next = 11;
							break;
						}

						return _context.abrupt("return", serializePrimitive(jsonString.value));

					case 11:
						if (!(stack.indexOf(obj) >= 0)) {
							_context.next = 13;
							break;
						}

						throw TypeError("Converting circular structure to JSON");

					case 13:

						depth++;
						stack.push(obj);

						jsonResult = undefined;

						if (!(obj.className === "Array")) {
							_context.next = 22;
							break;
						}

						_context.next = 19;
						return serializeArray(stack, obj, replacer);

					case 19:
						jsonResult = _context.sent;
						_context.next = 25;
						break;

					case 22:
						_context.next = 24;
						return serializeObject(stack, obj, replacer, gap, depth);

					case 24:
						jsonResult = _context.sent;

					case 25:

						depth--;
						stack.pop();
						return _context.abrupt("return", jsonResult);

					case 28:
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

		var indent = "\n" + gap.repeat(depth);
		var joinedValues = values.join(indent + ",");

		// remove indent on closing
		return indent + joinedValues + "\n" + gap.repeat(depth - 1);
	}

	function serializeObject(stack, obj, replacer, gap, depth) {
		var colon, values, value, prop;
		return regeneratorRuntime.wrap(function serializeObject$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						colon = gap ? ": " : ":";
						values = [];
						value = undefined;
						_context2.t0 = regeneratorRuntime.keys(obj.properties);

					case 4:
						if ((_context2.t1 = _context2.t0()).done) {
							_context2.next = 20;
							break;
						}

						prop = _context2.t1.value;

						if (!obj.properties[prop].enumerable) {
							_context2.next = 18;
							break;
						}

						_context2.next = 9;
						return replacer(obj, prop, obj.getValue(prop));

					case 9:
						value = _context2.sent;

						if (!(!(0, _contracts.isNullOrUndefined)(value) && !ignored[value.className])) {
							_context2.next = 18;
							break;
						}

						_context2.t2 = values;
						_context2.t3 = serializePrimitive(prop) + colon;
						_context2.next = 15;
						return serialize(stack, value, replacer, gap, depth);

					case 15:
						_context2.t4 = _context2.sent;
						_context2.t5 = _context2.t3 + _context2.t4;

						_context2.t2.push.call(_context2.t2, _context2.t5);

					case 18:
						_context2.next = 4;
						break;

					case 20:
						return _context2.abrupt("return", "{" + formatValues(values, gap, depth, gap, depth) + "}");

					case 21:
					case "end":
						return _context2.stop();
				}
			}
		}, _marked[1], this);
	}

	function serializeArray(stack, arr, replacer, gap, depth) {
		var length, values, i, value;
		return regeneratorRuntime.wrap(function serializeArray$(_context3) {
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
						if (!((0, _contracts.isNullOrUndefined)(value) || ignored[value.className])) {
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

		return regeneratorRuntime.wrap(function createReplacer$(_context7) {
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

						return _context7.abrupt("return", regeneratorRuntime.mark(function _callee(holder, key, value) {
							var args;
							return regeneratorRuntime.wrap(function _callee$(_context4) {
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

						return _context7.delegateYield(regeneratorRuntime.mark(function _callee3() {
							var arr, keys;
							return regeneratorRuntime.wrap(function _callee3$(_context6) {
								while (1) {
									switch (_context6.prev = _context6.next) {
										case 0:
											_context6.next = 2;
											return (0, _native.toArray)(replacer);

										case 2:
											arr = _context6.sent;
											return _context6.delegateYield((0, _async.map)(arr, regeneratorRuntime.mark(function _callee2(arg) {
												return regeneratorRuntime.wrap(function _callee2$(_context5) {
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

						if (!((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object")) {
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
		return regeneratorRuntime.wrap(function getSpacer$(_context8) {
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

						return _context8.abrupt("return", " ".repeat(count));

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

	$target.define("stringify", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee4(obj, replacer, spacer) {
		var stack;
		return regeneratorRuntime.wrap(function _callee4$(_context9) {
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

						if (!(0, _contracts.isUndefined)(obj)) {
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

var _primitiveType = require("../../types/primitive-type");

var _contracts = require("../../utils/contracts");

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _func = require("../../utils/func");

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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

},{"../../types/primitive-type":383,"../../utils/async":390,"../../utils/contracts":391,"../../utils/func":392,"../../utils/native":393}],248:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

},{"../../utils/native":393}],249:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

	var numberClass = objectFactory.createFunction(regeneratorRuntime.mark(function _callee(obj) {
		var numberValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return (0, _native.toPrimitive)(obj, "number");

					case 2:
						_context.t0 = _context.sent;
						numberValue = Number(_context.t0);

						if (!this.isNew) {
							_context.next = 6;
							break;
						}

						return _context.abrupt("return", (0, _native.primitiveToObject)(env, numberValue));

					case 6:
						return _context.abrupt("return", objectFactory.create("Number", numberValue));

					case 7:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), proto, { configurable: false, enumerable: false, writable: false });

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

},{"../../utils/contracts":391,"../../utils/native":393,"./number.to-fixed":250,"./number.to-string":251,"./number.value-of":252}],250:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toFixed", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(fractionDigits) {
		var digits;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/contracts":391,"../../utils/native":393}],251:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(radix) {
		var radixValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/contracts":391,"../../utils/native":393}],252:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsNotGeneric)(this.object, "Number", "Number.prototype.valueOf");
		return factory.createPrimitive(this.object.value == null ? 0 : this.object.value);
	}, 0, "Number.prototype.valueOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391}],253:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

				var objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				return objectWrapper;
			}

			if (value.isSymbol) {
				// should return a new symbol instance
				return objectFactory.create("Symbol", value.description);
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	}, proto, { configurable: false, enumerable: false, writable: false });

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

},{"../../types/object-type":382,"./object.create":255,"./object.define-properties":256,"./object.define-property":257,"./object.freeze":258,"./object.get-own-property-descriptor":259,"./object.get-own-property-names":260,"./object.get-prototype-of":261,"./object.has-own-property":262,"./object.is-extensible":263,"./object.is-frozen":264,"./object.is-prototype-of":265,"./object.is-sealed":266,"./object.keys":267,"./object.prevent-extensions":268,"./object.property-is-enumerable":269,"./object.seal":270,"./object.to-string":271,"./object.value-of":272}],254:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defineProperty = defineProperty;
exports.confirmObject = confirmObject;
exports.getOwnPropertyDescriptor = getOwnPropertyDescriptor;

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _primitiveType = require("../../types/primitive-type");

var _marked = [defineProperty, getOwnPropertyDescriptor].map(regeneratorRuntime.mark);

function getOptions(obj) {
	return obj[Symbol.for("env")].options;
}

function defineProperty(env, obj, key, descriptor) {
	var _this = this;

	var throwOnError = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
	var stringValue, options;
	return regeneratorRuntime.wrap(function defineProperty$(_context8) {
		while (1) switch (_context8.prev = _context8.next) {
			case 0:
				if ((0, _contracts.isObject)(descriptor)) {
					_context8.next = 5;
					break;
				}

				_context8.next = 3;
				return (0, _native.toString)(descriptor);

			case 3:
				stringValue = _context8.sent;
				throw TypeError("Property description must be an object: " + stringValue);

			case 5:
				options = Object.create(null);

				if (!descriptor) {
					_context8.next = 8;
					break;
				}

				return _context8.delegateYield(regeneratorRuntime.mark(function _callee7() {
					var hasValue, hasGetter, hasSetter, currentScope;
					return regeneratorRuntime.wrap(function _callee7$(_context7) {
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

									return _context7.delegateYield(regeneratorRuntime.mark(function _callee3() {
										var getter, stringValue;
										return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
														options.getter = regeneratorRuntime.mark(function _callee2() {
															var scope, thisArg;
															return regeneratorRuntime.wrap(function _callee2$(_context2) {
																while (1) {
																	switch (_context2.prev = _context2.next) {
																		case 0:
																			scope = env.setScope(currentScope);
																			thisArg = getter.isStrict() ? this : (0, _native.toObject)(this);
																			_context2.next = 4;
																			return scope.use(regeneratorRuntime.mark(function _callee() {
																				return regeneratorRuntime.wrap(function _callee$(_context) {
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

									return _context7.delegateYield(regeneratorRuntime.mark(function _callee6() {
										var setter, _stringValue;

										return regeneratorRuntime.wrap(function _callee6$(_context6) {
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
														options.setter = regeneratorRuntime.mark(function _callee5(value) {
															var scope, thisArg;
															return regeneratorRuntime.wrap(function _callee5$(_context5) {
																while (1) {
																	switch (_context5.prev = _context5.next) {
																		case 0:
																			scope = env.setScope(currentScope);
																			thisArg = setter.isStrict() ? this : (0, _native.toObject)(this);
																			_context5.next = 4;
																			return scope.use(regeneratorRuntime.mark(function _callee4() {
																				return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
				return _context8.abrupt("return", obj.defineOwnProperty(key, options, throwOnError, env));

			case 9:
			case "end":
				return _context8.stop();
		}
	}, _marked[0], this);
}

function confirmObject(obj, methodName) {
	if ((0, _contracts.isObject)(obj)) {
		return true;
	}

	if (getOptions(obj).ecmaVersion > 5) {
		return false;
	}

	throw TypeError(methodName + " called on non-object");
}

function getOwnPropertyDescriptor(env, target, propertyKey) {
	var key, descriptor, result;
	return regeneratorRuntime.wrap(function getOwnPropertyDescriptor$(_context9) {
		while (1) switch (_context9.prev = _context9.next) {
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
	}, _marked[1], this);
}

},{"../../types/primitive-type":383,"../../utils/contracts":391,"../../utils/native":393}],255:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("create", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(parent, descriptors) {
		var stringValue, obj, prop;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						_context.t0 = regeneratorRuntime.keys(descriptors.properties);

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

},{"../../utils/native":393,"./object-helpers":254}],256:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("defineProperties", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(obj, descriptors) {
		var prop;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsObject)(obj, "Object.defineProperties");
						(0, _contracts.assertArgIsNotNullOrUndefined)(descriptors);

						_context.t0 = regeneratorRuntime.keys(descriptors.properties);

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

},{"../../utils/contracts":391,"./object-helpers":254}],257:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("defineProperty", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(obj, propertyKey, descriptor) {
		var key;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/contracts":391,"../../utils/native":393,"./object-helpers":254}],258:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("freeze", factory.createBuiltInFunction(function (obj) {
		if ((0, _objectHelpers.confirmObject)(obj, "Object.freeze")) {
			obj.freeze();
		}

		return obj;
	}, 1, "Object.freeze"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":254}],259:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("getOwnPropertyDescriptor", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(obj, key) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsNotNullOrUndefined)(obj, "Object.getOwnPropertyDescriptor");
						(0, _objectHelpers.confirmObject)(obj, "Object.getOwnPropertyDescriptor");

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

},{"../../utils/contracts":391,"./object-helpers":254}],260:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../../utils/contracts":391}],261:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("getPrototypeOf", factory.createBuiltInFunction(function (obj) {
		if (!(0, _objectHelpers.confirmObject)(obj, "Object.getPrototypeOf")) {
			obj = (0, _native.toObject)(obj, true);
		}

		var objProto = obj.getPrototype();
		return objProto || _primitiveType.NULL;
	}, 1, "Object.getPrototypeOf"));
};

var _native = require("../../utils/native");

var _primitiveType = require("../../types/primitive-type");

var _objectHelpers = require("./object-helpers");

},{"../../types/primitive-type":383,"../../utils/native":393,"./object-helpers":254}],262:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("hasOwnProperty", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(key) {
		var k;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/contracts":391,"../../utils/native":393}],263:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("isExtensible", factory.createBuiltInFunction(function (obj) {
		if (!(0, _objectHelpers.confirmObject)(obj, "Object.isExtensible")) {
			return factory.createPrimitive(false);
		}

		return factory.createPrimitive(obj.isExtensible());
	}, 1, "Object.isExtensible"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":254}],264:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("isFrozen", factory.createBuiltInFunction(function (obj) {
		if (!(0, _objectHelpers.confirmObject)(obj, "Object.isFrozen")) {
			return factory.createPrimitive(true);
		}

		if (obj.isPrimitive) {
			return factory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				if (obj.properties[prop].writable || obj.properties[prop].configurable) {
					return factory.createPrimitive(false);
				}
			}
		}

		return factory.createPrimitive(!obj.extensible);
	}, 1, "Object.isFrozen"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":254}],265:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../../utils/contracts":391}],266:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("isSealed", factory.createBuiltInFunction(function (obj) {
		if (!(0, _objectHelpers.confirmObject)(obj, "Object.isSealed")) {
			return factory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				if (obj.properties[prop].configurable) {
					return factory.createPrimitive(false);
				}
			}
		}

		return factory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":254}],267:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../../utils/contracts":391}],268:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("preventExtensions", factory.createBuiltInFunction(function (obj) {
		if ((0, _objectHelpers.confirmObject)(obj, "Object.preventExtensions")) {
			obj.preventExtensions();
		}

		return obj;
	}, 1, "Object.preventExtensions"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":254}],269:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("propertyIsEnumerable", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(key) {
		var k, descriptor;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/contracts":391,"../../utils/native":393}],270:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("seal", factory.createBuiltInFunction(function (obj) {
		if ((0, _objectHelpers.confirmObject)(obj, "Object.seal")) {
			obj.seal();
		}

		return obj;
	}, 1, "Object.seal"));
};

var _objectHelpers = require("./object-helpers");

},{"./object-helpers":254}],271:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var toStringFunc = factory.createBuiltInFunction(function () {
		var className = this.object ? this.object.className : "Undefined";
		return factory.createPrimitive("[object " + className + "]");
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	$target.define("toString", toStringFunc);
	$target.define("toLocaleString", toStringFunc);
};

},{}],272:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		return (0, _native.toObject)(this.object, true);
	}, 0, "Object.prototype.valueOf"));
};

var _native = require("../../utils/native");

},{"../../utils/native":393}],273:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;

	var proto = objectFactory.createObject();
	proto.className = "RegExp";

	var regexClass = objectFactory.createFunction(regeneratorRuntime.mark(function _callee(pattern, flags) {
		var patternString;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(pattern && pattern.className === "RegExp")) {
							_context.next = 4;
							break;
						}

						if (!(0, _contracts.isUndefined)(flags)) {
							_context.next = 3;
							break;
						}

						return _context.abrupt("return", pattern);

					case 3:
						throw TypeError("Cannot supply flags when constructing one RegExp from another");

					case 4:
						if (!(0, _contracts.isUndefined)(pattern)) {
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

						if (!(0, _contracts.isUndefined)(flags)) {
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
	}), proto, { configurable: false, enumerable: false, writable: false });

	(0, _regex2.default)(proto, env, objectFactory);
	(0, _regex4.default)(proto, env, objectFactory);
	(0, _regex6.default)(proto, env, objectFactory);

	proto.define("compile", (0, _native.toNativeFunction)(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
	proto.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(0), writable: true });

	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, { value: objectFactory.createPrimitive(RegExp.prototype[name]) });
	});

	globalObject.define("RegExp", regexClass);
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _regex = require("./regex.exec");

var _regex2 = _interopRequireDefault(_regex);

var _regex3 = require("./regex.test");

var _regex4 = _interopRequireDefault(_regex3);

var _regex5 = require("./regex.to-string");

var _regex6 = _interopRequireDefault(_regex5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../utils/contracts":391,"../../utils/native":393,"./regex.exec":274,"./regex.test":275,"./regex.to-string":276}],274:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});

exports.default = function ($target, env, factory) {
		$target.define("exec", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(str) {
				var stringValue, match, arr, i, ln;
				return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../types/primitive-type":383,"../../utils/native":393}],275:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("test", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(str) {
		var stringValue, testValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../../utils/native":393}],276:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		return factory.createPrimitive(String(this.object.source));
	}, 0, "RegExp.prototype.toString"));
};

},{}],277:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (env) {
	var _marked = [getString].map(regeneratorRuntime.mark);

	var globalObject = env.global;
	var objectFactory = env.objectFactory;

	function getString(value, isNew) {
		return regeneratorRuntime.wrap(function getString$(_context) {
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
	proto.defineOwnProperty("length", { value: objectFactory.createPrimitive(0) });

	var stringClass = objectFactory.createFunction(regeneratorRuntime.mark(function _callee(value) {
		var stringValue;
		return regeneratorRuntime.wrap(function _callee$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return getString(value, this.isNew);

					case 2:
						stringValue = _context2.sent;

						if (!this.isNew) {
							_context2.next = 5;
							break;
						}

						return _context2.abrupt("return", (0, _native.primitiveToObject)(env, stringValue));

					case 5:
						return _context2.abrupt("return", objectFactory.createPrimitive(stringValue));

					case 6:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee, this);
	}), proto, { configurable: false, enumerable: false, writable: false });

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
		proto.define(name, objectFactory.createBuiltInFunction(regeneratorRuntime.mark(function _callee3() {
			var stringValue,
			    args,
			    _args4 = arguments;
			return regeneratorRuntime.wrap(function _callee3$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.next = 2;
							return (0, _native.toString)(this.object);

						case 2:
							stringValue = _context4.sent;
							return _context4.delegateYield((0, _async.map)(_args4, regeneratorRuntime.mark(function _callee2(arg) {
								return regeneratorRuntime.wrap(function _callee2$(_context3) {
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

},{"../../utils/async":390,"../../utils/native":393,"./string.concat":278,"./string.from-char-code":279,"./string.match":280,"./string.replace":281,"./string.search":282,"./string.slice":283,"./string.split":284,"./string.substring":285,"./string.to-string":286,"./string.trim":287,"./string.value-of":288}],278:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("concat", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var stringValue, values;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
						return (0, _async.map)(args, regeneratorRuntime.mark(function _callee(arg) {
							return regeneratorRuntime.wrap(function _callee$(_context) {
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
						return _context2.abrupt("return", factory.createPrimitive(values.join("")));

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

},{"../../utils/async":390,"../../utils/contracts":391,"../../utils/native":393}],279:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("fromCharCode", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2() {
		for (var _len = arguments.length, charCodes = Array(_len), _key = 0; _key < _len; _key++) {
			charCodes[_key] = arguments[_key];
		}

		var args;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						return _context2.delegateYield((0, _async.map)(charCodes, regeneratorRuntime.mark(function _callee(arg) {
							return regeneratorRuntime.wrap(function _callee$(_context) {
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
						return _context2.abrupt("return", factory.createPrimitive(String.fromCharCode.apply(null, args)));

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

},{"../../utils/async":390,"../../utils/native":393}],280:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("match", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(regex) {
		var matchKey, matcher, stringValue, actualRegex, match, _ret;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if ((0, _contracts.isNullOrUndefined)(regex)) {
							_context.next = 8;
							break;
						}

						matchKey = env.getSymbol("match");

						if (!matchKey) {
							_context.next = 8;
							break;
						}

						matcher = (0, _func.getMethod)(regex, matchKey);

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

						_ret = (function () {
							var matches = factory.createArray();

							match.forEach(function (value, index) {
								matches.setValue(index, factory.createPrimitive(value));
							});

							matches.setValue("index", factory.createPrimitive(match.index));
							matches.setValue("input", factory.createPrimitive(match.input));
							return {
								v: matches
							};
						})();

						if (!((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object")) {
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

var _func = require("../../utils/func");

var _contracts = require("../../utils/contracts");

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

},{"../../types/primitive-type":383,"../../utils/contracts":391,"../../utils/func":392,"../../utils/native":393}],281:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("replace", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(regexOrSubstr, substrOrFn) {
		var replaceKey, replaceMethod, stringValue, matcher, replacer;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.replace");

						replaceKey = env.getSymbol("replace");

						if (!(replaceKey && !(0, _contracts.isNullOrUndefined)(regexOrSubstr))) {
							_context.next = 8;
							break;
						}

						replaceMethod = (0, _func.getMethod)(regexOrSubstr, replaceKey);

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

						replacer = function () {
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
						return _context.abrupt("return", factory.createPrimitive(stringValue.replace(matcher, replacer)));

					case 28:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 2, "String.prototype.replace"));
};

var _contracts = require("../../utils/contracts");

var _primitiveType = require("../../types/primitive-type");

var _native = require("../../utils/native");

var _async = require("../../utils/async");

var _func = require("../../utils/func");

},{"../../types/primitive-type":383,"../../utils/async":390,"../../utils/contracts":391,"../../utils/func":392,"../../utils/native":393}],282:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("search", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(regexp) {
		var searchKey, searcher, stringValue, underlyingRegex;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if ((0, _contracts.isNullOrUndefined)(regexp)) {
							_context.next = 8;
							break;
						}

						searchKey = env.getSymbol("search");

						if (!searchKey) {
							_context.next = 8;
							break;
						}

						searcher = (0, _func.getMethod)(regexp, searchKey);

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
						return (0, _native.toString)(this.object);

					case 10:
						stringValue = _context.sent;
						underlyingRegex = undefined;

						if (!regexp) {
							_context.next = 22;
							break;
						}

						if (!(regexp.className === "RegExp")) {
							_context.next = 17;
							break;
						}

						underlyingRegex = regexp.source;
						_context.next = 22;
						break;

					case 17:
						_context.t0 = RegExp;
						_context.next = 20;
						return (0, _native.toString)(regexp);

					case 20:
						_context.t1 = _context.sent;
						underlyingRegex = new _context.t0(_context.t1);

					case 22:
						return _context.abrupt("return", factory.createPrimitive(stringValue.search(underlyingRegex)));

					case 23:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 1, "String.prototype.search"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

var _func = require("../../utils/func");

},{"../../utils/contracts":391,"../../utils/func":392,"../../utils/native":393}],283:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("slice", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(start, end) {
		var stringValue, startValue, endValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						if ((0, _contracts.isNullOrUndefined)(end)) {
							_context.next = 11;
							break;
						}

						_context.next = 10;
						return (0, _native.toInteger)(end);

					case 10:
						endValue = _context.sent;

					case 11:
						return _context.abrupt("return", factory.createPrimitive(stringValue.slice(startValue, endValue)));

					case 12:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 2, "String.prototype.slice"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391,"../../utils/native":393}],284:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("split", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(separator, limit) {
		var splitKey, splitter, stringValue, limitValue, arr, separatorValue, result;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if ((0, _contracts.isNullOrUndefined)(separator)) {
							_context.next = 8;
							break;
						}

						splitKey = env.getSymbol("split");

						if (!splitKey) {
							_context.next = 8;
							break;
						}

						splitter = (0, _func.getMethod)(separator, splitKey);

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

						if (!(0, _contracts.isUndefined)(limit)) {
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

						if (!(0, _contracts.isUndefined)(separator)) {
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

var _contracts = require("../../utils/contracts");

var _func = require("../../utils/func");

},{"../../utils/contracts":391,"../../utils/func":392,"../../utils/native":393}],285:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("substring", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(start, end) {
		var value, length;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						if (!(0, _contracts.isNullOrUndefined)(end)) {
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
						return _context.abrupt("return", factory.createPrimitive(value.substring(start, end)));

					case 16:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 2, "String.prototype.substring"));
};

var _native = require("../../utils/native");

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391,"../../utils/native":393}],286:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsNotGeneric)(this.object, "String", "String.prototype.toString");
		return factory.createPrimitive(this.object.toNative());
	}, 0, "String.prototype.toString"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391}],287:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("trim", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var stringValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.trim");

						_context.next = 3;
						return (0, _native.toString)(this.object);

					case 3:
						stringValue = _context.sent;
						return _context.abrupt("return", factory.createPrimitive(stringValue.trim()));

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

},{"../../utils/contracts":391,"../../utils/native":393}],288:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsNotGeneric)(this.object, "String", "String.prototype.valueOf");
		return factory.createPrimitive(this.object.value);
	}, 0, "String.prototype.valueOf"));
};

var _contracts = require("../../utils/contracts");

},{"../../utils/contracts":391}],289:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normalizeIndex = normalizeIndex;
exports.executeCallback = executeCallback;

var _primitiveType = require("../types/primitive-type");

var _marked = [executeCallback].map(regeneratorRuntime.mark);

function normalizeIndex(index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index, length);
}

function executeCallback(env, callback, entry, thisArg, arr) {
	var scope, args;
	return regeneratorRuntime.wrap(function executeCallback$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				if (!thisArg) {
					thisArg = callback.isStrict() ? _primitiveType.UNDEFINED : env.global;
				}

				scope = env.createExecutionScope(callback, thisArg);

				scope.init(callback.node.body);

				args = [entry.value, env.objectFactory.createPrimitive(entry.key), arr];
				_context.next = 6;
				return callback.call(thisArg, args) || _primitiveType.UNDEFINED;

			case 6:
				return _context.abrupt("return", _context.sent);

			case 7:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{"../types/primitive-type":383}],290:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("copyWithin", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, start, end) {
		var arr, length, to, from, final, count, dir;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						if (!(0, _contracts.isUndefined)(end)) {
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

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

var _arrayHelpers = require("./array-helpers");

},{"../utils/contracts":391,"../utils/native":393,"./array-helpers":289}],291:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("fill", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value, start, end) {
		var arr, length, k, final;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						arr = (0, _native.toObject)(this.object);
						_context.next = 3;
						return (0, _native.toLength)(arr);

					case 3:
						length = _context.sent;

						if (!start) {
							_context.next = 10;
							break;
						}

						_context.next = 7;
						return (0, _native.toInteger)(start);

					case 7:
						_context.t0 = _context.sent;
						_context.next = 11;
						break;

					case 10:
						_context.t0 = 0;

					case 11:
						k = _context.t0;

						if (!(0, _contracts.isUndefined)(end)) {
							_context.next = 16;
							break;
						}

						_context.t1 = length;
						_context.next = 19;
						break;

					case 16:
						_context.next = 18;
						return (0, _native.toInteger)(end);

					case 18:
						_context.t1 = _context.sent;

					case 19:
						final = _context.t1;

						k = (0, _arrayHelpers.normalizeIndex)(k, length);
						final = (0, _arrayHelpers.normalizeIndex)(final, length);

						while (k < final) {
							arr.setValue(k++, value);
						}

						return _context.abrupt("return", arr);

					case 24:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 1, "Array.prototype.fill"));
};

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

var _arrayHelpers = require("./array-helpers");

},{"../utils/contracts":391,"../utils/native":393,"./array-helpers":289}],292:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("findIndex", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(predicate, thisArg) {
		var length, i, propInfo, value, passed;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../types/primitive-type":383,"../utils/contracts":391,"../utils/native":393,"./array-helpers":289}],293:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("find", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(predicate, thisArg) {
		var arr, length, i, propInfo, value, passed;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../types/primitive-type":383,"../utils/contracts":391,"../utils/native":393,"./array-helpers":289}],294:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var _marked = [createArray].map(regeneratorRuntime.mark);

	var iteratorKey = env.getSymbol("iterator");

	function createArray(ctor, source) {
		var args, hasIterator, length;
		return regeneratorRuntime.wrap(function createArray$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(ctor === $target || !(0, _contracts.isConstructor)(ctor))) {
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

	$target.define("from", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2(items, mapFn, thisArg) {
		var mapper, arr, it, length, done, current, _it$next, value;

		return regeneratorRuntime.wrap(function _callee2$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						thisArg = thisArg || _primitiveType.UNDEFINED;

						mapper = undefined;

						if ((0, _contracts.isUndefined)(mapFn)) {
							mapper = function (v) {
								return v;
							};
						} else {
							(0, _contracts.assertIsFunction)(mapFn, "mapFn");
							mapper = regeneratorRuntime.mark(function _callee(v, i) {
								return regeneratorRuntime.wrap(function _callee$(_context2) {
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
								}, _callee, this);
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

						arr.defineOwnProperty(current.key, { value: value, configurable: true, enumerable: true, writable: true });
						// arr.setValue(current.key, value);
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
		}, _callee2, this, [[10, 23]]);
	}), 1, "Array.from"));
};

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../iterators/":367,"../types/primitive-type":383,"../utils/contracts":391,"../utils/native":393}],295:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var _marked = [getIterator].map(regeneratorRuntime.mark);

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
		return regeneratorRuntime.wrap(function getIterator$(_context) {
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

	var iteratorFunc = factory.createFunction(function () {
		var arr = (0, _native.toObject)(this.object, true);
		var it = getIterator(arr, "value");
		return factory.createIterator(it, iteratorProto);
	}, iteratorProto, { name: "Array.prototype.values" });

	$target.define("values", iteratorFunc);

	var iteratorKey = env.getSymbol("iterator");
	$target.define(iteratorKey, iteratorFunc);
};

var _primitiveType = require("../types/primitive-type");

var _async = require("../utils/async");

var _native = require("../utils/native");

},{"../types/primitive-type":383,"../utils/async":390,"../utils/native":393}],296:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"./array.copy-within":290,"./array.fill":291,"./array.find":293,"./array.find-index":292,"./array.from":294,"./array.iterator":295,"./array.of":297}],297:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("of", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
			items[_key] = arguments[_key];
		}

		var length, lengthValue, arr, i;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(this.object === $target || !(0, _contracts.isConstructor)(this.object))) {
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
							arr.defineOwnProperty(i, { value: items[i], configurable: true, enumerable: true, writable: true }, true);
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

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],298:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findIndex = findIndex;
function findIndex(obj, key) {
	var env = obj[Symbol.for("env")];

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

},{}],299:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
	(0, _math2.default)($global, env, objectFactory);
	(0, _proxy2.default)($global, env, objectFactory);
	(0, _regex2.default)($global, env, objectFactory);
	(0, _reflect2.default)($global, env, objectFactory);
	(0, _map2.default)($global, env, objectFactory);
	(0, _set2.default)($global, env, objectFactory);

	// setup class symbols
	var stringTagKey = env.getSymbol("toStringTag");
	var speciesKey = env.getSymbol("species");
	["Function", "Number", "Boolean", "Object", "Array", "String", "Date", "RegExp", "JSON", "Error", "Math", "Map", "Set"].forEach(function (typeName) {
		var ctor = $global.getValue(typeName);

		var speciesGetter = function speciesGetter() {
			return ctor;
		};
		var speciesGetterFunc = objectFactory.createGetter(speciesGetter, "[Symbol.species]");
		ctor.define(speciesKey, null, { getter: speciesGetter, get: speciesGetterFunc });

		if (ctor.owns("prototype")) {
			var proto = ctor.getValue("prototype");
			// proto.define(stringTagKey, objectFactory.createPrimitive(typeName), { writable: false });

			// prototypes in ES6 can't be coerced into primitives
			proto.className = "Object";
		} else {
			ctor.define(stringTagKey, objectFactory.createPrimitive(typeName), { writable: false });
		}
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

},{"../es5/":244,"./array":296,"./iterator":300,"./map":307,"./math":310,"./number":315,"./object":321,"./proxy":324,"./reflect":335,"./regex":340,"./set":347,"./string":353,"./symbol":357}],300:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var proto = factory.createObject();
	proto.define(env.getSymbol("iterator"), factory.createBuiltInFunction(function () {
		return this.object;
	}, 0, "[Symbol.iterator]"));

	// hack: attach to global though it'd be better if there was another way to access
	$target.define("%IteratorPrototype%", proto);
};

},{}],301:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("clear", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsMap)(this.object, "Map.prototype.clear");
		this.object.data = [];
	}, 0, "Map.prototype.clear"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],302:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391,"./collection-helpers":298}],303:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("forEach", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
		var data, index, entry, args;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../types/primitive-type":383,"../utils/contracts":391}],304:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../types/primitive-type":383,"../utils/contracts":391,"./collection-helpers":298}],305:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("has", factory.createBuiltInFunction(function (key) {
		(0, _contracts.assertIsMap)(this.object, "Map.prototype.has");
		return factory.createPrimitive((0, _collectionHelpers.findIndex)(this.object, key) >= 0);
	}, 1, "Map.prototype.has"));
};

var _contracts = require("../utils/contracts");

var _collectionHelpers = require("./collection-helpers");

},{"../utils/contracts":391,"./collection-helpers":298}],306:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var _marked = [getIterator].map(regeneratorRuntime.mark);

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
		return regeneratorRuntime.wrap(function getIterator$(_context) {
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

},{"../utils/contracts":391}],307:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($global, env, factory) {
	var proto = factory.createObject();

	var mapClass = factory.createFunction(regeneratorRuntime.mark(function _callee3(iterable) {
		var _this = this;

		var instance;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
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

						if ((0, _contracts.isNullOrUndefined)(iterable)) {
							_context3.next = 5;
							break;
						}

						return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
							var setter, it;
							return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											(0, _contracts.assertIsObject)(iterable, "Map");

											setter = instance.getValue("set");

											(0, _contracts.assertIsFunction)(setter, "set");

											it = _iterators2.default.getIterator(iterable);
											_context2.next = 6;
											return it.each(regeneratorRuntime.mark(function _callee(item) {
												var key, value;
												return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../iterators/":367,"../types/primitive-type":383,"../utils/contracts":391,"./map.clear":301,"./map.delete":302,"./map.for-each":303,"./map.get":304,"./map.has":305,"./map.iterator":306,"./map.set":308,"./map.size":309}],308:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("set", factory.createBuiltInFunction(function (key, value) {
		(0, _contracts.assertIsMap)(this.object, "Map.prototype.set");

		var index = (0, _collectionHelpers.findIndex)(this.object, key);
		if (index >= 0) {
			this.object.data[index].value = value;
			return this.object;
		}

		if ((0, _contracts.isNegativeZero)(key)) {
			key = factory.createPrimitive(+0);
		}

		this.object.data.push({ key: key, value: value });
		return this.object;
	}, 2, "Map.prototype.set"));
};

var _contracts = require("../utils/contracts");

var _collectionHelpers = require("./collection-helpers");

},{"../utils/contracts":391,"./collection-helpers":298}],309:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391}],310:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($global, env, factory) {
	var mathClass = $global.getValue("Math");

	["acosh", "asinh", "atanh", "cbrt", "clz32", "cosh", "expm1", "fround", "hypot", "imul", "log10", "log2", "log1p", "sign", "sinh", "tanh", "trunc"].forEach(function (name) {
		mathClass.define(name, (0, _native.toNativeFunction)(env, Math[name], "Math." + name));
	});
};

var _native = require("../utils/native");

},{"../utils/native":393}],311:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("isFinite", factory.createBuiltInFunction(function (value) {
		if (!(0, _contracts.isNumber)(value)) {
			return factory.createPrimitive(false);
		}

		var numberValue = value.toNative();
		if (isNaN(numberValue) || !isFinite(numberValue)) {
			return factory.createPrimitive(false);
		}

		return factory.createPrimitive(true);
	}, 1, "Number.isFinite"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],312:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("isInteger", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
		var numberValue, intValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if ((0, _contracts.isNumber)(value)) {
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

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

},{"../utils/contracts":391,"../utils/native":393}],313:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("isNaN", factory.createBuiltInFunction(function (value) {
		if (!(0, _contracts.isNumber)(value)) {
			return factory.createPrimitive(false);
		}

		return factory.createPrimitive(isNaN(value.toNative()));
	}, 1, "Number.isNaN"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],314:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
	var MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

	target.define("MAX_SAFE_INTEGER", factory.createPrimitive(MAX_SAFE_INTEGER), { configurable: false, writable: false });
	target.define("MIN_SAFE_INTEGER", factory.createPrimitive(MIN_SAFE_INTEGER), { configurable: false, writable: false });

	target.define("isSafeInteger", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
		var numberValue, intValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if ((0, _contracts.isNumber)(value)) {
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

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

},{"../utils/contracts":391,"../utils/native":393}],315:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (globalObject, env, factory) {
	var numberClass = globalObject.getValue("Number");

	(0, _number2.default)(numberClass, env, factory);
	(0, _number4.default)(numberClass, env, factory);
	(0, _number6.default)(numberClass, env, factory);
	(0, _number8.default)(numberClass, env, factory);
	(0, _number10.default)(numberClass, env, factory);
	(0, _number12.default)(numberClass, env, factory);

	var epsilonValue = factory.createPrimitive(Number.EPSILON || 2.220446049250313e-16);
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

},{"./number.is-finite":311,"./number.is-integer":312,"./number.is-nan":313,"./number.is-safe-integer":314,"./number.parse-float":316,"./number.parse-int":317}],316:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("parseFloat", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value) {
		var stringValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/native":393}],317:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("parseInt", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value, radix) {
		var stringValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/native":393}],318:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (objectClass, env, factory) {
	objectClass.define("assign", factory.createBuiltInFunction(function (target) {
		var to = (0, _native.toObject)(target, true);

		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}

		sources.forEach(function (next) {
			if (!(0, _contracts.isNullOrUndefined)(next)) {
				(function () {
					var source = (0, _native.toObject)(next);

					source.getOwnPropertyKeys().forEach(function (key) {
						var desc = source.getOwnProperty(key);
						if (desc && desc.enumerable) {
							if (!to.setValue(key, desc.getValue())) {
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

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391,"../utils/native":393}],319:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391}],320:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("is", factory.createBuiltInFunction(function (a, b) {
		var result = env.ops.areSame(a || _primitiveType.UNDEFINED, b || _primitiveType.UNDEFINED);
		return factory.createPrimitive(result);
	}, 2, "Object.is"));
};

var _primitiveType = require("../types/primitive-type");

},{"../types/primitive-type":383}],321:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391,"./object.assign":318,"./object.get-own-property-symbols":319,"./object.is":320,"./object.set-prototype-of":322,"./object.to-string":323}],322:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("setPrototypeOf", factory.createBuiltInFunction(function (target, proto) {
		(0, _contracts.assertIsNotNullOrUndefined)(target, "setPrototypeOf");

		if (!(0, _contracts.isObject)(proto) && !(0, _contracts.isNull)(proto)) {
			throw TypeError("Object prototype may only be an Object or null");
		}

		if ((0, _contracts.isObject)(target) && !target.setPrototype(proto)) {
			throw TypeError(target.className + " is not extensible");
		}

		return target;
	}, 2, "Object.setPrototypeOf"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],323:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	var stringTagKey = env.getSymbol("toStringTag");

	function objectToString(obj) {
		var tag = obj.className;

		if (!(0, _contracts.isNullOrUndefined)(obj)) {
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

},{"../utils/contracts":391}],324:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		}, 0, "revoke"));

		return obj;
	}, 2, "Proxy.revocable"));

	proxyClass.define("length", factory.createPrimitive(2), { writable: false });
	globalObject.define("Proxy", proxyClass);
};

},{}],325:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("apply", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, thisArg, argsArray) {
		var args, callee;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/contracts":391,"../utils/native":393}],326:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("construct", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, argsArray, newTarget) {
		var args, proto, obj;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsFunction)(target, "target");

						if (argsArray) {
							(0, _contracts.assertIsObject)(argsArray, "Reflect.construct");
						}

						_context.next = 4;
						return (0, _native.toArray)(argsArray);

					case 4:
						args = _context.sent;

						// let callee = target.node || target;
						proto = newTarget || target;
						obj = factory.createObject(proto);
						_context.next = 9;
						return target.construct(obj, args, proto);

					case 9:
						return _context.abrupt("return", _context.sent);

					case 10:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 2, "Reflect.construct"));
};

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

},{"../utils/contracts":391,"../utils/native":393}],327:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("defineProperty", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, propertyKey, descriptor) {
		var key;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../es5/object/object-helpers":254,"../utils/contracts":391,"../utils/native":393}],328:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("deleteProperty", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, propertyKey) {
		var key;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/contracts":391,"../utils/native":393}],329:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("enumerate", factory.createBuiltInFunction(function (target) {
		(0, _contracts.assertIsObject)(target, "Reflect.enumerate");
		return target.getIterator();
	}, 1, "Reflect.enumerate"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],330:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("getOwnPropertyDescriptor", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, propertyKey) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../es5/object/object-helpers":254,"../utils/contracts":391}],331:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("getPrototypeOf", factory.createBuiltInFunction(function (target) {
		(0, _contracts.assertIsObject)(target, "Reflect.getPrototypeOf");
		return target.getPrototype();
	}, 1, "Reflect.getPrototypeOf"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],332:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("get", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, propertyKey, receiver) {
		var key, property;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../types/primitive-type":383,"../utils/contracts":391,"../utils/native":393}],333:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("has", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, propertyKey) {
		var key;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/contracts":391,"../utils/native":393}],334:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("isExtensible", factory.createBuiltInFunction(function (target) {
		(0, _contracts.assertIsObject)(target, "Reflect.isExtensible");
		return factory.createPrimitive(target.isExtensible());
	}, 1, "Reflect.isExtensible"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],335:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"./reflect.apply":325,"./reflect.construct":326,"./reflect.define-property":327,"./reflect.delete-property":328,"./reflect.enumerate":329,"./reflect.get":332,"./reflect.get-own-property-descriptor":330,"./reflect.get-prototype-of":331,"./reflect.has":333,"./reflect.is-extensible":334,"./reflect.own-keys":336,"./reflect.prevent-extensions":337,"./reflect.set":339,"./reflect.set-prototype-of":338}],336:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391}],337:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("preventExtensions", factory.createBuiltInFunction(function (target) {
		(0, _contracts.assertIsObject)(target, "Reflect.preventExtensions");
		return factory.createPrimitive(target.preventExtensions());
	}, 1, "Reflect.preventExtensions"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],338:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../types/primitive-type":383,"../utils/contracts":391}],339:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("set", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(target, key, value, receiver) {
		var k;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsObject)(target, "Reflect.set");
						_context.next = 3;
						return (0, _native.toPropertyKey)(key);

					case 3:
						k = _context.sent;

						if ((0, _contracts.isUndefined)(receiver)) {
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

var _native = require("../utils/native");

},{"../utils/contracts":391,"../utils/native":393}],340:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (globalObject, env, factory) {
	var regexClass = globalObject.getValue("RegExp");
	var proto = regexClass.getValue("prototype");

	var replaceKey = env.getSymbol("replace");
	proto.define(replaceKey, factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(value, replaceValue) {
		var stringValue, replacer;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return (0, _native.toString)(value);

					case 2:
						stringValue = _context.sent;
						replacer = undefined;

						if (!(0, _contracts.isFunction)(replaceValue)) {
							_context.next = 8;
							break;
						}

						replacer = function () {
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
	proto.define(matchKey, factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2(value) {
		var stringValue, match, _ret;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

						_ret = (function () {
							var matches = factory.createArray();

							match.forEach(function (value, index) {
								matches.setValue(index, factory.createPrimitive(value));
							});

							matches.setValue("index", factory.createPrimitive(match.index));
							matches.setValue("input", factory.createPrimitive(match.input));
							return {
								v: matches
							};
						})();

						if (!((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object")) {
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
	proto.define(splitKey, factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee3(value, limit) {
		var stringValue, limitValue, arr, result;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return (0, _native.toString)(value);

					case 2:
						stringValue = _context3.sent;

						limit = limit && limit.getValue();

						if (!(0, _contracts.isUndefined)(limit)) {
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
	proto.define(searchKey, factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee4(value) {
		var stringValue;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
};

var _async = require("../utils/async");

var _primitiveType = require("../types/primitive-type");

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

},{"../types/primitive-type":383,"../utils/async":390,"../utils/contracts":391,"../utils/native":393}],341:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("add", factory.createBuiltInFunction(function (value) {
		(0, _contracts.assertIsSet)(this.object, "Set.prototype.add");

		if ((0, _contracts.isNegativeZero)(value)) {
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

},{"../utils/contracts":391}],342:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("clear", factory.createBuiltInFunction(function () {
		(0, _contracts.assertIsSet)(this.object, "Set.prototype.clear");
		this.object.data = [];
	}, 0, "Set.prototype.clear"));
};

var _contracts = require("../utils/contracts");

},{"../utils/contracts":391}],343:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391}],344:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	$target.define("forEach", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(callback, thisArg) {
		var data, index, entry, args;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../types/primitive-type":383,"../utils/contracts":391}],345:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391}],346:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($target, env, factory) {
	var _marked = [getIterator].map(regeneratorRuntime.mark);

	function getIterator(obj, kind) {
		var index, done, value;
		return regeneratorRuntime.wrap(function getIterator$(_context) {
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

},{"../utils/contracts":391}],347:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($global, env, factory) {
	var proto = factory.createObject();

	var setClass = factory.createFunction(regeneratorRuntime.mark(function _callee3(iterable) {
		var _this = this;

		var instance;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
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

						if ((0, _contracts.isNullOrUndefined)(iterable)) {
							_context3.next = 5;
							break;
						}

						return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
							var adder, it;
							return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											(0, _contracts.assertIsObject)(iterable, "Set");

											adder = proto.getValue("add");

											(0, _contracts.assertIsFunction)(adder, "add");

											it = _iterators2.default.getIterator(iterable);
											_context2.next = 6;
											return it.each(regeneratorRuntime.mark(function _callee(item) {
												return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../iterators":367,"../utils/contracts":391,"./set.add":341,"./set.clear":342,"./set.delete":343,"./set.for-each":344,"./set.has":345,"./set.iterator":346,"./set.size":348}],348:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"../utils/contracts":391}],349:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("codePointAt", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(pos) {
		var stringValue, position;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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
						return _context.abrupt("return", factory.createPrimitive(stringValue.codePointAt(position)));

					case 10:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}), 1, "String.prototype.codePointAt"));
};

var _primitiveType = require("../types/primitive-type");

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

},{"../types/primitive-type":383,"../utils/contracts":391,"../utils/native":393}],350:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("fromCodePoint", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2() {
		var _String;

		for (var _len = arguments.length, codePoints = Array(_len), _key = 0; _key < _len; _key++) {
			codePoints[_key] = arguments[_key];
		}

		var args;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return (0, _async.map)(codePoints, regeneratorRuntime.mark(function _callee(cp) {
							return regeneratorRuntime.wrap(function _callee$(_context) {
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
						return _context2.abrupt("return", factory.createPrimitive((_String = String).fromCodePoint.apply(_String, _toConsumableArray(args))));

					case 4:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}), 1, "String.fromCodePoint"));
};

var _async = require("../utils/async");

var _native = require("../utils/native");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

},{"../utils/async":390,"../utils/native":393}],351:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

	target.define("endsWith", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(searchString, endPosition) {
		var stringValue, searchValue, end;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

						if ((0, _contracts.isUndefined)(endPosition)) {
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

	target.define("startsWith", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2(searchString, startPosition) {
		var stringValue, searchValue, start;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

	target.define("includes", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee3(searchString, position) {
		var stringValue, searchValue, length, start, end, result;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
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

var _native = require("../utils/native");

},{"../utils/contracts":391,"../utils/native":393}],352:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	var _marked = [getIterator].map(regeneratorRuntime.mark);

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
		var length, done, index, value;
		return regeneratorRuntime.wrap(function getIterator$(_context) {
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
							value = factory.createPrimitive(stringValue[index++]);
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
	target.define(iteratorKey, factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var stringValue, it;
		return regeneratorRuntime.wrap(function _callee$(_context2) {
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
};

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

var _native = require("../utils/native");

},{"../types/primitive-type":383,"../utils/contracts":391,"../utils/native":393}],353:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{"./string.code-point-at":349,"./string.from-code-point":350,"./string.includes":351,"./string.iterator":352,"./string.normalize":354,"./string.raw":355,"./string.repeat":356}],354:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("normalize", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(form) {
		var stringValue, formValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _contracts.assertIsNotNullOrUndefined)(this.object, "String.prototype.normalize");
						_context.next = 3;
						return (0, _native.toString)(this.object);

					case 3:
						stringValue = _context.sent;
						formValue = "NFC";

						if ((0, _contracts.isUndefined)(form)) {
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

var _native = require("../utils/native");

},{"../utils/contracts":391,"../utils/native":393}],355:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("raw", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(template) {
		var numberOfSubstitutions,
		    cooked,
		    raw,
		    literalSegments,
		    stringElements,
		    nextIndex,
		    nextSegment,
		    next,
		    _args = arguments;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/native":393}],356:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target, env, factory) {
	target.define("repeat", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(count) {
		var stringValue, countValue, returnValue;
		return regeneratorRuntime.wrap(function _callee$(_context) {
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

},{"../utils/contracts":391,"../utils/native":393}],357:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (globalObject, env, factory) {
	var frozen = { configurable: false, enumerable: false, writable: false };

	var symbolClass = factory.createFunction(regeneratorRuntime.mark(function _callee(desc) {
		var descString;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!this.isNew) {
							_context.next = 2;
							break;
						}

						throw TypeError("Symbol is not a constructor");

					case 2:
						_context.next = 4;
						return (0, _native.toString)(desc);

					case 4:
						descString = _context.sent;
						return _context.abrupt("return", factory.create("Symbol", descString));

					case 6:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	symbolClass.define("for", factory.createBuiltInFunction(regeneratorRuntime.mark(function _callee2(key) {
		var keyString, instance;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

	var proto = symbolClass.getValue("prototype");
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

	globalObject.define("Symbol", symbolClass);
};

var _native = require("../utils/native");

var _symbolType = require("../types/symbol-type");

var _primitiveType = require("../types/primitive-type");

var _contracts = require("../utils/contracts");

},{"../types/primitive-type":383,"../types/symbol-type":388,"../utils/contracts":391,"../utils/native":393}],358:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.walker = walker;
exports.walk = walk;
exports.step = step;
exports.iterate = iterate;

var _traversalContext = require("./traversal-context");

var _visitors = require("./visitors");

var _marked = [walker, iterate].map(regeneratorRuntime.mark);

function walker(visitors, node, state, next) {
	var i, ln, visitor;
	return regeneratorRuntime.wrap(function walker$(_context) {
		while (1) switch (_context.prev = _context.next) {
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

function makeRules(rules, state) {
	var keys = Object.keys(rules);

	return function (node) {
		keys.forEach(function (key) {
			if (node.is(key)) {
				rules[key](node, state);
			}
		});
	};
}

function step(root, visitors, state, rules) {
	var v = (0, _visitors.makeVisitors)(visitors);
	var node = new _traversalContext.TraversalContext(root, null, makeRules(rules, state));

	function next(current, state) {
		if (typeof v[current.type] === "function") {
			return v[current.type](current, state, next);
		}
	};

	return next(node, state);
}

function iterate(node, filters) {
	var hash, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, current;

	return regeneratorRuntime.wrap(function iterate$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				hash = undefined;

				if (filters && Array.isArray(filters)) {
					hash = Object.create(null);
					filters.forEach(function (type) {
						return hash[type] = true;
					});
				}

				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				_context2.prev = 5;
				_iterator = walker(_visitors.defaultVisitors, new _traversalContext.TraversalContext(node))[Symbol.iterator]();

			case 7:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					_context2.next = 15;
					break;
				}

				current = _step.value;

				if (!(!hash || hash[current.type])) {
					_context2.next = 12;
					break;
				}

				_context2.next = 12;
				return current;

			case 12:
				_iteratorNormalCompletion = true;
				_context2.next = 7;
				break;

			case 15:
				_context2.next = 21;
				break;

			case 17:
				_context2.prev = 17;
				_context2.t0 = _context2["catch"](5);
				_didIteratorError = true;
				_iteratorError = _context2.t0;

			case 21:
				_context2.prev = 21;
				_context2.prev = 22;

				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}

			case 24:
				_context2.prev = 24;

				if (!_didIteratorError) {
					_context2.next = 27;
					break;
				}

				throw _iteratorError;

			case 27:
				return _context2.finish(24);

			case 28:
				return _context2.finish(21);

			case 29:
			case "end":
				return _context2.stop();
		}
	}, _marked[1], this, [[5, 17, 21, 29], [22,, 24, 28]]);
}

},{"./traversal-context":360,"./visitors":362}],359:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var interfaces = exports.interfaces = {
	"Block": ["BlockStatement", "Program", "IfStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "LabeledStatement", "WhileStatement", "WithStatement"],
	"Function": ["FunctionExpression", "FunctionDeclaration", "ArrowFunctionExpression"],
	"Declaration": ["FunctionDeclaration", "VariableDeclaration"],
	"Declarator": ["VariableDeclarator", "FunctionDeclaration"],
	"Statement": ["ExpressionStatement", "BlockStatement", "EmptyStatement", "DebuggerStatement", "WithStatement", "ReturnStatement", "LabeledStatement", "BreakStatement", "ContinueStatement", "IfStatement", "SwitchStatement", "SwitchCase"],
	"Loop": ["WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "ForOfStatement	"],
	"Expression": ["ThisExpression", "ArrayExpression", "ObjectExpression", "Property", "FunctionExpression", "UnaryExpression", "UpdateExpression", "BinaryExpression", "AssignmentExpression", "LogicalExpression", "MemberExpression", "ConditionalExpression", "CallExpression", "NewExpression", "SequenceExpression", "TemplateLiteral", "TaggedTemplateExpression"],
	"Directive": function Directive() {
		return this.type === "ExpressionStatement" && this.expression.type === "Literal" && typeof this.expression.value === "string";
	},
	"Scope": ["FunctionExpression", "FunctionDeclaration", "Program"]
};

},{}],360:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TraversalContext = undefined;

var _types = require("./types");

var _interfaces = require("./interfaces");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _marked = [_getDirectives].map(regeneratorRuntime.mark);

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function isNode(obj) {
	return obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && typeof obj.type === "string";
}

function assignChild(value, parent, onInit) {
	if (value) {
		if (isNode(value)) {
			return new TraversalContext(value, parent, onInit);
		}

		if (Array.isArray(value)) {
			return value.map(function (node) {
				return assignChild(node, parent, onInit);
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
	return regeneratorRuntime.wrap(function getDirectives$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

var TraversalContext = exports.TraversalContext = (function () {
	function TraversalContext(node, parent, onInit) {
		_classCallCheck(this, TraversalContext);

		if (node instanceof TraversalContext) {
			return node;
		}

		this._node = node;
		this._parent = parent;

		this.type = node.type;
		this.init(onInit);

		onInit(this);
	}

	_createClass(TraversalContext, [{
		key: "init",
		value: function init(onInit) {
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

			Object.keys(this._node).forEach(function (key) {
				return _this[key] = assignChild(_this._node[key], _this, onInit);
			});
		}
	}, {
		key: "is",
		value: function is(type) {
			if (type === this.type) {
				return true;
			}

			var key = "is" + type;
			if (typeof this[key] === "function") {
				return this[key]();
			}

			return false;
		}
	}, {
		key: "has",
		value: function has(key) {
			return this._node[key] != null;
		}
	}, {
		key: "getDirectives",
		value: function getDirectives() {
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
		}
	}, {
		key: "getBindings",
		value: function getBindings() {
			return this._bindings || [];
		}
	}, {
		key: "hasBindings",
		value: function hasBindings() {
			return this.getBindings().length > 0;
		}
	}, {
		key: "getParent",
		value: function getParent() {
			return this._parent;
		}
	}, {
		key: "isBlockScope",
		value: function isBlockScope() {
			return this.isLet() || this.isConst();
		}
	}, {
		key: "isStrict",
		value: function isStrict() {
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
	}]);

	return TraversalContext;
})();

;

// add helper methods
Object.keys(_interfaces.interfaces).forEach(function (key) {
	TraversalContext.prototype["is" + key] = typeof _interfaces.interfaces[key] === "function" ? _interfaces.interfaces[key] : function () {
		return _interfaces.interfaces[key].indexOf(this.type) >= 0;
	};
});

Object.keys(_types.types).forEach(function (key) {
	TraversalContext.prototype["is" + key] = function () {
		return this.type === key;
	};
});

["Var", "Const", "Let"].forEach(function (key) {
	var lowerCaseKey = key.toLowerCase();
	TraversalContext.prototype["is" + key] = function () {
		return this._parent._node.kind === lowerCaseKey;
	};
});

},{"./interfaces":359,"./types":361}],361:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
types.Class = types.ClassExpression = ["id", "superClass", "body"];
types.ClassBody = ["body"];
types.MethodDefinition = ["key", "value"];
types.MetaProperty = ["meta", "property"];

},{}],362:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultVisitors = undefined;
exports.defaultVisitor = defaultVisitor;
exports.makeVisitors = makeVisitors;

var _types = require("./types");

var _marked = [defaultVisitor].map(regeneratorRuntime.mark);

var noop = function noop() {};

function makeVisitorFromKeys(keys) {
	return regeneratorRuntime.mark(function visitor(node, state, w) {
		var i, ln, key;
		return regeneratorRuntime.wrap(function visitor$(_context) {
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

	return regeneratorRuntime.wrap(function defaultVisitor$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
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
	}, _marked[0], this);
}

var defaultVisitors = exports.defaultVisitors = {};
Object.keys(_types.types).forEach(function (key) {
	return defaultVisitors[key] = makeVisitorFromKeys(_types.types[key]);
});

function makeVisitors(visitors) {
	if (!visitors) {
		return defaultVisitors;
	}

	var target = Object.assign({}, defaultVisitors);

	Object.keys(visitors).forEach(function (key) {
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

},{"./types":361}],363:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ExecutionContext = undefined;

var _primitiveType = require("./types/primitive-type");

var _executionResult = require("./execution-result");

var _visitors = require("./visitors");

var _estree = require("./estree");

var _syntaxRules = require("./syntax-rules");

var _syntaxRules2 = _interopRequireDefault(_syntaxRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExecutionContext = exports.ExecutionContext = (function () {
	function ExecutionContext(env, obj, callee, isNew) {
		_classCallCheck(this, ExecutionContext);

		this.object = obj;
		this.callee = callee;
		this.env = env;
		this.isNew = !!isNew;

		this.label = "";
		this.value = null;
		this.strict = false;
	}

	_createClass(ExecutionContext, [{
		key: "execute",
		value: regeneratorRuntime.mark(function execute(node, callee) {
			var executionResult;
			return regeneratorRuntime.wrap(function execute$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							executionResult = undefined;
							_context.prev = 1;
							_context.next = 4;
							return (0, _estree.step)(node, _visitors.visitors, this, _syntaxRules2.default);

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
		})
	}, {
		key: "create",
		value: function create() {
			var context = new ExecutionContext(this.env, this.object, this.callee, this.isNew);
			context.value = this.value;
			return context;
		}
	}, {
		key: "createLabel",
		value: function createLabel(label) {
			var context = this.create();
			context.label = label;
			return context;
		}
	}, {
		key: "createLoop",
		value: function createLoop() {
			var context = this.create();
			context.label = this.label;
			context.loop = true;
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
		key: "raise",
		value: function raise(err) {
			var wrappedError = this.env.objectFactory.create("Error", err);
			var result = this.result(wrappedError);
			result.raised = result.exit = true;
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
			return new _executionResult.ExecutionResult(value, name, obj);
		}
	}, {
		key: "empty",
		value: function empty() {
			return this.result(_primitiveType.UNDEFINED);
		}
	}, {
		key: "abrupt",
		value: function abrupt(result, priorResult) {
			if (priorResult && !result.raised && !result.exit) {
				result.result = priorResult.result;
			}

			return result || this.empty();
		}
	}, {
		key: "shouldBreak",
		value: function shouldBreak(result) {
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
	}]);

	return ExecutionContext;
})();

;

},{"./estree":358,"./execution-result":364,"./syntax-rules":372,"./types/primitive-type":383,"./visitors":412}],364:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExecutionResult = exports.ExecutionResult = (function () {
	function ExecutionResult(value, name, obj) {
		_classCallCheck(this, ExecutionResult);

		this.result = value;
		this.name = name;
		this.object = obj;

		this.cancel = false;
		this.cancelled = false;
		this.exit = false;
		this.skip = false;
		this.raised = false;
	}

	_createClass(ExecutionResult, [{
		key: "isAbrupt",
		value: function isAbrupt() {
			return this.cancel || this.exit || this.raised || this.skip;
		}
	}]);

	return ExecutionResult;
})();

},{}],365:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sandbox = undefined;

var _env = require("./env");

var _async = require("./utils/async");

var _errorType = require("./types/error-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sandbox = exports.Sandbox = (function () {
	/**
  * Creates a new Sandbox
  * @class
  * @param {AST} ast - The abstract syntax tree to execute.
  * @param {Object} [options] The options to use with the sandbox.
  */

	function Sandbox(ast, options) {
		_classCallCheck(this, Sandbox);

		this.ast = ast;
		this.options = options || {};
	}

	/**
  * Executes the abstract syntax tree (AST) against the provided environment (or the default
  * environment if not provided)
  * @param {Environment} [env] - The environment to execute the AST against.
  * @returns {ObjectType|Promise} Returns a resolved value syncronously if possible, otherwise
  * returns a promise which will resolve to the result.
  */

	_createClass(Sandbox, [{
		key: "execute",
		value: function execute(env) {
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
		}

		/**
   * Executes the abstract syntax tree (AST) against the provided environment (or the default
   * environment if not provided)
   * @param {Environment} [env] - The environment to execute the AST against.
   * @returns {Promise} A promise that resolves with the result of the execution
   */

	}, {
		key: "resolve",
		value: function resolve(env) {
			// always return a promise
			return Promise.resolve(this.execute(env));
		}
	}]);

	return Sandbox;
})();

},{"./env":194,"./types/error-type":377,"./utils/async":390}],366:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _marked = [ascIterator, descIterator, yieldIndex].map(regeneratorRuntime.mark);

function ascIterator(source, lo, hi) {
	var index;
	return regeneratorRuntime.wrap(function ascIterator$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

function descIterator(source, lo, hi) {
	var index;
	return regeneratorRuntime.wrap(function descIterator$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				index = hi;

			case 1:
				if (!(index >= lo)) {
					_context2.next = 6;
					break;
				}

				return _context2.delegateYield(yieldIndex(source, index), "t0", 3);

			case 3:
				index--;
				_context2.next = 1;
				break;

			case 6:
			case "end":
				return _context2.stop();
		}
	}, _marked[1], this);
}

function yieldIndex(source, key) {
	var prop, value;
	return regeneratorRuntime.wrap(function yieldIndex$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
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
	}, _marked[2], this);
}

var ArrayIterator = {
	create: function create(obj, lo, hi, desc) {
		return (desc ? descIterator : ascIterator)(obj, lo, hi);
	}
};

exports.default = ArrayIterator;

},{}],367:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _contracts = require("../utils/contracts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPARE_ARRAY_DENSITY = 0.8;

function arrayIsSparse(arr, length) {
	var ownPropertyCount = Object.keys(arr.properties).length;

	// this is just to roughly estimate how dense the array is
	var density = (ownPropertyCount - 1) / length;
	return density < SPARE_ARRAY_DENSITY;
}

var iterate = {
	getIterator: function getIterator(obj) {
		var iteratorKey = _symbolType.SymbolType.getByKey("iterator");
		var iterator = obj.getProperty(iteratorKey);
		var fn = iterator && iterator.getValue();

		if (!(0, _contracts.isNullOrUndefined)(fn)) {
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

},{"../types/symbol-type":388,"../utils/async":390,"../utils/contracts":391,"../utils/native":393,"./array-iterator":366,"./iterable-iterator":368,"./sparse-iterator":369,"./string-iterator":370}],368:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _native = require("../utils/native");

var _async = require("../utils/async");

var _primitiveType = require("../types/primitive-type");

var _func = require("../utils/func");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IterableIterator = (function () {
	function IterableIterator(it) {
		_classCallCheck(this, IterableIterator);

		this.currentIndex = 0;
		this.iterator = it;
		this.advancer = it.getValue("next");
	}

	_createClass(IterableIterator, [{
		key: Symbol.iterator,
		value: function value() {
			return this;
		}
	}, {
		key: "next",
		value: function next() {
			var result = (0, _async.exhaust)(this.advancer.call(this.iterator));
			var value = { key: this.currentIndex++, value: _primitiveType.UNDEFINED };

			var valueProperty = result.getProperty("value");
			if (valueProperty) {
				value.value = valueProperty.getValue();
			}

			var done = (0, _native.toBoolean)(result.getValue("done"));
			return { done: done, value: value };
		}
	}, {
		key: "each",
		value: regeneratorRuntime.mark(function each(func) {
			var done, current, _next;

			return regeneratorRuntime.wrap(function each$(_context) {
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
		})
	}, {
		key: "return",
		value: function _return() {
			var returnFunc = (0, _func.getMethod)(this.iterator, "return");
			if (returnFunc) {
				return (0, _async.exhaust)(returnFunc.call(this.iterator));
			}

			return _primitiveType.UNDEFINED;
		}
	}], [{
		key: "create",
		value: function create(it) {
			return new IterableIterator(it);
		}
	}]);

	return IterableIterator;
})();

exports.default = IterableIterator;

},{"../types/primitive-type":383,"../utils/async":390,"../utils/func":392,"../utils/native":393}],369:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contracts = require("../utils/contracts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ASCENDING = function ASCENDING(a, b) {
	return a - b;
};
var DESCENDING = function DESCENDING(a, b) {
	return b - a;
};

var SparseIterator = (function () {
	function SparseIterator(obj, start, end, desc) {
		_classCallCheck(this, SparseIterator);

		this.object = obj;
		this.start = start;
		this.end = end;
		this.asc = !desc;
		this.version = 0;
	}

	_createClass(SparseIterator, [{
		key: Symbol.iterator,
		value: function value() {
			return this;
		}
	}, {
		key: "reset",
		value: function reset() {
			var _this = this;

			this.version = 0;
			this.prototypes = [];
			this.props = Object.create(null);
			this.keys = [];

			var current = this.object;

			while (current) {
				this.prototypes.push(current);
				this.version += current.version;

				current.getOwnPropertyKeys("String").filter(function (key) {
					return !(key in _this.props) && (0, _contracts.isInteger)(key);
				}).forEach(function (key) {
					var index = Number(key);

					if (index >= _this.start && index <= _this.end) {
						_this.props[key] = current.getProperty(key);
						_this.keys.push(index);
					}
				});
				// for (let name in current.properties) {
				// 	if (!(name in this.props) && isInteger(name)) {
				// 		let index = Number(name);

				// 		if (index >= this.start && index <= this.end) {
				// 			this.props[name] = current.getOwnProperty(name);
				// 			this.keys.push(index);
				// 		}
				// 	}
				// }

				current = current.getPrototype();
			}

			this.keys.sort(this.asc ? ASCENDING : DESCENDING);
		}
	}, {
		key: "next",
		value: function next() {
			if (!this.version || this.shouldReset()) {
				this.reset();
			}

			if (this.keys.length > 0) {
				var key = this.position = this.keys.shift();
				var value = this.props[key].getValue();

				return {
					value: { value: value, key: key },
					done: false
				};
			}

			return {
				done: true
			};
		}
	}, {
		key: "shouldReset",
		value: function shouldReset() {
			var currentVersion = this.prototypes.reduce(function (v, o) {
				return o.version + v;
			}, 0);
			if (currentVersion !== this.version) {
				if (this.asc) {
					this.start = this.position + 1;
				} else {
					this.end = this.position - 1;
				}

				return true;
			}

			return false;
		}
	}], [{
		key: "create",
		value: function create(arr, start, end, desc) {
			return new SparseIterator(arr, start, end, desc);
		}
	}]);

	return SparseIterator;
})();

exports.default = SparseIterator;

},{"../utils/contracts":391}],370:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _marked = [ascIterator, descIterator].map(regeneratorRuntime.mark);

function ascIterator(stringValue, start, length) {
	var key, value;
	return regeneratorRuntime.wrap(function ascIterator$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

function descIterator(stringValue, start) {
	var key, value;
	return regeneratorRuntime.wrap(function descIterator$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				key = start;

			case 1:
				if (!(key >= 0)) {
					_context2.next = 8;
					break;
				}

				value = stringValue.getValue(key);
				_context2.next = 5;
				return { value: value, key: key };

			case 5:
				key--;
				_context2.next = 1;
				break;

			case 8:
			case "end":
				return _context2.stop();
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

},{}],371:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isReserved = isReserved;
exports.isStrictReserved = isStrictReserved;
var keywords = {
	"es5": ["do", "if", "in", "for", "new", "try", "var", "case", "else", "enum", "null", "this", "true", "void", "with", "break", "catch", "class", "const", "false", "super", "throw", "while", "delete", "export", "import", "return", "switch", "typeof", "default", "extends", "finally", "continue", "debugger", "function", "instanceof"],

	"es5strict": ["implements", "let", "private", "public", "interface", "package", "protected", "static", "yield"]
};

function isReserved(name) {
	return keywords.es5.indexOf(name) >= 0;
}

function isStrictReserved(name) {
	return keywords.es5strict.indexOf(name) >= 0;
}

},{}],372:[function(require,module,exports){
"use strict";

var _rules;

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contracts = require("./utils/contracts");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validateAssignment(left, strict) {
	if (strict && left.isIdentifier()) {
		(0, _contracts.assertIsValidName)(left.name, true);
		(0, _contracts.assertIsValidIdentifier)(left.name, true);
	}
}

var rules = (_rules = {
	AssignmentExpression: function AssignmentExpression(node, context) {
		validateAssignment(node.left, node.isStrict() || context.env.isStrict());
	},
	CatchClause: function CatchClause(node, context) {
		(0, _contracts.assertIsValidName)(node.param.name, node.isStrict() || context.env.isStrict());
	},
	Declarator: function Declarator(node, context) {
		(0, _contracts.assertIsValidIdentifier)(node.id.name, node.isStrict() || context.env.isStrict());
	}
}, _defineProperty(_rules, "Function", function Function(node, context) {
	if (node.id) {
		(0, _contracts.assertIsValidName)(node.id.name, node.isStrict() || context.env.isStrict());
	}

	(0, _contracts.assertAreValidArguments)(node.params, node.isStrict() || context.env.isStrict());
}), _defineProperty(_rules, "Literal", function Literal(node, context) {
	if (node.raw && (node.isStrict() || context.env.isStrict())) {
		if ((0, _contracts.isOctalLiteral)(node.raw, node.value)) {
			throw SyntaxError("Octal literals are not allowed in strict mode.");
		}
	}
}), _defineProperty(_rules, "UpdateExpression", function UpdateExpression(node, context) {
	validateAssignment(node.argument, node.isStrict() || context.env.isStrict());
}), _defineProperty(_rules, "WithStatement", function WithStatement(node, context) {
	if (node.isStrict() || context.env.isStrict()) {
		throw SyntaxError("Strict mode code may not include a with statement");
	}
}), _rules);

exports.default = rules;

},{"./utils/contracts":391}],373:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ArgumentType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArgumentType = exports.ArgumentType = (function (_ObjectType) {
	_inherits(ArgumentType, _ObjectType);

	function ArgumentType(callee) {
		_classCallCheck(this, ArgumentType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArgumentType).call(this));

		_this.className = "Arguments";
		_this.parameterMap = Object.create(null);
		_this.callee = callee;
		return _this;
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

			return _get(Object.getPrototypeOf(ArgumentType.prototype), "getProperty", this).call(this, name);
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

			return _get(Object.getPrototypeOf(ArgumentType.prototype), "getOwnProperty", this).call(this, name);
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
})(_objectType.ObjectType);

},{"./object-type":382}],374:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ArrayType = undefined;

var _objectType = require("./object-type");

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

var _iterators = require("../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

var _async = require("../utils/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayType = exports.ArrayType = (function (_ObjectType) {
	_inherits(ArrayType, _ObjectType);

	function ArrayType() {
		_classCallCheck(this, ArrayType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayType).call(this));

		_this.className = "Array";
		return _this;
	}

	_createClass(ArrayType, [{
		key: "init",
		value: function init(env) {
			_get(Object.getPrototypeOf(ArrayType.prototype), "init", this).apply(this, arguments);
			this.defineOwnProperty("length", { value: env.objectFactory.createPrimitive(0), writable: true });
		}
	}, {
		key: "setValue",
		value: function setValue(name, value) {
			if (name === "length") {
				return this.setLength({ value: value }, false);
			}

			return _get(Object.getPrototypeOf(ArrayType.prototype), "setValue", this).apply(this, arguments);
		}
	}, {
		key: "setIndex",
		value: function setIndex(key, value, descriptor, throwOnError) {
			descriptor = descriptor || { value: value, configurable: true, enumerable: true, writable: true };

			var index = Number(key);
			var lengthProperty = this.getProperty("length");
			var lengthValue = lengthProperty.getValue().toNative();

			if (!lengthProperty.canSetValue() && index >= lengthValue || !_get(Object.getPrototypeOf(ArrayType.prototype), "defineOwnProperty", this).call(this, key, descriptor)) {

				if (throwOnError) {
					throw TypeError("Cannot define property: " + key + ", object is not extensible.");
				}

				return false;
			}

			if (index >= lengthValue) {
				var newLength = this[Symbol.for("env")].objectFactory.createPrimitive(index + 1);
				this.defineOwnProperty("length", { value: newLength });
			}

			return true;
		}
	}, {
		key: "setLength",
		value: function setLength(descriptor, throwOnError) {
			var env = this[Symbol.for("env")];

			var newLengthValue = (0, _async.exhaust)((0, _native.toUInt32)(descriptor.value));
			if (newLengthValue !== (0, _async.exhaust)((0, _native.toNumber)(descriptor.value))) {
				throw RangeError("Array length out of range");
			}

			descriptor.value = env.objectFactory.createPrimitive(newLengthValue);
			var newLength = descriptor.value;
			var currentLength = this.getValue("length");
			(0, _contracts.assertIsValidArrayLength)(newLength.toNative());

			if (newLength.toNative() >= currentLength.toNative()) {
				return _get(Object.getPrototypeOf(ArrayType.prototype), "defineOwnProperty", this).call(this, "length", descriptor, throwOnError);
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
			if (!_get(Object.getPrototypeOf(ArrayType.prototype), "defineOwnProperty", this).call(this, "length", descriptor, throwOnError)) {
				return false;
			}

			var succeeded = true;

			if (i > newLength.toNative()) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = _iterators2.default.reverse(this, i - 1, newLength.toNative())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var key = _step.value.key;

						if (!this.deleteProperty(key, false)) {
							newLength = env.objectFactory.createPrimitive(key + 1);
							this.defineOwnProperty("length", { value: newLength });
							succeeded = false;
							break;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			if (notWritable) {
				this.defineOwnProperty("length", { writable: false });
			}

			if (!succeeded && throwOnError) {
				throw TypeError("Cannot redefine property: length");
			}

			return succeeded;
		}
	}, {
		key: "defineOwnProperty",
		value: function defineOwnProperty(name, descriptor, throwOnError) {
			if ((0, _contracts.isInteger)(name) && (0, _contracts.isValidArrayLength)(Number(name) + 1) && !this.owns(name)) {
				return this.setIndex(name, null, descriptor, throwOnError);
			}

			if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
				return this.setLength(descriptor, throwOnError);
			}

			return _get(Object.getPrototypeOf(ArrayType.prototype), "defineOwnProperty", this).apply(this, arguments);
		}
	}, {
		key: "toNative",
		value: function toNative() {
			var arr = [];

			// this won't grab properties from the prototype - do we care?
			// it's an edge case but we may want to address it
			for (var index in this.properties) {
				if (this.properties[index].enumerable) {
					arr[Number(index)] = this.getValue(index).toNative();
				}
			}

			return arr;
		}
	}]);

	return ArrayType;
})(_objectType.ObjectType);

},{"../iterators":367,"../utils/async":390,"../utils/contracts":391,"../utils/native":393,"./object-type":382}],375:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CollectionType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectionType = exports.CollectionType = (function (_ObjectType) {
	_inherits(CollectionType, _ObjectType);

	function CollectionType(className) {
		_classCallCheck(this, CollectionType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CollectionType).call(this));

		_this.className = className;
		_this.data = [];
		return _this;
	}

	return CollectionType;
})(_objectType.ObjectType);

},{"./object-type":382}],376:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DateType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateType = exports.DateType = (function (_ObjectType) {
	_inherits(DateType, _ObjectType);

	function DateType(value) {
		_classCallCheck(this, DateType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateType).call(this));

		_this.value = value;
		_this.type = "object";
		_this.className = "Date";

		// 11.6.1 Note 1
		// All native ECMAScript objects except Date objects handle the absence of a hint as if the hint
		// Number were given; Date objects handle the absence of a hint as if the hint String were given.
		_this.primitiveHint = "string";
		return _this;
	}

	_createClass(DateType, [{
		key: "toNative",
		value: function toNative() {
			return this.value;
		}
	}]);

	return DateType;
})(_objectType.ObjectType);

},{"./object-type":382}],377:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ErrorType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorType = exports.ErrorType = (function (_ObjectType) {
	_inherits(ErrorType, _ObjectType);

	function ErrorType(source) {
		_classCallCheck(this, ErrorType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorType).call(this));

		_this.source = source;
		_this.className = "Error";
		return _this;
	}

	_createClass(ErrorType, [{
		key: "toNative",
		value: function toNative() {
			return this.source;
		}
	}]);

	return ErrorType;
})(_objectType.ObjectType);

},{"./object-type":382}],378:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FunctionType = undefined;

var _objectType = require("./object-type");

var _propertyDescriptor = require("./property-descriptor");

var _primitiveType = require("./primitive-type");

var _contracts = require("../utils/contracts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getParameterLength(params) {
	for (var i = 0, ln = params.length; i < ln; i++) {
		// parameter length should only include the first "Formal" parameters
		if (!params[i].isIdentifier()) {
			return i;
		}
	}

	return params.length;
}

var FunctionType = exports.FunctionType = (function (_ObjectType) {
	_inherits(FunctionType, _ObjectType);

	function FunctionType(node) {
		_classCallCheck(this, FunctionType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionType).call(this));

		_this.type = "function";
		_this.className = "Function";
		_this.native = false;
		_this.node = node;

		_this.arrow = node && node.isArrowFunctionExpression();
		_this.canConstruct = !_this.arrow;

		_this.boundScope = null;
		_this.boundThis = null;
		return _this;
	}

	_createClass(FunctionType, [{
		key: "init",
		value: function init(env, proto, descriptor, strict) {
			_get(Object.getPrototypeOf(FunctionType.prototype), "init", this).apply(this, arguments);

			if (strict !== undefined) {
				this.strict = strict;
			}

			// set length property from the number of parameters
			this.defineOwnProperty("length", { value: env.objectFactory.createPrimitive(getParameterLength(this.node.params)) });

			if (!this.arrow) {
				// functions have a prototype
				proto = proto || env.objectFactory.createObject();
				this.defineOwnProperty("prototype", { value: proto, writable: true });

				// set the contructor property as an instance of itself
				proto.properties.constructor = new _propertyDescriptor.PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });
			}

			this.addPoison();
		}
	}, {
		key: "addPoison",
		value: function addPoison() {
			var env = this[Symbol.for("env")];
			if (env.options.ecmaVersion > 5) {
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
		}
	}, {
		key: "call",
		value: regeneratorRuntime.mark(function call(thisArg, args, callee, isNew) {
			var self, env, scope;
			return regeneratorRuntime.wrap(function call$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							self = this;
							env = this[Symbol.for("env")];

							callee = callee || this;
							scope = env.createExecutionScope(this, thisArg);
							_context2.next = 6;
							return scope.loadArgs(this.node.params, args || [], this);

						case 6:
							scope.init(this.node);

							if (this.node.id) {
								env.createVariable(this.node.id.name).setValue(this);
							}

							_context2.next = 10;
							return scope.use(regeneratorRuntime.mark(function _callee() {
								var executionResult, shouldReturn;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return env.createExecutionContext(thisArg, callee, isNew).execute(self.node.body, callee);

											case 2:
												executionResult = _context.sent;
												shouldReturn = self.arrow || executionResult && executionResult.exit;

												if (!(shouldReturn && executionResult.result)) {
													_context.next = 6;
													break;
												}

												return _context.abrupt("return", executionResult.result);

											case 6:
												return _context.abrupt("return", _primitiveType.UNDEFINED);

											case 7:
											case "end":
												return _context.stop();
										}
									}
								}, _callee, this);
							}));

						case 10:
							return _context2.abrupt("return", _context2.sent);

						case 11:
						case "end":
							return _context2.stop();
					}
				}
			}, call, this);
		})
	}, {
		key: "construct",
		value: regeneratorRuntime.mark(function construct(thisArg, args, callee) {
			var result;
			return regeneratorRuntime.wrap(function construct$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (!thisArg || thisArg === this) {
								thisArg = this[Symbol.for("env")].objectFactory.createObject(this);
							}

							_context3.next = 3;
							return this.call(thisArg, args || [], callee, true);

						case 3:
							result = _context3.sent;

							if (!(result && !result.isPrimitive)) {
								_context3.next = 6;
								break;
							}

							return _context3.abrupt("return", result);

						case 6:
							return _context3.abrupt("return", thisArg);

						case 7:
						case "end":
							return _context3.stop();
					}
				}
			}, construct, this);
		})
	}, {
		key: "bindThis",
		value: function bindThis(thisArg) {
			this.boundThis = this.boundThis || thisArg;
		}
	}, {
		key: "bindScope",
		value: function bindScope(scope) {
			this.boundScope = scope;
		}
	}, {
		key: "isStrict",
		value: function isStrict() {
			if ("strict" in this) {
				return this.strict;
			}

			if (this.native) {
				return false;
			}

			return this.node.body.isStrict();
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

			var proto = this.getValue("prototype");
			if ((0, _contracts.isNullOrUndefined)(proto) || !(0, _contracts.isObject)(proto)) {
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
		}
	}, {
		key: "toNative",
		value: function toNative() {
			return undefined;
		}
	}]);

	return FunctionType;
})(_objectType.ObjectType);

},{"../utils/contracts":391,"./object-type":382,"./primitive-type":383,"./property-descriptor":384}],379:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.IteratorType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IteratorType = exports.IteratorType = (function (_ObjectType) {
	_inherits(IteratorType, _ObjectType);

	function IteratorType(iterable) {
		var kind = arguments.length <= 1 || arguments[1] === undefined ? "key+value" : arguments[1];

		_classCallCheck(this, IteratorType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IteratorType).call(this));

		_this.iterable = iterable;
		_this.position = 0;
		_this.className = "Iterator";
		_this.kind = kind;
		return _this;
	}

	_createClass(IteratorType, [{
		key: "init",
		value: function init(env, proto) {
			_get(Object.getPrototypeOf(IteratorType.prototype), "init", this).apply(this, arguments);

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
			// let factory = env.objectFactory;

			// if (!proto) {
			// 	proto = factory.createObject();
			// 	proto.className = "[Symbol.iterator]";
			// }

			// let iteratorKey = env.getSymbol("iterator");
			// if (iteratorKey) {
			// 	proto.define(iteratorKey, factory.createBuiltInFunction(function () {
			// 		return this.object;
			// 	}));
			// }

			// if (!proto.has("next")) {
			// 	proto.define("next", factory.createBuiltInFunction(function () {
			// 		let result = this.object.advance();
			// 		if (result.value) {
			// 			return result.value;
			// 		}

			// 		return factory.createIteratorResult({done: true});
			// 	}));
			// }

			this.setPrototype(proto);
		}
	}, {
		key: "advance",
		value: function advance() {
			return this.iterable.next();
		}
	}]);

	return IteratorType;
})(_objectType.ObjectType);

},{"./object-type":382}],380:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NativeFunctionType = undefined;

var _functionType = require("./function-type");

var _propertyDescriptor = require("./property-descriptor");

var _primitiveType = require("./primitive-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NativeFunctionType = exports.NativeFunctionType = (function (_FunctionType) {
	_inherits(NativeFunctionType, _FunctionType);

	function NativeFunctionType(fn) {
		_classCallCheck(this, NativeFunctionType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NativeFunctionType).call(this));

		_this.type = "function";
		_this.native = true;
		_this.nativeFunction = fn;
		return _this;
	}

	_createClass(NativeFunctionType, [{
		key: "init",
		value: function init(env, proto, descriptor) {
			this[Symbol.for("env")] = env;

			var length = this.nativeFunction.length;
			if ("nativeLength" in this.nativeFunction) {
				length = this.nativeFunction.nativeLength;
			}

			if ("strict" in this.nativeFunction) {
				this.strict = this.nativeFunction.strict;
			}

			this.defineOwnProperty("length", {
				value: env.objectFactory.createPrimitive(length),
				configurable: false,
				enumerable: false,
				writable: false
			});

			if (proto !== null) {
				proto = proto || env.objectFactory.createObject();
				proto.properties.constructor = new _propertyDescriptor.PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });

				descriptor = descriptor || { configurable: false, enumerable: false, writable: true };
				var protoDescriptor = {
					value: proto,
					configurable: descriptor.configurable,
					enumerable: descriptor.enumerable,
					writable: descriptor.writable
				};

				this.defineOwnProperty("prototype", protoDescriptor);
			}

			this.addPoison();
		}
	}, {
		key: "call",
		value: regeneratorRuntime.mark(function call(thisArg, args, callee) {
			var env, self, scope;
			return regeneratorRuntime.wrap(function call$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							callee = callee || this;
							env = this[Symbol.for("env")];

							if (!thisArg) {
								if (this.strict || env.isStrict()) {
									thisArg = _primitiveType.UNDEFINED;
								} else {
									thisArg = env.global;
								}
							}

							self = this;
							scope = env.createExecutionScope(this, thisArg);
							_context2.next = 7;
							return scope.use(regeneratorRuntime.mark(function _callee() {
								return regeneratorRuntime.wrap(function _callee$(_context) {
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

						case 7:
							return _context2.abrupt("return", _context2.sent);

						case 8:
						case "end":
							return _context2.stop();
					}
				}
			}, call, this);
		})
	}, {
		key: "construct",
		value: regeneratorRuntime.mark(function construct(thisArg, args) {
			var self, env, scope;
			return regeneratorRuntime.wrap(function construct$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							self = this;
							env = this[Symbol.for("env")];
							scope = env.createExecutionScope(this, thisArg);
							_context4.next = 5;
							return scope.use(regeneratorRuntime.mark(function _callee2() {
								return regeneratorRuntime.wrap(function _callee2$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												_context3.next = 2;
												return self.nativeFunction.apply(env.createExecutionContext(thisArg, self, true), args || []);

											case 2:
												return _context3.abrupt("return", _context3.sent);

											case 3:
											case "end":
												return _context3.stop();
										}
									}
								}, _callee2, this);
							}));

						case 5:
							return _context4.abrupt("return", _context4.sent);

						case 6:
						case "end":
							return _context4.stop();
					}
				}
			}, construct, this);
		})
	}]);

	return NativeFunctionType;
})(_functionType.FunctionType);

},{"./function-type":378,"./primitive-type":383,"./property-descriptor":384}],381:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ObjectFactory = undefined;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var orphans = Object.create(null);
var functionNameMatcher = /([^.]+(?:\[Symbol\.\w+\])?)$/;

function setOrphans(scope) {
	var _loop = function _loop(typeName) {
		var parent = scope.getValue(typeName);
		if (parent) {
			orphans[typeName].forEach(function (child) {
				child.setPrototype(parent.getValue("prototype"));
			});

			delete orphans[typeName];
		}
	};

	for (var typeName in orphans) {
		_loop(typeName);
	}

	orphans = Object.create(null);
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

var ObjectFactory = exports.ObjectFactory = (function () {
	function ObjectFactory(env) {
		_classCallCheck(this, ObjectFactory);

		this.env = env;
		this.options = env.options;
		this.ecmaVersion = env.options.ecmaVersion || 5;
		this.initialized = false;
	}

	_createClass(ObjectFactory, [{
		key: "init",
		value: function init() {
			setOrphans(this.env);
			this.initialized = true;
		}

		/**
   * Creates a primitive object based on the provided native value.
   * @param {any} value - The primitive value.
   * @returns {ObjectType} The primitive instance.
   */

	}, {
		key: "createPrimitive",
		value: function createPrimitive(value) {
			return this.create((0, _contracts.getType)(value), value);
		}

		/**
   * Creates an object based on the type specified. For a primitive type the second
   * parameter is used as the objects underlying value.
   * @param {String} typeName - The name of the object to create.
   * @param {any} [value] - The primitive value.
   * @returns {ObjectType} The new instance.
   */

	}, {
		key: "create",
		value: function create(typeName, value) {
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
					instance = new _stringType.StringType(value);
					break;

				case "Number":
				case "Boolean":
					instance = new _primitiveType.PrimitiveType(value);
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
							instance.defineOwnProperty("message", createDataPropertyDescriptor(message, { enumerable: false }));
						}
					}

					break;

				default:
					throw Error("Not a primitive: " + value);
			}

			instance.init(this.env);
			setProto(typeName, instance, this);
			return instance;
		}

		/**
   * Creates an array object.
   * @param {ObjectType[]} [elements] - If provided, the elements will be added to the new array.
   * @returns {ArrayType} The array instance.
   */

	}, {
		key: "createArray",
		value: function createArray(elements) {
			var instance = this.create("Array");

			if (elements) {
				for (var i = 0, ln = elements.length; i < ln; i++) {
					instance.setIndex(i, elements[i]);
				}
			}

			return instance;
		}

		/**
   * Creates an object.
   * @param {ObjectType} [proto] - The prototype to use with the new object. If no value is provided
   * the Object prototype will be used. If `null` is passed in, no prototype will be assigned to the
   * new object.
   * @returns {ObjectType} The object instance.
   */

	}, {
		key: "createObject",
		value: function createObject(proto) {
			var instance = new _objectType.ObjectType();

			if (proto !== null) {
				if (proto) {
					instance.setPrototype(proto.getValue("prototype"));
				} else {
					setProto("Object", instance, this);
				}
			}

			instance.init(this.env);
			return instance;
		}
	}, {
		key: "createProxy",
		value: function createProxy(target, handler) {
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
		}
	}, {
		key: "createArguments",
		value: function createArguments(args, callee, strict) {
			var instance = new _argumentType.ArgumentType();
			var objectClass = this.env.global.getValue("Object");

			instance.init(this.env, objectClass, objectClass.getPrototype());
			instance.setPrototype(objectClass.getValue("prototype"));

			if (strict) {
				var thrower = this.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
				instance.defineOwnProperty("callee", thrower);
				instance.defineOwnProperty("caller", thrower);
			} else {
				instance.defineOwnProperty("callee", {
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
		}
	}, {
		key: "createIterator",
		value: function createIterator(iterable, proto) {
			// let self = this;
			var instance = new _iteratorType.IteratorType(iterable);

			// if (!proto) {
			// 	proto = this.createObject();
			// 	proto.className = "[Symbol.iterator]";
			// }

			// if (!proto.has("next")) {
			// 	proto.define("next", this.createBuiltInFunction(function () {
			// 		let result = this.object.advance();
			// 		if (result.value) {
			// 			return result.value;
			// 		}

			// 		return self.createIteratorResult({done: true});
			// 	}));
			// }

			// let iteratorKey = SymbolType.getByKey("iterator");
			// if (!instance.has(iteratorKey)) {
			// 	instance.define(iteratorKey, this.createBuiltInFunction(function () {
			// 		return instance;
			// 	}));
			// }

			// instance.setPrototype(proto);
			instance.init(this.env, proto);
			return instance;
		}
	}, {
		key: "createIteratorResult",
		value: function createIteratorResult(_ref2) {
			var value = _ref2.value;
			var _ref2$done = _ref2.done;
			var done = _ref2$done === undefined ? false : _ref2$done;

			var result = this.createObject();
			result.defineOwnProperty("done", { value: this.createPrimitive(done) });
			result.defineOwnProperty("value", { value: value || _primitiveType.UNDEFINED });
			return result;
		}
	}, {
		key: "createFromSpeciesOrDefault",
		value: regeneratorRuntime.mark(function createFromSpeciesOrDefault(obj, defaultCtor) {
			var speciesKey, ctor, species;
			return regeneratorRuntime.wrap(function createFromSpeciesOrDefault$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							speciesKey = _symbolType.SymbolType.getByKey("species");

							if (!speciesKey) {
								_context.next = 9;
								break;
							}

							ctor = obj.getValue("constructor");

							if (!(ctor && ctor !== _primitiveType.NULL && ctor !== _primitiveType.UNDEFINED)) {
								_context.next = 9;
								break;
							}

							species = ctor.getValue(speciesKey);

							if (!species) {
								_context.next = 9;
								break;
							}

							_context.next = 8;
							return species.construct();

						case 8:
							return _context.abrupt("return", _context.sent);

						case 9:
							_context.next = 11;
							return defaultCtor.construct();

						case 11:
							return _context.abrupt("return", _context.sent);

						case 12:
						case "end":
							return _context.stop();
					}
				}
			}, createFromSpeciesOrDefault, this);
		})

		/**
   * Creates a function instance.
   * @param {AST|Function} fnOrNode - The AST or function to be used when the function is called.
   * @param {ObjectType} [proto] - The prototype to use for the function. If no object is provided
   * an empty object is used.
   * @param {Object} [options] - Property values to be used for the prototype.
   * @returns {FunctionType} The function instance.
   */

	}, {
		key: "createFunction",
		value: function createFunction(fnOrNode, proto) {
			var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			var _ref3$configurable = _ref3.configurable;
			var configurable = _ref3$configurable === undefined ? false : _ref3$configurable;
			var _ref3$enumerable = _ref3.enumerable;
			var enumerable = _ref3$enumerable === undefined ? false : _ref3$enumerable;
			var _ref3$writable = _ref3.writable;
			var writable = _ref3$writable === undefined ? true : _ref3$writable;
			var _ref3$strict = _ref3.strict;
			var strict = _ref3$strict === undefined ? false : _ref3$strict;
			var name = _ref3.name;

			var instance = undefined;

			if (typeof fnOrNode === "function") {
				instance = new _nativeFunctionType.NativeFunctionType(fnOrNode);
			} else {
				instance = new _functionType.FunctionType(fnOrNode);
			}

			instance.init(this.env, proto, { configurable: configurable, enumerable: enumerable, writable: writable }, strict);
			instance.name = name || "";

			if (name) {
				instance.defineOwnProperty("name", { value: this.createPrimitive(name), configurable: true }, true);
			}

			setProto("Function", instance, this);
			return instance;
		}
	}, {
		key: "createGetter",
		value: function createGetter(func, key) {
			return this.createBuiltInFunction(func, 0, "get " + key);
		}
	}, {
		key: "createSetter",
		value: function createSetter(func, key) {
			return this.createBuiltInFunction(func, 1, "set " + key);
		}

		/**
   * Creates a function with no prototype that cannot be instantiated.
   * @param {Function} func - The underlying function.
   * @param {Number} length - The length property of the function.
   * @param {String} funcName - The name of the function.
   * @returns {NativeFunctionType} The function instance.
   */

	}, {
		key: "createBuiltInFunction",
		value: function createBuiltInFunction(func, length, funcName) {
			var instance = new _nativeFunctionType.NativeFunctionType(function () {
				if (this.isNew) {
					throw TypeError(funcName + " is not a constructor");
				}

				return func.apply(this, arguments);
			});

			setProto("Function", instance, this);
			instance[Symbol.for("env")] = this.env;
			instance.builtIn = true;
			instance.canConstruct = false;
			instance.defineOwnProperty("length", { value: this.createPrimitive(length), configurable: this.ecmaVersion > 5 });

			var match = functionNameMatcher.exec(funcName);
			var name = match && match[1] || funcName;

			instance.defineOwnProperty("name", { value: this.createPrimitive(name), configurable: true }, true, this.env);

			return instance;
		}
	}, {
		key: "createThrower",
		value: function createThrower(message, thrower) {
			this.throwers = this.throwers || Object.create(null);
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
	}]);

	return ObjectFactory;
})();

},{"../utils/contracts":391,"./argument-type":373,"./array-type":374,"./collection-type":375,"./date-type":376,"./error-type":377,"./function-type":378,"./iterator-type":379,"./native-function-type":380,"./object-type":382,"./primitive-type":383,"./proxy-type":385,"./regex-type":386,"./string-type":387,"./symbol-type":388}],382:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ObjectType = undefined;

var _operators = require("../utils/operators");

var _operators2 = _interopRequireDefault(_operators);

var _propertyDescriptor = require("./property-descriptor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _marked = [propertyIterator].map(regeneratorRuntime.mark);

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var integerMatcher = /^\d+$/;

function isSymbol(key) {
	return key && (typeof key === "undefined" ? "undefined" : _typeof(key)) === "object" && key.isSymbol;
}

function getPropertySource(key) {
	return isSymbol(key) ? "symbols" : "properties";
}

function propertyIterator(env, obj) {
	var visited, objectFactory, current, keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, desc, value;

	return regeneratorRuntime.wrap(function propertyIterator$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				visited = Object.create(null);
				objectFactory = env.objectFactory;
				current = obj;

			case 3:
				if (!current) {
					_context.next = 39;
					break;
				}

				keys = current.getOwnPropertyKeys("String");
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				_context.prev = 8;
				_iterator = keys[Symbol.iterator]();

			case 10:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					_context.next = 22;
					break;
				}

				key = _step.value;
				desc = current.getProperty(key);

				if (!desc) {
					_context.next = 19;
					break;
				}

				if (!(desc.enumerable && !(key in visited))) {
					_context.next = 18;
					break;
				}

				value = objectFactory.createPrimitive(key);
				_context.next = 18;
				return objectFactory.createIteratorResult({ value: value });

			case 18:

				visited[key] = true;

			case 19:
				_iteratorNormalCompletion = true;
				_context.next = 10;
				break;

			case 22:
				_context.next = 28;
				break;

			case 24:
				_context.prev = 24;
				_context.t0 = _context["catch"](8);
				_didIteratorError = true;
				_iteratorError = _context.t0;

			case 28:
				_context.prev = 28;
				_context.prev = 29;

				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}

			case 31:
				_context.prev = 31;

				if (!_didIteratorError) {
					_context.next = 34;
					break;
				}

				throw _iteratorError;

			case 34:
				return _context.finish(31);

			case 35:
				return _context.finish(28);

			case 36:

				current = current.getPrototype();
				_context.next = 3;
				break;

			case 39:
				return _context.abrupt("return", objectFactory.createIteratorResult({ done: true }));

			case 40:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this, [[8, 24, 28, 36], [29,, 31, 35]]);
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

var ObjectType = exports.ObjectType = (function () {
	function ObjectType() {
		_classCallCheck(this, ObjectType);

		this.isPrimitive = false;
		this.type = "object";
		this.className = "Object";
		this.extensible = true;
		this.properties = Object.create(null);
		this.symbols = Object.create(null);

		this.version = 0;
		this.primitiveHint = "number";
	}

	_createClass(ObjectType, [{
		key: "init",
		value: function init(env, proto, descriptor, strict) {
			this[Symbol.for("env")] = env;
		}
	}, {
		key: "getPrototype",
		value: function getPrototype() {
			return this.proto;
		}
	}, {
		key: "setPrototype",
		value: function setPrototype(proto) {
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
		}
	}, {
		key: "getProperty",
		value: function getProperty(key, receiver) {
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
		}
	}, {
		key: "getOwnProperty",
		value: function getOwnProperty(key) {
			return this[getPropertySource(key)][String(key)];
		}
	}, {
		key: "getOwnPropertyKeys",
		value: function getOwnPropertyKeys(keyType) {
			var _this = this;

			var keys = [];

			if (keyType !== "Symbol") {
				// note: this uses native sort which may not be stable
				keys = Object.keys(this.properties).map(function (key) {
					return _this.properties[key];
				}).sort(propertyKeyComparer).map(function (prop) {
					return String(prop.key);
				});
			}

			if (keyType !== "String") {
				for (var key in this.symbols) {
					keys.push(this.symbols[key].key);
				}
			}

			return keys;
		}
	}, {
		key: "isExtensible",
		value: function isExtensible() {
			return this.extensible;
		}
	}, {
		key: "getIterator",
		value: function getIterator() {
			var env = this[Symbol.for("env")];
			return env.objectFactory.createIterator(propertyIterator(env, this));
		}
	}, {
		key: "has",
		value: function has(key) {
			if (String(key) in this[getPropertySource(key)]) {
				return true;
			}

			var current = this.getPrototype();
			if (current) {
				return current.has(key);
			}

			return false;
		}
	}, {
		key: "owns",
		value: function owns(key) {
			return String(key) in this[getPropertySource(key)];
		}
	}, {
		key: "setValue",
		value: function setValue(key, value, receiver) {
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

				if (descriptor.hasValue() && receiver.owns(key) && _operators2.default.areSame(descriptor.getValue(), value)) {
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
					return receiver.defineOwnProperty(key, {
						value: value,
						configurable: true,
						enumerable: true,
						writable: true
					}, false);
				}

				descriptor.setValue(value);
				return true;
			}

			return receiver.defineOwnProperty(key, {
				value: value,
				configurable: true,
				enumerable: true,
				writable: true
			}, false);
		}

		// putValue (key, value, throwOnError) {
		// 	if (this.isPrimitive) {
		// 		return;
		// 	}

		// 	let descriptor = this.getProperty(key);
		// 	if (descriptor) {
		// 		if (!descriptor.canSetValue()) {
		// 			if (throwOnError) {
		// 				throw TypeError(`Cannot assign to read only property '${key}'`);
		// 			}

		// 			return;
		// 		}

		// 		if (descriptor.dataProperty && !this.owns(key)) {
		// 			this[getPropertySource(key)][String(key)] = new PropertyDescriptor(this, {
		// 				value: value,
		// 				configurable: descriptor.configurable,
		// 				enumerable: descriptor.enumerable,
		// 				writable: descriptor.writable
		// 			}, key);

		// 			this.version++;
		// 		} else {
		// 			descriptor.setValue(value);
		// 		}
		// 	} else {
		// 		this.defineOwnProperty(key, {value: value, configurable: true, enumerable: true, writable: true}, throwOnError);
		// 	}
		// }

	}, {
		key: "defineOwnProperty",
		value: function defineOwnProperty(key, descriptor, throwOnError) {
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
		}
	}, {
		key: "deleteProperty",
		value: function deleteProperty(key, throwOnError) {
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
		}
	}, {
		key: "define",
		value: function define(key, value) {
			var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			var _ref$configurable = _ref.configurable;
			var configurable = _ref$configurable === undefined ? true : _ref$configurable;
			var _ref$enumerable = _ref.enumerable;
			var enumerable = _ref$enumerable === undefined ? false : _ref$enumerable;
			var _ref$writable = _ref.writable;
			var writable = _ref$writable === undefined ? true : _ref$writable;
			var getter = _ref.getter;
			var get = _ref.get;
			var setter = _ref.setter;
			var set = _ref.set;

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
		}
	}, {
		key: "remove",
		value: function remove(key) {
			// this method is intended for external usage only - it provides a way to remove
			// properties even if they are not normally able to be deleted
			delete this[getPropertySource(key)][String(key)];
			this.version++;
		}
	}, {
		key: "getValue",
		value: function getValue(key) {
			if (arguments.length > 0) {
				var property = this.getProperty(key);
				return property && property.getValue();
			}

			return this;
		}
	}, {
		key: "each",
		value: function each(func) {
			var _this2 = this;

			["properties", "symbols"].forEach(function (source) {
				for (var key in _this2[source]) {
					func(_this2[source][key]);
				}
			});
		}
	}, {
		key: "freeze",
		value: function freeze() {
			var _this3 = this;

			this.each(function (desc) {
				if (desc.dataProperty) {
					_this3.defineOwnProperty(desc.key, { writable: false, configurable: false });
				} else {
					_this3.defineOwnProperty(desc.key, { configurable: false });
				}
			});

			this.preventExtensions();
		}
	}, {
		key: "preventExtensions",
		value: function preventExtensions() {
			this.extensible = false;
			return true;
		}
	}, {
		key: "seal",
		value: function seal() {
			var _this4 = this;

			this.each(function (desc) {
				_this4.defineOwnProperty(desc.key, { configurable: false }, true);
			});

			this.preventExtensions();
		}
	}, {
		key: "toNative",
		value: function toNative() {
			var unwrapped = {};
			var current = this;

			while (current) {
				for (var name in current.properties) {
					if (current.properties[name].enumerable && !(name in unwrapped)) {
						unwrapped[name] = current.getValue(name).toNative();
					}
				}

				current = current.getPrototype();
			}

			return unwrapped;
		}
	}]);

	return ObjectType;
})();

},{"../utils/operators":395,"./property-descriptor":384}],383:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NULL = exports.UNDEFINED = exports.PrimitiveType = undefined;

var _objectType = require("./object-type");

var _contracts = require("../utils/contracts");

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrimitiveType = exports.PrimitiveType = (function (_ObjectType) {
	_inherits(PrimitiveType, _ObjectType);

	function PrimitiveType(value) {
		_classCallCheck(this, PrimitiveType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PrimitiveType).call(this));

		_this.isPrimitive = true;
		_this.value = value;
		_this.type = typeof value === "undefined" ? "undefined" : _typeof(value);

		_this.className = (0, _contracts.getType)(value);
		return _this;
	}

	_createClass(PrimitiveType, [{
		key: "getProperty",
		value: function getProperty(name) {
			// can't read properties of null/undefined
			if (this.value == null) {
				throw TypeError("Cannot read property '" + name + "' of " + this.type);
			}

			return _get(Object.getPrototypeOf(PrimitiveType.prototype), "getProperty", this).apply(this, arguments);
		}
	}, {
		key: "toNative",
		value: function toNative() {
			return this.value;
		}
	}]);

	return PrimitiveType;
})(_objectType.ObjectType);

var UNDEFINED = exports.UNDEFINED = new PrimitiveType(undefined);
var NULL = exports.NULL = new PrimitiveType(null);

},{"../utils/contracts":391,"./object-type":382}],384:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PropertyDescriptor = undefined;

var _operators = require("../utils/operators");

var _operators2 = _interopRequireDefault(_operators);

var _async = require("../utils/async");

var _object = require("../utils/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var defaultDescriptor = {
	configurable: false,
	enumerable: false,
	writable: false
};

var PropertyDescriptor = exports.PropertyDescriptor = (function () {
	function PropertyDescriptor(base) {
		var config = arguments.length <= 1 || arguments[1] === undefined ? defaultDescriptor : arguments[1];
		var key = arguments[2];

		_classCallCheck(this, PropertyDescriptor);

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
				if ((0, _object.owns)(descriptor, prop)) {
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
		}
	}, {
		key: "getValue",
		value: function getValue() {
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
		}
	}, {
		key: "canSetValue",
		value: function canSetValue(value) {
			return this.writable || !!this.setter || !this.initialized;
		}
	}, {
		key: "setValue",
		value: function setValue(value) {
			if (!this.canSetValue()) {
				return;
			}

			this.initialized = true;

			if (this.dataProperty) {
				this.value = value;
			} else if (this.setter) {
				(0, _async.exhaust)(this.setter.call(this.base, value));
			}
		}
	}, {
		key: "hasValue",
		value: function hasValue() {
			return !!this.value || !!this.getter;
		}
	}, {
		key: "init",
		value: function init(value) {
			this.initialized = true;
			this.value = value;
		}
	}]);

	return PropertyDescriptor;
})();

},{"../utils/async":390,"../utils/object":394,"../utils/operators":395}],385:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ProxyType = undefined;

var _objectType = require("./object-type");

var _primitiveType = require("./primitive-type");

var _contracts = require("../utils/contracts");

var _async = require("../utils/async");

var _native = require("../utils/native");

var _propertyDescriptor = require("./property-descriptor");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var envSymbol = Symbol.for("env");

function getProxyMethod(proxy, key) {
	var handler = proxy.handler.getProperty(key);
	if (!handler) {
		return null;
	}

	var method = handler.getValue();
	if ((0, _contracts.isUndefined)(method)) {
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
	if ((typeof key === "undefined" ? "undefined" : _typeof(key)) !== "object") {
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
	if ((0, _contracts.isUndefined)(proxyMethod)) {
		return proxy.target.getValue(methodName);
	}

	return proxy[envSymbol].objectFactory.createBuiltInFunction(regeneratorRuntime.mark(function _callee(thisArg) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return regeneratorRuntime.wrap(function _callee$(_context) {
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

var ProxyType = exports.ProxyType = (function (_ObjectType) {
	_inherits(ProxyType, _ObjectType);

	function ProxyType(target, handler) {
		_classCallCheck(this, ProxyType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProxyType).call(this));

		_this.target = target;
		_this.handler = handler;
		_this.className = target.className;
		_this.type = target.type;
		_this.revoked = false;
		_this.isProxy = true;
		return _this;
	}

	_createClass(ProxyType, [{
		key: "call",
		value: regeneratorRuntime.mark(function call(thisArg, args) {
			var proxyMethod,
			    _target,
			    argsArray,
			    _args2 = arguments;

			return regeneratorRuntime.wrap(function call$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							assertIsNotRevoked(this, "apply");

							proxyMethod = getProxyMethod(this, "apply");

							if (!(0, _contracts.isUndefined)(proxyMethod)) {
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
			}, call, this);
		})
	}, {
		key: "construct",
		value: regeneratorRuntime.mark(function construct(thisArg, args) {
			var proxyMethod,
			    _target2,
			    argsArray,
			    newObj,
			    _args3 = arguments;

			return regeneratorRuntime.wrap(function construct$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							assertIsNotRevoked(this, "construct");

							proxyMethod = getProxyMethod(this, "construct");

							if (!(0, _contracts.isUndefined)(proxyMethod)) {
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

							if (!(0, _contracts.isObject)(newObj)) {
								throwProxyInvariantError("construct");
							}

							return _context3.abrupt("return", newObj);

						case 12:
						case "end":
							return _context3.stop();
					}
				}
			}, construct, this);
		})
	}, {
		key: "has",
		value: function has(key) {
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
		}
	}, {
		key: "owns",
		value: function owns(key) {
			return this.target.owns(key);
		}
	}, {
		key: "getProperty",
		value: function getProperty(key, target) {
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

				if (!propInfo.dataProperty && (0, _contracts.isUndefined)(propInfo.get) && !(0, _contracts.isUndefined)(value)) {
					throwProxyInvariantError("get");
				}
			}

			return new _propertyDescriptor.PropertyDescriptor(this, { value: value }, key);
		}
	}, {
		key: "getOwnProperty",
		value: function getOwnProperty(key) {
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

			if ((0, _contracts.isUndefined)(descriptor)) {
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
		}
	}, {
		key: "getPrototype",
		value: function getPrototype() {
			assertIsNotRevoked(this, "getPrototypeOf");

			var proxyMethod = getProxyMethod(this, "getPrototypeOf");
			if (!proxyMethod) {
				return this.target.getPrototype();
			}

			var proto = (0, _async.exhaust)(proxyMethod.call(this.handler, [this.target]));
			if (!(0, _contracts.isObject)(proto) && !(0, _contracts.isNull)(proto)) {
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
		}
	}, {
		key: "setPrototype",
		value: function setPrototype(proto) {
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
		}
	}, {
		key: "isExtensible",
		value: function isExtensible() {
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
		}
	}, {
		key: "preventExtensions",
		value: function preventExtensions() {
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
		}
	}, {
		key: "deleteProperty",
		value: function deleteProperty(key, throwOnError) {
			assertIsNotRevoked(this, "deleteProperty");

			var proxyMethod = getProxyMethod(this, "deleteProperty");
			if ((0, _contracts.isUndefined)(proxyMethod)) {
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
		}
	}, {
		key: "defineOwnProperty",
		value: function defineOwnProperty(key, descriptor, throwOnError) {
			assertIsNotRevoked(this, "defineProperty");

			var proxyMethod = getProxyMethod(this, "defineProperty");
			if ((0, _contracts.isUndefined)(proxyMethod)) {
				var _target3;

				return (_target3 = this.target).defineOwnProperty.apply(_target3, arguments);
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
		}
	}, {
		key: "getOwnPropertyKeys",
		value: function getOwnPropertyKeys(keyType) {
			var _this2 = this;

			assertIsNotRevoked(this, "ownKeys");

			var proxyMethod = getProxyMethod(this, "ownKeys");
			if ((0, _contracts.isUndefined)(proxyMethod)) {
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
					return !_this2.target.getProperty(k).configurable;
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
		}
	}, {
		key: "getIterator",
		value: function getIterator() {
			assertIsNotRevoked(this, "enumerate");

			var proxyMethod = getProxyMethod(this, "enumerate");
			if ((0, _contracts.isUndefined)(proxyMethod)) {
				return this.target.getIterator();
			}

			var result = (0, _async.exhaust)(proxyMethod.call(this.handler, [this.target]));
			if (!(0, _contracts.isObject)(result)) {
				throwProxyInvariantError("enumerate");
			}

			return result;
		}
	}, {
		key: "setValue",
		value: function setValue(key, value) {
			assertIsNotRevoked(this, "set");

			var proxyMethod = getProxyMethod(this, "set");
			if ((0, _contracts.isUndefined)(proxyMethod)) {
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

					if (!propInfo.dataProperty && (0, _contracts.isUndefined)(propInfo.set)) {
						throwProxyInvariantError("set");
					}
				}
			}

			return result;
		}
	}, {
		key: "revoke",
		value: function revoke() {
			this.revoked = true;
		}
	}]);

	return ProxyType;
})(_objectType.ObjectType);

},{"../utils/async":390,"../utils/contracts":391,"../utils/native":393,"./object-type":382,"./primitive-type":383,"./property-descriptor":384}],386:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RegexType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegexType = exports.RegexType = (function (_ObjectType) {
	_inherits(RegexType, _ObjectType);

	function RegexType(value) {
		_classCallCheck(this, RegexType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RegexType).call(this));

		_this.source = value;
		_this.className = "RegExp";
		return _this;
	}

	_createClass(RegexType, [{
		key: "init",
		value: function init(env) {
			var _this2 = this;

			_get(Object.getPrototypeOf(RegexType.prototype), "init", this).apply(this, arguments);

			// lastIndex is settable, all others are read-only attributes
			this.defineOwnProperty("lastIndex", { value: env.objectFactory.createPrimitive(this.source.lastIndex), writable: true });

			["source", "global", "ignoreCase", "multiline"].forEach(function (key) {
				if (env.options.ecmaVersion > 5) {
					var getter = function getter() {
						return env.objectFactory.createPrimitive(this.source[key]);
					};
					var getterFunc = env.objectFactory.createGetter(getter, key);

					_this2.defineOwnProperty(key, {
						getter: getter,
						get: getterFunc,
						configurable: true
					});
				} else {
					_this2.defineOwnProperty(key, { value: env.objectFactory.createPrimitive(_this2.source[key]) });
				}
			});
		}
	}, {
		key: "toNative",
		value: function toNative() {
			return this.source;
		}
	}]);

	return RegexType;
})(_objectType.ObjectType);

},{"./object-type":382}],387:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StringType = undefined;

var _primitiveType = require("./primitive-type");

var _propertyDescriptor = require("./property-descriptor");

var _contracts = require("../utils/contracts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var charAttrs = { writable: false, enumerable: true, configurable: false };

function lazyInit(instance, key) {
	var nativeValue = instance.value;
	if (!nativeValue || !(0, _contracts.isInteger)(key) || "0" in instance.properties) {
		return;
	}

	for (var i = 0, ln = nativeValue.length; i < ln; i++) {
		// we are not using the object factory to avoid circular loop
		var c = new StringType(nativeValue[i]);
		c[Symbol.for("env")] = instance[Symbol.for("env")];
		c.setPrototype(instance.proto);
		c.define("0", c, charAttrs);

		instance.define(i, c, charAttrs);
	}
}

var StringType = exports.StringType = (function (_PrimitiveType) {
	_inherits(StringType, _PrimitiveType);

	function StringType(value) {
		_classCallCheck(this, StringType);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(StringType).call(this, value));
	}

	_createClass(StringType, [{
		key: "init",
		value: function init(env) {
			_get(Object.getPrototypeOf(StringType.prototype), "init", this).apply(this, arguments);
			var length = this.value.length;

			this.properties.length = new _propertyDescriptor.PropertyDescriptor(this, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: env.objectFactory.createPrimitive(length)
			}, "length");
		}
	}, {
		key: "getProperty",
		value: function getProperty(key) {
			lazyInit(this, key);
			return _get(Object.getPrototypeOf(StringType.prototype), "getProperty", this).apply(this, arguments);
		}
	}, {
		key: "getOwnProperty",
		value: function getOwnProperty(key) {
			lazyInit(this, key);
			return _get(Object.getPrototypeOf(StringType.prototype), "getOwnProperty", this).apply(this, arguments);
		}
	}, {
		key: "getOwnPropertyKeys",
		value: function getOwnPropertyKeys() {
			lazyInit(this, 0);
			return _get(Object.getPrototypeOf(StringType.prototype), "getOwnPropertyKeys", this).apply(this, arguments);
		}
	}, {
		key: "has",
		value: function has(key) {
			lazyInit(this, key);
			return _get(Object.getPrototypeOf(StringType.prototype), "has", this).apply(this, arguments);
		}
	}, {
		key: "owns",
		value: function owns(key) {
			lazyInit(this, key);
			return _get(Object.getPrototypeOf(StringType.prototype), "owns", this).apply(this, arguments);
		}
	}]);

	return StringType;
})(_primitiveType.PrimitiveType);

},{"../utils/contracts":391,"./primitive-type":383,"./property-descriptor":384}],388:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SymbolType = undefined;

var _objectType = require("./object-type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GLOBAL_SYMBOL_REGISTRY = Object.create(null);
var uid = 0;

var SymbolType = exports.SymbolType = (function (_ObjectType) {
	_inherits(SymbolType, _ObjectType);

	function SymbolType(description) {
		_classCallCheck(this, SymbolType);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SymbolType).call(this));

		_this.type = "symbol";
		_this.className = "Symbol";
		_this.description = description;
		_this.uid = uid++;

		// add so we can easily check if an object is a symbol when we care
		_this.isSymbol = true;
		return _this;
	}

	_createClass(SymbolType, [{
		key: "defineOwnProperty",
		value: function defineOwnProperty(key, descriptor) {
			return false;
		}
	}, {
		key: "setValue",
		value: function setValue(key, value, target) {
			return false;
		}
	}, {
		key: "toNative",
		value: function toNative() {
			return "Symbol(" + this.description + ")";
		}
	}, {
		key: "toString",
		value: function toString() {
			// this method is here so symbols can be coerced into strings for property lookups
			return "@@" + this.uid;
		}
	}], [{
		key: "add",
		value: function add(key, sym) {
			GLOBAL_SYMBOL_REGISTRY[key] = sym;
		}
	}, {
		key: "getByKey",
		value: function getByKey(key) {
			return GLOBAL_SYMBOL_REGISTRY[key];
		}
	}, {
		key: "getByInstance",
		value: function getByInstance(sym) {
			for (var key in GLOBAL_SYMBOL_REGISTRY) {
				if (sym === GLOBAL_SYMBOL_REGISTRY[key]) {
					return GLOBAL_SYMBOL_REGISTRY[key];
				}
			}

			return undefined;
		}
	}]);

	return SymbolType;
})(_objectType.ObjectType);

},{"./object-type":382}],389:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reset = reset;
exports.declare = declare;
exports.assign = assign;

var _primitiveType = require("../types/primitive-type");

var _async = require("./async");

var _native = require("./native");

var _iterators = require("../iterators");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [reset, declare, assign, destructure, handleDefault, destructureArray, getObjectKey, destructureObject].map(regeneratorRuntime.mark);

function reset(env, leftNode, priorScope, newScope) {
	var currentBinding;
	return regeneratorRuntime.wrap(function reset$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				if (!leftNode.isVariableDeclaration()) {
					_context2.next = 5;
					break;
				}

				_context2.next = 3;
				return (0, _async.each)(leftNode.declarations, regeneratorRuntime.mark(function _callee(decl) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return reset(env, decl, priorScope, newScope);

								case 2:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

			case 3:
				_context2.next = 12;
				break;

			case 5:
				if (!(leftNode.isLet() || leftNode.isConst())) {
					_context2.next = 10;
					break;
				}

				currentBinding = priorScope.getVariable(leftNode.id.name);

				newScope.getVariable(leftNode.id.name).setValue(currentBinding.getValue());
				_context2.next = 12;
				break;

			case 10:
				_context2.next = 12;
				return destructure(env, leftNode, null, function (env, left) {
					return reset(env, left, priorScope, newScope);
				});

			case 12:
			case "end":
				return _context2.stop();
		}
	}, _marked[0], this);
}

function declare(env, leftNode, rightValue, kind) {
	var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, decl, left;

	return regeneratorRuntime.wrap(function declare$(_context4) {
		while (1) switch (_context4.prev = _context4.next) {
			case 0:
				kind = kind || "var";

				if (!leftNode.isVariableDeclaration()) {
					_context4.next = 31;
					break;
				}

				kind = leftNode.kind;

				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				_context4.prev = 6;
				_iterator = leftNode.declarations[Symbol.iterator]();

			case 8:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					_context4.next = 15;
					break;
				}

				decl = _step.value;
				_context4.next = 12;
				return declare(env, decl, rightValue, kind);

			case 12:
				_iteratorNormalCompletion = true;
				_context4.next = 8;
				break;

			case 15:
				_context4.next = 21;
				break;

			case 17:
				_context4.prev = 17;
				_context4.t0 = _context4["catch"](6);
				_didIteratorError = true;
				_iteratorError = _context4.t0;

			case 21:
				_context4.prev = 21;
				_context4.prev = 22;

				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}

			case 24:
				_context4.prev = 24;

				if (!_didIteratorError) {
					_context4.next = 27;
					break;
				}

				throw _iteratorError;

			case 27:
				return _context4.finish(24);

			case 28:
				return _context4.finish(21);

			case 29:
				_context4.next = 43;
				break;

			case 31:
				if (!leftNode.isVariableDeclarator()) {
					_context4.next = 36;
					break;
				}

				_context4.next = 34;
				return declare(env, leftNode.id, rightValue, kind);

			case 34:
				_context4.next = 43;
				break;

			case 36:
				if (!leftNode.isIdentifier()) {
					_context4.next = 41;
					break;
				}

				left = env.createVariable(leftNode.name);

				left.setValue(rightValue);
				_context4.next = 43;
				break;

			case 41:
				_context4.next = 43;
				return destructure(env, leftNode, rightValue, regeneratorRuntime.mark(function _callee2(e, l, v) {
					return regeneratorRuntime.wrap(function _callee2$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return declare(e, l, v, kind);

								case 2:
									return _context3.abrupt("return", _context3.sent);

								case 3:
								case "end":
									return _context3.stop();
							}
						}
					}, _callee2, this);
				}));

			case 43:
				return _context4.abrupt("return", rightValue);

			case 44:
			case "end":
				return _context4.stop();
		}
	}, _marked[1], this, [[6, 17, 21, 29], [22,, 24, 28]]);
}

function assign(env, leftNode, rightValue) {
	var left;
	return regeneratorRuntime.wrap(function assign$(_context5) {
		while (1) switch (_context5.prev = _context5.next) {
			case 0:
				_context5.t0 = leftNode.type;
				_context5.next = _context5.t0 === "Identifier" ? 3 : _context5.t0 === "MemberExpression" ? 3 : 8;
				break;

			case 3:
				_context5.next = 5;
				return env.createExecutionContext().execute(leftNode);

			case 5:
				left = _context5.sent.result;

				left.setValue(rightValue, env.isStrict());
				return _context5.abrupt("break", 10);

			case 8:
				_context5.next = 10;
				return destructure(env, leftNode, rightValue, assign);

			case 10:
				return _context5.abrupt("return", rightValue);

			case 11:
			case "end":
				return _context5.stop();
		}
	}, _marked[2], this);
}

function destructure(env, leftNode, rightValue, cb) {
	return regeneratorRuntime.wrap(function destructure$(_context6) {
		while (1) switch (_context6.prev = _context6.next) {
			case 0:
				_context6.t0 = leftNode.type;
				_context6.next = _context6.t0 === "ArrayPattern" ? 3 : _context6.t0 === "ObjectPattern" ? 6 : _context6.t0 === "AssignmentPattern" ? 9 : 12;
				break;

			case 3:
				_context6.next = 5;
				return destructureArray(env, leftNode, rightValue, cb);

			case 5:
				return _context6.abrupt("break", 13);

			case 6:
				_context6.next = 8;
				return destructureObject(env, leftNode, rightValue, cb);

			case 8:
				return _context6.abrupt("break", 13);

			case 9:
				_context6.next = 11;
				return handleDefault(env, leftNode, rightValue, cb);

			case 11:
				return _context6.abrupt("break", 13);

			case 12:
				throw Error(leftNode.type + " not implemented");

			case 13:
			case "end":
				return _context6.stop();
		}
	}, _marked[3], this);
}

function handleDefault(env, left, rightValue, cb) {
	var defaultValue;
	return regeneratorRuntime.wrap(function handleDefault$(_context7) {
		while (1) switch (_context7.prev = _context7.next) {
			case 0:
				if (!(rightValue === _primitiveType.UNDEFINED)) {
					_context7.next = 5;
					break;
				}

				_context7.next = 3;
				return env.createExecutionContext().execute(left.right);

			case 3:
				defaultValue = _context7.sent;

				rightValue = defaultValue.result.getValue();

			case 5:
				_context7.next = 7;
				return cb(env, left.left, rightValue);

			case 7:
			case "end":
				return _context7.stop();
		}
	}, _marked[4], this);
}

function destructureArray(env, pattern, arr, cb) {
	var it, done, i, ln, element, value, current, _it$next, rest, _it$next2;

	return regeneratorRuntime.wrap(function destructureArray$(_context8) {
		while (1) switch (_context8.prev = _context8.next) {
			case 0:
				it = _iterators2.default.getIterator(arr);
				done = false;
				i = 0, ln = pattern.elements.length;

			case 3:
				if (!(i < ln)) {
					_context8.next = 21;
					break;
				}

				element = pattern.elements[i];
				value = undefined, current = undefined;

				if (!done) {
					_it$next = it.next();
					done = _it$next.done;
					current = _it$next.value;

					value = !done && current.value;
				}

				if (element) {
					_context8.next = 9;
					break;
				}

				return _context8.abrupt("continue", 18);

			case 9:
				if (!element.isRestElement()) {
					_context8.next = 16;
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

				_context8.next = 14;
				return cb(env, element.argument, env.objectFactory.createArray(rest));

			case 14:
				_context8.next = 18;
				break;

			case 16:
				_context8.next = 18;
				return cb(env, element, value || _primitiveType.UNDEFINED);

			case 18:
				i++;
				_context8.next = 3;
				break;

			case 21:

				it.return();

			case 22:
			case "end":
				return _context8.stop();
		}
	}, _marked[5], this);
}

function getObjectKey(env, keyNode) {
	var key;
	return regeneratorRuntime.wrap(function getObjectKey$(_context9) {
		while (1) switch (_context9.prev = _context9.next) {
			case 0:
				if (!keyNode.computed) {
					_context9.next = 7;
					break;
				}

				_context9.next = 3;
				return env.createExecutionContext().execute(keyNode);

			case 3:
				key = _context9.sent.result.getValue();
				_context9.next = 6;
				return (0, _native.toPropertyKey)(key);

			case 6:
				return _context9.abrupt("return", _context9.sent);

			case 7:
				return _context9.abrupt("return", keyNode.name);

			case 8:
			case "end":
				return _context9.stop();
		}
	}, _marked[6], this);
}

function destructureObject(env, pattern, obj, cb) {
	return regeneratorRuntime.wrap(function destructureObject$(_context11) {
		while (1) switch (_context11.prev = _context11.next) {
			case 0:
				_context11.next = 2;
				return (0, _async.each)(pattern.properties, regeneratorRuntime.mark(function _callee3(current) {
					var key, propInfo, value;
					return regeneratorRuntime.wrap(function _callee3$(_context10) {
						while (1) {
							switch (_context10.prev = _context10.next) {
								case 0:
									key = undefined;

									if (!current.computed) {
										_context10.next = 10;
										break;
									}

									_context10.next = 4;
									return env.createExecutionContext().execute(current.key);

								case 4:
									_context10.t0 = _context10.sent.result.getValue();
									_context10.next = 7;
									return (0, _native.toPropertyKey)(_context10.t0);

								case 7:
									key = _context10.sent;
									_context10.next = 13;
									break;

								case 10:
									_context10.next = 12;
									return getObjectKey(env, current.key);

								case 12:
									key = _context10.sent;

								case 13:
									propInfo = obj.getProperty(key);
									value = propInfo ? propInfo.getValue() : _primitiveType.UNDEFINED;
									_context10.next = 17;
									return cb(env, current.value, value);

								case 17:
								case "end":
									return _context10.stop();
							}
						}
					}, _callee3, this);
				}));

			case 2:
			case "end":
				return _context11.stop();
		}
	}, _marked[7], this);
}

},{"../iterators":367,"../types/primitive-type":383,"./async":390,"./native":393}],390:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isThenable = isThenable;
exports.map = map;
exports.each = each;
exports.step = step;
exports.exhaust = exhaust;

var _marked = [map, each, step].map(regeneratorRuntime.mark);

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function isObject(obj) {
	return obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object";
}

function isFunction(obj) {
	return typeof obj === "function";
}

function isThenable(obj) {
	return (isObject(obj) || isFunction(obj)) && typeof obj.then === "function";
}

function isNextable(obj) {
	return isObject(obj) && typeof obj.next === "function";
}

function map(arr, func) {
	var mapped;
	return regeneratorRuntime.wrap(function map$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				mapped = [];
				return _context2.delegateYield(each(arr, regeneratorRuntime.mark(function _callee() {
					var _args = arguments;
					return regeneratorRuntime.wrap(function _callee$(_context) {
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
	}, _marked[0], this);
}

function each(arr, func) {
	var aborted, aborter, i, ln;
	return regeneratorRuntime.wrap(function each$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
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
	}, _marked[1], this);
}

function step(it, prev) {
	var result, value;
	return regeneratorRuntime.wrap(function step$(_context4) {
		while (1) switch (_context4.prev = _context4.next) {
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
					_context4.next = 13;
					break;
				}

				return _context4.abrupt("return", value);

			case 13:
				_context4.next = 15;
				return step(it, value);

			case 15:
			case "end":
				return _context4.stop();
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
		if (!isNextable(it)) {
			value = it;

			if (!(it = stack.pop())) {
				break;
			}
		}

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
			if (isNextable(value)) {
				stack.push(it);

				it = value;
				value = undefined;

				continue;
			}

			if (isThenable(value)) {
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

},{}],391:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
exports.isValidArrayLength = isValidArrayLength;
exports.isObject = isObject;
exports.isRegExp = isRegExp;
exports.isNumber = isNumber;
exports.isNegativeZero = isNegativeZero;
exports.isOctalLiteral = isOctalLiteral;
exports.getType = getType;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isFunction = isFunction;
exports.isConstructor = isConstructor;
exports.isInteger = isInteger;
exports.isStrictNode = isStrictNode;

var _keywords = require("../keywords");

var _symbolType = require("../types/symbol-type");

var _native = require("./native");

var objectPattern = /\[object (\w+)\]/;
var integerPattern = /^-?\d+$/;
var octalPattern = /^-?0[0-7]/;
var octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;
var useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

function assertIsObject(obj, methodName) {
	if (!isObject(obj)) {
		throw TypeError(methodName + " called on non-object");
	}
}

function assertIsNotNullOrUndefined(value, methodName) {
	if (isNullOrUndefined(value)) {
		throw TypeError(methodName + " called on null or undefined");
	}
}

function assertArgIsNotNullOrUndefined(obj) {
	if (isNullOrUndefined(obj)) {
		throw TypeError("Cannot convert null or undefined to object");
	}
}

function assertIsFunction(obj, argName) {
	if (!isFunction(obj)) {
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
	if (!isValidArrayLength(length)) {
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

function assertIsValidIdentifier(name, strict) {
	if ((0, _keywords.isReserved)(name)) {
		throw SyntaxError("Illegal use of reserved keyword: " + name);
	}

	if (strict && (0, _keywords.isStrictReserved)(name)) {
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

function isValidArrayLength(length) {
	return isInteger(length) && length >= 0 && length < 4294967296;
}

function isObject(obj) {
	if (!obj) {
		return false;
	}

	if (obj.isSymbol) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

function isRegExp(obj) {
	if (!isObject(obj)) {
		return false;
	}

	var matchKey = _symbolType.SymbolType.getByKey("match");
	var matchProp = obj.getProperty(matchKey);
	if (matchProp) {
		var matchValue = matchProp.getValue();
		if (!isUndefined(matchValue)) {
			return (0, _native.toBoolean)(matchValue);
		}
	}

	return obj.className === "RegExp";
}

function isNumber(obj) {
	return obj && obj.type === "number";
}

function isNegativeZero(obj) {
	return isNumber(obj) && obj.value === 0 && 1 / obj.value < 0;
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

function getType(obj) {
	// manually check for null/undefined or IE9 will coerce them to the global
	if (obj === undefined) {
		return "Undefined";
	}

	if (obj === null) {
		return "Null";
	}

	return objectPattern.exec(Object.prototype.toString.call(obj))[1];
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

function isFunction(obj) {
	return !!obj && obj.className === "Function";
}

function isConstructor(obj) {
	if (!isFunction(obj)) {
		return false;
	}

	return obj.canConstruct;
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

function isDirective(node) {
	return node.type === "ExpressionStatement" && node.expression.type === "Literal" && typeof node.expression.value === "string";
}

function isStrictNode(nodes) {
	if (!nodes) {
		return false;
	}

	if (Array.isArray(nodes)) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var node = _step.value;

				if (!isDirective(node)) {
					return false;
				}

				if (node.expression.value === "use strict" && useStrictPattern.test(node.expression.raw)) {
					return true;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return false;
	}

	if (nodes.body) {
		return isStrictNode(nodes.body);
	}

	return false;
}

},{"../keywords":371,"../types/symbol-type":388,"./native":393}],392:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.tryExecute = tryExecute;
exports.getMethod = getMethod;

var _primitiveType = require("../types/primitive-type");

var _marked = [tryExecute].map(regeneratorRuntime.mark);

function tryExecute(obj, name) {
	var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	var fn, executionResult;
	return regeneratorRuntime.wrap(function tryExecute$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				fn = obj.getProperty(name);

				if (fn) {
					_context.next = 3;
					break;
				}

				return _context.abrupt("return", false);

			case 3:

				fn = fn.getValue();

				if (!(fn && fn.className === "Function")) {
					_context.next = 9;
					break;
				}

				_context.next = 7;
				return fn.call(obj, args, fn);

			case 7:
				executionResult = _context.sent;
				return _context.abrupt("return", executionResult ? executionResult.getValue() : _primitiveType.UNDEFINED);

			case 9:
				return _context.abrupt("return", false);

			case 10:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

function getMethod(obj, key) {
	var propInfo = obj.getProperty(key);
	var method = propInfo && propInfo.getValue();
	if (!method || method.isPrimitive && method.value == null) {
		return null;
	}

	if (method.type !== "function") {
		throw TypeError(key + " is not a method");
	}

	return method;
}

},{"../types/primitive-type":383}],393:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.primitiveToObject = primitiveToObject;
exports.toObject = toObject;
exports.toLength = toLength;
exports.toPropertyKey = toPropertyKey;
exports.toArray = toArray;
exports.toPrimitive = toPrimitive;
exports.toString = toString;
exports.toNumber = toNumber;
exports.toInteger = toInteger;
exports.toInt32 = toInt32;
exports.toUInt32 = toUInt32;
exports.toBoolean = toBoolean;
exports.toNativeFunction = toNativeFunction;

var _func = require("../utils/func");

var _marked = [getString, getPrimitive, getValues, toLength, toPropertyKey, toArray, getNativeConversion, toPrimitive, toString, toNumber, toInteger, toInt32, toUInt32].map(regeneratorRuntime.mark);

var sign = Math.sign;
var floor = Math.floor;
var abs = Math.abs;
var MAX_LENGTH = Math.pow(2, 53) - 1;

function getString(value) {
	var primitiveValue;
	return regeneratorRuntime.wrap(function getString$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				if (value) {
					_context.next = 2;
					break;
				}

				return _context.abrupt("return", "undefined");

			case 2:
				if (!value.isPrimitive) {
					_context.next = 4;
					break;
				}

				return _context.abrupt("return", String(value.toNative()));

			case 4:
				_context.next = 6;
				return (0, _func.tryExecute)(value, "toString");

			case 6:
				primitiveValue = _context.sent;

				if (!(primitiveValue && primitiveValue.isPrimitive)) {
					_context.next = 9;
					break;
				}

				return _context.abrupt("return", String(primitiveValue.value));

			case 9:
				_context.next = 11;
				return (0, _func.tryExecute)(value, "valueOf");

			case 11:
				primitiveValue = _context.sent;

				if (!(primitiveValue && primitiveValue.isPrimitive)) {
					_context.next = 14;
					break;
				}

				return _context.abrupt("return", String(primitiveValue.value));

			case 14:
				throw TypeError("Cannot convert object to primitive value.");

			case 15:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

function getPrimitive(value) {
	var primitiveValue;
	return regeneratorRuntime.wrap(function getPrimitive$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				if (value) {
					_context2.next = 2;
					break;
				}

				return _context2.abrupt("return", 0);

			case 2:
				if (!value.isPrimitive) {
					_context2.next = 4;
					break;
				}

				return _context2.abrupt("return", value.toNative());

			case 4:
				_context2.next = 6;
				return (0, _func.tryExecute)(value, "valueOf");

			case 6:
				primitiveValue = _context2.sent;

				if (!(primitiveValue && primitiveValue.isPrimitive)) {
					_context2.next = 9;
					break;
				}

				return _context2.abrupt("return", primitiveValue.toNative());

			case 9:
				_context2.next = 11;
				return (0, _func.tryExecute)(value, "toString");

			case 11:
				primitiveValue = _context2.sent;

				if (!(primitiveValue && primitiveValue.isPrimitive)) {
					_context2.next = 14;
					break;
				}

				return _context2.abrupt("return", primitiveValue.toNative());

			case 14:
				throw TypeError("Cannot convert object to primitive value.");

			case 15:
			case "end":
				return _context2.stop();
		}
	}, _marked[1], this);
}

function getValues(args) {
	var values, i, ln;
	return regeneratorRuntime.wrap(function getValues$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
			case 0:
				values = [];
				i = 0, ln = args.length;

			case 2:
				if (!(i < ln)) {
					_context3.next = 11;
					break;
				}

				_context3.t0 = values;
				_context3.next = 6;
				return getPrimitive(args[i]);

			case 6:
				_context3.t1 = _context3.sent;

				_context3.t0.push.call(_context3.t0, _context3.t1);

			case 8:
				i++;
				_context3.next = 2;
				break;

			case 11:
				return _context3.abrupt("return", values);

			case 12:
			case "end":
				return _context3.stop();
		}
	}, _marked[2], this);
}

function primitiveToObject(env, value) {
	var newValue = env.objectFactory.createPrimitive(value);
	newValue.isPrimitive = false;
	newValue.type = "object";
	return newValue;
}

function toObject(obj, throwOnError) {
	// todo: is this ES6 only?
	if (throwOnError && obj.isPrimitive && obj.value == null) {
		throw TypeError(obj.type + " cannot be converted to an object");
	}

	if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
		return primitiveToObject(getEnv(obj), obj.value);
	}

	return obj;
}

function getEnv(obj) {
	return obj[Symbol.for("env")];
}

function getOptions(obj) {
	return getEnv(obj).options;
}

function toLength(obj) {
	var lengthProperty, length;
	return regeneratorRuntime.wrap(function toLength$(_context4) {
		while (1) switch (_context4.prev = _context4.next) {
			case 0:
				lengthProperty = obj.getProperty("length");

				if (!lengthProperty) {
					_context4.next = 10;
					break;
				}

				if (!(getOptions(obj).ecmaVersion === 5)) {
					_context4.next = 6;
					break;
				}

				_context4.next = 5;
				return toUInt32(lengthProperty.getValue());

			case 5:
				return _context4.abrupt("return", _context4.sent);

			case 6:
				_context4.next = 8;
				return toInteger(lengthProperty.getValue());

			case 8:
				length = _context4.sent;
				return _context4.abrupt("return", Math.min(Math.max(length, 0), MAX_LENGTH));

			case 10:
				return _context4.abrupt("return", 0);

			case 11:
			case "end":
				return _context4.stop();
		}
	}, _marked[3], this);
}

function toPropertyKey(key) {
	return regeneratorRuntime.wrap(function toPropertyKey$(_context5) {
		while (1) switch (_context5.prev = _context5.next) {
			case 0:
				if (!(key && key.isSymbol)) {
					_context5.next = 2;
					break;
				}

				return _context5.abrupt("return", key);

			case 2:
				_context5.next = 4;
				return toString(key);

			case 4:
				return _context5.abrupt("return", _context5.sent);

			case 5:
			case "end":
				return _context5.stop();
		}
	}, _marked[4], this);
}

function toArray(obj, length) {
	var arr,
	    i,
	    _args6 = arguments;
	return regeneratorRuntime.wrap(function toArray$(_context6) {
		while (1) switch (_context6.prev = _context6.next) {
			case 0:
				arr = [];

				if (!obj) {
					_context6.next = 8;
					break;
				}

				if (!(_args6.length < 2)) {
					_context6.next = 6;
					break;
				}

				_context6.next = 5;
				return toLength(obj);

			case 5:
				length = _context6.sent;

			case 6:
				i = 0;

				while (i < length) {
					if (obj.has(i)) {
						arr[i] = obj.getValue(i);
					}

					i++;
				}

			case 8:
				return _context6.abrupt("return", arr);

			case 9:
			case "end":
				return _context6.stop();
		}
	}, _marked[5], this);
}

function getNativeConversion(obj, key, hint) {
	var env, method, value;
	return regeneratorRuntime.wrap(function getNativeConversion$(_context7) {
		while (1) switch (_context7.prev = _context7.next) {
			case 0:
				env = obj[Symbol.for("env")];
				method = obj.getValue(key);
				_context7.next = 4;
				return method.call(obj, [env.objectFactory.createPrimitive(hint)]);

			case 4:
				value = _context7.sent;
				return _context7.abrupt("return", value ? value.toNative() : undefined);

			case 6:
			case "end":
				return _context7.stop();
		}
	}, _marked[6], this);
}

function toPrimitive(obj, preferredType) {
	var hint, toPrimitiveKey;
	return regeneratorRuntime.wrap(function toPrimitive$(_context8) {
		while (1) switch (_context8.prev = _context8.next) {
			case 0:
				hint = preferredType && preferredType.toLowerCase();

				if (!hint && obj) {
					hint = obj.primitiveHint;
				}

				if (!(obj && (!obj.isPrimitive || obj.value != null))) {
					_context8.next = 8;
					break;
				}

				toPrimitiveKey = getEnv(obj).getSymbol("toPrimitive");

				if (!(toPrimitiveKey && obj.has(toPrimitiveKey))) {
					_context8.next = 8;
					break;
				}

				_context8.next = 7;
				return getNativeConversion(obj, toPrimitiveKey, preferredType || "default");

			case 7:
				return _context8.abrupt("return", _context8.sent);

			case 8:
				if (!(obj && obj.isSymbol)) {
					_context8.next = 10;
					break;
				}

				throw TypeError("Cannot convert Symbol to a " + hint);

			case 10:
				if (!(hint === "string")) {
					_context8.next = 14;
					break;
				}

				_context8.next = 13;
				return getString(obj);

			case 13:
				return _context8.abrupt("return", _context8.sent);

			case 14:
				_context8.next = 16;
				return getPrimitive(obj);

			case 16:
				return _context8.abrupt("return", _context8.sent);

			case 17:
			case "end":
				return _context8.stop();
		}
	}, _marked[7], this);
}

function toString(obj) {
	return regeneratorRuntime.wrap(function toString$(_context9) {
		while (1) switch (_context9.prev = _context9.next) {
			case 0:
				_context9.next = 2;
				return toPrimitive(obj, "string");

			case 2:
				_context9.t0 = _context9.sent;
				return _context9.abrupt("return", String(_context9.t0));

			case 4:
			case "end":
				return _context9.stop();
		}
	}, _marked[8], this);
}

function toNumber(obj) {
	return regeneratorRuntime.wrap(function toNumber$(_context10) {
		while (1) switch (_context10.prev = _context10.next) {
			case 0:
				if (!(!obj || obj.type === "undefined")) {
					_context10.next = 2;
					break;
				}

				return _context10.abrupt("return", NaN);

			case 2:
				_context10.next = 4;
				return toPrimitive(obj, "number");

			case 4:
				_context10.t0 = _context10.sent;
				return _context10.abrupt("return", Number(_context10.t0));

			case 6:
			case "end":
				return _context10.stop();
		}
	}, _marked[9], this);
}

function toInteger(obj) {
	var value;
	return regeneratorRuntime.wrap(function toInteger$(_context11) {
		while (1) switch (_context11.prev = _context11.next) {
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
	}, _marked[10], this);
}

function toInt32(obj) {
	var value;
	return regeneratorRuntime.wrap(function toInt32$(_context12) {
		while (1) switch (_context12.prev = _context12.next) {
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
	}, _marked[11], this);
}

function toUInt32(obj) {
	var value;
	return regeneratorRuntime.wrap(function toUInt32$(_context13) {
		while (1) switch (_context13.prev = _context13.next) {
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
	return env.objectFactory.createBuiltInFunction(regeneratorRuntime.mark(function _callee() {
		var thisArg,
		    args,
		    value,
		    _args14 = arguments;
		return regeneratorRuntime.wrap(function _callee$(_context14) {
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

},{"../utils/func":392}],394:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.owns = owns;
var hasOwn = Object.prototype.hasOwnProperty;

function owns(obj, prop) {
	return hasOwn.call(obj, prop);
}

},{}],395:[function(require,module,exports){
"use strict";

var _ops;

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _native = require("./native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
	coerciveEquals: regeneratorRuntime.mark(function coerciveEquals(a, b) {
		var primitiveA, primitiveB;
		return regeneratorRuntime.wrap(function coerciveEquals$(_context) {
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
	relationalCompare: regeneratorRuntime.mark(function relationalCompare(a, b, leftFirst) {
		var primitiveA, primitiveB;
		return regeneratorRuntime.wrap(function relationalCompare$(_context2) {
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
}, _defineProperty(_ops, "==", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context3) {
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
})), _defineProperty(_ops, "!=", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context4) {
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
})), _defineProperty(_ops, "===", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context5) {
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
})), _defineProperty(_ops, "!==", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context6) {
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
})), _defineProperty(_ops, "+", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context7) {
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
					a = _context7.sent;
					_context7.next = 7;
					return (0, _native.toPrimitive)(b);

				case 7:
					b = _context7.sent;
					return _context7.abrupt("return", a + b);

				case 9:
				case "end":
					return _context7.stop();
			}
		}
	}, _, this);
})), _defineProperty(_ops, "-", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context8) {
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
})), _defineProperty(_ops, "/", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context9) {
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
})), _defineProperty(_ops, "*", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context10) {
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
})), _defineProperty(_ops, "%", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context11) {
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
})), _defineProperty(_ops, "<<", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context12) {
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
})), _defineProperty(_ops, ">>", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context13) {
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
})), _defineProperty(_ops, ">>>", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context14) {
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
})), _defineProperty(_ops, "|", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context15) {
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
})), _defineProperty(_ops, "^", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context16) {
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
})), _defineProperty(_ops, "&", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context17) {
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
})), _defineProperty(_ops, "<", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context18) {
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
})), _defineProperty(_ops, "<=", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context19) {
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
})), _defineProperty(_ops, ">", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context20) {
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
})), _defineProperty(_ops, ">=", regeneratorRuntime.mark(function _(a, b) {
	return regeneratorRuntime.wrap(function _$(_context21) {
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
})), _defineProperty(_ops, "in", regeneratorRuntime.mark(function _in(a, b) {
	var bString;
	return regeneratorRuntime.wrap(function _in$(_context22) {
		while (1) {
			switch (_context22.prev = _context22.next) {
				case 0:
					_context22.next = 2;
					return (0, _native.toPropertyKey)(a);

				case 2:
					a = _context22.sent;

					if (!b.isPrimitive) {
						_context22.next = 8;
						break;
					}

					_context22.next = 6;
					return (0, _native.toString)(b);

				case 6:
					bString = _context22.sent;
					throw TypeError("Cannot use 'in' operator to search for '" + a + "' in " + bString);

				case 8:
					return _context22.abrupt("return", b.has(a));

				case 9:
				case "end":
					return _context22.stop();
			}
		}
	}, _in, this);
})), _defineProperty(_ops, "instanceof", function _instanceof(a, b) {
	if (b.type !== "function") {
		throw TypeError("Expecting a function in instanceof check, but got " + b.type);
	}

	if (a.isPrimitive) {
		return false;
	}

	return b.hasInstance(a);
}), _ops);

exports.default = ops;

},{"./native":393}],396:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ArrayExpression;

var _async = require("../utils/async");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ArrayExpression].map(regeneratorRuntime.mark);

function ArrayExpression(node, context, next) {
	var _this = this;

	var objectFactory, arr;
	return regeneratorRuntime.wrap(function ArrayExpression$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
			case 0:
				objectFactory = context.env.objectFactory;
				arr = objectFactory.createArray();

				if (!node.elements) {
					_context3.next = 4;
					break;
				}

				return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
					var spreadOffset;
					return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									spreadOffset = 0;
									return _context2.delegateYield((0, _async.each)(node.elements, regeneratorRuntime.mark(function _callee(element, index) {
										var value, it, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step;

										return regeneratorRuntime.wrap(function _callee$(_context) {
											while (1) {
												switch (_context.prev = _context.next) {
													case 0:
														if (!element) {
															_context.next = 28;
															break;
														}

														_context.next = 3;
														return next(element, context);

													case 3:
														value = _context.sent.result.getValue();

														if (!element.isSpreadElement()) {
															_context.next = 27;
															break;
														}

														it = _iterators2.default.getIterator(value);
														_iteratorNormalCompletion = true;
														_didIteratorError = false;
														_iteratorError = undefined;
														_context.prev = 9;

														for (_iterator = it[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
															value = _step.value.value;

															arr.setIndex(index + spreadOffset, value);
															spreadOffset++;
														}
														_context.next = 17;
														break;

													case 13:
														_context.prev = 13;
														_context.t0 = _context["catch"](9);
														_didIteratorError = true;
														_iteratorError = _context.t0;

													case 17:
														_context.prev = 17;
														_context.prev = 18;

														if (!_iteratorNormalCompletion && _iterator.return) {
															_iterator.return();
														}

													case 20:
														_context.prev = 20;

														if (!_didIteratorError) {
															_context.next = 23;
															break;
														}

														throw _iteratorError;

													case 23:
														return _context.finish(20);

													case 24:
														return _context.finish(17);

													case 25:
														_context.next = 28;
														break;

													case 27:
														arr.setIndex(index + spreadOffset, value);

													case 28:
													case "end":
														return _context.stop();
												}
											}
										}, _callee, this, [[9, 13, 17, 25], [18,, 20, 24]]);
									})), "t0", 2);

								case 2:

									arr.setValue("length", objectFactory.createPrimitive(node.elements.length + spreadOffset));

								case 3:
								case "end":
									return _context2.stop();
							}
						}
					}, _callee2, _this);
				})(), "t0", 4);

			case 4:
				return _context3.abrupt("return", context.result(arr));

			case 5:
			case "end":
				return _context3.stop();
		}
	}, _marked[0], this);
}

},{"../iterators/":367,"../utils/async":390}],397:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AssignmentExpression;

var _assign = require("../utils/assign");

var _marked = [AssignmentExpression].map(regeneratorRuntime.mark);

function AssignmentExpression(node, context, next) {
	var right, rightValue, left, op, nativeValue;
	return regeneratorRuntime.wrap(function AssignmentExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				_context.next = 2;
				return next(node.right, context);

			case 2:
				right = _context.sent.result;
				rightValue = right.getValue();

				if (!(node.operator === "=")) {
					_context.next = 9;
					break;
				}

				_context.next = 7;
				return (0, _assign.assign)(context.env, node.left, rightValue);

			case 7:
				_context.next = 18;
				break;

			case 9:
				_context.next = 11;
				return next(node.left, context);

			case 11:
				left = _context.sent.result;

				// remove equals
				op = node.operator.slice(0, -1);
				_context.next = 15;
				return context.env.ops[op](left.getValue(), rightValue);

			case 15:
				nativeValue = _context.sent;

				rightValue = context.env.objectFactory.createPrimitive(nativeValue);
				left.setValue(rightValue, context.env.isStrict());

			case 18:
				return _context.abrupt("return", context.result(rightValue));

			case 19:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{"../utils/assign":389}],398:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = BinaryExpression;

var _primitiveType = require("../types/primitive-type");

var _marked = [BinaryExpression].map(regeneratorRuntime.mark);

function BinaryExpression(node, context, next) {
	var left, leftValue, right, rightValue, op, newValue;
	return regeneratorRuntime.wrap(function BinaryExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../types/primitive-type":383}],399:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = BlockStatement;

var _async = require("../utils/async");

var _marked = [BlockStatement].map(regeneratorRuntime.mark);

function BlockStatement(node, context, next) {
	var scope;
	return regeneratorRuntime.wrap(function BlockStatement$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
			case 0:
				context = context.create();

				scope = context.env.createBlockScope(node);
				_context3.next = 4;
				return scope.use(regeneratorRuntime.mark(function _callee2() {
					var result, priorResult;
					return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									result = undefined, priorResult = undefined;
									return _context2.delegateYield((0, _async.each)(node.body, regeneratorRuntime.mark(function _callee(child, i, body, abort) {
										return regeneratorRuntime.wrap(function _callee$(_context) {
											while (1) {
												switch (_context.prev = _context.next) {
													case 0:
														_context.next = 2;
														return next(child, context);

													case 2:
														result = _context.sent;

														if (context.shouldBreak(result)) {
															abort();
															result = context.abrupt(result, priorResult);
														}

														priorResult = result;

													case 5:
													case "end":
														return _context.stop();
												}
											}
										}, _callee, this);
									})), "t0", 2);

								case 2:
									return _context2.abrupt("return", result);

								case 3:
								case "end":
									return _context2.stop();
							}
						}
					}, _callee2, this);
				}));

			case 4:
				return _context3.abrupt("return", _context3.sent);

			case 5:
			case "end":
				return _context3.stop();
		}
	}, _marked[0], this);
}

},{"../utils/async":390}],400:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CallExpression;

var _propertyReference = require("../env/property-reference");

var _native = require("../utils/native");

var _primitiveType = require("../types/primitive-type");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [CallExpression].map(regeneratorRuntime.mark);

function assignThis(env, fnMember, fn, isNew, native) {
	if (isNew) {
		return null;
	}

	if (fnMember instanceof _propertyReference.PropertyReference && (!fnMember.unqualified || fnMember.base !== env.global)) {
		var thisArg = fnMember.base;
		if (env.options.ecmaVersion === 5) {
			return (0, _native.toObject)(thisArg);
		}

		return thisArg;
	}

	return null;
}

function CallExpression(node, context, next) {
	var isNew, fnMember, fn, args, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg, value, it, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, stringValue, native, thisArg, callee, result;

	return regeneratorRuntime.wrap(function CallExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				isNew = node.isNewExpression();
				_context.next = 3;
				return next(node.callee, context);

			case 3:
				fnMember = _context.sent.result;
				fn = fnMember.getValue();
				args = [];
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				_context.prev = 9;
				_iterator = node.arguments[Symbol.iterator]();

			case 11:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					_context.next = 43;
					break;
				}

				arg = _step.value;
				_context.next = 15;
				return next(arg, context);

			case 15:
				value = _context.sent.result.getValue();

				if (!arg.isSpreadElement()) {
					_context.next = 39;
					break;
				}

				it = _iterators2.default.getIterator(value);
				_iteratorNormalCompletion2 = true;
				_didIteratorError2 = false;
				_iteratorError2 = undefined;
				_context.prev = 21;

				for (_iterator2 = it[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					value = _step2.value.value;

					args.push(value);
				}
				_context.next = 29;
				break;

			case 25:
				_context.prev = 25;
				_context.t0 = _context["catch"](21);
				_didIteratorError2 = true;
				_iteratorError2 = _context.t0;

			case 29:
				_context.prev = 29;
				_context.prev = 30;

				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}

			case 32:
				_context.prev = 32;

				if (!_didIteratorError2) {
					_context.next = 35;
					break;
				}

				throw _iteratorError2;

			case 35:
				return _context.finish(32);

			case 36:
				return _context.finish(29);

			case 37:
				_context.next = 40;
				break;

			case 39:
				args.push(value);

			case 40:
				_iteratorNormalCompletion = true;
				_context.next = 11;
				break;

			case 43:
				_context.next = 49;
				break;

			case 45:
				_context.prev = 45;
				_context.t1 = _context["catch"](9);
				_didIteratorError = true;
				_iteratorError = _context.t1;

			case 49:
				_context.prev = 49;
				_context.prev = 50;

				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}

			case 52:
				_context.prev = 52;

				if (!_didIteratorError) {
					_context.next = 55;
					break;
				}

				throw _iteratorError;

			case 55:
				return _context.finish(52);

			case 56:
				return _context.finish(49);

			case 57:
				if (!(!fn || fn.className !== "Function")) {
					_context.next = 62;
					break;
				}

				_context.next = 60;
				return (0, _native.toString)(fn);

			case 60:
				stringValue = _context.sent;
				throw TypeError(stringValue + " not a function");

			case 62:
				native = fn.native;
				thisArg = assignThis(context.env, fnMember, fn, isNew, native);
				callee = fnMember;

				callee.identifier = fn.name;
				_context.next = 68;
				return fn[isNew ? "construct" : "call"](thisArg, args, callee);

			case 68:
				result = _context.sent;
				return _context.abrupt("return", context.result(result || _primitiveType.UNDEFINED));

			case 70:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this, [[9, 45, 49, 57], [21, 25, 29, 37], [30,, 32, 36], [50,, 52, 56]]);
}

},{"../env/property-reference":196,"../iterators/":367,"../types/primitive-type":383,"../utils/native":393}],401:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DebuggerStatement;
function DebuggerStatement(node, context) {
	if (context.env.options.allowDebugger) {
		/* eslint-disable no-debugger */
		debugger;
		/* eslint-enable no-debugger */
	}

	return context.empty();
}

},{}],402:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DoWhileStatement;

var _native = require("../utils/native");

var _marked = [DoWhileStatement].map(regeneratorRuntime.mark);

function DoWhileStatement(node, context, next) {
	var result, priorResult, passed;
	return regeneratorRuntime.wrap(function DoWhileStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				context = context.createLoop();

				result = undefined, priorResult = undefined;
				passed = true;

				if (!node.isWhileStatement()) {
					_context.next = 8;
					break;
				}

				_context.next = 6;
				return next(node.test, context);

			case 6:
				_context.t0 = _context.sent.result.getValue();
				passed = (0, _native.toBoolean)(_context.t0);

			case 8:
				if (!passed) {
					_context.next = 21;
					break;
				}

				_context.next = 11;
				return next(node.body, context);

			case 11:
				result = _context.sent;

				if (!context.shouldBreak(result)) {
					_context.next = 14;
					break;
				}

				return _context.abrupt("return", context.abrupt(result, priorResult));

			case 14:
				_context.next = 16;
				return next(node.test, context);

			case 16:
				_context.t1 = _context.sent.result.getValue();
				passed = (0, _native.toBoolean)(_context.t1);

				priorResult = result;
				_context.next = 8;
				break;

			case 21:
				return _context.abrupt("return", result || context.empty());

			case 22:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{"../utils/native":393}],403:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = EmptyStatement;
function EmptyStatement(node, context) {
	return context.empty();
}

},{}],404:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ExpressionStatement;

var _primitiveType = require("../types/primitive-type");

var _marked = [ExpressionStatement].map(regeneratorRuntime.mark);

function ExpressionStatement(node, context, next) {
	var executionResult, executionValue;
	return regeneratorRuntime.wrap(function ExpressionStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../types/primitive-type":383}],405:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ForInStatement;

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

var _assign = require("../utils/assign");

var _marked = [ForInStatement].map(regeneratorRuntime.mark);

function ForInStatement(node, context, next) {
	var obj, it, advance, done, result, priorResult, scope, itResult;
	return regeneratorRuntime.wrap(function ForInStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				_context.next = 2;
				return next(node.right, context);

			case 2:
				obj = _context.sent.result.getValue();

				if (!(0, _contracts.isNullOrUndefined)(obj)) {
					_context.next = 5;
					break;
				}

				return _context.abrupt("return", context.empty());

			case 5:

				context = context.createLoop();

				it = obj.getIterator(context.env);
				advance = it.getValue("next");
				done = false;
				result = undefined, priorResult = undefined;

			case 10:
				if (done) {
					_context.next = 29;
					break;
				}

				scope = context.env.createBlockScope(node);
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
				return (0, _assign.declare)(context.env, node.left, itResult.getValue("value"));

			case 19:
				_context.next = 21;
				return next(node.body, context);

			case 21:
				result = _context.sent;

				if (!context.shouldBreak(result)) {
					_context.next = 25;
					break;
				}

				scope.exit();
				return _context.abrupt("return", context.abrupt(result, priorResult));

			case 25:

				scope.exit();
				priorResult = result;
				_context.next = 10;
				break;

			case 29:
				return _context.abrupt("return", result || context.empty());

			case 30:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{"../utils/assign":389,"../utils/contracts":391,"../utils/native":393}],406:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ForOfStatement;

var _contracts = require("../utils/contracts");

var _assign = require("../utils/assign");

var _iterators = require("../iterators/");

var _iterators2 = _interopRequireDefault(_iterators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [ForOfStatement].map(regeneratorRuntime.mark);

function ForOfStatement(node, context, next) {
	var obj, it, done, result, priorResult, scope, current, _it$next;

	return regeneratorRuntime.wrap(function ForOfStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				_context.next = 2;
				return next(node.right, context);

			case 2:
				obj = _context.sent.result.getValue();

				if (!(0, _contracts.isNullOrUndefined)(obj)) {
					_context.next = 5;
					break;
				}

				return _context.abrupt("return", context.empty());

			case 5:

				context = context.createLoop();

				it = _iterators2.default.getIterator(obj); // obj.getIterator(context.env);
				// let advance = it.getValue("next");

				done = false;
				result = undefined, priorResult = undefined;

			case 9:
				if (done) {
					_context.next = 27;
					break;
				}

				scope = context.env.createBlockScope(node);
				current = undefined;
				_it$next = it.next();
				done = _it$next.done;
				current = _it$next.value;

				if (done) {
					_context.next = 22;
					break;
				}

				_context.next = 18;
				return (0, _assign.declare)(context.env, node.left, current.value);

			case 18:
				_context.next = 20;
				return next(node.body, context);

			case 20:
				result = _context.sent;

				if (context.shouldBreak(result)) {
					done = true;
					result = context.abrupt(result, priorResult);
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
				return _context.abrupt("return", result || context.empty());

			case 28:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{"../iterators/":367,"../utils/assign":389,"../utils/contracts":391}],407:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ForStatement;

var _native = require("../utils/native");

var _marked = [shouldContinue, ForStatement].map(regeneratorRuntime.mark);

function shouldContinue(node, context, next) {
	return regeneratorRuntime.wrap(function shouldContinue$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

function ForStatement(node, context, next) {
	var scope, result, priorResult;
	return regeneratorRuntime.wrap(function ForStatement$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				context = context.createLoop();

				scope = context.env.createBlockScope(node);

				if (!node.init) {
					_context2.next = 5;
					break;
				}

				_context2.next = 5;
				return next(node.init, context);

			case 5:
				result = undefined, priorResult = undefined;

			case 6:
				_context2.next = 8;
				return shouldContinue(node.test, context, next);

			case 8:
				if (!_context2.sent) {
					_context2.next = 23;
					break;
				}

				_context2.next = 11;
				return next(node.body, context);

			case 11:
				result = _context2.sent;

				if (!context.shouldBreak(result)) {
					_context2.next = 14;
					break;
				}

				return _context2.abrupt("return", context.abrupt(result, priorResult));

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
				return next(node.update, context);

			case 21:
				_context2.next = 6;
				break;

			case 23:

				scope.exit();
				return _context2.abrupt("return", result || context.empty());

			case 25:
			case "end":
				return _context2.stop();
		}
	}, _marked[1], this);
}

},{"../utils/native":393}],408:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FunctionDeclaration;
function FunctionDeclaration(node, context) {
	var func = context.env.getValue(node.id.name);
	if (func && func.className === "Function") {
		func.bindScope(context.env.current);
	}

	return context.result(func);
}

},{}],409:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FunctionExpression;
function getName(node) {
	if (node.name) {
		return node.name;
	}

	if (node.id) {
		return node.id.name;
	}

	if (node.isLiteral()) {
		return node.value;
	}

	var parent = node.getParent();
	if (parent.isVariableDeclarator()) {
		return getName(parent);
	}

	if (parent.isProperty()) {
		if (parent.kind === "get" || parent.kind === "set") {
			return parent.kind + " " + getName(parent.key);
		}

		return getName(parent.key);
	}

	return "";
}

function FunctionExpression(node, context) {
	var objectFactory = context.env.objectFactory;
	var strict = context.env.isStrict() || node.body.isStrict();
	var func = objectFactory.createFunction(node, undefined, { strict: strict, name: getName(node) });

	func.bindScope(context.env.current);

	return context.result(func);
}

},{}],410:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Identifier;
function Identifier(node, context) {
	var name = node.name;

	if (context.callee && context.callee.identifier === name) {
		return context.result(context.callee);
	}

	return context.result(context.env.getReference(node.name));
}

},{}],411:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = IfStatement;

var _native = require("../utils/native");

var _marked = [IfStatement].map(regeneratorRuntime.mark);

function IfStatement(node, context, next) {
	var testValue;
	return regeneratorRuntime.wrap(function IfStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../utils/native":393}],412:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
	ConditionalExpression: _ifStatement2.default,
	DebuggerStatement: _debuggerStatement2.default,
	DoWhileStatement: _doWhileStatement2.default,
	EmptyStatement: _emptyStatement2.default,
	ExpressionStatement: _expressionStatement2.default,
	ForStatement: _forStatement2.default,
	ForInStatement: _forInStatement2.default,
	ForOfStatement: _forOfStatement2.default,
	FunctionDeclaration: _functionDeclaration2.default,
	FunctionExpression: _functionExpression2.default,
	Identifier: _identifier2.default,
	LabeledStatement: _labeledStatement2.default,
	Literal: _literal2.default,
	LogicalExpression: _logicalExpression2.default,
	MemberExpression: _memberExpression2.default,
	MetaProperty: _metaProperty2.default,
	ObjectExpression: _objectExpression2.default,
	ReturnStatement: _returnStatement2.default,
	SequenceExpression: _sequenceExpression2.default,
	SpreadElement: _spreadElement2.default,
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

	ArrowFunctionExpression: _functionExpression2.default,
	ContinueStatement: _interruptStatement2.default,
	IfStatement: _ifStatement2.default,
	NewExpression: _callExpression2.default,
	Program: _blockStatement2.default,
	WhileStatement: _doWhileStatement2.default
};

},{"./array-expression":396,"./assignment-expression":397,"./binary-expression":398,"./block-statement":399,"./call-expression":400,"./debugger-statement":401,"./do-while-statement.js":402,"./empty-statement":403,"./expression-statement":404,"./for-in-statement":405,"./for-of-statement":406,"./for-statement":407,"./function-declaration":408,"./function-expression":409,"./identifier":410,"./if-statement":411,"./interrupt-statement":413,"./labeled-statement":414,"./literal":415,"./logical-expression":416,"./member-expression":417,"./meta-property":418,"./object-expression":419,"./return-statement":420,"./sequence-expression":421,"./spread-element":422,"./switch-statement":423,"./tagged-template-expression":424,"./template-literal":425,"./this-expression":426,"./throw-statement":427,"./try-statement":428,"./unary-expression":429,"./update-expression":430,"./variable-declaration":431,"./variable-declarator":432,"./with-statement":433}],413:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

},{}],414:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LabeledStatement;

var _marked = [LabeledStatement].map(regeneratorRuntime.mark);

function LabeledStatement(node, context, next) {
	var result;
	return regeneratorRuntime.wrap(function LabeledStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
};

},{}],415:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Literal;
function Literal(node, context) {
	return context.result(context.env.objectFactory.createPrimitive(node.value));
}

},{}],416:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicalExpression;

var _native = require("../utils/native");

var _marked = [LogicalExpression].map(regeneratorRuntime.mark);

function LogicalExpression(node, context, next) {
	var left, passed;
	return regeneratorRuntime.wrap(function LogicalExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../utils/native":393}],417:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MemberExpression;

var _propertyReference = require("../env/property-reference");

var _native = require("../utils/native");

var _marked = [MemberExpression].map(regeneratorRuntime.mark);

function MemberExpression(node, context, next) {
	var obj, key, value, id;
	return regeneratorRuntime.wrap(function MemberExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../env/property-reference":196,"../utils/native":393}],418:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MetaProperty;
function MetaProperty(node, context) {
	if (node.meta.name === "new" && node.property.name === "target" && context.isNew) {
		return context.result(context.callee);
	}

	return context.empty();
}

},{}],419:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ObjectExpression;

var _contracts = require("../utils/contracts");

var _async = require("../utils/async");

var _native = require("../utils/native");

var _marked = [ObjectExpression].map(regeneratorRuntime.mark);

function setDescriptor(env, obj, descriptor) {
	var strict = env.isStrict();

	if (descriptor.get) {
		(0, _contracts.assertAreValidArguments)(descriptor.get.node.params, strict);
		descriptor.getter = regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
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
		descriptor.setter = regeneratorRuntime.mark(function _callee2(value) {
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

	obj.defineOwnProperty(descriptor.key, descriptor);
}

function createDescriptor(key, value) {
	return { key: key, value: value, configurable: true, enumerable: true, writable: true };
}

function ObjectExpression(node, context, next) {
	var obj, descriptors, prop;
	return regeneratorRuntime.wrap(function ObjectExpression$(_context4) {
		while (1) switch (_context4.prev = _context4.next) {
			case 0:
				obj = context.env.objectFactory.createObject();
				descriptors = Object.create(null);
				return _context4.delegateYield((0, _async.each)(node.properties, regeneratorRuntime.mark(function _callee3(property) {
					var value, key, keyValue;
					return regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return next(property.value, context);

								case 2:
									value = _context3.sent.result.getValue();
									key = undefined;

									if (!property.computed) {
										_context3.next = 13;
										break;
									}

									_context3.next = 7;
									return next(property.key, context);

								case 7:
									keyValue = _context3.sent.result.getValue();
									_context3.next = 10;
									return (0, _native.toPropertyKey)(keyValue);

								case 10:
									key = _context3.sent;
									_context3.next = 14;
									break;

								case 13:
									key = property.key.name || property.key.value;

								case 14:
									_context3.t0 = property.kind;
									_context3.next = _context3.t0 === "get" ? 17 : _context3.t0 === "set" ? 17 : 20;
									break;

								case 17:
									descriptors[key] = descriptors[key] || createDescriptor(key);
									descriptors[key][property.kind] = value;
									return _context3.abrupt("break", 22);

								case 20:
									obj.defineOwnProperty(key, createDescriptor(key, value));
									return _context3.abrupt("break", 22);

								case 22:
								case "end":
									return _context3.stop();
							}
						}
					}, _callee3, this);
				})), "t0", 3);

			case 3:

				for (prop in descriptors) {
					setDescriptor(context.env, obj, descriptors[prop]);
				}

				return _context4.abrupt("return", context.result(obj));

			case 5:
			case "end":
				return _context4.stop();
		}
	}, _marked[0], this);
}

},{"../utils/async":390,"../utils/contracts":391,"../utils/native":393}],420:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ReturnStatement;

var _primitiveType = require("../types/primitive-type");

var _marked = [ReturnStatement].map(regeneratorRuntime.mark);

function ReturnStatement(node, context, next) {
	var arg;
	return regeneratorRuntime.wrap(function ReturnStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../types/primitive-type":383}],421:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SequenceExpression;

var _async = require("../utils/async");

var _marked = [SequenceExpression].map(regeneratorRuntime.mark);

function SequenceExpression(node, context, next) {
	var value;
	return regeneratorRuntime.wrap(function SequenceExpression$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				value = undefined;
				_context2.next = 3;
				return (0, _async.each)(node.expressions, regeneratorRuntime.mark(function _callee(expr) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return next(expr, context);

								case 2:
									value = _context.sent.result.getValue();

								case 3:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

			case 3:
				return _context2.abrupt("return", context.result(value));

			case 4:
			case "end":
				return _context2.stop();
		}
	}, _marked[0], this);
}

},{"../utils/async":390}],422:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SpreadElement;

var _marked = [SpreadElement].map(regeneratorRuntime.mark);

function SpreadElement(node, context, next) {
	var args;
	return regeneratorRuntime.wrap(function SpreadElement$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				_context.next = 2;
				return next(node.argument, context);

			case 2:
				args = _context.sent;
				return _context.abrupt("return", context.result(args.result));

			case 4:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{}],423:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SwitchStatement;

var _async = require("../utils/async");

var _marked = [executeStatements, SwitchStatement].map(regeneratorRuntime.mark);

function executeStatements(context, statements, next) {
	var result;
	return regeneratorRuntime.wrap(function executeStatements$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				result = undefined;
				_context2.next = 3;
				return (0, _async.each)(statements, regeneratorRuntime.mark(function _callee(statement, i, all, abort) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return next(statement, context, next);

								case 2:
									result = _context.sent;

									if (result && result.isAbrupt()) {
										abort();
									}

								case 4:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

			case 3:
				return _context2.abrupt("return", result);

			case 4:
			case "end":
				return _context2.stop();
		}
	}, _marked[0], this);
}

function SwitchStatement(node, context, next) {
	var testValue, passed, value, defaultCase, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, current, caseValue;

	return regeneratorRuntime.wrap(function SwitchStatement$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
			case 0:
				_context3.next = 2;
				return next(node.discriminant, context);

			case 2:
				testValue = _context3.sent.result.getValue();
				passed = false;
				value = undefined, defaultCase = undefined;
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				_context3.prev = 8;
				_iterator = node.cases[Symbol.iterator]();

			case 10:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					_context3.next = 33;
					break;
				}

				current = _step.value;

				if (passed) {
					_context3.next = 23;
					break;
				}

				if (!current.test) {
					_context3.next = 21;
					break;
				}

				_context3.next = 16;
				return next(current.test, context);

			case 16:
				caseValue = _context3.sent.result.getValue();

				if (context.env.ops.strictEquals(caseValue, testValue)) {
					_context3.next = 19;
					break;
				}

				return _context3.abrupt("continue", 30);

			case 19:
				_context3.next = 23;
				break;

			case 21:
				// default might not be the last case
				defaultCase = current;
				return _context3.abrupt("continue", 30);

			case 23:

				passed = true;
				_context3.next = 26;
				return executeStatements(context, current.consequent, next);

			case 26:
				value = _context3.sent;

				if (!(value && value.isAbrupt())) {
					_context3.next = 30;
					break;
				}

				value.cancel = false;
				return _context3.abrupt("return", value);

			case 30:
				_iteratorNormalCompletion = true;
				_context3.next = 10;
				break;

			case 33:
				_context3.next = 39;
				break;

			case 35:
				_context3.prev = 35;
				_context3.t0 = _context3["catch"](8);
				_didIteratorError = true;
				_iteratorError = _context3.t0;

			case 39:
				_context3.prev = 39;
				_context3.prev = 40;

				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}

			case 42:
				_context3.prev = 42;

				if (!_didIteratorError) {
					_context3.next = 45;
					break;
				}

				throw _iteratorError;

			case 45:
				return _context3.finish(42);

			case 46:
				return _context3.finish(39);

			case 47:
				if (!(!passed && defaultCase && defaultCase.consequent)) {
					_context3.next = 53;
					break;
				}

				_context3.next = 50;
				return executeStatements(context, defaultCase.consequent, next);

			case 50:
				value = _context3.sent;

				value.cancel = false;
				return _context3.abrupt("return", value);

			case 53:
				return _context3.abrupt("return", value);

			case 54:
			case "end":
				return _context3.stop();
		}
	}, _marked[1], this, [[8, 35, 39, 47], [40,, 42, 46]]);
}

},{"../utils/async":390}],424:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TaggedTemplateExpression;

var _async = require("../utils/async");

var _marked = [TaggedTemplateExpression].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var templateObjectCache = Object.create(null);

function buildTemplateObject(env, node) {
	// per spec, template objects are cached
	var key = JSON.stringify(node.quasis.map(function (q) {
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
	tag.defineOwnProperty("raw", { value: raw });
	tag.freeze();

	return templateObjectCache[key] = tag;
}

function TaggedTemplateExpression(node, context, next) {
	var templateObject, values, callee, func, value;
	return regeneratorRuntime.wrap(function TaggedTemplateExpression$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				templateObject = buildTemplateObject(context.env, node.quasi);
				_context2.next = 3;
				return (0, _async.map)(node.quasi.expressions, regeneratorRuntime.mark(function _callee(expr) {
					var value;
					return regeneratorRuntime.wrap(function _callee$(_context) {
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
				return func.call(callee.base, [templateObject].concat(_toConsumableArray(values)), callee);

			case 10:
				value = _context2.sent;
				return _context2.abrupt("return", context.result(value));

			case 12:
			case "end":
				return _context2.stop();
		}
	}, _marked[0], this);
}

},{"../utils/async":390}],425:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TemplateLiteral;

var _async = require("../utils/async");

var _native = require("../utils/native");

var _marked = [TemplateLiteral].map(regeneratorRuntime.mark);

function TemplateLiteral(node, context, next) {
	var values, result, quasis, i, ln;
	return regeneratorRuntime.wrap(function TemplateLiteral$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				_context2.next = 2;
				return (0, _async.map)(node.expressions, regeneratorRuntime.mark(function _callee(expr) {
					var value;
					return regeneratorRuntime.wrap(function _callee$(_context) {
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
	}, _marked[0], this);
}

},{"../utils/async":390,"../utils/native":393}],426:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ThisExpression;

var _contracts = require("../utils/contracts");

function ThisExpression(node, context) {
	var thisArg = context.env.getThisBinding();
	if ((0, _contracts.isNullOrUndefined)(thisArg) && !context.env.isStrict()) {
		thisArg = context.env.global;
	}

	return context.result(thisArg);
}

},{"../utils/contracts":391}],427:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ThrowStatement;

var _marked = [ThrowStatement].map(regeneratorRuntime.mark);

function ThrowStatement(node, context, next) {
	var arg;
	return regeneratorRuntime.wrap(function ThrowStatement$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{}],428:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TryStatement;

var _contracts = require("../utils/contracts");

var _async = require("../utils/async");

var _assign = require("../utils/assign");

var _marked = [tryCatch, executeBlock, TryStatement].map(regeneratorRuntime.mark);

function tryCatch(node, context, next) {
	return regeneratorRuntime.wrap(function tryCatch$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this, [[0, 6]]);
}

function executeBlock(context, body, swallow, next) {
	var result;
	return regeneratorRuntime.wrap(function executeBlock$(_context3) {
		while (1) switch (_context3.prev = _context3.next) {
			case 0:
				result = undefined;
				_context3.next = 3;
				return (0, _async.each)(body, regeneratorRuntime.mark(function _callee(node, i, all, abort) {
					return regeneratorRuntime.wrap(function _callee$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									if (!swallow) {
										_context2.next = 5;
										break;
									}

									return _context2.delegateYield(tryCatch(node, context, next), "t0", 2);

								case 2:
									result = _context2.t0;
									_context2.next = 8;
									break;

								case 5:
									_context2.next = 7;
									return next(node, context);

								case 7:
									result = _context2.sent;

								case 8:

									if (result.isAbrupt()) {
										abort();
									}

								case 9:
								case "end":
									return _context2.stop();
							}
						}
					}, _callee, this);
				}));

			case 3:
				return _context3.abrupt("return", result);

			case 4:
			case "end":
				return _context3.stop();
		}
	}, _marked[1], this);
}

function TryStatement(node, context, next) {
	var result, finalizerResult, scope;
	return regeneratorRuntime.wrap(function TryStatement$(_context5) {
		while (1) switch (_context5.prev = _context5.next) {
			case 0:
				_context5.next = 2;
				return executeBlock(context, node.block.body, true, next);

			case 2:
				result = _context5.sent;
				finalizerResult = undefined;
				// let shouldRaise = false;
				// let shouldReturn = false;

				if (!(result && result.raised)) {
					_context5.next = 12;
					break;
				}

				if (!node.handler) {
					_context5.next = 12;
					break;
				}

				// todo: isn't this check already handled?
				// let errVar = node.handler.param.name;
				// assertIsValidIdentifier(errVar, context.env.isStrict());

				scope = context.env.createScope();
				// context.env.createVariable(errVar);
				// context.env.setValue(errVar, result.result);

				_context5.next = 9;
				return (0, _assign.declare)(context.env, node.handler.param, result.result);

			case 9:
				_context5.next = 11;
				return scope.use(regeneratorRuntime.mark(function _callee2() {
					return regeneratorRuntime.wrap(function _callee2$(_context4) {
						while (1) {
							switch (_context4.prev = _context4.next) {
								case 0:
									_context4.next = 2;
									return executeBlock(context, node.handler.body.body, true, next);

								case 2:
									return _context4.abrupt("return", _context4.sent);

								case 3:
								case "end":
									return _context4.stop();
							}
						}
					}, _callee2, this);
				}));

			case 11:
				result = _context5.sent;

			case 12:
				if (!node.finalizer) {
					_context5.next = 18;
					break;
				}

				_context5.next = 15;
				return executeBlock(context, node.finalizer.body, false, next);

			case 15:
				finalizerResult = _context5.sent;

				if (!(finalizerResult && finalizerResult.isAbrupt())) {
					_context5.next = 18;
					break;
				}

				return _context5.abrupt("return", finalizerResult);

			case 18:
				return _context5.abrupt("return", result || context.empty());

			case 19:
			case "end":
				return _context5.stop();
		}
	}, _marked[2], this);
}

},{"../utils/assign":389,"../utils/async":390,"../utils/contracts":391}],429:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = UnaryExpression;

var _reference = require("../env/reference");

var _propertyReference = require("../env/property-reference");

var _native = require("../utils/native");

var _marked = [UnaryExpression].map(regeneratorRuntime.mark);

function UnaryExpression(node, context, next) {
	var objectFactory, result, value, newValue, type, deleted, resolved;
	return regeneratorRuntime.wrap(function UnaryExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				objectFactory = context.env.objectFactory;
				_context.next = 3;
				return next(node.argument, context);

			case 3:
				result = _context.sent.result;
				value = undefined, newValue = undefined;
				_context.t0 = node.operator;
				_context.next = _context.t0 === "typeof" ? 8 : _context.t0 === "-" ? 12 : _context.t0 === "+" ? 19 : _context.t0 === "!" ? 26 : _context.t0 === "~" ? 29 : _context.t0 === "delete" ? 36 : _context.t0 === "void" ? 49 : 51;
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
				return _context.abrupt("break", 52);

			case 12:
				value = result.getValue();
				_context.t1 = objectFactory;
				_context.next = 16;
				return (0, _native.toNumber)(value);

			case 16:
				_context.t2 = -_context.sent;
				newValue = _context.t1.createPrimitive.call(_context.t1, _context.t2);
				return _context.abrupt("break", 52);

			case 19:
				value = result.getValue();
				_context.t3 = objectFactory;
				_context.next = 23;
				return (0, _native.toNumber)(value);

			case 23:
				_context.t4 = +_context.sent;
				newValue = _context.t3.createPrimitive.call(_context.t3, _context.t4);
				return _context.abrupt("break", 52);

			case 26:
				value = result.getValue();
				newValue = objectFactory.createPrimitive(!(0, _native.toBoolean)(value));
				return _context.abrupt("break", 52);

			case 29:
				value = result.getValue();
				_context.t5 = objectFactory;
				_context.next = 33;
				return (0, _native.toInt32)(value);

			case 33:
				_context.t6 = ~_context.sent;
				newValue = _context.t5.createPrimitive.call(_context.t5, _context.t6);
				return _context.abrupt("break", 52);

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
				return _context.abrupt("break", 52);

			case 49:
				newValue = objectFactory.createPrimitive(undefined);
				return _context.abrupt("break", 52);

			case 51:
				throw SyntaxError("Unknown unary operator: " + node.operator);

			case 52:
				return _context.abrupt("return", context.result(newValue));

			case 53:
			case "end":
				return _context.stop();
		}
	}, _marked[0], this);
}

},{"../env/property-reference":196,"../env/reference":197,"../utils/native":393}],430:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = UpdateExpression;

var _native = require("../utils/native");

var _contracts = require("../utils/contracts");

var _marked = [UpdateExpression].map(regeneratorRuntime.mark);

function UpdateExpression(node, context, next) {
	var objectFactory, ref, originalValue, newValue, newWrappedValue, returnValue;
	return regeneratorRuntime.wrap(function UpdateExpression$(_context) {
		while (1) switch (_context.prev = _context.next) {
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
	}, _marked[0], this);
}

},{"../utils/contracts":391,"../utils/native":393}],431:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = VariableDeclaration;

var _async = require("../utils/async");

var _marked = [VariableDeclaration].map(regeneratorRuntime.mark);

function VariableDeclaration(node, context, next) {
	return regeneratorRuntime.wrap(function VariableDeclaration$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
			case 0:
				_context2.next = 2;
				return (0, _async.each)(node.declarations, regeneratorRuntime.mark(function _callee(decl) {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return next(decl, context);

								case 2:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

			case 2:
				return _context2.abrupt("return", context.empty());

			case 3:
			case "end":
				return _context2.stop();
		}
	}, _marked[0], this);
}

},{"../utils/async":390}],432:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = VariableDeclarator;

var _primitiveType = require("../types/primitive-type");

var _assign = require("../utils/assign");

var _marked = [VariableDeclarator].map(regeneratorRuntime.mark);

function VariableDeclarator(node, context, next) {
	var rightValue, propInfo;
	return regeneratorRuntime.wrap(function VariableDeclarator$(_context) {
		while (1) switch (_context.prev = _context.next) {
			case 0:
				// let name = node.id.name;
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
	}, _marked[0], this);
}

},{"../types/primitive-type":383,"../utils/assign":389}],433:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = WithStatement;

var _contracts = require("../utils/contracts");

var _marked = [WithStatement].map(regeneratorRuntime.mark);

function WithStatement(node, context, next) {
	var obj, scope;
	return regeneratorRuntime.wrap(function WithStatement$(_context2) {
		while (1) switch (_context2.prev = _context2.next) {
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

				if (!(0, _contracts.isNullOrUndefined)(obj)) {
					_context2.next = 7;
					break;
				}

				return _context2.abrupt("return", context.raise(TypeError(obj.className + " has no properties")));

			case 7:
				scope = context.env.createObjectScope(obj, context.env.getThisBinding());

				scope.init(node.body);

				_context2.next = 11;
				return scope.use(regeneratorRuntime.mark(function _callee() {
					return regeneratorRuntime.wrap(function _callee$(_context) {
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
	}, _marked[0], this);
}

},{"../utils/contracts":391}]},{},[1])(1)
});