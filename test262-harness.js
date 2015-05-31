function $ERROR (message) {
	console.error(message);
	throw new Error(message);
}

function $PRINT (message) {
}

function runTestCase (testcase) {
	if (!testcase()) {
		$ERROR("Test case returned non-true value!");
	}
}
