Щоб вставити після тегу `<body>` , нам потрібно спершу його знайти. Ми можемо використати для цього регулярний вираз `pattern:<body.*?>`.

в цьому завданні нам не потрібно змінювати тег `<body>`. Нам потрібно тільки додати текст після нього.

Ось таким чином ми можемо це зробити:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Привіт</h1>');

alert(str); // ...<body style="..."><h1>Привіт</h1>...
```

в заміненому рядку `$&` означає співпадіння саме по собі, тобто, частина вихідного тексту яка відповідає шаблону `pattern:<body.*?>`. Її замінено на неї ж плюс `<h1>Привіт</h1>`.

Альнернативою було би використання зворотньої перевірки:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Привіт</h1>`);

alert(str); // ...<body style="..."><h1>Привіт</h1>...
```

Як бачите, в цьому регулярному виразі є тільки зворотня перевірка.

Це працює таким чином:
- На кожній позиції в тексті.
- Check if it's preceeded by `pattern:<body.*?>`.
- If it's so then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `pattern:<body.*?>`.

So it replaces the "empty line", preceeded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also be useful: `pattern:/<body.*?>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
