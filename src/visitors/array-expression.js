import {each} from "../utils/async";

export default function* ArrayExpression (context) {
	const objectFactory = context.env.objectFactory;
	let arr = objectFactory.createArray();

	if (context.node.elements) {
		yield* each(context.node.elements, function* (element, i) {
			if (element) {
				let item = (yield context.create(element).execute()).result.getValue();
				arr.setIndex(i, item);
			}
		});

		arr.setValue("length", objectFactory.createPrimitive(context.node.elements.length));
	}

	return context.result(arr);
}
