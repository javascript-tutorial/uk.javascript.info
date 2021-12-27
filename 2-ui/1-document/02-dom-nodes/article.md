libs:
  - d3
  - domtree

---

# DOM дерево

Основа HTML-документа -- це теги.

Відповідно до моделі об'єкта документа (DOM), кожен HTML-тег є об'єктом. Вкладені теги -- це "діти" всередині батьківського елементу. Текст всередині тегу також є об'єктом.

Всі ці об'єкти доступні за допомогою JavaScript, і ми можемо використовувати їх, щоб змінити сторінку.

Наприклад, `document.body` це об'єкт, що представляє тег `<body>`.

Запуск цього коду зробить `<body>` червоним протягом 3 секунд:

```js run
document.body.style.background = 'red'; // зробити фон червоним

setTimeout(() => document.body.style.background = '', 3000); // поверне назад
```

Тут ми використовували `style.background`, щоб змінити фоновий колір `document.body`, але тут є багато інших властивостей, таких як.

- `innerHTML` -- вміст HTML вузла.
- `offsetWidth` -- ширина вузла (у пікселях)
- ...і так далі.

Незабаром ми дізнаємося більше способів маніпулювати домом, але спочатку потрібно знати його структуру.

## Приклад DOM

Почнемо з наступного простого документа:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>Про лосів</title>
</head>
<body>
  Правда про лосів.
</body>
</html>
```

DOM представляє HTML як структуру дерева тегів. Ось як це виглядає:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Про лосів"}]},{"name":"#text","nodeType":3,"content":"\n"}]},{"name":"#text","nodeType":3,"content":"\n"},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  Правда про лосів.\n\n\n"}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
На зображенні вище, ви можете натиснути на вузли елементів, а їхні діти будуть відкриватися і закриватися.
```

Кожен дерев'яний вузол є об'єктом.

Теги є *вузлами-елементами* (або просто елементи) і утворюють структуру дерева: `<html>` знаходиться в корені, `<head>` `<body>` - це його дочірні вузли тощо.

Текст всередині елементів утворює *текстові-вузли*, позначені як `#text`. Текстовий вузол містить лише рядок. У нього може не буди нащадків і завжди він завжди є листом дерева.

Наприклад, тег `<title>` має текст `"Про лосів"`.

Зверніть увагу на спеціальні символи в текстових вузлах:

- новий рядок: `↵` (в JavaScript відомий як `\n`)
- пробіл: `␣`

Пробіли та нові рядки є абсолютно діючими символами, як букви та цифри. Вони утворюють текстові вузли і стають частиною DOM. Отже, наприклад, у прикладі вище тег `<head>` містить деякі пробіли перед`<title>`, і цей текст стає `#text` вузлом (він містить лише новий ряд та деякілька пробілів).

Є лише два винятки з цього правила:
1. Пробіли та нові лінії до `<head>` ігноруються з історичних причин.
2. Якщо ми щось помістимо після `<body>`, то це цось автоматично переміщується всередині `body`, в кінці, оскільки специфікація HTML вимагає, що весь вміст повинен бути всередині `<body>`. Отже, після `<body>` не може бути пробілів.

В інших випадках все просто -- якщо є пробіли (так само, як будь-який символ) у документі, то вони стають текстовими вузлами в DOM, і якщо ми їх видалимо, то текстових вузлів там не буде.

Тут немає текстових вузлів з пробілами:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>Про оленів</title></head><body>Правда про оленів.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Про оленів"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Правда про оленів."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="Пробіли у рядку на початку/в кінці і тільки вузли, що містять лише пробіли, як правило, приховані в інструментах розробки"
Browser tools (to be covered soon) that work with DOM usually do not show spaces at the start/end of the text and empty text nodes (line-breaks) between tags.

Developer tools save screen space this way.

On further DOM pictures we'll sometimes omit them when they are irrelevant. Such spaces usually do not affect how the document is displayed.
```

## Autocorrection

If the browser encounters malformed HTML, it automatically corrects it when making the DOM.

For instance, the top tag is always `<html>`. Even if it doesn't exist in the document, it will exist in the DOM, because the browser will create it. The same goes for `<body>`.

As an example, if the HTML file is the single word `"Hello"`, the browser will wrap it into `<html>` and `<body>`, and add the required `<head>`, and the DOM will be:


<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

While generating the DOM, browsers automatically process errors in the document, close tags and so on.

A document with unclosed tags:

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

...will become a normal DOM as the browser reads tags and restores the missing parts:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````warn header="Tables always have `<tbody>`"
An interesting "special case" is tables. By DOM specification they must have `<tbody>` tag, but HTML text may omit it. Then the browser creates `<tbody>` in the DOM automatically.

For the HTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

DOM-structure will be:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

You see? The `<tbody>` appeared out of nowhere. We should keep this in mind while working with tables to avoid surprises.
````

## Other node types

There are some other node types besides elements and text nodes.

For example, comments:

```html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elk.
  <ol>
    <li>An elk is a smart</li>
