describe("ucFirst", function() {
  it('Перший символ у верхньому регістрі', function() {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Не вмирає на порожніх рядках", function() {
    assert.strictEqual(ucFirst(""), "");
  });
});
