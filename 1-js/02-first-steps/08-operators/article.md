<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
# Оператори
=======
# Basic operators, maths
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

Зі шкільної програми, ми знаємо багато арифметичний операцій, такі як додавання `+`, множення `*`, віднімання `-`, тощо.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
У цьому розділі ми зупинимося на аспектах операторів, які не охоплені шкільною арифметикою.
=======
In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

## Терміни: "унарний", "бінарний", "операнд"

Перш ніж ми почнемо, давайте розберемо певну загальну термінологію.

- *Операнд* -- це те, до чого затосовуються оператори. Наприклад, у множенні `5 * 2` є два операнди: лівий операнд `5` і правий операнд `2`. Іноді люди називають їх "аргументами", а не "операндами".
- Оператор є *унарним*, якщо він має один операнд. Наприклад, унарне заперечення `-` змінює знак числа:

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

    Формально, в прикладі вище, ми маємо два різні оператори, які позначаються однаковим символом: оператор заперечення – унарний оператор, який змінює знак числа, та оператор віднімання – бінарний оператор, який віднімає одне число від іншого.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
## Об'єднання рядків, бінарний +

Тепер розглянемо особливості JavaScript операторів, які виходять за межі шкільної арифметики.
=======
## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, a remainder of 5 divided by 2
alert( 8 % 3 ); // 2, a remainder of 8 divided by 3
```

### Exponentiation **

The exponentiation operator `a ** b` multiplies `a` by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 multiplied by itself 2 times)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 times)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 times)
```

Mathematically, the exponentiation is defined for non-integer numbers as well. For example, a square root is an exponentiation by `1/2`:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet features of JavaScript operators that are beyond school arithmetics.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

Зазвичай оператор плюс `+` підсумовує числа.

Але, якщо бінарний `+` застосовується до рядків, він об'єднує їх:

```js
let s = "мій" + "рядок";
alert(s); // мійрядок
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Зверніть увагу, якщо один з операндів є рядком, то інший також перетворюється на рядок.
=======
Note that if any of the operands is a string, then the other one is converted to a string too.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

Наприклад:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Бачите, не має значення, чи перший операнд є рядком чи другий. Правило просте: якщо будь-який операнд є рядком, інший також перетворюється на рядок.

Однак зверніть увагу, що операції виконуються зліва направо. Якщо є два числа, за якими йде рядок, числа будуть додані перед перетворенням на рядок:
=======
See, it doesn't matter whether the first operand is a string or the second one.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41", а не "221"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Об'єднання рядків і перетворення є особливою ознакою бінарного плюса `+`. Інші арифметичні оператори працюють тільки з числами і завжди перетворюють свої операнди на числа.

Наприклад, віднімання і ділення:
=======
Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = 41`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## Числове перетворення, унарний +

Плюс `+` існує у двох формах: бінарна форма, яку ми використовували вище та унарна форма.

Унарний плюс або, іншими словами, оператор плюс `+`, застосований до єдиного операнда, нічого не зробить, якщо операнд є числом. Але якщо операнд не є числом, унарний плюс перетворить його на число.

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

Необхідність перетворення рядків на числа виникає дуже часто. Наприклад, якщо ми отримуємо значення з полів HTML форми, вони зазвичай є рядками. Що робити, якщо ми хочемо їх підсумувати?

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

З точки зору математики, надмірні плюси можуть здатися дивними. Але з точки зору програміста, немає нічого особливого: спочатку застосовується унарні плюси, вони перетворюють рядки на числа, а потім бінарний плюс підсумовує їх.

Чому унарні плюси застосовуються до значень перед бінарними плюсами? Як ми побачимо далі, це пов'язано з їх *більш високим пріоритетом*.

## Пріоритет оператора

Якщо вираз має більше одного оператора, порядок виконання визначається їх *пріоритетом*, або, іншими словами, типовим порядком пріоритетів операторів.

Зі школи ми всі знаємо, що множення у виразі `1 + 2 * 2` повинно бути обчислене перед додаванням. Саме це і є пріоритетом. Кажуть, що множення має *вищий пріоритет*, ніж додавання.

Дужки перевизначають будь-який пріоритет, тому, якщо ми не задоволені типовим пріоритетом, ми можемо використовувати дужки, щоб змінити його. Наприклад: `(1 + 2) * 2`.

У JavaScript є багато операторів. Кожен оператор має відповідний номер пріоритету. Першим виконується той оператор, який має найбільший номер пріоритету. Якщо пріоритет є однаковим, порядок виконання — зліва направо.

