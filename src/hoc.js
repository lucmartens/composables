import React from 'react';
import PropTypes from 'prop-types';

import With from './with';

const PassThrough = ({ render, ...props }) => render(props);

const Hoc = ({ apply, render, ...props }) => (
  <With
    shouldUpdate={() => false}
    enter={() => apply(props)(PassThrough)}
    render={Component => <Component render={render} />}
  />
);

Hoc.propTypes = {
  apply: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

export default Hoc;
