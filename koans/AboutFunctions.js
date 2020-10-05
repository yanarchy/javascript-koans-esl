describe("About Functions", () => {
  it("should declare functions", () => {
    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(FILL_ME_IN);
  });

  it("should know inner variables override outer variables", () => {
    const message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      const message = "Inner";
      return message;
    }

    expect(getMessage()).toBe(FILL_ME_IN);
    expect(overrideMessage()).toBe(FILL_ME_IN);
    expect(message).toBe(FILL_ME_IN);
  });

  // JavaScript has a rule called 'lexical scoping'. Let's learn about it.
  it("should have lexical scoping", () => {
    const variable = "top-level";
    function parentfunction() {
      const variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe(FILL_ME_IN);
  });

  it("should use lexical scoping to create new functions", () => {
    function makeMysteryFunction(makerValue) {
      return function doMysteriousThing(param) {
        return makerValue + param;
      };
    }

    const mysteryFunction3 = makeMysteryFunction(3);
    const mysteryFunction5 = makeMysteryFunction(5);

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(FILL_ME_IN);
  });

  it("should allow for more than one function argument", () => {
    // You can write functions to take in more than one argument (aka parameter).
    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe(FILL_ME_IN);

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(FILL_ME_IN);

    function returnAllArgs(...argsArray) {
      return argsArray.join(",");
    }

    expect(returnAllArgs("first", "second", "third")).toBe(FILL_ME_IN);
  });

  it("should pass functions as values", () => {
    const appendRules = (name) => name + " rules!";

    const appendDoubleRules = (name) => name + " totally rules!";

    const praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe(FILL_ME_IN);

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe(FILL_ME_IN);
  });
});
