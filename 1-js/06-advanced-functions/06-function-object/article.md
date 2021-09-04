
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

## Custom properties

We can also add properties of our own.

Here we add the `counter` property to track the total calls count:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // let's count how many times we run
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```

```warn header="A property is not a variable"
A property assigned to a function like `sayHi.counter = 0` does *not* define a local variable `counter` inside it. In other words, a property `counter` and a variable `let counter` are two unrelated things.

We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.
```

Function properties can replace closures sometimes. For instance, we can rewrite the counter function example from the chapter <info:closure> to use a function property:

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

The `count` is now stored in the function directly, not in its outer Lexical Environment.

Is it better or worse than using a closure?

The main difference is that if the value of `count` lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it's bound to a function, then such a thing is possible:

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

So the choice of implementation depends on our aims.

## Named Function Expression

Named Function Expression, or NFE, is a term for Function Expressions that have a name.

For instance, let's take an ordinary Function Expression:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

And add a name to it:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Did we achieve anything here? What's the purpose of that additional `"func"` name?

First let's note, that we still have a Function Expression. Adding the name `"func"` after `function` did not make it a Function Declaration, because it is still created as a part of an assignment expression.

Adding such a name also did not break anything.

The function is still available as `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

There are two special things about the name `func`, that are the reasons for it:

1. It allows the function to reference itself internally.
2. It is not visible outside of the function.

For instance, the function `sayHi` below calls itself again with `"Guest"` if no `who` is provided:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // use func to re-call itself
*/!*
  }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)
```

Why do we use `func`? Maybe just use `sayHi` for the nested call?


Actually, in most cases we can:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

That happens because the function takes `sayHi` from its outer lexical environment. There's no local `sayHi`, so the outer variable is used. And at the moment of the call that outer `sayHi` is `null`.

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
