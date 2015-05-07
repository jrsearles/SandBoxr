module.exports = 	function (context) {
	return context.create(context.node.expression).execute();
};
