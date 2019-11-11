
# Перепишіть з використанням стрілкових функцій

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/1-rewrite-arrow/task.md
Замініть Функціональні Вирази на стрілкові функції у коді:
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd:1-js/02-first-steps/16-arrow-functions-basics/1-rewrite-arrow/task.md

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
