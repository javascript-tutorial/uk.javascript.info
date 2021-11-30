(!!!) - ПЕРЕВІРИТИ
* приклади коду
* зображення

# Робота з помилками, "try...catch"

На скільки чудовими програмістами ми б не були, але часом трапляється, що в роботі наших скрипів можуть виникати виключні ситуації. Вони виникають через наші помилки, непередбачувані вхідні дані від користувачів, неправильні відповіді від сервера або з тисяч інших причин.

Якщо виникають помилки, то скрипти, зазвичай, "помирають" (раптово припиняють роботу) та виводять інформацію про помилку в консоль.

Але існує синтаксична конструкція `try...catch`, що дозволяє нам "перехоплювати" помилки, що дає змогу скриптам виконати потрібні дії, а не раптово припинити роботу.

## Синтаксис "try...catch"

Конструкція `try...catch` містить два головних блоки: `try`, а потім `catch`:

```js
try {

  // код...

} catch (err) {

  // код обробки помилки

}
```

Це працює наступним чином:

1. В першу чергу виконується код в блоці `try {...}`.
2. Якщо не виникає помилок, то блок `catch (err)` ігнорується: виконання досягає кінця блоку `try` та продовжується поза `catch` блоком.
3. Якщо виникає помилка, тоді виконання в `try` припиняється і виконання коду продовжується з початку `catch (err)` блоку. Змінна `err` (можна обрати інше ім'я) буде містити об'єкт помилки з додатковою інформацією.

![](try-catch-flow.svg)

Отже, помилка всередині `try {...}` блоку не призводить до раптового припинення роботи скрипту - ми отримуємо можливість обробити її в `catch`.

Подивімося на декілька прикладів.

- Приклад без виключень: виводить `alert` `(1)` та `(2)`:

    ```js run
    try {

      alert('Початок try блоку');  // *!*(1) <--*/!*

      // ...код без помилок

      alert('Кінець try блоку');   // *!*(2) <--*/!*

    } catch (err) {

      alert('Помилок немає, тому catch ігнорується'); // (3)

    }
    ```
- Приклад з виключенням: виводить `(1)` та `(3)`:

    ```js run
    try {

      alert('Початок try блоку');  // *!*(1) <--*/!*

    *!*
      lalala; // помилка, змінна не визначена!
    */!*

      alert('Кінець try блоку (не буде виконано)');  // (2)

    } catch (err) {

      alert(`Виникла помилка!`); // *!*(3) <--*/!*

    }
    ```


````warn header="`try...catch` працює тільки з виключеннями, що виникають в під час роботи скрипту"
Щоб блок `try...catch` спрацював, код повинен запускатися. Іншими словами, це повинен бути валідний JavaScript.

Це не спрацює, якщо код містить синтаксичні помилки, як-от незакриті фігурні дужки:

```js run
try {
  {{{{{{{{{{{{
} catch (err) {
  alert("Це не валідний код, рушій його не зрозуміє");
}
```

JavaScript рушій спочатку прочитує код і тільки потім виконує його. Помилки, що виникають у фазі читання називаються "помилки парсингу", вони не можуть бути обробленими і скрипти припиняють свою роботу. Це виникає через те, що рушій не може зрозуміти код.

Тому `try...catch` може тільки обробляти помилки, що виникають у правильному коді. Такі помилки називаються "помилки часу виконання" або "виключення".
````


````warn header="`try...catch` працює синхронно"
Якщо виключення трапляється у "запланованому до виконання" коді, як `setTimeout`, тоді `try...catch` не зможе перехопити помилку:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // скрипт припинить свою роботу
  }, 1000);
} catch (err) {
  alert( "не спрацює" );
}
```

Це відбувається через те, що функція буде виконана пізніше, коли рушій вже вийде з блоку `try...catch`.

Щоб перехопити виключення всередині функції запланованої до виконання, `try...catch` повинен бути всередині цієї функції:
```js run
setTimeout(function() {
  try {
    noSuchVariable; // try...catch опрацює помилку!
  } catch {
    alert( "помилку перехоплено тут!" );
  }
}, 1000);
```
````

## Об’єкт помилки

Коли виникає помилка, JavaScript генерує об’єкт, що містить інформацію про неї. Потім цей об'єкт передається як аргумент в `catch`:

```js
try {
  // ...
} catch (err) { // <-- "об’єкт помилки", можна використати іншу назву замість err
  // ...
}
```

Для всіх вбудованих помилок об’єкт помилки має дві головні властивості:

`name`
: Назва помилки. Наприклад, для невизначеної змінної назва буде `"ReferenceError"`.

`message`
: Текстове повідомлення з додатковою інформацією про помилку.

Існують інші властивості, що доступні в більшості оточень. Одна з найуживаніших та часто підтримується:

`stack`
: Current call stack: a string with information about the sequence of nested calls that led to the error. Used for debugging purposes.

: Поточний стек викликів: рядок з інформацією про послідовність вкладених викликів, що призвели до помилки. Використовується для налагодження.

Наприклад:

```js run untrusted
try {
*!*
  lalala; // помилка, змінна не визначена!
*/!*
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Також можливо вивести всю інформацію про помилку
  // Помилку конвертовано в рядок формату "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```

## Опціональність аргументів "catch" блоку

[recent browser=new]

Блок `catch` не обов’язково повинен перехоплювати інформацію про об’єкт помилки:

```js
try {
  // ...
} catch { // <-- без (err)
  // ...
}
```

## Використання "try...catch"

Подивімось на реальний приклад використання `try...catch`.

Як ми вже знаємо, JavaScript може читати значення у форматі JSON за допомогою методу [JSON.parse(str)](mdn:js/JSON/parse).

Зазвичай ми використовуємо його для декодування даних отриманих з сервера чи іншого джерела через мережу.

Ми отримуємо дані та викликаємо `JSON.parse` наступним чином:

```js run
let json = '{"name":"Іван", "age": 30}'; // дані з серверу

*!*
let user = JSON.parse(json); // трансформуємо текстове значення в JS об’єкт
*/!*

// тепер user це об’єкт, що містить властивості з рядку
alert( user.name ); // Іван
alert( user.age );  // 30
```

Ви можете знайти більше інформації про використання JSON в розділі <info:json>.

**Якщо використати `JSON.parse` з неправильно сформованим `json` повідомленням, це призведе до помилки та раптового припинення роботи скрипту.**

Така поведінка задовольняє нас? Звичайно ні!

Користувач ніколи не дізнається якщо з даними щось трапилося (якщо не відкриє консоль розробника). Люди не очікують, що щось раптово може припинити роботу без будь-якої інформації про помилку.

Для оброблення помилки використаймо `try...catch`:

```js run
let json = "{ неправильний формат json }";

try {

*!*
  let user = JSON.parse(json); // <-- тут виникає помилка...
*/!*
  alert( user.name ); // не буде виконано

} catch (err) {
*!*
  // ...виконання передається в цей блок
  alert( "Перепрошуємо, але дані містять помилки. Ми спробуємо запросити їх ще раз." );
  alert( err.name );
  alert( err.message );
*/!*
}
```

В цьому випадку `catch` блок використано тільки для виведення повідомлення про помилку, але може бути використаним іншим чином: відправити новий запит, запропонувати користувачі інші опції, відправити інформацію про помилку для логування та ін. Будь-який спосіб використання краще, ніж раптове припинення роботи.

## Створення та викидання власних типів помилок

Уявімо ситуацію, що `json` синтаксично правильний, але не містить необхідного поля `name`.

Наприклад:

```js run
let json = '{ "age": 30 }'; // неповні дані

try {

  let user = JSON.parse(json); // <-- помилка не виникає
*!*
  alert( user.name ); // відсутнє поле name!
*/!*

} catch (err) {
  alert( "не буде виконано" );
}
```

В такому випадку `JSON.parse` відпрацює без виключень, але відсутність поля `name` є помилкою з нашої точки зору.

Ми будемо використовувати оператор `throw` для об’єднання способів обробки помилок.

### Оператор "throw"

Оператор `throw` використовується для викидання помилки.

Оператор має синтаксис:

```js
throw <об’єкт помилки>
```

Рушії дозволяє використовувати будь-які значення як об’єкти помилки. Це може бути навіть примітивне значення, як число чи рядок, але краще використовувати об’єкти, що мають властивості `name` та `message` (для сумісності з вбудованим типом помилок).

JavaScript має багато вбудованих конструкторів для вбудованих помилок: `Error`, `SyntaxError`, `ReferenceError`, `TypeError` та інші. Також вони можуть бути використаними для створення об’єктів помилок.

Синтаксис ініціалізації вбудованих помилок:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

Для вбудованого типу помилки, властивість `name` має значення імені конструктора, а `message` отримує значення з аргументу.

Наприклад:

```js run
let error = new Error("Щось трапилось o_O");

alert(error.name); // Error
alert(error.message); // Щось трапилось o_O
```

Подивімося на тип помилки згенерований функцією `JSON.parse`:

```js run
try {
  JSON.parse("{ це не json o_O }");
} catch (err) {
*!*
  alert(err.name); // SyntaxError
*/!*
  alert(err.message); // expected property name or '}' at line 1 column 3 of the JSON data
}
```

Як бачимо, назва помилки `SyntaxError`.

В нашому випадку відсутність властивості `name` є помилкою, оскільки користувачам потрібна інформація з цього поля.

Тож давайте викинемо її:

```js run
let json = '{ "age": 30 }'; // неповні дані

try {

  let user = JSON.parse(json); // <-- немає помилки

  if (!user.name) {
*!*
    throw new SyntaxError("Неповні дані: відсутнє поле name"); // (*)
*/!*
  }

  alert( user.name );

} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Неповні дані: відсутнє поле name
}
```

У рядку `(*)` оператор `throw` генерує `SyntaxError` із заданим значення поля `message`, таким же чином це зробив би JavaScript. Виконання коду в блоці `try` одразу припиняється і контроль передається в `catch`.

Тепер в блоці `catch` обробляються всі види помилок: від `JSON.parse` та інших випадків.

## Повторне викидання помилок

В наступному прикладі використаємо `try...catch`, щоб обробити неправильні дані. Але чи може всередині блоку `try {...}` виникнути *інша непередбачувана помилка*? Наприклад, це не просто "неправильні дані", а програміст помилився і забув визначити змінну чи ще щось?

Наприклад:

```js run
let json = '{ "age": 30 }'; // неповні дані

try {
  user = JSON.parse(json); // <-- не поставлено "let" перед user

  // ...
} catch (err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (але перехоплена помилка не пов’язана з JSON Error)
}
```

Звичайно таке можливо! Програмісти теж помиляються. Навіть програми з відкритим кодом, що використовуються десятиріччями можуть раптово виявитися вразливими.

В нашому прикладі `try...catch` використовується для перехоплення помилок, що виникають у випадку неповних даних. Але `catch` перехоплює *всі* типи помилок, що виникають в `try`. Тут виникає непередбачувана помилка, але все одно в в повідомленні виводиться `"JSON Error"`. Це неправильна поведінка, що ускладнює налагодження.

Щоб уникати таких проблем, ми можемо використовувати підхід "повторного викидання помилок". Правило просте:

**Блок `catch` повинен оброблювати тільки відомі помилки та повторно генерувати всі інші типи помилок.**

Розгляньмо підхід "повторного викидання" покроково:

1. Конструкція `catch` перехоплює всі помилки.
2. В блоці `catch (err) {...}` ми аналізуємо об’єкт помилки `err`.
3. Якщо ми не знаємо як правильно обробити помилку, ми робимо `throw err`.

Зазвичай, тип помилки можна перевірити за допомогою оператора `instanceof`:

```js run
try {
  user = { /*...*/ };
} catch (err) {
*!*
  if (err instanceof ReferenceError) {
*/!*
    alert('ReferenceError'); // "ReferenceError" помилка доступу до невизначеної змінної
  }
}
```

Для визначення класу помилки можливо перевірити властивість `err.name`. Всі вбудовані помилки мають її. Також можна перевірити значення `err.constructor.name`.

В коді нижче, щоб `catch` опрацьовував тільки `SyntaxError` ми "повторно викидаємо" помилки інших типів.

```js run
let json = '{ "age": 30 }'; // неповні дані
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Неповні дані: відсутнє поле name");
  }

*!*
  blabla(); // непередбачувана помилка
*/!*

  alert( user.name );

} catch (err) {

*!*
  if (err instanceof SyntaxError) {
    alert( "JSON Error: " + err.message );
  } else {
    throw err; // повторне викидання (*)
  }
*/!*

}
```

The error throwing on line `(*)` from inside `catch` block "falls out" of `try...catch` and can be either caught by an outer `try...catch` construct (if it exists), or it kills the script.

So the `catch` block actually handles only errors that it knows how to deal with and "skips" all others.

The example below demonstrates how such errors can be caught by one more level of `try...catch`:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
*!*
      throw err; // rethrow (don't know how to deal with it)
*/!*
    }
  }
}

