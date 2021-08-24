importance: 4

---

# Створення об’єкта з ключем з масиву

Припустимо, ми отримали масив користувачів у вигляді `{id:..., name:..., age:...}`.

Створіть функцію `groupById(arr)`, яка створює з масиву об’єкт із ключом `id` та елементами масиву як значеннями.

Наприклад:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// після виклику функції ви повинні отримати:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Така функція дійсно зручна при роботі з даними сервера.

У цьому завданні ми вважаємо, що `id` унікальний. Не може бути двох елементів масиву з однаковими `id`.

Будь ласка, використовуйте метод масиву `.reduce`  у рішенні.
