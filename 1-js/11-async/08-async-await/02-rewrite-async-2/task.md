
# Перепишіть "rethrow", використовуючи async/await

Нижче ви можете знайти приклад "rethrow". Перепишіть його, використовуючи `async/await` замість `.then/catch`.

І позбудьтеся від рекурсії на користь циклу в `demoGithubUser`: за допомогою `async/await` це буде легко зробити.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Запитуйте ім’я користувача, поки github не поверне дійсного користувача
function demoGithubUser() {
  let name = prompt("Введіть ім’я?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Ім’я та прізвище: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого користувача не існує, будь ласка, введіть ще раз.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
