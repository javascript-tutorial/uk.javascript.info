importance: 5

---

# Додайте toString до об'єкту-словника

Дано об'єкт `dictionary`, створений за допомогою `Object.create(null)`, щоб зберегти будь-які пари `ключ/значення`.

Додайте метод `dictionary.toString()` до об'єкта, який повертає перелік ключів через кому. Метод `toString` не повинен показуватися, якщо застосувати до об'єкта цикл `for..in`.

Тут показано як це має працювати:

```js
let dictionary = Object.create(null);

*!*
// ваш код, щоб додати dictionary.toString метод
*/!*

// додаємо певні дані
dictionary.apple = "Яблуко";
dictionary.__proto__ = "тест"; // __proto__ тут є звичайною властивістю об'єкта

// тільки ключі apple та __proto__ показуються в циклі
for(let key in dictionary) {
  alert(key); // "apple", потім "__proto__"
}  

// ваш метод toString в дії
alert(dictionary); // "apple,__proto__"
```
