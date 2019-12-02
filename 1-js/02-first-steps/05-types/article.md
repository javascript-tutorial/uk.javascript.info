# Типи даних

Змінна в JavaScript може містити будь-які дані. Змінна може в один момент бути рядком, а в інший - числом:

```js
// тут не буде помилки
let message = "привіт";
message = 123456;
```

Мова програмування, яка дозволяє таке робити, називається "динамічно типізованою". Мається на увазі, що є різні типи даних, але змінні не прив'язанні до жодного типу.

<<<<<<< HEAD
Існує сім базових типів в JavaScript. У цьому розділі ми розглянемо їх поверхнево, але в наступних розлянемо кожен більш детально.

## Число (number)
=======
There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

## Number
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js
let n = 123;
n = 12.345;
```

Тип _number_ представляє і цілі числа, і числа з плаваючою точкою.

Є багато операцій, що можна робити с числами, наприклад, множення `*`, ділення `/`, додавання `+`, віднімання `-`, тощо.

Окрім звичайних чисел, також існують так звані "спеціальні числові значення", що також мають відношення до цього типу даних: `Infinity`, `-Infinity` і `NaN`.

- `Infinity` являє собою математічну [наскінченність](https://uk.wikipedia.org/wiki/Нескінченність) ∞. Це спеціальний тип, що є більшим за будь-яке число.

  Ми можемо отримати його як результат ділення на нуль:

  ```js run
  alert(1 / 0); // Infinity
  ```

  Або просто безпосередньо посилатися на нього:

  ```js run
  alert(Infinity); // Infinity
  ```
- `NaN` (Not a Number) являє собою помилку обчислення. Це є результат неправильної або невизначеної математичної операції, наприклад:

  ```js run
  alert("not a number" / 2); // NaN, таке ділення є помилковим
  ```

  `NaN` є "стійким" (постійним). Будь-які наступні операції з `NaN` будуть повертати `NaN`:

  ```js run
  alert("not a number" / 2 + 5); // NaN
  ```

  Таким чином, якщо є `NaN` десь у математичному виразі, він буде поширюватися на весь результат.

```smart header="Математичні операції є безпечними"
Обчислювання є "безпечним" в JavaScript. Ми можемо робити будь-що: ділити на нуль, звертатися до нечислового рядка як до числа, тощо.

Виконання скрипта ніколи не зупиниться з фатальною помилкою ("die"). У найгіршому випадку ми отримаємо в результаті `NaN`.
```

Спеціальні числові значення формально належать до типу "number". Хоча, звісно, вони не є числами у загальноприйнятому розумінні.

Докладніше роботу с числами ми розглянемо у розділі <info:number>.

<<<<<<< HEAD
## Рядок (string)
=======
## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>2<sup>53</sup></code> (or less than <code>-2<sup>53</sup></code> for negatives), that's a technical limitation caused by their internal representation. That's about 16 decimal digits, so for most purposes the limitation isn't a problem, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` is created by appending `n` to the end of an integer literal:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we devoted them a separate chapter <info:bigint>.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox and Chrome, but not in Safari/IE/Edge.
```

## String
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Рядок у JavaScript повинен бути оточенним лапками.

```js
<<<<<<< HEAD
let str = "Привіт";
let str2 = 'Одинарні лапки також дозволяються';
let phrase = `так можна вставляти ${str}`;
=======
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
```

В JavaScript існує три типи лапок.

1. Подвійні лапки: `"Привіт"`.
2. Одинарні липки: `'Привіт'`.
3. Зворотні лапки: <code>&#96;Привіт&#96;</code>.

<<<<<<< HEAD
Подвійні та одинарні лапки є "звичайними". Тобто немає ніякої різниці, які саме використовувати.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Зворотні лапки є "розширеною функціональністю". Вони дозволяють вбудовувати змінні та вирази в рядок, обрамляючи їх `${…}`, наприклад:

```js run
let name = "Іван";

// вбудована змінна
alert(`Привіт, *!*${name}*/!*!`); // Привіт, Іван!

// вбудований вираз
alert(`результат *!*${1 + 2}*/!*`); // результат 3
```

Вираз всередені `${…}` обчислюється, а результат обчислення стає частиною рядка. Ми можемо вбудовувати будь-що: змінну `name`, або арифметичний вираз `1 + 2`, або щось набагато складніше.

Будь ласка, зауважте, що вбудовування можно робити тільки зі зворотніми лапками. Інші типи лапків не мають функціональності вбудовування!
```js run
alert("результат ${1 + 2}"); // результат ${1 + 2} (подвійні лапки не мають ніякого впливу)
```

Більш детально ми будемо висвітлювати рядки у розділі <info:string>.

<<<<<<< HEAD
```smart header="Не існує типу *символ* (*character*)."
У деяких мовах існує спеціальний тип "character" для позначення єдиного символу. Наприклад, в мовах C та Java це `char`.
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

