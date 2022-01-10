function concat(arrays) {
  // сума довжин всіх масивів
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

  // копіюємо кожний масив в result
  // наступний масив буде скопійовано одразу після попереднього
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
