import React from 'react';
import PropTypes from 'prop-types';
import HandleError from '../../components/error/containers/handleError';

function NavBarLayout({ children }) {
  return (
    <HandleError>
      <section className="nav-bar-menu">
        {children}
      </section>
    </HandleError>
  );
}
NavBarLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default NavBarLayout;
