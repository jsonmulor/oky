/* eslint-disable no-unused-vars */
import { userAuth } from 'actions';
import * as types from 'actions/types';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import { auth } from 'services/firebaseConfig';

export const AuthContext = React.createContext();

const INITIAL_STATE = {};
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_USER_SUCCESS:
      return { ...action.payload };
    default:
      throw new Error('Unexpected action');
  }
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      if (!user) {
        router.push('/dang-nhap');
      } else {
        const token = await auth().currentUser.getIdToken(true);
        localStorage.setItem('token', token);
        const { uid, email } = user;
        dispatch(userAuth({ uid, email }));
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
