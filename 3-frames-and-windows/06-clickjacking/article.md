# Clickjacking атака

Атака типу "clickjacking" (англ. "захоплення кліка") дозволяє шкідливій сторінці натиснути посилання на "сайт-жертви" *від імені відвідувача*.

Багато сайтів були зламані подібним способом, включаючи Twitter, Facebook, Paypal та інші. Усі вони, звісно ж, зараз захищені.

## Ідея

Ідея дуже проста.

Ось як clickjacking було зроблено на Facebook:

1. Відвідувача заманюють на шкідливу сторінку. Не важливо як.
2. На сторінці є нешкідливе посилання (наприклад, "розбагатіти зараз" або "натисніть тут, дуже смішно").
3. Над цим посиланням шкідлива сторінка розміщує прозорий `<iframe>` з `src` з facebook.com таким чином, що кнопка "Подобається" знаходиться прямо над цим посиланням. Зазвичай це робиться за допомогою `z-index`.
4. Намагаючись натиснути посилання, відвідувач фактично натискає кнопку.

## Демо

Ось як виглядає шкідлива сторінка. Щоб було зрозуміло, `<iframe>` є напівпрозорим (на справжніх шкідливих сторінках він повністю прозорий):

```html run height=120 no-beautify
<style>
iframe { /* iframe із сайту жертви */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* насправді opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Натисніть, щоб розбагатіти зараз:</div>

<!-- URL-адреса з сайту-жертви -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Натісніть!</button>
*/!*

<div>...І ти крутий (насправді я крутий хакер)!</div>
```

Повна демонстрація атаки:

[codetabs src="clickjacking-visible" height=160]

Тут ми маємо напівпрозорий `<iframe src="facebook.html">`, і в прикладі ми бачимо його над кнопкою. Натискаючи кнопку користувач фактично натискає на iframe, але не бачить його, оскільки iframe прозорий.

Як наслідок, якщо відвідувач авторизований у Facebook (як правило, "запам’ятати мене" включено), він додає "подобається". У Twitter це була б кнопка "Підписатися".

Ось той самий приклад, але ближчий до реальності, з `opacity:0` для `<iframe>`:

[codetabs src="clickjacking" height=160]

Все, що нам потрібно для атаки – це розташувати `<iframe>` на шкідливій сторінці таким чином, щоб кнопка знаходилась прямо над посиланням. Таким чином, коли користувач натискає посилання, він фактично натискає кнопку. Зазвичай це можна зробити за допомогою CSS.

```smart header="Clickjacking призначений для кліків, а не для клавіатури"
Атака впливає лише на дії миші (або подібні, як-от натискання на мобільному пристрої).

Введення з клавіатури дуже важко переспрямувати. Технічно, якщо у нас є текстове поле для зламу, ми можемо розташувати iframe таким чином, щоб текстові поля перекривали одне одного. Тому, коли відвідувач намагається сфокосуватися на текстовому полі, яке він бачить на сторінці, він фактично фокусується на полі всередині iframe.

Але тоді виникає проблема. Усе, що введе відвідувач, буде приховано, оскільки iframe не видно.

Люди зазвичай припиняють вводити текст, коли не бачать, як на екрані друкуються нові символи.
```

## Приклади слабкого захисту

Найстаріший спосіб захисту — це код JavaScript, який забороняє відкривати сторінку у фреймі (так званий "framebusting").

Це виглядає так:

```js
if (top != window) {
  top.location = window.location;
}
```

Тобто: якщо вікно дізнається, що воно не зверху, то воно автоматично стає верхнім.

Це не надійніший засіб захисту, тому що є багато способів зламати його. Давайте розглянемо декілька.

### Блокування top-навігації

Ми можемо заблокувати перехід, викликаний зміною `top.location` в обробнику події [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload).

Зовнішня сторінка (що належить хакеру) встановлює обробник події для запобігання, наприклад:

```js
window.onbeforeunload = function() {
  return false;
};
```

Коли `iframe` намагається змінити `top.location`, відвідувач отримує повідомлення із запитом, чи хоче він піти.

