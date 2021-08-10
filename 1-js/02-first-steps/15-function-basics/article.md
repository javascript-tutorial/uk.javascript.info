# Функції

Досить часто нам потрібно виконати однакову дію в декількох місцях програми.

Наприклад, нам треба показати якесь повідомлення, коли користувач входить або виходить з системи і може ще десь.

Функції — це головні "будівельні блоки" програми. Вони дозволяють робити однакові дії багато разів без повторення коду.

Ми вже стикались з такими вбудованими функціями, як-от `alert(message)`, `prompt(message, default)` та `confirm(question)`. Але ми теж можемо створювати свої функції.

## Оголошення (декларація) функцій

Щоб створити функцію нам треба її *оголосити*.

Це виглядає ось так:

```js
function showMessage() {
  alert('Всім привіт!');
}
```

Спочатку ми пишемо `function` — це ключове слово (keyword), яке дає зрозуміти комп’ютеру, що далі буде оголошення функції. Потім — *назву функції* і список її *параметрів* в дужках (розділені комою). Якщо параметрів немає, ми залишаємо *пусті дужки*. І нарешті, код функції, який також називають *тілом функції* між фігурними дужками.

```js
function name(parameter1, parameter2, ... parameterN) {
  ...тіло функції...
}
```

Нашу нову функцію можна викликати, написавши її ім’я і дужки: `showMessage()`.

Наприклад:

```js run
function showMessage() {
  alert( 'Шановні друзі!' );
}

*!*
showMessage();
showMessage();
*/!*
```

Виклик `showMessage()` виконує код із тіла функції. В цьому випадку, ми побачимо повідомлення двічі.

Цей приклад яскраво демонструє одну з найголовніших цілей функції -- уникнення повторення коду.

Якщо нам потрібно змінити повідомлення, достатньо змінити тіло функції, яке виводить це повідомлення.

## Локальні змінні

Змінна, яка оголошена в функції доступна лише в тілі цієї функції.

Наприклад:

```js run
function showMessage() {
*!*
  let message = "Привіт, я JavaScript!"; // локальна змінна
*/!*

  alert( message );
}

showMessage(); // Привіт, я JavaScript!

alert( message ); // <-- Помилка! Змінна недоступна поза функцією
```

## Зовнішні змінні

Функція може використовувати зовнішні змінні, наприклад:

```js run no-beautify
let *!*userName*/!* = 'Іван';

function showMessage() {
  let message = 'Привіт, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Привіт, Іван
```

Функція має повний доступ до зовнішньої змінної. Вона теж може її змінювати.

Наприклад:

```js run
let *!*userName*/!* = 'Іван';

function showMessage() {
  *!*userName*/!* = "Богдан"; // (1) змінено зовнішню змінну

  let message = 'Здоровенькі були, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*Іван*/!* перед викликом функції showMessage

showMessage();

alert( userName ); // *!*Богдан*/!*, значення було змінено після виклику функції showMessage
```

Зовнішня змінна використовується тоді, коли немає локальної.

Якщо всередині функції є змінна з таким самим ім’ям, то вона *перекриває* зовнішню. Наприклад, наступний код використовує локальну змінну `userName`. Зовнішня ігнорується.

```js run
let userName = 'Іван'; // оголошення зовнішньої змінної

function showMessage() {
*!*
  let userName = "Богдан"; // оголошення локальної змінної
*/!*

  let message = 'Привіт, ' + userName; // *!*Богдан*/!*
  alert(message);
}

// функція завжди віддасть перевагу локальним змінним
showMessage();

alert( userName ); // *!*Іван*/!*, без змін, функція не змінила глобальну змінну
```

```smart header="Глобальні змінні"
Змінні, оголошені поза будь-якими функціями (такі як зовнішня зміння `userName` з коду вище), називаються *глобальні* змінні.

Глобальні змінні доступні в будь-якій функції (окрім випадків, коли глобальна змінна перекрита локальною).

Хорошою практикою вважається мінімізація використання глобальних змінних. У сучасному коді зазвичай є декілька або зовсім немає глобальних змінних. Більшість змінних знаходяться в межах функцій. Іноді буває корисно зберігати "загальні" дані (на рівні проєкту) в таких глобальних змінних.
```

## Параметри

Ми можемо передати в функцію довільні дані використовуючи параметри.

В наступному прикладі, функція має два параметри: `from` і `text`.

