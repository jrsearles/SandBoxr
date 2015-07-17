SandBoxr
======

A fully compatible 5.1 ECMAScript runner. Runs JavaScript in a completely sandboxed environment.

TODO for 1.0
---------
- Finish implementation
- Finalize API, including extension points
- Strict mode (may end up in next version)
- Verify against Esprima (this library strives to be parser agnostic complying with ESTree format, though all testing has been with Acorn's parser)
- Docs
- Add detection of circular loops/max depth
- Improve try/catch flow. (Currently we directly use try/catch to manage the actual try/catch/throw statements. This *works* but has ended up made the scope management awkward.)

TODO vNext
--------
- Begin implementing ES6 (ECMAScript 2015). This may be done as a plugin - not sure yet.
- I'd also like to rewrite the library using ES6
- Async support, including setTimeout, promises, etc.
- Performance measurements/optimization

Purpose
-----

This library was written for the purpose of allowing user enter code to be run in an isolated context. Code executed through the runner cannot alter state or maliciously exploit the executing environment. This library was written to be used in the browser, though works in non-browser environments as well. (Though to be honest there are better ways to isolate user code in server environments.)

This library began as a fork of Neil Fraser's very fine library JS Interpreter, but as development went on and became more ambitious it has come to barely resemble that library. Neil's library is great, but the goals of his library are different than . JS Interpreter is careful about keeping the executing code safe, running each step . My intention was to build on top of this library, implementing the 5.1 methods, but some of the very functional methods  In addition the tree gets modified as the code is executed, which makes running a tree against multiple inputs impossible. 

What this library does not do:
- *"Fix" JavaScript.* All those quirks you love to hate are kept intact. To come will be extension points so that you can, if you so chose, alter aspects of JavaScript's implementation, for example for equality.
- *Run "safe" code.* This library does not protect you from writing bad code. If you write a circular loop, expect a stack overflow. "Dangerous" code is still allowed through "eval" and other means, though you must supply a parsing function for this support.
- *Verify syntax.* This library expects a valid syntax tree. The syntax should be verified when parsed.
- *Parse JavaScript* This library expects an abstract syntax tree compliant with ESTree.
- *Alter HTML* This library does not have access to the browser environment - `document` does not exist. This is a *feature*.