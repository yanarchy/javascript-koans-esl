describe("About Applying What We Have Learnt", () => {
  const products = [
    {
      name: "Sonoma",
      ingredients: ["artichoke", "sundried tomatoes", "mushrooms"],
      containsNuts: false,
    },
    {
      name: "Pizza Primavera",
      ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"],
      containsNuts: false,
    },
    {
      name: "South Of The Border",
      ingredients: ["black beans", "jalapenos", "mushrooms"],
      containsNuts: false,
    },
    {
      name: "Blue Moon",
      ingredients: ["blue cheese", "garlic", "walnuts"],
      containsNuts: true,
    },
    {
      name: "Taste Of Athens",
      ingredients: ["spinach", "kalamata olives", "sesame seeds"],
      containsNuts: true,
    },
  ];

  /*********************************************************************************/

  it("should find a pizza I can eat (imperative) because I am allergic to nuts and hate mushrooms", () => {
    let productsICanEat = [];

    for (const product of products) {
      if (product.containsNuts === false) {
        let hasMushrooms = false;
        for (const ingredient of product.ingredients) {
          if (ingredient === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(product);
      }
    }

    expect(productsICanEat.length).toBe(FILL_ME_IN);
  });

  it("should find a pizza I can eat (functional) because I'm allergic to nuts and hate mushrooms", () => {
    var productsICanEat = [];

    /* solve using filter(), every()/some() */

    expect(productsICanEat.length).toBe(FILL_ME_IN);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", () => {
    let sum = 0;
    for (let n = 1; n < 1000; n += 1) {
      if (n % 3 === 0 || n % 5 === 0) {
        sum += n;
      }
    }

    expect(sum).toBe(FILL_ME_IN);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", () => {
    var sum = FILL_ME_IN; /* try chaining Array(length), map(), and reduce() */

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
  it("should count the ingredient occurrence", () => {
    var ingredientCount = { "{ingredient name}": 0 };

    for (const product of products) {
      for (const ingredient of product.ingredients) {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      }
    }

    expect(ingredientCount["mushrooms"]).toBe(FILL_ME_IN);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", () => {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", () => {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", () => {

  });

  it("should find the difference between the sum of the squares and the square of the sums", () => {

  });

  it("should find the 10001st prime", () => {

  });
  */
});
