ECMA 6 Kangax Compatibility Results


## default function parameters
- [x]  basic functionality
- [x]  explicit undefined defers to the default
- [x]  defaults can refer to previous params
- [x]  arguments object interaction
- [x]  temporal dead zone
- [x]  separate scope
- [x]  new Function() support

## rest parameters
- [x]  basic functionality
- [x]  function 'length' property
- [x]  arguments object interaction
- [x]  can't be used in setters
- [x]  new Function() support

## spread (...) operator
- [x]  with arrays, in function calls
- [x]  with arrays, in array literals
- [x]  with sparse arrays, in function calls
- [x]  with sparse arrays, in array literals
- [x]  with strings, in function calls
- [x]  with strings, in array literals
- [ ]  with astral plane strings, in function calls
- [ ]  with astral plane strings, in array literals
- [ ]  with generator instances, in calls
- [ ]  with generator instances, in arrays
- [x]  with generic iterables, in calls
- [x]  with generic iterables, in arrays
- [x]  with instances of iterables, in calls
- [x]  with instances of iterables, in arrays
- [x]  spreading non-iterables is a runtime error

## object literal extensions
- [x]  computed properties
- [x]  shorthand properties
- [x]  shorthand methods
- [x]  string-keyed shorthand methods
- [x]  computed shorthand methods
- [x]  computed accessors

## for..of loops
- [x]  with arrays
- [x]  with sparse arrays
- [x]  with strings
- [ ]  with astral plane strings
- [ ]  with generator instances
- [x]  with generic iterables
- [x]  with instances of generic iterables
- [x]  iterator closing, break
- [x]  iterator closing, throw

## octal and binary literals
- [x]  octal literals
- [x]  binary literals
- [x]  octal supported by Number()
- [x]  binary supported by Number()

## template strings
- [ ]  basic functionality
- [x]  toString conversion
- [x]  tagged template strings
- [x]  passed array is frozen
- [x]  line break normalisation

## RegExp "y" and "u" flags
- [ ]  "y" flag
- [ ]  "y" flag, lastIndex
- [ ]  "u" flag
- [ ]  "u" flag, Unicode code point escapes

## destructuring, declarations
- [x]  with arrays
- [x]  with sparse arrays
- [x]  with strings
- [ ]  with astral plane strings
- [ ]  with generator instances
- [x]  with generic iterables
- [x]  with instances of generic iterables
- [x]  iterator closing
- [x]  trailing commas in iterable patterns
- [x]  with objects
- [x]  object destructuring with primitives
- [x]  trailing commas in object patterns
- [x]  throws on null and undefined
- [x]  computed properties
- [x]  multiples in a single var statement
- [x]  nested
- [x]  in for-in loop heads
- [x]  in for-of loop heads
- [x]  in catch heads
- [x]  rest
- [x]  defaults
- [x]  defaults, let temporal dead zone

## destructuring, assignment
- [x]  with arrays
- [x]  with sparse arrays
- [x]  with strings
- [ ]  with astral plane strings
- [ ]  with generator instances
- [x]  with generic iterables
- [x]  with instances of generic iterables
- [x]  iterator closing
- [x]  iterable destructuring expression
- [x]  chained iterable destructuring
- [ ]  trailing commas in iterable patterns
- [x]  with objects
- [x]  object destructuring with primitives
- [x]  trailing commas in object patterns
- [x]  object destructuring expression
- [ ]  parenthesised left-hand-side is a syntax error
- [x]  chained object destructuring
- [x]  throws on null and undefined
- [x]  computed properties
- [x]  nested
- [x]  rest
- [x]  nested rest
- [x]  empty patterns
- [x]  defaults

## destructuring, parameters
- [x]  with arrays
- [x]  with sparse arrays
- [x]  with strings
- [ ]  with astral plane strings
- [ ]  with generator instances
- [x]  with generic iterables
- [x]  with instances of generic iterables
- [x]  iterator closing
- [x]  trailing commas in iterable patterns
- [x]  with objects
- [x]  object destructuring with primitives
- [x]  trailing commas in object patterns
- [x]  throws on null and undefined
- [x]  computed properties
- [x]  nested
- [x]  'arguments' interaction
- [x]  new Function() support
- [x]  in parameters, function 'length' property
- [x]  rest
- [x]  empty patterns
- [x]  defaults
- [x]  defaults, separate scope
- [x]  defaults, new Function() support

