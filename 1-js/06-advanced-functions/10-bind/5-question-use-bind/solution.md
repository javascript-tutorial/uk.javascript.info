
Помилка виникає тому що `askPassword` отримує функції `loginOk/loginFail` без об’єкту.

Коли `askPassword` викликає їх, їх контекст втрачено `this=undefined`.

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

Але це не так надійно, бо в складніших ситуаціях змінна `user` може змінитися *після* виклику `askPassword`, але *перед* викликом `() => user.loginOk()`. 
