describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

<<<<<<< HEAD
   // Зазвичай Mocha очікує 2 секунди, щоб завершилися тести, перші ніж вважати їх неправильними
=======
  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

  this.timeout(200000); // Цим кодом ми збільшуємо час очікування - до 200 000 мілісекунд

  // Збільшуємо час через те, що виконується функція "alert": тому що якщо довго натискати кнопку "OK", тест провалиться!

  before(() => alert("Тестування розпочато – перед усіма тестами"));
  after(() => alert("Тестування завершено – після всіх тестів"));

  beforeEach(() => alert("Перед тестом – початок тесту"));
  afterEach(() => alert("Після тесту – вихід з тесту"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