## Unicode code point escapes
- [x]  in strings
- [x]  in identifiers

## new.target
- [x]  in constructors
- [x]  assignment is an early error

## const
- [x]  basic support
- [x]  is block-scoped
- [x]  redefining a const is an error
- [x]  temporal dead zone
- [x]  basic support (strict mode)
- [x]  is block-scoped (strict mode)
- [x]  redefining a const (strict mode)
- [x]  temporal dead zone (strict mode)

## let
- [x]  basic support
- [x]  is block-scoped
- [x]  for-loop statement scope
- [x]  temporal dead zone
- [x]  for-loop iteration scope
- [x]  basic support (strict mode)
- [x]  is block-scoped (strict mode)
- [x]  for-loop statement scope (strict mode)
- [x]  temporal dead zone (strict mode)
- [x]  for-loop iteration scope (strict mode)
- [ ]  block-level function declaration

## arrow functions
- [x]  0 parameters
- [x]  1 parameter, no brackets
- [x]  multiple parameters
- [x]  lexical "this" binding
- [x]  "this" unchanged by call or apply
- [x]  can't be bound, can be curried
- [x]  lexical "arguments" binding
- [x]  no line break between params and <code>=></code>
- [x]  correct precedence
- [x]  no "prototype" property
- [x]  lexical "super" binding in constructors
- [x]  lexical "super" binding in methods
- [x]  lexical "new.target" binding

## class
- [x]  class statement
- [x]  is block-scoped
- [x]  class expression
- [x]  anonymous class
- [x]  constructor
- [x]  prototype methods
- [x]  string-keyed methods
- [x]  computed prototype methods
- [x]  static methods
- [x]  computed static methods
- [x]  accessor properties
- [x]  computed accessor properties
- [x]  static accessor properties
- [x]  computed static accessor properties
- [ ]  class name is lexically scoped
- [x]  computed names, temporal dead zone
- [x]  methods aren't enumerable
- [ ]  implicit strict mode
- [x]  constructor requires new
- [ ]  extends
- [ ]  extends expressions
- [ ]  extends null
- [ ]  new.target

## super
- [x]  statement in constructors
- [x]  expression in constructors
- [x]  in methods, property access
- [x]  in methods, method calls
- [x]  method calls use correct "this" binding
- [ ]  constructor calls use correct "new.target" binding
- [x]  is statically bound
- [x]  super() invokes the correct constructor

## generators
- [ ]  basic functionality
- [ ]  generator function expressions
- [ ]  correct "this" binding
- [x]  can't use "this" with new
- [ ]  sending
- [ ]  %GeneratorPrototype%
- [ ]  %GeneratorPrototype%.constructor
- [ ]  %GeneratorPrototype%.throw
- [ ]  %GeneratorPrototype%.return
- [ ]  yield operator precedence
- [ ]  yield *, arrays
- [ ]  yield *, sparse arrays
- [ ]  yield *, strings
- [ ]  yield *, astral plane strings
- [ ]  yield *, generator instances
- [ ]  yield *, generic iterables
- [ ]  yield *, instances of iterables
- [ ]  yield * on non-iterables is a runtime error
- [ ]  yield *, iterator closing
- [ ]  yield *, iterator closing via throw()
- [ ]  shorthand generator methods
- [ ]  string-keyed shorthand generator methods
- [ ]  computed shorthand generators
- [ ]  shorthand generator methods, classes
- [ ]  computed shorthand generators, classes

