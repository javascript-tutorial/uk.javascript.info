describe("pow", function() {

  describe("підносить x до степеня 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} піднесене до степеня 3 дорівнює ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  // ... тут можна додати більше тестів з "describe" та "it"
});
