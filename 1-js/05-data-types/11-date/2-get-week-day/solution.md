Метод `date.getDay()` повертає номер дня тижня, починаючи з неділі.

Зробімо масив днів тижня, щоб ми могли отримати відповідну назву дня за номером:

```js run demo
function getWeekDay(date) {
  let days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 січня 2014
alert( getWeekDay(date) ); // ПТ
```
