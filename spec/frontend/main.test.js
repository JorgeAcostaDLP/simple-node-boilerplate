// require("../../public/js/main");
const fs = require('fs');
const path = require('path');
const js = fs.readFileSync(
  path.resolve(__dirname, '../../public/js/utils.js'),
  'utf8'
);

eval(js);

test('front end code should be testable', () => {
  expect(sum(1, 2)).toBe(3);
});

test('monthText return correct month', () => {
  expect(monthText('01')).toBe('January');
});

test('monthText return correct month', () => {
  expect(monthText('12')).toBe('December');
});

test('monthText alerts invalid month input', () => {
  expect(monthText('')).toBe(-1);
});
