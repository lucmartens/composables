import React from 'react';
import PropTypes from 'prop-types';

import State from './state';
import With from './with';

const initial = { value: undefined, pending: true };

const handlePromise = (promise, setResult) => {
  let canceled = false;

  promise
    .then(value => !canceled && setResult({ value, done: true }))
    .catch(value => !canceled && setResult({ value, error: true }));

  return () => (canceled = true);
};

const Result = ({ promise, render }) => (
  <State
    state={{ result: initial }}
    render={({ result, setResult }) => (
      <React.Fragment>
        <With
          input={promise}
          enter={promise => handlePromise(promise, setResult)}
          exit={cancel => cancel() && setResult(initial)}
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
