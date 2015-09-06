import "../polyfills";

const objectOrFunctionTypes = { "object": true, "function": true };
function isObjectOrFunction (obj) {
	return obj && typeof obj in objectOrFunctionTypes;
}

function isThenable (obj) {
	return isObjectOrFunction(obj) && typeof obj.then === "function";
}

function isNextable (obj) {
	return isObjectOrFunction(obj) && typeof obj.next === "function";
}

export function degenerate (inner) {
	return function () {
		let generator = inner.apply(this, arguments);

		function handle (result) {
			if (result.done) {
				return result.value;
			}

			if (isThenable(result.value)) {
				return result.value.then(res => handle(generator.next(res)), err => handle(generator.throw(err)));
			}

			return handle(generator.next(result.value));
		}

		return handle(generator.next());
	};
}

export function promisify (obj) {
	if (isThenable(obj)) {
		return obj;
	}

	if (isNextable(obj)) {
		let result;
		for (result of obj) {
			if (isThenable(result)) {
				return result;
			}
		}

		return Promise.resolve(result);
	}

	return Promise.resolve(obj);
}
