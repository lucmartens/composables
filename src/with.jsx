import React from 'react';
import PropTypes from 'prop-types';

import equals from './equals';

class With extends React.Component {
  constructor(props) {
    super(props);
    const { lazy, enter, input } = props;
    this.state = { output: !lazy && enter ? enter(input) : undefined };
  }

  componentDidMount() {
    const { lazy, enter, input } = this.props;
    if (lazy && enter) {
      this.setState({ output: enter(input) });
    }
  }

  componentWillUnmount() {
    const { input, exit } = this.props;
    const { output } = this.state;
    exit && exit(output, input);
  }

  componentWillReceiveProps(nextProps) {
    const { input: next, enter } = nextProps;
    const { input: previous, shouldUpdate, exit } = this.props;
    const { output } = this.state;

    if (!shouldUpdate(previous, next)) {
      return;
    }

    exit && exit(output, previous);
    enter && this.setState({ output: enter(next) });
  }

  render() {
    const { render } = this.props;
    const { output } = this.state;
    return render ? render(output) : null;
  }
}

With.propTypes = {
  input: PropTypes.any,
  enter: PropTypes.func,
  exit: PropTypes.func,
  lazy: PropTypes.bool,
  render: PropTypes.func,
  shouldUpdate: PropTypes.func.isRequired
};

With.defaultProps = {
  lazy: false,
  shouldUpdate: (a, b) => !equals(a, b)
};

export default With;
