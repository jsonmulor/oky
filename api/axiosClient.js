import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `https://khokhoahocfree.herokuapp.com/api/v1`,
  // baseURL: `http://localhost:3006/api/v1`,
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  error => {
    throw error;
  },
);

export default axiosClient;
