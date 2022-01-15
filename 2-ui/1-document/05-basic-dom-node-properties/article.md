# Властивості вузлів: тип, тег та вміст

Давайте тепер більш уважно подивимося на вузли DOM.

У цьому розділі ми більше розглянемо те, чим вони являються та вивчаємо їх найбільш використані властивості.

## Класи DOM вузлів

Різні вузли DOM можуть мати різні властивості. Наприклад, вузол-елемент, що відповідає тегу `<a>`, має властивості, які пов'язані з посиланням, а той вузол-елемент, що відповідає `<input>` має властивості, пов'язані з полем введенням, тощо.Текстові вузли не такі, як вузли елементів. Але існують також загальні властивості та методи між усіма з усіма, оскільки всі класи вузлів DOM утворюють єдину ієрархію.

Кожен вузол DOM належить до відповідного вбудованого класу.

Коренем ієрархії є [EventTarget](https://dom.spec.whatwg.org/#eventtarget), від нього успадковується [Node](http://dom.spec.whatwg.org/#interface-node), а інші вузли DOM успадкують вже від нього.

Ось рисунок, на якому слідує пояснення:

![](dom-class-hierarchy.svg)

Класи:

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- це кореневий "абстрактний" клас. Об'єкти цього класу ніколи не створюються. Він служить основою, тому всі вузли DOM підтримують так звані "події", які ми розглянемо пізніше.
- [Node](http://dom.spec.whatwg.org/#interface-node) -- це також "абстрактний" клас, що служить базою для вузлів DOM. Він забезпечує основну функціональність дерева: `parentNode`, `nextSibling`, `childNodes` і так далі (це гетери). Об'єкти класу `Node` ніколи не створюються. Але є конкретні класи вузлів, які успадковуються від нього, а саме: `Text` для текстових вузлів, `Element` для вузлів-елементів та більш екзотичні, такі як `Comment` для вузлів-коментарів.
- [Element](http://dom.spec.whatwg.org/#interface-element) -- це базовий клас для елементів DOM. Він забезпечує навігацію на рівні елементів, таку як `nextElementSibling`, `children` та пошукові методи, такі як `getElementsByTagName`, `querySelector`. Браузер підтримує не тільки HTML, але й XML та SVG. Клас `Element` служить базою для більш конкретних класів: `SVGElement`, `XMLElement` та `HTMLElement`..
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- це, нарешті, основний клас для всіх елементів HTML. Він успадковується конкретними елементами HTML:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- це клас для `<input>` елементів,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- це клас для `<body>` елементів,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- це клас для `<a>` елементів,
    - ...і так далі.

Є багато інших тегів з власними класами, які можуть мати певні властивості та методи, а деякі елементи, такі як `<span>`, `<section>`, `<article>` не мають конкретних властивостей, тому вони є екземплярами класу `HTMLElement`.

Отже, повний набір властивостей та методів даного вузла надходить як результат наслідування.

Наприклад, давайте розглянемо об'єкт DOM для елемента `<input>`. Він належить до класу [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement).

Він отримує властивості та методи як накладення (перераховано в порядоку наслідування):

- `HTMLInputElement` -- цей клас забезпечує специфічні властивості введення,
- `HTMLElement` -- цей клас забезпечує загальні методи HTML-елементів (і гетери/сетери),
- `Element` -- забезпечує загальні методи елемента,
- `Node` -- забезпечує спільні властивості DOM вузлів,
- `EventTarget` -- дає підтримку подій (будуть розглянуті),
- ... і, нарешті, цей клас наслідує `Object`, тому "прості методи об'єкта" такими є, наприклад, `hasOwnProperty` також доступні.

Щоб побачити назву класу DOM вузла, ми можемо згадати, що об'єкт, як правило, має властивість `constructor`. Вона посилається на конструктор класу, а `constructor.name` - це його назва:

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...Або ми можемо просто викликати `toString`:

```js run
alert( document.body ); // [object HTMLBodyElement]
```

Ми також можемо використовувати `instanceof`, щоб перевірити наслідування:

```js run
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

Як ми бачимо, вузли DOM є звичайними об'єктами JavaScript. Вони використовують класи з прототипів для наслідування.

Це також легко бачити, якщо вивести елемент за допомогою `console.dir(elem)` у браузері. Там в консолі ви можете побачити `HTMLElement.prototype`, `Element.prototype` і так далі.

```smart header="`console.dir(elem)` проти `console.log(elem)`"
Більшість браузерів підтримують дві команди у своїх інструментах розробника: `console.log` та `console.dir`. Вони виводять свої аргументи в консоль. Для об'єктів JavaScript ці команди зазвичай роблять те ж саме.

Але для DOM елементів вони різні:

- `console.log(elem)` показує елемент DOM дерева.
- `console.dir(elem)` показує елемент як об'єкт DOM, це добре для того, щоб вивчити його властивості.

Спробуйте це на `document.body`.
```

````smart header="Специфікація IDL"
У специфікації, класи DOM описані не за допомогою JavaScript, а спеціальною [мовою опису інтерфейсу](https://uk.wikipedia.org/wiki/Мова_опису_інтерфейсів)(IDL), яку зазвичай легко зрозуміти.

У IDL всі властивості призводять до їх типів. Наприклад, `DOMString`,` boolean` тощо.

Ось витяг з цієї специфікації, з коментарями:

```js
// Define HTMLInputElement
*!*
// Колонка ":" означає, що HTMLInputElement наслідується від HTMLElement
*/!*
interface HTMLInputElement: HTMLElement {
  // here go properties and methods of <input> elements

*!*
  // "DOMString" означає, що значенням властивості є рядок
*/!*
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

*!*
  // бульова властивість (true/false)
  attribute boolean autofocus;
*/!*
  ...
*!*
  // тепер метод: "void" означає, що метод не повертає значення
*/!*
  void select();
  ...
}
```
````

## Властивість "nodeType" 

Властивість `nodeType` надає ще один, "старомодний" спосіб отримати "тип" DOM вузла.

Він має числове значення:
- `elem.nodeType == 1` для вузлів-елементів,
- `elem.nodeType == 3` для текстових вузлів,
- `elem.nodeType == 9` для об'єкта документа,
- є кілька інших значень у [специфікації](https://dom.spec.whatwg.org/#node).

Наприклад:

```html run
<body>
  <script>
  let elem = document.body;

  // перевіримо, що це таке?
  alert(elem.nodeType); // 1 => елемент

  // і перший дочірній елемент ...
  alert(elem.firstChild.nodeType); // 3 => текст

  // для об'єкта документа тип -- 9
  alert( document.nodeType ); // 9
  </script>
</body>
```

У сучасних скриптах ми можемо використовувати `instanceof` та інші тести на основі класів, щоб побачити тип вузла, але іноді використовувати `nodeType` простіше. Ми можемо лише читати `nodeType`, а не змінювати його.

## Тег: nodeName та tagName

Маючи вузол DOM, ми можемо прочитати назву тегів з `nodeName` або `tagName` властивостей:

Наприклад:

```js run
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

Чи існує різниця між `tagName` і `nodeName`?

Звичайно, різниця відображається у їх іменах, але вдійсності є трохи тонкою.

- Властивість `tagName` існує лише для `Element` вузлів.
- `nodeName` визначається для будь-якого `Node`:
    - для елементів це означає те ж саме, що і `tagName`.
    - для інших типів вузлів (текст, коментар тощо) він має рядок з типом вузла.

Іншими словами, `tagName` підтримується лише вузлами елементів (оскільки вони походять від класу `Element`), а `nodeName` може сказати щось про інші типи вузлів.

Наприклад, давайте порівнюємо `tagName` and `nodeName` для вузла-документа та  коментаря:


```html run
<body><!-- comment -->

  <script>
    // для коментаря
    alert( document.body.firstChild.tagName ); // undefined (не елемент)
    alert( document.body.firstChild.nodeName ); // #comment

    // для документа
    alert( document.tagName ); // undefined (не елемент)
    alert( document.nodeName ); // #document
  </script>
</body>
```

Якщо ми маємо справу лише з елементами, то ми можемо використовувати як `tagName`, так і `nodeName` -- немає ніякої різниці.

```smart header="Назва тегів завжди написана великими літерами, за винятком режиму XML"
Браузер має два режиму обробки документів: HTML та XML. Зазвичай HTML-режим використовується для веб-сторінок. XML-режим вмикається, коли браузер отримує XML-документ за допомогою заголовка: `Content-Type: application/xml+xhtml`.

У режимі HTML `tagName/nodeName` завжди пишуться великими літерами: це `BODY` як для `<body>`, так і для `<BoDy>`.

У режимі XML регістр літер зберігається "як є". В даний час XML режим рідко використовується.
```


## innerHTML: the contents

The [innerHTML](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) property allows to get the HTML inside the element as a string.

We can also modify it. So it's one of the most powerful ways to change the page.

The example shows the contents of `document.body` and then replaces it completely:

```html run
<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // read the current contents
    document.body.innerHTML = 'The new BODY!'; // replace it
  </script>

</body>
```

We can try to insert invalid HTML, the browser will fix our errors:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // forgot to close the tag
    alert( document.body.innerHTML ); // <b>test</b> (fixed)
  </script>

</body>
```

```smart header="Scripts don't execute"
If `innerHTML` inserts a `<script>` tag into the document -- it becomes a part of HTML, but doesn't execute.
```

### Beware: "innerHTML+=" does a full overwrite

We can append HTML to an element by using `elem.innerHTML+="more html"`.

Like this:

```js
chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "How goes?";
```

But we should be very careful about doing it, because what's going on is *not* an addition, but a full overwrite.

Technically, these two lines do the same:

```js
elem.innerHTML += "...";
// is a shorter way to write:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

In other words, `innerHTML+=` does this:

1. The old contents is removed.
2. The new `innerHTML` is written instead (a concatenation of the old and the new one).

**As the content is "zeroed-out" and rewritten from the scratch, all images and other resources will be reloaded**.

In the `chatDiv` example above the line `chatDiv.innerHTML+="How goes?"` re-creates the HTML content and reloads `smile.gif` (hope it's cached). If `chatDiv` has a lot of other text and images, then the reload becomes clearly visible.

There are other side-effects as well. For instance, if the existing text was selected with the mouse, then most browsers will remove the selection upon rewriting `innerHTML`. And if there was an `<input>` with a text entered by the visitor, then the text will be removed. And so on.

Luckily, there are other ways to add HTML besides `innerHTML`, and we'll study them soon.

## outerHTML: full HTML of the element

The `outerHTML` property contains the full HTML of the element. That's like `innerHTML` plus the element itself.

Here's an example:

```html run
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

**Beware: unlike `innerHTML`, writing to `outerHTML` does not change the element. Instead, it replaces it in the DOM.**

Yeah, sounds strange, and strange it is, that's why we make a separate note about it here. Take a look.

Consider the example:

```html run
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

*!*
  // replace div.outerHTML with <p>...</p>
*/!*
  div.outerHTML = '<p>A new element</p>'; // (*)

*!*
  // Wow! 'div' is still the same!
*/!*
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```

Looks really odd, right?

In the line `(*)` we replaced `div` with `<p>A new element</p>`. In the outer document (the DOM) we can see the new content instead of the `<div>`. But, as we can see in line `(**)`, the value of the old `div` variable hasn't changed!

The `outerHTML` assignment does not modify the DOM element (the object referenced by, in this case, the variable 'div'), but removes it from the DOM and inserts the new HTML in its place.

So what happened in `div.outerHTML=...` is:
- `div` was removed from the document.
- Another piece of HTML `<p>A new element</p>` was inserted in its place.
- `div` still has its old value. The new HTML wasn't saved to any variable.

It's so easy to make an error here: modify `div.outerHTML` and then continue to work with `div` as if it had the new content in it. But it doesn't. Such thing is correct for `innerHTML`, but not for `outerHTML`.

We can write to `elem.outerHTML`, but should keep in mind that it doesn't change the element we're writing to ('elem'). It puts the new HTML in its place instead. We can get references to the new elements by querying the DOM.

## nodeValue/data: text node content

The `innerHTML` property is only valid for element nodes.

Other node types, such as text nodes, have their counterpart: `nodeValue` and `data` properties. These two are almost the same for practical use, there are only minor specification differences. So we'll use `data`, because it's shorter.

An example of reading the content of a text node and a comment:

```html run height="50"
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Hello
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Comment
*/!*
  </script>
</body>
```

For text nodes we can imagine a reason to read or modify them, but why comments?

Sometimes developers embed information or template instructions into HTML in them, like this:

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

...Then JavaScript can read it from `data` property and process embedded instructions.

## textContent: pure text

The `textContent` provides access to the *text* inside the element: only text, minus all `<tags>`.

For instance:

```html run
<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  // Headline! Martians attack people!
  alert(news.textContent);
</script>
```

As we can see, only text is returned, as if all `<tags>` were cut out, but the text in them remained.

In practice, reading such text is rarely needed.

**Writing to `textContent` is much more useful, because it allows to write text the "safe way".**

Let's say we have an arbitrary string, for instance entered by a user, and want to show it.

- With `innerHTML` we'll have it inserted "as HTML", with all HTML tags.
- With `textContent` we'll have it inserted "as text", all symbols are treated literally.

Compare the two:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. The first `<div>` gets the name "as HTML": all tags become tags, so we see the bold name.
2. The second `<div>` gets the name "as text", so we literally see `<b>Winnie-the-Pooh!</b>`.

In most cases, we expect the text from a user, and want to treat it as text. We don't want unexpected HTML in our site. An assignment to `textContent` does exactly that.

## The "hidden" property

The "hidden" attribute and the DOM property specifies whether the element is visible or not.

We can use it in HTML or assign it using JavaScript, like this:

```html run height="80"
<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

Technically, `hidden` works the same as `style="display:none"`. But it's shorter to write.

Here's a blinking element:


```html run height=50
<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## More properties

DOM elements also have additional properties, in particular those that depend on the class:

- `value` -- the value for `<input>`, `<select>` and `<textarea>` (`HTMLInputElement`, `HTMLSelectElement`...).
- `href` -- the "href" for `<a href="...">` (`HTMLAnchorElement`).
- `id` -- the value of "id" attribute, for all elements (`HTMLElement`).
- ...and much more...

For instance:

```html run height="80"
<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
```

Most standard HTML attributes have the corresponding DOM property, and we can access it like that.

If we want to know the full list of supported properties for a given class, we can find them in the specification. For instance, `HTMLInputElement` is documented at <https://html.spec.whatwg.org/#htmlinputelement>.

Or if we'd like to get them fast or are interested in a concrete browser specification -- we can always output the element using `console.dir(elem)` and read the properties. Or explore "DOM properties" in the Elements tab of the browser developer tools.

## Summary

Each DOM node belongs to a certain class. The classes form a hierarchy. The full set of properties and methods come as the result of inheritance.

Main DOM node properties are:

`nodeType`
: We can use it to see if a node is a text or an element node. It has a numeric value: `1` for elements,`3` for text nodes, and a few others for other node types. Read-only.

`nodeName/tagName`
: For elements, tag name (uppercased unless XML-mode). For non-element nodes `nodeName` describes what it is. Read-only.

`innerHTML`
: The HTML content of the element. Can be modified.

`outerHTML`
: The full HTML of the element. A write operation into `elem.outerHTML` does not touch `elem` itself. Instead it gets replaced with the new HTML in the outer context.

`nodeValue/data`
: The content of a non-element node (text, comment). These two are almost the same, usually we use `data`. Can be modified.

`textContent`
: The text inside the element: HTML minus all `<tags>`. Writing into it puts the text inside the element, with all special characters and tags treated exactly as text. Can safely insert user-generated text and protect from unwanted HTML insertions.

`hidden`
: When set to `true`, does the same as CSS `display:none`.

DOM nodes also have other properties depending on their class. For instance, `<input>` elements (`HTMLInputElement`) support `value`, `type`, while `<a>` elements (`HTMLAnchorElement`) support `href` etc. Most standard HTML attributes have a corresponding DOM property.

However, HTML attributes and DOM properties are not always the same, as we'll see in the next chapter.
