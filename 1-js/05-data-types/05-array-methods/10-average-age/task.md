importance: 4

---

# Вирахувати середній вік

Напишіть функцію `getAverageAge(users)`, яка приймає масив об’єктів з властивістю `age` та повертає середній вік.

Формула обчислення середнього арифметичного значення: `(age1 + age2 + ... + ageN) / N`.

Наприклад:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
