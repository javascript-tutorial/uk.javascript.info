'use strict';

// Ось короткий нарис класу
// з речами, які все одно знадобляться
class HoverIntent {

  constructor({
    sensitivity = 0.1, // швидкість менше 0,1 пікселів/мс означає "наведення вказівника на елемент"
    interval = 100, // вимірювати швидкість миші раз на 100ms: обчислити відстань між попередньою та наступною точками
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // переконайтеся, що "this" є нашим об’єктом в обробниках подій.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // додамо обробники
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // ми зробили що могли, далі ви вже самі ;)

  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }


  destroy() {
    /* ваш код, щоб "вимкнути" функціональність, видаліть усі обробники */
    /* це потрібно для роботи тестів */
  }

}
