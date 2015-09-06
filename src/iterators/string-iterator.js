function* ascIterator (factory, stringValue, start) {
	for (let index = start, length = stringValue.length; index < length; index++) {
		let value = factory.createPrimitive(stringValue[index]);
		yield { value, index };
	}
}

function* descIterator (factory, stringValue, start) {
	for (let index = start; index >= 0; index--) {
		let value = factory.createPrimitive(stringValue[index]);
		yield { value, index };
	}
}

const StringIterator = {
	create (objectFactory, value, start, desc) {
		let stringValue = value.unwrap();
		return (desc ? descIterator : ascIterator)(objectFactory, stringValue, start);
	}
};

export default StringIterator;
