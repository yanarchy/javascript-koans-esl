class Muppet {
  constructor(age, hobby) {
    this.age = age;
    this.hobby = hobby;
  }

  answerNanny() {
    return "Everything's cool!";
  }
}

class SwedishChef extends Muppet {
  constructor(age, hobby, mood) {
    super(age, hobby);
    this.mood = mood;
  }
  cook() {
    return "Mmmm soup!";
  }
}

describe("About inheritance", () => {
  const swedishChef = new SwedishChef(2, "cooking", "chillin'");

  it("should be able to call a method on the derived object", () => {
    expect(swedishChef.cook()).toEqual(FILL_ME_IN);
  });

  it("should be able to call a method on the base object", () => {
    expect(swedishChef.answerNanny()).toEqual(FILL_ME_IN);
  });

  it("should set constructor parameters on the base object", () => {
    expect(swedishChef.age).toEqual(2);
    expect(swedishChef.hobby).toEqual(FILL_ME_IN);
  });

  it("should set constructor parameters on the derived object", () => {
    expect(swedishChef.mood).toEqual(FILL_ME_IN);
  });
});
