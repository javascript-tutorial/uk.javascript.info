Давайте зробимо цикл по `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

У циклі нам потрібно отримати текст всередині кожного `li`.

Ми можемо прочитати текст з першого дочірнього вузла `li`, це текстовий вузол:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title -- це текст в <li> перед будь-якими іншими вузлами
}
```

Тоді ми можемо отримати кількість нащадків як `li.getElementsByTagName('li').length`.
