import React from 'react';
import PropTypes from 'prop-types';

import State from './state';
import With from './with';

const initial = { value: undefined, pending: true };

const Result = ({ promise, render }) => (
  <State
    state={{ result: initial }}
    render={({ result, setResult }) => (
      <React.Fragment>
        <With
          input={promise}
          enter={promise =>
            promise
              .then(value => setResult({ value, done: true }))
              .catch(value => setResult({ value, error: true }))
          }
          exit={() => setResult(initial)}
        />
        {render(result)}
      </React.Fragment>
    )}
  />
);

Result.propTypes = {
  promise: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
};

export default Result;
