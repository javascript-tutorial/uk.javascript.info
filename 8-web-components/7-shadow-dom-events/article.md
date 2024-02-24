# Тіньовий DOM та події

Головна мета створення тіньового дерева -- це інкапсуляція внутрішньої реалізації компоненту.

Уявімо, користувач клікнув на якийсь елемент всередені тіньового DOM компоненту `<user-card>`, і відбулася подія click. Але ж скріпти в головному документі і гадки не мають про внутрішню будову тіньового DOM, особливо, якщо компонент походить зі сторонньої бібліотеки. 

Отже, для збереження інкапсуляції вмісту, браузер *змінює у цієї події цільовий(target) елемент*.

**Події, що відбуваються у тіньовому DOM, мають його "host" у властивості `target` об'єкту події, якщо подія обробляється за межами компоненту.**

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
      e => alert("target зсередини: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("target ззовні: " + e.target.tagName);
</script>
```

Клікнувши на кнопку, отримаємо наступні повідомлення:

1. target зсередини: `BUTTON` -- внутрішній обробник подій отримує правильний target -- елемент всередині тіньового DOM.
2. target ззовні: `USER-CARD` -- обробник подій документу отримує тіньовий хост в якості target події.

Зміна target події -- чудова річ, бо зовнішній документ не повинен знати про внутрішній вміст компоненту. З цієї точки зору, подія відбулась в `<user-card>`.

**Зміна target не відбувається, якщо подія починається з елементу зі слоту, що фактично знаходиться в звичайному світлому DOM.**

Наприклад, якщо користувач клікає на `<span slot="username">` у прикладі, наведеному нижче, цільовим елементом є саме цей елемент `span`, для обох обробників -- звичайного (світлого) та тіньового:

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
      e => alert("target зсередини: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`target ззовні: ${e.target.tagName}`);
</script>
```

Якщо клік відбувся на `"Іван Коваль"`, для обох -- внутрішнього та зовнішнього -- обробників у target буде елемент `<span slot="username">`. Це елемент зі світлого DOM, тому зміна target не відбувається.

З іншого боку, якщо клік відбувся на елементі з тіньового DOM, напр. на `<b>Name</b>`, то коли він вспливає з тіньового DOM, його `event.target` стає `<user-card>`.

## Спливання, event.composedPath()

Для реалізації спливання подій (бульбашковий механізм) використовується підхід розгорнутого DOM.

Отже, якщо у нас є елемент у слоті, і подія відбувається десь всередині цього елементу, тоді вона підіймається до `<slot>` і вище.

Повний шлях до справжнього target елементу цієї події, включаючи всі тіньові елементи, можна отримати за допомогою `event.composedPath()`. Як видно з назви методу, він повертає шлях після складання всіх його елементів.

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


Отже, для кліку по `<span slot="username">` виклик `event.composedPath()` повертає масив: [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`], що цілковито відображає батьківський ланцюжок, починаючи з target елемента у зведеному DOM після складання.

```warn header="Деталі тіньового дерева надаються лише для дерев з `{mode:'open'}`"
Якщо тіньове дерево було створено з `{mode: 'closed'}`, то тоді складений (composed) шлях починається від хоста: `user-card` і вище.

Це той самий принцип, що і для інших методів, які працюють із тіньовим DOM. Внутрішні частини закритих дерев повністю приховані.
```


## Властивість event.composed

Більшість подій успішно проходять через тіньову межу DOM. Є кілька подій, які нездатні на це.

Це регулюється властивістю об’єкта події `composed`. Якщо вона `true`, то подія дійсно може перетнути межу. В іншому випадку її можна буде перехопити лише зсередини тіньового DOM.

Якщо ви подивитесь на [UI Events specification](https://www.w3.org/TR/uievents), більшість подій мають `composed: true`:

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Усі сенсорні події та події курсору також мають `composed: true`.

Та існують деякі події, що мають `composed: false`:

- `mouseenter`, `mouseleave` (ці події взагалі не вспливають),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Ці події можна перехопити лише на елементах у межах того ж самого DOM, де знаходиться target елемент події.

## Генерація подій (Custom events)

Коли ми генеруємо користувацькі події, нам потрібно встановити для властивостей `bubbles` і `composed` значення `true`, щоб вони вспливали та виходили за межі компонента.

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

Лише ті події перетинають тіньові межі DOM, у прапорці `composed` яких задано значення `true`.

Вбудовані події здебільшого мають `composed: true`, як описано у відповідних специфікаціях:

- Події інтерфейсу користувача (UI Events) <https://www.w3.org/TR/uievents>.
- Сенсорні події (Touch Events) <https://w3c.github.io/touch-events>.
- Події вказівника (Pointer Events) <https://www.w3.org/TR/pointerevents>.
- ...тощо.

Деякі вбудовані події, що мають `composed: false`:

- `mouseenter`, `mouseleave` (зовсім не спливають),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Ці події можуть бути перехоплені тільки на елементах у межах того самого DOM.

Якщо ми генеруємо `CustomEvent`, тоді нам слід явно встановити `composed: true`.

Зверніть увагу, що у випадку вкладених компонентів один тіньовий DOM може бути вкладений в інший. У цьому випадку складені події проходять через усі тіньові межі DOM. Отже, якщо подія призначена лише для безпосередньо найближчого зовнішнього батьківського компонента, ми також можемо ініціювати її на тіньовому хості і встановити `composed: false`. В такому разі подія виходить із тіньової DOM компонента, але не переходить до DOM вищого рівня.
