
Перше, що може прийти на думку - перерахувати мови, розділивши їх за допомогою `|`.

Однак, це не спрацює так, як нам потрібно:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

Механізм регулярних виразів шукає альтернації одну за одною. Тобто, спочатку він перевіряє, чи маємо ми `match:Java`, якщо немає -- шукає `match:JavaScript` і так далі.

У результаті, `match:JavaScript` ніколи не буде знайден, лише тому що `match:Java` перевіряється першою.

Так само і з мовами `match:C` та `match:C++`.

Існує два розв'язання цієї проблеми:

1. Змінити порядок, щоб спочатку перевірялись довші співпадіння: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. З’єднати варіанти, які починаються однаково: `pattern:Java(Script)?|C(\+\+)?|PHP`.

У дії:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
