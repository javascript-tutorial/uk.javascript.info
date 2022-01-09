# Пошук: getElement*, querySelector*

Властивості навігації по DOM чудові, коли елементи розташовані близько один до одного. А якщо ні? Як отримати довільний елемент сторінки?

Для цього існують додаткові методи пошуку.

## document.getElementById або просто id

Якщо елемент має атрибут `id`, ми можемо отримати його за допомогою методу `document.getElementById(id)`, незалежно від того, де він знаходиться.

Наприклад:

```html run
<div id="elem">
  <div id="elem-content">Елемент</div>
</div>

<script>
  // отримати елемент
*!*
  let elem = document.getElementById('elem');
*/!*

  // зробити його фон червоним
  elem.style.background = 'red';
</script>
```

Крім того, існує глобальна змінна з назвою `id`, яка посилається на елемент:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Елемент</div>
</div>

<script>
  // elem -- це посилання на елемент DOM з id="elem"
  elem.style.background = 'red';

  // id="elem-content" містить дефіс всередині, тому не може бути ім’ям змінної
  // ...але ми можемо отримати доступ до нього за допомогою квадратних дужок: window['elem-content']
</script>
```

...Але це лише якщо ми не оголошуємо змінну JavaScript з тим самим ім’ям, інакше вона матиме пріоритет:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // тепер elem дорівнює 5, а не посилається на <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Будь ласка, не використовуйте id-іменовані глобальні змінні для доступу до елементів"
Ця поведінка описана [у специфікації](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), тож це свого роду стандарт. Але він підтримується в основному для сумісності.

Браузер намагається нам допомогти, змішуючи простори імен JS і DOM. Це добре для простих сценаріїв, вбудованих у HTML, але загалом це не дуже добре. Можуть виникнути конфлікти імен. Крім того, коли хтось читає JS-код і не бачить HTML, незрозуміло, звідки приходить змінна.

Тут у підручнику ми використовуємо `id` для прямого посилання на елемент для стислості, коли очевидно, звідки цей елемент походить.

У реальному житті краще надавати перевагу `document.getElementById`.
```

```smart header="`id` має бути унікальним"
`id` має бути унікальним. У документі може бути лише один елемент із заданим `id`.

Якщо є кілька елементів з однаковим `id`, то поведінка методів, які його використовують, буде непередбачуваною, наприклад. `document.getElementById` може повертати будь-який з таких елементів випадковим чином. Тому, будь ласка, дотримуйтеся правила та залишайте `id` унікальним.
```

```warn header="Лише `document.getElementById`, а не `anyElem.getElementById`"
Метод `getElementById` можна викликати лише для об’єкта `document`. Він шукає вказаний `id` у всьому документі.
```

## querySelectorAll [#querySelectorAll]

До сьогодні найуніверсальніший метод -- це `elem.querySelectorAll(css)`, він повертає всі елементи всередині `elem`, що відповідають заданому CSS-селектору.

Тут ми шукаємо всі елементи `<li>`, які є останніми дочірніми:

```html run
<ul>
  <li>Цей</li>
  <li>тест</li>
</ul>
<ul>
  <li>повністю</li>
  <li>пройдено</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "тест", "пройдено"
  }
</script>
```

Цей метод дійсно потужний, оскільки можна використовувати будь-який CSS-селектор.

```smart header="Також можна використовувати псевдокласи"
Псевдокласи в CSS-селекторі, такі як `:hover` і `:active`, також підтримуються. Наприклад, `document.querySelectorAll(':hover')` поверне колекцію елементів, що знаходяться під курсором миші (у порядку вкладення: від крайнього `<html>` до найбільш вкладеного).
```

## querySelector [#querySelector]

Виклик `elem.querySelector(css)` повертає перший елемент, що відповідає даному CSS-селектору.

Іншими словами, результат такий самий, як і `elem.querySelectorAll(css)[0]`, але останній шукає *всі* елементи та вибирає один, а `elem.querySelector` просто шукає один. Тому його писати швидше і коротше.

## matches

Попередні методи виконували пошук по DOM.

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) нічого не шукає, він просто перевіряє, чи відповідає `elem` заданому CSS-селектору. Він повертає `true` або `false`.

Цей метод стає в пригоді, коли ми перебираємо елементи (наприклад, у масиві чи чомусь подібному) і намагаємося відфільтрувати ті, які нас цікавлять.

Наприклад:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // може бути будь-якою колекцією замість document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("Посилання на архів: " + elem.href );
    }
  }
