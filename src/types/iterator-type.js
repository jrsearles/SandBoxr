import {ObjectType} from "./object-type";

export class IteratorType extends ObjectType {
	constructor (iterable, kind = "key+value") {
		super();

		this.iterable = iterable;
		this.position = 0;
		this.className = "Iterator";
		this.kind = kind;
	}
	
	init (env, proto) {
		super.init(...arguments);
		
		if (!proto) {
			let factory = env.objectFactory;
			proto = factory.createObject();
			proto.className = "[Symbol.iterator]";
			proto.setPrototype(env.global.getValue("%IteratorPrototype%"));
			
			proto.define("next", factory.createBuiltInFunction(function () {
				let result = this.object.advance();
				if (result.value) {
					return result.value;
				}
				
				return factory.createIteratorResult({done: true});
			}));
		}

		this.setPrototype(proto);
	}

	advance () {
		return this.iterable.next();
	}
}
