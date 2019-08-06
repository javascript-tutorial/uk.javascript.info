# Особливості JavaScript

Давайте коротко повторимо вивчений матеріал і пригадаємо ключові моменти.

## Структура коду

Інструкції розділяються крапкою з комою:

```js run no-beautify
alert('Привіт'); alert('Світ');
```

Зазвичай, перенесення рядка також вважається за розділювач, тому такий варіант теж працюватиме:

```js run no-beautify
alert('Привіт')
alert('Світ')
```

Це називається "автоматичне вставлення крапки з комою". Іноді такий варіант може не спрацювати, наприклад:

```js run
alert("Після цього повідомлення буде помилка")

[1, 2].forEach(alert)
```

Більшість посібників по стилю коду рекомендують ставити крапку з комою після кожної інструкції.

Крапку з комою не потрібно ставити після блоків коду `{...}` та синтаксичних конструкцій з ними, наприклад, після циклів:

```js
function f() {
  // після оголошення функції не обов'язково ставити крапку з комою
}

for(;;) {
  // після циклу також немає потреби ставити крапку з комою
}
```

...Але навіть якщо ми поставимо "зайву" крапку з комою, помилки не буде. Її просто буде проігноровано.

Детальніше: <info:structure>.

## Суворий режим (Strict mode)

Щоб задіяти усі можливості сучасної мови JavaScript, нам потрібно починати скрипти із конструкції `"use strict"`.

```js
'use strict';

...// ваш код
```

Ця директива повинна бути зверху скрипта або на початку функції.

Без `"use strict"`, код все ще буде працювати, однак деякі можливості працюватимуть в старому режимі, так званому "режимі сумісності". Ми рекомендуємо використовувати суворий ("сучасний") режим.

Деякі сучасні функції мови (наприклад, класи, які ми будемо вивчати в майбутньому) неявно вмикають суворий режим.

Детальніше: <info:strict-mode>.

## Змінні

Можна оголошувати наступним чином:

- `let`
- `const` (константа, не можна змінювати)
- `var` (старий спосіб, ми переглянемо його пізніше)

Ім'я змінної може включати:
- Літери і цифри; першим символом має бути лише літера, не цифра.
- Допускаються символи `$` та `_`, в парі з літерами.
- Не латинські символи, як кирилиця та ієрогліфи також допускаються, але вони не мають широкого вжитку.

Змінні динамічно типізовані, тобто вони змінюють свій тип в залежності від присвоєного значення. Можуть зберігати будь-які значення:

```js
let x = 5; // присвоєно тип "число"
x = "Іван"; // тип змінився на "рядок"
```

Існує 7 типів даних:

- число (`number`) для цілих та десяткових чисел,
- рядок (`string`) для тексту/слів,
- булевий тип (`boolean`) для логічних значень: `true/false`,
- `null` -- тип з єдиним значенням `null`, який означає "пусто" або "не існує",
- `undefined` -- тип з єдиним значенням `undefined`, який означає "не присвоєно",
- об'єкт (`object`) та символ (`symbol`) -- для складних структур даних та унікальних ідентифікаторів, ми їх ще не вивчили.

Оператор `typeof` повертає тип змінної, за винятком двох випадків:
```js
typeof null == "object" // помилка в мові
typeof function(){} == "function" // спеціально для функцій
```

Детальніше: <info:variables> та <info:types>.

## Взаємодія

Ми використовуємо браузер у ролі робочого середовища, тому для взаємодії з відвідувачами ми використовуємо функції:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Задає питання (`question`), а потім повертає те, що ввів відвідувач, або `null`, якщо відвідувач натиснув кнопку "Скасувати".

[`confirm(question)`](mdn:api/Window/confirm)
: Задає питання (`question`) і пропонує відвідувачу вибрати "ОК" або "Скасувати". Вибір повертається як `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Виводить повідомлення (`message`).

Всі ці функції показують *модальне вікно*; вони зупиняють виконання скрипта і не дають користувачеві взаємодіяти зі сторінкою доки не буде надана відповідь.

Наприклад:

```js run
let userName = prompt("Ваше ім'я?", "Настя");
let isBunWanted = confirm("Хочете булочку?");

alert( "Відвідувач: " + userName ); // Настя
alert( "Хоче булочку: " + isBunWanted ); // true
```

Детальніше: <info:alert-prompt-confirm>.

## Operators

JavaScript supports the following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped. Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>.

## Loops

- We covered 3 types of loops:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.
- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: <info:while-for>.

Later we'll study more types of loops to deal with objects.

## The "switch" construct

The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: <info:switch>.

## Functions

We covered three ways to create a function in JavaScript:

1. Function Declaration: the function in the main code flow

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Function Expression: the function in the context of an expression

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

    Function expressions can have a name, like `sum = function name(a, b)`, but that `name` is only visible inside that function.

3. Arrow functions:

    ```js
    // expression at the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;
    ```


- Functions may have local variables: those declared inside its body. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.


| Function Declaration | Function Expression |
|----------------------|---------------------|
| visible in the whole code block/script | created when the execution reaches it |
|    | can have a name, visible only inside the function |

More: see <info:function-basics>, <info:function-expressions-arrows>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
