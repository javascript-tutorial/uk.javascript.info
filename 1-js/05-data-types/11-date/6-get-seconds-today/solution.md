Щоб отримати кількість секунд, ми можемо створити дату, використовуючи поточний день та час 00:00:00, а потім відняти його від "зараз".

Різниця -- це кількість мілісекунд з початку дня, яку ми повинні розділити на 1000, щоб отримати секунди:

```js run
function getSecondsToday() {
  let now = new Date();

  // створити об’єкт, використовуючи поточний день/місяць/рік
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // мс різниця
  return Math.round(diff / 1000); // зробити секунди
}

alert( getSecondsToday() );
```

Альтернативне рішення полягає в тому, щоб отримати години/хвилини/секунди та конвертувати їх до секунд:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
