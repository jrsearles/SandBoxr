module.exports = function EmptyStatement (context) {
	return context.result(context.scope.global.getProperty("undefined"));
};
