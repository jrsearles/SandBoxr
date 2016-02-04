import {each} from "../utils/async";
import iterate from "../iterators/";

export default function* ArrayExpression (node, context, next) {
	const objectFactory = context.env.objectFactory;
	let arr = objectFactory.createArray();

	if (node.elements) {
		let spreadOffset = 0;
		
    for (let i = 0, ln = node.elements.length; i < ln; i++) {
      let element = node.elements[i];
			if (element) {
				let value = (yield next(element, context)).result.getValue();
				
				if (element.isSpreadElement()) {
					let it = iterate.getIterator(value);
					for ({value} of it) {
						arr.setIndex(i + spreadOffset, value);
						spreadOffset++;
					}
				} else {
					arr.setIndex(i + spreadOffset, value);
				}
			}
    }
    
		// yield* each(node.elements, function* (element, index) {
		// 	if (element) {
		// 		let value = (yield next(element, context)).result.getValue();
				
		// 		if (element.isSpreadElement()) {
		// 			let it = iterate.getIterator(value);
		// 			for ({value} of it) {
		// 				arr.setIndex(index + spreadOffset, value);
		// 				spreadOffset++;
		// 			}
		// 		} else {
		// 			arr.setIndex(index + spreadOffset, value);
		// 		}
		// 	}
		// });

		arr.setValue("length", objectFactory.createPrimitive(node.elements.length + spreadOffset));
	}

	return context.result(arr);
}
