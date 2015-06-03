var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Types", function() {
	describe("Arrays", function() {
		it("should create an array for an array literal", function () {
			var result = runner.runBlock("Array.isArray([])");
			expect(result.value).to.be.ok;
		});

		it("should have a length of 0 with empty array", function () {
			var result = runner.runBlock("[].length");
			expect(result.value).to.equal(0);
		});

		it("should add items to array literal", function () {
			var result = runner.runBlock("var a = [1,2,3];a[2];");
			expect(result.value).to.equal(3);
		});

		it("should set length based on array length", function () {
			var result = runner.runBlock("var a = [1,2,3];a.length;");
			expect(result.value).to.equal(3);
		});

		describe("push", function () {
			it("should add item to array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.push(4);a[3];");
				expect(result.value).to.equal(4);
			});

			it("should update length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.push(4);a.length;");
				expect(result.value).to.equal(4);
			});

			it("should return the new length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.push(4);");
				expect(result.value).to.equal(4);
			});
		});

		describe("pop", function () {
			it("should return the last item from the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.pop();");
				expect(result.value).to.equal(3);
			});

			it("should update the length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.pop();a.length;");
				expect(result.value).to.equal(2);
			});

			it("should return undefined for an empty array", function () {
				var result = runner.runBlock("[].pop()");
				expect(result.value).to.be.undefined;
			});

			it("should not affect length of empty array", function () {
				var result = runner.runBlock("var a = [];a.pop();a.length");
				expect(result.value).to.equal(0);
			});
		});

		describe("shift", function () {
			it("should return the first item in the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();");
				expect(result.value).to.equal(1);
			});

			it("should remove the first item from the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();a[0];");
				expect(result.value).to.equal(2);
			});

			it("should update the array length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();a.length;");
				expect(result.value).to.equal(2);
			});

			it("should update the array indexes", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();a[2]");
				expect(result.value).to.be.undefined;
			});
		});

		describe("unshift", function () {
			it("should insert the items to the beginning of the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);a[1]");
				expect(result.value).to.equal(0);
			});

			it("should move the other items in the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);a[2]");
				expect(result.value).to.equal(1);
			});

			it("should return new length of array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);");
				expect(result.value).to.equal(5);
			});

			it("should update length of array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);a.length");
				expect(result.value).to.equal(5);
			});
		});

		describe("slice", function () {
			it("should return a new array", function () {
				var result = runner.runBlock("Array.isArray([1,2,3].slice(0, 3))");
				expect(result.value).to.be.ok;
			});

			it("should contain the items in the range", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1, 3);a[1];");
				expect(result.value).to.equal("Lemon");
			});

			it("should contain only those items", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1, 3);a.length;");
				expect(result.value).to.equal(2);
			});

			it("should extract until end if end is undefined", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1);a.length;");
				expect(result.value).to.equal(4);
			});

			it("should extract the entire array if begin is undefined", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice();a.length;");
				expect(result.value).to.equal(5);
			});

			it("should offset from the end if a negative begin", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(-2);a[0];");
				expect(result.value).to.equal("Apple");
			});

			it("should extract until up to end - negative end", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(0, -1);a.length;");
				expect(result.value).to.equal(4);
			});
		});

		describe("splice", function () {
			it("should insert the item at the position specified", function () {
				var instance = runner.getRunner("var a = ['angel', 'clown', 'mandarin', 'surgeon']; a.splice(2, 0, 'drum');");
				var result = instance.execute().result;

				expect(instance.scope.getProperty("a").getProperty(2).value).to.equal("drum");
				expect(instance.scope.getProperty("a").getProperty("length").value).to.equal(5);
				expect(result.getProperty("length").value).to.equal(0);
			});

			it("should remove count specified from array", function () {
				var instance = runner.getRunner("var a = ['angel', 'clown', 'drum', 'mandarin', 'surgeon']; a.splice(3, 1);");
				var result = instance.execute().result;

				expect(result.getProperty("length").value).to.equal(1);
				expect(instance.scope.getProperty("a").getProperty(3).value).to.equal("surgeon");
			});

			it("should insert new item in deleted position", function () {
				var instance = runner.getRunner("var a = ['angel', 'clown', 'drum', 'surgeon'];a.splice(2, 1, 'trumpet');");
				var result = instance.execute().result;

				expect(instance.scope.getProperty("a").getProperty(2).value).to.equal("trumpet");
			});

			it("should insert all items, even if delete count is less", function () {
				var instance = runner.getRunner("var a = ['angel', 'clown', 'trumpet', 'surgeon'];a.splice(0, 2, 'parrot', 'anemone', 'blue');");
				var result = instance.execute().result;

				expect(result.getProperty("length").value).to.equal(2);
				expect(instance.scope.getProperty("a").getProperty("length").value).to.equal(5);
				expect(instance.scope.getProperty("a").getProperty(0).value).to.equal("parrot");
				expect(instance.scope.getProperty("a").getProperty(2).value).to.equal("blue");
			});

			it("should remove elements until end if delete count exceeds length", function () {
				var instance = runner.getRunner("var a = ['parrot', 'anemone', 'blue', 'trumpet', 'surgeon'];a.splice(3, Number.MAX_VALUE);");
				var result = instance.execute().result;

				expect(result.getProperty("length").value).to.equal(2);
				expect(instance.scope.getProperty("a").getProperty("length").value).to.equal(3);
			});
		});

		describe("concat", function () {
			it("should combine 2 arrays", function () {
				var result = runner.runBlock("var a = ['a', 'b', 'c'];a.concat([1, 2, 3]);");

				expect(result.getProperty("length").value).to.equal(6);
				expect(result.getProperty(3).value).to.equal(1);
			});

			it("should combine multiple arrays", function () {
				var result = runner.runBlock("var num1 = [1, 2, 3],num2 = [4, 5, 6],num3 = [7, 8, 9];num1.concat(num2,num3);");

				expect(result.getProperty("length").value).to.equal(9);
				expect(result.getProperty(3).value).to.equal(4);
				expect(result.getProperty(6).value).to.equal(7);
			});

			it("should combine flatten arrays/values", function () {
				var result = runner.runBlock("var a = ['a', 'b', 'c'];a.concat(1, [2, 3]);");

				expect(result.getProperty("length").value).to.equal(6);
				expect(result.getProperty(3).value).to.equal(1);
				expect(result.getProperty(4).value).to.equal(2);
			});
		});

		describe("indexOf", function () {
			it("should return -1 if item is not found", function () {
				var result = runner.runBlock("[1,2,3].indexOf(4);");

				expect(result.value).to.equal(-1);
			});

			it("should return index if found", function () {
				var result = runner.runBlock("[1,2,3].indexOf(2)");

				expect(result.value).to.equal(1);
			});

			it("should search using fromIndex if supplied", function () {
				var result = runner.runBlock("[1,2,3,2,1].indexOf(2, 2)");

				expect(result.value).to.equal(3);
			});
		});

		describe("lastIndexOf", function () {
			it("should return last index if found", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2);");

				expect(result.value).to.equal(3);
			});

			it("should return -1 if not found", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(7);");

				expect(result.value).to.equal(-1);
			});

			it("should use from index if supplied", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2, 2);");

				expect(result.value).to.equal(0);
			});

			it("should offset for negative index if supplied", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2, -2);");

				expect(result.value).to.equal(0);
			});

			it("should offset for negative index is below 0 -1 is returned", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2, -10);");

				expect(result.value).to.equal(-1);
			});
		});

		describe("join", function () {
			it("should join values with a comma if no separator is specified", function () {
				var result = runner.runBlock("['Wind', 'Rain', 'Fire'].join()");

				expect(result.value).to.equal("Wind,Rain,Fire");
			});

			it("should join values with a no separator if empty string is specified", function () {
				var result = runner.runBlock("['Wind', 'Rain', 'Fire'].join('')");

				expect(result.value).to.equal("WindRainFire");
			});

			it("should join values with separator if specified", function () {
				var result = runner.runBlock("['Wind', 'Rain', 'Fire'].join('--')");

				expect(result.value).to.equal("Wind--Rain--Fire");
			});
		});

		describe("forEach", function () {
			it("should iterate over the array", function () {
				var result = runner.runBlock("var counter=0;[1,2,3].forEach(function() { counter++; });counter;");
				expect(result.value).to.equal(3);
			});

			it("should pass in expected arguments", function () {
				var result = runner.runBlock("var a = [1,2,3], passed = true;a.forEach(function(value, index, arr) { passed = passed && value == a[index] && arr === a; });passed;");
				expect(result.value).to.be.ok;
			});

			it("should use expected scope", function () {
				var result = runner.runBlock("var a = [1,2,3], passed = true, scope = {};a.forEach(function(value, index, arr) { passed = passed && this === scope; }, scope);passed;");
				expect(result.value).to.be.ok;
			});

			it("should skip missing values in sparse array", function () {
				var result = runner.runBlock("var counter=0;var a = [1,2]; a[10] = 10;a.forEach(function() { counter++; });counter;");
				expect(result.value).to.equal(3);
			});
		});

		describe("map", function () {
			it("should return the mapped values", function () {
				var result = runner.runBlock("[1,2,3].map(function (i) { return i * 2; });");

				expect(result.getProperty(0).value).to.equal(2);
				expect(result.getProperty(2).value).to.equal(6);
				expect(result.getProperty("length").value).to.equal(3);
			});
		});

		describe("filter", function () {
			it("should filter values from the array", function () {
				var result = runner.runBlock("[12, 5, 8, 130, 44].filter(function (v) { return v >= 10; });");

				expect(result.getProperty(0).value).to.equal(12);
				expect(result.getProperty(1).value).to.equal(130);
				expect(result.getProperty("length").value).to.equal(3);
			});
		});

		describe("every", function () {
			it("should return true for an empty array", function () {
				var result = runner.runBlock("[].every(function () { return true; });");

				expect(result.value).to.be.ok;
			});

			it("should return true if all elements match predicate", function () {
				var result = runner.runBlock("[1,2,3].every(function (v) { return v > 0; });");

				expect(result.value).to.be.ok;
			});

			it("should return false if any element does not match predicate", function () {
				var result = runner.runBlock("[-1,2,3].every(function (v) { return v > 0; });");

				expect(result.value).to.be.false;
			});
		});

		describe("some", function () {
			it("should return false for an empty array", function () {
				var result = runner.runBlock("[].some(function() { return true; });");

				expect(result.value).to.be.false;
			});

			it("should return false if all items fail", function () {
				var result = runner.runBlock("[1,2,3].some(function(v) { return v < 0; });");

				expect(result.value).to.be.false;
			});

			it("should return true if any items passes", function () {
				var result = runner.runBlock("[-1,2,3].some(function(v) { return v < 0; });");

				expect(result.value).to.be.ok;
			});
		});

		describe("reduce", function () {
			it("should execute reduce callback", function () {
				var result = runner.runBlock("[0, 1, 2, 3].reduce(function(a, b) { return a + b; });");

				expect(result.value).to.equal(6);
			});

			it("should execute reduce callback with initial value if provided", function () {
				var result = runner.runBlock("[0, 1, 2, 3].reduce(function(a, b) { return a + b; }, -6);");

				expect(result.value).to.equal(0);
			});
		});

		describe("reduceRight", function () {
			it("should execue reduce callback", function () {
				var result = runner.runBlock("[[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) { return a.concat(b); }, []);");

				expect(result.getProperty("length").value).to.equal(6);
				expect(result.getProperty(0).value).to.equal(4);
				expect(result.getProperty(5).value).to.equal(1);
			});
		});

		describe("reverse", function () {
			it("should reverse the items in the array", function () {
				var result = runner.runBlock("['one', 'two', 'three'].reverse();");

				expect(result.getProperty(0).value).to.equal("three");
				expect(result.getProperty(2).value).to.equal("one");
			});

			it("should pass a reference to the same array back", function () {
				var result = runner.runBlock("var a = ['one', 'two', 'three'];a.reverse() === a;");

				expect(result.value).to.be.ok;
			});
		});

		describe("sort", function () {
			it("should return a reference to the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a === a.sort()");
				expect(result.value).to.be.ok;
			});

			it("should sort the array without a compare function", function () {
				var result = runner.runBlock("['cherries', 'apples', 'bananas'].sort();");
				expect(result.getProperty(0).value).to.equal("apples");
				expect(result.getProperty(2).value).to.equal("cherries");
			});

			it("should sort by default converting to string", function () {
				var result = runner.runBlock("var scores = [1, 10, 21, 2];scores.sort();");
				expect(result.getProperty(0).value).to.equal(1);
				expect(result.getProperty(1).value).to.equal(10);
				expect(result.getProperty(3).value).to.equal(21);
			});

			it("should sort using a comparer function if provided", function () {
				var result = runner.runBlock("[4, 2, 5, 1, 3].sort(function(a, b) { return a - b; });");
				expect(result.getProperty(0).value).to.equal(1);
				expect(result.getProperty(4).value).to.equal(5);
			});
		});

		describe("toString", function () {
			it("should return a string representation of the array", function () {
				var result = runner.runBlock("['Jan', 'Feb', 'Mar', 'Apr'].toString();");

				expect(result.value).to.equal("Jan,Feb,Mar,Apr");
			});
		});
	});
});
