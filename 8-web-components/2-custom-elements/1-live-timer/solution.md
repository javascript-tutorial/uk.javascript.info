
Зверніть увагу:
1. Ми очищаємо таймер `setInterval`, коли елемент видаляється з документа. Це важливо, інакше він продовжує працювати, навіть якщо більше не потрібен. І браузер не зможе очистити пам'ять від цього елемента і посилань на нього.
2. Ми можемо отримати доступ до поточної дати через властивість `elem.date`. Усі методи та властивості класу є методами та властивостями елементів.
