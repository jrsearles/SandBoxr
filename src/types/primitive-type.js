import {ObjectType} from "./object-type";
import * as contracts from "../utils/contracts";

export class PrimitiveType extends ObjectType {
	constructor (value) {
		super();

		this.isPrimitive = true;
		this.value = value;
		this.type = typeof value;

		this.className = contracts.getType(value);
	}

	getProperty (name) {
		// can't read properties of null/undefined
		if (this.value == null) {
			throw new TypeError(`Cannot read property '${name}' of ${this.type}`);
		}

		return super.getProperty(...arguments);
	}

	toNative () {
		return this.value;
	}
}

export const UNDEFINED = new PrimitiveType(undefined);
export const NULL = new PrimitiveType(null);
