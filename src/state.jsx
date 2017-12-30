import React from 'react';
import PropTypes from 'prop-types';

const prefix = (str, pre) => pre + str[0].toUpperCase() + str.slice(1);

const normalize = state =>
  Array.isArray(state)
    ? state.reduce((acc, key) => ({ ...acc, [key]: undefined }), {})
    : state;

class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = normalize(props.state);
    this.references = normalize(props.refs);

    this.stateSetters = this.createStateSetters();
    this.referenceGetters = this.createReferenceGetters();
    this.referenceSetters = this.createReferenceSetters();
  }

  createStateSetters() {
    const initial = { setState: val => this.setState(val) };
    return Object.keys(this.state).reduce((acc, key) => {
      const name = prefix(key, 'set');
      const fn = val => this.setState({ [key]: val });
      return { ...acc, [name]: fn };
    }, initial);
  }

  createReferenceGetters() {
    return Object.keys(this.references).reduce((acc, key) => {
      const name = prefix(key, 'get');
      const fn = () => this.references[key];
      return { ...acc, [name]: fn };
    }, {});
  }

  createReferenceSetters() {
    return Object.keys(this.references).reduce((acc, key) => {
      const name = prefix(key, 'set');
      const fn = val => (this.references[key] = val);
      return { ...acc, [name]: fn };
    }, {});
  }

  render() {
    const { children, render } = this.props;
    return render
      ? render({
          ...this.state,
          ...this.stateSetters,
          ...this.referenceGetters,
          ...this.referenceSetters
        })
      : null;
  }
}

State.propTypes = {
  state: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  refs: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  render: PropTypes.func
};

State.defaultProps = {
  state: {},
  refs: {}
};

export default State;