*!*
    <!-- comment -->
*/!*
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n  "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n\n\n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

We can see here a new tree node type -- *comment node*, labeled as `#comment`, between two text nodes.

We may think -- why is a comment added to the DOM? It doesn't affect the visual representation in any way. But there's a rule -- if something's in HTML, then it also must be in the DOM tree.

**Everything in HTML, even comments, becomes a part of the DOM.**

Even the `<!DOCTYPE...>` directive at the very beginning of HTML is also a DOM node. It's in the DOM tree right before `<html>`. Few people know about that. We are not going to touch that node, we even don't draw it on diagrams, but it's there.

The `document` object that represents the whole document is, formally, a DOM node as well.

There are [12 node types](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

1. `document` -- the "entry point" into DOM.
2. element nodes -- HTML-tags, the tree building blocks.
3. text nodes -- contain text.
4. comments -- sometimes we can put information there, it won't be shown, but JS can read it from the DOM.

## See it for yourself

To see the DOM structure in real-time, try [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.

Another way to explore the DOM is to use the browser developer tools. Actually, that's what we use when developing.

To do so, open the web page [elk.html](elk.html), turn on the browser developer tools and switch to the Elements tab.

It should look like this:

![](elk.svg)

You can see the DOM, click on elements, see their details and so on.

Please note that the DOM structure in developer tools is simplified. Text nodes are shown just as text. And there are no "blank" (space only) text nodes at all. That's fine, because most of the time we are interested in element nodes.

Clicking the <span class="devtools" style="background-position:-328px -124px"></span> button in the left-upper corner allows us to choose a node from the webpage using a mouse (or other pointer devices) and "inspect" it (scroll to it in the Elements tab). This works great when we have a huge HTML page (and corresponding huge DOM) and would like to see the place of a particular element in it.

Another way to do it would be just right-clicking on a webpage and selecting "Inspect" in the context menu.

![](inspect.svg)

At the right part of the tools there are the following subtabs:
- **Styles** -- we can see CSS applied to the current element rule by rule, including built-in rules (gray). Almost everything can be edited in-place, including the dimensions/margins/paddings of the box below.
- **Computed** -- to see CSS applied to the element by property: for each property we can see a rule that gives it (including CSS inheritance and such).
- **Event Listeners** -- to see event listeners attached to DOM elements (we'll cover them in the next part of the tutorial).
- ...and so on.

The best way to study them is to click around. Most values are editable in-place.

## Interaction with console

As we work the DOM, we also may want to apply JavaScript to it. Like: get a node and run some code to modify it, to see the result. Here are few tips to travel between the Elements tab and the console.

For the start:

1. Select the first `<li>` in the Elements tab.
2. Press `key:Esc` -- it will open console right below the Elements tab.

Now the last selected element is available as `$0`, the previously selected is `$1` etc.

We can run commands on them. For instance, `$0.style.background = 'red'` makes the selected list item red, like this:

![](domconsole0.svg)

That's how to get a node from Elements in Console.

There's also a road back. If there's a variable referencing a DOM node, then we can use the command `inspect(node)` in Console to see it in the Elements pane.

Or we can just output the DOM node in the console and explore "in-place", like `document.body` below:

![](domconsole1.svg)

That's for debugging purposes of course. From the next chapter on we'll access and modify DOM using JavaScript.

The browser developer tools are a great help in development: we can explore the DOM, try things and see what goes wrong.

## Summary

An HTML/XML document is represented inside the browser as the DOM tree.

- Tags become element nodes and form the structure.
- Text becomes text nodes.
- ...etc, everything in HTML has its place in DOM, even comments.

We can use developer tools to inspect DOM and modify it manually.

Here we covered the basics, the most used and important actions to start with. There's an extensive documentation about Chrome Developer Tools at <https://developers.google.com/web/tools/chrome-devtools>. The best way to learn the tools is to click here and there, read menus: most options are obvious. Later, when you know them in general, read the docs and pick up the rest.

DOM nodes have properties and methods that allow us to travel between them, modify them, move around the page, and more. We'll get down to them in the next chapters.
