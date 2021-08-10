importance: 2

---

# Дві функції - один об’єкт

Чи можливо створити функції `A` та `B`, щоб `new A() == new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Якщо так -- наведіть приклад коду таких функцій.
