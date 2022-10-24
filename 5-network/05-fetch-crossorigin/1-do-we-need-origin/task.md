importance: 5

---

# Навіщо нам Origin?

Як ви, мабуть, знаєте, існує HTTP-заголовок `Referer`, який зазвичай містить URL-адресу сторінки, що ініціювала мережевий запит.

Наприклад, під час отримання `http://google.com` з `http://javascript.info/some/url` заголовки виглядають так:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Як бачите, присутні і `Referer`, і `Origin`.

Питання:

1. Навіщо потрібен `Origin`, якщо `Referer` містить ще більше інформації?
2. Чи можливо, що немає `Referer` чи `Origin`, або ж це неправильно?