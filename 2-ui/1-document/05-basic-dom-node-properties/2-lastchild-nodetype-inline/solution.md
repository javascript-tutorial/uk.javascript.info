Тут є пастка.

У момент виконання `<script>` останній вузол DOM є саме `<script>`, тому що браузер ще не обробив решту сторінки.

Отже, результат -- `1` (вузол-елемент).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
