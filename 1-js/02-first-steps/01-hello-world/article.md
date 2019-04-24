# Привіт, світ!

Підручник, який ви читаєте є про основи JavaScript, який є платформонезалежний. Згодом, ви будете вивчати про Node.JS та інші платформи, які його використовують.

Але нам необхідне робоче середовище для запуску наших скриптів, оскільки ця книга є онлайн, браузер є гарним вибором для цього. Ми зведемо до мінімуму кількість специфічних команд для браузера(наприклад `alert`), щоб ви не витрачали час на них, якщо ви плануєте зосередитися на іншому середовищі (як Node.JS). Ми зосередимось на JavaScript в браузері у [наступній частині](/ui) підручника

По-перше, давайте подивимось, як ми додаємо сценарій до сторінки. Для серверних середовищ (як Node.js) ви можете виконати сценарій за допомогою команди `"node my.js"`


## Тег "script"

Програми JavaScript можуть бути вставлені в будь-яку частину HTML документа за допомогою тега `<script>`

Наприклад:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Перед сценарієм ...</p>

*!*
  <script>
    alert( 'Привіт, світ!' );
  </script>
*/!*

  <p>...Після сценарію.</p>

</body>

</html>
```

```online
Ви можете запустити зразок на кнопку "Відтворення" у правому верхньому куті поля вище.
```

Тег `<script>` містить JavaScript код, який автоматично виконується, коли браузер обробляє тег.


## Сучасна розмітка

Тег `<script>` має декілька атрибутів, які рідко використовуються сьогодні, але можуть ще бути знайдені в старому коді.

Атрибут `type`: <code>&lt;script <u>type</u>=...&gt;</code>
:Старий HTML стандарт, HTML4, вимагає щоб у `<script>` був `type`. Зазвичай це був `type="text/javascript"`. Це більше не потрібно. Також, сучасний HTML стандарт, HTML5, повністю змінив зміст цього атрибута. Тепер його можна використовувати для JavaScript модулів. Але це є просунута тема; ми поговоримо про модулі в іншій частині підручника.


The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: This attribute was meant to show the language of the script. This attribute no longer makes sense because JavaScript is the default language. There is no need to use it.

Comments before and after scripts.
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    This trick isn't used in modern JavaScript. These comments hid JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.


## External scripts

If we have a lot of JavaScript code, we can put it into a separate file.

Script files are attached to HTML with the `src` attribute:

```html
<script src="/path/to/script.js"></script>
```

Here, `/path/to/script.js` is an absolute path to the script file (from the site root).

You can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.

We can give a full URL as well. For instance:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

To attach several scripts, use multiple tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
As a rule, only the simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and code inside.

This won't work:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

We must choose either an external `<script src="…">` or a regular `<script>` with code.

The example above can be split into two scripts to work:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Summary

- We can use a `<script>` tag to add JavaScript code to a page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the webpage. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves with browser-specific implementations of it. We'll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.
