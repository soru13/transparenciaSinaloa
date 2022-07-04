import React from 'react';
import './home.styl';
import PropTypes from 'prop-types';
import HandleError from '../../components/error/containers/handleError';

function HomeLayout({ children }) {
  return (
    <HandleError>
      <div className="react-container">
        {children}
      </div>
    </HandleError>
  );
}
HomeLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default HomeLayout;
