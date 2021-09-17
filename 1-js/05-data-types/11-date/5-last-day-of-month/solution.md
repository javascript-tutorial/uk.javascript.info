Створімо дату, використовуючи наступний місяць, але передамо нуль, як день:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Зазвичай дати починаються з 1, але технічно ми можемо передати будь-яке число, дата автоматично відрегулює себе. Отже, коли ми передаємо 0, то це означає "за день до 1-го дня місяця", іншими словами: "останній день попереднього місяця".