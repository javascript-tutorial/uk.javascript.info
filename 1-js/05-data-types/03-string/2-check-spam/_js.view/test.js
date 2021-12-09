describe("checkSpam", function() {
  it('знайдено спам у "buy ViAgRA now"', function() {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('знайдено спам у "free xxxxx"', function() {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('не знайдено спам у "innocent rabbit"', function() {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});
