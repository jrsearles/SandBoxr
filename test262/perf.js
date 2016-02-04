var SandBoxr = require("../dist/sandboxr");
var acorn = require("acorn");

var code = `
var result = "";
function $ERROR (msg) {
	result += msg;
}

var assert = {
  sameValue: function (a, b, msg) {
	  if (a !== b) {
		  $ERROR(msg);
		}
	},

	throws: function (errorType, fn) {
	  var caughtError;
		try {
		  fn();
		} catch (err) {
		  caughtError = err;
		} finally {
		  if (!caughtError) {
			  $ERROR("Expected an error but none thrown");
			} else if (!(caughtError instanceof errorType)) {
			  $ERROR("Error of unexpected type");
			}
		}
	}
}

var errorCount = 0;
var count = 0;
for (var indexI = 0; indexI <= 200; indexI++) {
  try {
    var xx = 0;
    eval("/*var " + String.fromCharCode(indexI) + "xx = 1*/");
    var hex = decimalToHexString(indexI);
    if (xx !== 0) {
      $ERROR('#' + hex + ' ');
      errorCount++;
    }
  } catch (e){
    $ERROR('#' + hex + ' ');
    errorCount++;
  }
  count++;
}

if (errorCount > 0) {
  $ERROR('Total error: ' + errorCount + ' bad Unicode character in ' + count);
}

function decimalToHexString(n) {
  n = Number(n);
  var h = "";
  for (var i = 3; i >= 0; i--) {
    if (n >= Math.pow(16, i)) {
      var t = Math.floor(n / Math.pow(16, i));
      n -= t * Math.pow(16, i);
      if ( t >= 10 ) {
        if ( t == 10 ) { h += "A"; }
        if ( t == 11 ) { h += "B"; }
        if ( t == 12 ) { h += "C"; }
        if ( t == 13 ) { h += "D"; }
        if ( t == 14 ) { h += "E"; }
        if ( t == 15 ) { h += "F"; }
      } else {
        h += String(t);
      }
    } else {
      h += "0";
    }
  }
  return h;
}

result;
`;

// 217.844 - baseline
// 161.74 - cache instances

var ln = 1000;

var env = SandBoxr.createEnvironment();
env.init();

var ast = acorn.parse(code);
var box = SandBoxr.create(ast);
var then = Date.now();
  
for (var i = 0; i < ln; i++) {
  box.execute(env);
  // SandBoxr.create(ast).execute();
}

var total = Date.now() - then;
console.log("%s iterations in %s ms", ln, total);
console.log("%s ms per iteration", total / ln);
