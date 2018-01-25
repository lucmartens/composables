import React from 'react';
import { mount } from 'enzyme';

import equals from '../equals';

describe('Equals', () => {
  test('checks types', () => {
    expect(equals({}, [])).toBe(false);
    expect(equals([], {})).toBe(false);
    expect(equals(null, {})).toBe(false);
    expect(equals({}, null)).toBe(false);
    expect(equals(null, [])).toBe(false);
    expect(equals([], null)).toBe(false);

    expect(equals({}, {})).toBe(true);
    expect(equals([], [])).toBe(true);
    expect(equals(null, null)).toBe(true);
  });

  test('primitive value equality', () => {
    expect(equals(1, 0)).toBe(false);
    expect(equals('a', 'b')).toBe(false);

    expect(equals(1, 1)).toBe(true);
    expect(equals('a', 'a')).toBe(true);
  });

  test('array equality', () => {
    expect(equals(['a', 'b'], ['a'])).toBe(false);
    expect(equals(['a', 'b'], ['a', 'c'])).toBe(false);

    expect(equals([], [])).toBe(true);
    expect(equals(['a', 'b'], ['a', 'b'])).toBe(true);
  });

  test('object equality', () => {
    expect(equals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);

    expect(equals({}, {})).toBe(true);
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  test('promise equality', () => {
    const promiseA = Promise.resolve();
    const promiseB = Promise.resolve();

    expect(equals(promiseA, promiseB)).toBe(false);
    expect(equals(promiseA, promiseA)).toBe(true);
  });
});
