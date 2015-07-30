## Notes on running the 262 test suite
The [Test 262 conformance suite](https://github.com/tc39/test262/tree/es5-tests) is not included in this repository, so to run those tests you will need to clone the branch that contains the 5.1 test suite. Run the following from the root of the SandBoxr directory to clone the test suite.

```shell
git clone https://github.com/tc39/test262/tree/es5-tests
```

To run the runner:

```shell
node test262-runner
```

This will run the entire test suite. Warning though - this takes quite a while to run! Several hours if you run the entire test suite. If you plan on contributing, please make sure your submissions do not negatively impact the test results.

Test runner options:

#### stopOnFail (f)
Will stop upon the first failing test

#### verbose (v)
Will display info on passing and skipped tests. By default only the failing tests will output to the console.

#### strict (s)
Run strict mode tests. These are skipped by default.

#### chapter (ch)
Run tests from a specific chapter of the specification. Example:


## Examples

```shell
node test262-runner --ch '12'
```

or to run a specific subsection

```shell
node test262-runner --ch '15/15.2'
```
