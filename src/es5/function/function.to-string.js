export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		if (this.node.native) {
			return factory.createPrimitive("function () { [native code] }");
		}

		return factory.createPrimitive("function () { [user code] }");
	}, 0, "Function.prototype.toString"));
}
