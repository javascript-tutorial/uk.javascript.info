
# Елемент таймера в режимі реального часу

У нас вже є елемент `<time-formatted>` для відображення гарно відформатованого часу.

Створіть елемент `<live-timer>` для відображення поточного часу:
1. Він повинен використовувати `<time-formatted>` всередині, а не дублювати його функціонал.
2. Оновлюватися щосекунди.
3. Для кожного оновлення має генеруватися користувацька подія з назвою `tick`, з поточною датою у `event.detail` (див. розділ <info:dispatch-events>).

Використання:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Демонстрація:

[iframe src="solution" height=40]
