
# Fetch

JavaScript може відправляти мережеві запити на сервер та підвантажувати нову інформацію за потребою.

Наприклад, можна використовувати мережевий запит, щоб:

- Відправляти замовлення,
- Завантажити інформацію про користувача,
- Отримати останні оновлення з сервера,
- ...і т.д.

...І все це без перезавантаження сторінки!

Є загальний термін "AJAX" (абревіатура від <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) для мережевих запитів від JavaScript коду. Але формат XML використовувати не обов’язково: цей термін застарілий, тому це слово (XML) тут. Можливо, ви вже його десь чули.

Є кілька способів надіслати мережевий запит і отримати інформацію з сервера.

Метод `fetch()` -- сучасний та дуже потужний, тому почнемо з нього. Він не підтримується старими (можна використовувати поліфіл), але підтримується всіма сучасними браузерами.

Базовий синтаксис:

```js
let promise = fetch(url, [options])
```

- **`url`** -- URL для відправлення запиту.
- **`options`** -- додаткові параметри: метод, заголовки і т.д.

Без `options`, це просто GET запит, який завантажує зміст за адресою `url`.

Браузер одразу починає робити запит та повертає проміс, який зовнішний код використовує для отримання результату.

Процес отримання запиту зазвичай відбувається у два етапи.

**По-перше, `promise` завершиться із об'єктом вбудованого класу [Response](https://fetch.spec.whatwg.org/#response-class) у якості результату, одразу коли сервер надішле заголовки відповіді.**

На цьому етапі можна перевірити статус HTTP-запиту, та визначити, чи виконався він успішно, а також переглянути заголовки, але покищо без тіла запиту.

Проміс закінчується помилкою, якщо `fetch` не зміг виконати HTTP-запит, наприклад, через помилку мережі або, якщо такого сайту не існує. Ненормальні HTTP-статуси, як 404 та 500, не викликатимуть помилку.

Ми можемо побачити HTTP-статус у властивостях відповіді:

- **`status`** -- код статуса HTTP-запиту, наприклад, 200.
- **`ok`** -- логічне значення, котре буде `true`, якщо код HTTP-статосу в діапазоні 200-299.

Наприклад:

```js
let response = await fetch(url);

if (response.ok) { // якщо HTTP-статус у діапазоні 200-299
  // отримання тіла запиту (див. про цей метод нижче)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**По друге, для отримання тіла запиту, потрібно використовувати додатковий виклик методу.**

`Response` надає декілька методів, які повертають проміс, для доступу до тіла запиту в різних форматах:

- **`response.text()`** -- читає відповід та повертає, як звичайний текст,
- **`response.json()`** -- декодує відповідь у форматі JSON,
- **`response.formData()`** -- повертає відповідь, як об'єкт `FormData` (він буде розглянутий [у наступному розділі](info:formdata)),
- **`response.blob()`** -- повертає відповідь, як [Blob](info:blob) (бінарні дані з типом),
- **`response.arrayBuffer()`** -- повертає відповідь, як [ArrayBuffer](info:arraybuffer-binary-arrays) (низькорівневе представлення двійкових даних),
- крім того, `response.body` це об'єкт [ReadableStream](https://streams.spec.whatwg.org/#rs-class), за допомогою якого можна отримувати (зчитувати) тіло відповіді частинами. Такий приклад буде розглянуто трохи пізніше.

Наприклад, буде отримано JSON-об'єкт з останніми комітами із репозиторію GitHub:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // read response body and parse as JSON
*/!*

alert(commits[0].author.login);
```

Те саме буде отримано без `await`, із використанням промісів:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Для отримання відповіді у вигляді тексту, використано `await response.text()` замість `.json()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // read response body as text

alert(text.slice(0, 80) + '...');
```

