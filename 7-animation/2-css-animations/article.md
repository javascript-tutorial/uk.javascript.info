# CSS-анімації

CSS-анімація дає змогу робити прості анімації взагалі без JavaScript.

JavaScript можна використовувати для керування анімацією CSS та покращення її використовуючи трохи коду.

## CSS-переходи [#css-transition]

Ідея переходів CSS проста. Ми описуємо властивість і як її зміни мають бути анімовані. Коли властивість змінюється, браузер малює анімацію.

Тобто все, що нам потрібно, це змінити властивість, і плавний перехід буде здійснюватися браузером.

Наприклад, наведений нижче CSS анімує зміни `background-color` протягом 3 секунд:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Якщо елемент має клас `.animated`, будь-яка зміна `background-color` анімується протягом 3 секунд.

Натисніть кнопку нижче, щоб анімувати фон:

```html run autorun height=60
<button id="color">Натисни мене</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

Є 4 властивості для опису переходів CSS:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

Зараз ми їх розглянемо, а поки зазначимо, що загальна властивість `transition` дозволяє оголошувати їх разом у порядку: `property duration timing-function delay`, а також анімувати декілька властивостей одночасно.

Наприклад, ця кнопка анімує і `color`, і `font-size` одночасно:  

```html run height=80 autorun no-beautify
<button id="growing">Натисни мене</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

Тепер розглянемо властивості анімації по черзі.

## transition-property

У `transition-property` ми пишемо список властивостей для анімації, наприклад: `left`, `margin-left`, `height`, `color`. Або можемо написати "all", що означає "анімувати всі властивості".

