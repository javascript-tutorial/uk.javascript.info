Щоб отримати кількість мілісекунд до завтра, ми можемо від "завтра 00:00:00" відняти поточну дату.

По-перше, ми створюємо це "завтра", а потім віднімемо:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // завтрашня дата
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // різниця в мс
  return Math.round(diff / 1000); // перетворити до секунд
}
```

Alternative solution:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Будь ласка, зверніть увагу, що у багатьох країнах є літній час, тому можуть бути дні з 23 або 25 годин. Ми можемо обробляти такі дні окремо.