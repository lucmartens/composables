import React from 'react';
import PropTypes from 'prop-types';
import With from './with';

const register = ({ target, listeners }) =>
  Object.entries(listeners).forEach(([event, handler]) =>
    target.addEventListener(event, handler)
  );

const deregister = ({ target, ...listeners }) =>
  Object.entries(listeners).forEach(([event, handler]) =>
    target.removeEventListener(event, handler)
  );

const comparator = (a, b) => a.target !== b.target;

export const Event = ({ target, ...listeners }) => (
  <With
    lazy
    input={{ target, listeners }}
    enter={register}
    exit={() => deregister({ target, ...listeners })}
    shouldUpdate={comparator}
  />
);

Event.propTypes = {
  target: PropTypes.any.isRequired
};

Event.defaultProps = {
  target: window
};

export default Event;
