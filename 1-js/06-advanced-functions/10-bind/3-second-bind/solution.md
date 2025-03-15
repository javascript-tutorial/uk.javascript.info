Відповідь: **Іван**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "Іван"} ).bind( {name: "Христя"} );

f(); // Іван
```

`f.bind(...)` повертає [екзотичний об'єкт прив’язаної функції](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects), в якому запам’ятовується контекст (та аргументи, якщо передані) тільки під час створення. 

Функція не може бути переприв’язана.
