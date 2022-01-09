# Помилка в setTimeout

Що ви думаєте? Чи виконається `.catch`? Поясніть свою відповідь.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```