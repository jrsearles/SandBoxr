import {PrimitiveType} from "./primitive-type";
import {PropertyDescriptor} from "./property-descriptor";
import {isInteger} from "../utils/native";

const charAttrs = {writable: false, enumerable: true, configurable: false};

function lazyInit (instance, key) {
	let nativeValue = instance.value;
	if (!nativeValue || !isInteger(key) || "0" in instance.properties) {
		return;
	}

	for (let i = 0, ln = nativeValue.length; i < ln; i++) {
		// we are not using the object factory to avoid circular loop
		// todo: i think we can resolve that by having a string instance return itself for 1 length strings and 0 position
		let c = new StringType(nativeValue[i]);
		c[Symbol.for("env")] = instance[Symbol.for("env")];
		c.setPrototype(instance.proto);
		c.define("0", c, charAttrs);

		instance.define(i, c, charAttrs);
	}
}

export class StringType extends PrimitiveType {
	constructor (value) {
		super(value);
	}

	init (env) {
		super.init(...arguments);
		let length = this.value.length;

		this.properties.length = new PropertyDescriptor(this, {
			configurable: false,
			enumerable: false,
			writable: false,
			value: env.objectFactory.createPrimitive(length)
		}, "length");
	}

	getProperty (key) {
		lazyInit(this, key);
		return super.getProperty(...arguments);
	}

	getOwnProperty (key) {
		lazyInit(this, key);
		return super.getOwnProperty(...arguments);
	}

	getOwnPropertyKeys () {
		lazyInit(this, 0);
		return super.getOwnPropertyKeys(...arguments);
	}

	has (key) {
		lazyInit(this, key);
		return super.has(...arguments);
	}

	owns (key) {
		lazyInit(this, key);
		return super.owns(...arguments);
	}
}
