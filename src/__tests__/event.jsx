import React from 'react';
import { mount } from 'enzyme';

import Event from '../event';

describe('Event', () => {
  const handler = jest.fn();

  const target = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  };

  beforeEach(() => jest.resetAllMocks());

  test('registers handler', () => {
    const wrapper = mount(<Event target={target} click={handler} />);
    const calls = target.addEventListener.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe('click');
    expect(calls[0][1]).toBe(handler);
  });

  test('deregisters handler', () => {
    const wrapper = mount(<Event click={handler} target={target} />);
    wrapper.unmount();

    const calls = target.removeEventListener.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe('click');
    expect(calls[0][1]).toBe(handler);
  });

  test('deregisters and reregisters on target change', () => {
    const wrapper = mount(<Event click={handler} target={target} />);
    const newTarget = { addEventListener: jest.fn() };
    wrapper.setProps({ target: newTarget });

    const deregisterCalls = target.removeEventListener.mock.calls;
    const registerCalls = newTarget.addEventListener.mock.calls;

    expect(deregisterCalls.length).toBe(1);
    expect(deregisterCalls[0][0]).toBe('click');
    expect(deregisterCalls[0][1]).toBe(handler);

    expect(registerCalls.length).toBe(1);
    expect(registerCalls[0][0]).toBe('click');
    expect(registerCalls[0][1]).toBe(handler);
  });

  test('does not reregister on handler change', () => {
    const wrapper = mount(<Event click={handler} target={target} />);
    wrapper.setProps({ click: jest.fn() });

    const registerCalls = target.addEventListener.mock.calls;
    const deregisterCalls = target.removeEventListener.mock.calls;

    expect(registerCalls.length).toBe(1);
    expect(registerCalls[0][0]).toBe('click');
    expect(registerCalls[0][1]).toBe(handler);
    expect(deregisterCalls.length).toBe(0);
  });
});
