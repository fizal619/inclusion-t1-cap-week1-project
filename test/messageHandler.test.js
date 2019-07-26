const handler = require('../server/lib/messageHandler.js');
const mem = {};

test('Handler returns the default text on invalid input', () => {
  expect(handler('doggypoopoo', 2, mem).msg)
    .toBe('Text RESERVATION to begin creating your reservation.');
});

test('Handler asks for the date after being passed RESERVATION', () => {
  expect(handler('RESERVATION', 2, mem).msg)
    .toBe('What date would you like to join us? Reply with RESERVATION DD-MM');
});

test('Handler returns the phonenumber after being passed RESERVATION', () => {
  expect(handler('RESERVATION', 2, mem).phone)
    .toBe('2');
});

test('Handler asks for the time after being passed the date', () => {
  expect(handler('RESERVATION 12-24', 2, mem).msg)
    .toBe('What time, in military time, would you like to join us? Reply with RESERVATION hh:mm');
});

test('Handler returns the date after being passed the date', () => {
  expect(typeof handler('RESERVATION 12-24', 2, mem).date)
    .toEqual('object');
});

test('Handler asks to confirm after passing the time', () => {
  expect(handler('RESERVATION 14:30', 2, mem).msg)
    .toBe(`You're joining us on ${mem['2'].date.toDateString()} at ${mem['2'].time}? Reply with RESERVATION confirm`);
});


test('Handler completes the flow with confirmation', () => {
  expect(handler('RESERVATION confirm', 2, mem).msg)
    .toBe(`Got it! See you then!`);
});

test('Final object to be correct', () => {
  expect(mem['2'].success)
    .toBe(true);
});
