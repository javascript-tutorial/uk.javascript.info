
# Об'єкт функції, NFE

Як ми вже знаємо, функція в JavaScript - це значення.

Кожне значення в JavaScript має тип. Який тип функції?

У JavaScript, функції є об'єктами.

A good way to imagine functions is as callable "action objects". We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.
Хороший спосіб уявити функції - це як "об'єкти, що можна викликати, та які можуть виконувати якісь дії". Ми можемо не тільки викликати їх, але й ставитися до них як до об'єктів: додавання/видаляти властивості, передавати за посиланням тощо.

## Властивість "name"

Функціональні об'єкти містять деякі зручні властивості.

Наприклад, назва функції доступна як властивість "name":

```js run
function sayHi() {
  alert("Привіт");
}

alert(sayHi.name); // sayHi
```

Що доволі смішно, логіка присвоєння "name" досить розумна. Вона працює так, що призначає правильне ім'я функції, навіть якщо функція була створена без ім’я, а потім була негайно призначена:

```js run
let sayHi = function() {
  alert("Привіт");
};

alert(sayHi.name); // sayHi (є імя!)
```

Це також працює, якщо призначення виконується за допомогою значення за замовчуванням:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (працює!)
}

f();
```

У специфікації ця ознака називається "контекстне ім'я". Якщо функція не надає власне ім’я, то в присвоєнні воно з'являється з контексту.

Методи об'єктів також мають назви:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Проте тут немає ніякої магії. Є випадки, коли немає жодного способу з'ясувати правильну назву. У цьому випадку ім'я назви порожнє, як тут:

```js run
// функція створена всередині масиву
let arr = [function() {}];

alert( arr[0].name ); // <порожній рядок>
// рущій JavaScript не має можливості налаштувати правильну назву, тому в цьому випадку немає жодного значення
```

На практиці, однак, більшість функцій мають назву.

## Властивість "length"

Існує ще одна вбудована властивість "length", яка повертає кількість параметрів функції, наприклад:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

В станньому випадку ми бачимо, що решта параметрів не підраховуються.

Власність `length` іноді використовується для [introspection](https://uk.wikipedia.org/wiki/Інтроспекція_(програмування)) у функціях, які працюють за іншими функціями.

Наприклад, у коді нижче функція `ask` приймає в якості аргументів запитання `question` та довільну кількість функцій-оброблювачів відповіді `handler`.

Після того, як користувач надає відповідь, функція викликає оброблювачі. Ми можемо передати два типи обробників:

- функція без аргументів, яка лише викликається, коли користувач дає позитивну відповідь.

- функція з аргументами, яка називається в будь-якому випадку, і повертає відповідь.

Щоб викликати `handler` правильно, ми розглядаємо властивість `handler.length`.

Ідея полягає в тому, що у нас є простий, синтаксис обробника без аргументів для позитивних випадків (найчастіший варіант), але також підтримуються універсальні обробники:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// Для позитивної відповіді, обидва обробники викликаються
// для негативної відповіді, тільки другий
ask("Запитання?", () => alert('Ти сказав так'), result => alert(result));
```

Це конкретний випадок так званого [поліморфізму](https://uk.wikipedia.org/wiki/Поліморфізм_(програмування)) -- обробка аргументів по-різному залежно від їх типу або, у нашому випадку залежно від `length`. Ця ідея використовується в бібліотеках JavaScript.

## Кастомні властивості

Ми також можемо додати власні властивості.

Тут ми додаємо властивість `counter` для відстеження загальної кількості викликів:

```js run
function sayHi() {
  alert("Привіт");

  *!*
  // давайте порахувати, скільки викликів функції ми зробили
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // початкове значення

sayHi(); // Привіт
sayHi(); // Привіт

alert( `Викликана ${sayHi.counter} рази` ); // Викликана 2 рази
```

```warn header="A property is not a variable"
Властивість, присвоєна функції, як `sayhi.counter = 0` *не* визначає локальну змінну `counter` всередині цієї функції. Іншими словами, властивість `counter` та змінна `let counter` є двома незв'язаними речами.

Ми можемо використовувати функцію як об'єкт, зберігати властивості у ньому, але це не впливатиме на її виконання. Змінні -- це не властивості функції і навпаки. Це два паралельні світи.
```

Властивості функцій можуть іноді замінити замикання. Наприклад, ми можемо переписати приклад функції лічильника з розділу <info:closure> використовуючи властивість функції:

```js run
function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

Зараз `count` зберігається в функції безпосередньо, а не у зовнішньому лексичному середовищі.

Це краще або гірше, ніж використання замикання?

Основна відмінність полягає в тому, що якщо значення `count` живе в зовнішній змінній, то зовнішній код не може отримати доступ до нього.Тільки вкладені функції можуть змінювати його. А якщо це значення присвоєно як властивість функції, то ми можемо отримати до нього доступ:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Таким чином, вибір реалізації залежить від наших цілей.

## Named Function Expression

Named Function Expression, або NFE -- це термін для Function Expressions, у якого є назва.

Наприклад, давайте об’явимо звичайний Function Expression:

```js
let sayHi = function(who) {
  alert(`Привіт, ${who}`);
};
```

And add a name to it:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Привіт, ${who}`);
};
```

Чого ми досягли тут? Яка мета додаткової назви `"func"`?

Спочатку відзначимо, що у нас ще є Function Expression. Додавання назви `"func"` після `function` не робить оголошення функції у вигляді Functional Declaration, оскільки функція все є частиною виразу присвоєння.

Додавання такої назви нічого не порушує.

Функція все ще доступна як `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Привіт, ${who}`);
};

sayHi("Іван"); // Привіт, Іван
```

Є дві важливі особливості назви `func`, через які воно дається:

1. Вона дозволяє функції посилатися на себе.
2. Вона не доступна за межами функції.

Наприклад, функція `sayHi` нижче викликає себе знову `"Гість"` якщо `who` не надається:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Привіт, ${who}`);
  } else {
*!*
    func("Гість"); // використовує func для повторного виклику
*/!*
  }
};

sayHi(); // Привіт, Гість

// Але це не буде працювати:
func(); // Помилка, func не оголошена (недоступна за межами функції)
```

Чому ми використовуємо `func`? Можливо, просто використовувати `sayHi` для вкладеного виклику?


Насправді, в більшості випадків ми можемо це зробити:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Привіт, ${who}`);
  } else {
*!*
    sayHi("Гість");
*/!*
  }
};
```

Проблема з цим кодом полягає в тому, що `sayHi` може змінюватися у зовнішньому коді. Якщо функція присвоється іншій змінній, код почне давати помилки:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Помилка: sayHi не є функцією
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Помилка, вкладений виклик sayHi більше не працює!
```

Це відбувається тому, що функція приймає `sayHi` з його зовнішнього лексичного середовища. Там немає місцевого `sayHi`, тому використовується зовнішня змінна. І в момент виклику зовнішній `sayHi` є `null`.

The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

Let's use it to fix our code:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Now all fine
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
```

Now it works, because the name `"func"` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", how the function can call itself internally.

```smart header="There's no such thing for Function Declaration"
The "internal name" feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an "internal" name.

Sometimes, when we need a reliable internal name, it's the reason to rewrite a Function Declaration to Named Function Expression form.
```

## Summary

Functions are objects.

Here we covered their properties:

- `name` -- the function name. Usually taken from the function definition, but if there's none, JavaScript tries to guess it from the context (e.g. an assignment).
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.


So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
