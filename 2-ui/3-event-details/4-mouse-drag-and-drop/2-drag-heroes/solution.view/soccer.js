let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // на початку переміщення елемента:
  //  запам'ятовуємо місце кліку по елементу (shiftX, shiftY) ,
  //  перемикаємо позиціонування елемента (position: fixed) і рухаємо елемент
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // перемикаємося назад на абсолютні координати
  // щоб закріпити елемент відносно документа
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // обчислюємо нові координати (відносно вікна)
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // перевіряємо, чи не переходять нові координати за нижній край вікна:
    // спочатку обчислюємо гіпотетичний новий нижній край вікна
    let newBottom = newY + dragElement.offsetHeight;

    // новий край вікна виходить за межі документа? прокручуємо сторінку
    if (newBottom > document.documentElement.clientHeight) {
      // координата нижнього краю документа щодо вікна
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // скролл документа на 10px вниз має проблему -
      // він може прокручувати документ за його межі,
      // тому використовуємо Math.min (відстань до кінця, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // обчислення можуть бути не зовсім точні - трапляються помилки при округленні,
      // які призводять до негативного значенням прокрутки. відфільтруємо їх:
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // швидке переміщення миші може помістити курсор за межі документа вниз
      // якщо це сталося -
      // обмежуємо нове значення Y максимально можливим виходячи з розміру документа:
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // перевіряємо, чи не переходять нові координати за верхній край вікна (по схожому алгоритму)
    if (newY < 0) {
      // scroll up
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // перевіряємо помилки точності

      window.scrollBy(0, -scrollY);
      // швидке переміщення миші може помістити курсор за межі документа вгору
      newY = Math.max(newY, 0); // newY не може бути менше нуля
    }


    // обмежимо newX розмірами вікна
    // згідно з умовою, горизонтальна прокрутка відсутня, тому це не складно:
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});
