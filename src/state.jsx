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
    this.stateSetters = this.createStateSetters();
  }

  createStateSetters() {
    const initial = { setState: val => this.setState(val) };
    return Object.keys(this.state).reduce((acc, key) => {
      const name = prefix(key, 'set');
      const fn = val => this.setState({ [key]: val });
      return { ...acc, [name]: fn };
    }, initial);
  }

  render() {
    const { render } = this.props;
    return render({ ...this.state, ...this.stateSetters });
  }
}

State.propTypes = {
  state: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  render: PropTypes.func.isRequired
};

State.defaultProps = {
  state: {}
};

export default State;
