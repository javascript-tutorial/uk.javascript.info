
# Прапори та дескриптори властивостей

Як відомо, об’єкти можуть зберігати властивості.

Дотепер, для нас властивість була простою парою "ключ-значення". Однак насправді, властивість об’єкта є гнучкішою та потужнішою.

У цьому розділі ми вивчимо додаткові параметри конфігурації, а в наступному ми побачимо, як можна непомітно перетворити їх у функції -- гетери та сетери.

## Прапори властивостей

Властивості об’єкта, крім **`value`**, мають три спеціальні атрибути (так звані "прапори"):

- **`writable`** -- якщо `true`, значення можна змінювати, інакше воно доступне лише для читання.
- **`enumerable`** -- якщо `true`, то властивість враховується в циклах, в іншому випадку цикли його ігнорують.
- **`configurable`** -- якщо `true`, властивість можна видалити, а ці атрибути можна змінювати, інакше цього робити не можна.

Ми ще не бачили цих атрибутів, тому що вони зазвичай не показуються. Коли ми створюємо властивість "звичайним способом", всі атрибути мають значення `true`. Але ми також можемо їх змінити в будь-який час.

По-перше, подивімось, як отримати ці прапори.

Метод [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) дозволяє отримати *повну* інформацію про властивість.

Синтаксис:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Об’єкт, з якого буде отримана інформація.

`propertyName`
: Назва властивості.

Повернене значення -- це так званий об’єкт "дескриптор властивості": він містить значення та всі прапори.

Наприклад:

