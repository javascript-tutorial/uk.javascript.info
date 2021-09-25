Відповідь: **Іван**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "Іван"} ).bind( {name: "Христя"} );

f(); // Іван
```

Екзотичний об'єкт [прив'язаної функції](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) повертається від `f.bind(...)`, що запам'ятовує контекст (та аргументи, якщо передані) тільки під час створення. 

Функція не може бути переприв'язана.
