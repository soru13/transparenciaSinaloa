import React from 'react';
import PropTypes from 'prop-types';
import ErrorComponent from '../components/errorComponent';

class HandleError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { handleError: false };
  }

  componentDidCatch() {
    this.setState({
      handleError: true,
    });
  }

  render() {
    const { handleError } = this.state;
    const { children } = this.props;

    if (handleError) {
      return (
        <ErrorComponent />
      );
    }
    return children;
  }
}
HandleError.propTypes = {
  children: PropTypes.node,
};
HandleError.defaultProps = {
  children: null,
};
export default HandleError;
