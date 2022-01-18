# Атрибути та властивості

Коли браузер завантажує сторінку, він "читає" (іншими словами: "парсить") HTML і генерує об'єкти з нього. Для вузлів-елементів, найбільш стандартні атрибути HTML автоматично стають властивостями об'єктів DOM.

Наприклад, якщо тег є `<body id="page">`, то об'єкт DOM має `body.id="page"`.

Але відображення атрибутів через власності не відбувається один-в-один! У цьому розділі ми звернемо увагу на те, що слід відокремити ці два поняття, щоб побачити, як працювати з ними, коли вони однакові, і коли вони різні.

## DOM властивості

Ми вже бачили вбудовані властивості DOM. Їх багато. Але технічно ніхто не обмежує нас, і якщо цього недостатньо, то ми можемо додати наші власні.

Дом вузли є звичайними об'єктами JavaScript. Ми можемо змінити їх.

Наприклад, давайте створимо нову властивість `document.body`:

```js run
document.body.myData = {
  name: 'Цезар',
  title: 'Імператор'
};

alert(document.body.myData.title); // Імператор
```

Ми також можемо додати спосіб:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (значення "this" У методі є document.body)
```

Ми також можемо змінювати вбудовані прототипи, такі як `Element.prototype` і додати нові методи для всіх елементів:

```js run
Element.prototype.sayHi = function() {
  alert(`Привіт, Я ${this.tagName}`);
};

document.documentElement.sayHi(); // Привіт, Я HTML
document.body.sayHi(); // Привіт, Я BODY
```

Отже, властивості та методи DOM поводяться в звичайних об'єктах JavaScript:

- Вони можуть мати будь-яке значення.
- Вони чутливі до регістру (пишіть `elem.nodeType`, не `elem.NoDeTyPe`).

## HTML атрибути

У HTML, теги можуть мати атрибути. Коли браузер аналізує HTML для створення об'єктів DOM для тегів, він розпізнає *стандартні* атрибути та створює властивості в DOM.

Отже, коли елемент має `id` або інший *стандартний* атрибут, створюється відповідна властивість. Але це не відбувається, якщо атрибут нестандартний.

Наприклад:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // нестандартний атрибут не дає властивості
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Зверніть увагу, що стандартний атрибут для одного елемента може бути невідомим для іншого. Наприклад, `"type"` -- це стандартний для `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), але не для `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Стандартні атрибути описані у специфікації для відповідного класу елемента.

Here we can see it:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM властивість не створена, тому що вона нестандартна
*/!*
  </script>
</body>
```

Отже, якщо атрибут є нестандартним, то для нього не буде DOM властивості. Чи є спосіб доступу до таких атрибутів?

Звичайно. Всі атрибути доступні за допомогою наступних методів:

- `elem.hasAttribute(name)` -- перевіряє наявність.
- `elem.getAttribute(name)` -- отримує значення.
- `elem.setAttribute(name, value)` -- встановлює значення.
- `elem.removeAttribute(name)` -- видаляє атрибут.

Ці методи працюють саме з тим, що написано в HTML.

Також можна прочитати всі атрибути, використовуючи `elem.attributes`: колекція об'єктів, що належать до вбудованого [Attr](https://dom.spec.whatwg.org/#attr), з `name` і `value` властивості.

Ось демонстрація читання нестандартної власності:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // нестандартна
*/!*
  </script>
</body>
```

Атрибути HTML мають такі функції:

- Їх назва нечутлива до регістру (`id` -- це те саме, що й `id`).
- Їхні значення завжди є рядками.

Ось розширена демонстрація роботи з атрибутами:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', читання

    elem.setAttribute('Test', 123); // (2), запис

    alert( elem.outerHTML ); // (3), дивимося чи атрибут знаходиться в HTML (так)

    for (let attr of elem.attributes) { // (4) перелічуємо всі
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

Будь ласка, зверніть увагу:

1. `getAttribute('About')` -- перша буква тут є великою, а в HTML це всі з малої літери. Але це не має значення: імена атрибутів -- нечутливі до регістру.
2. Ми можемо призначити будь-що атрибуту, але це стане рядком. Отже, ми маємо `"123"` як значення.
3. Всі атрибути, включаючи ті, які ми встановлюємо, видно в `outerHTML`.
4. Колекція `attributes` є ітерованою і має всі атрибути елемента (стандартні та нестандартні) як об'єкти з `name` і `value` властивостями.

## Property-attribute synchronization

When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vice versa.

In the example below `id` is modified as an attribute, and we can see the property changed too. And then the same backwards:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
```

