# Вставка після Head

У нас є рядок з HTML-документом.

Напишіть регулярний вираз який вставляє `<h1>Привіт</h1>` одразу після тегу `<body>`. Тег може мати атрибути.

Приклад:

```js
let regexp = /ваш регулярний вираз/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Привіт</h1>`);
```

Після цього значення `str` має бути:
```html
<html>
  <body style="height: 200px"><h1>Привіт</h1>
  ...
  </body>
</html>
```
