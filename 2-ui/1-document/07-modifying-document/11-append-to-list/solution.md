
Коли нам потрібно кудись вставити фрагмент HTML, найкраще підходить `insertAdjacentHTML`.
  
Рішення:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
