# Функціональні вирази та стрілкові функції

Для JavaScript функція -- це не "магічна мовна структура", a значення особливого гатунку.

Синтаксис, що ми раніще використовували, називається [*Оголошення Функції*](https://developer.mozilla.org/uk/docs/Web/JavaScript/Guide/Functions#Оголошення_функції) (Function Declaration):

```js
function sayHi() {
  alert( "Привіт" );
}
```

Існує й інший синтаксис для створення фукції, що називають
 [*Функціональним Виразом*](https://developer.mozilla.org/uk/docs/Web/JavaScript/Guide/Functions#Функціональні_вирази) (Function Expression).

Він виглядає так:

```js
let sayHi = function() {
  alert( "Привіт" );
};
```

У коді вище функція створюється і явно присвоюється змінній, як і будь-яке інше значення. Не важливо яким чином була визначена функція, це лише значення, що збережене в змінній `sayHi`.

Зміст обох прикладів коду однаковий: "створити функцію і покласти її значення в змінну `sayHi`".

Ми навіть можемо вивести це значення використовуючи `alert`:

```js run
function sayHi() {
  alert( "Привіт" );
}

*!*
alert( sayHi ); // показує код функції
*/!*
```

Зауважте, що останній рядок не викликає функцію тому, що після `sayHi` немає дужок. Існують мови програмування, в яких будь-яке звертання до імені функції спричиняє її виконання, але JavaScript -- не одна з них.

У JavaScript функція -- це значення, тому ми можемо поводитись з нею, як і з іншими значеннями. Код вище показує її рядкове представлення -- вихідний код.

Звичайно, функція -- особливе значення, у тому сенсі, що ми можемо здійснити її виклик за допомогою дужок: `sayHi()`.

Але це все-таки значення. Тому ми можемо працювати з нею, як і з іншими значеннями.

Скажімо, ми можемо скопіювати функцію в іншу змінну:

```js run no-beautify
function sayHi() {   // (1) створюємо
  alert( "Привіт" );
}

let func = sayHi;    // (2) копіюємо

func(); // Привіт     // (3) викликаємо копію (працює!)
sayHi(); // Привіт    //     ось так теж спрацює (а чому ні?)
```

Розглянемо детально, що тут відбулось:

1. Оголошення Функції `(1)` створює саму функцію і кладе її значення у змінну `sayHi`.
2. Рядок `(2)` копіює це значення в змінну `func`. Ще раз зауважте: після `sayHi` немає дужок. Якби вони там були, тоді `func = sayHi()` записав би *результат виклику* `sayHi()` у `func`,а не *саму функцію* `sayHi`.
3. Тепер ми можемо викликати функцію двома шляхами: `sayHi()` або `func()`.

Зауважте, що ми могли також використати Функціональний Вираз у першому рядку, щоб визначити `sayHi`:

```js
let sayHi = function() {
  alert( "Привіт" );
};

let func = sayHi;
// ...
```

Результат був би таким самим.


````smart header="Для чого потрібна крапка з комою в кінці?"
Ви можете запитати, чому Функціональний Вираз містить крапку з комою `;` в кінці, а Оголошення Функції -- ні:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Відповідь проста:
- Нема потреби в `;` в кінці блоків коду та синтаксичних структур, що їх використовують, таких як: `if { ... }`, `for {  }`, `function f { }` тощо.
- Функціональний Вираз використаний всередині інструкції: `let sayHi = ...;` як значення. Це не окремий блок коду, а скоріше частина присвоєння. Рекомендується завжди ставити крапку з комою `;` в кінці інструкції, не зважаючи чим є значення. Отже, вживання крапки з комою не пов'язано саме з Функціональним Виразом, а лише завершує інструкцію.
````

## Callback functions

Let's look at more examples of passing functions as values and using function expressions.

We'll write a function `ask(question, yes, no)` with three parameters:

`question`
: Text of the question

`yes`
: Function to run if the answer is "Yes"

`no`
: Function to run if the answer is "No"

The function should ask the `question` and, depending on the user's answer, call `yes()` or `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such function usually draws a nice-looking question window. But that's another story.

**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**

The idea is that we pass a function and expect it to be "called back" later if necessary. In our case, `showOk` becomes the callback for "yes" answer, and `showCancel` for "no" answer.

We can use Function Expressions to write the same function much shorter:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.

Such code appears in our scripts very naturally, it's in the spirit of JavaScript.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can pass it between variables and run when we want.
```


## Function Expression vs Function Declaration

Let's formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the "assignment expression" `=`:

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

The more subtle difference is *when* a function is created by the JavaScript engine.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

...If it were a Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
*!*
welcome(); // Error: welcome is not defined
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```


## Arrow functions [#arrow-functions]

There's one more very simple and concise syntax for creating functions, that's often better than Function Expressions. It's called "arrow functions", because it looks like this:


```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that has arguments `arg1..argN`, evaluates the `expression` on the right side with their use and returns its result.

In other words, it's roughly the same as:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...But much more concise.

Let's see an example:

```js run
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

If we have only one argument, then parentheses around parameters can be omitted, making that even shorter:

```js run
// same as
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

If there are no arguments, parentheses should be empty (but they should be present):

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Arrow functions can be used in the same way as Function Expressions.

For instance, here's the rewritten example with `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

```smart header="Multiline arrow functions"

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, use return to get results
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all! Arrow functions have other interesting features. We'll return to them later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
