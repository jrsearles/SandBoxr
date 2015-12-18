function isObject (obj) {
	return obj && typeof obj === "object";
}

function isFunction (obj) {
	return typeof obj === "function";
}

export function isThenable (obj) {
	return (isObject(obj) || isFunction(obj)) && typeof obj.then === "function";
}

function isNextable (obj) {
	return isObject(obj) && typeof obj.next === "function";
}

export function* map (arr, func) {
	let mapped = [];

	yield* each(arr, function* () {
		mapped.push(yield* func(...arguments));
	});

	return mapped;
}

export function* each (arr, func) {
	if (arr.length === 0) {
		return;
	}
	
	let aborted = false;
	let aborter = function () { aborted = true; };

	for (let i = 0, ln = arr.length; !aborted && i < ln; i++) {
		yield* func(arr[i], i, arr, aborter);
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

function tryCatch (it, priorValue, method) {
	try {
		let {done, value} = it[method](priorValue);
		return {state: "next", done, value};
	} catch (err) {
		return {state: "throw", done: false, value: err};
	}
}

/**
 * Fully exhausts an iterator, including delegated generators.
 * Special handling is taken if a Promise is returned, pausing
 * the generator until the promise is resolved.
 *
 * @param {Iterator} [it] - The iterator
 * @param {Object} [value] - The previous iteration value (internal)
 * @param {Array<Iterator>} [stack] - The stack of iterators (internal)
 * @returns {Object|Promise} Returns the final value, or a Promise if
 * at any point in the iteration a Promise is returned.
 */
export function exhaust (it, value, stack = [], state = "next") {
	while (it) {
		if (!isNextable(it)) {
			value = it;

			if (!(it = stack.pop())) {
				break;
			}
		}

		let done;
		({state, done, value} = tryCatch(it, value, state));

		if (state === "throw") {
			if (it = stack.pop()) {
				continue;
			}

			throw value;
		}

		if (value) {
			if (isNextable(value)) {
				stack.push(it);

				it = value;
				value = undefined;

				continue;
			}

			if (isThenable(value)) {
				return value.then(res => exhaust(it, res, stack), err => exhaust(it, err, stack, "throw"));
			}
		}

		if (done) {
			it = stack.pop();
		}
	}

	return value;
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
		if (typeof err === "object" && typeof err.toNative === "function") {
			err = err.toNative();
		}

		return Promise.reject(err);
	}
}
