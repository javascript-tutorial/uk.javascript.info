# Властивості та методи форми

Форми та елементи керування, такі як `<input>`, мають багато спеціальних властивостей і подій.

Працювати з формами буде набагато зручніше, коли ми їх вивчимо.

## Навігація: форми та елементи

Форми в документі є членами спеціальної колекції `document.forms`.

Це так звана *"іменована колекція"*: щоб отримати форму ми можемо використовувати як її ім’я, так і порядковий номер у документі.

```js no-beautify
document.forms.my; // форма з іменем "my" (name="my")
document.forms[0]; // перша форма в документі
```

Коли у нас є форма, будь-який її елемент доступний в іменованій колекції `form.elements`.

Наприклад:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // отримуємо форму
  let form = document.forms.my; // елемент <form name="my">

  // отримуємо елемент
  let elem = form.elements.one; // елемент <input name="one">

  alert(elem.value); // 1
</script>
```

У колекції може бути кілька елементів з однаковим ім’ям (`name`). Це типово для перемикачів (radio buttons) та чекбоксів (checkboxes).

В такому випадку `form.elements[name]` -- це *колекція*. Наприклад:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

Ці властивості навігації не залежать від структури тегів в середині форми. Усі елементи керування, незалежно від того, наскільки глибоко вони розташовані у формі, доступні в колекції `form.elements`.


````smart header="Елементи `<fieldset>` як \"підформи\""
Форма може містити всередині один або кілька елементів `<fieldset>`. Вони також мають властивість `elements`, яка містить колекцію елементів керування всередині них.

Наприклад:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // ми можемо отримати поле за іменем як з форми, так і з елементу fieldset
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Коротший варіант: `form.name`"
Існує коротший варіант запису: ми можемо отримати доступ до елемента через `form[index/name]`.

Іншими словами, замість `form.elements.login` ми можемо написати `form.login`.

Такий варіант також працює, але є незначна проблема: якщо ми отримуємо доступ до елемента, а потім змінюємо його ім’я (`name`), то він все ще буде доступний під старим ім’ям (а також під новим).

Це легко побачити на прикладі:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, це один і той самий <input>

  form.login.name = "username"; // змінюємо ім’я поля вводу

  // form.elements оновив ім’я:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // а у формі доступні обидва імені: нове та старе
  alert(form.username == form.login); // true
*/!*
</script>
```

Однак це зазвичай не проблема, оскільки ми рідко змінюємо імена елементів форми.

````

## Зворотне посилання: element.form

Для будь-якого елемента форми, сама форма доступна у властивості `element.form`. Таким чином, форма посилається на всі елементи, а елементи посилаються на форму.

Ось картинка:

![](form-navigation.svg)

Наприклад:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Елементи форми

Розглянемо елементи керування формою.

### input та textarea

Ми можемо отримати доступ до їх значення через властивість `input.value` (рядок) або `input.checked` (логічне значення) для чекбоксів і перемикачів (radio buttons).

Ось так:

```js
input.value = "Нове значення";
textarea.value = "Новий текст";

input.checked = true; // для чекбокса або перемикача (radio button)
```

```warn header="Використовуйте `textarea.value` замість `textarea.innerHTML`"
Зауважте, що, попри те, що `<textarea>...</textarea>` зберігає своє значення як вкладений HTML, ми ніколи не повинні використовувати `textarea.innerHTML` для доступу до нього.

Властивість `innerHTML` містить лише початковий HTML, а не поточне значення.
```

### select та option

Елемент `<select>` має 3 важливі властивості:

1. `select.options` -- набір піделементів `<option>`,
2. `select.value` -- *значення* поточного обраного елемента `<option>`,
3. `select.selectedIndex` -- *номер* поточного обраного елемента `<option>`.

Вони надають три різні способи встановлення значення для `<select>`:

