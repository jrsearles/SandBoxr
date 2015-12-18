export default function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		return factory.createPrimitive(this.object.value.valueOf());
	}, 0, "Date.prototype.valueOf"));
}
