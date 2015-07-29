module.exports = function LabeledStatement (context) {
	return context.createLabel(context.node.body, context.node.label.name).execute();
};
