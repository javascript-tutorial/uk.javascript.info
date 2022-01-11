# TextDecoder and TextEncoder

А якщо бінарні дані є просто рядком? Наприклад, ми отримали файл з текстовими даними.

Вбудований об’єкт [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) дає змогу прочитати дані в JavaScript рядок із заданого буферу з потрібним кодуванням.

Але для початку його необхідно створити:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- кодування, типово `utf-8`, але `big5`, `windows-1251` та багато інших наборів теж підтримується.
- **`options`** -- необов’язковий об’єкт:
  - **`fatal`** -- булевий параметр, якщо передано `true` -- буде згенеровано виключення для символі, що не можуть бути декодованими, в іншому випадку (типово) символи будуть замінені на `\uFFFD`.
  - **`ignoreBOM`** -- булевий параметр, якщо передано `true` -- буде проігноровано BOM (необов’язковий маркер порядку байтів), в цілому потрібно рідко.

...А потім декодувати:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- `BufferSource` буфер для декодування.
- **`options`** -- необов’язковий об’єкт:
  - **`stream`** -- значення `true`, якщо потрібно декодувати потік (stream), тоді `decoder` буде викликано повторно декілька разів для отримання вхідних даних частинами. В такому випадку символи, що складають з декількох байт можуть бути випадково розділеними між частинами. Ця опціям дозволяє `TextDecoder` запам’ятати "незакінчені" символи для декодування разом з наступною частиною.

Наприклад:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Також дозволено декодувати частину буферу за допомогою створення представлення тільки з частиною масиву:


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// рядок всередині між першим та останнім байтом
// створення нового представлення без копіювання масиву
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) does the reverse thing -- converts a string into bytes.

The syntax is:

```js
let encoder = new TextEncoder();
```

The only encoding it supports is "utf-8".

It has two methods:
- **`encode(str)`** -- returns `Uint8Array` from a string.
- **`encodeInto(str, destination)`** -- encodes `str` into `destination` that must be `Uint8Array`.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
