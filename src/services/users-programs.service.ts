import axios from '@/libs/axiosInstance';

export type CreateUserProgramDto = {
  userId: number;
  programId: number;
  time: Date;
};

export const createUserProgram = async (data: CreateUserProgramDto) => {
  try {
    const res = await axios.post(`/users_programs/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createUserProgram ~ error:', error);
    throw error;
  }
};

export const deleteUsersProgram = async (id: number) => {
  try {
    const res = await axios.delete(`/users_programs/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteUsersProgram ~ error:', error);
    throw error;
  }
};
