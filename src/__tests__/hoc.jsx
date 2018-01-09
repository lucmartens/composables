import React from 'react';
import { mount } from 'enzyme';

import Hoc from '../hoc';

describe('Hoc', () => {
  const hoc = n => Component => props => <Component n={n + 1} {...props} />;

  test('applies a higher order component', () => {
    const apply = jest.fn(() => hoc(0));
    const render = jest.fn(() => null);
    mount(<Hoc apply={apply} render={render} test="value" />);

    expect(apply.mock.calls.length).toBe(1);
    expect(apply.mock.calls[0][0]).toMatchSnapshot();
  });

  test('calls render with the resulting props', () => {
    const apply = jest.fn(() => hoc(0));
    const render = jest.fn(() => null);
    mount(<Hoc apply={apply} render={render} />);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toMatchSnapshot();
  });

  test('does not re-apply higher order component on prop changes', () => {
    const apply = jest.fn(() => hoc(0));
    const render = jest.fn(() => null);
    const wrapper = mount(<Hoc apply={apply} render={render} />);

    expect(apply.mock.calls.length).toBe(1);
    wrapper.setProps({ test: 'value' });
    expect(apply.mock.calls.length).toBe(1);
    wrapper.setProps({ hoc: () => {} });
    expect(apply.mock.calls.length).toBe(1);
  });
});
