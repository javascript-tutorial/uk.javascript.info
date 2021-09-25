
# Прапори та дескриптори властивостей

Як відомо, об'єкти можуть зберігати властивості.

До цих пір властивість була простою парою "ключ-значення" для нас. Але властивість об'єкта насправді є більш гнучкою та потужною.

У цьому розділі ми вивчимо додаткові параметри конфігурації, а в наступному ми побачимо, як можна непомітно перетворити їх у функції -- гетери та сетери.

## Прапори властивостей

Властивості об'єкта, крім **`value`**, мають три спеціальні атрибути (так звані "прапори"):

- **`writable`** -- якщо` true`, значення може бути змінено, інакше воно доступне лише для читання.
- **`enumerable`** -- якщо` true`, то властивість враховується в циклах, в іншому випадку цикли його ігнорують.
- **`configurable`** -- якщо `true`, властивість можна видалити, а ці атрибути можна змінювати, інакше цього робити не можна.

Ми ще не бачили ці атрибути, тому що зазвичай вони не приховані. Коли ми створюємо властивість "звичайним способом", всі вони мають значення `true`. Але ми також можемо їх змінити в будь-який час.

По-перше, давайте подивимося, як отримати ці прапори.

Метод [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) дозволяє отримати *повну* інформацію про властивість.

Синтаксис:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Об'єкт, з якого буде отримана інформація.

`propertyName`
: Назва властивості.

Повернене значення -- це так званий об'єкт "дескриптор властивості": він містить значення та всі прапори.

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
: Об'єкт і його властивість, щоб застосувати дескриптор.

`descriptor`
: Об'єкт дескриптора властивості, який буде застосовано.

Якщо властивість існує, `defineProperty` оновлює свої прапори. В іншому випадку метод створює властивість з данним значенням та прапорами; у цьому випадку, якщо прапор не вказано, передбачається, що його значення `false`.

Наприклад, тут властивість `name` створюється з усіма хибними флагами:

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

Тепер давайте розглянемо ефекти від прапорів на прикладах.

## Не для запису

Давайте зробимо `user.name` недоступним для запису (недоступним для переприсвоення), змінюючи `writable` прапор:

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

```smart header="Errors appear only in strict mode"
У нестрогому режимі, без `use strict`, не виникає помилки при присвоенні значеня до недоступних для запису властивостей та ін. Але така операція все рівно не будуть виконані успішно. Дії, що порушують прапори, просто мовчки ігноруються в нестрогому режимі.
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

Тепер давайте додамо кастомний `toString` до `user`.

Зазвичай, вбудований `toString` для об'єктів неперелічуваний, він не з'являється в `for..in`. Але якщо ми додамо свій власний `toString`, то за замовчуванням він з'являється в `for..in`, як наприклад:

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

If we don't like it, then we can set `enumerable:false`. Then it won't appear in a `for..in` loop, just like the built-in one:

```js run
let user = {
  name: "John",
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
// Now our toString disappears:
*/!*
for (let key in user) alert(key); // name
```

Non-enumerable properties are also excluded from `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Non-configurable

The non-configurable flag (`configurable:false`) is sometimes preset for built-in objects and properties.

A non-configurable property can't be deleted, its attributes can't be modified.

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:

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
So, a programmer is unable to change the value of `Math.PI` or overwrite it.

```js run
Math.PI = 3; // Error, because it has writable: false

// delete Math.PI won't work either
```

We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
```

## Object.defineProperties

There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.

The syntax is:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

For instance:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

So, we can set many properties at once.

## Object.getOwnPropertyDescriptors

To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).

Together with `Object.defineProperties` it can be used as a "flags-aware" way of cloning an object:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normally when we clone an object, we use an assignment to copy properties, like this:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...But that does not copy flags. So if we want a "better" clone then `Object.defineProperties` is preferred.

Another difference is that `for..in` ignores symbolic properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic ones.

## Sealing an object globally

Property descriptors work at the level of individual properties.

There are also methods that limit access to the *whole* object:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.

And also there are tests for them:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.

These methods are rarely used in practice.
