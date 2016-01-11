import {declare} from "../utils/assign";

export default function* ImportDeclaration (node, context, next) {
	let moduleName = node.source.value;
	if (!(moduleName in context.env.imports)) {
		throw ReferenceError(`Cannot find module '${moduleName}'`);
	}
	
	let ast = context.env.imports[moduleName];
	let source = context.env.exports = context.env.objectFactory.createObject();
	
	let thisArg = context.env.global;
	let scope = context.env.createScope(thisArg);
	yield scope.use(function* () {
		yield context.env.createExecutionContext(thisArg).execute(ast);
	});
	
	for (let specifier of node.specifiers) {
		let {imported, local} = specifier;
		let value = source;
		
		if (!specifier.isImportNamespaceSpecifier()) {
			// wildcard imports use entire export object
			let key = imported ? imported.name : "default";
			value = source.getValue(key);
		}
		
		yield declare(context.env, local, value);
	}

	return context.empty();
}
