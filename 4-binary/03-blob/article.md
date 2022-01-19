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

## Blob to base64

An alternative to `URL.createObjectURL` is to convert a `Blob` into a base64-encoded string.

That encoding represents binary data as a string of ultra-safe "readable" characters with ASCII-codes from 0 to 64. And what's more important -- we can use this encoding in "data-urls".

A [data url](mdn:/http/Data_URIs) has the form `data:[<mediatype>][;base64],<data>`. We can use such urls everywhere, on par with "regular" urls.

For instance, here's a smiley:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

The browser will decode the string and show the image: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


To transform a `Blob` into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.

Here's the demo of downloading a blob, now via base-64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

Both ways of making a URL of a `Blob` are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
- Performance and memory losses on big `Blob` objects for encoding.
```

## Image to blob

We can create a `Blob` of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.

Image operations are done via `<canvas>` element:

1. Draw an image (or its part) on canvas using [canvas.drawImage](mdn:/api/CanvasRenderingContext2D/drawImage).
2. Call canvas method [.toBlob(callback, format, quality)](mdn:/api/HTMLCanvasElement/toBlob) that creates a `Blob` and runs `callback` with it when done.

In the example below, an image is just copied, but we could cut from it, or transform it on canvas prior to making a blob:

```js run
// take any image
let img = document.querySelector('img');

// make <canvas> of the same size
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// copy image to it (this method allows to cut image)
context.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas

// toBlob is async operation, callback is called when done
canvas.toBlob(function(blob) {
  // blob ready, download it
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

If we prefer `async/await` instead of callbacks:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a `Blob` of it the same way as above.

## From Blob to ArrayBuffer

The `Blob` constructor allows to create a blob from almost anything, including any `BufferSource`.

But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from it using `FileReader`:

```js
// get arrayBuffer from blob
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
