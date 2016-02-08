import $parse from "./json.parse";
import $stringify from "./json.stringify";

export default function jsonApi (env) {
  const {global: globalObject, objectFactory} = env;

  let jsonClass = objectFactory.createObject();
  jsonClass.className = "JSON";

  $parse(jsonClass, env, objectFactory);
  $stringify(jsonClass, env, objectFactory);

  globalObject.define("JSON", jsonClass);
}
