# Методи масивів

<<<<<<< HEAD
Масиви пропонують безліч методів. Щоб було простіше, в цьому розділі вони розбиті на групи.
=======
Arrays provide a lot of methods. To make things easier, in this chapter, they are split into groups.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

## Додавання/видалення елементів

Ми вже знаємо методи, які додають чи видаляють елементи з початку чи з кінця:

- `arr.push(...items)` -- додає елементи до кінця,
- `arr.pop()` -- дістає елемент з кінця,
- `arr.shift()` -- дістає елемент з початку,
- `arr.unshift(...items)` -- додає елементи в початок.

Розглянемо й інші.

### splice

Як видалити елемент з масиву?

Масиви є об’єктами, тому ми можемо спробувати використати `delete`:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // видалимо "go"

alert( arr[1] ); // undefined

// тепер arr = ["I",  , "home"];
alert( arr.length ); // 3
```

Начебто, елемент був видалений, але при перевірці виявляється, що масив все ще має 3 елементи  `arr.length == 3`.

<<<<<<< HEAD
Це нормально, тому що все, що робить `delete obj.key` -- це видаляє значення за ключем `key`. Це нормально для обʼєктів, але для масивів ми звичайно хочемо, щоб інші елементи змістились і зайняли місце, що звільнилося. Ми чекаємо, що масив стане коротшим.
=======
That's natural, because `delete obj.key` removes a value by the `key`. It's all it does. Fine for objects. But for arrays we usually want the rest of the elements to shift and occupy the freed place. We expect to have a shorter array now.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Тому слід застосовувати спеціальні методи.

<<<<<<< HEAD
Метод [arr.splice](mdn:js/Array/splice) -- це універсальний «швейцарський ніж» для роботи з масивами. Вміє все: додавати, видаляти і замінювати елементи.
=======
The [arr.splice](mdn:js/Array/splice) method is a Swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Його синтаксис:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

Він змінює `arr` починаючи з позиції `start`: видаляє `deleteCount` елементів і вставляє `elem1, ..., elemN` на їх місце. Повертається масив з видалених елементів.

Цей метод легко зрозуміти на прикладах.

Почнемо з видалення:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // з індексу 1 видалимо 1 елемент
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Легко, правда? Починаючи з індексу `1`, він видалив `1`  елемент.

<<<<<<< HEAD
У наступному прикладі ми видаляємо 3 елементи та замінюємо їх двома іншими:
=======
In the next example, we remove 3 elements and replace them with the other two:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// видалимо 3 перших елементи і замінимо їх іншими
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // отримаєм [*!*"Let's", "dance"*/!*, "right", "now"]
```

Тут ми бачимо, що `splice` повертає масив видалених елементів:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// видалимо 2 перших елементи
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- масив видалених елементів
```

<<<<<<< HEAD
Метод `splice` також може вставляти елементи без будь-яких видалень. Для цього нам потрібно встановити значення `0` для `deleteCount`:
=======
The `splice` method is also able to insert the elements without any removals. For that, we need to set `deleteCount` to `0`:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
let arr = ["I", "study", "JavaScript"];

// починаючт з індекса 2
// видалимо 0 елементів
// ваставити "complex" та "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Дозволяються відʼємні індекси"
Тут і в інших методах масиву допускаються відʼємні індекси. Вони дозволяють почати відлік елементів з кінця, як тут:

```js run
let arr = [1, 2, 5];

// починаючи з індексу -1 (перед останнім елементом)
// видалимо 0 елементів,
// вставимо значення 3 та 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

<<<<<<< HEAD
Метод [arr.slice](mdn:js/Array/slice) набагато простіший, ніж схожий на нього `arr.splice`.
=======
The method [arr.slice](mdn:js/Array/slice) is much simpler than the similar-looking `arr.splice`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Його синтаксис:

```js
arr.slice([start], [end])
```

Він повертає новий масив, копіюючи до нього всі елементи від індексу `start` до `end` (не включаючи `end`). І `start`, і `end` можуть бути відʼємними. В такому випадку відлік буде здійснюватися з кінця масиву.

<<<<<<< HEAD
Він подібний до рядкового методу `str.slice`, але замість підрядків створює підмасиви.
=======
It's similar to a string method `str.slice`, but instead of substrings, it makes subarrays.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Наприклад:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (копіює з 1 до 3)

