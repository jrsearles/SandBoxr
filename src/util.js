var objectRgx = /\[object (\w+)\]/;

module.exports = {
	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
	},

	toArray: function (obj) {
		var arr = [];

		if (obj) {
			var ln = obj.getProperty("length").value;
			var i = 0;

			while (i < ln) {
				if (i in obj.properties) {
					arr.push(obj.getProperty(i));
				}

				i++;
			}
		}

		return arr;
	}
};