В JavaScript не існує такого типу. Є єдиний тип: `string`. В свою чергу рядок може містити або один символ, або багато.
```

<<<<<<< HEAD
## Логічний тип (boolean)
=======
## Boolean (logical type)
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Логічний тип може приймати лише два значення: `true` та `false`.

Цей тип зазвичай використовується для зберігання значень так/ні: `true` означає "так, вірно", а `false` означає "ні, не вірно".

Наприклад:

```js
let nameFieldChecked = true; // так, ім'я було перевірене
let ageFieldChecked = false; // ні, вік не був перевіреним
```

Логічне значення також можна отримати як результат порівняння:

```js run
let isGreater = 4 > 1;

alert(isGreater); // true (результат порівняння "так")
```

Більш глибоко ми охопимо булеві типи у розділі <info:logical-operators>.

## Значення "null"

Спеціальне значення `null` не належить до жодного з описаних вище типів.

Воно формує окремий власний тип, який містить значення `null`:

```js
let age = null;
```

В JavaScript `null` не є "посиланням на не існуючий об'єкт" або "показчиком на null", як може бути у інших мовах програмування.

Це лише спеціальне значення, яке представляє "нічого", "порожнє" або "невідоме значення".

В наведеному вище коді зазначено, що змінна `age` невідома чи порожня з якоїсь причини.

## Значення "undefined"

Спеціальне значення `undefined` також стоїть окремо. Воно представляє власний тип, подібний до "null".

`undefined` означає, що "значення не присвоєно".

Якщо змінна оголошена, але їй не призначене якесь значення, тоді значення такої змінної буде `undefined`:

```js run
let x;

alert(x); // показує "undefined"
```

Технічно, є така можливість призначити `undefined` будь-якій змінній:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...Але ми не рекомендуємо так робити. Як правило, ми використовуємо `null`, щоб присвоїти змінній значення "порожнє" або "невідоме", і ми використовуємо `undefined` щоб перевірити чи було змінній присвоєне значення.

## Об'єкт (object) та Символ (symbol)

Тип `object` є особливим типом.

Всі інші типи називаються "примітивами", тому що їх значення можуть містити тільки один елемент (це може бути рядок, або число, або будь-що інше). Об'єкти навпаки - використовуються для зберігання колекцій даних і більш складних об'єктів. Ми розглянемо їх пізніше у розділі <info:object> після того, як ми дізнаємося більше про примітиви.

Тип `symbol` використовується для створення унікальних ідентифікаторів для об'єктів. Ми згадали тут цей тип для повноти, проте ми будемо вивчати його після об'єктів.

## Оператор typeof [#type-typeof]

Оператор `typeof` повертає тип аргументу. Це корисно, коли ми хочемо обробляти значення різних типів по-різному або просто хочемо зробити швидку перевірку.

Він підтримує дві форми синтаксису:

1. Як оператор: `typeof x`.
2. Як функція: `typeof(x)`.

Іншими словами, він працює з дужками або без них. Результат однаковий для обох випадків.

Виклик `typeof x` повертає рядок з назвою типу:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Останні три рядки можуть потребувати додаткового пояснення:

1. `Math` — це вбудований об'єкт, який забезпечує математичні операції. Ми вивчемо їх в розділі <info:number>. Тут, вони слухать лише в якості прикладу об'єкта.
2. Результатом `typeof null` є `"object"`. Це неправильно. Це офіційно визнана помилка в `typeof`, що зберігається для сумісності. Звичайно, `null` не є об'єктом. Це особливе значення з власним типом. Отже, знову ж таки, це помилка в мові.
3. Результатом `typeof alert` є `"function"`, тому що `alert` — це функція. Ми будемо вивчати функції в наступних розділах, де ми також побачимо, що в JavaScript немає спеціального типу "function". Функції належать до типу об'єкт. Але `typeof` трактує їх по-різному, повертаючи `"function"`. Це не зовсім правильно, але дуже зручно на практиці.

<<<<<<< HEAD

## Підсумки

В JavaScript існує 7 основних типів.

- `number` для будь-яких чисел: ціле або з плаваючою точкою.
- `string` для рядків. Рядок може мати один або більше символів, немає окремого типу для одиночних символів.
- `boolean` для `true`/`false`.
- `null` для невідомих значень — автономний тип, який має єдине значення `null`.
- `undefined` для непризначених значень — автономний тип, який має єдине значення `undefined`.
- `object` для більш складних структур даних.
- `symbol` для унікальних ідентифікаторів.
=======
## Summary

There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have one or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Оператор `typeof` дозволяє нам бачити, який тип зберігається в змінній.

- Дві форми: `typeof x` або `typeof(x)`.
- Повертає рядок з назвою типу, наприклад `"string"`.
- Для `null` повертає `"object"` — це помилка в мові, `null` насправді не об'єкт.

У наступних розділах ми зосередимося на примітивних значеннях і, коли ми ознайомимося з ними, то перейдемо до об'єктів.
