Рішення:

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

Іншими словами: (вся висота) мінус (прокручена верхня частина) мінус (видима частина) -- саме це прокручена нижня частина.
