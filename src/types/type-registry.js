var types = Object.create(null);
var parentsToSet = Object.create(null);

module.exports = {
	get: function (typeName) {
		return types[typeName.toUpperCase()];
	},

	set: function (typeName, type) {
		typeName = typeName.toUpperCase();
		types[typeName] = type;

		if (typeName in parentsToSet) {
			parentsToSet[typeName].forEach(function (obj) {
				obj.parent = type;
			});

			delete parentsToSet[typeName];
		}
	},

	setParent: function (obj, typeName) {
		typeName = typeName.toUpperCase();

		if (!(typeName in types)) {
			// the type might not be registered due to timing so we will set it when it gets registered
			parentsToSet[typeName] = parentsToSet[typeName] || [];
			parentsToSet[typeName].push(obj);
		} else {
			obj.parent = types[typeName];
		}
	}
};
