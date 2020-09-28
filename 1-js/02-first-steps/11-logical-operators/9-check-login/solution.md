

```js run demo
let userName = prompt("Хто там?", '');

if (userName === 'Admin') {

  let pass = prompt('Пароль?', '');

<<<<<<< HEAD
  if (pass == 'TheMaster') {
    alert( 'Ласкаво просимо!' );
  } else if (pass == '' || pass == null) {
    alert( 'Скасовано' );
=======
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
  } else {
    alert( 'Неправильний пароль' );
  }

<<<<<<< HEAD
} else if (userName == '' || userName == null) {
  alert( 'Скасовано' );
=======
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
} else {
  alert( "Я вас не знаю" );
}
```

Зверніть увагу на вертикальні відступи у блоках `if`. Вони технічно не потрібні, але роблять код читабельним.
