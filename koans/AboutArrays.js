describe("About Arrays", () => {
  it("should create arrays", () => {
    const emptyArray = [];

    // Learn about data types in JavaScript
    expect(typeof emptyArray).toBe(FILL_ME_IN); // A mistake? - https://www.w3schools.com/js/js_datatypes.asp
    expect(emptyArray.length).toBe(FILL_ME_IN);
  });

  it("should understand how to access elements in arrays", () => {
    const multiTypeArray = [
      0,
      1,
      "two",
      () => 3,
      { value1: 4, value2: 5 },
      [6, 7],
    ];
    expect(multiTypeArray[0]).toBe(FILL_ME_IN);
    expect(multiTypeArray[1]).toBe(FILL_ME_IN);
    expect(multiTypeArray[2]).toBe(FILL_ME_IN);
    expect(multiTypeArray[3]()).toBe(FILL_ME_IN);
    expect(multiTypeArray[4].value1).toBe(FILL_ME_IN);
    expect(multiTypeArray[4]["value2"]).toBe(FILL_ME_IN);
    expect(multiTypeArray[5][0]).toBe(FILL_ME_IN);
  });

  /* 
    An array literal is a list of zero or more expressions. Each expression represents an element in the array.
    An array is enclosed in square brackets ([]).

    When you create an array using an array literal, it is initialized with the specified values as its
    elements, and its length is set to the number of arguments specified.
  */

  it("should understand array literals", () => {
    // The below line is an array literal
    const array = [];
    expect(array).toEqual([]);

    array[0] = 1;
    expect(array).toEqual([1]);

    array[1] = 2;
    expect(array).toEqual([1, FILL_ME_IN]);

    array.push(3);
    expect(array).toEqual(FILL_ME_IN);
  });

  it("should understand array length", () => {
    const fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(FILL_ME_IN);
    fourNumberArray.push(5, 6);
    expect(fourNumberArray.length).toBe(FILL_ME_IN);

    const tenEmptyElementArray = new Array(10);
    expect(tenEmptyElementArray.length).toBe(FILL_ME_IN);

    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(FILL_ME_IN);
  });

  it("should slice arrays", () => {
    const array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(FILL_ME_IN);
    expect(array.slice(0, 2)).toEqual(FILL_ME_IN);
    expect(array.slice(2, 2)).toEqual(FILL_ME_IN);
    expect(array.slice(2, 20)).toEqual(FILL_ME_IN);
    expect(array.slice(3, 0)).toEqual(FILL_ME_IN);
    expect(array.slice(3, 100)).toEqual(FILL_ME_IN);
    expect(array.slice(5, 1)).toEqual(FILL_ME_IN);
  });

  it("should know array references", () => {
    const array = ["zero", "one", "two", "three", "four", "five"];

    function passedByReference(refArray) {
      refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe(FILL_ME_IN);

    const assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe(FILL_ME_IN);

    const copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray";
    expect(array[3]).toBe(FILL_ME_IN);
  });

  it("should push and pop", () => {
    const array = [1, 2];
    array.push(3);

    expect(array).toEqual(FILL_ME_IN);

    const poppedValue = array.pop();
    expect(poppedValue).toBe(FILL_ME_IN);
    expect(array).toEqual(FILL_ME_IN);
  });

  it("should know about shifting arrays", () => {
    const array = [1, 2];

    array.unshift(3);
    expect(array).toEqual(FILL_ME_IN);

    const shiftedValue = array.shift();
    expect(shiftedValue).toEqual(FILL_ME_IN);
    expect(array).toEqual(FILL_ME_IN);
  });
});
