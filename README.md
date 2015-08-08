# SandBoxr
> A fully compliant [5.1 ECMAScript](http://www.ecma-international.org/ecma-262/5.1/index.html) runner. _SandBoxr_ runs JavaScript in a sandboxed environment.

-----

## TODO for 1.0
- ~~Finish implementation!~~
- ~~Finalize API, including extension points~~
- Strict mode (may end up in next version)
- ~~Verify against Esprima (this library strives to be parser agnostic complying with ESTree format, though all testing has been with Acorn's parser)~~
- Add some sensible detection of infinite loops
- Improve try/catch flow. (Currently we directly use try/catch to manage the actual try/catch/throw statements. This *works* but has ended up making the scope management awkward.)
- Docs & Examples
- Battle testing in production

## TODO vNext
- Begin implementing [ES6 - ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html). This may be done as a plugin - not sure yet.
- Async support, including setTimeout, promises, etc. (Might push this up)
- Port the library to ES6 - this will likely take the pain away from some of the async implementation
- Performance measurements/optimizations

-----

## Purpose

The purpose of this library is to safely allow user generated code to be run in an isolated context. Code executed through the runner cannot alter state or maliciously exploit the executing environment. The primary intent is for browser usage, though it works in non-browser environments as well. (Though to be honest there are better ways to isolate code in server environments.)

This library was heavily inspired by [Neil Fraser's](https://github.com/NeilFraser) very fine library [JS Interpreter](https://github.com/NeilFraser/JS-Interpreter). The initial intent was to build some of the missing API's; especially the Array methods added in ECMAScript 5.1. It became clear that it would simplify development without the stepping mechanism in `JS Interpreter`. This is a great feature, but not one i needed.

Upon discovering the [Test 262 conformance suite](test262.md) the goals for this library became much more ambitious. It became apparent that it would be feasible to completely implement the ECMAScript 5.1 specification. (The `mocha` tests found in the "test" directory serve as a quick sanity check used during refactoring and initial development. The primary testing mechanism is the Test 262 tests.)

## Usage

Vanilla usage without any customization, will run the code with full ES5.1 support barring `eval` and `Function(code)` support:

```js
// pass in the parse syntax tree into the create method
var sandbox = SandBoxr.create(ast);

// execute the code
var result = sandbox.execute();

// get the raw value
var rawValue = result.unwrap();
```

### What this library does not do...
- **"Fix" JavaScript.** All those quirks you love to hate are kept intact. (To come will be extension points so that you can, if you so chose, alter aspects of JavaScript's implementation, for example for equality.)
- **Run "safe" code.** This library does not protect you from writing bad code. If you write a circular loop, expect a stack overflow.
- **Verify syntax.** This library expects a valid syntax tree. The syntax should be verified when parsed. If the syntax tree is malformed expect unexected results.
- **Parse JavaScript** This library must be provided an abstract syntax tree compliant with [ESTree](https://github.com/estree/estree). Parser's supported include [Acorn](https://github.com/marijnh/acorn) and [Esprima](https://github.com/jquery/esprima).
- **Support HTML manipulation** This library does not have access to the browser environment - `document` does not exist. This is a *feature*.

## License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)