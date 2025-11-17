# Деструктуроване присвоєння

Двома найбільш вживаними структурами даних у JavaScript є `Object` та `Array`.

- Об’єкти дозволяють нам створити єдину сутність, яка зберігатиме дані за ключем. 
- Масиви дозволяють нам зібрати елементи даних у впорядкований список.

<<<<<<< HEAD
Однак, коли ми передаємо їх у функцію, нам може знадобитися не все. Функції можуть знадобитися лише певні елементи або властивості.
=======
However, when we pass these to a function, we may not need all of it. The function might only require certain elements or properties.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

*Деструктуроване присвоєння* -- це спеціальний синтаксис, що дозволяє нам "розпаковувати" масиви чи об’єкти в купу змінних, оскільки іноді це зручніше.

<<<<<<< HEAD
Деструктурування також чудово працює зі складними функціями, які мають багато параметрів, типових значень тощо. Незабаром ми це побачимо.
=======
Destructuring also works well with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

## Деструктурування масиву

Ось приклад того, як масив деструктурується на змінні:

```js
<<<<<<< HEAD
// у нас є масив з іменем та прізвищем
let arr = ["Іван", "Петренко"]
=======
// we have an array with a name and surname
let arr = ["John", "Smith"]
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

*!*
// деструктуроване присвоєння
// встановлює firstName = arr[0]
// та surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // Іван
alert(surname);  // Петренко
```

Тепер ми можемо працювати зі змінними замість елементів масиву.

Це чудово виглядає в поєднанні зі `split` або іншими методами повернення масиву:

```js run
let [firstName, surname] = "Іван Петренко".split(' ');
alert(firstName); // Іван
alert(surname);  // Петренко
```

<<<<<<< HEAD
Як бачите, синтаксис простий. Хоча є кілька особливих деталей. Давайте розглянемо більше прикладів, щоб краще це зрозуміти.

````smart header="\"Деструктурування\" не означає \"руйнування\"."
Це називається "деструктуроване присвоєння", оскільки воно "деструктурує" шляхом копіювання елементів у змінні. Однак, сам масив не змінюється.
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples to understand it better.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. However, the array itself is not modified.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Це просто коротший спосіб написати:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ігноруйте елементи за допомогою коми"
Небажані елементи масиву також можна викинути за допомогою додаткової коми:

```js run
*!*
// другий елемент не потрібен
let [firstName, , title] = ["Юлій", "Цезар", "Консул", "Римської республіки"];
*/!*

alert( title ); // Консул
```

<<<<<<< HEAD
У наведеному вище коді другий елемент масиву пропускається, третій присвоюється `title`, а решта елементів масиву також пропускаються (оскільки для них немає змінних).
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items are also skipped (as there are no variables for them).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
````

````smart header="Працює з будь-якими типами даних, що перебираються у правій стороні"

...Насправді, ми можемо використовувати його з будь-якими даними, які перебираються, а не тільки з масивами:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
Це працює, тому що внутрішньо деструктуроване присвоювання працює шляхом ітерації над правильним значенням. Це своєрідний синтаксичний цукор для виклику `for..of` над значенням праворуч від `=` і присвоювання значень.
````


````smart header="Призначте будь-що з лівого боку"
Ми можемо використовувати будь-які "призначення" з лівого боку.

Наприклад, властивість об’єкта:
```js run
let user = {};
[user.name, user.surname] = "Іван Петренко".split(' ');

alert(user.name); // Іван
alert(user.surname); // Петренко
```

````

<<<<<<< HEAD
````smart header="Цикл з .entries()"
У попередньому розділі, ми бачили метод [Object.entries(obj)](mdn:js/Object/entries).

Ми можемо використовувати його з деструктуруванням для циклічного перебору ключів-та-значень об’єкта:
=======
````smart header="Looping with .entries()"
In the previous chapter, we saw the [Object.entries(obj)](mdn:js/Object/entries) method.

We can use it with destructuring to loop over the keys-and-values of an object:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let user = {
  name: "Іван",
  age: 30
};

