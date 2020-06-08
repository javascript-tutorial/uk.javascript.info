describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

<<<<<<< HEAD
  before(() => alert("Тестування розпочато – перед усіма тестами"));
  after(() => alert("Тестування завершено – після всіх тестів"));
=======
  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

  beforeEach(() => alert("Перед тестом – початок тесту"));
  afterEach(() => alert("Після тесту – вихід з тесту"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
