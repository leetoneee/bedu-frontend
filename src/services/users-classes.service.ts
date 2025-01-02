import axios from '@/libs/axiosInstance';

export type CreateUserClassDto = {
  userId: number;
  classId: number;
  time: Date;
};

export const createUserClass = async (data: CreateUserClassDto) => {
  try {
    const result = await axios.post('/users-classes/new', data);
    return result.data;
  } catch (error) {
    console.log('🚫 ~ createUserClass ~ error:', error);
    throw error;
  }
};

export const deleteUserClass = async (id: number) => {
  try {
    const result = await axios.delete(`/users-classes/item/${id}`);
    return result.data;
  } catch (error) {
    console.log('🚫 ~ deleteUserClass ~ error:', error);
    throw error;
  }
};