alert( arr.slice(-2) ); // s,t (копіює з -2 до кінця)
```

Можна викликати `slice` і взагалі без аргументів. `arr.slice()` створить копію масиву `arr`. Це часто використовують, щоб створити копію масиву для подальших перетворень, які не повинні змінювати вихідний масив.

### concat

Метод [arr.concat](mdn:js/Array/concat) створює новий масив, в який копіює дані з інших масивів та додаткові значення.

Його синтаксис:

```js
arr.concat(arg1, arg2...)
```

Він приймає будь-яку кількість аргументів -- масивів або значень.

Результатом є новий масив, що містить елементи з `arr`, потім` arg1`, `arg2` тощо.

Якщо аргумент `argN` є масивом, то всі його елементи копіюються. В іншому випадку буде скопійовано сам аргумент.

Наприклад:

```js run
let arr = [1, 2];

// створимо масив з: arr і [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// створимо масив з: arr, [3,4] і [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// створимо масив з: arr і [3,4], також добавимо значення 5 і 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Зазвичай він просто копіює елементи з масивів. Інші обʼєкти, навіть якщо вони виглядають як масиви, додаються як є:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

... Але якщо обʼєкт має спеціальну властивість `Symbol.isConcatSpreadable`, то він обробляється `concat` як масив: замість нього додаються його числові властивості. Для коректної обробки в обʼєкті повинні бути числові властивості та length:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Перебір: forEach

Метод [arr.forEach](mdn:js/Array/forEach) дозволяє запускати функцію для кожного елемента масиву..

Його синтаксис:
```js
arr.forEach(function(item, index, array) {
<<<<<<< HEAD
  // ... робимо щось з item
=======
  // ... do something with an item
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
});
```

Наприклад, цей код виведе на екран кожен елемент масиву:

```js run
// для кожного елементу викликається alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

А цей до того ж розповість і про свою позицію в масиві:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} має позицію ${index} в масиві ${array}`);
});
```

Результат функції (якщо вона взагалі щось повертає) відкидається і ігнорується.


## Пошук в масиві

Далі розглянемо методи, які допоможуть знайти що-небудь в масиві.

### indexOf/lastIndexOf та includes

Методи [arr.indexOf](mdn:js/Array/indexOf) та [arr.includes](mdn:js/Array/includes) мають однаковий синтаксис і роблять по суті те ж саме, що і їх рядкові аналоги, але працюють з елементами замість символів:

- `arr.indexOf(item, from)` -- шукає `item`, починаючи з індексу `from`, і повертає індекс, на якому був знайдений шуканий елемент, в іншому випадку `-1`.
- `arr.includes(item, from)` -- шукає `item`, починаючи з індексу `from`, і повертає `true`, якщо пошук успішний.

<<<<<<< HEAD
Зазвичай ці методи використовуються лише з одним аргументом: `item` для пошуку. Типово пошук відбувається з самого початку.
=======
Usually, these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Наприклад:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Зверніть увагу, що метод `indexOf` використовує суворе порівняння `===`. Таким чином, якщо ми шукаємо `false`, він знаходить саме `false`, але не нуль.

<<<<<<< HEAD
Якщо ми хочемо перевірити наявність `item` в массиві, і нема потреби знати його точний індекс, тоді краще використати `arr.includes`.
=======
If we want to check if `item` exists in the array and don't need the index, then `arr.includes` is preferred.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Метод [arr.lastIndexOf](mdn:js/Array/lastIndexOf) такий самий, як `indexOf`, але шукає справа наліво.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (перший Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (останній Apple)
```

````smart header="Метод `includes` правильно обробляє `NaN`"
Незначною, але вартою уваги властивістю `includes` є те, що він правильно обробляє `NaN`, на відміну від `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (повинен бути 0, але === перевірка на рівність не працює з NaN)
alert( arr.includes(NaN) );// true (вірно)
```
That's because `includes` was added to JavaScript much later and uses the more up-to-date comparison algorithm internally.
````

### find і findIndex/findLastIndex

<<<<<<< HEAD
Уявіть, що у нас є масив обʼєктів. Як нам знайти обʼєкт за певною умовою? 
=======
Imagine we have an array of objects. How do we find an object with a specific condition?
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Тут стане в нагоді метод [arr.find(fn)](mdn:js/Array/find). 

