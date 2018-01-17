import React from 'react';
import PropTypes from 'prop-types';

const prefix = (str, pre) => pre + str[0].toUpperCase() + str.slice(1);

class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initial;
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
    return render({ ...this.state, ...this.stateSetters, state: this.state });
  }
}

State.propTypes = {
  initial: PropTypes.oneOfType([PropTypes.object]).isRequired,
  render: PropTypes.func.isRequired
};

State.defaultProps = {
  state: {}
};

export default State;
