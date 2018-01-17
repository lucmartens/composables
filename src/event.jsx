import React from 'react';
import PropTypes from 'prop-types';

import Bind from './bind';
import With from './with';

const register = ({ target, on, handler }) =>
  target.addEventListener(on, handler);

const deregister = (output, { target, on, handler }) =>
  target.removeEventListener(on, handler);

const Event = ({ target, on, handler }) => (
  <Bind
    fn={handler}
    render={handler => (
      <With
        input={{ target, on, handler }}
        enter={register}
        exit={deregister}
      />
    )}
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
