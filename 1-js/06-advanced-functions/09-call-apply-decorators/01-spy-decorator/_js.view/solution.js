function spy(func) {
  function wrapper(...args) {
    // використовуємо ...args замість arguments щоб можна було зберігати "справжній" масив в wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
