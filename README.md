# SandBoxr
> A fully compliant [5.1 ECMAScript](http://www.ecma-international.org/ecma-262/5.1/index.html) runner. _SandBoxr_ runs JavaScript in a sandboxed environment.

-----

## TODO for 1.0
- Finish implementation - getting close!
- ~~Finalize API, including extension points~~
- Strict mode (may end up in next version)
- ~~Verify against Esprima (this library strives to be parser agnostic complying with ESTree format, though all testing has been with Acorn's parser)~~
- Add some sensible detection of infinite loops
- Improve try/catch flow. (Currently we directly use try/catch to manage the actual try/catch/throw statements. This *works* but has ended up making the scope management awkward.)
- Docs & Examples
- Battle testing in production

## TODO vNext
- Begin implementing [ES6 - ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html). This may be done as a plugin - not sure yet.
- Async support, including setTimeout, promises, etc.
- Port the library to ES6 - this will likely take the pain away from some of the ES6 
- Performance measurements/optimizations

-----

## Purpose

This library was written for the purpose of allowing user generated code to be run in an isolated context. Code executed through the runner cannot alter state or maliciously exploit the executing environment. This library was written to be used in the browser, though works in non-browser environments as well. (Though to be honest there are better ways to isolate code in server environments.)

This library was heavily inspired by [Neil Fraser's](https://github.com/NeilFraser) very fine library [JS Interpreter](https://github.com/NeilFraser/JS-Interpreter). The initial intention was to build some of the missing API's, most notably the Array methods added in ECMAScript 5.1. I found it difficult to implement, largely because of the stepping mechanism in `JS Interpreter`, which is a great feature but one i did not require. It became clear to me that it would simplify development 
greatly to break out of the stepping loop - especially with the new functional Array methods that execute callbacks in a loop. 

Upon discovering the [Test 262 conformance suite](https://github.com/tc39/test262/tree/es5-tests) my goals become much more ambitious. I realized that it would be feasible to completely implement the ECMAScript 5.1 specification. The `mocha` tests found in the "test" directory serve as a quick sanity check used during refactoring. The primary test mechanism is the Test 262 tests.

### What this library does not do:
- **"Fix" JavaScript.** All those quirks you love to hate are kept intact. (To come will be extension points so that you can, if you so chose, alter aspects of JavaScript's implementation, for example for equality.)
- **Run "safe" code.** This library does not protect you from writing bad code. If you write a circular loop, expect a stack overflow.
- **Verify syntax.** This library expects a valid syntax tree. The syntax should be verified when parsed. If the syntax tree is malformed expect unexected results.
- **Parse JavaScript** This library must be provided an abstract syntax tree compliant with [ESTree](https://github.com/estree/estree). Parser's supported include [Acorn](https://github.com/marijnh/acorn) and [Esprima](https://github.com/jquery/esprima).
- **Alter HTML** This library does not have access to the browser environment - `document` does not exist. This is a *feature*.
