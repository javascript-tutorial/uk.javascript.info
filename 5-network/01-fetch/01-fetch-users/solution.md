
Щоб отримати інформацію про користувачів, нам потрібно викликати : `fetch('https://api.github.com/users/USERNAME')`.

Якщо відповідь приходить із статусом `200`, то викликаємо метод `.json()`, щоб прочитати JS-об'єкт.

В іншому випадку, якщо `fetch` завершуєся помилкою, або код статусу у відповідді має відмінність від 200, то просто буде повернуто значення `null` у масиві результатів.

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

Потрібно звернути увагу на те, що виклик `.then` прикріплений до `fetch`, щоб коли відповідь отримана, то зразу починати зчитування даних за допомогою `.json()` не очікуючи завершення інших запитів.

Якщо, було би використано `await Promise.all(names.map(name => fetch(...)))`та викликали би `.json()` на результатах запитів, то треба було би чекати поки закінчилися всі із них. Викликаючи `.json()` зразу після кожного `fetch`, ми добились того, що зчитування надісланих по кожному запиту даних відбуваєся незалежно від інших запитів.

Це приклад того, як відносно низько-рівневе Promiese API може бути корисним, навіть якщо ми в основному використовуємо `async/await` у коді.
