import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const getAuthToken = async () => {
  const session = await getSession();
  return session?.user.accessToken || null;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await getAuthToken();
    console.log('🚀 ~ token:', token);
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    // const token = localStorage.getItem('authToken'); // Retrieve auth token from localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
