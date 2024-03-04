# Переміщення миші: mouseover/out, mouseenter/leave

Давайте детальніше розглянемо події, які відбуваються, коли вказівник миші переміщається між елементами.

## Події mouseover/mouseout, relatedTarget

Подія `mouseover` виникає, коли вказівник миші наводиться на елемент, а `mouseout` -- коли залишає його.

![](mouseover-mouseout.svg)

Ці події особливі, оскільки мають властивість `relatedTarget`. Ця властивість доповнює `target`. Коли миша йде від одного елемента до іншого, один з них стає `target`, а інший -- `relatedTarget`.

Для `mouseover`:

- `event.target` -- це елемент, на який наведено вказівник миші.
- `event.relatedTarget` -- це елемент, з якого прийшов вказіник (`relatedTarget` -> `target`).

Для `mouseout` навпаки:

- `event.target` -- це елемент, який залишила миша.
- `event.relatedTarget` -- це новий елемент під вказівником, на який перейшла миша (`target` -> `relatedTarget`).

```online
У наведеному нижче прикладі кожне обличчя та його риси є окремими елементами. Коли ви рухаєте мишею, події миші відображаються в текстовій області.

Кожна подія містить інформацію як про `target`, так і про `relatedTarget`:

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` може бути `null`"
Властивість `relatedTarget` може мати значення `null`.

Це нормально і просто означає, що вказівник миші прийшов не з іншого елемента, а десь з вікна. Або навпаки, що вказівник вийшов за межі вікна браузера.

Нам варто пам'ятати про цю можливість, використовуючи `event.relatedTarget` в коді. Бо якщо спробувати отримати доступ до `event.relatedTarget.tagName`, то виникне помилка.
```

## Пропуск елементів

Подія `mousemove` запускається, коли миша рухається. Але це не означає, що кожен навіть найменший рух веде до окремої події.

Час від часу браузер перевіряє положення миші. І якщо він помічає зміни, то запускає події.

Це означає, що якщо користувач рухає мишею дуже швидко, деякі DOM-елементи можуть бути пропущені:

![](mouseover-mouseout-over-elems.svg)

Якщо миша дуже швидко рухається від елементів `#FROM` до `#TO`, як зазначено вище, то проміжні елементи `<div>` (або деякі з них) можуть бути пропущені. Подія `mouseout` може бути ініційована на `#FROM`, а потім одразу `mouseover`на `#TO`.

Це добре для продуктивності, бо може бути багато проміжних елементів. Ми насправді не хочемо обробляти кожен із них.

З іншого боку, ми повинні мати на увазі, що вказівник миші не "відвідує" всі елементи на шляху і може "стрибати".

Зокрема, можливо, що вказівник стрибне прямо всередину сторінки з поза меж вікна. У цьому випадку `relatedTarget` має значення `null`, тому що він прийшов "нізвідки":

![](mouseover-mouseout-from-outside.svg)

```online
Ви можете перевірити це на тестовому стенді нижче.

Його HTML має два вкладені елементи: `<div id="child">` знаходиться всередині `<div id="parent">`. Якщо ви швидко наведете на них мишу, то, можливо, лише дочірній div ініціює події, або батьківський, або навіть подій не буде взагалі.

Також перемістіть вказівник у дочірній `div`, а потім швидко перемістіть його вниз через батьківський. Якщо рух досить швидкий, то батьківський елемент ігнорується. Миша перетне батьківський елемент, не помітивши цього.

[codetabs height=360 src="mouseoverout-fast"]
```

```smart header="If `Якщо спрацьовує `mouseover`, має бути `mouseout`"
У разі швидких рухів миші проміжні елементи можуть ігноруватися, але одне ми знаємо напевно: якщо вказівник "офіційно" увійшов на елемент (генерується подія `mouseover`), то при виході з нього ми завжди отримуємо `mouseout`.
```

## Mouseout при переході на дочірній елемент

Важлива функція події `mouseout` -- вона запускається, коли вказівник переміщується від елемента до його нащадка, наприклад, від `#parent` до `#child` у HTML нижче:

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

Якщо ми знаходимося на `#parent`, а потім переміщуємо вказівник глибше в `#child`, ми отримуємо `mouseout` на `#parent`!

![](mouseover-to-child.svg)

Це може здатися дивним, але це легко пояснити.

**Відповідно до логіки браузера, вказівник миші може бути лише над *одним* елементом у будь-який момент часу -- найбільш вкладеним і верхнім за z-індексом.**

Отже, якщо він переходить до іншого елемента (навіть до нащадка), то він залишає попередній.

Зверніть увагу на ще одну важливу деталь обробки подій.

