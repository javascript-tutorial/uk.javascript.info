Так, це можливо.

Якщо функція повертає об’єкт, тоді `new` повертає його замість `this`.

Так функції `A` та `B` можуть, наприклад, повертати один і той самий об’єкт `obj`, визначений незалежно від цих функцій:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
