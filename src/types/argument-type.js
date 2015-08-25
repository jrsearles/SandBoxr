import ObjectType from "./object-type";

export default class ArgumentType extends ObjectType {
	constructor (callee) {
		super();
		this.className = "Arguments";
		this.parameterMap = Object.create(null);
		this.callee = callee;
	}

	mapProperty (index, binding) {
		index = String(index);
		super.defineOwnProperty(index, { configurable: true, enumerable: true, writable: true, value: undefined }, true);
		this.parameterMap[index] = binding;
	}

	getProperty (name) {
		var ownProperty = this.getOwnProperty(name);
		if (ownProperty) {
			return ownProperty;
		}
	
		return super.getProperty.apply(this, arguments);
	}

	getOwnProperty (name) {
		name = String(name);

		if (name in this.parameterMap) {
			var mappedProperty = this.properties[name];
			var linkedProperty = this.parameterMap[name];

			mappedProperty.value = linkedProperty.getValue();
			mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
			return mappedProperty;
		}

		return super.getOwnProperty.apply(this, arguments);
	}

	defineOwnProperty (name, descriptor, throwOnError) {
		name = String(name);

		var allowed = super.defineOwnProperty.apply(this, arguments);
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

	deleteProperty (name, throwOnError) {
		name = String(name);
		if (name in this.parameterMap) {
			delete this.parameterMap[name];
		}

		return super.deleteProperty.apply(this, arguments);
	}
}
