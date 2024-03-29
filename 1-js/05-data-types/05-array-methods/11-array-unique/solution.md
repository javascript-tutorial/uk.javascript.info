Давайте пройдемося по елементам масиву:
- Для кожного елемента ми перевіримо, чи є він в масиві з результатом.
- Якщо є, то ігноруємо його, а якщо немає -- додаємо до результатів.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Привіт", "Світ", "Привіт", "Світ",
  "Привіт", "Привіт", "Світ", "Світ", ":-O"
];

alert( unique(strings) ); // Привіт, Світ, :-O
```

Код працює, але в ньому є потенційна проблема з продуктивністю.

Метод `result.includes(str)` всередині себе обходить масив `result` і порівнює кожен елемент з `str`, щоб знайти збіг.

Таким чином, якщо `result` містить `100` елементів і жоден з них не збігається з `str`, тоді він обійде весь `result` і зробить рівно `100` порівнянь. А якщо `result` великий масив, наприклад, `10000` елементів, то буде зроблено `10000` порівнянь.

Само собою це не проблема, адже рушій JavaScript дуже швидкий, тому обхід `10000` елементів масиву займає лічені мікросекунди.

Але ми робимо таку перевірку для кожного елемента `arr` в циклі `for`.

Тому, якщо `arr.length` дорівнює `10000`, у нас буде щось на зразок `10000*10000` = 100 мільйонів порівнянь. Це забагато. 

Ось чому дане рішення підходить тільки для невеликих масивів.

Далі в розділі <info:map-set> ми побачимо, як його оптимізувати.
