import {confirmObject} from "./object-helpers";
import {getMethod} from "../../utils/helpers";

export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function () {
		let className = this.object ? this.object.className : "Undefined";
		return factory.createPrimitive(`[object ${className}]`);
  }, 0, "Object.prototype.toString"));
  
	$target.define("toLocaleString", factory.createBuiltInFunction(function* () {
    confirmObject(this.object, "toLocaleString", env.options.ecmaVersion);
    let toStringMethod = getMethod(this.object, "toString");
    return yield toStringMethod.call(this.object);
  }, 0, "Object.prototype.toLocaleString"));
}
