// For beginners, this section jumps deeper into JavaScript and will require a bit more Googling.
describe("About Mutability", function() {
  /*
    What does 'Mutability' mean? What does it mean for something to be 'mutable'? 
    Mutable is a type of variable that can be changed. Let's discover what the rules of mutability
    are in JavaScript
  */
  it("should expect object properties to be public and mutable", function () {
    var aPerson = { firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe(FILL_ME_IN);
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname) {
      // Waaaahhh! What is this? Try to see if you can fix this error without fully understanding 'this' first.
      this.firstname = firstname;
      this.lastname = lastname;
    }

    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe(FILL_ME_IN);
  });

  // What is a prototype in JavaScript?
  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;
    };

    var aPerson = new Person ("John", "Smith");
    expect(aPerson.getFullName()).toBe(FILL_ME_IN);

    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe(FILL_ME_IN);
  });

  // What is a constructor? What do you think it does?
  it("should know that variables inside a constructor and constructor arguments are private", function () {
    function Person(firstname, lastname) {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    var aPerson = new Person ("John", "Smith");

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";

    expect(aPerson.getFirstName()).toBe(FILL_ME_IN);
    expect(aPerson.getLastName()).toBe(FILL_ME_IN);
    expect(aPerson.getFullName()).toBe(FILL_ME_IN);

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    expect(aPerson.getFullName()).toBe(FILL_ME_IN);
  });

});