Його синтаксис такий:
```js
let result = arr.find(function(item, index, array) {
  // якщо true - повертається поточний елемент і перебір закінчується 
  // якщо всі ітерації виявилися помилковими, повертається undefined
});
```

Функція викликається по черзі для кожного елемента масиву:

- `item` -- черговий елемент масиву.
- `index` -- його індекс.
- `array` -- сам масив.

<<<<<<< HEAD
Якщо функція повертає `true`, пошук припиняється, повертається `item`. Якщо нічого не знайдено, повертається `undefined`.
=======
If it returns `true`, the search is stopped, the `item` is returned. If nothing is found, `undefined` is returned.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Наприклад, у нас є масив користувачів, кожен з яких має поля `id` та `name`. Давайте знайдемо той де `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

<<<<<<< HEAD
У реальному житті масиви обʼєктів -- звичайна справа, тому метод `find` вкрай корисний.
=======
In real life, arrays of objects are a common thing, so the `find` method is very useful.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Зверніть увагу, що в даному прикладі ми передаємо `find` функцію `item => item.id == 1`, з одним аргументом. Це типово, інші аргументи цієї функції використовуються рідко.

<<<<<<< HEAD
Метод [arr.findIndex](mdn:js/Array/findIndex) -- по суті, те ж саме, але повертає індекс, на якому був знайдений елемент, а не сам елемент, і `-1`, якщо нічого не знайдено.
=======
The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Метод [arr.findLastIndex](mdn:js/Array/findLastIndex) схожий на `findIndex`, але шукає справа наліво, подібно до `lastIndexOf`.

Ось приклад:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Знайдемо індекс першого John
alert(users.findIndex(user => user.name == 'John')); // 0

// Знайдемо індекс останнього John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```

### filter

Метод `find` шукає один (перший) елемент, на якому функція-колбек поверне `true`. 

На той випадок, якщо знайдених елементів може бути багато, передбачений метод [arr.filter(fn)](mdn:js/Array/filter).

Синтаксис цього методу схожий з `find`, але `filter` повертає масив з усіх відфільтрованих елементів:

```js
let results = arr.filter(function(item, index, array) {
  // якщо true - елемент додається до результату, і перебір триває
  // повертається порожній масив в разі, якщо нічого не знайдено
});
```

Наприклад:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// повертає масив перших двох користувачів
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Перетворення масиву

Перейдемо до методів перетворення і впорядкування масиву.

### map

Метод [arr.map](mdn:js/Array/map) є одним з найбільш корисних і часто використовуваних.

Він викликає функцію для кожного елемента масиву і повертає масив результатів виконання цієї функції. 

Синтаксис:

```js
let result = arr.map(function(item, index, array) {
  // повертається нове значення замість елемента
});
```

Наприклад, тут ми перетворюємо кожен елемент на його довжину:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

Виклик [arr.sort()](mdn:js/Array/sort) сортує масив "на місці", змінюючи в ньому порядок елементів. 

Він повертає відсортований масив, але зазвичай повернене значення ігнорується, оскільки змінюється сам `arr`.

Наприклад:

