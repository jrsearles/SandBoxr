# SandBoxr

[![NPM Version](https://img.shields.io/npm/v/sandboxr.svg)](https://www.npmjs.org/package/sandboxr)

> A fully compliant [5.1 ECMAScript](http://www.ecma-international.org/ecma-262/5.1/index.html) runner. _SandBoxr_ runs JavaScript in a sandboxed environment.
-----

## Purpose

The purpose of this library is to safely allow user generated code to be run in isolation. Code executed through the runner cannot alter state or maliciously exploit the executing environment. The primary usage is targetted towards the browser, though it works in non-browser environments as well.

This library was inspired by [Neil Fraser's](https://github.com/NeilFraser) very fine library [JS Interpreter](https://github.com/NeilFraser/JS-Interpreter). Upon discovering the [Test 262 conformance suite](https://github.com/tc39/test262) the goals for this library became more ambitious. It became apparent that it would be feasible to completely implement the entire ECMAScript 5.1 specification. (The `mocha` tests found in the "test" directory serve as a quick sanity check used during refactoring and initial development. The primary testing mechanism are the Test 262 tests.)

-----

The current release can be considered a release candidate. Barring some low-level API changes and further documentation the release is now feature complete.

## TODO
- Docs & Examples - would like to put together an interactive playground that can be used for demoing.
- Performance measurements/optimizations
- Add detection of infinite loops
- Possible: allow stepping/pausing of code execution
- Possible: directly integrate external parser (with ability to override)

## ES6
[ES6 - ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html) support has begun but is [incomplete](ES6.md). Use the option `ecmaVersion` set to 6 to enable support.

## Usage

Vanilla usage without any customization, will run the code with full ES5.1 support:

```js
// pass in the parsed syntax tree into the create method
var sandbox = SandBoxr.create(ast);

// execute the code, which returns a promise
var result = sandbox.execute();
	
// get the value
var nativeValue = result.toNative();
```

### Options

#### options.parser
Type: `Function`
Default: `undefined`

Support for dynamic code compilation of `eval` and `Function(string)` are not supported unless a parsing function is indicated in the config. Example using [Acorn](https://github.com/marijnh/acorn):

```js
var sandbox = SandBoxr.create(ast, { parser: acorn.parse });
```

#### options.ecmaVersion
Type: `Number`
Default: 5

Set this value to 6 to enable support for [ES6 features](ES6.md).

#### options.useStrict
Type: `Boolean`
Default: `false`

Forces the runner to execute all code in *[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)*.

#### options.exclude
Type: `Array<String>`
Default: `undefined`

Use the `exclude` option which accepts an array of strings indicating objects or functions to exclude:

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

#### options.allowDebugger
Type: `Boolean`
Default: `false`

Allows `debugger` statements to be used. When enabled a `debugger` statement is generated when the statement is hit. (Otherwise `debugger` statements are ignored.)

### API

`SandBoxr.createEnvironment(Object: options - optional)`: Create an execution environment, optionally passing in options. Returns an Environment instance.

`SandBoxr.create(AST: node, Object: options - optional)`: Create a new sandbox, optionally passing in options. Returns a Sandbox instance.

`SandBox.prototype.execute(Environment: env - optional)`: Executes the node using the provided environment. If no environment is provided a new one is created using the provided options. The function will return the result of the execution. If async code is executed a Promise will be returned that will resolve to the execution result.

`SandBox.prototype.resolve(Environment: env - optional)`: Resolve calls the execute method but always returns a promise.
 
#### Extending available APIs

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

	// `this` is available via `this.object`
	this.object == obj; // true

	// todo: more documentation on available APIs
});

var o = env.createVariable("o");
o.setValue(obj);

var sandbox = SandBoxr.create(ast);

// pass the modified environment when executing the code
var result = sandbox.execute(env);
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
