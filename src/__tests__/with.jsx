import React from 'react';
import { mount } from 'enzyme';

import With from '../with';

describe('With calls', () => {
  test('enter on mount with input', () => {
    const enter = jest.fn();
    const wrapper = mount(<With input="a" enter={enter} />);

    expect(enter.mock.calls.length).toBe(1);
    expect(enter.mock.calls[0]).toMatchSnapshot();
  });

  test('render with output', () => {
    const exit = jest.fn();
    const enter = jest.fn(input => input + 'b');
    const render = jest.fn(output => 'a');
    const wrapper = mount(
      <With input="a" enter={enter} exit={exit} render={render} />
    );

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0]).toMatchSnapshot();
  });

  test('render with uninitialized output when lazy', () => {
    const exit = jest.fn();
    const enter = jest.fn(input => input + 'b');
    const render = jest.fn(output => 'a');
    const wrapper = mount(
      <With input="a" enter={enter} exit={exit} render={render} lazy={true} />
    );

    expect(render.mock.calls.length).toBe(2);
    expect(render.mock.calls[0]).toMatchSnapshot();
    expect(render.mock.calls[1]).toMatchSnapshot();
  });

  test('exit on unmount with output and input', () => {
    const exit = jest.fn();
    const enter = jest.fn(input => input + 'b');
    const wrapper = mount(<With input="a" enter={enter} exit={exit} />);

    expect(exit).not.toBeCalled();
    wrapper.unmount();
    expect(exit.mock.calls.length).toBe(1);
    expect(exit.mock.calls[0]).toMatchSnapshot();
  });

  test('shouldUpdate on input change with previous and next input', () => {
    const fn = jest.fn();
    const enter = jest.fn(input => input + 'b');
    const wrapper = mount(<With input="a" enter={enter} shouldUpdate={fn} />);

    expect(fn).not.toBeCalled();
    wrapper.setProps({ input: 'b' });
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0]).toMatchSnapshot();
  });

  test('exit on input change', () => {
    const exit = jest.fn();
    const enter = jest.fn(input => input + 'b');

    const wrapper = mount(<With input="a" enter={enter} exit={exit} />);

    expect(exit.mock.calls.length).toBe(0);
    wrapper.setProps({ input: 'b' });
    expect(exit.mock.calls.length).toBe(1);
    expect(exit.mock.calls[0]).toMatchSnapshot();
  });

  test('enter on input change', () => {
    const exit = jest.fn();
    const enter = jest.fn(input => input + 'b');

    const wrapper = mount(<With input="a" enter={enter} exit={exit} />);

    expect(enter.mock.calls.length).toBe(1);
    wrapper.setProps({ input: 'b' });
    expect(enter.mock.calls.length).toBe(2);
    expect(enter.mock.calls[1]).toMatchSnapshot();
  });
});
