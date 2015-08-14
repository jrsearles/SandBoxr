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
- Docs & Examples - see beginnins below as API becomes stable
- ~~Battle testing in production~~
- ~~Port the library to ES6 - this will likely take the pain away from some of the async implementation~~
- ~~Async support~~ (excluding timers)

## TODO vNext
- Begin implementing [ES6 - ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html). This may be done as a plugin - not sure yet.
- Performance measurements/optimizations
- Possible: allow stepping/pausing of code execution
- Possible: directly integrate external parser (with ability to override)

-----

## Purpose

The purpose of this library is to safely allow user generated code to be run in an isolated environment. Code executed through the runner cannot alter state or maliciously exploit the executing context. The primary intent is browser usage, though it works in non-browser environments as well.

This library was inspired by [Neil Fraser's](https://github.com/NeilFraser) very fine library [JS Interpreter](https://github.com/NeilFraser/JS-Interpreter). To simplify development, the stepping mechanisms in `JS Interpreter` are not present here, though using ES6 generators should allow these to be incorporated at some point.

Upon discovering the [Test 262 conformance suite](test262.md) the goals for this library became more ambitious. It became apparent that it would be feasible to completely implement the ECMAScript 5.1 specification. (The `mocha` tests found in the "test" directory serve as a quick sanity check used during refactoring and initial development. The primary testing mechanism are the Test 262 tests.)

## Usage

Vanilla usage without any customization, will run the code with full ES5.1 support:

```js
// pass in the parsed syntax tree into the create method
var sandbox = SandBoxr.create(ast);

// execute the code, which returns a promise
sandbox.execute().then(function (result) {
	// get the raw value
	var rawValue = result.unwrap();
});
```

Want to remove certain APIs? Use the `exclude` option which accepts an array of strings indicating objects or functions to exclude:

```js
var sandbox = SandBoxr.create(ast, { 
	exclude: [
		// remove JSON support
		"JSON",
		// remove console support
		"console",
		// remove specific methods
		"String.prototype.match"
	] 
});
```

*Be careful with removing primitives - don't expect to get very far without `String` or `Number` for example!*

Support for dynamic code compilation of `eval` and `Function(string)` are not supported unless a parsing function is indicated in the config. Example using [Acorn](https://github.com/marijnh/acorn):

```js
var sandbox = SandBoxr.create(ast, { parser: acorn.parse });
```

To add additional objects or functions into the execution function, create the environment and add them:

```js
var env = SandBoxr.createEnvironment();

// add a primitive variable
var a = env.createVariable("a");
a.setValue(env.objectFactory.createPrimitive(99));

// create the object
var obj = env.objectFactory.createObject();
obj.define("doSomething", env.objectFactory.createFunction(function () {
	// all arguments will be wrapped objects
	
	// `this` is available via `this.node`
	this.node == obj; // true
	
	// todo: more documentation on available APIs
});

var o = env.createVariable("o");
o.setValue(obj);

var sandbox = SandBoxr.create(ast);

// pass the modified environment when executing the code
sandbox.execute(env).then(/* ... */);
```

Async support is easy - just return a Promise (or any "thenable") from your method. When the promise is resolved or rejected execution will resume:

```js
var env = SandBoxr.createEnvironment();
		
var fooFunc = env.objectFactory.createFunction(function () {
	return $.get("/some/server/request").then(function (res) {
		// remember that anything you pass back needs to be wrapped
		// todo: more docs on object factory
		return env.objectFactory.createPrimitive(res.value);
	});
});

var foo = env.createVariable("o");
foo.setValue(fooFunc);
```

### What this library does not do...
- **"Fix" JavaScript.** All those quirks you love to hate are kept intact. (To come will be extension points so that you can, if you so chose, alter aspects of JavaScript's implementation, for example for equality.)
- **Run "safe" code.** This library does not protect you from writing bad code. If you write a circular loop, expect a stack overflow.
- **Verify syntax.** This library expects a valid syntax tree. The syntax should be verified when parsed. If the syntax tree is malformed expect unexected results.
- **Parse JavaScript** This library must be provided an abstract syntax tree compliant with [ESTree](https://github.com/estree/estree). Parser's supported include [Acorn](https://github.com/marijnh/acorn) and [Esprima](https://github.com/jquery/esprima).
- **Support HTML manipulation** This library does not have access to the browser environment - `document` does not exist. This is a *feature*.

### Compatibility

All browsers that implement support for ECMAScript 5.1 should support this library. This includes IE9+ and other modern browsers.
## License

[Apache 2.0](LICENSE)