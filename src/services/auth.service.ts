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

export type SignUpDto = {
  name: string;
  gender: string;
  birthday: Date;
  address: string;
  email: string;
  phone: string;
  currentLevel: string;
  username: string;
  password: string;
};

export type SignInDto = {
  username: string;
  password: string;
};

export const signIn = async (data: SignInDto) => {
  try {
    const res = await axios.post(`/auth/login`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ login ~ error:', error);
    throw error;
  }
};

export const signUp = async (data: SignUpDto) => {
  try {
    const res = await axios.post(`/auth/signup`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ signUp ~ error:', error);
    throw error;
  }
};
