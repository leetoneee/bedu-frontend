import axios from '@/libs/axiosInstance';

export type CreateUserDto = {
  name: string;
  gender: string;
  birthday: string;
  address: string;
  email: string;
  phone: string;
  currentLevel: string;
  username: string;
  password: string;
  groupId: number;
};

export const createUser = async (data: CreateUserDto) => {
  try {
    const res = await axios.post(`/users/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createUser ~ error:', error);
    throw error;
  }
};
