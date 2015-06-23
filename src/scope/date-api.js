var convert = require("../utils/convert");

var staticMethods = ["now"];
var protoMethods = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDay", "getUTCDate", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toString", "toTimeString", "toUTCString", "valueOf"];
var setters = ["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"];
var slice = Array.prototype.slice;
var propertyConfig = { enumerable: false };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var dateClass = objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var dateValue, args;

		if (arguments.length === 0) {
			args = [];
		} else if (arguments.length === 1) {
			args = [convert.toPrimitive(this, arguments[0], "string")];
		} else {
			args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "number"); });
		}

		if (this.isNew) {
			switch (arguments.length) {
				case 0:
					dateValue = new Date();
					break;

				case 1:
					dateValue = new Date(arguments[0].value);
					break;

				default:
					var i = args.length;
					while (i < 7) {
						// default day to 1, all others to 0
						args[i++] = i === 3 ? 1 : 0;
					}

					dateValue = new Date(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
					break;
			}

			return objectFactory.create("Date", dateValue);
		}

		dateValue = Date.apply(null, args);
		return objectFactory.createPrimitive(dateValue);
	}, globalScope);

	dateClass.defineOwnProperty("parse", objectFactory.createFunction(function (value) {
		var stringValue = convert.toPrimitive(this, value, "string");
		var dateValue = Date.parse(stringValue);
		return objectFactory.createPrimitive(dateValue);
	}, globalScope), propertyConfig);

	dateClass.defineOwnProperty("UTC", objectFactory.createFunction(function (p1, p2, p3, p4, p5, p6, p7) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg, "number"); });
		return objectFactory.createPrimitive(Date.UTC.apply(null, args));
	}, globalScope), propertyConfig);

	var proto = dateClass.proto;

	staticMethods.forEach(function (name) {
		dateClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(Date[name])));
	});

	protoMethods.forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(Date.prototype[name])), propertyConfig);
	});

	setters.forEach(function (name) {
		function setter () {
			var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(arg); });
			Date.prototype[name].apply(this.node.value, args);
		}

		setter.nativeLength = Date.prototype[name].length;
		proto.defineOwnProperty(name, objectFactory.createFunction(setter), propertyConfig);
	});

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.value.valueOf());
	}), propertyConfig);

	globalScope.defineOwnProperty("Date", dateClass, propertyConfig);
};
