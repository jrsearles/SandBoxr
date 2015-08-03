import ObjectType from "./object-type";

export default class RegexType extends ObjectType {
	constructor (value) {
		super();
		this.source = value;
		this.className = "RegExp";
	}

	init (objectFactory) {
		// lastIndex is settable, all others are read-only attributes
		this.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(this.source.lastIndex), writable: true });
		this.defineOwnProperty("source", { value: objectFactory.createPrimitive(this.source.source) });
		this.defineOwnProperty("global", { value: objectFactory.createPrimitive(this.source.global) });
		this.defineOwnProperty("ignoreCase", { value: objectFactory.createPrimitive(this.source.ignoreCase) });
		this.defineOwnProperty("multiline", { value: objectFactory.createPrimitive(this.source.multiline) });
	}

	unwrap () {
		return this.source;
	}
}
