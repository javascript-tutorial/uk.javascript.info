# Ніндзя код


```quote author="Конфуцій"
Вивчення без обдумання є марнотратством; обдумання ж без вивчення є небезпечним.
```

Ніндзя-програмісти минулого використовували деякі хитрощі, щоб захострити розум тих, хто буде підтримувати їх код.

Гуру, що перевіряють код шукають їх у тестових завданнях.

Початківці іноді викорустовують їх креща за ніндзя-програмістів.

Перечитайте їх уважно та вирішуйте хто ви є -- ніндзя, початківцем, або може гуру перевірки коду?


```warn header="Обережно, іронія!"
Багато, хто намагвся піти шляхом ніндзя. Мало кому це вдалось.
```


## Стислість - сестра таланту

Пишіть якомога коротший код. Покажіть, наскільки ви розумні.

Нехай стислі та неочевидні можливості мови стануть вам посібником.

Наприклад, розглянемо таке застосування тернарного оператора `'?'`:

```js
// взято з добре відомої javascript бібліотеки
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Круто, правда? Якщо ви напишете подібне, розробник, який натрапить на цей рядок і намагатиметься зрозуміти, яке ж значення має `i`, пізнає неабияку радість. І врешті-решт, прийде до вас за відповідю.

Скажіть йому, що коротше - це завжди краще. Допоможіть і йому стати на шлях ніндзя.

## Однолітерні змінні

```quote author="Лао-цзи (Дао де цзін)"
Дао ховається в безсловесності. Тільки Дао добре розпочато і добре завершено.
```

Ще один спосіб писати код швидше - використовувати однолітерні змінні. Наприклад: `a`, `b` або `c`.

Коротка змінна зникає у коді наче ніндзя у лісі. Ніхто не зможе знайти її використовуючи "пошук" редактора. І навіть, якщо її знайдуть, вони не зможуть "розшифрувати" за що саме змінні `a` чи`b` відповідають.

...Але є одне виключення з правил. Справжній ніндзя ніколи не використовуватиме `i` у якості лічильника в циклі `"for"`. Де завгодно, тільки не тут! Озерніться - є багато інших екзотичних літер. Наприклад, `x` або `y`.

Екзотична змінна у якості лічильника особоливо доречна, коли тіло цикла займає одну-дві сторінки (чим більше, тим краще). У такому випадку, ті, хто занурить глибоко у код цикла, не зможуть швидко здогадатись, що змінна `x` насправді є лічильником.

## Використовуйте скоротчення

Якщо правила, встановлені командою, не дозволяють вам використовувати однолітерні змінні або абстрактні імена, тоді скоротшуйте їх.

Наприклад:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...і т.д.

Тільки обрані, що мають розвинену інтуіцію, зможуть зрозуміти такі імена. Намагайтесь скоротшувати все. Тільки достойні повинні мати змогу підтримувати ваш код.

## Будьте абстрактними.

```quote author="Лао-цзи (Дао де цзін)"
Великий квадрат не має кутів,<br>
Великий  глек  довго  ліпиться,<br>
Великий звук не можна почути,<br>
Великий образ неозорий.
```

Обираючи ім'я, намагайтесь використовувати найбільш абстрактне слово. Прикладом може бути `obj`, `data`, `value`, `item`, `elem`, тощо.

- **`data` є ідеальним варіантом для назви змінної.** Використовуйте його всюди, де зможете. І справді, кожна змінна має *дані*, правильно?

    ...Що робити, якщо назва `data` вже зайнята? Спробуйте `value` - вона також універсальна. Врешті-решт, змінна отримує якесь *значення*.

- **Підбирайте і'мя зміннім згідно з їх типом: `str`, `num`...**

    Спробуйте. Щойно ставший на шлях ніндзя може засумніватись, чи вони дійсно такі корисні? Авжеж!

    Так, ім'я змінної дещо означає. Це дає зрозуміти, що ми використовуємо: рядок, число чи щось ще. Проте коли сторонні люди намагатимуться зрозуміти код, вони будуть здивовані, що інформація про те, що саме містить змінна, відсутня. У результаті вони не зможуть змінити ваш добре обміркований код.

    Тип змінної досить легко знайти під час налаштування. Але що означає назва змінної? Яку саме строку/число вона зберігає?

    Жодного шансу дізнатись про це без тривалої медитації!

- **...Але що робити коли і такі імена закінчились?** Просто додайте число: `data1, item2, elem5`...

## Перевірка уваги

Тільки дуже уважний програміст повинен мати змогу зрозуміти ваш код. Проте як це перевірити? 

**Один із способів -- використання схожих імен змінних, наприклад `date` and `data`.**

Змішуйте їх всюди, де це можливо.

Швидко прочитати такий код неможливо. А якщо виникла друкарська помилка... Мммм... Це надовго, час випити чаю.


## Хитрі синонімів

```quote author="Конфуцій"
Дуже важко шукати чорну кішку у темній кімнаті, особливо, коли її там немає.
```

Використання *схожих* імен для *однакових* речей робить наше життя цікавішим і показує рівень вашої креативності публіці.

Наприклад, роглянемо префікси функцій. Якщо функція показує повідомлення на екрані -- почніть назву з `display…`, наприклад, `displayMessage`. І коли інша фукція показуватиме щось ще на екрані (скажімо, ім'я користувача), почніть її назву з `show…` (наприклад, `showName`).

Тобто натякніть, що є деяка тонка різниця між цими функціями, хоча насправді її немає.

Домовьтесь зі своїми ніндзя-колегами, що якшо Іван починає називати функції, що показують використовуючи `display...`, тоді Петро може використовувати `render..`, а Ганна -- `paint...`. Зауважте, наскільки цікавим та різноманітним став наш код.

...А тепер коронний прийом!

Для функцій, у яких дійсно є важлива різниця, використовуйте однаковий префікс!

Наприклад, функція `printPage(page)` використовуватиме принтер. А `printText(text)` виводитеме текст на екран. Нехай люди неосвічені у вашому коді здогадуються з приводу схожої функції `printMessage`: "Куди буде виведено повідомлення? На принтер чи на екран?". Для збільшення ефекту неочікуваності, функція `printMessage(message)` повинна вивести повідомлення в нове вікно!

## Використовуйте імена повторно

```quote author="Лао-цзи (Дао де цзін)"
При встановленні порядку<br>
з'явилися імена.<br>
Оскільки виникли імена,<br>
потрібно знати межу їх використання.
```

Додавайте нову змінну тільки тоді коли це вкрай необхідно.

Замість цього, використовуйте повторно існуюючі змнні. Просто записуйте у них нові значення.

У функції намагайтесь використовувати лише змінні, що були передані у якості параметрів.

That would make it really hard to identify what's exactly in the variable *now*. And also where it comes from. The purpose is to develop the intuition and memory of a person reading the code. A person with weak intuition would have to analyze the code line-by-line and track the changes through every code branch.

**An advanced variant of the approach is to covertly (!) replace the value with something alike in the middle of a loop or a function.**

For instance:

```js
function ninjaFunction(elem) {
  // 20 lines of code working with elem

  elem = clone(elem);

  // 20 more lines, now working with the clone of the elem!
}
```

A fellow programmer who wants to work with `elem` in the second half of the function will be surprised... Only during the debugging, after examining the code they will find out that they're working with a clone!

Seen in code regularly. Deadly effective even against an experienced ninja.

## Underscores for fun

Put underscores `_` and `__` before variable names. Like `_name` or `__value`. It would be great if only you knew their meaning. Or, better, add them just for fun, without particular meaning at all. Or different meanings in different places.

You kill two rabbits with one shot. First, the code becomes longer and less readable, and the second, a fellow developer may spend a long time trying to figure out what the underscores mean.

A smart ninja puts underscores at one spot of code and evades them at other places. That makes the code even more fragile and increases the probability of future errors.

## Show your love

Let everyone see how magnificent your entities are! Names like `superElement`, `megaFrame` and `niceItem` will definitely enlighten a reader.

Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand -- that brings no details. A reader may decide to look for a hidden meaning and meditate for an hour or two of their paid working time.


## Overlap outer variables

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Use same names for variables inside and outside a function. As simple. No efforts to invent new names.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- a programmer wants to work with user here and...
  ...
}
```

