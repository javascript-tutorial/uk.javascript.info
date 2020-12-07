
<<<<<<< HEAD
# Поліфіли
=======
# Polyfills and transpilers
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Мова JavaScript постійно розвивається. Нові пропозиції до мови з’являються регулярно, вони аналізуються і, якщо вважаються гідними, додаються до списку <https://tc39.github.io/ecma262/> а потім переходять до [специфікації](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Команди, які розробляють рушії JavaScript, мають власні уявлення про те, що потрібно реалізувати спочатку. Вони можуть вирішити реалізувати пропозиції, що знаходяться у чернетці, і відкласти речі, які вже є у специфікації, оскільки вони менш цікаві або їх важче розробити.

Тому це цілком звичайна ситуація, коли лише частина стандарту реалізована у самому рушії.

Хороша сторінка, щоб побачити поточний стан підтримки функцій мови, є тут <https://kangax.github.io/compat-table/es6/> (вона велика, нам доведеться ще багато вивчати).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Коли ми використовуємо сучасний функціонал мови, деякі рушії можуть не підтримувати такий код. Як вже було сказано, не всі функції скрізь реалізовані.

Тут на допомогу приходить Babel.

[Babel](https://babeljs.io) - це [транспілятор](https://en.wikipedia.org/wiki/Source-to-source_compiler). Він перетворює код, написаний сучасною мовою JavaScript, у код попереднього стандарту.

Власне, Babel має дві частини:

1. Перша - це програма-транспілятор, яка переписує код. Розробник запускає її на власному комп’ютері. Вона переписує код у попередньому стандарті. А потім код застосовується на веб-сайті для користувачів. Сучасні системи побудови проєктів, як [webpack](http://webpack.github.io/) забезпечують нас засобами автоматичного запуску транспілятора при кожній зміні коду, так що його дуже легко інтегрувати в процес розробки.

2. Друга - це поліфіл.

    Новий функціонал мови може включати не лише синтаксичні конструкції, але й нові вбудовані функції.
    Транспілятор переписує код, перетворюючи синтаксичні конструкції у конструкції попереднього стандарту. Але що стосується нових вбудованих функцій, нам потрібно їх реалізувати. JavaScript є дуже динамічною мовою, тож скрипти можуть додавати / змінювати будь-які функції, щоб вони поводилися відповідно до сучасного стандарту.

    Скрипт, що оновлює / додає нові функції, називається "поліфілом". Він "заповнює" прогалину і додає відсутню реалізацію.

    Є два цікавих поліфіла:
    - [core js](https://github.com/zloirock/core-js), що підтримує багато функціоналу, дозволяє включати лише необхідні функції.
    - [polyfill.io](http://polyfill.io) - сервіс, який забезпечує нас скриптом з поліфілами залежно від потрібних нам функцій та браузера користувача.

Отже, якщо ми будемо використовувати сучасні мовні функції, нам потрібен транспілятор та поліфіл.

## Приклади у посібнику
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
````online
Більшість прикладів можна виконувати "прямо тут", як ось цей:

```js run
alert('Натисніть кнопку "Запустити" у правому верхньому куті для запуску');
```

Приклади, які використовують сучасний JS, працюватимуть лише в тому випадку, якщо ваш браузер підтримує його.
````

```offline
Так, як ви читаєте офлайн версію, деякі приклади не працюватимуть у PDF форматі. В EPUB форматі деякі з них можуть працювати.
```

Google Chrome, як правило, підтримує найсучасніші особливості мови JavaScript, через це зручно запускати в ньому демонстраційні приклади нового функціоналу без будь-яких транспіляторів, але інші сучасні браузери також добре працюють.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" langauge features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
