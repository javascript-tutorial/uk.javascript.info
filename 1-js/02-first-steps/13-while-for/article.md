# Цикли: while і for

При написанні скриптів часто постає завдання зробити однотипні дії багато разів.

Наприклад, вивести товари зі списку один за одним чи просто запустити один і той же код для кожного числа від 1 до 10.

*Цикл* - це спосіб повторити один і той же код кілька разів.

## Цикл "while"

Цикл `while` має такий синтаксис:

```js
while (умова) {
  // код
  // так зване "тіло циклу"
}
```

Доки умова є `вірною`, виконується `код` із тіла циклу.

Наприклад, цикл нижче виводить `i` поки `i < 3`:

```js run
let i = 0;
while (i < 3) { // показується 0, далі 1, потім 2
  alert( i );
  i++;
}
```

Одне виконання циклу називається *ітерацією*. Цикл в зразку вище робить три ітерації.

Якщо `i++` пропустити в коді вище, то цикл виконувався б (в теорії) вічно. На практикі, браузери надають способи зупинити такі цикли, і на серверному JavaScript(Node.js), ми можемо знищити цей процес

Будь-який вираз або змінна може бути умовою циклу, а не тільки порівняння (`a < 5` чи `b !== 10`). Умова виконується і конвертується у логічне значення.

Наприклад, коротший спосіб написання `while (i != 0)` відповідає `while (i)`:

```js run
let i = 3;
*!*
while (i) { // коли i буде 0, умова стане невірною, і цикл зупиниться
*/!*
  alert( i );
  i--;
}
```

````smart header="Curly braces are not required for a single-line body"
Якщо тіло цикла має один операцію, ми можемо опустити фігурні дужки `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Цикл "do..while"

Перевірка умови може бути переміщена *нижче* тіла циклу використовуючи `do..while` синтаксис:

```js
do {
  // тіло циклу
} while (умова);
```

Цикл спочатку виконує тіло, а потім перевіряє умову, і поки умова є `true`, цикл виконується знову і знову.

Наприклад:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Цю форму синтаксису слід використовувати лише тоді, коли ви хочете, щоб тіло циклу виконалось **хоча б один раз**, незалежно від умови. Зазвичай, інша форма є більш бажаною `while(…) {…}`

## Цикл "for"

Цикл `for` є більш складним, але також є часто використовуваним циклом.

Виглядає він так:

```js
for (початок; умова; крок) {
  // ... тіло циклу ...
}
```

Давайте дізнаємовь про значення цих трьох частин за зразком. Цикл нижче виконує `alert(i)` для `i` від `0` до `3` (але не включаючи це число `3`)

```js run
for (let i = 0; i < 3; i++) { // показується 0, далі 1, потім 2
  alert(i);
}
```

Давайте розглянемо цикл `for` по частинах:

| Назва частини  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| початок | `i = 0`    | Виконується один раз, при вході в цикл.                                      |
| умова | `i < 3`| Перевіряється перед кожною ітерацією циклу. Якщо умова невірна, цикл зупиняєтья.              |
| тіло | `alert(i)`| Виконується знову і знову, поки умова є правдивою (`true`).                         |
| крок| `i++`      | Виконується після тіла на кожній ітерації, але перед перевіркою умови. |

Загальний алгоритм циклу працює так:

```
*Початок* виконання
→ (Якщо *умова* == true → виконати тіло і виконати крок)
→ (Якщо *умова* == true → виконати тіло і виконати крок)
→ (Якщо *умова* == true → виконати тіло і виконати крок)
→ ...
```

Спочатку один раз виконується `початок`, потім при кожній ітерації: перевіряється `умова`, виконується `тіло` циклу та `крок`.

Якщо ви новачок у циклах, вам може допомогти покрокове виконання цього прикладу на аркуші паперу.

Ось що відбувається в нашому випадку:

```js
// for (let i = 0; i < 3; i++) alert(i)

// Початок виконання
let i = 0
// Якщо умова == true → виконати тіло і виконати крок
if (i < 3) { alert(i); i++ }
// Якщо умова == true → виконати тіло і виконати крок
if (i < 3) { alert(i); i++ }
// Якщо умова == true → виконати тіло і виконати крок
if (i < 3) { alert(i); i++ }
// ...кінець, тому що зараз i == 3
```

````smart header="Вбудоване оголошення змінної"
В цьому прикладі всередині циклу оголошена змінна `i`, яка виконує функцію лічильника. Це так зване «вбудоване» оголошення змінної. Такі змінні доступні лише всередині циклу.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // помилка, немає такої змінної
```

Замість оголошення нової змінної, ми можемо використовувати існуючу:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // використовуємо існуючу змінну
  alert(i); // 0, 1, 2
}

alert(i); // 3, змінна доступна, тому що вона оголошена поза циклом
```

````


### Пропуск частин в "for"

Будь-яку частину `for` можна пропустити.

Наприклад, ми можемо опустити `початок`, якщо нам не потрібно нічого робити перед стартом циклу.

Ось так:

```js run
let i = 0; // ми вже маємо оголошену змінну і присвоєне значення

for (; i < 3; i++) { // немає необхідності в "початку"
  alert( i ); // 0, 1, 2
}
```

Ми також можемо видалити частину `крок`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Це робить цикл ідентичним до `while (i < 3)`.

Можна взагалі забрати все, отримавши нескінченний цикл:

```js
for (;;) {
  // буде вічно повторюватися
}
```

Зауважте, що ці двокрапки `;` повинні бути, інакше виникне синтаксична помилка.

## Переривання циклу: "break"

Зазвичай, цикл завершується, коли умова стає `false`.

Але ми можемо в будь-який момент вийти з циклу, використавши спеціальну директиву `break`.

Наприклад, наступний код запитує в користувача число до тих пір, поки користувач їх вводить. Після того, як користувач не ввів число — цикл завершується (директивою "break") і виводить суму чисел:

```js run
let sum = 0;

while (true) {

  let value = +prompt("Введіть число", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Сума: ' + sum );
```

Директива `break` в рядку `(*)` спрацьовує тоді, коли користувач вводить порожній рядок або скасовує введення. Ця директива негайно завершує виконання циклу і передає контроль наступному рядку за циклом, тобто на `alert`.

Комбінація «нескінченний цикл + `break`» — чудова річ для тих ситуацій, коли умова для переривання знаходиться не на початку або кінці циклу, а всередині (або навіть в декількох місцях) тіла циклу.

## Continue to the next iteration [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.

The loop below uses `continue` to output only odd values:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.

For example, if we take this code:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...and rewrite it using a question mark:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

We need a way to stop the process if the user cancels the input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient--labels, come to the rescue!

A *label* is an identifier with a colon before a loop:
```js
labelName: for (...) {
  ...
}
```

The `break <labelName>` statement in the loop below breaks out to the label:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move the label onto a separate line:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.

For example, it is impossible to do this:
```js
break label; // doesn't jumps to the label below

label: for (...)
```

A call to `break/continue` is only possible from inside a loop and the label must be somewhere above the directive.
````

## Summary

We covered 3 types of loops:

- `while` -- The condition is checked before each iteration.
- `do..while` -- The condition is checked after each iteration.
- `for (;;)` -- The condition is checked before each iteration, additional settings available.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
