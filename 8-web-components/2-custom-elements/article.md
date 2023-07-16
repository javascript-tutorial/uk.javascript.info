
# Кастомні елементи

Ми можемо створювати власні HTML-елементи, описані нашим класом, з власними методами та властивостями, подіями тощо.

Після визначення кастомного елемента ми можемо використовувати його нарівні з вбудованими HTML-елементами.

Це чудово, оскільки словник HTML багатий, але не нескінченний. У ньому немає тегів `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Просто придумайте будь-який інший тег, який нам може знадобитися.

Ми можемо визначити їх за допомогою спеціального класу, а потім використовувати так, ніби вони завжди були частиною HTML.

Існує два типи кастомних елементів:

1. **Автономні кастомні елементи** -- "абсолютно нові" елементи, що розширюють абстрактний клас `HTMLElement`.
2. **Кастомізовані вбудовані елементи** -- розширення вбудованих елементів, наприклад, кастомізованої кнопки, на основі `HTMLButtonElement` тощо.

Спочатку ми розглянемо автономні елементи, а потім перейдемо до кастомізованих вбудованих.

Щоб створити кастомний елемент, нам потрібно вказати браузеру кілька деталей про нього: як його показувати, що робити, коли елемент додається або видаляється зі сторінки тощо.

Це робиться шляхом створення класу зі спеціальними методами. Це легко, оскільки методів небагато, і всі вони необов'язкові.

Ось чернетка з повним списком:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // елемент створено 
  }

  connectedCallback() {
    // браузер викликає цей метод при додаванні елементу в документ
    // (може викликатися багато разів, якщо елемент неодноразово додається/видаляється)
  }

  disconnectedCallback() {
    // браузер викликає цей метод при видаленні елементу з документу
    // (може викликатися багато разів, якщо елемент неодноразово додається/видаляється)
  }

  static get observedAttributes() {
    return [/* масив імен атрибутів для моніторингу змін */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // викликається при зміні одного з перерахованих вище атрибутів
  }

  adoptedCallback() {
    // викликається, коли елемент переміщується в новий документ
    // (відбувається в document.adoptNode, дуже рідко використовується)
  }

  // тут можуть бути інші методи та властивості елемента
}
```

Після цього нам потрібно зареєструвати елемент:

```js
// повідомляємо браузеру, що <my-element> обслуговується нашим новим класом
customElements.define("my-element", MyElement);
```

Тепер для будь-якого HTML-елемента з тегом `<my-element>` створюється екземпляр `MyElement` і викликаються вищезгадані методи. Ми також можемо викликати `document.createElement('my-element')` в JavaScript.

```smart header="Ім'я кастомного елемента повинно містити дефіс `-`"
Ім'я кастомного елемента повинно містити дефіс `-`, наприклад, `my-element` і `super-button` є допустимими іменами, а `myelement` -- ні.

Це робиться для того, щоб уникнути конфліктів імен між вбудованими та кастомними HTML-елементами.
```

## Приклад: "time-formatted"

Наприклад, в HTML вже існує елемент `<time>` для позначення дати/часу. Але він сам по собі не виконує ніякого форматування.

Давайте створимо елемент `<time-formatted>`, який відображатиме час у гарному, зрозумілому форматі:


```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

1. Клас має лише один метод `connectedCallback()` -- браузер викликає його, коли на сторінку додається елемент `<time-formatted>` (або коли парсер HTML виявляє його), і використовує вбудований форматер даних [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat), який добре підтримується всіма браузерами, щоб показати відформатований час.
2. Нам потрібно зареєструвати наш новий елемент за допомогою `customElements.define(tag, class)`.
3. І тоді ми зможемо використовувати його будь-де.


```smart header="Оновлення кастомних елементів"
Якщо браузер зустрічає елементи `<time-formatted>` перед `customElements.define`, це не є помилкою. Але елемент ще невідомий, як і будь-який нестандартний тег.

Такі "невизначені" елементи можна стилізувати за допомогою CSS-селектора `:not(:defined)`.

Коли викликається `customElement.define`, вони "оновлюються": для кожного створюється новий екземпляр `TimeFormatted`
і викликається `connectedCallback`. Після цього вони стають `:defined`.

Для отримання інформації про кастомні елементи існують такі методи:
- `customElements.get(name)` -- повертає клас кастомного елемента з заданим іменем `name`,
- `customElements.whenDefined(name)` -- повертає проміс, який виконується (без значення), коли кастомний елемент з заданим іменем `name` стає визначеним.
```

```smart header="Рендеринг в `connectedCallback`, а не в `constructor`"
У наведеному вище прикладі вміст елемента рендериться (створюється) в `connectedCallback`.

Чому не в `constructor`?

Причина проста: коли викликається `constructor`, ще занадто рано. Елемент створено, але браузер ще не встиг обробити/присвоїти атрибути на цьому етапі: виклик `getAttribute` поверне `null`. Отже, ми не можемо рендерити.

До того ж, якщо подумати, то це краще з точки зору продуктивності -- відкласти роботу до того моменту, коли вона дійсно буде потрібна.

