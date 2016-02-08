import { UNDEFINED } from "../types/primitive-type";
import { toPropertyKey } from "./native";
import iterate from "../iterators";

export function* reset (env, leftNode, priorScope, newScope) {
  if (leftNode.isVariableDeclaration()) {
    for (let i = 0, ln = leftNode.declarations.length; i < ln; i++) {
      yield reset(env, leftNode.declarations[i], priorScope, newScope);
    }
    
    // yield each(leftNode.declarations, function* (decl) { yield reset(env, decl, priorScope, newScope); });
  } else if (leftNode.isLet() || leftNode.isConst()) {
    let currentBinding = priorScope.getVariable(leftNode.id.name);
    newScope.getVariable(leftNode.id.name).setValue(currentBinding.getValue());
  } else {
    yield destructure(env, leftNode, null, (e, left) => reset(e, left, priorScope, newScope));
  }
}

export function* declare (env, leftNode, rightValue, kind) {
  kind = kind || "var";
  
  if (leftNode.isVariableDeclaration()) {
    kind = leftNode.kind;
    
    for (let i = 0, ln = leftNode.declarations.length; i < ln; i++) {
      yield declare(env, leftNode.declarations[i], rightValue, kind);
    }
    
    // for (let decl of leftNode.declarations) {
    //   yield declare(env, decl, rightValue, kind);
    // }
  } else if (leftNode.isVariableDeclarator()) {
    yield declare(env, leftNode.id, rightValue, kind);
  } else if (leftNode.isIdentifier()) {
    let left = env.createVariable(leftNode.name, kind);
    left.setValue(rightValue);
  } else {
    yield destructure(env, leftNode, rightValue, function* (e, l, v) { return yield declare(e, l, v, kind); });
  }

  return rightValue;
}

export function* assign (env, leftNode, rightValue) {
  switch (leftNode.type) {
    case "Identifier":
    case "MemberExpression":
      let left = (yield env.createExecutionContext().execute(leftNode)).result;
      left.setValue(rightValue, env.isStrict());
      break;

    default:
      yield destructure(env, leftNode, rightValue, assign);
  }

  return rightValue;
}

function* destructure (env, leftNode, rightValue, cb) {
  switch (leftNode.type) {
    case "ArrayPattern":
      yield destructureArray(env, leftNode, rightValue, cb);
      break;

    case "ObjectPattern":
      yield destructureObject(env, leftNode, rightValue, cb);
      break;

    case "AssignmentPattern":
      yield handleDefault(env, leftNode, rightValue, cb);
      break;

    default:
      throw Error(`${leftNode.type} not implemented`);
  }
}

function* handleDefault (env, left, rightValue, cb) {
  if (rightValue === UNDEFINED) {
    let defaultValue = (yield env.createExecutionContext().execute(left.right));
    rightValue = defaultValue.result.getValue();
  }

  yield cb(env, left.left, rightValue);
}

function* destructureArray (env, pattern, arr, cb) {
  let it = iterate.getIterator(arr);
  let done = false;

  for (let i = 0, ln = pattern.elements.length; i < ln; i++) {
    let element = pattern.elements[i];
    let value, current;
    
    if (!done) {
      ({ done, value: current } = it.next());
      value = !done && current.value;
    }
    
    if (!element) {
      continue;
    }
    
    if (element.isRestElement()) {
      let rest = value ? [value] : [];
      
      while (!done) {
        ({ done, value: current } = it.next());
        if (!done) {
          rest.push(current.value);
        }
      }
      
      yield cb(env, element.argument, env.objectFactory.createArray(rest));
    } else {
      yield cb(env, element, value || UNDEFINED);
    }
  }
  
  it.return();
}

function* getObjectKey (env, keyNode) {
  if (keyNode.computed) {
    let key = (yield env.createExecutionContext().execute(keyNode)).result.getValue();
    return yield toPropertyKey(key);
  }

  return keyNode.name;
}

function* destructureObject (env, pattern, obj, cb) {
  for (let i = 0, ln = pattern.properties.length; i < ln; i++) {
    let current = pattern.properties[i];
    let key;
    
    if (current.computed) {
      key = yield toPropertyKey((yield env.createExecutionContext().execute(current.key)).result.getValue());
    } else {
      key = yield getObjectKey(env, current.key);
    }
    
    let propInfo = obj.getProperty(key);
    let value = propInfo ? propInfo.getValue() : UNDEFINED;

    yield cb(env, current.value, value);    
  }
  
  // yield each(pattern.properties, function* (current) {
  //   let key;
  //   if (current.computed) {
  //     key = yield toPropertyKey((yield env.createExecutionContext().execute(current.key)).result.getValue());
  //   } else {
  //     key = yield getObjectKey(env, current.key);
  //   }
    
  //   let propInfo = obj.getProperty(key);
  //   let value = propInfo ? propInfo.getValue() : UNDEFINED;

  //   yield cb(env, current.value, value);
  // });
}
