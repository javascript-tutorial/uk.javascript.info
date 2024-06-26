Ми не можемо "замінити" перший символ, оскільки рядки в JavaScript незмінні.

Але ми можемо створити новий рядок на основі існуючого, з першим символом у верхньому регістрі:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Але є невелика проблема. Якщо `str` порожній рядок, то `str[0]` буде `undefined`, а оскільки `undefined` не має методу `toUpperCase()`, ми отримаємо помилку.

Найпростіший спосіб -- додати перевірку на порожній рядок, наприклад ось так:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("василь") ); // Василь
```
