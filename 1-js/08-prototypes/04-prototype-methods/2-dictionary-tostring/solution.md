
Метод може взяти всі перелічувані ключі об’єкта за допомогою `Object.keys` та вивести їх перелік.

Для того щоб зробити метод `toString` не перлічуваним, визначимо його використовуючи дескриптор властивості. Синтаксис `Object.create` дозволяє нам надати об’єкту дескриптори властивостей як другий аргумент.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // визначаємо властивість toString
    value() { // value є функцією
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Яблуко";
dictionary.__proto__ = "тест";

// apple та __proto__ показуються в циклі
for(let key in dictionary) {
  alert(key); // "apple", потім "__proto__"
}  

// метод toString повертає перелік властивостей через кому
alert(dictionary); // "apple,__proto__"
```

Коли ми створюємо властивість використовуючи дескриптор, його опції мають значення `false` за замовчуванням. Тому в коді вище `dictionary.toString` є не перелічуваним.

Продивіться розділ [](info:property-descriptors).
