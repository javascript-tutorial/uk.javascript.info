```js run no-beautify
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}

let ivan = { name: "Іван", age: 25 };
let petro = { name: "Петро", age: 30 };
let mariya = { name: "Марія", age: 28 };

let arr = [ petro, ivan, mariya ];

sortByAge(arr);

// тепер відсортовано: [ivan, mariya, petro]
alert(arr[0].name); // Ivan
alert(arr[1].name); // Mariya
alert(arr[2].name); // Petro
```
