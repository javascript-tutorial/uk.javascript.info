# Введення в JavaScript

Давайте розглянемо, що такого особливого в JavaScript, що ми дожемо досягти з його допомогою і які ще технології пов'язані з ним.

## Що таке JavaScript?

*JavaScript* було створено для того, щоб *"зробити веб-сторінки живими"*.

Програми на цій мові називаються *скриптами*. Їх можна писати прямо на сторінці в коді HTML і вони автоматично виконуються при завантаженні сторінки.

Скрипти виглядають і виконуються як простий текст. Для запуску, їм не потрібно спеціальна підготовка чи компілятор.

В цьому плані, JavaScript дуже відрізняється від іншої мови програмування — [Java](https://uk.wikipedia.org/wiki/Java).

```smart header="Чому <u>Java</u>Script?"
Коли мову JavaScript було створено, спочатку вона мала іншу назву: "LiveScript". Але тоді була дуже популярна мова програмування Java, тому було вирішено, що позиціонування нової мови як "молодшого брата" Java допоможе у популяризації.

Але з часом JavaScript значно виріс і став повністю незалежною мовою програмування зі своєю специфікацією [ECMAScript](https://uk.wikipedia.org/wiki/ECMAScript), і зараз немає нічого спільного з Java.
```

Сьогодні, JavaScript може виконуватися не тільки в браузері, але й на сервері, або на будь-якому пристрої, який має спеціальну програму — [рушій JavaScript](https://uk.wikipedia.org/wiki/Рушій_JavaScript).

Браузер має вбудований рушій, який деколи називають "віртуальною машиною JavaScript".

Різні рушії мають різні "кодові назви". Наприклад:

- [V8](https://uk.wikipedia.org/wiki/V8_(рушій_JavaScript)) -- в Chrome і Opera.
- [SpiderMonkey](https://uk.wikipedia.org/wiki/SpiderMonkey) -- в Firefox.
- ...Є також інші кодові назви як "Trident" і "Chakra" для різних версій IE, "ChakraCore" для Microsoft Edge, "Nitro" і "SquirrelFish" для Safari, та інші.

Написані вище терміни добре було б запам'ятати, оскільки вони використовуються в статтях розробників на просторах інтернету. Ми також будемо їх використовувати. Наприклад, якщо "можливість X підтримується в V8", тоді ймовірно це буде працювати в Chrome і Opera.

```smart header="Як рушії працюють?"

Рушії складні. Але принцип роботи простий.

1. Рушій (вбудований, якщо це браузер) читає ("розбирає") скрипт.
2. Потім він перетворює ("компілює") скрипт в машинний код.
3. І потім машинний код виконується, причому дуже швидко.

Рушій застосовує оптимізації на кожному етапі процесу. Він навіть слідкує за скомпільованим скриптом під час його виконання, аналізує дані, які проходять через скрипт, і на основі цих знань застосовує оптимізації до машинного коду. Коли це завершиться, скрипти будуть виконуватися дуже швидко.
```

## Що може вбудований в браузер JavaScript?

Сучасний JavaScript — це "безпечна" мова програмування. Вона не надає низькорівневого доступу до пам'яті чи процесора, оскільки початково була створена для браузерів, які цього не потребують.

Можливості Javascript значно залежать від оточення, в якому він виконується. Наприклад, [Node.JS](https://uk.wikipedia.org/wiki/Node.js) підтримує функції, які дозволяють JavaScript читати/записувати довільні файли, здійснювати мережеві запити, та інше.

Вбудований в браузер JavaScript може робити все, що зв'язано з маніпуляцією веб-сторінки, взаємодією з користувачем та веб-сервером.

Наприклад, вбудований в браузер JavaScript може:

- Додавати новий HTML-код на сторінку, змінювати існуючий вміст, змінювати стилі.
- Реагувати на дії користувача, виконуватися при натисканні на кнопки миші, при переміщенні вказівника, при натисканні клавіш клавіатури.
- Відправляти запити через мережу до віддалених серверів, завантажувати і відвантажувати файли (так звані технології [AJAX](https://uk.wikipedia.org/wiki/AJAX) і [COMET](https://uk.wikipedia.org/wiki/Comet_(програмування))).
- Get and set cookies, ask questions to the visitor, show messages.
- Remember the data on the client-side ("local storage").

## What CAN'T in-browser JavaScript do?

JavaScript's abilities in the browser are limited for the sake of the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS system functions.

    Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

    There are ways to interact with camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must contain a special JavaScript code that handles data exchange.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.png)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugin/extensions which may ask for extended permissions.

## What makes JavaScript unique?

There are at least *three* great things about JavaScript:

```compare
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Support by all major browsers and enabled by default.
```
Javascript is the only browser technology that combines these three things.

That's what makes JavaScript unique. That's why it's the most widespread tool for creating browser interfaces.

While planning to learn a new technology, it's beneficial to check its perspectives. So let's move on to the modern trends affecting it,  including new languages and browser abilities.


## Languages "over" JavaScript

The syntax of JavaScript does not suit everyone's needs. Different people want different features.

That's to be expected, because projects and requirements are different for everyone.

So recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it "under the hood".

Examples of such languages:

- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps). It was initially offered by Google as a replacement for JavaScript, but as of now, browsers require it to be transpiled to JavaScript just like the ones above.

There are more. Of course, even if we use one of these languages, we should also know JavaScript to really understand what we're doing.

## Summary

- JavaScript was initially created as a browser-only language, but is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language with full integration with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
