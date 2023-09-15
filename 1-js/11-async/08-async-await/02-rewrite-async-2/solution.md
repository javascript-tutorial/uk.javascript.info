
Тут немає ніяких хитрощів. Просто замініть `.catch` на `try..catch` всередині `demoGithubUser` і додайте `async/await`, де це потрібно:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Запитуйте ім'я користувача, поки github не поверне дійсного користувача
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Введіть ім'я?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // помилки немає, виходимо з циклу
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // цикл продовжиться після сповіщення
        alert("Такого користувача не існує, будь ласка, введіть ще раз.");
      } else {
        // невідома помилка, перепрокидуємо її
        throw err;
      }
    }      
  }


  alert(`Ім'я та прізвище: ${user.name}.`);
  return user;
}

demoGithubUser();
```
