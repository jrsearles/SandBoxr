var utils = require("../utils");

function getString (executionContext, value) {
	if (!value) {
		return "";
	}

	if (value.isPrimitive || value.value !== undefined) {
		return value.toString();
	}

	var primitiveValue = utils.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive (executionContext, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive || value.value !== undefined) {
		return value.value;
	}

	var primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	primitiveValue = utils.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	throw new TypeError("Cannot convert object to primitive");
}

module.exports = {
	toPrimitive: function (executionContext, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();

		if (preferredType === "string") {
			if (!obj) {
				return "";
			}

			if (obj.isPrimitive) {
				return obj.toString();
			}

			return getString(executionContext, obj);
		}

		// default case - number
		if (!obj) {
			return 0;
		}

		if (obj.isPrimitive) {
			return obj.value;
		}

		return getPrimitive(executionContext, obj);
	},

	isPrimitive: function (value) {
		if (value == null) {
			return true;
		}

		switch (typeof value) {
			case "string":
			case "number":
			case "boolean":
				return true;

			default:
				return false;
		}
	}
};
