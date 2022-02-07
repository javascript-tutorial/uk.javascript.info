
# Перепишіть, використовуючи async/await

Перепишіть цей приклад коду з розділу <info:promise-chaining>, використовуючи `async/await` замість `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
```
