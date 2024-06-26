За визначенням, факторіал `n!` може бути записаний як `n * (n-1)!`.

Інакше кажучи, результат `factorial(n)` може бути розрахований, як `n` помножений на результат `factorial(n-1)`. І виклик до `n-1` може рекурсивно спускатися нижче та нижче, аж до `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Базисом рекурсії є значення `1`. Ми також можемо зробити `0` базисом, це не має великого значення, але дає ще один рекурсивний крок:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
