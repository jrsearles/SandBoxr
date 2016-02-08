export default function (globalObject, env, factory) {
  let errorClass = globalObject.getValue("Error");
  let proto = errorClass.getValue("prototype");
  proto.className = "Object";
}
