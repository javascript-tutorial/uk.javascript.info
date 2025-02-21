Рішення:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("тест"); // показує "тест" після 1000 мс
```

Зверніть увагу, як тут використовується стрілочна функція. Як відомо, стрілочні функції не мають власних `this` та `arguments`, тому `f.apply(this, arguments)` бере `this` та `arguments` з обгортки.

Якщо ми передамо звичайну функцію, `setTimeout` буде викликати її без аргументів, а `this=window` (припускаючи, що ми знаходимося в браузері).

Ми все ще можемо передати коректний `this` за допомогою проміжної змінної, але це трохи більш громіздко:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // зберігаємо this в проміжну змінну
    setTimeout(function() {
      f.apply(savedThis, args); // використовуємо її тут
    }, ms);
  };

}
```
