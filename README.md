# Сучасний посібник по JavaScript українською мовою

В цьому репозиторію зберігається переклад <https://javascript.info> на українську мову.

**Ось як ви можете допомогти:**

- Перегляньте першу issue: [Ukrainian Translate Progress](https://github.com/javascript-tutorial/uk.javascript.info/issues/1).
- Виберіть розділ, який ви хочете перекласти. Вибирайте з тих розділів, які ще не відмічені і не перекладаються.
- Додайте коментар до issue, щоб проінформувати інших, що ви перекладаєте цей розділ.
- Створіть форк репозиторію, перекладіть один розділ і надішліть запит на злиття (PR), коли завершите.

За бажанням можете [створити issue](https://github.com/javascript-tutorial/uk.javascript.info/issues/new) із назвою перекладу, наприклад: "Translation: Code quality > Debugging in Chrome".

**Дайте іншим зрозуміти, що ви перекладаєте. Найкращим способом буде написання коментаря до [цього issue](https://github.com/javascript-tutorial/uk.javascript.info/issues/1)**

🎉 Дякуємо!

Ваше ім'я та ваш вклад в переклад з'являться на сторінці "Про проект", коли переклад буде опубліковано.

Якщо ви хочете стати супроводжуючим (maintainer), мати повний доступ до репозиторію і переглядати переклади інших, [створіть нову issue](https://github.com/javascript-tutorial/translate/issues/new) в головному репозиторію, із заголовком "Become maintainer (Ukrainian)".

P.S. Весь перелік мов можна знайти на сторінці <https://github.com/javascript-tutorial/translate>.

## Contributions

We'd also like to collaborate on the tutorial with other people.

Something's wrong? A topic is missing? Explain it to people, add as PR 👏

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.  

The list of contributors is available at <https://javascript.info/about#contributors>.

## Structure

Every chapter, an article or a task resides in its own folder.

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

See <https://github.com/javascript-tutorial/translate> for the details.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

A file starts with the `# Title Header`, and then the text in Markdown-like format, editable in a simple text editor. 

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

- The translation doesn't have to be word-by-word precise. It should be technically correct and explain well.
- If you see that the English version can be improved – great, please send a PR to it.

**Please keep line breaks and paragraphs "as is": don't add newlines and don't remove existing ones.** Makes it easy to merge future changes from the English version into the translation. 

### Glossary

Agree on translations of terms like `resolved promise`, `slash`, `regexp`, etc. Look a good glossary, maybe there's one for your language already?
Or create it, for all translators to use the same terms. 

### Text in Code Blocks

- Translate comments.
- Translate user-messages and example strings.
- Don't translate variables, classes, identifiers.
- Ensure that the code works after the translation :)

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### External Links

If an external link is to Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, and a version of that article exists in your language that is of decent quality, link to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, that are only partially translated, also use the language-specific version.

If a linked article has no translated version, leave the link "as is".

### Metadata

Some files, usually tasks, have YAML metadata at the top, delimited by `---`:

```md
importance: 5

---
...
```

Please don't translate "importance" (and other top metadata).

## Running locally

You can run the tutorial locally, to immediately see the changes on-site.
The server is at <https://github.com/javascript-tutorial/server>.

Each of these files starts from the `# Main header`.

It's very easy to add something new.

---
💓  
Ilya Kantor @iliakan
