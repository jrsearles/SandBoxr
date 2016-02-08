export default function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    return factory.createPrimitive(String(this.object.source));
  }, 0, "RegExp.prototype.toString"));
}
