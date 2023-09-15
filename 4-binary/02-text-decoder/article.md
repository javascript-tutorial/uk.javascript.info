# TextDecoder та TextEncoder

А якщо бінарні дані є просто рядком? Наприклад, ми отримали файл з текстовими даними.

Вбудований об'єкт [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) дає змогу записати дані в JavaScript рядок із заданого буферу з потрібним кодуванням.

Але для початку його необхідно створити:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- кодування, типово `utf-8`, але також підтримуються `big5`, `windows-1251` та багато інших кодувань.
- **`options`** -- необов'язковий об'єкт, який задає додаткові налаштування декодера:
  - **`fatal`** -- булевий параметр, якщо передано `true` -- буде згенеровано виключення для символів, які не вдасться декодувати, в іншому випадку (типово) вони будуть замінені на символ `\uFFFD`.
  - **`ignoreBOM`** -- булевий параметр, якщо передано `true` -- буде проігноровано BOM (Byte order mark — необов'язковий маркер порядку байтів), рідко трапляється в нагоді.

...А потім декодувати:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- `BufferSource` буфер для декодування.
- **`options`** -- необов'язковий об'єкт:
  - **`stream`** -- значення `true`, якщо потрібно декодувати потік (stream), тоді `decoder` буде викликано повторно декілька разів для отримання вхідних даних частинами. В такому випадку символи, що складають з декількох байт можуть бути випадково розділеними між частинами. Ця опція дозволяє `TextDecoder` запам'ятати "незакінчені" символи для декодування разом з наступною частиною.

Наприклад:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Також можливо частково декодувати буфер за допомогою створення представлення тільки з частиною масиву:


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// рядок всередині між першим та останнім байтом
// створення нового представлення без копіювання масиву
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) працює зворотнім чином -- перетворює рядок в байти.

Синтаксис:

```js
let encoder = new TextEncoder();
```

Підтримується тільки кодування "utf-8".

Об'єкт має два методи:
- **`encode(str)`** -- повертає `Uint8Array` створений з рядку.
- **`encodeInto(str, destination)`** -- `str` буде закодовано та записано в `destination`. Параметр `destination` повинен мати тип `Uint8Array`.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
