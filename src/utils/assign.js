import {UNDEFINED} from "../types/primitive-type";
import {each} from "./async";
import {toPropertyKey} from "./native";

export function* reset (env, leftNode, priorScope, newScope) {
	if (leftNode.isVariableDeclaration()) {
		yield each(leftNode.declarations, function* (decl) { yield reset(env, decl, priorScope, newScope); });
	} else if (leftNode.isLet() || leftNode.isConst()) {
		let currentBinding = priorScope.getVariable(leftNode.id.name);
		newScope.getVariable(leftNode.id.name).setValue(currentBinding.getValue());
	} else {
		yield destructure(env, leftNode, null, (env, left) => reset(env, left, priorScope, newScope));
	}
}

export function* declare (env, leftNode, rightValue) {
	if (leftNode.isVariableDeclaration()) {
		for (let decl of leftNode.declarations) {
			yield declare(env, decl, rightValue);
		}
	} else if (leftNode.isVariableDeclarator()) {
		yield declare(env, leftNode.id, rightValue);
	} else if (leftNode.isIdentifier()) {
		let left = env.createVariable(leftNode.name);
		left.setValue(rightValue);
	} else {
		yield destructure(env, leftNode, rightValue, declare);
	}

	return rightValue;
}

export function* assign (env, leftNode, rightValue) {
	switch (leftNode.type) {
		case "Identifier":
		case "MemberExpression":
			let left = (yield env.createExecutionContext().execute(leftNode)).result;
			left.setValue(rightValue, env.isStrict());
			break;

		default:
			yield destructure(env, leftNode, rightValue, assign);
	}

	return rightValue;
}

function* destructure (env, leftNode, rightValue, cb) {
	switch (leftNode.type) {
		case "ArrayPattern":
			yield destructureArray(env, leftNode, rightValue, cb);
			break;

		case "ObjectPattern":
			yield destructureObject(env, leftNode, rightValue, cb);
			break;

		case "AssignmentPattern":
			yield handleDefault(env, leftNode, rightValue, cb);
			break;

		default:
			throw Error(`${leftNode.type} not implemented`);
	}
}

function* handleDefault (env, left, rightValue, cb) {
	if (rightValue === UNDEFINED) {
		let defaultValue = (yield env.createExecutionContext().execute(left.right));
		rightValue = defaultValue.result.getValue();
	}

	yield cb(env, left.left, rightValue);
}

function* destructureArray (env, pattern, arr, cb) {
	yield each(pattern.elements, function* (current, index) {
		if (!current) {
			return;
		}
		
		if (current.isRestElement()) {
			let rest = [];
			
			// todo: fully iterate
			while (arr.has(index)) {
				rest.push(arr.getProperty(index).getValue());
				index++;
			}
			
			yield cb(env, current.argument, env.objectFactory.createArray(rest));
		}	else {
			let propInfo = arr.getProperty(index);
			let value = propInfo ? propInfo.getValue() : UNDEFINED;

			yield cb(env, current, value);
		}
	});
}

function* getObjectKey (env, keyNode) {
	if (keyNode.computed) {
		let key = (yield env.createExecutionContext().execute(keyNode)).result.getValue();
		return yield toPropertyKey(key);
	}

	return keyNode.name;
}

function* destructureObject (env, pattern, obj, cb) {
	yield each(pattern.properties, function* (current) {
		let key;
		if (current.computed) {
			key = yield toPropertyKey((yield env.createExecutionContext().execute(current.key)).result.getValue());
		} else {
			key = yield getObjectKey(env, current.key);
		}
		
		let propInfo = obj.getProperty(key);
		let value = propInfo ? propInfo.getValue() : UNDEFINED;

		yield cb(env, current.value, value);
	});
}
