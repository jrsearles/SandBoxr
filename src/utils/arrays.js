import * as contracts from "./contracts";
import "../polyfills";

const SPARE_ARRAY_DENSITY = 0.8;
const ascending = (a, b) => a - b;
const descending = (a, b) => b - a;

function getIndices (source, length, start, asc) {
	let indices = Object.create(null);

	while (source) {
		source.getOwnPropertyNames().forEach(name => {
			if (contracts.isInteger(name) && name >= start && name <= length) {
				indices[name] = 1;
			}
		});
		
		source = source.getPrototype();
	}
	
	return Object.keys(indices).sort(asc ? ascending : descending);
}

function* sparseArrayIterator (source, length, start) {
	let indices = getIndices(source, length - 1, start, true);
	let ln = indices.length;
	let i = 0;
	
	while (i < ln) {
		let index = Number(indices[i]);
		let nextIndex = indices[++i] || length;
		
		// todo: add way to determine whether a property was added
		// during an iteration so we don't have to manually check
		// the gaps
		while (index < nextIndex) {
			// we still need to verify the existence in case the
			// index was deleted during the processing of a prior
			// iteration
			let prop = source.getProperty(index);
			if (prop) {
				yield { value: prop.getValue(), index: index };
			}
			
			index++;
		}
	}
}

function* reverseSparseArrayIterator (source, start) {
	let indices = getIndices(source, start, 0, false);
	let ln = indices.length;
	let i = 0;
	
	while (i < ln) {
		let index = Number(indices[i]);
		let nextIndex = indices[++i];
		
		if (nextIndex === undefined) {
			nextIndex = -1;
		}
		
		// todo: add way to determine whether a property was added
		// during an iteration so we don't have to manually check
		// the gaps
		while (index > nextIndex) {
			// we still need to verify the existence in case the
			// index was deleted during the processing of a prior
			// iteration
			let prop = source.getProperty(index);
			if (prop) {
				yield { value: prop.getValue(), index: index };
			}
			
			index--;
		}
	}
}

function* arrayIterator (source, length, index) {
	for (; index < length; index++) {
		let prop = source.getProperty(index);
		if (prop) {
			yield { value: prop.getValue(), index: index };
		}
	}
}

function* reverseArrayIterator (source, index) {
	for (; index >= 0; index--) {
		let prop = source.getProperty(index);
		if (prop) {
			yield { value: prop.getValue(), index: index };
		}
	}
}

function* stringIterator (env, source, i) {
	let objectFactory = env.objectFactory;
	let stringValue = source.unwrap();
	
	for (let ln = stringValue.length; i < ln; i++) {
		yield { value: objectFactory.createPrimitive(stringValue[i]), index: i };	
	}
}

function* reverseStringIterator (env, source, index) {
	let objectFactory = env.objectFactory;
	let stringValue = source.unwrap();
	
	for (; index >= 0; index--) {
		yield { value: objectFactory.createPrimitive(stringValue[index]), index: index };
	}
}

function arrayIsSparse (arr, length) {
	let ownPropertyCount = Object.keys(arr.properties).length;
	
	// this is just to roughly estimate how dense the array is
	let density = (ownPropertyCount - 1) / length;
	return density < SPARE_ARRAY_DENSITY;
}

export function iterator (env, obj, length, start = 0) {
	// string will never be dense
	if (obj.className === "String") {
		return stringIterator(env, obj, start);
	}
	
	if (arrayIsSparse(obj, length)) {
		return sparseArrayIterator(obj, length, start);
	}

	return arrayIterator(obj, length, start);
}

export function reverseIterator (env, obj, start) {
	if (obj.className === "String") {
		return reverseStringIterator(env, obj, start);
	}
	
	if (arrayIsSparse(obj, start)) {
		return reverseSparseArrayIterator(obj, start);
	}
	
	return reverseArrayIterator(obj, start);
}
