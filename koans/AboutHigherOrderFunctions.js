describe("About Higher Order Functions", () => {
  it("should use 'filter' to return array items that meet a criteria", () => {
    const numbers = [1, 2, 3];
    const odd = numbers.filter((x) => x % 2 !== 0);

    expect(odd).toEqual(FILL_ME_IN);
    expect(odd.length).toBe(FILL_ME_IN);
    expect(numbers.length).toBe(FILL_ME_IN);
  });

  it("should use 'map' to transform each element", () => {
    const numbers = [1, 2, 3];
    const numbersPlus1 = numbers.map((x) => x + 1);

    expect(numbersPlus1).toEqual(FILL_ME_IN);
    expect(numbers).toEqual(FILL_ME_IN);
  });

  it("should use 'reduce' to update the same result on each iteration", () => {
    const numbers = [1, 2, 3];
    const reduction = numbers.reduce(
      (/* result from last call */ memo, /* current */ x) => memo + x,
      /* initial */ 0
    );

    expect(reduction).toBe(FILL_ME_IN);
    expect(numbers).toEqual(FILL_ME_IN);
  });

  const isEven = (x) => x % 2 === 0;

  it("should use 'forEach' for simple iteration", () => {
    const numbers = [1, 2, 3];
    let msg = "";

    numbers.forEach((n) => {
      msg += isEven(n);
    });

    expect(msg).toEqual(FILL_ME_IN);
    expect(numbers).toEqual(FILL_ME_IN);
  });

  it("should use 'every' to test whether all items pass condition", () => {
    const onlyEven = [2, 4, 6];
    const mixedBag = [2, 4, 5, 6];

    expect(onlyEven.every(isEven)).toBe(FILL_ME_IN);
    expect(mixedBag.every(isEven)).toBe(FILL_ME_IN);
  });

  it("should use 'some' to test if any items passes condition", () => {
    const onlyEven = [2, 4, 6];
    const mixedBag = [2, 4, 5, 6];

    expect(onlyEven.some(isEven)).toBe(FILL_ME_IN);
    expect(mixedBag.some(isEven)).toBe(FILL_ME_IN);
  });

  it("should use 'flat' to make nested arrays easy to work with", () => {
    expect(
      [
        [1, 2],
        [3, 4],
      ].flat()
    ).toEqual(FILL_ME_IN);
  });

  it("should use multiple higher order functions", function () {
    const result = [[1, 2], 3]
      .flatMap((x) => x + 1)
      .filter(isEven)
      .reduce((sum, x) => sum + x);

    expect(result).toEqual(FILL_ME_IN);
  });
});
