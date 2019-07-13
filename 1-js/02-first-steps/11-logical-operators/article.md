# Логічні оператори

У JavaScript існує три логічних опратори: `||` (OR), `&&` (AND), `!` (NOT).

Хоча вони називаються "логічними", вони можуть бути застосовані до значень будь-якого типу, те тільки булевих. Їх результати також може бути будь-якого типу.

Подивимось більш детально.

## || (OR)

Оператор "OR" представлений двома символами вертикальної лінії:

```js
result = a || b;
```

У класичному програмуванні логічний OR призначений для маніпулювання лише булевими значеннями. Якщо будь-який з його аргументів `true`, він повертає `true`, інакше повертає `false`.

У JavaScript оператор більш складніший і потужніший. Але спочатку подивимося, що відбувається з булевими значеннями.

Є чотири можливі логічні комбінації:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Як бачимо, результат завжди `true`, за винятком випадку, коли обидва операнда `false`.

Якщо операнд не є булевим, він перетворюється на логічний для обчислення.

Наприклад, число `1` розглядається як `true`, число `0` — як `false`:

```js run
if (1 || 0) { // працює так само, як ( true || false )
  alert( 'правдиво!' );
}
```

У бильшості випадків OR `||` використовується в операторі `if`, щоб перевірити, чи є *будь-яка* з заданих умов `true`.

Наприклад:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'Офіс зачинений.' );
}
```

Ми можемо передавати більше умов:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'Офіс зачинений.' ); // це вихідні
}
```

## OR знаходить перше правдиве значенн

Описана вище логіка дещо класична. Тепер давайте введемо "додаткові" особливості JavaScript.

Розширений алгоритм працює наступним чином.

Дано кілька значень, розділених опертором OR:

```js
result = value1 || value2 || value3;
```

Оператор OR `||` робить наступне:

- Обчислює операнди зліва направо.
- Перетворює значення кожного операнда на булеве. Якщо результат `true`, зупиняється і повертає початкове значення цього операнда.
- Якщо всі операнди були обчисленні (тобто усі були `false`), повертає останній операнд.

Значення повертається у первісному вигляді без конвертації.

Іншими словами, ланцюжок с OR `"||"` повертає перше правдиве значення або останнє, якщо не знайдено правдивого значення.

Наприклад:

```js run
alert( 1 || 0 ); // 1 (1 є правдивим)
alert( true || 'no matter what' ); // (true є правдивим)

alert( null || 1 ); // 1 (1 є першим правдивим значенням)
alert( null || 0 || 1 ); // 1 (перше правдиве значення)
alert( undefined || null || 0 ); // 0 (усі не правдиві, повертає останнє значення)
```

Це призводить до цікавого використання у порівнянни з "чистим, класичним, виключно-булевим OR".

1. **Отримання першого правдивого значення зі списку змінних або виразів.**

    Уявіть, що у нас є список змінних, які можуть містити дані убо бути `null/undefined`. Як знайти першу змінну за даними?

    Ми можемо використати OR `||`:

    ```js run
    let currentUser = null;
    let defaultUser = "Іван";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // обере "Іван" – перше правдиве значення
    ```

    Якщо і `currentUser`, і `defaultUser` були б не правдивими, `"unnamed"` було б результатом.
2. **Обчислення короткого змичання.**

    Операндами можуть бути не тільки значення, але й довільні вирази. OR обчислює Цей процес називається "обчисленням короткого замикання", оскільки він іде якомога коротше зліва направо.

    Це чітко видно, коли вираз, заданий як другий аргумент, має побічний ефект, як присвоєння змінної.

    У наведеному нижче прикладі `x` не присвоюється значення:

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined, оскільки (x = 1) не був обчислений
    ```

    Якщо замість цього перший аргумент є `false`, `||` обчислює другий, таким чином виконуючи присвоєння:

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

    Присвоєння — це простий випадок. Можливі побічні ефекти, які не з'являтимуться, якщо обчислення не досяген їх.

    As we can see, such a use case is a "shorter way of doing `if`". The first operand is converted to boolean. If it's false, the second one is evaluated.

    Most of time, it's better to use a "regular" `if` to keep the code easy to understand, but sometimes this can be handy.

## && (AND)

The AND operator is represented with two ampersands `&&`:

```js
result = a && b;
```

In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

An example with `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Just as with OR, any value is allowed as an operand of AND:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND finds the first falsy value

Given multiple AND'ed values:

```js
result = value1 && value2 && value3;
```

The AND `&&` operator does the following:

- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.

In other words, AND returns the first falsy value or the last value if none were found.

The rules above are similar to OR. The difference is that AND returns the first *falsy* value while OR returns the first *truthy* one.

Examples:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

We can also pass several values in a row. See how the first falsy one is returned:

```js run
alert( 1 && 2 && null && 3 ); // null
```

When all values are truthy, the last value is returned:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

Just like OR, the AND `&&` operator can sometimes replace `if`.

For instance:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.

So we basically have an analogue for:

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

The variant with `&&` appears shorter. But `if` is more obvious and tends to be a little bit more readable.

So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.

## ! (NOT)

The boolean NOT operator is represented with an exclamation sign `!`.

The syntax is pretty simple:

```js
result = !value;
```

The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.

For instance:

```js run
alert( !true ); // false
alert( !0 ); // true
```

A double NOT `!!` is sometimes used for converting a value to boolean type:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

There's a little more verbose way to do the same thing -- a built-in `Boolean` function:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
