Щоб отримати ширину смуги прокрутки, ми можемо створити елемент із прокруткою, але без рамок і відступів.

Тоді різниця між його повною шириною `offsetWidth` і шириною внутрішньої області вмісту `clientWidth` буде саме ширина смуги прокрутки:

```js run
// створюємо div з прокруткою
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// потрібно розмістити його в документі, інакше розміри будуть 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
