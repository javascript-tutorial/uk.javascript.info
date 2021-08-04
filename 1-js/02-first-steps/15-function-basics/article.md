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

showMessage(); // Бажаю вам 36.6

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

Якщо всередині функції є змінна з таким самим ім’ям, то вона *затьмарює* зовнішню. Наприклад, наступний код використовує локальну змінну `userName`. Зовнішня ігнорується.

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

Глобальні змінні доступні в будь-якій функції (окрім випадків, коли глобальна змінна затьмарена локальною).

Хорошою практикою вважається мінімізація використання глобальних змінних. У сучасному коді є декалька або одна глобальна змінна. Більшість змінних знаходяться в межах функцій. Іноді, буває корисно зберігати "загальні" дані (на рівні проєкту) в таких глобальних змінних.
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

- Параметр — це змінна всередині дужок функції (використовується під час оголошення функції)
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

### Alternative default parameters

Sometimes it makes sense to assign default values for parameters not in the function declaration, but at a later stage.

We can check if the parameter is passed during the function execution, by comparing it with `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Or we could use the `??` operator:

```js
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when most falsy values, such as `0`, should be considered "normal":

```js run
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Returning a value

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

It is possible to use `return` without a value. That causes the function to exit immediately.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`.

````smart header="A function with an empty `return`or without it returns`undefined`" If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() {
  /* empty */
}

alert(doNothing() === undefined); // true
```

An empty `return` is also the same as `return undefined`:

```js run
function doNothing() {
  return;
}

alert(doNothing() === undefined); // true
```

`````

````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
That doesn't work, because JavaScript assumes a semicolon after `return`. That'll work the same as:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
`````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [Lodash](http://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.
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

    alert(i); // a prime
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

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as _self-describing_.

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
