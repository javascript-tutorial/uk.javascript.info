
Початок шаблону є очевидним: `pattern:<style`.

...Однак далі, ми не можемо просто прописати `pattern:<style.*?>`, тому що `match:<styler>` відповідає цьому виразу.

Потім, після `match:<style` має бути або пробіл, за яким може бути ще щось, або закриття тегу `match:>`.

Мовою регулярних виразів: `pattern:<style(>|\s.*?>)`.

У дії:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