Для прикладу роботи із бінарними даними, буде зроблено запит та виведено на екран логотип [специфікації "fetch"](https://fetch.spec.whatwg.org) (див. розділ [Blob](info:blob), щоб дізнатись детальніше про операції із `Blob`):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // скачати, як Blob об'єкт
*/!*

// створення <img> для нього
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// виведення на екран
img.src = URL.createObjectURL(blob);

setTimeout(() => { // приховування через три секунди
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Можна вибрати тільки один метод читання відповіді.

Якщо, було отримано відповід із `response.text()`, тоді `response.json()` не спрацює, бо дані вже були оброблені..

```js
let text = await response.text(); // читаємо тіло відповіді
let parsed = await response.json(); // завершується помилкою, бо дані вже прочитані
```
````

## Заголовки відповіді

Заоголовки відповіді зберігаются у схожому на Map об'єкті `response.headers`.

Це не зовсім `Map`, але можна використовувати такі самі методи, щоб отримати заголовок за його назвою або перебрати заголовки у циклі:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// отримання одного заголовку
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// перебір усіх заголовків
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## Заголовки запиту

Для встановлення заголовка запиту в `fetch`, можна використати властивість `headers` в об'єкті `options`. Вона містит об'єкт з вихідними заголовками, наприклад:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

...Але існує список [заборонених HTTP заголовків](https://fetch.spec.whatwg.org/#forbidden-header-name), які не можна встановити:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Ці заголовки забезпечуют достовірність HTTP, через це вони контролюются і встановлюються лише браузером.

## POST запити

Для відправлення `POST` запиту або запиту з іншим методом, треба використати `fetch` параметри:

- **`method`** -- HTTP-метод, наприклад `POST`,
- **`body`** -- тіло запиту, щось одне із списку:
  - рядок (наприклад, у форматі JSON),
  - об'єкт `FormData`, для відправки даних як `multipart/form-data`,
  - `Blob`/`BufferSource` для відправлення бінарних даних,
  - [URLSearchParams](info:url), для відправлення даних у кодуванні `x-www-form-urlencoded`, використовуєся рідко.

Частіше використовуєся JSON формат.

Наприклад, цей код відправляє об'єкт `user` як JSON:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Зверніть увагу, якщо тіло запиту `body` -- рядок, то заголовок `Content-Type` типово буде `text/plain;charset=UTF-8` .

Але, оскільки ми надсилаємо дані у форматі JSON, то через `headers` ми маємо встановити значення `application/json` -- правильний `Content-Type` для JSON формату.

## Відправлення зображення

Можна відправити бінарні дані за допомогою `fetch`, використовуючи об'єкт `Blob` або `BufferSource`.

У прикладі нище, є елемент `<canvas>`, на котрому можна малювати рух мишки. При натисканні на кнопку "відправити", то зображен буде відправлено на сервер:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // сервер відповідає підтвердженням та розміром зображення
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Зауваження, тут не потрібно вручну встановлювати заголовок `Content-Type`, бо об'єкт `Blob` вбудований тип (буде використано `image/png`, заданий через `toBlob`). Під час відправлення об'єктів `Blob`, він автоматично стає значенням `Content-Type`.

Функція `submit()` може бути переписана без `async/await`, наприклад наступним чином:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Підсумки

Типовий запит за допомогою `fetch` складаєся із двох операторів `await`:

```js
let response = await fetch(url, options); // завершення із заголовками відповіді
let result = await response.json(); // читання тіла у форматі json
```

Або без `await`:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Параметри відповіді:
- `response.status` -- HTTP-статус відповіді,
- `response.ok` -- `true`, якщо статус відповіді у діапазоні 200-299.
- `response.headers` -- схожий на `Map`об'єкт із HTTP заголовками.

Методи для отримання тіла відповіді:
- **`response.text()`** -- повертає відповід, як звичайний текст,
- **`response.json()`** -- декодує відповідь у форматі JSON,
- **`response.formData()`** -- повертає відповідь як об'єкт `FormData` (кодування `multipart/form-data`, див. у наступному розділі),
- **`response.blob()`** -- повертає об'єкт як [Blob](info:blob) (бінарні дані з типом),
- **`response.arrayBuffer()`** -- повертає відповідь як [ArrayBuffer](info:arraybuffer-binary-arrays) (низько рівневі бінарні дані),

Опції `fetch`, які ми розглянули:
- `method` -- HTTP-метод,
- `headers` -- об'єкт із заголовками запиту (не всі заголовки дозволені),
- `body` -- дані для відправлення (тіло запиту) у вигляді тексту `string`, `FormData`, `BufferSource`, `Blob` або `UrlSearchParams` об'єкт.

У наступних розділах буде розглянуто більше параметрів та варіантів використання `fetch`.
