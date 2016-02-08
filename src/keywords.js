const keywords =   {
  "es5": [
    "do",
    "if",
    "in",
    "for",
    "new",
    "try",
    "var",
    "case",
    "else",
    "enum",
    "null",
    "this",
    "true",
    "void",
    "with",
    "break",
    "catch",
    "class",
    "const",
    "false",
    "super",
    "throw",
    "while",
    "delete",
    "export",
    "import",
    "return",
    "switch",
    "typeof",
    "default",
    "extends",
    "finally",
    "continue",
    "debugger",
    "function",
    "instanceof"],

  "es5strict": [
    "implements",
    "let",
    "private",
    "public",
    "interface",
    "package",
    "protected",
    "static",
    "yield"]
};

keywords.es6 = keywords.es5.slice().concat([
  "class",
  "const",
  "debugger",
  "enum",
  "export",
  "extends",
  "super"
]);

keywords.es6strict = keywords.es5strict.slice().concat(["static", "implements"]);

export function isReserved (name, ecmaVersion = 5) {
  let v = `es${ecmaVersion}`;
  if (v in keywords) {
    return keywords[v].indexOf(name) >= 0;
  }
  
  return false;
}

export function  isStrictReserved (name, ecmaVersion = 5) {
  let v = `es${ecmaVersion}strict`;
  if (v in keywords) {
    return keywords[v].indexOf(name) >= 0;
  }
  
  return false;
}
