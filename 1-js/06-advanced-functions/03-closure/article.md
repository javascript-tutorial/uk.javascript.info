
# Замикання 

JavaScript -- це дуже функціонально орієнтована мова. Це дає нам багато свободи. Функцію можна створити в будь-який момент, її можна передати як аргумент іншій функції, а потім викликати з абсолютно іншого місця коду.

Ми вже знаємо, що функція може отримати доступ до змінних з зовнішнього середовища (зовнішні змінні).

Але що станеться, якщо зовнішні змінні змінюються після створення функції? Чи отримає функція нові значення чи старі?

А що буде, коли функція передається як параметр і викликається з іншого місця коду, чи отримає вона доступ до зовнішніх змінних на новому місці?

Давайте розширимо наші знання, щоб зрозуміти ці та більш складні сценарії.

```smart header="Тут ми поговоримо про змінні `let/const`"
У JavaScript існує 3 способи оголошення змінної: `let`,` const` (сучасні) та `var` (залишок минулого).

- У цій статті ми будемо використовувати `let` для змінних у прикладах.
- Змінні, оголошені через `const`, поводяться так само, тому ця стаття також стосується `const`.
- `var` має деякі помітні відмінності, вони будуть розглянуті в статті <info:var>.
```

## Блоки коду

Якщо змінна оголошена всередині блоку коду `{...}`, вона буде доступна лише всередині цього блоку.

Наприклад:

```js run
{
  // тут виконується певна робота з локальними змінними, яку не слід бачити зовні

  let message = "Привіт"; // змінна видима тільки у цьому блоці 
  alert(message); // Привіт
}

alert(message); // Помилка: змінну message не було оголошено
```

Ми можемо використовувати це, щоб виділити фрагмент коду, який працює зі змінними, які доступні лише з нього:

```js run
{
  // показати повідомлення
  let message = "Привіт";
  alert(message);
}

{
  // показати інше повідомлення
  let message = "Бувай";
  alert(message);
}
```

````smart header="Без блоків буде помилка"
Будь-ласка, зверніть увагу, що без окремих блоків буде помилка, якщо ми використовуємо `let` з однаковою назвою змінної:

```js run
// показати повідомлення
let message = "Привіт";
alert(message);

// показати інше повідомлення
*!*
let message = "Бувай"; // Помилка: змінна вже оголошена
*/!*
alert(message);
```
````

Для `if`, `for`, `while` і так далі, змінні, оголошені в `{...}` також видно тільки всередині:

```js run
if (true) {
  let phrase = "Привіт!";

  alert(phrase); // Привіт!
}

alert(phrase); // Помилка, такої змінної немає!
```

Тут, після завершення `if`, `alert` нижче не побачить `phrase`, отже, помилка.

Це чудово, оскільки це дозволяє нам створювати локально-блокові змінні, специфічні для гілки `if`.

Те ж саме справедливо і для циклів `for` та `while`:

```js run
for (let i = 0; i < 3; i++) {
  // змінну i видно тільки всередині цього циклу for
  alert(i); // 0, потім 1, потім 2
}

alert(i); // Помилка, такої змінної немає
```

Візуально, `let i` знаходиться за межами `{...}`. Але конструкція `for` особлива: змінна, оголошена всередині неї, вважається частиною блоку.

## Вкладені функції

Функція називається "вкладеною", коли вона створюється всередині іншої функції.

З JavaScript це зробити дуже легко.

І ми можемо використовувати це для організації нашого коду, наприклад:

```js
function sayHiBye(firstName, lastName) {

  // допоміжна вкладена функція для використання нижче
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Привіт, " + getFullName() );
  alert( "Бувай, " + getFullName() );

}
```

Тут *вкладена* функція `getFullName()` створена для зручності. Вона має доступ до внутрішніх змінних функції і тому може повернути повне ім’я. Вкладені функції досить поширені в JavaScript.

Що ще цікавіше, вкладену функцію можна повернути: як властивість нового об’єкта, або як самостійний результат. Потім її можна використати десь в іншому місці. Незалежно від того, де її викликають, вона завжди буде мати доступ до внутрішніх змінних функцію, в якій її було створено.

Нижче, `makeCounter` створює функцію "counter", яка повертає наступний номер при кожному виклику:

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Незважаючи на простоту, трохи змінені варіанти цього коду мають практичне застосування, наприклад, [генератор псевдовипадкових чисел](https://uk.wikipedia.org/wiki/Генератор_псевдовипадкових_чисел) для генерації випадкових значень для автоматизованих тестів.

Як це працює? Якщо ми створимо кілька лічильників, чи будуть вони незалежними? Що відбувається зі змінними тут?

Розуміння таких речей чудово не тільки для загального знання JavaScript, але й корисно для роботи з більш складними сценаріями. Тож давайте трохи поглибимося.

## Lexical Environment

```warn header="Here be dragons!"
The in-depth technical explanation lies ahead.

As far as I'd like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.
```

For clarity, the explanation is split into multiple steps.

### Step 1. Variables

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.

The Lexical Environment object consists of two parts:

1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

**A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**

In this simple code without functions, there is only one Lexical Environment:

![lexical environment](lexical-environment-global.svg)

This is the so-called *global* Lexical Environment, associated with the whole script.

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that's why the arrow points to `null`.

As the code starts executing and goes on, the Lexical Environment changes.

Here's a little bit longer code:

![lexical environment](closure-variable-phrase.svg)

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3. `phrase` is assigned a value.
4. `phrase` changes the value.

Everything looks simple for now, right?

- A variable is a property of a special internal object, associated with the currently executing block/function/script.
- Working with variables is actually working with the properties of that object.

```smart header="Lexical Environment is a specification object"
"Lexical Environment" is a specification object: it only exists "theoretically" in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can't get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
```

### Step 2. Function Declarations

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That's why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here's the initial state of the global Lexical Environment when we add a function:

![](closure-function-declaration.svg)

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### Step 3. Inner and outer Lexical Environment

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

- The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable -- the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

- For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
- When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Step 4. Returning a function

Let's return to the `makeCounter` example.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.

So we have two nested Lexical Environments, just like in the example above:

![](closure-makecounter.svg)

What's different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don't run it yet, only create.

All functions remember the Lexical Environment in which they were made. Technically, there's no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

![](closure-makecounter-environment.svg)

So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That's how the function remembers where it was created, no matter where it's called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.

**A variable is updated in the Lexical Environment where it lives.**

Here's the state after the execution:

![](closure-makecounter-nested-call-2.svg)

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

```smart header="Closure"
There is a general programming term "closure", that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

## Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That's because there are no references to it. As any JavaScript object, it's only kept in memory while it's reachable.

However, if there's a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

For example:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
```

Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];
```

A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there's at least one nested function referencing it.

In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up
```

### Real-life optimizations

As we've seen, in theory while a function is alive, all outer variables are also retained.

But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it's obvious from the code that an outer variable is not used -- it is removed.

**An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.**

Try running the example below in Chrome with the Developer Tools open.

When it pauses, in the console type `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

As you could see -- there is no such variable! In theory, it should be accessible, but the engine optimized it out.

That may lead to funny (if not such time-consuming) debugging issues. One of them -- we can see a same-named outer variable instead of the expected one:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.
