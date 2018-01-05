import React from 'react';
import PropTypes from 'prop-types';
import With from './with';

const comparator = (a, b) => a.target !== b.target || a.on !== b.on;

export const Event = ({ target, on, handler }) => (
  <With
    lazy
    input={{ target, on, handler }}
    enter={({ target, on, handler }) => target.addEventListener(on, handler)}
    exit={(output, { target, on, handler }) =>
      target.removeEventListener(on, handler)
    }
    shouldUpdate={comparator}
  />
);

Event.propTypes = {
  target: PropTypes.any.isRequired,
  on: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
};

Event.defaultProps = {
  target: window
};

export default Event;
