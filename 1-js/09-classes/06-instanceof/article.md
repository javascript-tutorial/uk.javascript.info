# Перевірка класу: "instanceof"

Оператор `instanceof` дозволяє перевірити, чи належить об’єкт до певного класу. Він також враховує наслідування.

Така перевірка може знадобитися в багатьох випадках. Наприклад, його можна використати для створення *поліморфної* функції, яка обробляє аргументи по-різному залежно від їх типу.

## Оператор instanceof [#ref-instanceof]

Синтаксис такий:
```js
obj instanceof Class
```

Він повертає `true`, якщо `obj` належить до класу `Class` або класу, який наслідується від нього.

Наприклад:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// Чи це об’єкт класу Rabbit?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Він також працює з функціями-конструкторами:

```js run
*!*
// замість класу
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...І з вбудованими класами як `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

Будь ласка, зверніть увагу, що `arr` також належить до класу `Object`. Це тому, що клас `Array` прототипно наслідується від `Object`.

Зазвичай, `instanceof` перевіряє ланцюжок прототипів. Ми також можемо задати будь-яку спеціальну логіку в статичному методі `Symbol.hasInstance`, і замінити звичайну поведінку.

Алгоритм операції `obj instanceof Class` працює приблизно наступним чином:

1. Якщо є статичний метод `Symbol.hasInstance`, тоді він просто викликаєтсья: `Class[Symbol.hasInstance](obj)`. Він повинен повернути `true` або `false`, ось і все. Ось як ми можемо задати поведінку `instanceof`.

    Наприклад:

    ```js run
<<<<<<< HEAD
    // задамо перевірку instanceof таким чином,
    // що будь-що із властивістю canEat - це тварина
=======
    // set up instanceof check that assumes that
    // anything with canEat property is an animal
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) було викликано
    ```

<<<<<<< HEAD
2. Більшість класів не мають `Symbol.hasInstance`. У цьому випадку використовується стандартна логіка: `obj instanceOf Class` перевіряє чи `Class.prototype` дорівнює одному з прототипів у ланцюжку прототипів `obj`.
=======
2. Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceof Class` checks whether `Class.prototype` is equal to one of the prototypes in the `obj` prototype chain.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

    Іншими словами, прототипи порівнюються один за одним:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // Якщо будь-яке з них буде true, то instanceof одразу ж верне true.
    // Якщо ми досягли кінця ланцюжка - повертається false
    ```

    У наведеному вище прикладі `rabbit.__proto__ === Rabbit.prototype`, тому ми знаходимо відповідь негайно.

    У разі наслідування ми знайдемо те, що шукали, на другому кроці:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Animal.prototype (немає збігу)
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (знайшли!)
    */!*
    ```

Ось ілюстрація того, як операція `rabbit instanceof Animal` шукає `Animal.prototype` у прототипах:

![](instanceof.svg)

До речі, є також метод [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), який повертає `true` якщо `objA` знаходиться десь у ланцюжку прототипів для `objB`. Отже, перевірку `obj instanceof Class` можна замінити на `Class.prototype.isPrototypeOf(obj)`.

Цікаво, але сам класс `Class` не бере участі в перевірці! Має значення лише ланцюжок прототипів і `Class.prototype`.

Це може призвести до дивних наслідків, коли властивість `prototype` було змінено після створення об’єкта.

Як тут:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// Змінюємо прототип
Rabbit.prototype = {};

// ...це більше не rabbit!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## Бонус: Object.prototype.toString для визначення типу

Ми вже знаємо, що прості об’єкти перетворюються на рядки як `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // теж саме
```

Це їх реалізація метода `toString`. Але є прихована функція, яка робить метод `toString` набагато потужнішим. Ми можемо використовувати його як розширений `typeof` і альтернативу `instanceof`.

Звучить дивно? Дійсно. Давайте розбиратися.

У [специфікації](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), вбудований метод `toString` можна витягнути з об’єкта та викликати в контексті будь-якого іншого значення. І результат залежить від типу цього значення.

- Для числа це буде `[object Number]`
- Для логічного значення це буде `[object Boolean]`
- Для `null`: `[object Null]`
- Для `undefined`: `[object Undefined]`
- Для масивів: `[object Array]`
- ...тощо.

Давайте продемонструємо:

```js run
// скопіюємо метод toString у змінну для зручності
let objectToString = Object.prototype.toString;

// Що це за тип?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Тут ми використали [call](mdn:js/function/call), як описано в розділі [](info:call-apply-decorators), щоб викликати функцію `objectToString` з контекстом `this=arr`.

Всередені алгоритм `toString` перевіряє `this` і повертає відповідний результат. Більше прикладів:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Поведінку методу об’єкта `toString` можна налаштувати за допомогою спеціальної властивості `Symbol.toStringTag`.

Наприклад:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

Для більшості специфічних для середовища об’єктів така властивість є. Ось деякі приклади для браузера:

```js run
// toStringTag для специфічних для середовища об’єкту та класу:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Як бачите, результатом є саме `Symbol.toStringTag` (якщо існує), загорнутий у `[object ...]`.

Наприкінці ми маємо "typeof на стероїдах", який працює не тільки для примітивних типів даних, але й для вбудованих об’єктів і навіть може бути кастомізований.

Ми можемо використати `{}.toString.call` замість `instanceof` для вбудованих об’єктів, коли ми хочемо отримати тип у вигляді рядка, а не просто для перевірки.

## Підсумки

Давайте підсумуємо відомі нам методи перевірки типів:

|               | працює для   |  повертає      |
|---------------|-------------|---------------|
| `typeof`      | примітивів  |  рядок       |
| `{}.toString` | примітивів, вбудованих об’єктів, об’єктів з `Symbol.toStringTag`   |       рядок |
| `instanceof`  | об’єктів     |  true/false   |

Як ми бачимо, `{}.toString` технічно є "більш просунутим" `typeof`.

І оператор `instanceof` дійсно сяє, коли ми працюємо з ієрархією класів і хочемо перевірити клас з урахуванням наслідування.