```js run
let user = {
  name: "Іван"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "Іван",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Щоб змінити прапори, ми можемо використовувати [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

Синтаксис:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Об’єкт і його властивість, щоб застосувати дескриптор.

`descriptor`
: Об’єкт дескриптора властивості, який буде застосовано.

Якщо властивість існує, `defineProperty` оновлює її прапори. В іншому випадку метод створює властивість з даним значенням та прапорами; у цьому випадку, якщо прапор не вказано, передбачається, що його значення `false`.

Наприклад, тут властивість `name` створюється з усіма хибними прапорами:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "Іван"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "Іван",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Порівняйте це з попереднім прикладом "нормального створення" `user.name` вище: тепер всі прапори є хибними. Якщо це не те, що ми хочемо, тоді ми краще встановили їх значення в `true` у `descriptor`.

Тепер розгляньмо ефекти від прапорів на прикладах.

## Не для запису

Зробімо `user.name` недоступним для запису (недоступним для переприсвоєння), змінюючи `writable` прапор:

```js run
let user = {
  name: "Іван"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Петро"; // Помилка: неможливо присвоїти доступну лише для читання властивість 'name'
*/!*
```

Тепер ніхто не може змінити ім’я нашого користувача, якщо тільки не оновить відповідний прапор викликавши `defineProperty`, щоб перекрити наші дескриптори.

```smart header="Помилка виникає лише в суворому режимі"
В несуворому режимі (без `use strict`), під час запису значення до недоступних для запису властивостей не виникне помилки. Однак така операція все одно не змінить значення. Дії, що порушують прапори, просто мовчки ігноруються в несуворому режимі.
```

Ось той же приклад, але властивість створена "з нуля":

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Іван",
  // для нових властивостей ми повинні явно вказати всі прапори, для яких значення true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // Іван
user.name = "Петро"; // Помилка
```

## Неперелічувана властивість

Тепер додаймо кастомний `toString` до `user`.

Зазвичай, вбудований `toString` для об’єктів неперелічуваний, тобто він не з’являється в `for..in`. Але якщо ми додамо свій власний `toString`, то за замовчуванням він з’являється в `for..in`:

```js run
let user = {
  name: "Іван",
  toString() {
    return this.name;
  }
};

// за замовчуванням, вказані обидві наші властивості:
for (let key in user) alert(key); // name, toString
```

Якщо нам це не подобається, то ми можемо встановити `enumerable:false`. Тоді `toString` не з’явиться в `for..in` так само, як вбудований метод.

```js run
let user = {
  name: "Іван",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Тепер наш toString зникає:
*/!*
for (let key in user) alert(key); // name
```

Неперелічувані властивості також виключаються з `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Неналаштовувані властивості

Прапор неналаштовуваної властивості (`configurable:false`) іноді встановлений для вбудованих об’єктів та властивостей.

Неналаштовувана властивість не може бути видалена, її атрибути не можуть бути змінені.

Наприклад, властивість `Math.PI` доступна тільки для читання, неперелічувана і неналаштовувана:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Отже, програміст не може змінити значення `Math.PI` або перезаписати його.

```js run
Math.PI = 3; // Помилка, тому що властивість має writable: false

// видалення Math.PI також не буде працювати
```

Ми також не можемо змінити властивість `Math.PI`, щоб вона знову була `writable`:

```js run
// Помилка, через configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

Абсолютно нічого не можна зробити з `Math.PI`.

Створення неналаштовуваної властивості -- це дорога в один кінець. Ми не можемо змінити цю властивість з `defineProperty`.

**Зверніть увагу: `configurable: false` не дозволяє зміну чи видалення прапорів властивості, однак дозволяє змінювати значення властивості.**

Тут `user.name` неналаштовувана властивість, але ми все ще можемо змінити її (бо вона доступна для запису):

```js run
let user = {
  name: "Іван"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Петро"; // працює добре
delete user.name; // Помилка
```

І ось ми робимо `user.name` "назавжди запечатаною" константою, як і вбудована `Math.PI`:

```js run
let user = {
  name: "Іван"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// тепер не можливо змінювати user.name чи її прапори
// все це не буде працювати:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Петро" });
```

```smart header="Значення атрибуту writable можна міняли лише з true на false"
Існує незначний виняток щодо зміни прапорів.

Ми можемо змінити `writable: true` на `false` для не неналаштовуваної властивості, таким чином, запобігаючи модифікації її значення (додає інший шар захисту). Навпаки такий підхід не працює.
```

## Object.defineProperties

Існує метод [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties), що дозволяє визначити багато властивостей відразу.

Синтаксис:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Наприклад:

```js
Object.defineProperties(user, {
  name: { value: "Іван", writable: false },
  surname: { value: "Іванов", writable: false },
  // ...
});
```

Отже, ми можемо одночасно встановити багато властивостей.

## Object.getOwnPropertyDescriptors

Щоб отримати всі дескриптори одночасно, ми можемо використовувати метод [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).

Разом з `Object.defineProperties` цей метод може бути використаний як "прапорний" спосіб клонування об’єкта:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Зазвичай, коли ми клонуємо об’єкт, ми використовуємо присвоєння для копіювання властивостей:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Але це не копіює прапори. Отже, якщо ми хочемо "кращого" клону, то `Object.defineProperties` є переважним.

<<<<<<< HEAD
Інша відмінність полягає в тому, що `for..in` ігнорує символьні властивості, але `Object.getOwnPropertyDescriptors` повертає *всі* дескриптори властивостей, включаючи символьні.
=======
Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

## Глобальне запечатування об’єкта

Дескриптори властивостей працюють на рівні окремих властивостей.

Існують також способи, які обмежують доступ до *всього* об’єкта:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Забороняє додавання нових властивостей до об’єкта.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Забороняє додавання/видалення властивостей. Встановлює `configurable: false` для всіх властивостей, що існують.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Забороняє додавання/видалення/зміну властивостей. Встановлює `configurable: false, writable: false` для всіх властивостей, що існують.

А також для них є тести:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Повертає `false`, якщо додавання властивостей заборонено, інакше `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Повертає `true`, якщо додавання/видалення властивостей заборонено, і всі властивості, що існують, мають `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Повертає `true`, якщо додавання/видалення/зміна властивостей заборонена і всі поточні властивості є `configurable: false, writable: false`.

Ці методи рідко використовуються на практиці.
