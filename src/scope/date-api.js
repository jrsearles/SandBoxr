var objectFactory = require("../types/object-factory");

module.exports = function (globalScope) {
	var dateClass = objectFactory.createFunction(function (value) {
		value = value && value.value;
		var dateValue = new Date(value);

		if (this.scope !== globalScope) {
			this.node.value = dateValue;
			return this.node;
		}

		return objectFactory.createPrimitive(dateValue);
	}, globalScope);

	var proto = dateClass.proto;

	proto.defineProperty("valueOf", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.value.valueOf());
	}));

	globalScope.defineProperty("Date", dateClass, { enumerable: false });
};
