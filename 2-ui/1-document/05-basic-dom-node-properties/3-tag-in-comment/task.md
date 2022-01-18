importance: 3

---

# Тег у коментарі

Що показує цей код?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // що тут?
</script>
```