## typed arrays
- [ ]  Int8Array
- [ ]  Uint8Array
- [ ]  Uint8ClampedArray
- [ ]  Int16Array
- [ ]  Uint16Array
- [ ]  Int32Array
- [ ]  Uint32Array
- [ ]  Float32Array
- [ ]  Float64Array
- [ ]  DataView (Int8)
- [ ]  DataView (Uint8)
- [ ]  DataView (Int16)
- [ ]  DataView (Uint16)
- [ ]  DataView (Int32)
- [ ]  DataView (Uint32)
- [ ]  DataView (Float32)
- [ ]  DataView (Float64)
- [ ]  ArrayBuffer[Symbol.species]
- [ ]  constructors require new
- [ ]  constructors accept generic iterables
- [ ]  correct prototype chains
- [ ]  %TypedArray%.from
- [ ]  %TypedArray%.of
- [ ]  %TypedArray%.prototype.subarray
- [ ]  %TypedArray%.prototype.join
- [ ]  %TypedArray%.prototype.indexOf
- [ ]  %TypedArray%.prototype.lastIndexOf
- [ ]  %TypedArray%.prototype.slice
- [ ]  %TypedArray%.prototype.every
- [ ]  %TypedArray%.prototype.filter
- [ ]  %TypedArray%.prototype.forEach
- [ ]  %TypedArray%.prototype.map
- [ ]  %TypedArray%.prototype.reduce
- [ ]  %TypedArray%.prototype.reduceRight
- [ ]  %TypedArray%.prototype.reverse
- [ ]  %TypedArray%.prototype.some
- [ ]  %TypedArray%.prototype.sort
- [ ]  %TypedArray%.prototype.copyWithin
- [ ]  %TypedArray%.prototype.find
- [ ]  %TypedArray%.prototype.findIndex
- [ ]  %TypedArray%.prototype.fill
- [ ]  %TypedArray%.prototype.keys
- [ ]  %TypedArray%.prototype.values
- [ ]  %TypedArray%.prototype.entries
- [ ]  %TypedArray%.prototype[Symbol.iterator]
- [ ]  %TypedArray%[Symbol.species]

## Map
- [x]  basic functionality
- [x]  constructor arguments
- [x]  constructor requires new
- [x]  constructor accepts null
- [x]  constructor invokes set
- [x]  iterator closing
- [x]  Map.prototype.set returns this
- [x]  -0 key converts to +0
- [x]  Map.prototype.size
- [x]  Map.prototype.delete
- [x]  Map.prototype.clear
- [x]  Map.prototype.forEach
- [x]  Map.prototype.keys
- [x]  Map.prototype.values
- [x]  Map.prototype.entries
- [x]  Map.prototype[Symbol.iterator]
- [x]  Map iterator prototype chain
- [x]  Map[Symbol.species]

## Set
- [x]  basic functionality
- [x]  constructor arguments
- [x]  constructor requires new
- [x]  constructor accepts null
- [x]  constructor invokes add
- [x]  iterator closing
- [x]  Set.prototype.add returns this
- [x]  -0 key converts to +0
- [x]  Set.prototype.size
- [x]  Set.prototype.delete
- [x]  Set.prototype.clear
- [x]  Set.prototype.forEach
- [x]  Set.prototype.keys
- [x]  Set.prototype.values
- [x]  Set.prototype.entries
- [x]  Set.prototype[Symbol.iterator]
- [x]  Set iterator prototype chain
- [x]  Set[Symbol.species]

## WeakMap
- [ ]  basic functionality
- [ ]  constructor arguments
- [ ]  constructor requires new
- [ ]  constructor accepts null
- [ ]  constructor invokes set
- [ ]  frozen objects as keys
- [ ]  iterator closing
- [ ]  WeakMap.prototype.set returns this
- [ ]  WeakMap.prototype.delete
- [ ]  no WeakMap.prototype.clear method

## WeakSet
- [ ]  basic functionality
- [ ]  constructor arguments
- [ ]  constructor requires new
- [ ]  constructor accepts null
- [ ]  constructor invokes add
- [ ]  iterator closing
- [ ]  WeakSet.prototype.add returns this
- [ ]  WeakSet.prototype.delete
- [ ]  no WeakSet.prototype.clear method

## Proxy
- [x]  constructor requires new
- [x]  "get" handler
- [x]  "get" handler, instances of proxies
- [x]  "set" handler
- [ ]  "set" handler, instances of proxies
- [x]  "has" handler
- [x]  "has" handler, instances of proxies
- [x]  "deleteProperty" handler
- [x]  "getOwnPropertyDescriptor" handler
- [x]  "defineProperty" handler
- [x]  "getPrototypeOf" handler
- [x]  "setPrototypeOf" handler
- [x]  "isExtensible" handler
- [x]  "preventExtensions" handler
- [x]  "enumerate" handler
- [x]  "ownKeys" handler
- [x]  "apply" handler
- [x]  "construct" handler
- [x]  Proxy.revocable
- [x]  Array.isArray support
- [x]  JSON.stringify support

