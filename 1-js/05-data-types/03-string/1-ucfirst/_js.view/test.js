describe("ucFirst", function() {
  it('Перетворює перший символ у верхній регістр', function() {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it('Не вмирає на порожніх рядках', function() {
    assert.strictEqual(ucFirst(""), "");
  });
});
