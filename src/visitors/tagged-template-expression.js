import {map} from "../utils/async";

let templateObjectCache = Object.create(null);

function buildTemplateObject (env, node) {
	// per spec, template objects are cached
	let key = JSON.stringify(node.quasis.map(q => { return {cooked: q.value.cooked, raw: q.value.raw}; }));
	if (key in templateObjectCache) {
		return templateObjectCache[key];
	}

	let objectFactory = env.objectFactory;
	let tag = objectFactory.createArray();
	let raw = objectFactory.createArray();
	let quasis = node.quasis;

	for (let i = 0, ln = quasis.length; i < ln; i++) {
		tag.setValue(i, objectFactory.createPrimitive(quasis[i].value.cooked));
		raw.setValue(i, objectFactory.createPrimitive(quasis[i].value.raw));
	}

	raw.freeze();
	tag.defineOwnProperty("raw", {value: raw});
	tag.freeze();

	return templateObjectCache[key] = tag;
}

export default function* TaggedTemplateExpression (context) {
	let templateObject = buildTemplateObject(context.env, context.node.quasi);

	let values = yield map(context.node.quasi.expressions, function* (expr) {
		let value = yield context.create(expr).execute();
		return yield value.result.getValue();
	});

	let callee = (yield context.create(context.node.tag).execute()).result;
	let func = callee.getValue();
	let value = yield func.call(callee.base, [templateObject, ...values], callee);
	return context.result(value);
}
