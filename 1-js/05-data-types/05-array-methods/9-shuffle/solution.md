Простим рішенням може бути:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Це, звичайно, буде працювати, тому що `Math.random() - 0.5` віддає випадкове число, яке може бути позитивним або негативним, отже, функція сортування змінює порядок елементів випадковим чином.

Але оскільки метод `sort` не призначений для використання в таких випадках, не всі можливі варіанти мають однакову ймовірність.

Наприклад, розглянемо код нижче. Він запускає `shuffle` 1000000 раз та підраховує ймовірність появи для всіх можливих варіантів `arr`:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// підрахунок імовірностей для всіх можливих варіантів
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// показати кількість всіх можливих варіантів
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Результат прикладу (залежить від рушія JS):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Тепер ми чітко бачимо відхилення: `123` й `213` зʼявляються набагато частіше, ніж інші варіанти.

Результати цього коду можуть варіюватися при запуску на різних движках JavaScript, але очевидно, що такий підхід не надійний.

Так чому це не працює? Якщо говорити простими словами, то `sort` це "чорний ящик": ми кидаємо в нього масив і функцію порівняння, чекаючи отримати відсортований масив. Але через абсолютну хаотичності порівнянь чорний ящик божеволіє, і як саме він божеволіє, залежить від конкретної його реалізації, яка різна в різних двигунах JavaScript.

Є й інші хороші способи розвʼязувати цю задачу. Наприклад, є відмінний алгоритм під назвою [Тасування Фішера-Єйтса](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Суть полягає в тому, щоб проходити по масиву у зворотному порядку і міняти місцями кожен елемент з випадковим елементом, який знаходиться перед ним.

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // випадковий індекс від 0 до i

    // поміняти елементи місцями 
    // ми використовуємо для цього синтаксис "деструктивне присвоєння" 
    // докладніше про нього - в наступних розділах 
    // те ж саме можна записати як:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Перевіримо цю реалізацію на тому ж прикладі:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// підрахунок імовірності для всіх можливих варіантів
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// показати кількість всіх можливих варіантів
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Приклад виведення:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Тепер все в порядку: всі варіанти зʼявляються з однаковою ймовірністю. 

Крім того, якщо подивитися з точки зору продуктивності, то алгоритм "Тасування Фішера-Єйтса" набагато швидший, оскільки в ньому немає зайвих витрат на сортування.
