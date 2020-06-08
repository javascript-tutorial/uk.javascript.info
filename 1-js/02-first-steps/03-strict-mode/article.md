# Сучасний режим, "use strict"

Впродовж тривалого часу, JavaScript розвивався без проблем із сумісністю. До мови додавалися нові функції, а стара функціональність залишалася незмінною.

Перевагою цього було те, що існуючий код не ламався. Проте, будь-яка помилка або неідеальне рішення назавжди ставали частиною JavaScript, тому що цей код не змінювався.

Так було до того, як у 2009 році з'явився стандарт ECMAScript 5 (ES5). Він додав нові функції до мови і змінив деякі існуючі. Щоб старий код лишався робочим, більшість таких модифікацій усталено було вимкнено. Щоб увімкнути цей функціонал, потрібно прописати спеціальну директиву: `"use strict"`.

## "use strict"

Директива виглядає як рядок: `"use strict"` чи `'use strict'` і дослівно перекладається як "використовувати суворий (режим)". Якщо вона прописана на початку скрипта, він буде виконуватися у "сучасному" режимі.

Наприклад:

```js
"use strict";

// цей код працюватиме у сучасному режимі
...
```

<<<<<<< HEAD
Незабаром ми вивчемо функції (такий собі спосіб групування команд). Забігаючи наперед, майте на увазі, що `"use strict"` також можна писати на початку тіла функції, замість цілого скрипта. Таким чином, суворий режим буде використовуватися лише в межах цієї функції. Проте, зазвичай люди використовують цей режим для всього скрипта.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

````warn header="Переконайтеся, що \"use strict\" написано зверху"
Будь ласка, завжди переконуйтеся в тому, що директива `"use strict"` написана зверху ваших скриптів, інакше суворий режим не увімкнеться.

Тут суворий режим не спрацює:

```js no-strict
alert("деякий код");
// "use strict" нижче alert(), і тому ігнорується -- він повинен бути зверху

"use strict";

// суворий режим не активовано
```

Лише коментарі можуть бути вище `"use strict"`.
````

```warn header="Неможливо скасувати `use strict`"
Немає такої директиви, як `"no use strict"`, яка могла б вернути старий режим.

Як тільки ми увійшли в суворий режим, назад дороги немає.
```

## Консоль браузера

<<<<<<< HEAD
На майбутнє, коли ви використовуєте консоль браузера для тестування функцій, будь ласка, запам'ятайте, що консоль усталено не використовує суворий режим.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

В такому випадку, коли `use strict` робитиме різницю, ви можете отримати інші результати.

<<<<<<< HEAD
Ви можете натиснути `key:Shift+Enter`, щоб ввести декілька рядків, і написати `use strict` на початку, ось так:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
'use strict'; <Shift+Enter для нового рядка>
//  ...ваш код
<натисніть Enter, щоб виконати>
```

Це працюватиме в більшості браузерів, особливо в Firefox і Chrome.

<<<<<<< HEAD
Якщо не спрацює, тоді найнадійнішим варіантом буде використати `use strict` всередині фукнції ось так:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...ваш код...
})()
```

## Завжди використовуйте "use strict"

Нам ще доведеться вивчити відмінності між суворим режимом і "усталеним" режимом.

У наступних розділах, в процесі вивчення особливостей мови, ми замітимо різницю між суворим і усталеним режимами. На щастя, їх не багато, і вони справді роблять наше життя кращим.

Зараз достатньо знати про це в загальному:

1. Директива `"use strict"` переключає рушій у "сучасний" режим, змінюючи поведінку деяких вбудованих функцій. Ми побачимо детальніше згодом, у посібнику.
2. Суворий режим вмикається шляхом написання `"use strict"` зверху скрипта, або на початку функції. Деякі можливості мови, як "класи" чи "модулі", автоматично вмикають суворий режим.
3. Суворий режим підтримується всіма сучасними браузерами.
4. Ми рекомендуємо завжди починати написання скриптів з `"use strict"`. Усі приклади в цьому посібнику припускають увімкнений суворий режим, за випадків (дуже рідких), коли не вказано інше.
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
