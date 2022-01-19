
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Виберіть жанр</div>

  <script>
    // отримаємо його
    let elem = document.querySelector('[data-widget-name]');

    // прочитаємо значення
    alert(elem.dataset.widgetName);
    // чи
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```
