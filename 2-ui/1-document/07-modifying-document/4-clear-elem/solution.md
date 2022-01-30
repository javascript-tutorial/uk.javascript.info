
Перш за все, розглянемо як це _не_ варто робити:

```js
function clear(elem) {
  for (let i = 0; i < elem.childNodes.length; i++) {
    elem.childNodes[i].remove();
  }
}
```

Це не спрацює, тому що виклик `remove()` змістить колекцію `elem.childNodes` таким чином, що елементи щоразу починатимуться з індексу `0`. Але `i` зростатиме, і в результаті деякі елементи будуть пропущені.

Цикл `for..of` робить те саме.

Правильним варіантом може бути:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Також є більш простий спосіб:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
