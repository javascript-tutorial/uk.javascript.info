describe("Порожньо?", function() {
  it(`повертає "true" для порожнього об’єкта`, function() {
    assert.isTrue(isEmpty({}));
  });

  it(`повертає "false" якщо властивість існує`, function() {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});