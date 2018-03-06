import React from 'react';
import { shallow } from 'enzyme';

import State from '../state';

describe('State setup', () => {
  test('accepts initial state as an object', () => {
    const state = { value: 'a', value2: 'b' };
    const render = jest.fn(() => null);
    const wrapper = shallow(<State render={render} initial={state} />);
    expect(wrapper.state()).toMatchSnapshot();
  });
});

describe('State render', () => {
  test('is called with state objects', () => {
    const render = jest.fn();
    shallow(<State initial={{ value: 1, value2: 2 }} render={render} />);
    expect(render.mock.calls[0][0]).toMatchSnapshot();
  });

  test('is called with new state when state changes', () => {
    const render = jest.fn();
    shallow(<State initial={{ value: 1 }} render={render} />);
    const { value } = render.mock.calls[0][0];

    value.set(2);
    expect(render.mock.calls[1][0]).toMatchSnapshot();
  });
});
