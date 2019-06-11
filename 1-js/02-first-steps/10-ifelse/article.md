# Умовні оператори: if, '?'

Іноді нам потрібно виконувати різні дії на основі різних умов.

Для цього ми можемо використовувати вираз `if` та умовний опертор `?`, що також називається оператором "знак питання".

## Вираз "if"

Вираз `if` оцінює умову і, якщо результат умови `true`, виконує блок коду.

Наприклад:

```js run
let year = prompt('У якому році була опублікована специфікація ECMAScript-2015?', '');

*!*
if (year == 2015) alert( 'Ви маєте рацію!' );
*/!*
```

У наведеному вище прикладі умовою є проста перевірка рівності (`year == 2015`), але вона може бути набагато складнішою.

Якщо ми хочемо виконати більше однієї операції, ми повинні загорнути блок коду у фігурні дужки:

```js
if (year == 2015) {
  alert( "Це правильно!" );
  alert( "Ви такий розумний!" );
}
```

Ми рекомендуємо огортати блок коду фігурними дужками `{}` кожного разу, коли ви використовуєте оператор `if`, навіть якщо для виконання виконується одна операція. Це покращує читабельність.

## Булеве перетворення

Оператор `if (…)` оцінює вираз у його дужках і перетворює результат у логічне значення.

Нагадаємо правила перетворення з розділу <info:type-conversions>:

- Число `0`, порожній рядок `""`, `null`, `undefined`, та `NaN` всі перетворюються на `false`. Через це їх називають "неправдивими" значення.
- Інші значення перетворюються на `true`, тому їх називають "правдивими".

Отже, код ніколи не виконається за такої умови:

```js
if (0) { // 0 є неправдивим
  ...
}
```

...а в середені цієї умови -- завжди буде виконуватися:

```js
if (1) { // 1 є правдивим
  ...
}
```

Ми також можемо передавати попередньо обчисленне значення до `if`, наприклад:

```js
let cond = (year == 2015); // рівність обчислюється як true або false

if (cond) {
  ...
}
```

## Вираз "else"

Вираз `if` може містити не обов'язковий блок "else". Він виконується коли умова є неправдивою.

Наприклад:
```js run
let year = prompt('У якому році була опублікована специфікація ECMAScript-2015?', '');

if (year == 2015) {
  alert( 'Ви здогадалися правильно!' );
} else {
  alert( 'Як ви можете так помилятися?' ); // будь-яке значення окрім 2015
}
```

## Декілька умов: "else if"

Іноді ми хотіли б перевірити кілька варіантів умов. Вираз `else if` дозволяє нам це зробити.

Наприклад:

```js run
let year = prompt('У якому році була опублікована специфікація ECMAScript-2015?', '');

if (year < 2015) {
  alert( 'Зарано...' );
} else if (year > 2015) {
  alert( 'Запізно' );
} else {
  alert( 'Саме так!' );
}
```

У наведеному вище коді JavaScript спочатку перевіряє `year < 2015`. Якщо це не вірно вон переходить до наступної умови `year > 2015`. Якщо це також не правда вона показує останній `alert`.

Може бути більше `else if` блоків. Останній `else` є необов'язковим.

## Умовний оператор '?'

Іноді нам необхідно присвоїти значення змінній в заложності від умови.

Наприклад:

```js run no-beautify
let accessAllowed;
let age = prompt('Скільки вам років?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Так званий "умовний" оператор або оператор "знак питання" дає нам зробити це в більш короткій і протій формі.

Оператор представлений знаком питання `?`. Іноді його називають "тернарним", оскільки оператор має три операнди. Насправді це єдиний оператор у JavaScript, який має так багато операндів.

Синтаксис:
```js
let result = умова ? значення1 : значення2;
```

Обчислюється `умова`: якщо умова є правдивою, тоді повертається `значення1`, інакше -- `значення2`.

Наприклад:

```js
let accessAllowed = (age > 18) ? true : false;
```

Технічно ми можемо опускати дужки навколо `age > 18`. Оператор "знак питання" має низький пріоритет, тому він виконується після порівняння `>`.

Цей приклад робить теж саме, що і попередній:

```js
// оператор порівняння "age > 18" виконується першим
// (не потрібно обертати його у дужки)
let accessAllowed = age > 18 ? true : false;
```

Фле дужки роблять код більш читабельним, тому ми рекомендуємо їх використовувати.

````smart
У наведеному вище прикладі можно уникнути використання оператора "знака питання", оскільки само порівняння повертає `true/false`:

```js
// теж саме
let accessAllowed = age > 18;
```
````

## Декілька '?'

Послідовність операторів знака питання `?` може повернути значення, яке залежить від більш ніж однієї умови.

Наприклад:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Привіт, малятко!' :
  (age < 18) ? 'Вітаю!' :
  (age < 100) ? 'Привітання!' :
  'Який незвичайний вік!';

alert( message );
```

It may be difficult at first to grasp what's going on. But after a closer look, we can see that it's just an ordinary sequence of tests:

1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon '":"', checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon '":"', checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon '":"', returning `'What an unusual age!'`.

Here's how this looks using `if..else`:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Non-traditional use of '?'

Sometimes the question mark `?` is used as a replacement for `if`:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

**We don't recommend using the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.
