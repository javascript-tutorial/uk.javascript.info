Відповідь: спочатку `1`, потім `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Виклик `alert` не повертає значення. Або, іншими словами, повертає `undefined`.

<<<<<<< HEAD
1. Перший АБО `||` обчислює його лівий операнд `alert(1)`. Це показує перше повідомлення з `1`.
2. `alert` повертає `undefined`, тому АБО переходить до другого операнда, шукаючи правдиве значення.
3. Другий операнд `2` є правдивим, тому виконання зупинено, повернуто `2` і потім показано зовнішнім alert.
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Не буде `3`, тому що обчислення на досягає `alert(3)`.
