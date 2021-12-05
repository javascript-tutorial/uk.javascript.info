
Це той випадок, коли корисно знати, як воно працює всередині.

Просто трактуйте виклик `async` як проміс та додайте до нього `.then`:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // покаже 10 через 1 секунду
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
