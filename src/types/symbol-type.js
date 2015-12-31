import {ObjectType} from "./object-type";

const GLOBAL_SYMBOL_REGISTRY = Object.create(null);
let uid = 0;

export class SymbolType extends ObjectType {
	constructor (description) {
		super();
		this.type = "symbol";
		this.className = "Symbol";
		this.description = description;
		this.uid = uid++;

		// add so we can easily check if an object is a symbol when we care
		this.isSymbol = true;
	}

	defineProperty (key, descriptor) {
		return false;
	}

	setValue (key, value, target) {
		return false;
	}

	toNative () {
		return `Symbol(${this.description})`;
	}

	toString () {
		// this method is here so symbols can be coerced into strings for property lookups
		return "@@" + this.uid;
	}
	
	toSymbolString () {
		return this.description ? `[${this.description}]` : "";
	}

	static add (key, sym) {
		GLOBAL_SYMBOL_REGISTRY[key] = sym;
	}

	static getByKey (key) {
		return GLOBAL_SYMBOL_REGISTRY[key];
	}

	static getByInstance (sym) {
		for (let key in GLOBAL_SYMBOL_REGISTRY) {
			if (sym === GLOBAL_SYMBOL_REGISTRY[key]) {
				return GLOBAL_SYMBOL_REGISTRY[key];
			}
		}

		return undefined;
	}
}