Функція `connectedCallback` спрацьовує, коли елемент додається до документа. Не просто додається до іншого елемента як дочірній, а фактично стає частиною сторінки. Таким чином, ми можемо створювати відокремлений DOM, створювати елементи і готувати їх для подальшого використання. Вони будуть фактично відображені лише тоді, коли потраплять на сторінку.
```

## Відстежування атрибутів

У поточній реалізації `<time-formatted>` після відображення елемента подальші зміни атрибутів не мають жодного ефекту. Це дивно для HTML-елемента. Зазвичай, коли ми змінюємо атрибут, наприклад, `a.href`, ми очікуємо, що зміни буде видно одразу. Давайте це виправимо.

Ми можемо відстежувати атрибути, передавши їх список у статичний геттер `observedAttributes()`. Для таких атрибутів викликається `attributeChangedCallback` при їх зміні. Він не спрацьовує для інших, неперелічених атрибутів (з міркувань продуктивності).

Ось новий `<time-formatted>`, який автоматично оновлюється при зміні атрибутів:

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. Логіку відображення перенесено у допоміжний метод `render()`.
2. Ми викликаємо його перший раз, коли елемент вставляється на сторінку.
3. При зміні атрибута, перерахованого в `observedAttributes()`, спрацьовує `attributeChangedCallback`.
4. ...якій повторно відрендерить елемент.
5. Зрештою, ми можемо легко зробити таймер.

## Порядок відображення

Коли HTML-парсер будує DOM, елементи обробляються один за одним, спочатку батьки, потім діти. Наприклад, якщо ми маємо `<outer><inner></inner></outer>`, то спочатку створюється і підключається до DOM елемент `<outer>`, а потім `<inner>`.

Це призводить до важливих наслідків для кастомних елементів.

Наприклад, якщо кастомний елемент намагається отримати доступ до `innerHTML` в `connectedCallback`, то він нічого не отримає:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // empty (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Якщо ви запустите цей код, то `alert` буде порожнім.

Це саме тому, що на цьому етапі ще немає дочірніх елементів, тобто DOM є незавершеним. Парсер HTML підключив кастомний елемент `<user-info>`, і збирається перейти до його дочірніх елементів, але просто ще не зробив цього.

Якщо ми хочемо передати інформацію кастомному елементу, ми можемо використовувати атрибути. Вони доступні відразу.

Або, якщо нам дійсно потрібні дочірні елементи, ми можемо відкласти доступ до них за допомогою `setTimeout` з нульовою затримкою.

Наприклад, таким чином:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Тепер `alert` у рядку `(*)` показує "John", оскільки ми запускаємо його асинхронно, після завершення розбору HTML. Ми можемо обробити дочірні елементи, якщо потрібно, і завершити ініціалізацію.

З іншого боку, це рішення також не є ідеальним. Якщо вкладені кастомні елементи також використовують `setTimeout` для ініціалізації, то вони стають у чергу: спочатку спрацьовує зовнішній `setTimeout`, а потім внутрішній.

Таким чином, зовнішній елемент завершує ініціалізацію раніше, ніж внутрішній.

Продемонструємо це на прикладі:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} підключено.`);
    setTimeout(() => alert(`${this.id} ініціалізовано.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Порядок виведення:

1. outer підключено.
2. inner підключено.
3. outer ініціалізовано.
4. inner ініціалізовано.

Ми бачимо, що зовнішній елемент завершує ініціалізацію `(3)` раніше, ніж внутрішній `(4)`.

Не існує вбудованого колбеку, який би спрацьовував після того, як вкладені елементи готові. Якщо потрібно, ми можемо реалізувати таку річ самостійно. Наприклад, внутрішні елементи можуть відправляти події типу `initialized`, а зовнішні -- слухати і реагувати на них.

## Кастомізовані вбудовані елементи

Нові елементи, які ми створюємо, такі як `<time-formatted>`, не мають жодної пов'язаної з ними семантики. Вони невідомі пошуковим системам, і пристрої доступності не можуть їх обробляти.

Але такі речі можуть бути важливими. Наприклад, пошуковій системі буде цікаво знати, що ми дійсно показуємо час. І якщо ми робимо особливий тип кнопки, то чому б не використати існуючий функціонал `<button>`?

Ми можемо розширювати та налаштовувати вбудовані HTML-елементи, успадковуючи їхні класи.

Наприклад, кнопки є екземплярами класу `HTMLButtonElement`, використаймо його.

1. Розширюємо `HTMLButtonElement` нашим класом:

    ```js
    class HelloButton extends HTMLButtonElement { /* методи кастомного елемента */ }
    ```

2. Передаємо третій аргумент до `customElements.define`, який визначає тег:
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    Можуть існувати різні теги, які використовують один і той самий DOM-клас, саме тому потрібно вказувати `extends`.

3. Зрештою, щоб використати наш кастомний елемент, вставте звичайний тег `<button>`, але додайте до нього `is="hello-button"`:
    ```html
    <button is="hello-button">...</button>
    ```

Ось повний приклад:

```html run autorun="no-epub"
<script>
// Кнопка, яка каже "привіт" при натисканні
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Привіт!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Клацни мене</button>
*/!*

*!*
<button is="hello-button" disabled>Вимкнено</button>
*/!*
```

Наша нова кнопка розширює вбудовану. Тому вона зберігає ті самі стилі та стандартні функції, такі як атрибут `disabled`.

## Посилання

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Сумісність: <https://caniuse.com/#feat=custom-elementsv1>.

## Підсумки

Кастомні елементи можуть бути двох типів:

1. "Автономні" -- нові теги, що розширюють `HTMLElement`.

    Схема визначення:

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```

2. "Кастомізовані вбудовані елементи" -- розширення існуючих елементів.

    Потребує ще одного аргументу `.define` та `is="..."` у HTML:
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

Кастомні елементи добре підтримуються браузерами. Також існує поліфіл <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
