Будь-ласка, зверніть увагу на одну важливу деталь у вирішенні цієї задачі.Ми не конвертуємо `value` в число одразу після `prompt`, тому, що одразу після операції `value = +value` ми не зможемо відрізнити порожню строку (зупинення роботи функції) від нулю (валідне число). Тому ми робимо це пізніше.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // Обриваємо введення даних?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

