
```js run
let room = {
  number: 23
};

let meetup = {
  title: "Конференція",
  occupiedBy: [{name: "Іван"}, {name: "Аліса"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));

/* 
{
  "title":"Конференція",
  "occupiedBy":[{"name":"Іван"},{"name":"Аліса"}],
  "place":{"number":23}
}
*/
```

Тут нам також потрібно перевірити `key==""`, щоб виключити перший виклик, де значення `value` рівне `meetup`.

