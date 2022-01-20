
Ми можемо побачити, якому класу він належить вивівши його, наприклад:

```js run
alert(document); // [object HTMLDocument]
```

Або:

```js run
alert(document.constructor.name); // HTMLDocument
```

Отже, `document` -- це екземпляр класу `HTMLDocument`.

Яке його місце в ієрархії?

Так, ми могли б переглянути специфікацію, але було б швидше з’ясувати вручну.

Давайте пройдемо по ланцюгу прототипів через `__proto__`.

Як відомо, методи класу знаходяться в `prototype` конструктора. Наприклад, `HTMLDocument.prototype` має методи документів.

Також є посилання на функцію конструктора всередині `prototype`:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Щоб отримати назву класу як рядок, ми можемо використовувати `constructor.name`. Давайте зробимо це для всього прототипного ланцюга `document` аж до класу` Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Це ієрархія.

Ми також можемо розглянути об’єкт за допомогою `console.dir(document)` і побачити ці назви, відкриваючи `__proto__`.Консоль браузера під капотом бере їх з `constructor`.
