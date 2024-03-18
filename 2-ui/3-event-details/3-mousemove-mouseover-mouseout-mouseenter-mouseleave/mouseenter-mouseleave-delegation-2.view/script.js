// <td> під вказівником прямо зараз (якщо є)
let currentElem = null;

table.onmouseover = function(event) {
  // перед переходом до нового елемента миша завжди залишає попередній
  // якщо вже встановлено currentElem, то ми ще не залишили попередній <td>,
  // і цей mouseover відбувається всередині, тому ігноруємо подію
  if (currentElem) return;

  let target = event.target.closest('td');

  // ми перейшли не в <td> - ігнорувати
  if (!target) return;

  // переміщено в <td>, але за межами нашої таблиці (можливо у випадку вкладених таблиць)
  // ігнорувати
  if (!table.contains(target)) return;

  // ура! ми перейшли до нового <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // якщо ми зараз поза будь-яким <td>, тоді ігноруємо подію
  // це, мабуть, переміщення всередину таблиці, але поза <td>,
  // напр. від <tr> до іншого <tr>
  if (!currentElem) return;

  // покидаємо елемент – але куди? Може ідемо до дочірнього елемента?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // піднімаємось батьківським ланцюжком і перевіряємо – чи ми все ще всередині currentElem
    // тоді це внутрішній перехід – ігноруємо його
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // ми залишили <td>. насправді.
  onLeave(currentElem);
  currentElem = null;
};

// будь-які функції для обробки входу/виходу з елемента
function onEnter(elem) {
  elem.style.background = 'pink';

  // показати це в textarea
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // показати це в textarea
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
