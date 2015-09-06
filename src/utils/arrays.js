import SparseIterator from "../iterators/sparse-iterator";
import StringIterator from "../iterators/string-iterator";
import ArrayIterator from "../iterators/array-iterator";
import "../polyfills";

const SPARE_ARRAY_DENSITY = 0.8;

function arrayIsSparse (arr, length) {
	let ownPropertyCount = Object.keys(arr.properties).length;
	
	// this is just to roughly estimate how dense the array is
	let density = (ownPropertyCount - 1) / length;
	return density < SPARE_ARRAY_DENSITY;
}

export function iterator (env, obj, length, start = 0) {
	// string will never be dense
	if (obj.className === "String") {
		return StringIterator.create(env.objectFactory, obj, start);
		// return stringIterator(env, obj, start);
	}
	
	if (arrayIsSparse(obj, length)) {
		return SparseIterator.create(obj, start, length - 1);
	}

	return ArrayIterator.create(obj, start, length);
	// return arrayIterator(obj, length, start);
}

export function reverseIterator (env, obj, start) {
	if (obj.className === "String") {
		return StringIterator.create(env.objectFactory, obj, start, true);
		// return reverseStringIterator(env, obj, start);
	}
	
	if (arrayIsSparse(obj, start)) {
		return SparseIterator.create(obj, 0, start, true);
		// return sparseIterator(obj, 0, start, -1);
	}
	
	return ArrayIterator.create(obj, start, 0, true);
	// return reverseArrayIterator(obj, start);
}