<<<<<<< HEAD
// перебрати циклом ключі-та-значення
=======
// loop over the keys-and-values
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:Іван, потім age:30
}
```

Подібний код для `Map` простіший, оскільки він є структурою даних, яка перебирається:

```js run
let user = new Map();
user.set("name", "Іван");
user.set("age", "30");

*!*
// Map ітерує як пари [key, value], що дуже зручно для деструктурування
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:Іван, then age:30
}
```
````

````smart header="Трюк обміну змінними"
Існує відомий трюк для обміну значень двох змінних за допомогою деструктурованого присвоєння:

```js run
let guest = "Джейн";
let admin = "Пітер";

// Давайте обміняємо значення: зробімо guest=Пітер, admin=Джейн
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Пітер Джейн (успішно обмінялися!)
```

Тут ми створюємо тимчасовий масив з двох змінних і негайно деструктуруємо його в порядку обміну.

Таким методом ми можемо поміняти місцями більше двох змінних.
````

### Залишкові параметри '...'

Зазвичай, якщо масив довший від списку зліва, "зайві" елементи опускаються.

Наприклад, тут береться лише два елементи, а решта просто ігнорується:

```js run
let [name1, name2] = ["Юлій", "Цезар", "Консул", "Римської Республіки"];

alert(name1); // Юлій
alert(name2); // Цезар
// Інші пункти ніде не присвоєні
```

Якщо ми хочемо також зібрати все наступне -- ми можемо додати ще один параметр, який отримує "решту", використовуючи три крапки `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Юлій", "Цезар", *!*"Консул", "Римської Республіки"*/!*];

*!*
<<<<<<< HEAD
// rest -- це масив елементів, починаючи з 3-го
alert(rest[0]); // Консул
alert(rest[1]); // Римської Республіки
=======
// rest is an array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
alert(rest.length); // 2
*/!*
```

Значення `rest` -- це масив елементів, що залишилися.

Ми можемо використовувати будь-яке інше ім’я змінної замість `rest`, просто переконайтеся, що воно має три крапки перед ним і йде останнім у присвоєнні деструктурування.

```js run
let [name1, name2, *!*...titles*/!*] = ["Юлій", "Цезар", "Консул", "Римської Республіки"];
// тепер titles = ["Консул", "Римської Республіки"]
```

### Типові значення

<<<<<<< HEAD
Якщо масив коротший за список змінних зліва, помилок не буде. Відсутні значення вважаються невизначеними:
=======
If the array is shorter than the list of variables on the left, there will be no errors. Absent values are considered undefined:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Якщо ми хочемо, щоб "типове" значення замінило б відсутнє, ми можемо надати його за допомогою `=`:

```js run
*!*
// типове значення
let [name = "Гість", surname = "Анонім"] = ["Юлій"];
*/!*

alert(name);    // Юлій (з масиву)
alert(surname); // Анонім (використовується типове значення)
```

Початкові значення можуть бути більш складними виразами або навіть викликами функцій. Вони визначаються, лише якщо значення не надано.

Наприклад, тут ми використовуємо функцію `prompt` для двох типових значень:

```js run
// запускає prompt тільки для surname
let [name = prompt("Ім'я?"), surname = prompt('Прізвище?')] = ["Юлій"];