```js run
function showMessage(*!*from, text*/!*) { // параметри: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Анна', 'Привіт!');*/!* // Анна: Привіт! (*)
*!*showMessage('Анна', "Як справи?");*/!* // Анна: Як справи? (**)
```

Під час виклику функції з цими параметрами, в рядках `(*)` та `(**)` відбувається копіювання значень параметрів в локальні змінні `from` та `text`. Ці змінні використовує функція.

Ось ще один приклад: маємо змінну `from`, яку передаємо в функцію. Зауважте: функція змінює значення `from`, проте ці зміни не видно назовні, тому що функція завжди отримує копію значення:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // прикрашаємо "from"
*/!*

  alert( from + ': ' + text );
}

let from = "Анна";

showMessage(from, "Привіт"); // *Анна*: Привіт

// значення "from" те саме, функція змінила локальну копію
alert( from ); // Анна
```

Коли значення передається як параметр функції, то його ще називають *аргумент*.

Кажучи "на хлопський розум":

- Параметр — це змінна між дужками функції (використовується під час оголошення функції)
- Аргумент — це значення, передане в функцію під час її виклику (використовується під час виконання функції).

Ми оголошуємо функції, вказуючи їхні параметри, потім викликаємо їх, передаючи аргументи.

Дехто може сказати, що в прикладі вище "функцію `sayMessage` оголошено з двома параметрами, потім викликано з двома аргументами: `from` і `"Привіт"`".


## Типові значення

Якщо викликати функцію без аргументів, тоді відповідні значення стануть `undefined`.

Наприклад, функцію `showMessage(from, text)`, яку ми згадували вище, можна викликати з одним аргументом:

```js
showMessage('Анна');
```

Помилки не виникне. Такий виклик виведе `"*Анна*: undefined"`. Оскільки значення для змінної `text` не задане, воно стане `undefined`.

Ми можемо задати так зване "типове" значення параметра, яке використовуватиметься, якщо не задати аргумент. Для цього потрібно написати значення через `=`:

```js run
function showMessage(from, *!*text = "текст не задано"*/!*) {
  alert( from + ": " + text );
}

showMessage("Анна"); // Анна: текст не задано
```

Тепер, якщо параметр `text` не задано, його значення стане `"текст не задано"`.

Тут `"текст не задано"` це рядок, проте це може бути складніший вираз, який обчислюється і присвоюється лише якщо параметр відсутній. Отож, такий варіант теж можливий:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() виконується лише якщо `text` не задано
  // результат виконання цієї функції присвоїться змінній `text`
}
```

```smart header="Обчислення типових параметрів"
В JavaScript, типовий параметр обчислюється кожного разу, коли викликається функція без відповідного параметру.

В прикладі вище, функція `anotherFunction()` не викличеться, якщо буде задано параметр `text`.

З іншого боку, вона буде викликатися кожного разу, коли `text` відсутній.
```

### Альтернативні типові параметри

Інколи виникає необхідність присвоїти типове значення для змінних під час виконання функції, а не під час її оголошення.

Під час виконання функції, ми можемо перевірити, чи параметр надано, порівнюючи його з `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // якщо параметр відсутній
    text = 'порожнє повідомлення';
  }
*/!*

  alert(text);
}

showMessage(); // порожнє повідомлення
```

...Або ми можемо використати оператор `??`:

```js
function showMessage(text) {
  // якщо text не задано (значення `undefined`) або `null`, тоді присвоїти рядок 'порожньо'
  text = text || 'порожньо';
  ...
}
```

Сучасні рушії JavaScript підтримують [оператор null-злиття](info:nullish-coalescing-operator) `??`. Його краще використовувати, коли "майже false" значення, типу `0`, мають вважатися за "нормальні":

```js run
function showCount(count) {
  // якщо count має значення undefined чи null, показати "невідомо"
  alert(count ?? "невідомо");
}

showCount(0); // 0
showCount(null); // невідомо
showCount(); // невідомо
```

## Повернення значення

В якості результату, функція може повертати назад значення в код, який викликав цю функцію.

Найпростіший приклад — функція, яка сумує два значення:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

Директива `return` може бути в будь-якому місці функції. Коли виконання досягає цієї директиви, функція зупиняється, і в код, який викликав цю функцію, повертається значення (в прикладі вище, це значення присвоюється змінній `result`).

В одній функції може бути декілька директив `return`. Наприклад:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('У вас є дозвіл ваших батьків?');
*/!*
  }
}

