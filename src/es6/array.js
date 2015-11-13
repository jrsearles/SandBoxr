import $copyWithin from "./array.copy-within";
import $fill from "./array.fill";
import $find from "./array.find";
import $findIndex from "./array.find-index";
import $from from "./array.from";
import $iterator from "./array.iterator";
import $of from "./array.of";

export default function ($global, env, factory) {
	let arrayClass = $global.getValue("Array");
	let proto = arrayClass.getValue("prototype");

	$from(arrayClass, env, factory);
	$of(arrayClass, env, factory);

	$copyWithin(proto, env, factory);
	$fill(proto, env, factory);
	$find(proto, env, factory);
	$findIndex(proto, env, factory);
	$iterator(proto, env, factory);
}
