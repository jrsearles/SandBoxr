import {each} from "../utils/async";

export default function* ArrayExpression (node, context, next) {
	const objectFactory = context.env.objectFactory;
	let arr = objectFactory.createArray();

	if (node.elements) {
		yield* each(node.elements, function* (element, i) {
			if (element) {
				let item = (yield next(element, context)).result.getValue();
				arr.setIndex(i, item);
			}
		});

		arr.setValue("length", objectFactory.createPrimitive(node.elements.length));
	}

	return context.result(arr);
}
