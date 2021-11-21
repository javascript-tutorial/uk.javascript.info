importance: 3

---

# Клас розширює об’єкт?

Як ми знаємо, всі об’єкти зазвичай успадковуються від `Object.prototype` й отримують доступ до «загальних» методів об’єкта, наприклад `hasOwnProperty` тощо.

Наприклад:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// метод hasOwnProperty від Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Але що як ми пропишемо явно `"class Rabbit extends Object"` - тоді результат буде відрізнятися від звичайного `"class Rabbit"`?

Яка різниця?

Ось приклад такого коду (він не працює - чому? виправте його):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
