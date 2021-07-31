Ідея проста: відняти від `date` дане число кількості днів:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Але функція не повинна змінювати `date`. Це важливо, тому що зовнішній код, який дає нам дату, не очікує, що вона зміниться.

Щоб реалізувати це, клонуймо дату, наступним чином:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 січня 2015)
alert( getDateAgo(date, 2) ); // 31, (31 грудня 2014)
alert( getDateAgo(date, 365) ); // 2, (2 січня 2014)
```
