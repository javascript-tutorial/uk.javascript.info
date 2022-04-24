
# Fetch: Переривання

Як ми знаємо, `fetch` повертає проміс. А в JavaScript, як правило, немає концепції "переривання" промісу. Отже, як ми можемо перервати поточний `fetch`? Наприклад, якщо дії користувача на нашому сайті вказують на те, що `fetch` більше не потрібен.

Для таких цілей є спеціальний вбудований об’єкт: `AbortController`. Його можна використовувати для переривання не тільки `fetch`, але й інших асинхронних завдань.

Його використання дуже просте:

## Об’єкт AbortController

Створімо контролер:

```js
let controller = new AbortController();
```

Контролер -- це надзвичайно простий об’єкт.

- Він має єдиний метод `abort()`,
- І єдину властивість `signal`, що дозволяє встановлювати на ньому обробники подій.

Коли викликається `abort()`:
- `controller.signal` генерує подію `"abort"`.
- Властивість `controller.signal.aborted` стає `true`.

Як правило, у нас є дві сторони в процесі:
1. Та, що виконує операцію, яку можна скасувати, встановлює прослуховувач на `controller.signal`.
2. Та, що скасовує: вона викликає `controller.abort()`, коли потрібно.

Ось повний приклад (поки що без `fetch`):

```js run
let controller = new AbortController();
let signal = controller.signal;

// Сторона, що виконує операцію, яку можна скасувати
// отримує об’єкт "signal"
// і налаштовує прослуховувач на тригер, коли викликається controller.abort()
signal.addEventListener('abort', () => alert("переривання!"));

// Інша сторона, що скасовує (в будь-який момент пізніше):
controller.abort(); // переривання!

// Подія запускається, і signal.aborted стає true
alert(signal.aborted); // true
```

Як ми бачимо, `AbortController` є лише засобом для передачі подій `abort`, коли для нього викликається `abort()`.

Ми могли б реалізувати такий самий тип прослуховування подій у нашому коді самостійно, без об’єкта `AbortController`.

Але цінним є те, що `fetch` знає, як працювати з об’єктом `AbortController`. Він інтегрований у нього.

## Використання з fetch

Щоб мати можливість скасувати `fetch`, передайте властивість `signal` у `AbortController` як параметр `fetch`:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

Метод `fetch` знає, як працювати з `AbortController`. Він прослуховуватиме події `abort` за `signal`.

Тепер, щоб перервати, викличте `controller.abort()`:

```js
controller.abort();
```

Ми закінчили: `fetch` отримує подію з `signal` і скасовує запит.

Коли `fetch` переривається, його проміс завершує виконання з помилкою `AbortError`, тому ми повинні обробити її, наприклад в `try..catch`.

Ось повний приклад із `fetch`, що переривається через 1 секунду:

```js run async
// перервати через 1 секунду
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // обробити abort()
    alert("Перервано!");
  } else {
    throw err;
  }
}
```

## AbortController є масштабованим

`AbortController` є масштабованим. Він дозволяє призупинити кілька `fetch` одночасно.

Ось приклад коду, який отримує багато `URL` паралельно та використовує один контролер, щоб скасувати їх усі:

```js
let urls = [...]; // список URL для паралельних fetch

let controller = new AbortController();

// масив промісів fetch
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// якщо controller.abort() викликається з будь-якого місця,
// він перериває всі fetch
```

Якщо у нас є власні асинхронні завдання, відмінні від `fetch`, ми можемо використовувати єдиний `AbortController`, щоб зупинити їх, разом із `fetch`.

Нам просто потрібно прослуховувати подію `abort` в наших завданнях:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // наше завдання
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // запити fetch
  signal: controller.signal
}));

// Чекаємо на виконання запитів fetch та наших завдань паралельно
let results = await Promise.all([...fetchJobs, ourJob]);

// якщо controller.abort() викликається з будь-якого місця,
// він перериває всі fetch та ourJob
```

## Підсумки

- `AbortController` -- це простий об’єкт, який генерує подію `abort` для своєї властивості `signal` під час виклику методу `abort()` (а також встановлює для `signal.aborted` значення `true`).
- `fetch` інтегрується з ним: ми передаємо властивість `signal` як параметр, а потім `fetch` прослуховує його, тому можна перервати цей `fetch`.
- Ми можемо використовувати `AbortController` у нашому коді. Взаємодія "виклик `abort()`" -> "прослуховування події `abort`" проста та універсальна. Ми можемо використовувати його навіть без `fetch`.
