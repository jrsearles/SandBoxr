import { UNDEFINED } from "../types/primitive-type";
import { assertIsValidParameterName } from "../utils/contracts";
import { declare } from "../utils/assign";
import { createDataProperty } from "../utils/helpers";

export function Scope (env, scope) {
  env.globalScope = env.globalScope || this;

  this.scope = scope;
  this.env = env;
  this.parentScope = (env.current || env.globalScope).scope;
}

Scope.prototype = {
  constructor: Scope,
  
  setMeta (key, value) {
    this.scope.meta[key] = value;
  },
  
  getMeta (key) {
    let scope = this.scope;
    while (scope) {
      if (scope.meta[key]) {
        return scope.meta[key];
      }
      
      scope = scope.parent;
    }
    
    return null;
  },
  
  setParent (parentScope) {
    this.parentScope = parentScope;  
  },
  
  /**
   * Initializes the scope by validating the function body and hoisting variables.
   * @param {AST} node - The node to be executed.
   * @returns {void}
   */
  init (node) {
    if (!node) {
      return;
    }

    let env = this.env;
    this.scope.strict = node.isStrict(); 

    let strict = this.scope.strict || env.isStrict();
    node.getBindings().forEach(decl => {
      let key = decl.id.name;
      
      assertIsValidParameterName(key, strict);
      
      let initialized = decl.isVar();
      let value = UNDEFINED;
      let kind = decl.getParent().kind;
      
      if (decl.isFunction()) {
        initialized = true;
        kind = "function";
        
        let strictFunc = strict || decl.isStrict(); 
        value = env.objectFactory.createFunction(decl, undefined, { strict: strictFunc, name: key });
        // value.bindScope(this);
      } else if (decl.isClass()) {
        kind = "class";
      }  else if (env.has(key)) {
        return;
      }
    
      let newVar = env.createVariable(key, kind);
      if (initialized) {
        newVar.init(value);
      }
    });
  },

  *loadComplexArgs (params, args, callee) {
    let env = this.env;
    let strict = env.isStrict() || callee.node.isStrict();

    // create a temporary scope for the argument declarations
    let scope = this.createParameterScope();

    let argIndex = 0;
    let argLength = args.length;

    for (let i = 0, ln = params.length; i < ln; i++) {
      let param = params[i];
      if (param.isRestElement()) {
        let rest = env.objectFactory.createArray();
        let restIndex = 0;

        while (argIndex < argLength) {
          rest.setValue(restIndex++, args[argIndex++] || UNDEFINED);
        }

        yield declare(env, param.argument, rest);
      } else {
        yield declare(env, param, args[argIndex++] || UNDEFINED);
      }
    }
    
    if (!callee.arrow) {
      // preserve the passed in arguments, even if defaults are used instead
      let argumentList = env.objectFactory.createArguments(args, callee, strict);
      scope.createVariable("arguments");
      scope.setValue("arguments", argumentList);

      args.forEach((value, index) => {
        createDataProperty(argumentList, index, value);
      });

      argumentList.defineProperty("length", {
        value: env.objectFactory.createPrimitive(args.length),
        configurable: true,
        writable: true
      });
    }

    // return scope back to main scope
    this.env.setScope(this.scope);
  },

  /**
   * Loads the arguments into the scope and creates the special `arguments` object.
   * @param {Array<Identifier>} params - The parameter identifiers
   * @param {Array<ObjectType>} args - The argument values
   * @param {FunctionType} callee - The function
   * @returns {void}
   */
  *loadArgs (params, args, callee) {
    params = params || [];
    
    if (callee.arrow || params.some(p => !p.isIdentifier())) {
      return yield this.loadComplexArgs(params, args, callee);
    }

    // todo: this method is getting far too complex
    let { env, scope } = this;
    let strictCallee = callee.node.isStrict();
    let strict = strictCallee || env.isStrict();

    let argumentList = env.objectFactory.createArguments(args, callee, strict);
    scope.createVariable("arguments");
    scope.setValue("arguments", argumentList);

    let argsLength = args.length;
    let paramsLength = params.length;
    
    if (paramsLength > 0) {
      let shouldMap = !strictCallee;
      let loadedParams = Object.create(null);
      let paramIndex = paramsLength;
      
      while (paramIndex--) {
        let param = params[paramIndex];
        let value = args[paramIndex] || UNDEFINED;
        let name = param.name;
        let mapped = false;
        
        if (!loadedParams[name]) {
          loadedParams[name] = true;
          // assertIsValidParameterName(name, strict);
          
          if (shouldMap) {
            mapped = true;
            
            let descriptor = scope.createVariable(name);
            if (paramIndex < argsLength) {
              argumentList.mapProperty(paramIndex, descriptor);
            }
          }
          
          scope.setValue(name, value);
        }

        if (!mapped && paramIndex < argsLength) {
          createDataProperty(argumentList, paramIndex, value);
        }
      }
    }

    // just set value if additional, unnamed arguments are passed in
    for (let i = paramsLength; i < argsLength; i++) {
      createDataProperty(argumentList, i, args[i]);
    }

    argumentList.defineProperty("length", {
      value: env.objectFactory.create("Number", argsLength),
      configurable: true,
      writable: true
    });
  },

  createParameterScope () {
    let temp = this.env.createScope();
    temp.scope.setParent(this.scope.parent);
    this.scope.setParent(temp);
    return temp.scope;
  },

  /**
   * uses the passed in function and exits the scope when the function completes,
   * returning the environment back to the previos state.
   * @param {Function} inner - The function to execute.
   * @returns {Iterator} The function results
   */
  *use (inner) {
    try {
      let result = yield inner();
      this.exit();
      return result;
    } catch (err) {
      this.exit();
      throw err;
    }
  },

  /**
   * Exits the scope, returning the environment to it's previous state.
   * (Typically you would call `use` which handles exiting the scope itself.)
   * @returns {void}
   */
  exit () {
    this.env.setScope(this.parentScope);
  }
};
