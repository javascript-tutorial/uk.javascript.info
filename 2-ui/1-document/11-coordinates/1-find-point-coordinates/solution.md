# Зовнішні кути

Зовнішні кути -- це саме те, що ми отримуємо в результаті виклику [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Координати верхнього лівого кута `answer1` і нижнього правого кута `answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Лівий верхній внутрішній кут

Координати внутрішнього кута відрізняється від зовнішнього на ширину рамки. Надійним способом їх отримання є використання `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Правий нижній внутрішній кут

У нашому випадку нам потрібно відняти розмір рамки від зовнішніх координат.

Можемо використати CSS властивості:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

Альтернативним способом було б додавання `clientWidth/clientHeight` до координат лівого верхнього кута. Це, мабуть, навіть краще:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
