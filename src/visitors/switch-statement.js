function* executeStatements (context, statements, next) {
  let result;
  
  for (let i = 0, ln = statements.length; i < ln; i++) {
    result = yield next(statements[i], context, next);
    if (result && result.isAbrupt()) {
      break;
    }
  }

  return result;
}

export default function* SwitchStatement (node, context, next) {
  let testValue = (yield next(node.discriminant, context)).result.getValue();
  let passed = false;
  let value, defaultCase;

  for (let current of node.cases) {
    if (!passed) {
      if (current.test) {
        let caseValue = (yield next(current.test, context)).result.getValue();
        if (!context.env.ops.strictEquals(caseValue, testValue)) {
          continue;
        }
      } else {
        // default might not be the last case
        defaultCase = current;
        continue;
      }
    }

    passed = true;
    value = yield executeStatements(context, current.consequent, next);
    if (value && value.isAbrupt()) {
      value.cancel = false;
      return value;
    }
  }

  if (!passed && defaultCase && defaultCase.consequent) {
    value = yield executeStatements(context, defaultCase.consequent, next);
    value.cancel = false;
    return value;
  }

  return value;
}
