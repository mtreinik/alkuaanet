import NoteUtils from './NoteUtils';

it('converts B to H correctly', () => {
  expect(NoteUtils.convertBtoH('B4')).toBe('H4');
  expect(NoteUtils.convertBtoH('Bb3')).toBe('B3');
  expect(NoteUtils.convertBtoH('D4-Bb3-F3-Bb2')).toBe('D4-B3-F3-B2');
  expect(NoteUtils.convertBtoH('D4-B3-G3')).toBe('D4-H3-G3');
});

it('converts H to B correctly', () => {
  expect(NoteUtils.convertHtoB('H2')).toBe('B2');
  expect(NoteUtils.convertHtoB('B3')).toBe('Bb3');
  expect(NoteUtils.convertHtoB('H3-F#3-E3')).toBe('B3-F#3-E3');
  expect(NoteUtils.convertHtoB('B3-G3-Eb3')).toBe('Bb3-G3-Eb3');
});
