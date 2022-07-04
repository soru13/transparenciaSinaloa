import React from 'react';
import PropTypes from 'prop-types';
import HandleError from '../../components/error/containers/handleError';

function SideLayout({ children }) {
  return (
    <HandleError>
      {children}
    </HandleError>
  );
}
SideLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default SideLayout;
