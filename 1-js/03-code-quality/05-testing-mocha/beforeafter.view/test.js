describe("test", function() {

  before(() => alert("Тестування розпочато – перед усіма тестами"));
  after(() => alert("Тестування завершено – після всіх тестів"));

  beforeEach(() => alert("Перед тестом – початок тесту"));
  afterEach(() => alert("Після тесту – вихід з тесту"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
