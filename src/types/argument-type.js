import {ObjectType} from "./object-type";

export class ArgumentType extends ObjectType {
	constructor (callee) {
		super();
		this.className = "Arguments";
		this.parameterMap = Object.create(null);
		this.callee = callee;
	}

	mapProperty (index, binding) {
		index = String(index);
		super.defineProperty(index, {configurable: true, enumerable: true, writable: true, value: undefined}, true);
		this.parameterMap[index] = binding;
	}

	getProperty (key) {
		let ownProperty = this.getOwnProperty(key);
		if (ownProperty) {
			return ownProperty;
		}

		return super.getProperty(key);
	}

	getOwnProperty (key) {
		let name = String(key);

		if (name in this.parameterMap) {
			let mappedProperty = this.properties[name];
			let linkedProperty = this.parameterMap[name];

			mappedProperty.value = linkedProperty.getValue();
			mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
			return mappedProperty;
		}

		return super.getOwnProperty(key);
	}

	defineProperty (key, descriptor, throwOnError) {
		let name = String(key);

		let allowed = super.defineProperty(...arguments);
		if (allowed && name in this.parameterMap) {
			if ("set" in descriptor || "get" in descriptor) {
				delete this.parameterMap[name];
			} else if ("value" in descriptor) {
				this.parameterMap[name].setValue(descriptor.value, throwOnError);
			}

			if ("writable" in descriptor && !descriptor.writable) {
				delete this.parameterMap[name];
			}
		}

		return allowed;
	}

	deleteProperty (key, throwOnError) {
		let name = String(key);
		if (name in this.parameterMap) {
			delete this.parameterMap[name];
		}

		return super.deleteProperty(...arguments);
	}
}
