
# Поліфіли і транспілятори

Мова JavaScript постійно розвивається. До неї регулярно додаються нові пропозиції, далі вони аналізуються і, якщо вважаються гідними, додаються до списку <https://tc39.github.io/ecma262/>, а потім переходять до [специфікації](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Команди, які розробляють рушії JavaScript, мають власні уявлення про те, що потрібно реалізувати спочатку. Вони можуть вирішити реалізувати пропозиції, що знаходяться у чернетці, і відкласти речі, які вже є у специфікації, оскільки вони менш цікаві або їх важче розробити.

Тому це цілком звичайна ситуація, коли лише частина стандарту реалізована у самому рушії.

Хороша сторінка, щоб побачити поточний стан підтримки функцій мови, є тут <https://kangax.github.io/compat-table/es6/> (вона велика, нам доведеться ще багато вивчати).

Як програмісти, ми б хотіли використовувати найновіші можливості. Чим більше хороших речей — тим краще!

З іншого боку, як змусити працювати «сучасний» код на старих рушіях? Адже вони покищо не підтримують найновіших можливостей.

Для цього існує два інструменти:

1. Транспілятори.
2. Поліфіли.

В цьому розділі ми дізнаємося, як вони працюють та яке їхнє місце у веб-розробці.

## Транспілятори

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

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Поліфіли

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

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

Є два цікавих поліфіла:
- [core js](https://github.com/zloirock/core-js), що підтримує багато функціоналу, дозволяє включати лише необхідні функції.
- [polyfill.io](http://polyfill.io) - сервіс, що генерує скрипт з поліфілами залежно від потрібних нам функцій та браузера користувача.


## Підсумки

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
