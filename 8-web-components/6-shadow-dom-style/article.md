# Стилізація тіньового DOM

Тіньовий DOM може включати в себе обидва теги `<style>` та `<link rel="stylesheet" href="…">`. В останньому випадку, таблиці стилів зберігаються в кеші  HTTP, тому вони не завантажуються наново для кількох компонентів, які використовують один і той самий шаблон.

Як правило, локальні стилі працюють лише всередині тіньового дерева та стилі документу працюють ззовні. Але є декілька винятків.

## :host

Селектор `:host` дозволяє обрати тіньовий хост (елемент, що містить в собі тіньове дерево).

Наприклад, ми створюємо елемент `<custom-dialog>`, який має бути центрованим. Для цього нам треба стилізувати безпосередньо елемент `<custom-dialog>`.

Саме це робить `:host`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* стиль буде застосовано зсередини до елементу custom-dialog */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Привіт!
</custom-dialog>
```

## Каскад

Тіньовий хост (безпосередньо `<custom-dialog>`) розташований в світлому DOM, тому на нього впливають CSS-правила документу.

Якщо деяка властивість має стилі в `:host` локально та в документі, тоді пріоритет мають стилі документу.

Наприклад, якщо в документі ми маємо:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Тоді `<custom-dialog>` не матиме відступів.

Це дуже зручно, оскільки ми можемо встановити типові стилі компоненту всередині його `:host` правила, та легко перевизначити їх в документі опісля.

Винятком є ситуація, в якій локальна властивість позначена як `!important`, для таких властивостей, пріоритет надається локальним стилям.


## :host(selector)

Теж саме, що й `:host`, але застосовується лише у випадку, коли тіньовий хост співпадає з  `selector`.

Наприклад, ми бажаємо центрувати `<custom-dialog>`, тільки якщо він має атрибут `centered`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Центровано!
</custom-dialog>

<custom-dialog>
  Не центровано.
</custom-dialog>
```

Тепер додаткові стилі центрування застосовуються лише до першого діалогу: `<custom-dialog centered>`.

Підсумовуючи, ми можемо використовувати сімейство селекторів `:host` для стилізації основного елементу компоненту. Ці стилі (окрім позначених як `!important`) можуть бути перевизначені всередині документу.

## Стилізація контенту слотів

Розглянемо ситуацію зі слотами.

Елементи слотів приходять зі світлого DOM, тому вони використовують стилі документу. Локальні стилі не впливають на вміст слотів.

У наведеному нижче прикладі , `<span>` має жирний шрифт, згідно стилю документу, але не приймає `background` з локального стилю:
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>Петро Щур</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Результат має жирний шрифт, але не червоний фон.

Якщо б ми забажали стилізувати елементи в нашому компоненті, ми б мали два варіанти.

Перший: стилізувати конкретно `<slot>` та розраховувати на CSS успадкування:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>Петро Щур</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

В даному випадку, `<p>Петро Щур</p>` має жирний шрифт, оскільки CSS успадкування діє між `<slot>` та його наповненням. Але в самому CSS не всі властивості успадковуються.

Другою опцією є використання псевдо-класу `::slotted(selector)`. Він співвідносить елементи відповідно двом умовам:

1. Це елемент, що приходить зі світлого DOM. Назва слоту не має значення. Будь-який елемент, але лише цей елемент, а не його діти.
2. Елемент збігається з `selector`.

В нашому прикладі, `::slotted(div)` обирає саме `<div slot="username">`, без дочірніх елементів:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>Петро Щур</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Зверніть увагу, селектор `::slotted` не може спускатися вниз структурою слоту. Такі селектори є невалідними:

```css
::slotted(div span) {
  /* наш <div> з цим не збігається */
}

::slotted(div) p {
  /* не може потрапити всередину світлого DOM */
}
```

Також, `::slotted` може використовуватись лише в CSS. Ми не можемо ним користуватись в `querySelector`.

## CSS хуки з кастомними властивостями

Як ми можемо стилізувати внутрішні елементи компоненту з основного документу?

Селектори по типу `:host` застосовують правила до елементу `<custom-dialog>` чи `<user-card>`, але як стилізувати елементи тіньового DOM всередині нього?

Жоден селектор не може напряму вплинути на стилі тіньового DOM зсередини документу. Але так само, як ми надали доступ до методів, аби ті взаємодіяли з нашим компонентом, ми можемо відкрити для стилізації CSS змінні(кастомні CSS властивості).

**Кастомні CSS властивості існують на всіх рівнях, як в світловому, так і в тіньовому.**

Наприклад, в тіньовому DOM ми можемо використовувати CSS змінну `--user-card-field-color` для стилізації полів, а зовнішній документ може призначати їй значення:

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* якщо --user-card-field-color не призначено, використовуємо чорний колір */
  }
</style>
<div class="field">Ім’я: <slot name="username"></slot></div>
<div class="field">День народження: <slot name="birthday"></slot></div>
```

Після того, ми можемо оголосити цю властивість в зовнішньому документі для `<user-card>`:

```css
user-card {
  --user-card-field-color: green;
}
```

Кастомні CSS властивості пронизують тіньовий DOM, вони є видимими усюди, тож внутрішнє правило `.field` їх використає.

Нижче наведений повний приклад:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Ім’я: <slot name="username"></slot></div>
  <div class="field">День народження: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">Петро Щур</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```



## Підсумки

Тіньовий DOM може включати в себе стилі, як то `<style>` чи `<link rel="stylesheet">`.

Локальні стилі можуть впливати на:
- тіньове дерево,
- тіньовий хост з псевдокласами `:host` та `:host()`,
- елементи(приходять зі світлого DOM), `::slotted(selector)` дозволяє обрати лише їх, без дочірніх елементів.

Стилі документу можуть впливати на:
- тіньовий хост (через його перебування в зовнішньому документі)
- елементи та їх вміст (також через перебування в зовнішньому документі)

Коли CSS властивості суперечать одна одній, зазвичай стилі документу мають перевагу, якщо дана властивість не позначена як `!important`. Тоді перевага надається локальним стилям.

CSS кастомні властивості пронизують тіньовий DOM. Вони використовуються в якості хуків, аби стилізувати компонент:

1. Компонент використовує кастомну CSS властивість задля стилізації ключових елементів, таких як `var(--component-name-title, <default value>)`.
2. Автор компоненту робить ці властивості публічними для розробників, вони так само важливі як й інші публічні методи компоненту.
3. Коли розробник хоче стилізувати заголовок, вони присвоюють CSS властивість `--component-name-title` тіньовому хосту або рівню вище.
4. Профіт!
