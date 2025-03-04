importance: 5

---

# Часткове застосування для логіну

Задача трохи складніша ніж <info:task/question-use-bind>. 

Об’єкт `user` був змінений. Тепер замість двох функцій `loginOk/loginFail`, він має одну функцію `user.login(true/false)`.

Що ми маємо передати `askPassword` в коді нижче, щоб вона викликала `user.login(true)` при `ok` та `user.login(false)` при `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Пароль?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'Іван',

  login(result) {
    alert( this.name + (result ? ' увійшов' : ' виконав невдалу спробу входу') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Вносьте зміни тільки у виділений рядок.

