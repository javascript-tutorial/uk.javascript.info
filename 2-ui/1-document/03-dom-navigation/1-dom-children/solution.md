Існує багато способів, наприклад:


До DOM вузла `<div>`:

```js
document.body.firstElementChild
// або
document.body.children[0]
// або (перший вузол -- це пробіл, тому беремо 2-й)
document.body.childNodes[1]
```

До DOM вузла `<ul>`:

```js
document.body.lastElementChild
// або
document.body.children[1]
```

До другого `<li>` (Петро):

```js
// отримати <ul>, а потім отримати його останній дочірній елемент
document.body.lastElementChild.lastElementChild
```