1. Знайти відповідний елемент `<option>` (наприклад, серед `select.options`) і встановити для його властивості `option.selected` значення `true`.
2. Якщо ми знаємо нове значення: встановити нове значення для `select.value`.
3. Якщо ми знаємо порядковий номер опції: встановити це число для `select.selectedIndex`.

Ось приклад усіх трьох методів:

```html run
<select id="select">
  <option value="apple">Яблуко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select>

<script>
  // всі три рядки роблять те саме
  select.options[2].selected = true; 
  select.selectedIndex = 2;
  select.value = 'banana';
  // зверніть увагу: опції починаються з нуля, тому індекс 2 означає 3-й варіант.
</script>
```

На відміну від більшості інших елементів керування, `<select>` дозволяє вибрати декілька опцій одночасно, якщо він має атрибут `multiple`. Однак цей атрибут використовується рідко.

Для вибору кількох значень скористайтеся першим способом встановлення значень: встановіть або видаліть властивість `selected` для піделементів `<option>`.

Ось приклад того, як отримати вибрані значення з елемента `<select>` з множинним вибором:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Блюз</option>
  <option value="rock" selected>Рок</option>
  <option value="classic">Класика</option>
</select>

<script>
  // отримати всі вибрані значення з множинного вибору
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

Вся інформація щодо елемента `<select>` доступна в специфікації <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

У [специфікації](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) є гарний короткий синтаксис для створення елемента `<option>`:

```js
option = new Option(text, value, defaultSelected, selected);
```

Цей синтаксис необов’язковий. Ми можемо використати `document.createElement('option')` і встановити атрибути вручну. Однак те саме можна зробити коротше, тому ось параметри:

- `text` -- текст всередині опції,
- `value` -- значення опції,
- `defaultSelected` -- якщо `true`, то до опції буде додано HTML-атрибут `selected`,
- `selected` -- якщо `true`, то опція буде обраною.

<<<<<<< HEAD
Різниця між `defaultSelected` та `selected` полягає в тому, що `defaultSelected` встановлює HTML-атрибут (який ми можемо отримати за допомогою `option.getAttribute('selected')`, тоді як `selected` визначає, обрана опція чи ні.
=======
The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`), while `selected` sets whether the option is selected or not.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

На практиці зазвичай слід встановлювати значення _обох_ параметрів на `true` або `false`. (Або просто не додавайте їх -- за замовчуванням вони мають значення `false`.)

Ось, наприклад, створення нової "невибраної" опції:

```js
let option = new Option("Текст", "value");
// створює <option value="value">Текст</option>
```

Та сама опція, але обрана:

```js
let option = new Option("Текст", "value", true, true);
```

Елементи `<option>` мають такі властивості:

`option.selected`
: Вказує чи обрана опція.

`option.index`
: Номер опції серед інших в елементі `<select>`.

`option.text`
: Текстовий зміст опції (те, що бачить відвідувач).

## Посилання

- Специфікація: <https://html.spec.whatwg.org/multipage/forms.html>.

## Підсумки

Навігація по формам:

`document.forms`
: Отримати форму можна через `document.forms[name/index]`.

`form.elements`  
: Елементи форми можна отримати за допомогою `form.elements[ім’я/індекс]`, або можна використовувати лише `form[name/index]`. Властивість `elements` також доступна для `<fieldset>`.

`element.form`
: Елементи посилаються на свою форму через властивість `form`.

Значення елементів форми доступні як `input.value`, `textarea.value`, `select.value` тощо (для чекбоксів та перемикачів використовуйте `input.checked`, щоб визначити, чи вибрано значення.)

Для елемента `<select>` також можна отримати значення за індексом `select.selectedIndex` або за допомогою колекції опцій `select.options`.

Це були основи для початку роботи з формами. Далі ми зустрінемо ще багато прикладів у підручнику.

У наступному розділі ми розглянемо події `focus` та `blur`, які можуть відбуватися на будь-якому елементі, але в основному обробляються у формах.
