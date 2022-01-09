importance: 5

---

# Дивний instanceof

Чому `instanceof` повертає `true` у коді нижче? Ми можемо легко побачити, що `a` не створюється `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
