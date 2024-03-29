Різниця стає очевидною, якщо ми подивимося на код всередині функції.

Поведінка відрізнятиметься, якщо код «раптово вийде» з блоку `try...catch`.

Наприклад, якщо всередині `try...catch` є `return`. Блок `finally` спрацює для "будь-якого" виходу з `try...catch`, навіть за допомогою `return` -- одразу після виходу з блоку `try...catch`, але перед передачею контролю кодові, що викликав цю функцію.

```js run
function f() {
  try {
    alert('початок');
*!*
    return "результат";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('очищення!');
  }
}

f(); // очищення!
```

...Або якщо є `throw`:

```js run
function f() {
  try {
    alert('початок');
    throw new Error("помилка");
  } catch (err) {
    // ...
    if("не можу обробити помилку") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('очищення!')
  }
}

f(); // очищення!
```

`finally` гарантує очищення. Очищення не спрацює, якщо ми просто додамо код в кінці функції `f`.