Зауважте, що є властивості, які не можна анімувати. Однак [більшість загальновживаних властивостей є анімаційними](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## transition-duration

У `transition-duration` вказуємл, скільки часу має займати анімація. Час має бути в [форматі часу CSS](http://www.w3.org/TR/css3-values/#time): в секундах `s` або мілісекундах `ms`.

## transition-delay

У `transition-delay` ми вказуємо затримку *перед* анімацією. Наприклад, якщо `transition-delay` дорівнює `1s`, а `transition-duration` - `2s`, то анімація починається через 1 секунду після зміни властивості, а загальна тривалість становитиме 2 секунди.  

Можливі й негативні значення. Тоді анімація відображається відразу, але початкова точка анімації буде після заданого значення (часу). Наприклад, якщо `transition-delay` дорівнює `-1s`, а `transition-duration` дорівнює 2с, то анімація починається з середини, а загальна тривалість становитиме 1 секунду.

Ця анімація переміщує числа з `0` на `9` за допомогою властивості `translate` CSS:

[codetabs src="digits"]

Властивість `transform` анімується так:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

У наведеному вище прикладі JavaScript додає клас `.animate` до елемента -- і починається анімація:

```js
stripe.classList.add('animate');
```

Ми також могли б розпочати її десь із середини, точного вказавши число, напр. відповідно до поточної секунди, використовуючи негативне значення `transition-delay`.

Якщо ви зараз клацнете цифру - анімація почеться з поточної секунди:

[codetabs src="digits-negative-delay"]

JavaScript робить це за допомогою додаткового рядка:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // наприклад, -3s запускає анімацію з 3-ї секунди
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

Функція хронометражу описує, як процес анімації розподіляється по часовій шкалі. Почнеться повільно, а потім швидко, чи навпаки.

Спочатку це здається найскладнішою властивістю. Але все стає дуже просто, якщо ми приділимо цьому трохи часу.

Ця властивість приймає два види значень: крива Без'є або кроки. Почнемо з кривої, оскільки вона використовується частіше.

### Крива Без'є

Функцію хронометражу можна встановити як [криву Без'є](/bezier-curve) з 4 контрольними точками, які задовольняють умовам:

1. Перша контрольна точка: `(0,0)`.
2. Остання контрольна точка: `(1,1)`.
3. Для проміжних точок значення `x` мають бути в інтервалі `0..1`, `y` може бути будь-яким.

Синтаксис кривої Без'є в CSS: `cubic-bezier(x2, y2, x3, y3)`. Тут нам потрібно вказати лише 2-ю і 3-ю контрольні точки, тому що 1-а фіксована на `(0,0)`, а 4-а — `(1,1)`.

Функція часу описує, наскільки швидко проходить процес анімації.

- Вісь `x` - це час: `0` - початок, `1` - кінець `transition-duration`.
- Вісь `y` визначає завершення процесу: `0` -- початкове значення властивості, `1` -- кінцеве.

Найпростіший варіант – коли анімація йде рівномірно, з однаковою лінійною швидкістю. За допомогою кривої це можна визначити `cubic-bezier(0, 0, 1, 1)`.

Ось як виглядає ця крива:

![](bezier-linear.svg)

...Як бачимо, це просто пряма лінія. З плином часу (`x`) завершення (`y`) анімації постійно змінюється від `0` до `1`.

Потяг у прикладі нижче рухається зліва направо з постійною швидкістю (натисніть):

[codetabs src="train-linear"]

Властивість `transition` заснована на цій кривій:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* натискаючи на поїзд властивість left стає 450px, анімація запускається */
}
```

...А як ми можемо показати, що потяг гальмує?

Ми можемо використати іншу криву Без'є: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

Графік:

![](train-curve.svg)

Як бачимо, процес починається швидко: крива злітає вгору, а потім все повільніше.

Ось функція часу в дії (натисніть на потяг):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* натискаючи на поїзд властивість left стає 450px, анімація запускається */
}
```

Існує кілька вбудованих кривих: `linear`, `ease`, `ease-in`, `ease-out` та `ease-in-out`.

`linear` це скорочення від `cubic-bezier(0, 0, 1, 1)` -- пряма лінія, яку ми вже описували.

Інші назви є скороченнями наступних `cubic-bezier`:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- типово, якщо функція часу не встановлена, використовується `ease`.

Тож ми могли б використовувати `ease-out` для нашого потягу, що сповільнюється:


```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* те саме як transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Але виглядає це трохи інакше.

**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.

In the example below the animation code is:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* click on a train sets left to 450px */
}
```

The property `left` should animate from `100px` to `400px`.

But if you click the train, you'll see that:

- First, the train goes *back*: `left` becomes less than `100px`.
- Then it goes forward, a little bit farther than `400px`.
- And then back again -- to `400px`.

[codetabs src="train-over"]

Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.svg)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` -- past the final `left`.

That's a "soft" variant for sure. If we put `y` values like `-99` and `99` then the train would jump out of the range much more.

But how do we make a Bezier curve for a specific task? There are many tools. For instance, we can do it on the site <http://cubic-bezier.com/>.

### Steps

The timing function `steps(number of steps[, start/end])` allows splitting an transition into multiple steps.

Let's see that in an example with digits.

Here's a list of digits, without any animations, just as a source:

[codetabs src="step-list"]

We'll make the digits appear in a discrete way by making the part of the list outside of the red "window" invisible and shifting the list to the left with each step.

There will be 9 steps, a step-move for each digit:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

In action:

[codetabs src="step"]

The first argument of `steps(9, start)` is the number of steps. The transform will be split into 9 parts (10% each). The time interval is automatically divided into 9 parts as well, so `transition: 9s` gives us 9 seconds for the whole animation – 1 second per digit.

The second argument is one of two words: `start` or `end`.

The `start` means that in the beginning of animation we need to make the first step immediately.

We can observe that during the animation: when we click on the digit it changes to `1` (the first step) immediately, and then changes in the beginning of the next second.

The process is progressing like this:

- `0s` -- `-10%` (first change in the beginning of the 1st second, immediately)
- `1s` -- `-20%`
- ...
- `8s` -- `-90%`
- (the last second shows the final value).

The alternative value `end` would mean that the change should be applied not in the beginning, but at the end of each second.

So the process for `steps(9, end)` would go like this:

- `0s` -- `0` (during the first second nothing changes)
- `1s` -- `-10%` (first change at the end of the 1st second)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Here's `steps(9, end)` in action (note the pause between the first digit change):

[codetabs src="step-end"]

There are also shorthand values:

- `step-start` -- is the same as `steps(1, start)`. That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
- `step-end` -- the same as `steps(1, end)`: make the animation in a single step at the end of `transition-duration`.

These values are rarely used, because that's not really animation, but rather a single-step change.

## Event transitionend

When the CSS animation finishes the `transitionend` event triggers.

It is widely used to do an action after the animation is done. Also we can join animations.

For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

The event object for `transitionend` has a few specific properties:

`event.propertyName`
: The property that has finished animating. Can be good if we animate multiple properties simultaneously.

`event.elapsedTime`
: The time (in seconds) that the animation took, without `transition-delay`.

## Keyframes

We can join multiple simple animations together using the `@keyframes` CSS rule.

It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.

Here's an example with explanations:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* give it a name: "go-left-right" */
    from { left: 0px; }             /* animate from left: 0px */
    to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* apply the animation "go-left-right" to the element
       duration 3 seconds
       number of times: infinite
       alternate direction every time
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

There are many articles about `@keyframes` and a [detailed specification](https://drafts.csswg.org/css-animations/).

You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.

## Performance

Most CSS properties can be animated, because most of them are numeric values. For instance, `width`, `color`, `font-size` are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

However, not all animations will look as smooth as you'd like, because different CSS properties cost differently to change.

In more technical details, when there's a style change, the browser goes through 3 steps to render the new look:

1. **Layout**: re-compute the geometry and position of each element, then
2. **Paint**: re-compute how everything should look like at their places, including background, colors,
3. **Composite**: render the final results into pixels on screen, apply CSS transforms if they exist.

During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as `color`, may skip the Layout step. If a `color` changes, the browser  doesn't calculate any new geometry, it goes to Paint -> Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at <https://csstriggers.com>.

The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to "jittery", less fluid animations.

Animations of properties that skip the Layout step are faster. It's even better if Paint is skipped too.

The `transform` property is a great choice, because:
- CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
- CSS transforms never affect neighbour elements.

...So browsers apply `transform` "on top" of existing Layout and Paint calculations, in the Composite stage.

In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies `transform` to element boxes that need it.

Changes (animations) of the `transform` property never trigger Layout and Paint steps. More than that, the browser  leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very efficient.

Luckily, the `transform` property is very powerful. By using `transform` on an element, you could rotate and flip it, stretch and shrink it, move it around, and [much more](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). So instead of `left/margin-left` properties we can use `transform: translateX(…)`, use `transform: scale` for increasing element size, etc.

The `opacity` property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

Paring `transform` with `opacity` can usually solve most of our needs, providing fluid, good-looking animations.

For example, here clicking on the `#boat` element adds the class with `transform: translateX(300)` and `opacity: 0`, thus making it move `300px` to the right and disappear:

```html run height=260 autorun no-beautify
<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>
```

Here's a more complex example, with `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>
```

## Summary

CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

They are good for most animation tasks. We're also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.

But in the next chapter we'll do some JavaScript animations to cover more complex cases.
