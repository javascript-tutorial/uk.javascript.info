Відповідь `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Це відбувається тому, що масиви — це об’єкти. Отже, `shoppingCart` та `fruits` посилаються на один і той самий об’єкт.
