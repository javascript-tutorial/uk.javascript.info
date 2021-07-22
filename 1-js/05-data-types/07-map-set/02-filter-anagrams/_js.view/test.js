function intersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

describe("aclean", function () {

  it("повертає тільки 1 слово для кожного набору анаграм", function () {
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    let result = aclean(arr);
    assert.equal(result.length, 3);

    assert.equal(intersection(result, ["nap", "PAN"]).length, 1);
    assert.equal(intersection(result, ["teachers", "cheaters", "hectares"]).length, 1);
    assert.equal(intersection(result, ["ear", "era"]).length, 1);

  });

  it("не враховує регістр", function () {
    let arr = ["era", "EAR"];
    assert.equal(aclean(arr).length, 1);
  });

});