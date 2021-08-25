function camelize(str) {
  return str
    .split('-') // розбиваємо 'my-long-word' на масив елементів ['my', 'long', 'word']
    .map(
      // робимо першу літеру велику для всіх елементів масиву, крім першого
      // конвертуємо ['my', 'long', 'word'] в ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // зʼєднуємо ['my', 'Long', 'Word'] в 'myLongWord'
}
