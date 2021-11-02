
# Розширення вбудованих класів

Вбудовані класи, такі як Array, Map та інші, також розширюються.

Наприклад, ось тут `PowerArray` успадковується від вбудованого `Array`:

```js run
// додамо до нього ще один метод (можна більше)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

Зверніть увагу на дуже цікаву річ. Вбудовані методи, такі як `filter`, `map` та інші, повертають нові об’єкти точно успадкованого типу `PowerArray`. Їхня внутрішня реалізація використовує для цього властивість об’єкта `constructor`.

У вищенаведеному прикладі,
```js
arr.constructor === PowerArray
```

Коли викликається `arr.filter()`, він внутрішньо створює новий масив результатів, використовуючи саме `arr.constructor`, а не базовий `Array`. Насправді це дуже круто, тому що ми можемо продовжувати використовувати методи `PowerArray` і далі для отримання результату.

Щобільше, ми можемо налаштувати таку поведінку.

Ми можемо додати до класу спеціальний статичний геттер `Symbol.species`. Якщо він існує, то повинен повернути конструктор, який JavaScript буде використовувати внутрішньо для створення нових об’єктів у `map`, `filter` тощо.

Якщо ж ми хочемо, щоб вбудовані методи, такі як `map` або `filter`, повертали звичайні масиви, ми можемо повернути `Array` у `Symbol.species`, як тут:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // вбудовані методи використовуватимуть це як конструктор
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter створює новий масив, використовуючи arr.constructor[Symbol.species] як конструктор
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr - це не PowerArray, а Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

Як бачите, тепер `.filter` повертає `Array`. Таким чином, розширена функціональність не передається далі.

```smart header="Інші колекції працюють аналогічно"
Інші колекції, такі як `Map` і `Set`, працюють аналогічно. Вони також використовують `Symbol.species`.
```

## Відсутність статичного спадкування вбудованих класів

Вбудовані об’єкти мають власні статичні методи, наприклад `Object.keys`, `Array.isArray` тощо.

Як ми вже знаємо, вбудовані класи розширюють один одного. Наприклад, `Array` розширює `Object`.

Зазвичай, коли один клас розширює інший, успадковуються як статичні, так і нестатичні методи. Це детально описано в статті [](info:static-properties-methods#static-and-inheritance).

Але вбудовані класи є винятком. Вони не успадковують статику один від одного.

Наприклад, і `Array`, і `Date` успадковуються від `Object`, тому їхні екземпляри мають методи з `Object.prototype`. Але `Array.[[Prototype]]` не посилається на `Object`, тому не існує, наприклад, `Array.keys()` (або `Date.keys()`) статичного методу.

Ось структура зображення для `Date` та `Object`:

![](object-date-inheritance.svg)

Як бачите, немає зв’язку між `Date` і `Object`. Вони незалежні, лише `Date.prototype` успадковується від `Object.prototype`.

Це важлива відмінність успадкування між вбудованими об’єктами в порівнянні з тим, що ми отримуємо за допомогою `extends`.
