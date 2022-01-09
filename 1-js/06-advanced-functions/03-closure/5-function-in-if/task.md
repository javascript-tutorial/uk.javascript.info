
# Функція у if

Подивіться на код. Яким буде результат виклику на останньому рядку?

```js run
let phrase = "Привіт";

if (true) {
  let user = "Іван";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
