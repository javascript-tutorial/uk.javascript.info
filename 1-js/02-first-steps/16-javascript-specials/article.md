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

## Суворий режим (strict mode)

Щоб задіяти усі можливості сучасної мови JavaScript, нам потрібно починати скрипти із конструкції `"use strict"`.

```js
'use strict';

...// ваш код
```

Цю директиву потрібно розміщувати в першому рядку скрипта або на початку тіла функції.

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

## Оператори

JavaScript підтримує такі оператори:

Арифметичні
: Звичайні: `* + - /`, а також оператори `%`, для визначення остачі від ділення та `**` для піднесення до степеня.

    Бінарний плюс `+` об'єднує (конкатинує) рядки. А якщо одним із операндів буде рядок, то інший операнд також буде конвертовано в рядок:

    ```js run
    alert( '1' + 2 ); // '12', рядок
    alert( typeof ( 1 + '2' ) ); // string
    ```

Оператори присвоєння
: Звичайне присвоєння: `a = b` і складені `a *= 2`.

Бітові операції
: Бітові оператори працюють з 32-бітними цілими числами на найнижчому, побітовому, рівні. Детальніше про їхнє використання можна прочитати на ресурсі [MDN](mdn:/JavaScript/Reference/Operators/Bitwise_Operators).

Умовний оператор
: Єдиний оператор з трьома параметрами: `cond ? resultA : resultB`. Якщо `cond` вірно, повертається `resultA`, інакше – `resultB`.

Логічні оператори
: Логічні І `&&` та АБО `||` використовують так звані "ледачі обчислення" і насамкінець повертають `true` або `false`. Логічне НЕ `!` конвертує операнд в логічний тип і повертає інвертоване значення.

Порівнювання
: Перевірка на рівність `==` для значень різних типів, конвертує їх в число (за винятком `null` і `undefined`, які рівні тільки один одному і нічому іншому), тому приклади нижче рівні:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Інші оператори порівнювання також конвертують значення в числовий тип.

    Оператор строгої рівності `===` не виконує конвертацію: різні типи для нього завжди означають різні значення.

    Значення `null` та `undefined` особливі: вони рівні `==` лише самим собі і не рівні нічому іншому.

    Оператори порівнювання більше/менше порівнюють рядки посимвольно, інші типи конвертуються в число.

Інші оператори
: Існують й інші оператори, такі як кома.

Детальніше: <info:operators>, <info:comparison>, <info:logical-operators>.

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

Details: see <info:function-basics>, <info:function-expressions-arrows>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
