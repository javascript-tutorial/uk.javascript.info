function isEmpty(obj) {
  for (let key in obj) {
    // якщо цикл розпочався, властивість є
    return false;
  }
  return true;
}
