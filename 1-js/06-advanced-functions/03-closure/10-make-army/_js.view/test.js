describe("army", function() {

  let army;
  
  before(function() {
    army = makeArmy();
    window.alert = sinon.stub(window, "alert");
  });

  it("army[0] показує 0", function() {
    army[0]();
    assert(alert.calledWith(0));
  });


  it("army[5] показує 5", function() {
    army[5]();
    assert(alert.calledWith(5));
  });

  after(function() {
    window.alert.restore();
  });

});
