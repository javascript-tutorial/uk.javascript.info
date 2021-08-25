Важливість: 5

---

# Робота з прототипами

Ось код, у якому створюють пару об’єктів і потім в ході виконання їх модифікують.

Які значення будуть показані в результаті виконання коду?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Повинно бути 3 відповіді.
