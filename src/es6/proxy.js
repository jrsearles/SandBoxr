export default function (globalObject, env, factory) {
	let proxyClass = factory.createFunction(function (target, handler) {
		if (!this.isNew) {
			throw TypeError();
		}

		return factory.createProxy(target, handler);
	}, null, {name: "Proxy"});

	proxyClass.define("revocable", factory.createBuiltInFunction(function (target, handler) {
		let proxy = factory.createProxy(target, handler);

		let obj = factory.createObject();
		obj.define("proxy", proxy);
		obj.define("revoke", factory.createBuiltInFunction(function () {
			proxy.revoke();
		}, 0));

		return obj;
	}, 2, "Proxy.revocable"));

	proxyClass.define("length", factory.createPrimitive(2), {writable: false});
	globalObject.define("Proxy", proxyClass);
}
