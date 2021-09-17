importance: 5

---

# Відсортувати користувачів за віком

Напишіть функцію `sortByAge(users)`, яка приймає масив обʼєктів з властивістю `age` і сортує їх по ньому.

Наприклад:

```js no-beautify
let ivan = { name: "Іван", age: 25 };
let petro = { name: "Петро", age: 30 };
let mariya = { name: "Марія", age: 28 };

let arr = [ petro, ivan, mariya ];

sortByAge(arr);

// now: [ivan, mariya, petro]
alert(arr[0].name); // Іван
alert(arr[1].name); // Марія
alert(arr[2].name); // Петро
```
