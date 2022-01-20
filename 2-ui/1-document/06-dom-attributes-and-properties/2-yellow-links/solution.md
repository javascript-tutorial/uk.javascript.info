
По-перше, нам потрібно знайти всі зовнішні посилання.

Є два способи.

Перше -- знайти всі посилання, використовуючи `document.querySelectorAll('a')`, а потім відфільтровувати те, що нам потрібно:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // немає атрибуту

  if (!href.includes('://')) continue; // немає протоколу

  if (href.startsWith('http://internal.com')) continue; // внутрішня

  link.style.color = 'orange';
}
```

Будь ласка, зверніть увагу: ми використовуємо `link.getAttribute('href')`. Не `link.href` тому, що нам потрібна властивість з HTML.

...Інший, простий спосіб полягає в тому, щоб додати перевірки до селектора CSS:

```js
// шукати всі посилання, які мають :// у href
// але href не починається з http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
