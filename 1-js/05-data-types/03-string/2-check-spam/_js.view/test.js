describe("checkSpam", function() {
  it('знаходить спам у "buy ViAgRA now"', function() {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('знаходить спам у "free xxxxx"', function() {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('не знаходить спам у "innocent rabbit"', function() {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});
