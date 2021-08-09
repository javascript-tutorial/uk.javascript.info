importance: 2

---

# Дві функції - один об’єкт

<<<<<<< HEAD
Чи можливо створити функції `A` та `B`, щоб `new A() == new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Якщо так -- наведіть приклад коду таких функцій.
