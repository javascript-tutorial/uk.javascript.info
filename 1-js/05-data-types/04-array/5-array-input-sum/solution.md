Зверніть увагу на одну важливу річ у вирішенні цієї задачі. Ми не конвертуємо `value` в число одразу після `prompt`, тому що одразу після операції `value = +value` ми не зможемо відрізнити порожній рядок (зупинення роботи функції) від нуля (дійсне число). Тому ми робимо це пізніше.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Введіть, будь ласка, номер", 0);

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
