Спочатку, напишемо HTML/CSS.

Кожен компонент часу обгорнемо у `<span>`:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Розфарбуємо кожен `<span>` за допомогою CSS.

Функція `update` оновлюватиме годинник, а метод `setInterval` викликатиме її щосекунди. 

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

В рядку `(*)` ми щоразу перевіряємо поточну дату. Виклики `setInterval` не надійні: вони можуть відбуватися з затримкою.

Функція для управління годинником:

```js
let timerId;

function clockStart() { // увімкнути годинник  
  if (!timerId) { // встановити новий інтервал, якщо годинник не увімкнений
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Будь ласка, зверніть увагу, що виклик `update()` не тільки заплановано в `clockStart()`, а ще й негайно виконується в рядку `(*)`. Інакше відвідувач повинен був би чекати до першого виконання `setInterval`. І до того часу годинник був би порожнім.

Також важливо встановити новий інтервал у `clockStart()` лише тоді, коли годинник не працює. Інакше натискання кнопки «Пуск» кілька разів встановить кілька одночасних інтервалів. Ще гірше -- ми запам’ятаємо лише `timerID` останнього інтервалу, втративши посилання на всі інші. В такому разі ми б ніколи більше не змогли зупинити годинник! Зауважте, в рядку `(**)` нам потрібно очистити `timerID`, коли годинник зупинено, щоб його можна було знову увімкнути, запустивши `clockStart()`.
