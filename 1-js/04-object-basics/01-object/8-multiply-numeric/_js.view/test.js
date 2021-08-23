describe("multiplyNumeric", function () {
  it("множить всі числові властивості на 2", function () {
    let menu = {
      width: 200,
      height: 300,
      title: "Моє меню"
    };
    let result = multiplyNumeric(menu);
    assert.equal(menu.width, 400);
    assert.equal(menu.height, 600);
    assert.equal(menu.title, "Моє меню");
  });

  it("нічого не повертає", function () {
    assert.isUndefined(multiplyNumeric({}));
  });

});
