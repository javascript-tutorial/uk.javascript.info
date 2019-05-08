# Типи даних

Змінна в JavaScript може містити будь-які дані. Змінна може в один момент бути рядком, а в інший - числом:

```js
// тут не буде помилки
let message = "привіт";
message = 123456;
```

Мова програмування, яка дозволяє таке робити називається "динамічно типізованою", маючи на увазі, що є типи даних, але змінні не прив'язанні до жодного типу.

Існує сім базових типів в JavaScript. У цьому розділі ми розглянемо їх поверхнево, але в наступних розлянемо кожен більш детально.

## Число (number)

```js
let n = 123;
n = 12.345;
```

Тип _number_ представляє і цілі числа і числа з плаваючою точкою.

Існує багато операцію, що можна робити с числами, наприклад, множення `*`, ділення `/`, додавання `+`, віднімання `-`, тощо.

Окрім звичайних чисел, також існують так звані "спеціальні числові значення", що також мають відношення до цього типу даних: `Infinity`, `-Infinity` and `NaN`.

- `Infinity` являє собою математічну [наскінченність](https://uk.wikipedia.org/wiki/%D0%9D%D0%B5%D1%81%D0%BA%D1%96%D0%BD%D1%87%D0%B5%D0%BD%D0%BD%D1%96%D1%81%D1%82%D1%8C) ∞. Це спеціальний тип, що є більшим за будь-яке число.

  Ми можемо отримати його як результат ділення на нуль:

  ```js run
  alert(1 / 0); // Infinity
  ```

  Або просто безпосередньо посилатися на нього:

  ```js run
  alert(Infinity); // Infinity
  ```

- `NaN` являє собою помилку обчислення. Це є результат неправильної або невизначеної математичної операції, наприклад:

  ```js run
  alert("not a number" / 2); // NaN, таке ділення є помилковим
  ```

  `NaN` є "стійким" (постійним). Будь-які наступні операції з `NaN` будуть повертати `NaN`:

  ```js run
  alert("not a number" / 2 + 5); // NaN
  ```

  Таким чином, якщо є `NaN` десь у математичному виразі, він пошірюватиметься на весь результат.

```smart header="Математичні операції є безпечними"
Обчислювання є "безпечним" в JavaScript. Ми можемо робити будь-що: діління на нуль, звертатися до нечислової строки як до числа, тощо.

Виконання скрипта ніколи не зупиниться з фатальною помилкою ("die"). У гіршому випадку ми отримаємо у результаті `NaN`.
```

Спеціальні числові значення формально належать до типу "number". Хоча, звісно, вони не є числами у загальноприйнятому розумінні.

Докладніше роботу с числами ми розглянемо у розділі <info:number>.

## Строка (string)

Строка у JavaScript повинна бути оточенна лапками.

```js
let str = "Привіт";
let str2 = "Одинарні лапки також дозволяються";
let phrase = `так можна вставляти ${str}`;
```

В JavaScript існує три типу лапок.

1. Подвійні лапки: `"Привіт"`.
2. Одинарні липки: `'Привіт'`.
3. Зворотні лапки: <code>&#96;Привіт&#96;</code>.

Подвійні та одинарні лапки є "звичайними". Тобто немає ніякої різниці, які саме використовувати.

Зворотні лапки є "розширеною функціональністю". Вони дозволяють вбудовувати змінні та вирази в строку, обрамляючи їх `${…}`, наприклад:

```js run
let name = "Джон";

// вбудована змінна
alert(`Привіт, *!*${name}*/!*!`); // Привіт, Джон!

// вбудований вираз
alert(`результат *!*${1 + 2}*/!*`); // результат 3
```

Вираз всередені `${…}` обчислюється, а результат обчислення стає частиною строки. Ми можемо вбудовувати будь-що: змінну `name`, або арифметичний вираз `1 + 2`, або щось набагато складніше.

Будь ласка, зауважте, що вбудовування можно робити тільки зі зворотніми лапками. Інші типи лапків не мають функціональності вбудовування!

```js run
alert("результат ${1 + 2}"); // результат ${1 + 2} (подвійні лапки не мають ніякого впливу)
```

Більш ретельно ми будемо висвітлювати рядки у главі <info:string>.

```smart header="Не існує типу *символ* (*character*)."
У деяких мовах існує спеціальний тип "character" для позначення єдіного символу. Наприклад, в мовах C та Java це `char`.

В JavaScript не існує такого типу. Є єдиний тип: `string`. В свою чергу строка може містити лише один символ або багато.
```

## Логічний тип (boolean)

Логічний тип може приймати лише два значення: `true` та `false`.

Цей тип зазвичай використовується для зберігання значень так/ні: `true` означає "так, вірно", а `false` означає "ні, не вірно".

Наприклад:

```js
let nameFieldChecked = true; // так, ім'я було перевірене
let ageFieldChecked = false; // ні, вік не був перевірен
```

Логічне значення також можна отримати як результат порівняння:

```js run
let isGreater = 4 > 1;

alert(isGreater); // true (результат порівняння "так")
```

Більш глибоко ми охопимо булеві типи у главі <info:logical-operators>.

## The "null" value

The special `null` value does not belong to any of the types described above.

It forms a separate type of its own which contains only the `null` value:

```js
let age = null;
```

In JavaScript, `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which represents "nothing", "empty" or "value unknown".

The code above states that `age` is unknown or empty for some reason.

## The "undefined" value

The special value `undefined` also stands apart. It makes a type of its own, just like `null`.

The meaning of `undefined` is "value is not assigned".

If a variable is declared, but not assigned, then its value is `undefined`:

```js run
let x;

alert(x); // shows "undefined"
```

Technically, it is possible to assign `undefined` to any variable:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...But we don't recommend doing that. Normally, we use `null` to assign an "empty" or "unknown" value to a variable, and we use `undefined` for checks like seeing if a variable has been assigned.

## Objects and Symbols

The `object` type is special.

All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities. We'll deal with them later in the chapter <info:object> after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for completeness, but it's better to study this type after objects.

## The typeof operator [#type-typeof]

The `typeof` operator returns the type of the argument. It's useful when we want to process values of different types differently or just want to do a quick check.

It supports two forms of syntax:

1. As an operator: `typeof x`.
2. As a function: `typeof(x)`.

In other words, it works with parentheses or without them. The result is the same.

The call to `typeof x` returns a string with the type name:

```js
typeof undefined // "undefined"

typeof 0 // "number"

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

The last three lines may need additional explanation:

1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's wrong. It is an officially recognized error in `typeof`, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. So, again, this is an error in the language.
3. The result of `typeof alert` is `"function"`, because `alert` is a function of the language. We'll study functions in the next chapters where we'll see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently. Formally, it's incorrect, but very convenient in practice.

## Summary

There are 7 basic types in JavaScript.

- `number` for numbers of any kind: integer or floating-point.
- `string` for strings. A string may have one or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows us to see which type is stored in a variable.

- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.

In the next chapters, we'll concentrate on primitive values and once we're familiar with them, we'll move on to objects.
