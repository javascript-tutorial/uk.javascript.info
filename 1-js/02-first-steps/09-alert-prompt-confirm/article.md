# Взаємодія: alert, prompt, confirm

Ця частина підручника спрямована на розглядання JavaScript "як є", без спеціальних налаштувань середовища.

Але ми як і раніше будемо використовувати браузер як середовище для демонстрацій, тому ми повинні знати принаймні деякі з його функцій інтерфейсу користувача. У цьому розділі ми ознайомимося з функціями браузера `alert`, `prompt` та `confirm`.

## alert

Синтаксис:

```js
alert(message);
```

Ця функція показує повідомлення та призупиняє виконання скрипта поки користувач не натисне кнопку "OK".

Наприклад:

```js run
alert("Привіт");
```

Міні-вікно з повідомленням називається *модальним вікном*. Слово "модальний" означає, що відвідувач не може взаємодіяти з іншою частиною сторінки, натискати інші кнопки, тощо, поки він не завершить операціх з вікном. У цьому випадку -- поки він не натисне "OK".

## prompt

Функція `prompt` приймає два аргументи:

```js no-beautify
result = prompt(title, [default]);
```

Вона показує модальне вікно з текстовим повідомленням, полем введення для відвідувача, та кнопками OK/CANCEL.

`title`
: Текст, який буде видображатися для відвідувача.

`default`
: Необов'язковий другий параметр, початкове значення для поля введення.

The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing CANCEL or hitting the `key:Esc` key.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.

For instance:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:

```js run
let test = prompt("Test");
```

So, for prompts to look good in IE, we recommend always providing the second argument:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

The syntax:

```js
result = confirm(question);
```

The function `confirm` shows a modal window with a `question` and two buttons: OK and CANCEL.

The result is `true` if OK is pressed and `false` otherwise.

For example:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if CANCEL or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "CANCEL". It returns `true` for OK and `false` for CANCEL/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