```js run
let arr = [ 1, 2, 15 ];

// метод сортує вміст arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Чи не помітили нічого дивного в цьому прикладі?

Порядок став 1, 15, 2. Це неправильно! Але чому?

**За замовчуванням елементи сортуються як рядки.**

Буквально, елементи перетворюються в рядки при порівнянні. Для рядків застосовується лексикографічний порядок, і дійсно виходить, що `"2"> "15"`.

Щоб використовувати наш власний порядок сортування, нам потрібно надати функцію як аргумент `arr.sort()`. 

Функція має порівняти два довільних значення та повернути:

```js
function compare(a, b) {
  if (a > b) return 1; // якщо перше значення більше за друге
  if (a == b) return 0; // якщо значення рівні
  if (a < b) return -1; // якщо перше значення меньше за друге
}
```

Наприклад, для сортування чисел:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Тепер все працює як треба.  

<<<<<<< HEAD
Візьмімо паузу і подумаємо, що ж відбувається. Згаданий раніше масив `arr` може бути масивом чого завгодно, вірно? Він може містити числа, рядки, обʼєкти або щось ще. У нас є набір якихось елементів. Щоб впорядкувати його, нам потрібна функція, яка визначає порядок, яка знає, як порівнювати його елементи. За замовчуванням елементи сортуються як рядки.
=======
Let's step aside and think about what's happening. The `arr` can be an array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Метод `arr.sort(fn)` реалізує загальний алгоритм сортування. Нам не потрібно піклуватися про те, як він працює всередині (в більшості випадків це оптимізоване [швидке сортування](https://en.wikipedia.org/wiki/Quicksort) чи [Timsort](https://en.wikipedia.org/wiki/Timsort)). Реалізується прохід по масиву, порівнюються його елементи за допомогою наданої функції і змінюється їх порядок. Все, що залишається нам, це надати `fn`, яка робить це порівняння.

<<<<<<< HEAD
До речі, якщо ми коли-небудь захочемо дізнатися, які елементи порівнюються -- ніщо не заважає нам вивести їх на екран:
=======
By the way, if we ever want to know which elements are compared -- nothing prevents us from alerting them:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

В процесі роботи алгоритм може порівнювати елемент з іншими по кілька разів, але він намагається зробити якомога менше порівнянь.

````smart header="Функція порівняння може повернути будь-яке число"
Насправді від функції порівняння потрібно будь-яке позитивне число, щоб сказати «більше», і негативне число, щоб сказати «менше». 

Це дозволяє писати коротші функції:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Краще використовувати стрілочні функції"
Памʼятаєте [стрілкові функції](info:arrow-functions-basics)? Можна використовувати їх тут для того, щоб сортування виглядало більш акуратним:

```js
arr.sort( (a, b) => a - b );
```

Працюватиме точно так, як і довша версія вище.
````

````smart header="Використовуйте `localeCompare` для рядків"
Памʼятаєте алгоритм порівняння [рядків](info:string#correct-comparisons)? Він порівнює літери за їх кодами за замовчуванням.

Для багатьох алфавітів краще використовувати метод `str.localeCompare` для правильного сортування літер, як наприклад `Ö`.

Наприклад, давайте відсортуємо кілька країн німецькою мовою:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (не правильно)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (правильно!)
```
````

### reverse

Метод [arr.reverse](mdn:js/Array/reverse) змінює порядок елементів в `arr` на зворотний.

Наприклад:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Він також повертає масив `arr` зі зміненим порядком елементів.

### split та join

Ситуація з реального життя. Ми пишемо додаток для обміну повідомленнями, і відвідувач вводить імена тих, кому його відправити, через кому: Вася, Петя, Маша. Але нам-то набагато зручніше працювати з масивом імен, ніж з одним рядком. Як його отримати?

Метод [str.split(delim)](mdn:js/String/split) саме це і робить. Він розбиває рядок на масив по заданому роздільнику `delim`.

<<<<<<< HEAD
У прикладі нижче таким роздільником є ​​рядок з коми та пропуску.
=======
In the example below, we split by a comma followed by a space:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
let names = 'Вася, Петя, Маша';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // Повідомлення отримають: Вася (і інші імена)
}
```

У методу split є необовʼязковий другий числовий аргумент -- обмеження на кількість елементів в масиві. Якщо їх більше, ніж вказано, то залишок масиву буде відкинутий. На практиці це рідко використовується:

```js run
let arr = 'Вася, Петя, Маша, Іван'.split(', ', 2);

alert(arr); // Вася, Петя
```

````smart header="Розбивка на букви"
Виклик `split(s)` з порожнім аргументом `s` розбиває рядок на масив букв:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

Виклик [arr.join(glue)](mdn:js/Array/join) робить в точності протилежне split. Він створює рядок з елементів `arr`, вставляючи `glue` між ними.

Наприклад:

```js run
let arr = ["Вася", "Петя", "Маша"];

let str = arr.join(';'); // обʼєднуємо масив в рядок за допомогою ";"

