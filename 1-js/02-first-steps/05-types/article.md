# Типи даних

<<<<<<< HEAD
Змінна в JavaScript може містити будь-які дані. Змінна може в один момент бути рядком, а в інший - числом:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
// тут не буде помилки
let message = "привіт";
message = 123456;
```

<<<<<<< HEAD
Мова програмування, яка дозволяє таке робити, називається "динамічно типізованою". Мається на увазі, що є різні типи даних, але змінні не прив'язанні до жодного типу.

Існує вісім базових типів в JavaScript. У цьому розділі ми розглянемо їх поверхнево, а в наступних розлянемо кожен більш детально.
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Number (число)

```js
let n = 123;
n = 12.345;
```

Тип _number_ представляє і цілі числа, і числа з плаваючою точкою.

Є багато операцій, що можна робити с числами, наприклад, множення `*`, ділення `/`, додавання `+`, віднімання `-` тощо.

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

## BigInt

<<<<<<< HEAD
В JavaScript, тип "number" не може вміщувати числа більші за <code>2<sup>53</sup></code> (або менші за <code>-2<sup>53</sup></code> для від'ємних чисел), це технічне обмеження, викликане їх внутрішніми особливостями. Це приблизно 16 десяткових цифр, тому для більшості потреб таке обмеження не є проблемою, але іноді нам потрібні дійсно великі числа, наприклад для криптографії або мікроксекундних часових міток.
=======
In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(-2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

Нещодавно в мову був доданий тип `BigInt` для представлення цілих чисел довільної довжини.

<<<<<<< HEAD
Тип `BigInt` створюється шляхом додавання `n` в кінець цілого числа:
=======
A `BigInt` value is created by appending `n` to the end of an integer:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
// буква "n" в кінці означає що це число типу BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

<<<<<<< HEAD
Через те, що тип `BigInt` рідко використовується, ми винесли його в окремий розділ <info:bigint>.

```smart header="Проблеми з сумісністю"
Цієї миті, підтримка типу `BigInt` є в браузерах Firefox та Chrome, але не в Safari/IE/Edge.
=======
As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox/Chrome/Edge, but not in Safari/IE.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```

## String (рядок)

Рядок в JavaScript повинен бути оточенним лапками.

```js
let str = "Привіт";
let str2 = 'Одинарні лапки також дозволяються';
let phrase = `так можна вставляти ${str}`;
```

В JavaScript існує три типи лапок.

1. Подвійні лапки: `"Привіт"`.
2. Одинарні липки: `'Привіт'`.
3. Зворотні лапки: <code>&#96;Привіт&#96;</code>.

Подвійні та одинарні лапки є "звичайними". Тобто немає ніякої різниці, які саме використовувати.

Зворотні лапки є "розширенням функціональності". Вони дозволяють вбудовувати змінні та вирази в рядок, обрамляючи їх `${…}`, наприклад:

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

```smart header="Не існує типу *символ* (*character*)."
У деяких мовах існує спеціальний тип "character" для позначення єдиного символу. Наприклад, в мовах C та Java це `char`.

В JavaScript не існує такого типу. Є єдиний тип: `string`. Він може містити один або більше символів.
```

## Boolean (логічний тип)

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

<<<<<<< HEAD
В наведеному вище коді зазначено, що змінна `age` невідома чи порожня з якоїсь причини.
=======
The code above states that `age` is unknown.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Значення "undefined"

Спеціальне значення `undefined` також стоїть окремо. Воно представляє власний тип, подібний до "null".

`undefined` означає, що "значення не присвоєно".

Якщо змінна оголошена, але їй не призначене якесь значення, тоді значення такої змінної буде `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(x); // показує "undefined"
```

Технічно, є така можливість призначити `undefined` будь-якій змінній:
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Але ми не рекомендуємо так робити. Як правило, ми використовуємо `null`, щоб присвоїти змінній значення "порожнє" або "невідоме", і ми використовуємо `undefined` щоб перевірити чи було змінній присвоєне значення.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Об'єкт (object) та Символ (symbol)

Тип `object` є особливим типом.

<<<<<<< HEAD
Всі інші типи називаються "примітивами", тому що їх значення можуть містити тільки один елемент (це може бути рядок, або число, або будь-що інше). Об'єкти навпаки - використовуються для зберігання колекцій даних і більш складних об'єктів. Ми розглянемо їх пізніше у розділі <info:object> після того, як ми дізнаємося більше про примітиви.

Тип `symbol` використовується для створення унікальних ідентифікаторів для об'єктів. Ми згадали тут цей тип для повноти, проте ми будемо вивчати його після об'єктів.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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

<<<<<<< HEAD
1. `Math` — це вбудований об'єкт, який забезпечує математичні операції. Ми вивчемо їх в розділі <info:number>. Тут, вони слухать лише в якості прикладу об'єкта.
2. Результатом `typeof null` є `"object"`. Це неправильно. Це офіційно визнана помилка в `typeof`, що зберігається для сумісності. Звичайно, `null` не є об'єктом. Це особливе значення з власним типом. Отже, знову ж таки, це помилка в мові.
3. Результатом `typeof alert` є `"function"`, тому що `alert` — це функція. Ми будемо вивчати функції в наступних розділах, де ми також побачимо, що в JavaScript немає спеціального типу "function". Функції належать до типу об'єкт. Але `typeof` трактує їх по-різному, повертаючи `"function"`. Це не зовсім правильно, але дуже зручно на практиці.
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Підсумки

В JavaScript існує 8 основних типів.

<<<<<<< HEAD
- `number` для будь-яких чисел: ціле або з плаваючою точкою; цілі числа обмежені до ±2<sup>53</sup>.
- `bigint` для цілих чисел будь-якої довжини.
- `string` для рядків. Рядок може мати один або більше символів, немає окремого типу для одиночних символів.
- `boolean` для `true`/`false`.
- `null` для невідомих значень — автономний тип, який має єдине значення `null`.
- `undefined` для непризначених значень — автономний тип, який має єдине значення `undefined`.
- `object` для більш складних структур даних.
- `symbol` для унікальних ідентифікаторів.
=======
- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

Оператор `typeof` дозволяє нам бачити, який тип зберігається в змінній.

- Дві форми: `typeof x` або `typeof(x)`.
- Повертає рядок з назвою типу, наприклад `"string"`.
- Для `null` повертає `"object"` — це помилка в мові, `null` насправді не об'єкт.

В наступних розділах ми зосередимося на примітивних значеннях і, коли ми ознайомимося з ними, то перейдемо до об'єктів.
