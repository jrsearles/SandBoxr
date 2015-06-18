var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^\d+$/;

module.exports = {
	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
	},

	toArray: function (obj) {
		var arr = [];

		if (obj) {
			var ln = obj.getValue("length").value;
			var i = 0;

			while (i < ln) {
				if (i in obj.properties) {
					arr.push(obj.getValue(i));
				}

				i++;
			}
		}

		return arr;
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
