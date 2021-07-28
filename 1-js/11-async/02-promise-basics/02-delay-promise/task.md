
# Затримка на промісах

Вбудована функція `setTimeout` використовує колбек-функції. Створіть альтернативу яка базується на промісах.

The function `delay(ms)` should return a promise. That promise should resolve after `ms` milliseconds, so that we can add `.then` to it, like this:

Функція `delay(ms)` повинна повертати проміс, який перейде в стан `resolved` через `ms` мілісекунд, так щоб ми могли додати до нього `.then`:

```js
function delay(ms) {
  // ваш код
}

delay(3000).then(() => alert('виконалось через 3 секунди'));
```
