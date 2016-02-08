import {PropertyReference} from "../env/property-reference";

function exportSpecified (target, key, env, source, alias = key) {
  let ref;
  if (source) {
    // todo: add 'getReference' function to objects to make this simpler
    ref = new PropertyReference(key, source, env);
  } else {
    ref = env.getReference(key);
  }
  
  target.define(alias, ref);
}

function* getSource (env, name) {
  let ast = env.imports[name];
  let priorExport = env.exports;
  let source = env.exports = env.objectFactory.createObject();
  
  let scope = env.createScope(env.global);
  yield scope.use(function* () {
    yield env.createExecutionContext(env.global).execute(ast);
  });
  
  env.exports = priorExport;
  return source;
}

export default function* ExportDeclaration (node, context, next) {
  let target = context.env.exports;
  
  if (node.declaration) {
    let decl = yield next(node.declaration, context);
    
    if (node.isExportDefaultDeclaration()) {
      target.define("default", decl.result);
    } else if (node.declaration.isFunctionDeclaration()) {
      exportSpecified(target, node.declaration.id.name, context.env);
    } else {
      node.declaration.declarations.forEach(n => {
        exportSpecified(target, n.id.name, context.env);
      });
    }
  } else {
    let source = null;
    if (node.source) {
      source = yield getSource(context.env, node.source.value);
    }
    
    if (node.isExportAllDeclaration()) {
      // if using a wildcard export, just copy all the properties to the current export object
      source.getOwnPropertyKeys().forEach(key => exportSpecified(target, key, context.env, source));
    } else {
      node.specifiers.forEach(spec => exportSpecified(target, spec.local.name, context.env, source, spec.exported.name));
    }
  }
  
  return context.empty();  
}
