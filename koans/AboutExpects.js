describe('About Expects', function() {

  // These are tests. In programming, we also call them 'specs'.
  // Specs are expectations of what is true.
  it('should expect true', function() {

    // Your journey begins here: Replace the word false with true 
    expect(false).toBeTruthy();
  });

  // Is the actual value what we expect? Replace FILL_ME_IN with the value
  // that we expect.
  it('should expect equality', function() {
    var expectedValue = FILL_ME_IN;
    var actualValue = 1 + 1;

    // What do you think === does?
    expect(actualValue === expectedValue).toBeTruthy();
  });

  // Some ways of testing truth are better than others. What is different
  // about the below test versus the above test?
  it('should assert equality a better way', function() {
    var expectedValue = FILL_ME_IN;
    var actualValue = 1 + 1;

  // toEqual() uses regular equality to compare two values. Does 2 equal 1 + 1?
    expect(actualValue).toEqual(expectedValue);
  });

  // Sometimes you need to be precise about what you "type."
  it('should assert equality with ===', function() {
    var expectedValue = FILL_ME_IN;

    // A string can be any text or characters inside double or single quotes.
    // What do you think toString() does?
    var actualValue = (1 + 1).toString();

  // toBe() will always use === to compare.
    expect(actualValue).toBe(expectedValue);
  });

  // You can also simply write in the values.
  it('should have filled in values', function() {
    expect(1 + 1).toEqual(FILL_ME_IN);
  });
});
