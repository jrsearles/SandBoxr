import { toPropertyKey } from "../utils/native";
import { NULL } from "../types/primitive-type";

function* getName (node, context, next) {
  if (node.name) {
    return node.name;
  }
  
  if (node.id) {
    return node.id.name;
  }
  
  if (node.isLiteral()) {
    return node.value;
  }
  
  let parent = node.getParent();
  if (parent.isVariableDeclarator()) {
    return yield getName(parent, context, next);
  }
  
  if (parent.isProperty()) {
    let key;
    
    if (parent.computed) {
      let computedKey = yield next(parent.key, context);
      key = yield toPropertyKey(computedKey.result.getValue());
      
      if (typeof key === "object" && key.isSymbol) {
        key = key.toSymbolString();
      }
    } else {
      key = yield getName(parent.key, context, next);
    }
    
    if (parent.kind === "get" || parent.kind === "set") {
      return `${parent.kind} ${key}`;
    }
    
    return key;
  }
  
  return "";
}

function setAccessors (target, descriptor) {
  if (descriptor.get) {
    descriptor.getter = function* () {
      return yield descriptor.get.call(this);
    };
  }
  
  if (descriptor.set) {
    descriptor.setter = function* (value) {
      yield descriptor.set.call(this, [value]);
    };
  }
  
  target.defineProperty(descriptor.key, descriptor);
}

export function* FunctionExpression (node, context, next) {
  let objectFactory = context.env.objectFactory;
  let strict = context.env.isStrict() || node.body.isStrict();
  let name = yield getName(node, context, next);
  
  let proto = null;
  if (!node.isArrowFunctionExpression()) {
    proto = objectFactory.createObject();
  }
  
  let func = objectFactory.createFunction(node, proto, { strict, name });
  func.bindScope(context.env.current);
  
  if (node.isArrowFunctionExpression()) {
    func.bindThis(context.env.getThisBinding());  
  }
  
  return context.result(func);
}

function findOrCreate (arr, key, isStatic) {
  let i = arr.length;
  while (i--) {
    let current = arr[i];
    if (current.key === key && current.isStatic === isStatic) {
      return current;
    }
  }
  
  let entry = { enumerable: false, configurable: true, key, isStatic };
  arr.push(entry);
  return entry;
}

export function* ClassDeclaration (node, context, next) {
  let objectFactory = context.env.objectFactory;
  let props = [];
  let ctor, proto, parent, parentProto;
  
  if (node.superClass) {
    parent = (yield next(node.superClass, context)).result.getValue();
    parentProto = parent.getValue("prototype");
    
    proto = objectFactory.createObject(parent === NULL ? null : parent);
  }

  proto = proto || objectFactory.createObject();
  
  for (let method of node.body.body) {
    let kind = method.kind;
    let key = method.key.name;
    let homeObject = method.static ? parent : parentProto;
    
    if (method.computed || method.key.isLiteral()) {
      let computedKey = yield next(method.key, context);
      key = yield toPropertyKey(computedKey.result.getValue());
    }
    
    let name = typeof key === "object" && key.isSymbol ? key.toSymbolString() : key;
    let entry;
    
    switch (kind) {
      case "constructor":
        ctor = method.value;
        break;

      case "get":
      case "set":
        entry = findOrCreate(props, key, method.static);
        entry[kind] = objectFactory.createFunction(method.value, null, { strict: true, name: `${kind} ${name}`, homeObject });
        break;

      default:
        if (method.static) {
          entry = findOrCreate(props, key, true);
          entry.value = objectFactory.createFunction(method.value, null, { strict: true, name, homeObject });
          break;
        }
        
        let fn = objectFactory.createFunction(method.value, null, { strict: true, name, homeObject });
        proto.define(key, fn);
        break;
    }
  }
  
  ctor = ctor || function* () { 
    let instance = objectFactory.createObject(null);
    
    if (parent) {
      yield parent.construct(instance, arguments);
    }
    
    instance.setPrototype(proto);
    return instance; 
  };

  let name = yield getName(node, context, next);
  let def = objectFactory.createClass(ctor, proto, { name, homeObject: parent });

  props.forEach(entry => {
    let target = entry.isStatic ? def : proto;
    setAccessors(target, entry);
  });
  
  // statics.forEach(entry => def.define(entry.key, entry.func));

  // if (name) {
  //   context.env.createVariable(name).setValue(def);
    
  //   def.name = name;
  //   def.defineProperty("name", { value: objectFactory.createPrimitive(name), configurable: true }, true, context.env);
  // }

  if (node.isClassDeclaration()) {
    context.env.getVariable(name).init(def);
    // context.env.createVariable(name, "class").setValue(def);
    return context.empty();
  }

  return context.result(def);
}
