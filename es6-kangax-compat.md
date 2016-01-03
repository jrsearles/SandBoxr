ECMA 6 Kangax Compatibility Results

## default function parameters
[X]  basic functionality
[X]  explicit undefined defers to the default
[X]  defaults can refer to previous params
[X]  arguments object interaction
[X]  temporal dead zone
[X]  separate scope
[X]  new Function() support
## rest parameters
[X]  basic functionality
[X]  function 'length' property
[X]  arguments object interaction
[X]  can't be used in setters
[X]  new Function() support
## spread (...) operator
[X]  with arrays, in function calls
[X]  with arrays, in array literals
[X]  with sparse arrays, in function calls
[X]  with sparse arrays, in array literals
[X]  with strings, in function calls
[X]  with strings, in array literals
[ ]  with astral plane strings, in function calls
[ ]  with astral plane strings, in array literals
[ ]  with generator instances, in calls
[ ]  with generator instances, in arrays
[X]  with generic iterables, in calls
[X]  with generic iterables, in arrays
[X]  with instances of iterables, in calls
[X]  with instances of iterables, in arrays
[X]  spreading non-iterables is a runtime error
## object literal extensions
[X]  computed properties
[X]  shorthand properties
[X]  shorthand methods
[X]  string-keyed shorthand methods
[X]  computed shorthand methods
[X]  computed accessors
## for..of loops
[X]  with arrays
[X]  with sparse arrays
[X]  with strings
[ ]  with astral plane strings
[ ]  with generator instances
[X]  with generic iterables
[X]  with instances of generic iterables
[X]  iterator closing, break
[X]  iterator closing, throw
## octal and binary literals
[X]  octal literals
[X]  binary literals
[X]  octal supported by Number()
[X]  binary supported by Number()
## template strings
[ ]  basic functionality
[X]  toString conversion
[X]  tagged template strings
[X]  passed array is frozen
[X]  line break normalisation
## RegExp "y" and "u" flags
[ ]  "y" flag
[ ]  "y" flag, lastIndex
[ ]  "u" flag
[ ]  "u" flag, Unicode code point escapes
## destructuring, declarations
[X]  with arrays
[X]  with sparse arrays
[X]  with strings
[ ]  with astral plane strings
[ ]  with generator instances
[X]  with generic iterables
[X]  with instances of generic iterables
[X]  iterator closing
[X]  trailing commas in iterable patterns
[X]  with objects
[X]  object destructuring with primitives
[X]  trailing commas in object patterns
[X]  throws on null and undefined
[X]  computed properties
[X]  multiples in a single var statement
[X]  nested
[X]  in for-in loop heads
[X]  in for-of loop heads
[X]  in catch heads
[X]  rest
[X]  defaults
[X]  defaults, let temporal dead zone
## destructuring, assignment
[X]  with arrays
[X]  with sparse arrays
[X]  with strings
[ ]  with astral plane strings
[ ]  with generator instances
[X]  with generic iterables
[X]  with instances of generic iterables
[X]  iterator closing
[X]  iterable destructuring expression
[X]  chained iterable destructuring
[ ]  trailing commas in iterable patterns
[X]  with objects
[X]  object destructuring with primitives
[X]  trailing commas in object patterns
[X]  object destructuring expression
[ ]  parenthesised left-hand-side is a syntax error
[X]  chained object destructuring
[X]  throws on null and undefined
[X]  computed properties
[X]  nested
[X]  rest
[X]  nested rest
[X]  empty patterns
[X]  defaults
## destructuring, parameters
[X]  with arrays
[X]  with sparse arrays
[X]  with strings
[ ]  with astral plane strings
[ ]  with generator instances
[X]  with generic iterables
[X]  with instances of generic iterables
[X]  iterator closing
[X]  trailing commas in iterable patterns
[X]  with objects
[X]  object destructuring with primitives
[X]  trailing commas in object patterns
[X]  throws on null and undefined
[X]  computed properties
[X]  nested
[X]  'arguments' interaction
[X]  new Function() support
[X]  in parameters, function 'length' property
[X]  rest
[X]  empty patterns
[X]  defaults
[X]  defaults, separate scope
[X]  defaults, new Function() support
## Unicode code point escapes
[X]  in strings
[X]  in identifiers
## new.target
[X]  in constructors
[X]  assignment is an early error
## const
[X]  basic support
[X]  is block-scoped
[X]  redefining a const is an error
[X]  temporal dead zone
[X]  basic support (strict mode)
[X]  is block-scoped (strict mode)
[X]  redefining a const (strict mode)
[X]  temporal dead zone (strict mode)
## let
[X]  basic support
[X]  is block-scoped
[X]  for-loop statement scope
[X]  temporal dead zone
[X]  for-loop iteration scope
[X]  basic support (strict mode)
[X]  is block-scoped (strict mode)
[X]  for-loop statement scope (strict mode)
[X]  temporal dead zone (strict mode)
[X]  for-loop iteration scope (strict mode)
[ ]  block-level function declaration
## arrow functions
[X]  0 parameters
[X]  1 parameter, no brackets
[X]  multiple parameters
[X]  lexical "this" binding
[X]  "this" unchanged by call or apply
[X]  can't be bound, can be curried
[X]  lexical "arguments" binding
[X]  no line break between params and <code>=></code>
[X]  correct precedence
[X]  no "prototype" property
[X]  lexical "super" binding in constructors
[X]  lexical "super" binding in methods
[X]  lexical "new.target" binding
## class
[X]  class statement
[X]  is block-scoped
[X]  class expression
[X]  anonymous class
[X]  constructor
[X]  prototype methods
[X]  string-keyed methods
[X]  computed prototype methods
[X]  static methods
[X]  computed static methods
[X]  accessor properties
[X]  computed accessor properties
[X]  static accessor properties
[X]  computed static accessor properties
[ ]  class name is lexically scoped
[X]  computed names, temporal dead zone
[X]  methods aren't enumerable
[ ]  implicit strict mode
[X]  constructor requires new
[ ]  extends
[ ]  extends expressions
[ ]  extends null
[ ]  new.target
## super
[X]  statement in constructors
[X]  expression in constructors
[X]  in methods, property access
[X]  in methods, method calls
[X]  method calls use correct "this" binding
[ ]  constructor calls use correct "new.target" binding
[X]  is statically bound
[X]  super() invokes the correct constructor
## generators
[ ]  basic functionality
[ ]  generator function expressions
[ ]  correct "this" binding
[X]  can't use "this" with new
[ ]  sending
[ ]  %GeneratorPrototype%
[ ]  %GeneratorPrototype%.constructor
[ ]  %GeneratorPrototype%.throw
[ ]  %GeneratorPrototype%.return
[ ]  yield operator precedence
[ ]  yield *, arrays
[ ]  yield *, sparse arrays
[ ]  yield *, strings
[ ]  yield *, astral plane strings
[ ]  yield *, generator instances
[ ]  yield *, generic iterables
[ ]  yield *, instances of iterables
[ ]  yield * on non-iterables is a runtime error
[ ]  yield *, iterator closing
[ ]  yield *, iterator closing via throw()
[ ]  shorthand generator methods
[ ]  string-keyed shorthand generator methods
[ ]  computed shorthand generators
[ ]  shorthand generator methods, classes
[ ]  computed shorthand generators, classes
## typed arrays
[ ]  Int8Array
[ ]  Uint8Array
[ ]  Uint8ClampedArray
[ ]  Int16Array
[ ]  Uint16Array
[ ]  Int32Array
[ ]  Uint32Array
[ ]  Float32Array
[ ]  Float64Array
[ ]  DataView (Int8)
[ ]  DataView (Uint8)
[ ]  DataView (Int16)
[ ]  DataView (Uint16)
[ ]  DataView (Int32)
[ ]  DataView (Uint32)
[ ]  DataView (Float32)
[ ]  DataView (Float64)
[ ]  ArrayBuffer[Symbol.species]
[ ]  constructors require new
[ ]  constructors accept generic iterables
[ ]  correct prototype chains
[ ]  %TypedArray%.from
[ ]  %TypedArray%.of
[ ]  %TypedArray%.prototype.subarray
[ ]  %TypedArray%.prototype.join
[ ]  %TypedArray%.prototype.indexOf
[ ]  %TypedArray%.prototype.lastIndexOf
[ ]  %TypedArray%.prototype.slice
[ ]  %TypedArray%.prototype.every
[ ]  %TypedArray%.prototype.filter
[ ]  %TypedArray%.prototype.forEach
[ ]  %TypedArray%.prototype.map
[ ]  %TypedArray%.prototype.reduce
[ ]  %TypedArray%.prototype.reduceRight
[ ]  %TypedArray%.prototype.reverse
[ ]  %TypedArray%.prototype.some
[ ]  %TypedArray%.prototype.sort
[ ]  %TypedArray%.prototype.copyWithin
[ ]  %TypedArray%.prototype.find
[ ]  %TypedArray%.prototype.findIndex
[ ]  %TypedArray%.prototype.fill
[ ]  %TypedArray%.prototype.keys
[ ]  %TypedArray%.prototype.values
[ ]  %TypedArray%.prototype.entries
[ ]  %TypedArray%.prototype[Symbol.iterator]
[ ]  %TypedArray%[Symbol.species]
## Map
[X]  basic functionality
[X]  constructor arguments
[X]  constructor requires new
[X]  constructor accepts null
[X]  constructor invokes set
[X]  iterator closing
[X]  Map.prototype.set returns this
[X]  -0 key converts to +0
[X]  Map.prototype.size
[X]  Map.prototype.delete
[X]  Map.prototype.clear
[X]  Map.prototype.forEach
[X]  Map.prototype.keys
[X]  Map.prototype.values
[X]  Map.prototype.entries
[X]  Map.prototype[Symbol.iterator]
[X]  Map iterator prototype chain
[X]  Map[Symbol.species]
## Set
[X]  basic functionality
[X]  constructor arguments
[X]  constructor requires new
[X]  constructor accepts null
[X]  constructor invokes add
[X]  iterator closing
[X]  Set.prototype.add returns this
[X]  -0 key converts to +0
[X]  Set.prototype.size
[X]  Set.prototype.delete
[X]  Set.prototype.clear
[X]  Set.prototype.forEach
[X]  Set.prototype.keys
[X]  Set.prototype.values
[X]  Set.prototype.entries
[X]  Set.prototype[Symbol.iterator]
[X]  Set iterator prototype chain
[X]  Set[Symbol.species]
## WeakMap
[ ]  basic functionality
[ ]  constructor arguments
[ ]  constructor requires new
[ ]  constructor accepts null
[ ]  constructor invokes set
[ ]  frozen objects as keys
[ ]  iterator closing
[ ]  WeakMap.prototype.set returns this
[ ]  WeakMap.prototype.delete
[ ]  no WeakMap.prototype.clear method
## WeakSet
[ ]  basic functionality
[ ]  constructor arguments
[ ]  constructor requires new
[ ]  constructor accepts null
[ ]  constructor invokes add
[ ]  iterator closing
[ ]  WeakSet.prototype.add returns this
[ ]  WeakSet.prototype.delete
[ ]  no WeakSet.prototype.clear method
## Proxy
[X]  constructor requires new
[X]  "get" handler
[X]  "get" handler, instances of proxies
[X]  "set" handler
[ ]  "set" handler, instances of proxies
[X]  "has" handler
[X]  "has" handler, instances of proxies
[X]  "deleteProperty" handler
[X]  "getOwnPropertyDescriptor" handler
[X]  "defineProperty" handler
[X]  "getPrototypeOf" handler
[X]  "setPrototypeOf" handler
[X]  "isExtensible" handler
[X]  "preventExtensions" handler
[X]  "enumerate" handler
[X]  "ownKeys" handler
[X]  "apply" handler
[X]  "construct" handler
[X]  Proxy.revocable
[X]  Array.isArray support
[X]  JSON.stringify support
## Reflect
[X]  Reflect.get
[X]  Reflect.set
[X]  Reflect.has
[X]  Reflect.deleteProperty
[X]  Reflect.getOwnPropertyDescriptor
[X]  Reflect.defineProperty
[X]  Reflect.getPrototypeOf
[X]  Reflect.setPrototypeOf
[X]  Reflect.isExtensible
[X]  Reflect.preventExtensions
[X]  Reflect.enumerate
[X]  Reflect.ownKeys, string keys
[X]  Reflect.ownKeys, symbol keys
[X]  Reflect.apply
[X]  Reflect.construct
[X]  Reflect.construct sets new.target meta property
[X]  Reflect.construct creates instance from newTarget argument
## Promise
[ ]  basic functionality
[ ]  constructor requires new
[ ]  Promise.all
[ ]  Promise.all, generic iterables
[ ]  Promise.race
[ ]  Promise.race, generic iterables
[ ]  Promise[Symbol.species]
## Symbol
[X]  basic functionality
[X]  typeof support
[X]  symbol keys are hidden to pre-ES6 code
[X]  Object.defineProperty support
[ ]  cannot coerce to string or number
[X]  can convert with String()
[X]  new Symbol() throws
[ ]  Object(symbol)
[X]  JSON.stringify ignores symbols
[X]  global symbol registry
## well-known symbols
[ ]  Symbol.hasInstance
[X]  Symbol.isConcatSpreadable
[X]  Symbol.iterator, existence
[ ]  Symbol.iterator, arguments object
[X]  Symbol.species, existence
[X]  Symbol.species, Array.prototype.concat
[X]  Symbol.species, Array.prototype.filter
[X]  Symbol.species, Array.prototype.map
[X]  Symbol.species, Array.prototype.slice
[X]  Symbol.species, Array.prototype.splice
[ ]  Symbol.species, RegExp.prototype[Symbol.split]
[X]  Symbol.replace
[X]  Symbol.search
[X]  Symbol.split
[X]  Symbol.match
[ ]  Symbol.match, RegExp constructor
[X]  Symbol.match, String.prototype.startsWith
[X]  Symbol.match, String.prototype.endsWith
[X]  Symbol.match, String.prototype.includes
[X]  Symbol.toPrimitive
[X]  Symbol.toStringTag
[X]  Symbol.toStringTag, misc. built-ins
[ ]  Symbol.unscopables
## Object static methods
[X]  Object.assign
[X]  Object.is
[X]  Object.getOwnPropertySymbols
[X]  Object.setPrototypeOf
## function "name" property
[X]  function statements
[X]  function expressions
[X]  new Function
[X]  bound functions
[X]  variables (function)
[X]  object methods (function)
[X]  accessor properties
[X]  shorthand methods
[X]  shorthand methods (no lexical binding)
[X]  symbol-keyed methods
[X]  class statements
[X]  class expressions
[X]  variables (class)
[X]  object methods (class)
[X]  class prototype methods
[X]  class static methods
[X]  isn't writable, is configurable
## String static methods
[X]  String.raw
[X]  String.fromCodePoint
## String.prototype methods
[X]  String.prototype.codePointAt
[X]  String.prototype.normalize
[X]  String.prototype.repeat
[X]  String.prototype.startsWith
[X]  String.prototype.endsWith
[X]  String.prototype.includes
[X]  String.prototype[Symbol.iterator]
[X]  String iterator prototype chain
## RegExp.prototype properties
[ ]  RegExp.prototype.flags
[X]  RegExp.prototype[Symbol.match]
[X]  RegExp.prototype[Symbol.replace]
[X]  RegExp.prototype[Symbol.split]
[X]  RegExp.prototype[Symbol.search]
[X]  RegExp[Symbol.species]
## Array static methods
[X]  Array.from, array-like objects
[ ]  Array.from, generator instances
[X]  Array.from, generic iterables
[X]  Array.from, instances of generic iterables
[X]  Array.from map function, array-like objects
[ ]  Array.from map function, generator instances
[X]  Array.from map function, generic iterables
[X]  Array.from map function, instances of iterables
[X]  Array.from, iterator closing
[X]  Array.of
[X]  Array[Symbol.species]
## Array.prototype methods
[X]  Array.prototype.copyWithin
[X]  Array.prototype.find
[X]  Array.prototype.findIndex
[X]  Array.prototype.fill
[X]  Array.prototype.keys
[X]  Array.prototype.values
[X]  Array.prototype.entries
[X]  Array.prototype[Symbol.iterator]
[X]  Array iterator prototype chain
[ ]  Array.prototype[Symbol.unscopables]
## Number properties
[X]  Number.isFinite
[X]  Number.isInteger
[X]  Number.isSafeInteger
[X]  Number.isNaN
[X]  Number.EPSILON
[X]  Number.MIN_SAFE_INTEGER
[X]  Number.MAX_SAFE_INTEGER
## Math methods
[X]  Math.clz32
[X]  Math.imul
[X]  Math.sign
[X]  Math.log10
[X]  Math.log2
[X]  Math.log1p
[X]  Math.expm1
[X]  Math.cosh
[X]  Math.sinh
[X]  Math.tanh
[X]  Math.acosh
[X]  Math.asinh
[X]  Math.atanh
[X]  Math.trunc
[X]  Math.fround
[X]  Math.cbrt
[X]  Math.hypot
## Array is subclassable
[ ]  length property (accessing)
[ ]  length property (setting)
[ ]  correct prototype chain
[ ]  Array.isArray support
[ ]  Array.prototype.concat
[ ]  Array.prototype.filter
[ ]  Array.prototype.map
[ ]  Array.prototype.slice
[ ]  Array.prototype.splice
[ ]  Array.from
[ ]  Array.of
## RegExp is subclassable
[ ]  basic functionality
[ ]  correct prototype chain
[ ]  RegExp.prototype.exec
[ ]  RegExp.prototype.test
## Function is subclassable
[ ]  can be called
[ ]  correct prototype chain
[ ]  can be used with "new"
[ ]  Function.prototype.call
[ ]  Function.prototype.apply
[ ]  Function.prototype.bind
## Promise is subclassable
[ ]  basic functionality
[ ]  correct prototype chain
[ ]  Promise.all
[ ]  Promise.race
## miscellaneous subclassables
[ ]  Boolean is subclassable
[ ]  Number is subclassable
[ ]  String is subclassable
[ ]  Map is subclassable
[ ]  Set is subclassable
## prototype of bound functions
[X]  basic functions
[X]  generator functions
[X]  arrow functions
[X]  classes
[ ]  subclasses
## Proxy, internal 'get' calls
[ ]  ToPrimitive
[ ]  CreateListFromArrayLike
[ ]  instanceof operator
[ ]  HasBinding
[ ]  CreateDynamicFunction
[ ]  ClassDefinitionEvaluation
[X]  IteratorComplete, IteratorValue
[ ]  ToPropertyDescriptor
[X]  Object.assign
[ ]  Object.defineProperties
[X]  Function.prototype.bind
[X]  Error.prototype.toString
[X]  String.raw
[ ]  RegExp constructor
[ ]  RegExp.prototype.flags
[ ]  RegExp.prototype.test
[ ]  RegExp.prototype[Symbol.match]
[ ]  RegExp.prototype[Symbol.replace]
[ ]  RegExp.prototype[Symbol.search]
[ ]  RegExp.prototype[Symbol.split]
[X]  Array.from
[ ]  Array.prototype.concat
[X]  Array.prototype iteration methods
[X]  Array.prototype.pop
[X]  Array.prototype.reverse
[X]  Array.prototype.shift
[X]  Array.prototype.splice
[X]  Array.prototype.toString
[X]  JSON.stringify
[ ]  Promise resolve functions
[ ]  String.prototype.match
[ ]  String.prototype.replace
[ ]  String.prototype.search
[ ]  String.prototype.split
[ ]  Date.prototype.toJSON
## Proxy, internal 'set' calls
[X]  Object.assign
[X]  Array.from
[X]  Array.of
[X]  Array.prototype.copyWithin
[X]  Array.prototype.fill
[X]  Array.prototype.pop
[X]  Array.prototype.push
[X]  Array.prototype.reverse
[X]  Array.prototype.shift
[X]  Array.prototype.splice
[X]  Array.prototype.unshift
## Proxy, internal 'defineProperty' calls
[ ]  [[Set]]
[X]  SetIntegrityLevel
## Proxy, internal 'deleteProperty' calls
[X]  Array.prototype.copyWithin
[X]  Array.prototype.pop
[X]  Array.prototype.reverse
[X]  Array.prototype.shift
[X]  Array.prototype.splice
[X]  Array.prototype.unshift
## Proxy, internal 'getOwnPropertyDescriptor' calls
[ ]  [[Set]]
[X]  Object.assign
[X]  Object.prototype.hasOwnProperty
[X]  Function.prototype.bind
## Proxy, internal 'ownKeys' calls
[X]  SetIntegrityLevel
[X]  TestIntegrityLevel
[X]  SerializeJSONObject
## Object static methods accept primitives
[X]  Object.getPrototypeOf
[X]  Object.getOwnPropertyDescriptor
[X]  Object.getOwnPropertyNames
[X]  Object.seal
[X]  Object.freeze
[X]  Object.preventExtensions
[X]  Object.isSealed
[X]  Object.isFrozen
[X]  Object.isExtensible
[X]  Object.keys
## own property order
[X]  for..in
[X]  Object.keys
[X]  Object.getOwnPropertyNames
[X]  Object.assign
[X]  JSON.stringify
[X]  JSON.parse
[X]  Reflect.ownKeys, string key order
[X]  Reflect.ownKeys, symbol key order
## miscellaneous
[X]  no escaped reserved words as identifiers
[X]  duplicate property names in strict mode
[X]  no semicolon needed after do-while
[ ]  no assignments allowed in for-in head
[ ]  accessors aren't constructors
[X]  Invalid Date
[ ]  RegExp constructor can alter flags
[ ]  built-in prototypes are not instances
[X]  function 'length' is configurable
[ ]  String.prototype case methods, Unicode support
## non-strict function semantics
[ ]  hoisted block-level function declaration
[X]  labeled function statements
[ ]  function statements in if-statement clauses
## __proto__ in object literals
[ ]  basic support
[X]  multiple __proto__ is an error
[ ]  not a computed property
[ ]  not a shorthand property
[ ]  not a shorthand method
## Object.prototype.__proto__
[ ]  get prototype
[ ]  set prototype
[ ]  absent from Object.create(null)
[ ]  present in hasOwnProperty()
[ ]  correct property descriptor
[ ]  present in Object.getOwnPropertyNames()
## String.prototype HTML methods
[ ]  existence
[ ]  tags' names are lowercase
[ ]  quotes in arguments are escaped
[X]  RegExp.prototype.compile
## RegExp syntax extensions
[X]  hyphens in character sets
[X]  invalid character escapes
[X]  invalid control-character escapes
[X]  invalid Unicode escapes
[X]  invalid hexadecimal escapes
[X]  incomplete patterns and quantifiers
[X]  octal escape sequences
[X]  invalid backreferences become octal escapes
[X]  HTML-style comments
