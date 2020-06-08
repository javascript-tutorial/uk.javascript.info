# Взаємодія: alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Ця частина посібника спрямована на розгляд JavaScript "як є", без спеціальних налаштувань середовища.

Але ми як і раніше будемо використовувати браузер як середовище для демонстрацій, тому ми повинні знати принаймні деякі з його функцій інтерфейсу користувача. У цьому розділі ми ознайомимося з функціями браузера `alert`, `prompt` та `confirm`.

## alert

Синтаксис:

```js
alert(message);
```

Ця функція показує повідомлення та призупиняє виконання скрипта поки користувач не натисне кнопку "OK".
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to presses "OK".
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Наприклад:

```js run
alert("Привіт");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Міні-вікно з повідомленням називається *модальним вікном*. Слово "модальний" означає, що відвідувач не може взаємодіяти з іншою частиною сторінки, натискати інші кнопки, тощо, поки він не завершить операції з вікном. У цьому випадку -- поки він не натисне "OK".
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

Функція `prompt` приймає два аргументи:

```js no-beautify
result = prompt(title, [default]);
```

Вона показує модальне вікно з текстовим повідомленням, полем введення для відвідувача, та кнопками ОК/Скасувати.

`title`
: Текст, який буде видображатися для відвідувача.

`default`
: Необов'язковий другий параметр, початкове значення для поля введення.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Відвідувач може ввести щось у поле введення запиту і натиснути ОК. Або він може скасувати введення, натиснувши Скасувати або натиснувши клавішу `key:Esc`.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter as optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Виклик `prompt` повертає текст з поля введення або `null`, якщо введення було скасовано.

Наприклад:

```js run
let age = prompt('Скільки вам років?', 100);

alert(`Вам ${age} років!`); // Вам 100 років!
```

````warn header="В IE: завжди вказуйте початкове значення `default`"
Другий параметр є необов'язковим, але якщо ми не надамо його, Internet Explorer вставить у рядок текст `"undefined"`.

Запустіть цей код в Internet Explorer, щоб побачити:

```js run
let test = prompt("Test");
```

Отже, щоб модальні вікна prompts добре виглядали у IE, ми рекомендуємо завжди надавати другий аргумент:

```js run
let test = prompt("Test", ''); // <-- для IE
```
````

## confirm

Синтаксис:

```js
result = confirm(question);
```

Функція `confirm` показує модальне вікно з `питанням` та двома кнопками: ОК та Скасувати.

Результат `true` якщо натиснути кнопку OK, інакше `false`.

Наприклад:

```js run
let isBoss = confirm("Ви бос?");

alert( isBoss ); // true якщо натуснута OK
```

## Підсумки

Ми вивчили 3 специфічні для браузера функції, для взаємодії з відвідувачами:

`alert`
: показує повідомлення.

`prompt`
: показує повідомлення з проханням ввести текст. Вона повертає текст або `null`, якщо натиснута кнопка Скасувати або клавіша `key:Esc`.

`confirm`
: показує повідомлення і чекає, коли користувач натисне "OK" або "CANCEL". Вона повертає `true` для ОК та `false` для Скасувати/`key:Esc`.

Всі ці методи є модальними: вони призупиняють виконання скриптів та не дозволяють відвідувачам взаємодіяти з рештою сторінки, поки вікно не буде відхилено.

Існують два обмеження, пов'язані з усіма методами вище:

1. Точне розташування модального вікна визначається браузером. Зазвичай це в центрі.
2. Точний вигляд вікна також залежить від браузера. Ми не можемо його змінити.

Це ціна за простоту. Є й інші способи показувати приємніші вікна та богатшу взаємодію з відвідувачем, але якщо "навороти" не мають значення, то ці методи працюють дуже добре.
