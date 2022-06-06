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

### Sandbox attribute

One of the things restricted by the `sandbox` attribute is navigation. A sandboxed iframe may not change `top.location`.

So we can add the iframe with `sandbox="allow-scripts allow-forms"`. That would relax the restrictions, permitting scripts and forms. But we omit `allow-top-navigation` so that changing `top.location` is forbidden.

Here's the code:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

There are other ways to work around that simple protection too.

## X-Frame-Options

The server-side header `X-Frame-Options` can permit or forbid displaying the page inside a frame.

It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML `<meta>` tag. So, `<meta http-equiv="X-Frame-Options"...>` won't do anything.

The header may have 3 values:


`DENY`
: Never ever show the page inside a frame.

`SAMEORIGIN`
: Allow inside a frame if the parent document comes from the same origin.

`ALLOW-FROM domain`
: Allow inside a frame if the parent document is from the given domain.

For instance, Twitter uses `X-Frame-Options: SAMEORIGIN`.

````online
Here's the result:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Depending on your browser, the `iframe` above is either empty or alerting you that the browser won't permit that page to be navigating in this way.
````

## Showing with disabled functionality

The `X-Frame-Options` header has a side-effect. Other sites won't be able to show our page in a frame, even if they have good reasons to do so.

So there are other solutions... For instance, we can "cover" the page with a `<div>` with styles `height: 100%; width: 100%;`, so that it will intercept all clicks. That `<div>` is to be removed if `window == top` or if we figure out that we don't need the protection.

Something like this:

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
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // there will be an error if top window is from the different origin
  // but that's ok here
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

The demo:

[codetabs src="protector"]

## Samesite cookie attribute

The `samesite` cookie attribute can also prevent clickjacking attacks.

A cookie with such attribute is only sent to a website if it's opened directly, not via a frame, or otherwise. More information in the chapter <info:cookie#samesite>.

If the site, such as Facebook, had `samesite` attribute on its authentication cookie, like this:

```
Set-Cookie: authorization=secret; samesite
```

...Then such cookie wouldn't be sent when Facebook is open in iframe from another site. So the attack would fail.

The `samesite` cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.

## Summary

Clickjacking is a way to "trick" users into clicking on a victim site without even knowing what's happening. That's dangerous if there are important click-activated actions.

A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

From one perspective -- the attack is "not deep": all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

The attack is quite dangerous, because when we engineer the UI we usually don't anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It is recommended to use `X-Frame-Options: SAMEORIGIN` on pages (or whole websites) which are not intended to be viewed inside frames.
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, but still stay safe.
