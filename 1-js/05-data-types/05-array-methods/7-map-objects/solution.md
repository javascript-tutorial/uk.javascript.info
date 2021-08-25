
```js run no-beautify
let ivan = { name: "Іван", surname: "Іванко", id: 1 };
let petro = { name: "Петро", surname: "Петренко", id: 2 };
let mariya = { name: "Марія", surname: "Мрійко", id: 3 };

let users = [ ivan, petro, mariya ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "Іван Іванко", id: 1 },
  { fullName: "Петро Петренко", id: 2 },
  { fullName: "Марія Мрійко", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // Іван Іванко
```

Зверніть увагу, що для стрілкових функцій ми повинні використовувати додаткові дужки.

Ми не можемо написати ось так:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Як ми памʼятаємо, є дві функції зі стрілками: без тіла `value => expr` та з тілом `value => {...}`.

Тут JavaScript трактуватиме `{` як початок тіла функції, а не початок обʼєкта. Щоб обійти це, потрібно укласти їх в круглі дужки:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Тепер усе добре.


