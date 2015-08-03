import PrimitiveType from "./primitive-type";
import PropertyDescriptor from "./property-descriptor";
import * as contracts from "../utils/contracts";

function getCharacter (source, position) {
	if (position < source.value.length) {
		// todo: need to set length
		var character = new StringType(source.value[position]);
		character.setPrototype(source.getPrototype());
		return character;
	}

	return new PrimitiveType(undefined);
}

export default class StringType extends PrimitiveType {
	constructor (value) {
		super(value);
	}

	init (objectFactory) {
		this.properties.length = new PropertyDescriptor(this, {
			configurable: false,
			enumerable: false,
			writable: false,
			value: objectFactory.createPrimitive(this.value.length)
		});
	}

	getProperty (name) {
		if (contracts.isInteger(name)) {
			var position = Number(name);
			if (position < this.value.length) {
				return new PropertyDescriptor(this, { configurable: false, enumerable: true, writable: false, value: getCharacter(this, position) });
			}
		}

		return super.getProperty.apply(this, arguments);
	}

	getOwnPropertyNames () {
		var props = [];
		var ln, i;
		for (i = 0, ln = this.value.length; i < ln; i++) {
			props.push(String(i));
		}

		return props.concat(super.getOwnPropertyNames());
	}

	hasOwnProperty (name) {
		if (contracts.isInteger(name)) {
			return name < this.value.length;
		}

		return super.hasOwnProperty.apply(this, arguments);
	}
}
