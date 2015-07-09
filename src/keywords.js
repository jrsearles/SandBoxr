module.exports = {
	"es5": [
		"do",
		"if",
		"in",
		"for",
		"new",
		"try",
		"var",
		"case",
		"else",
		"enum",
		"eval",
		"null",
		"this",
		"true",
		"void",
		"with",
		"break",
		"catch",
		"class",
		"const",
		"false",
		"super",
		"throw",
		"while",
		"delete",
		"export",
		"import",
		"return",
		"switch",
		"typeof",
		"default",
		"extends",
		"finally",
		"continue",
		"debugger",
		"function",
		// "arguments",
		"instanceof"],

	"es5-strict": [
		"implements",
		"let",
		"private",
		"public",
		"interface",
		"package",
		"protected",
		"static",
		"yield"],

	isReserved: function (name, scope) {
		return this.es5.indexOf(name) >= 0;
		// if (this[scope.version].indexOf(name) >= 0) {
		// 	return true;
		// }

		// if (scope.strict && this[scope.version + "-strict"].indexOf >= 0) {
		// 	return true;
		// }

		// return false;
	}
};