## Reflect
- [x]  Reflect.get
- [x]  Reflect.set
- [x]  Reflect.has
- [x]  Reflect.deleteProperty
- [x]  Reflect.getOwnPropertyDescriptor
- [x]  Reflect.defineProperty
- [x]  Reflect.getPrototypeOf
- [x]  Reflect.setPrototypeOf
- [x]  Reflect.isExtensible
- [x]  Reflect.preventExtensions
- [x]  Reflect.enumerate
- [x]  Reflect.ownKeys, string keys
- [x]  Reflect.ownKeys, symbol keys
- [x]  Reflect.apply
- [x]  Reflect.construct
- [x]  Reflect.construct sets new.target meta property
- [x]  Reflect.construct creates instance from newTarget argument

## Promise
- [ ]  basic functionality
- [ ]  constructor requires new
- [ ]  Promise.all
- [ ]  Promise.all, generic iterables
- [ ]  Promise.race
- [ ]  Promise.race, generic iterables
- [ ]  Promise[Symbol.species]

## Symbol
- [x]  basic functionality
- [x]  typeof support
- [x]  symbol keys are hidden to pre-ES6 code
- [x]  Object.defineProperty support
- [ ]  cannot coerce to string or number
- [x]  can convert with String()
- [x]  new Symbol() throws
- [ ]  Object(symbol)
- [x]  JSON.stringify ignores symbols
- [x]  global symbol registry

## well-known symbols
- [ ]  Symbol.hasInstance
- [x]  Symbol.isConcatSpreadable
- [x]  Symbol.iterator, existence
- [ ]  Symbol.iterator, arguments object
- [x]  Symbol.species, existence
- [x]  Symbol.species, Array.prototype.concat
- [x]  Symbol.species, Array.prototype.filter
- [x]  Symbol.species, Array.prototype.map
- [x]  Symbol.species, Array.prototype.slice
- [x]  Symbol.species, Array.prototype.splice
- [ ]  Symbol.species, RegExp.prototype[Symbol.split]
- [x]  Symbol.replace
- [x]  Symbol.search
- [x]  Symbol.split
- [x]  Symbol.match
- [ ]  Symbol.match, RegExp constructor
- [x]  Symbol.match, String.prototype.startsWith
- [x]  Symbol.match, String.prototype.endsWith
- [x]  Symbol.match, String.prototype.includes
- [x]  Symbol.toPrimitive
- [x]  Symbol.toStringTag
- [x]  Symbol.toStringTag, misc. built-ins
- [ ]  Symbol.unscopables

## Object static methods
- [x]  Object.assign
- [x]  Object.is
- [x]  Object.getOwnPropertySymbols
- [x]  Object.setPrototypeOf

## function "name" property
- [x]  function statements
- [x]  function expressions
- [x]  new Function
- [x]  bound functions
- [x]  variables (function)
- [x]  object methods (function)
- [x]  accessor properties
- [x]  shorthand methods
- [x]  shorthand methods (no lexical binding)
- [x]  symbol-keyed methods
- [x]  class statements
- [x]  class expressions
- [x]  variables (class)
- [x]  object methods (class)
- [x]  class prototype methods
- [x]  class static methods
- [x]  isn't writable, is configurable

## String static methods
- [x]  String.raw
- [x]  String.fromCodePoint

## String.prototype methods
- [x]  String.prototype.codePointAt
- [x]  String.prototype.normalize
- [x]  String.prototype.repeat
- [x]  String.prototype.startsWith
- [x]  String.prototype.endsWith
- [x]  String.prototype.includes
- [x]  String.prototype[Symbol.iterator]
- [x]  String iterator prototype chain

