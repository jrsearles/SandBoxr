import $isFinite from "./number.is-finite";
import $isInteger from "./number.is-integer";
import $isNaN from "./number.is-nan";
import $isSafeInteger from "./number.is-safe-integer";
import $parseFloat from "./number.parse-float";
import $parseInt from "./number.parse-int";

export default function (globalObject, env, factory) {
	let numberClass = globalObject.getValue("Number");

	$isFinite(numberClass, env, factory);
	$isInteger(numberClass, env, factory);
	$isNaN(numberClass, env, factory);
	$isSafeInteger(numberClass, env, factory);
	$parseFloat(numberClass, env, factory);
	$parseInt(numberClass, env, factory);

	let epsilonValue = factory.createPrimitive(Number.EPSILON || 2.220446049250313e-16);
	numberClass.define("EPSILON", epsilonValue, {configurable: false, writable: false});
}
