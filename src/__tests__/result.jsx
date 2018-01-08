import React from 'react';
import { mount } from 'enzyme';

import Result from '../result';

describe('Result converts promise to', () => {
  const tick = () => {
    return new Promise(resolve => setTimeout(resolve, 0));
  };

  test('pending result object', () => {
    const render = jest.fn();
    mount(<Result promise={new Promise(() => {})} render={render} />);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toMatchSnapshot();
  });

  test('successful result object', async () => {
    const render = jest.fn();
    mount(<Result promise={Promise.resolve('value')} render={render} />);

    expect(render.mock.calls.length).toBe(1);
    await tick();
    expect(render.mock.calls.length).toBe(2);
    expect(render.mock.calls[1][0]).toMatchSnapshot();
  });

  test('failed result object', async () => {
    const render = jest.fn();
    mount(<Result promise={Promise.reject('error_code')} render={render} />);

    expect(render.mock.calls.length).toBe(1);
    await tick();

    expect(render.mock.calls.length).toBe(2);
    expect(render.mock.calls[1][0]).toMatchSnapshot();
  });
});
