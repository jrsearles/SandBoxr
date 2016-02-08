// these helpers should have no dependencies
const useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

export function  isUndefined (obj) {
  return !obj || (obj.isPrimitive && obj.value === undefined);
}

export function  isNull (obj) {
  return !isUndefined(obj) && obj.isPrimitive && obj.value === null;
}

export function  isNullOrUndefined (obj) {
  return isUndefined(obj) || isNull(obj);
}

export function isFunction (obj) {
  return !isUndefined(obj) && obj.className === "Function";
}

export function isSymbol (obj) {
  return !isUndefined(obj) && obj.isSymbol;
}

export function  isObject (obj) {
  if (isNullOrUndefined(obj) || isSymbol(obj)) {
    return false;
  }

  return !obj.isPrimitive || obj.type === "object";
}

export function isNumber (obj) {
  return !isUndefined(obj) && obj.type === "number";
}

export function isNegativeZero (obj) {
  return isNumber(obj) && obj.value === 0 && 1 / obj.value < 0;
}

export function isConstructor (obj) {
  if (!isFunction(obj)) {
    return false;
  }

  return obj.canConstruct;
}

function isDirective (node) {
  return node.type === "ExpressionStatement"
    && node.expression.type === "Literal"
    && typeof node.expression.value === "string";
}

export function isStrictNode (nodes) {
  if (!nodes) {
    return false;
  }

  if (Array.isArray(nodes)) {
    for (let node of nodes) {
      if (!isDirective(node)) {
        return false;
      }

      if (node.expression.value === "use strict" && useStrictPattern.test(node.expression.raw)) {
        return true;
      }
    }

    return false;
  }

  if (nodes.body) {
    return isStrictNode(nodes.body);
  }

  return false;
}
