const hasOwn = Object.prototype.hasOwnProperty;

export function owns (obj, prop) {
	return hasOwn.call(obj, prop);
}
