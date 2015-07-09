var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Types", function() {
	describe("Arrays", function() {
		it("should create an array for an array literal", function () {
			var result = runner.runBlock("Array.isArray([]);");
			expect(result.value).to.be.true;
		});

		it("should have a length of 0 with empty array", function () {
			var result = runner.runBlock("[].length==0;");
			expect(result.value).to.be.true;
		});

		it("should add items to array literal", function () {
			var result = runner.runBlock("var a = [1,2,3];a[2]==3;");
			expect(result.value).to.be.true;
		});

		it("should set length based on array length", function () {
			var result = runner.runBlock("var a = [1,2,3];a.length==3;");
			expect(result.value).to.be.true;
		});

		describe("push", function () {
			it("should add item to array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.push(4);a[3]==4;");
				expect(result.value).to.be.true;
			});

			it("should update length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.push(4);a.length==4;");
				expect(result.value).to.be.true;
			});

			it("should return the new length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.push(4)==4;");
				expect(result.value).to.be.true;
			});
		});

		describe("pop", function () {
			it("should return the last item from the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.pop()==3;");
				expect(result.value).to.be.true;
			});

			it("should update the length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.pop();a.length==2;");
				expect(result.value).to.be.true;
			});

			it("should return undefined for an empty array", function () {
				var result = runner.runBlock("[].pop()===undefined;");
				expect(result.value).to.be.true;
			});

			it("should not affect length of empty array", function () {
				var result = runner.runBlock("var a = [];a.pop();a.length==0");
				expect(result.value).to.be.true;
			});
		});

		describe("shift", function () {
			it("should return the first item in the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift()==1;");
				expect(result.value).to.be.true;
			});

			it("should remove the first item from the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();a[0]==2;");
				expect(result.value).to.be.true;
			});

			it("should update the array length", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();a.length==2;");
				expect(result.value).to.be.true;
			});

			it("should update the array indexes", function () {
				var result = runner.runBlock("var a = [1,2,3];a.shift();a[2]===undefined;");
				expect(result.value).to.be.true;
			});
		});

		describe("unshift", function () {
			it("should insert the items to the beginning of the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);a[1]==0");
				expect(result.value).to.be.true;
			});

			it("should move the other items in the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);a[2]==1;");
				expect(result.value).to.be.true;
			});

			it("should return new length of array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0)==5;");
				expect(result.value).to.be.true;
			});

			it("should update length of array", function () {
				var result = runner.runBlock("var a = [1,2,3];a.unshift(-1, 0);a.length==5;");
				expect(result.value).to.be.true;
			});
		});

		describe("slice", function () {
			it("should return a new array", function () {
				var result = runner.runBlock("Array.isArray([1,2,3].slice(0, 3))");
				expect(result.value).to.be.true;
			});

			it("should contain the items in the range", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1, 3);a[1]=='Lemon';");
				expect(result.value).to.be.true;
			});

			it("should contain only those items", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1, 3);a.length==2;");
				expect(result.value).to.be.true;
			});

			it("should extract until end if end is undefined", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1);a.length==4;");
				expect(result.value).to.be.true;
			});

			it("should extract the entire array if begin is undefined", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice();a.length==5;");
				expect(result.value).to.be.true;
			});

			it("should offset from the end if a negative begin", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(-2);a[0]=='Apple';");
				expect(result.value).to.be.true;
			});

			it("should extract until up to end - negative end", function () {
				var result = runner.runBlock("var a = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(0, -1);a.length==4;");
				expect(result.value).to.be.true;
			});
		});

		describe("splice", function () {
			it("should insert the item at the position specified", function () {
				var result = runner.runBlock("var a = ['angel', 'clown', 'mandarin', 'surgeon'];var b=a.splice(2, 0, 'drum');a[2]=='drum' && a.length==5 && b.length==0;");
				expect(result.value).to.be.true;
			});

			it("should remove count specified from array", function () {
				var result = runner.runBlock("var a = ['angel', 'clown', 'drum', 'mandarin', 'surgeon'];var b=a.splice(3, 1);b.length==1 && a[3]=='surgeon';");
				expect(result.value).to.be.true;
			});

			it("should insert new item in deleted position", function () {
				var result = runner.runBlock("var a = ['angel', 'clown', 'drum', 'surgeon'];a.splice(2, 1, 'trumpet');a[2]=='trumpet';");
				expect(result.value).to.be.true;
			});

			it("should insert all items, even if delete count is less", function () {
				var result = runner.runBlock("var a = ['angel', 'clown', 'trumpet', 'surgeon'];var b=a.splice(0, 2, 'parrot', 'anemone', 'blue');b.length=2 && a.length==5 && a[0]=='parrot' && a[2]=='blue';");
				expect(result.value).to.be.true;
			});

			it("should remove elements until end if delete count exceeds length", function () {
				var result = runner.runBlock("var a = ['parrot', 'anemone', 'blue', 'trumpet', 'surgeon'];var b=a.splice(3, Number.MAX_VALUE);b.length==2 && a.length==3;");
				expect(result.value).to.be.true;
			});
		});

		describe("concat", function () {
			it("should combine 2 arrays", function () {
				var result = runner.runBlock("var a = ['a', 'b', 'c'];var b=a.concat([1, 2, 3]);b.length==6 && b[3]==1;");
				expect(result.value).to.be.true;
			});

			it("should combine multiple arrays", function () {
				var result = runner.runBlock("var num1 = [1, 2, 3],num2 = [4, 5, 6],num3 = [7, 8, 9];var a=num1.concat(num2,num3);a.length==9 && a[3]==4 && a[6]==7;");
				expect(result.value).to.be.true;
			});

			it("should combine flatten arrays/values", function () {
				var result = runner.runBlock("var a = ['a', 'b', 'c'];var b=a.concat(1, [2, 3]);b.length==6 && b[3]==1 && b[4]==2;");
				expect(result.value).to.be.true;
			});
		});

		describe("indexOf", function () {
			it("should return -1 if item is not found", function () {
				var result = runner.runBlock("[1,2,3].indexOf(4)==-1;");
				expect(result.value).to.be.true;
			});

			it("should return index if found", function () {
				var result = runner.runBlock("[1,2,3].indexOf(2)==1;");
				expect(result.value).to.be.true;
			});

			it("should search using fromIndex if supplied", function () {
				var result = runner.runBlock("[1,2,3,2,1].indexOf(2, 2)==3");
				expect(result.value).to.be.true;
			});
		});

		describe("lastIndexOf", function () {
			it("should return last index if found", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2)==3;");
				expect(result.value).to.be.true;
			});

			it("should return -1 if not found", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(7)==-1;");
				expect(result.value).to.be.true;
			});

			it("should use from index if supplied", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2, 2)==0;");
				expect(result.value).to.be.true;
			});

			it("should offset for negative index if supplied", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2, -2)==0;");
				expect(result.value).to.be.true;
			});

			it("should offset for negative index is below 0 -1 is returned", function () {
				var result = runner.runBlock("[2, 5, 9, 2].lastIndexOf(2, -10)==-1;");
				expect(result.value).to.be.true;
			});
		});

		describe("join", function () {
			it("should join values with a comma if no separator is specified", function () {
				var result = runner.runBlock("['Wind', 'Rain', 'Fire'].join()=='Wind,Rain,Fire'");
				expect(result.value).to.be.true;
			});

			it("should join values with a no separator if empty string is specified", function () {
				var result = runner.runBlock("['Wind', 'Rain', 'Fire'].join('')=='WindRainFire';");
				expect(result.value).to.be.true;
			});

			it("should join values with separator if specified", function () {
				var result = runner.runBlock("['Wind', 'Rain', 'Fire'].join('--')=='Wind--Rain--Fire'");
				expect(result.value).to.be.true;
			});
		});

		describe("forEach", function () {
			it("should iterate over the array", function () {
				var result = runner.runBlock("var counter=0;[1,2,3].forEach(function() { counter++; });counter==3;");
				expect(result.value).to.be.true;
			});

			it("should pass in expected arguments", function () {
				var result = runner.runBlock("var a = [1,2,3], passed = true;a.forEach(function(value, index, arr) { passed = (passed && value == a[index] && arr === a); });passed==true;");
				expect(result.value).to.be.true;
			});

			it("should use expected scope", function () {
				var result = runner.runBlock("var a = [1,2,3], passed = true, scope = {};a.forEach(function(value, index, arr) { passed = (passed && this === scope); }, scope);passed==true;");
				expect(result.value).to.be.true;
			});

			it("should skip missing values in sparse array", function () {
				var result = runner.runBlock("var counter=0;var a = [1,2]; a[10] = 10;a.forEach(function() { counter++; });counter==3;");
				expect(result.value).to.be.true;
			});
		});

		describe("map", function () {
			it("should return the mapped values", function () {
				var result = runner.runBlock("var a=[1,2,3].map(function (i) { return i * 2; });a.length==3 && a[0]==2 && a[2]==6;");
				expect(result.value).to.be.true;
			});
		});

		describe("filter", function () {
			it("should filter values from the array", function () {
				var result = runner.runBlock("var a=[12, 5, 8, 130, 44].filter(function (v) { return v >= 10; });a.length==3 && a[0]==12 && a[1]==130;");
				expect(result.value).to.be.true;
			});
		});

		describe("every", function () {
			it("should return true for an empty array", function () {
				var result = runner.runBlock("[].every(function () { return true; });");
				expect(result.value).to.be.true;
			});

			it("should return true if all elements match predicate", function () {
				var result = runner.runBlock("[1,2,3].every(function (v) { return v > 0; });");
				expect(result.value).to.be.true;
			});

			it("should return false if any element does not match predicate", function () {
				var result = runner.runBlock("!([-1,2,3].every(function (v) { return v > 0; }));");
				expect(result.value).to.be.true;
			});
		});

		describe("some", function () {
			it("should return false for an empty array", function () {
				var result = runner.runBlock("!([].some(function() { return true; }));");
				expect(result.value).to.be.true;
			});

			it("should return false if all items fail", function () {
				var result = runner.runBlock("!([1,2,3].some(function(v) { return v < 0; }));");
				expect(result.value).to.be.true;
			});

			it("should return true if any items passes", function () {
				var result = runner.runBlock("[-1,2,3].some(function(v) { return v < 0; });");
				expect(result.value).to.be.true;
			});
		});

		describe("reduce", function () {
			it("should execute reduce callback", function () {
				var result = runner.runBlock("var a=[0, 1, 2, 3].reduce(function(a, b) { return a + b; });a==6;");
				expect(result.value).to.be.true;
			});

			it("should execute reduce callback with initial value if provided", function () {
				var result = runner.runBlock("var a=[0, 1, 2, 3].reduce(function(a, b) { return a + b; }, -6);a==0;");
				expect(result.value).to.be.true;
			});
		});

		describe("reduceRight", function () {
			// it("should execue reduce callback", function () {
			// 	var result = runner.runBlock("var a=[[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) { return a.concat(b); }, []);a.length==5 //&& a[0]==4 && a[5]==1;");
			// 	expect(result.value).to.be.true;
			// 	// expect(result.getValue("length").value).to.equal(6);
			// 	// expect(result.getValue(0).value).to.equal(4);
			// 	// expect(result.getValue(5).value).to.equal(1);
			// });
		});

		describe("reverse", function () {
			it("should reverse the items in the array", function () {
				var result = runner.runBlock("var a=['one', 'two', 'three'].reverse();a[0]=='three' && a[2]=='one';");
				expect(result.value).to.be.true;
			});

			it("should pass a reference to the same array back", function () {
				var result = runner.runBlock("var a = ['one', 'two', 'three'];a.reverse() === a;");
				expect(result.value).to.be.true;
			});
		});

		describe("sort", function () {
			it("should return a reference to the array", function () {
				var result = runner.runBlock("var a = [1,2,3];a === a.sort()");
				expect(result.value).to.be.true;
			});

			it("should sort the array without a compare function", function () {
				var result = runner.runBlock("var a=['cherries', 'apples', 'bananas'];a.sort();a[0]=='apples' && a[2]=='cherries';");
				expect(result.value).to.be.true;
			});

			it("should sort by default converting to string", function () {
				var result = runner.runBlock("var a = [1, 10, 21, 2];a.sort();a[0]==1 && a[1]==10 && a[3]==21;");
				expect(result.value).to.be.true;
			});

			it("should sort using a comparer function if provided", function () {
				var result = runner.runBlock("var a=[4, 2, 5, 1, 3];a.sort(function(a, b) { return a - b; });a[0]==1 && a[4]==5;");
				expect(result.value).to.be.true;
			});
		});

		describe("toString", function () {
			it("should return a string representation of the array", function () {
				var result = runner.runBlock("['Jan', 'Feb', 'Mar', 'Apr'].toString()=='Jan,Feb,Mar,Apr';");
				expect(result.value).to.be.true;
			});
		});
	});
});
