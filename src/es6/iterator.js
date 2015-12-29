export default function ($target, env, factory) {
	let proto = factory.createObject();
	proto.define(env.getSymbol("iterator"), factory.createBuiltInFunction(function () {
		return this.object;
	}, 0, "[Symbol.iterator]"));
	
	// hack: attach to global though it'd be better if there was another way to access
	$target.define("%IteratorPrototype%", proto);
}
