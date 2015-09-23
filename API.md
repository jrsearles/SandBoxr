## <a name="Environment"><a/>Environment
The executing environment.

Create an environment manually using

```js
SandBoxr.createEnvironment();
```

**createVariable** (name `String`) *returns [Reference](#Reference)*
> Declares a variable within the current scope. Returns a Reference to the new variable.

**createScope** (thisArg [`ObjectType`](#ObjectType)) *returns [Scope](#Scope)*
> Creates a new lexical scope. This is used when a function is executed. Returns a Scope object.

**createObjectScope** (object [`ObjectType`](#ObjectType), thisArg [`ObjectType`](#ObjectType)) *returns [Scope](#Scope)*
> Creates a new scope based on the provided object. This is used for the `with` statement, as well as the global scope.

**isStrict** () *returns Boolean*
> Indicates whether the current lexical scope is in strict mode.

## <a name="Scope"><a/>Scope

#### Methods
**init** (node `FunctionBody`)
> Initializes the scope by validating the function body and hoisting variables.

**loadArgs** (params `Array<Parameter>`, args `Array<ObjectType>`, callee [`FunctionType`](#FunctionType))
> Loads the arguments into the scope and creates the special `arguments` object.

**use*** (func `Function`) - *returns Iterator*
> Runs the passed in function and exits the scope when the function completes, returning the environment back to the previos state.

**exit** ()
> Exits the scope, returning the environment to it's previous state. (Typically you would call `use` which handles exiting the scope itself.)


## <a name="Reference"><a/>Reference

#### Properties
**name** (`String`) - The name of the reference.

**base** ([`ObjectType`](#ObjectType)) - The object that owns the references variable/property.


#### Methods
**getValue** () *returns [ObjectType](#ObjectType)*
> Returns the value of the reference. If the reference is unresolved, a ReferenceError will be thrown.

**setValue** (value [`ObjectType`](#ObjectType)) - *returns [PropertyDescriptor](#PropertyDescriptor)*
> Sets the value of the underlying property or value.

**isUnresolved** () - *returns Boolean*
> Indicates whether the reference is resolved or not.


## ObjectFactory
Class which creates objects for use within a Sandbox. (Accessible via `env.objectFactory`.)

**create** (objectType `String`, nativeValue `any`-*optional*)
> Creates an object based on the type specified. For a primitive type the second parameter is used as the objects underlying value.

**createPrimitive** (nativeValue `any`)
> Creates a primitive object based on the provided native value.

**createObject** (prototype [`ObjectType`](#ObjectType)-*optional*)
> Creates an object. If a prototype object is provided it will be used as the prototype for the newly created object. If `null` is passed in as the prototype no prototype will be assigned (equivalent to calling `Object.create(null)`). Otherwise the `Object` prototype will be used.

**createArray** (elements `Array<ObjectType>`-*optional*)
> Creates an array. An optional array of objects can be passed in which will be added as elements of the newly created array.

**createFunction** (funcOrNode `Function|Object`, prototype [`ObjectType`](#ObjectType)-*optional*, prototypePropertyDescriptor `Object`-*optional*, strictMode `Boolean`-*optional*)
> Creates a function. Either a function or an abstract syntax tree can be passed in.

**createBuiltInFunction** (func `Function`, argLength `Number`, name `String`)
> Creates a function that has no prototype and cannot be called with the `new` keyword. Primarily used for built in methods or instance methods using the ES6 `Class` syntax.

**createClass** (funcOrNode `Function|Object`, prototype [`ObjectType`](#ObjectType))
> Used for class declaration, creates a function that must be called with the `new` keyword.


## <a name="ObjectType"></a>ObjectType

**getPrototype** () *returns [ObjectType](#ObjectType)
> Gets the prototype object for the object.

**setPrototype** (prototype [`ObjectType`](#ObjectType))
> Sets the prototype for the object.

**getProperty** (name `String`) *returns [PropertyDescriptor](#PropertyDescriptor)
> Returns the property if found, looking up the prototype chain until a match is found. Returns `undefined` if no matching property is found.

**getOwnProperty** (name `String`) *returns [PropertyDescriptor](#PropertyDescriptor)
> Returns the property if found, only looking at the objects own property.

**getOwnPropertyNames** () *returns Array&lt;String&gt;*
> Returns the objects own property names.

**hasProperty** (name `String`) *returns Boolean*
> Indicates whether the property exists within the prototype chain for the object.

**hasOwnProperty** (name `String`) *returns Boolean*
> Indicates whether the property exists directly on the object.

**putValue** (name `String`, value [`ObjectType`](#ObjectType), throwOnError `Boolean`, env [`Environment`](#Environment)
> Assigns the value to the specified property on the object.

**defineOwnProperty** (name `String`, descriptor `Object`, throwOnError `Boolean`, env [`Environment`](#Environment) *returns Boolean*
> Defines a property on the object.

**deleteProperty** (name `String`, throwOnError `Boolean`) *returns Boolean*
> Deletes a property
**define** (name `String`, value `ObjectType`, descriptor `Object`)

**remove** (name `String`)

**getValue** (name `String`-*optional*) *return [ObjectType](#ObjectType)*

**freeze** ()

**preventExtensions** ()

**seal** ()

**toNative** () *returns any*