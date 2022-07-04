import React from 'react';
import './react.styl';
import PropTypes from 'prop-types';
import HandleError from '../../error/containers/handleError';

function ReactLayout({ children }) {
  return (
    <HandleError>
      <div className="react-container-grilla">
        {children}
      </div>
    </HandleError>
  );
}
ReactLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ReactLayout;
