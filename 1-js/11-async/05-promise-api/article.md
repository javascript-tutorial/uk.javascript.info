# Promise API

У класі `Promise` існують 6 статичних методів. Тут ми швидко розглянемо варіанти їх використання.

## Promise.all

Скажімо, ми хочемо, щоб багато промісів виконувались паралельно і чекали, поки всі вони виконаються.

Наприклад, завантажити кілька URL-адрес паралельно та опрацювати результат, коли всі вони будуть готові.

Ось для чого знадобиться `Promise.all`.

Синтаксис:

```js
let promise = Promise.all(iterable);
```

`Promise.all` приймає ітеративний об'єкт (зазвичай масив промісів) і повертає новий проміс.

Новий проміс завершиться тоді, коли всі перераховані проміси завершаться, а його результатом стане масив їхніх результатів.

Наприклад, нижченаведений `Promise.all` виконається через 3 секунди, а потім його результатом буде масив `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // коли всі проміси виконаються, результат буде 1,2,3: кожен проміс надає елемент масиву
```

Будь ласка, зверніть увагу, що порядок елементів масиву такий самий, як у вихідних промісах. Навіть якщо для завершення першого проміса потрібно буде найбільше часу, його результат все одно буде першим в масиві.

Поширений трюк - пропустити масив даних через map-функцію, яка для кожного елемента створить задачу-проміс, а потім загорне отриманий результат в `Promise.all`.

Наприклад, якщо у нас є масив URL-адрес, то ми можемо отримати їх усі ось так:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// перетворює кожну URL-адресу в проміс, що повертається fetch
let requests = urls.map(url => fetch(url));

// Promise.all буде очікувати виконання всіх промісів
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

А ось приклад помасштабніше, з отриманням інформації про користувачів для масиву користувачів GitHub за їхніми іменами (ми могли б отримати масив товарів за їхніми ідентифікаторами, логіка та ж):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // всі проміси успішно завершені
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // покаже 200 для кожного посилання
    }

    return responses;
  })
  // перетворить масив відповідей response у response.json(), щоб прочитати їхній зміст
  .then(responses => Promise.all(responses.map(r => r.json())))
  // всі JSON-відповіді опрацьовані: "users" - масив з результатами
  .then(users => users.forEach(user => alert(user.name)));
```

**Якщо будь-який з промісів завершується з помилкою, то проміс, що поверне `Promise.all`, негайно завершиться з цією ж помилкою.**

Наприклад:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Упс!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Упс!
```

Тут другий проміс завершиться з помилкою через дві секунди. Це призведе до негайної помилки в `Promise.all`, тому виконається `.catch`: помилка цього проміса стає результатом всього `Promise.all`.

```warn header="У разі помилки інші проміси ігноруються"
Якщо один проміс завершується з помилкою, то весь `Promise.all` негайно завершується з нею ж, повністю забувши про інші проміси у списку. Їх результати ігноруються.

Наприклад, якщо є кілька викликів `fetch`, як у наведеному вище прикладі, і один з них не виконався, інші продовжуватимуть виконуватися, але `Promise.all` більше не переглядатиме їх. Ймовірно, вони так чи інакше завершаться, але їхні результати будуть проігноровані.

`Promise.all` не робить нічого для їх скасування, оскільки в обіцянках немає поняття "скасування". У главі [Fetch: переривання запиту](info:fetch-abort) ми розглянемо `AbortController`, який може допомогти з цим, але він не є частиною Promise API.
```

````smart header="`Promise.all(iterable)` дозволяє передавати не-проміси в `iterable` (об'єкт, що перебирається)"
Зазвичай `Promise.all(...)` приймає ітераційний об'єкт промісів (у більшості випадків масив). Але якщо будь-який з цих об'єктів не є промісом, він передається в результуючий масив «як є».

Наприклад, тут результат `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Таким чином, ми можемо передавати вже готові значення в `Promise.all`, коли це зручно.
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` повністю завершується з помилкою, якщо завершується з помилкою будь-який проміс. Це підходить для випадків "все або нічого", коли нам потрібні *всі* успішні результати, щоб продовжити:
```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // методу render потрібні результати всіх fetch
```

`Promise.allSettled` просто чекає, коли всі проміси завершаться, незалежно від результату. В отриманому масиві буде:

- `{status:"fulfilled", value:result}` для успішних відповідей,
- `{status:"rejected", reason:error}` для помилок.

Наприклад, ми хочемо отримати інформацію про кількох користувачів. Навіть якщо один запит не вдасться, ми все одно зацікавлені в інших.