Ось витяг із [таблиці пріоритетів](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (вам не потрібно це запам'ятовувати, але зверніть увагу, що унарні оператори мають вищий пріоритет за відповідні бінарні):

| Пріоритет | Ім'я | Знак |
|------------|------|------|
| ... | ... | ... |
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
| 17 | унарний плюс | `+` |
| 17 | унарне заперечення | `-` |
| 15 | множення | `*` |
| 15 | ділення | `/` |
| 13 | додавання | `+` |
| 13 | віднімання | `-` |
=======
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 16 | exponentiation | `**` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md
| ... | ... | ... |
| 3 | присвоєння | `=` |
| ... | ... | ... |

Як ми бачемо, "унарний плюс" має пріоритет `17`, що вище за `13` — пріоритет "додавання" (бінарний плюс). Саме тому, у виразі `"+apples + +oranges"`, унарні плюси виконуються перед додаванням (бінарним плюсом).

## Присвоєння

Зазначемо, що присвоєння `=` також є оператором. Воно є в таблиці з пріоритетами і має дуже низький пріоритет `3`.

Тому, коли ми присвоюємо значення змінній, наприклад, `x = 2 * 2 + 1`, спочатку виконуються обчислення, а потім виконується присвоєння `=`, зберігаючи результат у `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Можливе ланцюгове присвоєння:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Ланцюгове присвоєння виконується справа наліво. Спочатку обчислюється самий правий вираз `2 + 2`, а потім присвоюється змінним ліворуч: `c`, `b` та `a`. В результаті всі змінні мають спільне значення.

````smart header="Оператор присвоєння `\"=\"` повертає значення"
Оператор завжди повертає значення. Це очевидно для більшості з них, як додавання `+` або множення `*`. Але оператор присвоєння також додтримується цього правила.
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

Most operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

Виклик `x = значення` записує `значення` у `x`, *а потім повертає його*.

Ось демонстрація, яка використовує присвоєння як частину більш складного виразу:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

У наведенному вище прикладі результат виразу `(a = b + 1)` є значенням, яке присвоювалося змінній `a` (тобто `3`). Потім воно використовується для подальших обчислень.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Смішний код, чи не так? Ми повинні зрозуміти, як це працює, бо іноді ми бачимо подібне у JavaScript бібліотеках, але самі не повинні писати нічого подібного. Такі трюки, безумовно, не роблять код більш зрозумілим або читабельним.
````

## Залишок %

Оператор залишку `%`, незважаючи на свій зовнішній вигляд, не пов'язаний з відсотками.

Результатом `a % b` є залишком цілочисельного ділення `a` на `b`.

Наприклад:

```js run
alert( 5 % 2 ); // 1 — залишок від 5 поділеного на 2
alert( 8 % 3 ); // 2 — залишок від 8 поділеного на 3
alert( 6 % 3 ); // 0 — залишок від 6 поділеного на 3
```

## Піднесення до степеня **

Оператор піднесення до степеня `**` був доданий у мову нещодавно.

Для натурального числа `b`, результатом `a ** b` є `a` помножене на себе `b` разів.

Наприклад:
=======
Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:

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

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Оператор працює і для нецілих чисел.

Наприклад:

```js run
alert( 4 ** (1/2) ); // 2 (степінь 1/2 — це теж саме, що і квадратний корінь, це математика)
alert( 8 ** (1/3) ); // 2 (степінь 1/3 — це теж саме, що і кубічний корінь)
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md
```

## Інкремент/декремент

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Збільшення або зменшення числа на одиницю є однією з найпоширеніших операцій.

Тому для цього існують спеціальні оператори:

- **Інкремент** `++` збільшує змінну на 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // працює так само, як counter = counter + 1, але коротше
    alert( counter ); // 3
    ```
- **Декремент** `--` зменшує змінну на 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // працює так само, як counter = counter - 1, але коротше
    alert( counter ); // 1
    ```

```warn
Інкремент/декремент можуть застосовуватись лише до змінних. Спроба використати їх на значенні як `5++` дасть помилку.
```

Оператори `++` та `--` можуть розташовуватись до або після змінної.

- Коли оператор йде за змінною, він знаходиться у "постфіксній формі": `counter++`.
- "Префіксна форма" – це коли оператор йде попереду змінної: `++counter`.

Обидві конструкції роблять те ж саме: збільшують `counter` на `1`.

Чи є різниця? Так, але ми можемо побачити її якщо будемо використовувати повернене значення `++/--`.

Давайте розберемось. Як відомо, усі оператори повертають значення. Інкремент/декремент не є винятком. Префіксна форма повертає нове значення, тоді як постфіксна форма повертає старе значення (до збільшення/зменшення).

Щоб побачити різницю, наведемо приклад:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

У рядку `(*)`, *префіксна* форма `++counter` збільшує `counter` та повертає нове значення, `2`. Отже, `alert` показує `2`.

Тепер скористаємося постфіксною формою:

```js run
let counter = 1;
let a = counter++; // (*) змінили ++counter на counter++

alert(a); // *!*1*/!*
```

У рядку `(*)`, *постфіксна* форма `counter++` також збільшує `counter`, але повертає *старе* значення (до інкременту). Отже, `alert` показує `1`.

Підсумки:

- Якщо результат збільшення/зменшення не використовується, немає ніякої різниці яку форму використовувати:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, у рядках вище робиться одне і те ж саме
    ```
- Якщо ми хочемо збільшити значення *та* негайно використати результат оператора, нам потрібна префіксна форма:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Якщо ми хочемо збільшити значення, але використати його попереднє значення, нам потрібна постфіксна форма:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Інкремент/декремент серед інших операторів"
Оператори `++/--` також можуть використовуватись всередені виразів. Їх пріоритет вищий за більшість інщих арифметичних операцій.

Наприклад:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Порівняйте із:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, тому що counter++ повертає "старе" значення
```

Не дивлячись на те, що з технічної точки зору це допустимо, таке використання робить код менш читабельним. Коли один рядок робить кілька речей -- це не добре.

При читанні коду швидке "вертикальне" сканування оком може легко пропустити щось подібне до `counter++` і не буде очевидним, що змінна була збільшена.

Ми рекомендуємо стиль "одна лінія -- одна дія":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Побітові оператори

Побітові оператори розглядають аргументи як 32-бітні цілі числа та працюють на рівні їх двійкового представлення.

Ці оператори не є специфічними для JavaScript. Вони підтримуються у більшості мов програмування.

Список операторів:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Ці оператори використовуються дуже рідко. Щоб їх зрозуміти, нам потрібно заглибитись у представлення числа на низькому рівні і зараз не самий оптимальний час для цього, тим більше, що нам вони не будуть потрібні найближчим часом. Якщо вам цікаво, ви можете прочитати статтю [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) на MDN. Це було би більш практично зробити, коли виникне реальна потреба.

## Оператор "модифікувати та присвоїти"

Часто нам потрібно застосувати оператор до змінної і зберегти новий результат у ту ж саму змінну.

Наприклад:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Цей запис може бути скорочений за допомогою операторів `+=` та `*=`:

```js run
let n = 2;
n += 5; // тепер n = 7 (теж саме, що і n = n + 5)
n *= 2; // тепер n = 14 (теж саме, що і n = n * 2)

alert( n ); // 14
```

Короткий оператор "модифікувати та присвоїти" існує для всіх арифметичних та побітових операторів: `/=`, `-=`, тощо.

Такі оператори мають таку ж перевагу, як і звичайне присвоєння, тому вони виконуються після більшості інших обчисленнь:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (права частина обчислюється першою, так само, як і n *= 8)
```
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN when a need arises.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

## Кома

Оператор кома `,` є одним з найрідкіших та незвичайних операторів. Іноді використовується для написання більш короткого коду, тому нам потрібно знати його, щоб зрозуміти, що відбувається.

Оператор кома дозволяє обчислити кілька виразів, розділивши їх комою `,`. Кожен з них обчислюється, але повертається тільки результат останнього.

Наприклад:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (результат обчислення 3 + 4)
```

Тут обчислюється перший вираз `1 + 2` і його результат викидається. Потім обчислюється `3 + 4` і повертається як результат.

```smart header="Кома має дуже низький пріоритет"
Зверніть увагу, що оператор кома має дуже низький пріоритет, нижчий за `=`, тому дужки є важливими в наведеному вище прикладі.

Без дужок, в виразі `a = 1 + 2, 3 + 4` спочатку облислюються оператори `+`, підсумовуючи числа: у `a = 3, 7`; потім оператор присвоєння `=` присвоює `a = 3`, а решту (число `7` після коми) ігнорує. Це як записати вираз `(a = 1 + 2), 3 + 4`.
```

Чому нам потрібен оператор, що викидає все, окрім останнього виразу?

Іноді люди використовують його в більш складних конструкціях, щоб помістити кілька дій в один рядок.

Наприклад:

```js
// три операції в одному рядку
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Такі трюки використовуються в багатьох фреймворках JavaScript. Саме тому ми їх згадуємо. Але зазвичай вони не покращують читабельність коду, тому ми повинні добре подумати перед їх використанням.
