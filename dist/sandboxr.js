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
		this.strict = parent.strict;
		this.thisNode = thisArg;
		this.env = env;
	}

	_createClass(DeclarativeEnvironment, [{
		key: "getReference",
		value: function getReference(name) {
			return new _reference2["default"](name, this, this.env);
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

function blockIsStrict(_x2) {
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
		value: function getReference(name) {
			var scope = this.current;
			while (scope) {
				if (scope.hasVariable(name)) {
					return scope.getReference(name);
				}

				scope = scope.parent;
			}

			return new _reference2["default"](name, undefined, this);
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

			if (this.isStrict() && _keywords2["default"].isStrictReserved(name)) {
				throw new SyntaxError("Illegal use of strict mode reserved keyword: " + name);
			}

			return this.current.createVariable(name, !immutable);
		}
	}, {
		key: "isStrict",
		value: function isStrict() {
			return this.current && this.current.strict;
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

			var undef = this.global.getValue("undefined");
			this.current.strict = this.current.strict || blockIsStrict(node);

			(0, _hoister.visit)(node, function (decl) {
				var name = decl.name || decl.id.name;

				if (decl.type === "FunctionDeclaration") {
					// functions can be used before they are defined
					var func = _this.objectFactory.createFunction(decl);
					func.bindScope(_this.current);

					_this.createVariable(name, true);
					_this.putValue(name, func);
				} else {
					if (_this.hasVariable(name)) {
						// shadow variable
						_this.putValue(name, undef);
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
			this.current.strict = priorScope.strict;

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
		this.strict = parent && parent.strict;
		this.object = this.thisNode = obj;
		this.env = env;
	}

	_createClass(ObjectEnvironment, [{
		key: "getReference",
		value: function getReference(name) {
			return new _propertyReference2["default"](name, this.object, this.env);
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

	function PropertyReference(name, object, env) {
		_classCallCheck(this, PropertyReference);

		_get(Object.getPrototypeOf(PropertyReference.prototype), "constructor", this).call(this, name, object, env);
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
	function Reference(name, base, env) {
		_classCallCheck(this, Reference);

		this.name = name;
		this.base = base;
		this.env = env;
		this.strict = env.isStrict();
	}

	_createClass(Reference, [{
		key: "putValue",
		value: function putValue(value) {
			if (this.base) {
				return this.base.putValue(this.name, value, this.strict);
			}

			// todo: always create variable?
			this.env.createVariable(this.name, true);

			if (this.strict) {
				throw new ReferenceError(this.name + " is not defined");
			}

			return this.env.putValue(this.name, value);
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
var keywords = {
	"es5": ["do", "if", "in", "for", "new", "try", "var", "case", "else", "enum", "null", "this", "true", "void", "with", "break", "catch", "class", "const", "false", "super", "throw", "while", "delete", "export", "import", "return", "switch", "typeof", "default", "extends", "finally", "continue", "debugger", "function", "instanceof"],

	"es5strict": ["implements", "let", "private", "public", "interface", "package", "protected", "static", "yield"]
};

exports["default"] = {
	isReserved: function isReserved(name) {
		return keywords.es5.indexOf(name) >= 0;
	},

	isStrictReserved: function isStrictReserved(name) {
		return keywords.es5strict.indexOf(name) >= 0;
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
				scope.init(this.node.body.body);
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
var octalRgx = /^0[0-7][0-7]*$/;

function validateLiteral(node, strict) {
	if (!strict || !node.raw) {
		return;
	}

	if (typeof node.value === "number" && octalRgx.test(node.raw)) {
		throw new SyntaxError("Octal literals are not allowed in strict mode.");
	}
}

function Literal(context) {
	validateLiteral(context.node, context.env.isStrict());
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

				value = new _envPropertyReference2["default"](name, obj, context.env);
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
					context.env.putValue(name, value.getValue(), context.env.isStrict(), context);
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