var date_1899_end = -2208988800001;
var date_1900_start = -2208988800000;
var date_1969_end = -1;
var date_1970_start = 0;
var date_1999_end = 946684799999;
var date_2000_start = 946684800000;
var date_2099_end = 4102444799999;
var date_2100_start = 4102444800000;

function $ERROR (message) {
	console.error(message);
	throw new Error(message);
}

function $FAIL (message) {
	$ERROR(message);
}

function $PRINT (message) {
}

function $INCLUDE() {}

function runTestCase (testcase) {
	if (!testcase()) {
		$ERROR("Test case returned non-true value!");
	}
}

 var __globalObject = Function("return this;")();
 function fnGlobalObject() {
 	return __globalObject;
}

function Test262Error(message) {
  this.message = message;
}

Test262Error.prototype.toString = function () {
  return "Test262 Error: " + this.message;
};

function getPrecision(num)
{
	//TODO: Create a table of prec's,
	//      because using Math for testing Math isn't that correct. 
	
	var log2num = Math.log(Math.abs(num))/Math.LN2;
	var pernum = Math.ceil(log2num);
	return(2 * Math.pow(2, -52 + pernum));
	//return(0);
}

var prec;
function isEqual(num1, num2)
{
        if ((num1 === Infinity)&&(num2 === Infinity))
        {
                return(true);
        }
        if ((num1 === -Infinity)&&(num2 === -Infinity))
        {
                return(true);
        }
        prec = getPrecision(Math.min(Math.abs(num1), Math.abs(num2)));  
        return(Math.abs(num1 - num2) <= prec);
        //return(num1 === num2);
}
