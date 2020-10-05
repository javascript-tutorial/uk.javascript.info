

```js no-beautify
5 > 4 → true
"ананас" > "яблуко" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Ось чому такі результати:

<<<<<<< HEAD
1. Очевидно, 5 більше за 4. `true`.
2. Посимвольне порівняння, тому `false`. `"а"` менше за `"я"`.
3. Знову посимвольне порівняння. Перший символ рядка `"2"` більший за перший символ другого рядка — `"1"`.
4. Спеціальний випадок. Значення `null` і `undefined` рівні лише один одному під час нестрогого порівняння.
5. Строге порівняння різних типів, тому `false`.
6. Аналогічно, як в кроці `(4)`, `null` дорівнює лише `undefined`.
7. Строге порівняння різних типів.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