let age = prompt('Скільки вам років?', 18);

if ( checkAge(age) ) {
  alert( 'Доступ надано' );
} else {
  alert( 'У доступі відмовлено' );
}
```

Можна використовувати `return` без значення. Це призведе до негайного виходу з функції.

Наприклад:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Показуємо фільм" ); // (*)
  // ...
}
```

В коді вище, якщо `checkAge(age)` поверне `false`, тоді функція `showMovie` не дійде до виконання `alert`.

````smart header="Функція з порожнім `return`, або без `return` повертає `undefined`"
Якщо функція не повертає значення, тоді "повернене" значення буде `undefined`:

```js run
function doNothing() { /* порожньо */ }

alert( doNothing() === undefined ); // true
```

Порожній `return` це те саме, що `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Ніколи не додавайте новий рядок між `return` і значенням"
Іноді кортить перенести довгий вираз після `return` на новий рядок, ось так:

```js
return
 ('деякий' + 'довгий' + 'вираз' + 'або' + 'що' * f(a) + f(b))
```
Це не спрацює, тому що JavaScript вважатиме новий рядок після `return` за крапку з комою. Це працюватиме ось так:

```js
return*!*;*/!*
 ('деякий' + 'довгий' + 'вираз' + 'або' + 'що' * f(a) + f(b))
```

Тобто, повернеться порожній результат.

Якщо ми хочемо повернути довгий вираз, який займе декілька рядків, ми повинні писати його на одному рядку з `return`. Або обгорнути його в дужки. Ось так:

```js
return (
  'деякий' + 'довгий' + 'вираз'
  + 'або' +
  'що' * f(a) + f(b)
  )
```
Такий варіант працюватиме так, як ми задумали.
````

## Найменування функції [#function-naming]

Функції виконують дії. Тому в їхніх назвах зазвичай використовують дієслова. Назва повинна бути лаконічна, повинна якнайточніше описувати, що робить функція, щоб кожен хто читає код зміг зрозуміти, що саме робить функція.

Поширена практика розпочинати назву функції зі словесного префіксу, який описує дію. В команді має бути домовленість щодо значення префіксів.

Наприклад, функції, які починаються з префіксу `"show"` зазвичай щось показують.

Функції, які починаються з ...

- `"get…"` -- повертають значення,
- `"calc…"` -- щось обчислюють,
- `"create…"` -- щось створюють,
- `"check…"` -- щось перевіряють і повертають булеве значення.

Ось приклади таких назв:

```js no-beautify
showMessage(..)     // показує повідомлення
getAge(..)          // повертає вік (якось його отримує або обчислює)
calcSum(..)         // обчислює суму і повертає результат
createForm(..)      // створює форму (і зазвичай її повертає)
checkPermission(..) // перевіряє доступ, повертає true/false
```

Якщо є префікси, погляд на назву функції дає зрозуміти, яку роботу вона виконує і яке значення повертає.

```smart header="Одна функція -- одна дія"
Функція повинна робити саме те, що написано в її назві, не більше.

Дві незалежні дії зазвичай заслуговують двох функцій, навіть якщо вони зазвичай викликаються разом (у цьому випадку ми можемо створити 3-ю функцію, яка викликає ці дві).

Ось декілька прикладів, які порушують це правило:

- `getAge` -- функція викликає `alert` з віком (а повинна лише отримувати вік).
- `createForm` -- функція змінює документ, додаючи форму до неї (а повинна лише створити форму і її вернути).
- `checkPermission` -- функція відображає повідомлення `доступ надано/відхилено` (а повинна лише повертати результат `true/false`).

Ці приклади передбачають загальне значення префіксів. Ви та ваша команда можете вільно домовлятися про інші значення, але зазвичай вони не сильно відрізняються. У будь-якому випадку ви повинні чітко розуміти, що означає префікс, що може робити префіксна функція, а що ні. Усі функції з однаковими префіксами повинні підкорятися правилам. І команда повинна ділитися знаннями.
```

```smart header="Дуже короткі назви функцій"
Функції, які використовуються *дуже часто* деколи мають дуже короткі назви.

Наприклад, фреймворк [jQuery](http://jquery.com) оголошує функцію знаком `$`. Бібліотека [Lodash](http://lodash.com/) має вбудовану функцію, яка називається `_`.

Це винятки. Загалом назви функцій повинні бути стислими та описовими.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
