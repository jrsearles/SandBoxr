import {each} from "../utils/async";

export default function* ArrayExpression (context) {
	const objectFactory = context.env.objectFactory;
	let arr = objectFactory.create("Array");

	if (context.node.elements) {
		yield* each(context.node.elements, function* (element, i) {
			if (element) {
				let item = (yield context.create(element).execute()).result.getValue();
				arr.defineOwnProperty(i, { value: item, configurable: true, enumerable: true, writable: true }, true, context.env);
			}
		});

		arr.putValue("length", objectFactory.createPrimitive(context.node.elements.length), false, context.env);
	}

	return context.result(arr);
}
