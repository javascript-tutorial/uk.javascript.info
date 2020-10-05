

```js run demo
let userName = prompt('Хто там?', '');

if (userName === 'Admin') {

  let pass = prompt('Пароль?', '');

<<<<<<< HEAD
  if (pass === 'Господар') {
    alert( 'Ласкаво просимо!' );
  } else if (pass === '' || pass === null) {
    alert( 'Скасовано' );
=======
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
  } else {
    alert( 'Неправильний пароль' );
  }

} else if (userName === '' || userName === null) {
<<<<<<< HEAD
  alert( 'Скасовано' );
=======
  alert( 'Canceled' );
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
} else {
  alert( 'Я вас не знаю' );
}
```

Зверніть увагу на вертикальні відступи у блоках `if`. Вони технічно не потрібні, але роблять код читабельним.
