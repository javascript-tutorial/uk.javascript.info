# Налагодження в браузері Chrome

Перед тим, як приступити до написання складнішого коду, давайте поговоримо про його налагодження.

[Налагодження](https://uk.wikipedia.org/wiki/Налагодження_програм) — це процес пошуку і виправлення помилок в скрипті. Усі сучасні браузери і більшість інших середовищ розробки підтримують інструменти налагодження — спеціальний графічний інтерфейс, який значно спрощує налагодження. Він також дозволяє покроково відслідковувати, що саме відбувається в коді.

Ми будемо використовувати браузер Chrome, тому що в нього достатньо можливостей для налагодження. В більшості інших браузерів процес буде схожим.

## Вкладка "Sources" ("вихідний код")

Ваш браузер Chrome може бути іншої версії – він може виглядати інакше, але різниця буде не суттєвою.

- В браузері Chrome, відкрийте [тестову сторінку](debugging/index.html).
- Відкрийте інструменти розробника, натиснувши клавішу `key:F12` (або `key:Cmd+Opt+I` на Mac).
- Виберіть вкладку `Sources`.

У вас буде схоже вікно:

![](chrome-open-sources.svg)

Кнопка-перемикач <span class="devtools" style="background-position:-172px -98px"></span> ліворуч відкриває панель з файлами.

Натисніть на неї і виберіть файл `hello.js`. Ось як буде виглядати вкладка Sources:

![](chrome-tabs.svg)

Цей інтерфейс складається з трьох частин:

1. На панелі **Навігатор файлів** (File Navigator) показані файли HTML, JavaScript, CSS та інші файли, включно із зображеннями, які використовуються на сторінці. Також тут можуть бути файли від розширень Chrome.
2. Панель **Редагування коду** (Code Editor) показує вихідний код.
3. Панель **Налагодження JavaScript** (JavaScript Debugging) використовується для налагодження, ми повернемося до цього пізніше.

Можете знову натиснути на ту саму кнопку <span class="devtools" style="background-position:-172px -122px"></span>, щоб закрити панель і звільнити місце для коду.

## Консоль

Якщо натиснути клавішу `key:Esc`, в нижній частині екрану відкриється консоль. Туди можна вводити команди і виконувати їх, натиснувши клавішу `key:Enter`.

Нижче показується результат виконання команд.

Наприклад, результатом `1 + 2` буде `3`, а ось інструкція `hello("debugger")` нічого не повертає, тому результат буде `undefined`:

![](chrome-sources-console.svg)

## Точки зупинки (breakpoints)

Давайте розберемося, як працює код на [тестовій сторінці](debugging/index.html). В файлі `hello.js`, натисніть на рядок номер `4`. Так, на саму цифру, не по коді.

Вітаємо! Ви поставили точку зупинки. Поставте також точку зупинки на `8` рядку.

Номери рядків мають стати синього кольору. Ось що в результаті повинно вийти:

![](chrome-sources-breakpoint.svg)

*Точка зупинки* — це місце в коді, де налагоджувач автоматично призупинить виконання JavaScript.

Поки виконання призупинене, ми можемо переглядати поточні значення змінних, виконувати команди в консолі тощо. Інакше кажучи, можемо налагоджувати.

В правій частині панелі видно всі точки зупинки. Коли виставлено багато таких точок, та ще й в різних файлах, цей список дозволяє ефективно ними керувати:
- Швидко переміщатися до будь-якої точки зупинки в коді – потрібно клікнути по ній в правій частині панелі.
- Тимчасово вимкнути точку зупинки, знявши виділення.
- Видалити точку – потрібно клікнувши по ній правою кнопкою миші і вибрати «Remove breakpoint» (Видалити точку зупинки).
- ...тощо.

```smart header="Умовні точки зупинки"
Можна задати так звану *умовну* точку зупинки – клікніть правою кнопкою миші по номеру рядка в коді, виберіть пункт «Edit breakpoint...» і пропишіть умову. Коли ця умова буде справджуватися, то виконання коду призупиниться в цій точці зупинки.

Цей метод використовується, коли потрібно призупинити виконання коду під час специфічних значень змінних або параметрів функції.
```

## Команда Debugger

Виконання коду також можна призупиняти командою `debugger` прямо всередині коду, ось так:

```js
function hello(name) {
  let phrase = `Привіт, ${name}!`;

*!*
  debugger;  // <-- тут зупиниться налагоджувач
*/!*

  say(phrase);
}
```

Цей спосіб зручний тим, що коли ми працюємо в редакторі коду, нам не потрібно ще додатково переключатися в браузер, і шукати файл, щоб поставити точку зупинки.


## Зупиніться і озирніться

В нашому прикладі, функція `hello()` викликається під час завантаження сторінки, отже, найшвидшим способом активувати налагоджувач (після того як ми поставили точку зупинки) — це перезавантажити сторінку. Тому просто натисніть `key:F5` (Windows, Linux) чи `key:Cmd+R` (на Mac).

Оскільки ми поставили точку зупинки, виконання коду призупиниться на 4-му рядку:

![](chrome-sources-debugger-pause.svg)

Please open the informational dropdowns to the right (labeled with arrows). They allow you to examine the current code state:

1. **`Watch` -- shows current values for any expressions.**

    You can click the plus `+` and input an expression. The debugger will show its value at any moment, automatically recalculating it in the process of execution.

2. **`Call Stack` -- shows the nested calls chain.**

    At the current moment the debugger is inside `hello()` call, called by a script in `index.html` (no function there, so it's called "anonymous").

    If you click on a stack item (e.g. "anonymous"), the debugger jumps to the corresponding code, and all its variables can be examined as well.
3. **`Scope` -- current variables.**

    `Local` shows local function variables. You can also see their values highlighted right over the source.

    `Global` has global variables (out of any functions).

    There's also `this` keyword there that we didn't study yet, but we'll do that soon.

## Tracing the execution

Now it's time to *trace* the script.

There are buttons for it at the top of the right panel. Let's engage them.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> -- "Resume": continue the execution, hotkey `key:F8`.
: Resumes the execution. If there are no additional breakpoints, then the execution just continues and the debugger loses control.

    Here's what we can see after a click on it:

    ![](chrome-sources-debugger-trace-1.svg)

    The execution has resumed, reached another breakpoint inside `say()` and paused there. Take a look at the "Call Stack" at the right. It has increased by one more call. We're inside `say()` now.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Step": run the next command, hotkey `key:F9`.
: Run the next statement. If we click it now, `alert` will be shown.

    Clicking this again and again will step through all script statements one by one.

<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous the "Step" command, but behaves differently if the next statement is a function call. That is: not a built-in, like `alert`, but a function of our own.

    The "Step" command goes into it and pauses the execution at its first line, while "Step over" executes the nested function call invisibly, skipping the function internals.

    The execution is then paused immediately after that function.

    That's good if we're not interested to see what happens inside the function call.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Step into", hotkey `key:F11`.
: That's similar to "Step", but behaves differently in case of asynchronous function calls. If you're only starting to learn JavaScript, then you can ignore the difference, as we don't have asynchronous calls yet.

    For the future, just note that "Step" command ignores async actions, such as `setTimeout` (scheduled function call), that execute later. The "Step into" goes into their code, waiting for them if necessary. See [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async) for more details.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Step out": continue the execution till the end of the current function, hotkey `key:Shift+F11`.
: Continue the execution and stop it at the very last line of the current function. That's handy when we accidentally entered a nested call using <span class="devtools" style="background-position:-200px -190px"></span>, but it does not interest us, and we want to continue to its end as soon as possible.

<span class="devtools" style="background-position:-61px -74px"></span> -- enable/disable all breakpoints.
: That button does not move the execution. Just a mass on/off for breakpoints.

<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, and the developer tools is open, a script error automatically pauses the execution. Then we can analyze variables to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.

```smart header="Continue to here"
Right click on a line of code opens the context menu with a great option called "Continue to here".

That's handy when we want to move multiple steps forward to the line, but we're too lazy to set a breakpoint.
```

## Logging

To output something to console from our code, there's `console.log` function.

For instance, this outputs values from `0` to `4` to console:

```js run
// open console to see
for (let i = 0; i < 5; i++) {
  console.log("value,", i);
}
```

Regular users don't see that output, it is in the console. To see it, either open the Console panel of developer tools or press `key:Esc` while in another panel: that opens the console at the bottom.

If we have enough logging in our code, then we can see what's going on from the records, without the debugger.

## Summary

As we can see, there are three main ways to pause a script:
1. A breakpoint.
2. The `debugger` statements.
3. An error (if dev tools are open and the button <span class="devtools" style="background-position:-90px -146px"></span> is "on").

When paused, we can debug - examine variables and trace the code to see where the execution goes wrong.

There are many more options in developer tools than covered here. The full manual is at <https://developers.google.com/web/tools/chrome-devtools>.

The information from this chapter is enough to begin debugging, but later, especially if you do a lot of browser stuff, please go there and look through more advanced capabilities of developer tools.

Oh, and also you can click at various places of dev tools and just see what's showing up. That's probably the fastest route to learn dev tools. Don't forget about the right click and context menus!