</script>
```

## closest

*Предками* елемента є: батько, батько батька, його батько і так далі. Предки разом утворюють ланцюг батьків від елемента до вершини.

Метод `elem.closest(css)` шукає найближчого предка, який відповідає CSS-селектору. Сам `elem` також включається в пошук.

Іншими словами, метод `closest` підіймається від елемента і перевіряє кожного з батьків. Якщо він збігається з селектором, пошук припиняється, і повертається предок.

Наприклад:

```html run
<h1>Зміст</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Розділ 1</li>
    <li class="chapter">Розділ 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (тому що h1 -- не предок)
</script>
```

## getElementsBy*

Існують також інші методи пошуку елементів за тегом, класом тощо.

Сьогодні вони здебільшого історичні, оскільки `querySelector` є потужнішим і коротшим для написання.

Тому тут ми розглянемо їх переважно для повноти, тоді як ви все ще можете знайти їх у старому коді.

- `elem.getElementsByTagName(tag)` шукає елементи з заданим тегом і повертає їх колекцію. Параметр `tag` також може бути зірочкою `"*"` для "будь-яких тегів".
- `elem.getElementsByClassName(className)` повертає елементи, які мають заданий CSS-клас.
- `document.getElementsByName(name)` повертає елементи з заданим атрибутом `name` для всього документа. Використовується дуже рідко.

Наприклад:
```js
// отримує всі елементи div у документі
let divs = document.getElementsByTagName('div');
```

Знайдімо всі теги `input` в таблиці:

```html run height=50
<table id="table">
  <tr>
    <td>Ваш вік:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> молодше 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> від 18 до 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> старше 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Не забуваємо про літеру `\"s\"`!"
Розробники початківці іноді забувають про літеру `"s"`. Тобто вони намагаються викликати `getElementByTagName` замість <code>getElement<b>s</b>ByTagName</code>.

Літера `"s"` відсутня в `getElementById`, оскільки повертає один елемент. Але `getElementsByTagName` повертає колекцію елементів, тому всередині є `"s"`.
```

````warn header="Повертає колекцію, а не елемент!"
Іншою поширеною помилкою новачків є ось таке написання:

```js
// не працює
document.getElementsByTagName('input').value = 5;
```

Це не спрацює, тому що код приймає *колекцію* вхідних даних і призначає значення їй, а не елементам всередині неї.

Ми повинні або перебрати колекцію, або отримати елемент за його індексом, а потім призначити, як тут:

```js
// має працювати (якщо є input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Шукаємо елементи `.article`:

```html run height=50
<form name="my-form">
  <div class="article">Стаття</div>
  <div class="long article">Довга стаття</div>
</form>

<script>
  // шукаємо за ім’ям атрибуту
  let form = document.getElementsByName('my-form')[0];

  // шукаємо за класом всередині form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, знаходимо два елементи з класом "article"
</script>
```

## Живі колекції

Усі методи `"getElementsBy*"` повертають *живу* колекцію. Такі колекції завжди відображають поточний стан документа і "автооновлюються" при його зміні.

У нижченаведеному прикладі є два скрипта.

1. Перший створює посилання на колекцію `<div>`. На даний момент його довжина дорівнює `1`.
2. Другий скрипт запускається після того, як браузер зустріне ще один `<div>`, тому його довжина дорівнює `2`.

```html run
<div>Перший div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Другий div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

На відміну від цього, `querySelectorAll` повертає *статичну* колекцію. Це схоже на фіксований масив елементів.

Якщо ми використаємо його у вищенаведеному прикладі, тоді обидва сценарії виведуть `1`:


```html run
<div>Перший div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Другий div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Тепер ми легко бачимо різницю. Статична колекція не збільшилася після появи нового `div` у документі.

## Підсумки

Існує 6 основних методів пошуку елементів у DOM:

<table>
<thead>
<tr>
<td>Метод</td>
<td>Шукає, використовуючи...</td>
<td>Чи може викликатися на елементі?</td>
<td>Чи повертає живу колекцію?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-селектор</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-селектор</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>ім’я</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>тег або <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>клас</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Найчастіше використовуються `querySelector` і `querySelectorAll`, але `getElement(s)By*` може бути корисним час від часу або знаходитися в старому коді.

Крім того:

- `elem.matches(css)` існує для того, щоб перевірити, чи відповідає `elem` заданому CSS-селектору.
- `elem.closest(css)` існує для того, щоб шукати найближчого предка, який відповідає заданому CSS-селектору. Сам `elem` також перевіряється.

І згадаймо тут ще один метод перевірки взаємовідносин нащадок-предок, оскільки він іноді стає в нагоді:
- `elemA.contains(elemB)` повертає true, якщо `elemB` знаходиться всередині `elemA` (нащадок `elemA`) або коли `elemA==elemB`.