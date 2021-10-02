
# Базовий синтаксис класу

```quote author="Wikipedia"
У об'єктно-орієнтованому програмуванні, *клас* -- це спеціальна конструкція, яка використовується для групування пов'язаних змінних та функцій. При цьому, згідно з термінологією ООП, глобальні змінні класу (члени-змінні) називаються полями даних (також властивостями або атрибутами), а члени-функції називають методами класу.
```

На практиці ми часто повинні створювати багато об'єктів того ж виду, як наприклад користувачі, або товари або що завгодно.

Як ми вже знаємо з розділу <info:constructor-new>, `new function` може допомогти з цим.

Але в сучасному JavaScript існує більш просунута конструкція "клас", яка вводить нові чудові функції, які корисні для об'єктно-орієнтованого програмування.

## Синтаксис "class"

Основний синтаксис:
```js
class MyClass {
  // методи класу
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Потім використовуйте `new MyClass()`, щоб створити новий об'єкт з усіма перерахованими методами.

Метод `constructor()` викликається автоматично за допомогою `new`, в ньому ми можемо ініціалізувати об'єкт.

Наприклад:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Використання:
let user = new User("Іван");
user.sayHi();
```
Коли `new User("John")` викликається:
1. Створюється новий об'єкт.
2. `constructor` запускається з даними аргументом і присвоює його `this.name`.

...Тоді ми можемо викликати методи об'єкту, такі як `user.sayHi()`.


```warn header="No comma between class methods"
Часта помилка для розробників-початківців полягає в тому, щоб поставити кому між методами класу, що призведе до помилки синтаксису.

Позначення тут не слід плутати з літералами об'єктів. У межах класу не треба ставити кому.
```

## Що таке клас?

Отже, що саме -- `class`? Це не цілком нова ступінь мови програмування, як можна подумати.

Давайте розкриємо будь-яку магію і подивимося, що дійсно таке клас. Це допоможе в розумінні багатьох складних аспектів.

У JavaScript клас є своєрідною функцією.

Погляньте на це:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// доказ: User -- це функція
*!*
alert(typeof User); // function
*/!*
```

Що конструкція `class User {...}` дійсно робить:

1. Створює функцію, що називається `User` та стає результатом декларації класу. Код функції береться з методу `constructor` (він береться порожнім, якщо ми не написали такий метод).
2. Зберігає методи класу, такі як `sayHi`, `User.prototype`.

Після того, як `new User` створився, коли ми викликаємо його метод, він береться з прототипу, як описано в розділі <info:function-prototype>. Таким чином, об'єкт має доступ до методів класу.

Ми можемо проілюструвати результат оголошення `class User` як:

![](class-user.svg)

Ось код, щоб проаналізувати це:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// клас -- це функція
alert(typeof User); // function

// ...або, точніше, метод конструктора
alert(User === User.prototype.constructor); // true

// Методи знаходяться в User.prototype, наприклад:
alert(User.prototype.sayHi); // код sayHi методу

// у прототипі існує рівно два методи
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Не просто синтаксичний цукор

Іноді люди кажуть, що `class` -- це "синтаксичний цукор" (синтаксис, який призначений для того, щоб зробити речі легше для читаня, але не вводить нічого нового), тому що ми могли б фактично оголосити те ж саме взагалі без ключового слова `class`:

```js run
// переписування класу User в чистих функціях

// 1. Створити функцію конструктора
function User(name) {
  this.name = name;
}
// прототип функції має властивість "constructor" за замовчуванням,
// тому нам не потрібно його створювати

// 2. Додайти метод до прототипу
User.prototype.sayHi = function() {
  alert(this.name);
};

// Використання:
let user = new User("Іван");
user.sayHi();
```

Результат цього оголошення дуже схожий. Отже, існують дійсно причини, чому `class` можна вважати синтаксичним цукром для того, щоб визначити конструктор разом із методами прототипу.

Тим не менш, існують важливі відмінності.

1. По-перше, функція, створена за допомогою `class`, позначена спеціальною внутрішньою власністю `[[IsClassConstructor]]: true`. Так що це не зовсім те ж саме, що і створити її вручну.

    Мовна перевіряє цю власність у різних місцях. Наприклад, на відміну від звичайної функції, її треба викликати з `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    Також, представлення конструктора класу у вигляді рядку у більшості рущіїв JavaScript починається з "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
    Є також інші відмінності, ми побачимо їх найближчим часом.

2. Методи класу неперелічувані.
    Оголошення класу встановлює `enumerable` прапор у `false` для всіх методів в `"prototype"`.

    Це добре, тому що коли ми проходимо через об’экт за допомогою `for..in`, ми зазвичай не хочемо мати справу з методами класу.

3. Класс завжди `use strict`.
    Весь код всередині конструкції класу автоматично знаходиться в строгому режимі.

Крім того, синтаксис `class` приносить багато інших функцій, які ми досліджуємо пізніше.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

Here's an example of a class expression:

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

Similar to Named Function Expressions, class expressions may have a name.

If a class expression has a name, it's visible inside the class only:

```js run
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass name isn't visible outside of the class
```

We can even make classes dynamically "on-demand", like this:

```js run
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Create a new class
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


## Getters/setters

Just like literal objects, classes may include getters/setters, computed properties etc.

Here's an example for `user.name` implemented using `get/set`:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.

## Computed names [...]

Here's an example with a computed method name using brackets `[...]`:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

So, we just write "<property name> = <value>" in the declaration, and that's it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

We can also assign values using more complex expressions and function calls:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```


### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.

## Summary

The basic class syntax looks like this:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
```

`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.

In the next chapters we'll learn more about classes, including inheritance and other features.
