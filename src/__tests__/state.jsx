import React from 'react';
import { shallow } from 'enzyme';

import State from '../state';

describe('State setup', () => {
  test('accepts state as an object', () => {
    const state = { value: 'a', value2: 'b' };
    const render = jest.fn(() => null);
    const wrapper = shallow(<State render={render} state={state} />);
    expect(wrapper.state()).toMatchSnapshot();
  });

  test('accepts state as an array', () => {
    const state = ['value', 'value2'];
    const render = jest.fn(() => null);
    const wrapper = shallow(<State render={render} state={state} />);
    expect(wrapper.state()).toMatchSnapshot();
  });
});

describe('State render', () => {
  test('is called with state and setters', () => {
    const render = jest.fn();
    shallow(<State state={{ value: 1, value2: 2 }} render={render} />);
    expect(render.mock.calls[0][0]).toMatchSnapshot();
  });

  test('is called with new state when state changes', () => {
    const render = jest.fn();
    shallow(<State state={{ value: 1 }} render={render} />);
    const { setValue } = render.mock.calls[0][0];

    setValue(2);
    expect(render.mock.calls[1][0]).toMatchSnapshot();
  });
});
