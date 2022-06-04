# Server Sent Events

Специфікація [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) описує вбудований клас `EventSource`, який підтримує з’єднання з сервером і дозволяє отримувати від нього події.

Подібно до `WebSocket`, з’єднання є постійним.

Але є кілька важливих відмінностей:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Двонаправлений: клієнт і сервер можуть обмінюватися повідомленнями | Односпрямований: дані надсилає лише сервер |
| Двійкові та текстові дані | Тільки текст |
| WebSocket протокол | Звичайний HTTP |

`EventSource` є менш потужним способом зв’язку з сервером, ніж `WebSocket`.

Навіщо його використовувати?

Основна причина: він простіший. У багатьох програмах потужність `WebSocket` є дещо занадто великою.

Нам потрібно отримати потік даних із сервера: можливо, повідомлення в чаті чи ринкові ціни, чи що завгодно. Це те, у чому сильный `EventSource`. Також він підтримує автоматичне перепідключення, що зазвичай потрібно реалізовувати вручну за допомогою `WebSocket`. Крім того, це звичайний старий HTTP, а не новий протокол.

## Отримання повідомлень

Щоб почати отримувати повідомлення, необхідно створити `new EventSource(url)`.

Браузер підключиться до `url` і залишить з’єднання відкритим, чекаючи на події.

Сервер повинен відповісти статусом 200 і заголовком `Content-Type: text/event-stream`, а потім зберегти з’єднання та писати повідомлення в спеціальному форматі, наприклад:

```
data: Повідомлення 1

data: Повідомлення 2

data: Повідомлення 3
data: з двох рядків
```

- Текст повідомлення йде після `data:`, пробіл після двокрапки необов’язковий.
- Повідомлення розділені подвійними розривами рядків `\n\n`.
- Щоб надіслати розрив рядка `\n`, ми можемо негайно надіслати ще одне `data:` (3-е повідомлення вище).

На практиці складні повідомлення зазвичай надсилаються в кодуванні JSON. Розриви рядків у них кодуються як `\n`, тому багаторядкові повідомлення `data:` не потрібні.

Наприклад:

```js
data: {"user":"Тарас","message":"Перший рядок*!*\n*/!* Другий рядок"}
```

...Отже, можемо припустити, що один `data:` містить рівно одне повідомлення.

Для кожного такого повідомлення генерується подія `message`:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("Нове повідомлення", event.data);
  // буде зареєстровано 3 рази для потоку даних вище
};

// чи eventSource.addEventListener('message', ...)
```

### Запити з перехресних доменів

`EventSource` підтримує запити між різними джерелами, як-от `fetch` та будь-які інші мережеві методи. Ми можемо використовувати будь-яку URL-адресу:

```js
let source = new EventSource("https://another-site.com/events");
```

Віддалений сервер отримає заголовок `Origin` і повинен відповісти `Access-Control-Allow-Origin` , щоб продовжити.

Щоб передати облікові дані, ми повинні встановити додатковий параметр `withCredentials`, наприклад:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Будь ласка, перегляньте розділ <info:fetch-crossorigin>, щоб дізнатися більше про заголовки з перехресними джерелами.


## Повторне з’єднання

Після створення `new EventSource` підключається до сервера, і якщо з’єднання розривається - автоматично підключається знову.

Це дуже зручно, оскільки не потрібно дбати про це.

Між повторними з’єднаннями є невелика затримка, за замовчуванням кілька секунд.

Сервер може встановити рекомендовану затримку, використовуючи `retry:` у відповідь (у мілісекундах):

```js
retry: 15000
data: Привіт, я встановив затримку повторного з’єднання на 15 секунд
```

`retry:` може надсилатись як разом із деякими даними, так і окремим повідомленням.

Браузер повинен зачекати вказану кількість мілісекунд перед повторним з’єднанням. Або довше, напр. якщо браузер знає (з ОС), що на даний момент немає підключення до мережі, він може зачекати, доки з’єднання з’явиться, а потім повторити спробу.

- Якщо сервер бажає, щоб браузер припинив повторне з’єднання, він повинен відповісти HTTP статусом 204.
- Якщо браузер хоче закрити з’єднання, він повинен викликати `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

