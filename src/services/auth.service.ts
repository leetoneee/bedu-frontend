import axios from '@/libs/axiosInstance';

export const login = async (data: { username: string; password: string }) => {
  try {
    const res = await axios.post(`/auth/login`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ login ~ error:', error);
    throw error;
  }
};
