Важливість: 5

---

# Чи лічильники незалежні?

Тут ми створюємо два лічильника: `counter` та `counter2` використовуючи однакову функцію `makeCounter`.

Вони незалежні? Що покаже другий лічильник? `0,1` чи `2,3` чи щось інше?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