try {
  readData();
} catch (err) {
*!*
  alert( "External catch got: " + err ); // caught it!
*/!*
}
```

Here `readData` only knows how to handle `SyntaxError`, while the outer `try...catch` knows how to handle everything.

## try...catch...finally

Wait, that's not all.

The `try...catch` construct may have one more code clause: `finally`.

If it exists, it runs in all cases:

- after `try`, if there were no errors,
- after `catch`, if there were errors.

The extended syntax looks like this:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!* (err) {
   ... handle errors ...
} *!*finally*/!* {
   ... execute always ...
}
```

Try running this code:

```js run
try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

The code has two ways of execution:

1. If you answer "Yes" to "Make an error?", then `try -> catch -> finally`.
2. If you say "No", then `try -> finally`.

The `finally` clause is often used when we start doing something and want to finalize it in any case of outcome.

For instance, we want to measure the time that a Fibonacci numbers function `fib(n)` takes. Naturally, we can start measuring before it runs and finish afterwards. But what if there's an error during the function call? In particular, the implementation of `fib(n)` in the code below returns an error for negative or non-integer numbers.

The `finally` clause is a great place to finish the measurements no matter what.

Here `finally` guarantees that the time will be measured correctly in both situations -- in case of a successful execution of `fib` and in case of an error in it:

```js run
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "error occurred");