## RegExp.prototype properties
- [ ]  RegExp.prototype.flags
- [x]  RegExp.prototype[Symbol.match]
- [x]  RegExp.prototype[Symbol.replace]
- [x]  RegExp.prototype[Symbol.split]
- [x]  RegExp.prototype[Symbol.search]
- [x]  RegExp[Symbol.species]

## Array static methods
- [x]  Array.from, array-like objects
- [ ]  Array.from, generator instances
- [x]  Array.from, generic iterables
- [x]  Array.from, instances of generic iterables
- [x]  Array.from map function, array-like objects
- [ ]  Array.from map function, generator instances
- [x]  Array.from map function, generic iterables
- [x]  Array.from map function, instances of iterables
- [x]  Array.from, iterator closing
- [x]  Array.of
- [x]  Array[Symbol.species]

## Array.prototype methods
- [x]  Array.prototype.copyWithin
- [x]  Array.prototype.find
- [x]  Array.prototype.findIndex
- [x]  Array.prototype.fill
- [x]  Array.prototype.keys
- [x]  Array.prototype.values
- [x]  Array.prototype.entries
- [x]  Array.prototype[Symbol.iterator]
- [x]  Array iterator prototype chain
- [ ]  Array.prototype[Symbol.unscopables]

## Number properties
- [x]  Number.isFinite
- [x]  Number.isInteger
- [x]  Number.isSafeInteger
- [x]  Number.isNaN
- [x]  Number.EPSILON
- [x]  Number.MIN_SAFE_INTEGER
- [x]  Number.MAX_SAFE_INTEGER

## Math methods
- [x]  Math.clz32
- [x]  Math.imul
- [x]  Math.sign
- [x]  Math.log10
- [x]  Math.log2
- [x]  Math.log1p
- [x]  Math.expm1
- [x]  Math.cosh
- [x]  Math.sinh
- [x]  Math.tanh
- [x]  Math.acosh
- [x]  Math.asinh
- [x]  Math.atanh
- [x]  Math.trunc
- [x]  Math.fround
- [x]  Math.cbrt
- [x]  Math.hypot

## Array is subclassable
- [ ]  length property (accessing)
- [ ]  length property (setting)
- [ ]  correct prototype chain
- [ ]  Array.isArray support
- [ ]  Array.prototype.concat
- [ ]  Array.prototype.filter
- [ ]  Array.prototype.map
- [ ]  Array.prototype.slice
- [ ]  Array.prototype.splice
- [ ]  Array.from
- [ ]  Array.of

## RegExp is subclassable
- [ ]  basic functionality
- [ ]  correct prototype chain
- [ ]  RegExp.prototype.exec
- [ ]  RegExp.prototype.test

## Function is subclassable
- [ ]  can be called
- [ ]  correct prototype chain
- [ ]  can be used with "new"
- [ ]  Function.prototype.call
- [ ]  Function.prototype.apply
- [ ]  Function.prototype.bind

## Promise is subclassable
- [ ]  basic functionality
- [ ]  correct prototype chain
- [ ]  Promise.all
- [ ]  Promise.race

## miscellaneous subclassables
- [ ]  Boolean is subclassable
- [ ]  Number is subclassable
- [ ]  String is subclassable
- [ ]  Map is subclassable
- [ ]  Set is subclassable

## prototype of bound functions
- [x]  basic functions
- [x]  generator functions
- [x]  arrow functions
- [x]  classes
- [ ]  subclasses

## Proxy, internal 'get' calls
- [ ]  ToPrimitive
- [ ]  CreateListFromArrayLike
- [ ]  instanceof operator
- [ ]  HasBinding
- [ ]  CreateDynamicFunction
- [ ]  ClassDefinitionEvaluation
- [x]  IteratorComplete, IteratorValue
- [ ]  ToPropertyDescriptor
- [x]  Object.assign
- [ ]  Object.defineProperties
- [x]  Function.prototype.bind
- [x]  Error.prototype.toString
- [x]  String.raw
- [ ]  RegExp constructor
- [ ]  RegExp.prototype.flags
- [ ]  RegExp.prototype.test
- [ ]  RegExp.prototype[Symbol.match]
- [ ]  RegExp.prototype[Symbol.replace]
- [ ]  RegExp.prototype[Symbol.search]
- [ ]  RegExp.prototype[Symbol.split]
- [x]  Array.from
- [ ]  Array.prototype.concat
- [x]  Array.prototype iteration methods
- [x]  Array.prototype.pop
- [x]  Array.prototype.reverse
- [x]  Array.prototype.shift
- [x]  Array.prototype.splice
- [x]  Array.prototype.toString
- [x]  JSON.stringify
- [ ]  Promise resolve functions
- [ ]  String.prototype.match
- [ ]  String.prototype.replace
- [ ]  String.prototype.search
- [ ]  String.prototype.split
- [ ]  Date.prototype.toJSON