But there are exclusions, for instance `input.value` synchronizes only from attribute -> to property, but not back:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (not updated!)
*/!*
</script>
```

In the example above:
- Changing the attribute `value` updates the property.
- But the property change does not affect the attribute.

That "feature" may actually come in handy, because the user actions may lead to `value` changes, and then after them, if we want to recover the "original" value from HTML, it's in the attribute.

## DOM properties are typed

DOM properties are not always strings. For instance, the `input.checked` property (for checkboxes) is a boolean:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // the attribute value is: empty string
  alert(input.checked); // the property value is: true
</script>
```

There are other examples. The `style` attribute is a string, but the `style` property is an object:

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

Most properties are strings though.

Quite rarely, even if a DOM property type is a string, it may differ from the attribute. For instance, the `href` DOM property is always a *full* URL, even if the attribute contains a relative URL or just a `#hash`.

Here's an example:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
```

If we need the value of `href` or any other attribute exactly as written in the HTML, we can use `getAttribute`.


## Non-standard attributes, dataset

When writing HTML, we use a lot of standard attributes. But what about non-standard, custom ones? First, let's see whether they are useful or not? What for?

Sometimes non-standard attributes are used to pass custom data from HTML to JavaScript, or to "mark" HTML-elements for JavaScript.

Like this:

```html run
<!-- mark the div to show "name" here -->
<div *!*show-info="name"*/!*></div>
<!-- and age here -->
<div *!*show-info="age"*/!*></div>

<script>
  // the code finds an element with the mark and shows what's requested
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insert the corresponding info into the field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
  }
</script>
```

Also they can be used to style an element.

For instance, here for the order state the attribute `order-state` is used:

```html run
<style>
  /* styles rely on the custom attribute "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

Why would using an attribute be preferable to having classes like `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

Because an attribute is more convenient to manage. The state can be changed as easy as:

```js
// a bit simpler than removing old/adding a new class
div.setAttribute('order-state', 'canceled');
```

But there may be a possible problem with custom attributes. What if we use a non-standard attribute for our purposes and later the standard introduces it and makes it do something? The HTML language is alive, it grows, and more attributes appear to suit the needs of developers. There may be unexpected effects in such case.

To avoid conflicts, there exist [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) attributes.

**All attributes starting with "data-" are reserved for programmers' use. They are available in the `dataset` property.**

For instance, if an `elem` has an attribute named `"data-about"`, it's available as `elem.dataset.about`.

Like this:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

Multiword attributes like `data-order-state` become camel-cased: `dataset.orderState`.

Here's a rewritten "order state" example:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // read
  alert(order.dataset.orderState); // new

  // modify
  order.dataset.orderState = "pending"; // (*)
</script>
```

Using `data-*` attributes is a valid, safe way to pass custom data.

Please note that we can not only read, but also modify data-attributes. Then CSS updates the view accordingly: in the example above the last line `(*)` changes the color to blue.

## Summary

- Attributes -- is what's written in HTML.
- Properties -- is what's in DOM objects.

A small comparison:

|            | Properties | Attributes |
|------------|------------|------------|
|Type|Any value, standard properties have types described in the spec|A string|
|Name|Name is case-sensitive|Name is not case-sensitive|

Methods to work with attributes are:

- `elem.hasAttribute(name)` -- to check for existence.
- `elem.getAttribute(name)` -- to get the value.
- `elem.setAttribute(name, value)` -- to set the value.
- `elem.removeAttribute(name)` -- to remove the attribute.
- `elem.attributes` is a collection of all attributes.

For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

- We need a non-standard attribute. But if it starts with `data-`, then we should use `dataset`.
- We want to read the value "as written" in HTML. The value of the DOM property may be different, for instance the `href` property is always a full URL, and we may want to get the "original" value.
