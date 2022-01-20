importance: 3

---

# Зробіть зовнішні посилання помаранчевими

Зробіть всі зовнішні посилання помаранчевими, змінюючи властивість `style`.

Посилання є зовнішнім, якщо:
- В його `href` є `://`
- Але не починається з `http://internal.com`.

Приклад:

```html run
<a name="list">список</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // налаштування style для одного посилання
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

Результат повинен бути:

[iframe border=1 height=180 src="solution"]
