export default function Super (node, context) {
	let homeObject = context.callee.getValue().homeObject;
	
	if (homeObject && context.newTarget && !node.getParent().isCallExpression()) {
		// accessing `super` in a constructor without calling as function refers to prototype 
		// todo: confirm this
		homeObject = homeObject.getValue("prototype");
	}
	
	return context.result(homeObject || context.env.getThisBinding());
}
