```js run
function getAverageAge(users) {
  return users.reduce((prev, user) => prev + user.age, 0) / users.length;
}

let ivan = { name: "Іван", age: 25 };
let petro = { name: "Петро", age: 30 };
let mariya = { name: "Марія", age: 29 };

let arr = [ ivan, petro, mariya ];

alert( getAverageAge(arr) ); // 28
```

