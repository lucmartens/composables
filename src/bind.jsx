import React from 'react';
import PropTypes from 'prop-types';

class Bind extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fn: props.fn };
    this.handler = this.handler.bind(this);
  }

  handler(...args) {
    this.state.fn && this.state.fn(...args);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fn !== this.props.fn) {
      this.setState({ fn: nextProps.fn });
    }
  }

  render() {
    const { render } = this.props;
    return render ? render(this.handler) : null;
  }
}

Bind.propTypes = {
  fn: PropTypes.func.isRequired,
  render: PropTypes.func
};

export default Bind;
