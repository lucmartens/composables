import React from 'react';
import PropTypes from 'prop-types';

import State from './state';
import With from './with';

const initialResult = { value: undefined, pending: true };

const handlePromise = async (promise, setResult) => {
  try {
    const value = await promise;
    setResult({ value, done: true });
  } catch (error) {
    setResult({ value: error, error: true });
  }
};

const Result = ({ promise, render }) => (
  <State
    state={{ result: initialResult }}
    render={({ result, setResult }) => (
      <React.Fragment>
        <With
          input={promise}
          enter={promise => handlePromise(promise, setResult)}
          exit={() => setResult(initialResult)}
        />
        {render && render(result)}
      </React.Fragment>
    )}
  />
);

Result.propTypes = {
  promise: PropTypes.object.isRequired,
  render: PropTypes.func
};

export default Result;