alert(name);    // Юлій (визначено з масиву)
alert(surname); // значення, отримане з prompt
```

Зверніть увагу: `prompt` буде спрацьовувати лише для відсутнього значення (`surname`).

## Деструктурування об’єктів

Деструктуроване присвоєння також працює з об’єктами.

Основний синтаксис такий:

```js
let {var1, var2} = {var1:…, var2:…}
```

Ми повинні мати існуючий об’єкт праворуч, який ми хочемо розділити на змінні. Ліва частина містить об’єктоподібний "шаблон" для відповідних властивостей. У найпростішому випадку це список імен змінних у `{...}`.

Наприклад:

```js run
let options = {
  title: "Меню",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Меню
alert(width);  // 100
alert(height); // 200
```

Властивості `options.title`, `options.width` та `options.height` призначені відповідним змінним.

Порядок не має значення. Це теж працює:

```js
// змінили порядок у let {...}
let {height, width, title} = { title: "Меню", height: 200, width: 100 }
```

Шаблон з лівого боку може бути більш складним і визначати зіставлення властивостей та змінних.

Якщо ми хочемо присвоїти властивість змінній з іншим іменем, наприклад, зробити так, щоб `options.width` переходив до змінної з назвою `w`, то ми можемо встановити ім’я змінної за допомогою двокрапки:

```js run
let options = {
  title: "Меню",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Меню
alert(w);      // 100
alert(h);      // 200
```

Двокрапка показує "що: куди йде". У наведеному вище прикладі властивість `width` переходить у `w`, властивість `height` переходить у `h`, а `title` присвоюється тому самому імені.

Для потенційно відсутніх властивостей ми можемо встановити типові значення за допомогою `"="`, наприклад:

```js run
let options = {
  title: "Меню"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Меню
alert(width);  // 100
alert(height); // 200
```

Так само, як і з масивами або параметрами функцій, типові значення можуть бути будь-якими виразами або навіть викликами функцій. Вони будуть оцінені, якщо значення не надано.

У коді нижче `prompt` запитує `width`, але не `title`:

```js run
let options = {
  title: "Меню"
};

*!*
let {width = prompt("Ширина?"), title = prompt("Заголовок?")} = options;
*/!*

alert(title);  // Меню
alert(width);  // (будь-який результат з prompt)
```

Ми також можемо поєднати двокрапку та рівність:

```js run
let options = {
  title: "Меню"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Меню
alert(w);      // 100
alert(h);      // 200
```

Якщо у нас є складний об’єкт з багатьма властивостями, ми можемо витягти лише те, що нам потрібно:

```js run
let options = {
  title: "Меню",
  width: 100,
  height: 200
};

// вибирає тільки title як змінну
let { title } = options;

alert(title); // Меню
```

### Залишок об’єкту "..."

Що робити, якщо об’єкт має більше властивостей, ніж ми маємо змінних? Чи можемо ми взяти частину, а потім призначити кудись «залишок»?

Ми можемо використовувати шаблон залишкового оператору, так само, як ми робили з масивами. Він не підтримується деякими старішими браузерами (IE, використовуйте Babel для поліфілу), але працює в сучасних.

Це виглядає наступним чином:

```js run
let options = {
  title: "Меню",
  height: 200,
  width: 100
};

*!*
// title = властивість з назвою title
// rest = об’єкт з залишковими властивостями
let {title, ...rest} = options;
*/!*

// тепер title="Меню", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Зверніть увагу, якщо `let` відсутній"
У наведених вище прикладах змінні були оголошені прямо в присвоєнні: `let {…} = {…}`. Звичайно, ми також можемо використовувати існуючі змінні без `let`. Але тут може бути підступ.

Це не спрацює:
```js run
let title, width, height;

// помилка в цьому рядку
{title, width, height} = {title: "Меню", width: 200, height: 100};
```

Проблема в тому, що JavaScript розглядає `{...}` в основному потоці коду (а не всередині іншого виразу) як блок коду. Такі блоки коду можна використовувати для групування операторів, наприклад:

```js run
{
  // блок коду
  let message = "Привіт";
  // ...
  alert( message );
}
```

Отже, тут JavaScript припускає, що у нас є блок коду, тому і виникає помилка. Натомість ми хочемо деструктурування.

Щоб показати JavaScript, що це не блок коду, ми можемо загорнути вираз у дужки `(...)`:

```js run
let title, width, height;

// тепер працює
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Меню
```
````

## Вкладене деструктурування

<<<<<<< HEAD
Якщо об’єкт або масив містять інші вкладені об’єкти та масиви, ми можемо використовувати складніші шаблони з лівого боку для вилучення глибших частин.
=======
If an object or an array contains other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

У наведеному нижче коді `options` містить інший об’єкт у властивості `size` та масив у властивості `items`. Шаблон у лівій частині присвоєння має ту саму структуру для вилучення з них значень:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Торт", "Пончик"],
  extra: true   
};

// деструктурування розподілене на кілька рядків для наочності
let {
  size: { // помістимо тут size
    width,
    height
  },
  items: [item1, item2], // тут призначимо items
  title = "Меню" // немає в об’єкті (використовується типове значення)
} = options;

alert(title);  // Меню
alert(width);  // 100
alert(height); // 200
alert(item1);  // Торт
alert(item2);  // Пончик
```

<<<<<<< HEAD
Усі властивості об’єкта `options`, окрім `extra`, яке відсутнє у лівій частині, призначаються відповідним змінним:
=======
All properties of `options` object except `extra` which is absent in the left part, are assigned to corresponding variables:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

![](destructuring-complex.svg)

Нарешті, ми маємо `width`, `height`, `item1`, `item2` та `title` з типовим значенням.

Зауважте, що для `size` та `items` немає змінних, оскільки ми беремо їх вміст.

## Розумні параметри функції

<<<<<<< HEAD
Бувають випадки, коли функція має багато параметрів, більшість з яких є необов’язковими. Особливо це стосується користувацьких інтерфейсів. Уявіть собі функцію, яка створює меню. Вона може мати ширину, висоту, назву, список елементів тощо.

Нижче наведено поганий спосіб написати таку функцію:
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, an item list and so on.

Here's a bad way to write such a function:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

<<<<<<< HEAD
У реальному житті проблема полягає в тому, як запам’ятати порядок аргументів. Зазвичай IDE намагаються нам допомогти, особливо якщо код добре задокументований, але все ж... Інша проблема полягає в тому, як викликати функцію, коли більшість параметрів типово в порядку.
=======
In real-life, the problem is how to remember the order of arguments. Usually, IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Можливо так?

```js
// undefined де підходять типові значення
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Це негарно. І стає нечитабельним, коли ми маємо справу з більшою кількістю параметрів.

На допомогу приходить деструктурування!

Ми можемо передати параметри як об’єкт, і функція негайно деструктурує їх на змінні:

```js run
// ми передаємо об’єкт до функції
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...і вона негайно розгортає його до змінних
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – взяті з options,
  // width, height – використовуються типові значення
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Ми також можемо використовувати більш складне деструктурування з вкладеними об’єктами та двокрапками:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width стає w
  height: h = 200, // height стає h
  items: [item1, item2] // перший елемент items йде до item1, другий - до item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Повний синтаксис такий самий, як і для деструктурованого присвоєння:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

<<<<<<< HEAD
Тоді для об’єкта параметрів буде змінна `varName` для властивості `incomingProperty` з типовим значенням `defaultValue`.
=======
Then, for an object of parameters, there will be a variable `varName` for the property `incomingProperty`, with `defaultValue` by default.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Зверніть увагу, що таке деструктурування передбачає, що `showMenu()` має аргумент. Якщо ми хочемо, щоб усі значення були типовими, ми повинні вказати порожній об’єкт:

```js
showMenu({}); // так добре, усі значення типові

showMenu(); // це дасть помилку
```

Ми можемо виправити це, зробивши `{}` типовим значенням для всього об’єкта параметрів:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

У наведеному вище коді весь об’єкт аргументів є типовим значенням `{}`, тому завжди є що деструктурувати.

## Підсумки

- Деструктуроване присвоєння дозволяє миттєво зіставити об’єкт або масив з багатьма змінними.
- Повний синтаксис для об’єкта:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    Це означає, що властивість `prop` має входити до змінної `varName` і, якщо такої властивості не існує, слід використовувати `типове` значення.

    Властивості об’єкта, які не мають зіставлення, копіюються в об’єкт `rest`.

- Повний синтаксис для масиву:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

<<<<<<< HEAD
    Перший елемент переходить до `item1`; другий переходить до `item2`, усі інші утворюють масив `rest`.
=======
    The first item goes to `item1`; the second goes into `item2`, and all the rest makes the array `rest`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

- Можна витягувати дані з вкладених масивів/об’єктів, для цього ліва сторона повинна мати ту ж структуру, що й права.