alert( str ); // Вася;Петя;Маша
```

### reduce/reduceRight

Якщо нам потрібно перебрати масив -- ми можемо використовувати `forEach`, `for` або `for..of`.

Якщо нам потрібно перебрати масив і повернути дані для кожного елемента -- ми використовуємо `map`.

Методи [arr.reduce](mdn:js/Array/reduce) та [arr.reduceRight](mdn:js/Array/reduceRight) схожі на методи вище, але вони трохи складніші. Вони використовуються для обчислення якогось одного значення на основі всього масиву.

Синтаксис:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

Функція застосовується по черзі до всіх елементів масиву і «переносить» свій результат на наступний виклик.

Аргументи:

- `accumulator` -- результат попереднього виклику цієї функції, дорівнює `initial` при першому виклику (якщо переданий `initial`),
- `item` -- черговий елемент масиву,
- `index` -- його індекс,
- `array` -- сам масив.

<<<<<<< HEAD
При виконанні функції результат її виклику на попередньому елементі масиву передається як перший аргумент.

Зрозуміти простіше, якщо думати про перший аргумент як «збирач» результатів попередніх викликів функції. Після закінчення він стає результатом `reduce`.
=======
As the function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end, it becomes the result of `reduce`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Звучить складно?

Цей метод найпростіше зрозуміти на прикладі.

Тут ми отримаємо суму всіх елементів масиву лише одним рядком:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Тут ми використовували найбільш поширений варіант `reduce`, який використовує тільки 2 аргументи.

Давайте детальніше розберемо, як він працює. 

1. При першому запуску `sum` дорівнює `initial` (останній аргумент `reduce`), тобто `0`, а `current` -- перший елемент масиву, рівний `1`. Таким чином, результат функції дорівнює `1`.
2. При другому запуску `sum = 1`, і до нього ми додаємо другий елемент масиву (`2`). 
3. При третьому запуску `sum = 3`, до якого ми додаємо наступний елемент, і так далі...

Потік обчислень виходить такий:

![](reduce.svg)

У вигляді таблиці, де кожен рядок -- виклик функції на черговому елементі масиву:

|   |`sum`|`current`|результат|
|---|-----|---------|---------|
|перший виклик|`0`|`1`|`1`|
|другий виклик|`1`|`2`|`3`|
|третій виклик|`3`|`3`|`6`|
|четвертий виклик|`6`|`4`|`10`|
|пʼятий виклик|`10`|`5`|`15`|

Тут чітко видно, як результат попереднього виклику передається в перший аргумент наступного.

Ми також можемо опустити початкове значення:

```js run
let arr = [1, 2, 3, 4, 5];

// прибрано початкове значення (немає 0 в кінці)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Результат той самий. Це тому, що при відсутності `initial` в якості першого значення береться перший елемент масиву, а перебір стартує з другого. 

Таблиця розрахунків така ж, як і вище, без першого рядка.

Але таке використання вимагає крайньої обережності. Якщо масив порожній, то виклик `reduce` без початкового значення видасть помилку.

Ось приклад:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value 
// якби існувало початкове значення, reduce повернув би його для порожнього масиву.
arr.reduce((sum, current) => sum + current);
```

Тому рекомендується завжди вказувати початкове значення. 

<<<<<<< HEAD
Метод [arr.reduceRight](mdn:js/Array/reduceRight) працює аналогічно, але проходить по масиву справа наліво.
=======
The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same but goes from right to left.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

## Array.isArray

Масиви не мають окремого типу в Javascript. Вони засновані на обʼєктах. 

Тому `typeof` не може відрізнити простий обʼєкт від масиву:

```js run
alert(typeof {}); // обʼєкт
alert(typeof []); // також обʼєкт
```

...Але масиви використовуються настільки часто, що для цього придумали спеціальний метод: [Array.isArray(value)](mdn:js/Array/isArray). Він повертає `true`, якщо `value` -- це масив, інакше `false`.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Більшість методів підтримують "thisArg"

Майже всі методи масиву, які викликають функції -- такі як `find`, `filter`, `map`, за винятком методу `sort`, приймають необовʼязковий параметр `thisArg`.

<<<<<<< HEAD
Цей параметр не пояснювався вище, оскільки дуже рідко використовується, але для кращого розуміння теми ми зобовʼязані його розглянути.
=======
That parameter is not explained in the sections above, because it's rarely used. But for completeness, we have to cover it.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Ось повний синтаксис цих методів:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg - це необовʼязковий останній аргумент
```

Значення параметра `thisArg` стає `this` для `func`.

Наприклад, ось тут ми використовуємо метод обʼєкта `army` як фільтр, і `thisArg` передає йому контекст:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// знайти користувачів, для яких army.canJoin повертає true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

Якби ми в прикладі вище використовували просто `users.filter(army.canJoin)`, то виклик `army.canJoin` був би в режимі окремої функції, з `this=undefined`. Це призвело б до помилки.

