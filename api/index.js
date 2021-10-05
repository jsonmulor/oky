import axiosClient from './axiosClient';

export const api = {
  getUserSessionKey: async infos => {
    const { data } = await axiosClient.post('/get-user-session-key', infos);
    return data;
  },
  checkUserSession: async infos => {
    const { data } = await axiosClient.post('/check-user-session', infos);
    return data;
  },
};
