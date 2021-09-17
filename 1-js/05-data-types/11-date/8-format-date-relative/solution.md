Щоб отримати час від `date` дотепер -- давайте віднімемо дати.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // різниця в мілісекундах

  if (diff < 1000) { // менше 1 секунди
    return 'прямо зараз';
  }

  let sec = Math.floor(diff / 1000); // перетворити різницю до секунд

  if (sec < 60) {
    return sec + ' сек. назад';
  }

  let min = Math.floor(diff / 60000); // перетворити різницю до хвилин
  if (min < 60) {
    return min + ' хв. назад';
  }

  // форматувати дату
  // додати нулі до однозначних днів/місяців/годин/хвилин
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // отримати останні 2 цифри кожного компоненту

  // з’єднати компоненти в дату
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "прямо зараз"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 хв. назад"

// вчорашня дата, як 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

Альтернативне рішення:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // форматування
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'прямо зараз';  
  } else if (diffMin < 1) {
    return `${diffSec} сек. назад`
  } else if (diffHour < 1) {
    return `${diffMin} хв. назад`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
