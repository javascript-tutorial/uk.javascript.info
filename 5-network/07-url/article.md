
# URL об'єкт

Вбудований клас [URL](https://url.spec.whatwg.org/#api) надає зручний інтерфейс для створення та розбирання URL на частини.

Методи, що дають змогу зробити мережевий запит, не вимагають саме екземпляр класу `URL`, досить передати рядок. Тому нас нічого не зобов'язує використовувати клас `URL`. Але це дійсно може стати в нагоді.

## Створення URL

Синтаксис для створення `URL` об'єктів наступний:

```js
new URL(url, [base])
```

- **`url`** -- повний URL чи, якщо задано другий параметр, тільки шлях (дивись далі),
- **`base`** -- необов'язковий параметр з "основою" відносно якої буде побудовано URL, якщо в першому параметрі передано тільки шлях.

Наприклад:

```js
let url = new URL('https://javascript.info/profile/admin');
```

В обох випадках буде згенеровано однакові URLи:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Можна легко створити новий URL із шляху ґрунтуючись на URL, що вже існує:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

Об'єкт `URL` дозволяє негайно отримати доступ до його складових, тому це зручний спосіб для розбору URL адрес:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Підказка зі складовими URL:

![](url-object.svg)

- `href` повна URL-адреса, те ж саме, що `url.toString()`
- `protocol` протокол, закінчується символом двокрапки `:`
- `search` - рядок з параметрами, починається символом знаку запитання `?`
- `hash` починається символом решітки`#`
- також можуть бути присутні властивості `user` та `password`, якщо використовується формат для HTTP аутентифікації: `http://login:password@site.com` (не згадано вище, бо рідко використовується).


```smart header="`URL` об'єкт можна передати у методи, що використовуються для мережевих запитів замість рядку"
`fetch` чи `XMLHttpRequest` можуть отримувати `URL` об'єкти майже всюди, де можна передати рядок з URL.

Зазвичай, `URL` об'єкт можна передати в будь-який метод замість рядку, оскільки більшість методів перетворять об'єкт в рядок, що містить повну URL-адресу.
```

## Параметри пошуку "?..."

Припустимо, нам потрібно створити URL-адресу з заданими параметрами пошуку, наприклад, `https://google.com/search?query=JavaScript`.

Ми, звичайно, можемо передати їх в рядку з URL-адресою:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Але параметри повинні бути закодованими, якщо вони містять пробіли, не латинські символи тощо (більше про це нижче).

Отже, для цього `URL` має властивість: `url.searchParams`, об'єкт типу [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Він надає зручні методи для роботи з параметрами пошуку:

- **`append(name, value)`** -- додати параметр з ім'ям `name`,
- **`delete(name)`** -- видалити параметр з іменем `name`,
- **`get(name)`** -- отримати значення параметру з іменем `name`,
- **`getAll(name)`** -- отримати всі параметри, що мають ім'я `name` (наприклад, `?user=John&user=Pete`),
- **`has(name)`** -- перевірити чи існує параметр з іменем `name`,
- **`set(name, value)`** -- встановити/замінити параметр з іменем `name`,
- **`sort()`** -- відсортувати параметри за іменем, рідко стає в нагоді,
- ...і це об'єкт також можна перебрати, подібно до `Map`.

Приклад з параметрами, що містять пробіли та знаки пунктуації:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // додано параметр з пробілом та !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // додано параметр з двокрапкою :

// параметри автоматично закодовано
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// у циклі перебираємо всі параметри пошуку (кожен параметр автоматично декодується)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
```


## Кодування

Набір символів, що можуть дозволено до використання в URL-адресах, визначено в стандарті [RFC3986](https://tools.ietf.org/html/rfc3986).

Усі інші символи, що не дозволені стандартом, повинні бути закодовані. Наприклад, не латинські букви та пробіл повинні бути заміненими на їх UTF-8 коди, що починаються з `%`. Пробіл буде закодовано у вигляді `%20` (з історичних причин пробіл дозволено закодувати як `+`).

Гарна новина полягає в тому, що `URL` об'єкт виконає всі перетворення автоматично. Нам потрібно тільки передати всі параметри, а потім перетворити `URL` в рядок:

```js run
// для прикладу використано кириличні символи

let url = new URL('https://uk.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ї');
alert(url); // https://uk.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%97
```

Як бачите, і `Тест` у шляху, і параметр `ї` закодовано.

URL-адреса стала довшою, бо кожен кириличний символ представлено двома байтами в UTF-8, тому там дві групи символів `%..`.

### Encoding strings

In old times, before `URL` objects appeared, people used strings for URLs.

As of now, `URL` objects are often more convenient, but strings can still be used as well. In many cases using a string makes the code shorter.

If we use a string though, we need to encode/decode special characters manually.

There are built-in functions for that:

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - encodes URL as a whole.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - decodes it back.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - encodes a URL component, such as a search parameter, or a hash, or a pathname.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - decodes it back.

A natural question is: "What's the difference between `encodeURIComponent` and `encodeURI`? When we should use either?"

That's easy to understand if we look at the URL, that's split into components in the picture above:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

As we can see, characters such as `:`, `?`, `=`, `&`, `#` are allowed in URL.

...On the other hand, if we look at a single URL component, such as a search parameter, these characters must be encoded, not to break the formatting.

- `encodeURI` encodes only characters that are totally forbidden in URL.
- `encodeURIComponent` encodes same characters, and, in addition to them, characters `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` and `@`.

So, for a whole URL we can use `encodeURI`:

```js run
// using cyrillic characters in url path
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...While for URL parameters we should use `encodeURIComponent` instead:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Compare it with `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

As we can see, `encodeURI` does not encode `&`, as this is a legit character in URL as a whole.

But we should encode `&` inside a search parameter, otherwise, we get `q=Rock&Roll` - that is actually `q=Rock` plus some obscure parameter `Roll`. Not as intended.

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we're absolutely sure that it has only allowed characters.

````smart header="Encoding difference compared to `URL`"
Classes [URL](https://url.spec.whatwg.org/#url-class) and [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) are based on the latest URI specification: [RFC3986](https://tools.ietf.org/html/rfc3986), while `encode*` functions are based on the obsolete version [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

There are a few differences, e.g. IPv6 addresses are encoded differently:

```js run
// valid url with IPv6 address
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

As we can see, `encodeURI` replaced square brackets `[...]`, that's not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

Such cases are rare, `encode*` functions work well most of the time.
````
