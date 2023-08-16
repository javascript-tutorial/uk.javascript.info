# Повільне рішення

Ми можемо порахувати всі можливі підсуми.

Найпростіший шлях - це порахувати суми всіх підмасивів, починаючи з кожного елемента.

Наприклад, для `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Починаємо з -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Починаємо з 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Починаємо з 3:
3
3 + (-9)
3 + (-9) + 11

// Починаємо з -9
-9
-9 + 11

// Починаємо з 11
11
```

Вирішення потребує використання циклів: зовнішний цикл проходить по елементах масиву, а внутрішній рахує підсуму починаючи з поточного елементу.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // якщо елементи відсутні - повертаємо 0

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

Таке рішення має оцінку часу виконання [O(n<sup>2</sup>)](https://uk.wikipedia.org/wiki/Нотація_Ландау). Інакше кажучи, якщо ми збільшимо розмір масиву вдвічі, алгоритм буде виконуватися в 4 рази довше.

Для великих масивів (1000, 10000 або більше елементів) подібні алгоритми можуть призводити до серйозних "пригальмувань" в роботі.

# Швидке рішення

Пройдемося по масиву і в процесі будемо накопичувати проміжну суму елементів в змінній `s`. Якщо в певний момент `s` стане меншою за 0, присвоїмо `s=0`. Максимальне значення з усіх `s` і буде відповіддю.

Якщо пояснення не дуже зрозуміле, подивіться, будь ласка, на код - він досить лаконічний:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

Цей алгоритм потребує рівно один прохід по масиву, його оціночний час виконання -  O(n).

Ви можете дізнатися більше про цей алгоритм тут: [Maximum subarray problem](https://en.wikipedia.org/wiki/Maximum_subarray_problem). Якщо досі не зрозуміло, як це працює, будь ласка, подивіться алгоритм у прикладах вище, це буде краще за будь-які слова.
