
<<<<<<< HEAD
Помилка виникає тому що `askPassword` отримує функції `loginOk/loginFail` без об’єкту.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Коли вона викликає їх, їх контекст втрачено `this=undefined`.

Спробуємо використати `bind`, щоб прив’язати контекст:

```js run
function askPassword(ok, fail) {
  let password = prompt("Пароль?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'Іван',

  loginOk() {
    alert(`${this.name} увійшов`);
  },

  loginFail() {
    alert(`${this.name} виконав невдалу спробу входу`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Тепер це працює.

Альтернативне рішення могло б бути:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Зазвичай це також працює та чудово виглядає.

Це менш найдіно, так як в більш складних ситуаціях змінна `user` може змінитися *після* виклику `askPassword`, але *перед* викликом `() => user.loginOk()`. 
