## ObjectFactory
Class which creates objects and primitives. (Accessible via `env.objectFactory`.)

**create** (type `[String]`, primitiveValue [`any`-*optional*])  Creates a type based on the type provided. For a primitive type the raw value

**createPrimitive** (primitiveValue [`any`])  Creates a primitive object based on the provided native value.

**createObject** (prototype [`Object`-*optional*])  Creates an object. If a prototype object is provided it will be used as the prototype for the newly created object. If `null` is passed in as the prototype no prototype will be assigned (equivalent to calling `Object.create(null)`). Otherwise the `Object` prototype will be used.

**createArray** (elements [`Array<any>`-*optional*])  Creates an array. An optional array of objects can be passed in which will be added as elements of the newly created array.

**createFunction** (funcOrNode [`Function|Object`], prototype [`Object`-*optional*], prototypePropertyDescriptor [`Object`-*optional*], strictMode [`Boolean`-*optional*])  Creates a function. Either a function or an abstract syntax tree can be passed in.

**createBuiltInFunction** (func [`Function`], argLength [`Number`], name [`String`])  Creates a function that has no prototype and cannot be called with the `new` keyword.

**createClass** (funcOrNode [`Function|Object`], prototype [`Object`])  Used for class declaration, creates a function that must be called with the `new` keyword.