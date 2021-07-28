
Ми отримали помилку тому, що `map.keys()` повертає об'єкт-ітератор, а не масив.

Ми можемо конвертувати його використовуючи `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
