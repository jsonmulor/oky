import PropTypes from 'prop-types';
import React from 'react';
import AuthProvider from './AuthContext';

Provider.propTypes = {
  children: PropTypes.object.isRequired,
};

function Provider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Provider;
