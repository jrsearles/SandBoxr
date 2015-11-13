export default function ($target, env, factory) {
	let proto = $target.getValue("prototype");
	$target.define("isArray", factory.createBuiltInFunction(function (obj) {
		return factory.createPrimitive(!!(obj && (obj.className === "Array" || obj === proto)));
	}, 1, "Array.isArray"));
}