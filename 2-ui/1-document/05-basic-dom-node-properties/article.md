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


## innerHTML: вміст

Властивість [innerHTML](https://w3c.github.io/dom-parsing/#the-innerhtml-mixin) дозволяє отримати HTML всередині елемента як рядок.

Ми також можемо це змінити. Отже, це один з найпотужніших способів зміни сторінку.

На прикладі показано вміст `document.body` який потім повністю замінюється.

```html run
<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // читаємо поточний вміст
    document.body.innerHTML = 'Новий BODY!'; // замінюємо його
  </script>

</body>
```

Ми можемо спробувати вставити невалідний HTML, браузер виправить наші помилки:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // забули закрити тег
    alert( document.body.innerHTML ); // <b>test</b> (виправлено)
  </script>

</body>
```

```smart header="Скрипти не виконуються"
Якщо `innerHTML` вставляє тег `<script>` у документ - він стає частиною HTML, але не виконується.
```

### Остерігайтеся: "innerHTML+=" робить повний перезапис

Ми можемо додати HTML до елемента за допомогою `elem.innerHTML+="more html"`.

Як наприклад:

```js
chatDiv.innerHTML += "<div>Привіт<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "Як справи?";
```

Але ми повинні бути дуже обережними щодо цього, тому що те, що відбувається -- це *не* додавання, але повний перезапис.

Технічно ці два рядки роблять те ж саме:

```js
elem.innerHTML += "...";
// коротший спосіб записати:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

Іншими словами, `innerHTML+=` робить наступне:

1. The old contents is removed.
1. Старий вміст видаляється.
2. Замість нього написано новий `innerHTML` (конкатенація старого та нового).

**Оскільки вміст є "нульовим" та переписаним з нуля, всі зображення та інші ресурси будуть перезавантажені**.

У прикладі `chatDiv` вище рядок `chatDiv.innerHTML+="How goes?"` заново створює вміст HTML та перезавантажує зображення `smile.gif` (сподіваюся, що воно закешоване). Якщо `chatDiv` має багато іншого тексту та зображень, то перезавантаження стає чітко видно.

Також є й інші побічні ефекти. Наприклад, якщо існуючий текст був виділений за допомогою миші, то більшість браузерів видалять виділений текст при перезаписування `innerHTML`. І якщо був `<input>` з текстом, який вводиться відвідувачем, то текст буде видалено. І так далі.

На щастя, є й інші способи додати HTML, крім `innerHTML`, і ми скоро вивчимо їх.

## outerHTML: повний HTML елемента

Властивість `outerHTML` містить повний HTML елемента. Це як `innerHTML` плюс сам елемент.

Ось приклад:

```html run
<div id="elem">Привіт <b>Світ</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Привіт <b>Світ</b></div>
</script>
```

**Остерігайтеся: на відміну від `innerHTML`, написання до `outerHTML` не змінює елемент. Замість цього він замінює його в DOM.**

Так, це звучить дивно, так воно і є, ось тому ми робимо окрему примітку про це тут. Поглянь.

Розглянемо приклад:

```html run
<div>Привіт, світ!</div>

<script>
  let div = document.querySelector('div');

*!*
  // replace div.outerHTML with <p>...</p>
*/!*
  div.outerHTML = '<p>Новий елемент</p>'; // (*)

*!*
  // Ого! 'div' все ще те ж саме!
*/!*
  alert(div.outerHTML); // <div>Привіт, світ!</div> (**)
</script>
```

Виглядає дуже дивно, вірно?

У рядку `(*)` ми замінили `div` на `<p>Новий елемент</p>`. У зовнішньому документі (DOM) ми можемо побачити новий вміст замість `<div>`. Але, як ми можемо бачити в рядку `(**)`, значення старого `div` не змінилося!

Присвоєння `outerHTML` не змінює елемент DOM (об'єкт, на який посилається, у цьому випадку змінний 'div'), але його видаляє з DOM та вставляє новий HTML у своєму місці.

Отже, в `div.outerHTML=...` сталося наступне:
- `div` був видалений з документа.
- Інший шматок HTML `<p>Новий елемент</p>` був вставлений на його місце.
- `div` ще має своє старе значення. Новий HTML не був збережений для будь-якої змінної.

Тут так легко зробити помилку: змініть `div.outerHTML`, а потім продовжуйте працювати з `div` так, наче від має новий вміст у собі. Але це не так. Така річ є правильною для `innerHTML`, але не для `outerHTML`.

Ми можемо записати в `elem.outerHTML`, але слід пам'ятати, що це не змінює елемент, в який ми пишемо ('elem'). Це вставить замість цього новий HTML. Ми можемо отримати посилання на нові елементи, запитуючи DOM.

## nodeValue/data: вміст тексту вузла

Властивість `innerHTML` існує лише для вузлів-елементів.

Інші типи вузлів, такі як текстові вузли, мають свій аналог: `nodeValue` і `data` властивості. Ці дві властивості майже однакові для практичного використання, є лише незначні відмінності в специфікації. Таким чином, ми будемо використовувати `data`, тому що це коротше.

Приклад читання вмісту текстового вузла та коментаря:

```html run height="50"
<body>
  Привіт
  <!-- Коментар -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Привіт
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Коментар
*/!*
  </script>
</body>
```

Для текстових вузлів ми можемо уявити собі причину читати або змінити їх, але чому коментарі?

Іноді розробники вбудовують інформацію або інструкції в шаблон HTML, як наприклад:

```html
<!-- if isAdmin -->
  <div>Ласкаво просимо, Адмін!</div>
<!-- /if -->
```

...Тоді JavaScript може прочитати його з `data` властивості та обробити вбудовані інструкції.

## textContent: чистий текст

`textContent` надає доступ до *тексту* всередині елемента: тільки текст, мінус всі `<теги>`.

Наприклад:

```html run
<div id="news">
  <h1>Заголовок!</h1>
  <p>Марсіанці нападають на людей!</p>
</div>

<script>
  // Заголовок! Марсіанці нападають на людей!
  alert(news.textContent);
</script>
```

Як ми бачимо, повертається лише текст, як ніби всі `<tags>` були вирізані, але текст у них залишився.

На практиці читання такого тексту рідко потрібне.

**Запис в `textContent` набагато корисніше, тому що це дозволяє записати текст "безпечним способом".**

Скажімо, у нас є довільний рядок, наприклад той, що ввів користувач, і який він хочете показати.

- З `innerHTML` ми його вставили "як HTML", з усіма HTML-тегами.
- З `textContent` ми вставимо це "як текст", всі символи обробляються буквально.

Порівняйте ці два підходи:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("Як вас звати?", "<b>Вінні Пух!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. Перший `<div>` отримує назву "як HTML": всі теги стають тегами, тому ми бачимо назву жирним шрифтом.
2. Другий `<div>` отримує назву "як текст", тому ми буквально бачимо `<b>Вінні Пух!</b>`.

У більшості випадків ми очікуємо отримати текст від користувача, і хочем працювати з ним як з текстом. Ми не хочемо несподіваного HTML на нашому сайті. Присвоєння в `textContent` робить саме це.

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