Використаємо для цього `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

Масив `results` у рядку `(*)` буде таким:
```js
[
  {status: 'fulfilled', value: ...об'єкт відповіді...},
  {status: 'fulfilled', value: ...об'єкт відповіді...},
  {status: 'rejected', reason: ...об'єкт помилки...}
]
```

Тож для кожного проміса ми отримуємо його статус і `value/error`.

### Поліфіл

Якщо браузер не підтримує `Promise.allSettled`, для нього легко зробити поліфіл:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

У цьому коді `promises.map` приймає вхідні значення, перетворює їх на проміси (на випадок, якщо було передано не-проміс) за допомогою `p => Promise.resolve(p)`, а потім додає опрацьовувач `.then` до кожного.

Цей опрацьовувач перетворює успішний результат `value` в `{status:'fulfilled', value}`, а помилку `reason` в `{status:'rejected', reason}`. Саме такий формат `Promise.allSettled`.

Тепер ми можемо використовувати `Promise.allSettled`, щоб отримати результати *всіх* наданих промісів, навіть якщо деякі з них повертаються з помилкою.

## Promise.race

Подібний до `Promise.all`, але чекає лише на перший виконаний проміс та отримує його результат (або помилку).

Синтаксис:

```js
let promise = Promise.race(iterable);
```

Наприклад, тут результат буде `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Упс!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Найшвидшим тут був перший проміс, тому він і став результатом. Після того, як перший виконаний проміс «перемагає», всі подальші результати/помилки ігноруються.


## Promise.any

Схожий на `Promise.race`, але чекає лише на перший успішно виконаний проміс і отримує його результат. Якщо ж всі надані проміси завершуються з помилкою, то повертається проміс, що завершується з помилкою за допомогою [`AggregateError`](mdn:js/AggregateError) - спеціального об'єкта помилки, який зберігає всі помилки промісів у своїй властивості `errors`.

Синтаксис:

```js
let promise = Promise.any(iterable);
```

Наприклад, тут результат буде `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Упс!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Перший проміс тут був найшвидшим, але завершився з помилкою, тож результатом став другий проміс. Після того, як перший виконаний проміс «перемагає», усі подальші результати ігноруються.

Ось приклад, коли всі проміси не виконуються:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ой!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Помилка!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ой!
  console.log(error.errors[1]); // Error: Помилка!
});
```

Як бачите, об'єкти помилок для невдалих промісів доступні по властивості `errors` об'єкта `AggregateError`.

## Promise.resolve/reject

Методи `Promise.resolve` і `Promise.reject` рідко потрібні в сучасному коді, тому що синтаксис `async/await` (ми розглянемо його [трохи пізніше](info:async-await)) робить їх дещо застарілими.

Ми розглянемо їх тут для повноти та для тих, хто з якихось причин не може використовувати `async/await`.

### Promise.resolve

`Promise.resolve(value)` створює вирішений проміс із результатом `value`.

Те ж саме, що:

```js
let promise = new Promise(resolve => resolve(value));
```

Цей метод використовується для сумісності, коли очікується, що функція поверне проміс.

Наприклад, наведена нижче функція `loadCached` отримує URL-адресу та запам'ятовує (кешує) її вміст. Для майбутніх викликів з тією самою URL-адресою він негайно отримує попередній вміст із кешу, але використовує `Promise.resolve`, щоб значення, яке повертається, завжди було промісом:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Ми можемо написати `loadCached(url).then(…)`, оскільки функція гарантовано поверне проміс. Ми завжди можемо використовувати `.then` після `loadCached`. Це мета `Promise.resolve` у рядку `(*)`.

### Promise.reject

`Promise.reject(error)` створює проміс, що завершується помилкою `error`.

Те ж саме, що:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

На практиці цей метод майже не використовується.

## Підсумки

Існує 6 статичних методів класу `Promise`:

1. `Promise.all(promises)` -- чекає виконання всіх промісів і повертає масив їх результатів. Якщо будь-який з наданих промісів завершується з помилкою, вона стає загальною для `Promise.all`, а всі інші результати ігноруються.
2. `Promise.allSettled(promises)` (нещодавно доданий метод) -- чекає завершення всіх промісів і повертає їх результати у вигляді масиву об'єктів, до якого входять:
    - `status`: `"fulfilled"` або `"rejected"`
    - `value` (якщо виконано успішно) або `reason` (якщо помилка).
3. `Promise.race(promises)` -- чекає виконання першого проміса, а його результат/помилка стає остаточним результатом.
4. `Promise.any(promises)` (нещодавно доданий метод) -- чекає виконання першого проміса, а його результат стає остаточним результатом. Якщо всі надані проміси завершуються з помилкою, [`AggregateError`](mdn:js/AggregateError) стає загальною помилкою `Promise.any`.
5. `Promise.resolve(value)` -- повертає успішно виконаний проміс із заданим значенням.
6. `Promise.reject(error)` -- повертає проміс із заданою помилкою.

З усіх цих методів `Promise.all`, мабуть, найпоширеніший на практиці.
