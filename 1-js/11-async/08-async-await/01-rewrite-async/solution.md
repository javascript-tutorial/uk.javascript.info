
Примітки наведено під кодом:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Примітки:

1. Функція `loadJson` стає `async`-функцією.
2. Усі `.then` всередині замінюються на `await`.
3. Ми можемо зробити `return response.json()` замість того, щоб чекати його, наприклад:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Тоді зовнішній код повинен був би чекати `await`, поки цей проміс буде виконано. У нашому випадку це не має значення.
4. Помилка, викликана `loadJson`, обробляється `.catch`. Ми не можемо використовувати там `await loadJson(…)`, тому що ми не використовуємо `async`-функцію.