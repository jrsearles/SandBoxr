var objectRgx = /\[object (\w+)\]/;

module.exports = {
	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
	}
};
