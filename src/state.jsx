import React from 'react';
import PropTypes from 'prop-types';

class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initial;
  }

  render() {
    const { render } = this.props;
    const state = Object.entries(this.state).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          value,
          set: v => this.setState({ [key]: v })
        }
      }),
      {}
    );

    return render(state);
  }
}

State.propTypes = {
  initial: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
};

State.defaultProps = {
  initial: {}
};

export default State;
