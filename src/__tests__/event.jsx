import React from 'react';
import { mount } from 'enzyme';

import Event from '../event';

const createTarget = () => {
  let handlers = [];

  return {
    addEventListener: jest.fn((on, handler) => {
      handlers.push([on, handler]);
    }),
    removeEventListener: jest.fn((on, handler) => {
      handlers = handlers.filter(def => def[0] !== on || def[1] !== handler);
    }),

    dispatch: jest.fn((on, value) => {
      handlers.forEach(([e, h]) => on === e && h(value));
    })
  };
};

const createWrapper = (target, handler, on = 'click') =>
  mount(<Event target={target} on={on} handler={handler} />);

describe('Event', () => {
  let handler;
  let target;

  beforeEach(() => {
    handler = jest.fn();
    target = createTarget();
  });

  test('registers handler', () => {
    const wrapper = createWrapper(target, handler);
    const calls = target.addEventListener.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe('click');

    target.dispatch('click', 1);
    expect(handler.mock.calls[0][0]).toBe(1);
  });

  test('deregisters handler', () => {
    const wrapper = createWrapper(target, handler);
    wrapper.unmount();

    const calls = target.removeEventListener.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe('click');

    target.dispatch('click', 1);
    expect(handler.mock.calls.length).toBe(0);
  });

  test('deregisters and reregisters on "on" change', () => {
    const wrapper = createWrapper(target, handler);
    wrapper.setProps({ on: 'mousedown' });

    const deregisterCalls = target.removeEventListener.mock.calls;
    const registerCalls = target.addEventListener.mock.calls;

    expect(deregisterCalls.length).toBe(1);
    expect(deregisterCalls[0][0]).toBe('click');
    expect(registerCalls.length).toBe(2);
    expect(registerCalls[1][0]).toBe('mousedown');
  });

  test("doesn't reregister on handler change", () => {
    const wrapper = createWrapper(target, handler);
    const newHandler = jest.fn();
    target.dispatch('click', 'a');
    wrapper.setProps({ handler: newHandler });

    const deregisterCalls = target.removeEventListener.mock.calls;
    const registerCalls = target.addEventListener.mock.calls;

    expect(deregisterCalls.length).toBe(0);
    expect(registerCalls.length).toBe(1);
    expect(registerCalls[0][0]).toBe('click');

    target.dispatch('click', 'b');
    expect(newHandler.mock.calls[0][0]).toBe('b');
  });
});