Подія `mouseover` на нащадку буде спливати. Отже, якщо `#parent` має обробник `mouseover`, він спрацює:

![](mouseover-bubble-nested.svg)

```online
Ви можете це добре побачити в прикладі нижче: `<div id="child">` знаходиться всередині `<div id="parent">`. І обробники `mouseover/out` для елементу `#parent` виведуть деталі події.

If you move the mouse from `#parent` to `#child`, you see two events on `#parent`:
1. `mouseout [target: parent]` (left the parent), then
2. `mouseover [target: child]` (came to the child, bubbled).

[codetabs height=360 src="mouseoverout-child"]
```

As shown, when the pointer moves from `#parent` element to `#child`, two handlers trigger on the parent element: `mouseout` and `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: parent element */
};
parent.onmouseover = function(event) {
  /* event.target: child element (bubbled) */
};
```

**If we don't examine `event.target` inside the handlers, then it may seem that the mouse pointer left `#parent` element, and then immediately came back over it.**

But that's not the case! The pointer is still over the parent, it just moved deeper into the child element.

If there are some actions upon leaving the parent element, e.g. an animation runs in `parent.onmouseout`, we usually don't want it when the pointer just goes deeper into `#parent`.

To avoid it, we can check `relatedTarget` in the handler and, if the mouse is still inside the element, then ignore such event.

Alternatively we can use other events: `mouseenter` and `mouseleave`, that we'll be covering now, as they don't have such problems.

## Events mouseenter and mouseleave

Events `mouseenter/mouseleave` are like `mouseover/mouseout`. They trigger when the mouse pointer enters/leaves the element.

But there are two important differences:

1. Transitions inside the element, to/from descendants, are not counted.
2. Events `mouseenter/mouseleave` do not bubble.

These events are extremely simple.

When the pointer enters an element -- `mouseenter` triggers. The exact location of the pointer inside the element or its descendants doesn't matter.

When the pointer leaves an element -- `mouseleave` triggers.

```online
This example is similar to the one above, but now the top element has `mouseenter/mouseleave` instead of `mouseover/mouseout`.

As you can see, the only generated events are the ones related to moving the pointer in and out of the top element. Nothing happens when the pointer goes to the child and back. Transitions between descendants are ignored

[codetabs height=340 src="mouseleave"]
```

## Event delegation

Events `mouseenter/leave` are very simple and easy to use. But they do not bubble. So we can't use event delegation with them.

Imagine we want to handle mouse enter/leave for table cells. And there are hundreds of cells.

The natural solution would be -- to set the handler on `<table>` and process events there. But `mouseenter/leave` don't bubble. So if such event happens on `<td>`, then only a handler on that `<td>` is able to catch it.

Handlers for `mouseenter/leave` on `<table>` only trigger when the pointer enters/leaves the table as a whole. It's impossible to get any information about transitions inside it.

So, let's use `mouseover/mouseout`.

Let's start with simple handlers that highlight the element under mouse:

```js
// let's highlight an element under the pointer
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
Here they are in action. As the mouse travels across the elements of this table, the current one is highlighted:

[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

In our case we'd like to handle transitions between table cells `<td>`: entering a cell and leaving it. Other transitions, such as inside the cell or outside of any cells, don't interest us. Let's filter them out.

Here's what we can do:

- Remember the currently highlighted `<td>` in a variable, let's call it `currentElem`.
- On `mouseover` -- ignore the event if we're still inside the current `<td>`.
- On `mouseout` -- ignore if we didn't leave the current `<td>`.

Here's an example of code that accounts for all possible situations:

[js src="mouseenter-mouseleave-delegation-2/script.js"]

Once again, the important features are:
1. It uses event delegation to handle entering/leaving of any `<td>` inside the table. So it relies on `mouseover/out` instead of `mouseenter/leave` that don't bubble and hence allow no delegation.
2. Extra events, such as moving between descendants of `<td>` are filtered out, so that `onEnter/Leave` runs only if the pointer leaves or enters `<td>` as a whole.

```online
Here's the full example with all details:

[codetabs height=460 src="mouseenter-mouseleave-delegation-2"]

Try to move the cursor in and out of table cells and inside them. Fast or slow -- doesn't matter. Only `<td>` as a whole is highlighted, unlike the example before.
```

## Summary

We covered events `mouseover`, `mouseout`, `mousemove`, `mouseenter` and `mouseleave`.

These things are good to note:

- A fast mouse move may skip intermediate elements.
- Events `mouseover/out` and `mouseenter/leave` have an additional property: `relatedTarget`. That's the element that we are coming from/to, complementary to `target`.

Events `mouseover/out` trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time -- the deepest one.

Events `mouseenter/leave` are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble.
