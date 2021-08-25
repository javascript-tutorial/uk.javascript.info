```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('виконалось через 3 секунди'));
```

Зауважте що `resolve` викликається без аргументів. Ми нічого не повертаємо з `delay`, просто гарантуємо затримку.
