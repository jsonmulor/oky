import * as types from './types';

export const userAuth = userInfo => ({
  type: types.AUTH_USER_SUCCESS,
  payload: userInfo,
});
