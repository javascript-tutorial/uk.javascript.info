Відповідь: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

Що відбувається крок за кроком:

1. Вміст `<body>` замінюється коментарем. Коментар `<!--BODY-->`, тому що `body.tagName == "BODY"`. Як ми пам'ятаємо, `tagName` завжди пишеться великими літерами в HTML.
2. Коментар зараз є єдиним дочірнім вузлом, тому ми отримуємо його в `body.firstChild`.
3. Властивість коментаря `data` -- це його вміст (всередині `<!--...-->`): `"BODY"`.
