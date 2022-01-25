
Щоб додати кнопку закриття, ми можемо використовувати або `position:absolute` (і зробити плитку (pane) `position:relative`) або `float:right`. Перевага варіанта з `float:right` у тому, що кнопка закриття ніколи не перекриє текст, але варіант `position:absolute` дає більше свободи для дій. Загалом вибір за вами.

Тоді для кожної панелі код може бути таким:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Елемент `<button>` стає `pane.firstChild`, таким чином ми можемо додати на нього обробник події:

```js
pane.firstChild.onclick = () => pane.remove();
```
