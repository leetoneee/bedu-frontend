import axios from '@/libs/axiosInstance';

export type CreateProgramDto = {
  // The IELTS programs start with PI.
  // The TOEIC programs start with PT.
  // The TOEFL programs start with PF.
  title: string;
  avatar: string
  //classId: number;
  description: string;
  sessionQuantity: number;
  courseId: number[];

  // type is in  toeic, ielts, toefl
  type: string;
};

export const createProgram = async (data: CreateProgramDto) => {
  try {
    const res = await axios.post(`/programs/new`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ createProgram ~ error:', error);
    throw error;
  }
};

export type UpdateProgramDto = Partial<CreateProgramDto>;

export const editProgram = async (id: number, data: UpdateProgramDto) => {
  try {
    const res = await axios.patch(`/programs/item/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ editProgram ~ error:', error);
    throw error;
  }
};

export const deleteProgram = async (id: number) => {
  try {
    const res = await axios.delete(`/programs/item/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ deleteProgram ~ error:', error);
    throw error;
  }
};

export const findProgramByCode = async (code: string) => {
  try {
    const res = await axios.get(`/programs/code/${code}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ findProgramByCode ~ error:', error);
    throw error;
  }
};