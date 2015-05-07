module.exports = function (context) {
	var label = context.node.label.name;
	var value = context.create(context.node.body, null, label).execute();
	// if (value && (value.cancel || value.skip)) {
	// 	if (value.name === label) {
	// 		value.cancel = value.skip = false;
	// 	}
	// }

	return value;
};
