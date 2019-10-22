
# Перепишіть з використанням стрілкових функцій

Замініть Функціональні Вирази на стрілкові функції у коді:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Ви згодні?",
  function() { alert("Ви погодились."); },
  function() { alert("Ви скасували виконання."); }
);
```
