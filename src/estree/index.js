import {TraversalContext} from "./traversal-context";
import {defaultVisitors, makeVisitors, makeRules} from "./visitors";

let noop = () => {};

export function* walker (visitors, node, state, next) {
  // create a bound walk function to pass to visitors so they can continue walking their child nodes
  next = next || walker.bind(null, visitors);

  if (Array.isArray(node)) {
    for (let i = 0, ln = node.length; i < ln; i++) {
      yield* next(node[i], state, next);
    }
  } else if (node) {
    let visitor = visitors[node.type];
    if (typeof visitor === "function") {
      yield* visitor(node, state, next);
    }
  }
}

export function walk (node, visitors, state) {
  let v = makeVisitors(visitors);
  let it = walker(v, new TraversalContext(node), state);
  let done = false;
  let value;
  
  do {
    ({done, value} = it.next(value));
  } while (!done);
}

export function step (root, visitors, state, rules) {
  let v = makeVisitors(visitors);
  let r = makeRules(rules);
  let node = new TraversalContext(root, null, n => r(n, state));
  
  function next (current, state) {
    if (typeof v[current.type] === "function") {
      return v[current.type](current, state, next);
    }
  };
  
  return next(node, state);
}

export function* iterate (node, filters) {
  let hash;
  if (filters && Array.isArray(filters)) {
    hash = Object.create(null);
    filters.forEach(type => hash[type] = true);
  }
  
  for (let current of walker(defaultVisitors, new TraversalContext(node))) {
    if (!hash || hash[current.type]) {
      yield current;
    }
  }
}

export {makeRules, makeVisitors};