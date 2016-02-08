import { types } from "./types";

const noop = () => {};

function makeVisitorFromKeys (keys) {
  return function* visitor (node, state, w) {
    yield node;
    
    for (let i = 0, ln = keys.length; i < ln; i++) {
      let key = keys[i];
      
      if (node.has(key)) {
        yield* w(node[key], state, w);
      }
    }
  };
}

export function* defaultVisitor (node, state, w) {
  yield node;

  if (node.type in types) {
    for (let i = 0, ln = types[node.type].length; i < ln; i++) {
      let key = types[node.type][i];

      if (node.has(key)) {
        yield* w(node[key], state, w);
      }
    }
  }
}

export const defaultVisitors = {};
Object.keys(types).forEach(key => defaultVisitors[key] = makeVisitorFromKeys(types[key]));

export function makeVisitors (visitors) {
  if (!visitors) {
    return defaultVisitors;
  }
  
  if ("__made" in visitors) {
    return visitors;
  }
  
  let target = Object.assign({ __made: true }, defaultVisitors);
  
  Object.keys(visitors).forEach(key => {
    // skip false values using noop
    let current = visitors[key] || noop;
    
    // keep default visitor
    if (current === true) {
      return;
    }
    
    if (Array.isArray(current)) {
      current = makeVisitorFromKeys(current);
    }
    
    target[key] = current;
  });
  
  return target;
}

export function makeRules (rules) {
  if (!rules) {
    return noop;
  }
  
  if (typeof rules === "function") {
    return rules;
  }
  
  let keys = Object.keys(rules);
  
  return function (node, state) {
    keys.forEach(key => {
      if (node.is(key)) {
        rules[key](node, state);
      }  
    });
  };
}
