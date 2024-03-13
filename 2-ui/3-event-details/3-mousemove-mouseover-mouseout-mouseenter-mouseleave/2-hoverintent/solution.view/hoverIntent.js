'use strict';

class HoverIntent {

  constructor({
    sensitivity = 0.1, // швидкість менше 0,1 пікселів/мс означає "наведення вказівника на елемент"
    interval = 100,    // вимірювати швидкість миші раз на 100ms: обчислити відстань між попередньою та наступною точками
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // переконайтеся, що "this" є нашми об’єктом в обробниках подій.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // і у функції вимірювання часу (викликається з setInterval)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);

  }

  onMouseOver(event) {

    if (this.isOverElement) {
      // якщо ми знову пройшли над елементом, ігноруємо подію
      // ми вже вимірюємо швидкість
      return;
    }

    this.isOverElement = true;

    // після кожного руху миші ми будемо перевіряти відстань
    // між попередньою та поточною координатами миші
    // якщо менше ніж значення sensitivity, швидкість повільна

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener('mousemove', this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // якщо залишили елемент
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // якщо була зупинка над елементом
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {

    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // вказівник не рухався
      speed = 0;
    } else {
      speed = Math.sqrt(
        Math.pow(this.prevX - this.lastX, 2) +
        Math.pow(this.prevY - this.lastY, 2)
      ) / (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem);
    } else {
      // якщо рухається швидко, записуємо нові координати як попередні
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }

}
