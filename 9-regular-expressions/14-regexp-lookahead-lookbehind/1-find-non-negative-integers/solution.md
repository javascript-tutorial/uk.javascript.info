
Регулярний вираз для цілого числа `pattern:\d+`.

Ми можемо виключити від'ємні числа попередньо написавши регулярний вираз для негативної зворотньої перевірки: `pattern:(?<!-)\d+`.

Хоча, випробувавши його, ми побачимо одне зайве співпадіння:

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

Як ви бачите, шаблон знаходить `match:8`, у `subject:-18`. Щоб виключити і його, нам необхідно переконатись, що регулярний вираз починає пошук не з середини іншого числа, яке не підходить.

Ми можемо це реалізувати вказавши додатковий вираз для негативної зворотньої перевірки: `pattern:(?<!-)(?<!\d)\d+`. Зараз `pattern:(?<!\d)` перевіряє, щоб пошук не починався одразу після іншого числа, як нам і було потрібно.

Ми можемо об'єднати їх в один таким чином:

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
