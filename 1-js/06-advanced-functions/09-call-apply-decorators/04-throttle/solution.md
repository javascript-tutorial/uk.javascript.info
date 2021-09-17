```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Виклик `throttle(func, ms)` повертає `wrapper`.

1. Під час першого виклику `wrapper` просто викликає `func` і встановлює стан відпочинку (`isThrottled = true`).
2. У цьому стані всі виклики запам’ятовуються в `savedArgs/savedThis`. Зверніть увагу, що як контекст, так і аргументи однаково важливі, і повинні бути запам’ятованими. Нам потрібні вони їх одночасно, щоб відтворити виклик.
3. Після того, як `ms` мілісекунди проходять, `setTimeout` спрацьовує. Стан відпочинку знімається (`isThrottled = false`) і, якщо ми мали проігноровані виклики, `wrapper` виконується з останніми запам’ятовуваними аргументами та контекстом.

3-й крок запускає не `func`, а `wrapper`, тому що ми не тільки повинні виконувати `func`, але й ще раз вводити стан відпочинку та налаштовувати тайм-аут, щоб скинути його.