alert( `execution took ${diff}ms` );
```

You can check by running the code with entering `35` into `prompt` -- it executes normally, `finally` after `try`. And then enter `-1` -- there will be an immediate error, and the execution will take `0ms`. Both measurements are done correctly.

In other words, the function may finish with `return` or `throw`, that doesn't matter. The `finally` clause executes in both cases.


```smart header="Variables are local inside `try...catch...finally`"
Please note that `result` and `diff` variables in the code above are declared *before* `try...catch`.

Otherwise, if we declared `let` in `try` block, it would only be visible inside of it.
```

````smart header="`finally` and `return`"
The `finally` clause works for *any* exit from `try...catch`. That includes an explicit `return`.

In the example below, there's a `return` in `try`. In this case, `finally` is executed just before the control returns to the outer code.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (err) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // first works alert from finally, and then this one
```
````

````smart header="`try...finally`"

The `try...finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.

```js
function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}
```
In the code above, an error inside `try` always falls out, because there's no `catch`. But `finally` works before the execution flow leaves the function.
````

## Global catch

```warn header="Environment-specific"
The information from this section is not a part of the core JavaScript.
```

Let's imagine we've got a fatal error outside of `try...catch`, and the script died. Like a programming error or some other terrible thing.

Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don't see error messages), etc.

There is none in the specification, but environments usually provide it, because it's really useful. For instance, Node.js has [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) for that. And in the browser we can assign a function to the special [window.onerror](mdn:api/GlobalEventHandlers/onerror) property, that will run in case of an uncaught error.

The syntax:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Error message.

`url`
: URL of the script where error happened.

`line`, `col`
: Line and column numbers where error happened.

`error`
: Error object.

For instance:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // Whoops, something went wrong!
  }

  readData();
</script>
```

