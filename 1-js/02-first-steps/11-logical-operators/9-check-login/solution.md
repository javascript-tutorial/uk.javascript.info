

```js run demo
let userName = prompt("Хто там?", '');

if (userName == 'Admin') {

  let pass = prompt('Пароль?', '');

  if (pass == 'TheMaster') {
    alert( 'Ласкаво просимо!' );
  } else if (pass == '' || pass == null) {
    alert( 'Скасовано' );
  } else {
    alert( 'Неправильний пароль' );
  }

} else if (userName == '' || userName == null) {
  alert( 'Скасовано' );
} else {
  alert( "Я вас не знаю" );
}
```

Зверніть увагу на вертикальні відступи у блоках `if`. Вони технічно не потрібні, але роблять код читабельним.
