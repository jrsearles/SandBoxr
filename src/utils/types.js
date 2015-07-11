var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^-?\d+$/;

module.exports = {
	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
	},

	isNullOrUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value == null);
	},

	isUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value === undefined);
	},

	isInteger: function (value) {
		if (typeof value === "string") {
			return integerRgx.test(value);
		}

		if (typeof value === "number") {
			return isFinite(value) && Math.floor(value) === value;
		}

		return false;
	}
};
