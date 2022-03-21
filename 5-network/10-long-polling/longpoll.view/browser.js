// Відправляємо повідомлення простим POST-запитом
function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// Отримуємо повідомлення за допомогою тривалого опитування
function SubscribePane(elem, url) {

  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // Тайм-аут з’єднання
      // відбувається, коли з’єднання було відкрито занадто довго,
      // відновлюємо з’єднання
      await subscribe();
    } else if (response.status != 200) {
      // Показуємо помилку
      showMessage(response.statusText);
      // Повторне підключення через одну секунду
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Отримано повідомлення
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();

}
