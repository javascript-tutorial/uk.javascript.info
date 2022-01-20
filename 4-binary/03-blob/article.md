# Blob

`ArrayBuffer` разом з об’єктами представлень, як частина JavaScript, описані в ECMA стандарті.

Також в браузерах специфікацією [File API](https://www.w3.org/TR/FileAPI/) визначено додаткові високорівневі об’єкти для роботи з даними, зокрема `Blob`.

`Blob` складається з необов’язкового рядку `type` (зазвичай MIME тип) та `blobParts` -- послідовності інших `Blob` об’єктів, рядків та `BufferSource`.

![](blob.svg)

Приклад синтаксису конструктору:

```js
new Blob(blobParts, options);
```

- **`blobParts`** масив, що може містити значення типу `Blob`/`BufferSource`/`String`.
- **`options`** необов’язковий об’єкт з властивостями:
  - **`type`** -- рядок, що дозволяє додати тип для `Blob`, переважно використовується MIME тип, наприклад, `image/png`,
  - **`endings`** -- визначає чи потрібно привести всі символи нового рядку, при створенні `Blob`, у відповідність до формату поточної операційної система (`\r\n` або `\n`). Типове значення `"transparent"` (не вносити змін), але якщо потрібно внести зміни, то необхідно вказати `"native"`.

Наприклад:

```js
// створення Blob з рядку
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// зверніть увагу: першим аргументом повинен бути масив [...]
```

```js
// створення Blob з типізованого масиву і рядку
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" в бінарному форматі

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


Отримати зріз з `Blob` можна наступним чином:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- початковий байт, типове значення 0.
- **`byteEnd`** -- останній байт (не включно, типово до кінця).
- **`contentType`** -- визначає `type` нового об’єкту, типове значення буде таким же, як у початкових даних.

Аргументи такі ж самі, як у `array.slice`, від’ємні числа теж можна використовувати.

```smart header="`Blob` об’єкти незмінні"
Дані в `Blob` не можуть бути зміненими, але ми можемо зробити зріз з їх частини, створити новий `Blob` з них, змішати їх в новий `Blob` і так далі.

Поведінка відповідає рядкам в JavaScript, ми не можемо змінити якийсь символ в рядку, але ми можемо створити новий.
```

## Blob як URL

Blob можна використати як URL для показу вмісту HTML тегів `<a>`, `<img>` або інших.

`Blob` об’єкти можливо легко завантажити/вивантажити, під час запиту значення поля `type` буде використано в заголовку `Content-Type`.

Розгляньмо простий приклад. Після кліку на посилання ви завантажите динамічно згенерований `Blob`, як файл з `hello world` всередині.

```html run
<!-- атрибут download змішує браузер завантажити вміст замість відкриття сторінки -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Посилання також можна створити динамічно в JavaScript та імітувати клік за допомогою `link.click()`, після чого завантаження розпочнеться автоматично.

Ось приклад коду, що дозволяє користувачу завантажити динамічно створений `Blob` без HTML:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL` отримує аргументом `Blob` та створює унікальний URL для нього у форматі `blob:<origin>/<uuid>`.

Ось як виглядає значення `link.href`:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

Для кожного URL, що створено за допомогою `URL.createObjectURL`, браузер зберігає відображення URL -> `Blob`. Тому такі URL короткі, але дозволяють отримати доступ до `Blob`.

Згенерований URL, разом з посиланням на нього, існує тільки всередині поточної сторінки, доки вона відкрита. Це дозволяє посилатися на `Blob` в тегах `<img>`, `<a>` або будь-якому об’єкті, що очікує URL.

Але це спричиняє побічний ефект. Доки існує посилання на `Blob` у відображенні, `Blob` повинен залишатися в пам’яті. Браузер не може вивільнити пам’ять, що зайнята `Blob`.

Відображення автоматично очищується, коли сторінка закривається. Тому, якщо потрібно, щоб застосунок довго був активний -- очищення пам’яті може трапитися нескоро.

**Тому після створення URL `Blob` буде залишатися в пам’яті навіть, якщо не потрібен.**

`URL.revokeObjectURL(url)` видаляє посилання у внутрішньому відображенні, що дозволяє видалити `Blob` (якщо немає інших посилань на нього) і звільнити пам’яті.

В останньому прикладі, ми цілеспрямовано одразу викликаємо `URL.revokeObjectURL(link.href)`, бо очікуємо, що `Blob` буде завантажено один раз.

В попередньому прикладі, з HTML посиланням на яке можна клікнути, ми не викликаємо `URL.revokeObjectURL(link.href)`, бо це зробить `Blob` не доступним. Після видалення посилання на `Blob` з відображення, URL більше не спрацює.

## Blob в base64

Іншим способом отримати доступ до `Blob`, замість `URL.createObjectURL`, є перетворення `Blob` в base64 закодований рядок.

Це кодування дозволяє представити дані як рядок ASCII символів від 0 до 64. І, що найважливіше, ми можемо використовувати це кодування в "data-urls".

[Data url](mdn:/http/Data_URIs) має формат `data:[<mediatype>][;base64],<data>`. Ми можемо використовувати такі посилання будь-де, як і "звичайні".

Наприклад, смайлик:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Браузер розкодує рядок та покаже зображення: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


Для перетворення `Blob` в base64 ми будемо використовувати вбудований об’єкт `FileReader`. Він може читати дані з `Blob` в різних форматах. В наступному розділі [next chapter](info:file) ми глибше з ним познайомимось.

Демонстрація завантаження `Blob` за допомогою base64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // перетворить Blob в base64 та викличе onload
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

Обидва способи створення URL з `Blob` доступні для використання. Але, переважно, `URL.createObjectURL(blob)` простіше та швидше.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob в data url"
+ Необхідно видаляти посилання на об’єкт для звільнення пам’яті.
+ Безпосередній доступ до `Blob` без проміжного "закодування/розкодування".
- Немає потреби звільняти посилання на об’єкти.
- Втрати швидкодії та навантаження на пам’ять у разі кодування великих `Blob` об’єктів.
```

## Зображення в Blob

Також ми можемо створити `Blob` із зображення, його частини чи навіть зі скріншоту сторінки. Це стане у нагоді при завантаженні його кудись.

Робота з зображеннями відбувається за допомогою елементу `<canvas>`:

1. [canvas.drawImage](mdn:/api/CanvasRenderingContext2D/drawImage) використовується для показу зображення.
2. Виклик canvas методу [.toBlob(callback, format, quality)](mdn:/api/HTMLCanvasElement/toBlob) створює `Blob` та виконує `callback`, після закінчення.

В наступному прикладі, зображення тільки копіюється, але, за потреби, ми можемо обрізати чи трансформувати його перед створенням `Blob`:

```js run
// беремо будь-яке зображення
let img = document.querySelector('img');

// створюємо <canvas> такого ж розміру
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// копіюємо в нього зображення (цей метод дозволяє вирізати частину зображення)
context.drawImage(img, 0, 0);
// наприклад, можна викликати context.rotate() або багато інших операцій

// toBlob -- це асинхронна операція, передану функцію буде викликано після готовності
canvas.toBlob(function(blob) {
  // Blob готовий, завантажуємо його
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // видаляємо внутрішнє посилання на Blob, щоб браузер міг звільнити пам’ять
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

Якщо ви надаєте перевагу `async/await` синтаксису замість функцій зворотнього виклику:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

Для створення знімків екрану можна використовувати бібліотеку <https://github.com/niklasvh/html2canvas>. Вона просто обходить сторінку і малює її в `<canvas>`. Потім ми можемо отримати `Blob` як показано вище.

## Blob в ArrayBuffer

Конструктор `Blob` дозволяє створювати `Blob` майже з будь-чого, тим паче з `BufferSource`.

Тому якщо нам потрібно низькорівнева обробка, ми можемо створити `ArrayBuffer` з `Blob` з використання `FileReader`:

```js
// отримати ArrayBuffer з Blob
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## Summary

While `ArrayBuffer`, `Uint8Array` and other `BufferSource` are "binary data", a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) represents "binary data with type".

That makes Blobs convenient for upload/download operations, that are so common in the browser.

Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) and so on, can work with `Blob` natively, as well as with other binary types.

We can easily convert between `Blob` and low-level binary data types:

- We can make a Blob from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `FileReader`, and then create a view over it for low-level binary processing.
