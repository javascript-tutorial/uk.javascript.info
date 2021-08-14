Використовуючи `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Використовуючи оператор `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. У випадку рівності чисел `a == b` немає значення, що повертати.