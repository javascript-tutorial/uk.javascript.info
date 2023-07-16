
Щоб отримати інформацію про користувачів, нам потрібно викликати : `fetch('https://api.github.com/users/USERNAME')`.

Якщо відповідь приходить із статусом `200`, то викликаємо метод `.json()`, щоб прочитати JS-об'єкт.

В іншому випадку, якщо `fetch` завершується помилкою, або код статусу у відповіді відмінний від 200, то просто повертаємо значення `null` у масиві результатів.

Ось код:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Потрібно звернути увагу на те, що виклик `.then` прикріплений до `fetch`, щоб коли відповідь отримана, то одразу починати зчитування даних за допомогою `.json()` не очікуючи завершення інших запитів.

Якщо, було б використано `await Promise.all(names.map(name => fetch(...)))` та викликали б `.json()` на результатах запитів, то треба було б чекати поки закінчилися всі запити. Викликаючи `.json()` одразу після кожного `fetch`, ми добились того, що зчитування надісланих по кожному окремому запиту відбуваєся незалежно від інших запитів.

Це приклад того, як відносно низько-рівневе Promise API може бути корисним, навіть якщо ми переважно використовуємо `async/await`.
