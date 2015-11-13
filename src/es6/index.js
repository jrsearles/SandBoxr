import ecma5 from "../es5/";
import $Number from "./number";
import $Array from "./array";
import $Object from "./object";
import $Symbol from "./symbol";
import $String from "./string";
import $Proxy from "./proxy";
import $Set from "./set";
import $Map from "./map";
import $Math from "./math";
import $Reflect from "./reflect";
import $RegExp from "./regex";
import {SymbolType} from "../types/symbol-type";

export default function (env) {
	ecma5(env);

	let objectFactory = env.objectFactory;
	let $global = env.global;

	$Symbol($global, env, objectFactory);
	$Object($global, env, objectFactory);
	$String($global, env, objectFactory);
	$Array($global, env, objectFactory);
	$Number($global, env, objectFactory);
	$Math($global, env, objectFactory);
	$Proxy($global, env, objectFactory);
	$RegExp($global, env, objectFactory);
	$Reflect($global, env, objectFactory);
	$Map($global, env, objectFactory);
	$Set($global, env, objectFactory);

	// setup class symbols
	let stringTagKey = SymbolType.getByKey("toStringTag");
	let speciesKey = SymbolType.getByKey("species");
	["Function", "Number", "Boolean", "Object", "Array", "String", "Date", "RegExp", "JSON", "Error", "Math", "Map", "Set"].forEach(typeName => {
		let ctor = $global.getValue(typeName);

		let speciesGetter = function () { return ctor; };
		let speciesGetterFunc = objectFactory.createGetter(speciesGetter, "[Symbol.species]");
		ctor.define(speciesKey, null, {getter: speciesGetter, get: speciesGetterFunc});

		if (ctor.owns("prototype")) {
			let proto = ctor.getValue("prototype");
			// proto.define(stringTagKey, objectFactory.createPrimitive(typeName), { writable: false });

			// prototypes in ES6 can't be coerced into primitives
			proto.className = "Object";
		} else {
			ctor.define(stringTagKey, objectFactory.createPrimitive(typeName), {writable: false});
		}
	});

	// update length attributes on built-ins
	let lengthAttr = {configurable: true, enumerable: false, writable: false};
	$global.getValue("Function").define("length", objectFactory.createPrimitive(1), lengthAttr);
	$global.getValue("Number").define("length", objectFactory.createPrimitive(1), lengthAttr);
	$global.getValue("Boolean").define("length", objectFactory.createPrimitive(1), lengthAttr);
	$global.getValue("Object").define("length", objectFactory.createPrimitive(1), lengthAttr);
	$global.getValue("Array").define("length", objectFactory.createPrimitive(1), lengthAttr);
	$global.getValue("String").define("length", objectFactory.createPrimitive(1), lengthAttr);
	$global.getValue("Date").define("length", objectFactory.createPrimitive(7), lengthAttr);
	$global.getValue("RegExp").define("length", objectFactory.createPrimitive(2), lengthAttr);
	$global.getValue("Map").define("length", objectFactory.createPrimitive(0), lengthAttr);
	$global.getValue("Set").define("length", objectFactory.createPrimitive(0), lengthAttr);

	let funcProto = $global.getValue("Function").getValue("prototype");

	let thrower = function () {
		throw TypeError("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
	};

	let throwerFunc = objectFactory.createBuiltInFunction(thrower);
	let prop = {
		get: throwerFunc,
		getter: thrower,
		set: throwerFunc,
		setter: thrower,
		enumerable: false,
		configurable: false
	};

	funcProto.define("caller", null, prop);
	funcProto.define("arguments", null, prop);
}
