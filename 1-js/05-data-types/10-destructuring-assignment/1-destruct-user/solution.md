
```js run
let user = {
  name: "Іван",
  years: 30
};

let {name, years: age, isAdmin = false} = user;

alert( name ); // Іван
alert( age ); // 30
alert( isAdmin ); // false
```