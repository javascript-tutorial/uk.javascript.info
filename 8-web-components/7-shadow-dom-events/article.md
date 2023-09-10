# Тіньовий DOM та події

Головна мета створення тіньового дерева – це інкапсуляція внутрішньої реалізації компоненту.

Скажімо, було виконано подію click всередині тіньового DOM компоненту `<user-card>`. Але ж скріпти в головному документі і гадки не мають про внутрішню будову тіньового DOM, особливо, якщо компонент походить зі сторонньої бібліотеки. Отже, для збереження інкапсуляції вмісту, браузер *змінює у цієї події цільовий елемент*.

**Події, що відбуваються у тіньовому DOM, впливають на батьківський елемент, навіть якщо відбулися за межами компоненту.**

Розглянемо простий приклад:

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Внутрішній цільовий елемент: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Зовнішній цільовий елемент: " + e.target.tagName);
</script>
```

Клікнувши на кнопку, отримаємо наступні повідомлення:

1. Внутрішній цільовий елемент: `BUTTON` – внутрішній обробник подій отримує правильну ціль – елемент всередині тіньового DOM
2. Зовнішній цільовий елемент: `USER-CARD` – обробник подій документу отримує тіньовий хост в якості цільового елементу


Зміна цільового елементу – чудова річ, тому що зовнішній документ не повинен знати про внутрішній вміст компоненту. З цієї точки зору, подія відбулась в `<user-card>`.

**Зміна цільового елементу не відбувається, якщо подія починається з елементу зі слота, що фактично знаходиться в звичайному світлому DOM.**

Наприклад, якщо користувач клікає на `<span slot="username">` у прикладі, наведеному нижче, цільовим елементом є саме цей `span` елемент, для обох обробників – звичайного (світлого) та тіньового:

```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">Іван Коваль</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Внутрішній цільовий елемент: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Зовнішній цільовий елемент: ${e.target.tagName}`);
</script>
```

Якщо клік відбувся на `"Іван Коваль"`, для обох – внутрішнього та зовнішнього – обробників цільовим елементом є `<span slot="username">`. Так як це елемент зі світлого DOM, то зміни цільового елементу не відбувається.

З іншого боку, якщо клік відбувся на елементі з тіньового DOM, т.я.`<b>Name</b>`, тоді він вспливає з тіньового DOM, a його цільовим елементом `event.target` стає `<user-card>`.

## Спливання, event.composedPath()

Для цілей спливання подій (бульбашковий механізм) використовується розгорнутий DOM.

Отже, якщо у нас є елемент у слоті, і подія відбувається десь усередині цього елементу, тоді вона підіймається до `<slot>` і вище.

Повний шлях до початкового цільового елементу з усіма тіньовими елементами можна отримати за допомогою `event.composedPath()`. Як видно з назви методу, він повертає шлях після композиції.

У наведеному вище прикладі зведений DOM виглядає так:

```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">Іван Коваль</span>
      </slot>
    </div>
</user-card>
```


Отже, для кліку по `<span slot="username">` виклик `event.composedPath()` повертає масив: [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`], що цілковито відображає батьківський ланцюжок, починаючи з цільового елемента у зведеному DOM після композиції.

```warn header="Деталі тіньового дерева надаються лише для дерев з `{mode:'open'}`"
Якщо тіньове дерево було створено з `{mode: 'closed'}`, то тоді складений (composed) шлях починається від хоста: `user-card` і вище.

Це той самий принцип, що і для інших методів, які працюють із тіньовим DOM. Внутрішні частини закритих дерев повністю приховані.
```


## Властивість event.composed

Більшість подій успішно проходять через тіньову межу DOM. Є кілька подій, які цього не роблять.

Це регулюється властивістю об’єкта події `composed`. Якщо це `true`, то подія дійсно перетинає межу. В іншому випадку його можна буде перехопити лише зсередини тіньового DOM.

Якщо ви подивитесь на [UI Events specification](https://www.w3.org/TR/uievents), більшість подій мають `composed: true`:

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Усі сенсорні події та події курсору також мають `composed: true`.

Та існують деякі події, що мають `composed: false`:

- `mouseenter`, `mouseleave` (ці події взагалі не спливають вгору),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Ці події можна перехопити лише на елементах у межах того ж самого DOM, де знаходиться цільовий елемент події.

## Генерація подій (сustom events)

Коли ми генеруємо користувацькі події, нам потрібно встановити для властивостей `bubbles` і `composed` значення `true`, щоб вони спливали та виходили за межі компонента.

Наприклад, тут ми створюємо `div#inner` у тіньовому DOM `div#outer` і запускаємо дві події для нього. Лише та, що має `composed: true`, виходить за межі документа:

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

## Підсумки

Лише ті події перетинають тіньові межі DOM, для прапорця `composed` яких встановлено значення `true`.

Вбудовані події здебільшого мають `composed: true`, як описано у відповідних специфікаціях:

- Події інтерфейсу користувача (UI Events) <https://www.w3.org/TR/uievents>.
- Сенсорні події (Touch Events) <https://w3c.github.io/touch-events>.
- Події курсору (Pointer Events) <https://www.w3.org/TR/pointerevents>.
- ...тощо.

Деякі вбудовані події, що мають `composed: false`:

- `mouseenter`, `mouseleave` (зовсім не спливають),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Ці події можуть бути перехоплені тільки на елементах у межах того самого DOM.

Якщо ми генеруємо `CustomEvent`, тоді нам слід явно встановити `composed: true`.

Зверніть увагу, що у випадку вкладених компонентів один тіньовий DOM може бути вкладений в інший. У цьому випадку складені події проходять через усі тіньові межі DOM. Отже, якщо подія призначена лише для безпосередньо найближчого зовнішнього батьківського компонента, ми також можемо ініціювати її на тіньовому хості і встановити `composed: false`. В такому разі подія виходить із тіньової DOM компонента, але не переходить до DOM вищого рівня.
