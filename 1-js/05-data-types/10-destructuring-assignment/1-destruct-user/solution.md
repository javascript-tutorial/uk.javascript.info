
```js run
let user = {
  name: "Джон",
  years: 30
};

let {name, years: age, isAdmin = false} = user;

alert( name ); // Джон
alert( age ); // 30
alert( isAdmin ); // false
```