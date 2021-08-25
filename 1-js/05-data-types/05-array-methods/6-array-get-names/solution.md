```js run

let ivan = { name: "Іван", age: 25 };
let petro = { name: "Петро", age: 30 };
let mariya = { name: "Марія", age: 28 };

let users = [ ivan, petro, mariya ];

let names = users.map(item => item.name);

alert( names ); // Іван, Петро, Марія
```

