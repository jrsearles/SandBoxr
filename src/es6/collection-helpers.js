export function findIndex (obj, key) {
	let env = obj[Symbol.for("env")];

	for (let i = 0, length = obj.data.length; i < length; i++) {
		let current = obj.data[i];
		if (current) {
			if (env.ops.areSameOrZero(key, current.key)) {
				return i;
			}
		}
	}

	return -1;
}