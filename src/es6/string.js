import $codePointAt from "./string.code-point-at";
import $fromCodePoint from "./string.from-code-point";
import $includes from "./string.includes";
import $iterator from "./string.iterator";
import $normalize from "./string.normalize";
import $raw from "./string.raw";
import $repeat from "./string.repeat";

export default function (globalObject, env, factory) {
	let stringClass = globalObject.getValue("String");
	let proto = stringClass.getValue("prototype");

	$fromCodePoint(stringClass, env, factory);
	$raw(stringClass, env, factory);
	$codePointAt(proto, env, factory);
	$includes(proto, env, factory);
	$normalize(proto, env, factory);
	$repeat(proto, env, factory);
	$iterator(proto, env, factory);
}
