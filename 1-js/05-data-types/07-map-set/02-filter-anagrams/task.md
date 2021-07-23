importance: 4

---

# Відфільтруйте анаграми

[Анаграми](https://en.wikipedia.org/wiki/Anagram) -- це слова, у яких ті ж букви в тій же кількості, але вони розташовуються в іншому порядку.

Наприклад:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Напишіть функцію `aclean(arr)`, яка повертає масив без анаграм.

Наприклад:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

З кожної групи анаграм має залишитися тільки одне слово, не має значення яке.

