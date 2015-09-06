
function* ascIterator (source, lo, hi) {
	for (let index = lo; index < hi; index++) {
		yield* yieldIndex(source, index);
	}
}

function* descIterator (source, lo, hi) {
	for (let index = hi; index >= lo; index--) {
		yield* yieldIndex(source, index);
	}
}

function* yieldIndex (source, index) {
	let prop = source.getProperty(index);
	if (prop) {
		let value = prop.getValue();
		yield { value, index };
	}
}

const ArrayIterator = {
	create (obj, lo, hi, desc) {
		return (desc ? descIterator : ascIterator)(obj, lo, hi);
	}
};

export default ArrayIterator;
