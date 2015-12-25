import {toString} from "../utils/native";
import {SymbolType} from "../types/symbol-type";
import {UNDEFINED} from "../types/primitive-type";
import {assertIsNotGeneric} from "../utils/contracts";

export default function (globalObject, env, factory) {
	let frozen = {configurable: false, enumerable: false, writable: false};

	let symbolClass = factory.createFunction(function* (desc) {
		if (this.isNew) {
			throw TypeError("Symbol is not a constructor");
		}

		let descString = yield toString(desc);
		return factory.create("Symbol", descString);
	});

	symbolClass.define("for", factory.createBuiltInFunction(function* (key) {
		let keyString = yield toString(key);

		let instance = SymbolType.getByKey(keyString);
		if (instance) {
			return instance;
		}

		return factory.create("Symbol", keyString);
	}, 1, "Symbol.for"));

	symbolClass.define("keyFor", factory.createBuiltInFunction(function (sym) {
		return SymbolType.getByInstance(sym) || UNDEFINED;
	}, 1, "Symbol.keyFor"));

	let proto = symbolClass.getValue("prototype");
	proto.define("toString", factory.createBuiltInFunction(function () {
		let stringValue = `Symbol(${this.object.description})`;
		return factory.createPrimitive(stringValue);
	}, 0, "Symbol.prototype.toString"));

	proto.define("valueOf", factory.createBuiltInFunction(function () {
		assertIsNotGeneric(this.object, "Symbol", "Symbol.prototype.valueOf");
		return this.object;
	}, 0, "Symbol.prototype.valueOf"));

	["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag"].forEach(key => {
		let sym = factory.create("Symbol", "@@" + key);

		// add to global registry
		SymbolType.add(key, sym);
		symbolClass.define(key, sym, frozen);
	});

	let toStringTagSymbol = SymbolType.getByKey("toStringTag");
	proto.define(toStringTagSymbol, factory.createPrimitive("Symbol"), {writable: false});

	globalObject.define("Symbol", symbolClass);
}
