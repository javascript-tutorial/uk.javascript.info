Регулярний вираз для пошуку тризначного коду кольору `#abc`: `pattern:/#[a-f0-9]{3}/i`.

Ми можемо додати рівно 3 додаткові шістнадцяткові цифри, не більше й не менше. Колір містить 3 або 6 цифр.

Використаємо для цього квантифікатор `pattern:{1,2}`: отримаємо `pattern:/#([a-f0-9]{3}){1,2}/i`.

В цьому випадку, патерн `pattern:[a-f0-9]{3}` оточений дужками для застосування квантифікатора `pattern:{1,2}`.

На прикладі:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

Бачимо невелику проблему: патерн знайшов `match:#abc` в `subject:#abcd`. Для запобігання цьому, додамо в кінці `pattern:\b`:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```
