import React from 'react';
import PropTypes from 'prop-types';
import HandleError from '../../components/error/containers/handleError';

function ContentLayout({ children }) {
  return (
    <HandleError>
        {children}
    </HandleError>
  );
}
ContentLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ContentLayout;
