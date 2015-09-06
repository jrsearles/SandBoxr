import StringIterator from "./string-iterator";
import SparseIterator from "./sparse-iterator";
import ArrayIterator from "./array-iterator";
import "../polyfills";

const SPARE_ARRAY_DENSITY = 0.8;

function arrayIsSparse (arr, length) {
	let ownPropertyCount = Object.keys(arr.properties).length;
	
	// this is just to roughly estimate how dense the array is
	let density = (ownPropertyCount - 1) / length;
	return density < SPARE_ARRAY_DENSITY;
}

const iterate = {
	forward (env, obj, lo, hi) {
		// string will never be dense
		if (obj.className === "String") {
			return StringIterator.create(env.objectFactory, obj, lo);
		}
		
		if (arrayIsSparse(obj, hi)) {
			return SparseIterator.create(obj, lo, hi - 1);
		}
	
		return ArrayIterator.create(obj, lo, hi);
	},
	
	reverse (env, obj, hi, lo = 0) {
		if (obj.className === "String") {
			return StringIterator.create(env.objectFactory, obj, hi, true);
		}
		
		if (arrayIsSparse(obj, hi)) {
			return SparseIterator.create(obj, lo, hi, true);
		}
		
		return ArrayIterator.create(obj, lo, hi, true);
	}
};

export default iterate;
