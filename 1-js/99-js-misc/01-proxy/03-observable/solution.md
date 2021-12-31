Рішення складається з двох частин:

1. Щоразу, коли викликається `.observe(handler)`, нам потрібно десь запам’ятати обробник, щоб мати можливість викликати його пізніше. Ми можемо зберігати обробники прямо в об’єкті, використовуючи наш символ як ключ властивості.
2. Нам потрібен проксі з пасткою `set` для виклику обробників у разі будь-яких змін.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Ініціалізуємо сховище обробників
  target[handlers] = [];

  // Збережемо функцію-обробник в масиві для майбутніх викликів
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Створимо проксі для обробки змін
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // перенаправимо операцію на об’єкт
      if (success) { // якщо під час запису властивості не було помилок
        // викличемо всі обробники
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "Іван";
```
