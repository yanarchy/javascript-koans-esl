// For beginners, this section jumps deeper into JavaScript and will require a bit more Googling.
describe("About Mutability", () => {
  /*
    What does 'Mutability' mean? What does it mean for something to be 'mutable'? 
    Mutable is a type of variable that can be changed. Let's discover what the rules of mutability
    are in JavaScript
  */
  it("should expect object properties to be public and mutable", () => {
    const aPerson = { firstName: "John", lastName: "Smith" };
    aPerson.firstName = "Alan";

    expect(aPerson.firstName).toBe(FILL_ME_IN);
  });

  it("should understand that constructed properties are public and mutable", () => {
    class Person {
      constructor(firstName, lastName) {
        // Waaaahhh! What is this? Try to see if you can complete this koan without fully understanding 'this' first.
        this.firstName = firstName;
        this.lastName = lastName;
      }
    }

    const aPerson = new Person("John", "Smith");
    aPerson.firstName = "Alan";

    expect(aPerson.firstName).toBe(FILL_ME_IN);
  });

  // What is a prototype in JavaScript?
  it("should expect prototype properties to be public and mutable", () => {
    class Person {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }

      getFullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

    const aPerson = new Person("John", "Smith");
    expect(aPerson.getFullName()).toBe(FILL_ME_IN);

    aPerson.getFullName = function () {
      return `${this.lastName}, ${this.firstName}`;
    };

    expect(aPerson.getFullName()).toBe(FILL_ME_IN);
  });

  // What is a constructor? What do you think it does?
  it("should know that variables inside a constructor and constructor arguments are private", () => {
    class Person {
      constructor(firstName, lastName) {
        const fullName = `${firstName} ${lastName}`;
        this.getFirstName = () => firstName;
        this.getLastName = () => lastName;
        this.getFullName = () => fullName;
      }
    }
    const aPerson = new Person("John", "Smith");

    aPerson.firstName = "Penny";
    aPerson.lastName = "Andrews";
    aPerson.fullName = "Penny Andrews";

    expect(aPerson.getFirstName()).toBe(FILL_ME_IN);
    expect(aPerson.getLastName()).toBe(FILL_ME_IN);
    expect(aPerson.getFullName()).toBe(FILL_ME_IN);

    aPerson.getFullName = function () {
      return `${aPerson.lastName}, ${aPerson.firstName}`;
    };

    expect(aPerson.getFullName()).toBe(FILL_ME_IN);
  });
});