## Proxy, internal 'set' calls
- [x]  Object.assign
- [x]  Array.from
- [x]  Array.of
- [x]  Array.prototype.copyWithin
- [x]  Array.prototype.fill
- [x]  Array.prototype.pop
- [x]  Array.prototype.push
- [x]  Array.prototype.reverse
- [x]  Array.prototype.shift
- [x]  Array.prototype.splice
- [x]  Array.prototype.unshift

## Proxy, internal 'defineProperty' calls
- [ ]  [[Set]]
- [x]  SetIntegrityLevel

## Proxy, internal 'deleteProperty' calls
- [x]  Array.prototype.copyWithin
- [x]  Array.prototype.pop
- [x]  Array.prototype.reverse
- [x]  Array.prototype.shift
- [x]  Array.prototype.splice
- [x]  Array.prototype.unshift

## Proxy, internal 'getOwnPropertyDescriptor' calls
- [ ]  [[Set]]
- [x]  Object.assign
- [x]  Object.prototype.hasOwnProperty
- [x]  Function.prototype.bind

## Proxy, internal 'ownKeys' calls
- [x]  SetIntegrityLevel
- [x]  TestIntegrityLevel
- [x]  SerializeJSONObject

## Object static methods accept primitives
- [x]  Object.getPrototypeOf
- [x]  Object.getOwnPropertyDescriptor
- [x]  Object.getOwnPropertyNames
- [x]  Object.seal
- [x]  Object.freeze
- [x]  Object.preventExtensions
- [x]  Object.isSealed
- [x]  Object.isFrozen
- [x]  Object.isExtensible
- [x]  Object.keys

## own property order
- [x]  for..in
- [x]  Object.keys
- [x]  Object.getOwnPropertyNames
- [x]  Object.assign
- [x]  JSON.stringify
- [x]  JSON.parse
- [x]  Reflect.ownKeys, string key order
- [x]  Reflect.ownKeys, symbol key order

## miscellaneous
- [x]  no escaped reserved words as identifiers
- [x]  duplicate property names in strict mode
- [x]  no semicolon needed after do-while
- [ ]  no assignments allowed in for-in head
- [ ]  accessors aren't constructors
- [x]  Invalid Date
- [ ]  RegExp constructor can alter flags
- [ ]  built-in prototypes are not instances
- [x]  function 'length' is configurable
- [ ]  String.prototype case methods, Unicode support

## non-strict function semantics
- [ ]  hoisted block-level function declaration
- [x]  labeled function statements
- [ ]  function statements in if-statement clauses

## __proto__ in object literals
- [ ]  basic support
- [x]  multiple __proto__ is an error
- [ ]  not a computed property
- [ ]  not a shorthand property
- [ ]  not a shorthand method

## Object.prototype.__proto__
- [ ]  get prototype
- [ ]  set prototype
- [ ]  absent from Object.create(null)
- [ ]  present in hasOwnProperty()
- [ ]  correct property descriptor
- [ ]  present in Object.getOwnPropertyNames()

## String.prototype HTML methods
- [ ]  existence
- [ ]  tags' names are lowercase
- [ ]  quotes in arguments are escaped
- [x]  RegExp.prototype.compile

## RegExp syntax extensions
- [x]  hyphens in character sets
- [x]  invalid character escapes
- [x]  invalid control-character escapes
- [x]  invalid Unicode escapes
- [x]  invalid hexadecimal escapes
- [x]  incomplete patterns and quantifiers
- [x]  octal escape sequences
- [x]  invalid backreferences become octal escapes
- [x]  HTML-style comments
