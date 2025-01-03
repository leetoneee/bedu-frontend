import axios from '@/libs/axiosInstance';

export type CreateUserDto = {
  name: string;
  gender: string;
  birthday: Date;
  address: string;
  email: string;
  phone: string;
  currentLevel: string;
  username: string;
  password: string;
  roleId: number;
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

export const findUserByCID = async (cid: string) => {
  try {
    const res = await axios.get(`/users/cid/${cid}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ findUserByCID ~ error:', error);
    throw error;
  }
}

export type UpdateUserDto = Partial<CreateUserDto>;

export const editUser = async (id: number, data: UpdateUserDto) => {
  try {
    const res = await axios.patch(`/users/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editUser ~ error:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const res = await axios.delete(`/users/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteUser ~ error:', error);
    throw error;
  }
};