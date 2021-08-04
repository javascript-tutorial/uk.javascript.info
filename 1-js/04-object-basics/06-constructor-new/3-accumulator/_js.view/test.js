describe("Accumulator", function() {

  beforeEach(function() {
    sinon.stub(window, "prompt")
  });

  afterEach(function() {
    prompt.restore();
  });

  it("початкове значення - це аргумент конструктора", function() {
    let accumulator = new Accumulator(1);

    assert.equal(accumulator.value, 1);
  });

  it("після прочитання 0 значення дорівнює 1", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("0");
    accumulator.read();
    assert.equal(accumulator.value, 1);
  });

  it("після прочитання 1 значення дорівнює 2", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("1");
    accumulator.read();
    assert.equal(accumulator.value, 2);
  });
});
