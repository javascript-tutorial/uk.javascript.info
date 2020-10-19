

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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
  } else {
    alert( 'Неправильний пароль' );
  }

} else if (userName === '' || userName === null) {
<<<<<<< HEAD
  alert( 'Скасовано' );
=======
  alert( 'Canceled' );
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
} else {
  alert( 'Я вас не знаю' );
}
```

Зверніть увагу на вертикальні відступи у блоках `if`. Вони технічно не потрібні, але роблять код читабельним.