У більшості випадків відвідувач відповість негативно, тому що він не знає про iframe – все, що він бачить, це верхня сторінка, немає причин залишати її. Тож `top.location` не зміниться!

В дії:

[codetabs src="top-location"]

### Атрибут sandbox

Однією з речей, обмежених атрибутом `sandbox` є навігація. Ізольований iframe може не змінювати `top.location`.

Тож ми можемо додати iframe за допомогою `sandbox="allow-scripts allow-forms"`. Це послабить обмеження, дозволивши сценарії та форми. Але ми опускаємо `allow-top-navigation`, щоб заборонити зміну `top.location`.

Ось код:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Є й інші способи обходу цього простого захисту.

## Опції X-Frame

Заголовок на стороні сервера `X-Frame-Options` може дозволяти або забороняти відображення сторінки всередині фрейму.

Він має бути надісланий точно як HTTP-заголовок: браузер проігнорує його, якщо знайде в HTML `<meta>` тегу. Отже, `<meta http-equiv="X-Frame-Options"...>` нічого не дасть.

Заголовок може мати 3 значення:


`DENY`
: Ніколи не показувати сторінку всередині фрейму.

`SAMEORIGIN`
: Дозволити всередині фрейму, якщо батьківський документ походить із того самого джерела.

`ALLOW-FROM domain`
: Дозволити всередині фрейму, якщо батьківський документ із заданого домену.

Наприклад, Twitter використовує `X-Frame-Options: SAMEORIGIN`.

````online
Ось результат:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Залежно від вашого браузера, `iframe` вище або порожній, або попереджає вас про те, що браузер не дозволяє відобразити цю сторінку.
````

## Відображення з вимкненою функціональністю

Заголовок `X-Frame-Options` має побічний ефект. Інші сайти не зможуть показати нашу сторінку у фреймі, навіть якщо у них є для цього вагомі причини.

Тому є інші рішення...Наприклад, ми можемо "покрити" сторінку `<div>` зі стилями `height: 100%; width: 100%;`, щоб він перехоплював усі клацання. Цей `<div>` можна видалити, якщо `window == top` або якщо ми зрозуміли, що захист нам не потрібен.

Щось на зразок цього:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Перейти на сайт</a>
</div>

<script>
  // буде помилка, якщо верхнє вікно має інше походження
  // але тут гаразд
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

Демо:

[codetabs src="protector"]

## Атрибут cookie: samesite 

Атрибут cookie `samesite` також може запобігти атакам клікджекінгу.

Файл cookie з таким атрибутом надсилається на веб-сайт, лише якщо його відкрито безпосередньо, а не через фрейм чи іншим чином. Більше інформації в розділі <info:cookie#samesite>.

Якби сайт, наприклад Facebook, при аутентифікації мав атрибут `samesite` у файлі cookie , наприклад:

```
Set-Cookie: authorization=secret; samesite
```

...Тоді такий файл cookie не надсилатиметься, коли Facebook буде відкрито в iframe з іншого сайту. Тож атака не вдасться.

Атрибут cookie `samesite` не матиме ефекту, якщо файли cookie не використовуються. Це може дозволити іншим веб-сайтам легко показувати наші загальнодоступні, неавтентифіковані сторінки в iframes.

Однак це також може дозволяти атакам за допомогою clickjacking працювати в кількох обмежених випадках. Наприклад, веб-сайт анонімного опитування, який запобігає дублюванню голосування шляхом перевірки IP-адреси, все одно буде вразливим до клікджекінгу, оскільки він не автентифікує користувачів за допомогою файлів cookie.

## Summary

Clickjacking is a way to "trick" users into clicking on a victim site without even knowing what's happening. That's dangerous if there are important click-activated actions.

A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

From one perspective -- the attack is "not deep": all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

The attack is quite dangerous, because when we engineer the UI we usually don't anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It is recommended to use `X-Frame-Options: SAMEORIGIN` on pages (or whole websites) which are not intended to be viewed inside frames.
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, but still stay safe.