A programmer who jumps inside the `render` will probably fail to notice that there's a local `user` shadowing the outer one.

Then they'll try to work with `user` assuming that it's the external variable, the result of `authenticateUser()`... The trap is sprung! Hello, debugger...


## Side-effects everywhere!

There are functions that look like they don't change anything. Like `isReady()`, `checkPermission()`, `findTags()`... They are assumed to carry out calculations, find and return the data, without changing anything outside of them. In other words, without "side-effects".

**A really beautiful trick is to add a "useful" action to them, besides the main task.**

An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.

**Another way to surprise is to return a non-standard result.**

Show your original thinking! Let the call of `checkPermission` return not `true/false`, but a complex object with the results of the check.

Those developers who try to write `if (checkPermission(..))`, will wonder why it doesn't work. Tell them: "Read the docs!". And give this article.


## Powerful functions!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Don't limit the function by what's written in its name. Be broader.

For instance, a function `validateEmail(email)` could (besides checking the email for correctness) show an error message and ask to re-enter the email.

Additional actions should not be obvious from the function name. A true ninja coder will make them not obvious from the code as well.

**Joining several actions into one protects your code from reuse.**

Imagine, another developer wants only to check the email, and not output any message. Your function  `validateEmail(email)` that does both will not suit them. So they won't break your meditation by asking anything about it.

## Summary

All "pieces of advice" above are from the real code... Sometimes, written by experienced developers. Maybe even more experienced than you are ;)

- Follow some of them, and your code will become full of surprises.
- Follow many of them, and your code will become truly yours, no one would want to change it.
- Follow all, and your code will become a valuable lesson for young developers looking for enlightenment.