Крім того, не буде повторного з’єднання, якщо відповідь містить неправильний `Content-Type` або його статус HTTP відрізняється від 301, 307, 200 і 204. У таких випадках буде створено подію `"помилка"`, і браузер не підключатиметься повторно.

```smart
Коли з’єднання остаточно закрито, його неможливо «відкрити» знову. Якщо ми хочемо знову під’єднатися, доведеться створити новий `EventSource`.
```

## Ідентифікатор повідомлення

Коли з’єднання розривається через проблеми з мережею, жодна сторона не може бути впевнена, які повідомлення були отримані, а які ні.

Щоб правильно відновити з’єднання, кожне повідомлення має мати поле `id`, наприклад:

```
data: Повідомлення 1
id: 1

data: Повідомлення 2
id: 2

data: Повідомлення 3
data: з двох рядків
id: 3
```

Коли повідомлення з `id:` отримане браузером:

- Встановлюється значення властивості `eventSource.lastEventId`.
- Після повторного підключення надсилається заголовок `Last-Event-ID` з цим `id`, щоб сервер міг повторно надіслати наступні повідомлення.

```smart header="Зазначайте `id:` після `data:`"
Зверніть увагу: `id` додається сервером під повідомленням `data` , щоб гарантувати, що `lastEventId` оновлюється після отримання повідомлення.
```

## Статус підключення: readyState

The `EventSource` object has `readyState` property, that has one of three values:

```js no-beautify
EventSource.CONNECTING = 0; // connecting or reconnecting
EventSource.OPEN = 1;       // connected
EventSource.CLOSED = 2;     // connection closed
```

When an object is created, or the connection is down, it's always `EventSource.CONNECTING` (equals `0`).

We can query this property to know the state of `EventSource`.

## Event types

By default `EventSource` object generates three events:

- `message` -- a message received, available as `event.data`.
- `open` -- the connection is open.
- `error` -- the connection could not be established, e.g. the server returned HTTP 500 status.

The server may specify another type of event with `event: ...` at the event start.

For example:

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

To handle custom events, we must use `addEventListener`, not `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## Full example

Here's the server that sends messages with `1`, `2`, `3`, then `bye` and breaks the connection.

Then the browser automatically reconnects.

[codetabs src="eventsource"]

## Summary

`EventSource` object automatically establishes a persistent connection and allows the server to send messages over it.

It offers:
- Automatic reconnect, with tunable `retry` timeout.
- Message ids to resume events, the last received identifier is sent in `Last-Event-ID` header upon reconnection.
- The current state is in the `readyState` property.

That makes `EventSource` a viable alternative to `WebSocket`, as the latter is more low-level and lacks such built-in features (though they can be implemented).

In many real-life applications, the power of `EventSource` is just enough.

Supported in all modern browsers (not IE).

The syntax is:

```js
let source = new EventSource(url, [credentials]);
```

The second argument has only one possible option: `{ withCredentials: true }`, it allows sending cross-origin credentials.

Overall cross-origin security is same as for `fetch` and other network methods.

### Properties of an `EventSource` object

`readyState`
: The current connection state: either `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` or `EventSource.CLOSED (=2)`.

`lastEventId`
: The last received `id`. Upon reconnection the browser sends it in the header `Last-Event-ID`.

### Methods

`close()`
: Closes the connection.

### Events

`message`
: Message received, the data is in `event.data`.

`open`
: The connection is established.

`error`
: In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check `readyState` to see if the reconnection is being attempted.

The server may set a custom event name in `event:`. Such events should be handled using `addEventListener`, not `on<event>`.

### Server response format

The server sends messages, delimited by `\n\n`.

A message may have following fields:

- `data:` -- message body, a sequence of multiple `data` is interpreted as a single message, with `\n` between the parts.
- `id:` -- renews `lastEventId`, sent in `Last-Event-ID` on reconnect.
- `retry:` -- recommends a retry delay for reconnections in ms. There's no way to set it from JavaScript.
- `event:` -- event name, must precede `data:`.

A message may include one or more fields in any order, but `id:` usually goes the last.
