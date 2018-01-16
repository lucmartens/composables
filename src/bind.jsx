import React from 'react';
import PropTypes from 'prop-types';

class Bind extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.fn = props.fn;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fn !== this.props.fn) {
      this.fn = nextProps.fn;
    }
  }

  handler(...args) {
    this.fn(...args);
  }

  render() {
    const { render } = this.props;
    return render(this.handler);
  }
}

Bind.propTypes = {
  fn: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

export default Bind;
