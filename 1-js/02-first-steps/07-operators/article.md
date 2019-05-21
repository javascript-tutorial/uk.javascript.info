# Оператори

Ми знаємо багато операторів зі школи. Це такі речі, як додавання `+`, множення `*`, віднімання `-`, тощо.

У цьому розділі ми зупинимося на аспектах операторів, які не охоплені шкільною арифметикою.

## Тарміни: "унарний", "бінарний", "операнд"

Перш ніж ми почнемо, давайте розберемо певну загальну термінологію.

- *Операнд* -- це те, до чого затосовуються оператори. Наприклад, у множенні `5 * 2` є два операнди: лівий операнд `5` і правий операнд `2`. Іноді, люди називають їх "аргументами", а не "операндами".
- Опреатор є *унарним*, якщо він має один операнд. Наприклад, унарне заперечення `-` змінює знак числа:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, було застосоване унарне заперечення
    ```
- Оператор є *бінарним*, якщо він має два операнди. Цей мінус існує також в бінарній формі:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, бінарний мінус віднімає значення
    ```

    Формально, ми говоримо про двох різних операторів: унарне заперечення (єдиний операнд: змінює знак) та бінарне віднімання (два опернди: віднімає).

## Об'єднаяння рядків, бінарний +

Тепер розглянемо особливості JavaScript операторів, які виходять за межі шкільної арифметики.

Зазвичай оператор плюс `+` підсумовує числа.

Але, якщо бінарний `+` застосовується до рядків, він об'єднує їх:

```js
let s = "мій" + "рядок";
alert(s); // мійрядок
```

Зверніть увагу, якщо один з операндів є рядком, то інший також перетворюється на рядок.

Наприклад:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Бачите, на має значення, чи перший операнд є рядком або другий. Правило просте: якщо будь-який операнд є радком, інший також перетворюється на рядок.

Однак зверніть увагу, що операції виконуються зліва направо. Якщо є два числа, за якими йде рядок, числа будуть додані перед перетворенням на рядок:


```js run
alert(2 + 2 + '1' ); // "41" а не "221"
```

Об'єднання рядків і перетворення є особливою ознакою бінарного плюса `+`. Інші арифметичні оператори працюють тільки з числами і завжди перетворюють свої операнди в числа.

Наприклад, віднімання і ділення:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Числове перетворення, унарний +

Плюс `+` існує у двох формах: бінарна форма, яку ми використовували вище та унарна форма.

Унарний плюс або, іншими словами, оператор плюс `+`, застосований до єдиного операнда, нічого не зробить, якщо операнд є числом. Але якщо операнд не є числом, унарний плюс перетворить його в число.

Наприклад:

```js run
// Нема ніякого впилу на числа
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Перетворює не числові значення
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Він насправді працює як і `Number(...)`, але виглядає коротше.

Необхідність перетворення рядків на числа виникає дуже часто. Наприклад, якщо ми отримуємо значення з полів HTML форми, вони зазвичай є рядками.

Що робити, якщо ми хочемо їх підсумувати?

Бінарний плюс додав би їх як рядки:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", бінарний плюс об'єднує рядки
```

Якщо ми хочемо розглядати їх як числа, нам потрібно конвертувати, а потім підсумувати їх:

```js run
let apples = "2";
let oranges = "3";

*!*
// обидва значення перетворюються на числа перед застосування бінарного плюса
alert( +apples + +oranges ); // 5
*/!*

// довший варіант
// alert( Number(apples) + Number(oranges) ); // 5
```

З точки зору математика, надмір плюсів може здатися дивним. Але з точки зору програміста, немає нічого особливого: спочатку застосовується унарні плюси, вони перетворюють рядки на числа, а потім бінарний плюс підсумовує їх.

Чому унарні плюси застосовуються до значень перед бінарними плюсами? Як ми побичмо далі, це пов'язано з їх *більш високим пріоритетом*.

## Пріоритет оператора

Ящо вираз має більше одного оператора, порядок виконання визначається їх *пріоритетом*, або, іншими словами, неявним порядком пріоритетів операторів.

Зі школи ми всі знаємо, що множення у виразі `1 + 2 * 2` повинно бути вираховано перед додаванням. Саме це і є пріоритетом. Кажуть, що множення має *більш високий пріоритет*, ніж додавання.

Дужки перевизначають будь-який пріоритет, тому, якщо ми не задоволенні неявним приорітетом, ми можемо використовувати дужки, щоб змінити його. Наприклад: `(1 + 2) * 2`.

У JavaScript є багато операторів. Кожен оператор має відповідний номер пріоритету. Першим виконується той оператор, який має найбільший номер. Якщо пріоритет є одниковим, порядок виконання — зліва направо.

Ось витяг із [таблиці пріоритетів](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (вам не потрібно запам'ятовувати це, але зверніть увагу, що унарні оператори вище за відповідні бінарні):

| Приорітет | Ім'я | Знак |
|------------|------|------|
| ... | ... | ... |
| 16 | унарний плюс | `+` |
| 16 | унарне заперечення | `-` |
| 14 | множення | `*` |
| 14 | ділення | `/` |
| 13 | додавання | `+` |
| 13 | віднімання | `-` |
| ... | ... | ... |
| 3 | призначення | `=` |
| ... | ... | ... |

Як ми бачемо, "унарний плюс" має пріоритет `16`, який вище за `13` — пріоритет "додавання" (бінарний плюс). Саме тому, у виразі `"+apples + +oranges"`, унарні плюси виконуються до додавання (бінарного плюса).

## Призначення

Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `3`.

That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

It is possible to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

````smart header="The assignment operator `\"=\"` returns a value"
An operator always returns a value. That's obvious for most of them like addition `+` or multiplication `*`. But the assignment operator follows this rule too.

The call `x = value` writes the `value` into `x` *and then returns it*.

Here's a demo that uses an assignment as part of a more complex expression:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

In the example above, the result of `(a = b + 1)` is the value which is assigned to `a` (that is `3`). It is then used to subtract from `3`.

Funny code, isn't it? We should understand how it works, because sometimes we see it in 3rd-party libraries, but shouldn't write anything like that ourselves. Such tricks definitely don't make code clearer or readable.
````

## Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the remainder of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1 is a remainder of 5 divided by 2
alert( 8 % 3 ); // 2 is a remainder of 8 divided by 3
alert( 6 % 3 ); // 0 is a remainder of 6 divided by 3
```

## Exponentiation **

The exponentiation operator `**` is a recent addition to the language.

For a natural number `b`, the result of `a ** b` is `a` multiplied by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

The operator works for non-integer numbers as well.

For instance:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root, that's maths)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```

## Increment/decrement

<!-- Can't use -- in title, because built-in parse turns it into – -->

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for it:

- **Increment** `++` increases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter++;      // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Decrement** `--` decreases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter--;      // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
    ```

```warn
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment a value but use its previous value, we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns    `a = 3`, and finally the number after the comma, `7`, is not processed so it's ignored.
```

Why do we need an operator that throws away everything except the last part?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But, usually, they don't improve code readability so we should think well before using them.
