module.exports = function LabeledStatement (context) {
	var label = context.node.label.name;
	var labelledContext = context.createLabel(context.node.body, label);
	return labelledContext.execute();
};
