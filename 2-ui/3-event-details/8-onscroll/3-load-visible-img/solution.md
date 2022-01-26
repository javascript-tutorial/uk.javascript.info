Обробник `onscroll` повинен перевірити, які зображення є видимими, і показати їх.

Ми також хочемо запускати його під час завантаження сторінки, щоб виявляти видимі зображення відразу та завантажувати їх.

Код повинен виконуватися під час завантаження документа, щоб він мав доступ до його вмісту.

Або розмістіть його внизу `<body>`:

```js
// ...вміст сторінки вище...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // видно верхній край елемента?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // видно нижній край елемента?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

Функція `showVisible()` використовує перевірку видимості, реалізовану `isVisible()`, для завантаження видимих зображень:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

P.S. Рішення також має варіант `isVisible`, який "попередньо завантажує" зображення, які знаходяться в межах 1 сторінки вище/під поточною прокруткою документа.