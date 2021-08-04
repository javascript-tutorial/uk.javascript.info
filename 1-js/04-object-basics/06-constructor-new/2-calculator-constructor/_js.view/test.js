
describe("calculator", function() {
  let calculator;
  before(function() {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });

  it("метод read запитує два значення за допомогою prompt і запам’ятовує їх у властивостях об’єкта", function() {
    assert.equal(calculator.a, 2);
    assert.equal(calculator.b, 3);
  });

  it("при введенні 2 і 3 сума дорівнює 5", function() {
    assert.equal(calculator.sum(), 5);
  });

  it("при введені 2 і 3, добуток дорівнює 6", function() {
    assert.equal(calculator.mul(), 6);
  });

  after(function() {
    prompt.restore();
  });
});