Виклик `users.filter(army.canJoin, army)` можна замінити на `users.filter(user => army.canJoin(user))`, який робить те ж саме. Останній запис використовується навіть частіше, оскільки стрілочна функція більш наочна.

## Підсумки

Шпаргалка по методам масиву:

- Для додавання/видалення елементів:
  - `push(... items)` -- додає елементи до кінця,
  - `arr.pop()` -- дістає елемент з кінця,
  - `arr.shift()` -- дістає елемент з початку,
  - `arr.unshift(...items)` -- додає елементи в початок.
  - `splice(pos, deleteCount, ...items)` -- починаючи з індексу `pos`, видаляє `deleteCount` елементів та вставляє `items`.
  - `slice(start, end)` -- створює новий масив, копіюючи в нього елементи з позиції `start` до `end` (не включаючи `end`).
  - `concat(...items)` -- повертає новий масив: копіює всі члени поточного масиву і додає до нього `items`. Якщо якийсь із `items` є масивом, тоді беруться його елементи.

<<<<<<< HEAD
- Для пошуку серед елементів:
  - `indexOf/lastIndexOf(item, pos)` -- шукає `item`, починаючи з позиції `pos`, і повертає його індекс або `-1`, якщо нічого не знайдено.
  - `includes(value)` -- повертає `true`, якщо в масиві є елемент `value`, в іншому випадку `false`.
  - `find/filter(func)` -- фільтрує елементи через функцію і віддається перше/всі значення, при проходженні яких функція повертає `true`.
  - `findIndex` схожий на `find`, але повертає індекс замість значення.
=======
- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, and return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

- Для перебору елементів:
  - `forEach(func)` -- викликає `func` для кожного елемента. Нічого не повертає.

- Для перетворення масиву:
  - `map(func)` -- створює новий масив з результатів виклику `func` для кожного елемента.
  - `sort(func)` -- сортує масив «на місці», а потім повертає його.
  - `reverse()` -- «на місці» змінює порядок елементів на протилежний і повертає змінений масив.
  - `split/join` -- перетворює рядок в масив і назад.
  - `reduce(func, initial)` -- обчислює одне значення на основі всього масиву, викликаючи `func` для кожного елемента і передаючи проміжний результат між викликами.

- Додатково:
  - `Array.isArray(value)` перевіряє, чи є `value` масивом, якщо так, повертає `true`, інакше `false`.

Зверніть увагу, що методи `sort`, `reverse` та `splice` змінюють поточний масив. 

Вивчених нами методів досить в 99% випадків, але існують і інші.

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) перевіряють масив.

Функція `fn` викликається для кожного елемента масиву, подібного до `map`. Якщо будь-які/усі результати є `true`, повертає `true`, інакше `false`.

Ці методи поводяться приблизно як оператори `||` та `&&`. Якщо `fn` повертає істинне значення, `arr.some()` негайно повертає `true` і припиняє ітерацію по решті елементів. Якщо `fn` повертає хибне значення, `arr.every()` негайно повертає `false` і припиняє ітерацію по решті елементів.

  Ми можемо використовувати `every` для порівняння масивів:
  
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- заповнює масив повторюваними `value`, починаючи з індексу `start` до `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- копіює свої елементи, починаючи з `start` і закінчуючи `end`, в власну позицію `target` (перезаписує існуючі).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) -- створює новий, плоский масив з багатовимірного масиву.

Повний список є в [довіднику MDN](mdn:js/Array).

<<<<<<< HEAD
На перший погляд, може здатися, що існує дуже багато різних методів, які досить складно запамʼятати. Але це тільки так здається.
=======
At first sight, it may seem that there are so many methods, quite difficult to remember. But actually, that's much easier.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Уважно вивчіть шпаргалку, представлену вище, а потім, щоб попрактикуватися, вирішите завдання, запропоновані в цьому розділі. Так ви отримаєте необхідний досвід в правильному використанні методів масиву.

Кожного разу, коли вам буде необхідно щось зробити з масивом, а ви не знаєте, як це зробити -- приходьте сюди, дивіться на таблицю і шукайте правильний метод. Приклади допоможуть вам все зробити правильно, і незабаром ви швидко запамʼятайте методи без особливих зусиль.
