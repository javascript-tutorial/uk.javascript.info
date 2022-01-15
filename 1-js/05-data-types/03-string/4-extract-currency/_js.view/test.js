describe("extractCurrencyValue", function() {

  it("для рядка $120 повертає число 120", function() {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });


});
