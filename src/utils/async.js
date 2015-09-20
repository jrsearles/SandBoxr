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

export function* map (arrayLike, func) {
	let arr = [];
	for (let i = 0, ln = arrayLike.length; i < ln; i++) {
		arr.push(yield func(arrayLike[i], i, arrayLike));
	}

	return arr;
}

export function* each (arr, func) {
	for (let i = 0, ln = arr.length; i < ln; i++) {
		yield func(arr[i], i, arr);
	}
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

export function* step (it) {
	let result = it.next();
	let value = result.value;

	if (isNextable(value)) {
		yield* step(value);
	} else if (isThenable(value)) {
		yield value.then(res => it);
	} else {
		yield value;
	}

	if (!result.done) {
		yield* step(it);
	} else if (result.done && result.value) {
		return result.value;
	}
}

/**
 * Fully exhausts an iterator, including delegated generators.
 * Special handling is taken if a Promise is returned, pausing
 * the generator until the promise is resolved.
 *
 * @param {Iterator} [it] - The iterator
 * @param {Object} [prev] - The previous iteration value (internal)
 * @returns {Object|Promise} Returns the final value, or a Promise if
 * at any point in the iteration a Promise is returned.
 */
export function exhaust (it, prev) {
	// sanity check
	if (!isNextable(it)) {
		return it;
	}

	let result = it.next(prev);
	let value = result.value;

	if (isNextable(value)) {
		try {
			value = exhaust(value);
		} catch (err) {
			// cascade the error upstream
			let e = it.throw(err);
			return exhaust(e.value);
		}
	}

	if (result.done) {
		return result.value || value;
	}

	if (isThenable(value)) {
		return value.then(res => exhaust(it, res), err => it.throw(err));
	}

	return exhaust(it, value);
}

export function promisify (obj) {
	if (isNextable(obj)) {
		return Promise.resolve(exhaust(obj));
	}

	return Promise.resolve(obj);
}
