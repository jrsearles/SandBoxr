import {PropertyReference} from "../env/property-reference";
import {toString, toObject} from "../utils/native";
import {UNDEFINED} from "../types/primitive-type";
import iterate from "../iterators/";

function assignThis (env, fnMember, isNew, callee) {  
  if (callee.isSuper() || (callee.object && callee.object.isSuper())) {
    return env.getThisBinding();
  }

  if (isNew) {
    return null;
  }

  if (fnMember instanceof PropertyReference && (!fnMember.unqualified || fnMember.base !== env.global)) {
    let thisArg = fnMember.base;
    if (env.ecmaVersion === 5) {
      return toObject(thisArg);
    }

    return thisArg;
  }

  return null;
}

export default function* CallExpression (node, context, next) {
  let isNew = node.isNewExpression() || node.callee.isSuper();
  let fnMember = (yield next(node.callee, context)).result;
  let fn = fnMember.getValue();

  let args = [];
  
  for (let i = 0, ln = node.arguments.length; i < ln; i++) {
    let arg = node.arguments[i];
    let value = (yield next(arg, context)).result.getValue();
    
    if (arg.isSpreadElement()) {
      let it = iterate.getIterator(value);
      for ({value} of it) {
        args.push(value);
      }
    } else {
      args.push(value);
    }
  }
  
  // for (let arg of node.arguments) {
  //   let value = (yield next(arg, context)).result.getValue();
  //   if (arg.isSpreadElement()) {
  //     let it = iterate.getIterator(value);
  //     for ({value} of it) {
  //       args.push(value);
  //     }
  //   } else {
  //     args.push(value);
  //   }
  // }

  if (!fn || fn.className !== "Function") {
    let stringValue = yield toString(fn);
    throw TypeError(`${stringValue} not a function`);
  }

  let thisArg = assignThis(context.env, fnMember, isNew, node.callee);
  let callee = fnMember;

  callee.identifier = fn.name;
  let result = yield fn[isNew ? "construct" : "call"](thisArg, args, callee);
  return context.result(result || UNDEFINED);
}
