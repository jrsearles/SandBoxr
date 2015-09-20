export default function* ForInStatement (context) {
	let left;
	if (context.node.left.type === "VariableDeclaration") {
		// should only be one, but
		// need to unwrap the declaration to get it
		// todo: this is sloppy - need to revisit
		for (let decl of context.node.left.declarations) {
			left = (yield context.create(decl).execute()).result;
		}
	} else {
		left = (yield context.create(context.node.left).execute()).result;
	}

	let obj = (yield context.create(context.node.right).execute()).result.getValue();
	let result, priorResult;

	// track visited properties to prevent iterating over shadowed properties, regardless of enumerable flag
	// 12.6.4 NOTE: a property of a prototype is not enumerated if it is “shadowed” because some previous
	// object in the prototype chain has a property with the same name. The values of [[Enumerable]] attributes
	// are not considered when determining if a property of a prototype object is shadowed by a previous object
	// on the prototype chain.
	let visited = Object.create(null);

	while (obj) {
		for (let prop in obj.properties) {
			if (obj.properties[prop].enumerable && !visited[prop]) {
				left.setValue(context.env.objectFactory.createPrimitive(prop));

				result = yield context.create(context.node.body).execute();
				if (result && result.shouldBreak(context, true, priorResult)) {
					return result;
				}
			}

			visited[prop] = true;
		}

		priorResult = result;
		obj = obj.getPrototype();
	}

	return result;
}