The role of the global handler `window.onerror` is usually not to recover the script execution -- that's probably impossible in case of programming errors, but to send the error message to developers.

There are also web-services that provide error-logging for such cases, like <https://errorception.com> or <http://www.muscula.com>.

They work like this:

1. We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
2. That JS script sets a custom `window.onerror` function.
3. When an error occurs, it sends a network request about it to the service.
4. We can log in to the service web interface and see errors.

## Summary

The `try...catch` construct allows to handle runtime errors. It literally allows to "try" running the code and "catch" errors that may occur in it.

The syntax is:

```js
try {
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // do in any case after try/catch
}
```

There may be no `catch` section or no `finally`, so shorter constructs `try...catch` and `try...finally` are also valid.

Error objects have following properties:

- `message` -- the human-readable error message.
- `name` -- the string with error name (error constructor name).
- `stack` (non-standard, but well-supported) -- the stack at the moment of error creation.

If an error object is not needed, we can omit it by using `catch {` instead of `catch (err) {`.

We can also generate our own errors using the `throw` operator. Technically, the argument of `throw` can be anything, but usually it's an error object inheriting from the built-in `Error` class. More on extending errors in the next chapter.

*Rethrowing* is a very important pattern of error handling: a `catch` block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn't know.

Even if we don't have `try...catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
