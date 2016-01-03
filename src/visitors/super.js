export default function Super (node, context) {
	// let homeObject = context.callee.getValue().homeObject;
	let homeObject = context.env.current.getMeta("super");
	let newTarget = context.env.current.getMeta("newTarget");
	
	if (homeObject && newTarget && !node.getParent().isCallExpression()) {
		// accessing `super` in a constructor without calling as function refers to prototype 
		// todo: confirm this
		homeObject = homeObject.getValue("prototype");
	}
	
	return context.result(homeObject || context.env.getThisBinding());
}
