import * as contracts from "../utils/contracts";

export class Reference {
	constructor (name, base, env) {
		this.isReference = true;
		this.unqualified = false;

		this.name = name;
		this.base = base;
		this.env = env;
		this.strict = env.isStrict();
	}

	/**
	 * Returns the value of the reference. If the reference is unresolved,
	 * a ReferenceError will be thrown.
	 * @returns {ObjectType} The value.
	 */
	getValue () {
		if (!this.base) {
			throw new ReferenceError(`${this.name} is not defined`);
		}

		return this.base.getValue(this.name, this.strict);
	}

	/**
	 * Sets the value of the underlying property or value.
	 * @param {ObjectType} value - The value to assign.
	 * @returns {Boolean} The result of the value assignment.
	 */
	setValue (value) {
		if (this.base) {
			return this.base.putValue(this.name, value, this.strict);
		}

		contracts.assertIsValidIdentifier(this.name, this.strict);
		if (this.strict) {
			throw new ReferenceError(`${this.name} is not defined`);
		}

		return this.env.global.defineOwnProperty(this.name, {
			value: value,
			configurable: true,
			enumerable: true,
			writable: true
		},
		false,
		this.env);
	}

	/**
	 * Deletes the underlying reference.
	 * @returns {Boolean} The result of the delete operation.
	 */
	["delete"] () {
		if (this.base) {
			return this.base.deleteVariable(this.name);
		}

		return true;
	}

	/**
	 * Indicates whether the reference is resolved or not.
	 * @returns {Boolean} true if resolves; false otherwise.
	 */
	isUnresolved () {
		return !this.base;
	}
}
