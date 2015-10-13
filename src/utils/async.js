import "../polyfills";

const objectOrFunctionTypes = { "object": true, "function": true };
function isObjectOrFunction (obj) {
	return obj && typeof obj in objectOrFunctionTypes;
}

export function isThenable (obj) {
	return isObjectOrFunction(obj) && typeof obj.then === "function";
}

function isNextable (obj) {
	return isObjectOrFunction(obj) && typeof obj.next === "function";
}

export function* map (arr, func) {
	let mapped = [];

	for (let i = 0, ln = arr.length; i < ln; i++) {
		mapped.push(yield* func(arr[i], i, arr));
	}

	return mapped;
}

export function* each (arr, func) {
	let abort = false;
	let aborter = function () { abort = true; };

	for (let i = 0, ln = arr.length; i < ln; i++) {
		yield* func(arr[i], i, arr, aborter);

		if (abort) {
			break;
		}
	}
}

export function* step (it, prev) {
	let result = it.next(prev);
	let value = result.value;

	if (isNextable(value)) {
		yield* step(value);
	} else if (isThenable(value)) {
		yield value.then(res => it);
	}

	if (result.done) {
		return value;
	} else {
		yield step(it, value);
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
		return value;
	}

	if (isThenable(value)) {
		return value.then(res => exhaust(it, res), err => it.throw(err));
	}

	return exhaust(it, value);
}

/**
 * Normalizes a result into a promise, whether it is a generator, promise,
 * or normal value.
 *
 * @param {Iterator} [it] - The iterator.
 * @returns {Promise} A promise which resolves or rejects based on the result.
 */
export function promisify (it) {
	try {
		let result = exhaust(it);
		if (isNextable(result)) {
			return result;
		}

		return Promise.resolve(result);
	} catch (err) {
		return Promise.reject(err.toNative());
	}
}
