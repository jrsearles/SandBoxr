export default function ($target, env, factory) {
	let toStringFunc = factory.createBuiltInFunction(function () {
		let className = this.node ? this.node.className : "Undefined";
		return factory.createPrimitive(`[object ${className}]`);
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	$target.define("toString", toStringFunc);
	$target.define("toLocaleString", toStringFunc);
}
