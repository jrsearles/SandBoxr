module.exports = function Identifier (context) {
	return context.result(context.env.getReference(context.node.name));
};
