import { Reference } from "../env/reference";
import { isStrictNode } from "../utils/checks";
import { UNDEFINED } from "../types/primitive-type";

export default function ($target, env, factory) {
  let parser = env.options.parser;

  function createScope (body, directCall) {
    let strictScope = env.isStrict();
    let strictCode = strictScope || isStrictNode(body);
    let inGlobal = env.current.scope.parent === env.globalScope.scope;

    // use the same scope unless this is an "indirect" call
    // in which case we use the global scope
    if (directCall) {
      if (strictCode) {
        let thisArg;
        if (strictScope) {
          thisArg = inGlobal ? $target : UNDEFINED;
        } else {
          thisArg = env.getThisBinding() || $target;
        }

        return env.createScope(thisArg);
      }

      return env.setScope(env.current.scope.parent);
    }

    let scope = env.setScope(env.globalScope.scope);
    if (strictCode) {
      scope = env.createScope($target);
    }

    return scope;
  }

  function isDirectCall (context) {
    return context.callee instanceof Reference && context.callee.base === $target;
  }

  $target.define("eval", factory.createBuiltInFunction(function* (code) {
    if (!code) {
      return UNDEFINED;
    }

    if (code.type !== "string") {
      return code;
    }

    let ast;

    try {
      ast = parser(code.value);
    } catch (err) {
      if (err instanceof SyntaxError && (/assigning to rvalue/i).test(err.message)) {
        // hack because acorn throws syntax error
        throw ReferenceError("Invalid left-hand side in assignment");
      }

      throw err;
    }

    let scope = createScope(ast.body, isDirectCall(this));
    let context = this;
    let executionResult = yield scope.use(function* () {
      return yield context.execute(ast);
    });

    return executionResult && executionResult.result ? executionResult.result.getValue() : UNDEFINED;
  }, 1, "eval"));
}
